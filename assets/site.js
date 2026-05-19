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
      "Local and Cloud Fast sit in one switch. Users choose the privacy posture before each recording.",
    points: [
      "Global start / stop hotkey",
      "Local mode keeps audio on this device",
      "Cloud Fast is available only when the user chooses it",
    ],
    image: "/assets/ui/04-dictation-transcript.png",
    alt: "Dictivo dictation screen with an active transcript",
    caption: "Dictation view, transcript visible.",
  },
  history: {
    label: "Session history",
    title: "Transcripts stay searchable on your machine.",
    description:
      "The history view keeps previous dictations reachable for review, reuse, and cleanup without turning the site into a cloud archive.",
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
      "Dictionary terms and snippets stay in the desktop app. Cloud Fast receives audio only; text cleanup happens after the transcript returns.",
    points: [
      "Personal terms stay on the same device",
      "Snippets are applied after transcription",
      "No provider-facing custom vocabulary upload",
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
      "Cloud provider details stay out of the UI",
    ],
    image: "/assets/ui/07-settings-local-engine.png",
    alt: "Dictivo settings screen for the local speech engine",
    caption: "Settings view, local engine controls visible.",
  },
  privacy: {
    label: "Privacy controls",
    title: "Make the upload boundary visible.",
    description:
      "Privacy copy distinguishes Local from Cloud Fast instead of claiming the whole product is always local.",
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

const platform = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();
let recommendedPlatform = "";

if (platform.includes("mac")) {
  recommendedPlatform = "macos";
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
