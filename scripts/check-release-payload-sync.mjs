import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";

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

  // The cross-check against GitHub: a payload whose checksum contradicts the
  // uploaded asset must be refused, one that matches must pass, and no token
  // means no check. GitHub is stood in for by a local server.
  const releaseAssets = [
    { name: release.dmg.fileName, digest: `sha256:${release.dmg.sha256}`, size: release.dmg.size },
    { name: release.windows.exe.fileName, digest: `sha256:${release.windows.exe.sha256}`, size: release.windows.exe.size },
    { name: release.windows.msi.fileName, digest: `sha256:${release.windows.msi.sha256}`, size: release.windows.msi.size },
  ];
  await withFakeGitHub({ assets: releaseAssets }, async (apiBase) => {
    await runSyncAsync({
      outputPath: join(tempDir, "cross-checked.json"),
      payload: { release },
      env: { DICTIVO_GITHUB_API_BASE: apiBase, GITHUB_TOKEN: "test-token" },
    });
  });
  const stapledLater = structuredClone(releaseAssets);
  stapledLater[0].digest = `sha256:${"d".repeat(64)}`;
  await withFakeGitHub({ assets: stapledLater }, async (apiBase) => {
    const refused = await runSyncAsync({
      outputPath: join(tempDir, "contradicted.json"),
      payload: { release },
      env: { DICTIVO_GITHUB_API_BASE: apiBase, GITHUB_TOKEN: "test-token" },
      expectFailure: true,
    });
    if (!refused.stderr.includes("contradicts the published assets") || !refused.stderr.includes(release.dmg.fileName)) {
      throw new Error(`Expected the contradicted DMG checksum to be refused, got:\n${refused.stderr}`);
    }
  });

  console.log("Release payload sync check passed.");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

function runSync({ outputPath, payload, expectFailure = false, env = {} }) {
  const result = spawnSync(process.execPath, ["scripts/sync-latest-release.mjs"], {
    cwd: root,
    env: {
      ...process.env,
      DICTIVO_RELEASE_OUTPUT_PATH: outputPath,
      DICTIVO_RELEASE_PAYLOAD: JSON.stringify(payload),
      DICTIVO_DESKTOP_TOKEN: "",
      GITHUB_TOKEN: "",
      ...env,
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

// spawnSync would block the event loop, and the fake GitHub server that the
// cross-check talks to lives in this very process.
function runSyncAsync({ outputPath, payload, expectFailure = false, env = {} }) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["scripts/sync-latest-release.mjs"], {
      cwd: root,
      env: {
        ...process.env,
        DICTIVO_RELEASE_OUTPUT_PATH: outputPath,
        DICTIVO_RELEASE_PAYLOAD: JSON.stringify(payload),
        DICTIVO_DESKTOP_TOKEN: "",
        GITHUB_TOKEN: "",
        ...env,
      },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (status) => {
      if (expectFailure) {
        if (status === 0) {
          reject(new Error("Expected sync-latest-release.mjs to fail, but it passed."));
          return;
        }
        resolve({ status, stdout, stderr });
        return;
      }
      if (status !== 0) {
        reject(new Error(`sync-latest-release.mjs failed:\n${stdout}\n${stderr}`));
        return;
      }
      resolve({ status, stdout, stderr });
    });
  });
}

async function withFakeGitHub(releaseBody, run) {
  const server = createServer((request, response) => {
    if (request.url === "/repos/Rswcf/Dictivo/releases/tags/v9.8.7") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ tag_name: "v9.8.7", ...releaseBody }));
      return;
    }
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Not Found" }));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}
