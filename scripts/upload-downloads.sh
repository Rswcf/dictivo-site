#!/usr/bin/env bash
set -euo pipefail

BUCKET="${BUCKET:-dictivo-downloads}"
DOMAIN="${DOMAIN:-downloads.dictivo.app}"
ZONE_ID="${ZONE_ID:-${CLOUDFLARE_ZONE_ID:-}}"
SOURCE_DIR="${SOURCE_DIR:-/tmp/dictivo-r2-upload}"
CACHE_CONTROL="${CACHE_CONTROL:-public, max-age=31536000, immutable}"
INCLUDE_WINDOWS="${INCLUDE_WINDOWS:-0}"

required_files=(
  "Dictivo-macOS-universal.dmg"
)

if [[ "$INCLUDE_WINDOWS" == "1" ]]; then
  required_files+=(
    "Dictivo-Windows-x64.exe"
    "Dictivo-Windows-x64.msi"
  )
fi

for file in "${required_files[@]}"; do
  if [[ ! -f "$SOURCE_DIR/$file" ]]; then
    echo "Missing $SOURCE_DIR/$file" >&2
    exit 1
  fi
done

if ! npx wrangler r2 bucket info "$BUCKET" >/dev/null 2>&1; then
  npx wrangler r2 bucket create "$BUCKET"
fi

if ! npx wrangler r2 bucket domain list "$BUCKET" | grep -F "$DOMAIN" >/dev/null 2>&1; then
  if [[ -z "$ZONE_ID" ]]; then
    echo "Missing ZONE_ID or CLOUDFLARE_ZONE_ID for adding $DOMAIN." >&2
    exit 1
  fi
  npx wrangler r2 bucket domain add "$BUCKET" --domain "$DOMAIN" --zone-id "$ZONE_ID" --min-tls 1.2 --force
fi

npx wrangler r2 object put "$BUCKET/Dictivo-macOS-universal.dmg" \
  --file "$SOURCE_DIR/Dictivo-macOS-universal.dmg" \
  --content-type "application/x-apple-diskimage" \
  --content-disposition "attachment; filename=\"Dictivo-macOS-universal.dmg\"" \
  --cache-control "$CACHE_CONTROL" \
  --remote

if [[ "$INCLUDE_WINDOWS" == "1" ]]; then
  npx wrangler r2 object put "$BUCKET/Dictivo-Windows-x64.exe" \
    --file "$SOURCE_DIR/Dictivo-Windows-x64.exe" \
    --content-type "application/vnd.microsoft.portable-executable" \
    --content-disposition "attachment; filename=\"Dictivo-Windows-x64.exe\"" \
    --cache-control "$CACHE_CONTROL" \
    --remote

  npx wrangler r2 object put "$BUCKET/Dictivo-Windows-x64.msi" \
    --file "$SOURCE_DIR/Dictivo-Windows-x64.msi" \
    --content-type "application/x-msi" \
    --content-disposition "attachment; filename=\"Dictivo-Windows-x64.msi\"" \
    --cache-control "$CACHE_CONTROL" \
    --remote
else
  echo "Skipping Windows upload. Set INCLUDE_WINDOWS=1 only after Windows public release approval."
fi

for file in "${required_files[@]}"; do
  echo "https://$DOMAIN/$file"
done
