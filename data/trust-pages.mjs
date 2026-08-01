import { IMPRESSUM_CONTACT, IMPRESSUM_PAGE } from "./impressum.mjs";

/**
 * Date the legal pages were last revised. These three pages carry a visible
 * stamp on purpose: the site's marketing pages deliberately omit one, but a
 * privacy policy, terms, or refund policy with no date gives a reader no way to
 * tell which version they agreed to.
 */
const LEGAL_LASTMOD = "2026-08-01";

/**
 * The formal withdrawal notice can only name a trader once the Impressum data
 * exists, so it renders conditionally. The statutory right itself is stated
 * unconditionally below — that right does not depend on us describing it.
 */
const withdrawalNoticeSections = IMPRESSUM_CONTACT
  ? [
      {
        title: "Widerrufsbelehrung (formal notice)",
        paragraphs: [
          "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period expires 14 days from the day the contract was concluded.",
          `To exercise the right of withdrawal, you must inform ${IMPRESSUM_CONTACT.legalName}, ${IMPRESSUM_CONTACT.addressLines.join(", ")}, ${IMPRESSUM_CONTACT.email}, of your decision to withdraw from this contract by an unequivocal statement, for example a letter sent by post or an email. You may use the model withdrawal form, but it is not obligatory.`,
          "To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
          "If you withdraw from this contract, we shall reimburse all payments received from you without undue delay and not later than 14 days from the day on which we are informed about your decision. We will use the same means of payment as you used for the initial transaction, and you will not incur any fees as a result of the reimbursement.",
        ],
      },
    ]
  : [];

export const TRUST_PAGES = [
  {
    slug: "privacy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    metaTitle: "Privacy Policy · Dictivo",
    metaDescription:
      "How Dictivo handles Local dictation, optional Cloud Fast uploads, licensing, support, and customer data.",
    lede:
      "Dictivo is built around a simple rule: Local dictation should stay local, and Cloud Fast should be an explicit choice.",
    lastModified: LEGAL_LASTMOD,
    relatedLinks: [
      { label: "Where dictation audio goes", href: "/privacy/where-dictation-audio-goes/" },
      { label: "Local mode network test", href: "/privacy/local-dictation-network-test/" },
      { label: "Privacy proof", href: "/privacy-proof/" },
    ],
    sections: [
      {
        title: "Local mode",
        paragraphs: [
          "When you use Local mode, microphone audio is processed on your device. Dictivo does not upload Local recordings or Local transcripts for storage, analytics, or model training.",
          "Local transcripts, history, dictionary terms, snippets, settings, and selected local models are kept on the device where you use Dictivo. You can delete local history from the app.",
        ],
        bullets: [
          "No Dictivo account is required for Local dictation.",
          "Local mode does not send your audio to a transcription server.",
          "The free Local tier and the 14-day Local trial use the same Local privacy boundary.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast is optional. If you select Cloud Fast, Dictivo uploads the current recording so it can be transcribed faster. Use Cloud Fast only for recordings you are comfortable processing remotely.",
          "Dictionary terms, snippets, local history, and local settings stay on your device. The app receives the transcript and then applies local cleanup on your device.",
        ],
        bullets: [
          "Cloud Fast uploads only recordings you send through Cloud Fast.",
          "Cloud Fast is separate from Local mode.",
          "Your monthly Cloud Fast quota is tied to your active Cloud Fast subscription and device binding.",
        ],
      },
      {
        title: "Anonymous usage statistics",
        paragraphs: [
          "Dictivo can send anonymous, metadata-only usage statistics so setup problems and dead ends can be found. This is off by default. Nothing is sent unless you turn on \"Share anonymous usage statistics\" in Settings, and you can turn it off again at any time. The events describe what happened, not what you said: which setup step was reached, whether microphone access was granted or denied, how long a dictation ran, and how many words it produced. They never include audio, transcript text, file names, or application names.",
          "Separately from that setting, starting the free Local trial sends one anonymous activation ping so trials can be counted. It carries a hashed device identifier, the platform, and the app version, is sent once per install, and contains no audio, no text, and no personal data.",
          "Both go to Dictivo's own endpoint. There is no third-party analytics or advertising SDK in the desktop app. The website records anonymous, cookieless page views and download clicks for the same purpose.",
        ],
        bullets: [
          "Usage statistics are off by default and can be turned off again at any time in Settings.",
          "No dictation audio and no transcript text is ever included in either stream.",
          "The full desktop network surface is listed on the security page.",
        ],
      },
      {
        title: "Purchases, licenses, and support",
        paragraphs: [
          "When you buy Dictivo, the checkout provider handles payment details, billing address, tax calculation, receipts, and payment security. Dictivo receives the information needed to issue and validate the license.",
          "If you email support, we use your message, email address, order reference, and related troubleshooting details only to answer the request and operate the customer relationship.",
        ],
        bullets: [
          "Use support@dictivo.app for purchase, refund, activation, and support requests.",
          "License checks are used to activate purchases, refresh status, and protect paid features.",
          "Dictivo does not sell customer contact details.",
        ],
      },
    ],
  },
  {
    slug: "privacy/where-dictation-audio-goes",
    navLabel: "Audio path",
    title: "Where does Dictivo send dictation audio?",
    eyebrow: "Privacy answer",
    metaTitle: "Where Dictivo Dictation Audio Goes · Privacy Answer",
    metaDescription:
      "A direct answer to what happens to dictation audio in Dictivo Local mode and optional Cloud Fast mode.",
    lede:
      "Dictivo has two separate processing paths. Local mode keeps dictation audio on your device. Cloud Fast is optional and sends only the recording you choose for faster remote transcription.",
    lastModified: "2026-07-26",
    relatedLinks: [
      { label: "Run the Local mode network test", href: "/privacy/local-dictation-network-test/" },
      { label: "Read the full Privacy Policy", href: "/privacy/" },
      { label: "Compare privacy claims", href: "/privacy-proof/" },
    ],
    sections: [
      {
        title: "Short answer",
        paragraphs: [
          "In Local mode, Dictivo does not send your dictation audio to a transcription server. The app processes the recording on the device, then keeps the transcript, local history, dictionary terms, snippets, settings, and local model choices on that device.",
          "In Cloud Fast mode, Dictivo sends the selected recording for faster transcription. Use Cloud Fast only when speed matters more than keeping that recording fully local.",
        ],
        bullets: [
          "Local mode is the private default path for sensitive dictation.",
          "Cloud Fast is separate and optional.",
          "Switching modes changes the privacy boundary for that recording.",
        ],
      },
      {
        title: "What stays on the device",
        paragraphs: [
          "Local transcripts, dictation history, dictionary terms, snippets, local settings, and installed local models stay on the machine where you use Dictivo. Local dictation does not require a Dictivo account.",
          "This matters for daily working text: names, client details, research notes, prompts, drafts, support replies, medical notes you are allowed to process locally, legal notes you are allowed to process locally, and unfinished thoughts that should not become cloud transcription data by default.",
        ],
        bullets: [
          "Use Local mode for private drafts and sensitive notes.",
          "Delete local history from the app when you do not want to keep past transcripts.",
          "Keep operating system and device security settings aligned with your own compliance needs.",
        ],
      },
      {
        title: "What can use the network",
        paragraphs: [
          "Dictivo can still use the network for normal product operations such as update checks, model downloads, license actions, billing actions, support, and optional Cloud Fast. Those product operations are different from uploading a Local mode recording for transcription. Two of these are easy to overlook: anonymous usage statistics, which stay off unless you turn them on in Settings, and a one-time anonymous ping when the free trial produces its first result. Both carry metadata only, never audio or transcript text.",
          "If you need to verify the boundary yourself, run a Local dictation while a network monitor is open, then compare it with a Cloud Fast dictation. The two tests should not look the same.",
        ],
        bullets: [
          "Network activity does not automatically mean Local audio was uploaded.",
          "The key question is whether a Local dictation recording was sent for transcription.",
          "Unexpected Local mode activity should be reported with the app version, operating system, timestamp, and destination host.",
        ],
      },
    ],
    faqs: [
      ["Does Dictivo send audio to the cloud?", "Only when you use Cloud Fast. Local mode is designed to keep dictation audio on the device."],
      ["Does Local mode need a Dictivo account?", "No. Local dictation does not require a Dictivo account."],
      ["Are transcripts stored on Dictivo servers?", "Local transcripts are kept on the device. Cloud Fast returns the transcript for the recording you chose to process remotely."],
      ["Which mode should I use for sensitive dictation?", "Use Local mode when the recording contains sensitive, private, regulated, or unfinished working text."],
    ],
    locales: {
      de: {
        title: "Wohin sendet Dictivo Diktat-Audio?",
        eyebrow: "Datenschutzantwort",
        metaTitle: "Wohin Dictivo Diktat-Audio sendet · Datenschutzantwort",
        metaDescription:
          "Eine direkte Antwort darauf, was mit Diktat-Audio in Dictivo Local mode und im optionalen Cloud Fast mode passiert.",
        lede:
          "Dictivo hat zwei getrennte Verarbeitungswege. Local mode behält Diktat-Audio auf deinem Gerät. Cloud Fast ist optional und sendet nur die Aufnahme, die du für schnellere entfernte Transkription auswählst.",
        relatedLinks: [
          { label: "Local mode Netzwerktest ausführen", href: "/privacy/local-dictation-network-test/" },
          { label: "Vollständige Privacy Policy lesen", href: "/privacy/" },
          { label: "Datenschutzversprechen vergleichen", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Kurze Antwort",
            paragraphs: [
              "In Local mode sendet Dictivo dein Diktat-Audio nicht an einen Transkriptionsserver. Die App verarbeitet die Aufnahme auf dem Gerät und behält Transkript, lokalen Verlauf, Wörterbuchbegriffe, Textbausteine, Einstellungen und lokale Modellauswahl dort.",
              "In Cloud Fast mode sendet Dictivo die ausgewählte Aufnahme für schnellere Transkription. Nutze Cloud Fast nur, wenn Geschwindigkeit wichtiger ist als eine vollständig lokale Verarbeitung dieser Aufnahme.",
            ],
            bullets: [
              "Local mode ist der private Standardweg für sensible Diktate.",
              "Cloud Fast ist getrennt und optional.",
              "Der Wechsel des Modus verändert die Datenschutzgrenze für diese Aufnahme.",
            ],
          },
          {
            title: "Was auf dem Gerät bleibt",
            paragraphs: [
              "Lokale Transkripte, Diktatverlauf, Wörterbuchbegriffe, Textbausteine, lokale Einstellungen und installierte lokale Modelle bleiben auf dem Mac, auf dem du Dictivo nutzt. Lokales Diktat erfordert kein Dictivo-Konto.",
              "Das ist wichtig für tägliche Arbeitstexte: Namen, Kundendetails, Recherchenotizen, Prompts, Entwürfe, Supportantworten, lokal erlaubte medizinische Notizen, lokal erlaubte rechtliche Notizen und unfertige Gedanken, die nicht automatisch Cloud-Transkriptionsdaten werden sollen.",
            ],
            bullets: [
              "Nutze Local mode für private Entwürfe und sensible Notizen.",
              "Lösche lokalen Verlauf in der App, wenn du frühere Transkripte nicht behalten möchtest.",
              "Stimme Betriebssystem- und Gerätesicherheit mit deinen eigenen Compliance-Anforderungen ab.",
            ],
          },
          {
            title: "Was das Netzwerk nutzen kann",
            paragraphs: [
              "Dictivo kann das Netzwerk weiter für normale Produktvorgänge nutzen, etwa Update-Prüfungen, Modell-Downloads, Lizenzaktionen, Abrechnung, Support und optionales Cloud Fast. Diese Vorgänge sind etwas anderes als das Hochladen einer Local mode Aufnahme zur Transkription. Zwei davon werden leicht übersehen: anonyme Nutzungsstatistiken, die ausgeschaltet bleiben, bis du sie in den Einstellungen aktivierst, und ein einmaliger anonymer Ping, wenn die kostenlose Testphase ihr erstes Ergebnis liefert. Beide enthalten nur Metadaten, niemals Audio oder Transkripttext.",
              "Wenn du die Grenze selbst prüfen möchtest, führe ein Local-Diktat mit geöffnetem Netzwerkmonitor aus und vergleiche es danach mit einem Cloud Fast Diktat. Die beiden Tests sollten nicht gleich aussehen.",
            ],
            bullets: [
              "Netzwerkaktivität bedeutet nicht automatisch, dass Local-Audio hochgeladen wurde.",
              "Die Kernfrage ist, ob eine Local-Diktataufnahme zur Transkription gesendet wurde.",
              "Unerwartete Local mode Aktivität sollte mit App-Version, Betriebssystem, Zeitstempel und Zielhost gemeldet werden.",
            ],
          },
        ],
        faqs: [
          ["Sendet Dictivo Audio in die Cloud?", "Nur wenn du Cloud Fast nutzt. Local mode ist so ausgelegt, dass Diktat-Audio auf dem Gerät bleibt."],
          ["Braucht Local mode ein Dictivo-Konto?", "Nein. Lokales Diktat erfordert kein Dictivo-Konto."],
          ["Werden Transkripte auf Dictivo-Servern gespeichert?", "Lokale Transkripte bleiben auf dem Gerät. Cloud Fast gibt das Transkript für die Aufnahme zurück, die du entfernt verarbeiten wolltest."],
          ["Welchen Modus sollte ich für sensible Diktate nutzen?", "Nutze Local mode, wenn die Aufnahme sensible, private, regulierte oder unfertige Arbeitstexte enthält."],
        ],
      },
      fr: {
        title: "Où Dictivo envoie-t-il l'audio de dictée ?",
        eyebrow: "Réponse confidentialité",
        metaTitle: "Où va l'audio de dictée Dictivo · Confidentialité",
        metaDescription:
          "Une réponse directe sur le traitement de l'audio dans le mode Local de Dictivo et dans le mode optionnel Cloud Fast.",
        lede:
          "Dictivo utilise deux chemins de traitement séparés. Le mode Local garde l'audio de dictée sur votre appareil. Cloud Fast est optionnel et n'envoie que l'enregistrement que vous choisissez pour une transcription distante plus rapide.",
        relatedLinks: [
          { label: "Lancer le test réseau du mode Local", href: "/privacy/local-dictation-network-test/" },
          { label: "Lire la Privacy Policy complète", href: "/privacy/" },
          { label: "Comparer les promesses de confidentialité", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Réponse courte",
            paragraphs: [
              "En mode Local, Dictivo n'envoie pas votre audio de dictée à un serveur de transcription. L'app traite l'enregistrement sur l'appareil, puis y conserve le transcript, l'historique local, les termes du dictionnaire, les snippets, les réglages et les choix de modèles locaux.",
              "En mode Cloud Fast, Dictivo envoie l'enregistrement sélectionné pour une transcription plus rapide. Utilisez Cloud Fast seulement quand la vitesse compte plus que le traitement entièrement local de cet enregistrement.",
            ],
            bullets: [
              "Le mode Local est le chemin privé par défaut pour les dictées sensibles.",
              "Cloud Fast est séparé et optionnel.",
              "Changer de mode change la limite de confidentialité pour cet enregistrement.",
            ],
          },
          {
            title: "Ce qui reste sur l'appareil",
            paragraphs: [
              "Les transcripts locaux, l'historique de dictée, les termes du dictionnaire, les snippets, les réglages locaux et les modèles locaux installés restent sur la machine où vous utilisez Dictivo. La dictée locale ne demande pas de compte Dictivo.",
              "C'est important pour les textes de travail quotidiens : noms, détails client, notes de recherche, prompts, brouillons, réponses de support, notes médicales que vous pouvez traiter localement, notes juridiques que vous pouvez traiter localement et idées inachevées qui ne devraient pas devenir des données de transcription cloud par défaut.",
            ],
            bullets: [
              "Utilisez le mode Local pour les brouillons privés et les notes sensibles.",
              "Supprimez l'historique local dans l'app si vous ne voulez pas conserver d'anciens transcripts.",
              "Alignez la sécurité du système et de l'appareil avec vos propres besoins de conformité.",
            ],
          },
          {
            title: "Ce qui peut utiliser le réseau",
            paragraphs: [
              "Dictivo peut toujours utiliser le réseau pour les opérations produit normales comme les vérifications de mises à jour, les téléchargements de modèles, les actions de licence, la facturation, le support et Cloud Fast optionnel. Ces opérations sont différentes de l'envoi d'un enregistrement Local pour transcription. Deux d'entre elles passent facilement inaperçues : les statistiques d'utilisation anonymes, désactivées tant que vous ne les activez pas dans les Réglages, et un ping anonyme unique lorsque l'essai gratuit produit son premier résultat. Les deux ne contiennent que des métadonnées, jamais d'audio ni de texte de transcription.",
              "Pour vérifier cette limite vous-même, lancez une dictée Local avec un moniteur réseau ouvert, puis comparez-la avec une dictée Cloud Fast. Les deux tests ne devraient pas se ressembler.",
            ],
            bullets: [
              "Une activité réseau ne signifie pas automatiquement que l'audio Local a été envoyé.",
              "La question clé est de savoir si un enregistrement dicté en Local a été envoyé pour transcription.",
              "Toute activité Local inattendue doit être signalée avec la version de l'app, le système, l'horodatage et l'hôte distant.",
            ],
          },
        ],
        faqs: [
          ["Dictivo envoie-t-il l'audio dans le cloud ?", "Seulement si vous utilisez Cloud Fast. Le mode Local est conçu pour garder l'audio de dictée sur l'appareil."],
          ["Le mode Local nécessite-t-il un compte Dictivo ?", "Non. La dictée locale ne nécessite pas de compte Dictivo."],
          ["Les transcripts sont-ils stockés sur des serveurs Dictivo ?", "Les transcripts locaux restent sur l'appareil. Cloud Fast renvoie le transcript de l'enregistrement que vous avez choisi de traiter à distance."],
          ["Quel mode utiliser pour une dictée sensible ?", "Utilisez le mode Local si l'enregistrement contient un texte sensible, privé, réglementé ou encore inachevé."],
        ],
      },
      es: {
        title: "¿A dónde envía Dictivo el audio de dictado?",
        eyebrow: "Respuesta de privacidad",
        metaTitle: "A dónde va el audio de dictado de Dictivo · Privacidad",
        metaDescription:
          "Una respuesta directa sobre qué ocurre con el audio en el modo Local de Dictivo y en el modo opcional Cloud Fast.",
        lede:
          "Dictivo tiene dos rutas de procesamiento separadas. El modo Local mantiene el audio de dictado en tu dispositivo. Cloud Fast es opcional y solo envía la grabación que eliges para una transcripción remota más rápida.",
        relatedLinks: [
          { label: "Ejecutar la prueba de red del modo Local", href: "/privacy/local-dictation-network-test/" },
          { label: "Leer la Privacy Policy completa", href: "/privacy/" },
          { label: "Comparar promesas de privacidad", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Respuesta corta",
            paragraphs: [
              "En modo Local, Dictivo no envía tu audio de dictado a un servidor de transcripción. La app procesa la grabación en el dispositivo y conserva allí la transcripción, el historial local, los términos del diccionario, los snippets, los ajustes y las opciones de modelos locales.",
              "En modo Cloud Fast, Dictivo envía la grabación seleccionada para transcribirla más rápido. Usa Cloud Fast solo cuando la velocidad importe más que mantener esa grabación completamente local.",
            ],
            bullets: [
              "El modo Local es la ruta privada por defecto para dictados sensibles.",
              "Cloud Fast está separado y es opcional.",
              "Cambiar de modo cambia el límite de privacidad de esa grabación.",
            ],
          },
          {
            title: "Qué permanece en el dispositivo",
            paragraphs: [
              "Las transcripciones locales, el historial de dictado, los términos del diccionario, los snippets, los ajustes locales y los modelos locales instalados permanecen en la máquina donde usas Dictivo. El dictado local no requiere una cuenta de Dictivo.",
              "Esto importa para textos de trabajo diarios: nombres, detalles de clientes, notas de investigación, prompts, borradores, respuestas de soporte, notas médicas que puedes procesar localmente, notas legales que puedes procesar localmente e ideas sin terminar que no deberían convertirse en datos de transcripción en la nube por defecto.",
            ],
            bullets: [
              "Usa el modo Local para borradores privados y notas sensibles.",
              "Borra el historial local desde la app si no quieres conservar transcripciones anteriores.",
              "Alinea la seguridad del sistema y del dispositivo con tus propias necesidades de cumplimiento.",
            ],
          },
          {
            title: "Qué puede usar la red",
            paragraphs: [
              "Dictivo puede seguir usando la red para operaciones normales del producto, como comprobaciones de actualización, descargas de modelos, acciones de licencia, facturación, soporte y Cloud Fast opcional. Esas operaciones son distintas de subir una grabación Local para transcripción. Dos de ellas pasan desapercibidas con facilidad: las estadísticas de uso anónimas, que siguen desactivadas hasta que las actives en Ajustes, y un ping anónimo único cuando la prueba gratuita produce su primer resultado. Ambas contienen solo metadatos, nunca audio ni texto de transcripción.",
              "Si quieres verificar el límite por tu cuenta, realiza un dictado Local con un monitor de red abierto y compáralo después con un dictado Cloud Fast. Las dos pruebas no deberían verse iguales.",
            ],
            bullets: [
              "La actividad de red no significa automáticamente que se haya subido audio Local.",
              "La pregunta clave es si una grabación dictada en Local se envió para transcripción.",
              "La actividad inesperada en modo Local debe reportarse con versión de la app, sistema operativo, hora y host de destino.",
            ],
          },
        ],
        faqs: [
          ["¿Dictivo envía audio a la nube?", "Solo cuando usas Cloud Fast. El modo Local está diseñado para mantener el audio de dictado en el dispositivo."],
          ["¿El modo Local necesita una cuenta de Dictivo?", "No. El dictado local no requiere una cuenta de Dictivo."],
          ["¿Las transcripciones se guardan en servidores de Dictivo?", "Las transcripciones locales permanecen en el dispositivo. Cloud Fast devuelve la transcripción de la grabación que elegiste procesar de forma remota."],
          ["¿Qué modo debo usar para dictado sensible?", "Usa el modo Local cuando la grabación contenga texto sensible, privado, regulado o trabajo sin terminar."],
        ],
      },
      it: {
        title: "Dove invia Dictivo l'audio della dettatura?",
        eyebrow: "Risposta privacy",
        metaTitle: "Dove va l'audio di dettatura di Dictivo · Privacy",
        metaDescription:
          "Una risposta diretta su cosa accade all'audio nel Local mode di Dictivo e nel Cloud Fast opzionale.",
        lede:
          "Dictivo ha due percorsi di elaborazione separati. Local mode mantiene l'audio della dettatura sul dispositivo. Cloud Fast è opzionale e invia solo la registrazione che scegli per una trascrizione remota più rapida.",
        relatedLinks: [
          { label: "Esegui il test di rete del Local mode", href: "/privacy/local-dictation-network-test/" },
          { label: "Leggi la Privacy Policy completa", href: "/privacy/" },
          { label: "Confronta le promesse sulla privacy", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Risposta breve",
            paragraphs: [
              "In Local mode, Dictivo non invia l'audio della dettatura a un server di trascrizione. L'app elabora la registrazione sul dispositivo e conserva lì trascrizione, cronologia locale, termini del dizionario, snippet, impostazioni e scelte dei modelli locali.",
              "In Cloud Fast mode, Dictivo invia la registrazione selezionata per una trascrizione più veloce. Usa Cloud Fast solo quando la velocità conta più del mantenere quella registrazione completamente locale.",
            ],
            bullets: [
              "Local mode è il percorso privato predefinito per dettature sensibili.",
              "Cloud Fast è separato e opzionale.",
              "Cambiare modalità cambia il confine di privacy per quella registrazione.",
            ],
          },
          {
            title: "Cosa resta sul dispositivo",
            paragraphs: [
              "Trascrizioni locali, cronologia di dettatura, termini del dizionario, snippet, impostazioni locali e modelli locali installati restano sulla macchina dove usi Dictivo. La dettatura locale non richiede un account Dictivo.",
              "Questo conta per testi di lavoro quotidiani: nomi, dettagli dei clienti, note di ricerca, prompt, bozze, risposte di supporto, note mediche che puoi elaborare localmente, note legali che puoi elaborare localmente e pensieri non finiti che non dovrebbero diventare dati di trascrizione cloud per impostazione predefinita.",
            ],
            bullets: [
              "Usa Local mode per bozze private e note sensibili.",
              "Elimina la cronologia locale dall'app se non vuoi conservare vecchie trascrizioni.",
              "Allinea la sicurezza del sistema e del dispositivo alle tue esigenze di conformità.",
            ],
          },
          {
            title: "Cosa può usare la rete",
            paragraphs: [
              "Dictivo può comunque usare la rete per normali operazioni del prodotto come controlli aggiornamenti, download dei modelli, azioni di licenza, fatturazione, supporto e Cloud Fast opzionale. Queste operazioni sono diverse dal caricamento di una registrazione Local per trascrizione. Due di queste sfuggono facilmente: le statistiche d'uso anonime, che restano disattivate finché non le attivi nelle Impostazioni, e un ping anonimo una tantum quando la prova gratuita produce il primo risultato. Entrambe contengono solo metadati, mai audio né testo del trascritto.",
              "Se vuoi verificare il confine da solo, esegui una dettatura Local con un monitor di rete aperto e poi confrontala con una dettatura Cloud Fast. I due test non dovrebbero apparire uguali.",
            ],
            bullets: [
              "L'attività di rete non significa automaticamente che l'audio Local sia stato caricato.",
              "La domanda chiave è se una registrazione dettata in Local sia stata inviata per la trascrizione.",
              "Un'attività inattesa in Local mode va segnalata con versione dell'app, sistema operativo, orario e host di destinazione.",
            ],
          },
        ],
        faqs: [
          ["Dictivo invia audio al cloud?", "Solo quando usi Cloud Fast. Local mode è progettato per mantenere l'audio della dettatura sul dispositivo."],
          ["Local mode richiede un account Dictivo?", "No. La dettatura locale non richiede un account Dictivo."],
          ["Le trascrizioni sono salvate su server Dictivo?", "Le trascrizioni locali restano sul dispositivo. Cloud Fast restituisce la trascrizione della registrazione che hai scelto di elaborare da remoto."],
          ["Quale modalità usare per dettature sensibili?", "Usa Local mode quando la registrazione contiene testo sensibile, privato, regolamentato o lavoro non finito."],
        ],
      },
      nl: {
        title: "Waar stuurt Dictivo dicteeraudio naartoe?",
        eyebrow: "Privacyantwoord",
        metaTitle: "Waar Dictivo dicteeraudio naartoe stuurt · Privacy",
        metaDescription:
          "Een direct antwoord op wat er gebeurt met audio in Dictivo Local mode en optionele Cloud Fast.",
        lede:
          "Dictivo heeft twee gescheiden verwerkingspaden. Local mode houdt dicteeraudio op je apparaat. Cloud Fast is optioneel en verstuurt alleen de opname die je kiest voor snellere externe transcriptie.",
        relatedLinks: [
          { label: "Voer de Local mode netwerktest uit", href: "/privacy/local-dictation-network-test/" },
          { label: "Lees de volledige Privacy Policy", href: "/privacy/" },
          { label: "Vergelijk privacyclaims", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Kort antwoord",
            paragraphs: [
              "In Local mode stuurt Dictivo je dicteeraudio niet naar een transcriptieserver. De app verwerkt de opname op het apparaat en bewaart transcript, lokale geschiedenis, woordenboektermen, snippets, instellingen en lokale modelkeuzes daar.",
              "In Cloud Fast mode stuurt Dictivo de geselecteerde opname voor snellere transcriptie. Gebruik Cloud Fast alleen wanneer snelheid belangrijker is dan die opname volledig lokaal houden.",
            ],
            bullets: [
              "Local mode is het private standaardpad voor gevoelige dictaten.",
              "Cloud Fast is gescheiden en optioneel.",
              "Van modus wisselen verandert de privacygrens voor die opname.",
            ],
          },
          {
            title: "Wat op het apparaat blijft",
            paragraphs: [
              "Lokale transcripten, dicteergeschiedenis, woordenboektermen, snippets, lokale instellingen en geïnstalleerde lokale modellen blijven op de machine waarop je Dictivo gebruikt. Lokaal dicteren vereist geen Dictivo-account.",
              "Dit is belangrijk voor dagelijkse werktekst: namen, klantdetails, onderzoeksnotities, prompts, concepten, supportantwoorden, medische notities die je lokaal mag verwerken, juridische notities die je lokaal mag verwerken en onafgemaakte gedachten die niet standaard cloudtranscriptiedata moeten worden.",
            ],
            bullets: [
              "Gebruik Local mode voor private concepten en gevoelige notities.",
              "Verwijder lokale geschiedenis in de app als je eerdere transcripten niet wilt bewaren.",
              "Stem systeem- en apparaatbeveiliging af op je eigen compliance-eisen.",
            ],
          },
          {
            title: "Wat het netwerk kan gebruiken",
            paragraphs: [
              "Dictivo kan het netwerk nog steeds gebruiken voor normale productacties zoals updatechecks, modeldownloads, licentieacties, facturering, support en optionele Cloud Fast. Die acties zijn anders dan het uploaden van een Local opname voor transcriptie. Twee daarvan worden makkelijk over het hoofd gezien: anonieme gebruiksstatistieken, die uit blijven tot je ze in Instellingen aanzet, en een eenmalige anonieme ping wanneer de gratis proefperiode haar eerste resultaat oplevert. Beide bevatten alleen metadata, nooit audio of transcripttekst.",
              "Wil je de grens zelf verifiëren, voer dan een Local dictaat uit met een netwerkmonitor open en vergelijk dat daarna met een Cloud Fast dictaat. De twee tests zouden er niet hetzelfde uit moeten zien.",
            ],
            bullets: [
              "Netwerkactiviteit betekent niet automatisch dat Local audio is geüpload.",
              "De kernvraag is of een Local dicteeropname is verstuurd voor transcriptie.",
              "Onverwachte Local mode activiteit moet worden gemeld met appversie, besturingssysteem, tijdstip en doelhost.",
            ],
          },
        ],
        faqs: [
          ["Stuurt Dictivo audio naar de cloud?", "Alleen wanneer je Cloud Fast gebruikt. Local mode is ontworpen om dicteeraudio op het apparaat te houden."],
          ["Heeft Local mode een Dictivo-account nodig?", "Nee. Lokaal dicteren vereist geen Dictivo-account."],
          ["Worden transcripten opgeslagen op Dictivo-servers?", "Lokale transcripten blijven op het apparaat. Cloud Fast geeft het transcript terug van de opname die je extern wilde verwerken."],
          ["Welke modus moet ik gebruiken voor gevoelige dictatie?", "Gebruik Local mode wanneer de opname gevoelige, private, gereguleerde of onafgemaakte werktekst bevat."],
        ],
      },
      pt: {
        title: "Para onde o Dictivo envia o áudio do ditado?",
        eyebrow: "Resposta de privacidade",
        metaTitle: "Para onde vai o áudio de ditado do Dictivo · Privacidade",
        metaDescription:
          "Uma resposta direta sobre o que acontece com o áudio no modo Local do Dictivo e no modo opcional Cloud Fast.",
        lede:
          "O Dictivo tem dois caminhos de processamento separados. O modo Local mantém o áudio do ditado no seu dispositivo. O Cloud Fast é opcional e envia apenas a gravação que você escolhe para uma transcrição remota mais rápida.",
        relatedLinks: [
          { label: "Executar o teste de rede do modo Local", href: "/privacy/local-dictation-network-test/" },
          { label: "Ler a Privacy Policy completa", href: "/privacy/" },
          { label: "Comparar promessas de privacidade", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Resposta curta",
            paragraphs: [
              "No modo Local, o Dictivo não envia seu áudio de ditado para um servidor de transcrição. O app processa a gravação no dispositivo e mantém ali a transcrição, o histórico local, os termos do dicionário, os snippets, as configurações e as escolhas de modelos locais.",
              "No modo Cloud Fast, o Dictivo envia a gravação selecionada para transcrição mais rápida. Use o Cloud Fast apenas quando a velocidade importar mais do que manter essa gravação totalmente local.",
            ],
            bullets: [
              "O modo Local é o caminho privado padrão para ditados sensíveis.",
              "O Cloud Fast é separado e opcional.",
              "Trocar de modo muda o limite de privacidade dessa gravação.",
            ],
          },
          {
            title: "O que fica no dispositivo",
            paragraphs: [
              "Transcrições locais, histórico de ditado, termos do dicionário, snippets, configurações locais e modelos locais instalados ficam na máquina em que você usa o Dictivo. O ditado local não exige uma conta Dictivo.",
              "Isso importa para textos de trabalho diários: nomes, detalhes de clientes, notas de pesquisa, prompts, rascunhos, respostas de suporte, notas médicas que você pode processar localmente, notas jurídicas que você pode processar localmente e pensamentos inacabados que não deveriam virar dados de transcrição em nuvem por padrão.",
            ],
            bullets: [
              "Use o modo Local para rascunhos privados e notas sensíveis.",
              "Apague o histórico local no app quando não quiser manter transcrições antigas.",
              "Alinhe a segurança do sistema e do dispositivo às suas próprias necessidades de conformidade.",
            ],
          },
          {
            title: "O que pode usar a rede",
            paragraphs: [
              "O Dictivo ainda pode usar a rede para operações normais do produto, como verificações de atualização, downloads de modelos, ações de licença, cobrança, suporte e Cloud Fast opcional. Essas operações são diferentes de enviar uma gravação Local para transcrição. Duas delas passam facilmente despercebidas: as estatísticas de uso anônimas, que ficam desligadas até você ativá-las em Configurações, e um ping anônimo único quando o teste gratuito produz o primeiro resultado. Ambas contêm apenas metadados, nunca áudio nem texto de transcrição.",
              "Se quiser verificar esse limite, faça um ditado Local com um monitor de rede aberto e compare depois com um ditado Cloud Fast. Os dois testes não devem parecer iguais.",
            ],
            bullets: [
              "Atividade de rede não significa automaticamente que áudio Local foi enviado.",
              "A pergunta principal é se uma gravação ditada em Local foi enviada para transcrição.",
              "Atividade inesperada no modo Local deve ser relatada com versão do app, sistema operacional, horário e host de destino.",
            ],
          },
        ],
        faqs: [
          ["O Dictivo envia áudio para a nuvem?", "Somente quando você usa o Cloud Fast. O modo Local foi projetado para manter o áudio do ditado no dispositivo."],
          ["O modo Local precisa de uma conta Dictivo?", "Não. O ditado local não exige uma conta Dictivo."],
          ["As transcrições são armazenadas em servidores do Dictivo?", "As transcrições locais ficam no dispositivo. O Cloud Fast retorna a transcrição da gravação que você escolheu processar remotamente."],
          ["Qual modo devo usar para ditado sensível?", "Use o modo Local quando a gravação contiver texto sensível, privado, regulado ou trabalho inacabado."],
        ],
      },
      zh: {
        title: "Dictivo 会把听写音频发送到哪里？",
        eyebrow: "隐私回答",
        metaTitle: "Dictivo 听写音频流向 · 隐私回答",
        metaDescription:
          "直接说明 Dictivo Local 模式和可选 Cloud Fast 模式会如何处理听写音频。",
        lede:
          "Dictivo 有两条分开的处理路径。Local 模式把听写音频留在你的设备上。Cloud Fast 是可选模式，只会发送你选择加速远程转写的那段录音。",
        relatedLinks: [
          { label: "运行 Local 模式网络测试", href: "/privacy/local-dictation-network-test/" },
          { label: "阅读完整 Privacy Policy", href: "/privacy/" },
          { label: "比较隐私承诺", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "简短回答",
            paragraphs: [
              "在 Local 模式下，Dictivo 不会把你的听写音频发送到转写服务器。应用会在设备上处理录音，并把转写文本、本地历史、词典条目、片段、设置和本地模型选择留在这台设备上。",
              "在 Cloud Fast 模式下，Dictivo 会发送你选中的录音，以便更快完成远程转写。只有当速度比完全本地处理这段录音更重要时，才应使用 Cloud Fast。",
            ],
            bullets: [
              "Local 模式是敏感听写的默认私密路径。",
              "Cloud Fast 是分开的可选路径。",
              "切换模式会改变这段录音的隐私边界。",
            ],
          },
          {
            title: "哪些内容留在设备上",
            paragraphs: [
              "本地转写文本、听写历史、词典条目、片段、本地设置和已安装的本地模型，都会留在你使用 Dictivo 的那台机器上。本地听写不需要 Dictivo 账号。",
              "这对日常工作文本很重要：姓名、客户细节、研究笔记、prompt、草稿、支持回复、你可以本地处理的医疗笔记、你可以本地处理的法律笔记，以及不应该默认变成云端转写数据的未完成想法。",
            ],
            bullets: [
              "私密草稿和敏感笔记应使用 Local 模式。",
              "如果不想保留过去的转写文本，可以在应用内删除本地历史。",
              "请把系统和设备安全设置与你自己的合规需求保持一致。",
            ],
          },
          {
            title: "哪些操作可能使用网络",
            paragraphs: [
              "Dictivo 仍可能为正常产品操作使用网络，例如更新检查、模型下载、许可证操作、账单操作、支持请求和可选的 Cloud Fast。这些操作不同于把 Local 模式录音上传去转写。其中两项容易被忽略：匿名使用统计除非你在设置中开启，否则始终不发送；免费试用首次产生结果时会发送一次性匿名 ping。两者都只包含元数据，绝不包含音频或转写文本。",
              "如果你想自行验证边界，可以打开网络监控工具后执行一次 Local 听写，再和一次 Cloud Fast 听写对比。两次测试不应该看起来一样。",
            ],
            bullets: [
              "出现网络活动不自动等于 Local 音频被上传。",
              "关键问题是 Local 听写录音是否被发送去转写。",
              "如果 Local 模式出现意外活动，请带上应用版本、操作系统、时间戳和目标主机联系支持。",
            ],
          },
        ],
        faqs: [
          ["Dictivo 会把音频发送到云端吗？", "只有在你使用 Cloud Fast 时才会。Local 模式的设计目标是把听写音频留在设备上。"],
          ["Local 模式需要 Dictivo 账号吗？", "不需要。本地听写不需要 Dictivo 账号。"],
          ["转写文本会存储在 Dictivo 服务器上吗？", "本地转写文本会留在设备上。Cloud Fast 会返回你选择远程处理的那段录音的转写文本。"],
          ["敏感听写应该使用哪种模式？", "当录音包含敏感、私密、受监管或未完成的工作文本时，请使用 Local 模式。"],
        ],
      },
      ja: {
        title: "Dictivo は音声入力の音声をどこへ送信しますか？",
        eyebrow: "プライバシー回答",
        metaTitle: "Dictivo の音声入力データの行き先 · プライバシー",
        metaDescription:
          "Dictivo の Local モードと任意の Cloud Fast モードで、音声入力データがどう扱われるかを直接説明します。",
        lede:
          "Dictivo には分離された 2 つの処理経路があります。Local モードでは音声入力の音声をデバイス上に留めます。Cloud Fast は任意で、より速いリモート文字起こしのために選択した録音だけを送信します。",
        relatedLinks: [
          { label: "Local モードのネットワークテストを実行", href: "/privacy/local-dictation-network-test/" },
          { label: "Privacy Policy 全文を読む", href: "/privacy/" },
          { label: "プライバシーの説明を比較", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "短い回答",
            paragraphs: [
              "Local モードでは、Dictivo は音声入力の音声を文字起こしサーバーへ送信しません。アプリは録音をデバイス上で処理し、 transcript、ローカル履歴、辞書語句、スニペット、設定、ローカルモデルの選択をそのデバイスに保持します。",
              "Cloud Fast モードでは、Dictivo は選択された録音をより速い文字起こしのために送信します。その録音を完全にローカルに保つことより速度を優先する場合だけ Cloud Fast を使ってください。",
            ],
            bullets: [
              "Local モードは機密性の高い音声入力のための標準のプライベート経路です。",
              "Cloud Fast は分離された任意の経路です。",
              "モードを切り替えると、その録音のプライバシー境界が変わります。",
            ],
          },
          {
            title: "デバイスに残るもの",
            paragraphs: [
              "ローカル transcript、音声入力履歴、辞書語句、スニペット、ローカル設定、インストール済みのローカルモデルは、Dictivo を使うマシンに残ります。ローカル音声入力に Dictivo アカウントは不要です。",
              "これは日常の作業テキストで重要です。名前、顧客情報、調査メモ、プロンプト、下書き、サポート返信、ローカル処理が許可された医療メモ、ローカル処理が許可された法律メモ、未完成の考えなどは、標準でクラウド文字起こしデータになるべきではありません。",
            ],
            bullets: [
              "非公開の下書きや機密性の高いメモには Local モードを使ってください。",
              "過去の transcript を残したくない場合は、アプリ内でローカル履歴を削除してください。",
              "OS とデバイスのセキュリティ設定は、自分のコンプライアンス要件に合わせてください。",
            ],
          },
          {
            title: "ネットワークを使う可能性があるもの",
            paragraphs: [
              "Dictivo は、アップデート確認、モデルダウンロード、ライセンス操作、請求操作、サポート、任意の Cloud Fast など、通常の製品操作でネットワークを使うことがあります。これらは Local 録音を文字起こしのためにアップロードすることとは別です。そのうち 2 つは見落としやすいものです。匿名の使用統計は設定でオンにするまで送信されません。もう 1 つは、無料トライアルが最初の結果を出したときに一度だけ送られる匿名の ping です。どちらもメタデータのみで、音声や文字起こしテキストは含みません。",
              "境界を自分で確認するには、ネットワークモニターを開いた状態で Local 音声入力を実行し、その後 Cloud Fast 音声入力と比較してください。2 つのテストは同じ見え方にはならないはずです。",
            ],
            bullets: [
              "ネットワーク活動があるだけで Local 音声がアップロードされたとは限りません。",
              "重要なのは、Local 音声入力の録音が文字起こしのために送信されたかどうかです。",
              "Local モードで予期しない活動がある場合は、アプリ版、OS、時刻、接続先ホストを添えて連絡してください。",
            ],
          },
        ],
        faqs: [
          ["Dictivo は音声をクラウドへ送信しますか？", "Cloud Fast を使う場合だけです。Local モードは音声入力の音声をデバイスに留める設計です。"],
          ["Local モードに Dictivo アカウントは必要ですか？", "いいえ。ローカル音声入力に Dictivo アカウントは不要です。"],
          ["Transcript は Dictivo のサーバーに保存されますか？", "ローカル transcript はデバイスに残ります。Cloud Fast は、リモート処理を選んだ録音の transcript を返します。"],
          ["機密性の高い音声入力にはどのモードを使うべきですか？", "録音に機密、私的、規制対象、または未完成の作業テキストが含まれる場合は Local モードを使ってください。"],
        ],
      },
      ko: {
        title: "Dictivo는 받아쓰기 오디오를 어디로 보내나요?",
        eyebrow: "개인정보 답변",
        metaTitle: "Dictivo 받아쓰기 오디오의 처리 위치 · 개인정보",
        metaDescription:
          "Dictivo Local 모드와 선택형 Cloud Fast 모드에서 받아쓰기 오디오가 어떻게 처리되는지 직접 설명합니다.",
        lede:
          "Dictivo에는 분리된 두 처리 경로가 있습니다. Local 모드는 받아쓰기 오디오를 기기에 보관합니다. Cloud Fast는 선택 사항이며, 더 빠른 원격 전사를 위해 사용자가 선택한 녹음만 전송합니다.",
        relatedLinks: [
          { label: "Local 모드 네트워크 테스트 실행", href: "/privacy/local-dictation-network-test/" },
          { label: "전체 Privacy Policy 읽기", href: "/privacy/" },
          { label: "개인정보 약속 비교", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "짧은 답변",
            paragraphs: [
              "Local 모드에서 Dictivo는 받아쓰기 오디오를 전사 서버로 보내지 않습니다. 앱은 녹음을 기기에서 처리하고, transcript, 로컬 기록, 사전 용어, 스니펫, 설정, 로컬 모델 선택을 그 기기에 보관합니다.",
              "Cloud Fast 모드에서는 Dictivo가 선택한 녹음을 더 빠른 전사를 위해 전송합니다. 해당 녹음을 완전히 로컬로 유지하는 것보다 속도가 더 중요할 때만 Cloud Fast를 사용하세요.",
            ],
            bullets: [
              "Local 모드는 민감한 받아쓰기를 위한 기본 비공개 경로입니다.",
              "Cloud Fast는 분리된 선택 경로입니다.",
              "모드를 바꾸면 해당 녹음의 개인정보 경계도 바뀝니다.",
            ],
          },
          {
            title: "기기에 남는 것",
            paragraphs: [
              "로컬 transcript, 받아쓰기 기록, 사전 용어, 스니펫, 로컬 설정, 설치된 로컬 모델은 Dictivo를 사용하는 기기에 남습니다. 로컬 받아쓰기에 Dictivo 계정은 필요하지 않습니다.",
              "이는 일상 업무 텍스트에 중요합니다. 이름, 고객 세부 정보, 조사 메모, 프롬프트, 초안, 지원 답변, 로컬 처리가 허용된 의료 메모, 로컬 처리가 허용된 법률 메모, 아직 완성되지 않은 생각은 기본적으로 클라우드 전사 데이터가 되어서는 안 됩니다.",
            ],
            bullets: [
              "비공개 초안과 민감한 메모에는 Local 모드를 사용하세요.",
              "이전 transcript를 보관하고 싶지 않다면 앱에서 로컬 기록을 삭제하세요.",
              "운영체제와 기기 보안 설정은 사용자의 컴플라이언스 요구에 맞추세요.",
            ],
          },
          {
            title: "네트워크를 사용할 수 있는 경우",
            paragraphs: [
              "Dictivo는 업데이트 확인, 모델 다운로드, 라이선스 작업, 결제 작업, 지원, 선택형 Cloud Fast 같은 일반 제품 작업에 네트워크를 사용할 수 있습니다. 이는 Local 녹음을 전사를 위해 업로드하는 것과 다릅니다. 이 중 두 가지는 놓치기 쉽습니다. 익명 사용 통계는 설정에서 켜기 전까지 전송되지 않으며, 무료 체험이 첫 결과를 만들 때 일회성 익명 핑이 전송됩니다. 둘 다 메타데이터만 포함하며 오디오나 전사 텍스트는 포함하지 않습니다.",
              "경계를 직접 확인하려면 네트워크 모니터를 연 상태에서 Local 받아쓰기를 실행한 뒤 Cloud Fast 받아쓰기와 비교하세요. 두 테스트는 같아 보이지 않아야 합니다.",
            ],
            bullets: [
              "네트워크 활동이 있다고 해서 Local 오디오가 자동으로 업로드된 것은 아닙니다.",
              "핵심 질문은 Local 받아쓰기 녹음이 전사를 위해 전송되었는지입니다.",
              "Local 모드에서 예상치 못한 활동이 있으면 앱 버전, 운영체제, 시각, 대상 호스트를 포함해 문의하세요.",
            ],
          },
        ],
        faqs: [
          ["Dictivo는 오디오를 클라우드로 보내나요?", "Cloud Fast를 사용할 때만 보냅니다. Local 모드는 받아쓰기 오디오를 기기에 유지하도록 설계되었습니다."],
          ["Local 모드에 Dictivo 계정이 필요한가요?", "아니요. 로컬 받아쓰기에 Dictivo 계정은 필요하지 않습니다."],
          ["Transcript가 Dictivo 서버에 저장되나요?", "로컬 transcript는 기기에 남습니다. Cloud Fast는 사용자가 원격 처리를 선택한 녹음의 transcript를 반환합니다."],
          ["민감한 받아쓰기에는 어떤 모드를 써야 하나요?", "녹음에 민감하거나 사적인, 규제 대상 또는 미완성 업무 텍스트가 포함되면 Local 모드를 사용하세요."],
        ],
      },
    },
  },
  {
    slug: "privacy/local-dictation-network-test",
    navLabel: "Local network test",
    title: "How to verify Dictivo Local mode with a network monitor",
    eyebrow: "Privacy proof",
    metaTitle: "Dictivo Local Network Test · Privacy Proof",
    metaDescription:
      "A practical network-monitor checklist for verifying that Dictivo Local mode keeps dictation audio on the device.",
    lede:
      "Dictivo Local mode is designed so microphone audio is processed on your device. This page explains how to verify that boundary with a network monitor before using Dictivo for sensitive dictation.",
    lastModified: "2026-07-26",
    relatedLinks: [
      { label: "Where dictation audio goes", href: "/privacy/where-dictation-audio-goes/" },
      { label: "Read the full Privacy Policy", href: "/privacy/" },
      { label: "Compare privacy claims", href: "/privacy-proof/" },
    ],
    sections: [
      {
        title: "Short answer",
        paragraphs: [
          "In Local mode, Dictivo should not upload microphone audio or transcripts to a transcription service. Network activity you may still see is for product operations such as app updates, license actions, downloads, support, or optional Cloud Fast when you choose that mode.",
        ],
      },
      {
        title: "What to test",
        paragraphs: [
          "Use a network monitor such as Little Snitch, LuLu, a router log, or a packet capture tool. Start Dictivo, keep the app in Local mode, record a short test phrase, wait for the transcript, and inspect whether any new remote connection was opened during that Local dictation.",
          "Run the same check again after switching to Cloud Fast. That second test should look different because Cloud Fast is the mode that sends the selected recording for remote transcription.",
        ],
        bullets: [
          "Local mode: record, transcribe, and paste while watching for upload activity.",
          "Cloud Fast mode: expect a remote transcription request because you chose the speed path.",
          "Model downloads and update checks are separate from dictation upload behavior.",
        ],
      },
      {
        title: "Expected network surface",
        paragraphs: [
          "Dictivo does not promise that the desktop app never uses the network. The privacy claim is narrower and more useful: Local dictation should not send the recording or transcript to a transcription server.",
          "If your monitor shows activity, check whether it matches a visible product action: update check, model download, license or billing action, support, or Cloud Fast. If it appears during a Local dictation without any of those actions, contact support with the timestamp, app version, operating system, and destination host. Before you report anything, note two connections that also belong on that list: anonymous usage statistics, if you turned them on in Settings, and a one-time anonymous activation ping when the free trial produces its first result. Both go to api.dictivo.app and carry metadata only, never audio or transcript text.",
        ],
        bullets: [
          "Use Local mode for sensitive audio.",
          "Use Cloud Fast only for recordings you are comfortable processing remotely.",
          "Email support@dictivo.app if Local mode behavior does not match this page.",
        ],
      },
    ],
    faqs: [
      ["Does Dictivo Local mode upload audio?", "No. Local mode is designed to keep dictation audio on the device for transcription."],
      ["Why might I still see Dictivo use the network?", "The app can use the network for updates, model downloads, license or billing actions, support, and optional Cloud Fast. Anonymous usage statistics, if you turned them on, and a one-time trial activation ping also use it; both are metadata only."],
      ["Should Cloud Fast show network activity?", "Yes. Cloud Fast is the optional speed mode that sends the selected recording for remote transcription."],
      ["What should I do if a Local dictation opens an unexpected connection?", "Record the timestamp, app version, operating system, and destination host, then email support@dictivo.app so the discrepancy can be investigated."],
    ],
    locales: {
      de: {
        title: "So prüfst du Dictivo Local mode mit einem Netzwerkmonitor",
        eyebrow: "Datenschutznachweis",
        metaTitle: "Dictivo Local Netzwerktest · Datenschutznachweis",
        metaDescription:
          "Eine praktische Netzwerkmonitor-Checkliste, um zu prüfen, dass Dictivo Local mode Diktat-Audio auf dem Gerät behält.",
        lede:
          "Dictivo Local mode ist so ausgelegt, dass Mikrofon-Audio auf deinem Gerät verarbeitet wird. Diese Seite erklärt, wie du diese Grenze mit einem Netzwerkmonitor prüfst, bevor du Dictivo für sensible Diktate nutzt.",
        relatedLinks: [
          { label: "Wohin Diktat-Audio geht", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Privacy Policy lesen", href: "/privacy/" },
          { label: "Datenschutzversprechen vergleichen", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Kurze Antwort",
            paragraphs: [
              "In Local mode sollte Dictivo kein Mikrofon-Audio und keine Transkripte an einen Transkriptionsdienst hochladen. Netzwerkaktivität, die du trotzdem sehen kannst, gehört zu Produktvorgängen wie Updates, Lizenzaktionen, Downloads, Support oder optionalem Cloud Fast.",
            ],
          },
          {
            title: "Was du testen solltest",
            paragraphs: [
              "Nutze einen Netzwerkmonitor wie Little Snitch, LuLu, ein Router-Protokoll oder ein Packet-Capture-Werkzeug. Starte Dictivo, bleibe in Local mode, nimm einen kurzen Testsatz auf, warte auf das Transkript und prüfe, ob während dieses Local-Diktats eine neue entfernte Verbindung geöffnet wurde.",
              "Wiederhole denselben Test danach mit Cloud Fast. Dieser zweite Test sollte anders aussehen, weil Cloud Fast die ausgewählte Aufnahme für entfernte Transkription sendet.",
            ],
            bullets: [
              "Local mode: aufnehmen, transkribieren und einfügen, während du Upload-Aktivität beobachtest.",
              "Cloud Fast mode: eine entfernte Transkriptionsanfrage ist zu erwarten, weil du den schnellen Weg gewählt hast.",
              "Modell-Downloads und Update-Prüfungen sind getrennt vom Upload-Verhalten beim Diktieren.",
            ],
          },
          {
            title: "Erwartete Netzwerkfläche",
            paragraphs: [
              "Dictivo verspricht nicht, dass die Desktop-App niemals Netzwerk nutzt. Die Datenschutzbehauptung ist enger und nützlicher: Local-Diktat sollte die Aufnahme oder das Transkript nicht an einen Transkriptionsserver senden.",
              "Wenn dein Monitor Aktivität zeigt, prüfe, ob sie zu einer sichtbaren Produktaktion passt: Update-Prüfung, Modell-Download, Lizenz- oder Abrechnungsaktion, Support oder Cloud Fast. Wenn sie während eines Local-Diktats ohne solche Aktion erscheint, kontaktiere den Support mit Zeitstempel, App-Version, Betriebssystem und Zielhost. Bevor du etwas meldest: Zwei weitere Verbindungen gehören ebenfalls auf diese Liste — anonyme Nutzungsstatistiken, falls du sie in den Einstellungen aktiviert hast, und ein einmaliger anonymer Aktivierungs-Ping, wenn die kostenlose Testphase ihr erstes Ergebnis liefert. Beide gehen an api.dictivo.app und enthalten nur Metadaten, niemals Audio oder Transkripttext.",
            ],
            bullets: [
              "Nutze Local mode für sensibles Audio.",
              "Nutze Cloud Fast nur für Aufnahmen, die du entfernt verarbeiten möchtest.",
              "Schreibe an support@dictivo.app, wenn Local mode nicht zu dieser Seite passt.",
            ],
          },
        ],
        faqs: [
          ["Lädt Dictivo Local mode Audio hoch?", "Nein. Local mode ist so ausgelegt, dass Diktat-Audio zur Transkription auf dem Gerät bleibt."],
          ["Warum kann Dictivo trotzdem das Netzwerk nutzen?", "Die App kann das Netzwerk für Updates, Modell-Downloads, Lizenz- oder Abrechnungsaktionen, Support und optionales Cloud Fast nutzen. Auch anonyme Nutzungsstatistiken, falls aktiviert, und ein einmaliger Trial-Aktivierungs-Ping nutzen es; beide enthalten nur Metadaten."],
          ["Sollte Cloud Fast Netzwerkaktivität zeigen?", "Ja. Cloud Fast ist der optionale Schnellmodus, der die ausgewählte Aufnahme für entfernte Transkription sendet."],
          ["Was tun, wenn Local-Diktat eine unerwartete Verbindung öffnet?", "Notiere Zeitstempel, App-Version, Betriebssystem und Zielhost und schreibe an support@dictivo.app, damit die Abweichung geprüft werden kann."],
        ],
      },
      fr: {
        title: "Comment vérifier le mode Local de Dictivo avec un moniteur réseau",
        eyebrow: "Preuve de confidentialité",
        metaTitle: "Test réseau Dictivo Local · Preuve de confidentialité",
        metaDescription:
          "Une checklist pratique pour vérifier avec un moniteur réseau que le mode Local de Dictivo garde l'audio sur l'appareil.",
        lede:
          "Le mode Local de Dictivo est conçu pour traiter l'audio du microphone sur votre appareil. Cette page explique comment vérifier cette limite avec un moniteur réseau avant d'utiliser Dictivo pour une dictée sensible.",
        relatedLinks: [
          { label: "Où va l'audio de dictée", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Lire la Privacy Policy", href: "/privacy/" },
          { label: "Comparer les promesses de confidentialité", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Réponse courte",
            paragraphs: [
              "En mode Local, Dictivo ne devrait pas téléverser l'audio du microphone ni les transcripts vers un service de transcription. L'activité réseau que vous pouvez encore voir concerne des opérations produit comme les mises à jour, les licences, les téléchargements, le support ou Cloud Fast optionnel.",
            ],
          },
          {
            title: "Ce qu'il faut tester",
            paragraphs: [
              "Utilisez un moniteur réseau comme Little Snitch, LuLu, un journal de routeur ou un outil de capture de paquets. Lancez Dictivo, gardez le mode Local, enregistrez une courte phrase de test, attendez le transcript et vérifiez si une nouvelle connexion distante s'est ouverte pendant cette dictée Local.",
              "Refaites ensuite le même test avec Cloud Fast. Ce second test devrait être différent, car Cloud Fast envoie l'enregistrement sélectionné pour une transcription distante.",
            ],
            bullets: [
              "Mode Local : enregistrer, transcrire et coller tout en surveillant l'activité d'envoi.",
              "Mode Cloud Fast : attendez-vous à une requête de transcription distante, car vous avez choisi le chemin rapide.",
              "Les téléchargements de modèles et les vérifications de mises à jour sont séparés du comportement d'envoi de la dictée.",
            ],
          },
          {
            title: "Surface réseau attendue",
            paragraphs: [
              "Dictivo ne promet pas que l'app de bureau n'utilise jamais le réseau. La promesse de confidentialité est plus précise : la dictée Local ne devrait pas envoyer l'enregistrement ou le transcript à un serveur de transcription.",
              "Si votre moniteur montre une activité, vérifiez si elle correspond à une action visible : mise à jour, téléchargement de modèle, licence, facturation, support ou Cloud Fast. Si elle apparaît pendant une dictée Local sans ces actions, contactez le support avec l'heure, la version de l'app, le système et l'hôte distant. Avant de signaler quoi que ce soit, notez deux connexions qui font aussi partie de cette liste : les statistiques d'utilisation anonymes, si vous les avez activées dans les Réglages, et un ping d'activation anonyme unique lorsque l'essai gratuit produit son premier résultat. Les deux vont vers api.dictivo.app et ne contiennent que des métadonnées, jamais d'audio ni de texte de transcription.",
            ],
            bullets: [
              "Utilisez le mode Local pour l'audio sensible.",
              "Utilisez Cloud Fast seulement pour les enregistrements que vous acceptez de traiter à distance.",
              "Écrivez à support@dictivo.app si le mode Local ne correspond pas à cette page.",
            ],
          },
        ],
        faqs: [
          ["Le mode Local de Dictivo téléverse-t-il l'audio ?", "Non. Le mode Local est conçu pour garder l'audio de dictée sur l'appareil pour la transcription."],
          ["Pourquoi Dictivo peut-il quand même utiliser le réseau ?", "L'app peut utiliser le réseau pour les mises à jour, téléchargements de modèles, licences, facturation, support et Cloud Fast optionnel. Les statistiques d'utilisation anonymes, si vous les avez activées, et un ping d'activation d'essai unique l'utilisent aussi ; les deux ne contiennent que des métadonnées."],
          ["Cloud Fast doit-il montrer une activité réseau ?", "Oui. Cloud Fast est le mode rapide optionnel qui envoie l'enregistrement sélectionné pour transcription distante."],
          ["Que faire si une dictée Local ouvre une connexion inattendue ?", "Notez l'heure, la version de l'app, le système et l'hôte distant, puis écrivez à support@dictivo.app pour investigation."],
        ],
      },
      es: {
        title: "Cómo verificar el modo Local de Dictivo con un monitor de red",
        eyebrow: "Prueba de privacidad",
        metaTitle: "Prueba de red de Dictivo Local · Privacidad",
        metaDescription:
          "Una checklist práctica para verificar con un monitor de red que el modo Local de Dictivo mantiene el audio en el dispositivo.",
        lede:
          "El modo Local de Dictivo está diseñado para procesar el audio del micrófono en tu dispositivo. Esta página explica cómo verificar ese límite con un monitor de red antes de usar Dictivo para dictado sensible.",
        relatedLinks: [
          { label: "A dónde va el audio de dictado", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Leer la Privacy Policy", href: "/privacy/" },
          { label: "Comparar promesas de privacidad", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Respuesta corta",
            paragraphs: [
              "En modo Local, Dictivo no debería subir audio del micrófono ni transcripciones a un servicio de transcripción. La actividad de red que todavía puedes ver suele corresponder a operaciones del producto como actualizaciones, licencias, descargas, soporte o Cloud Fast opcional.",
            ],
          },
          {
            title: "Qué probar",
            paragraphs: [
              "Usa un monitor de red como Little Snitch, LuLu, un registro del router o una herramienta de captura de paquetes. Inicia Dictivo, mantén el modo Local, graba una frase breve de prueba, espera la transcripción y revisa si se abrió alguna conexión remota nueva durante ese dictado Local.",
              "Repite después la misma prueba con Cloud Fast. Esa segunda prueba debería verse distinta porque Cloud Fast envía la grabación seleccionada para transcripción remota.",
            ],
            bullets: [
              "Modo Local: grabar, transcribir y pegar mientras observas actividad de subida.",
              "Modo Cloud Fast: espera una solicitud de transcripción remota porque elegiste la ruta rápida.",
              "Las descargas de modelos y las comprobaciones de actualización son distintas del comportamiento de subida durante el dictado.",
            ],
          },
          {
            title: "Superficie de red esperada",
            paragraphs: [
              "Dictivo no promete que la app de escritorio nunca use la red. La afirmación de privacidad es más estrecha y útil: el dictado Local no debería enviar la grabación ni la transcripción a un servidor de transcripción.",
              "Si tu monitor muestra actividad, comprueba si coincide con una acción visible: actualización, descarga de modelo, licencia, facturación, soporte o Cloud Fast. Si aparece durante un dictado Local sin esas acciones, contacta a soporte con hora, versión de la app, sistema operativo y host de destino. Antes de informar de nada, ten en cuenta dos conexiones que también forman parte de esa lista: las estadísticas de uso anónimas, si las activaste en Ajustes, y un ping de activación anónimo único cuando la prueba gratuita produce su primer resultado. Ambas van a api.dictivo.app y contienen solo metadatos, nunca audio ni texto de transcripción.",
            ],
            bullets: [
              "Usa el modo Local para audio sensible.",
              "Usa Cloud Fast solo para grabaciones que aceptas procesar de forma remota.",
              "Escribe a support@dictivo.app si el modo Local no coincide con esta página.",
            ],
          },
        ],
        faqs: [
          ["¿El modo Local de Dictivo sube audio?", "No. El modo Local está diseñado para mantener el audio de dictado en el dispositivo para la transcripción."],
          ["¿Por qué Dictivo podría usar la red?", "La app puede usar la red para actualizaciones, descargas de modelos, licencias, facturación, soporte y Cloud Fast opcional. Las estadísticas de uso anónimas, si las activaste, y un ping único de activación de la prueba también la usan; ambas son solo metadatos."],
          ["¿Cloud Fast debería mostrar actividad de red?", "Sí. Cloud Fast es el modo rápido opcional que envía la grabación seleccionada para transcripción remota."],
          ["¿Qué hago si un dictado Local abre una conexión inesperada?", "Registra la hora, versión de la app, sistema operativo y host de destino, y escribe a support@dictivo.app para investigarlo."],
        ],
      },
      it: {
        title: "Come verificare Dictivo Local mode con un monitor di rete",
        eyebrow: "Prova privacy",
        metaTitle: "Test rete Dictivo Local · Prova privacy",
        metaDescription:
          "Una checklist pratica per verificare con un monitor di rete che Dictivo Local mode mantenga l'audio sul dispositivo.",
        lede:
          "Dictivo Local mode è progettato per elaborare l'audio del microfono sul dispositivo. Questa pagina spiega come verificare questo confine con un monitor di rete prima di usare Dictivo per dettature sensibili.",
        relatedLinks: [
          { label: "Dove va l'audio della dettatura", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Leggi la Privacy Policy", href: "/privacy/" },
          { label: "Confronta le promesse sulla privacy", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Risposta breve",
            paragraphs: [
              "In Local mode, Dictivo non dovrebbe caricare audio del microfono o trascrizioni verso un servizio di trascrizione. L'attività di rete che puoi ancora vedere riguarda operazioni del prodotto come aggiornamenti, licenze, download, supporto o Cloud Fast opzionale.",
            ],
          },
          {
            title: "Cosa testare",
            paragraphs: [
              "Usa un monitor di rete come Little Snitch, LuLu, un log del router o uno strumento di packet capture. Avvia Dictivo, resta in Local mode, registra una breve frase di test, attendi la trascrizione e controlla se durante quella dettatura Local si è aperta una nuova connessione remota.",
              "Ripeti poi lo stesso test con Cloud Fast. Il secondo test dovrebbe apparire diverso perché Cloud Fast invia la registrazione selezionata per trascrizione remota.",
            ],
            bullets: [
              "Local mode: registra, trascrivi e incolla osservando eventuale attività di upload.",
              "Cloud Fast mode: aspettati una richiesta di trascrizione remota perché hai scelto il percorso veloce.",
              "Download dei modelli e controlli aggiornamenti sono separati dal comportamento di upload della dettatura.",
            ],
          },
          {
            title: "Superficie di rete prevista",
            paragraphs: [
              "Dictivo non promette che l'app desktop non usi mai la rete. La promessa privacy è più precisa: la dettatura Local non dovrebbe inviare registrazione o trascrizione a un server di trascrizione.",
              "Se il monitor mostra attività, verifica se corrisponde a un'azione visibile: aggiornamento, download modello, licenza, fatturazione, supporto o Cloud Fast. Se compare durante una dettatura Local senza queste azioni, contatta il supporto con orario, versione app, sistema operativo e host di destinazione. Prima di segnalare qualcosa, considera due connessioni che appartengono anch'esse a quell'elenco: le statistiche d'uso anonime, se le hai attivate nelle Impostazioni, e un ping di attivazione anonimo una tantum quando la prova gratuita produce il primo risultato. Entrambe vanno a api.dictivo.app e contengono solo metadati, mai audio né testo del trascritto.",
            ],
            bullets: [
              "Usa Local mode per audio sensibile.",
              "Usa Cloud Fast solo per registrazioni che accetti di elaborare da remoto.",
              "Scrivi a support@dictivo.app se Local mode non corrisponde a questa pagina.",
            ],
          },
        ],
        faqs: [
          ["Dictivo Local mode carica audio?", "No. Local mode è progettato per mantenere l'audio della dettatura sul dispositivo per la trascrizione."],
          ["Perché Dictivo potrebbe usare la rete?", "L'app può usare la rete per aggiornamenti, download dei modelli, licenze, fatturazione, supporto e Cloud Fast opzionale. Anche le statistiche d'uso anonime, se attivate, e un ping di attivazione della prova una tantum la usano; entrambi contengono solo metadati."],
          ["Cloud Fast dovrebbe mostrare attività di rete?", "Sì. Cloud Fast è la modalità veloce opzionale che invia la registrazione selezionata per trascrizione remota."],
          ["Cosa fare se una dettatura Local apre una connessione inattesa?", "Registra orario, versione app, sistema operativo e host di destinazione, poi scrivi a support@dictivo.app per la verifica."],
        ],
      },
      nl: {
        title: "Dictivo Local mode controleren met een netwerkmonitor",
        eyebrow: "Privacybewijs",
        metaTitle: "Dictivo Local netwerktest · Privacybewijs",
        metaDescription:
          "Een praktische checklist om met een netwerkmonitor te controleren dat Dictivo Local mode dicteeraudio op het apparaat houdt.",
        lede:
          "Dictivo Local mode is ontworpen om microfoonaudio op je apparaat te verwerken. Deze pagina legt uit hoe je die grens controleert met een netwerkmonitor voordat je Dictivo gebruikt voor gevoelige dictatie.",
        relatedLinks: [
          { label: "Waar dicteeraudio naartoe gaat", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Lees de Privacy Policy", href: "/privacy/" },
          { label: "Vergelijk privacyclaims", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Kort antwoord",
            paragraphs: [
              "In Local mode zou Dictivo geen microfoonaudio of transcripten naar een transcriptiedienst moeten uploaden. Netwerkactiviteit die je toch ziet, kan horen bij productacties zoals updates, licenties, downloads, support of optionele Cloud Fast.",
            ],
          },
          {
            title: "Wat je test",
            paragraphs: [
              "Gebruik een netwerkmonitor zoals Little Snitch, LuLu, een routerlog of een packet-capture-tool. Start Dictivo, blijf in Local mode, neem een korte testzin op, wacht op het transcript en controleer of er tijdens dat Local dictaat een nieuwe externe verbinding is geopend.",
              "Herhaal daarna dezelfde test met Cloud Fast. Die tweede test zou er anders uit moeten zien, omdat Cloud Fast de geselecteerde opname verstuurt voor externe transcriptie.",
            ],
            bullets: [
              "Local mode: opnemen, transcriberen en plakken terwijl je uploadactiviteit bekijkt.",
              "Cloud Fast mode: verwacht een externe transcriptieaanvraag omdat je het snelle pad koos.",
              "Modeldownloads en updatechecks staan los van uploadgedrag tijdens dicteren.",
            ],
          },
          {
            title: "Verwacht netwerkoppervlak",
            paragraphs: [
              "Dictivo belooft niet dat de desktopapp nooit het netwerk gebruikt. De privacyclaim is smaller en nuttiger: Local dictation zou de opname of het transcript niet naar een transcriptieserver moeten sturen.",
              "Als je monitor activiteit toont, controleer dan of die past bij een zichtbare productactie: updatecheck, modeldownload, licentie of facturering, support of Cloud Fast. Verschijnt die activiteit tijdens een Local dictaat zonder zo'n actie, neem dan contact op met support met tijdstip, appversie, besturingssysteem en doelhost. Voordat je iets meldt: twee verbindingen horen ook in dat lijstje — anonieme gebruiksstatistieken, als je die in Instellingen hebt aangezet, en een eenmalige anonieme activatieping wanneer de gratis proefperiode haar eerste resultaat oplevert. Beide gaan naar api.dictivo.app en bevatten alleen metadata, nooit audio of transcripttekst.",
            ],
            bullets: [
              "Gebruik Local mode voor gevoelige audio.",
              "Gebruik Cloud Fast alleen voor opnames die je extern wilt laten verwerken.",
              "Mail support@dictivo.app als Local mode niet overeenkomt met deze pagina.",
            ],
          },
        ],
        faqs: [
          ["Uploadt Dictivo Local mode audio?", "Nee. Local mode is ontworpen om dicteeraudio op het apparaat te houden voor transcriptie."],
          ["Waarom kan Dictivo toch het netwerk gebruiken?", "De app kan het netwerk gebruiken voor updates, modeldownloads, licentie of facturering, support en optionele Cloud Fast. Ook anonieme gebruiksstatistieken, als je die hebt aangezet, en een eenmalige activatieping van de proefperiode gebruiken het; beide bevatten alleen metadata."],
          ["Moet Cloud Fast netwerkactiviteit tonen?", "Ja. Cloud Fast is de optionele snelle modus die de geselecteerde opname verstuurt voor externe transcriptie."],
          ["Wat als een Local dictaat een onverwachte verbinding opent?", "Noteer tijdstip, appversie, besturingssysteem en doelhost, en mail support@dictivo.app zodat het verschil onderzocht kan worden."],
        ],
      },
      pt: {
        title: "Como verificar o modo Local do Dictivo com um monitor de rede",
        eyebrow: "Prova de privacidade",
        metaTitle: "Teste de rede do Dictivo Local · Prova de privacidade",
        metaDescription:
          "Uma checklist prática para verificar com um monitor de rede que o modo Local do Dictivo mantém o áudio no dispositivo.",
        lede:
          "O modo Local do Dictivo foi projetado para processar o áudio do microfone no seu dispositivo. Esta página explica como verificar esse limite com um monitor de rede antes de usar o Dictivo para ditado sensível.",
        relatedLinks: [
          { label: "Para onde vai o áudio do ditado", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Ler a Privacy Policy", href: "/privacy/" },
          { label: "Comparar promessas de privacidade", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "Resposta curta",
            paragraphs: [
              "No modo Local, o Dictivo não deve enviar áudio do microfone nem transcrições para um serviço de transcrição. A atividade de rede que você ainda pode ver costuma estar ligada a operações do produto, como atualizações, licenças, downloads, suporte ou Cloud Fast opcional.",
            ],
          },
          {
            title: "O que testar",
            paragraphs: [
              "Use um monitor de rede como Little Snitch, LuLu, um log do roteador ou uma ferramenta de captura de pacotes. Abra o Dictivo, mantenha o modo Local, grave uma frase curta de teste, aguarde a transcrição e verifique se alguma nova conexão remota foi aberta durante esse ditado Local.",
              "Repita o mesmo teste depois com Cloud Fast. Esse segundo teste deve parecer diferente, porque o Cloud Fast envia a gravação selecionada para transcrição remota.",
            ],
            bullets: [
              "Modo Local: grave, transcreva e cole enquanto observa atividade de upload.",
              "Modo Cloud Fast: espere uma solicitação de transcrição remota porque você escolheu o caminho rápido.",
              "Downloads de modelos e verificações de atualização são separados do comportamento de upload do ditado.",
            ],
          },
          {
            title: "Superfície de rede esperada",
            paragraphs: [
              "O Dictivo não promete que o app desktop nunca use a rede. A promessa de privacidade é mais específica e útil: o ditado Local não deve enviar a gravação ou a transcrição para um servidor de transcrição.",
              "Se o monitor mostrar atividade, veja se ela corresponde a uma ação visível: atualização, download de modelo, licença, cobrança, suporte ou Cloud Fast. Se aparecer durante um ditado Local sem essas ações, contate o suporte com horário, versão do app, sistema operacional e host de destino. Antes de relatar qualquer coisa, considere duas conexões que também fazem parte dessa lista: as estatísticas de uso anônimas, se você as ativou em Configurações, e um ping de ativação anônimo único quando o teste gratuito produz o primeiro resultado. Ambas vão para api.dictivo.app e contêm apenas metadados, nunca áudio nem texto de transcrição.",
            ],
            bullets: [
              "Use o modo Local para áudio sensível.",
              "Use Cloud Fast apenas para gravações que você aceita processar remotamente.",
              "Escreva para support@dictivo.app se o modo Local não corresponder a esta página.",
            ],
          },
        ],
        faqs: [
          ["O modo Local do Dictivo envia áudio?", "Não. O modo Local foi projetado para manter o áudio do ditado no dispositivo para transcrição."],
          ["Por que o Dictivo ainda pode usar a rede?", "O app pode usar a rede para atualizações, downloads de modelos, licença ou cobrança, suporte e Cloud Fast opcional. As estatísticas de uso anônimas, se você as ativou, e um ping único de ativação do teste também a usam; ambos contêm apenas metadados."],
          ["O Cloud Fast deve mostrar atividade de rede?", "Sim. O Cloud Fast é o modo rápido opcional que envia a gravação selecionada para transcrição remota."],
          ["O que fazer se um ditado Local abrir uma conexão inesperada?", "Registre horário, versão do app, sistema operacional e host de destino, e escreva para support@dictivo.app para investigação."],
        ],
      },
      zh: {
        title: "如何用网络监控工具验证 Dictivo Local 模式",
        eyebrow: "隐私证明",
        metaTitle: "Dictivo Local 网络测试 · 隐私证明",
        metaDescription:
          "一份实用的网络监控检查清单，用来验证 Dictivo Local 模式是否把听写音频留在设备上。",
        lede:
          "Dictivo Local 模式的设计目标是在你的设备上处理麦克风音频。本页说明在使用 Dictivo 处理敏感听写前，如何用网络监控工具验证这条边界。",
        relatedLinks: [
          { label: "听写音频会发送到哪里", href: "/privacy/where-dictation-audio-goes/" },
          { label: "阅读 Privacy Policy", href: "/privacy/" },
          { label: "比较隐私承诺", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "简短回答",
            paragraphs: [
              "在 Local 模式下，Dictivo 不应把麦克风音频或转写文本上传到转写服务。你仍可能看到的网络活动，通常来自更新、许可证、下载、支持请求或可选 Cloud Fast 等产品操作。",
            ],
          },
          {
            title: "测试什么",
            paragraphs: [
              "使用 Little Snitch、LuLu、路由器日志或抓包工具等网络监控方式。启动 Dictivo，保持 Local 模式，录制一句简短测试语句，等待转写结果，然后检查这次 Local 听写期间是否打开了新的远程连接。",
              "再切换到 Cloud Fast 重复同样测试。第二次测试应该看起来不同，因为 Cloud Fast 会发送你选中的录音进行远程转写。",
            ],
            bullets: [
              "Local 模式：录音、转写、粘贴，同时观察是否有上传活动。",
              "Cloud Fast 模式：应预期出现远程转写请求，因为你选择了加速路径。",
              "模型下载和更新检查与听写录音上传行为是两件不同的事。",
            ],
          },
          {
            title: "预期的网络范围",
            paragraphs: [
              "Dictivo 并不承诺桌面应用永远不使用网络。更准确也更有用的隐私声明是：Local 听写不应把录音或转写文本发送到转写服务器。",
              "如果监控工具显示网络活动，请先判断它是否对应可见的产品操作：更新检查、模型下载、许可证或账单操作、支持请求或 Cloud Fast。如果它在没有这些操作的 Local 听写期间出现，请带上时间戳、应用版本、操作系统和目标主机联系支持。在报告之前请注意，还有两类连接同样属于上述清单：匿名使用统计（若你在设置中开启过），以及免费试用首次产生结果时的一次性匿名激活 ping。两者都发往 api.dictivo.app，且只包含元数据，绝不包含音频或转写文本。",
            ],
            bullets: [
              "敏感音频请使用 Local 模式。",
              "只有在你接受远程处理时才使用 Cloud Fast。",
              "如果 Local 模式行为与本页不符，请发邮件到 support@dictivo.app。",
            ],
          },
        ],
        faqs: [
          ["Dictivo Local 模式会上传音频吗？", "不会。Local 模式的设计目标是把听写音频留在设备上完成转写。"],
          ["为什么我仍可能看到 Dictivo 使用网络？", "应用可能为更新、模型下载、许可证或账单操作、支持请求以及可选 Cloud Fast 使用网络。匿名使用统计（若已开启）以及一次性试用激活 ping 也会使用网络；两者都只包含元数据。"],
          ["Cloud Fast 应该出现网络活动吗？", "应该。Cloud Fast 是可选加速模式，会发送你选中的录音进行远程转写。"],
          ["如果 Local 听写打开了意外连接怎么办？", "记录时间戳、应用版本、操作系统和目标主机，然后发送到 support@dictivo.app 以便调查。"],
        ],
      },
      ja: {
        title: "ネットワークモニターで Dictivo Local モードを確認する方法",
        eyebrow: "プライバシー証明",
        metaTitle: "Dictivo Local ネットワークテスト · プライバシー証明",
        metaDescription:
          "Dictivo Local モードが音声入力の音声をデバイス上に保持することを、ネットワークモニターで確認するための実用的なチェックリストです。",
        lede:
          "Dictivo Local モードは、マイク音声をデバイス上で処理するように設計されています。このページでは、機密性の高い音声入力に Dictivo を使う前に、ネットワークモニターでその境界を確認する方法を説明します。",
        relatedLinks: [
          { label: "音声入力データの行き先", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Privacy Policy を読む", href: "/privacy/" },
          { label: "プライバシーの説明を比較", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "短い回答",
            paragraphs: [
              "Local モードでは、Dictivo はマイク音声や transcript を文字起こしサービスへアップロードしないはずです。表示される可能性のあるネットワーク活動は、アップデート、ライセンス、ダウンロード、サポート、任意の Cloud Fast などの製品操作に関係します。",
            ],
          },
          {
            title: "確認すること",
            paragraphs: [
              "Little Snitch、LuLu、ルーターログ、パケットキャプチャツールなどのネットワークモニターを使います。Dictivo を起動し、Local モードのまま短いテスト文を録音し、transcript を待ち、その Local 音声入力中に新しいリモート接続が開かれたか確認します。",
              "その後 Cloud Fast に切り替えて同じテストを繰り返します。Cloud Fast は選択した録音をリモート文字起こしに送信するため、2 回目のテストは異なる見え方になるはずです。",
            ],
            bullets: [
              "Local モード: 録音、文字起こし、貼り付けを行いながらアップロード活動を確認します。",
              "Cloud Fast モード: 高速経路を選んだため、リモート文字起こしリクエストが発生するはずです。",
              "モデルダウンロードやアップデート確認は、音声入力のアップロード動作とは別です。",
            ],
          },
          {
            title: "想定されるネットワーク範囲",
            paragraphs: [
              "Dictivo はデスクトップアプリが一切ネットワークを使わないとは約束していません。プライバシーの主張はより狭く実用的です。Local 音声入力は録音や transcript を文字起こしサーバーへ送信しないはずです。",
              "モニターに活動が表示された場合は、アップデート確認、モデルダウンロード、ライセンスや請求、サポート、Cloud Fast など目に見える製品操作と一致するか確認してください。そうした操作なしに Local 音声入力中に表示される場合は、時刻、アプリ版、OS、接続先ホストを添えてサポートへ連絡してください。報告する前に、この一覧に含まれる接続がもう 2 つあることをご確認ください。設定でオンにした場合の匿名の使用統計と、無料トライアルが最初の結果を出したときに一度だけ送られる匿名のアクティベーション ping です。どちらも api.dictivo.app に送られ、メタデータのみで、音声や文字起こしテキストは含みません。",
            ],
            bullets: [
              "機密性の高い音声には Local モードを使ってください。",
              "Cloud Fast はリモート処理してよい録音だけに使ってください。",
              "Local モードの動作がこのページと一致しない場合は support@dictivo.app に連絡してください。",
            ],
          },
        ],
        faqs: [
          ["Dictivo Local モードは音声をアップロードしますか？", "いいえ。Local モードは音声入力の音声をデバイス上に保持して文字起こしする設計です。"],
          ["なぜ Dictivo がネットワークを使うことがありますか？", "アプリはアップデート、モデルダウンロード、ライセンスや請求、サポート、任意の Cloud Fast でネットワークを使うことがあります。オンにした場合の匿名の使用統計と、一度だけのトライアル有効化 ping もネットワークを使います。どちらもメタデータのみです。"],
          ["Cloud Fast ではネットワーク活動が出るべきですか？", "はい。Cloud Fast は選択した録音をリモート文字起こしへ送る任意の高速モードです。"],
          ["Local 音声入力で予期しない接続が開いたら？", "時刻、アプリ版、OS、接続先ホストを記録し、support@dictivo.app へ送って調査を依頼してください。"],
        ],
      },
      ko: {
        title: "네트워크 모니터로 Dictivo Local 모드 확인하기",
        eyebrow: "개인정보 증명",
        metaTitle: "Dictivo Local 네트워크 테스트 · 개인정보 증명",
        metaDescription:
          "Dictivo Local 모드가 받아쓰기 오디오를 기기에 유지하는지 네트워크 모니터로 확인하는 실용적인 체크리스트입니다.",
        lede:
          "Dictivo Local 모드는 마이크 오디오를 기기에서 처리하도록 설계되었습니다. 이 페이지는 민감한 받아쓰기에 Dictivo를 사용하기 전에 네트워크 모니터로 그 경계를 확인하는 방법을 설명합니다.",
        relatedLinks: [
          { label: "받아쓰기 오디오 처리 위치", href: "/privacy/where-dictation-audio-goes/" },
          { label: "Privacy Policy 읽기", href: "/privacy/" },
          { label: "개인정보 약속 비교", href: "/privacy-proof/" },
        ],
        sections: [
          {
            title: "짧은 답변",
            paragraphs: [
              "Local 모드에서 Dictivo는 마이크 오디오나 transcript를 전사 서비스로 업로드하지 않아야 합니다. 그래도 보일 수 있는 네트워크 활동은 업데이트, 라이선스, 다운로드, 지원 또는 선택형 Cloud Fast 같은 제품 작업과 관련될 수 있습니다.",
            ],
          },
          {
            title: "확인할 것",
            paragraphs: [
              "Little Snitch, LuLu, 라우터 로그 또는 패킷 캡처 도구 같은 네트워크 모니터를 사용하세요. Dictivo를 시작하고 Local 모드를 유지한 채 짧은 테스트 문장을 녹음한 뒤 transcript를 기다리고, 그 Local 받아쓰기 중 새 원격 연결이 열렸는지 확인합니다.",
              "그다음 Cloud Fast로 같은 테스트를 반복합니다. Cloud Fast는 선택한 녹음을 원격 전사로 보내므로 두 번째 테스트는 다르게 보여야 합니다.",
            ],
            bullets: [
              "Local 모드: 업로드 활동을 보면서 녹음, 전사, 붙여넣기를 수행합니다.",
              "Cloud Fast 모드: 빠른 경로를 선택했으므로 원격 전사 요청이 예상됩니다.",
              "모델 다운로드와 업데이트 확인은 받아쓰기 업로드 동작과 별개입니다.",
            ],
          },
          {
            title: "예상되는 네트워크 범위",
            paragraphs: [
              "Dictivo는 데스크톱 앱이 네트워크를 전혀 쓰지 않는다고 약속하지 않습니다. 개인정보 주장은 더 좁고 실용적입니다. Local 받아쓰기는 녹음이나 transcript를 전사 서버로 보내지 않아야 합니다.",
              "모니터에 활동이 보이면 업데이트 확인, 모델 다운로드, 라이선스 또는 결제, 지원, Cloud Fast 같은 보이는 제품 작업과 일치하는지 확인하세요. 그런 작업 없이 Local 받아쓰기 중 나타나면 시각, 앱 버전, 운영체제, 대상 호스트를 포함해 지원팀에 문의하세요. 신고하기 전에, 이 목록에 함께 속하는 연결이 두 가지 더 있다는 점을 확인하세요. 설정에서 켠 경우의 익명 사용 통계와, 무료 체험이 첫 결과를 만들 때 전송되는 일회성 익명 활성화 핑입니다. 둘 다 api.dictivo.app으로 전송되며 메타데이터만 포함하고 오디오나 전사 텍스트는 포함하지 않습니다.",
            ],
            bullets: [
              "민감한 오디오에는 Local 모드를 사용하세요.",
              "Cloud Fast는 원격 처리해도 되는 녹음에만 사용하세요.",
              "Local 모드 동작이 이 페이지와 맞지 않으면 support@dictivo.app으로 연락하세요.",
            ],
          },
        ],
        faqs: [
          ["Dictivo Local 모드는 오디오를 업로드하나요?", "아니요. Local 모드는 받아쓰기 오디오를 기기에 유지해 전사하도록 설계되었습니다."],
          ["왜 Dictivo가 네트워크를 사용할 수 있나요?", "앱은 업데이트, 모델 다운로드, 라이선스 또는 결제, 지원, 선택형 Cloud Fast에 네트워크를 사용할 수 있습니다. 켜 둔 경우의 익명 사용 통계와 일회성 체험 활성화 핑도 네트워크를 사용하며, 둘 다 메타데이터만 포함합니다."],
          ["Cloud Fast는 네트워크 활동을 보여야 하나요?", "네. Cloud Fast는 선택한 녹음을 원격 전사로 보내는 선택형 빠른 모드입니다."],
          ["Local 받아쓰기가 예상치 못한 연결을 열면 어떻게 하나요?", "시각, 앱 버전, 운영체제, 대상 호스트를 기록한 뒤 support@dictivo.app으로 보내 조사를 요청하세요."],
        ],
      },
    },
  },
  {
    slug: "terms",
    navLabel: "Terms",
    title: "Terms of Use",
    eyebrow: "Terms",
    metaTitle: "Terms of Use · Dictivo",
    metaDescription:
      "The practical terms for using Dictivo, including Local, Cloud Fast, licenses, updates, refunds, and support.",
    lede:
      "These terms are written for customers, not lawyers. They describe what you can expect when you download, buy, and use Dictivo.",
    lastModified: LEGAL_LASTMOD,
    sections: [
      {
        title: "License to use Dictivo",
        paragraphs: [
          "Dictivo Local is sold as a personal desktop license. Buying Local unlocks the paid local models and includes 12 months of app updates and new local models.",
          "After the included update window ends, the version you already installed remains usable. Renewing the update window is optional and is only needed for future app updates and new local models.",
        ],
        bullets: [
          "Dictivo Local is currently $29 once.",
          "Optional future update renewal is currently $24 per year.",
          "Cloud Fast is a separate optional monthly subscription.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not use Dictivo to break laws, violate another person's rights, abuse support channels, reverse engineer license controls, or interfere with the service used for optional Cloud Fast.",
          "You are responsible for deciding whether a recording is appropriate for Local mode or Cloud Fast. Sensitive audio should stay in Local mode.",
        ],
      },
      {
        title: "Availability and changes",
        paragraphs: [
          "Dictivo is shipped as desktop software with a public beta label while the product continues to mature. We may improve, remove, or rename features as the product develops.",
          "Cloud Fast depends on remote processing and may be unavailable during maintenance or provider outages. Local mode remains the privacy-first path for everyday dictation.",
        ],
      },
      {
        title: "Who you buy from, and which law applies",
        paragraphs: [
          "Dictivo is developed and operated from Germany. Purchases go through a payment provider that acts as the merchant of record: it is the seller shown on your receipt and it handles payment, invoicing, and sales tax or VAT. The provider is named at checkout and on the receipt you receive. Your licence to use the software, and support for it, come from Dictivo.",
          "These terms are governed by the law of the Federal Republic of Germany. If you are a consumer, this choice of law does not deprive you of the protection of any mandatory consumer-protection rules that apply in the country where you live, and you keep the right to bring proceedings there.",
          "If you are a consumer in the EU, you also have a statutory right of withdrawal that is separate from, and additional to, our own refund policy. It is described on the refund page.",
        ],
        bullets: [
          "Seller of record: the payment provider named on your receipt.",
          "Software licence and support: Dictivo.",
          "Governing law: Germany, without prejudice to mandatory consumer protections where you live.",
        ],
      },
    ],
  },
  {
    slug: "refund",
    navLabel: "Refunds",
    title: "Refund Policy",
    eyebrow: "Refunds",
    metaTitle: "Refund Policy · Dictivo",
    metaDescription:
      "How to request a Dictivo refund for Local purchases and Cloud Fast subscriptions.",
    lede:
      "Buying desktop software should not feel risky. If Dictivo does not fit your workflow, contact support and we will handle the request plainly.",
    lastModified: LEGAL_LASTMOD,
    sections: [
      {
        title: "Local license refunds",
        paragraphs: [
          "You can request a refund for a Dictivo Local purchase within 14 days of purchase. Email support@dictivo.app with the purchase email and order reference.",
          "After a refund is processed, the refunded license may be disabled and should no longer be used.",
        ],
        bullets: [
          "Refund window: 14 days from purchase.",
          "Contact: support@dictivo.app.",
          "Include the purchase email and order reference when possible.",
        ],
      },
      {
        title: "Cloud Fast subscriptions",
        paragraphs: [
          "Cloud Fast is monthly. You can manage or cancel the subscription from the billing link shown in the app or from your purchase receipt.",
          "If there is a billing mistake or activation problem, email support@dictivo.app. We will review the account and help resolve it.",
        ],
      },
      {
        title: "EU right of withdrawal",
        paragraphs: [
          "If you are a consumer in the European Union, you have a statutory right to withdraw from a distance contract within 14 days, without giving a reason. That right exists independently of the refund policy above: it is granted by law, not by us, and nothing on this page reduces it.",
          "For digital content delivered immediately, that right can end early — but only if you expressly asked for delivery to begin before the withdrawal period was over and acknowledged that doing so ends the right. If you were never asked for that consent, the full 14-day period still applies.",
          "In practice you do not need to work out which applies. Our own policy already refunds any Local purchase within 14 days on request, with no reason needed, so ask support either way and we will not argue about the legal basis.",
        ],
        bullets: [
          "The statutory right is additional to our refund policy, not replaced by it.",
          "Withdrawal period: 14 days from the conclusion of the contract.",
          "To withdraw, a clear statement by email to support@dictivo.app is enough.",
        ],
      },
      ...withdrawalNoticeSections,
      {
        title: "Before requesting a refund",
        paragraphs: [
          "If the issue is activation, update access, device binding, or Cloud Fast availability, support can often fix it quickly. Tell us what happened and which version of Dictivo you are using.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    navLabel: "Contact",
    title: "Contact Dictivo",
    eyebrow: "Contact",
    metaTitle: "Contact · Dictivo",
    metaDescription:
      "Contact Dictivo support for purchases, activation, refunds, security reports, and product questions.",
    lede:
      "Use the right address for the request and include enough context for us to reproduce the issue.",
    sections: [
      {
        title: "Customer support",
        paragraphs: [
          "For purchase, license, activation, update, refund, and Cloud Fast questions, email support@dictivo.app.",
          "For faster help, include your purchase email, app version, operating system, and a short description of what you expected and what happened.",
        ],
      },
      {
        title: "Security reports",
        paragraphs: [
          "If you believe you found a security issue, email security@dictivo.app with reproduction steps. Please avoid public disclosure until we have had time to investigate and respond.",
        ],
      },
      {
        title: "Product questions",
        paragraphs: [
          "For general product questions, platform availability, or trial questions, support@dictivo.app is the best starting point.",
        ],
      },
    ],
  },
  {
    slug: "about",
    navLabel: "About",
    title: "About Dictivo",
    eyebrow: "About",
    metaTitle: "About · Dictivo",
    metaDescription:
      "Dictivo is a private-first desktop dictation app for people who want Local by default and Cloud Fast only when they choose it.",
    lede:
      "Dictivo is a desktop dictation app for people who want the speed of voice without making cloud transcription the default.",
    sections: [
      {
        title: "The product position",
        paragraphs: [
          "Dictivo starts with Local mode because most dictation contains private working text: notes, drafts, names, client details, research, support replies, prompts, and unfinished thoughts.",
          "Cloud Fast exists for a different moment: when the recording is low-sensitivity and speed matters more than keeping the entire workflow local.",
        ],
      },
      {
        title: "What Dictivo is for",
        bullets: [
          "Private desktop dictation with public downloads for macOS and Windows x64.",
          "A free Local tier, a 14-day full Local trial, and optional paid Local upgrade.",
          "Optional Cloud Fast minutes and subscription for selected recordings.",
          "A clear support path through support@dictivo.app.",
        ],
      },
      {
        title: "What Dictivo is not trying to be",
        paragraphs: [
          "Dictivo is not a meeting recorder, not a call recorder, and not a cloud-first workspace. It is focused on turning speech into text where you are already writing.",
        ],
      },
    ],
  },
  // Rendered only once data/impressum.json is filled in; IMPRESSUM_PAGE is
  // null until then, so nothing half-written reaches the public site.
  ...(IMPRESSUM_PAGE ? [IMPRESSUM_PAGE] : []),
];
