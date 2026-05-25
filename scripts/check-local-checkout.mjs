import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const publicRoot = resolve(root, "dist");
const redirects = readFileSync(resolve(publicRoot, "_redirects"), "utf8");
const page = readFileSync(resolve(publicRoot, "index.html"), "utf8");

const route = "/checkout/local";
const pendingTarget = "/#checkout-local-pending";
const expectedUrl = process.env.EXPECT_LOCAL_CHECKOUT_URL?.trim();
const lemonSqueezyHostSuffix = ".lemonsqueezy.com";

if (!page.includes('href="/checkout/local" data-local-checkout')) {
  fail("Local pricing CTA must point to /checkout/local.");
}

if (!page.includes('id="checkout-local-pending"')) {
  fail("Local pending checkout anchor is missing.");
}

const redirectLine = redirects
  .split(/\r?\n/)
  .map((line) => line.trim())
  .find((line) => line.startsWith(`${route} `));

if (!redirectLine) {
  fail("Missing /checkout/local redirect in _redirects.");
}

const [, target, status] = redirectLine.split(/\s+/);
if (status !== "302") {
  fail(`/checkout/local must be a 302 redirect, got ${status || "no status"}.`);
}

if (expectedUrl) {
  validateCheckoutUrl(expectedUrl, "EXPECT_LOCAL_CHECKOUT_URL");
  if (target !== expectedUrl) {
    fail(`Expected /checkout/local to redirect to ${expectedUrl}, got ${target}.`);
  }
  console.log(`Local checkout route points to ${target}`);
} else if (target === pendingTarget) {
  console.log(`Local checkout route is pending: ${route} -> ${target}`);
} else {
  validateCheckoutUrl(target, "/checkout/local target");
  console.log(`Local checkout route points to ${target}`);
}

function validateCheckoutUrl(value, label) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(`${label} must be a valid absolute URL.`);
  }
  if (parsed.protocol !== "https:") {
    fail(`${label} must be an HTTPS Lemon Squeezy checkout URL.`);
  }
  if (!(parsed.hostname === "lemonsqueezy.com" || parsed.hostname.endsWith(lemonSqueezyHostSuffix))) {
    fail(`${label} must be hosted on lemonsqueezy.com.`);
  }
  if (parsed.username || parsed.password || parsed.hash) {
    fail(`${label} must not include credentials or a URL fragment.`);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
