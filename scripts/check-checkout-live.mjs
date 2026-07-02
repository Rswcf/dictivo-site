// Live probe: follows each public checkout route with cookie replay and
// fails only on a definitive dead end (404/410 or a redirect loop).
// Lemon Squeezy stores the cart in a cookie set on the 302 — a cookie-less
// client lands on a bare /checkout and gets 404 on EVERY store, so cookie
// replay here is load-bearing, not an optimization.

const ROUTES = [
  ["local", "https://dictivo.app/checkout/local"],
  ["cloud-fast", "https://dictivo.app/checkout/cloud-fast"],
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

async function probe(label, startUrl) {
  let url = startUrl;
  const cookies = new Map();
  for (let hop = 0; hop < 8; hop += 1) {
    const cookieHeader = [...cookies.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
    let res;
    try {
      res = await fetch(url, {
        redirect: "manual",
        headers: { "user-agent": UA, ...(cookieHeader ? { cookie: cookieHeader } : {}) },
      });
    } catch (error) {
      return { label, url, status: 0, verdict: "inconclusive", error: String(error) };
    }
    for (const raw of res.headers.getSetCookie?.() ?? []) {
      const [pair] = raw.split(";");
      const eq = pair.indexOf("=");
      if (eq > 0) cookies.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
    }
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return { label, url, status: res.status, verdict: "fail" };
      url = new URL(location, url).toString();
      continue;
    }
    if (res.status === 200) return { label, url, status: 200, verdict: "pass" };
    if (res.status === 404 || res.status === 410) return { label, url, status: res.status, verdict: "fail" };
    return { label, url, status: res.status, verdict: "inconclusive" };
  }
  return { label, url, status: 0, verdict: "fail" };
}

let failed = false;
for (const [label, route] of ROUTES) {
  const result = await probe(label, route);
  if (result.verdict === "fail") {
    failed = true;
    console.error(`FAIL ${label}: ${result.status} at ${result.url} — checkout appears dead.`);
  } else if (result.verdict === "inconclusive") {
    console.warn(`WARN ${label}: ${result.status} at ${result.url} — inconclusive${result.error ? ` (${result.error})` : " (bot mitigation?)"}, not failing.`);
  } else {
    console.log(`OK ${label}: checkout renders (${result.url}).`);
  }
}
if (failed) process.exit(1);
