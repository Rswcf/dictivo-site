import { DOCS_CHECKED_VERSION } from "./docs-shared.mjs";

// Docs page S (Batch B2): what Dictivo needs on a Mac and on Windows x64. Every fact comes from the
// desktop app at tag v0.3.57 (DOCS_CHECKED_VERSION), from the installed 0.3.57 app, or from a page
// the site already publishes:
// - minimum macOS and the universal binary: read on 2026-11-10 from the installed 0.3.57 app
//   (`defaults read /Applications/Dictivo.app/Contents/Info.plist LSMinimumSystemVersion` → 10.13;
//   `lipo -archs …/MacOS/dictivo` → x86_64 arm64). The source pins no minimum; the built app does.
//   The page says what the app declares, not which versions anyone ran it on;
// - Start at login: autostart.rs (SMAppService, "Start at login needs macOS 13 or later", the
//   Applications-folder rule; Windows Startup apps);
// - Developer ID signed and notarized Mac build; x64-only Windows build, EXE and MSI, not
//   Authenticode-signed: the release workflow at the tag, site README "Download hosting",
//   data/windows-installer-help.mjs; per-user EXE: tauri.conf.json bundle.windows.nsis.installMode;
// - Windows 10 and 11: data/windows-installer-help.mjs (en environment), the site's statement;
// - no ARM build: data/one-time-license-guide.mjs, plan Decision 3 (nothing promised about emulation);
// - engines: private_fast.rs default_backend_for_platform, gpu_probe_backend_for_platform (Metal on
//   Apple Silicon, CPU on Intel Macs, Vulkan when Windows reports a GPU), benchmark_tier and
//   choose_backend_from_benchmarks (setup times CPU and GPU, keeps the faster);
// - Visual C++ files and the CPU fallback on Windows: data/release-notes.mjs (0.3.54);
// - the three groups and their default models: private_fast.rs compute_performance_class,
//   default_model_for_tier, detect_gpu_uncached (Apple Silicon GPU memory = half the memory, at
//   least 8 GB); tier labels Fast, Medium, Quality: tierDisplay.ts;
// - model sizes and the 256 MiB download margin (printed by the app as "256 MB"): private_fast.rs;
// - microphone choice and fallback: displayLanguage.ts microphone; permission levels:
//   displayLanguage.ts permissions; temporary recordings: displayLanguage.ts storage rows;
// - Intel Macs and larger models: data/mac-model-advisor.mjs notes.intel.
// No price on this page.
export const DOCS_SYSTEM_REQUIREMENTS_LASTMOD = "2026-11-10";

const MAC_MINIMUM = "10.13";
const LOGIN_MINIMUM = "13";

export function docsSystemRequirementsCopy({ windows }) {
  const windowsBuild = windows
    ? "Dictivo for Windows is an x64 installer, as an EXE or an MSI file. There is no ARM build."
    : "Dictivo for Windows is an x64 installer, as an EXE or an MSI file. There is no ARM build. Windows downloads are temporarily unavailable.";
  const memoryCell = "Dictivo sets no minimum. Below 16 GB, the defaults are Tiny, Base and Small.";
  const diskCell = "The app plus each model you keep: ~75 MB to ~3.1 GB. A download needs 256 MB free on top.";
  const networkCell = "For the first model download, updates and license activation. Local dictation needs none.";
  return {
    ready: true,
    slug: "system-requirements",
    route: "docs/system-requirements",
    idPrefix: "docs-system-requirements",
    mainId: "docs-system-requirements",
    navLabel: "System requirements",
    metaTitle: "Dictivo System Requirements: Mac and Windows x64",
    metaDescription: "What Dictivo needs on a Mac (Apple Silicon or Intel) and on Windows x64: processor, memory and disk for each local model, microphone and network.",
    llmsQuestion: "What are Dictivo's system requirements on Mac and Windows?",
    summary: "What Dictivo needs on a Mac and on Windows x64, and how it picks a model for your hardware.",
    lastmod: DOCS_SYSTEM_REQUIREMENTS_LASTMOD,
    title: "Dictivo system requirements for Mac and Windows",
    lede: "Reference facts about what the Dictivo desktop app needs on a Mac and on a Windows x64 PC: processor, operating system, memory, disk space, microphone and network.",
    answer: `Dictivo for Mac is one universal app for Apple Silicon and Intel Macs. The app declares macOS ${MAC_MINIMUM} or later. Dictivo for Windows is an x64 installer for Windows 10 and 11. You need a microphone and disk space for the app plus one model, from about 75 MB to about 3.1 GB. Local dictation needs no network. The first model download, updates and license activation do.`,
    answerLinks: [
      ["Which Mac suits the larger models", "/mac-model-guide/"],
      ["The seven local models", "/docs/models-and-languages/"],
    ],
    about: ["Dictivo system requirements", "Apple Silicon Intel dictation", "Windows x64 dictation", "RAM for local speech models"],
    quickReference: {
      title: "Requirements at a glance",
      caption: `What Dictivo ${DOCS_CHECKED_VERSION} needs on each platform`,
      headers: ["Requirement", "Mac", "Windows"],
      rows: [
        ["Processor", "Apple Silicon or Intel. One universal app runs on both.", "x64. There is no ARM build."],
        [
          "Operating system",
          `The app declares macOS ${MAC_MINIMUM} or later. Start at login needs macOS ${LOGIN_MINIMUM} or later.`,
          "Windows 10 and 11, as the Windows installation guide states.",
        ],
        ["Memory for the default models", memoryCell, memoryCell],
        ["Disk space", diskCell, diskCell],
        [
          "Microphone",
          "Any input device macOS lists. Dictivo needs Microphone permission.",
          "Any input device Windows lists. Microphone access must be on in Windows privacy settings.",
        ],
        ["Network", networkCell, networkCell],
        [
          "Start at login",
          `macOS ${LOGIN_MINIMUM} or later, with Dictivo in the Applications folder.`,
          "Available. Windows can switch it off under Startup apps.",
        ],
      ],
    },
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "Mac",
        paragraphs: [
          "Dictivo for Mac is one universal app for Apple Silicon and Intel Macs. The same download runs on both.",
          `The app declares macOS ${MAC_MINIMUM} or later. This is the minimum written into the app. Start at login needs macOS ${LOGIN_MINIMUM} or later, and Dictivo must run from the Applications folder for it.`,
          "On Apple Silicon, the local engine uses the GPU through Metal. On Intel Macs, it uses the CPU engine.",
          "The Mac model guide notes that older Intel MacBooks are usable, but not the best fit for the larger local models.",
          "The Mac app is signed with an Apple Developer ID and notarized by Apple.",
        ],
        links: [["Which Mac suits Dictivo's local models", "/mac-model-guide/"]],
      },
      {
        title: "Windows",
        paragraphs: [
          windowsBuild,
          "The EXE installs Dictivo for the current user only. The Windows installation guide covers Windows 10 and 11.",
          "The local engine uses the GPU through Vulkan when Windows reports a GPU, and the CPU otherwise. During setup, Dictivo times both and keeps the faster.",
          "Since version 0.3.54, Dictivo ships the Visual C++ files its local engine needs, so you do not install them yourself. If the GPU engine cannot start, Dictivo switches to the CPU engine by itself.",
          `The Windows installer of Dictivo ${DOCS_CHECKED_VERSION} is not Authenticode-signed. SmartScreen or Microsoft Edge may warn before it runs.`,
        ],
        links: [["If Windows warns about or blocks the installer", "/guides/windows-installer-blocked/"]],
      },
      {
        title: "Memory and processor: how Dictivo decides",
        paragraphs: [
          "Dictivo sets no minimum for memory or processor. It reads your machine and gives smaller machines smaller models.",
          "It puts your machine in the first of these three groups that fits. Each group has a default model for the three speed tiers the app shows: Fast, Medium and Quality.",
        ],
        table: {
          caption: "Default model per speed tier, by machine group",
          headers: ["Your machine", "Fast", "Medium", "Quality"],
          rows: [
            ["16 GB of memory or more and a GPU with 8 GB of memory or more", "Small", "Large v3 Turbo Q5", "Large v3"],
            ["16 GB of memory or more and 8 or more processor cores", "Base", "Small", "Large v3 Turbo Q5"],
            ["Any other machine", "Tiny", "Base", "Small"],
          ],
        },
        notes: [
          "On Apple Silicon, the GPU shares the Mac's memory. Dictivo counts half the memory as GPU memory, and at least 8 GB. A Mac with 16 GB of memory or more is in the first group. A Mac with 8 GB is in the last. If Dictivo cannot read the memory size, it uses the last group.",
          "The app marks Medium as Recommended. Without the trial or a Local license, the Fast and Medium tiers use Tiny.",
          "You can still choose a larger model on any machine. During setup, Dictivo times your machine and marks a tier that may run slowly.",
        ],
        links: [
          ["All seven models and their sizes", "/docs/models-and-languages/"],
          ["Which Mac suits Dictivo's local models", "/mac-model-guide/"],
        ],
      },
      {
        title: "Disk space",
        paragraphs: [
          "Plan for the app plus each model you keep. The models range from about 75 MB for Tiny to about 3.1 GB for Large v3.",
          "Before a model download or import, Dictivo checks the free space. It needs the size of the model plus 256 MB.",
          "Your local history also lives on your disk. During Local transcription, Dictivo writes each recording to a temporary file and deletes it when the transcript is ready.",
        ],
        links: [["Model sizes and where models live", "/docs/models-and-languages/"]],
      },
      {
        title: "Microphone and permissions",
        paragraphs: [
          "Dictivo records from the microphone you choose in Settings › Engine. If that microphone is not connected, Dictivo uses the system default and tells you.",
          "On a Mac, Dictivo needs Microphone permission. Accessibility is recommended, and Automation for Auto paste is optional.",
          "On Windows, microphone access is a Windows privacy setting. Dictivo needs no Accessibility permission there.",
        ],
        links: [["The macOS permissions Dictivo asks for", "/docs/macos-permissions/"]],
      },
      {
        title: "Network",
        paragraphs: [
          "Local dictation needs no network once a model is on your computer. The first model download, update checks, license activation and the optional Cloud Fast mode use the network. On a computer that never goes online, you can import a model from a file.",
        ],
        links: [
          ["What Dictivo does offline", "/docs/offline/"],
          ["Every connection Dictivo makes", "/docs/connections/"],
        ],
      },
    ],
    faqs: [
      [
        "Does Dictivo run on Intel Macs?",
        "Yes. Dictivo for Mac is one universal app for Apple Silicon and Intel Macs. On Intel Macs, the local engine uses the CPU. The Mac model guide helps you pick a model for your Mac.",
      ],
      [
        "Which macOS version do I need?",
        `The app declares macOS ${MAC_MINIMUM} or later. Start at login needs macOS ${LOGIN_MINIMUM} or later, with Dictivo in the Applications folder.`,
      ],
      [
        "Does Dictivo run on Windows on ARM?",
        "There is no ARM build. Dictivo for Windows is an x64 installer.",
      ],
      [
        "How much RAM do I need for the larger models?",
        "Dictivo sets no minimum. It makes Large v3 a default only with 16 GB of memory or more and a GPU with 8 GB or more; an Apple Silicon Mac with 16 GB counts. With 16 GB and 8 or more processor cores, the largest default is Large v3 Turbo Q5. Below 16 GB, the defaults are Tiny, Base and Small.",
      ],
      [
        "Do I need a GPU?",
        "No. The local engine also runs on the CPU. Where Dictivo can use the GPU, through Metal on Apple Silicon or Vulkan on Windows, setup times both and keeps the faster. Intel Macs use the CPU.",
      ],
    ],
    references: [
      ["Dictivo Mac model guide", "https://dictivo.app/mac-model-guide/"],
      ["If Windows blocks the Dictivo installer", "https://dictivo.app/guides/windows-installer-blocked/"],
      ["Dictivo changelog", "https://dictivo.app/changelog/"],
    ],
  };
}
