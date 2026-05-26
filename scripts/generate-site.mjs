import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { COMPARE_HUB, COMPARE_LAST_UPDATED, COMPARE_NAV_LINKS, COMPARE_PAGES } from "../data/compare-pages.mjs";
import { BASE_URL, HOME_COPY, LOCALES } from "../data/site-content.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const outDir = resolve(root, "dist");
const release = JSON.parse(readFileSync(resolve(root, "data/release.json"), "utf8"));
const windowsRelease = release.windows || null;
const hasWindowsRelease = Boolean(windowsRelease?.exe?.url && windowsRelease?.msi?.url);
const sourceRedirects = existsSync(resolve(root, "_redirects"))
  ? readFileSync(resolve(root, "_redirects"), "utf8")
  : "";
const localCheckoutTarget = redirectTargetFromSource(
  "/checkout/local",
  "https://dictivo.lemonsqueezy.com/checkout/buy/d4cb72ba-68a7-494f-a711-29993b2ea7a1",
);
const cloudFastCheckoutTarget = redirectTargetFromSource(
  "/checkout/cloud-fast",
  "https://dictivo.lemonsqueezy.com/checkout/buy/2a12baa1-2368-47ac-884b-0721f8b5484d",
);
const transparentPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAKBuc622QAAAABJRU5ErkJggg==",
  "base64",
);
const blankJpeg = Buffer.from(
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAqf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/ASP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/ASP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/Al//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IV//2gAMAwEAAgADAAAAEP/EFBQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QH//EFBQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QH//EFBQBAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEAAT8QH//Z",
  "base64",
);

const WINDOWS_DOWNLOAD_COPY = {
  en: {
    badge: "Available",
    body: "Windows x64 is available with the same Local, Cloud Fast, license, and update flow as the Mac app.",
    exeButton: "Download for Windows",
    msiButton: "MSI installer",
    note: (version) => `Version ${version} - Windows x64 public beta.`,
  },
  de: {
    badge: "Verfügbar",
    body: "Windows x64 ist mit demselben Local-, Cloud-Fast-, Lizenz- und Update-Ablauf wie die Mac-App verfügbar.",
    exeButton: "Für Windows herunterladen",
    msiButton: "MSI-Installer",
    note: (version) => `Version ${version} - öffentliche Beta für Windows x64.`,
  },
  fr: {
    badge: "Disponible",
    body: "Windows x64 est disponible avec le même flux Local, Cloud Fast, licence et mise à jour que l'app Mac.",
    exeButton: "Télécharger pour Windows",
    msiButton: "Installateur MSI",
    note: (version) => `Version ${version} - bêta publique Windows x64.`,
  },
  es: {
    badge: "Disponible",
    body: "Windows x64 está disponible con el mismo flujo de Local, Cloud Fast, licencia y actualizaciones que la app para Mac.",
    exeButton: "Descargar para Windows",
    msiButton: "Instalador MSI",
    note: (version) => `Versión ${version} - beta pública para Windows x64.`,
  },
  it: {
    badge: "Disponibile",
    body: "Windows x64 è disponibile con lo stesso flusso Local, Cloud Fast, licenza e aggiornamenti dell'app Mac.",
    exeButton: "Scarica per Windows",
    msiButton: "Installer MSI",
    note: (version) => `Versione ${version} - beta pubblica Windows x64.`,
  },
  nl: {
    badge: "Beschikbaar",
    body: "Windows x64 is beschikbaar met dezelfde Local-, Cloud Fast-, licentie- en updateflow als de Mac-app.",
    exeButton: "Download voor Windows",
    msiButton: "MSI-installer",
    note: (version) => `Versie ${version} - openbare beta voor Windows x64.`,
  },
  pt: {
    badge: "Disponível",
    body: "Windows x64 está disponível com o mesmo fluxo de Local, Cloud Fast, licença e atualizações do app para Mac.",
    exeButton: "Baixar para Windows",
    msiButton: "Instalador MSI",
    note: (version) => `Versão ${version} - beta pública para Windows x64.`,
  },
  zh: {
    badge: "可用",
    body: "Windows x64 版本现已可用，包含与 Mac 版一致的 Local、Cloud Fast、许可证和更新流程。",
    exeButton: "下载 Windows 版",
    msiButton: "MSI 安装包",
    note: (version) => `版本 ${version} - Windows x64 公测版。`,
  },
  ja: {
    badge: "利用可能",
    body: "Windows x64 版が利用可能です。Local、Cloud Fast、ライセンス、更新フローは Mac 版と同じです。",
    exeButton: "Windows 版をダウンロード",
    msiButton: "MSI インストーラ",
    note: (version) => `バージョン ${version} - Windows x64 公開ベータ。`,
  },
  ko: {
    badge: "사용 가능",
    body: "Windows x64 버전을 사용할 수 있습니다. Local, Cloud Fast, 라이선스, 업데이트 흐름은 Mac 앱과 동일합니다.",
    exeButton: "Windows용 다운로드",
    msiButton: "MSI 설치 파일",
    note: (version) => `버전 ${version} - Windows x64 공개 베타.`,
  },
};

function html(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attr(value) {
  return html(value).replaceAll("'", "&#39;");
}

function windowsDownloadCopy(code) {
  return WINDOWS_DOWNLOAD_COPY[code] || WINDOWS_DOWNLOAD_COPY.en;
}

function localeByCode(code) {
  const locale = LOCALES.find((item) => item.code === code);
  if (!locale) throw new Error(`Unknown locale: ${code}`);
  return locale;
}

function absoluteUrl(path) {
  return new URL(path, BASE_URL).toString();
}

function redirectTargetFromSource(route, fallback) {
  const line = sourceRedirects
    .split(/\r?\n/)
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${route} `));
  if (!line) return fallback;
  return line.split(/\s+/)[1] || fallback;
}

function comparePath(slug = "") {
  return slug ? `/compare/${slug}` : "/compare";
}

function localizedComparePath(code, slug = "") {
  if (code === "en") return comparePath(slug);
  const locale = localeByCode(code);
  return `${locale.path}compare${slug ? `/${slug}` : ""}`;
}

function localePath(code, fragment = "") {
  const locale = localeByCode(code);
  return `${locale.path}${fragment}`;
}

function localeUrl(code) {
  return absoluteUrl(localeByCode(code).path);
}

function localizedCompareUrl(code, slug = "") {
  return absoluteUrl(localizedComparePath(code, slug));
}

function fillCompareTemplate(value, page) {
  return value.replaceAll("{competitor}", page.competitor);
}

const COMPARE_I18N = {
  en: {
    skipComparison: "Skip to comparison",
    skipComparisons: "Skip to comparisons",
    languageAria: "Change comparison page language",
    updatedLabel: "Last updated:",
    hubEyebrow: "Comparison hub",
    hubMetaTitle: COMPARE_HUB.metaTitle,
    hubMetaDescription: COMPARE_HUB.metaDescription,
    hubH1: COMPARE_HUB.h1,
    hubLede: COMPARE_HUB.lede,
    hubGridLabel: "Dictivo comparison pages",
    cardTitle: "{competitor} alternative",
    cardCta: "Compare Dictivo with {competitor}",
    pageTitle: "{competitor} Alternative: Local Mac Dictation",
    pageMeta:
      "Compare Dictivo with {competitor} across privacy, pricing, platforms, and local Mac dictation workflow.",
    pageH1: "{competitor} alternative for local Mac dictation",
    eyebrow: "Compare alternatives",
    intro: [
      "This localized comparison explains where {competitor} can make sense, then shows where Dictivo's local-first Mac workflow fits better.",
      "Use the quick table and decision notes to compare privacy, pricing, platform support, and the Local versus Cloud Fast boundary.",
    ],
    quickAria: "Quick comparison",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["Best for", "Private local Mac dictation", "{competitor}'s existing workflow"],
      ["Dictivo model", "$49 once, Tiny free forever, 14-day full Local trial", "See {competitor} pricing and trial notes below"],
      ["Privacy model", "Local mode by default", "See processing-location details below"],
    ],
    atAGlanceKicker: "At a glance",
    atAGlanceTitle: "{competitor} vs Dictivo at a glance",
    tableCaption: "{competitor} vs Dictivo at a glance",
    questionHeader: "Question",
    competitorHeader: "{competitor}",
    rowLabels: {
      "Processing location": "Processing location",
      "Trains AI on your voice": "Trains AI on your voice",
      "Works fully offline": "Works fully offline",
      "Account required": "Account required",
      "Pricing model": "Pricing model",
      "Free tier / trial": "Free tier / trial",
      Platforms: "Platforms",
      "Privacy boundary": "Privacy boundary",
    },
    dictivoRows: {
      "Processing location":
        "Local mode runs on your Mac. Optional Cloud Fast is separate and only used when you select it.",
      "Trains AI on your voice": "Never in Local mode.",
      "Works fully offline": "Yes in Local mode after the local model is installed.",
      "Account required": "No Dictivo account for Local dictation.",
      "Pricing model": "$49 once, 12 months of updates, then optional $24/year update renewal.",
      "Free tier / trial":
        "Tiny free forever plus a 14-day full Local trial with every local model unlocked.",
      Platforms: "macOS now. Windows is in validation.",
      "Privacy boundary":
        "Local mode keeps transcripts, history, dictionary terms, snippets, and settings on your Mac. No Dictivo account is required for Local dictation.",
    },
    sections: [
      {
        kicker: "Context",
        title: "Where {competitor} can make sense",
        paragraphs: [
          "{competitor} may be the right choice if its platform support, existing workflow, team features, or cloud model behavior match what you need today.",
          "The comparison below does not treat every competitor as weak. It separates product fit from Dictivo's narrower promise: private Mac dictation that starts locally.",
        ],
        bullets: [
          "Choose the competitor when you need its specific platform or workflow advantages.",
          "Compare the current offer, trial limits, and privacy tradeoffs before you choose.",
          "Use Dictivo when the default path should be local Mac transcription with no Dictivo account.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "Dictivo is built around Local mode first. Speech recognition runs on the Mac, and transcripts, history, dictionary terms, snippets, and local settings stay on the machine.",
          "Cloud Fast is intentionally separate. Use it only for recordings where speed matters more than local-only processing.",
        ],
        bullets: [
          "Tiny stays free forever.",
          "A 14-day full Local trial unlocks every local model.",
          "Dictivo Local is $49 once, with optional update renewals after the first year.",
          "The Local workflow does not require a Dictivo transcription account.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose {competitor} if",
            items: [
              "You need its current platform coverage or product-specific workflow.",
              "You are comfortable with the processing and account model described in its documentation.",
              "Its subscription, lifetime price, or built-in status fits your budget better.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want local Mac dictation as the default path.",
              "You prefer no Dictivo account for Local mode.",
              "You want a lower one-time Local license after trying every local model for 14 days.",
            ],
          },
        ],
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Frequently asked questions",
    faqs: [
      [
        "Is Dictivo an alternative to {competitor}?",
        "Yes. Dictivo is an alternative when you want a local-first Mac dictation workflow with optional Cloud Fast instead of making cloud processing the default.",
      ],
      [
        "Can I use Dictivo without a Dictivo account?",
        "Yes. Local dictation does not require a Dictivo account. The optional Cloud Fast path is separate from Local mode.",
      ],
      [
        "What can I try for free?",
        "Tiny stays free forever, and new installs get a 14-day full Local trial with every local model unlocked plus 10 lifetime Cloud Fast minutes on that device.",
      ],
      [
        "What can I try before buying?",
        "Tiny stays free forever. New installs also get a 14-day full Local trial with every local model unlocked and 10 lifetime Cloud Fast minutes on that device.",
      ],
      [
        "Which should I choose?",
        "Choose Dictivo if private Mac dictation and buy-once Local pricing matter most. Choose the competitor if its platform support, cloud features, or built-in workflow matters more.",
      ],
    ],
    ctaKicker: "Try Dictivo",
    ctaTitle: "Try Dictivo free for 14 days.",
    ctaBody:
      "Every local model unlocked, no Dictivo account for Local mode. Buy Local for $49 once if it fits your workflow.",
    ctaPrimary: "Try Dictivo free for 14 days",
    ctaSecondary: "See pricing",
    resourceAria: "Comparison next steps",
    resourcePricing: "Compare Dictivo pricing and plans",
    resourceRelated: "See how Dictivo compares to {competitor}",
    compareFooter: "Compare alternatives",
    footerAlternative: "{competitor} alternative",
    teaserKicker: "Compare",
    teaserTitle: "Choosing against another dictation app?",
    teaserBody:
      "Compare Dictivo with the tools people usually evaluate first: cloud dictation, local mode systems, file transcription apps, low-cost indie tools, and Apple's built-in Dictation.",
  },
  de: {
    skipComparison: "Zum Vergleich springen",
    skipComparisons: "Zu den Vergleichen springen",
    languageAria: "Sprache der Vergleichsseite ändern",
    updatedLabel: "Zuletzt aktualisiert:",
    hubEyebrow: "Vergleichs-Hub",
    hubMetaTitle: "Dictivo-Vergleiche: Alternativen für lokales Mac-Diktat",
    hubMetaDescription:
      "Vergleichen Sie Dictivo mit Wispr Flow, Superwhisper, MacWhisper, VoiceInk und macOS Dictation nach Datenschutz, Preis und Workflow.",
    hubH1: "Dictivo mit anderen Diktier-Tools vergleichen",
    hubLede:
      "Ein praktischer Einstieg für private Mac-Diktier-Workflows. Jede Seite zeigt, wo das andere Produkt gut passt und wo Dictivos lokaler Ansatz sinnvoller ist.",
    hubGridLabel: "Dictivo-Vergleichsseiten",
    cardTitle: "{competitor}-Alternative",
    cardCta: "Dictivo mit {competitor} vergleichen",
    pageTitle: "{competitor}-Alternative: lokales Mac-Diktat mit Dictivo",
    pageMeta:
      "Vergleichen Sie Dictivo mit {competitor}: Datenschutz, Preis, Plattformen und lokaler Mac-Diktier-Workflow.",
    pageH1: "{competitor}-Alternative für lokales Mac-Diktat",
    eyebrow: "Alternativen vergleichen",
    intro: [
      "Diese Vergleichsseite zeigt, wann {competitor} sinnvoll sein kann und wann Dictivos lokaler Mac-Workflow besser passt.",
      "Nutzen Sie die Kurzübersicht und Entscheidungshinweise, um Datenschutz, Preis, Plattformen und Local versus Cloud Fast zu prüfen.",
    ],
    quickAria: "Kurzvergleich",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["Am besten für", "Privates lokales Mac-Diktat", "Den bestehenden {competitor}-Workflow"],
      ["Dictivo-Modell", "$49 einmalig, Tiny dauerhaft gratis, 14 Tage voller Local-Test", "Siehe Preis- und Testnotizen unten"],
      ["Datenschutzmodell", "Local standardmäßig", "Siehe Details zum Verarbeitungsort unten"],
    ],
    atAGlanceKicker: "Auf einen Blick",
    atAGlanceTitle: "{competitor} vs. Dictivo auf einen Blick",
    tableCaption: "{competitor} vs. Dictivo auf einen Blick",
    questionHeader: "Frage",
    competitorHeader: "{competitor}",
    rowLabels: {
      "Processing location": "Verarbeitungsort",
      "Trains AI on your voice": "Trainiert KI mit Ihrer Stimme",
      "Works fully offline": "Vollständig offline nutzbar",
      "Account required": "Konto erforderlich",
      "Pricing model": "Preismodell",
      "Free tier / trial": "Gratisversion / Testphase",
      Platforms: "Plattformen",
      "Privacy boundary": "Datenschutzgrenze",
    },
    dictivoRows: {
      "Processing location": "Local-Modus läuft auf dem Mac. Cloud Fast bleibt separat und wird nur genutzt, wenn Sie es wählen.",
      "Trains AI on your voice": "Nie im Local-Modus.",
      "Works fully offline": "Ja, im Local-Modus nach Installation des lokalen Modells.",
      "Account required": "Kein Dictivo-Konto für Local-Diktat.",
      "Pricing model": "$49 einmalig, 12 Monate Updates, danach optionale Verlängerung für $24/Jahr.",
      "Free tier / trial": "Tiny dauerhaft gratis plus 14 Tage voller Local-Test mit allen lokalen Modellen.",
      Platforms: "macOS jetzt. Windows ist in Validierung.",
      "Privacy boundary": "Local-Modus hält Transkripte, Verlauf, Wörterbuch, Snippets und Einstellungen auf dem Mac. Für Local-Diktat ist kein Dictivo-Konto nötig.",
    },
    sections: [
      {
        kicker: "Kontext",
        title: "Wann {competitor} sinnvoll sein kann",
        paragraphs: [
          "{competitor} kann passen, wenn Plattformabdeckung, bestehender Workflow, Teamfunktionen oder Cloud-Modellverhalten genau Ihren Bedarf treffen.",
          "Dieser Vergleich macht Wettbewerber nicht künstlich klein. Er trennt Produkt-Fit von Dictivos engerem Versprechen: privates Mac-Diktat, das lokal startet.",
        ],
        bullets: [
          "Wählen Sie den Wettbewerber, wenn Sie seine spezifischen Plattform- oder Workflow-Vorteile brauchen.",
          "Vergleichen Sie das aktuelle Angebot, die Testphase und die Datenschutzabwägung vor der Entscheidung.",
          "Nutzen Sie Dictivo, wenn der Standardpfad lokale Mac-Transkription ohne Dictivo-Konto sein soll.",
        ],
      },
      {
        kicker: "Dictivo-Unterschied",
        title: "Worin Dictivo anders ist",
        paragraphs: [
          "Dictivo ist zuerst um Local mode gebaut. Spracherkennung läuft auf dem Mac; Transkripte, Verlauf, Wörterbuch, Textbausteine und lokale Einstellungen bleiben auf dem Gerät.",
          "Cloud Fast ist bewusst getrennt. Nutzen Sie es nur für Aufnahmen, bei denen Geschwindigkeit wichtiger ist als reine lokale Verarbeitung.",
        ],
        bullets: [
          "Tiny bleibt dauerhaft gratis.",
          "Der 14-tägige volle Local-Test entsperrt jedes lokale Modell.",
          "Dictivo Local kostet $49 einmalig, mit optionaler Update-Verlängerung nach dem ersten Jahr.",
          "Der Local-Workflow erfordert kein Dictivo-Transkriptionskonto.",
        ],
      },
      {
        kicker: "Entscheidung",
        title: "Wer welches Produkt wählen sollte",
        cards: [
          {
            title: "{competitor} wählen, wenn",
            items: [
              "Sie die aktuelle Plattformabdeckung oder einen produktspezifischen Workflow brauchen.",
              "Das in der Dokumentation beschriebene Verarbeitungs- und Kontomodell für Sie passt.",
              "Abo, Lifetime-Preis oder eingebauter Systemstatus besser zu Ihrem Budget passen.",
            ],
          },
          {
            title: "Dictivo wählen, wenn",
            items: [
              "Lokales Mac-Diktat Ihr Standardpfad sein soll.",
              "Sie für Local mode kein Dictivo-Konto möchten.",
              "Sie nach 14 Tagen Test aller lokalen Modelle lieber eine niedrigere Einmalzahlung nutzen.",
            ],
          },
        ],
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Häufige Fragen",
    faqs: [
      ["Ist Dictivo eine Alternative zu {competitor}?", "Ja. Dictivo ist eine Alternative, wenn Sie einen lokalen Mac-Diktier-Workflow mit optionalem Cloud Fast suchen."],
      ["Kann ich Dictivo ohne Dictivo-Konto nutzen?", "Ja. Local-Diktat benötigt kein Dictivo-Konto. Cloud Fast bleibt ein separater optionaler Pfad."],
      ["Was kann ich kostenlos testen?", "Tiny bleibt dauerhaft gratis. Neue Installationen erhalten 14 Tage vollen Local-Test mit allen lokalen Modellen plus 10 lebenslange Cloud-Fast-Minuten auf diesem Gerät."],
      ["Was kann ich vor dem Kauf testen?", "Tiny bleibt dauerhaft gratis. Neue Installationen erhalten außerdem 14 Tage vollen Local-Test mit allen lokalen Modellen plus 10 lebenslange Cloud-Fast-Minuten auf diesem Gerät."],
      ["Was sollte ich wählen?", "Wählen Sie Dictivo, wenn privates Mac-Diktat und Buy-once-Local-Preis am wichtigsten sind. Wählen Sie den Wettbewerber, wenn Plattformabdeckung oder Cloud-Funktionen wichtiger sind."],
    ],
    ctaKicker: "Dictivo testen",
    ctaTitle: "Dictivo 14 Tage kostenlos testen.",
    ctaBody: "Alle lokalen Modelle entsperrt, kein Dictivo-Konto für Local mode. Dictivo Local kostet $49 einmalig, wenn es passt.",
    ctaPrimary: "Dictivo 14 Tage testen",
    ctaSecondary: "Preise ansehen",
    resourceAria: "Nächste Vergleichsschritte",
    resourcePricing: "Dictivo-Preise und Pläne vergleichen",
    resourceRelated: "Weitere Alternative: {competitor}",
    compareFooter: "Alternativen vergleichen",
    footerAlternative: "{competitor}-Alternative",
    teaserKicker: "Vergleichen",
    teaserTitle: "Vergleichen Sie gerade Diktier-Apps?",
    teaserBody:
      "Vergleichen Sie Dictivo mit Cloud-Diktat, lokalen Modus-Systemen, Datei-Transkription, günstigen Indie-Tools und Apples eingebautem Diktat.",
  },
  fr: {
    skipComparison: "Aller au comparatif",
    skipComparisons: "Aller aux comparatifs",
    languageAria: "Changer la langue du comparatif",
    updatedLabel: "Dernière mise à jour :",
    hubEyebrow: "Hub de comparaison",
    hubMetaTitle: "Comparatifs Dictivo : alternatives de dictée locale pour Mac",
    hubMetaDescription:
      "Comparez Dictivo avec Wispr Flow, Superwhisper, MacWhisper, VoiceInk et la dictée macOS selon la confidentialité, le prix et le flux de travail.",
    hubH1: "Comparer Dictivo avec d'autres outils de dictée",
    hubLede:
      "Un hub pratique pour choisir une dictée privée sur Mac. Chaque comparatif commence par les points forts du produit concurrent, puis situe Dictivo.",
    hubGridLabel: "Pages de comparaison Dictivo",
    cardTitle: "Alternative à {competitor}",
    cardCta: "Comparer Dictivo avec {competitor}",
    pageTitle: "Alternative à {competitor} : dictée locale Mac avec Dictivo",
    pageMeta:
      "Comparez Dictivo avec {competitor} : confidentialité, prix, plateformes et flux de dictée locale sur Mac.",
    pageH1: "Alternative à {competitor} pour la dictée locale sur Mac",
    eyebrow: "Comparer les alternatives",
    intro: [
      "Cette page explique quand {competitor} peut convenir, puis où le flux local de Dictivo sur Mac devient plus pertinent.",
      "Consultez le tableau rapide et les notes de décision pour comparer confidentialité, prix, plateformes et frontière entre Local et Cloud Fast.",
    ],
    quickAria: "Comparatif rapide",
    quickPrefix: "{competitor} :",
    quickTake: [
      ["Idéal pour", "Dictée Mac locale et privée", "Le flux existant de {competitor}"],
      ["Modèle Dictivo", "$49 une fois, Tiny gratuit à vie, essai Local complet 14 jours", "Voir les notes de prix et d'essai ci-dessous"],
      ["Modèle de confidentialité", "Local par défaut", "Voir les détails de traitement ci-dessous"],
    ],
    atAGlanceKicker: "En bref",
    atAGlanceTitle: "{competitor} vs Dictivo en bref",
    tableCaption: "{competitor} vs Dictivo en bref",
    questionHeader: "Question",
    competitorHeader: "{competitor}",
    rowLabels: {
      "Processing location": "Lieu de traitement",
      "Trains AI on your voice": "Entraîne l'IA avec votre voix",
      "Works fully offline": "Fonctionne entièrement hors ligne",
      "Account required": "Compte requis",
      "Pricing model": "Modèle tarifaire",
      "Free tier / trial": "Offre gratuite / essai",
      Platforms: "Plateformes",
      "Privacy boundary": "Limite de confidentialité",
    },
    dictivoRows: {
      "Processing location": "Le mode Local fonctionne sur votre Mac. Cloud Fast reste séparé et ne s'utilise que si vous le choisissez.",
      "Trains AI on your voice": "Jamais en mode Local.",
      "Works fully offline": "Oui en mode Local après installation du modèle.",
      "Account required": "Pas de compte Dictivo pour la dictée locale.",
      "Pricing model": "$49 une fois, 12 mois de mises à jour, puis renouvellement optionnel à $24/an.",
      "Free tier / trial": "Tiny gratuit à vie plus essai Local complet de 14 jours avec tous les modèles.",
      Platforms: "macOS maintenant. Windows est en validation.",
      "Privacy boundary": "Le mode Local garde transcriptions, historique, dictionnaire, extraits et réglages sur le Mac. Aucun compte Dictivo n'est requis pour la dictée Local.",
    },
    sections: [
      {
        kicker: "Contexte",
        title: "Quand {competitor} peut convenir",
        paragraphs: [
          "{competitor} peut être le bon choix si sa couverture de plateformes, son workflow, ses fonctions d'équipe ou son cloud correspondent à votre besoin actuel.",
          "Ce comparatif ne dénigre pas les concurrents. Il sépare l'adéquation produit de la promesse plus ciblée de Dictivo : une dictée Mac privée qui commence en local.",
        ],
        bullets: [
          "Choisissez le concurrent si vous avez besoin de ses avantages spécifiques.",
          "Comparez l'offre actuelle, l'essai et les compromis de confidentialité avant de choisir.",
          "Choisissez Dictivo si la voie par défaut doit être une transcription locale sur Mac sans compte Dictivo.",
        ],
      },
      {
        kicker: "Différence Dictivo",
        title: "Ce qui rend Dictivo différent",
        paragraphs: [
          "Dictivo est d'abord conçu autour du mode Local. La reconnaissance vocale s'exécute sur le Mac, et les transcriptions, l'historique, le dictionnaire, les extraits et les réglages locaux restent sur la machine.",
          "Cloud Fast reste séparé. Utilisez-le seulement quand la vitesse compte plus qu'un traitement strictement local.",
        ],
        bullets: [
          "Tiny reste gratuit à vie.",
          "L'essai Local complet de 14 jours déverrouille tous les modèles locaux.",
          "Dictivo Local coûte $49 une fois, avec renouvellement de mises à jour optionnel après un an.",
          "Le flux Local ne nécessite pas de compte de transcription Dictivo.",
        ],
      },
      {
        kicker: "Décision",
        title: "Qui devrait choisir quoi",
        cards: [
          {
            title: "Choisissez {competitor} si",
            items: [
              "Vous avez besoin de sa couverture de plateformes ou de son workflow propre.",
              "Son modèle de traitement et de compte vous convient.",
              "Son abonnement, son prix à vie ou son intégration système correspondent mieux à votre budget.",
            ],
          },
          {
            title: "Choisissez Dictivo si",
            items: [
              "Vous voulez que la dictée locale sur Mac soit le chemin par défaut.",
              "Vous préférez ne pas créer de compte Dictivo pour le mode Local.",
              "Vous voulez essayer tous les modèles locaux 14 jours puis payer un prix unique plus bas.",
            ],
          },
        ],
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Dictivo est-il une alternative à {competitor} ?", "Oui. Dictivo est une alternative si vous voulez une dictée Mac locale d'abord, avec Cloud Fast en option."],
      ["Puis-je utiliser Dictivo sans compte Dictivo ?", "Oui. La dictée locale ne demande pas de compte Dictivo. Cloud Fast est un chemin optionnel séparé."],
      ["Que puis-je essayer gratuitement ?", "Tiny reste gratuit à vie. Les nouvelles installations obtiennent 14 jours d'essai Local complet avec tous les modèles locaux, plus 10 minutes Cloud Fast à vie sur cet appareil."],
      ["Que puis-je essayer avant d'acheter ?", "Tiny reste gratuit à vie. Les nouvelles installations reçoivent aussi 14 jours d'essai Local complet avec tous les modèles locaux déverrouillés, plus 10 minutes Cloud Fast à vie sur cet appareil."],
      ["Que choisir ?", "Choisissez Dictivo si la dictée Mac privée et le prix Local en achat unique comptent le plus. Choisissez l'autre outil si ses plateformes ou fonctions cloud comptent davantage."],
    ],
    ctaKicker: "Essayer Dictivo",
    ctaTitle: "Essayez Dictivo gratuitement pendant 14 jours.",
    ctaBody: "Tous les modèles locaux sont déverrouillés, sans compte Dictivo pour le mode Local. Dictivo Local coûte $49 une fois si cela vous convient.",
    ctaPrimary: "Essayer Dictivo 14 jours",
    ctaSecondary: "Voir les prix",
    resourceAria: "Étapes suivantes",
    resourcePricing: "Comparer les prix et offres Dictivo",
    resourceRelated: "Voir la comparaison avec {competitor}",
    compareFooter: "Comparer les alternatives",
    footerAlternative: "Alternative à {competitor}",
    teaserKicker: "Comparer",
    teaserTitle: "Vous hésitez avec une autre app de dictée ?",
    teaserBody:
      "Comparez Dictivo avec les outils évalués en premier : dictée cloud, systèmes locaux, apps de transcription de fichiers, outils indie peu coûteux et dictée intégrée d'Apple.",
  },
};

function compactCompareLocale(overrides) {
  return {
    ...COMPARE_I18N.en,
    ...overrides,
    rowLabels: { ...COMPARE_I18N.en.rowLabels, ...(overrides.rowLabels || {}) },
    dictivoRows: { ...COMPARE_I18N.en.dictivoRows, ...(overrides.dictivoRows || {}) },
  };
}

Object.assign(COMPARE_I18N, {
  es: compactCompareLocale({
    skipComparison: "Saltar a la comparación",
    skipComparisons: "Saltar a las comparaciones",
    languageAria: "Cambiar idioma de la página comparativa",
    updatedLabel: "Última actualización:",
    hubEyebrow: "Centro de comparación",
    hubMetaTitle: "Comparativas de Dictivo: alternativas de dictado local para Mac",
    hubMetaDescription:
      "Compara Dictivo con Wispr Flow, Superwhisper, MacWhisper, VoiceInk y Dictado de macOS por privacidad, precio y flujo de trabajo.",
    hubH1: "Compara Dictivo con otras herramientas de dictado",
    hubLede:
      "Un centro práctico para elegir un flujo de dictado privado en Mac. Cada página muestra dónde encaja la otra herramienta y dónde encaja Dictivo.",
    hubGridLabel: "Páginas comparativas de Dictivo",
    cardTitle: "Alternativa a {competitor}",
    cardCta: "Comparar Dictivo con {competitor}",
    pageTitle: "Alternativa a {competitor}: dictado local para Mac con Dictivo",
    pageMeta:
      "Compara Dictivo con {competitor}: privacidad, precio, plataformas y flujo de dictado local en Mac.",
    pageH1: "Alternativa a {competitor} para dictado local en Mac",
    eyebrow: "Comparar alternativas",
    intro: [
      "Esta página explica cuándo {competitor} puede tener sentido y cuándo el flujo local de Dictivo en Mac encaja mejor.",
      "Usa la tabla rápida y las notas de decisión para comparar privacidad, precio, plataformas y el límite entre Local y Cloud Fast.",
    ],
    quickAria: "Comparación rápida",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["Mejor para", "Dictado local privado en Mac", "El flujo existente de {competitor}"],
      ["Modelo de Dictivo", "$49 una vez, Tiny gratis para siempre, prueba Local completa de 14 días", "Ver notas de precio y prueba abajo"],
      ["Modelo de privacidad", "Local por defecto", "Ver detalles de procesamiento abajo"],
    ],
    atAGlanceKicker: "De un vistazo",
    atAGlanceTitle: "{competitor} vs Dictivo de un vistazo",
    tableCaption: "{competitor} vs Dictivo de un vistazo",
    questionHeader: "Pregunta",
    rowLabels: {
      "Processing location": "Lugar de procesamiento",
      "Trains AI on your voice": "Entrena IA con tu voz",
      "Works fully offline": "Funciona totalmente sin conexión",
      "Account required": "Cuenta requerida",
      "Pricing model": "Modelo de precio",
      "Free tier / trial": "Plan gratis / prueba",
      Platforms: "Plataformas",
      "Privacy boundary": "Límite de privacidad",
    },
    dictivoRows: {
      "Processing location": "El modo Local funciona en tu Mac. Cloud Fast está separado y solo se usa cuando lo eliges.",
      "Trains AI on your voice": "Nunca en modo Local.",
      "Works fully offline": "Sí en modo Local después de instalar el modelo local.",
      "Account required": "No hace falta cuenta de Dictivo para el dictado Local.",
      "Pricing model": "$49 una vez, 12 meses de actualizaciones y renovación opcional de $24/año.",
      "Free tier / trial": "Tiny gratis para siempre más 14 días de prueba Local completa con todos los modelos.",
      Platforms: "macOS ahora. Windows está en validación.",
      "Privacy boundary": "El modo Local mantiene transcripciones, historial, diccionario, fragmentos y ajustes en tu Mac. No hace falta cuenta de Dictivo para dictado Local.",
    },
    sections: [
      {
        kicker: "Contexto",
        title: "Cuándo {competitor} puede tener sentido",
        paragraphs: [
          "{competitor} puede ser la elección correcta si su cobertura de plataformas, flujo de trabajo, funciones de equipo o comportamiento en la nube coinciden con lo que necesitas.",
          "Esta comparación no intenta debilitar a cada competidor. Separa el encaje de producto de la promesa más concreta de Dictivo: dictado privado en Mac que empieza en local.",
        ],
        bullets: [
          "Elige el competidor si necesitas sus ventajas específicas de plataforma o flujo.",
          "Compara la oferta actual, la prueba y los compromisos de privacidad antes de elegir.",
          "Usa Dictivo si la ruta predeterminada debe ser transcripción local en Mac sin cuenta de Dictivo.",
        ],
      },
      {
        kicker: "Diferencia Dictivo",
        title: "Dónde Dictivo es diferente",
        paragraphs: [
          "Dictivo está construido primero alrededor del modo Local. El reconocimiento de voz corre en el Mac y las transcripciones, historial, diccionario, snippets y ajustes locales permanecen en la máquina.",
          "Cloud Fast está separado a propósito. Úsalo solo cuando la velocidad importe más que el procesamiento estrictamente local.",
        ],
        bullets: [
          "Tiny sigue gratis para siempre.",
          "La prueba Local completa de 14 días desbloquea todos los modelos locales.",
          "Dictivo Local cuesta $49 una vez, con renovación opcional de actualizaciones después del primer año.",
          "El flujo Local no requiere cuenta de transcripción de Dictivo.",
        ],
      },
      {
        kicker: "Decisión",
        title: "Quién debería elegir cada opción",
        cards: [
          {
            title: "Elige {competitor} si",
            items: [
              "Necesitas su cobertura de plataformas o su flujo específico.",
              "Aceptas el modelo de procesamiento y cuenta descrito en su documentación.",
              "Su suscripción, precio de por vida o integración del sistema encaja mejor con tu presupuesto.",
            ],
          },
          {
            title: "Elige Dictivo si",
            items: [
              "Quieres que el dictado local en Mac sea la ruta predeterminada.",
              "Prefieres no crear una cuenta de Dictivo para el modo Local.",
              "Quieres probar todos los modelos locales durante 14 días y luego pagar menos una sola vez.",
            ],
          },
        ],
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      ["¿Dictivo es una alternativa a {competitor}?", "Sí. Dictivo es una alternativa si quieres un flujo de dictado en Mac local primero, con Cloud Fast como opción separada."],
      ["¿Puedo usar Dictivo sin cuenta?", "Sí. El dictado Local no requiere cuenta de Dictivo. Cloud Fast es una ruta opcional separada."],
      ["¿Qué puedo probar gratis?", "Tiny sigue gratis para siempre. Las nuevas instalaciones reciben 14 días de prueba Local completa con todos los modelos, más 10 minutos Cloud Fast de por vida en ese dispositivo."],
      ["¿Qué puedo probar antes de comprar?", "Tiny sigue gratis para siempre. Las nuevas instalaciones también reciben 14 días de prueba Local completa con todos los modelos locales desbloqueados, más 10 minutos Cloud Fast de por vida en ese dispositivo."],
      ["¿Cuál debería elegir?", "Elige Dictivo si importan más el dictado privado en Mac y el precio Local de compra única. Elige el competidor si sus plataformas o funciones cloud pesan más."],
    ],
    ctaKicker: "Probar Dictivo",
    ctaTitle: "Prueba Dictivo gratis durante 14 días.",
    ctaBody: "Todos los modelos locales desbloqueados, sin cuenta de Dictivo para Local. Dictivo Local cuesta $49 una vez si encaja con tu flujo.",
    ctaPrimary: "Probar Dictivo 14 días",
    ctaSecondary: "Ver precios",
    resourceAria: "Siguientes pasos",
    resourcePricing: "Comparar precios y planes de Dictivo",
    resourceRelated: "Ver comparación con {competitor}",
    compareFooter: "Comparar alternativas",
    footerAlternative: "Alternativa a {competitor}",
    teaserKicker: "Comparar",
    teaserTitle: "¿Estás evaluando otra app de dictado?",
    teaserBody:
      "Compara Dictivo con dictado cloud, sistemas locales, apps de transcripción de archivos, herramientas indie de bajo coste y el dictado integrado de Apple.",
  }),
  zh: compactCompareLocale({
    skipComparison: "跳到比较内容",
    skipComparisons: "跳到比较列表",
    languageAria: "切换比较页语言",
    updatedLabel: "最后更新：",
    hubEyebrow: "比较中心",
    hubMetaTitle: "Dictivo 对比：Mac 本地听写替代方案",
    hubMetaDescription:
      "从隐私、价格和工作流角度，对比 Dictivo 与 Wispr Flow、Superwhisper、MacWhisper、VoiceInk 和 macOS Dictation。",
    hubH1: "将 Dictivo 与其他听写工具对比",
    hubLede:
      "这个比较中心帮助你选择更适合的私密 Mac 听写工作流。每页先说明对方产品适合什么场景，再说明 Dictivo 的本地优先架构适合哪里。",
    hubGridLabel: "Dictivo 比较页面",
    cardTitle: "{competitor} 替代方案",
    cardCta: "对比 Dictivo 与 {competitor}",
    pageTitle: "{competitor} 替代方案：Dictivo 的 Mac 本地听写",
    pageMeta:
      "对比 Dictivo 与 {competitor}：隐私、价格、平台支持，以及 Mac 本地听写工作流。",
    pageH1: "{competitor} 替代方案：以 Mac 本地听写为默认路径",
    eyebrow: "比较替代方案",
    intro: [
      "这页说明 {competitor} 在什么情况下可能合适，以及 Dictivo 的 Mac 本地工作流在什么情况下更合适。",
      "你可以通过快速对比表和选择建议，对比隐私、价格、平台支持，以及 Local 与 Cloud Fast 的边界。",
    ],
    quickAria: "快速比较",
    quickPrefix: "{competitor}：",
    quickTake: [
      ["最适合", "私密 Mac 本地听写", "{competitor} 现有工作流"],
      ["Dictivo 模式", "$49 一次买断，Tiny 永久免费，14 天完整 Local 试用", "见下方价格与试用说明"],
      ["隐私模式", "默认 Local", "见下方处理位置说明"],
    ],
    atAGlanceKicker: "快速概览",
    atAGlanceTitle: "{competitor} vs Dictivo 快速对比",
    tableCaption: "{competitor} vs Dictivo 快速对比",
    questionHeader: "问题",
    rowLabels: {
      "Processing location": "处理位置",
      "Trains AI on your voice": "是否用你的声音训练 AI",
      "Works fully offline": "是否可完全离线",
      "Account required": "是否需要账号",
      "Pricing model": "价格模式",
      "Free tier / trial": "免费版 / 试用",
      Platforms: "平台",
      "Privacy boundary": "隐私边界",
    },
    dictivoRows: {
      "Processing location": "Local 模式在你的 Mac 上运行；Cloud Fast 是独立路径，只在你主动选择时使用。",
      "Trains AI on your voice": "Local 模式下不会。",
      "Works fully offline": "可以。安装本地模型后，Local 模式可离线使用。",
      "Account required": "Local 听写不需要 Dictivo 账号。",
      "Pricing model": "$49 一次买断，含 12 个月更新，之后可选 $24/年更新续费。",
      "Free tier / trial": "Tiny 永久免费，外加 14 天完整 Local 试用，可解锁所有本地模型。",
      Platforms: "目前 macOS。Windows 正在验证。",
      "Privacy boundary": "Local 模式会把转录、历史、词典、片段和设置保留在 Mac 上。Local 听写不需要 Dictivo 账号。",
    },
    sections: [
      {
        kicker: "背景",
        title: "{competitor} 什么时候可能合适",
        paragraphs: [
          "如果你需要 {competitor} 当前的平台覆盖、特定工作流、团队功能或云模型能力，它可能是更合适的选择。",
          "这页不是为了贬低竞争产品，而是区分产品适配度和 Dictivo 更窄的承诺：默认从本地开始的私密 Mac 听写。",
        ],
        bullets: [
          "如果你需要对方特定的平台或工作流优势，可以选择对方。",
          "在选择前，对比当前价格、试用权益和隐私取舍。",
          "如果默认路径应该是无需 Dictivo 账号的 Mac 本地转录，选择 Dictivo。",
        ],
      },
      {
        kicker: "Dictivo 的不同",
        title: "Dictivo 不同在哪里",
        paragraphs: [
          "Dictivo 首先围绕 Local 模式构建。语音识别在 Mac 上运行，转录、历史、词典、片段和本地设置都保留在本机。",
          "Cloud Fast 被刻意做成独立路径。只有当速度比纯本地处理更重要时才使用它。",
        ],
        bullets: [
          "Tiny 永久免费。",
          "14 天完整 Local 试用解锁所有本地模型。",
          "Dictivo Local 是 $49 一次买断，第一年后可选更新续费。",
          "Local 工作流不需要 Dictivo 转录账号。",
        ],
      },
      {
        kicker: "选择建议",
        title: "应该选择哪一个",
        cards: [
          {
            title: "选择 {competitor} 如果",
            items: [
              "你需要它当前的平台覆盖或产品特定工作流。",
              "你接受它文档中描述的处理和账号模式。",
              "它的订阅、终身价格或系统内置状态更符合预算。",
            ],
          },
          {
            title: "选择 Dictivo 如果",
            items: [
              "你希望 Mac 本地听写是默认路径。",
              "你不想为了 Local 模式创建 Dictivo 账号。",
              "你想先试用所有本地模型 14 天，再用较低的一次性价格购买。",
            ],
          },
        ],
      },
    ],
    faqKicker: "FAQ",
    faqTitle: "常见问题",
    faqs: [
      ["Dictivo 是 {competitor} 的替代方案吗？", "是。如果你想要本地优先的 Mac 听写工作流，并把 Cloud Fast 作为可选路径，Dictivo 就是一个替代方案。"],
      ["可以不注册 Dictivo 账号使用吗？", "可以。Local 听写不需要 Dictivo 账号。Cloud Fast 是独立的可选路径。"],
      ["免费可以试什么？", "Tiny 永久免费。新安装还会获得 14 天完整 Local 试用，解锁所有本地模型，并在该设备上获得 10 分钟终身 Cloud Fast 免费额度。"],
      ["购买前可以免费试什么？", "Tiny 永久免费。新安装还会获得 14 天完整 Local 试用，解锁所有本地模型，并在该设备上获得 10 分钟终身 Cloud Fast 免费额度。"],
      ["我应该选哪个？", "如果私密 Mac 听写和 Local 一次买断价格最重要，选择 Dictivo。如果对方的平台或云功能更重要，选择对方。"],
    ],
    ctaKicker: "试用 Dictivo",
    ctaTitle: "免费试用 Dictivo 14 天。",
    ctaBody: "所有本地模型解锁，Local 模式不需要 Dictivo 账号。如果适合你的工作流，Dictivo Local $49 一次买断。",
    ctaPrimary: "试用 Dictivo 14 天",
    ctaSecondary: "查看价格",
    resourceAria: "比较后的下一步",
    resourcePricing: "比较 Dictivo 价格与套餐",
    resourceRelated: "查看与 {competitor} 的比较",
    compareFooter: "比较替代方案",
    footerAlternative: "{competitor} 替代方案",
    teaserKicker: "比较",
    teaserTitle: "正在和其他听写应用做选择？",
    teaserBody:
      "对比 Dictivo 与常见候选：云听写、本地模式系统、文件转录应用、低成本独立工具，以及 Apple 内置听写。",
  }),
});

Object.assign(COMPARE_I18N, {
  it: compactCompareLocale({
    skipComparison: "Vai al confronto",
    skipComparisons: "Vai ai confronti",
    languageAria: "Cambia lingua della pagina di confronto",
    updatedLabel: "Ultimo aggiornamento:",
    hubEyebrow: "Centro confronti",
    hubMetaTitle: "Confronti Dictivo: alternative di dettatura locale per Mac",
    hubMetaDescription:
      "Confronta Dictivo con Wispr Flow, Superwhisper, MacWhisper, VoiceInk e Dettatura macOS per privacy, prezzo e flusso di lavoro.",
    hubH1: "Confronta Dictivo con altri strumenti di dettatura",
    hubLede:
      "Un centro pratico per scegliere un flusso di dettatura privata su Mac. Ogni pagina spiega dove il concorrente funziona bene e dove si inserisce Dictivo.",
    hubGridLabel: "Pagine di confronto Dictivo",
    cardTitle: "Alternativa a {competitor}",
    cardCta: "Confronta Dictivo con {competitor}",
    pageTitle: "Alternativa a {competitor}: dettatura locale Mac con Dictivo",
    pageMeta:
      "Confronta Dictivo con {competitor}: privacy, prezzo, piattaforme e flusso di dettatura locale su Mac.",
    pageH1: "Alternativa a {competitor} per la dettatura locale su Mac",
    eyebrow: "Confronta alternative",
    intro: [
      "Questa pagina spiega quando {competitor} può avere senso e quando il flusso locale di Dictivo su Mac è più adatto.",
      "Usa la tabella rapida e le note decisionali per confrontare privacy, prezzo, piattaforme e confine tra Local e Cloud Fast.",
    ],
    quickAria: "Confronto rapido",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["Ideale per", "Dettatura Mac locale e privata", "Il flusso esistente di {competitor}"],
      ["Modello Dictivo", "$49 una volta, Tiny gratis per sempre, prova Local completa di 14 giorni", "Vedi note su prezzi e prova sotto"],
      ["Privacy", "Local per impostazione predefinita", "Vedi dettagli sul luogo di elaborazione sotto"],
    ],
    atAGlanceKicker: "In breve",
    atAGlanceTitle: "{competitor} vs Dictivo in breve",
    tableCaption: "{competitor} vs Dictivo in breve",
    questionHeader: "Domanda",
    rowLabels: {
      "Processing location": "Luogo di elaborazione",
      "Trains AI on your voice": "Addestra IA sulla tua voce",
      "Works fully offline": "Funziona completamente offline",
      "Account required": "Account richiesto",
      "Pricing model": "Modello di prezzo",
      "Free tier / trial": "Piano gratuito / prova",
      Platforms: "Piattaforme",
      "Privacy boundary": "Confine privacy",
    },
    dictivoRows: {
      "Processing location": "La modalità Local funziona sul Mac. Cloud Fast resta separato e si usa solo quando lo scegli.",
      "Trains AI on your voice": "Mai in modalità Local.",
      "Works fully offline": "Sì in modalità Local dopo l'installazione del modello locale.",
      "Account required": "Nessun account Dictivo per la dettatura Local.",
      "Pricing model": "$49 una volta, 12 mesi di aggiornamenti, poi rinnovo opzionale da $24/anno.",
      "Free tier / trial": "Tiny gratis per sempre più prova Local completa di 14 giorni con tutti i modelli locali.",
      Platforms: "macOS ora. Windows è in validazione.",
      "Privacy boundary": "La modalità Local tiene trascrizioni, cronologia, dizionario, snippet e impostazioni sul Mac. La dettatura Local non richiede un account Dictivo.",
    },
    sections: [
      {
        kicker: "Contesto",
        title: "Quando {competitor} può avere senso",
        paragraphs: [
          "{competitor} può essere la scelta giusta se piattaforme, workflow, funzioni di team o comportamento cloud corrispondono a ciò che ti serve oggi.",
          "Questo confronto non svaluta i concorrenti. Separa l'adattamento del prodotto dalla promessa più stretta di Dictivo: dettatura privata su Mac che parte in locale.",
        ],
        bullets: [
          "Scegli il concorrente se hai bisogno dei suoi vantaggi specifici di piattaforma o workflow.",
          "Confronta l'offerta attuale, la prova e i compromessi sulla privacy prima di scegliere.",
          "Usa Dictivo se il percorso predefinito deve essere trascrizione locale su Mac senza account Dictivo.",
        ],
      },
      {
        kicker: "Differenza Dictivo",
        title: "Dove Dictivo è diverso",
        paragraphs: [
          "Dictivo è costruito prima attorno alla modalità Local. Il riconoscimento vocale gira sul Mac e trascrizioni, cronologia, dizionario, snippet e impostazioni locali restano sulla macchina.",
          "Cloud Fast resta separato. Usalo solo quando la velocità conta più del trattamento esclusivamente locale.",
        ],
        bullets: [
          "Tiny resta gratis per sempre.",
          "La prova Local completa di 14 giorni sblocca tutti i modelli locali.",
          "Dictivo Local costa $49 una volta, con rinnovi opzionali degli aggiornamenti dopo il primo anno.",
          "Il workflow Local non richiede un account di trascrizione Dictivo.",
        ],
      },
      {
        kicker: "Decisione",
        title: "Chi dovrebbe scegliere cosa",
        cards: [
          {
            title: "Scegli {competitor} se",
            items: [
              "Ti servono la sua copertura di piattaforme o il suo workflow specifico.",
              "Il modello di elaborazione e account descritto nella documentazione ti va bene.",
              "Abbonamento, prezzo lifetime o integrazione di sistema sono più adatti al tuo budget.",
            ],
          },
          {
            title: "Scegli Dictivo se",
            items: [
              "Vuoi che la dettatura locale su Mac sia il percorso predefinito.",
              "Preferisci non creare un account Dictivo per la modalità Local.",
              "Vuoi provare tutti i modelli locali per 14 giorni e poi pagare meno una sola volta.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Dictivo è un'alternativa a {competitor}?", "Sì. Dictivo è un'alternativa se vuoi un workflow di dettatura Mac prima locale, con Cloud Fast come opzione separata."],
      ["Posso usare Dictivo senza account?", "Sì. La dettatura Local non richiede un account Dictivo. Cloud Fast è un percorso opzionale separato."],
      ["Cosa posso provare gratis?", "Tiny resta gratis per sempre. Le nuove installazioni hanno 14 giorni di prova Local completa con tutti i modelli, più 10 minuti Cloud Fast a vita su quel dispositivo."],
      ["Cosa posso provare prima di acquistare?", "Tiny resta gratis per sempre. Le nuove installazioni hanno anche 14 giorni di prova Local completa con tutti i modelli locali, più 10 minuti Cloud Fast a vita su quel dispositivo."],
      ["Cosa dovrei scegliere?", "Scegli Dictivo se contano di più dettatura privata su Mac e prezzo Local una tantum. Scegli il concorrente se piattaforme o funzioni cloud contano di più."],
    ],
    ctaKicker: "Prova Dictivo",
    ctaTitle: "Prova Dictivo gratis per 14 giorni.",
    ctaBody: "Tutti i modelli locali sbloccati, senza account Dictivo per Local. Dictivo Local costa $49 una volta se si adatta al tuo flusso.",
    ctaPrimary: "Prova Dictivo 14 giorni",
    ctaSecondary: "Vedi prezzi",
    resourceAria: "Passi successivi",
    resourcePricing: "Confronta prezzi e piani Dictivo",
    resourceRelated: "Vedi confronto con {competitor}",
    compareFooter: "Confronta alternative",
    footerAlternative: "Alternativa a {competitor}",
    teaserKicker: "Confronta",
    teaserTitle: "Stai valutando un'altra app di dettatura?",
    teaserBody:
      "Confronta Dictivo con dettatura cloud, sistemi locali, app di trascrizione file, strumenti indie a basso costo e la dettatura integrata di Apple.",
  }),
  nl: compactCompareLocale({
    skipComparison: "Ga naar vergelijking",
    skipComparisons: "Ga naar vergelijkingen",
    languageAria: "Taal van vergelijkingspagina wijzigen",
    updatedLabel: "Laatst bijgewerkt:",
    hubEyebrow: "Vergelijkingshub",
    hubMetaTitle: "Dictivo-vergelijkingen: lokale dicteeralternatieven voor Mac",
    hubMetaDescription:
      "Vergelijk Dictivo met Wispr Flow, Superwhisper, MacWhisper, VoiceInk en macOS Dictation op privacy, prijs en workflow.",
    hubH1: "Vergelijk Dictivo met andere dicteertools",
    hubLede:
      "Een praktisch overzicht voor een private Mac-dicteerworkflow. Elke pagina laat zien waar de andere tool goed past en waar Dictivo past.",
    hubGridLabel: "Dictivo-vergelijkingspagina's",
    cardTitle: "{competitor}-alternatief",
    cardCta: "Vergelijk Dictivo met {competitor}",
    pageTitle: "{competitor}-alternatief: lokale Mac-dictatie met Dictivo",
    pageMeta:
      "Vergelijk Dictivo met {competitor}: privacy, prijs, platforms en lokale Mac-dicteerworkflow.",
    pageH1: "{competitor}-alternatief voor lokale Mac-dictatie",
    eyebrow: "Alternatieven vergelijken",
    intro: [
      "Deze pagina legt uit wanneer {competitor} logisch kan zijn en wanneer Dictivo's lokale Mac-workflow beter past.",
      "Gebruik de korte tabel en beslisnotities om privacy, prijs, platforms en de grens tussen Local en Cloud Fast te vergelijken.",
    ],
    quickAria: "Snelle vergelijking",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["Beste voor", "Private lokale Mac-dictatie", "De bestaande workflow van {competitor}"],
      ["Dictivo-model", "$49 eenmalig, Tiny altijd gratis, 14 dagen volledige Local-proef", "Zie prijs- en proefnotities hieronder"],
      ["Privacymodel", "Local standaard", "Zie verwerkingslocatie hieronder"],
    ],
    atAGlanceKicker: "In één oogopslag",
    atAGlanceTitle: "{competitor} vs Dictivo in één oogopslag",
    tableCaption: "{competitor} vs Dictivo in één oogopslag",
    questionHeader: "Vraag",
    rowLabels: {
      "Processing location": "Verwerkingslocatie",
      "Trains AI on your voice": "Traint AI op je stem",
      "Works fully offline": "Werkt volledig offline",
      "Account required": "Account vereist",
      "Pricing model": "Prijsmodel",
      "Free tier / trial": "Gratis laag / proef",
      Platforms: "Platforms",
      "Privacy boundary": "Privacygrens",
    },
    dictivoRows: {
      "Processing location": "Local-modus draait op je Mac. Cloud Fast blijft apart en wordt alleen gebruikt wanneer je het kiest.",
      "Trains AI on your voice": "Nooit in Local-modus.",
      "Works fully offline": "Ja in Local-modus nadat het lokale model is geïnstalleerd.",
      "Account required": "Geen Dictivo-account voor Local-dictatie.",
      "Pricing model": "$49 eenmalig, 12 maanden updates, daarna optionele verlenging van $24/jaar.",
      "Free tier / trial": "Tiny altijd gratis plus 14 dagen volledige Local-proef met alle lokale modellen.",
      Platforms: "macOS nu. Windows wordt gevalideerd.",
      "Privacy boundary": "Local-modus houdt transcripties, geschiedenis, woordenboek, snippets en instellingen op je Mac. Voor Local-dictatie is geen Dictivo-account nodig.",
    },
    sections: [
      {
        kicker: "Context",
        title: "Wanneer {competitor} logisch kan zijn",
        paragraphs: [
          "{competitor} kan de juiste keuze zijn als platformdekking, workflow, teamfuncties of cloudgedrag precies passen bij wat je nu nodig hebt.",
          "Deze vergelijking maakt concurrenten niet kleiner dan ze zijn. Ze scheidt product-fit van Dictivo's smallere belofte: private Mac-dictatie die lokaal begint.",
        ],
        bullets: [
          "Kies de concurrent als je zijn specifieke platform- of workflowvoordelen nodig hebt.",
          "Vergelijk het huidige aanbod, de proefperiode en de privacyafweging voordat je kiest.",
          "Gebruik Dictivo als de standaardroute lokale Mac-transcriptie zonder Dictivo-account moet zijn.",
        ],
      },
      {
        kicker: "Dictivo-verschil",
        title: "Waar Dictivo anders is",
        paragraphs: [
          "Dictivo is eerst gebouwd rond Local-modus. Spraakherkenning draait op de Mac en transcripties, geschiedenis, woordenboek, snippets en lokale instellingen blijven op de machine.",
          "Cloud Fast is bewust gescheiden. Gebruik het alleen wanneer snelheid belangrijker is dan strikt lokale verwerking.",
        ],
        bullets: [
          "Tiny blijft altijd gratis.",
          "De volledige Local-proef van 14 dagen ontgrendelt elk lokaal model.",
          "Dictivo Local kost $49 eenmalig, met optionele updateverlenging na het eerste jaar.",
          "De Local-workflow vereist geen Dictivo-transcriptieaccount.",
        ],
      },
      {
        kicker: "Beslissing",
        title: "Wie welke optie zou moeten kiezen",
        cards: [
          {
            title: "Kies {competitor} als",
            items: [
              "Je zijn huidige platformdekking of productspecifieke workflow nodig hebt.",
              "Het verwerkings- en accountmodel uit de documentatie voor jou werkt.",
              "Zijn abonnement, lifetime-prijs of ingebouwde status beter bij je budget past.",
            ],
          },
          {
            title: "Kies Dictivo als",
            items: [
              "Je lokale Mac-dictatie als standaardroute wilt.",
              "Je geen Dictivo-account wilt voor Local-modus.",
              "Je alle lokale modellen 14 dagen wilt proberen en daarna liever lager eenmalig betaalt.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Is Dictivo een alternatief voor {competitor}?", "Ja. Dictivo is een alternatief als je een lokale Mac-dicteerworkflow wilt met Cloud Fast als aparte optie."],
      ["Kan ik Dictivo zonder Dictivo-account gebruiken?", "Ja. Local-dictatie vereist geen Dictivo-account. Cloud Fast is een aparte optionele route."],
      ["Wat kan ik gratis proberen?", "Tiny blijft altijd gratis. Nieuwe installaties krijgen 14 dagen volledige Local-proef met alle lokale modellen plus 10 Cloud Fast-minuten voor altijd op dat apparaat."],
      ["Wat kan ik proberen voordat ik koop?", "Tiny blijft altijd gratis. Nieuwe installaties krijgen ook 14 dagen volledige Local-proef met alle lokale modellen plus 10 Cloud Fast-minuten voor altijd op dat apparaat."],
      ["Welke moet ik kiezen?", "Kies Dictivo als private Mac-dictatie en eenmalige Local-prijs het belangrijkst zijn. Kies de concurrent als platforms of cloudfuncties belangrijker zijn."],
    ],
    ctaKicker: "Probeer Dictivo",
    ctaTitle: "Probeer Dictivo 14 dagen gratis.",
    ctaBody: "Alle lokale modellen ontgrendeld, geen Dictivo-account voor Local. Dictivo Local kost $49 eenmalig als het past.",
    ctaPrimary: "Probeer Dictivo 14 dagen",
    ctaSecondary: "Bekijk prijzen",
    resourceAria: "Volgende stappen",
    resourcePricing: "Vergelijk Dictivo-prijzen en plannen",
    resourceRelated: "Bekijk vergelijking met {competitor}",
    compareFooter: "Alternatieven vergelijken",
    footerAlternative: "{competitor}-alternatief",
    teaserKicker: "Vergelijk",
    teaserTitle: "Vergelijk je met een andere dicteerapp?",
    teaserBody:
      "Vergelijk Dictivo met cloud-dictatie, lokale modussystemen, bestandstranscriptieapps, goedkope indie-tools en Apple's ingebouwde dictatie.",
  }),
  pt: compactCompareLocale({
    skipComparison: "Ir para a comparação",
    skipComparisons: "Ir para as comparações",
    languageAria: "Alterar idioma da página de comparação",
    updatedLabel: "Última atualização:",
    hubEyebrow: "Central de comparação",
    hubMetaTitle: "Comparações do Dictivo: alternativas de ditado local para Mac",
    hubMetaDescription:
      "Compare o Dictivo com Wispr Flow, Superwhisper, MacWhisper, VoiceInk e Ditado do macOS por privacidade, preço e fluxo de trabalho.",
    hubH1: "Compare o Dictivo com outras ferramentas de ditado",
    hubLede:
      "Uma central prática para escolher um fluxo privado de ditado no Mac. Cada página mostra onde a outra ferramenta faz sentido e onde o Dictivo se encaixa.",
    hubGridLabel: "Páginas de comparação do Dictivo",
    cardTitle: "Alternativa ao {competitor}",
    cardCta: "Comparar Dictivo com {competitor}",
    pageTitle: "Alternativa ao {competitor}: ditado local no Mac com Dictivo",
    pageMeta:
      "Compare o Dictivo com {competitor}: privacidade, preço, plataformas e fluxo de ditado local no Mac.",
    pageH1: "Alternativa ao {competitor} para ditado local no Mac",
    eyebrow: "Comparar alternativas",
    intro: [
      "Esta página explica quando {competitor} pode fazer sentido e quando o fluxo local do Dictivo no Mac é melhor.",
      "Use a tabela rápida e as notas de decisão para comparar privacidade, preço, plataformas e a fronteira entre Local e Cloud Fast.",
    ],
    quickAria: "Comparação rápida",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["Melhor para", "Ditado local e privado no Mac", "O fluxo existente do {competitor}"],
      ["Modelo Dictivo", "$49 uma vez, Tiny grátis para sempre, teste Local completo de 14 dias", "Veja notas de preço e teste abaixo"],
      ["Modelo de privacidade", "Local por padrão", "Veja detalhes de processamento abaixo"],
    ],
    atAGlanceKicker: "Resumo",
    atAGlanceTitle: "{competitor} vs Dictivo em resumo",
    tableCaption: "{competitor} vs Dictivo em resumo",
    questionHeader: "Pergunta",
    rowLabels: {
      "Processing location": "Local de processamento",
      "Trains AI on your voice": "Treina IA com sua voz",
      "Works fully offline": "Funciona totalmente offline",
      "Account required": "Conta obrigatória",
      "Pricing model": "Modelo de preço",
      "Free tier / trial": "Plano gratuito / teste",
      Platforms: "Plataformas",
      "Privacy boundary": "Limite de privacidade",
    },
    dictivoRows: {
      "Processing location": "O modo Local roda no Mac. Cloud Fast é separado e só é usado quando você escolhe.",
      "Trains AI on your voice": "Nunca no modo Local.",
      "Works fully offline": "Sim no modo Local depois que o modelo local é instalado.",
      "Account required": "Não há conta Dictivo para ditado Local.",
      "Pricing model": "$49 uma vez, 12 meses de atualizações e renovação opcional de $24/ano.",
      "Free tier / trial": "Tiny grátis para sempre mais teste Local completo de 14 dias com todos os modelos locais.",
      Platforms: "macOS agora. Windows está em validação.",
      "Privacy boundary": "O modo Local mantém transcrições, histórico, dicionário, snippets e configurações no Mac. O ditado Local não exige conta Dictivo.",
    },
    sections: [
      {
        kicker: "Contexto",
        title: "Quando {competitor} pode fazer sentido",
        paragraphs: [
          "{competitor} pode ser a escolha certa se cobertura de plataformas, fluxo de trabalho, recursos de equipe ou comportamento em nuvem forem exatamente o que você precisa.",
          "Esta comparação não diminui concorrentes. Ela separa encaixe de produto da promessa mais focada do Dictivo: ditado privado no Mac que começa localmente.",
        ],
        bullets: [
          "Escolha o concorrente se você precisa das vantagens específicas dele.",
          "Compare a oferta atual, o teste e as trocas de privacidade antes de escolher.",
          "Use o Dictivo se o caminho padrão deve ser transcrição local no Mac sem conta Dictivo.",
        ],
      },
      {
        kicker: "Diferença Dictivo",
        title: "Onde o Dictivo é diferente",
        paragraphs: [
          "O Dictivo é construído primeiro em torno do modo Local. O reconhecimento de voz roda no Mac, e transcrições, histórico, dicionário, snippets e configurações locais ficam na máquina.",
          "Cloud Fast é separado de propósito. Use apenas quando velocidade for mais importante que processamento somente local.",
        ],
        bullets: [
          "Tiny continua grátis para sempre.",
          "O teste Local completo de 14 dias desbloqueia todos os modelos locais.",
          "Dictivo Local custa $49 uma vez, com renovação opcional de atualizações após o primeiro ano.",
          "O fluxo Local não exige conta de transcrição Dictivo.",
        ],
      },
      {
        kicker: "Decisão",
        title: "Quem deve escolher cada opção",
        cards: [
          {
            title: "Escolha {competitor} se",
            items: [
              "Você precisa da cobertura de plataformas ou do fluxo específico dele.",
              "O modelo de processamento e conta descrito na documentação funciona para você.",
              "A assinatura, preço vitalício ou status integrado combina melhor com seu orçamento.",
            ],
          },
          {
            title: "Escolha Dictivo se",
            items: [
              "Você quer ditado local no Mac como caminho padrão.",
              "Você prefere não criar conta Dictivo para o modo Local.",
              "Você quer testar todos os modelos locais por 14 dias e depois pagar menos uma única vez.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["O Dictivo é uma alternativa ao {competitor}?", "Sim. O Dictivo é uma alternativa se você quer um fluxo de ditado no Mac primeiro local, com Cloud Fast como opção separada."],
      ["Posso usar o Dictivo sem conta?", "Sim. O ditado Local não exige conta Dictivo. Cloud Fast é um caminho opcional separado."],
      ["O que posso testar grátis?", "Tiny continua grátis para sempre. Novas instalações recebem 14 dias de teste Local completo com todos os modelos, mais 10 minutos Cloud Fast vitalícios nesse dispositivo."],
      ["O que posso testar antes de comprar?", "Tiny continua grátis para sempre. Novas instalações também recebem 14 dias de teste Local completo com todos os modelos locais, mais 10 minutos Cloud Fast vitalícios nesse dispositivo."],
      ["Qual devo escolher?", "Escolha Dictivo se ditado privado no Mac e preço Local de compra única importam mais. Escolha o concorrente se plataformas ou recursos em nuvem importam mais."],
    ],
    ctaKicker: "Teste o Dictivo",
    ctaTitle: "Teste o Dictivo grátis por 14 dias.",
    ctaBody: "Todos os modelos locais desbloqueados, sem conta Dictivo para Local. Dictivo Local custa $49 uma vez se fizer sentido.",
    ctaPrimary: "Testar Dictivo por 14 dias",
    ctaSecondary: "Ver preços",
    resourceAria: "Próximos passos",
    resourcePricing: "Comparar preços e planos do Dictivo",
    resourceRelated: "Ver comparação com {competitor}",
    compareFooter: "Comparar alternativas",
    footerAlternative: "Alternativa ao {competitor}",
    teaserKicker: "Comparar",
    teaserTitle: "Comparando com outro app de ditado?",
    teaserBody:
      "Compare o Dictivo com ditado em nuvem, sistemas locais, apps de transcrição de arquivos, ferramentas indie de baixo custo e o Ditado integrado da Apple.",
  }),
  ja: compactCompareLocale({
    skipComparison: "比較へ移動",
    skipComparisons: "比較一覧へ移動",
    languageAria: "比較ページの言語を変更",
    updatedLabel: "最終更新:",
    hubEyebrow: "比較ハブ",
    hubMetaTitle: "Dictivo 比較: Mac 向けローカル音声入力の代替候補",
    hubMetaDescription:
      "Dictivo を Wispr Flow、Superwhisper、MacWhisper、VoiceInk、macOS Dictation とプライバシー、価格、ワークフローで比較します。",
    hubH1: "Dictivo と他の音声入力ツールを比較",
    hubLede:
      "Mac でプライベートな音声入力ワークフローを選ぶための比較ハブです。各ページでは相手製品が合う場面と Dictivo が合う場面を分けて説明します。",
    hubGridLabel: "Dictivo 比較ページ",
    cardTitle: "{competitor} の代替",
    cardCta: "Dictivo と {competitor} を比較",
    pageTitle: "{competitor} の代替: Dictivo の Mac ローカル音声入力",
    pageMeta:
      "Dictivo と {competitor} を、プライバシー、価格、対応プラットフォーム、Mac ローカル音声入力ワークフローで比較します。",
    pageH1: "{competitor} の代替になる Mac ローカル音声入力",
    eyebrow: "代替候補を比較",
    intro: [
      "このページでは {competitor} が合う場面と、Dictivo の Mac ローカルワークフローが合う場面を説明します。",
      "クイック比較表と判断メモを使って、プライバシー、価格、プラットフォーム、Local と Cloud Fast の境界を比較できます。",
    ],
    quickAria: "クイック比較",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["向いている用途", "プライベートな Mac ローカル音声入力", "{competitor} の既存ワークフロー"],
      ["Dictivo の形", "$49 買い切り、Tiny は永久無料、14 日間の完全 Local トライアル", "価格とトライアルの注記は下を参照"],
      ["プライバシー", "Local がデフォルト", "処理場所の詳細は下を参照"],
    ],
    atAGlanceKicker: "概要",
    atAGlanceTitle: "{competitor} vs Dictivo 概要",
    tableCaption: "{competitor} vs Dictivo 概要",
    questionHeader: "項目",
    rowLabels: {
      "Processing location": "処理場所",
      "Trains AI on your voice": "音声を AI 学習に使うか",
      "Works fully offline": "完全オフライン対応",
      "Account required": "アカウント要否",
      "Pricing model": "価格モデル",
      "Free tier / trial": "無料枠 / トライアル",
      Platforms: "プラットフォーム",
      "Privacy boundary": "プライバシー境界",
    },
    dictivoRows: {
      "Processing location": "Local モードは Mac 上で動作します。Cloud Fast は別経路で、選択した場合だけ使われます。",
      "Trains AI on your voice": "Local モードでは使いません。",
      "Works fully offline": "ローカルモデルをインストール後、Local モードで利用できます。",
      "Account required": "Local 音声入力に Dictivo アカウントは不要です。",
      "Pricing model": "$49 買い切り、12 か月のアップデート、その後は任意で $24/年更新。",
      "Free tier / trial": "Tiny は永久無料。さらに全ローカルモデルを 14 日間試せる完全 Local トライアル。",
      Platforms: "現在 macOS。Windows は検証中。",
      "Privacy boundary": "Local モードでは文字起こし、履歴、辞書、スニペット、設定が Mac に残ります。Local 音声入力に Dictivo アカウントは不要です。",
    },
    sections: [
      {
        kicker: "背景",
        title: "{competitor} が向いている場合",
        paragraphs: [
          "{competitor} は、対応プラットフォーム、既存ワークフロー、チーム機能、クラウド機能が今の要件に合う場合に適しています。",
          "この比較は競合製品を不当に低く扱うものではありません。製品の適合度と、Dictivo のより限定された約束を分けて見ます。",
        ],
        bullets: [
          "その製品固有のプラットフォームやワークフローが必要なら、競合製品を選ぶ理由があります。",
          "選ぶ前に、現在のオファー、トライアル、プライバシー上の違いを比較してください。",
          "Dictivo は、Dictivo アカウントなしの Mac ローカル文字起こしを標準にしたい場合に向いています。",
        ],
      },
      {
        kicker: "Dictivo の違い",
        title: "Dictivo が違うところ",
        paragraphs: [
          "Dictivo は Local モードを中心に設計されています。音声認識は Mac 上で動き、文字起こし、履歴、辞書、スニペット、ローカル設定は端末に残ります。",
          "Cloud Fast は明確に別経路です。速度が完全ローカル処理より重要な録音だけに使います。",
        ],
        bullets: [
          "Tiny は永久無料です。",
          "14 日間の完全 Local トライアルで全ローカルモデルを使えます。",
          "Dictivo Local は $49 買い切りで、1 年後のアップデート更新は任意です。",
          "Local ワークフローに Dictivo の文字起こしアカウントは不要です。",
        ],
      },
      {
        kicker: "判断",
        title: "どちらを選ぶべきか",
        cards: [
          {
            title: "{competitor} を選ぶ場合",
            items: [
              "現在の対応プラットフォームや製品固有のワークフローが必要な場合。",
              "ドキュメントに書かれた処理方式やアカウントモデルを受け入れられる場合。",
              "サブスクリプション、買い切り価格、または内蔵機能であることが予算に合う場合。",
            ],
          },
          {
            title: "Dictivo を選ぶ場合",
            items: [
              "Mac のローカル音声入力を標準経路にしたい場合。",
              "Local モードに Dictivo アカウントを使いたくない場合。",
              "全ローカルモデルを 14 日間試してから、低い一括価格で使いたい場合。",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Dictivo は {competitor} の代替ですか？", "はい。Mac のローカル優先音声入力ワークフローを求め、Cloud Fast を別の任意経路として使いたい場合の代替です。"],
      ["Dictivo アカウントなしで使えますか？", "はい。Local 音声入力には Dictivo アカウントは不要です。Cloud Fast は別の任意経路です。"],
      ["無料で何を試せますか？", "Tiny は永久無料です。新規インストールでは全ローカルモデルを使える 14 日間の Local トライアルと、その端末で使える Cloud Fast 10 分が付属します。"],
      ["購入前に何を試せますか？", "Tiny は永久無料です。新規インストールでは全ローカルモデルを使える 14 日間の Local トライアルと、その端末で使える Cloud Fast 10 分が付属します。"],
      ["どちらを選べばよいですか？", "プライベートな Mac 音声入力と Local の買い切り価格が最重要なら Dictivo。対応プラットフォームやクラウド機能が重要なら競合製品を選んでください。"],
    ],
    ctaKicker: "Dictivo を試す",
    ctaTitle: "Dictivo を 14 日間無料で試す。",
    ctaBody: "すべてのローカルモデルを利用可能。Local には Dictivo アカウント不要。合えば Dictivo Local は $49 買い切りです。",
    ctaPrimary: "Dictivo を 14 日間試す",
    ctaSecondary: "価格を見る",
    resourceAria: "次の比較ステップ",
    resourcePricing: "Dictivo の価格とプランを比較",
    resourceRelated: "{competitor} との比較を見る",
    compareFooter: "代替候補を比較",
    footerAlternative: "{competitor} の代替",
    teaserKicker: "比較",
    teaserTitle: "他の音声入力アプリと迷っていますか？",
    teaserBody:
      "クラウド音声入力、ローカルモード型ツール、ファイル文字起こしアプリ、低価格のインディーツール、Apple の内蔵音声入力と Dictivo を比較できます。",
  }),
  ko: compactCompareLocale({
    skipComparison: "비교로 이동",
    skipComparisons: "비교 목록으로 이동",
    languageAria: "비교 페이지 언어 변경",
    updatedLabel: "마지막 업데이트:",
    hubEyebrow: "비교 허브",
    hubMetaTitle: "Dictivo 비교: Mac 로컬 받아쓰기 대안",
    hubMetaDescription:
      "Dictivo를 Wispr Flow, Superwhisper, MacWhisper, VoiceInk, macOS Dictation과 개인정보, 가격, 워크플로 기준으로 비교합니다.",
    hubH1: "Dictivo와 다른 받아쓰기 도구 비교",
    hubLede:
      "비공개 Mac 받아쓰기 워크플로를 고르기 위한 비교 허브입니다. 각 페이지는 상대 제품이 맞는 경우와 Dictivo가 맞는 경우를 나눠 설명합니다.",
    hubGridLabel: "Dictivo 비교 페이지",
    cardTitle: "{competitor} 대안",
    cardCta: "Dictivo와 {competitor} 비교",
    pageTitle: "{competitor} 대안: Dictivo의 Mac 로컬 받아쓰기",
    pageMeta:
      "Dictivo와 {competitor}를 개인정보, 가격, 플랫폼, Mac 로컬 받아쓰기 워크플로 기준으로 비교합니다.",
    pageH1: "{competitor}의 대안이 되는 Mac 로컬 받아쓰기",
    eyebrow: "대안 비교",
    intro: [
      "이 페이지는 {competitor}가 맞는 경우와 Dictivo의 Mac 로컬 워크플로가 더 맞는 경우를 설명합니다.",
      "빠른 비교표와 선택 기준으로 개인정보, 가격, 플랫폼, Local과 Cloud Fast의 경계를 비교할 수 있습니다.",
    ],
    quickAria: "빠른 비교",
    quickPrefix: "{competitor}:",
    quickTake: [
      ["적합한 용도", "비공개 Mac 로컬 받아쓰기", "{competitor}의 기존 워크플로"],
      ["Dictivo 모델", "$49 일회 구매, Tiny 영구 무료, 14일 전체 Local 체험", "아래 가격과 체험 정보 참고"],
      ["개인정보 모델", "Local 기본값", "아래 처리 위치 세부 정보 참고"],
    ],
    atAGlanceKicker: "요약",
    atAGlanceTitle: "{competitor} vs Dictivo 요약",
    tableCaption: "{competitor} vs Dictivo 요약",
    questionHeader: "항목",
    rowLabels: {
      "Processing location": "처리 위치",
      "Trains AI on your voice": "음성을 AI 학습에 사용하는지",
      "Works fully offline": "완전 오프라인 동작",
      "Account required": "계정 필요 여부",
      "Pricing model": "가격 모델",
      "Free tier / trial": "무료 티어 / 체험",
      Platforms: "플랫폼",
      "Privacy boundary": "개인정보 경계",
    },
    dictivoRows: {
      "Processing location": "Local 모드는 Mac에서 실행됩니다. Cloud Fast는 별도 경로이며 사용자가 선택할 때만 사용됩니다.",
      "Trains AI on your voice": "Local 모드에서는 사용하지 않습니다.",
      "Works fully offline": "로컬 모델 설치 후 Local 모드에서 가능합니다.",
      "Account required": "Local 받아쓰기에 Dictivo 계정은 필요 없습니다.",
      "Pricing model": "$49 일회 구매, 12개월 업데이트, 이후 선택적 $24/년 업데이트 갱신.",
      "Free tier / trial": "Tiny는 영구 무료이며, 모든 로컬 모델을 여는 14일 전체 Local 체험을 제공합니다.",
      Platforms: "현재 macOS. Windows는 검증 중입니다.",
      "Privacy boundary": "Local 모드는 전사문, 기록, 사전, 스니펫, 설정을 Mac에 보관합니다. Local 받아쓰기에는 Dictivo 계정이 필요 없습니다.",
    },
    sections: [
      {
        kicker: "배경",
        title: "{competitor}가 맞을 수 있는 경우",
        paragraphs: [
          "{competitor}는 플랫폼 지원, 기존 워크플로, 팀 기능, 클라우드 기능이 현재 요구에 맞을 때 좋은 선택일 수 있습니다.",
          "이 비교는 경쟁 제품을 낮춰 보려는 것이 아닙니다. 제품 적합성과 Dictivo의 더 좁은 약속, 즉 로컬에서 시작하는 비공개 Mac 받아쓰기를 구분합니다.",
        ],
        bullets: [
          "특정 플랫폼이나 워크플로 장점이 필요하면 경쟁 제품을 선택할 이유가 있습니다.",
          "선택하기 전에 현재 혜택, 체험 기간, 개인정보 차이를 비교하세요.",
          "기본 경로가 Dictivo 계정 없는 Mac 로컬 전사여야 한다면 Dictivo를 사용하세요.",
        ],
      },
      {
        kicker: "Dictivo 차이",
        title: "Dictivo가 다른 점",
        paragraphs: [
          "Dictivo는 먼저 Local 모드를 중심으로 만들어졌습니다. 음성 인식은 Mac에서 실행되고 전사, 기록, 사전, 스니펫, 로컬 설정은 기기에 남습니다.",
          "Cloud Fast는 의도적으로 별도 경로입니다. 속도가 완전 로컬 처리보다 중요할 때만 사용합니다.",
        ],
        bullets: [
          "Tiny는 영구 무료입니다.",
          "14일 전체 Local 체험으로 모든 로컬 모델이 열립니다.",
          "Dictivo Local은 $49 일회 구매이며, 첫해 이후 업데이트 갱신은 선택 사항입니다.",
          "Local 워크플로에는 Dictivo 전사 계정이 필요 없습니다.",
        ],
      },
      {
        kicker: "선택",
        title: "어느 쪽을 선택해야 할까",
        cards: [
          {
            title: "{competitor}를 선택할 때",
            items: [
              "현재 플랫폼 지원이나 제품 고유 워크플로가 필요할 때.",
              "문서에 설명된 처리 방식과 계정 모델이 적합할 때.",
              "구독, 평생 가격, 또는 내장 기능이라는 점이 예산에 더 맞을 때.",
            ],
          },
          {
            title: "Dictivo를 선택할 때",
            items: [
              "Mac 로컬 받아쓰기를 기본 경로로 쓰고 싶을 때.",
              "Local 모드에 Dictivo 계정을 만들고 싶지 않을 때.",
              "모든 로컬 모델을 14일 체험한 뒤 더 낮은 일회 구매 가격을 원할 때.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Dictivo는 {competitor}의 대안인가요?", "예. Mac에서 로컬 우선 받아쓰기 워크플로를 원하고 Cloud Fast를 별도 옵션으로 쓰고 싶다면 Dictivo는 대안입니다."],
      ["Dictivo 계정 없이 사용할 수 있나요?", "예. Local 받아쓰기는 Dictivo 계정이 필요 없습니다. Cloud Fast는 별도의 선택 경로입니다."],
      ["무료로 무엇을 써볼 수 있나요?", "Tiny는 영구 무료입니다. 새 설치에는 모든 로컬 모델을 여는 14일 Local 체험과 해당 기기의 Cloud Fast 10분 평생 무료 사용이 포함됩니다."],
      ["구매 전에 무엇을 체험할 수 있나요?", "Tiny는 영구 무료입니다. 새 설치에는 모든 로컬 모델을 여는 14일 Local 체험과 해당 기기의 Cloud Fast 10분 평생 무료 사용이 포함됩니다."],
      ["무엇을 선택해야 하나요?", "비공개 Mac 받아쓰기와 Local 일회 구매 가격이 가장 중요하면 Dictivo를 선택하세요. 플랫폼이나 클라우드 기능이 더 중요하면 경쟁 제품을 선택하세요."],
    ],
    ctaKicker: "Dictivo 체험",
    ctaTitle: "Dictivo를 14일 무료로 체험하세요.",
    ctaBody: "모든 로컬 모델이 열리고, Local에는 Dictivo 계정이 필요 없습니다. 맞는다면 Dictivo Local은 $49 일회 구매입니다.",
    ctaPrimary: "Dictivo 14일 체험",
    ctaSecondary: "가격 보기",
    resourceAria: "다음 비교 단계",
    resourcePricing: "Dictivo 가격과 플랜 비교",
    resourceRelated: "{competitor}와의 비교 보기",
    compareFooter: "대안 비교",
    footerAlternative: "{competitor} 대안",
    teaserKicker: "비교",
    teaserTitle: "다른 받아쓰기 앱과 비교 중인가요?",
    teaserBody:
      "클라우드 받아쓰기, 로컬 모드 도구, 파일 전사 앱, 저가 인디 도구, Apple 내장 받아쓰기와 Dictivo를 비교하세요.",
  }),
});

const LOCALIZED_COMPETITOR_ROWS = {
  de: {
    "Processing location": "{competitor} nutzt den eigenen Produkt-Workflow. Vergleichen Sie das mit Dictivo Local als Standard auf dem Mac.",
    "Trains AI on your voice": "{competitor} beschreibt eigene Datenschutz- und KI-Regeln. Dictivo Local entfernt diesen Konflikt fuer normale Diktate.",
    "Works fully offline": "{competitor} ist fuer seinen eigenen Workflow gebaut. Dictivo Local ist die Wahl, wenn Offline-Diktat wichtig ist.",
    "Account required": "{competitor} kann ein Konto oder eine eigene Kaufstrecke voraussetzen. Dictivo Local braucht kein Dictivo-Konto.",
    "Pricing model": "Pruefen Sie das aktuelle {competitor}-Angebot im Kaufprozess. Dictivo Local bleibt bei $49 einmalig.",
    "Free tier / trial": "{competitor} kann eigene kostenlose Stufen oder Tests haben. Dictivo kombiniert Tiny dauerhaft kostenlos mit 14 Tagen vollem Local-Test.",
    Platforms: "{competitor} hat seine eigene Plattformabdeckung. Dictivo ist jetzt fuer Mac verfuegbar; Windows bleibt in Validierung.",
    "Privacy boundary": "{competitor} passt, wenn sein Modell zu Ihrem Workflow passt. Dictivo Local ist fuer Arbeit gedacht, die standardmaessig auf dem Mac bleibt.",
  },
  fr: {
    "Processing location": "{competitor} suit son propre flux produit. Comparez-le a Dictivo Local, qui garde le Mac comme chemin par defaut.",
    "Trains AI on your voice": "{competitor} decrit ses propres regles de confidentialite et d'IA. Dictivo Local evite ce compromis pour la dictee quotidienne.",
    "Works fully offline": "{competitor} est concu pour son propre workflow. Dictivo Local est le choix quand la dictee hors ligne compte.",
    "Account required": "{competitor} peut demander un compte ou son propre parcours d'achat. Dictivo Local ne demande pas de compte Dictivo.",
    "Pricing model": "Verifiez l'offre {competitor} au moment de l'achat. Dictivo Local reste a $49 une seule fois.",
    "Free tier / trial": "{competitor} peut proposer ses propres options gratuites ou essais. Dictivo offre Tiny gratuit a vie et 14 jours d'essai Local complet.",
    Platforms: "{competitor} a sa propre couverture de plateformes. Dictivo est disponible sur Mac aujourd'hui; Windows reste en validation.",
    "Privacy boundary": "{competitor} convient si son modele correspond a votre workflow. Dictivo Local vise les travaux qui doivent rester sur le Mac par defaut.",
  },
  es: {
    "Processing location": "{competitor} usa su propio flujo de producto. Compáralo con Dictivo Local como ruta predeterminada en el Mac.",
    "Trains AI on your voice": "{competitor} define sus propias reglas de privacidad e IA. Dictivo Local evita ese compromiso para el dictado diario.",
    "Works fully offline": "{competitor} está diseñado para su propio flujo. Dictivo Local es la opción cuando importa dictar sin conexión.",
    "Account required": "{competitor} puede requerir cuenta o su propio proceso de compra. Dictivo Local no requiere una cuenta de Dictivo.",
    "Pricing model": "Revisa la oferta actual de {competitor} al comprar. Dictivo Local se mantiene en $49 una sola vez.",
    "Free tier / trial": "{competitor} puede tener sus propias opciones gratis o pruebas. Dictivo combina Tiny gratis para siempre con 14 días de prueba Local completa.",
    Platforms: "{competitor} tiene su propia cobertura de plataformas. Dictivo está disponible para Mac; Windows sigue en validación.",
    "Privacy boundary": "{competitor} encaja si su modelo se adapta a tu flujo. Dictivo Local está pensado para trabajo que debe quedarse en el Mac por defecto.",
  },
  it: {
    "Processing location": "{competitor} segue il proprio flusso di prodotto. Confrontalo con Dictivo Local come percorso predefinito sul Mac.",
    "Trains AI on your voice": "{competitor} definisce le proprie regole di privacy e IA. Dictivo Local evita questo compromesso nella dettatura quotidiana.",
    "Works fully offline": "{competitor} è costruito per il proprio workflow. Dictivo Local è la scelta quando conta dettare offline.",
    "Account required": "{competitor} può richiedere un account o un percorso di acquisto dedicato. Dictivo Local non richiede un account Dictivo.",
    "Pricing model": "Controlla l'offerta {competitor} al momento dell'acquisto. Dictivo Local resta a $49 una sola volta.",
    "Free tier / trial": "{competitor} può avere opzioni gratuite o prove proprie. Dictivo offre Tiny gratis per sempre e 14 giorni di prova Local completa.",
    Platforms: "{competitor} ha la propria copertura piattaforme. Dictivo è disponibile per Mac; Windows resta in validazione.",
    "Privacy boundary": "{competitor} va bene se il suo modello si adatta al tuo workflow. Dictivo Local è pensato per il lavoro che deve restare sul Mac per impostazione predefinita.",
  },
  nl: {
    "Processing location": "{competitor} volgt zijn eigen productworkflow. Vergelijk dat met Dictivo Local als standaardroute op de Mac.",
    "Trains AI on your voice": "{competitor} heeft eigen privacy- en AI-regels. Dictivo Local haalt dit spanningsveld weg voor dagelijkse dictaten.",
    "Works fully offline": "{competitor} is gebouwd voor zijn eigen workflow. Dictivo Local is de keuze wanneer offline dicteren belangrijk is.",
    "Account required": "{competitor} kan een account of eigen aankoopflow vragen. Dictivo Local vraagt geen Dictivo-account.",
    "Pricing model": "Controleer het actuele {competitor}-aanbod tijdens aankoop. Dictivo Local blijft eenmalig $49.",
    "Free tier / trial": "{competitor} kan eigen gratis opties of proefperiodes hebben. Dictivo combineert Tiny gratis voor altijd met 14 dagen volledige Local-proef.",
    Platforms: "{competitor} heeft eigen platformdekking. Dictivo is nu beschikbaar voor Mac; Windows blijft in validatie.",
    "Privacy boundary": "{competitor} past als het model bij je workflow past. Dictivo Local is bedoeld voor werk dat standaard op de Mac moet blijven.",
  },
  pt: {
    "Processing location": "{competitor} segue o seu próprio fluxo de produto. Compare com o Dictivo Local como caminho padrão no Mac.",
    "Trains AI on your voice": "{competitor} define as suas próprias regras de privacidade e IA. O Dictivo Local evita esse compromisso na ditado diário.",
    "Works fully offline": "{competitor} foi criado para o seu próprio workflow. O Dictivo Local é a escolha quando ditado offline é importante.",
    "Account required": "{competitor} pode exigir conta ou o seu próprio processo de compra. O Dictivo Local não exige conta Dictivo.",
    "Pricing model": "Verifique a oferta atual de {competitor} no momento da compra. O Dictivo Local continua a $49 uma única vez.",
    "Free tier / trial": "{competitor} pode ter opções gratuitas ou testes próprios. O Dictivo combina Tiny grátis para sempre com 14 dias de teste Local completo.",
    Platforms: "{competitor} tem a sua própria cobertura de plataformas. O Dictivo está disponível para Mac; Windows continua em validação.",
    "Privacy boundary": "{competitor} serve se o seu modelo encaixar no seu workflow. O Dictivo Local é para trabalho que deve ficar no Mac por padrão.",
  },
  zh: {
    "Processing location": "{competitor} 使用自己的产品路径。请把它与默认在 Mac 本地运行的 Dictivo Local 对比。",
    "Trains AI on your voice": "{competitor} 有自己的隐私和 AI 规则。Dictivo Local 让日常听写避开这个取舍。",
    "Works fully offline": "{competitor} 面向自己的工作流。需要离线听写时，Dictivo Local 是更直接的选择。",
    "Account required": "{competitor} 可能需要账号或自己的购买流程。Dictivo Local 不需要 Dictivo 账号。",
    "Pricing model": "购买前查看 {competitor} 的当前方案。Dictivo Local 保持 $49 一次买断。",
    "Free tier / trial": "{competitor} 可能有自己的免费或试用方案。Dictivo 提供 Tiny 永久免费和 14 天完整 Local 试用。",
    Platforms: "{competitor} 有自己的平台覆盖。Dictivo 当前面向 Mac；Windows 仍在验证。",
    "Privacy boundary": "{competitor} 适合接受其产品模型的工作流。Dictivo Local 面向默认留在 Mac 上的内容。",
  },
  ja: {
    "Processing location": "{competitor} は独自の製品フローで動きます。Mac 上で Local を標準にする Dictivo と比較してください。",
    "Trains AI on your voice": "{competitor} には独自のプライバシーと AI のルールがあります。Dictivo Local は日常の音声入力でその迷いを減らします。",
    "Works fully offline": "{competitor} は独自のワークフロー向けです。オフライン音声入力が重要なら Dictivo Local が直接的です。",
    "Account required": "{competitor} はアカウントや独自の購入フローが必要な場合があります。Dictivo Local は Dictivo アカウント不要です。",
    "Pricing model": "購入時に {competitor} の現在の提供内容を確認してください。Dictivo Local は $49 の買い切りです。",
    "Free tier / trial": "{competitor} には独自の無料枠や体験版がある場合があります。Dictivo は Tiny 永久無料と 14 日間の完全 Local 体験を提供します。",
    Platforms: "{competitor} には独自の対応プラットフォームがあります。Dictivo は現在 Mac 向けで、Windows は検証中です。",
    "Privacy boundary": "{competitor} はその製品モデルが合う場合に適しています。Dictivo Local は標準で Mac に残す作業向けです。",
  },
  ko: {
    "Processing location": "{competitor}는 자체 제품 흐름을 사용합니다. Mac에서 Local을 기본으로 두는 Dictivo와 비교하세요.",
    "Trains AI on your voice": "{competitor}에는 자체 개인정보 및 AI 규칙이 있습니다. Dictivo Local은 일상 받아쓰기에서 이 고민을 줄입니다.",
    "Works fully offline": "{competitor}는 자체 워크플로에 맞춰져 있습니다. 오프라인 받아쓰기가 중요하면 Dictivo Local이 더 직접적입니다.",
    "Account required": "{competitor}는 계정이나 자체 구매 흐름이 필요할 수 있습니다. Dictivo Local은 Dictivo 계정이 필요 없습니다.",
    "Pricing model": "구매 시점에 {competitor}의 현재 제공 조건을 확인하세요. Dictivo Local은 $49 일회 구매입니다.",
    "Free tier / trial": "{competitor}에는 자체 무료 옵션이나 체험판이 있을 수 있습니다. Dictivo는 Tiny 영구 무료와 14일 전체 Local 체험을 제공합니다.",
    Platforms: "{competitor}는 자체 플랫폼 범위를 가집니다. Dictivo는 현재 Mac용이며 Windows는 검증 중입니다.",
    "Privacy boundary": "{competitor}는 그 제품 모델이 워크플로에 맞을 때 적합합니다. Dictivo Local은 기본적으로 Mac에 남겨야 하는 작업을 위한 선택입니다.",
  },
};

function compareCopy(code) {
  if (code === "en") return COMPARE_I18N.en;
  return { ...compactCompareLocale(COMPARE_I18N[code] || {}), locale: code };
}

function assetTags() {
  return `
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preload" as="image" href="/assets/dictivo-demo-poster.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
    />
    <link rel="stylesheet" href="/assets/site.css?v=local" />
    <script src="/assets/site.js?v=local" defer></script>`;
}

function hreflangTags(currentCode) {
  const alternates = LOCALES.map(
    (locale) => `<link rel="alternate" hreflang="${attr(locale.htmlLang)}" href="${attr(localeUrl(locale.code))}" />`,
  );
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${attr(localeUrl("en"))}" />`);
  alternates.push(`<link rel="canonical" href="${attr(localeUrl(currentCode))}" />`);
  return alternates.join("\n    ");
}

function compareHreflangTags(currentCode, slug = "") {
  const alternates = LOCALES.map(
    (locale) => `<link rel="alternate" hreflang="${attr(locale.htmlLang)}" href="${attr(localizedCompareUrl(locale.code, slug))}" />`,
  );
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${attr(localizedCompareUrl("en", slug))}" />`);
  alternates.push(`<link rel="canonical" href="${attr(localizedCompareUrl(currentCode, slug))}" />`);
  return alternates.join("\n    ");
}

function renderLanguageMenu(currentCode, t, hrefForLocale = (locale) => locale.path) {
  const current = localeByCode(currentCode);
  const links = LOCALES.map((locale) => {
    const active = locale.code === currentCode ? ' aria-current="page"' : "";
    return `<a href="${attr(hrefForLocale(locale))}" lang="${attr(locale.htmlLang)}" hreflang="${attr(locale.htmlLang)}"${active}>
              <span>${html(locale.nativeName)}</span>
              <small>${html(locale.name)}</small>
            </a>`;
  }).join("\n");

  return `<details class="language-menu">
            <summary aria-label="${attr(t.language.aria)}">
              <span class="language-label">${html(t.language.label)}</span>
              <strong>${html(current.nativeName)}</strong>
            </summary>
            <div class="language-menu-panel">
              ${links}
            </div>
          </details>`;
}

function renderHeader(currentCode, t, options = {}) {
  const hash = (id) => localePath(currentCode, `#${id}`);
  return `<header class="site-header" aria-label="Primary navigation">
      <a class="brand" href="${attr(localePath(currentCode))}" aria-label="Dictivo home">
        <span class="brand-mark" aria-hidden="true">D</span>
        <span class="brand-name">Dictivo</span>
      </a>
      <nav class="nav-links" aria-label="Site navigation">
        <a href="${attr(hash("privacy"))}">${html(t.nav.privacy)}</a>
        <a href="${attr(hash("cloud-fast"))}">${html(t.nav.cloudFast)}</a>
        <a href="${attr(hash("pricing"))}">${html(t.nav.pricing)}</a>
        <a href="${attr(hash("faq"))}">${html(t.nav.faq)}</a>
        <a href="${attr(hash("downloads"))}">${html(t.nav.downloads)}</a>
      </nav>
      <div class="header-actions">
        ${renderLanguageMenu(currentCode, t, options.hrefForLocale)}
        <a class="header-download" href="${attr(hash("downloads"))}">${html(t.nav.download)}</a>
      </div>
    </header>`;
}

function renderList(items, className = "tier-features") {
  return `<ul class="${attr(className)}">
${items.map((item) => `                <li>${html(item)}</li>`).join("\n")}
              </ul>`;
}

function renderTier(tier, index) {
  const classes = index === 1 ? "tier tier--highlight" : "tier";
  const buttonClass = index === 1 ? "button button-dark" : "button button-secondary";
  const href = index === 0 ? "/download/mac" : index === 1 ? "/checkout/local" : "/checkout/cloud-fast";
  const data = index === 0 ? ' data-platform="macos"' : index === 1 ? " data-local-checkout" : " data-cloud-fast-checkout";
  return `<article class="${classes}" role="listitem" data-od-id="${index === 0 ? "tier-free" : index === 1 ? "tier-local" : "tier-cloud-fast"}">
              <h3 class="tier-name">${html(tier.name)}</h3>
              <p class="tier-sub">${html(tier.sub)}</p>
              <p class="tier-price">${html(tier.price)}<small>${html(tier.small)}</small></p>
              ${renderList(tier.features)}
              <a class="${buttonClass}" href="${href}"${data}>${html(tier.button)}</a>
            </article>`;
}

function renderSchema(currentCode, t) {
  const pageUrl = localeUrl(currentCode);
  const faqEntities = t.faq.items.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  }));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Dictivo",
      url: BASE_URL,
      email: "support@dictivo.app",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Dictivo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS",
      url: pageUrl,
      downloadUrl: `${BASE_URL}/download/mac`,
      softwareVersion: release.version,
      description: t.metaDescription,
      offers: [
        { "@type": "Offer", name: "Free Local", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", name: "Dictivo Local", price: "49", priceCurrency: "USD" },
        {
          "@type": "Offer",
          name: "Cloud Fast",
          price: "6.99",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "6.99",
            priceCurrency: "USD",
            billingDuration: "P1M",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Dictivo product demo",
      description: t.metaDescription,
      thumbnailUrl: `${BASE_URL}/assets/dictivo-demo-poster.jpg`,
      uploadDate: "2026-05-21",
      duration: "PT1M16S",
      contentUrl: `${BASE_URL}/assets/dictivo-cinematic-demo.mp4`,
      embedUrl: `${pageUrl}#demo-video`,
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function localizedCompareTitle(page, copy) {
  return fillCompareTemplate(copy.pageTitle, page);
}

function localizedCompareMeta(page, copy) {
  return fillCompareTemplate(copy.pageMeta, page);
}

function localizedCompareH1(page, copy) {
  return fillCompareTemplate(copy.pageH1, page);
}

function localizedTemplateList(items, page) {
  return items.map((item) => (Array.isArray(item) ? item.map((value) => fillCompareTemplate(value, page)) : fillCompareTemplate(item, page)));
}

function localizedCompareQuickTake(page, copy) {
  if (copy === COMPARE_I18N.en) return page.quickTake;
  return localizedTemplateList(copy.quickTake, page);
}

function localizedCompareRows(page, copy) {
  if (copy === COMPARE_I18N.en) return page.rows;
  const competitorRows = LOCALIZED_COMPETITOR_ROWS[copy.locale] || {};
  return page.rows.map((row) => ({
    ...row,
    label: copy.rowLabels[row.label] || row.label,
    dictivo: copy.dictivoRows[row.label] || row.dictivo,
    competitor: fillCompareTemplate(competitorRows[row.label] || row.competitor, page),
  }));
}

function localizedCompareSections(page, copy) {
  if (copy === COMPARE_I18N.en) return page.sections;
  return copy.sections.map((section) => ({
    ...section,
    title: fillCompareTemplate(section.title, page),
    paragraphs: localizedTemplateList(section.paragraphs || [], page),
    bullets: localizedTemplateList(section.bullets || [], page),
    cards: section.cards?.map((card) => ({
      ...card,
      title: fillCompareTemplate(card.title, page),
      items: localizedTemplateList(card.items, page),
    })),
  }));
}

function localizedCompareFaqs(page, copy) {
  if (copy === COMPARE_I18N.en) return page.faqs;
  return localizedTemplateList(copy.faqs, page);
}

function renderCompareSchema(page, currentCode) {
  const copy = compareCopy(currentCode);
  const pageUrl = localizedCompareUrl(currentCode, page.slug);
  const faqs = localizedCompareFaqs(page, copy);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Dictivo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS",
      url: BASE_URL,
      downloadUrl: `${BASE_URL}/download/mac`,
      softwareVersion: release.version,
      description: localizedCompareMeta(page, copy),
      offers: {
        "@type": "Offer",
        name: "Dictivo Local",
        price: "49",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(currentCode) },
        { "@type": "ListItem", position: 2, name: copy.compareFooter, item: localizedCompareUrl(currentCode) },
        { "@type": "ListItem", position: 3, name: fillCompareTemplate(copy.footerAlternative, page), item: pageUrl },
      ],
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderCompareBullets(items, className = "compare-bullets") {
  if (!items?.length) return "";
  return `<ul class="${attr(className)}">
${items.map((item) => `              <li>${html(item)}</li>`).join("\n")}
            </ul>`;
}

function renderCompareSection(section, index) {
  const id = `compare-section-${index + 1}`;
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${html(paragraph)}</p>`).join("\n            ");
  const bullets = renderCompareBullets(section.bullets || []);
  const cards = section.cards?.length
    ? `<div class="compare-choice-grid">
${section.cards
  .map(
    (card) => `              <article class="compare-choice-card">
                <h3>${html(card.title)}</h3>
                ${renderCompareBullets(card.items, "compare-bullets compare-bullets--compact")}
              </article>`,
  )
  .join("\n")}
            </div>`
    : "";

  return `<section class="compare-section" id="${attr(id)}" aria-labelledby="${attr(`${id}-title`)}">
            <p class="doc-meta">${html(section.kicker)}</p>
            <h2 id="${attr(`${id}-title`)}">${html(section.title)}</h2>
            ${paragraphs}
            ${bullets}
            ${cards}
          </section>`;
}

function renderCompareQuickTake(page, copy) {
  const quickTake = localizedCompareQuickTake(page, copy);
  return `<div class="compare-quick-take" aria-label="${attr(copy.quickAria)}">
${quickTake
  .map(
    ([label, dictivo, competitor]) => `          <article>
            <span>${html(label)}</span>
            <strong>${html(dictivo)}</strong>
            <p>${html(fillCompareTemplate(copy.quickPrefix, page))} ${html(competitor)}</p>
          </article>`,
  )
  .join("\n")}
        </div>`;
}

function renderCompareTable(page, copy) {
  const rows = localizedCompareRows(page, copy);
  return `<div class="compare-table-wrap">
            <table class="compare-table">
              <caption>${html(fillCompareTemplate(copy.tableCaption, page))}</caption>
              <thead>
                <tr>
                  <th scope="col">${html(copy.questionHeader)}</th>
                  <th scope="col">Dictivo</th>
                  <th scope="col">${html(fillCompareTemplate(copy.competitorHeader, page))}</th>
                </tr>
              </thead>
              <tbody>
${rows
  .map(
    (row) => `                <tr>
                  <th scope="row">${html(row.label)}</th>
                  <td>${html(row.dictivo)}</td>
                  <td>${html(row.competitor)}</td>
                </tr>`,
  )
  .join("\n")}
              </tbody>
            </table>
          </div>`;
}

function relatedComparePages(page) {
  return page.related.map((slug) => {
    const related = COMPARE_PAGES.find((item) => item.slug === slug);
    if (!related) throw new Error(`Unknown related comparison page: ${slug}`);
    return related;
  });
}

function renderCompareLinks(page, currentCode, copy) {
  const relatedLinks = relatedComparePages(page)
    .map(
      (related) =>
        `<a href="${attr(localizedComparePath(currentCode, related.slug))}">${html(fillCompareTemplate(copy.resourceRelated, related))}</a>`,
    )
    .join("\n              ");

  return `<nav class="compare-resource-links" aria-label="${attr(copy.resourceAria)}">
              <a href="${attr(localePath(currentCode, "#pricing"))}">${html(copy.resourcePricing)}</a>
              ${relatedLinks}
            </nav>`;
}

function renderCompareFaq(page, copy) {
  const faqs = localizedCompareFaqs(page, copy);
  return `<section class="compare-section compare-faq-section" id="faq" aria-labelledby="compare-faq-title">
            <p class="doc-meta">${html(copy.faqKicker)}</p>
            <h2 id="compare-faq-title">${html(copy.faqTitle)}</h2>
            <div class="compare-faq-list">
${faqs
  .map(
    ([question, answer], index) => `              <details class="faq-item">
                <summary>
                  <span class="faq-index">${String(index + 1).padStart(2, "0")}</span>
                  <span class="faq-question">${html(question)}</span>
                  <span class="faq-toggle" aria-hidden="true">+</span>
                </summary>
                <div class="faq-answer">
                  <p class="faq-answer-body">${html(answer)}</p>
                </div>
              </details>`,
  )
  .join("\n")}
            </div>
          </section>`;
}

function renderCompareCta(page, currentCode, copy) {
  return `<section class="compare-cta" aria-labelledby="compare-cta-title">
            <div>
              <p class="doc-meta">${html(copy.ctaKicker)}</p>
              <h2 id="compare-cta-title">${html(copy.ctaTitle)}</h2>
              <p>${html(copy.ctaBody)}</p>
            </div>
            <div class="compare-cta-actions">
              <a class="button button-light download-link" href="/download/mac" data-platform="macos">${html(copy.ctaPrimary)}</a>
              <a class="button button-outline" href="${attr(localePath(currentCode, "#pricing"))}">${html(copy.ctaSecondary)}</a>
            </div>
            ${renderCompareLinks(page, currentCode, copy)}
          </section>`;
}

function renderComparePage(page, currentCode = "en") {
  const locale = localeByCode(currentCode);
  const t = HOME_COPY[currentCode];
  const copy = compareCopy(currentCode);
  const canonical = localizedCompareUrl(currentCode, page.slug);
  const title = currentCode === "en" ? page.title : localizedCompareTitle(page, copy);
  const metaDescription = currentCode === "en" ? page.metaDescription : localizedCompareMeta(page, copy);
  const h1 = currentCode === "en" ? page.h1 : localizedCompareH1(page, copy);
  const intro = currentCode === "en" ? page.intro : localizedTemplateList(copy.intro, page);
  const sections = localizedCompareSections(page, copy);
  return `<!doctype html>
<html lang="${attr(locale.htmlLang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${html(title)}</title>
    <meta name="description" content="${attr(metaDescription)}" />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="${attr(title)}" />
    <meta property="og:description" content="${attr(metaDescription)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${attr(canonical)}" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    ${compareHreflangTags(currentCode, page.slug)}
    ${assetTags()}
    ${renderCompareSchema(page, currentCode)}
  </head>
  <body>
    <a class="skip-link" href="#comparison">${html(copy.skipComparison)}</a>
    ${renderHeader(currentCode, t, { hrefForLocale: (item) => localizedComparePath(item.code, page.slug) })}
    <main class="compare-page" id="comparison">
      <section class="compare-hero" aria-labelledby="compare-title">
        <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${html(currentCode === "en" ? page.eyebrow : copy.eyebrow)}</span>
        <h1 id="compare-title">${html(h1)}</h1>
        <p class="doc-lede">${html(intro.join(" "))}</p>
        ${renderCompareQuickTake(page, copy)}
      </section>

      <section class="compare-section compare-table-section" aria-labelledby="at-a-glance">
        <p class="doc-meta">${html(copy.atAGlanceKicker)}</p>
        <h2 id="at-a-glance">${html(currentCode === "en" ? `${page.competitor} vs Dictivo at a glance` : fillCompareTemplate(copy.atAGlanceTitle, page))}</h2>
        ${renderCompareTable(page, copy)}
      </section>

      ${sections.map(renderCompareSection).join("\n\n      ")}

      ${renderCompareFaq(page, copy)}

      ${renderCompareCta(page, currentCode, copy)}
    </main>
    ${renderFooterOnly(currentCode)}
  </body>
</html>
`;
}

function renderCompareHubSchema(currentCode) {
  const copy = compareCopy(currentCode);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.hubMetaTitle,
    url: localizedCompareUrl(currentCode),
    hasPart: COMPARE_PAGES.map((page) => ({
      "@type": "WebPage",
      name: currentCode === "en" ? page.title : localizedCompareTitle(page, copy),
      url: localizedCompareUrl(currentCode, page.slug),
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderCompareHub(currentCode = "en") {
  const locale = localeByCode(currentCode);
  const t = HOME_COPY[currentCode];
  const copy = compareCopy(currentCode);
  const canonical = localizedCompareUrl(currentCode);
  return `<!doctype html>
<html lang="${attr(locale.htmlLang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${html(copy.hubMetaTitle)}</title>
    <meta name="description" content="${attr(copy.hubMetaDescription)}" />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="${attr(copy.hubMetaTitle)}" />
    <meta property="og:description" content="${attr(copy.hubMetaDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${attr(canonical)}" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    ${compareHreflangTags(currentCode)}
    ${assetTags()}
    ${renderCompareHubSchema(currentCode)}
  </head>
  <body>
    <a class="skip-link" href="#compare-hub">${html(copy.skipComparisons)}</a>
    ${renderHeader(currentCode, t, { hrefForLocale: (item) => localizedComparePath(item.code) })}
    <main class="compare-page compare-hub" id="compare-hub">
      <section class="compare-hero" aria-labelledby="compare-hub-title">
        <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${html(copy.hubEyebrow)}</span>
        <h1 id="compare-hub-title">${html(copy.hubH1)}</h1>
        <p class="doc-lede">${html(copy.hubLede)}</p>
      </section>

      <section class="compare-hub-grid" aria-label="${attr(copy.hubGridLabel)}">
${COMPARE_PAGES.map(
  (page) => `        <article class="compare-hub-card">
          <span>${html(page.primaryKeyword)}</span>
          <h2>${html(currentCode === "en" ? `${page.competitor} alternative` : fillCompareTemplate(copy.cardTitle, page))}</h2>
          <p>${html(currentCode === "en" ? page.intro[1] : fillCompareTemplate(copy.pageMeta, page))}</p>
          <a class="button-link" href="${attr(localizedComparePath(currentCode, page.slug))}">${html(fillCompareTemplate(copy.cardCta, page))}</a>
        </article>`,
).join("\n")}
      </section>
    </main>
    ${renderFooterOnly(currentCode)}
  </body>
</html>
`;
}

function renderCompareTeaser(currentCode = "en") {
  const copy = compareCopy(currentCode);
  return `<section class="compare-teaser reveal" id="compare" aria-labelledby="compare-teaser-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot eyebrow-dot--info" aria-hidden="true"></span>${html(copy.teaserKicker)}</span>
            <h2 id="compare-teaser-title">${html(copy.teaserTitle)}</h2>
            <p>${html(copy.teaserBody)}</p>
          </div>
          <div class="compare-teaser-grid">
${COMPARE_NAV_LINKS.map(
  (link) => `            <a href="${attr(localizedComparePath(currentCode, link.slug))}">
              <span>${html(link.competitor)}</span>
              <strong>${html(currentCode === "en" ? link.title : fillCompareTemplate(copy.footerAlternative, { competitor: link.competitor }))}</strong>
            </a>`,
).join("\n")}
          </div>
        </div>
      </section>`;
}

function renderCompareFooterLinks(currentCode = "en") {
  const copy = compareCopy(currentCode);
  return `<a href="${attr(localizedComparePath(currentCode))}">${html(copy.compareFooter)}</a>
        ${COMPARE_NAV_LINKS.map((link) => `<a href="${attr(localizedComparePath(currentCode, link.slug))}">${html(fillCompareTemplate(copy.footerAlternative, { competitor: link.competitor }))}</a>`).join("\n        ")}`;
}

function renderHomeFooterLinks(currentCode, t) {
  const links = [
    `<a href="${attr(localePath(currentCode, "#privacy"))}">${html(t.nav.privacy)}</a>`,
    `<a href="${attr(localePath(currentCode, "#pricing"))}">${html(t.nav.pricing)}</a>`,
    `<a href="${attr(localePath(currentCode, "#cloud-fast"))}">${html(t.nav.cloudFast)}</a>`,
    `<a href="${attr(localePath(currentCode, "#downloads"))}">${html(t.nav.downloads)}</a>`,
    renderCompareFooterLinks(currentCode),
    `<a href="/changelog">Changelog</a>`,
    `<a href="/security">Security</a>`,
    `<a href="mailto:support@dictivo.app">support@dictivo.app</a>`,
  ].filter(Boolean);
  return links.map((link) => `        ${link}`).join("\n");
}

function renderHome(currentCode) {
  const locale = localeByCode(currentCode);
  const t = HOME_COPY[currentCode];
  if (!t) throw new Error(`Missing home copy for locale ${currentCode}`);
  const compareTeaser = `${renderCompareTeaser(currentCode)}\n\n`;
  const liveWindowsCopy = windowsDownloadCopy(currentCode);

  const languagePills = LOCALES.map(
    (item) => `<a href="${attr(item.path)}" lang="${attr(item.htmlLang)}" hreflang="${attr(item.htmlLang)}">${html(item.nativeName)}</a>`,
  ).join("\n                ");

  return `<!doctype html>
<html lang="${attr(locale.htmlLang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${html(t.metaTitle)}</title>
    <meta name="description" content="${attr(t.metaDescription)}" />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="${attr(t.hero.title)}" />
    <meta property="og:description" content="${attr(t.metaDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${attr(localeUrl(currentCode))}" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    ${hreflangTags(currentCode)}
    ${assetTags()}
    ${renderSchema(currentCode, t)}
  </head>
  <body>
    <a class="skip-link" href="#downloads">${html(t.skip)}</a>

    ${renderHeader(currentCode, t)}

    <main>
      <section class="hero hero--film" id="demo" aria-labelledby="hero-title">
        <div class="hero-inner">
          <div class="hero-copy">
            <div class="hero-statement">
              <span class="eyebrow">
                <span class="eyebrow-dot" aria-hidden="true"></span>
                ${html(t.hero.eyebrow)}
              </span>
              <h1 id="hero-title">${html(t.hero.title)} <em>${html(t.hero.emphasis)}</em></h1>
            </div>
          </div>

          <figure class="hero-film" id="demo-video">
            <button class="hero-video-poster" type="button" aria-label="${attr(t.hero.play)}">
              <img src="/assets/dictivo-demo-poster.jpg" alt="${attr(t.hero.posterAlt)}" width="1920" height="1080" />
              <span class="hero-video-play">${html(t.hero.play)}</span>
            </button>
            <video controls preload="none" poster="/assets/dictivo-demo-poster.jpg" playsinline hidden data-src="/assets/dictivo-cinematic-demo.mp4">
              <track kind="captions" srclang="en" label="English" src="/assets/dictivo-cinematic-demo.en.vtt" default />
            </video>
          </figure>

          <div class="hero-support">
            <div class="hero-actions" aria-label="Download Dictivo">
              <a class="button button-light download-link" href="/download/mac" data-platform="macos">${html(t.hero.download)}</a>
              <a class="button button-outline" href="#pricing">${html(t.hero.pricing)}</a>
              <p class="hero-note">${html(t.hero.windows)}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="trust-section reveal" id="privacy" aria-labelledby="privacy-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left trust-heading">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.privacy.kicker)}</span>
            <h2 id="privacy-title">${html(t.privacy.title)}</h2>
            <p>${html(t.privacy.body)}</p>
          </div>

          <div class="trust-grid">
            <article class="trust-column trust-column--local">
              <header class="trust-column-head">
                <span class="trust-tag trust-tag--local"><span class="trust-dot trust-dot--local" aria-hidden="true"></span>${html(t.privacy.localTitle)}</span>
                <p class="trust-column-lede">${html(t.privacy.localLead)}</p>
              </header>
              ${renderList(t.privacy.localItems, "trust-list")}
            </article>

            <article class="trust-column trust-column--network">
              <header class="trust-column-head">
                <span class="trust-tag trust-tag--network"><span class="trust-dot trust-dot--network" aria-hidden="true"></span>${html(t.privacy.cloudTitle)}</span>
                <p class="trust-column-lede">${html(t.privacy.cloudLead)}</p>
              </header>
              ${renderList(t.privacy.cloudItems, "trust-list trust-list--network")}
            </article>
          </div>

          <p class="trust-footnote"><a href="/security">${html(t.privacy.footnote)}</a></p>
        </div>
      </section>

      <section class="cloud-comparison reveal" id="cloud-fast" aria-labelledby="cloud-fast-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.cloud.kicker)}</span>
            <h2 id="cloud-fast-title">${html(t.cloud.title)}</h2>
            <p>${html(t.cloud.body)}</p>
          </div>

          <div class="cloud-mode-grid">
            <article class="cloud-mode-card">
              <div class="card-topline"><span>${html(t.cloud.localTop[0])}</span><span>${html(t.cloud.localTop[1])}</span></div>
              <h3>${html(t.cloud.localTitle)}</h3>
              ${renderList(t.cloud.localItems)}
              <a class="button button-secondary download-link" href="/download/mac" data-platform="macos">${html(t.hero.download)}</a>
            </article>

            <article class="cloud-mode-card cloud-mode-card--highlight">
              <div class="card-topline"><span>${html(t.cloud.cloudTop[0])}</span><span>${html(t.cloud.cloudTop[1])}</span></div>
              <h3>${html(t.cloud.cloudTitle)}</h3>
              ${renderList(t.cloud.cloudItems)}
              <a class="button button-light" href="/checkout/cloud-fast" data-cloud-fast-checkout>${html(t.cloud.cloudButton)}</a>
            </article>
          </div>
        </div>
      </section>

      <section class="pricing-section reveal" id="pricing" aria-labelledby="pricing-title">
        <div class="section-shell">
          <div class="pricing-head">
            <h2 id="pricing-title">${html(t.pricing.title)}</h2>
            <p>${html(t.pricing.body)}</p>
          </div>

          <div class="pricing-band" role="list">
            ${t.pricing.tiers.map(renderTier).join("\n")}
          </div>

          <p class="pricing-footnote">${html(t.pricing.footnote)}</p>
          <div class="checkout-pending" id="checkout-local-pending" tabindex="-1" role="status">
            <strong>${html(t.pricing.checkoutTitle)}</strong>
            <p>${html(t.pricing.checkoutBody)}</p>
          </div>
        </div>
      </section>

${compareTeaser}
      <section class="download-band reveal" id="downloads" aria-labelledby="downloads-title">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.downloads.kicker)}</span>
            <h2 id="downloads-title">${html(t.downloads.title)}</h2>
            <p>${html(t.downloads.body)}</p>
          </div>

          <div class="download-grid" aria-label="${attr(t.downloads.available)}">
            <article class="download-card" data-platform-card="macos">
              <div class="card-topline"><span>${html(t.downloads.macTop[0])}</span><span class="recommendation" data-recommendation="macos">${html(t.downloads.macTop[1])}</span></div>
              <h3>${html(t.downloads.macTitle)}</h3>
              <p>${html(t.downloads.macBody)}</p>
              <a class="button button-dark download-link" href="/download/mac" data-platform="macos">${html(t.downloads.macButton)}</a>
              <p class="download-note">${html(t.downloads.versionNote(release.version))}</p>
            </article>

            <article class="download-card" data-platform-card="windows">
              <div class="card-topline"><span>${html(t.downloads.windowsTop[0])}</span><span>${html(hasWindowsRelease ? liveWindowsCopy.badge : t.downloads.windowsTop[1])}</span></div>
              <h3>${html(t.downloads.windowsTitle)}</h3>
              <p>${html(hasWindowsRelease ? liveWindowsCopy.body : t.downloads.windowsBody)}</p>
              ${hasWindowsRelease ? `<div class="download-actions">
                <a class="button button-dark download-link" href="/download/windows" data-platform="windows">${html(liveWindowsCopy.exeButton)}</a>
                <a class="button button-secondary download-link" href="/download/windows-msi" data-platform="windows-msi">${html(liveWindowsCopy.msiButton)}</a>
              </div>` : `<span class="download-status">${html(t.downloads.windowsStatus)}</span>`}
              <p class="download-note">${html(hasWindowsRelease ? liveWindowsCopy.note(release.version) : t.downloads.windowsNote)}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="signed-strip reveal" aria-labelledby="signed-title">
        <div class="section-shell">
          <div class="signed-head">
            <h2 id="signed-title">${html(t.signed.title)}</h2>
          </div>
          <div class="signed-grid">
            ${t.signed.cells
              .map(
                ([label, value]) => `<article class="signed-cell">
              <p class="signed-cell-label">${html(label)}</p>
              <p class="signed-cell-value">${html(value.replace("{version}", release.version))}</p>
            </article>`,
              )
              .join("\n")}
          </div>
          <p class="signed-footnote">${html(t.signed.footnote)}</p>
        </div>
      </section>

      <section class="channel-section language-section reveal" id="languages" aria-labelledby="languages-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot eyebrow-dot--info" aria-hidden="true"></span>${html(t.languages.kicker)}</span>
            <h2 id="languages-title">${html(t.languages.title)}</h2>
            <p>${html(t.languages.body)}</p>
          </div>
          <div class="locale-list" aria-label="${attr(t.language.label)}">
            ${languagePills}
          </div>
          <p class="language-note">${html(t.languages.note)}</p>
        </div>
      </section>

      <section class="cloud-flow reveal" id="workflow" aria-labelledby="workflow-title">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-kicker"><span class="eyebrow-dot eyebrow-dot--info" aria-hidden="true"></span>${html(t.workflow.kicker)}</span>
            <h2 id="workflow-title">${html(t.workflow.title)}</h2>
            <p>${html(t.workflow.body)}</p>
          </div>

          <ol class="cloud-steps">
            ${t.workflow.steps
              .map(
                ([number, title, body]) => `<li>
              <span>${html(number)}</span>
              <strong>${html(title)}</strong>
              <p>${html(body)}</p>
            </li>`,
              )
              .join("\n")}
          </ol>
        </div>
      </section>

      <section class="faq-section reveal" id="faq" aria-labelledby="faq-title">
        <div class="section-shell faq-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.faq.kicker)}</span>
            <h2 id="faq-title">${html(t.faq.title)}</h2>
            <p>${html(t.faq.body)}</p>
          </div>

          <div class="faq-grid">
            ${t.faq.items
              .map(
                ([question, answer], index) => `<details class="faq-item">
              <summary>
                <span class="faq-index">${String(index + 1).padStart(2, "0")}</span>
                <span class="faq-question">${html(question)}</span>
                <span class="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <div class="faq-answer">
                <p class="faq-answer-body">${html(answer)}</p>
              </div>
            </details>`,
              )
              .join("\n")}
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-meta">
        <a class="brand footer-brand" href="${attr(localePath(currentCode))}" aria-label="Dictivo home">
          <span class="brand-mark" aria-hidden="true">D</span>
          <span class="brand-name">Dictivo</span>
        </a>
        <p class="footer-tagline">${html(t.footer.tagline)}</p>
        <p>${html(t.footer.beta)}</p>
      </div>
      <div class="footer-links">
${renderHomeFooterLinks(currentCode, t)}
      </div>
    </footer>
  </body>
</html>
`;
}

function renderDownloadsJson() {
  const windowsArtifacts = hasWindowsRelease
    ? [
        {
          platform: "windows",
          label: "Windows x64 EXE",
          fileName: windowsRelease.exe.fileName,
          architecture: "x64",
          url: windowsRelease.exe.url,
          redirect: `${BASE_URL}/download/windows`,
          sha256: windowsRelease.exe.sha256,
        },
        {
          platform: "windows",
          label: "Windows x64 MSI",
          fileName: windowsRelease.msi.fileName,
          architecture: "x64",
          url: windowsRelease.msi.url,
          redirect: `${BASE_URL}/download/windows-msi`,
          sha256: windowsRelease.msi.sha256,
        },
      ]
    : [
        {
          platform: "windows",
          label: "Windows x64 EXE",
          fileName: "Dictivo-Windows-x64.exe",
          architecture: "x64",
          status: "coming-later",
          url: `${BASE_URL}/#downloads`,
          redirect: `${BASE_URL}/download/windows`,
        },
        {
          platform: "windows",
          label: "Windows x64 MSI",
          fileName: "Dictivo-Windows-x64.msi",
          architecture: "x64",
          status: "coming-later",
          url: `${BASE_URL}/#downloads`,
          redirect: `${BASE_URL}/download/windows-msi`,
        },
      ];

  return `${JSON.stringify(
    {
      product: "Dictivo",
      domain: BASE_URL,
      downloadHost: "https://downloads.dictivo.app",
      version: release.version,
      channel: release.channel || "stable",
      updatedAt: release.updatedAt,
      artifacts: [
        {
          platform: "macos",
          label: "macOS Universal DMG",
          fileName: release.dmg.fileName,
          architecture: "Apple Silicon + Intel",
          url: release.dmg.url,
          redirect: `${BASE_URL}/download/mac`,
          sha256: release.dmg.sha256,
        },
        ...windowsArtifacts,
      ],
    },
    null,
    2,
  )}\n`;
}

function renderRedirects() {
  const windowsExeUrl = hasWindowsRelease ? windowsRelease.exe.url : "/#downloads";
  const windowsMsiUrl = hasWindowsRelease ? windowsRelease.msi.url : "/#downloads";
  return `/data/* /404.html 404
/scripts/* /404.html 404
/tmp/* /404.html 404
/README.md /404.html 404
/wrangler.toml /404.html 404
/.git/* /404.html 404
/.github/* /404.html 404
/cloud-fast /#cloud-fast 302
/cloud-fast.html /#cloud-fast 302
/download/mac ${release.dmg.url} 302
/download/windows ${windowsExeUrl} 302
/download/windows-msi ${windowsMsiUrl} 302
/downloads/Dictivo-macOS-universal.dmg ${release.dmg.url} 302
/downloads/Dictivo-Windows-x64.exe ${windowsExeUrl} 302
/downloads/Dictivo-Windows-x64.msi ${windowsMsiUrl} 302
/checkout/local ${localCheckoutTarget} 302
/checkout/cloud-fast ${cloudFastCheckoutTarget} 302
`;
}

function renderNotFound() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Page not found · Dictivo</title>
    <meta name="description" content="This Dictivo page is not available." />
    <meta name="theme-color" content="#0a1110" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" />
    <link rel="stylesheet" href="/assets/site.css?v=local" />
  </head>
  <body>
    ${renderHeader("en", HOME_COPY.en)}
    <main class="doc-page" id="not-found">
      <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Dictivo</span>
      <h1>Page not found</h1>
      <p class="doc-lede">The page you requested is not available. Start from Dictivo home to compare plans, privacy options, and the Mac download.</p>
      <section class="doc-section" aria-labelledby="not-found-next">
        <h2 id="not-found-next">Continue with Dictivo</h2>
        <p><a href="/">Go to the Dictivo homepage</a></p>
      </section>
    </main>
    ${renderFooterOnly()}
  </body>
</html>
`;
}

function renderSitemap() {
  const alternates = LOCALES.map(
    (locale) => `    <xhtml:link rel="alternate" hreflang="${locale.htmlLang}" href="${localeUrl(locale.code)}" />`,
  ).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl("en")}" />`;
  const homepageEntries = LOCALES.map(
    (locale) => `  <url>
    <loc>${localeUrl(locale.code)}</loc>
    <lastmod>${release.updatedAt}</lastmod>
${alternates}
${xDefault}
    <priority>${locale.code === "en" ? "1.0" : "0.9"}</priority>
  </url>`,
  ).join("\n");
  const compareEntry = (code, slug = "", priority = "0.7") => {
    const compareAlternates = LOCALES.map(
      (locale) => `    <xhtml:link rel="alternate" hreflang="${locale.htmlLang}" href="${localizedCompareUrl(locale.code, slug)}" />`,
    ).join("\n");
    const compareXDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedCompareUrl("en", slug)}" />`;
    return `  <url>
    <loc>${localizedCompareUrl(code, slug)}</loc>
    <lastmod>${COMPARE_LAST_UPDATED.iso}</lastmod>
${compareAlternates}
${compareXDefault}
    <priority>${priority}</priority>
  </url>`;
  };
  const compareEntries = LOCALES.flatMap((locale) => [
    compareEntry(locale.code, "", locale.code === "en" ? "0.8" : "0.75"),
    ...COMPARE_PAGES.map((page) =>
      compareEntry(locale.code, page.slug, page.slug === "wispr-flow-alternative" ? "0.8" : "0.7"),
    ),
  ]).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homepageEntries}
${compareEntries}
  <url>
    <loc>${BASE_URL}/changelog</loc>
    <lastmod>${release.updatedAt}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/security</loc>
    <lastmod>${release.updatedAt}</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
`;
}

function renderChangelog() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Changelog · Dictivo</title>
    <meta name="description" content="Release notes for Dictivo, the local-first dictation app with optional Cloud Fast." />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="Dictivo · Changelog" />
    <meta property="og:description" content="Release notes for Dictivo, the local-first dictation app with optional Cloud Fast." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${BASE_URL}/changelog" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    <link rel="canonical" href="${BASE_URL}/changelog" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" />
    <link rel="stylesheet" href="/assets/site.css?v=local" />
  </head>
  <body>
    <a class="skip-link" href="#changelog">Skip to changelog</a>
    ${renderHeader("en", HOME_COPY.en)}
    <main class="doc-page" id="changelog">
      <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Release notes</span>
      <h1>Changelog</h1>
      <p class="doc-lede">What shipped, when, and what changed for the people using Dictivo every day.</p>

      <section class="doc-section" id="${release.version}" aria-labelledby="release-${release.version.replaceAll(".", "-")}">
        <p class="release-line">
          <span class="release-tag">${html(release.tag)}</span>
          <span class="release-status">Public beta</span>
          <time class="release-date" datetime="${html(release.updatedAt)}">${html(formatEnglishDate(release.updatedAt))}</time>
        </p>
        <h2 id="release-${release.version.replaceAll(".", "-")}">Language display, sound themes, and release sync.</h2>
        <ul>
          <li>Added display language options for German, French, Spanish, Italian, Dutch, Portuguese, Chinese, Japanese, and Korean while dictation language detection stays automatic.</li>
          <li>Refined dictation sound themes so start, stop, success, and error cues stay short and less fatiguing.</li>
          <li>Updated the public Mac${hasWindowsRelease ? " and Windows" : ""} download to the latest Dictivo build.</li>
          <li>Kept the website download and in-app version messaging aligned.</li>
        </ul>
      </section>

      <section class="doc-section" id="0.3.13" aria-labelledby="release-0-3-13">
        <p class="release-line"><span class="release-tag">v0.3.13</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-24">May 24, 2026</time></p>
        <h2 id="release-0-3-13">Reliable dictation sounds and mute control.</h2>
        <ul>
          <li>Start and stop cues now use native macOS playback first, keeping dictation sounds reliable over long sessions.</li>
          <li>The Settings preview buttons now play the selected cue, and the new Off option mutes dictation start and stop sounds.</li>
          <li>The latest Mac installer is available from the Dictivo website.</li>
        </ul>
      </section>

      <section class="doc-section" id="0.3.12" aria-labelledby="release-0-3-12">
        <p class="release-line"><span class="release-tag">v0.3.12</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-20">May 20, 2026</time></p>
        <h2 id="release-0-3-12">One-click install and restart for updates.</h2>
        <ul>
          <li>Check for updates now installs the downloaded update immediately and restarts Dictivo into the new version.</li>
          <li>The Settings and update banner copy now says install and restart, matching the actual update flow.</li>
          <li>The updater keeps existing settings, licenses, and local data in place during the app update.</li>
          <li>The latest Mac installer is available from the Dictivo website.</li>
        </ul>
      </section>

      <section class="doc-section" id="0.3.11" aria-labelledby="release-0-3-11">
        <p class="release-line"><span class="release-tag">v0.3.11</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-20">May 20, 2026</time></p>
        <h2 id="release-0-3-11">Cloud Fast recovery for upgraded installs.</h2>
        <ul>
          <li>Fixed upgraded Windows installs that could stay stuck on Local setup after Cloud Fast was activated.</li>
          <li>Manual Cloud Fast activation and cached Cloud Fast licenses now switch the desktop app into Cloud Fast when Local is not ready.</li>
          <li>The floating companion now distinguishes Local setup blocks from Cloud Fast subscription blocks.</li>
          <li>The latest Mac installer is available from the Dictivo website.</li>
        </ul>
      </section>

      ${hasWindowsRelease ? `<section class="doc-section" id="windows-public-beta" aria-labelledby="windows-public-title">
        <p class="release-line"><span class="release-tag">Windows</span><span class="release-status">Public beta</span></p>
        <h2 id="windows-public-title">Windows x64 downloads and in-app updates are available.</h2>
        <ul>
          <li>The Windows NSIS installer is now published with the same stable release version as macOS.</li>
          <li>Windows Check for updates reads the shared Dictivo updater manifest.</li>
          <li>The MSI installer is available for users who prefer that package format.</li>
        </ul>
      </section>` : `<section class="doc-section" id="windows-validation-pending" aria-labelledby="windows-validation-title">
        <p class="release-line"><span class="release-tag">Windows</span><span class="release-status" data-status="alpha">Validation pending</span></p>
        <h2 id="windows-validation-title">Windows public downloads wait for signing and real-machine QA.</h2>
        <ul>
          <li>Windows is still in validation before public release.</li>
          <li>Public Windows downloads will appear only after the install and update experience is ready.</li>
          <li>The current public download is the Mac app.</li>
        </ul>
      </section>`}

      <section class="doc-section" aria-labelledby="release-0-2-8">
        <p class="release-line"><span class="release-tag">v0.2.8</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-17">May 17, 2026</time></p>
        <h2 id="release-0-2-8">Local first, <em>Cloud Fast</em> optional.</h2>
        <ul>
          <li>Added the Local / Cloud Fast mode switch to the desktop dictation surface.</li>
          <li>Cloud Fast runs as a separate optional subscription for selected recordings.</li>
          <li>Settings now shows Local model controls only when Local mode is selected.</li>
          <li>Text cleanup is shared across Local and Cloud Fast.</li>
          <li>Floating companion behavior was updated for hotkey-driven recording and completion states.</li>
          <li>Native desktop recording keeps hotkey dictation working when the main window is minimized.</li>
        </ul>
      </section>

      <section class="doc-section" aria-labelledby="release-0-2-0">
        <p class="release-line"><span class="release-tag">v0.2.0</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-13">May 13, 2026</time></p>
        <h2 id="release-0-2-0">Onboarding tiers &amp; <em>history</em>.</h2>
        <ul>
          <li>Onboarding matches the local engine tier to detected hardware on first launch.</li>
          <li>History view keeps recent dictations reachable for review and reuse.</li>
          <li>Dedicated panes for privacy controls and local engine settings.</li>
          <li>Companion overlay during dictation keeps the transcript visible while you work.</li>
          <li>Mac download path established.</li>
          <li>Windows packaging groundwork added; the public Windows version is coming later.</li>
        </ul>
      </section>

      <section class="doc-section" aria-labelledby="release-0-1-0">
        <p class="release-line"><span class="release-tag">v0.1.0</span><span class="release-status" data-status="alpha">Private alpha</span></p>
        <h2 id="release-0-1-0">Initial dictation surface.</h2>
        <ul>
          <li>Local-first dictation for turning speech into text on the Mac.</li>
          <li>Active transcript surface with a visible recording state.</li>
          <li>Hotkey scaffolding and a local user dictionary.</li>
          <li>macOS and Windows builds from the same workspace.</li>
        </ul>
      </section>
    </main>
    ${renderFooterOnly()}
  </body>
</html>
`;
}

function renderFooterOnly(currentCode = "en") {
  const t = HOME_COPY[currentCode] || HOME_COPY.en;
  return `<footer class="site-footer">
      <div class="footer-meta">
        <a class="brand footer-brand" href="${attr(localePath(currentCode))}" aria-label="Dictivo home"><span class="brand-mark" aria-hidden="true">D</span><span class="brand-name">Dictivo</span></a>
        <p class="footer-tagline">${html(t.footer.tagline)}</p>
        <p>${html(t.footer.beta)}</p>
      </div>
      <div class="footer-links">
        <a href="${attr(localePath(currentCode, "#privacy"))}">${html(t.nav.privacy)}</a>
        <a href="${attr(localePath(currentCode, "#pricing"))}">${html(t.nav.pricing)}</a>
        <a href="${attr(localePath(currentCode, "#cloud-fast"))}">${html(t.nav.cloudFast)}</a>
        <a href="${attr(localePath(currentCode, "#downloads"))}">${html(t.nav.downloads)}</a>
        ${renderCompareFooterLinks(currentCode)}
        <a href="/changelog">Changelog</a>
        <a href="/security">Security</a>
        <a href="mailto:support@dictivo.app">support@dictivo.app</a>
      </div>
    </footer>`;
}

function formatEnglishDate(isoDate) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));
}

function write(path, body) {
  const abs = resolve(outDir, path);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, body.replace(/[ \t]+$/gm, ""));
  console.log(`Wrote ${path}`);
}

function writeBinary(path, body) {
  const abs = resolve(outDir, path);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, body);
  console.log(`Wrote ${path}`);
}

function copyStatic(path) {
  const src = resolve(root, path);
  const dest = resolve(outDir, path);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`Copied ${path}`);
}

function listFiles(dir, prefix = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const relative = `${prefix}${entry.name}`;
    const absolute = resolve(dir, entry.name);
    return entry.isDirectory() ? listFiles(absolute, `${relative}/`) : [relative];
  });
}

function tombstoneBody(path) {
  if (path.endsWith(".mjs") || path.endsWith(".js")) return "// Not available.\n";
  if (path.endsWith(".json")) return "{}\n";
  return "Not available.\n";
}

function writeLegacyTombstone(path) {
  if (path.endsWith(".png")) {
    writeBinary(path, transparentPng);
    return;
  }
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
    writeBinary(path, blankJpeg);
    return;
  }
  write(path, tombstoneBody(path));
}

function writeLegacyPrivateTombstones() {
  const legacyTextPaths = [
    ".github/workflows/deploy-cloudflare-pages.yml",
    ".gitignore",
    "README.md",
    "wrangler.toml",
    "data/compare-pages.mjs",
    "data/release.json",
    "data/site-content.mjs",
    "scripts/check-asset-version.mjs",
    "scripts/check-cloud-fast-checkout.mjs",
    "scripts/check-local-checkout.mjs",
    "scripts/check-public-output.mjs",
    "scripts/generate-site.mjs",
    "scripts/inject-asset-version.mjs",
    "scripts/purge-cloudflare-cache.mjs",
    "scripts/set-cloud-fast-checkout.mjs",
    "scripts/set-local-checkout.mjs",
    "scripts/sync-latest-release.mjs",
    "scripts/upload-downloads.sh",
  ];

  for (const path of legacyTextPaths) writeLegacyTombstone(path);
  const tmpDir = resolve(root, "tmp");
  if (existsSync(tmpDir)) {
    for (const path of listFiles(tmpDir, "tmp/")) writeLegacyTombstone(path);
  }
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
copyStatic("assets");
copyFileSync(resolve(root, "_headers"), resolve(outDir, "_headers"));
copyFileSync(resolve(root, "robots.txt"), resolve(outDir, "robots.txt"));
copyFileSync(resolve(root, "security.html"), resolve(outDir, "security.html"));

for (const locale of LOCALES) {
  write(locale.code === "en" ? "index.html" : `${locale.code}/index.html`, renderHome(locale.code));
}

for (const locale of LOCALES) {
  const compareRoot = locale.code === "en" ? "compare" : `${locale.code}/compare`;
  write(`${compareRoot}/index.html`, renderCompareHub(locale.code));
  for (const page of COMPARE_PAGES) {
    write(`${compareRoot}/${page.slug}/index.html`, renderComparePage(page, locale.code));
  }
}

write("downloads.json", renderDownloadsJson());
write("_redirects", renderRedirects());
write("sitemap.xml", renderSitemap());
write("changelog.html", renderChangelog());
write("404.html", renderNotFound());
writeLegacyPrivateTombstones();
