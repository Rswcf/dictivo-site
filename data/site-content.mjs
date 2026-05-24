export const BASE_URL = "https://dictivo.app";

export const LOCALES = [
  { code: "en", htmlLang: "en", name: "English", nativeName: "English", path: "/" },
  { code: "de", htmlLang: "de", name: "German", nativeName: "Deutsch", path: "/de/" },
  { code: "fr", htmlLang: "fr", name: "French", nativeName: "Français", path: "/fr/" },
  { code: "es", htmlLang: "es", name: "Spanish", nativeName: "Español", path: "/es/" },
  { code: "it", htmlLang: "it", name: "Italian", nativeName: "Italiano", path: "/it/" },
  { code: "nl", htmlLang: "nl", name: "Dutch", nativeName: "Nederlands", path: "/nl/" },
  { code: "pt", htmlLang: "pt", name: "Portuguese", nativeName: "Português", path: "/pt/" },
  { code: "zh", htmlLang: "zh-Hans", name: "Chinese", nativeName: "简体中文", path: "/zh/" },
  { code: "ja", htmlLang: "ja", name: "Japanese", nativeName: "日本語", path: "/ja/" },
  { code: "ko", htmlLang: "ko", name: "Korean", nativeName: "한국어", path: "/ko/" },
];

const westernLanguages = "Deutsch, Français, Español, Italiano, Nederlands, Português";
const asianLanguages = "简体中文, 日本語, 한국어";

export const HOME_COPY = {
  en: {
    metaTitle: "Dictivo - Private Mac dictation with optional Cloud Fast",
    metaDescription:
      "Dictivo is a private-first Mac dictation app. Dictate locally by default, then use optional Cloud Fast when speed matters.",
    skip: "Skip to downloads",
    nav: {
      privacy: "Privacy",
      cloudFast: "Cloud Fast",
      pricing: "Pricing",
      faq: "FAQ",
      downloads: "Downloads",
      download: "Mac download",
    },
    language: {
      label: "Language",
      aria: "Change site display language",
    },
    hero: {
      eyebrow: "Private-first Mac dictation",
      title: "Private dictation first.",
      emphasis: "Speed when you choose.",
      play: "Play 76-second demo",
      posterAlt: "Dictivo product video poster showing a private dictation workflow",
      download: "Download for Mac",
      pricing: "See pricing",
      windows: "Windows version coming later.",
    },
    privacy: {
      kicker: "Privacy first",
      title: "Your private words stay on your Mac.",
      body: "Dictivo starts local because most dictation should feel private by default. Cloud Fast is visible because it changes where audio is processed.",
      localTitle: "Local mode",
      localLead: "The everyday path for private work, sensitive notes, client conversations, and personal drafting.",
      localItems: [
        "Microphone audio stays on this device",
        "Transcripts, history, dictionary, and snippets stay local",
        "Works without a cloud transcription account",
        "Free tier includes the tiny local model",
        "Larger local models are available when you upgrade",
      ],
      cloudTitle: "Cloud Fast mode",
      cloudLead: "A separate speed path for low-sensitivity recordings where waiting would break your flow.",
      cloudItems: [
        "Only runs when you select Cloud Fast",
        "Uploads the selected recording for faster transcription",
        "Designed for low-sensitivity recordings",
        "Local remains available whenever privacy matters more",
        "Use Local whenever the audio is sensitive.",
      ],
      footnote: "Read the full privacy boundary on the security page.",
    },
    cloud: {
      kicker: "Cloud Fast",
      title: "Fast transcription without making cloud the default.",
      body: "Use Local when words are private. Use Cloud Fast for low-sensitivity work when waiting breaks your flow.",
      localTop: ["Local", "Default"],
      localTitle: "Private by default.",
      localItems: [
        "Audio remains on your computer",
        "Transcripts, history, dictionary, and snippets stay local",
        "Best for client work, notes, meetings, and sensitive drafting",
      ],
      cloudTop: ["Cloud Fast", "Optional"],
      cloudTitle: "Speed when you choose it.",
      cloudItems: [
        "Uploads only recordings you send through Cloud Fast",
        "Best when turnaround matters more than local-only processing",
        "Use it for low-sensitivity work when speed matters",
      ],
      cloudButton: "Add Cloud Fast",
    },
    pricing: {
      title: "Start free. Upgrade only when the limits matter.",
      body: "Try Dictivo with the tiny local model. Buy Local for stronger private dictation, or add Cloud Fast when speed is worth the upload.",
      tiers: [
        {
          name: "Free Local",
          sub: "Try the private-first workflow on your Mac.",
          price: "Free",
          small: "local tier",
          features: [
            "Local dictation on your device",
            "Tiny on-device model included",
            "Global hotkey and local history",
            "Larger local models require Dictivo Local",
            "No cloud upload in Local mode",
          ],
          button: "Download for Mac",
        },
        {
          name: "Dictivo Local",
          sub: "Unlock larger local models and 12 months of updates.",
          price: "$49",
          small: "one-time",
          features: [
            "Perpetual license for the version you buy",
            "12 months of updates and new local models",
            "Use on up to 5 personal devices",
            "$24/year optional renewal for future updates",
            "14-day refund, no questions",
          ],
          button: "Buy Local",
        },
        {
          name: "Cloud Fast",
          sub: "Add fast cloud transcription for selected recordings.",
          price: "$6.99",
          small: "per month",
          features: [
            "1,500 transcription minutes per month",
            "Standalone or alongside Dictivo Local",
            "One simple Cloud Fast switch in the app",
            "Uploads only recordings you choose",
            "Local dictionary and snippets still apply after text returns",
          ],
          button: "Add Cloud Fast",
        },
      ],
      footnote: "Mac is available now. Windows version coming later.",
      checkoutTitle: "Local checkout opens in Lemon Squeezy.",
      checkoutBody:
        "Dictivo Local is sold through Lemon Squeezy. If the checkout page does not open, email support@dictivo.app and we will help you recover the license path.",
    },
    downloads: {
      kicker: "Mac app",
      title: "Download Dictivo for Mac.",
      body: "The Mac app includes Local mode, the free tiny model, Local license activation, optional Cloud Fast, and display language choices.",
      available: "Available installers",
      macTop: ["macOS", "Recommended"],
      macTitle: "Mac installer",
      macBody: "For Apple Silicon and Intel Macs. Signed and notarized so macOS can verify the app before it opens.",
      macButton: "Download for Mac",
      versionNote: (version) => `Version ${version} - public beta.`,
      windowsTop: ["Windows", "Later"],
      windowsTitle: "Windows version",
      windowsBody: "Dictivo for Windows is planned, but the public launch starts with Mac.",
      windowsStatus: "Coming later",
      windowsNote: "Join from Mac today; Windows will follow after release testing.",
    },
    signed: {
      title: "The public Mac build is signed, notarized, and versioned.",
      cells: [
        ["Current version", "Version {version}"],
        ["Installer", "macOS Universal DMG"],
        ["Manifest", "Machine-readable downloads.json"],
      ],
      footnote: "Download metadata is published at /downloads.json and synced from the latest GitHub Release.",
    },
    languages: {
      kicker: "Languages",
      title: "Display language choices for the people most likely to buy.",
      body: `Dictivo can present the site and product interface in ${westernLanguages}, plus ${asianLanguages}. Speech language detection remains automatic.`,
      note: "Display language changes the interface. Dictation language detection stays automatic.",
    },
    workflow: {
      kicker: "Workflow",
      title: "The workflow is intentionally simple.",
      body: "Dictivo is designed for the moment you need words out of your head and into the app in front of you.",
      steps: [
        ["01", "Download for Mac", "Start with the free local model. No cloud transcription account is required for Local mode."],
        ["02", "Press the hotkey", "Speak from any app, stop recording, and get the transcript back into your workflow."],
        ["03", "Switch only when needed", "Stay Local for private work. Use Cloud Fast when the recording is not sensitive and speed matters."],
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "Questions before you download.",
      body: "Short answers about privacy, pricing, Cloud Fast, languages, and availability.",
      items: [
        [
          "Does my voice leave my Mac?",
          "In Local mode, no. Audio and transcripts stay on your device. In Cloud Fast mode, the recording you choose is uploaded for faster transcription.",
        ],
        [
          "What is included for free?",
          "The free tier includes Local mode with the tiny on-device model, global hotkey dictation, and local history. Larger local models require Dictivo Local.",
        ],
        [
          "When should I buy Dictivo Local?",
          "Buy Local if you want stronger on-device models, 12 months of updates, and private dictation without relying on cloud transcription.",
        ],
        [
          "What is Cloud Fast?",
          "Cloud Fast is the optional speed mode. It uploads selected recordings for faster transcription when local-only processing is not the priority.",
        ],
        [
          "Do I choose a dictation language manually?",
          "No. Dictation language detection is automatic. The language menu only changes the website and interface display language.",
        ],
        ["Is Windows available?", "Not yet. Dictivo is available for Mac now, and the Windows version is coming later."],
      ],
    },
    footer: {
      tagline: "Private dictation first - optional Cloud Fast",
      beta: "Mac public beta - 2026",
    },
  },

  de: {
    metaTitle: "Dictivo - Private Mac-Diktat-App mit Cloud Fast",
    metaDescription:
      "Dictivo ist eine private Mac-Diktat-App. Diktieren Sie standardmäßig lokal und nutzen Sie optional Cloud Fast, wenn Geschwindigkeit wichtiger ist.",
    skip: "Zu den Downloads springen",
    nav: { privacy: "Datenschutz", cloudFast: "Cloud Fast", pricing: "Preise", faq: "FAQ", downloads: "Downloads", download: "Mac Download" },
    language: { label: "Sprache", aria: "Anzeigesprache der Website ändern" },
    hero: {
      eyebrow: "Privates Mac-Diktat",
      title: "Privates Diktieren zuerst.",
      emphasis: "Tempo, wenn Sie es wählen.",
      play: "76-Sekunden-Demo abspielen",
      posterAlt: "Dictivo Produktvideo mit einem privaten Diktierablauf",
      download: "Für Mac herunterladen",
      pricing: "Preise ansehen",
      windows: "Windows-Version folgt später.",
    },
    privacy: {
      kicker: "Datenschutz zuerst",
      title: "Ihre privaten Worte bleiben auf Ihrem Mac.",
      body: "Dictivo startet lokal, weil Diktieren standardmäßig privat sein sollte. Cloud Fast ist klar sichtbar, weil sich dadurch ändert, wo Audio verarbeitet wird.",
      localTitle: "Lokaler Modus",
      localLead: "Der Alltagspfad für private Arbeit, sensible Notizen, Kundengespräche und persönliche Entwürfe.",
      localItems: [
        "Mikrofonaudio bleibt auf diesem Gerät",
        "Transkripte, Verlauf, Wörterbuch und Textbausteine bleiben lokal",
        "Funktioniert ohne Cloud-Transkriptionskonto",
        "Die Gratisversion enthält das kleine lokale Modell",
        "Größere lokale Modelle sind nach dem Upgrade verfügbar",
      ],
      cloudTitle: "Cloud Fast Modus",
      cloudLead: "Ein separater Geschwindigkeitspfad für wenig sensible Aufnahmen, bei denen Warten den Arbeitsfluss stört.",
      cloudItems: [
        "Läuft nur, wenn Sie Cloud Fast auswählen",
        "Lädt die ausgewählte Aufnahme für schnellere Transkription hoch",
        "Für wenig sensible Aufnahmen gedacht",
        "Lokal bleibt verfügbar, wenn Datenschutz wichtiger ist",
        "Nutzen Sie Lokal, sobald Audio sensibel ist.",
      ],
      footnote: "Die vollständige Datenschutzgrenze steht auf der Sicherheitsseite.",
    },
    cloud: {
      kicker: "Cloud Fast",
      title: "Schnelle Transkription, ohne Cloud zum Standard zu machen.",
      body: "Nutzen Sie Lokal für private Inhalte. Nutzen Sie Cloud Fast für wenig sensible Arbeit, wenn Wartezeit den Fluss stört.",
      localTop: ["Lokal", "Standard"],
      localTitle: "Standardmäßig privat.",
      localItems: [
        "Audio bleibt auf Ihrem Computer",
        "Transkripte, Verlauf, Wörterbuch und Textbausteine bleiben lokal",
        "Ideal für Kundenarbeit, Notizen, Meetings und sensible Entwürfe",
      ],
      cloudTop: ["Cloud Fast", "Optional"],
      cloudTitle: "Tempo, wenn Sie es wählen.",
      cloudItems: [
        "Lädt nur Aufnahmen hoch, die Sie über Cloud Fast senden",
        "Ideal, wenn Tempo wichtiger ist als rein lokale Verarbeitung",
        "Für wenig sensible Arbeit, wenn Geschwindigkeit zählt",
      ],
      cloudButton: "Cloud Fast hinzufügen",
    },
    pricing: {
      title: "Kostenlos starten. Erst upgraden, wenn Grenzen stören.",
      body: "Testen Sie Dictivo mit dem kleinen lokalen Modell. Kaufen Sie Local für stärkeres privates Diktieren oder ergänzen Sie Cloud Fast, wenn Geschwindigkeit den Upload wert ist.",
      tiers: [
        { name: "Free Local", sub: "Testen Sie den privaten Ablauf auf Ihrem Mac.", price: "Kostenlos", small: "lokale Stufe", features: ["Lokales Diktieren auf Ihrem Gerät", "Kleines On-Device-Modell enthalten", "Globaler Hotkey und lokaler Verlauf", "Größere lokale Modelle benötigen Dictivo Local", "Kein Cloud-Upload im lokalen Modus"], button: "Für Mac herunterladen" },
        { name: "Dictivo Local", sub: "Größere lokale Modelle und 12 Monate Updates freischalten.", price: "$49", small: "einmalig", features: ["Dauerlizenz für die gekaufte Version", "12 Monate Updates und neue lokale Modelle", "Auf bis zu 5 persönlichen Geräten nutzbar", "$24/Jahr optionale Verlängerung für künftige Updates", "14 Tage Erstattung ohne Fragen"], button: "Local kaufen" },
        { name: "Cloud Fast", sub: "Schnelle Cloud-Transkription für ausgewählte Aufnahmen.", price: "$6.99", small: "pro Monat", features: ["1.500 Transkriptionsminuten pro Monat", "Eigenständig oder zusammen mit Dictivo Local", "Ein klarer Cloud Fast Schalter in der App", "Lädt nur ausgewählte Aufnahmen hoch", "Lokales Wörterbuch und Snippets greifen nach der Rückgabe des Textes"], button: "Cloud Fast hinzufügen" },
      ],
      footnote: "Mac ist jetzt verfügbar. Windows folgt später.",
      checkoutTitle: "Local Checkout öffnet Lemon Squeezy.",
      checkoutBody: "Dictivo Local wird über Lemon Squeezy verkauft. Wenn der Checkout nicht öffnet, schreiben Sie an support@dictivo.app.",
    },
    downloads: {
      kicker: "Mac App",
      title: "Dictivo für Mac herunterladen.",
      body: "Die Mac App enthält lokalen Modus, kleines Gratis-Modell, Local Lizenzaktivierung, optionales Cloud Fast und Anzeigesprachen.",
      available: "Verfügbare Installer",
      macTop: ["macOS", "Empfohlen"],
      macTitle: "Mac Installer",
      macBody: "Für Apple Silicon und Intel Macs. Signiert und notarisiert, damit macOS die App vor dem Öffnen prüfen kann.",
      macButton: "Für Mac herunterladen",
      versionNote: (version) => `Version ${version} - öffentliche Beta.`,
      windowsTop: ["Windows", "Später"],
      windowsTitle: "Windows-Version",
      windowsBody: "Dictivo für Windows ist geplant, aber der öffentliche Start beginnt mit Mac.",
      windowsStatus: "Folgt später",
      windowsNote: "Heute mit Mac starten; Windows folgt nach den Release-Tests.",
    },
    signed: {
      title: "Der öffentliche Mac-Build ist signiert, notarisiert und versioniert.",
      cells: [["Aktuelle Version", "Version {version}"], ["Installer", "macOS Universal DMG"], ["Manifest", "Maschinenlesbares downloads.json"]],
      footnote: "Download-Metadaten stehen unter /downloads.json und werden aus dem neuesten GitHub Release synchronisiert.",
    },
    languages: {
      kicker: "Sprachen",
      title: "Anzeigesprachen für zahlungsstarke Zielmärkte.",
      body: `Dictivo kann Website und Oberfläche in ${westernLanguages} sowie ${asianLanguages} anzeigen. Die Erkennung der gesprochenen Sprache bleibt automatisch.`,
      note: "Die Anzeigesprache ändert die Oberfläche. Die Diktatsprache wird weiter automatisch erkannt.",
    },
    workflow: {
      kicker: "Ablauf",
      title: "Der Ablauf bleibt bewusst einfach.",
      body: "Dictivo ist für den Moment gebaut, in dem Gedanken schnell als Text in der aktuellen App landen sollen.",
      steps: [["01", "Für Mac herunterladen", "Starten Sie mit dem kostenlosen lokalen Modell. Für Lokal ist kein Cloud-Konto nötig."], ["02", "Hotkey drücken", "Sprechen Sie aus jeder App, stoppen Sie die Aufnahme und übernehmen Sie das Transkript."], ["03", "Nur bei Bedarf wechseln", "Bleiben Sie lokal für Privates. Nutzen Sie Cloud Fast, wenn die Aufnahme wenig sensibel ist und Tempo zählt."]],
    },
    faq: {
      kicker: "FAQ",
      title: "Fragen vor dem Download.",
      body: "Kurze Antworten zu Datenschutz, Preisen, Cloud Fast, Sprachen und Verfügbarkeit.",
      items: [["Verlässt meine Stimme den Mac?", "Im lokalen Modus nein. Audio und Transkripte bleiben auf Ihrem Gerät. Im Cloud Fast Modus wird die gewählte Aufnahme für schnellere Transkription hochgeladen."], ["Was ist kostenlos enthalten?", "Die kostenlose Stufe enthält den lokalen Modus mit kleinem On-Device-Modell, globalem Hotkey und lokalem Verlauf."], ["Wann sollte ich Dictivo Local kaufen?", "Kaufen Sie Local, wenn Sie stärkere lokale Modelle, 12 Monate Updates und privates Diktieren ohne Cloud-Abhängigkeit möchten."], ["Was ist Cloud Fast?", "Cloud Fast ist der optionale Geschwindigkeitsmodus. Er lädt ausgewählte Aufnahmen für schnellere Transkription hoch."], ["Wähle ich die Diktatsprache manuell?", "Nein. Die Diktatsprache wird automatisch erkannt. Das Sprachmenü ändert nur Website und Oberfläche."], ["Gibt es Windows?", "Noch nicht. Dictivo ist jetzt für Mac verfügbar, Windows folgt später."]],
    },
    footer: { tagline: "Privates Diktieren zuerst - optional Cloud Fast", beta: "Mac öffentliche Beta - 2026" },
  },

  fr: {
    metaTitle: "Dictivo - Dictée Mac privée avec Cloud Fast en option",
    metaDescription:
      "Dictivo est une app de dictée Mac privée par défaut. Dictez en local, gardez vos notes sur l'appareil, puis utilisez Cloud Fast quand la vitesse compte.",
    skip: "Aller aux téléchargements",
    nav: { privacy: "Confidentialité", cloudFast: "Cloud Fast", pricing: "Tarifs", faq: "FAQ", downloads: "Téléchargements", download: "Télécharger" },
    language: { label: "Langue", aria: "Changer la langue d'affichage du site" },
    hero: {
      eyebrow: "Dictée Mac privée",
      title: "La dictée privée d'abord.",
      emphasis: "La vitesse quand vous la choisissez.",
      play: "Lire la démo de 76 secondes",
      posterAlt: "Affiche vidéo Dictivo montrant un flux de dictée privée",
      download: "Télécharger pour Mac",
      pricing: "Voir les tarifs",
      windows: "Version Windows à venir.",
    },
    privacy: {
      kicker: "Confidentialité d'abord",
      title: "Vos mots privés restent sur votre Mac.",
      body: "Dictivo commence en local, parce que la dictée devrait être privée par défaut. Cloud Fast est explicite, car il change l'endroit où l'audio est traité.",
      localTitle: "Mode local",
      localLead: "Le chemin quotidien pour le travail privé, les notes sensibles, les échanges clients et les brouillons personnels.",
      localItems: ["L'audio du micro reste sur cet appareil", "Transcriptions, historique, dictionnaire et extraits restent locaux", "Fonctionne sans compte de transcription cloud", "L'offre gratuite inclut le petit modèle local", "Des modèles locaux plus puissants sont disponibles avec l'achat"],
      cloudTitle: "Mode Cloud Fast",
      cloudLead: "Un chemin rapide séparé pour les enregistrements peu sensibles quand l'attente casse le flux.",
      cloudItems: ["Ne s'exécute que si vous sélectionnez Cloud Fast", "Téléverse l'enregistrement choisi pour une transcription plus rapide", "Conçu pour les enregistrements peu sensibles", "Le mode local reste disponible quand la confidentialité prime", "Utilisez Local dès que l'audio est sensible."],
      footnote: "Lisez la frontière complète de confidentialité sur la page sécurité.",
    },
    cloud: {
      kicker: "Cloud Fast",
      title: "Une transcription rapide sans faire du cloud le choix par défaut.",
      body: "Utilisez Local quand les mots sont privés. Utilisez Cloud Fast pour les contenus peu sensibles quand l'attente ralentit votre travail.",
      localTop: ["Local", "Défaut"],
      localTitle: "Privé par défaut.",
      localItems: ["L'audio reste sur votre ordinateur", "Transcriptions, historique, dictionnaire et extraits restent locaux", "Idéal pour clients, notes, réunions et brouillons sensibles"],
      cloudTop: ["Cloud Fast", "Optionnel"],
      cloudTitle: "La vitesse quand vous la choisissez.",
      cloudItems: ["Téléverse uniquement les enregistrements envoyés via Cloud Fast", "Idéal quand le délai compte plus que le traitement local seul", "Pour les travaux peu sensibles où la vitesse compte"],
      cloudButton: "Ajouter Cloud Fast",
    },
    pricing: {
      title: "Commencez gratuitement. Payez seulement quand les limites comptent.",
      body: "Essayez Dictivo avec le petit modèle local. Achetez Local pour une dictée privée plus forte, ou ajoutez Cloud Fast quand la vitesse justifie l'envoi.",
      tiers: [
        { name: "Free Local", sub: "Essayez le flux privé sur votre Mac.", price: "Gratuit", small: "niveau local", features: ["Dictée locale sur votre appareil", "Petit modèle embarqué inclus", "Raccourci global et historique local", "Les modèles locaux plus grands nécessitent Dictivo Local", "Aucun envoi cloud en mode Local"], button: "Télécharger pour Mac" },
        { name: "Dictivo Local", sub: "Débloquez les modèles locaux plus grands et 12 mois de mises à jour.", price: "$49", small: "paiement unique", features: ["Licence perpétuelle pour la version achetée", "12 mois de mises à jour et nouveaux modèles locaux", "Jusqu'à 5 appareils personnels", "Renouvellement optionnel à $24/an", "Remboursement 14 jours, sans question"], button: "Acheter Local" },
        { name: "Cloud Fast", sub: "Ajoutez une transcription cloud rapide pour certains enregistrements.", price: "$6.99", small: "par mois", features: ["1 500 minutes de transcription par mois", "Seul ou avec Dictivo Local", "Un simple bouton Cloud Fast dans l'app", "N'envoie que les enregistrements choisis", "Dictionnaire local et extraits s'appliquent après le retour du texte"], button: "Ajouter Cloud Fast" },
      ],
      footnote: "Mac est disponible maintenant. Windows arrive plus tard.",
      checkoutTitle: "Le paiement Local s'ouvre dans Lemon Squeezy.",
      checkoutBody: "Dictivo Local est vendu via Lemon Squeezy. Si le paiement ne s'ouvre pas, écrivez à support@dictivo.app.",
    },
    downloads: {
      kicker: "App Mac",
      title: "Télécharger Dictivo pour Mac.",
      body: "L'app Mac inclut le mode Local, le petit modèle gratuit, l'activation Local, Cloud Fast en option et les langues d'affichage.",
      available: "Installateurs disponibles",
      macTop: ["macOS", "Recommandé"],
      macTitle: "Installateur Mac",
      macBody: "Pour les Mac Apple Silicon et Intel. Signé et notarié pour que macOS vérifie l'app avant ouverture.",
      macButton: "Télécharger pour Mac",
      versionNote: (version) => `Version ${version} - bêta publique.`,
      windowsTop: ["Windows", "Plus tard"],
      windowsTitle: "Version Windows",
      windowsBody: "Dictivo pour Windows est prévu, mais le lancement public commence sur Mac.",
      windowsStatus: "À venir",
      windowsNote: "Commencez sur Mac aujourd'hui; Windows suivra après les tests de version.",
    },
    signed: {
      title: "La version Mac publique est signée, notariée et versionnée.",
      cells: [["Version actuelle", "Version {version}"], ["Installateur", "DMG universel macOS"], ["Manifeste", "downloads.json lisible par machine"]],
      footnote: "Les métadonnées de téléchargement sont publiées sur /downloads.json et synchronisées depuis le dernier GitHub Release.",
    },
    languages: {
      kicker: "Langues",
      title: "Des langues d'affichage pour les marchés qui peuvent payer.",
      body: `Dictivo peut afficher le site et l'interface en ${westernLanguages}, ainsi qu'en ${asianLanguages}. La détection de la langue dictée reste automatique.`,
      note: "La langue d'affichage change l'interface. La langue de dictée reste détectée automatiquement.",
    },
    workflow: {
      kicker: "Flux",
      title: "Le flux reste volontairement simple.",
      body: "Dictivo est conçu pour transformer rapidement vos idées en texte dans l'app où vous travaillez.",
      steps: [["01", "Télécharger pour Mac", "Commencez avec le modèle local gratuit. Aucun compte cloud n'est requis en mode Local."], ["02", "Appuyer sur le raccourci", "Parlez depuis n'importe quelle app, arrêtez l'enregistrement et récupérez le texte."], ["03", "Changer seulement si nécessaire", "Restez en Local pour le privé. Utilisez Cloud Fast quand l'enregistrement est peu sensible et que la vitesse compte."]],
    },
    faq: {
      kicker: "FAQ",
      title: "Questions avant le téléchargement.",
      body: "Réponses courtes sur confidentialité, tarifs, Cloud Fast, langues et disponibilité.",
      items: [["Ma voix quitte-t-elle mon Mac?", "En mode Local, non. Audio et transcriptions restent sur l'appareil. En mode Cloud Fast, l'enregistrement choisi est envoyé pour une transcription plus rapide."], ["Qu'est-ce qui est gratuit?", "L'offre gratuite inclut le mode Local avec le petit modèle embarqué, le raccourci global et l'historique local."], ["Quand acheter Dictivo Local?", "Achetez Local si vous voulez des modèles embarqués plus forts, 12 mois de mises à jour et une dictée privée sans dépendre du cloud."], ["Qu'est-ce que Cloud Fast?", "Cloud Fast est le mode vitesse optionnel. Il téléverse certains enregistrements pour une transcription plus rapide."], ["Dois-je choisir la langue de dictée?", "Non. La langue de dictée est détectée automatiquement. Le menu de langue ne change que le site et l'interface."], ["Windows est-il disponible?", "Pas encore. Dictivo est disponible sur Mac maintenant, Windows arrive plus tard."]],
    },
    footer: { tagline: "Dictée privée d'abord - Cloud Fast en option", beta: "Bêta publique Mac - 2026" },
  },

  es: {
    metaTitle: "Dictivo - Dictado privado para Mac con Cloud Fast opcional",
    metaDescription:
      "Dictivo es una app de dictado para Mac centrada en la privacidad. Dicta localmente y usa Cloud Fast cuando la velocidad importa.",
    skip: "Saltar a descargas",
    nav: { privacy: "Privacidad", cloudFast: "Cloud Fast", pricing: "Precios", faq: "FAQ", downloads: "Descargas", download: "Descargar" },
    language: { label: "Idioma", aria: "Cambiar idioma de visualización del sitio" },
    hero: {
      eyebrow: "Dictado privado para Mac",
      title: "Primero, dictado privado.",
      emphasis: "Velocidad cuando la eliges.",
      play: "Ver demo de 76 segundos",
      posterAlt: "Video de Dictivo mostrando un flujo de dictado privado",
      download: "Descargar para Mac",
      pricing: "Ver precios",
      windows: "Versión para Windows más adelante.",
    },
    privacy: {
      kicker: "Privacidad primero",
      title: "Tus palabras privadas se quedan en tu Mac.",
      body: "Dictivo empieza en local porque el dictado debería ser privado por defecto. Cloud Fast es visible porque cambia dónde se procesa el audio.",
      localTitle: "Modo Local",
      localLead: "La ruta diaria para trabajo privado, notas sensibles, conversaciones con clientes y borradores personales.",
      localItems: ["El audio del micrófono queda en este dispositivo", "Transcripciones, historial, diccionario y fragmentos quedan locales", "Funciona sin una cuenta de transcripción en la nube", "El plan gratis incluye el modelo local pequeño", "Los modelos locales más grandes están disponibles al actualizar"],
      cloudTitle: "Modo Cloud Fast",
      cloudLead: "Una ruta rápida separada para grabaciones poco sensibles cuando esperar rompe tu flujo.",
      cloudItems: ["Solo funciona cuando eliges Cloud Fast", "Sube la grabación seleccionada para transcribir más rápido", "Diseñado para grabaciones poco sensibles", "Local sigue disponible cuando la privacidad importa más", "Usa Local siempre que el audio sea sensible."],
      footnote: "Lee el límite completo de privacidad en la página de seguridad.",
    },
    cloud: {
      kicker: "Cloud Fast",
      title: "Transcripción rápida sin hacer que la nube sea el valor predeterminado.",
      body: "Usa Local cuando las palabras son privadas. Usa Cloud Fast para trabajo poco sensible cuando esperar corta el ritmo.",
      localTop: ["Local", "Por defecto"],
      localTitle: "Privado por defecto.",
      localItems: ["El audio permanece en tu ordenador", "Transcripciones, historial, diccionario y fragmentos quedan locales", "Ideal para clientes, notas, reuniones y borradores sensibles"],
      cloudTop: ["Cloud Fast", "Opcional"],
      cloudTitle: "Velocidad cuando la eliges.",
      cloudItems: ["Solo sube las grabaciones que envías con Cloud Fast", "Ideal cuando la rapidez pesa más que procesar solo en local", "Para trabajo poco sensible cuando importa la velocidad"],
      cloudButton: "Añadir Cloud Fast",
    },
    pricing: {
      title: "Empieza gratis. Mejora solo cuando los límites importen.",
      body: "Prueba Dictivo con el modelo local pequeño. Compra Local para dictado privado más potente o añade Cloud Fast cuando la velocidad valga la subida.",
      tiers: [
        { name: "Free Local", sub: "Prueba el flujo privado en tu Mac.", price: "Gratis", small: "nivel local", features: ["Dictado local en tu dispositivo", "Modelo pequeño en el dispositivo incluido", "Atajo global e historial local", "Los modelos locales grandes requieren Dictivo Local", "Sin subida a la nube en modo Local"], button: "Descargar para Mac" },
        { name: "Dictivo Local", sub: "Desbloquea modelos locales grandes y 12 meses de actualizaciones.", price: "$49", small: "pago único", features: ["Licencia perpetua para la versión comprada", "12 meses de actualizaciones y nuevos modelos locales", "Uso en hasta 5 dispositivos personales", "Renovación opcional de $24/año", "Reembolso de 14 días, sin preguntas"], button: "Comprar Local" },
        { name: "Cloud Fast", sub: "Añade transcripción cloud rápida para grabaciones seleccionadas.", price: "$6.99", small: "al mes", features: ["1.500 minutos de transcripción al mes", "Solo o junto a Dictivo Local", "Un simple interruptor Cloud Fast en la app", "Sube solo las grabaciones que eliges", "Diccionario local y fragmentos se aplican al volver el texto"], button: "Añadir Cloud Fast" },
      ],
      footnote: "Mac está disponible ahora. Windows llegará más adelante.",
      checkoutTitle: "El pago de Local se abre en Lemon Squeezy.",
      checkoutBody: "Dictivo Local se vende mediante Lemon Squeezy. Si el pago no se abre, escribe a support@dictivo.app.",
    },
    downloads: {
      kicker: "App para Mac",
      title: "Descarga Dictivo para Mac.",
      body: "La app de Mac incluye modo Local, modelo pequeño gratis, activación Local, Cloud Fast opcional e idiomas de visualización.",
      available: "Instaladores disponibles",
      macTop: ["macOS", "Recomendado"],
      macTitle: "Instalador para Mac",
      macBody: "Para Mac Apple Silicon e Intel. Firmado y notarizado para que macOS pueda verificar la app antes de abrirla.",
      macButton: "Descargar para Mac",
      versionNote: (version) => `Versión ${version} - beta pública.`,
      windowsTop: ["Windows", "Después"],
      windowsTitle: "Versión para Windows",
      windowsBody: "Dictivo para Windows está previsto, pero el lanzamiento público empieza con Mac.",
      windowsStatus: "Más adelante",
      windowsNote: "Empieza hoy en Mac; Windows seguirá después de las pruebas de lanzamiento.",
    },
    signed: {
      title: "La versión pública para Mac está firmada, notarizada y versionada.",
      cells: [["Versión actual", "Versión {version}"], ["Instalador", "DMG universal de macOS"], ["Manifiesto", "downloads.json legible por máquina"]],
      footnote: "Los metadatos de descarga se publican en /downloads.json y se sincronizan desde el último GitHub Release.",
    },
    languages: {
      kicker: "Idiomas",
      title: "Idiomas de visualización para mercados con alta capacidad de pago.",
      body: `Dictivo puede mostrar el sitio y la interfaz en ${westernLanguages}, además de ${asianLanguages}. La detección del idioma dictado sigue siendo automática.`,
      note: "El idioma de visualización cambia la interfaz. El idioma de dictado se detecta automáticamente.",
    },
    workflow: {
      kicker: "Flujo",
      title: "El flujo es deliberadamente simple.",
      body: "Dictivo está diseñado para pasar tus palabras a la app en la que trabajas justo cuando lo necesitas.",
      steps: [["01", "Descargar para Mac", "Empieza con el modelo local gratuito. No hace falta cuenta cloud para el modo Local."], ["02", "Pulsa el atajo", "Habla desde cualquier app, detén la grabación y recupera la transcripción."], ["03", "Cambia solo cuando haga falta", "Mantente en Local para lo privado. Usa Cloud Fast cuando la grabación no sea sensible y la velocidad importe."]],
    },
    faq: {
      kicker: "FAQ",
      title: "Preguntas antes de descargar.",
      body: "Respuestas breves sobre privacidad, precios, Cloud Fast, idiomas y disponibilidad.",
      items: [["¿Mi voz sale de mi Mac?", "En modo Local, no. Audio y transcripciones quedan en el dispositivo. En Cloud Fast, la grabación elegida se sube para transcribir más rápido."], ["¿Qué incluye gratis?", "El plan gratuito incluye modo Local con el modelo pequeño, atajo global e historial local."], ["¿Cuándo comprar Dictivo Local?", "Compra Local si quieres modelos en el dispositivo más potentes, 12 meses de actualizaciones y dictado privado sin depender de la nube."], ["¿Qué es Cloud Fast?", "Cloud Fast es el modo rápido opcional. Sube grabaciones seleccionadas para transcripción más veloz."], ["¿Elijo manualmente el idioma de dictado?", "No. El idioma de dictado se detecta automáticamente. El menú de idioma solo cambia el sitio y la interfaz."], ["¿Está disponible Windows?", "Todavía no. Dictivo está disponible para Mac ahora y Windows llegará más adelante."]],
    },
    footer: { tagline: "Primero dictado privado - Cloud Fast opcional", beta: "Beta pública para Mac - 2026" },
  },
};

const italian = {
  metaTitle: "Dictivo - Dettatura privata per Mac con Cloud Fast opzionale",
  metaDescription:
    "Dictivo è un'app di dettatura per Mac orientata alla privacy. Detta in locale per impostazione predefinita e usa Cloud Fast quando serve velocità.",
  skip: "Vai ai download",
  nav: { privacy: "Privacy", cloudFast: "Cloud Fast", pricing: "Prezzi", faq: "FAQ", downloads: "Scaricamenti", download: "Scarica Mac" },
  language: { label: "Lingua", aria: "Cambia lingua di visualizzazione del sito" },
  hero: {
    eyebrow: "Dettatura privata per Mac",
    title: "Prima la dettatura privata.",
    emphasis: "Velocità quando la scegli.",
    play: "Riproduci demo di 76 secondi",
    posterAlt: "Video di Dictivo con un flusso di dettatura privata",
    download: "Scarica per Mac",
    pricing: "Vedi prezzi",
    windows: "Versione Windows in arrivo più avanti.",
  },
};

const dutch = {
  metaTitle: "Dictivo - Privé dicteren voor Mac met optionele Cloud Fast",
  metaDescription:
    "Dictivo is een privacygerichte dicteerapp voor Mac. Dicteer standaard lokaal en gebruik Cloud Fast wanneer snelheid telt.",
  skip: "Naar downloads",
  nav: { privacy: "Privacy", cloudFast: "Cloud Fast", pricing: "Prijzen", faq: "FAQ", downloads: "Downloads", download: "Mac-download" },
  language: { label: "Taal", aria: "Weergavetaal van de site wijzigen" },
  hero: {
    eyebrow: "Privé dicteren op Mac",
    title: "Eerst privé dicteren.",
    emphasis: "Snelheid wanneer je kiest.",
    play: "Demo van 76 seconden afspelen",
    posterAlt: "Dictivo video met een privé dicteerworkflow",
    download: "Download voor Mac",
    pricing: "Bekijk prijzen",
    windows: "Windows-versie komt later.",
  },
};

const portuguese = {
  metaTitle: "Dictivo - Ditado privado para Mac com Cloud Fast opcional",
  metaDescription:
    "Dictivo é um app de ditado para Mac com privacidade em primeiro lugar. Dite localmente e use Cloud Fast quando a velocidade importar.",
  skip: "Ir para downloads",
  nav: { privacy: "Privacidade", cloudFast: "Cloud Fast", pricing: "Preços", faq: "FAQ", downloads: "Downloads", download: "Baixar" },
  language: { label: "Idioma", aria: "Alterar idioma de exibição do site" },
  hero: {
    eyebrow: "Ditado privado para Mac",
    title: "Ditado privado primeiro.",
    emphasis: "Velocidade quando você escolhe.",
    play: "Reproduzir demo de 76 segundos",
    posterAlt: "Vídeo do Dictivo mostrando um fluxo de ditado privado",
    download: "Baixar para Mac",
    pricing: "Ver preços",
    windows: "Versão para Windows virá depois.",
  },
};

const chinese = {
  metaTitle: "Dictivo - 面向 Mac 的私密听写，Cloud Fast 可选",
  metaDescription:
    "Dictivo 是一款以隐私优先的 Mac 听写应用。默认使用本地转录，音频和历史记录留在设备上；只有在你需要速度并主动选择时，才使用 Cloud Fast。适合笔记、写作、会议摘要、客户沟通、邮件回复、研究整理、商务记录和日常长文本输入。",
  skip: "跳到下载",
  nav: { privacy: "隐私", cloudFast: "Cloud Fast", pricing: "价格", faq: "常见问题", downloads: "下载", download: "下载" },
  language: { label: "语言", aria: "切换网站显示语言" },
  hero: {
    eyebrow: "Mac 私密听写",
    title: "私密听写优先。",
    emphasis: "需要时加速。",
    play: "播放 76 秒演示",
    posterAlt: "Dictivo 产品视频海报，展示私密听写流程",
    download: "下载 Mac 版",
    pricing: "查看价格",
    windows: "Windows 版本稍后推出。",
  },
};

const japanese = {
  metaTitle: "Dictivo - Cloud Fast を選べる Mac 向けプライベート音声入力",
  metaDescription:
    "Dictivo はプライバシーを優先する Mac 向け音声入力アプリです。標準はローカル処理で、音声と履歴はデバイスに残ります。速度が必要な時だけ Cloud Fast を使えます。メモ、執筆、会議要約、顧客対応、日常の長文入力に向いています。",
  skip: "ダウンロードへ移動",
  nav: { privacy: "プライバシー", cloudFast: "Cloud Fast", pricing: "料金", faq: "FAQ", downloads: "ダウンロード", download: "ダウンロード" },
  language: { label: "言語", aria: "サイトの表示言語を変更" },
  hero: {
    eyebrow: "Mac のプライベート音声入力",
    title: "ローカル音声入力を優先。",
    emphasis: "必要な時だけ高速化。",
    play: "76 秒のデモを再生",
    posterAlt: "プライベートな音声入力フローを示す Dictivo の製品動画",
    download: "Mac 版をダウンロード",
    pricing: "料金を見る",
    windows: "Windows 版は今後提供予定です。",
  },
};

const korean = {
  metaTitle: "Dictivo - Cloud Fast를 선택할 수 있는 Mac용 비공개 받아쓰기",
  metaDescription:
    "Dictivo는 개인정보 보호를 우선하는 Mac 받아쓰기 앱입니다. 기본은 로컬 처리라 오디오와 기록이 기기에 남고, 속도가 필요할 때만 Cloud Fast를 사용합니다. 메모, 글쓰기, 회의 요약, 고객 커뮤니케이션, 일상적인 긴 텍스트 입력에 적합합니다.",
  skip: "다운로드로 이동",
  nav: { privacy: "개인정보", cloudFast: "Cloud Fast", pricing: "가격", faq: "FAQ", downloads: "다운로드", download: "다운로드" },
  language: { label: "언어", aria: "사이트 표시 언어 변경" },
  hero: {
    eyebrow: "Mac 비공개 받아쓰기",
    title: "먼저 비공개 받아쓰기.",
    emphasis: "필요할 때만 빠르게.",
    play: "76초 데모 재생",
    posterAlt: "비공개 받아쓰기 흐름을 보여주는 Dictivo 제품 영상",
    download: "Mac용 다운로드",
    pricing: "가격 보기",
    windows: "Windows 버전은 나중에 제공됩니다.",
  },
};

function deriveFromEnglish(base, overrides, localeName) {
  return {
    ...base,
    ...overrides,
    privacy: {
      ...base.privacy,
      kicker: overrides.nav?.privacy || base.privacy.kicker,
      title:
        localeName === "it"
          ? "Le tue parole private restano sul tuo Mac."
          : localeName === "nl"
            ? "Je privéwoorden blijven op je Mac."
            : localeName === "pt"
              ? "Suas palavras privadas ficam no seu Mac."
              : localeName === "zh"
                ? "你的私密内容留在 Mac 上。"
                : localeName === "ja"
                  ? "プライベートな言葉は Mac に残ります。"
                  : "내 비공개 말은 Mac에 남습니다.",
      body:
        localeName === "it"
          ? "Dictivo parte in locale perché la dettatura dovrebbe essere privata per impostazione predefinita. Cloud Fast è esplicito perché cambia dove viene elaborato l'audio."
          : localeName === "nl"
            ? "Dictivo begint lokaal omdat dicteren standaard privé moet aanvoelen. Cloud Fast is duidelijk zichtbaar omdat audio dan elders wordt verwerkt."
            : localeName === "pt"
              ? "Dictivo começa local porque ditado deve parecer privado por padrão. Cloud Fast fica visível porque muda onde o áudio é processado."
              : localeName === "zh"
                ? "Dictivo 默认从本地模式开始，因为大多数听写都应该默认私密。Cloud Fast 会被明确展示，因为它会改变音频处理位置。"
                : localeName === "ja"
                  ? "Dictivo は標準でローカル処理から始まります。Cloud Fast は音声の処理場所が変わるため、明確に表示されます。"
                  : "Dictivo는 기본적으로 로컬에서 시작합니다. Cloud Fast는 오디오 처리 위치가 바뀌기 때문에 명확히 표시됩니다.",
    },
    cloud: {
      ...base.cloud,
      kicker: "Cloud Fast",
      title:
        localeName === "it"
          ? "Trascrizione rapida senza rendere il cloud predefinito."
          : localeName === "nl"
            ? "Snelle transcriptie zonder cloud als standaard."
            : localeName === "pt"
              ? "Transcrição rápida sem tornar a nuvem o padrão."
              : localeName === "zh"
                ? "快速转录，但不把云端设为默认。"
                : localeName === "ja"
                  ? "クラウドを標準にせず、高速に文字起こし。"
                  : "클라우드를 기본으로 만들지 않고 빠르게 전사합니다.",
      body:
        localeName === "it"
          ? "Usa Local quando le parole sono private. Usa Cloud Fast per lavoro poco sensibile quando l'attesa interrompe il flusso."
          : localeName === "nl"
            ? "Gebruik Local wanneer woorden privé zijn. Gebruik Cloud Fast voor minder gevoelige opnames wanneer wachten je flow breekt."
            : localeName === "pt"
              ? "Use Local quando as palavras são privadas. Use Cloud Fast para trabalhos pouco sensíveis quando esperar atrapalha o fluxo."
              : localeName === "zh"
                ? "内容私密时使用本地模式。录音敏感度较低且速度重要时，再使用 Cloud Fast。"
                : localeName === "ja"
                  ? "内容がプライベートな時は Local を使い、待ち時間を避けたい低機密の録音では Cloud Fast を使います。"
                  : "내용이 비공개라면 Local을 사용하고, 민감도가 낮고 속도가 중요할 때만 Cloud Fast를 사용합니다.",
    },
    pricing: {
      ...base.pricing,
      title:
        localeName === "it"
          ? "Inizia gratis. Aggiorna solo quando i limiti contano."
          : localeName === "nl"
            ? "Begin gratis. Upgrade pas wanneer limieten ertoe doen."
            : localeName === "pt"
              ? "Comece grátis. Faça upgrade só quando os limites importarem."
              : localeName === "zh"
                ? "先免费开始。只有限制影响使用时再升级。"
                : localeName === "ja"
                  ? "無料で始めて、必要になった時だけアップグレード。"
                  : "무료로 시작하고, 제한이 중요해질 때만 업그레이드하세요.",
      body:
        localeName === "it"
          ? "Prova Dictivo con il modello locale piccolo. Acquista Local per una dettatura privata più potente o aggiungi Cloud Fast quando la velocità vale l'upload."
          : localeName === "nl"
            ? "Probeer Dictivo met het kleine lokale model. Koop Local voor sterkere privé-dictatie of voeg Cloud Fast toe wanneer snelheid de upload waard is."
            : localeName === "pt"
              ? "Teste Dictivo com o modelo local pequeno. Compre Local para ditado privado mais forte ou adicione Cloud Fast quando a velocidade valer o envio."
              : localeName === "zh"
                ? "先用小型本地模型试用 Dictivo。需要更强的私密本地听写时购买 Local，需要速度且可以上传时再添加 Cloud Fast。"
                : localeName === "ja"
                  ? "小さなローカルモデルで Dictivo を試せます。より強力なローカル音声入力には Local、速度が必要な時は Cloud Fast を追加します。"
                  : "작은 로컬 모델로 Dictivo를 먼저 사용해 보세요. 더 강력한 비공개 받아쓰기가 필요하면 Local을, 속도가 필요하면 Cloud Fast를 추가하세요.",
      footnote:
        localeName === "it"
          ? "Mac è disponibile ora. Windows arriverà più avanti."
          : localeName === "nl"
            ? "Mac is nu beschikbaar. Windows komt later."
            : localeName === "pt"
              ? "Mac está disponível agora. Windows virá depois."
              : localeName === "zh"
                ? "Mac 版现已可用。Windows 版本稍后推出。"
                : localeName === "ja"
                  ? "Mac 版は現在利用できます。Windows 版は今後提供予定です。"
                  : "Mac 버전은 지금 사용할 수 있습니다. Windows 버전은 나중에 제공됩니다.",
    },
    downloads: {
      ...base.downloads,
      kicker:
        localeName === "zh" ? "Mac 应用" : localeName === "ja" ? "Mac アプリ" : localeName === "ko" ? "Mac 앱" : base.downloads.kicker,
      title:
        localeName === "it"
          ? "Scarica Dictivo per Mac."
          : localeName === "nl"
            ? "Download Dictivo voor Mac."
            : localeName === "pt"
              ? "Baixe Dictivo para Mac."
              : localeName === "zh"
                ? "下载 Dictivo Mac 版。"
                : localeName === "ja"
                  ? "Dictivo Mac 版をダウンロード。"
                  : "Mac용 Dictivo를 다운로드하세요.",
      body:
        localeName === "it"
          ? "L'app Mac include modalità Local, modello piccolo gratuito, attivazione Local, Cloud Fast opzionale e lingue di visualizzazione."
          : localeName === "nl"
            ? "De Mac-app bevat Local, het gratis kleine model, Local-licentieactivatie, optionele Cloud Fast en weergavetalen."
            : localeName === "pt"
              ? "O app para Mac inclui modo Local, modelo pequeno gratuito, ativação Local, Cloud Fast opcional e idiomas de exibição."
              : localeName === "zh"
                ? "Mac 应用包含本地模式、免费的轻量本地模型、Local 许可证激活、可选 Cloud Fast 和显示语言选项。"
                : localeName === "ja"
                  ? "Mac アプリには Local、無料の小型モデル、Local ライセンス有効化、任意の Cloud Fast、表示言語が含まれます。"
                  : "Mac 앱에는 Local 모드, 무료 소형 로컬 모델, Local 라이선스 활성화, 선택형 Cloud Fast, 표시 언어가 포함됩니다.",
      macButton: overrides.hero.download,
      versionNote: (version) =>
        localeName === "it"
          ? `Versione ${version} - beta pubblica.`
          : localeName === "nl"
            ? `Versie ${version} - publieke beta.`
            : localeName === "pt"
              ? `Versão ${version} - beta público.`
              : localeName === "zh"
                ? `版本 ${version} - 公开测试版。`
                : localeName === "ja"
                  ? `バージョン ${version} - 公開ベータ。`
                  : `버전 ${version} - 공개 베타.`,
    },
    languages: {
      ...base.languages,
      title:
        localeName === "it"
          ? "Lingue di visualizzazione per mercati con alta capacità di spesa."
          : localeName === "nl"
            ? "Weergavetalen voor koopkrachtige markten."
            : localeName === "pt"
              ? "Idiomas de exibição para mercados com maior poder de compra."
              : localeName === "zh"
                ? "面向高价值市场的显示语言选择。"
                : localeName === "ja"
                  ? "購買力の高い市場に向けた表示言語。"
                  : "구매력이 높은 시장을 위한 표시 언어입니다.",
      body:
        localeName === "it"
          ? `Dictivo può mostrare sito e interfaccia in ${westernLanguages}, oltre a ${asianLanguages}. Il rilevamento della lingua parlata resta automatico.`
          : localeName === "nl"
            ? `Dictivo kan de site en interface tonen in ${westernLanguages}, plus ${asianLanguages}. Spraaktaaldetectie blijft automatisch.`
            : localeName === "pt"
              ? `Dictivo pode exibir o site e a interface em ${westernLanguages}, além de ${asianLanguages}. A detecção do idioma falado continua automática.`
              : localeName === "zh"
                ? `Dictivo 可以用 ${westernLanguages}，以及 ${asianLanguages} 显示网站和产品界面。听写语言检测仍然自动完成。`
                : localeName === "ja"
                  ? `Dictivo は ${westernLanguages} に加え、${asianLanguages} でサイトと製品 UI を表示できます。音声入力の言語検出は自動のままです。`
                  : `Dictivo는 ${westernLanguages} 및 ${asianLanguages}로 사이트와 제품 UI를 표시할 수 있습니다. 받아쓰기 언어 감지는 계속 자동입니다.`,
      note:
        localeName === "it"
          ? "La lingua di visualizzazione cambia l'interfaccia. La lingua dettata viene rilevata automaticamente."
          : localeName === "nl"
            ? "De weergavetaal wijzigt de interface. De dicteertaal blijft automatisch gedetecteerd."
            : localeName === "pt"
              ? "O idioma de exibição muda a interface. O idioma do ditado continua com detecção automática."
              : localeName === "zh"
                ? "显示语言只改变界面。听写语言仍然自动检测。"
                : localeName === "ja"
                  ? "表示言語はインターフェースだけを変更します。音声入力の言語は自動検出されます。"
                  : "표시 언어는 인터페이스만 바꿉니다. 받아쓰기 언어는 계속 자동 감지됩니다.",
    },
    workflow: {
      ...base.workflow,
      title:
        localeName === "it"
          ? "Il flusso è volutamente semplice."
          : localeName === "nl"
            ? "De workflow is bewust eenvoudig."
            : localeName === "pt"
              ? "O fluxo é intencionalmente simples."
              : localeName === "zh"
                ? "工作流刻意保持简单。"
                : localeName === "ja"
                  ? "ワークフローは意図的にシンプルです。"
                  : "워크플로는 의도적으로 단순합니다.",
    },
    faq: {
      ...base.faq,
      title:
        localeName === "it"
          ? "Domande prima del download."
          : localeName === "nl"
            ? "Vragen voordat je downloadt."
            : localeName === "pt"
              ? "Perguntas antes de baixar."
              : localeName === "zh"
                ? "下载前的常见问题。"
                : localeName === "ja"
                  ? "ダウンロード前のよくある質問。"
                  : "다운로드 전 자주 묻는 질문.",
    },
    footer: {
      tagline:
        localeName === "it"
          ? "Prima la dettatura privata - Cloud Fast opzionale"
          : localeName === "nl"
            ? "Eerst privé dicteren - optionele Cloud Fast"
            : localeName === "pt"
              ? "Ditado privado primeiro - Cloud Fast opcional"
              : localeName === "zh"
                ? "先保证私密听写 - Cloud Fast 可选"
                : localeName === "ja"
                  ? "まずプライベート音声入力 - Cloud Fast は任意"
                  : "먼저 비공개 받아쓰기 - Cloud Fast는 선택 사항",
      beta:
        localeName === "it"
          ? "Beta pubblica Mac - 2026"
          : localeName === "nl"
            ? "Publieke beta voor Mac - 2026"
            : localeName === "pt"
              ? "Beta público para Mac - 2026"
              : localeName === "zh"
                ? "Mac 公开测试版 - 2026"
                : localeName === "ja"
                  ? "Mac 公開ベータ - 2026"
                  : "Mac 공개 베타 - 2026",
    },
  };
}

function mergeCopy(base, extra) {
  const merged = { ...base };
  for (const [key, value] of Object.entries(extra)) {
    if (value && typeof value === "object" && !Array.isArray(value) && typeof value !== "function") {
      merged[key] = mergeCopy(base[key] || {}, value);
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

const details = {
  it: {
    privacy: {
      localTitle: "Modalità Local",
      localLead: "Il percorso quotidiano per lavoro privato, note sensibili, conversazioni con clienti e bozze personali.",
      localItems: [
        "L'audio del microfono resta su questo dispositivo",
        "Trascrizioni, cronologia, dizionario e frammenti restano locali",
        "Funziona senza un account di trascrizione cloud",
        "Il piano gratuito include il piccolo modello locale",
        "I modelli locali più grandi sono disponibili con l'upgrade",
      ],
      cloudTitle: "Modalità Cloud Fast",
      cloudLead: "Un percorso separato e rapido per registrazioni poco sensibili quando l'attesa interrompe il lavoro.",
      cloudItems: [
        "Si attiva solo quando selezioni Cloud Fast",
        "Carica la registrazione scelta per trascriverla più velocemente",
        "Pensato per registrazioni poco sensibili",
        "Local resta disponibile quando la privacy conta di più",
        "Usa Local ogni volta che l'audio è sensibile.",
      ],
      footnote: "Leggi il confine completo della privacy nella pagina sicurezza.",
    },
    cloud: {
      localTop: ["Local", "Predefinito"],
      localTitle: "Privato per impostazione predefinita.",
      localItems: [
        "L'audio resta sul tuo computer",
        "Trascrizioni, cronologia, dizionario e frammenti restano locali",
        "Ideale per clienti, note, riunioni e bozze sensibili",
      ],
      cloudTop: ["Cloud Fast", "Opzionale"],
      cloudTitle: "Velocità quando la scegli.",
      cloudItems: [
        "Carica solo le registrazioni che invii con Cloud Fast",
        "Ideale quando il tempo conta più dell'elaborazione solo locale",
        "Per lavori poco sensibili in cui la velocità conta",
      ],
      cloudButton: "Aggiungi Cloud Fast",
    },
    pricing: {
      tiers: [
        {
          name: "Free Local",
          sub: "Prova il flusso privato sul tuo Mac.",
          price: "Gratis",
          small: "livello locale",
          features: [
            "Dettatura locale sul tuo dispositivo",
            "Piccolo modello on-device incluso",
            "Scorciatoia globale e cronologia locale",
            "I modelli locali più grandi richiedono Dictivo Local",
            "Nessun upload cloud in modalità Local",
          ],
          button: "Scarica per Mac",
        },
        {
          name: "Dictivo Local",
          sub: "Sblocca modelli locali più grandi e 12 mesi di aggiornamenti.",
          price: "$49",
          small: "una tantum",
          features: [
            "Licenza perpetua per la versione acquistata",
            "12 mesi di aggiornamenti e nuovi modelli locali",
            "Utilizzo su massimo 5 dispositivi personali",
            "Rinnovo opzionale da $24/anno per aggiornamenti futuri",
            "Rimborso entro 14 giorni, senza domande",
          ],
          button: "Acquista Local",
        },
        {
          name: "Cloud Fast",
          sub: "Aggiungi trascrizione cloud rapida per registrazioni selezionate.",
          price: "$6.99",
          small: "al mese",
          features: [
            "1.500 minuti di trascrizione al mese",
            "Da solo o insieme a Dictivo Local",
            "Un semplice interruttore Cloud Fast nell'app",
            "Carica solo le registrazioni che scegli",
            "Dizionario locale e frammenti si applicano dopo il ritorno del testo",
          ],
          button: "Aggiungi Cloud Fast",
        },
      ],
      checkoutTitle: "Il checkout Local si apre in Lemon Squeezy.",
      checkoutBody: "Dictivo Local è venduto tramite Lemon Squeezy. Se il checkout non si apre, scrivi a support@dictivo.app.",
    },
    downloads: {
      available: "Installer disponibili",
      macTop: ["macOS", "Consigliato"],
      macTitle: "Installer Mac",
      macBody: "Per Mac Apple Silicon e Intel. Firmato e notarizzato così macOS può verificare l'app prima dell'apertura.",
      windowsTop: ["Windows", "Più avanti"],
      windowsTitle: "Versione Windows",
      windowsBody: "Dictivo per Windows è previsto, ma il lancio pubblico parte da Mac.",
      windowsStatus: "In arrivo",
      windowsNote: "Inizia oggi su Mac; Windows seguirà dopo i test di rilascio.",
    },
    signed: {
      cells: [["Versione attuale", "Versione {version}"], ["Installer", "DMG universale macOS"], ["Manifest", "downloads.json leggibile da macchine"]],
      footnote: "I metadati di download sono pubblicati su /downloads.json e sincronizzati dall'ultimo GitHub Release.",
    },
    workflow: {
      body: "Dictivo è progettato per trasformare rapidamente le parole in testo nell'app in cui stai lavorando.",
      steps: [["01", "Scarica per Mac", "Inizia con il modello locale gratuito. In modalità Local non serve un account cloud."], ["02", "Premi la scorciatoia", "Parla da qualsiasi app, ferma la registrazione e riporta la trascrizione nel flusso."], ["03", "Cambia solo quando serve", "Resta in Local per il privato. Usa Cloud Fast quando la registrazione è poco sensibile e serve velocità."]],
    },
    faq: {
      body: "Risposte brevi su privacy, prezzi, Cloud Fast, lingue e disponibilità.",
      items: [["La mia voce lascia il Mac?", "In modalità Local, no. Audio e trascrizioni restano sul dispositivo. In Cloud Fast, la registrazione scelta viene caricata per trascrivere più velocemente."], ["Cosa è incluso gratis?", "Il piano gratuito include Local con il piccolo modello on-device, scorciatoia globale e cronologia locale."], ["Quando dovrei comprare Dictivo Local?", "Compra Local se vuoi modelli on-device più potenti, 12 mesi di aggiornamenti e dettatura privata senza dipendere dal cloud."], ["Che cos'è Cloud Fast?", "Cloud Fast è la modalità veloce opzionale. Carica registrazioni selezionate per una trascrizione più rapida."], ["Devo scegliere manualmente la lingua di dettatura?", "No. La lingua di dettatura viene rilevata automaticamente. Il menu lingua cambia solo sito e interfaccia."], ["Windows è disponibile?", "Non ancora. Dictivo è disponibile per Mac ora; Windows arriverà più avanti."]],
    },
  },
  nl: {
    privacy: {
      localTitle: "Local-modus",
      localLead: "De dagelijkse route voor privéwerk, gevoelige notities, klantgesprekken en persoonlijke concepten.",
      localItems: ["Microfoonaudio blijft op dit apparaat", "Transcripties, geschiedenis, woordenboek en snippets blijven lokaal", "Werkt zonder cloud-transcriptieaccount", "De gratis laag bevat het kleine lokale model", "Grotere lokale modellen zijn beschikbaar na upgrade"],
      cloudTitle: "Cloud Fast-modus",
      cloudLead: "Een apart snelheidspad voor minder gevoelige opnames wanneer wachten je werk onderbreekt.",
      cloudItems: ["Werkt alleen wanneer je Cloud Fast kiest", "Uploadt de gekozen opname voor snellere transcriptie", "Ontworpen voor minder gevoelige opnames", "Local blijft beschikbaar wanneer privacy belangrijker is", "Gebruik Local wanneer audio gevoelig is."],
      footnote: "Lees de volledige privacygrens op de beveiligingspagina.",
    },
    cloud: {
      localTop: ["Local", "Standaard"],
      localTitle: "Privé als standaard.",
      localItems: ["Audio blijft op je computer", "Transcripties, geschiedenis, woordenboek en snippets blijven lokaal", "Ideaal voor klantwerk, notities, vergaderingen en gevoelige concepten"],
      cloudTop: ["Cloud Fast", "Optioneel"],
      cloudTitle: "Snelheid wanneer je kiest.",
      cloudItems: ["Uploadt alleen opnames die je via Cloud Fast verstuurt", "Ideaal wanneer doorlooptijd belangrijker is dan alleen lokale verwerking", "Voor minder gevoelig werk waarbij snelheid telt"],
      cloudButton: "Cloud Fast toevoegen",
    },
    pricing: {
      tiers: [
        { name: "Free Local", sub: "Probeer de privacygerichte workflow op je Mac.", price: "Gratis", small: "lokale laag", features: ["Lokaal dicteren op je apparaat", "Klein on-device model inbegrepen", "Globale sneltoets en lokale geschiedenis", "Grotere lokale modellen vereisen Dictivo Local", "Geen cloud-upload in Local-modus"], button: "Download voor Mac" },
        { name: "Dictivo Local", sub: "Ontgrendel grotere lokale modellen en 12 maanden updates.", price: "$49", small: "eenmalig", features: ["Permanente licentie voor de gekochte versie", "12 maanden updates en nieuwe lokale modellen", "Gebruik op maximaal 5 persoonlijke apparaten", "Optionele verlenging van $24/jaar voor toekomstige updates", "14 dagen terugbetaling, zonder vragen"], button: "Local kopen" },
        { name: "Cloud Fast", sub: "Voeg snelle cloud-transcriptie toe voor gekozen opnames.", price: "$6.99", small: "per maand", features: ["1.500 transcriptieminuten per maand", "Los of naast Dictivo Local", "Een eenvoudige Cloud Fast-schakelaar in de app", "Uploadt alleen opnames die je kiest", "Lokaal woordenboek en snippets worden toegepast nadat tekst terugkomt"], button: "Cloud Fast toevoegen" },
      ],
      checkoutTitle: "Local checkout opent in Lemon Squeezy.",
      checkoutBody: "Dictivo Local wordt verkocht via Lemon Squeezy. Als checkout niet opent, mail support@dictivo.app.",
    },
    downloads: {
      available: "Beschikbare installers",
      macTop: ["macOS", "Aanbevolen"],
      macTitle: "Mac-installer",
      macBody: "Voor Apple Silicon en Intel Macs. Ondertekend en genotariseerd zodat macOS de app kan controleren voor openen.",
      windowsTop: ["Windows", "Later"],
      windowsTitle: "Windows-versie",
      windowsBody: "Dictivo voor Windows staat gepland, maar de publieke lancering begint met Mac.",
      windowsStatus: "Komt later",
      windowsNote: "Begin vandaag op Mac; Windows volgt na release-tests.",
    },
    signed: {
      cells: [["Huidige versie", "Versie {version}"], ["Installer", "macOS Universal DMG"], ["Manifest", "Machineleesbare downloads.json"]],
      footnote: "Downloadmetadata staat op /downloads.json en wordt gesynchroniseerd vanuit de nieuwste GitHub Release.",
    },
    workflow: {
      body: "Dictivo is gemaakt voor het moment waarop je woorden snel in de app voor je nodig hebt.",
      steps: [["01", "Download voor Mac", "Begin met het gratis lokale model. Voor Local is geen cloud-account nodig."], ["02", "Druk op de sneltoets", "Spreek vanuit elke app, stop de opname en krijg de transcriptie terug in je workflow."], ["03", "Schakel alleen wanneer nodig", "Blijf Local gebruiken voor privéwerk. Gebruik Cloud Fast wanneer de opname minder gevoelig is en snelheid telt."]],
    },
    faq: {
      body: "Korte antwoorden over privacy, prijzen, Cloud Fast, talen en beschikbaarheid.",
      items: [["Verlaat mijn stem mijn Mac?", "In Local-modus niet. Audio en transcripties blijven op je apparaat. In Cloud Fast wordt de gekozen opname geüpload voor snellere transcriptie."], ["Wat is gratis inbegrepen?", "De gratis laag bevat Local met het kleine on-device model, globale sneltoets en lokale geschiedenis."], ["Wanneer koop ik Dictivo Local?", "Koop Local als je sterkere on-device modellen, 12 maanden updates en privé dicteren zonder cloudafhankelijkheid wilt."], ["Wat is Cloud Fast?", "Cloud Fast is de optionele snelheidsmodus. Hij uploadt gekozen opnames voor snellere transcriptie."], ["Kies ik de dicteertaal handmatig?", "Nee. De dicteertaal wordt automatisch gedetecteerd. Het taalmenu verandert alleen site en interface."], ["Is Windows beschikbaar?", "Nog niet. Dictivo is nu beschikbaar voor Mac, Windows komt later."]],
    },
  },
  pt: {
    privacy: {
      localTitle: "Modo Local",
      localLead: "O caminho diário para trabalho privado, notas sensíveis, conversas com clientes e rascunhos pessoais.",
      localItems: ["O áudio do microfone fica neste dispositivo", "Transcrições, histórico, dicionário e snippets ficam locais", "Funciona sem conta de transcrição em nuvem", "O plano grátis inclui o modelo local pequeno", "Modelos locais maiores ficam disponíveis no upgrade"],
      cloudTitle: "Modo Cloud Fast",
      cloudLead: "Um caminho separado de velocidade para gravações pouco sensíveis quando esperar atrapalha o fluxo.",
      cloudItems: ["Só funciona quando você seleciona Cloud Fast", "Envia a gravação escolhida para transcrição mais rápida", "Projetado para gravações pouco sensíveis", "Local continua disponível quando privacidade importa mais", "Use Local sempre que o áudio for sensível."],
      footnote: "Leia o limite completo de privacidade na página de segurança.",
    },
    cloud: {
      localTop: ["Local", "Padrão"],
      localTitle: "Privado por padrão.",
      localItems: ["O áudio permanece no seu computador", "Transcrições, histórico, dicionário e snippets ficam locais", "Ideal para clientes, notas, reuniões e rascunhos sensíveis"],
      cloudTop: ["Cloud Fast", "Opcional"],
      cloudTitle: "Velocidade quando você escolhe.",
      cloudItems: ["Envia apenas gravações que você manda pelo Cloud Fast", "Ideal quando tempo importa mais que processamento apenas local", "Para trabalho pouco sensível quando velocidade importa"],
      cloudButton: "Adicionar Cloud Fast",
    },
    pricing: {
      tiers: [
        { name: "Free Local", sub: "Teste o fluxo privado no seu Mac.", price: "Grátis", small: "plano local", features: ["Ditado local no seu dispositivo", "Modelo pequeno no dispositivo incluído", "Atalho global e histórico local", "Modelos locais maiores exigem Dictivo Local", "Sem envio para nuvem no modo Local"], button: "Baixar para Mac" },
        { name: "Dictivo Local", sub: "Desbloqueie modelos locais maiores e 12 meses de atualizações.", price: "$49", small: "pagamento único", features: ["Licença perpétua para a versão comprada", "12 meses de atualizações e novos modelos locais", "Use em até 5 dispositivos pessoais", "Renovação opcional de $24/ano para futuras atualizações", "Reembolso de 14 dias, sem perguntas"], button: "Comprar Local" },
        { name: "Cloud Fast", sub: "Adicione transcrição em nuvem rápida para gravações escolhidas.", price: "$6.99", small: "por mês", features: ["1.500 minutos de transcrição por mês", "Separado ou junto com Dictivo Local", "Um interruptor Cloud Fast simples no app", "Envia apenas gravações escolhidas", "Dicionário local e snippets ainda se aplicam quando o texto retorna"], button: "Adicionar Cloud Fast" },
      ],
      checkoutTitle: "O checkout Local abre no Lemon Squeezy.",
      checkoutBody: "Dictivo Local é vendido via Lemon Squeezy. Se o checkout não abrir, escreva para support@dictivo.app.",
    },
    downloads: {
      available: "Instaladores disponíveis",
      macTop: ["macOS", "Recomendado"],
      macTitle: "Instalador para Mac",
      macBody: "Para Macs Apple Silicon e Intel. Assinado e notarizado para que o macOS verifique o app antes de abrir.",
      windowsTop: ["Windows", "Depois"],
      windowsTitle: "Versão Windows",
      windowsBody: "Dictivo para Windows está planejado, mas o lançamento público começa pelo Mac.",
      windowsStatus: "Vem depois",
      windowsNote: "Comece hoje no Mac; Windows virá depois dos testes de lançamento.",
    },
    signed: {
      cells: [["Versão atual", "Versão {version}"], ["Instalador", "DMG universal macOS"], ["Manifesto", "downloads.json legível por máquina"]],
      footnote: "Metadados de download são publicados em /downloads.json e sincronizados do GitHub Release mais recente.",
    },
    workflow: {
      body: "Dictivo foi feito para quando você precisa transformar fala em texto dentro do app em que está trabalhando.",
      steps: [["01", "Baixar para Mac", "Comece com o modelo local gratuito. O modo Local não exige conta em nuvem."], ["02", "Pressione o atalho", "Fale em qualquer app, pare a gravação e receba a transcrição no seu fluxo."], ["03", "Troque só quando precisar", "Fique em Local para trabalho privado. Use Cloud Fast quando a gravação for pouco sensível e velocidade importar."]],
    },
    faq: {
      body: "Respostas rápidas sobre privacidade, preços, Cloud Fast, idiomas e disponibilidade.",
      items: [["Minha voz sai do Mac?", "No modo Local, não. Áudio e transcrições ficam no dispositivo. No Cloud Fast, a gravação escolhida é enviada para transcrição mais rápida."], ["O que está incluído grátis?", "O plano grátis inclui modo Local com o modelo pequeno no dispositivo, atalho global e histórico local."], ["Quando devo comprar Dictivo Local?", "Compre Local se quiser modelos no dispositivo mais fortes, 12 meses de atualizações e ditado privado sem depender da nuvem."], ["O que é Cloud Fast?", "Cloud Fast é o modo rápido opcional. Ele envia gravações escolhidas para transcrição mais rápida."], ["Eu escolho manualmente o idioma do ditado?", "Não. O idioma do ditado é detectado automaticamente. O menu de idioma muda apenas site e interface."], ["Windows está disponível?", "Ainda não. Dictivo está disponível para Mac agora, e Windows virá depois."]],
    },
  },
};

const asiaDetails = {
  zh: {
    privacy: {
      localTitle: "本地模式",
      localLead: "适合日常私密工作、敏感笔记、客户沟通和个人草稿。",
      localItems: ["麦克风音频留在本设备", "转录文本、历史记录、词典和片段都保存在本地", "不需要云端转录账号", "免费版本包含轻量本地模型", "升级后可使用更大的本地模型"],
      cloudTitle: "Cloud Fast 模式",
      cloudLead: "为低敏感度录音准备的独立加速路径，避免等待打断工作流。",
      cloudItems: ["只有选择 Cloud Fast 时才会运行", "上传所选录音以获得更快转录", "适合低敏感度录音", "隐私更重要时仍可随时使用本地模式", "音频敏感时请使用本地模式。"],
      footnote: "在安全页面查看完整的隐私边界。",
    },
    cloud: {
      localTop: ["本地", "默认"],
      localTitle: "默认保持私密。",
      localItems: ["音频保留在你的电脑上", "转录文本、历史记录、词典和片段都保存在本地", "适合客户工作、笔记、会议和敏感草稿"],
      cloudTop: ["Cloud Fast", "可选"],
      cloudTitle: "需要时再选择速度。",
      cloudItems: ["只上传你通过 Cloud Fast 发送的录音", "适合速度比纯本地处理更重要的场景", "适合低敏感度但需要快速结果的工作"],
      cloudButton: "添加 Cloud Fast",
    },
    pricing: {
      tiers: [
        { name: "Free Local", sub: "在 Mac 上试用隐私优先的流程。", price: "免费", small: "本地档", features: ["在本设备上本地听写", "包含轻量设备端模型", "全局快捷键和本地历史记录", "更大的本地模型需要 Dictivo Local", "本地模式不会上传到云端"], button: "下载 Mac 版" },
        { name: "Dictivo Local", sub: "解锁更大的本地模型和 12 个月更新。", price: "$49", small: "一次性", features: ["购买版本的永久许可证", "12 个月更新和新的本地模型", "最多可在 5 台个人设备使用", "未来更新可选 $24/年续订", "14 天无理由退款"], button: "购买 Local" },
        { name: "Cloud Fast", sub: "为所选录音添加快速云端转录。", price: "$6.99", small: "每月", features: ["每月 1,500 分钟转录", "可单独使用，也可搭配 Dictivo Local", "应用内一个清晰的 Cloud Fast 开关", "只上传你选择的录音", "文本返回后仍会应用本地词典和片段"], button: "添加 Cloud Fast" },
      ],
      checkoutTitle: "Local 购买页面会在 Lemon Squeezy 打开。",
      checkoutBody: "Dictivo Local 通过 Lemon Squeezy 销售。如果购买页面没有打开，请邮件联系 support@dictivo.app。",
    },
    downloads: {
      available: "可用安装包",
      macTop: ["macOS", "推荐"],
      macTitle: "Mac 安装包",
      macBody: "适用于 Apple Silicon 和 Intel Mac。已签名并通过 notarization，macOS 可在打开前验证应用。",
      windowsTop: ["Windows", "稍后"],
      windowsTitle: "Windows 版本",
      windowsBody: "Dictivo 计划支持 Windows，但公开发布先从 Mac 开始。",
      windowsStatus: "稍后推出",
      windowsNote: "现在可先在 Mac 上使用；Windows 将在发布测试后推出。",
    },
    signed: {
      cells: [["当前版本", "版本 {version}"], ["安装包", "macOS 通用 DMG"], ["清单", "机器可读 downloads.json"]],
      footnote: "下载元数据发布在 /downloads.json，并从最新 GitHub Release 自动同步。",
    },
    workflow: {
      body: "Dictivo 适合在你需要把脑中的话快速放进当前应用的那一刻使用。",
      steps: [["01", "下载 Mac 版", "先使用免费的本地模型。本地模式不需要云端转录账号。"], ["02", "按下快捷键", "在任何应用中说话，停止录音，然后把转录结果带回你的工作流。"], ["03", "只在需要时切换", "私密工作使用本地模式。录音敏感度低且速度重要时使用 Cloud Fast。"]],
    },
    faq: {
      body: "关于隐私、价格、Cloud Fast、语言和可用性的简短回答。",
      items: [["我的声音会离开 Mac 吗？", "本地模式不会。音频和转录文本都留在设备上。Cloud Fast 模式会上传你选择的录音以获得更快转录。"], ["免费版本包含什么？", "免费版本包含本地模式、轻量设备端模型、全局快捷键和本地历史记录。"], ["什么时候应该购买 Dictivo Local？", "如果你需要更强的本地模型、12 个月更新以及不依赖云端的私密听写，就适合购买 Local。"], ["什么是 Cloud Fast？", "Cloud Fast 是可选的加速模式，会上传所选录音以获得更快转录。"], ["需要手动选择听写语言吗？", "不需要。听写语言会自动检测。语言菜单只改变网站和界面显示语言。"], ["Windows 可用吗？", "还没有。Dictivo 目前支持 Mac，Windows 稍后推出。"]],
    },
  },
  ja: {
    privacy: {
      localTitle: "Local モード",
      localLead: "プライベートな作業、機密性のあるメモ、顧客との会話、個人の下書きに向いた日常のルートです。",
      localItems: ["マイク音声はこのデバイスに残ります", "文字起こし、履歴、辞書、スニペットはローカルに保存されます", "クラウド文字起こしアカウントなしで動作します", "無料版には小型ローカルモデルが含まれます", "アップグレードするとより大きなローカルモデルを利用できます"],
      cloudTitle: "Cloud Fast モード",
      cloudLead: "待ち時間で作業が止まる低機密の録音向けに分けられた高速ルートです。",
      cloudItems: ["Cloud Fast を選んだ時だけ実行されます", "選択した録音をアップロードして高速に文字起こしします", "低機密の録音向けに設計されています", "プライバシーが重要な時はいつでも Local に戻れます", "音声が機密なら Local を使ってください。"],
      footnote: "プライバシー境界の詳細はセキュリティページで確認できます。",
    },
    cloud: {
      localTop: ["Local", "標準"],
      localTitle: "標準でプライベート。",
      localItems: ["音声はコンピュータ上に残ります", "文字起こし、履歴、辞書、スニペットはローカルに保存されます", "顧客対応、メモ、会議、機密性のある下書きに最適です"],
      cloudTop: ["Cloud Fast", "任意"],
      cloudTitle: "必要な時だけ高速化。",
      cloudItems: ["Cloud Fast で送信した録音だけをアップロードします", "純粋なローカル処理より速度が重要な時に適しています", "低機密で速い結果が必要な作業向けです"],
      cloudButton: "Cloud Fast を追加",
    },
    pricing: {
      tiers: [
        { name: "Free Local", sub: "Mac でプライバシー重視の流れを試せます。", price: "無料", small: "ローカル枠", features: ["デバイス上でのローカル音声入力", "小型オンデバイスモデルを含む", "グローバルショートカットとローカル履歴", "より大きなローカルモデルには Dictivo Local が必要", "Local モードではクラウドアップロードなし"], button: "Mac 版をダウンロード" },
        { name: "Dictivo Local", sub: "より大きなローカルモデルと 12 か月のアップデートを利用できます。", price: "$49", small: "買い切り", features: ["購入したバージョンの永続ライセンス", "12 か月のアップデートと新しいローカルモデル", "個人用デバイス最大 5 台で利用可能", "将来の更新は任意で $24/年", "14 日間返金、理由は不要"], button: "Local を購入" },
        { name: "Cloud Fast", sub: "選択した録音に高速クラウド文字起こしを追加します。", price: "$6.99", small: "月額", features: ["月 1,500 分の文字起こし", "単体でも Dictivo Local と併用でも利用可能", "アプリ内のシンプルな Cloud Fast スイッチ", "選択した録音だけをアップロード", "テキストが戻った後もローカル辞書とスニペットを適用"], button: "Cloud Fast を追加" },
      ],
      checkoutTitle: "Local の購入は Lemon Squeezy で開きます。",
      checkoutBody: "Dictivo Local は Lemon Squeezy 経由で販売されます。購入ページが開かない場合は support@dictivo.app へご連絡ください。",
    },
    downloads: {
      available: "利用可能なインストーラ",
      macTop: ["macOS", "推奨"],
      macTitle: "Mac インストーラ",
      macBody: "Apple Silicon と Intel Mac に対応。署名と notarization 済みで、macOS が起動前にアプリを検証できます。",
      windowsTop: ["Windows", "後日"],
      windowsTitle: "Windows 版",
      windowsBody: "Dictivo for Windows は予定されていますが、公開リリースは Mac から始まります。",
      windowsStatus: "後日提供",
      windowsNote: "まずは Mac で開始できます。Windows はリリーステスト後に提供予定です。",
    },
    signed: {
      cells: [["現在のバージョン", "バージョン {version}"], ["インストーラ", "macOS Universal DMG"], ["マニフェスト", "機械可読 downloads.json"]],
      footnote: "ダウンロードメタデータは /downloads.json に公開され、最新の GitHub Release から同期されます。",
    },
    workflow: {
      body: "Dictivo は、頭の中の言葉を今使っているアプリへすぐ入れたい瞬間のために設計されています。",
      steps: [["01", "Mac 版をダウンロード", "無料のローカルモデルから始められます。Local モードにはクラウドアカウントは不要です。"], ["02", "ショートカットを押す", "どのアプリからでも話し、録音を止め、文字起こしを作業へ戻せます。"], ["03", "必要な時だけ切り替える", "プライベートな作業は Local。低機密で速度が必要な時だけ Cloud Fast を使います。"]],
    },
    faq: {
      body: "プライバシー、料金、Cloud Fast、言語、対応状況についての短い回答です。",
      items: [["声は Mac から外へ出ますか？", "Local モードでは出ません。音声と文字起こしはデバイスに残ります。Cloud Fast では選択した録音を高速文字起こしのためにアップロードします。"], ["無料版には何が含まれますか？", "無料版には Local モード、小型オンデバイスモデル、グローバルショートカット、ローカル履歴が含まれます。"], ["いつ Dictivo Local を買うべきですか？", "より強力なオンデバイスモデル、12 か月の更新、クラウドに依存しないプライベート音声入力が必要なら Local が適しています。"], ["Cloud Fast とは何ですか？", "Cloud Fast は任意の高速モードです。選択した録音をアップロードしてより速く文字起こしします。"], ["音声入力の言語を手動で選びますか？", "いいえ。音声入力の言語は自動検出です。言語メニューはサイトと UI の表示言語だけを変更します。"], ["Windows は利用できますか？", "まだです。Dictivo は現在 Mac で利用でき、Windows 版は後日提供予定です。"]],
    },
  },
  ko: {
    privacy: {
      localTitle: "Local 모드",
      localLead: "개인 작업, 민감한 메모, 고객 대화, 개인 초안에 쓰는 기본 경로입니다.",
      localItems: ["마이크 오디오는 이 기기에 남습니다", "전사문, 기록, 사전, 스니펫은 로컬에 보관됩니다", "클라우드 전사 계정 없이 작동합니다", "무료 버전에는 작은 로컬 모델이 포함됩니다", "업그레이드하면 더 큰 로컬 모델을 사용할 수 있습니다"],
      cloudTitle: "Cloud Fast 모드",
      cloudLead: "기다림이 흐름을 끊는 낮은 민감도의 녹음을 위한 별도 속도 경로입니다.",
      cloudItems: ["Cloud Fast를 선택할 때만 실행됩니다", "선택한 녹음을 업로드해 더 빠르게 전사합니다", "낮은 민감도의 녹음을 위해 설계되었습니다", "개인정보가 더 중요하면 언제든 Local을 사용할 수 있습니다", "오디오가 민감하면 Local을 사용하세요."],
      footnote: "전체 개인정보 경계는 보안 페이지에서 확인하세요.",
    },
    cloud: {
      localTop: ["Local", "기본"],
      localTitle: "기본은 비공개.",
      localItems: ["오디오는 컴퓨터에 남습니다", "전사문, 기록, 사전, 스니펫은 로컬에 보관됩니다", "고객 작업, 메모, 회의, 민감한 초안에 적합합니다"],
      cloudTop: ["Cloud Fast", "선택"],
      cloudTitle: "필요할 때만 빠르게.",
      cloudItems: ["Cloud Fast로 보낸 녹음만 업로드합니다", "순수 로컬 처리보다 속도가 더 중요할 때 적합합니다", "민감도가 낮고 빠른 결과가 필요한 작업에 적합합니다"],
      cloudButton: "Cloud Fast 추가",
    },
    pricing: {
      tiers: [
        { name: "Free Local", sub: "Mac에서 개인정보 우선 흐름을 사용해 보세요.", price: "무료", small: "로컬 플랜", features: ["기기에서 로컬 받아쓰기", "작은 온디바이스 모델 포함", "전역 단축키와 로컬 기록", "더 큰 로컬 모델은 Dictivo Local 필요", "Local 모드에서는 클라우드 업로드 없음"], button: "Mac용 다운로드" },
        { name: "Dictivo Local", sub: "더 큰 로컬 모델과 12개월 업데이트를 잠금 해제합니다.", price: "$49", small: "일회성", features: ["구매한 버전의 영구 라이선스", "12개월 업데이트와 새 로컬 모델", "개인 기기 최대 5대에서 사용", "향후 업데이트는 선택적으로 $24/년 갱신", "14일 환불, 질문 없음"], button: "Local 구매" },
        { name: "Cloud Fast", sub: "선택한 녹음에 빠른 클라우드 전사를 추가합니다.", price: "$6.99", small: "월", features: ["월 1,500분 전사", "단독 또는 Dictivo Local과 함께 사용", "앱 안의 단순한 Cloud Fast 스위치", "선택한 녹음만 업로드", "텍스트가 돌아온 뒤에도 로컬 사전과 스니펫 적용"], button: "Cloud Fast 추가" },
      ],
      checkoutTitle: "Local 결제는 Lemon Squeezy에서 열립니다.",
      checkoutBody: "Dictivo Local은 Lemon Squeezy를 통해 판매됩니다. 결제 페이지가 열리지 않으면 support@dictivo.app으로 연락하세요.",
    },
    downloads: {
      available: "사용 가능한 설치 파일",
      macTop: ["macOS", "추천"],
      macTitle: "Mac 설치 파일",
      macBody: "Apple Silicon 및 Intel Mac용입니다. 서명 및 공증되어 macOS가 앱을 열기 전에 검증할 수 있습니다.",
      windowsTop: ["Windows", "나중에"],
      windowsTitle: "Windows 버전",
      windowsBody: "Windows용 Dictivo는 계획되어 있지만 공개 출시는 Mac부터 시작합니다.",
      windowsStatus: "추후 제공",
      windowsNote: "지금은 Mac에서 시작할 수 있으며 Windows는 릴리스 테스트 후 제공됩니다.",
    },
    signed: {
      cells: [["현재 버전", "버전 {version}"], ["설치 파일", "macOS Universal DMG"], ["매니페스트", "기계 판독 가능한 downloads.json"]],
      footnote: "다운로드 메타데이터는 /downloads.json에 게시되며 최신 GitHub Release에서 동기화됩니다.",
    },
    workflow: {
      body: "Dictivo는 머릿속의 말을 지금 사용하는 앱으로 바로 넣어야 하는 순간을 위해 설계되었습니다.",
      steps: [["01", "Mac용 다운로드", "무료 로컬 모델로 시작하세요. Local 모드에는 클라우드 계정이 필요 없습니다."], ["02", "단축키 누르기", "어떤 앱에서든 말하고 녹음을 멈춘 뒤 전사문을 작업 흐름으로 가져옵니다."], ["03", "필요할 때만 전환", "개인 작업은 Local을 유지하세요. 민감도가 낮고 속도가 중요할 때 Cloud Fast를 사용하세요."]],
    },
    faq: {
      body: "개인정보, 가격, Cloud Fast, 언어, 사용 가능 여부에 대한 짧은 답변입니다.",
      items: [["내 목소리가 Mac 밖으로 나가나요?", "Local 모드에서는 아닙니다. 오디오와 전사문은 기기에 남습니다. Cloud Fast에서는 선택한 녹음이 더 빠른 전사를 위해 업로드됩니다."], ["무료에는 무엇이 포함되나요?", "무료 플랜에는 작은 온디바이스 모델을 쓰는 Local 모드, 전역 단축키, 로컬 기록이 포함됩니다."], ["언제 Dictivo Local을 구매해야 하나요?", "더 강력한 온디바이스 모델, 12개월 업데이트, 클라우드에 의존하지 않는 비공개 받아쓰기가 필요하면 Local이 적합합니다."], ["Cloud Fast란 무엇인가요?", "Cloud Fast는 선택형 속도 모드입니다. 선택한 녹음을 업로드해 더 빠르게 전사합니다."], ["받아쓰기 언어를 수동으로 선택하나요?", "아니요. 받아쓰기 언어는 자동 감지됩니다. 언어 메뉴는 사이트와 UI 표시 언어만 변경합니다."], ["Windows를 사용할 수 있나요?", "아직은 아닙니다. Dictivo는 현재 Mac에서 사용할 수 있고 Windows는 나중에 제공됩니다."]],
    },
  },
};

HOME_COPY.it = mergeCopy(deriveFromEnglish(HOME_COPY.en, italian, "it"), details.it);
HOME_COPY.nl = mergeCopy(deriveFromEnglish(HOME_COPY.en, dutch, "nl"), details.nl);
HOME_COPY.pt = mergeCopy(deriveFromEnglish(HOME_COPY.en, portuguese, "pt"), details.pt);
HOME_COPY.zh = mergeCopy(deriveFromEnglish(HOME_COPY.en, chinese, "zh"), asiaDetails.zh);
HOME_COPY.ja = mergeCopy(deriveFromEnglish(HOME_COPY.en, japanese, "ja"), asiaDetails.ja);
HOME_COPY.ko = mergeCopy(deriveFromEnglish(HOME_COPY.en, korean, "ko"), asiaDetails.ko);
