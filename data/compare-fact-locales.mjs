// Translate the actual competitor facts, never generic Dictivo sales copy.
// Prices and trial quantities are substituted from the canonical English row.
// A change in billing structure or feature scope also requires a template review.
const keys = [
  "cloud", "sharing", "online", "account", "wisprPrice", "wisprTrial", "wisprPlatforms", "cloudBoundary",
  "hybrid", "localCloud", "offline", "license", "superPrice", "superTrial", "superPlatforms",
  "noAccount", "macPrice", "macTrial", "macBoundary", "localText", "voicePrice", "voiceTrial", "voicePlatforms",
  "appleProcessing", "appleTraining", "appleOffline", "noExtraAccount", "included", "applePlatforms",
  "localActivated", "localProfile", "offlineActivated", "activation", "dragonPrice", "dragonTrial", "dragonPlatforms", "dragonBoundary",
];

const translations = {
  de: [
    "Die Spracherkennung läuft in der Cloud.", "Modelltraining durch Datenfreigabe ist optional; Cloud-Speicherung wird separat eingestellt.", "Nein, die Spracherkennung braucht eine Internetverbindung.", "Ja, ein Konto ist erforderlich.",
    "Pro: {0} pro Person/Monat oder {1} pro Person/Monat bei jährlicher Abrechnung.", "Kostenlos: {0} Wörter/Woche am Desktop, {1} am iPhone; unbegrenzt auf Android.", "Mac, Windows, iPhone, Android.", "Datenschutzregeln ändern Speicherung und Nutzung; die Spracherkennung bleibt in der Cloud.",
    "Lokale Modelle laufen auf dem Gerät; Cloud-Modelle sind optional.", "Lokales Audio bleibt auf dem Gerät. Für optionale Cloud- und KI-Funktionen gelten eigene Datenregeln.", "Ja, mit installiertem lokalen Modell.", "Bezahlte Funktionen werden mit einer Lizenz in der App aktiviert.",
    "Pro: {0}/Monat, {1}/Jahr oder {2} als Einmalkauf.", "Kostenloser Einstieg und Pro-Test für {0} Wörter. Prüfen Sie die verfügbaren Modelle in Ihrer App-Version.", "Mac, Windows, iPhone, iPad.",
    "Kein Konto für die lokale Kernfunktion.", "Pro: einmal {0}, lebenslange Updates inklusive.", "Kostenloser Download mit Tiny, Base und Small.", "Lokale Transkription und systemweites Diktat; Cloud- und KI-Integrationen sind optional.",
    "Lokale Spracherkennung; optionale Cloud-Nachbearbeitung kann Text an einen Dienst senden.", "Aktuelles Angebot: Solo {0} (1 Mac), Personal {1} (2 Macs), Extended {2} (3 Macs). Lebenslange Updates inklusive.", "Kostenloser Testdownload; {0} Tage Geld-zurück-Garantie beim Kauf.", "Apple Silicon Mac; macOS {0} oder neuer.",
    "Abhängig von Mac, Sprache und Einstellungen. Prüfen Sie den Verarbeitungshinweis in den Tastatureinstellungen.", "Die Nutzung von Anfrage- und Transkriptionsdaten sowie Audio hängt von Apples Datenschutz- und Siri-Einstellungen ab.", "Abhängig von Gerät, Sprache und Einstellungen.", "Kein zusätzliches Diktierkonto.", "In macOS enthalten, ohne zusätzlichen Kauf.", "macOS und weitere Apple-Plattformen.",
    "Dragon Professional v16 verarbeitet lokal; Installation und Aktivierung benötigen Internet.", "Ein lokales Sprachprofil wird angepasst; dies beschreibt die Desktop-Ausgabe.", "Ja, nach der Aktivierung der Desktop-Ausgabe.", "Einmalige Online-Aktivierung; kein Konto für tägliches Diktieren.", "Dragon Professional v16: einmal {0}; Händlerangebote können abweichen.", "Kein kostenloser Tarif; Testangebote beim Händler prüfen.", "Dragon Professional v16: Windows 10/11. Keine aktuelle native Mac-Ausgabe.", "Lokale Desktop-Ausgabe; Dragon Professional Anywhere und Medical One sind separate Cloud-Produkte.",
  ],
  fr: [
    "La reconnaissance vocale s'effectue dans le cloud.", "Le partage pour améliorer les modèles est facultatif ; le stockage cloud se règle séparément.", "Non, la reconnaissance vocale nécessite Internet.", "Oui, un compte est nécessaire.",
    "Pro : {0}/personne/mois, ou {1}/personne/mois avec facturation annuelle.", "Gratuit : {0} mots/semaine sur ordinateur, {1} sur iPhone ; illimité sur Android.", "Mac, Windows, iPhone, Android.", "Les réglages contrôlent l'utilisation et la conservation des données ; la transcription reste dans le cloud.",
    "Les modèles locaux tournent sur l'appareil ; les modèles cloud sont facultatifs.", "L'audio local reste sur l'appareil. Les fonctions cloud et IA facultatives ont leurs propres règles de traitement.", "Oui, avec un modèle local installé.", "Les fonctions payantes s'activent avec une licence dans l'app.",
    "Pro : {0}/mois, {1}/an ou {2} en un achat.", "Offre gratuite et essai Pro de {0} mots. Vérifiez les modèles disponibles dans votre version.", "Mac, Windows, iPhone, iPad.",
    "Aucun compte pour les fonctions locales de base.", "Pro : {0} en un achat, mises à jour à vie incluses.", "Téléchargement gratuit avec Tiny, Base et Small.", "Transcription locale et dictée dans les apps ; intégrations cloud et IA facultatives.",
    "Reconnaissance locale ; la correction cloud facultative peut envoyer le texte à un service.", "Offre actuelle : Solo {0} (1 Mac), Personal {1} (2 Mac), Extended {2} (3 Mac). Mises à jour à vie incluses.", "Essai gratuit à télécharger ; remboursement sous {0} jours après achat.", "Mac Apple Silicon ; macOS {0} ou ultérieur.",
    "Selon le Mac, la langue et les réglages. Consultez l'indication de traitement dans les réglages Clavier.", "L'utilisation des requêtes, transcriptions et enregistrements dépend des réglages de confidentialité et de Siri d'Apple.", "Selon l'appareil, la langue et les réglages.", "Aucun compte de dictée supplémentaire.", "Inclus dans macOS, sans achat supplémentaire.", "macOS et autres plateformes Apple.",
    "Dragon Professional v16 traite localement ; installation et activation nécessitent Internet.", "Le profil vocal s'adapte localement ; cela concerne l'édition de bureau.", "Oui, après activation de l'édition de bureau.", "Activation en ligne initiale ; aucun compte pour dicter au quotidien.", "Dragon Professional v16 : {0} en un achat ; le prix peut varier selon le revendeur.", "Pas d'offre gratuite ; vérifiez les essais chez le revendeur.", "Dragon Professional v16 : Windows 10/11. Pas de version Mac native actuelle.", "Édition de bureau locale ; Dragon Professional Anywhere et Medical One sont des produits cloud distincts.",
  ],
  es: [
    "El reconocimiento de voz se realiza en la nube.", "Compartir datos para mejorar modelos es opcional; el almacenamiento en la nube se configura por separado.", "No, el reconocimiento de voz necesita Internet.", "Sí, requiere una cuenta.",
    "Pro: {0}/persona/mes, o {1}/persona/mes con facturación anual.", "Gratis: {0} palabras/semana en escritorio, {1} en iPhone; ilimitadas en Android.", "Mac, Windows, iPhone, Android.", "Los controles regulan el uso y la conservación de datos; la transcripción sigue en la nube.",
    "Los modelos locales se ejecutan en el dispositivo; los modelos de nube son opcionales.", "El audio local permanece en el dispositivo. Las funciones opcionales de nube e IA tienen sus propias condiciones de datos.", "Sí, con un modelo local instalado.", "Las funciones de pago se activan con una licencia en la app.",
    "Pro: {0}/mes, {1}/año o {2} en un único pago.", "Plan gratuito y prueba Pro de {0} palabras. Comprueba los modelos disponibles en tu versión.", "Mac, Windows, iPhone, iPad.",
    "Sin cuenta para las funciones locales básicas.", "Pro: {0} en un único pago, con actualizaciones de por vida.", "Descarga gratuita con Tiny, Base y Small.", "Transcripción local y dictado en las apps; integraciones opcionales de nube e IA.",
    "Reconocimiento local; la mejora opcional en la nube puede enviar texto a un servicio.", "Oferta actual: Solo {0} (1 Mac), Personal {1} (2 Mac), Extended {2} (3 Mac). Actualizaciones de por vida.", "Descarga de prueba gratuita; devolución durante {0} días tras la compra.", "Mac con Apple Silicon; macOS {0} o posterior.",
    "Depende del Mac, idioma y ajustes. Consulta la indicación de procesamiento en los ajustes de Teclado.", "El uso de solicitudes, transcripciones y audio depende de los ajustes de privacidad y Siri de Apple.", "Depende del dispositivo, idioma y ajustes.", "No requiere una cuenta adicional de dictado.", "Incluido en macOS, sin compra adicional.", "macOS y otras plataformas Apple.",
    "Dragon Professional v16 procesa localmente; la instalación y activación necesitan Internet.", "Adapta un perfil de voz local; esto corresponde a la edición de escritorio.", "Sí, tras activar la edición de escritorio.", "Activación inicial por Internet; sin cuenta para el dictado diario.", "Dragon Professional v16: {0} en un único pago; el precio puede variar según el vendedor.", "Sin plan gratuito; consulta las pruebas con el vendedor.", "Dragon Professional v16: Windows 10/11. Sin versión nativa actual para Mac.", "Edición local de escritorio; Dragon Professional Anywhere y Medical One son productos de nube distintos.",
  ],
  it: [
    "Il riconoscimento vocale avviene nel cloud.", "La condivisione per migliorare i modelli è facoltativa; l'archiviazione cloud si imposta separatamente.", "No, il riconoscimento vocale richiede Internet.", "Sì, serve un account.",
    "Pro: {0}/persona/mese, oppure {1}/persona/mese con fatturazione annuale.", "Gratis: {0} parole/settimana su desktop, {1} su iPhone; illimitate su Android.", "Mac, Windows, iPhone, Android.", "Le impostazioni regolano uso e conservazione dei dati; la trascrizione resta nel cloud.",
    "I modelli locali funzionano sul dispositivo; i modelli cloud sono facoltativi.", "L'audio locale resta sul dispositivo. Le funzioni cloud e IA facoltative hanno proprie regole sui dati.", "Sì, con un modello locale installato.", "Le funzioni a pagamento si attivano con una licenza nell'app.",
    "Pro: {0}/mese, {1}/anno oppure {2} con acquisto unico.", "Piano gratuito e prova Pro di {0} parole. Controlla i modelli disponibili nella tua versione.", "Mac, Windows, iPhone, iPad.",
    "Nessun account per le funzioni locali di base.", "Pro: {0} una sola volta, aggiornamenti a vita inclusi.", "Download gratuito con Tiny, Base e Small.", "Trascrizione locale e dettatura nelle app; integrazioni cloud e IA facoltative.",
    "Riconoscimento locale; il miglioramento cloud facoltativo può inviare testo a un servizio.", "Offerta attuale: Solo {0} (1 Mac), Personal {1} (2 Mac), Extended {2} (3 Mac). Aggiornamenti a vita inclusi.", "Download di prova gratuito; rimborso entro {0} giorni dall'acquisto.", "Mac Apple Silicon; macOS {0} o successivo.",
    "Dipende da Mac, lingua e impostazioni. Controlla l'indicazione sull'elaborazione nelle impostazioni Tastiera.", "L'uso di richieste, trascrizioni e audio dipende dalle impostazioni privacy e Siri di Apple.", "Dipende da dispositivo, lingua e impostazioni.", "Nessun account aggiuntivo per la dettatura.", "Incluso in macOS, senza acquisti aggiuntivi.", "macOS e altre piattaforme Apple.",
    "Dragon Professional v16 elabora localmente; installazione e attivazione richiedono Internet.", "Adatta un profilo vocale locale; questo riguarda l'edizione desktop.", "Sì, dopo l'attivazione dell'edizione desktop.", "Attivazione online iniziale; nessun account per dettare ogni giorno.", "Dragon Professional v16: {0} una sola volta; il prezzo può variare per rivenditore.", "Nessun piano gratuito; verificare le prove presso il rivenditore.", "Dragon Professional v16: Windows 10/11. Nessuna versione Mac nativa attuale.", "Edizione desktop locale; Dragon Professional Anywhere e Medical One sono prodotti cloud separati.",
  ],
  nl: [
    "Spraakherkenning gebeurt in de cloud.", "Gegevens delen om modellen te verbeteren is optioneel; cloudopslag heeft een aparte instelling.", "Nee, spraakherkenning vereist internet.", "Ja, een account is vereist.",
    "Pro: {0}/persoon/maand, of {1}/persoon/maand bij jaarlijkse betaling.", "Gratis: {0} woorden/week op desktop, {1} op iPhone; onbeperkt op Android.", "Mac, Windows, iPhone, Android.", "Instellingen bepalen gebruik en bewaring van gegevens; transcriptie blijft in de cloud.",
    "Lokale modellen draaien op het apparaat; cloudmodellen zijn optioneel.", "Lokale audio blijft op het apparaat. Optionele cloud- en AI-functies hebben eigen gegevensvoorwaarden.", "Ja, met een geïnstalleerd lokaal model.", "Betaalde functies activeer je met een licentie in de app.",
    "Pro: {0}/maand, {1}/jaar of eenmalig {2}.", "Gratis versie en Pro-proef voor {0} woorden. Controleer de beschikbare modellen in jouw appversie.", "Mac, Windows, iPhone, iPad.",
    "Geen account voor de lokale basisfuncties.", "Pro: eenmalig {0}, inclusief levenslange updates.", "Gratis download met Tiny, Base en Small.", "Lokale transcriptie en dicteren in apps; cloud- en AI-integraties zijn optioneel.",
    "Lokale spraakherkenning; optionele cloudverbetering kan tekst naar een dienst sturen.", "Huidige aanbieding: Solo {0} (1 Mac), Personal {1} (2 Macs), Extended {2} (3 Macs). Levenslange updates inbegrepen.", "Gratis proefdownload; {0} dagen geld-terug-garantie na aankoop.", "Apple Silicon Mac; macOS {0} of nieuwer.",
    "Afhankelijk van Mac, taal en instellingen. Bekijk de verwerkingsmelding in de toetsenbordinstellingen.", "Gebruik van verzoeken, transcripties en audio hangt af van Apples privacy- en Siri-instellingen.", "Afhankelijk van apparaat, taal en instellingen.", "Geen extra account voor dicteren.", "Inbegrepen bij macOS, zonder extra aankoop.", "macOS en andere Apple-platformen.",
    "Dragon Professional v16 verwerkt lokaal; installatie en activering vereisen internet.", "Past een lokaal stemprofiel aan; dit betreft de desktopversie.", "Ja, na activering van de desktopversie.", "Eenmalige online activering; geen account voor dagelijks dicteren.", "Dragon Professional v16: eenmalig {0}; de prijs kan per verkoper verschillen.", "Geen gratis versie; vraag de verkoper naar een proefversie.", "Dragon Professional v16: Windows 10/11. Geen huidige native Mac-versie.", "Lokale desktopversie; Dragon Professional Anywhere en Medical One zijn aparte cloudproducten.",
  ],
  pt: [
    "O reconhecimento de voz ocorre na nuvem.", "Compartilhar dados para melhorar modelos é opcional; o armazenamento na nuvem é configurado separadamente.", "Não, o reconhecimento de voz precisa de Internet.", "Sim, exige conta.",
    "Pro: {0}/pessoa/mês, ou {1}/pessoa/mês com cobrança anual.", "Grátis: {0} palavras/semana no computador, {1} no iPhone; ilimitadas no Android.", "Mac, Windows, iPhone, Android.", "Os controles regulam uso e retenção dos dados; a transcrição continua na nuvem.",
    "Modelos locais rodam no dispositivo; modelos de nuvem são opcionais.", "O áudio local fica no dispositivo. Funções opcionais de nuvem e IA têm suas próprias regras de dados.", "Sim, com um modelo local instalado.", "Funções pagas são ativadas com uma licença no aplicativo.",
    "Pro: {0}/mês, {1}/ano ou {2} em compra única.", "Plano gratuito e teste Pro de {0} palavras. Confira os modelos disponíveis na sua versão.", "Mac, Windows, iPhone, iPad.",
    "Sem conta para as funções locais básicas.", "Pro: {0} uma única vez, com atualizações vitalícias.", "Download gratuito com Tiny, Base e Small.", "Transcrição local e ditado nos aplicativos; integrações de nuvem e IA são opcionais.",
    "Reconhecimento local; o aprimoramento opcional na nuvem pode enviar texto a um serviço.", "Oferta atual: Solo {0} (1 Mac), Personal {1} (2 Macs), Extended {2} (3 Macs). Atualizações vitalícias incluídas.", "Download de teste gratuito; reembolso em até {0} dias após a compra.", "Mac com Apple Silicon; macOS {0} ou posterior.",
    "Depende do Mac, idioma e configurações. Veja o aviso de processamento nos ajustes de Teclado.", "O uso de solicitações, transcrições e áudio depende dos ajustes de privacidade e Siri da Apple.", "Depende do dispositivo, idioma e configurações.", "Sem conta adicional para ditado.", "Incluído no macOS, sem compra adicional.", "macOS e outras plataformas Apple.",
    "Dragon Professional v16 processa localmente; instalação e ativação precisam de Internet.", "Adapta um perfil de voz local; isso se refere à edição desktop.", "Sim, após ativar a edição desktop.", "Ativação inicial online; sem conta para ditar no dia a dia.", "Dragon Professional v16: {0} em compra única; o preço pode variar por revendedor.", "Sem plano gratuito; consulte testes com o revendedor.", "Dragon Professional v16: Windows 10/11. Sem versão nativa atual para Mac.", "Edição local de desktop; Dragon Professional Anywhere e Medical One são produtos de nuvem separados.",
  ],
  zh: [
    "语音识别在云端进行。", "用于改进模型的数据共享可选；云端存储是单独的设置。", "不支持，语音识别需要联网。", "需要账号。",
    "Pro：按月付费为每人每月 {0}；按年付费折合每人每月 {1}。", "免费额度：桌面端每周 {0} 词，iPhone 每周 {1} 词；Android 不限词数。", "Mac、Windows、iPhone、Android。", "设置控制数据使用和保留；语音识别仍在云端。",
    "本地模型在设备上运行，也可选择云端模型。", "本地识别的音频留在设备上；可选云端与 AI 功能有各自的数据处理规则。", "安装本地模型后支持。", "付费功能需要在应用中激活许可证。",
    "Pro：每月 {0}、每年 {1}，或 {2} 一次购买。", "提供免费档和 {0} 词 Pro 试用；免费模型范围请以所安装版本为准。", "Mac、Windows、iPhone、iPad。",
    "核心本地功能无需账号。", "Pro：{0} 一次购买，包含终身更新。", "可免费下载，包含 Tiny、Base、Small 模型。", "支持本地转写和系统级听写；云端与 AI 集成可选。",
    "语音在本机识别；可选云端润色可向服务商发送文字。", "当前优惠：Solo {0}（1 台 Mac）、Personal {1}（2 台）、Extended {2}（3 台），包含终身更新。", "可下载免费试用；购买后提供 {0} 天退款保证。", "Apple Silicon Mac，macOS {0} 或更新版本。",
    "取决于 Mac、语言和设置；请查看键盘设置中的处理位置说明。", "请求数据、转写文本及音频的使用取决于 Apple 隐私与 Siri 设置。", "取决于设备、语言和设置。", "无需额外的听写账号。", "macOS 内置，无需额外购买。", "macOS 及其他 Apple 平台。",
    "Dragon Professional v16 在本机处理；安装和激活需要联网。", "桌面版通过本地语音档案进行适配。", "桌面版激活后支持离线。", "首次需要在线激活，日常听写无需账号。", "Dragon Professional v16：{0} 一次购买，具体报价可能因经销商而异。", "无免费档，试用安排需查看经销商说明。", "Dragon Professional v16：Windows 10/11，目前无原生 Mac 版本。", "此处比较本地桌面版；Dragon Professional Anywhere 和 Medical One 是独立的云端产品。",
  ],
  ja: [
    "音声認識はクラウドで処理されます。", "モデル改善へのデータ共有は任意です。クラウド保存は別の設定です。", "いいえ。音声認識にはインターネットが必要です。", "アカウントが必要です。",
    "Pro：月払いは1人あたり月額{0}、年払いは月額換算{1}。", "無料枠：デスクトップは週{0}語、iPhoneは週{1}語。Androidは無制限。", "Mac、Windows、iPhone、Android。", "設定でデータの利用・保存を管理できますが、音声認識はクラウドのままです。",
    "ローカルモデルはデバイス上で動作し、クラウドモデルも選べます。", "ローカル認識の音声はデバイス内に残ります。任意のクラウド・AI機能には個別のデータ条件があります。", "ローカルモデルのインストール後は利用できます。", "有料機能はアプリでライセンスを有効化します。",
    "Pro：月額{0}、年額{1}、または{2}の買い切り。", "無料プランと{0}語のPro体験があります。無料で使えるモデルはインストールした版で確認してください。", "Mac、Windows、iPhone、iPad。",
    "基本のローカル機能にアカウントは不要です。", "Pro：{0}の買い切り。無期限のアップデート付き。", "Tiny、Base、Smallを含む無料ダウンロードがあります。", "ローカル文字起こしとシステム全体の音声入力に対応。クラウド・AI連携は任意です。",
    "音声はローカルで認識。任意のクラウド文章補正ではテキストを外部サービスに送る場合があります。", "現在の価格：Solo {0}（Mac 1台）、Personal {1}（2台）、Extended {2}（3台）。無期限のアップデート付き。", "無料体験版をダウンロード可能。購入後{0}日間の返金保証。", "Apple Silicon Mac、macOS {0}以降。",
    "Mac、言語、設定によって異なります。キーボード設定の処理場所の説明を確認してください。", "リクエスト、文字起こし、音声の利用はAppleのプライバシーとSiriの設定によります。", "デバイス、言語、設定によって異なります。", "音声入力専用の追加アカウントは不要です。", "macOSに付属。追加購入は不要です。", "macOSおよびその他のAppleプラットフォーム。",
    "Dragon Professional v16はローカル処理です。インストールと有効化には通信が必要です。", "デスクトップ版はローカルの音声プロファイルを調整します。", "デスクトップ版は有効化後にオフラインで使えます。", "初回にオンライン有効化が必要です。日常の音声入力にアカウントは不要です。", "Dragon Professional v16：{0}の買い切り。販売店によって価格が異なる場合があります。", "無料プランはありません。体験版は販売店の案内を確認してください。", "Dragon Professional v16：Windows 10/11。現行のネイティブMac版はありません。", "ここではローカルのデスクトップ版を比較しています。Dragon Professional AnywhereとMedical Oneは別のクラウド製品です。",
  ],
  ko: [
    "음성 인식은 클라우드에서 처리합니다.", "모델 개선을 위한 데이터 공유는 선택 사항이며, 클라우드 저장은 별도 설정입니다.", "아니요. 음성 인식에 인터넷이 필요합니다.", "계정이 필요합니다.",
    "Pro: 월 결제는 1인당 월 {0}, 연 결제는 월 환산 {1}입니다.", "무료 한도: 데스크톱 주 {0}단어, iPhone 주 {1}단어. Android는 무제한입니다.", "Mac, Windows, iPhone, Android.", "설정은 데이터 사용과 보관을 제어하지만 음성 인식은 계속 클라우드에서 처리합니다.",
    "로컬 모델은 기기에서 실행하며 클라우드 모델도 선택할 수 있습니다.", "로컬 인식 음성은 기기에 남습니다. 선택형 클라우드·AI 기능에는 별도 데이터 조건이 적용됩니다.", "로컬 모델 설치 후 가능합니다.", "유료 기능은 앱에서 라이선스를 활성화합니다.",
    "Pro: 월 {0}, 연 {1}, 또는 {2} 일회 구매.", "무료 요금제와 {0}단어 Pro 체험을 제공합니다. 무료 모델 범위는 설치한 버전에서 확인하세요.", "Mac, Windows, iPhone, iPad.",
    "기본 로컬 기능에는 계정이 필요 없습니다.", "Pro: {0} 일회 구매, 평생 업데이트 포함.", "Tiny, Base, Small 모델을 포함한 무료 다운로드.", "로컬 전사와 시스템 전체 받아쓰기를 지원하며 클라우드·AI 연동은 선택 사항입니다.",
    "음성을 로컬로 인식하며, 선택형 클라우드 보정은 텍스트를 외부 서비스로 보낼 수 있습니다.", "현재 할인: Solo {0}(Mac 1대), Personal {1}(2대), Extended {2}(3대). 평생 업데이트 포함.", "무료 체험 다운로드와 구매 후 {0}일 환불 보장.", "Apple Silicon Mac, macOS {0} 이상.",
    "Mac, 언어, 설정에 따라 다릅니다. 키보드 설정에서 처리 위치 설명을 확인하세요.", "요청, 전사문, 음성의 사용은 Apple 개인정보 및 Siri 설정에 따라 다릅니다.", "기기, 언어, 설정에 따라 다릅니다.", "별도의 받아쓰기 계정이 필요 없습니다.", "macOS에 포함되어 추가 구매가 필요 없습니다.", "macOS 및 기타 Apple 플랫폼.",
    "Dragon Professional v16은 로컬 처리하며 설치와 활성화에는 인터넷이 필요합니다.", "데스크톱 버전은 로컬 음성 프로필을 조정합니다.", "데스크톱 버전 활성화 후 오프라인으로 사용할 수 있습니다.", "최초 온라인 활성화가 필요하며 일상 받아쓰기에는 계정이 필요 없습니다.", "Dragon Professional v16: {0} 일회 구매. 판매처에 따라 가격이 다를 수 있습니다.", "무료 요금제가 없습니다. 체험 여부는 판매처에서 확인하세요.", "Dragon Professional v16: Windows 10/11. 현재 네이티브 Mac 버전은 없습니다.", "로컬 데스크톱 버전을 비교합니다. Dragon Professional Anywhere와 Medical One은 별도 클라우드 제품입니다.",
  ],
};

const profiles = {
  "wispr-flow-alternative": ["cloud", "sharing", "online", "account", "wisprPrice", "wisprTrial", "wisprPlatforms", "cloudBoundary"],
  "superwhisper-alternative": ["hybrid", "localCloud", "offline", "license", "superPrice", "superTrial", "superPlatforms", "hybrid"],
  "macwhisper-alternative": ["hybrid", "localCloud", "offline", "noAccount", "macPrice", "macTrial", "macOS", "macBoundary"],
  "voiceink-alternative": ["localText", "localCloud", "offline", "license", "voicePrice", "voiceTrial", "voicePlatforms", "localText"],
  "macos-dictation-alternative": ["appleProcessing", "appleTraining", "appleOffline", "noExtraAccount", "included", "included", "applePlatforms", "appleProcessing"],
  "dragon-alternative": ["localActivated", "localProfile", "offlineActivated", "activation", "dragonPrice", "dragonTrial", "dragonPlatforms", "dragonBoundary"],
};
const labels = ["Processing location", "Trains AI on your voice", "Works fully offline", "Account required", "Pricing model", "Free tier / trial", "Platforms", "Privacy boundary"];
const copy = Object.fromEntries(Object.entries(translations).map(([locale, values]) => {
  if (values.length !== keys.length) throw new Error(`Incomplete competitor translations: ${locale}`);
  return [locale, { ...Object.fromEntries(keys.map((key, i) => [key, values[i]])), macOS: "macOS" }];
}));

export function localizedCompetitorFact(page, row, locale) {
  const key = profiles[page.slug]?.[labels.indexOf(row.label)];
  const template = copy[locale]?.[key];
  if (!template) throw new Error(`Missing competitor fact: ${locale}/${page.slug}/${row.label}`);
  const quantities = row.competitor.match(row.label === "Pricing model" ? /[$€]\d+(?:[,.]\d+)*/g : /\b\d+(?:[,.]\d+)*\b/g) || [];
  return template.replace(/\{(\d+)\}/g, (_, index) => {
    if (!quantities[index]) throw new Error(`Missing fact quantity: ${locale}/${page.slug}/${row.label}/${index}`);
    return quantities[index];
  });
}
