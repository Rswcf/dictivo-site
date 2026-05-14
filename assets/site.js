const demos = {
  scan: {
    label: "Hardware scan",
    title: "Detect the right local engine.",
    description:
      "The first-run scan keeps setup grounded in the machine in front of you instead of pushing users into an account flow.",
    points: [
      "Hardware-aware local engine recommendation",
      "No sign-up gate before setup",
      "Progress lives on the same dark product canvas",
    ],
    image: "/assets/ui/01-onboarding-scan.png",
    alt: "Dictivo onboarding screen scanning local hardware",
    caption: "Onboarding scan, hardware check visible.",
  },
  tiers: {
    label: "Setup flow",
    title: "Onboard without a sign-up.",
    description:
      "Pick the right local engine and test your microphone before the first dictation — no account creation required.",
    points: [
      "Pick your engine size during onboarding",
      "Test the microphone before the first dictation",
      "No account creation, no email collection",
    ],
    image: "/assets/ui/02-onboarding-tiers.png",
    alt: "Dictivo onboarding screen showing local engine tiers",
    caption: "Onboarding flow, local engine tier selection.",
  },
  idle: {
    label: "Idle dictation surface",
    title: "Start from a calm recording state.",
    description:
      "The main surface exposes shortcuts, language state, and engine status before a recording starts.",
    points: [
      "Primary command and shortcuts are visible immediately",
      "Language selector stays in the top-right control cluster",
      "Engine readiness is shown in the lower status rail",
    ],
    image: "/assets/ui/03-dictation-idle.png",
    alt: "Dictivo idle dictation screen before recording",
    caption: "Dictation idle view, shortcuts and status visible.",
  },
  dictation: {
    label: "Live dictation surface",
    title: "Capture speech into clean text.",
    description:
      "Dictivo keeps the active transcript close to the work surface and makes the recording state visible at a glance.",
    points: [
      "Live transcript pinned to your work surface",
      "Visible recording state with audio meter",
      "Switch Standard ↔ Accurate without losing audio",
    ],
    image: "/assets/ui/04-dictation-transcript.png",
    alt: "Dictivo dictation screen with an active transcript",
    caption: "Dictation view, transcript visible.",
  },
  history: {
    label: "Session history",
    title: "Every transcript stays searchable.",
    description:
      "The history view keeps previous dictations reachable for review, reuse, and cleanup without leaving the desktop app.",
    points: [
      "Searchable archive of every transcript",
      "Tagged with date, duration, engine used",
      "Delete one entry or wipe everything in one click",
    ],
    image: "/assets/ui/05-history.png",
    alt: "Dictivo history screen with saved dictation sessions",
    caption: "History view, saved sessions listed.",
  },
  dictionary: {
    label: "Local dictionary",
    title: "Keep reusable terms close.",
    description:
      "The dictionary pane makes product names, snippets, and corrections part of the local workflow.",
    points: [
      "Personal terms stay on the same device",
      "Entries sit beside history and settings in the product nav",
      "Dense rows keep the surface scannable",
    ],
    image: "/assets/ui/06-dictionary.png",
    alt: "Dictivo dictionary screen with local terms",
    caption: "Dictionary view, local terms visible.",
  },
  engine: {
    label: "Local engine settings",
    title: "Inspect the model on disk.",
    description:
      "The engine settings make storage, model status, and download controls visible instead of hiding the local dependency.",
    points: [
      "Local model path and version are surfaced",
      "Download state is handled inside the app UI",
      "Storage details sit next to privacy controls",
    ],
    image: "/assets/ui/07-settings-local-engine.png",
    alt: "Dictivo settings screen for the local speech engine",
    caption: "Settings view, local engine controls visible.",
  },
  privacy: {
    label: "Local privacy controls",
    title: "See exactly what's on disk.",
    description:
      "The settings surface exposes the local engine path, every file Dictivo writes, and every outbound request it makes.",
    points: [
      "Inspect every file Dictivo writes to disk",
      "One-click reveal of every outbound request",
      "Export or destroy local data anytime",
    ],
    image: "/assets/ui/08-settings-privacy.png",
    alt: "Dictivo privacy settings screen",
    caption: "Settings view, privacy controls visible.",
  },
  companionSettings: {
    label: "Companion settings",
    title: "Tune the floating companion.",
    description:
      "Companion settings expose the small overlay behavior without changing the core dictation surface.",
    points: [
      "Overlay behavior is configured in settings",
      "Controls reuse the same purple active state",
      "Every setting remains on the product canvas",
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
      "Secondary copy explains permission boundaries",
    ],
    image: "/assets/ui/10-settings-hotkeys.png",
    alt: "Dictivo hotkey settings screen",
    caption: "Settings view, hotkey controls visible.",
  },
  companionLive: {
    label: "Floating companion",
    title: "Keep status visible while you work.",
    description:
      "The companion overlay keeps recording state and the current shortcut available outside the main window.",
    points: [
      "Small overlay mirrors the active dictation state",
      "Shortcut guidance remains visible during capture",
      "Main transcript and companion render together",
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
