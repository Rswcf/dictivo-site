import { LOCAL_OFFER } from "./local-offer.mjs";

// Docs page M (Batch B2): the seven local speech models, their sizes, who can use them, how Dictivo
// picks a default for the machine, where models come from and live, and the dictation languages.
// Every fact comes from the desktop app at tag v0.3.57 (DOCS_CHECKED_VERSION) or from a page the
// site already publishes:
// - catalog order, labels and size labels, the free Tiny model, the 256 MiB download margin (the
//   app prints it as "256 MB"): private_fast.rs MODEL_CATALOG, FREE_LOCAL_MODEL_ID,
//   DOWNLOAD_SPACE_HEADROOM_BYTES, validate_model_transfer_space;
// - trial or license for the other six: private_fast.rs local_model_license_required_message,
//   license.rs local_paid_models_unlocked (license or active trial);
// - the three groups and the default per tier: private_fast.rs compute_performance_class,
//   default_model_for_tier; Apple Silicon GPU memory counted as half the memory, at least 8 GB:
//   detect_gpu_uncached; recommended model = the Medium default, Tiny without trial or license:
//   build_hardware_profile; Fast and Medium fall back to Tiny without them:
//   normalize_runnable_tiers_for_license_state;
// - tier names Fast, Medium ("Recommended"), Quality: tierDisplay.ts (the source enum calls the
//   third tier Slow; the page uses the label the app shows);
// - setup times the downloaded model on CPU and GPU and keeps the faster: OnboardingWizard.tsx,
//   private_fast.rs benchmark_tier, choose_backend_from_benchmarks; "may be slow", Re-run setup,
//   Advanced — full model catalog, Delete and its confirmation, Import: ModelManager.tsx;
// - Settings › Engine › Local model setup: SettingsView.tsx, displayLanguage.ts settingsText;
// - download hosts and what a download sends: private_fast.rs download sources,
//   displayLanguage.ts Connections rows 1 and 5 (the fallback is written as the host only);
// - folders: SettingsView.tsx storage locations, private_fast.rs private_fast_roots;
// - import: private_fast.rs import_private_fast_model (.bin, checksum, entitlement);
// - languages: packages/shared index.ts SUPPORTED_LANGUAGES, LANGUAGE_LABELS (11) and Auto-detect,
//   the default (settingsStore.ts); interface languages: displayLanguage.ts DISPLAY_LOCALES (10);
//   dictionary hints with a fixed language: displayLanguage.ts settingsSpeechFixedNote,
//   data/release-notes.mjs (0.3.52);
// - no recorded files, no mobile app: the sentences pinned in tests/wording/best-dictation-software.test.mjs.
export const DOCS_MODELS_LASTMOD = "2026-11-10";

const trialDays = LOCAL_OFFER.trialDays;
const licensed = `${trialDays}-day trial or Local license`;
const notDefault = "Not a default; available to choose";

export function docsModelsCopy({ windows }) {
  return {
    ready: true,
    slug: "models-and-languages",
    route: "docs/models-and-languages",
    idPrefix: "docs-models",
    mainId: "docs-models",
    navLabel: "Models and languages",
    metaTitle: "Dictivo Local Models and Languages: Sizes and Defaults",
    metaDescription: "The seven local speech models in Dictivo, their sizes, which one is free, how Dictivo picks a default for your hardware, and the 11 dictation languages.",
    llmsQuestion: "Which local speech models and languages does Dictivo offer?",
    summary: "The seven local speech models, their download sizes, which one is free, and the 11 dictation languages.",
    lastmod: DOCS_MODELS_LASTMOD,
    title: "Dictivo local models and languages",
    lede: "Reference facts about the seven local speech models in the Dictivo desktop app: their sizes, who can use them, how Dictivo picks one for your machine, and the languages you can dictate in.",
    answer: `Dictivo offers seven local speech models, from Tiny at about 75 MB to Large v3 at about 3.1 GB. Tiny is free forever. The other six need the ${trialDays}-day trial or a Dictivo Local license. During setup, Dictivo reads your memory, processor and GPU and recommends a model for your machine. You can dictate in 11 languages, or let Dictivo detect the language.`,
    answerLinks: [
      ["What your computer needs", "/docs/system-requirements/"],
      ["Which Mac suits the larger models", "/mac-model-guide/"],
    ],
    about: ["Dictivo local models", "speech model sizes", "dictation languages", "offline speech model"],
    quickReference: undefined,
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "The seven models",
        paragraphs: [
          "Each model is one file that runs on your computer. A larger model needs more disk space and more time for each recording.",
        ],
        table: {
          caption: "The local models in Dictivo, in the order the app lists them",
          headers: ["Model", "Download size", "Who can use it", "Dictivo's default for"],
          rows: [
            ["Tiny", "~75 MB", "Free forever", "Fast on other machines"],
            ["Base", "~142 MB", licensed, "Fast on 8-core machines; Medium on other machines"],
            ["Small", "~469 MB", licensed, "Fast on GPU machines; Medium on 8-core machines; Quality on other machines"],
            ["Medium Q5", "~540 MB", licensed, notDefault],
            ["Large v3 Turbo Q5", "~600 MB", licensed, "Medium on GPU machines; Quality on 8-core machines"],
            ["Large v3 Turbo", "~1.6 GB", licensed, notDefault],
            ["Large v3", "~3.1 GB", licensed, "Quality on GPU machines"],
          ],
        },
        notes: [
          "GPU machines have 16 GB of memory or more and a GPU with 8 GB of memory or more. 8-core machines have 16 GB of memory or more and at least 8 processor cores. Other machines are everything else, including every machine with less than 16 GB of memory.",
          "Without the trial or a Local license, Dictivo uses Tiny for the Fast and Medium tiers.",
        ],
      },
      {
        title: "How Dictivo picks a model",
        paragraphs: [
          "Dictivo offers three speed tiers: Fast, Medium and Quality. The app marks Medium as Recommended. Each tier uses one model.",
          "Dictivo puts your machine in one of three groups by its memory, processor cores and GPU memory. The group sets the model for each tier, as the table above shows.",
          "On Apple Silicon, the GPU shares the Mac's memory. Dictivo counts half the memory as GPU memory, and at least 8 GB. A Mac with 16 GB of memory or more is a GPU machine. A Mac with 8 GB is not.",
          `With the trial or a Local license, Dictivo recommends the Medium model for your group. Without them, it recommends Tiny.`,
          "During setup, Dictivo downloads the model you pick, by default the recommended one, and times a short sample with it. It tries the CPU and, where it can use one, the GPU, and keeps the faster. From that time it estimates the other tiers, and marks a tier that would run slowly as \"may be slow\".",
          "To measure again, for example after a hardware change, click Re-run setup in Settings › Engine.",
        ],
        links: [["Memory, processor and GPU in detail", "/docs/system-requirements/"]],
      },
      {
        title: "Where models come from and where they live",
        paragraphs: [
          "Dictivo downloads each model from downloads.dictivo.app. If that download fails, it tries huggingface.co. A model download asks only for the model file. It sends no license key and no device id.",
          "Before a download, Dictivo checks the free disk space. It needs the size of the model plus 256 MB.",
          "Dictivo keeps the models in this folder:",
        ],
        bullets: [
          { html: "Mac: <code>~/Library/Application Support/Dictivo/private-fast/models</code>" },
          { html: "Windows: <code>%LOCALAPPDATA%\\Dictivo\\private-fast\\models</code>" },
        ],
        notes: [
          "Dictivo also reads models from an older folder, .dictivo/private-fast in your home folder, if an earlier version created it.",
          "On a computer that never goes online, import the model from a file instead. The next section says how.",
        ],
        links: [["Every connection Dictivo makes", "/docs/connections/"]],
      },
      {
        title: "Languages",
        paragraphs: [
          "You can dictate in 11 languages. Settings › Engine › Speech language lists them with these labels:",
        ],
        bullets: ["English", "Deutsch", "Français", "Español", "Italiano", "Nederlands", "Português", "中文", "日本語", "한국어", "Tiếng Việt"],
        notes: [
          "The default is Auto-detect: Dictivo detects the language you speak. Choose a fixed language if Dictivo keeps guessing wrong, for example with short sentences or when you mix languages.",
          "With a fixed language, Dictivo also gives the words in your Dictionary to the local model as hints, so it catches names and terms.",
          "The app's own text comes in 10 interface languages: the same list without Tiếng Việt.",
        ],
      },
      {
        title: "Switching and deleting models",
        paragraphs: [
          "Change models in Settings › Engine, under Local model setup. Click a tier to use its model. If the model is not on your computer yet, Dictivo asks before it downloads it.",
          "Advanced — full model catalog, in the same place, lists all seven models. There you can download, select or delete a model, or import one from a file. To import a model:",
        ],
        steps: [
          "Open Settings › Engine and then Advanced — full model catalog.",
          "Choose the model in the list next to Import.",
          "Enter the path to the model's .bin file.",
          "Click Import.",
        ],
        notes: [
          "Dictivo checks the file's checksum and accepts only the official file for that model. Every model except Tiny needs the trial or a Local license, for a download and for an import.",
          "Delete removes the model file from this computer. You can download or import it again later.",
        ],
      },
      {
        title: "What the models do not do",
        paragraphs: [
          "Dictivo is for live dictation and does not import recorded files.",
          "Dictivo has no mobile app.",
          "The local models work only in Local mode. Cloud Fast, the optional cloud mode, sends a recording to cloud transcription providers instead.",
        ],
        links: [["Where your dictation audio goes", "/privacy/where-dictation-audio-goes/"]],
      },
    ],
    faqs: [
      [
        "Which model is free?",
        `Tiny, about 75 MB. It stays free forever. The other six models work during the ${trialDays}-day trial and, after it, with a Dictivo Local license.`,
      ],
      [
        "Which model should I download first?",
        "The one Dictivo recommends during setup. With the trial or a Local license, that is Large v3 Turbo Q5 on a GPU machine, Small on an 8-core machine and Base on other machines. Without them, it is Tiny.",
      ],
      [
        "How much disk space do the models need?",
        "From about 75 MB for Tiny to about 3.1 GB for Large v3, for each model you keep. A download also needs 256 MB of free space on top of the model's size. Delete a model you no longer use to free its space.",
      ],
      [
        "Which languages can I dictate in?",
        "English, German, French, Spanish, Italian, Dutch, Portuguese, Chinese, Japanese, Korean and Vietnamese, or Auto-detect. The app's interface comes in the same languages except Vietnamese.",
      ],
      [
        "Can I use a model file I already have?",
        "Yes, if it is the official file for one of the seven models. Open Settings › Engine, then Advanced — full model catalog, choose the model, enter the path to its .bin file and click Import. Dictivo checks the checksum and rejects any other file. Every model except Tiny needs the trial or a Local license.",
      ],
    ],
    references: [
      ["Dictivo Mac model guide", "https://dictivo.app/mac-model-guide/"],
      ["Dictivo pricing and license terms", "https://dictivo.app/pricing/"],
      ["Your first local dictation with Dictivo", "https://dictivo.app/guides/first-local-dictation/"],
    ],
  };
}
