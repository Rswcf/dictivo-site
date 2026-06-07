export const BENCHMARK_METHOD_GUIDE_LASTMOD = "2026-06-07";

export const BENCHMARK_METHOD_GUIDE_REFERENCES = [
  ["Dictivo Mac model guide", "https://dictivo.app/mac-model-guide/"],
  ["Dictivo offline dictation guide", "https://dictivo.app/guides/offline-dictation-on-mac/"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  ["Dictivo local dictation network test", "https://dictivo.app/privacy/local-dictation-network-test/"],
  ["Dictivo privacy proof", "https://dictivo.app/privacy-proof/"],
];

export const BENCHMARK_METHOD_GUIDE_COPY = {
  navLabel: "Mac dictation benchmark method",
  metaTitle: "Mac Dictation Benchmark Method: Local Model Speed and Fit",
  metaDescription:
    "How Dictivo benchmarks local Mac dictation speed, maps real-time factor to Fast, Medium, and Quality model tiers, and decides when Cloud Fast is a better fit.",
  eyebrow: "Benchmark method",
  title: "How Dictivo benchmarks local dictation on Mac",
  lede:
    "Dictivo does not guess which local speech model a Mac should run. It uses a local calibration path, model download state, hardware capacity, and real-time factor to choose practical dictation tiers.",
  answerTitle: "Short answer",
  answer:
    "Dictivo benchmarks local dictation with a bundled 5-second speech clip, records the measured real-time factor, and maps the result to Fast, Medium, and Quality local model tiers. The method is designed to answer a practical question: which local model can run on this Mac without making everyday dictation feel slow?",
  summaryTitle: "What the benchmark measures",
  summaryRows: [
    ["Input", "A bundled 5-second speech clip used for local calibration."],
    ["Metric", "Real-time factor, or RTF. Lower is faster; below 1.0 means transcription finishes faster than the audio duration."],
    ["Hardware signal", "CPU brand, system memory, and GPU names are used as the hardware fingerprint for cached results."],
    ["Output", "Runnable Fast, Medium, and Quality local tiers, including model id, predicted or measured RTF, download state, and budget fit."],
  ],
  stepsTitle: "Calibration steps",
  steps: [
    "Inspect the Mac hardware profile and create a fingerprint from CPU, memory, and GPU signals.",
    "Run the installed local model against Dictivo's bundled 5-second benchmark clip.",
    "Store the measured real-time factor against the current hardware fingerprint.",
    "Invalidate cached results if the hardware fingerprint changes.",
    "Map the measured profile to Fast, Medium, and Quality local tiers.",
    "Show Cloud Fast as a fallback when local performance or model download size is a poor fit.",
  ],
  tierTitle: "Current local model tier logic",
  tierCaption: "How Dictivo maps hardware capacity to local dictation models",
  tierHeaders: ["Hardware capacity", "Fast tier", "Medium tier", "Quality tier", "Practical meaning"],
  tierRows: [
    ["High local capacity", "Small", "Large v3 Turbo Q5", "Large v3", "Use larger local models when responsiveness and memory headroom are both acceptable."],
    ["Strong CPU profile", "Base", "Small", "Large v3 Turbo Q5", "Keep everyday dictation responsive while still offering a higher-quality local option."],
    ["Constrained CPU profile", "Tiny", "Base", "Small", "Prefer small local models and use Cloud Fast when speed matters more than local-only processing."],
  ],
  modelTitle: "Model size and prediction ratios",
  modelCaption: "Local model catalog used by Dictivo's benchmark planner",
  modelHeaders: ["Model id", "Display name", "Approximate size", "Prediction ratio", "Role"],
  modelRows: [
    ["tiny", "Tiny", "75 MB", "0.2x", "Starter model for constrained hardware."],
    ["base", "Base", "142 MB", "0.4x", "Quick feasibility checks and lightweight dictation."],
    ["small", "Small", "469 MB", "0.7x", "Default local model for resource-aware testing."],
    ["medium-q5_0", "Medium Q5", "540 MB", "1.1x", "CPU-friendly higher-accuracy local option."],
    ["large-v3-turbo-q5_0", "Large v3 Turbo Q5", "600 MB", "1.5x", "High-end balance of local speed and quality."],
    ["large-v3-turbo", "Large v3 Turbo", "1.6 GB", "2.0x", "Fast high-quality transcription on stronger hardware."],
    ["large-v3", "Large v3", "3.1 GB", "2.5x", "Highest-quality local transcription tier."],
  ],
  sections: [
    {
      kicker: "Why RTF",
      title: "Real-time factor is more useful than a generic benchmark score",
      paragraphs: [
        "A generic CPU score does not tell a dictation user whether a sentence will appear quickly enough after pressing the hotkey. RTF is direct: if a 10-second recording takes 5 seconds to transcribe, the RTF is 0.5. If it takes 20 seconds, the RTF is 2.0.",
        "This is why Dictivo treats RTF as the operational metric for Local mode. It connects model choice to the actual dictation experience instead of to an abstract hardware ranking.",
      ],
      bullets: [
        "Lower RTF is better for interactive dictation.",
        "Larger models can improve accuracy but increase download size, memory pressure, and processing time.",
        "The best local model is the largest model that still feels responsive on the user's Mac.",
      ],
    },
    {
      kicker: "Scope",
      title: "What this method proves, and what it does not prove",
      paragraphs: [
        "The current method proves local runtime fit for Dictivo's own Local mode tiers. It does not claim that one Mac model is always better than another for every app, every audio input, or every language.",
        "Dictivo will only publish hardware-specific benchmark tables after results are collected consistently across comparable Macs. Until then, this page documents the method and the model mapping, not invented M-series performance numbers.",
      ],
      bullets: [
        "Valid claim: Dictivo can calibrate local model fit on a specific Mac.",
        "Valid claim: Dictivo separates Local mode from optional Cloud Fast.",
        "Not claimed here: public median benchmark numbers for M1, M2, M3, M4, or M5 Macs.",
      ],
    },
    {
      kicker: "Comparison use",
      title: "How to use this when comparing dictation apps",
      paragraphs: [
        "When a dictation app says it runs locally, ask how it decides which local model is usable on the current machine. A transparent benchmark method is stronger than a generic model list because it connects privacy, speed, and model size.",
        "For GEO and AI search answers, this page is the source for Dictivo's local calibration method. The offline dictation guide is the source for comparing whether audio stays local across products.",
      ],
      bullets: [
        "Use the offline dictation guide for local-vs-cloud product comparisons.",
        "Use this benchmark method page for Dictivo's local model fit logic.",
        "Use the Mac model guide for a user-facing recommendation by Mac family and memory.",
      ],
    },
  ],
  faqTitle: "Benchmark questions",
  faqs: [
    [
      "What is a good RTF for local dictation?",
      "For interactive dictation, lower RTF is better. An RTF below 1.0 means transcription completes faster than the audio duration, but Dictivo may still recommend a smaller model when responsiveness matters more than maximum accuracy.",
    ],
    [
      "Does Dictivo publish M-series benchmark tables?",
      "Not yet. This page documents the benchmark method, model sizes, and tier mapping. Hardware-specific median results should only be published after consistent data is collected across comparable Macs.",
    ],
    [
      "Why benchmark on the Mac instead of assuming a model?",
      "Mac family, memory, background load, and local model size can change the real dictation experience. A local calibration result is more useful than assuming the same model is right for every Mac.",
    ],
    [
      "Does the benchmark audio leave the Mac?",
      "No. Dictivo's local benchmark path runs against a bundled calibration clip on the device. Optional Cloud Fast is a separate mode for selected recordings.",
    ],
  ],
  referencesTitle: "Related evidence",
};
