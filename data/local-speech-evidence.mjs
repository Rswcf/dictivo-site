export const LOCAL_SPEECH_EVIDENCE = {
  lastmod: "2026-09-12",
  root: "/assets/evidence/local-speech-2026-09-12",
  title: "Hear a human voice. Inspect the local-engine result.",
  description: "This vendor-run example uses 25.312 seconds of human-read English: five original VCTK recordings from one speaker, joined in order with 250 ms of silence between them. It is a reconstructed paragraph, not a continuous recording or spontaneous dictation. No speech was synthesized or cloned.",
  environment: "Measured 12 September 2026 with Dictivo 0.3.47, whisper.cpp 1.8.4, Balanced settings and automatic language detection. Machine: Apple M4 Pro, 48 GB, macOS 26.3.1 (a), Metal acceleration, running on battery. One warmup and three fresh CLI processes per model; operating-system file caches may be warm.",
  caption: "25.312-second English sample · median of three CLI runs after one warmup",
  headers: ["Installed model", "Three runs", "Median", "Normalized word errors"],
  rows: [
    ["Small", "1.062 / 1.062 / 1.054 s", "1.062 s", "0 / 69 on this sample"],
    ["Large v3 Turbo Q5", "2.067 / 2.066 / 2.068 s", "2.067 s", "0 / 69 on this sample"],
  ],
  result: "Both models produced the same words on all measured runs. Two reference commas were omitted. The word-error count ignores punctuation and capitalization; it does not mean an identical transcript or general 100% accuracy.",
  scope: "Timing includes process startup, model loading, transcription and writing the text file. It excludes microphone capture, app processing, insertion and proofreading, so it is not full-app dictation latency. This is one clean English sample, one speaker and one computer. Noise, accents, other languages, longer recordings and other hardware were not tested. Overlap with model training data is unknown. No competitor was tested.",
  networkTitle: "A separate check with the engine's network access denied",
  networkResult: "On the same machine, Small and Turbo Q5 each completed one additional run under a macOS sandbox profile that denied network access. Their output matched the unrestricted text files. A control connection succeeded outside the profile and failed with “Operation not permitted” inside it.",
  networkScope: "This checks the installed transcription CLI only. It is not a network capture or offline test of the complete desktop app, its microphone workflow, licensing, trial reports or other helper processes. The app can still use the network for those product operations. These functional checks are excluded from the timing table above.",
};
