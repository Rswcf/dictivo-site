const token = process.env.CLOUDFLARE_API_TOKEN;
const configuredZoneId = process.env.CLOUDFLARE_ZONE_ID;
const zoneName = process.env.CLOUDFLARE_ZONE_NAME || "dictivo.app";
const allowFailure = process.env.ALLOW_PURGE_FAILURE === "true";

if (!token) {
  fail("Missing CLOUDFLARE_API_TOKEN.");
}

const zoneId = configuredZoneId || (await getZoneId(zoneName));
const purge = await cloudflare(`/zones/${zoneId}/purge_cache`, {
  method: "POST",
  body: JSON.stringify({ purge_everything: true }),
});

if (!purge.success) {
  fail(`Cloudflare cache purge failed: ${formatErrors(purge)}`);
}

console.log(`Purged Cloudflare cache for ${zoneName}.`);

async function getZoneId(name) {
  const response = await cloudflare(`/zones?name=${encodeURIComponent(name)}&status=active`);
  const zone = response.result?.[0];
  if (!zone?.id) {
    fail(`Could not find active Cloudflare zone for ${name}: ${formatErrors(response)}`);
  }
  return zone.id;
}

async function cloudflare(path, options = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.success) {
    fail(`Cloudflare API request failed (${response.status}): ${formatErrors(json)}`);
  }
  return json;
}

function formatErrors(payload) {
  const errors = payload?.errors;
  if (!Array.isArray(errors) || errors.length === 0) return "no error details returned";
  return errors.map((error) => error.message || JSON.stringify(error)).join("; ");
}

function fail(message) {
  if (allowFailure) {
    console.warn(`Cloudflare cache purge skipped: ${message}`);
    process.exit(0);
  }
  console.error(message);
  process.exit(1);
}
