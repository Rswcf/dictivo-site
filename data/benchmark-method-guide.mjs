export const BENCHMARK_METHOD_GUIDE_LASTMOD = "2026-06-11";

export const BENCHMARK_METHOD_GUIDE_REFERENCES = [
  ["Dictivo Mac model guide", "https://dictivo.app/mac-model-guide/"],
  ["Dictivo offline dictation guide", "https://dictivo.app/guides/offline-dictation-on-mac/"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  ["Dictivo local dictation network test", "https://dictivo.app/privacy/local-dictation-network-test/"],
  ["Dictivo privacy proof", "https://dictivo.app/privacy-proof/"],
];

export const BENCHMARK_METHOD_GUIDE_COPY = {
  navLabel: "Mac dictation benchmark method",
  metaTitle: "Mac Dictation Benchmarks: Method and Measured Apple Silicon Results",
  metaDescription:
    "How Dictivo benchmarks local Mac dictation speed, plus measured Whisper real-time factors on Apple Silicon: Metal vs CPU for Small, Large v3 Turbo, and Large v3.",
  eyebrow: "Benchmark method",
  title: "How Dictivo benchmarks local dictation on Mac",
  lede:
    "Dictivo does not guess which local speech model a Mac should run. It uses a local calibration path, model download state, hardware capacity, and real-time factor to choose practical dictation tiers.",
  answerTitle: "Short answer",
  answer:
    "Dictivo benchmarks local dictation with a bundled 5-second speech clip, records the measured real-time factor, and maps the result to Fast, Medium, and Quality local model tiers. This page documents the method and publishes measured results for real machines, starting with an Apple M4 Pro: with the Metal engine, Large v3 Turbo Q5 reaches RTF 0.21, so one minute of audio transcribes in about 13 seconds fully on-device.",
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
  measured: {
    kicker: "Measured results",
    title: "Measured Whisper speed on Apple Silicon: Metal vs CPU",
    paragraphs: [
      "These are measured numbers, not predictions. Machine: Apple M4 Pro, 14-core CPU, 48 GB unified memory, macOS 26.3.1. Engine: the local Whisper engine bundled with Dictivo, using the 0.3.33 calibration update where Metal is benchmarked and active by default on Apple Silicon. The CPU column shows the same machine with GPU disabled, which is also how Dictivo versions before 0.3.33 ran.",
      "Method: each cell is the median of 3 full runs after 1 warm-up, timed as complete wall-clock per dictation (process start, model load, and transcription of the bundled 5-second clip with default decode settings). That matches what a user actually waits for after releasing the hotkey. Real-time factor (RTF) = processing time divided by audio duration; lower is faster.",
    ],
    caption: "Apple M4 Pro (14-core, 48 GB), measured 2026-06-11, median of 3 runs",
    headers: ["Model", "Tier on this Mac", "Metal RTF", "CPU-only RTF", "Metal speedup", "1 min of audio (Metal)"],
    rows: [
      ["Tiny", "Free tier", "0.11", "0.11", "1.0x", "~7 s"],
      ["Small", "Fast", "0.11", "0.21", "1.9x", "~7 s"],
      ["Large v3 Turbo Q5", "Medium", "0.21", "0.61", "2.9x", "~13 s"],
      ["Large v3", "Quality", "0.41", "0.81", "2.0x", "~25 s"],
    ],
    bullets: [
      "Tiny shows no GPU gain because process start and model load dominate its runtime.",
      "Large v3, the highest-quality local model, is comfortably interactive on Metal (RTF 0.41) while the CPU-only path made it borderline (RTF 0.81).",
      "One machine is published so far. Results vary with thermal state and background load; numbers for other Macs are added only after they are measured with this exact method.",
    ],
    submitNote:
      "Have a different Mac? Run Settings -> Local Engine -> Re-run setup in Dictivo and email the measured tier numbers to support@dictivo.app. Measured machines are added to this table with their macOS version and date.",
  },
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
        "Dictivo publishes hardware-specific numbers only for machines that were actually measured with the documented method. The table above covers an Apple M4 Pro; other Macs are added as they are measured, never predicted.",
      ],
      bullets: [
        "Valid claim: Dictivo can calibrate local model fit on a specific Mac.",
        "Valid claim: Dictivo separates Local mode from optional Cloud Fast.",
        "Not claimed here: numbers for Mac models that have not been measured with this method yet.",
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
      "Yes, for measured machines only. The first table on this page covers an Apple M4 Pro (14-core, 48 GB) with Metal and CPU-only numbers per model. Other Macs are added once they are measured with the same method, not predicted.",
    ],
    [
      "How fast is Whisper Large v3 on an Apple M4 Pro?",
      "Measured with Dictivo's Metal engine: real-time factor 0.41, so one minute of audio transcribes in about 25 seconds fully on-device. The Large v3 Turbo Q5 model reaches RTF 0.21, about 13 seconds per minute of audio.",
    ],
    [
      "Does Dictivo use the GPU on Apple Silicon?",
      "Yes. Since the 0.3.33 engine update, calibration benchmarks both CPU and Metal and picks the faster path; on Apple Silicon, Metal is typically 2-3x faster end-to-end. Settings -> Engine shows which engine is active, and the app falls back to CPU automatically if the GPU path fails.",
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
