// Task-oriented summaries. Product-specific factual detail stays in the linked comparisons.
export const COMPARE_HUB_GUIDANCE_LASTMOD = "2026-09-20";
const slugs = ["wispr-flow-alternative", "superwhisper-alternative", "macwhisper-alternative", "voiceink-alternative", "macos-dictation-alternative", "dragon-alternative"];
const rows = {
  en: {
    title: "Test the task you actually do",
    body: "Try all Local models for 14 days without a card or Dictivo account. Download a model, dictate a short email or note, then check the text in the app you normally use. Compare the same sentence and workflow before switching.",
    download: "Download and try Dictivo", pricing: "Review pricing and trial terms",
    cards: [
      ["Cloud and local workflows", "Compare audio processing, free-plan limits and the devices you use. Check whether your workflow needs cloud editing, mobile access or local dictation."],
      ["Free access and paid features", "Start with the features you already use. Compare local models, free access, paid features and update terms before paying for a different setup."],
      ["Live dictation or recorded files", "Separate writing into an app from transcribing recordings. Compare hotkeys and text insertion for daily writing; check file, subtitle and export needs separately."],
      ["Setup and everyday controls", "Compare model setup, shortcuts, history and editing in your normal writing app. Include purchase and update terms in the decision."],
      ["Built-in dictation or another app", "Try the system's built-in dictation first. Compare whether model choice, local history or configurable shortcuts solve a specific limitation for you."],
      ["Moving an established workflow", "List the dictation, commands and specialist vocabulary you depend on. Test those tasks and platform requirements before replacing an existing Dragon workflow."],
    ],
  },
  de: {
    title: "Testen Sie Ihre tatsächliche Schreibaufgabe",
    body: "Testen Sie alle Local-Modelle 14 Tage ohne Zahlungskarte oder Dictivo-Konto. Laden Sie ein Modell herunter, diktieren Sie eine kurze E-Mail oder Notiz und prüfen Sie den Text in Ihrer üblichen App. Vergleichen Sie vor einem Wechsel denselben Satz und Ablauf.",
    download: "Dictivo herunterladen und testen", pricing: "Preise und Testbedingungen ansehen",
    cards: [
      ["Cloud oder lokale Verarbeitung", "Vergleichen Sie Audioverarbeitung, Grenzen des Gratisangebots und Ihre Geräte. Prüfen Sie, ob Sie Cloud-Bearbeitung, mobile Nutzung oder lokales Diktieren brauchen."],
      ["Gratiszugang und Kaufoptionen", "Gehen Sie von den benötigten Funktionen aus. Vergleichen Sie lokale Modelle, Gratiszugang, kostenpflichtige Funktionen und Update-Bedingungen."],
      ["Diktieren oder Aufnahmen transkribieren", "Unterscheiden Sie Texteingabe in Apps von der Transkription vorhandener Aufnahmen. Prüfen Sie Tastenkürzel und Einfügen sowie Datei-, Untertitel- und Exportaufgaben getrennt."],
      ["Einrichtung und Bedienung", "Vergleichen Sie Modelleinrichtung, Tastenkürzel, Verlauf und Korrekturen in Ihrer Schreib-App. Berücksichtigen Sie auch Kauf- und Update-Bedingungen."],
      ["Systemfunktion oder zusätzliche App", "Probieren Sie zuerst die integrierte Diktierfunktion. Prüfen Sie, ob Modellauswahl, lokaler Verlauf oder anpassbare Tastenkürzel ein konkretes Problem lösen."],
      ["Einen bewährten Ablauf ersetzen", "Notieren Sie benötigte Diktierfunktionen, Befehle und Fachbegriffe. Testen Sie diese Aufgaben und die Systemanforderungen, bevor Sie Ihren Dragon-Ablauf ersetzen."],
    ],
  },
  fr: {
    title: "Testez votre véritable tâche de rédaction",
    body: "Essayez tous les modèles Local pendant 14 jours, sans carte bancaire ni compte Dictivo. Téléchargez un modèle, dictez un court e-mail ou une note, puis vérifiez le texte dans votre application habituelle. Comparez la même phrase et le même parcours avant de changer.",
    download: "Télécharger et essayer Dictivo", pricing: "Voir les tarifs et conditions d'essai",
    cards: [
      ["Traitement local ou dans le cloud", "Comparez le traitement audio, les limites de l'offre gratuite et vos appareils. Déterminez si vous avez besoin de retouche cloud, d'un accès mobile ou de dictée locale."],
      ["Accès gratuit et fonctions payantes", "Partez des fonctions que vous utilisez. Comparez les modèles locaux, l'accès gratuit, les fonctions payantes et les conditions de mise à jour."],
      ["Dictée en direct ou fichiers enregistrés", "Distinguez la saisie dans une application de la transcription d'enregistrements. Comparez les raccourcis et l'insertion du texte, puis les besoins en fichiers, sous-titres et exports."],
      ["Installation et usage quotidien", "Comparez la configuration des modèles, les raccourcis, l'historique et les corrections dans votre application. Examinez aussi l'achat et les mises à jour."],
      ["Dictée intégrée ou autre application", "Essayez d'abord la dictée du système. Vérifiez si le choix du modèle, l'historique local ou des raccourcis personnalisables répondent à une limite précise."],
      ["Remplacer une méthode de travail", "Listez les fonctions de dictée, commandes et termes spécialisés indispensables. Testez ces tâches et la compatibilité avant de remplacer votre usage de Dragon."],
    ],
  },
  es: {
    title: "Prueba la tarea que realizas de verdad",
    body: "Prueba todos los modelos Local durante 14 días sin tarjeta ni cuenta de Dictivo. Descarga un modelo, dicta un correo o una nota breve y revisa el texto en tu aplicación habitual. Compara la misma frase y el mismo proceso antes de cambiar.",
    download: "Descargar y probar Dictivo", pricing: "Ver precios y condiciones de prueba",
    cards: [
      ["Procesamiento local o en la nube", "Compara dónde se procesa el audio, los límites gratuitos y tus dispositivos. Decide si necesitas edición en la nube, uso móvil o dictado local."],
      ["Acceso gratuito y funciones de pago", "Empieza por las funciones que utilizas. Compara modelos locales, acceso gratuito, funciones de pago y condiciones de actualización."],
      ["Dictado en directo o grabaciones", "Distingue escribir en una aplicación de transcribir grabaciones. Compara atajos e inserción de texto; revisa por separado archivos, subtítulos y exportaciones."],
      ["Configuración y uso diario", "Compara la configuración de modelos, los atajos, el historial y las correcciones en tu aplicación de escritura. Revisa también la compra y las actualizaciones."],
      ["Dictado integrado u otra aplicación", "Prueba primero el dictado del sistema. Comprueba si elegir modelos, guardar historial local o personalizar atajos resuelve una limitación concreta."],
      ["Sustituir una forma de trabajar", "Anota las funciones de dictado, comandos y vocabulario especializado que necesitas. Prueba esas tareas y la compatibilidad antes de sustituir tu uso de Dragon."],
    ],
  },
  it: {
    title: "Prova la tua vera attività di scrittura",
    body: "Prova tutti i modelli Local per 14 giorni senza carta di pagamento né account Dictivo. Scarica un modello, detta una breve email o nota e controlla il testo nell'app che usi normalmente. Confronta la stessa frase e lo stesso procedimento prima di cambiare.",
    download: "Scarica e prova Dictivo", pricing: "Consulta prezzi e condizioni della prova",
    cards: [
      ["Elaborazione locale o cloud", "Confronta elaborazione audio, limiti gratuiti e dispositivi. Verifica se ti servono modifiche nel cloud, uso mobile o dettatura locale."],
      ["Accesso gratuito e funzioni a pagamento", "Parti dalle funzioni che usi. Confronta modelli locali, accesso gratuito, funzioni a pagamento e condizioni degli aggiornamenti."],
      ["Dettatura dal vivo o registrazioni", "Distingui la scrittura in un'app dalla trascrizione di registrazioni. Confronta scorciatoie e inserimento del testo; valuta separatamente file, sottotitoli ed esportazioni."],
      ["Configurazione e uso quotidiano", "Confronta configurazione dei modelli, scorciatoie, cronologia e correzioni nella tua app. Considera anche acquisto e aggiornamenti."],
      ["Dettatura integrata o un'altra app", "Prova prima la dettatura del sistema. Verifica se scelta dei modelli, cronologia locale o scorciatoie personalizzabili risolvono un limite preciso."],
      ["Sostituire un flusso di lavoro", "Elenca funzioni di dettatura, comandi e termini specialistici indispensabili. Prova queste attività e la compatibilità prima di sostituire il tuo uso di Dragon."],
    ],
  },
  nl: {
    title: "Test de schrijftaak die je echt uitvoert",
    body: "Probeer alle Local-modellen 14 dagen zonder betaalkaart of Dictivo-account. Download een model, dicteer een korte e-mail of notitie en controleer de tekst in je gewone app. Vergelijk dezelfde zin en werkwijze voordat je overstapt.",
    download: "Dictivo downloaden en proberen", pricing: "Bekijk prijzen en proefvoorwaarden",
    cards: [
      ["Lokale verwerking of cloud", "Vergelijk audioverwerking, gratis limieten en de apparaten die je gebruikt. Bepaal of je cloudbewerking, mobiel gebruik of lokaal dicteren nodig hebt."],
      ["Gratis toegang en betaalde functies", "Begin bij de functies die je gebruikt. Vergelijk lokale modellen, gratis toegang, betaalde functies en updatevoorwaarden."],
      ["Live dicteren of opnamen omzetten", "Maak onderscheid tussen typen met je stem en opgenomen bestanden transcriberen. Vergelijk sneltoetsen en tekstinvoer; bekijk bestanden, ondertitels en export apart."],
      ["Installatie en dagelijks gebruik", "Vergelijk modelinstellingen, sneltoetsen, geschiedenis en correcties in je schrijfapp. Neem ook aankoop- en updatevoorwaarden mee."],
      ["Ingebouwde dictatie of een extra app", "Probeer eerst de dicteerfunctie van het systeem. Kijk of modelkeuze, lokale geschiedenis of instelbare sneltoetsen een concreet probleem oplossen."],
      ["Een bestaande werkwijze vervangen", "Noteer welke dicteerfuncties, opdrachten en vaktermen je nodig hebt. Test die taken en de platformvereisten voordat je je Dragon-werkwijze vervangt."],
    ],
  },
  pt: {
    title: "Teste a tarefa de escrita que você realmente faz",
    body: "Experimente todos os modelos Local por 14 dias sem cartão ou conta Dictivo. Baixe um modelo, dite um email ou uma nota curta e confira o texto no aplicativo que costuma usar. Compare a mesma frase e o mesmo processo antes de trocar.",
    download: "Baixar e experimentar o Dictivo", pricing: "Ver preços e condições do teste",
    cards: [
      ["Processamento local ou na nuvem", "Compare o processamento do áudio, os limites gratuitos e seus dispositivos. Veja se precisa de edição na nuvem, acesso móvel ou digitação por voz local."],
      ["Acesso gratuito e recursos pagos", "Comece pelos recursos que você usa. Compare modelos locais, acesso gratuito, funções pagas e condições de atualização."],
      ["Digitação por voz ou gravações", "Separe escrever em um aplicativo de transcrever gravações. Compare atalhos e inserção de texto; avalie arquivos, legendas e exportação separadamente."],
      ["Configuração e uso diário", "Compare a configuração dos modelos, os atalhos, o histórico e as correções no seu aplicativo. Considere também a compra e as atualizações."],
      ["Ditado do sistema ou outro aplicativo", "Teste primeiro o ditado integrado. Veja se escolher modelos, ter histórico local ou personalizar atalhos resolve uma limitação concreta."],
      ["Substituir uma rotina existente", "Liste os recursos de ditado, comandos e termos especializados de que precisa. Teste essas tarefas e a compatibilidade antes de substituir sua rotina com o Dragon."],
    ],
  },
  zh: {
    title: "用你真正要写的内容试一次",
    body: "全部 Local 模型可免费试用 14 天，无需银行卡或 Dictivo 账号。下载模型后，说一封简短邮件或一条笔记，再到平时使用的应用里检查文字。换工具前，用同一句话和同一套操作比较。",
    download: "下载并试用 Dictivo", pricing: "查看价格和试用条款",
    cards: [
      ["云端与本地输入", "比较音频处理位置、免费额度和常用设备。先明确你需要云端改写、移动端使用，还是本地语音输入。"],
      ["免费功能与付费选择", "从已在使用的功能出发，比较本地模型、免费范围、付费功能和更新条款，再决定是否更换。"],
      ["实时输入还是录音转写", "区分向应用输入文字与转写已有录音。日常写作比较快捷键和文字插入；文件、字幕和导出需求单独核对。"],
      ["初次设置与日常操作", "在常用写作应用里比较模型设置、快捷键、历史记录和文字修改，同时核对购买与后续更新条件。"],
      ["系统自带功能还是独立软件", "先试系统自带语音输入，再确认可选模型、本地历史或自定义快捷键是否能解决你的具体问题。"],
      ["迁移已有工作流程", "列出依赖的听写功能、语音命令和专业词汇。替换 Dragon 前，逐项试用这些任务并确认平台要求。"],
    ],
  },
  "zh-hant": {
    title: "用你真正要寫的內容試一次",
    body: "全部 Local 模型可免費試用 14 天，無需信用卡或 Dictivo 帳號。下載模型後，說一封簡短郵件或一則筆記，再到平常使用的應用程式裡檢查文字。換工具前，用同一句話和同一套操作比較。",
    download: "下載並試用 Dictivo", pricing: "查看價格與試用條款",
    cards: [
      ["雲端與本機輸入", "比較音訊處理位置、免費額度與常用裝置。先確認你需要雲端改寫、行動裝置使用，還是本機語音輸入。"],
      ["免費功能與付費選擇", "從正在使用的功能出發，比較本機模型、免費範圍、付費功能與更新條款，再決定是否更換。"],
      ["即時輸入還是錄音轉文字", "區分向應用程式輸入文字與轉寫既有錄音。日常寫作比較快捷鍵與文字插入；檔案、字幕與匯出需求另外確認。"],
      ["初次設定與日常操作", "在常用寫作應用程式裡比較模型設定、快捷鍵、歷史記錄與文字修改，同時確認購買與後續更新條件。"],
      ["系統內建功能還是獨立軟體", "先試系統內建語音輸入，再確認模型選擇、本機歷史記錄或自訂快捷鍵是否能解決你的具體問題。"],
      ["遷移既有工作流程", "列出依賴的聽寫功能、語音指令與專業詞彙。替換 Dragon 前，逐項試用這些任務並確認系統需求。"],
    ],
  },
  ja: {
    title: "普段の作業で試してから選ぶ",
    body: "すべてのLocalモデルを14日間、カードやDictivoアカウントなしで試せます。モデルをダウンロードし、短いメールやメモを話して、普段使うアプリで文字を確認してください。同じ文章と操作で比較してから乗り換えましょう。",
    download: "Dictivoをダウンロードして試す", pricing: "料金と試用条件を確認",
    cards: [
      ["クラウド処理とローカル処理", "音声の処理場所、無料枠、使用する端末を比較。クラウドでの編集、モバイル利用、ローカル音声入力のどれが必要かを確認します。"],
      ["無料機能と有料機能", "普段使う機能から検討。ローカルモデル、無料で使える範囲、有料機能、更新条件を比べてから判断します。"],
      ["その場の音声入力と録音の文字起こし", "アプリへの文字入力と録音済みファイルの処理を区別。ショートカットと貼り付けを比べ、ファイル・字幕・書き出しは別に確認します。"],
      ["初期設定と日常操作", "普段のアプリでモデル設定、ショートカット、履歴、修正の流れを比較。購入条件と更新条件も確認します。"],
      ["標準の音声入力か別のアプリか", "まずOS標準の音声入力を試し、モデル選択、ローカル履歴、キー設定が具体的な不便を解消するか確認します。"],
      ["使い慣れた作業の移行", "必要な音声入力機能、音声コマンド、専門用語を整理。Dragonから移行する前に、それぞれの作業と対応環境を試します。"],
    ],
  },
  ko: {
    title: "실제로 하는 글쓰기 작업으로 비교하세요",
    body: "카드나 Dictivo 계정 없이 모든 Local 모델을 14일간 사용해 보세요. 모델을 다운로드한 뒤 짧은 이메일이나 메모를 말하고 평소 쓰는 앱에서 결과를 확인하세요. 바꾸기 전에 같은 문장과 작업 과정으로 비교하세요.",
    download: "Dictivo 다운로드 및 체험", pricing: "가격과 체험 조건 확인",
    cards: [
      ["클라우드와 기기 내 처리", "음성 처리 위치, 무료 사용 한도, 사용하는 기기를 비교하세요. 클라우드 편집, 모바일 사용, 로컬 음성 입력 중 필요한 기능을 확인하세요."],
      ["무료 기능과 유료 선택", "현재 사용하는 기능부터 살펴보세요. 로컬 모델, 무료 범위, 유료 기능과 업데이트 조건을 비교한 뒤 결정하세요."],
      ["실시간 입력과 녹음 파일 변환", "앱에 글을 입력하는 작업과 기존 녹음의 텍스트 변환을 구분하세요. 단축키와 텍스트 삽입을 비교하고 파일, 자막, 내보내기는 별도로 확인하세요."],
      ["초기 설정과 일상적인 조작", "평소 쓰는 앱에서 모델 설정, 단축키, 기록과 수정 과정을 비교하세요. 구매 및 업데이트 조건도 확인하세요."],
      ["기본 음성 입력과 별도 앱", "운영체제 기본 음성 입력부터 사용해 보세요. 모델 선택, 로컬 기록, 단축키 설정이 구체적인 불편을 해결하는지 확인하세요."],
      ["기존 작업 방식의 전환", "필요한 받아쓰기 기능, 음성 명령과 전문 용어를 정리하세요. Dragon을 대체하기 전에 해당 작업과 플랫폼 요구 사항을 확인하세요."],
    ],
  },
};

export const COMPARE_HUB_GUIDANCE = Object.fromEntries(Object.entries(rows).map(([locale, copy]) => [locale, {
  ...copy,
  cards: Object.fromEntries(slugs.map((slug, index) => [slug, { label: copy.cards[index][0], summary: copy.cards[index][1] }])),
}]));
