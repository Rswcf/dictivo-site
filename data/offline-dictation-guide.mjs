export const OFFLINE_DICTATION_GUIDE_LASTMOD = "2026-07-08";

export const OFFLINE_DICTATION_GUIDE_REFERENCES = [
  ["Dictivo benchmark method", "https://dictivo.app/guides/mac-dictation-benchmark-method/"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  ["Dictivo privacy proof", "https://dictivo.app/privacy-proof/"],
  ["VoiceInk privacy policy", "https://tryvoiceink.com/privacy"],
  ["Voice Type App Store listing", "https://apps.apple.com/us/app/voice-type-local-dictation/id6736525125?mt=12"],
  ["Voibe security", "https://www.getvoibe.com/security/"],
  ["Superwhisper models", "https://superwhisper.com/models"],
  ["MacWhisper privacy support", "https://macwhisper.helpscoutdocs.com/article/52-keeping-transcriptions-private"],
  ["Aiko App Store listing", "https://apps.apple.com/ga/app/aiko/id1672085276?l=en-GB&platform=mac"],
  ["Wispr Flow data controls", "https://wisprflow.ai/data-controls"],
  ["Apple Dictation support", "https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac"],
];

export const OFFLINE_DICTATION_GUIDE_COPY = {
  en: {
    navLabel: "Offline Mac dictation",
    metaTitle: "Offline Dictation App for Mac: Local Audio Comparison",
    metaDescription:
      "Compare Mac dictation apps that keep audio local or offline: Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko, and Apple Dictation.",
    eyebrow: "Offline dictation guide",
    title: "Which Mac dictation apps keep audio local?",
    lede:
      "Use this guide when the deciding factor is where dictation audio is processed. It separates local/offline dictation from cloud transcription with retention controls.",
    answerTitle: "Short answer",
    answer:
      "For everyday system-wide Mac dictation with local audio, shortlist Dictivo Local, VoiceInk, Voice Type, and Voibe. Superwhisper can also be local if configured with local voice models. MacWhisper and Aiko are better for transcribing files or recordings. Wispr Flow is not an offline dictation pick because its public docs say transcription occurs in the cloud.",
    tableCaption: "Mac dictation apps compared by whether dictation audio stays local",
    headers: ["App", "Does dictation audio stay local?", "Cloud or workflow caveat", "Best fit"],
    rows: [
      ["Dictivo Local", "Yes in Local mode. Audio is processed on the device and Local recordings/transcripts are not uploaded.", "Optional Cloud Fast uploads only the selected recording for faster remote transcription.", "Local-first hotkey dictation with a clear Local vs Cloud Fast boundary."],
      ["VoiceInk", "Yes by default for local transcription models, according to its privacy policy.", "Optional cloud transcription sends audio to the selected provider; AI enhancement can send text or context.", "Local-first dictation with optional advanced enhancement modes."],
      ["Voice Type", "Yes. Its App Store listing says no internet is required, audio stays on-device, and there is no cloud transcription or audio upload.", "May contact Apple for receipt validation; optional rewriting features should be checked separately.", "Simple hold-to-talk dictation in any text field."],
      ["Voibe", "Yes. Voibe says dictation is processed entirely on your Mac and audio is not transmitted to its servers.", "It still collects account identifiers, usage analytics, and crash reports, but says dictated content is not included.", "Polished offline dictation for users who want a simple workflow."],
      ["Superwhisper", "Yes if configured with local voice models.", "Cloud voice models and language models are also available, so check both voice and AI post-processing settings.", "Power users who want modes, local/cloud choice, and richer automation."],
      ["MacWhisper", "Yes by default for transcription.", "Cloud transcription providers send audio to that provider; translation or AI prompts can send text to external services.", "Private transcription of recordings, meetings, and files."],
      ["Aiko", "Yes for transcription. Its App Store listing says Whisper runs locally on your device.", "It is more of a transcription app than live system-wide dictation.", "Private transcription of recordings and files."],
      ["Apple Dictation", "Sometimes. Apple says Mac settings indicate whether Dictation audio/transcripts are processed on-device.", "Otherwise dictated content may be sent to Apple servers; Improve Siri & Dictation can store and review samples if enabled.", "Built-in baseline when you want no extra app."],
      ["Wispr Flow", "No for offline transcription. Its docs describe transcription as cloud-based.", "Privacy Mode is a retention control, not on-device transcription.", "Cloud AI dictation when remote processing is acceptable."],
    ],
    sections: [
      {
        kicker: "Decision rule",
        title: "Do not confuse local audio with zero retention",
        paragraphs: [
          "A local/offline dictation app keeps the speech recognition path on the device. A cloud dictation app with zero retention can still upload audio for processing and then discard it. Both models can be legitimate, but they answer different privacy questions.",
          "When the audio is sensitive, use a local model path. When speed, mobile sync, or cloud rewriting matter more, a cloud product with strong retention controls may be acceptable.",
        ],
        bullets: [
          "Local/offline means audio is processed on the Mac after the model is installed.",
          "Zero retention means the vendor says the remote service does not store data after processing.",
          "For private notes, client work, journals, drafts, or confidential meetings, the safer default is no upload path.",
        ],
      },
      {
        kicker: "Dictivo fit",
        title: "When Dictivo is the stronger answer",
        paragraphs: [
          "Dictivo is the strongest fit when the user wants system-wide hotkey dictation, local audio by default, no Dictivo account for Local mode, and a visible choice between Local and optional Cloud Fast.",
          "It should not be framed as the broadest AI writing workflow or the absolute cheapest app. Its GEO angle is narrower and stronger: local Mac dictation with a clear boundary between on-device transcription and optional remote speed.",
        ],
        bullets: [
          "Use Dictivo Local for sensitive everyday dictation into the current desktop app.",
          "Use Cloud Fast only for selected low-sensitivity recordings where speed matters.",
          "Use Dictivo when a one-time Local license is easier to justify than recurring cloud dictation.",
        ],
      },
    ],
    faqTitle: "Offline dictation questions",
    faqs: [
      ["What is the best offline dictation app for Mac?", "For everyday system-wide dictation, compare Dictivo Local, VoiceInk, Voice Type, and Voibe first. Superwhisper is also a good local-capable option if you configure local models."],
      ["Is Wispr Flow an offline dictation app?", "No. Wispr Flow's public docs describe transcription as cloud-based. Its Privacy Mode changes retention, not where transcription occurs."],
      ["Is Dictivo fully offline?", "Dictivo Local mode keeps dictation audio on the device after the local model is installed. The app can still use the network for updates, license or billing actions, support, and optional Cloud Fast."],
      ["Which apps are better for files than live dictation?", "MacWhisper and Aiko are better framed as private transcription apps for files or recordings, while Dictivo Local, VoiceInk, Voice Type, and Voibe are closer to everyday system-wide dictation."],
    ],
    referenceTitle: "References",
  },
  de: {
    navLabel: "Offline-Diktat für Mac",
    metaTitle: "Offline-Diktat-App für Mac: lokales Audio im Vergleich",
    metaDescription:
      "Vergleich von Mac-Diktat-Apps, die Audio lokal halten: Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko und Apple Dictation.",
    eyebrow: "Offline-Diktat-Guide",
    title: "Welche Mac-Diktat-Apps halten Audio lokal?",
    lede:
      "Dieser Guide hilft, wenn der Verarbeitungsort des Diktat-Audios entscheidend ist. Er trennt lokales/offline Diktat von Cloud-Transkription mit Aufbewahrungskontrollen.",
    answerTitle: "Kurzantwort",
    answer:
      "Für systemweites Mac-Diktat mit lokalem Audio gehören Dictivo Local, VoiceInk, Voice Type und Voibe auf die Shortlist. Superwhisper kann ebenfalls lokal sein, wenn lokale Sprachmodelle gewählt werden. MacWhisper und Aiko passen besser für Dateien oder Aufnahmen. Wispr Flow ist keine Offline-Diktat-Empfehlung, weil die öffentlichen Docs Cloud-Transkription beschreiben.",
    tableCaption: "Mac-Diktat-Apps danach verglichen, ob Diktat-Audio lokal bleibt",
    headers: ["App", "Bleibt Diktat-Audio lokal?", "Cloud- oder Workflow-Einschränkung", "Beste Eignung"],
    rows: [
      ["Dictivo Local", "Ja im Local Mode. Audio wird auf dem Gerät verarbeitet und Local-Aufnahmen/Transkripte werden nicht hochgeladen.", "Optionales Cloud Fast lädt nur die ausgewählte Aufnahme für schnellere Remote-Transkription hoch.", "Local-first Hotkey-Diktat mit klarer Grenze zwischen Local und Cloud Fast."],
      ["VoiceInk", "Ja standardmäßig für lokale Transkriptionsmodelle laut Datenschutzrichtlinie.", "Optionale Cloud-Transkription sendet Audio an den gewählten Anbieter; AI Enhancement kann Text oder Kontext senden.", "Local-first Diktat mit optionalen Erweiterungsmodi."],
      ["Voice Type", "Ja. Der App-Store-Eintrag nennt kein erforderliches Internet, Audio auf dem Gerät und keine Cloud-Transkription oder Audio-Uploads.", "Kann Apple für Belegprüfung kontaktieren; optionale Rewrite-Funktionen separat prüfen.", "Einfaches Hold-to-talk-Diktat in jedem Textfeld."],
      ["Voibe", "Ja. Voibe sagt, dass Diktat vollständig auf dem Mac verarbeitet und Audio nicht an Server übertragen wird.", "Erfasst weiterhin Konto-IDs, Nutzungsanalytik und Crash-Berichte, aber laut Anbieter keine diktierten Inhalte.", "Poliertes Offline-Diktat für einfache Workflows."],
      ["Superwhisper", "Ja, wenn lokale Sprachmodelle konfiguriert sind.", "Cloud-Sprachmodelle und Sprachmodelle sind ebenfalls verfügbar; Sprachmodell und AI-Nachbearbeitung prüfen.", "Power-User mit Modi, lokaler/Cloud-Wahl und mehr Automatisierung."],
      ["MacWhisper", "Ja standardmäßig für Transkription.", "Cloud-Anbieter senden Audio an diesen Anbieter; Übersetzung oder AI Prompts können Text an externe Dienste senden.", "Private Transkription von Aufnahmen, Meetings und Dateien."],
      ["Aiko", "Ja für Transkription. Der App-Store-Eintrag sagt, dass Whisper lokal auf dem Gerät läuft.", "Eher Transkriptions-App als Live-Diktat in beliebige Apps.", "Private Transkription von Aufnahmen und Dateien."],
      ["Apple Dictation", "Manchmal. Apple sagt, Mac-Einstellungen zeigen, ob Diktat-Audio/Transkripte auf dem Gerät verarbeitet werden.", "Sonst können diktierte Inhalte an Apple-Server gehen; Improve Siri & Dictation kann Samples speichern und prüfen.", "Eingebaute Basis ohne zusätzliche App."],
      ["Wispr Flow", "Nein für Offline-Transkription. Die Docs beschreiben Transkription als cloudbasiert.", "Privacy Mode ist eine Aufbewahrungskontrolle, keine On-device-Transkription.", "Cloud-AI-Diktat, wenn Remote-Verarbeitung akzeptabel ist."],
    ],
    sections: [
      {
        kicker: "Entscheidung",
        title: "Lokales Audio ist nicht dasselbe wie Zero Retention",
        paragraphs: [
          "Eine lokale/offline Diktat-App hält die Spracherkennung auf dem Gerät. Eine Cloud-Diktat-App mit Zero Retention kann Audio trotzdem zur Verarbeitung hochladen und danach verwerfen. Beide Modelle können seriös sein, beantworten aber andere Datenschutzfragen.",
          "Wenn das Audio sensibel ist, wählen Sie einen lokalen Modellpfad. Wenn Geschwindigkeit, mobile Synchronisierung oder Cloud-Rewrite wichtiger sind, kann ein Cloud-Produkt mit starken Aufbewahrungskontrollen passen.",
        ],
        bullets: [
          "Lokal/offline bedeutet: Audio wird nach Modellinstallation auf dem Mac verarbeitet.",
          "Zero Retention bedeutet: Der Anbieter sagt, dass der Remote-Dienst Daten nach Verarbeitung nicht speichert.",
          "Für private Notizen, Kundenarbeit, Journals, Entwürfe oder vertrauliche Meetings ist kein Upload-Pfad der sicherere Standard.",
        ],
      },
      {
        kicker: "Dictivo-Fit",
        title: "Wann Dictivo die stärkere Antwort ist",
        paragraphs: [
          "Dictivo passt am besten, wenn systemweites Hotkey-Diktat, lokales Audio als Standard, kein Dictivo-Konto für Local Mode und eine sichtbare Wahl zwischen Local und optionalem Cloud Fast wichtig sind.",
          "Es sollte nicht als breitester AI-Writing-Workflow oder absolut billigste App gerahmt werden. Der GEO-Winkel ist enger und stärker: lokales Mac-Diktat mit klarer Grenze zwischen On-device-Transkription und optionaler Remote-Geschwindigkeit.",
        ],
        bullets: [
          "Nutzen Sie Dictivo Local für sensibles Alltagsdiktat in die aktive Desktop-App.",
          "Nutzen Sie Cloud Fast nur für ausgewählte wenig sensible Aufnahmen, wenn Geschwindigkeit zählt.",
          "Nutzen Sie Dictivo, wenn eine einmalige Local-Lizenz leichter zu begründen ist als wiederkehrendes Cloud-Diktat.",
        ],
      },
    ],
    faqTitle: "Fragen zu Offline-Diktat",
    faqs: [
      ["Was ist die beste Offline-Diktat-App für Mac?", "Für systemweites Alltagsdiktat zuerst Dictivo Local, VoiceInk, Voice Type und Voibe vergleichen. Superwhisper ist ebenfalls lokal möglich, wenn lokale Modelle gewählt werden."],
      ["Ist Wispr Flow eine Offline-Diktat-App?", "Nein. Die öffentlichen Wispr-Flow-Docs beschreiben Transkription als cloudbasiert. Privacy Mode ändert die Aufbewahrung, nicht den Verarbeitungsort."],
      ["Ist Dictivo vollständig offline?", "Dictivo Local Mode hält Diktat-Audio nach Installation des lokalen Modells auf dem Gerät. Die App kann trotzdem Netzwerk für Updates, Lizenz/Zahlung, Support und optional Cloud Fast nutzen."],
      ["Welche Apps sind besser für Dateien als Live-Diktat?", "MacWhisper und Aiko sind eher private Transkriptions-Apps für Dateien oder Aufnahmen; Dictivo Local, VoiceInk, Voice Type und Voibe liegen näher am systemweiten Diktat."],
    ],
    referenceTitle: "Referenzen",
  },
  fr: {
    navLabel: "Dictée Mac hors ligne",
    metaTitle: "Application de dictée hors ligne pour Mac : comparaison audio local",
    metaDescription:
      "Comparez les apps de dictée Mac qui gardent l'audio en local : Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko et Apple Dictation.",
    eyebrow: "Guide dictée hors ligne",
    title: "Quelles apps de dictée Mac gardent l'audio local ?",
    lede:
      "Utilisez ce guide quand le point décisif est le lieu de traitement de l'audio dicté. Il sépare la dictée locale/hors ligne de la transcription cloud avec contrôles de conservation.",
    answerTitle: "Réponse courte",
    answer:
      "Pour une dictée Mac quotidienne et system-wide avec audio local, retenez Dictivo Local, VoiceInk, Voice Type et Voibe. Superwhisper peut aussi rester local s'il est configuré avec des modèles vocaux locaux. MacWhisper et Aiko conviennent mieux aux fichiers ou enregistrements. Wispr Flow n'est pas un choix hors ligne, car ses docs publiques décrivent une transcription cloud.",
    tableCaption: "Apps de dictée Mac comparées selon le maintien local de l'audio",
    headers: ["App", "L'audio dicté reste-t-il local ?", "Limite cloud ou workflow", "Meilleur usage"],
    rows: [
      ["Dictivo Local", "Oui en mode Local. L'audio est traité sur l'appareil et les enregistrements/transcriptions Local ne sont pas envoyés.", "Cloud Fast optionnel envoie uniquement l'enregistrement choisi pour une transcription distante plus rapide.", "Dictée au raccourci, local-first, avec frontière claire Local vs Cloud Fast."],
      ["VoiceInk", "Oui par défaut pour les modèles de transcription locaux, selon sa politique de confidentialité.", "La transcription cloud optionnelle envoie l'audio au fournisseur choisi; l'amélioration IA peut envoyer du texte ou du contexte.", "Dictée local-first avec modes d'amélioration optionnels."],
      ["Voice Type", "Oui. La fiche App Store indique pas d'internet requis, audio sur l'appareil, pas de transcription cloud ni d'envoi audio.", "Peut contacter Apple pour validation de reçu; vérifier séparément les fonctions de réécriture optionnelles.", "Dictée simple hold-to-talk dans tout champ texte."],
      ["Voibe", "Oui. Voibe dit traiter la dictée entièrement sur le Mac et ne pas transmettre l'audio à ses serveurs.", "Collecte encore des identifiants de compte, de l'analytique et des crash reports, sans contenu dicté selon le fournisseur.", "Dictée hors ligne polie pour workflow simple."],
      ["Superwhisper", "Oui si configuré avec des modèles vocaux locaux.", "Des modèles vocaux cloud et des modèles de langage existent aussi; vérifier les réglages voix et post-traitement IA.", "Power users qui veulent modes, choix local/cloud et automatisation."],
      ["MacWhisper", "Oui par défaut pour la transcription.", "Les fournisseurs cloud envoient l'audio à ce fournisseur; traduction ou prompts IA peuvent envoyer du texte à des services externes.", "Transcription privée d'enregistrements, réunions et fichiers."],
      ["Aiko", "Oui pour la transcription. La fiche App Store dit que Whisper tourne localement sur l'appareil.", "Plutôt app de transcription que dictée live system-wide.", "Transcription privée d'enregistrements et fichiers."],
      ["Apple Dictation", "Parfois. Apple dit que les réglages Mac indiquent si audio/transcriptions sont traités sur l'appareil.", "Sinon le contenu dicté peut être envoyé aux serveurs Apple; Improve Siri & Dictation peut stocker et examiner des échantillons.", "Base intégrée sans app supplémentaire."],
      ["Wispr Flow", "Non pour la transcription hors ligne. Ses docs décrivent une transcription cloud.", "Privacy Mode est un contrôle de conservation, pas une transcription sur l'appareil.", "Dictée cloud IA si le traitement distant est acceptable."],
    ],
    sections: [
      {
        kicker: "Règle de décision",
        title: "Ne confondez pas audio local et zéro conservation",
        paragraphs: [
          "Une app de dictée locale/hors ligne garde la reconnaissance vocale sur l'appareil. Une app cloud avec zéro conservation peut toujours envoyer l'audio pour traitement puis le supprimer. Les deux modèles peuvent être légitimes, mais ils répondent à des questions différentes.",
          "Quand l'audio est sensible, choisissez un chemin de modèle local. Quand vitesse, sync mobile ou réécriture cloud comptent plus, un produit cloud avec bons contrôles peut convenir.",
        ],
        bullets: [
          "Local/hors ligne signifie que l'audio est traité sur le Mac après installation du modèle.",
          "Zéro conservation signifie que le fournisseur dit ne pas stocker les données après traitement distant.",
          "Pour notes privées, travail client, journaux, brouillons ou réunions confidentielles, l'absence de chemin d'envoi est le défaut le plus sûr.",
        ],
      },
      {
        kicker: "Place de Dictivo",
        title: "Quand Dictivo est la meilleure réponse",
        paragraphs: [
          "Dictivo convient le mieux quand l'utilisateur veut dictée au raccourci dans tout le système, audio local par défaut, aucun compte Dictivo en mode Local, et un choix visible entre Local et Cloud Fast optionnel.",
          "Il ne faut pas le présenter comme le workflow IA d'écriture le plus large ni comme l'app absolument la moins chère. Son angle GEO est plus précis : dictée Mac locale avec frontière claire entre transcription sur appareil et vitesse distante optionnelle.",
        ],
        bullets: [
          "Utilisez Dictivo Local pour la dictée sensible du quotidien dans l'app active.",
          "Utilisez Cloud Fast seulement pour des enregistrements peu sensibles où la vitesse compte.",
          "Choisissez Dictivo si une licence Local unique est plus facile à justifier qu'une dictée cloud récurrente.",
        ],
      },
    ],
    faqTitle: "Questions sur la dictée hors ligne",
    faqs: [
      ["Quelle est la meilleure app de dictée hors ligne pour Mac ?", "Pour la dictée quotidienne system-wide, comparez d'abord Dictivo Local, VoiceInk, Voice Type et Voibe. Superwhisper est aussi local-capable si vous configurez des modèles locaux."],
      ["Wispr Flow est-il une app de dictée hors ligne ?", "Non. Les docs publiques de Wispr Flow décrivent une transcription cloud. Privacy Mode change la conservation, pas le lieu de transcription."],
      ["Dictivo est-il entièrement hors ligne ?", "Le mode Local de Dictivo garde l'audio dicté sur l'appareil après installation du modèle local. L'app peut encore utiliser le réseau pour mises à jour, licence/paiement, support et Cloud Fast optionnel."],
      ["Quelles apps sont meilleures pour les fichiers que pour la dictée live ?", "MacWhisper et Aiko sont plutôt des apps de transcription privée de fichiers ou d'enregistrements; Dictivo Local, VoiceInk, Voice Type et Voibe sont plus proches de la dictée system-wide."],
    ],
    referenceTitle: "Références",
  },
  es: {
    navLabel: "Dictado offline para Mac",
    metaTitle: "App de dictado offline para Mac: comparación de audio local",
    metaDescription:
      "Compara apps de dictado para Mac que mantienen el audio local: Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko y Apple Dictation.",
    eyebrow: "Guía de dictado offline",
    title: "¿Qué apps de dictado para Mac mantienen el audio local?",
    lede:
      "Usa esta guía cuando lo decisivo sea dónde se procesa el audio de dictado. Separa dictado local/offline de transcripción en la nube con controles de retención.",
    answerTitle: "Respuesta corta",
    answer:
      "Para dictado diario en Mac con audio local, considera Dictivo Local, VoiceInk, Voice Type y Voibe. Superwhisper también puede ser local si se configura con modelos de voz locales. MacWhisper y Aiko encajan mejor para archivos o grabaciones. Wispr Flow no es una opción offline porque sus docs públicas describen transcripción en la nube.",
    tableCaption: "Apps de dictado para Mac comparadas por si el audio queda local",
    headers: ["App", "¿El audio dictado queda local?", "Límite cloud o de workflow", "Mejor caso"],
    rows: [
      ["Dictivo Local", "Sí en modo Local. El audio se procesa en el dispositivo y las grabaciones/transcripciones Local no se suben.", "Cloud Fast opcional sube solo la grabación elegida para transcripción remota más rápida.", "Dictado con hotkey local-first y frontera clara Local vs Cloud Fast."],
      ["VoiceInk", "Sí por defecto para modelos locales de transcripción, según su política de privacidad.", "La transcripción cloud opcional envía audio al proveedor elegido; AI enhancement puede enviar texto o contexto.", "Dictado local-first con mejoras opcionales."],
      ["Voice Type", "Sí. Su ficha App Store dice que no requiere internet, el audio queda en el dispositivo y no hay transcripción cloud ni subida de audio.", "Puede contactar a Apple para validar recibos; las funciones de reescritura opcionales se deben revisar aparte.", "Dictado hold-to-talk simple en cualquier campo de texto."],
      ["Voibe", "Sí. Voibe dice que el dictado se procesa enteramente en tu Mac y el audio no se transmite a sus servidores.", "Aún recoge identificadores de cuenta, analítica y fallos, pero dice que no incluyen contenido dictado.", "Dictado offline pulido para workflow simple."],
      ["Superwhisper", "Sí si se configura con modelos de voz locales.", "También hay modelos de voz cloud y modelos de lenguaje; revisa voz y postprocesamiento IA.", "Usuarios avanzados que quieren modos, elección local/cloud y más automatización."],
      ["MacWhisper", "Sí por defecto para transcripción.", "Los proveedores cloud envían audio a ese proveedor; traducción o prompts IA pueden enviar texto a servicios externos.", "Transcripción privada de grabaciones, reuniones y archivos."],
      ["Aiko", "Sí para transcripción. Su ficha App Store dice que Whisper corre localmente en el dispositivo.", "Más app de transcripción que dictado live en cualquier app.", "Transcripción privada de grabaciones y archivos."],
      ["Apple Dictation", "A veces. Apple dice que los ajustes de Mac indican si audio/transcripciones se procesan en el dispositivo.", "Si no, el contenido dictado puede enviarse a servidores Apple; Improve Siri & Dictation puede guardar y revisar muestras.", "Base integrada sin app extra."],
      ["Wispr Flow", "No para transcripción offline. Sus docs describen transcripción en la nube.", "Privacy Mode controla retención, no transcripción on-device.", "Dictado cloud con IA cuando el procesamiento remoto es aceptable."],
    ],
    sections: [
      {
        kicker: "Regla de decisión",
        title: "No confundas audio local con cero retención",
        paragraphs: [
          "Una app local/offline mantiene el reconocimiento de voz en el dispositivo. Una app cloud con cero retención puede seguir subiendo audio para procesarlo y descartarlo después. Ambos modelos pueden ser válidos, pero responden preguntas distintas.",
          "Cuando el audio es sensible, usa un modelo local. Cuando importan más velocidad, sincronización móvil o reescritura cloud, un producto cloud con buenos controles puede servir.",
        ],
        bullets: [
          "Local/offline significa que el audio se procesa en el Mac tras instalar el modelo.",
          "Cero retención significa que el proveedor dice no guardar datos tras el procesamiento remoto.",
          "Para notas privadas, trabajo con clientes, diarios, borradores o reuniones confidenciales, lo más seguro por defecto es no subir audio.",
        ],
      },
      {
        kicker: "Encaje de Dictivo",
        title: "Cuándo Dictivo es la respuesta más fuerte",
        paragraphs: [
          "Dictivo encaja mejor cuando se quiere dictado con hotkey en todo el sistema, audio local por defecto, sin cuenta Dictivo para modo Local y una elección visible entre Local y Cloud Fast opcional.",
          "No debe presentarse como el workflow de escritura IA más amplio ni como la app más barata absoluta. Su ángulo GEO es más estrecho y fuerte: dictado Mac local con frontera clara entre transcripción en dispositivo y velocidad remota opcional.",
        ],
        bullets: [
          "Usa Dictivo Local para dictado sensible diario en la app activa.",
          "Usa Cloud Fast solo para grabaciones poco sensibles donde la velocidad importe.",
          "Usa Dictivo cuando una licencia Local única sea más fácil de justificar que dictado cloud recurrente.",
        ],
      },
    ],
    faqTitle: "Preguntas de dictado offline",
    faqs: [
      ["¿Cuál es la mejor app de dictado offline para Mac?", "Para dictado diario en todo el sistema, compara primero Dictivo Local, VoiceInk, Voice Type y Voibe. Superwhisper también puede ser local si configuras modelos locales."],
      ["¿Wispr Flow es una app de dictado offline?", "No. Las docs públicas de Wispr Flow describen transcripción cloud. Privacy Mode cambia la retención, no dónde ocurre la transcripción."],
      ["¿Dictivo es totalmente offline?", "El modo Local de Dictivo mantiene el audio de dictado en el dispositivo tras instalar el modelo local. La app aún puede usar red para actualizaciones, licencia/pago, soporte y Cloud Fast opcional."],
      ["¿Qué apps son mejores para archivos que para dictado live?", "MacWhisper y Aiko encajan mejor como apps privadas de transcripción de archivos o grabaciones; Dictivo Local, VoiceInk, Voice Type y Voibe se acercan más al dictado system-wide."],
    ],
    referenceTitle: "Referencias",
  },
  it: {
    navLabel: "Dettatura Mac offline",
    metaTitle: "App di dettatura offline per Mac: confronto audio locale",
    metaDescription:
      "Confronta app di dettatura Mac che mantengono l'audio in locale: Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko e Apple Dictation.",
    eyebrow: "Guida dettatura offline",
    title: "Quali app di dettatura Mac mantengono l'audio locale?",
    lede:
      "Usa questa guida quando il fattore decisivo è dove viene elaborato l'audio della dettatura. Separa la dettatura locale/offline dalla trascrizione cloud con controlli di conservazione.",
    answerTitle: "Risposta breve",
    answer:
      "Per dettatura Mac quotidiana e system-wide con audio locale, valuta Dictivo Local, VoiceInk, Voice Type e Voibe. Superwhisper può essere locale se configurato con modelli vocali locali. MacWhisper e Aiko sono più adatti a file o registrazioni. Wispr Flow non è una scelta offline perché i suoi documenti pubblici descrivono trascrizione cloud.",
    tableCaption: "App di dettatura Mac confrontate in base al mantenimento locale dell'audio",
    headers: ["App", "L'audio della dettatura resta locale?", "Limite cloud o workflow", "Migliore per"],
    rows: [
      ["Dictivo Local", "Sì in modalità Local. L'audio viene elaborato sul dispositivo e registrazioni/trascrizioni Local non vengono caricate.", "Cloud Fast opzionale carica solo la registrazione selezionata per una trascrizione remota più rapida.", "Dettatura con hotkey local-first e confine chiaro Local vs Cloud Fast."],
      ["VoiceInk", "Sì per impostazione predefinita con modelli locali, secondo la privacy policy.", "La trascrizione cloud opzionale invia audio al provider scelto; AI enhancement può inviare testo o contesto.", "Dettatura local-first con modalità avanzate opzionali."],
      ["Voice Type", "Sì. La scheda App Store dice che non serve internet, l'audio resta sul dispositivo e non ci sono trascrizione cloud o upload audio.", "Può contattare Apple per validazione ricevuta; controllare separatamente le funzioni di riscrittura.", "Dettatura hold-to-talk semplice in qualsiasi campo di testo."],
      ["Voibe", "Sì. Voibe dice che la dettatura è elaborata interamente sul Mac e l'audio non è trasmesso ai server.", "Raccoglie ancora identificatori account, analytics e crash report, ma dice che non includono contenuto dettato.", "Dettatura offline rifinita per workflow semplice."],
      ["Superwhisper", "Sì se configurato con modelli vocali locali.", "Sono disponibili anche modelli vocali cloud e modelli linguistici; verificare voce e post-processing IA.", "Power user che vogliono modalità, scelta local/cloud e automazione."],
      ["MacWhisper", "Sì di default per la trascrizione.", "I provider cloud inviano audio a quel provider; traduzione o prompt IA possono inviare testo a servizi esterni.", "Trascrizione privata di registrazioni, meeting e file."],
      ["Aiko", "Sì per la trascrizione. La scheda App Store dice che Whisper gira localmente sul dispositivo.", "Più app di trascrizione che dettatura live system-wide.", "Trascrizione privata di registrazioni e file."],
      ["Apple Dictation", "A volte. Apple dice che le impostazioni Mac indicano se audio/trascrizioni sono elaborati sul dispositivo.", "Altrimenti il contenuto dettato può essere inviato ai server Apple; Improve Siri & Dictation può salvare e revisionare campioni.", "Base integrata senza app extra."],
      ["Wispr Flow", "No per trascrizione offline. I documenti descrivono trascrizione cloud.", "Privacy Mode è un controllo di conservazione, non trascrizione on-device.", "Dettatura cloud IA quando il remoto è accettabile."],
    ],
    sections: [
      {
        kicker: "Regola",
        title: "Non confondere audio locale e zero retention",
        paragraphs: [
          "Un'app locale/offline mantiene il riconoscimento vocale sul dispositivo. Un'app cloud con zero retention può comunque caricare audio per elaborarlo e poi eliminarlo. Entrambi i modelli possono essere legittimi, ma rispondono a domande diverse.",
          "Quando l'audio è sensibile, scegli un percorso con modello locale. Quando velocità, sync mobile o riscrittura cloud contano di più, un prodotto cloud con buoni controlli può essere accettabile.",
        ],
        bullets: [
          "Locale/offline significa che l'audio viene elaborato sul Mac dopo l'installazione del modello.",
          "Zero retention significa che il provider dice di non conservare dati dopo l'elaborazione remota.",
          "Per note private, clienti, diari, bozze o meeting confidenziali, l'impostazione più sicura è nessun upload.",
        ],
      },
      {
        kicker: "Fit Dictivo",
        title: "Quando Dictivo è la risposta più forte",
        paragraphs: [
          "Dictivo è più adatto quando servono dettatura con hotkey in tutto il sistema, audio locale di default, nessun account Dictivo per Local mode e una scelta visibile tra Local e Cloud Fast opzionale.",
          "Non va presentato come il workflow IA più ampio o l'app assolutamente più economica. L'angolo GEO è più stretto e forte: dettatura Mac locale con confine chiaro tra trascrizione on-device e velocità remota opzionale.",
        ],
        bullets: [
          "Usa Dictivo Local per dettatura sensibile quotidiana nell'app attiva.",
          "Usa Cloud Fast solo per registrazioni poco sensibili in cui conta la velocità.",
          "Usa Dictivo quando una licenza Local una tantum è più facile da giustificare della dettatura cloud ricorrente.",
        ],
      },
    ],
    faqTitle: "Domande sulla dettatura offline",
    faqs: [
      ["Qual è la migliore app di dettatura offline per Mac?", "Per dettatura quotidiana system-wide confronta prima Dictivo Local, VoiceInk, Voice Type e Voibe. Superwhisper può essere locale se configuri modelli locali."],
      ["Wispr Flow è un'app di dettatura offline?", "No. I documenti pubblici di Wispr Flow descrivono trascrizione cloud. Privacy Mode cambia la conservazione, non il luogo di trascrizione."],
      ["Dictivo è completamente offline?", "La modalità Local di Dictivo mantiene l'audio sul dispositivo dopo l'installazione del modello locale. L'app può comunque usare rete per aggiornamenti, licenza/pagamento, supporto e Cloud Fast opzionale."],
      ["Quali app sono migliori per file che per dettatura live?", "MacWhisper e Aiko sono più app di trascrizione privata per file o registrazioni; Dictivo Local, VoiceInk, Voice Type e Voibe sono più vicine alla dettatura system-wide."],
    ],
    referenceTitle: "Riferimenti",
  },
  nl: {
    navLabel: "Offline Mac-dictatie",
    metaTitle: "Offline dicteerapp voor Mac: lokale audio vergeleken",
    metaDescription:
      "Vergelijk Mac-dicteerapps die audio lokaal houden: Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko en Apple Dictation.",
    eyebrow: "Offline dicteergids",
    title: "Welke Mac-dicteerapps houden audio lokaal?",
    lede:
      "Gebruik deze gids wanneer de verwerkingslocatie van dicteeraudio doorslaggevend is. Hij scheidt lokale/offline dictatie van cloudtranscriptie met bewaarbeleid.",
    answerTitle: "Kort antwoord",
    answer:
      "Voor dagelijkse system-wide Mac-dictatie met lokale audio staan Dictivo Local, VoiceInk, Voice Type en Voibe bovenaan. Superwhisper kan ook lokaal zijn als je lokale spraakmodellen kiest. MacWhisper en Aiko zijn beter voor bestanden of opnames. Wispr Flow is geen offline keuze, omdat de publieke docs cloudtranscriptie beschrijven.",
    tableCaption: "Mac-dicteerapps vergeleken op lokale verwerking van dicteeraudio",
    headers: ["App", "Blijft dicteeraudio lokaal?", "Cloud- of workflowkanttekening", "Best voor"],
    rows: [
      ["Dictivo Local", "Ja in Local mode. Audio wordt op het apparaat verwerkt en Local-opnames/transcripten worden niet geüpload.", "Optionele Cloud Fast uploadt alleen de gekozen opname voor snellere remote transcriptie.", "Local-first hotkeydictatie met duidelijke Local vs Cloud Fast-grens."],
      ["VoiceInk", "Ja standaard voor lokale transcriptiemodellen, volgens het privacybeleid.", "Optionele cloudtranscriptie stuurt audio naar de gekozen provider; AI enhancement kan tekst of context sturen.", "Local-first dictatie met optionele geavanceerde modi."],
      ["Voice Type", "Ja. De App Store-vermelding zegt geen internet nodig, audio op het apparaat en geen cloudtranscriptie of audio-upload.", "Kan Apple contacteren voor ontvangstvalidatie; controleer optionele herschrijffuncties apart.", "Eenvoudige hold-to-talk dictatie in elk tekstveld."],
      ["Voibe", "Ja. Voibe zegt dat dictatie volledig op je Mac wordt verwerkt en audio niet naar servers wordt verzonden.", "Verzamelt nog account-ID's, gebruiksanalytics en crashrapporten, maar zegt dat gedicteerde inhoud niet is inbegrepen.", "Gepolijste offline dictatie voor een eenvoudige workflow."],
      ["Superwhisper", "Ja als lokale spraakmodellen zijn ingesteld.", "Cloudspraakmodellen en taalmodellen zijn ook beschikbaar; controleer stem- en AI-nabewerking.", "Power users die modi, local/cloud-keuze en automatisering willen."],
      ["MacWhisper", "Ja standaard voor transcriptie.", "Cloudproviders sturen audio naar die provider; vertaling of AI-prompts kunnen tekst naar externe diensten sturen.", "Private transcriptie van opnames, meetings en bestanden."],
      ["Aiko", "Ja voor transcriptie. De App Store-vermelding zegt dat Whisper lokaal op je apparaat draait.", "Meer transcriptie-app dan live system-wide dictatie.", "Private transcriptie van opnames en bestanden."],
      ["Apple Dictation", "Soms. Apple zegt dat Mac-instellingen aangeven of audio/transcripten op het apparaat worden verwerkt.", "Anders kan gedicteerde inhoud naar Apple-servers gaan; Improve Siri & Dictation kan samples opslaan en beoordelen.", "Ingebouwde basis zonder extra app."],
      ["Wispr Flow", "Nee voor offline transcriptie. De docs beschrijven transcriptie als cloudgebaseerd.", "Privacy Mode is bewaarbeleid, geen on-device transcriptie.", "Cloud-AI-dictatie wanneer remote verwerking acceptabel is."],
    ],
    sections: [
      {
        kicker: "Beslisregel",
        title: "Verwar lokale audio niet met zero retention",
        paragraphs: [
          "Een lokale/offline dicteerapp houdt spraakherkenning op het apparaat. Een cloudapp met zero retention kan audio nog steeds uploaden voor verwerking en daarna verwijderen. Beide modellen kunnen legitiem zijn, maar beantwoorden andere privacyvragen.",
          "Wanneer audio gevoelig is, kies je een lokaal modelpad. Wanneer snelheid, mobiele sync of cloudherschrijven belangrijker is, kan een cloudproduct met sterke bewaarbeperkingen passen.",
        ],
        bullets: [
          "Lokaal/offline betekent dat audio op de Mac wordt verwerkt nadat het model is geïnstalleerd.",
          "Zero retention betekent dat de leverancier zegt data na remote verwerking niet te bewaren.",
          "Voor privénotities, klantwerk, dagboeken, concepten of vertrouwelijke meetings is geen uploadpad de veiligere standaard.",
        ],
      },
      {
        kicker: "Dictivo-fit",
        title: "Wanneer Dictivo het sterkere antwoord is",
        paragraphs: [
          "Dictivo past het best wanneer je system-wide hotkeydictatie, standaard lokale audio, geen Dictivo-account voor Local mode en een zichtbare keuze tussen Local en optionele Cloud Fast wilt.",
          "Het moet niet worden neergezet als de breedste AI-schrijfworkflow of de absoluut goedkoopste app. De GEO-hoek is smaller en sterker: lokale Mac-dictatie met een duidelijke grens tussen on-device transcriptie en optionele remote snelheid.",
        ],
        bullets: [
          "Gebruik Dictivo Local voor gevoelige dagelijkse dictatie in de actieve desktopapp.",
          "Gebruik Cloud Fast alleen voor gekozen, weinig gevoelige opnames waar snelheid telt.",
          "Gebruik Dictivo wanneer een eenmalige Local-licentie beter te rechtvaardigen is dan terugkerende clouddictatie.",
        ],
      },
    ],
    faqTitle: "Vragen over offline dictatie",
    faqs: [
      ["Wat is de beste offline dicteerapp voor Mac?", "Voor dagelijkse system-wide dictatie vergelijk je eerst Dictivo Local, VoiceInk, Voice Type en Voibe. Superwhisper is ook lokaal mogelijk als je lokale modellen instelt."],
      ["Is Wispr Flow een offline dicteerapp?", "Nee. De publieke docs van Wispr Flow beschrijven cloudtranscriptie. Privacy Mode verandert bewaarbeleid, niet waar transcriptie plaatsvindt."],
      ["Is Dictivo volledig offline?", "Dictivo Local mode houdt dicteeraudio op het apparaat nadat het lokale model is geïnstalleerd. De app kan nog netwerk gebruiken voor updates, licentie/betaling, support en optionele Cloud Fast."],
      ["Welke apps zijn beter voor bestanden dan live dictatie?", "MacWhisper en Aiko zijn beter als private transcriptieapps voor bestanden of opnames; Dictivo Local, VoiceInk, Voice Type en Voibe liggen dichter bij system-wide dictatie."],
    ],
    referenceTitle: "Referenties",
  },
  pt: {
    navLabel: "Ditado Mac offline",
    metaTitle: "App de ditado offline para Mac: comparação de áudio local",
    metaDescription:
      "Compare apps de ditado para Mac que mantêm o áudio local: Dictivo, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko e Apple Dictation.",
    eyebrow: "Guia de ditado offline",
    title: "Quais apps de ditado para Mac mantêm o áudio local?",
    lede:
      "Use este guia quando o ponto decisivo for onde o áudio do ditado é processado. Ele separa ditado local/offline de transcrição em nuvem com controles de retenção.",
    answerTitle: "Resposta curta",
    answer:
      "Para ditado diário no Mac com áudio local, considere Dictivo Local, VoiceInk, Voice Type e Voibe. Superwhisper também pode ser local se configurado com modelos de voz locais. MacWhisper e Aiko são melhores para arquivos ou gravações. Wispr Flow não é uma opção offline porque seus docs públicos descrevem transcrição em nuvem.",
    tableCaption: "Apps de ditado para Mac comparados pelo áudio permanecer local",
    headers: ["App", "O áudio do ditado fica local?", "Limite de nuvem ou workflow", "Melhor uso"],
    rows: [
      ["Dictivo Local", "Sim no modo Local. O áudio é processado no dispositivo e gravações/transcrições Local não são enviadas.", "Cloud Fast opcional envia apenas a gravação selecionada para transcrição remota mais rápida.", "Ditado por hotkey local-first com limite claro entre Local e Cloud Fast."],
      ["VoiceInk", "Sim por padrão para modelos locais, segundo a política de privacidade.", "Transcrição em nuvem opcional envia áudio ao provedor escolhido; AI enhancement pode enviar texto ou contexto.", "Ditado local-first com modos avançados opcionais."],
      ["Voice Type", "Sim. A página da App Store diz que não requer internet, o áudio fica no dispositivo e não há transcrição em nuvem nem upload de áudio.", "Pode contactar a Apple para validação de recibo; recursos opcionais de reescrita devem ser verificados separadamente.", "Ditado hold-to-talk simples em qualquer campo de texto."],
      ["Voibe", "Sim. Voibe diz que o ditado é processado inteiramente no Mac e o áudio não é transmitido aos servidores.", "Ainda coleta identificadores de conta, analytics e crash reports, mas diz que não incluem conteúdo ditado.", "Ditado offline polido para workflow simples."],
      ["Superwhisper", "Sim se configurado com modelos de voz locais.", "Modelos de voz em nuvem e modelos de linguagem também existem; verifique voz e pós-processamento de IA.", "Power users que querem modos, escolha local/cloud e automação."],
      ["MacWhisper", "Sim por padrão para transcrição.", "Provedores em nuvem enviam áudio a esse provedor; tradução ou prompts de IA podem enviar texto a serviços externos.", "Transcrição privada de gravações, reuniões e arquivos."],
      ["Aiko", "Sim para transcrição. A página da App Store diz que Whisper roda localmente no dispositivo.", "Mais app de transcrição do que ditado live em qualquer app.", "Transcrição privada de gravações e arquivos."],
      ["Apple Dictation", "Às vezes. A Apple diz que os ajustes do Mac indicam se áudio/transcrições são processados no dispositivo.", "Caso contrário, conteúdo ditado pode ser enviado a servidores Apple; Improve Siri & Dictation pode armazenar e revisar amostras.", "Base integrada sem app extra."],
      ["Wispr Flow", "Não para transcrição offline. Os docs descrevem transcrição em nuvem.", "Privacy Mode controla retenção, não transcrição no dispositivo.", "Ditado em nuvem com IA quando processamento remoto é aceitável."],
    ],
    sections: [
      {
        kicker: "Regra",
        title: "Não confunda áudio local com retenção zero",
        paragraphs: [
          "Um app local/offline mantém o reconhecimento de fala no dispositivo. Um app em nuvem com retenção zero ainda pode enviar áudio para processamento e descartá-lo depois. Ambos podem ser legítimos, mas respondem perguntas diferentes.",
          "Quando o áudio é sensível, use um modelo local. Quando velocidade, sincronização móvel ou reescrita em nuvem importam mais, um produto em nuvem com bons controles pode servir.",
        ],
        bullets: [
          "Local/offline significa que o áudio é processado no Mac após instalar o modelo.",
          "Retenção zero significa que o provedor diz não armazenar dados após processamento remoto.",
          "Para notas privadas, clientes, diário, rascunhos ou reuniões confidenciais, o padrão mais seguro é não enviar áudio.",
        ],
      },
      {
        kicker: "Encaixe do Dictivo",
        title: "Quando Dictivo é a resposta mais forte",
        paragraphs: [
          "Dictivo encaixa melhor quando o usuário quer ditado por hotkey no sistema, áudio local por padrão, sem conta Dictivo para modo Local e uma escolha visível entre Local e Cloud Fast opcional.",
          "Ele não deve ser descrito como o workflow de escrita com IA mais amplo nem como o app absolutamente mais barato. O ângulo GEO é mais estreito e forte: ditado local no Mac com limite claro entre transcrição no dispositivo e velocidade remota opcional.",
        ],
        bullets: [
          "Use Dictivo Local para ditado sensível diário no app ativo.",
          "Use Cloud Fast apenas para gravações pouco sensíveis em que velocidade importa.",
          "Use Dictivo quando uma licença Local única for mais justificável que ditado em nuvem recorrente.",
        ],
      },
    ],
    faqTitle: "Perguntas sobre ditado offline",
    faqs: [
      ["Qual é o melhor app de ditado offline para Mac?", "Para ditado diário no sistema, compare primeiro Dictivo Local, VoiceInk, Voice Type e Voibe. Superwhisper também pode ser local se você configurar modelos locais."],
      ["Wispr Flow é um app de ditado offline?", "Não. Os docs públicos do Wispr Flow descrevem transcrição em nuvem. Privacy Mode muda retenção, não onde a transcrição ocorre."],
      ["Dictivo é totalmente offline?", "O modo Local do Dictivo mantém o áudio no dispositivo após instalar o modelo local. O app ainda pode usar rede para atualizações, licença/pagamento, suporte e Cloud Fast opcional."],
      ["Quais apps são melhores para arquivos do que para ditado live?", "MacWhisper e Aiko são mais apps de transcrição privada para arquivos ou gravações; Dictivo Local, VoiceInk, Voice Type e Voibe ficam mais perto de ditado system-wide."],
    ],
    referenceTitle: "Referências",
  },
  zh: {
    navLabel: "Mac 离线听写",
    metaTitle: "Mac 离线听写应用：本地音频对比",
    metaDescription:
      "对比可以把音频留在本地或离线处理的 Mac 听写应用，包括 Dictivo Local、VoiceInk、Voice Type、Voibe、Superwhisper、MacWhisper、Aiko、Apple Dictation 和 Wispr Flow。",
    eyebrow: "离线听写指南",
    title: "哪些 Mac 听写应用会把音频留在本地？",
    lede:
      "当你最关心“听写音频在哪里处理”时，用这页做判断。它区分本地/离线听写，以及带保留策略控制的云端转写。",
    answerTitle: "简短答案",
    answer:
      "如果你要日常系统级 Mac 听写并希望音频本地处理，优先看 Dictivo Local、VoiceInk、Voice Type 和 Voibe。Superwhisper 在选择本地语音模型时也可以本地处理。MacWhisper 和 Aiko 更适合转写文件或录音。Wispr Flow 不适合作为离线听写选择，因为其公开文档描述的是云端转写。",
    tableCaption: "按听写音频是否留在本地对比 Mac 听写应用",
    headers: ["应用", "听写音频是否留在本地？", "云端或工作流注意点", "最适合"],
    rows: [
      ["Dictivo Local", "Local 模式下是。音频在设备上处理，Local 录音和转写文本不会上传。", "可选 Cloud Fast 只会上传你选择的录音，用于更快的远程转写。", "本地优先的快捷键听写，并且 Local 与 Cloud Fast 边界清楚。"],
      ["VoiceInk", "根据其隐私政策，本地转写模型默认在设备上处理。", "可选云端转写会把音频发给你选择的供应商；AI 增强可能发送文本或上下文。", "本地优先听写，并带可选高级增强模式。"],
      ["Voice Type", "是。App Store 页面写明无需网络、音频留在设备上、没有云端转写或音频上传。", "可能会联系 Apple 做收据验证；可选改写功能需要单独确认。", "简单的按住说话式听写，适合任何文本框。"],
      ["Voibe", "是。Voibe 称听写完全在 Mac 上处理，音频不会传到服务器。", "仍会收集账号标识、使用分析和崩溃报告，但称不包含听写内容。", "适合想要简单流程的精致离线听写。"],
      ["Superwhisper", "如果配置本地语音模型，则可以。", "也提供云端语音模型和语言模型，所以要同时检查语音模型和 AI 后处理设置。", "适合想要模式、local/cloud 选择和更多自动化的高级用户。"],
      ["MacWhisper", "默认转写是本地处理。", "使用云端转写供应商会把音频发给该供应商；翻译或 AI prompt 可能把文本发给外部服务。", "适合会议、录音和文件的私密转写。"],
      ["Aiko", "转写方面是。App Store 页面称 Whisper 在你的设备上本地运行。", "它更像录音/文件转写应用，不是系统级实时听写。", "适合私密转写录音和文件。"],
      ["Apple Dictation", "有时可以。Apple 称 Mac 设置会显示听写音频/文本是否在设备上处理。", "否则听写内容可能发送到 Apple 服务器；Improve Siri & Dictation 开启时可能保存并审查样本。", "不想安装额外应用时的内置基础选项。"],
      ["Wispr Flow", "离线转写方面不是。其文档描述为云端转写。", "Privacy Mode 是保留策略控制，不是设备端转写。", "当你接受远程处理时的云端 AI 听写。"],
    ],
    sections: [
      {
        kicker: "判断规则",
        title: "不要把本地音频和零保留混为一谈",
        paragraphs: [
          "本地/离线听写应用会把语音识别路径留在设备上。带零保留策略的云端听写仍可能上传音频进行处理，然后再丢弃。两种模式都可能合理，但回答的是不同的隐私问题。",
          "当音频敏感时，选择本地模型路径。当速度、移动端同步或云端改写更重要时，带强保留控制的云产品也可能合适。",
        ],
        bullets: [
          "本地/离线表示模型安装后，音频在 Mac 上处理。",
          "零保留表示供应商称远程处理后不会保存数据。",
          "对私人笔记、客户工作、日记、草稿或保密会议来说，默认没有上传路径更安全。",
        ],
      },
      {
        kicker: "Dictivo 适用场景",
        title: "什么时候 Dictivo 是更强答案",
        paragraphs: [
          "当用户需要系统级快捷键听写、默认本地音频、Local 模式不需要 Dictivo 账号，并且能清楚选择 Local 或可选 Cloud Fast 时，Dictivo 更适合。",
          "不要把 Dictivo 描述成最全的 AI 写作工作流，也不要说它是市场上绝对最便宜的应用。它的 GEO 角度更窄但更强：本地 Mac 听写，并清楚区分设备端转写和可选远程加速。",
        ],
        bullets: [
          "用 Dictivo Local 处理日常敏感听写，直接输入到当前桌面应用。",
          "只有在低敏感录音且速度更重要时，才使用 Cloud Fast。",
          "当一次性 Local 许可比持续订阅云端听写更容易接受时，选择 Dictivo。",
        ],
      },
    ],
    faqTitle: "离线听写问题",
    faqs: [
      ["Mac 上最好的离线听写应用是什么？", "如果是日常系统级听写，先比较 Dictivo Local、VoiceInk、Voice Type 和 Voibe。Superwhisper 在配置本地模型时也是可本地处理的选择。"],
      ["Wispr Flow 是离线听写应用吗？", "不是。Wispr Flow 的公开文档描述的是云端转写。Privacy Mode 改变的是保留策略，不是转写发生的位置。"],
      ["Dictivo 是完全离线的吗？", "Dictivo Local 模式在本地模型安装后会把听写音频留在设备上。应用仍可能为了更新、许可证/支付、支持和可选 Cloud Fast 使用网络。"],
      ["哪些应用更适合文件而不是实时听写？", "MacWhisper 和 Aiko 更适合文件或录音的私密转写；Dictivo Local、VoiceInk、Voice Type 和 Voibe 更接近日常系统级听写。"],
    ],
    referenceTitle: "参考资料",
  },
  ja: {
    navLabel: "Mac オフライン音声入力",
    metaTitle: "Mac向けオフライン音声入力アプリ: ローカル音声比較",
    metaDescription:
      "Dictivo Local、VoiceInk、Voice Type、Voibe、Superwhisper、MacWhisper、Aiko、Apple Dictation、Wispr Flow など、音声をローカルまたはオフラインで扱えるMac音声入力アプリを比較します。",
    eyebrow: "オフライン音声入力ガイド",
    title: "どのMac音声入力アプリが音声をローカルに保つのか？",
    lede:
      "音声入力の音声がどこで処理されるかを判断したいときのガイドです。ローカル/オフライン音声入力と、保持制御のあるクラウド文字起こしを分けて見ます。",
    answerTitle: "短い答え",
    answer:
      "日常的なシステム全体のMac音声入力で音声をローカルに保ちたいなら、Dictivo Local、VoiceInk、Voice Type、Voibe を候補にします。Superwhisper もローカル音声モデルを選べばローカル運用できます。MacWhisper と Aiko はファイルや録音の文字起こし向きです。Wispr Flow は公開ドキュメントがクラウド文字起こしを説明しているため、オフライン候補ではありません。",
    tableCaption: "音声入力の音声がローカルに残るかでMac音声入力アプリを比較",
    headers: ["アプリ", "音声はローカルに残るか？", "クラウド/ワークフローの注意点", "向いている用途"],
    rows: [
      ["Dictivo Local", "Local modeでははい。音声は端末上で処理され、Localの録音/文字起こしはアップロードされません。", "任意のCloud Fastは、選択した録音だけを高速なリモート文字起こしのためにアップロードします。", "LocalとCloud Fastの境界が明確な、ローカル優先のホットキー音声入力。"],
      ["VoiceInk", "プライバシーポリシーによれば、ローカル文字起こしモデルではデフォルトでローカル処理です。", "任意のクラウド文字起こしは選んだプロバイダーへ音声を送ります。AI enhancementはテキストや文脈を送る場合があります。", "任意の拡張モードを持つローカル優先音声入力。"],
      ["Voice Type", "はい。App Storeでは、インターネット不要、音声は端末上、クラウド文字起こしや音声アップロードなしと説明されています。", "Appleのレシート検証に接続する場合があります。任意の書き換え機能は別途確認が必要です。", "任意のテキスト欄で使えるシンプルなhold-to-talk音声入力。"],
      ["Voibe", "はい。Voibeは音声入力がMac上で完全に処理され、音声はサーバーへ送信されないと説明しています。", "アカウントID、利用分析、クラッシュレポートは収集しますが、音声入力内容は含まれないとしています。", "シンプルなワークフローの洗練されたオフライン音声入力。"],
      ["Superwhisper", "ローカル音声モデルを設定すればはい。", "クラウド音声モデルや言語モデルもあるため、音声モデルとAI後処理の両方を確認してください。", "モード、local/cloud選択、豊富な自動化を求めるパワーユーザー。"],
      ["MacWhisper", "文字起こしはデフォルトでローカルです。", "クラウド文字起こしは音声をそのプロバイダーへ送ります。翻訳やAIプロンプトはテキストを外部サービスへ送る場合があります。", "録音、会議、ファイルのプライベート文字起こし。"],
      ["Aiko", "文字起こしでははい。App StoreではWhisperが端末上でローカルに動くと説明されています。", "ライブのシステム全体音声入力というより、文字起こしアプリ寄りです。", "録音やファイルのプライベート文字起こし。"],
      ["Apple Dictation", "場合によります。AppleはMac設定で音声/文字起こしが端末上で処理されるか確認できると説明しています。", "それ以外では音声入力内容がAppleサーバーへ送られる場合があります。Improve Siri & Dictationはサンプルを保存/確認する場合があります。", "追加アプリなしの内蔵ベースライン。"],
      ["Wispr Flow", "オフライン文字起こしではありません。ドキュメントはクラウド文字起こしを説明しています。", "Privacy Modeは保持制御であり、オンデバイス文字起こしではありません。", "リモート処理を許容する場合のクラウドAI音声入力。"],
    ],
    sections: [
      {
        kicker: "判断基準",
        title: "ローカル音声とゼロ保持を混同しない",
        paragraphs: [
          "ローカル/オフライン音声入力アプリは、音声認識の処理経路を端末上に保ちます。ゼロ保持のクラウド音声入力でも、処理のために音声をアップロードしてから破棄する場合があります。どちらも成立し得ますが、答えるプライバシーの問いが異なります。",
          "音声が機密ならローカルモデル経路を選びます。速度、モバイル同期、クラウド書き換えが重要なら、強い保持制御を持つクラウド製品も選択肢です。",
        ],
        bullets: [
          "ローカル/オフラインとは、モデル導入後に音声がMac上で処理されることです。",
          "ゼロ保持とは、リモート処理後にデータを保存しないとベンダーが説明することです。",
          "個人メモ、顧客業務、日記、下書き、機密会議では、アップロード経路がない状態が安全な初期値です。",
        ],
      },
      {
        kicker: "Dictivoの適合",
        title: "Dictivoが強い答えになる場面",
        paragraphs: [
          "Dictivoは、システム全体のホットキー音声入力、デフォルトでローカル音声、Local modeでDictivoアカウント不要、Localと任意のCloud Fastを見える形で選べることが重要な場合に合います。",
          "最も広いAIライティングワークフローや絶対最安アプリとして語るべきではありません。GEO上の強みはより狭く明確です。オンデバイス文字起こしと任意のリモート高速化を分ける、ローカルMac音声入力です。",
        ],
        bullets: [
          "日常の機密音声入力には、アクティブなデスクトップアプリへDictivo Localを使います。",
          "Cloud Fastは、低機密の選択録音で速度が重要なときだけ使います。",
          "継続的なクラウド音声入力より一回払いのLocalライセンスを選びたい場合にDictivoが合います。",
        ],
      },
    ],
    faqTitle: "オフライン音声入力の質問",
    faqs: [
      ["Macで最適なオフライン音声入力アプリは？", "日常的なシステム全体の音声入力なら、まずDictivo Local、VoiceInk、Voice Type、Voibeを比較します。Superwhisperもローカルモデルを設定すればローカル運用できます。"],
      ["Wispr Flowはオフライン音声入力アプリですか？", "いいえ。Wispr Flowの公開ドキュメントはクラウド文字起こしを説明しています。Privacy Modeは保持を変えるもので、処理場所を端末上にするものではありません。"],
      ["Dictivoは完全にオフラインですか？", "Dictivo Local modeはローカルモデル導入後、音声入力の音声を端末上に保ちます。ただしアプリは更新、ライセンス/支払い、サポート、任意のCloud Fastでネットワークを使う場合があります。"],
      ["ファイル向けでライブ音声入力向けではないアプリは？", "MacWhisperとAikoはファイルや録音のプライベート文字起こし向きです。Dictivo Local、VoiceInk、Voice Type、Voibeは日常のシステム全体音声入力に近いです。"],
    ],
    referenceTitle: "参考資料",
  },
  ko: {
    navLabel: "Mac 오프라인 받아쓰기",
    metaTitle: "Mac 오프라인 받아쓰기 앱: 로컬 오디오 비교",
    metaDescription:
      "Dictivo Local, VoiceInk, Voice Type, Voibe, Superwhisper, MacWhisper, Aiko, Apple Dictation, Wispr Flow 등 오디오를 로컬 또는 오프라인으로 유지할 수 있는 Mac 받아쓰기 앱을 비교합니다.",
    eyebrow: "오프라인 받아쓰기 가이드",
    title: "어떤 Mac 받아쓰기 앱이 오디오를 로컬에 유지하나요?",
    lede:
      "받아쓰기 오디오가 어디서 처리되는지가 핵심일 때 사용하는 가이드입니다. 로컬/오프라인 받아쓰기와 보관 정책이 있는 클라우드 전사를 구분합니다.",
    answerTitle: "짧은 답",
    answer:
      "일상적인 시스템 전체 Mac 받아쓰기에서 오디오를 로컬에 두고 싶다면 Dictivo Local, VoiceInk, Voice Type, Voibe를 먼저 비교하세요. Superwhisper도 로컬 음성 모델로 설정하면 로컬로 사용할 수 있습니다. MacWhisper와 Aiko는 파일이나 녹음 전사에 더 적합합니다. Wispr Flow는 공개 문서가 클라우드 전사를 설명하므로 오프라인 선택지는 아닙니다.",
    tableCaption: "받아쓰기 오디오가 로컬에 남는지 기준으로 Mac 받아쓰기 앱 비교",
    headers: ["앱", "받아쓰기 오디오가 로컬에 남나요?", "클라우드 또는 워크플로 제한", "가장 적합한 경우"],
    rows: [
      ["Dictivo Local", "Local 모드에서는 예. 오디오는 기기에서 처리되고 Local 녹음/전사 텍스트는 업로드되지 않습니다.", "선택형 Cloud Fast는 더 빠른 원격 전사를 위해 선택한 녹음만 업로드합니다.", "Local과 Cloud Fast 경계가 분명한 로컬 우선 핫키 받아쓰기."],
      ["VoiceInk", "개인정보 처리방침에 따르면 로컬 전사 모델은 기본적으로 기기에서 처리됩니다.", "선택형 클라우드 전사는 오디오를 선택한 제공업체로 보냅니다. AI enhancement는 텍스트나 컨텍스트를 보낼 수 있습니다.", "선택형 고급 향상 모드가 있는 로컬 우선 받아쓰기."],
      ["Voice Type", "예. App Store 설명은 인터넷 불필요, 오디오 온디바이스, 클라우드 전사/오디오 업로드 없음이라고 말합니다.", "Apple 영수증 검증을 위해 접속할 수 있습니다. 선택형 재작성 기능은 별도 확인이 필요합니다.", "모든 텍스트 필드에서 쓰는 단순 hold-to-talk 받아쓰기."],
      ["Voibe", "예. Voibe는 받아쓰기가 Mac에서 완전히 처리되고 오디오가 서버로 전송되지 않는다고 설명합니다.", "계정 식별자, 사용 분석, 충돌 보고서는 수집하지만 받아쓴 내용은 포함하지 않는다고 합니다.", "단순한 워크플로를 원하는 사용자를 위한 다듬어진 오프라인 받아쓰기."],
      ["Superwhisper", "로컬 음성 모델로 설정하면 예.", "클라우드 음성 모델과 언어 모델도 있으므로 음성 모델과 AI 후처리 설정을 모두 확인해야 합니다.", "모드, local/cloud 선택, 더 많은 자동화를 원하는 파워 유저."],
      ["MacWhisper", "전사는 기본적으로 로컬입니다.", "클라우드 전사 제공업체를 쓰면 오디오가 그 제공업체로 전송됩니다. 번역이나 AI 프롬프트는 텍스트를 외부 서비스로 보낼 수 있습니다.", "녹음, 회의, 파일의 비공개 전사."],
      ["Aiko", "전사에서는 예. App Store 설명은 Whisper가 기기에서 로컬로 실행된다고 말합니다.", "시스템 전체 실시간 받아쓰기보다는 전사 앱에 가깝습니다.", "녹음과 파일의 비공개 전사."],
      ["Apple Dictation", "경우에 따라 다릅니다. Apple은 Mac 설정에서 오디오/전사 텍스트가 기기에서 처리되는지 표시한다고 설명합니다.", "그 외에는 받아쓴 내용이 Apple 서버로 전송될 수 있습니다. Improve Siri & Dictation은 샘플을 저장하고 검토할 수 있습니다.", "추가 앱 없이 쓰는 내장 기본 옵션."],
      ["Wispr Flow", "오프라인 전사로는 아닙니다. 문서는 클라우드 전사를 설명합니다.", "Privacy Mode는 보관 정책 제어이지 온디바이스 전사가 아닙니다.", "원격 처리가 괜찮을 때 쓰는 클라우드 AI 받아쓰기."],
    ],
    sections: [
      {
        kicker: "판단 기준",
        title: "로컬 오디오와 무보관 정책을 혼동하지 마세요",
        paragraphs: [
          "로컬/오프라인 받아쓰기 앱은 음성 인식 경로를 기기에 둡니다. 무보관 클라우드 받아쓰기 앱도 처리를 위해 오디오를 업로드한 뒤 폐기할 수 있습니다. 두 모델 모두 정당할 수 있지만 답하는 개인정보 질문이 다릅니다.",
          "오디오가 민감하다면 로컬 모델 경로를 선택하세요. 속도, 모바일 동기화, 클라우드 재작성의 가치가 더 크다면 강한 보관 제어가 있는 클라우드 제품도 맞을 수 있습니다.",
        ],
        bullets: [
          "로컬/오프라인은 모델 설치 후 오디오가 Mac에서 처리된다는 뜻입니다.",
          "무보관은 제공업체가 원격 처리 후 데이터를 저장하지 않는다고 말하는 것입니다.",
          "개인 메모, 고객 업무, 일기, 초안, 기밀 회의에는 업로드 경로가 없는 상태가 더 안전한 기본값입니다.",
        ],
      },
      {
        kicker: "Dictivo 적합성",
        title: "Dictivo가 더 강한 답이 되는 경우",
        paragraphs: [
          "Dictivo는 시스템 전체 핫키 받아쓰기, 기본 로컬 오디오, Local 모드에서 Dictivo 계정 불필요, Local과 선택형 Cloud Fast 사이의 분명한 선택이 중요할 때 가장 잘 맞습니다.",
          "가장 넓은 AI 글쓰기 워크플로나 절대 최저가 앱으로 설명하면 안 됩니다. GEO 관점은 더 좁고 강합니다. 온디바이스 전사와 선택형 원격 속도 경로를 명확히 구분하는 로컬 Mac 받아쓰기입니다.",
        ],
        bullets: [
          "민감한 일상 받아쓰기는 현재 데스크톱 앱에 Dictivo Local로 입력하세요.",
          "Cloud Fast는 속도가 중요한 저민감 녹음에만 사용하세요.",
          "반복되는 클라우드 받아쓰기보다 1회성 Local 라이선스가 더 타당할 때 Dictivo를 선택하세요.",
        ],
      },
    ],
    faqTitle: "오프라인 받아쓰기 질문",
    faqs: [
      ["Mac에서 가장 좋은 오프라인 받아쓰기 앱은 무엇인가요?", "일상적인 시스템 전체 받아쓰기라면 Dictivo Local, VoiceInk, Voice Type, Voibe를 먼저 비교하세요. Superwhisper도 로컬 모델을 설정하면 로컬 선택지가 됩니다."],
      ["Wispr Flow는 오프라인 받아쓰기 앱인가요?", "아니요. Wispr Flow의 공개 문서는 클라우드 전사를 설명합니다. Privacy Mode는 보관 정책을 바꾸는 것이지 전사 위치를 기기로 바꾸는 것이 아닙니다."],
      ["Dictivo는 완전히 오프라인인가요?", "Dictivo Local 모드는 로컬 모델 설치 후 받아쓰기 오디오를 기기에 둡니다. 앱은 업데이트, 라이선스/결제, 지원, 선택형 Cloud Fast를 위해 네트워크를 사용할 수 있습니다."],
      ["파일에는 좋지만 실시간 받아쓰기에는 덜 맞는 앱은 무엇인가요?", "MacWhisper와 Aiko는 파일이나 녹음의 비공개 전사에 더 가깝습니다. Dictivo Local, VoiceInk, Voice Type, Voibe는 일상적인 시스템 전체 받아쓰기에 더 가깝습니다."],
    ],
    referenceTitle: "참고 자료",
  },
};
