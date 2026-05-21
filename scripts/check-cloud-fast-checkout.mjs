import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const redirects = readFileSync(resolve(root, "_redirects"), "utf8");
const page = readFileSync(resolve(root, "index.html"), "utf8");

const route = "/checkout/cloud-fast";
const pendingTarget = "/#cloud-fast";
const expectedUrl = process.env.EXPECT_CLOUD_FAST_CHECKOUT_URL?.trim();
const lemonSqueezyHostSuffix = ".lemonsqueezy.com";

if (!page.includes('href="/checkout/cloud-fast" data-cloud-fast-checkout')) {
  fail("Homepage Cloud Fast CTA must point to /checkout/cloud-fast.");
}

const redirectLine = redirects
  .split(/\r?\n/)
  .map((line) => line.trim())
  .find((line) => line.startsWith(`${route} `));

if (!redirectLine) {
  fail("Missing /checkout/cloud-fast redirect in _redirects.");
}

const [, target, status] = redirectLine.split(/\s+/);
if (status !== "302") {
  fail(`/checkout/cloud-fast must be a 302 redirect, got ${status || "no status"}.`);
}

if (expectedUrl) {
  validateCheckoutUrl(expectedUrl, "EXPECT_CLOUD_FAST_CHECKOUT_URL");
  if (target !== expectedUrl) {
    fail(`Expected /checkout/cloud-fast to redirect to ${expectedUrl}, got ${target}.`);
  }
  console.log(`Cloud Fast checkout route points to ${target}`);
} else {
  if (target === pendingTarget) {
    console.log(`Cloud Fast checkout route is pending: ${route} -> ${target}`);
  } else {
    validateCheckoutUrl(target, "/checkout/cloud-fast target");
    console.log(`Cloud Fast checkout route points to ${target}`);
  }
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
