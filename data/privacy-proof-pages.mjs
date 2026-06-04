export const PRIVACY_PROOF_LASTMOD = "2026-06-04";

export const PRIVACY_PROOF_COPY = {
  en: {
    slug: "privacy-proof",
    navLabel: "Privacy proof",
    metaTitle: "Dictivo Privacy Proof - Local vs Cloud Fast",
    metaDescription:
      "Plain-language privacy proof for Dictivo: what stays local, when network requests happen, and when Cloud Fast uploads selected recordings.",
    eyebrow: "Privacy proof",
    title: "What stays local, and when Dictivo uses the network.",
    lede:
      "Dictivo is local-first, not cloud-only. Local mode keeps speech processing and product data on the device; Cloud Fast is a separate option for recordings you choose to process remotely.",
    answerTitle: "Short answer for private dictation",
    answer:
      "In Dictivo Local mode, microphone audio, transcripts, history, dictionary terms, snippets, settings, and local model choices stay on the device. Dictivo uses the network for update checks, license or billing actions, support, and optional Cloud Fast. Cloud Fast uploads only the recording you send through that mode.",
    sections: [
      {
        title: "Local mode",
        paragraphs: [
          "Use Local mode when the words are private. Dictivo processes the current recording on the device and keeps the local product data on that device.",
          "Local mode is the default privacy path for meetings, drafts, client work, notes, names, research, prompts, and any audio you do not want to upload.",
        ],
        bullets: [
          "Microphone audio stays on the device in Local mode.",
          "Transcripts, history, dictionary terms, snippets, and settings stay local.",
          "No Dictivo account is required for Local dictation.",
          "Tiny stays free forever, and the 14-day full Local trial uses the same Local boundary.",
        ],
      },
      {
        title: "Network requests",
        paragraphs: [
          "Dictivo does not promise that the app never uses the network. A desktop app still needs a small, visible network surface for product operations.",
          "The important distinction is purpose: update checks and license actions are not transcription uploads. Cloud Fast is the mode that changes where the selected recording is processed.",
        ],
        bullets: [
          "Update checks ask whether a newer app version is available.",
          "License and billing actions activate purchases, refresh status, manage subscriptions, or support refunds.",
          "Support email happens only when you contact support.",
          "Cloud Fast uploads only recordings you choose to send through Cloud Fast.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast is for low-sensitivity recordings where speed matters more than keeping the full path local. It is not the default Local workflow.",
          "When you choose Cloud Fast, the selected recording is sent for remote transcription. The transcript returns to the app, and local dictionary or snippet behavior can still apply after the text comes back.",
        ],
        bullets: [
          "Use Local for sensitive audio.",
          "Use Cloud Fast only when you are comfortable processing that selected recording remotely.",
          "The app labels the Local and Cloud Fast boundary so the choice is visible.",
        ],
      },
    ],
    faqTitle: "Privacy questions",
    faqs: [
      ["Does Dictivo upload audio in Local mode?", "No. Local mode is designed to keep the recording on the device for transcription."],
      ["Why does Dictivo use the network at all?", "The app checks for updates, activates or refreshes licenses, opens billing flows, handles support, and uses Cloud Fast only when selected."],
      ["When should I use Cloud Fast?", "Use Cloud Fast for low-sensitivity recordings where speed matters more than local-only processing."],
      ["Is Windows public now?", "No. The public download is macOS today. Windows x64 remains in validation before public downloads."],
    ],
  },
  de: {
    slug: "privacy-proof",
    navLabel: "Datenschutznachweis",
    metaTitle: "Dictivo Datenschutz - Local und Cloud Fast",
    metaDescription:
      "Ein klarer Datenschutznachweis für Dictivo: was lokal bleibt, wann Netzwerkzugriffe passieren und wann Cloud Fast ausgewählte Aufnahmen hochlädt.",
    eyebrow: "Datenschutznachweis",
    title: "Was lokal bleibt und wann Dictivo das Netzwerk nutzt.",
    lede:
      "Dictivo ist lokal zuerst, nicht cloud-only. Local Mode hält Spracherkennung und Produktdaten auf dem Gerät; Cloud Fast ist eine separate Option für Aufnahmen, die Sie bewusst remote verarbeiten lassen.",
    answerTitle: "Kurzantwort für privates Diktieren",
    answer:
      "Im Local Mode von Dictivo bleiben Mikrofonaudio, Transkripte, Verlauf, Wörterbuchbegriffe, Textbausteine, Einstellungen und lokale Modellwahl auf dem Gerät. Dictivo nutzt das Netzwerk für Updates, Lizenz- oder Zahlungsaktionen, Support und optional Cloud Fast. Cloud Fast lädt nur die Aufnahme hoch, die Sie über diesen Modus senden.",
    sections: [
      {
        title: "Local Mode",
        paragraphs: [
          "Nutzen Sie Local Mode, wenn die Worte privat sind. Dictivo verarbeitet die aktuelle Aufnahme auf dem Gerät und hält lokale Produktdaten dort.",
          "Local Mode ist der Standardpfad für Meetings, Entwürfe, Kundenarbeit, Notizen, Namen, Recherche, Prompts und Audio, das Sie nicht hochladen möchten.",
        ],
        bullets: [
          "Mikrofonaudio bleibt im Local Mode auf dem Gerät.",
          "Transkripte, Verlauf, Wörterbuchbegriffe, Textbausteine und Einstellungen bleiben lokal.",
          "Für lokales Diktieren ist kein Dictivo-Konto erforderlich.",
          "Tiny bleibt dauerhaft gratis; der 14-tägige volle Local-Test nutzt dieselbe Grenze.",
        ],
      },
      {
        title: "Netzwerkzugriffe",
        paragraphs: [
          "Dictivo verspricht nicht, dass die App nie das Netzwerk nutzt. Eine Desktop-App braucht eine kleine, sichtbare Netzwerkfläche für Produktfunktionen.",
          "Entscheidend ist der Zweck: Update-Checks und Lizenzaktionen sind keine Transkriptions-Uploads. Cloud Fast ist der Modus, der den Verarbeitungsort der gewählten Aufnahme ändert.",
        ],
        bullets: [
          "Update-Checks fragen, ob eine neuere App-Version verfügbar ist.",
          "Lizenz- und Zahlungsaktionen aktivieren Käufe, aktualisieren Status, verwalten Abos oder unterstützen Erstattungen.",
          "Support-E-Mail passiert nur, wenn Sie Support kontaktieren.",
          "Cloud Fast lädt nur Aufnahmen hoch, die Sie über Cloud Fast senden.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast ist für wenig sensible Aufnahmen gedacht, bei denen Geschwindigkeit wichtiger ist als der vollständig lokale Pfad. Es ist nicht der standardmäßige Local-Workflow.",
          "Wenn Sie Cloud Fast wählen, wird die ausgewählte Aufnahme remote transkribiert. Das Transkript kommt zur App zurück; lokale Wörterbuch- und Textbausteinfunktionen können danach weiter greifen.",
        ],
        bullets: [
          "Nutzen Sie Local für sensible Audioinhalte.",
          "Nutzen Sie Cloud Fast nur, wenn Remote-Verarbeitung dieser Aufnahme für Sie in Ordnung ist.",
          "Die App kennzeichnet die Grenze zwischen Local und Cloud Fast sichtbar.",
        ],
      },
    ],
    faqTitle: "Datenschutzfragen",
    faqs: [
      ["Lädt Dictivo im Local Mode Audio hoch?", "Nein. Local Mode ist dafür gebaut, die Aufnahme für die Transkription auf dem Gerät zu halten."],
      ["Warum nutzt Dictivo überhaupt das Netzwerk?", "Die App prüft Updates, aktiviert oder aktualisiert Lizenzen, öffnet Zahlungswege, unterstützt Support und nutzt Cloud Fast nur bei Auswahl."],
      ["Wann sollte ich Cloud Fast nutzen?", "Nutzen Sie Cloud Fast für wenig sensible Aufnahmen, wenn Geschwindigkeit wichtiger ist als rein lokale Verarbeitung."],
      ["Ist Windows öffentlich verfügbar?", "Nein. Der öffentliche Download ist heute macOS. Windows x64 bleibt vor öffentlichen Downloads in Validierung."],
    ],
  },
  fr: {
    slug: "privacy-proof",
    navLabel: "Preuve confidentialité",
    metaTitle: "Dictivo confidentialité - Local et Cloud Fast",
    metaDescription:
      "Preuve de confidentialité en langage clair pour Dictivo : ce qui reste local, quand le réseau est utilisé et quand Cloud Fast envoie un enregistrement choisi.",
    eyebrow: "Preuve confidentialité",
    title: "Ce qui reste local, et quand Dictivo utilise le réseau.",
    lede:
      "Dictivo est local d'abord, pas cloud-only. Le mode Local garde le traitement vocal et les données produit sur l'appareil; Cloud Fast reste une option séparée pour les enregistrements que vous choisissez de traiter à distance.",
    answerTitle: "Réponse courte pour une dictée privée",
    answer:
      "En mode Local, l'audio du micro, les transcriptions, l'historique, les termes du dictionnaire, les extraits, les réglages et les choix de modèles locaux restent sur l'appareil. Dictivo utilise le réseau pour les mises à jour, licences ou paiements, le support et Cloud Fast en option. Cloud Fast envoie uniquement l'enregistrement choisi.",
    sections: [
      {
        title: "Mode Local",
        paragraphs: [
          "Utilisez le mode Local quand les mots sont privés. Dictivo traite l'enregistrement en cours sur l'appareil et y garde les données produit locales.",
          "Le mode Local est le chemin par défaut pour réunions, brouillons, travail client, notes, noms, recherche, prompts et tout audio que vous ne voulez pas envoyer.",
        ],
        bullets: [
          "L'audio du micro reste sur l'appareil en mode Local.",
          "Transcriptions, historique, dictionnaire, extraits et réglages restent locaux.",
          "Aucun compte Dictivo n'est requis pour la dictée Local.",
          "Tiny reste gratuit à vie, et l'essai Local complet de 14 jours utilise la même frontière.",
        ],
      },
      {
        title: "Requêtes réseau",
        paragraphs: [
          "Dictivo ne promet pas que l'app n'utilise jamais le réseau. Une app de bureau a besoin d'une petite surface réseau visible pour les opérations produit.",
          "La distinction importante est l'objectif : vérifier les mises à jour ou les licences n'est pas envoyer un audio à transcrire. Cloud Fast est le mode qui change le lieu de traitement de l'enregistrement choisi.",
        ],
        bullets: [
          "Les vérifications de mise à jour demandent si une version plus récente existe.",
          "Les actions de licence et de paiement activent les achats, rafraîchissent le statut, gèrent les abonnements ou aident aux remboursements.",
          "Le support par e-mail n'intervient que si vous contactez le support.",
          "Cloud Fast envoie uniquement les enregistrements choisis pour Cloud Fast.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast est prévu pour les enregistrements peu sensibles où la vitesse compte plus qu'un chemin entièrement local. Ce n'est pas le flux Local par défaut.",
          "Quand vous choisissez Cloud Fast, l'enregistrement sélectionné est transcrit à distance. Le texte revient dans l'app, puis le dictionnaire local ou les extraits peuvent encore s'appliquer.",
        ],
        bullets: [
          "Utilisez Local pour les audios sensibles.",
          "Utilisez Cloud Fast seulement si le traitement distant de cet enregistrement vous convient.",
          "L'app rend visible la frontière entre Local et Cloud Fast.",
        ],
      },
    ],
    faqTitle: "Questions de confidentialité",
    faqs: [
      ["Dictivo envoie-t-il l'audio en mode Local ?", "Non. Le mode Local est conçu pour garder l'enregistrement sur l'appareil pendant la transcription."],
      ["Pourquoi Dictivo utilise-t-il le réseau ?", "L'app vérifie les mises à jour, active ou rafraîchit les licences, ouvre la facturation, gère le support et utilise Cloud Fast seulement si vous le sélectionnez."],
      ["Quand utiliser Cloud Fast ?", "Utilisez Cloud Fast pour les enregistrements peu sensibles quand la vitesse compte plus qu'un traitement local uniquement."],
      ["Windows est-il public ?", "Non. Le téléchargement public est macOS aujourd'hui. Windows x64 reste en validation avant les téléchargements publics."],
    ],
  },
  es: {
    slug: "privacy-proof",
    navLabel: "Prueba de privacidad",
    metaTitle: "Prueba de privacidad de Dictivo - Local, Cloud Fast y red",
    metaDescription:
      "Prueba de privacidad clara para Dictivo: qué queda local, cuándo hay solicitudes de red y cuándo Cloud Fast sube grabaciones seleccionadas.",
    eyebrow: "Prueba de privacidad",
    title: "Qué queda local y cuándo Dictivo usa la red.",
    lede:
      "Dictivo es local primero, no solo nube. El modo Local mantiene el procesamiento de voz y los datos del producto en el dispositivo; Cloud Fast es una opción separada para grabaciones que eliges procesar remotamente.",
    answerTitle: "Respuesta corta para dictado privado",
    answer:
      "En el modo Local de Dictivo, el audio del micrófono, las transcripciones, el historial, los términos del diccionario, los fragmentos, los ajustes y la elección de modelos locales permanecen en el dispositivo. Dictivo usa la red para actualizaciones, licencias o pagos, soporte y Cloud Fast opcional. Cloud Fast sube solo la grabación que envías por ese modo.",
    sections: [
      {
        title: "Modo Local",
        paragraphs: [
          "Usa el modo Local cuando las palabras sean privadas. Dictivo procesa la grabación actual en el dispositivo y mantiene allí los datos locales del producto.",
          "El modo Local es la ruta predeterminada para reuniones, borradores, trabajo con clientes, notas, nombres, investigación, prompts y cualquier audio que no quieras subir.",
        ],
        bullets: [
          "El audio del micrófono queda en el dispositivo en modo Local.",
          "Transcripciones, historial, diccionario, fragmentos y ajustes quedan locales.",
          "No se requiere cuenta de Dictivo para el dictado Local.",
          "Tiny es gratis para siempre, y la prueba Local completa de 14 días usa la misma frontera.",
        ],
      },
      {
        title: "Solicitudes de red",
        paragraphs: [
          "Dictivo no promete que la app nunca use la red. Una app de escritorio necesita una pequeña superficie de red visible para operaciones del producto.",
          "La distinción importante es el propósito: las comprobaciones de actualización y licencia no son subidas de transcripción. Cloud Fast es el modo que cambia dónde se procesa la grabación seleccionada.",
        ],
        bullets: [
          "Las comprobaciones de actualización preguntan si hay una versión nueva.",
          "Las acciones de licencia y pago activan compras, actualizan estado, gestionan suscripciones o ayudan con reembolsos.",
          "El correo de soporte ocurre solo cuando contactas con soporte.",
          "Cloud Fast sube solo grabaciones que envías por Cloud Fast.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast es para grabaciones poco sensibles donde la velocidad importa más que mantener todo el camino local. No es el flujo Local predeterminado.",
          "Cuando eliges Cloud Fast, la grabación seleccionada se transcribe remotamente. El texto vuelve a la app y el diccionario local o los fragmentos pueden aplicarse después.",
        ],
        bullets: [
          "Usa Local para audio sensible.",
          "Usa Cloud Fast solo cuando aceptes procesar remotamente esa grabación seleccionada.",
          "La app muestra claramente la frontera entre Local y Cloud Fast.",
        ],
      },
    ],
    faqTitle: "Preguntas de privacidad",
    faqs: [
      ["¿Dictivo sube audio en modo Local?", "No. El modo Local está diseñado para mantener la grabación en el dispositivo durante la transcripción."],
      ["¿Por qué Dictivo usa la red?", "La app comprueba actualizaciones, activa o refresca licencias, abre flujos de pago, gestiona soporte y usa Cloud Fast solo cuando se selecciona."],
      ["¿Cuándo debería usar Cloud Fast?", "Usa Cloud Fast para grabaciones poco sensibles cuando la velocidad importe más que el procesamiento solo local."],
      ["¿Windows ya es público?", "No. La descarga pública hoy es macOS. Windows x64 sigue en validación antes de las descargas públicas."],
    ],
  },
  it: {
    slug: "privacy-proof",
    navLabel: "Prova privacy",
    metaTitle: "Prova privacy Dictivo - Local, Cloud Fast e rete",
    metaDescription:
      "Prova privacy in linguaggio chiaro per Dictivo: cosa resta locale, quando avvengono richieste di rete e quando Cloud Fast carica registrazioni selezionate.",
    eyebrow: "Prova privacy",
    title: "Cosa resta locale e quando Dictivo usa la rete.",
    lede:
      "Dictivo è local-first, non cloud-only. La modalità Local mantiene riconoscimento vocale e dati prodotto sul dispositivo; Cloud Fast è un'opzione separata per registrazioni che scegli di elaborare da remoto.",
    answerTitle: "Risposta breve per la dettatura privata",
    answer:
      "In modalità Local, audio del microfono, trascrizioni, cronologia, termini del dizionario, snippet, impostazioni e scelta dei modelli locali restano sul dispositivo. Dictivo usa la rete per aggiornamenti, licenze o pagamenti, supporto e Cloud Fast opzionale. Cloud Fast carica solo la registrazione inviata tramite quella modalità.",
    sections: [
      {
        title: "Modalità Local",
        paragraphs: [
          "Usa la modalità Local quando le parole sono private. Dictivo elabora la registrazione corrente sul dispositivo e conserva lì i dati locali del prodotto.",
          "Local è il percorso predefinito per riunioni, bozze, lavoro con clienti, note, nomi, ricerca, prompt e audio che non vuoi caricare.",
        ],
        bullets: [
          "L'audio del microfono resta sul dispositivo in modalità Local.",
          "Trascrizioni, cronologia, dizionario, snippet e impostazioni restano locali.",
          "Non serve un account Dictivo per la dettatura Local.",
          "Tiny resta gratis per sempre e la prova Local completa di 14 giorni usa lo stesso confine.",
        ],
      },
      {
        title: "Richieste di rete",
        paragraphs: [
          "Dictivo non promette che l'app non usi mai la rete. Un'app desktop ha bisogno di una piccola superficie di rete visibile per operazioni di prodotto.",
          "La distinzione importante è lo scopo: controlli aggiornamento e azioni licenza non sono upload di trascrizione. Cloud Fast è la modalità che cambia dove viene elaborata la registrazione selezionata.",
        ],
        bullets: [
          "I controlli aggiornamento chiedono se esiste una versione più recente.",
          "Azioni di licenza e pagamento attivano acquisti, aggiornano stato, gestiscono abbonamenti o aiutano i rimborsi.",
          "L'email di supporto avviene solo quando contatti il supporto.",
          "Cloud Fast carica solo registrazioni che invii tramite Cloud Fast.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast è per registrazioni poco sensibili dove la velocità conta più di un percorso interamente locale. Non è il flusso Local predefinito.",
          "Quando scegli Cloud Fast, la registrazione selezionata viene trascritta da remoto. Il testo torna nell'app e dizionario locale o snippet possono applicarsi dopo.",
        ],
        bullets: [
          "Usa Local per audio sensibile.",
          "Usa Cloud Fast solo quando accetti l'elaborazione remota di quella registrazione.",
          "L'app rende visibile il confine tra Local e Cloud Fast.",
        ],
      },
    ],
    faqTitle: "Domande privacy",
    faqs: [
      ["Dictivo carica audio in modalità Local?", "No. La modalità Local è progettata per tenere la registrazione sul dispositivo durante la trascrizione."],
      ["Perché Dictivo usa la rete?", "L'app controlla aggiornamenti, attiva o aggiorna licenze, apre flussi di pagamento, gestisce supporto e usa Cloud Fast solo se selezionato."],
      ["Quando dovrei usare Cloud Fast?", "Usa Cloud Fast per registrazioni poco sensibili quando la velocità conta più dell'elaborazione solo locale."],
      ["Windows è pubblico?", "No. Il download pubblico oggi è macOS. Windows x64 è ancora in validazione prima dei download pubblici."],
    ],
  },
  nl: {
    slug: "privacy-proof",
    navLabel: "Privacybewijs",
    metaTitle: "Dictivo privacybewijs - Local, Cloud Fast en netwerkgrenzen",
    metaDescription:
      "Privacybewijs in gewone taal voor Dictivo: wat lokaal blijft, wanneer netwerkverzoeken gebeuren en wanneer Cloud Fast gekozen opnames uploadt.",
    eyebrow: "Privacybewijs",
    title: "Wat lokaal blijft en wanneer Dictivo het netwerk gebruikt.",
    lede:
      "Dictivo is local-first, niet cloud-only. Local-modus houdt spraakverwerking en productgegevens op het apparaat; Cloud Fast is een aparte optie voor opnames die je bewust op afstand laat verwerken.",
    answerTitle: "Kort antwoord voor privé dicteren",
    answer:
      "In Dictivo Local-modus blijven microfoonaudio, transcripties, geschiedenis, woordenboektermen, snippets, instellingen en lokale modelkeuzes op het apparaat. Dictivo gebruikt het netwerk voor updates, licentie- of betaalacties, support en optionele Cloud Fast. Cloud Fast uploadt alleen de opname die je via die modus verstuurt.",
    sections: [
      {
        title: "Local-modus",
        paragraphs: [
          "Gebruik Local-modus wanneer de woorden privé zijn. Dictivo verwerkt de huidige opname op het apparaat en houdt lokale productgegevens daar.",
          "Local-modus is het standaardpad voor vergaderingen, concepten, klantwerk, notities, namen, onderzoek, prompts en audio die je niet wilt uploaden.",
        ],
        bullets: [
          "Microfoonaudio blijft in Local-modus op het apparaat.",
          "Transcripties, geschiedenis, woordenboektermen, snippets en instellingen blijven lokaal.",
          "Voor Local-dictatie is geen Dictivo-account nodig.",
          "Tiny blijft altijd gratis en de volledige Local-proef van 14 dagen gebruikt dezelfde grens.",
        ],
      },
      {
        title: "Netwerkverzoeken",
        paragraphs: [
          "Dictivo belooft niet dat de app nooit het netwerk gebruikt. Een desktop-app heeft een kleine zichtbare netwerklaag nodig voor producthandelingen.",
          "Het belangrijke verschil is het doel: updatecontroles en licentieacties zijn geen transcriptie-uploads. Cloud Fast is de modus die verandert waar de gekozen opname wordt verwerkt.",
        ],
        bullets: [
          "Updatecontroles vragen of er een nieuwere appversie beschikbaar is.",
          "Licentie- en betaalacties activeren aankopen, verversen status, beheren abonnementen of helpen bij terugbetalingen.",
          "Supportmail gebeurt alleen wanneer je support contacteert.",
          "Cloud Fast uploadt alleen opnames die je via Cloud Fast verstuurt.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast is voor weinig gevoelige opnames waar snelheid belangrijker is dan het volledig lokale pad. Het is niet de standaard Local-workflow.",
          "Wanneer je Cloud Fast kiest, wordt de geselecteerde opname op afstand getranscribeerd. De tekst keert terug naar de app en lokale woordenboek- of snippetfuncties kunnen daarna nog toepassen.",
        ],
        bullets: [
          "Gebruik Local voor gevoelige audio.",
          "Gebruik Cloud Fast alleen wanneer verwerking op afstand voor die opname acceptabel is.",
          "De app toont de grens tussen Local en Cloud Fast zichtbaar.",
        ],
      },
    ],
    faqTitle: "Privacyvragen",
    faqs: [
      ["Uploadt Dictivo audio in Local-modus?", "Nee. Local-modus is ontworpen om de opname op het apparaat te houden tijdens transcriptie."],
      ["Waarom gebruikt Dictivo het netwerk?", "De app controleert updates, activeert of ververst licenties, opent betaalflows, behandelt support en gebruikt Cloud Fast alleen wanneer geselecteerd."],
      ["Wanneer moet ik Cloud Fast gebruiken?", "Gebruik Cloud Fast voor weinig gevoelige opnames wanneer snelheid belangrijker is dan alleen lokale verwerking."],
      ["Is Windows openbaar?", "Nee. De openbare download is vandaag macOS. Windows x64 blijft in validatie vóór publieke downloads."],
    ],
  },
  pt: {
    slug: "privacy-proof",
    navLabel: "Prova de privacidade",
    metaTitle: "Prova de privacidade do Dictivo - Local, Cloud Fast e rede",
    metaDescription:
      "Prova de privacidade em linguagem clara para o Dictivo: o que fica local, quando a rede é usada e quando o Cloud Fast envia gravações selecionadas.",
    eyebrow: "Prova de privacidade",
    title: "O que fica local e quando o Dictivo usa a rede.",
    lede:
      "O Dictivo é local-first, não cloud-only. O modo Local mantém processamento de fala e dados do produto no dispositivo; Cloud Fast é uma opção separada para gravações que você escolhe processar remotamente.",
    answerTitle: "Resposta curta para ditado privado",
    answer:
      "No modo Local do Dictivo, áudio do microfone, transcrições, histórico, termos do dicionário, snippets, configurações e escolhas de modelos locais ficam no dispositivo. O Dictivo usa a rede para atualizações, licenças ou pagamentos, suporte e Cloud Fast opcional. Cloud Fast envia apenas a gravação enviada por esse modo.",
    sections: [
      {
        title: "Modo Local",
        paragraphs: [
          "Use o modo Local quando as palavras forem privadas. O Dictivo processa a gravação atual no dispositivo e mantém ali os dados locais do produto.",
          "O modo Local é o caminho padrão para reuniões, rascunhos, trabalho com clientes, notas, nomes, pesquisa, prompts e qualquer áudio que você não queira enviar.",
        ],
        bullets: [
          "O áudio do microfone fica no dispositivo no modo Local.",
          "Transcrições, histórico, termos do dicionário, snippets e configurações ficam locais.",
          "Nenhuma conta Dictivo é necessária para ditado Local.",
          "Tiny fica grátis para sempre, e o teste Local completo de 14 dias usa a mesma fronteira.",
        ],
      },
      {
        title: "Requisições de rede",
        paragraphs: [
          "O Dictivo não promete que o app nunca usa a rede. Um app desktop precisa de uma pequena superfície de rede visível para operações de produto.",
          "A distinção importante é o propósito: checagens de atualização e ações de licença não são uploads de transcrição. Cloud Fast é o modo que muda onde a gravação escolhida é processada.",
        ],
        bullets: [
          "Checagens de atualização perguntam se há uma versão mais recente.",
          "Ações de licença e pagamento ativam compras, atualizam status, gerenciam assinaturas ou ajudam com reembolsos.",
          "Email de suporte acontece apenas quando você contata o suporte.",
          "Cloud Fast envia apenas gravações que você manda pelo Cloud Fast.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast é para gravações pouco sensíveis em que velocidade importa mais que manter o caminho totalmente local. Não é o fluxo Local padrão.",
          "Quando você escolhe Cloud Fast, a gravação selecionada é transcrita remotamente. O texto volta ao app, e dicionário local ou snippets ainda podem ser aplicados depois.",
        ],
        bullets: [
          "Use Local para áudio sensível.",
          "Use Cloud Fast apenas quando aceitar processar remotamente aquela gravação selecionada.",
          "O app deixa visível a fronteira entre Local e Cloud Fast.",
        ],
      },
    ],
    faqTitle: "Perguntas de privacidade",
    faqs: [
      ["O Dictivo envia áudio no modo Local?", "Não. O modo Local foi feito para manter a gravação no dispositivo durante a transcrição."],
      ["Por que o Dictivo usa a rede?", "O app verifica atualizações, ativa ou atualiza licenças, abre fluxos de pagamento, lida com suporte e usa Cloud Fast apenas quando selecionado."],
      ["Quando devo usar Cloud Fast?", "Use Cloud Fast para gravações pouco sensíveis quando velocidade importar mais que processamento somente local."],
      ["Windows está público?", "Não. O download público hoje é macOS. Windows x64 segue em validação antes dos downloads públicos."],
    ],
  },
  zh: {
    slug: "privacy-proof",
    navLabel: "隐私证明",
    metaTitle: "Dictivo 隐私证明 - Local、Cloud Fast 与网络边界",
    metaDescription:
      "用普通用户能看懂的话说明 Dictivo 的隐私边界：哪些内容留在本地、什么时候会访问网络、什么时候 Cloud Fast 会上传选定录音。",
    eyebrow: "隐私证明",
    title: "哪些内容留在本地，以及 Dictivo 什么时候会使用网络。",
    lede:
      "Dictivo 是本地优先，而不是云端默认。Local 模式把语音处理和产品数据留在本设备；Cloud Fast 是独立选项，只用于你主动选择远程处理的录音。",
    answerTitle: "私密听写的简短答案",
    answer:
      "在 Dictivo Local 模式下，麦克风音频、转录文本、历史记录、词典条目、文本片段、设置和本地模型选择都会留在本设备。Dictivo 会为了更新检查、许可证或支付操作、支持服务和可选 Cloud Fast 使用网络。Cloud Fast 只上传你通过该模式发送的那段录音。",
    sections: [
      {
        title: "Local 模式",
        paragraphs: [
          "当内容私密时，请使用 Local 模式。Dictivo 会在本设备上处理当前录音，并把本地产品数据保留在本设备。",
          "Local 模式适合会议、草稿、客户工作、笔记、人名、研究、提示词，以及任何你不想上传的音频。",
        ],
        bullets: [
          "Local 模式下麦克风音频留在本设备。",
          "转录文本、历史记录、词典条目、文本片段和设置留在本地。",
          "Local 听写不需要 Dictivo 账号。",
          "Tiny 永久免费，14 天完整 Local 试用也使用同样的本地边界。",
        ],
      },
      {
        title: "网络请求",
        paragraphs: [
          "Dictivo 不承诺应用永远不使用网络。桌面应用仍需要少量、可解释的网络请求来完成产品操作。",
          "关键区别是目的：更新检查和许可证操作不是转录上传。Cloud Fast 才是会改变选定录音处理位置的模式。",
        ],
        bullets: [
          "更新检查用于确认是否有新版本。",
          "许可证和支付操作用于激活购买、刷新状态、管理订阅或处理退款。",
          "支持邮件只会在你主动联系支持时发生。",
          "Cloud Fast 只上传你主动通过 Cloud Fast 发送的录音。",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast 适合低敏感度录音，且你更看重速度而不是全程本地处理的场景。它不是默认的 Local 工作流。",
          "当你选择 Cloud Fast 时，选定录音会被远程转录。转录文本返回应用后，本地词典和文本片段仍可以继续作用。",
        ],
        bullets: [
          "敏感音频使用 Local。",
          "只有当你接受该段录音远程处理时才使用 Cloud Fast。",
          "应用会清楚标示 Local 和 Cloud Fast 的边界。",
        ],
      },
    ],
    faqTitle: "隐私问题",
    faqs: [
      ["Dictivo 在 Local 模式下会上传音频吗？", "不会。Local 模式的设计目标就是在转录时把录音留在本设备。"],
      ["为什么 Dictivo 还会使用网络？", "应用会检查更新、激活或刷新许可证、打开支付流程、处理支持请求，并且只在你选择时使用 Cloud Fast。"],
      ["什么时候应该使用 Cloud Fast？", "当录音敏感度较低，并且速度比纯本地处理更重要时，可以使用 Cloud Fast。"],
      ["Windows 已经公开了吗？", "没有。当前公开下载是 macOS。Windows x64 仍在公开下载前验证。"],
    ],
  },
  ja: {
    slug: "privacy-proof",
    navLabel: "プライバシー証明",
    metaTitle: "Dictivo プライバシー証明 - Local、Cloud Fast、ネットワーク境界",
    metaDescription:
      "Dictivo のプライバシー境界を分かりやすく説明します。何がローカルに残り、いつネットワークを使い、Cloud Fast がいつ選択した録音をアップロードするか。",
    eyebrow: "プライバシー証明",
    title: "何がローカルに残り、いつ Dictivo がネットワークを使うか。",
    lede:
      "Dictivo はローカル優先であり、クラウド専用ではありません。Local モードは音声処理と製品データをデバイス上に保ちます。Cloud Fast は、選択した録音をリモート処理するための別オプションです。",
    answerTitle: "プライベートな音声入力への短い答え",
    answer:
      "Dictivo の Local モードでは、マイク音声、文字起こし、履歴、辞書語句、スニペット、設定、ローカルモデル選択がデバイス上に残ります。Dictivo は更新確認、ライセンスや支払い、サポート、任意の Cloud Fast にネットワークを使います。Cloud Fast はそのモードで送信した録音だけをアップロードします。",
    sections: [
      {
        title: "Local モード",
        paragraphs: [
          "言葉がプライベートなときは Local モードを使います。Dictivo は現在の録音をデバイス上で処理し、ローカルの製品データをそのデバイスに保ちます。",
          "Local モードは、会議、下書き、顧客対応、メモ、名前、調査、プロンプト、アップロードしたくない音声の標準経路です。",
        ],
        bullets: [
          "Local モードではマイク音声がデバイス上に残ります。",
          "文字起こし、履歴、辞書語句、スニペット、設定はローカルに残ります。",
          "Local 音声入力に Dictivo アカウントは不要です。",
          "Tiny は永久無料で、14 日間の完全 Local トライアルも同じ境界を使います。",
        ],
      },
      {
        title: "ネットワーク要求",
        paragraphs: [
          "Dictivo はアプリが一切ネットワークを使わないとは約束しません。デスクトップアプリには、製品運用のための小さく明確なネットワーク面が必要です。",
          "重要なのは目的です。更新確認やライセンス操作は文字起こしアップロードではありません。Cloud Fast が、選択した録音の処理場所を変えるモードです。",
        ],
        bullets: [
          "更新確認は新しいアプリ版があるかを確認します。",
          "ライセンスや支払い操作は購入の有効化、状態更新、購読管理、返金対応に使われます。",
          "サポートメールは、あなたがサポートに連絡したときだけ発生します。",
          "Cloud Fast は Cloud Fast で送った録音だけをアップロードします。",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast は、速度が完全ローカル経路より重要な低感度の録音向けです。標準の Local ワークフローではありません。",
          "Cloud Fast を選ぶと、選択した録音がリモートで文字起こしされます。テキストがアプリに戻った後も、ローカル辞書やスニペットを適用できます。",
        ],
        bullets: [
          "機密性の高い音声には Local を使います。",
          "その録音のリモート処理を許容できる場合だけ Cloud Fast を使います。",
          "アプリは Local と Cloud Fast の境界を見えるように表示します。",
        ],
      },
    ],
    faqTitle: "プライバシーの質問",
    faqs: [
      ["Dictivo は Local モードで音声をアップロードしますか？", "いいえ。Local モードは、文字起こし中も録音をデバイス上に保つために設計されています。"],
      ["なぜ Dictivo はネットワークを使うのですか？", "アプリは更新確認、ライセンス更新、支払いフロー、サポート、そして選択時のみ Cloud Fast にネットワークを使います。"],
      ["Cloud Fast はいつ使うべきですか？", "低感度の録音で、速度がローカルのみの処理より重要なときに使います。"],
      ["Windows は公開されていますか？", "いいえ。現在の公開ダウンロードは macOS です。Windows x64 は公開ダウンロード前の検証中です。"],
    ],
  },
  ko: {
    slug: "privacy-proof",
    navLabel: "개인정보 증명",
    metaTitle: "Dictivo 개인정보 증명 - Local, Cloud Fast, 네트워크 경계",
    metaDescription:
      "Dictivo의 개인정보 경계를 쉬운 말로 설명합니다. 무엇이 로컬에 남는지, 언제 네트워크를 쓰는지, Cloud Fast가 언제 선택한 녹음을 업로드하는지.",
    eyebrow: "개인정보 증명",
    title: "무엇이 로컬에 남고, 언제 Dictivo가 네트워크를 쓰는가.",
    lede:
      "Dictivo는 로컬 우선이며 클라우드 전용이 아닙니다. Local 모드는 음성 처리와 제품 데이터를 기기에 유지합니다. Cloud Fast는 사용자가 선택한 녹음을 원격 처리하는 별도 옵션입니다.",
    answerTitle: "비공개 받아쓰기에 대한 짧은 답",
    answer:
      "Dictivo Local 모드에서는 마이크 오디오, 전사문, 기록, 사전 용어, 스니펫, 설정, 로컬 모델 선택이 기기에 남습니다. Dictivo는 업데이트 확인, 라이선스 또는 결제 작업, 지원, 선택형 Cloud Fast에 네트워크를 사용합니다. Cloud Fast는 해당 모드로 보낸 녹음만 업로드합니다.",
    sections: [
      {
        title: "Local 모드",
        paragraphs: [
          "말이 비공개라면 Local 모드를 사용하세요. Dictivo는 현재 녹음을 기기에서 처리하고 로컬 제품 데이터를 그 기기에 유지합니다.",
          "Local 모드는 회의, 초안, 고객 업무, 메모, 이름, 조사, 프롬프트, 업로드하고 싶지 않은 오디오의 기본 경로입니다.",
        ],
        bullets: [
          "Local 모드에서는 마이크 오디오가 기기에 남습니다.",
          "전사문, 기록, 사전 용어, 스니펫, 설정은 로컬에 남습니다.",
          "Local 받아쓰기에는 Dictivo 계정이 필요 없습니다.",
          "Tiny는 영구 무료이며 14일 전체 Local 체험도 같은 경계를 사용합니다.",
        ],
      },
      {
        title: "네트워크 요청",
        paragraphs: [
          "Dictivo는 앱이 절대 네트워크를 쓰지 않는다고 약속하지 않습니다. 데스크톱 앱에는 제품 운영을 위한 작고 명확한 네트워크 표면이 필요합니다.",
          "중요한 차이는 목적입니다. 업데이트 확인과 라이선스 작업은 전사 업로드가 아닙니다. Cloud Fast가 선택한 녹음의 처리 위치를 바꾸는 모드입니다.",
        ],
        bullets: [
          "업데이트 확인은 더 새 앱 버전이 있는지 묻습니다.",
          "라이선스와 결제 작업은 구매 활성화, 상태 갱신, 구독 관리, 환불 지원에 쓰입니다.",
          "지원 이메일은 사용자가 지원팀에 연락할 때만 발생합니다.",
          "Cloud Fast는 Cloud Fast로 보낸 녹음만 업로드합니다.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast는 전체 로컬 경로보다 속도가 더 중요한 낮은 민감도의 녹음을 위한 것입니다. 기본 Local 워크플로가 아닙니다.",
          "Cloud Fast를 선택하면 선택한 녹음이 원격으로 전사됩니다. 텍스트가 앱으로 돌아온 뒤에도 로컬 사전이나 스니펫 기능을 적용할 수 있습니다.",
        ],
        bullets: [
          "민감한 오디오에는 Local을 사용하세요.",
          "해당 녹음의 원격 처리를 받아들일 수 있을 때만 Cloud Fast를 사용하세요.",
          "앱은 Local과 Cloud Fast의 경계를 보이게 표시합니다.",
        ],
      },
    ],
    faqTitle: "개인정보 질문",
    faqs: [
      ["Dictivo는 Local 모드에서 오디오를 업로드하나요?", "아니요. Local 모드는 전사 중에도 녹음을 기기에 유지하도록 설계되었습니다."],
      ["왜 Dictivo가 네트워크를 사용하나요?", "앱은 업데이트 확인, 라이선스 활성화 또는 갱신, 결제 흐름, 지원, 그리고 선택된 경우의 Cloud Fast에 네트워크를 사용합니다."],
      ["Cloud Fast는 언제 사용해야 하나요?", "민감도가 낮은 녹음에서 속도가 로컬 전용 처리보다 중요할 때 사용하세요."],
      ["Windows는 공개되었나요?", "아니요. 현재 공개 다운로드는 macOS입니다. Windows x64는 공개 다운로드 전 검증 중입니다."],
    ],
  },
};
