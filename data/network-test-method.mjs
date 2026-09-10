export const NETWORK_TEST_LASTMOD = "2026-09-10";

// Observation, offline check, and limits of the evidence. These are instructions,
// not a claim that a new independent measurement was performed.
export const NETWORK_TEST_METHOD = {
  en: [
    "Install the model first and let downloads finish. Record the app version, operating system, model, and mode. Monitor Dictivo and its helper processes continuously before, during, and after a short non-sensitive dictation. Record destination hosts and changes in outgoing bytes, including traffic on connections that were already open.",
    "Repeat in Local mode with network access blocked after setup and activation are complete. Check that recording, transcription, and paste still work. Then restore the connection and observe any delayed traffic. If you already have Cloud Fast access, use a non-sensitive phrase as a separate comparison; expect a transcription request in that mode.",
    "A connection count alone cannot show whether audio was uploaded. Encrypted traffic does not reveal its contents, and sampling can miss brief transfers, helper processes, or activity outside the observation window. This is a test procedure, not a published measurement or a guarantee about every future session. Separate product traffic such as updates, trial activation, and optional statistics from transcription traffic.",
  ],
  de: [
    "Installieren Sie zuerst das Modell und warten Sie auf abgeschlossene Downloads. Notieren Sie App-Version, Betriebssystem, Modell und Modus. Beobachten Sie Dictivo und seine Hilfsprozesse durchgehend vor, während und nach einem kurzen, unverfänglichen Diktat. Erfassen Sie Zielhosts und Änderungen der gesendeten Bytes, auch bei bereits offenen Verbindungen.",
    "Wiederholen Sie den Test im Local-Modus mit blockiertem Netzwerk, nachdem Einrichtung und Aktivierung abgeschlossen sind. Prüfen Sie Aufnahme, Transkription und Einfügen. Stellen Sie die Verbindung wieder her und beobachten Sie verzögerten Verkehr. Mit vorhandenem Cloud-Fast-Zugang können Sie einen unverfänglichen Satz als getrennten Vergleich testen; dort ist eine Transkriptionsanfrage zu erwarten.",
    "Die Zahl der Verbindungen beweist keinen Audio-Upload. Verschlüsselter Verkehr zeigt keine Inhalte; kurze Übertragungen, Hilfsprozesse oder spätere Aktivitäten können unbemerkt bleiben. Dies ist eine Testanleitung, kein veröffentlichtes Messergebnis oder eine Garantie für jede Sitzung. Trennen Sie Updates, Trial-Aktivierung und optionale Statistik von Transkriptionsverkehr.",
  ],
  fr: [
    "Installez d'abord le modèle et attendez la fin des téléchargements. Notez la version de l'app, le système, le modèle et le mode. Surveillez Dictivo et ses processus auxiliaires en continu avant, pendant et après une courte dictée non sensible. Relevez les destinations et les variations d'octets envoyés, y compris sur les connexions déjà ouvertes.",
    "Refaites le test en mode Local avec le réseau bloqué une fois la configuration et l'activation terminées. Vérifiez l'enregistrement, la transcription et le collage. Rétablissez la connexion et observez tout trafic différé. Si vous avez déjà accès à Cloud Fast, utilisez une phrase non sensible comme comparaison séparée ; une requête de transcription est attendue dans ce mode.",
    "Le nombre de connexions ne prouve pas un envoi d'audio. Le trafic chiffré n'en révèle pas le contenu ; des transferts brefs, processus auxiliaires ou activités ultérieures peuvent échapper à l'observation. Il s'agit d'une méthode, pas d'une mesure publiée ni d'une garantie pour chaque session. Distinguez mises à jour, activation d'essai et statistiques facultatives du trafic de transcription.",
  ],
  es: [
    "Instala primero el modelo y espera a que terminen las descargas. Anota la versión de la app, sistema, modelo y modo. Observa Dictivo y sus procesos auxiliares de forma continua antes, durante y después de un dictado breve sin datos sensibles. Registra destinos y cambios en bytes enviados, incluso en conexiones ya abiertas.",
    "Repite en modo Local con la red bloqueada después de completar la configuración y activación. Comprueba grabación, transcripción y pegado. Restablece la conexión y observa posibles envíos posteriores. Si ya tienes acceso a Cloud Fast, prueba una frase no sensible por separado; en ese modo se espera una solicitud de transcripción.",
    "Contar conexiones no demuestra si se envió audio. El tráfico cifrado no revela su contenido; el muestreo puede omitir transferencias breves, procesos auxiliares o actividad posterior. Es un procedimiento, no una medición publicada ni una garantía para cada sesión. Separa actualizaciones, activación de prueba y estadísticas opcionales del tráfico de transcripción.",
  ],
  it: [
    "Installa prima il modello e attendi il completamento dei download. Annota versione dell'app, sistema, modello e modalità. Monitora Dictivo e i suoi processi ausiliari in continuo prima, durante e dopo una breve dettatura non sensibile. Registra destinazioni e variazioni dei byte inviati, anche sulle connessioni già aperte.",
    "Ripeti in modalità Local con la rete bloccata dopo aver completato configurazione e attivazione. Verifica registrazione, trascrizione e incolla. Ripristina la connessione e osserva eventuale traffico ritardato. Se hai già accesso a Cloud Fast, prova separatamente una frase non sensibile; in quella modalità è prevista una richiesta di trascrizione.",
    "Contare le connessioni non dimostra l'invio di audio. Il traffico cifrato non rivela i contenuti; brevi trasferimenti, processi ausiliari o attività successive possono sfuggire. È una procedura, non una misurazione pubblicata né una garanzia per ogni sessione. Distingui aggiornamenti, attivazione della prova e statistiche facoltative dal traffico di trascrizione.",
  ],
  nl: [
    "Installeer eerst het model en wacht tot downloads klaar zijn. Noteer appversie, besturingssysteem, model en modus. Volg Dictivo en de hulpprocessen continu voor, tijdens en na een kort dictaat zonder gevoelige informatie. Noteer bestemmingen en veranderingen in verzonden bytes, ook op al geopende verbindingen.",
    "Herhaal in Local-modus met geblokkeerde netwerktoegang nadat installatie en activering voltooid zijn. Controleer opnemen, transcriberen en plakken. Herstel de verbinding en let op later verkeer. Heb je al Cloud Fast, test dan apart een onschuldige zin; in die modus wordt een transcriptieverzoek verwacht.",
    "Het aantal verbindingen bewijst geen audio-upload. Versleuteld verkeer toont geen inhoud; korte overdrachten, hulpprocessen of latere activiteit kunnen worden gemist. Dit is een testprocedure, geen gepubliceerde meting of garantie voor elke sessie. Onderscheid updates, proefactivering en optionele statistiek van transcriptieverkeer.",
  ],
  pt: [
    "Instale primeiro o modelo e espere os downloads terminarem. Anote versão do aplicativo, sistema, modelo e modo. Monitore Dictivo e seus processos auxiliares continuamente antes, durante e depois de um ditado curto sem dados sensíveis. Registre destinos e variações nos bytes enviados, inclusive em conexões já abertas.",
    "Repita no modo Local com a rede bloqueada após concluir configuração e ativação. Confira gravação, transcrição e colagem. Restaure a conexão e observe tráfego posterior. Se já tiver acesso ao Cloud Fast, teste separadamente uma frase não sensível; nesse modo é esperada uma solicitação de transcrição.",
    "Contar conexões não comprova envio de áudio. Tráfego criptografado não revela o conteúdo; transferências breves, processos auxiliares ou atividades posteriores podem passar despercebidos. Este é um procedimento, não uma medição publicada nem uma garantia para cada sessão. Separe atualizações, ativação do teste e estatísticas opcionais do tráfego de transcrição.",
  ],
  zh: [
    "先安装模型并等待下载结束，记录应用版本、操作系统、模型和模式。用不含敏感信息的短句测试，持续观察听写前、听写中及结束后 Dictivo 与辅助进程的网络活动。记录目标主机和出站字节变化，包括测试开始前已经建立的连接。",
    "完成设置与激活后，阻止网络访问，在 Local 模式下再次检查录音、转写和粘贴能否完成。恢复网络后继续观察是否出现延迟发送。如果已有 Cloud Fast 额度，可用无敏感信息的短句单独作对照；该模式应出现远程转写请求。",
    "仅统计连接数无法判断是否上传音频。加密流量不显示内容，采样也可能漏掉短暂传输、辅助进程或观察窗口外的活动。这里提供的是测试方法，不是已发布的实测结果，也不保证每次会话的行为。应将更新、试用激活和可选统计等产品流量与转写流量分别判断。",
  ],
  ja: [
    "先にモデルをインストールし、ダウンロードの完了を待ちます。アプリ版、OS、モデル、モードを記録してください。機密情報を含まない短文を使い、入力の前・途中・終了後にDictivoと補助プロセスを継続して観察します。既に開いている接続も含め、送信先と送信バイト数の変化を記録します。",
    "設定と有効化が終わったら通信を遮断し、Localモードで録音・文字起こし・貼り付けが完了するか再確認します。通信を戻した後も遅延した送信を観察してください。既にCloud Fastを利用できる場合は、機密情報のない短文で別に比較できます。そのモードではリモート文字起こしの通信が発生するはずです。",
    "接続数だけでは音声送信の有無を判断できません。暗号化通信の内容は見えず、短い転送、補助プロセス、観察時間外の活動を見逃す場合もあります。これはテスト手順であり、公表済みの測定結果や全セッションの保証ではありません。更新、体験版の有効化、任意の統計と文字起こしの通信を区別してください。",
  ],
  ko: [
    "모델을 먼저 설치하고 다운로드가 끝날 때까지 기다리세요. 앱 버전, 운영체제, 모델, 모드를 기록하세요. 민감하지 않은 짧은 문장으로 테스트하며 받아쓰기 전·중·후에 Dictivo와 보조 프로세스를 계속 관찰하세요. 이미 열린 연결도 포함해 목적지와 송신 바이트 변화를 기록하세요.",
    "설정과 활성화를 마친 뒤 네트워크를 차단하고 Local 모드에서 녹음, 전사, 붙여넣기가 완료되는지 확인하세요. 연결을 복원한 뒤에도 지연 전송을 관찰하세요. 이미 Cloud Fast를 사용할 수 있다면 민감하지 않은 문장으로 별도 비교할 수 있습니다. 해당 모드에서는 원격 전사 요청이 발생해야 합니다.",
    "연결 수만으로 음성 업로드 여부를 판단할 수 없습니다. 암호화된 트래픽은 내용을 보여주지 않으며, 짧은 전송이나 보조 프로세스, 관찰 시간 밖의 활동을 놓칠 수 있습니다. 이는 테스트 방법이며 공개 실측 결과나 모든 세션의 보장이 아닙니다. 업데이트, 체험 활성화, 선택형 통계와 전사 트래픽을 구분하세요.",
  ],
};
