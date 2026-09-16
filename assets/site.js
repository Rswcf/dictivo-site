document.querySelectorAll(".hero-film").forEach((film) => {
  const posterButton = film.querySelector(".hero-video-poster");
  const video = film.querySelector("video");

  if (!posterButton || !video) {
    return;
  }

  posterButton.hidden = false;
  video.hidden = true;

  posterButton.addEventListener("click", () => {
    if (!video.getAttribute("src")) {
      video.setAttribute("src", video.dataset.src);
    }

    posterButton.hidden = true;
    video.hidden = false;
    video.focus({ preventScroll: true });

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        video.focus({ preventScroll: true });
      });
    }
  });
});

const platform = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();
let recommendedPlatform = "";

if (platform.includes("mac")) {
  recommendedPlatform = "macos";
} else if (platform.includes("win")) {
  recommendedPlatform = "windows";
}

if (recommendedPlatform) {
  document.querySelector(`[data-platform-card="${recommendedPlatform}"]`)?.setAttribute("data-recommended", "true");
}

function normalizeDownloadPlatform(value) {
  const platform = String(value || "").toLowerCase();
  if (platform.includes("win")) return "windows";
  if (platform.includes("mac")) return "macos";
  return platform || "unknown";
}

function referrerHost() {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname;
    if (["dictivo.app", "www.dictivo.app"].includes(host)) return "";
    return host && host !== window.location.hostname ? host : "";
  } catch {
    return "";
  }
}

function cleanReferrer(value) {
  try {
    if (!value) return undefined;
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

function createAnalyticsVisitId() {
  try {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID().replace(/-/g, "");
    }
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  } catch {
    return undefined;
  }
}

// One id per page load. It links this page view to its CTA and redirect but is
// never persisted in cookies, localStorage, or a cross-page browser profile.
const analyticsInstrumentationVersion = "web-linked-v1";
const analyticsVisitId = createAnalyticsVisitId();
const isPublicSite = ["dictivo.app", "www.dictivo.app"].includes(window.location.hostname);

function campaignValue(value) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 120) || undefined;
}

function readPageAttribution() {
  const params = new URLSearchParams(window.location.search);
  const referral = referrerHost();
  return {
    source: campaignValue(params.get("utm_source")) || referral || "direct",
    medium: campaignValue(params.get("utm_medium")) || (referral ? "referral" : "direct"),
    campaign: campaignValue(params.get("utm_campaign")),
    content: campaignValue(params.get("utm_content")),
    term: campaignValue(params.get("utm_term")),
  };
}

const pageAttribution = readPageAttribution();

// Carry only campaign metadata through a user-initiated internal navigation.
// No visit id crosses pages; no cookie or browser storage is created. Keep the
// static links clean for crawlers. Checkout receives only a registered channel.
function checkoutChannel(source) {
  const value = String(source || "").toLowerCase();
  const channels = ["google", "bing", "chatgpt", "perplexity", "claude", "gemini", "copilot", "reddit", "hackernews", "producthunt", "alternativeto", "setapp", "github", "x", "linkedin", "youtube", "tiktok", "instagram", "facebook", "threads", "newsletter", "email", "partner", "affiliate", "podcast", "directory", "qiita", "zenn", "note", "zhihu", "xiaohongshu", "bilibili", "wechat"];
  if (channels.includes(value)) return value;
  const hosts = {
    "www.google.com": "google", "google.com": "google", "www.google.co.jp": "google",
    "www.google.de": "google", "www.bing.com": "bing", "bing.com": "bing",
    "chatgpt.com": "chatgpt", "chat.openai.com": "chatgpt", "www.perplexity.ai": "perplexity", "perplexity.ai": "perplexity",
    "claude.ai": "claude", "gemini.google.com": "gemini", "copilot.microsoft.com": "copilot",
    "www.reddit.com": "reddit", "reddit.com": "reddit", "old.reddit.com": "reddit",
    "news.ycombinator.com": "hackernews", "hn": "hackernews", "producthunt.com": "producthunt", "www.producthunt.com": "producthunt",
    "alternativeto.net": "alternativeto", "setapp.com": "setapp", "github.com": "github",
    "twitter": "x", "twitter.com": "x", "x.com": "x", "t.co": "x",
    "www.linkedin.com": "linkedin", "linkedin.com": "linkedin", "www.youtube.com": "youtube", "youtube.com": "youtube",
    "qiita.com": "qiita", "zenn.dev": "zenn", "note.com": "note"
  };
  return Object.hasOwn(hosts, value) ? hosts[value] : null;
}

function carryCampaign(event) {
  if (event.defaultPrevented || !event.isTrusted) return;
  const link = event.target.closest?.("a[href]");
  if (!link || link.hasAttribute("download") || link.classList.contains("download-link")) return;
  const href = new URL(link.href, window.location.href);
  if (href.origin !== window.location.origin || !/^https?:$/.test(href.protocol)) return;
  if (/^\/checkout\/(local|cloud-fast|local-renewal)\/?$/.test(href.pathname)) {
    const channel = checkoutChannel(pageAttribution.source);
    if (isPublicSite && channel && !href.searchParams.has("checkout[custom][channel]")) {
      href.searchParams.set("checkout[custom][channel]", channel);
      link.href = href.toString();
    }
    return;
  }
  if (href.pathname === window.location.pathname || /^\/(checkout|download|downloads)\//.test(href.pathname)) return;
  if (!href.pathname.endsWith("/") && !href.pathname.endsWith(".html")) return;
  if (href.searchParams.has("utm_source") || pageAttribution.source === "direct") return;
  for (const key of ["source", "medium", "campaign", "content", "term"]) {
    if (pageAttribution[key]) href.searchParams.set(`utm_${key}`, pageAttribution[key]);
  }
  link.href = href.toString();
}

document.addEventListener("click", carryCampaign);
document.addEventListener("auxclick", carryCampaign);

function pageViewPayload() {
  return {
    event: "page_view",
    visitId: analyticsVisitId,
    instrumentationVersion: analyticsInstrumentationVersion,
    path: window.location.pathname || "/",
    locale: document.documentElement.lang || undefined,
    ...pageAttribution,
    referrer: cleanReferrer(document.referrer),
  };
}

function sendPageView() {
  if (!isPublicSite) return;
  const endpoint = "https://api.dictivo.app/v1/analytics/page-view";
  const body = JSON.stringify(pageViewPayload());

  try {
    if (navigator.sendBeacon?.(endpoint, body)) return;
  } catch {
    // Fall through to fetch with keepalive.
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body,
    keepalive: true,
    credentials: "include",
  }).catch(() => {});
}

sendPageView();

function downloadEventPayload(link) {
  const href = new URL(link.href, window.location.href);
  const platform = normalizeDownloadPlatform(link.dataset.platform || href.pathname);
  const artifact = link.dataset.artifact || href.searchParams.get("artifact") || (platform === "macos" ? "dmg" : "nsis");

  return {
    event: "download_cta_clicked",
    visitId: analyticsVisitId,
    instrumentationVersion: analyticsInstrumentationVersion,
    platform,
    releaseVersion:
      link.dataset.releaseVersion ||
      href.searchParams.get("version") ||
      href.searchParams.get("releaseVersion") ||
      href.searchParams.get("tag") ||
      undefined,
    artifact,
    source: href.searchParams.get("utm_source") || "site",
    medium: href.searchParams.get("utm_medium") || "download_cta",
    campaign: href.searchParams.get("utm_campaign") || undefined,
    content: link.dataset.downloadContent || href.searchParams.get("utm_content") || undefined,
    term: href.searchParams.get("utm_term") || undefined,
    referrer: cleanReferrer(window.location.href),
  };
}

function sendDownloadClick(link) {
  let href;
  try {
    href = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (!href.pathname.includes("/download/")) return;

  // Release version and CTA position already have their own fields. Attribute
  // the click and redirect to the same channel as this page, not "site".
  for (const key of ["source", "medium", "campaign", "term"]) {
    if (pageAttribution[key]) href.searchParams.set(`utm_${key}`, pageAttribution[key]);
    else href.searchParams.delete(`utm_${key}`);
  }

  if (analyticsVisitId) {
    href.searchParams.set("visitId", analyticsVisitId);
  }
  href.searchParams.set("instrumentationVersion", analyticsInstrumentationVersion);
  link.href = href.toString();

  if (!isPublicSite) return;

  const endpoint = new URL("/v1/analytics/download-events", href.origin).toString();
  const body = JSON.stringify(downloadEventPayload(link));

  try {
    if (navigator.sendBeacon?.(endpoint, body)) return;
  } catch {
    // Fall through to fetch with keepalive.
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body,
    keepalive: true,
    credentials: "include",
  }).catch(() => {});
}

document.querySelectorAll("a.download-link").forEach((link) => {
  link.addEventListener("click", () => sendDownloadClick(link));
});

function fillTemplate(template, values) {
  return String(template || "").replace(/\{([a-z]+)\}/gi, (_match, key) => values[key] ?? "");
}

// A plain target for the desktop app's paste action. Never read practice text
// for analytics, send it over the network, or persist it in browser storage.
document.querySelectorAll("[data-dictation-practice]").forEach((root) => {
  const field = root.querySelector("[data-practice-text]");
  const status = root.querySelector("[data-practice-status]");
  const buttons = root.querySelectorAll("[data-practice-sample]");
  if (!field || !status) return;
  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((item) => {
      const selected = item === button;
      item.setAttribute("aria-pressed", String(selected));
      const sample = root.querySelector(`#${item.dataset.practiceSample}`);
      if (sample) sample.hidden = !selected;
    });
  }));
  root.querySelector("[data-practice-clear]")?.addEventListener("click", () => {
    field.value = "";
    status.textContent = status.dataset.clearedMessage;
    field.focus();
  });
  window.addEventListener("pagehide", () => { field.value = ""; });
});

function initMacAdvisor(root) {
  const dataNode = root.querySelector("[data-mac-advisor-json]");
  const familySelect = root.querySelector("[data-mac-family]");
  const memorySelect = root.querySelector("[data-mac-memory]");
  if (!dataNode || !familySelect || !memorySelect) return;

  let data;
  try {
    data = JSON.parse(dataNode.textContent || "{}");
  } catch {
    return;
  }

  const familyById = new Map((data.families || []).map((family) => [family.id, family]));
  const memoryById = new Map((data.memory || []).map((memory) => [memory.id, memory]));
  const copy = data.copy || {};

  const resultNodes = {
    title: root.querySelector("[data-mac-title]"),
    summary: root.querySelector("[data-mac-summary]"),
    fit: root.querySelector("[data-mac-fit]"),
    tier: root.querySelector("[data-mac-tier]"),
    dailyModel: root.querySelector("[data-mac-daily-model]"),
    qualityModel: root.querySelector("[data-mac-quality-model]"),
    cloud: root.querySelector("[data-mac-cloud]"),
    note: root.querySelector("[data-mac-note]"),
  };

  function memoryLabel(id) {
    return memoryById.get(id)?.label || id;
  }

  function currentFamily() {
    return familyById.get(familySelect.value) || data.families?.[0];
  }

  function setText(node, value) {
    if (node) node.textContent = value || "";
  }

  function syncMemoryOptions() {
    const family = currentFamily();
    if (!family) return;
    const previous = memorySelect.value;
    const options = family.memoryOptions || [];
    memorySelect.textContent = "";
    for (const id of options) {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = memoryLabel(id);
      memorySelect.appendChild(option);
    }
    memorySelect.value = options.includes(previous) ? previous : family.defaultMemoryId || options[0] || "";
  }

  function renderResult() {
    const family = currentFamily();
    if (!family) return;
    const memoryId = family.memoryOptions?.includes(memorySelect.value) ? memorySelect.value : family.defaultMemoryId;
    const profileId = family.profiles?.[memoryId] || family.profiles?.[family.defaultMemoryId] || family.profiles?.unknown;
    const profile = data.profiles?.[profileId];
    if (!profile) return;

    const memory = memoryLabel(memoryId);
    setText(resultNodes.title, fillTemplate(copy.resultTitle, { mac: family.label, memory }));
    setText(resultNodes.summary, copy.fitSummary?.[profile.fit]);
    setText(resultNodes.fit, copy.fit?.[profile.fit]);
    setText(resultNodes.tier, copy.tierNames?.[profile.tier]);
    setText(resultNodes.dailyModel, profile.dailyModel);
    setText(resultNodes.qualityModel, profile.qualityModel);
    setText(resultNodes.cloud, copy.cloud?.[profile.cloud]);
    setText(resultNodes.note, copy.notes?.[profile.note]);
  }

  familySelect.addEventListener("change", () => {
    syncMemoryOptions();
    renderResult();
  });
  memorySelect.addEventListener("change", renderResult);
  syncMemoryOptions();
  renderResult();
}

document.querySelectorAll("[data-mac-advisor]").forEach(initMacAdvisor);

const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
const initialAnchorTarget = location.hash ? document.querySelector(location.hash) : null;

if (initialAnchorTarget?.classList.contains("reveal")) {
  initialAnchorTarget.classList.add("is-in");
}

if (reveals.length && !prefersReducedMotion && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// The dedicated film page keeps a native player even when JavaScript is disabled.
const productFilm = document.querySelector('#product-film');
if (productFilm) {
  let chapterRequest = 0;
  async function seekFilm(seconds, play) {
    const request = ++chapterRequest;
    if (!Number.isFinite(seconds) || seconds < 0 || seconds >= 35) return;
    try {
      if (productFilm.readyState < 1) {
        await new Promise((resolve, reject) => {
          const cleanup = () => { productFilm.removeEventListener('loadedmetadata', ready); productFilm.removeEventListener('error', failed); };
          const ready = () => { cleanup(); resolve(); };
          const failed = () => { cleanup(); reject(new Error('Media unavailable')); };
          productFilm.addEventListener('loadedmetadata', ready, { once: true });
          productFilm.addEventListener('error', failed, { once: true });
          productFilm.preload = 'metadata';
          productFilm.load();
        });
      }
      if (request !== chapterRequest) return;
      productFilm.currentTime = Math.min(seconds, productFilm.duration - .05);
      if (play) {
        productFilm.focus({ preventScroll: true });
        await productFilm.play();
      }
    } catch {
      productFilm.focus({ preventScroll: true });
    }
  }
  const initialTime = new URL(location.href).searchParams.get('t');
  if (initialTime !== null) void seekFilm(Number(initialTime), false);
  document.querySelectorAll('[data-film-time]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const seconds = Number(link.dataset.filmTime);
      const url = new URL(location.href); url.searchParams.set('t', String(seconds));
      history.pushState(null, '', url);
      void seekFilm(seconds, true);
    });
  });
  window.addEventListener('popstate', () => void seekFilm(Number(new URL(location.href).searchParams.get('t') || 0), false));
}
