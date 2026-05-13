const demos = {
  dictation: {
    label: "Live dictation surface",
    title: "Capture speech into clean text.",
    description:
      "Dictivo keeps the active transcript close to the work surface and makes the recording state visible at a glance.",
    image: "/assets/ui/04-dictation-transcript.png",
    alt: "Dictivo dictation screen with an active transcript",
    caption: "Dictation view, transcript visible.",
  },
  tiers: {
    label: "Setup flow",
    title: "Match the engine to the device.",
    description:
      "Onboarding explains local performance tiers so new users can start with the right model for their hardware.",
    image: "/assets/ui/02-onboarding-tiers.png",
    alt: "Dictivo onboarding screen showing local engine tiers",
    caption: "Onboarding flow, local engine tier selection.",
  },
  history: {
    label: "Session history",
    title: "Keep useful transcripts reachable.",
    description:
      "The history view keeps previous dictations available for review, reuse, and cleanup without leaving the desktop app.",
    image: "/assets/ui/05-history.png",
    alt: "Dictivo history screen with saved dictation sessions",
    caption: "History view, saved sessions listed.",
  },
  privacy: {
    label: "Local privacy settings",
    title: "Make privacy a visible setting.",
    description:
      "The settings surface exposes the local engine path and privacy controls users expect from paid desktop software.",
    image: "/assets/ui/08-settings-privacy.png",
    alt: "Dictivo privacy settings screen",
    caption: "Settings view, privacy controls visible.",
  },
};

const tabs = document.querySelectorAll("[data-demo-target]");
const screen = document.querySelector("#demoScreen");
const label = document.querySelector("#demoLabel");
const title = document.querySelector("#demoTitle");
const description = document.querySelector("#demoDescription");
const caption = document.querySelector("#demoCaption");

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
