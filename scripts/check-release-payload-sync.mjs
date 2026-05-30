import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);
const tempDir = mkdtempSync(join(tmpdir(), "dictivo-site-release-sync-"));

try {
  const outputPath = join(tempDir, "release.json");
  writeFileSync(outputPath, JSON.stringify({ publicWindowsDownloads: false }, null, 2) + "\n");

  const release = {
    schema: "dictivo-site-release.v1",
    tag: "v9.8.7",
    version: "9.8.7",
    channel: "stable",
    updatedAt: "2026-05-30",
    publishedAt: "2026-05-30T12:00:00Z",
    releaseUrl: null,
    dmg: {
      fileName: "Dictivo_9.8.7_universal.dmg",
      url: "https://downloads.dictivo.app/v9.8.7/Dictivo_9.8.7_universal.dmg",
      sha256: "a".repeat(64),
      size: 12345678,
    },
    windows: {
      exe: {
        fileName: "Dictivo_9.8.7_x64-setup.exe",
        url: "https://downloads.dictivo.app/v9.8.7/Dictivo_9.8.7_x64-setup.exe",
        sha256: "b".repeat(64),
        size: 23456789,
      },
      msi: {
        fileName: "Dictivo_9.8.7_x64_en-US.msi",
        url: "https://downloads.dictivo.app/v9.8.7/Dictivo_9.8.7_x64_en-US.msi",
        sha256: "c".repeat(64),
        size: 34567890,
      },
    },
  };

  runSync({
    outputPath,
    payload: { release },
  });

  const manifest = JSON.parse(readFileSync(outputPath, "utf8"));
  assertEqual(manifest.tag, "v9.8.7", "tag");
  assertEqual(manifest.version, "9.8.7", "version");
  assertEqual(manifest.releaseUrl, null, "releaseUrl");
  assertEqual(manifest.publicWindowsDownloads, false, "publicWindowsDownloads");
  assertEqual(manifest.dmg.sha256, "a".repeat(64), "dmg.sha256");
  assertEqual(manifest.windows.exe.fileName, "Dictivo_9.8.7_x64-setup.exe", "windows.exe.fileName");
  assertEqual(manifest.windows.msi.size, 34567890, "windows.msi.size");

  const bad = structuredClone(release);
  bad.dmg.url = "https://github.com/Rswcf/Dictivo/releases/download/v9.8.7/Dictivo_9.8.7_universal.dmg";
  const failed = runSync({
    outputPath: join(tempDir, "bad-release.json"),
    payload: { release: bad },
    expectFailure: true,
  });
  if (!failed.stderr.includes("must point at https://downloads.dictivo.app/v9.8.7/")) {
    throw new Error("Expected invalid release payload to reject non-R2 artifact URL.");
  }

  console.log("Release payload sync check passed.");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

function runSync({ outputPath, payload, expectFailure = false }) {
  const result = spawnSync(process.execPath, ["scripts/sync-latest-release.mjs"], {
    cwd: root,
    env: {
      ...process.env,
      DICTIVO_RELEASE_OUTPUT_PATH: outputPath,
      DICTIVO_RELEASE_PAYLOAD: JSON.stringify(payload),
      DICTIVO_DESKTOP_TOKEN: "",
      GITHUB_TOKEN: "",
    },
    encoding: "utf8",
  });

  if (expectFailure) {
    if (result.status === 0) {
      throw new Error("Expected sync-latest-release.mjs to fail, but it passed.");
    }
    return result;
  }

  if (result.status !== 0) {
    throw new Error(`sync-latest-release.mjs failed:\n${result.stdout}\n${result.stderr}`);
  }
  return result;
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}
