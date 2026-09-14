// Live language-routing checks. Usage:
//   node scripts/check-locale-routing-live.mjs https://dictivo.app
//   node scripts/check-locale-routing-live.mjs https://<branch>.dictivo-app.pages.dev --country-override
const base = process.argv[2] || "https://dictivo.app";
const override = process.argv.includes("--country-override");
const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const GOOGLEBOT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const failures = [];

async function visit(path, { headers = {}, country, region, method = "GET" } = {}) {
  const request = { "user-agent": CHROME, accept: "text/html", "sec-fetch-dest": "document", "sec-fetch-site": "none", ...headers };
  if (country) request["x-dictivo-test-country"] = country;
  if (region) request["x-dictivo-test-region"] = region;
  const response = await fetch(new URL(path, base), { method, headers: request, redirect: "manual" });
  const body = method === "HEAD" ? "" : await response.text();
  return { status: response.status, headers: response.headers, body };
}

async function expect(name, pending, assertions) {
  try {
    const problems = assertions(await pending).filter(Boolean);
    if (problems.length) failures.push(`${name}: ${problems.join("; ")}`);
    else console.log(`OK ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const status = (r, code) => r.status !== code && `status ${r.status} != ${code}`;
const header = (r, name, pattern) => !pattern.test(r.headers.get(name) || "") && `${name}=${r.headers.get(name)} !~ ${pattern}`;
const location = (r, path) => header(r, "location", new RegExp(`^(${escape(base)})?${escape(path)}$`));
const route = (r, reason) => header(r, "x-dictivo-locale-route", new RegExp(`^${escape(reason)}$`));
const noPrompt = (r) => r.body.includes('class="locale-suggestion"') && "unexpected language prompt";
const prompt = (r, locale) => [
  status(r, 200),
  route(r, `suggest:${locale}`),
  !r.body.includes(`<aside class="locale-suggestion" lang="${locale}"`) && `no ${locale} prompt in body`,
  header(r, "cache-control", /^private, no-store$/),
  r.headers.has("etag") && "prompt response has an ETag",
];

await expect("explicit language URL is served", visit("/de/"), (r) => [status(r, 200), route(r, "explicit-locale"), header(r, "content-security-policy", /default-src 'self'/), noPrompt(r)]);
await expect("Traditional Chinese homepage is published", visit("/zh-hant/"), (r) => [status(r, 200), !r.body.includes('<html lang="zh-Hant">') && "missing zh-Hant html lang"]);
await expect("saved choice redirects English entry", visit("/", { headers: { cookie: "dictivo_lang=fr" } }), (r) => [status(r, 302), location(r, "/fr/"), header(r, "cache-control", /no-store/)]);
await expect("saved English choice stays", visit("/", { headers: { cookie: "dictivo_lang=en" } }), (r) => [status(r, 200), route(r, "cookie:en"), noPrompt(r)]);
await expect("deep page follows saved choice", visit("/compare/wispr-flow-alternative/?utm_source=x", { method: "HEAD", headers: { cookie: "dictivo_lang=ja" } }), (r) => [status(r, 302), location(r, "/ja/compare/wispr-flow-alternative/?utm_source=x")]);
await expect("?lang= stores choice", visit("/zh-hant/?lang=zh-hant&utm_source=x"), (r) => [status(r, 302), location(r, "/zh-hant/?utm_source=x"), header(r, "set-cookie", /^dictivo_lang=zh-hant;.*HttpOnly/)]);
await expect("crawler is never redirected", visit("/", { headers: { cookie: "dictivo_lang=fr", "user-agent": GOOGLEBOT } }), (r) => [status(r, 200), route(r, "automated"), noPrompt(r)]);
await expect("internal click is never redirected", visit("/", { headers: { cookie: "dictivo_lang=fr", "sec-fetch-site": "same-origin" } }), (r) => [status(r, 200), route(r, "internal")]);
await expect("checkout stays a static redirect", visit("/checkout/local"), (r) => [status(r, 302), header(r, "location", /^https:\/\/dictivo\.lemonsqueezy\.com\//), r.headers.has("x-dictivo-locale-route") && "Function ran on checkout"]);
await expect("download stays a static redirect", visit("/download/mac"), (r) => [status(r, 302), header(r, "location", /^https:\/\/api\.dictivo\.app\//)]);
await expect("assets do not invoke the Function", visit("/assets/site.css", { headers: { accept: "text/css", "sec-fetch-dest": "style" } }), (r) => [status(r, 200), r.headers.has("x-dictivo-locale-route") && "Function ran on asset"]);
await expect("slash canonicalization still works", visit("/de"), (r) => [status(r, 308), location(r, "/de/")]);

if (override) {
  const redirects = [
    ["DE", "", "", "/", "/de/"], ["CH", "", "", "/", "/de/"], ["CH", "", "fr-CH", "/", "/fr/"], ["CA", "QC", "", "/", "/fr/"],
    ["SN", "", "", "/", "/fr/"], ["PF", "", "", "/", "/fr/"], ["MX", "", "", "/", "/es/"], ["BR", "", "", "/", "/pt/"],
    ["AO", "", "", "/", "/pt/"], ["CN", "", "", "/", "/zh/"], ["TW", "", "", "/", "/zh-hant/"], ["HK", "", "", "/", "/zh-hant/"],
    ["MO", "", "", "/", "/zh-hant/"], ["SG", "", "zh-CN", "/", "/zh/"], ["JP", "", "", "/", "/ja/"], ["KR", "", "", "/", "/ko/"],
    ["JP", "", "", "/guides/first-local-dictation/", "/ja/guides/first-local-dictation/"],
    ["TW", "", "", "/privacy/where-dictation-audio-goes/", "/zh-hant/privacy/where-dictation-audio-goes/"],
  ];
  for (const [country, region, acceptLanguage, path, target] of redirects) {
    const label = `${country}${region ? `-${region}` : ""}${acceptLanguage ? ` (${acceptLanguage})` : ""} ${path} → ${target}`;
    await expect(label, visit(path, { country, region, headers: acceptLanguage ? { "accept-language": acceptLanguage } : {} }), (r) => [status(r, 302), location(r, target)]);
  }

  const stays = [["CA", "/"], ["SG", "/"], ["US", "/"], ["GB", "/"], ["IN", "/"], ["XX", "/"], ["FR", "/de/"], ["DE", "/about/"], ["DE", "/guides/first-local-dictation/"]];
  for (const [country, path] of stays) {
    await expect(`${country} ${path} stays`, visit(path, { country }), (r) => [status(r, 200), noPrompt(r)]);
  }

  const prompts = [["FR", "", "fr"], ["AT", "", "de"], ["BE", "", "nl"], ["BE", "fr-BE", "fr"], ["LU", "", "fr"], ["ES", "", "es"], ["IT", "", "it"], ["NL", "", "nl"], ["PT", "", "pt"], ["LI", "", "de"], ["RE", "", "fr"]];
  for (const [country, acceptLanguage, locale] of prompts) {
    await expect(`${country}${acceptLanguage ? ` (${acceptLanguage})` : ""} / prompts ${locale}`, visit("/", { country, headers: acceptLanguage ? { "accept-language": acceptLanguage } : {} }), (r) => prompt(r, locale));
  }
  await expect("FR internal click still prompts", visit("/compare/", { country: "FR", headers: { "sec-fetch-site": "same-origin" } }), (r) => prompt(r, "fr"));
  await expect("FR prompt ignores conditional requests", visit("/", { country: "FR", headers: { "if-none-match": "*" } }), (r) => prompt(r, "fr"));
  await expect("FR after accepting redirects", visit("/", { country: "FR", headers: { cookie: "dictivo_lang=fr" } }), (r) => [status(r, 302), location(r, "/fr/")]);
  await expect("FR after staying in English", visit("/", { country: "FR", headers: { cookie: "dictivo_lang=en" } }), (r) => [status(r, 200), route(r, "cookie:en"), noPrompt(r)]);
  await expect("FR crawler sees no prompt", visit("/", { country: "FR", headers: { "user-agent": GOOGLEBOT } }), (r) => [status(r, 200), noPrompt(r)]);
} else {
  const plain = await visit("/");
  await expect("test country header is ignored in production", visit("/", { country: "JP" }), (r) => [
    r.status !== plain.status && `status ${r.status} != ${plain.status}`,
    r.headers.get("x-dictivo-locale-route") !== plain.headers.get("x-dictivo-locale-route") && "route header differs",
  ]);
}

if (failures.length) {
  console.error(`Language routing check failed:\n${failures.map((line) => `  - ${line}`).join("\n")}`);
  process.exit(1);
}
console.log(`Language routing check passed against ${base}.`);
