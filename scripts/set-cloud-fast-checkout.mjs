import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const redirectsPath = resolve(root, "_redirects");
const route = "/checkout/cloud-fast";
const pendingTarget = "/cloud-fast#checkout-pending";
const lemonSqueezyHostSuffix = ".lemonsqueezy.com";

const rawTarget = process.argv[2]?.trim();
if (!rawTarget) {
  fail("Usage: node scripts/set-cloud-fast-checkout.mjs <https-checkout-url|--pending>");
}

const target = rawTarget === "--pending" ? pendingTarget : rawTarget;
if (target !== pendingTarget) {
  validateCheckoutUrl(target);
}

const redirects = readFileSync(redirectsPath, "utf8");
const lines = redirects.split(/\r?\n/);
let replaced = false;

const nextLines = lines.map((line) => {
  if (!line.trim().startsWith(`${route} `)) return line;
  replaced = true;
  return `${route} ${target} 302`;
});

if (!replaced) {
  fail(`Missing ${route} redirect in _redirects.`);
}

writeFileSync(redirectsPath, nextLines.join("\n"));
console.log(`Updated ${route} -> ${target}`);

function validateCheckoutUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail("Checkout URL must be a valid absolute URL.");
  }

  if (parsed.protocol !== "https:") {
    fail("Checkout URL must use HTTPS.");
  }
  if (!isLemonSqueezyHost(parsed.hostname)) {
    fail("Checkout URL must be hosted on lemonsqueezy.com.");
  }
  if (parsed.username || parsed.password) {
    fail("Checkout URL must not include credentials.");
  }
  if (parsed.hash) {
    fail("Checkout URL must not include a URL fragment.");
  }
}

function isLemonSqueezyHost(hostname) {
  return hostname === "lemonsqueezy.com" || hostname.endsWith(lemonSqueezyHostSuffix);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
