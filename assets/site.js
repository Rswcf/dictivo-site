const demos = {
  scan: {
    label: "Hardware scan",
    title: "Choose the right local model.",
    description:
      "The first-run scan keeps Local mode grounded in the machine in front of you instead of pushing users into an account flow.",
    points: [
      "Hardware-aware local engine recommendation",
      "No sign-up gate before setup",
      "Fast, Medium, and Quality are calibrated to your hardware",
    ],
    image: "/assets/ui/01-onboarding-scan.png",
    alt: "Dictivo onboarding screen scanning local hardware",
    caption: "Onboarding scan, hardware check visible.",
  },
  tiers: {
    label: "Setup flow",
    title: "Set up private dictation first.",
    description:
      "Pick the right local model and test your microphone before the first dictation. Cloud Fast can be added later.",
    points: [
      "Start from Local mode by default",
      "Test the microphone before the first dictation",
      "No cloud transcription requirement for setup",
    ],
    image: "/assets/ui/02-onboarding-tiers.png",
    alt: "Dictivo onboarding screen showing local engine tiers",
    caption: "Onboarding flow, local engine tier selection.",
  },
  idle: {
    label: "Idle dictation surface",
    title: "Start from a calm Local state.",
    description:
      "The main surface exposes shortcuts, language state, engine status, and the Local / Cloud Fast switch before recording starts.",
    points: [
      "Primary command and shortcuts are visible immediately",
      "Local and Cloud Fast are explicit mode choices",
      "Engine readiness is shown in the lower status rail",
    ],
    image: "/assets/ui/03-dictation-idle.png",
    alt: "Dictivo idle dictation screen before recording",
    caption: "Dictation idle view, shortcuts and status visible.",
  },
  dictation: {
    label: "Dictation surface",
    title: "Capture speech without leaving your work.",
    description:
      "Choose Local for private work or Cloud Fast for speed before you record.",
    points: [
      "Start and stop from a global hotkey",
      "Local mode keeps audio on your Mac",
      "Cloud Fast runs only when you select it",
    ],
    image: "/assets/ui/04-dictation-transcript.png",
    alt: "Dictivo dictation screen with an active transcript",
    caption: "Dictation view, transcript visible.",
  },
  history: {
    label: "Session history",
    title: "Transcripts stay searchable on your machine.",
    description:
      "The history view keeps previous dictations reachable for review, reuse, and cleanup without turning Dictivo into a cloud archive.",
    points: [
      "Searchable archive of every transcript",
      "Tagged with date, duration, and privacy mode",
      "Delete one entry or wipe everything in one click",
    ],
    image: "/assets/ui/05-history.png",
    alt: "Dictivo history screen with saved dictation sessions",
    caption: "History view, saved sessions listed.",
  },
  dictionary: {
    label: "Local dictionary",
    title: "Keep reusable terms local.",
    description:
      "Names, terms, and snippets stay in the desktop app so your personal vocabulary remains local.",
    points: [
      "Personal terms stay on the same device",
      "Snippets are applied after transcription",
      "Personal vocabulary stays local",
    ],
    image: "/assets/ui/06-dictionary.png",
    alt: "Dictivo dictionary screen with local terms",
    caption: "Dictionary view, local terms visible.",
  },
  engine: {
    label: "Engine settings",
    title: "Separate Local setup from Cloud Fast.",
    description:
      "Local model controls appear only when Local is selected. Cloud Fast shows subscription and privacy status instead.",
    points: [
      "Local model tiers are hidden in Cloud Fast mode",
      "Text cleanup is shared across both modes",
      "Local and Cloud Fast stay clearly separated",
    ],
    image: "/assets/ui/07-settings-local-engine.png",
    alt: "Dictivo settings screen for the local speech engine",
    caption: "Settings view, local engine controls visible.",
  },
  privacy: {
    label: "Privacy controls",
    title: "Know when audio leaves your Mac.",
    description:
      "Local and Cloud Fast are separate choices, so you know when a recording stays local and when it is uploaded for speed.",
    points: [
      "Local keeps audio on this device",
      "Cloud Fast uploads selected recordings",
      "Permissions remain inspectable inside settings",
    ],
    image: "/assets/ui/08-settings-privacy.png",
    alt: "Dictivo privacy settings screen",
    caption: "Settings view, privacy controls visible.",
  },
  companionSettings: {
    label: "Companion settings",
    title: "Choose the companion style.",
    description:
      "The floating companion can stay a quiet status card or become an animated desktop pet.",
    points: [
      "Normal status card for work-focused use",
      "Animated pet mode for a more visible companion",
      "Custom avatar support stays in settings",
    ],
    image: "/assets/ui/09-settings-companion.png",
    alt: "Dictivo companion settings screen",
    caption: "Settings view, companion controls visible.",
  },
  hotkeys: {
    label: "Shortcut settings",
    title: "Make global capture predictable.",
    description:
      "The hotkey pane keeps keyboard capture explicit, reviewable, and consistent with the rest of the settings UI.",
    points: [
      "Global shortcut rows are grouped by task",
      "Keyboard tokens match the main dictation surface",
      "Start/stop and paste-last remain separate controls",
    ],
    image: "/assets/ui/10-settings-hotkeys.png",
    alt: "Dictivo hotkey settings screen",
    caption: "Settings view, hotkey controls visible.",
  },
  companionLive: {
    label: "Floating companion",
    title: "Show status outside the main window.",
    description:
      "The companion appears during recording, processing, and completion so hotkey-driven dictation still feels visible.",
    points: [
      "Small overlay mirrors recording and processing state",
      "Shortcut guidance remains visible during capture",
      "Completion state keeps the last transcript result visible",
    ],
    image: "/assets/ui/11-dictation-with-companion.png",
    alt: "Dictivo dictation screen with the companion overlay visible",
    caption: "Dictation view, companion overlay visible.",
  },
};

const tabs = document.querySelectorAll("[data-demo-target]");
const screen = document.querySelector("#demoScreen");
const label = document.querySelector("#demoLabel");
const title = document.querySelector("#demoTitle");
const description = document.querySelector("#demoDescription");
const caption = document.querySelector("#demoCaption");
const points = document.querySelector("#demoPoints");

function setDemo(name) {
  const demo = demos[name];
  if (!demo || !screen || !label || !title || !description || !caption) {
    return;
  }

  tabs.forEach((tab) => {
    const selected = tab.dataset.demoTarget === name;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", selected ? "true" : "false");
  });

  screen.src = demo.image;
  screen.alt = demo.alt;
  label.textContent = demo.label;
  title.textContent = demo.title;
  description.textContent = demo.description;
  caption.textContent = demo.caption;

  if (points && Array.isArray(demo.points)) {
    points.innerHTML = "";
    for (const point of demo.points) {
      const li = document.createElement("li");
      li.textContent = point;
      points.appendChild(li);
    }
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setDemo(tab.dataset.demoTarget);
  });
});

document.querySelectorAll(".hero-film").forEach((film) => {
  const posterButton = film.querySelector(".hero-video-poster");
  const video = film.querySelector("video[data-src]");

  if (!posterButton || !video) {
    return;
  }

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

function downloadEventPayload(link) {
  const href = new URL(link.href, window.location.href);
  const platform = normalizeDownloadPlatform(link.dataset.platform || href.pathname);
  const artifact = link.dataset.artifact || href.searchParams.get("artifact") || (platform === "macos" ? "dmg" : "nsis");

  return {
    event: "download_cta_clicked",
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
    referrer: window.location.href,
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
