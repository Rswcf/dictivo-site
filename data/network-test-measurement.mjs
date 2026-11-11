// Vendor-run full-app network capture of Dictivo, 11 November 2026.
// Every number traces to assets/evidence/local-network-2026-11-11/results.json.
// The capture tooling and raw nettop/lsof files stay in the 033 research folder.
export const NETWORK_TEST_MEASUREMENT_ROOT = "/assets/evidence/local-network-2026-11-11";
export const NETWORK_TEST_MEASUREMENT_ID = "our-measurement";

export const NETWORK_TEST_MEASUREMENT = {
  en: {
    title: "Our measurement on 11 November 2026",
    setup:
      "We ran this procedure ourselves on 11 November 2026 with Dictivo 0.3.57 on an Apple silicon MacBook Pro (Mac16,7) running macOS 27.0.1. Dictivo was in Private Local mode with the Quality profile and the Large v3 model. Cloud Fast was available but not locked. nettop recorded every connection on the Mac once per second and lsof listed open connections every two seconds; we then kept the connections of the Dictivo process. The speech was three fixed English sentences, played by the macOS say command through the built-in speakers and picked up by the built-in microphone.",
    results: [
      "Idle, 120 seconds: no connection from Dictivo.",
      "Dictating the three sentences, 90 seconds: no connection from Dictivo. The transcript was correct and was saved in Dictivo's history as a Local session.",
      "The 180 seconds after dictation: no connection from Dictivo.",
      "Cloud Fast comparison with the same sentences: one connection, 910,683 bytes sent.",
    ],
    scopeTitle: "What the measurement shows and what it does not",
    shows:
      "The Cloud Fast comparison shows that the capture sees an upload: one connection from the Dictivo process sent 910,683 bytes (about 0.9 MB) to Dictivo's Cloud Fast service. In Private Local mode, the same sentences produced no connection from Dictivo.",
    limits:
      "Limits: this vendor-run measurement covers one Mac, one app version and one short English sample on one day. We did not block the network in this session; a separate check of the transcription engine with network access denied is on the benchmark method page. Byte counts do not show content, and one-second sampling can miss a very brief connection. An earlier attempt the same day was discarded because Dictivo's history showed that no dictation was transcribed during it.",
    linkLabel: "Measurement data from 11 November 2026 (JSON)",
  },
  de: {
    title: "Unsere Messung vom 11. November 2026",
    setup:
      "Wir haben dieses Vorgehen am 11. November 2026 selbst durchgeführt: Dictivo 0.3.57 auf einem MacBook Pro mit Apple silicon (Mac16,7) unter macOS 27.0.1. Dictivo lief in Private Local mode mit dem Profil Quality und dem Modell Large v3. Cloud Fast war verfügbar, aber nicht gesperrt. nettop erfasste jede Verbindung des Mac einmal pro Sekunde, lsof listete alle zwei Sekunden die offenen Verbindungen; ausgewertet wurden die Verbindungen des Dictivo-Prozesses. Gesprochen wurden drei feste englische Sätze, abgespielt mit dem macOS-Befehl say über die eingebauten Lautsprecher und aufgenommen vom eingebauten Mikrofon.",
    results: [
      "Leerlauf, 120 Sekunden: keine Verbindung von Dictivo.",
      "Diktat der drei Sätze, 90 Sekunden: keine Verbindung von Dictivo. Das Transkript war korrekt und wurde im Verlauf von Dictivo als Local-Sitzung gespeichert.",
      "Die 180 Sekunden nach dem Diktat: keine Verbindung von Dictivo.",
      "Vergleich in Cloud Fast mit denselben Sätzen: eine Verbindung, 910.683 Byte gesendet.",
    ],
    scopeTitle: "Was die Messung zeigt und was nicht",
    shows:
      "Der Cloud-Fast-Vergleich zeigt, dass die Aufzeichnung einen Upload erfasst: Eine Verbindung des Dictivo-Prozesses sendete 910.683 Byte (etwa 0,9 MB) an den Cloud-Fast-Dienst von Dictivo. In Private Local mode erzeugten dieselben Sätze keine Verbindung von Dictivo.",
    limits:
      "Grenzen: Diese vom Anbieter durchgeführte Messung umfasst einen Mac, eine App-Version und eine kurze englische Probe an einem Tag. Das Netzwerk wurde in dieser Sitzung nicht blockiert; eine getrennte Prüfung der Transkriptions-Engine ohne Netzwerkzugriff steht auf der Seite zur Benchmark-Methode. Bytezahlen zeigen keine Inhalte, und eine Abtastung pro Sekunde kann eine sehr kurze Verbindung übersehen. Ein früherer Versuch am selben Tag wurde verworfen, weil der Verlauf von Dictivo zeigte, dass dabei kein Diktat transkribiert wurde.",
    linkLabel: "Messdaten vom 11. November 2026 (JSON)",
  },
  fr: {
    title: "Notre mesure du 11 novembre 2026",
    setup:
      "Nous avons appliqué nous-mêmes cette procédure le 11 novembre 2026 : Dictivo 0.3.57 sur un MacBook Pro Apple silicon (Mac16,7) sous macOS 27.0.1. Dictivo était en mode Private Local avec le profil Quality et le modèle Large v3. Cloud Fast était disponible mais pas verrouillé. nettop a relevé chaque connexion du Mac une fois par seconde et lsof a listé les connexions ouvertes toutes les deux secondes ; nous avons gardé les connexions du processus Dictivo. La parole consistait en trois phrases anglaises fixes, lues par la commande macOS say sur les haut-parleurs intégrés et captées par le micro intégré.",
    results: [
      "Inactif, 120 secondes : aucune connexion de Dictivo.",
      "Dictée des trois phrases, 90 secondes : aucune connexion de Dictivo. La transcription était correcte et a été enregistrée dans l'historique de Dictivo comme session Local.",
      "Les 180 secondes après la dictée : aucune connexion de Dictivo.",
      "Comparaison en Cloud Fast avec les mêmes phrases : une connexion, 910 683 octets envoyés.",
    ],
    scopeTitle: "Ce que la mesure montre, et ce qu'elle ne montre pas",
    shows:
      "La comparaison en Cloud Fast montre que la capture voit un envoi : une connexion du processus Dictivo a envoyé 910 683 octets (environ 0,9 Mo) au service Cloud Fast de Dictivo. En mode Private Local, les mêmes phrases n'ont produit aucune connexion de Dictivo.",
    limits:
      "Limites : cette mesure réalisée par l'éditeur porte sur un Mac, une version de l'app et un court échantillon anglais, un seul jour. Le réseau n'a pas été bloqué pendant cette session ; une vérification distincte du moteur de transcription sans accès réseau figure sur la page de méthode du benchmark. Les octets ne montrent pas le contenu, et un échantillonnage par seconde peut manquer une connexion très brève. Une première tentative le même jour a été écartée, car l'historique de Dictivo montrait qu'aucune dictée n'avait été transcrite.",
    linkLabel: "Données de mesure du 11 novembre 2026 (JSON)",
  },
  es: {
    title: "Nuestra medición del 11 de noviembre de 2026",
    setup:
      "Aplicamos este procedimiento nosotros mismos el 11 de noviembre de 2026: Dictivo 0.3.57 en un MacBook Pro con Apple silicon (Mac16,7) con macOS 27.0.1. Dictivo estaba en modo Private Local con el perfil Quality y el modelo Large v3. Cloud Fast estaba disponible, pero no bloqueado. nettop registró cada conexión del Mac una vez por segundo y lsof listó las conexiones abiertas cada dos segundos; después nos quedamos con las conexiones del proceso de Dictivo. La voz fueron tres frases fijas en inglés, reproducidas con el comando say de macOS por los altavoces integrados y captadas por el micrófono integrado.",
    results: [
      "Inactivo, 120 segundos: ninguna conexión de Dictivo.",
      "Dictado de las tres frases, 90 segundos: ninguna conexión de Dictivo. La transcripción fue correcta y quedó guardada en el historial de Dictivo como sesión Local.",
      "Los 180 segundos posteriores al dictado: ninguna conexión de Dictivo.",
      "Comparación en Cloud Fast con las mismas frases: una conexión, 910.683 bytes enviados.",
    ],
    scopeTitle: "Qué muestra la medición y qué no",
    shows:
      "La comparación en Cloud Fast muestra que la captura detecta una subida: una conexión del proceso de Dictivo envió 910.683 bytes (unos 0,9 MB) al servicio Cloud Fast de Dictivo. En modo Private Local, las mismas frases no produjeron ninguna conexión de Dictivo.",
    limits:
      "Límites: esta medición, hecha por el propio proveedor, cubre un Mac, una versión de la app y una muestra breve en inglés en un solo día. En esta sesión no se bloqueó la red; una comprobación aparte del motor de transcripción sin acceso a la red está en la página del método de benchmark. Los bytes no muestran el contenido, y un muestreo por segundo puede omitir una conexión muy breve. Un intento anterior del mismo día se descartó porque el historial de Dictivo mostraba que no se había transcrito ningún dictado.",
    linkLabel: "Datos de la medición del 11 de noviembre de 2026 (JSON)",
  },
  it: {
    title: "La nostra misurazione dell'11 novembre 2026",
    setup:
      "Abbiamo applicato noi stessi questa procedura l'11 novembre 2026: Dictivo 0.3.57 su un MacBook Pro con Apple silicon (Mac16,7) con macOS 27.0.1. Dictivo era in modalità Private Local con il profilo Quality e il modello Large v3. Cloud Fast era disponibile ma non bloccato. nettop ha registrato ogni connessione del Mac una volta al secondo e lsof ha elencato le connessioni aperte ogni due secondi; abbiamo poi tenuto le connessioni del processo di Dictivo. Il parlato erano tre frasi fisse in inglese, riprodotte con il comando say di macOS dagli altoparlanti integrati e raccolte dal microfono integrato.",
    results: [
      "Inattivo, 120 secondi: nessuna connessione da Dictivo.",
      "Dettatura delle tre frasi, 90 secondi: nessuna connessione da Dictivo. La trascrizione era corretta ed è stata salvata nella cronologia di Dictivo come sessione Local.",
      "I 180 secondi dopo la dettatura: nessuna connessione da Dictivo.",
      "Confronto in Cloud Fast con le stesse frasi: una connessione, 910.683 byte inviati.",
    ],
    scopeTitle: "Cosa mostra la misurazione e cosa no",
    shows:
      "Il confronto in Cloud Fast mostra che la cattura vede un invio: una connessione del processo di Dictivo ha inviato 910.683 byte (circa 0,9 MB) al servizio Cloud Fast di Dictivo. In modalità Private Local le stesse frasi non hanno prodotto alcuna connessione da Dictivo.",
    limits:
      "Limiti: questa misurazione, eseguita dal produttore, riguarda un Mac, una versione dell'app e un breve campione in inglese in un solo giorno. In questa sessione la rete non è stata bloccata; una verifica separata del motore di trascrizione senza accesso alla rete si trova nella pagina del metodo di benchmark. I byte non mostrano il contenuto e un campionamento al secondo può perdere una connessione molto breve. Un tentativo precedente dello stesso giorno è stato scartato perché la cronologia di Dictivo mostrava che non era stata trascritta alcuna dettatura.",
    linkLabel: "Dati della misurazione dell'11 novembre 2026 (JSON)",
  },
  nl: {
    title: "Onze meting van 11 november 2026",
    setup:
      "We hebben deze procedure op 11 november 2026 zelf uitgevoerd: Dictivo 0.3.57 op een MacBook Pro met Apple silicon (Mac16,7) met macOS 27.0.1. Dictivo stond in Private Local mode met het profiel Quality en het model Large v3. Cloud Fast was beschikbaar maar niet vergrendeld. nettop legde elke verbinding van de Mac eens per seconde vast en lsof toonde elke twee seconden de open verbindingen; daarna hielden we de verbindingen van het Dictivo-proces over. De spraak bestond uit drie vaste Engelse zinnen, afgespeeld met het macOS-commando say via de ingebouwde luidsprekers en opgevangen door de ingebouwde microfoon.",
    results: [
      "Inactief, 120 seconden: geen verbinding van Dictivo.",
      "Dicteren van de drie zinnen, 90 seconden: geen verbinding van Dictivo. Het transcript was correct en werd in de geschiedenis van Dictivo opgeslagen als Local-sessie.",
      "De 180 seconden na het dicteren: geen verbinding van Dictivo.",
      "Vergelijking in Cloud Fast met dezelfde zinnen: één verbinding, 910.683 bytes verzonden.",
    ],
    scopeTitle: "Wat de meting laat zien en wat niet",
    shows:
      "De vergelijking in Cloud Fast laat zien dat de opname een upload ziet: één verbinding van het Dictivo-proces verzond 910.683 bytes (ongeveer 0,9 MB) naar de Cloud Fast-dienst van Dictivo. In Private Local mode leverden dezelfde zinnen geen verbinding van Dictivo op.",
    limits:
      "Grenzen: deze meting door de leverancier zelf beslaat één Mac, één appversie en één korte Engelse opname op één dag. Het netwerk is in deze sessie niet geblokkeerd; een aparte controle van de transcriptie-engine zonder netwerktoegang staat op de pagina over de benchmarkmethode. Bytes tonen geen inhoud, en bemonstering per seconde kan een zeer korte verbinding missen. Een eerdere poging op dezelfde dag is verworpen, omdat de geschiedenis van Dictivo liet zien dat daarbij geen dictaat was getranscribeerd.",
    linkLabel: "Meetgegevens van 11 november 2026 (JSON)",
  },
  pt: {
    title: "Nossa medição de 11 de novembro de 2026",
    setup:
      "Executamos este procedimento nós mesmos em 11 de novembro de 2026: Dictivo 0.3.57 em um MacBook Pro com Apple silicon (Mac16,7) com macOS 27.0.1. O Dictivo estava no modo Private Local com o perfil Quality e o modelo Large v3. O Cloud Fast estava disponível, mas não bloqueado. O nettop registrou cada conexão do Mac uma vez por segundo e o lsof listou as conexões abertas a cada dois segundos; depois mantivemos as conexões do processo do Dictivo. A fala foram três frases fixas em inglês, reproduzidas pelo comando say do macOS nos alto-falantes internos e captadas pelo microfone interno.",
    results: [
      "Ocioso, 120 segundos: nenhuma conexão do Dictivo.",
      "Ditado das três frases, 90 segundos: nenhuma conexão do Dictivo. A transcrição saiu correta e foi salva no histórico do Dictivo como sessão Local.",
      "Os 180 segundos após o ditado: nenhuma conexão do Dictivo.",
      "Comparação no Cloud Fast com as mesmas frases: uma conexão, 910.683 bytes enviados.",
    ],
    scopeTitle: "O que a medição mostra e o que não mostra",
    shows:
      "A comparação no Cloud Fast mostra que a captura enxerga um envio: uma conexão do processo do Dictivo enviou 910.683 bytes (cerca de 0,9 MB) ao serviço Cloud Fast do Dictivo. No modo Private Local, as mesmas frases não geraram nenhuma conexão do Dictivo.",
    limits:
      "Limites: esta medição, feita pelo próprio fornecedor, cobre um Mac, uma versão do app e uma amostra curta em inglês em um único dia. A rede não foi bloqueada nesta sessão; uma verificação separada do mecanismo de transcrição sem acesso à rede está na página do método de benchmark. Bytes não mostram o conteúdo, e uma amostragem por segundo pode perder uma conexão muito breve. Uma tentativa anterior no mesmo dia foi descartada porque o histórico do Dictivo mostrou que nenhum ditado foi transcrito nela.",
    linkLabel: "Dados da medição de 11 de novembro de 2026 (JSON)",
  },
  zh: {
    title: "我们在 2026 年 11 月 11 日的实测",
    setup:
      "我们在 2026 年 11 月 11 日自己按这个方法测了一次：Dictivo 0.3.57，Apple 芯片 MacBook Pro（Mac16,7），macOS 27.0.1。Dictivo 处于 Private Local 模式，使用 Quality 档和 Large v3 模型。Cloud Fast 可用，但没有锁定。nettop 每秒记录一次整台 Mac 的所有连接，lsof 每两秒列出一次已打开的连接；之后只保留 Dictivo 进程的连接。语音是三句固定的英文句子，用 macOS 的 say 命令从内置扬声器播放，由内置麦克风收音。",
    results: [
      "闲置 120 秒：Dictivo 没有任何连接。",
      "口述三句话，90 秒：Dictivo 没有任何连接。转写正确，并作为 Local 会话保存在 Dictivo 的历史记录中。",
      "口述结束后的 180 秒：Dictivo 没有任何连接。",
      "用同样三句话在 Cloud Fast 模式下对照：1 个连接，发出 910,683 字节。",
    ],
    scopeTitle: "这次实测说明了什么，没说明什么",
    shows:
      "Cloud Fast 对照说明这套记录方法能看到上传：Dictivo 进程的一个连接向 Dictivo 的 Cloud Fast 服务发出了 910,683 字节（约 0.9 MB）。在 Private Local 模式下，同样的三句话没有让 Dictivo 产生任何连接。",
    limits:
      "局限：这是厂商自己做的测量，只覆盖一台 Mac、一个 app 版本、某一天的一小段英文样本。这次没有断网测试；转写引擎在禁止联网条件下的单独检查，见基准测试方法页。字节数不显示内容，每秒一次的采样也可能漏掉极短的连接。同一天更早的一次尝试已作废，因为 Dictivo 的历史记录显示那次没有转写任何口述。",
    linkLabel: "2026 年 11 月 11 日的实测数据（JSON）",
  },
  ja: {
    title: "2026年11月11日の当社による測定",
    setup:
      "2026年11月11日に、この手順を当社自身で実行しました。Dictivo 0.3.57、Apple シリコン搭載 MacBook Pro（Mac16,7）、macOS 27.0.1 です。Dictivo は Private Local モードで、Quality プロファイルと Large v3 モデルを使いました。Cloud Fast は利用可能でしたが、ロックはしていません。nettop で Mac 全体の接続を毎秒記録し、lsof で開いている接続を2秒ごとに一覧にしたうえで、Dictivo プロセスの接続だけを残しました。音声は固定の英文3つで、macOS の say コマンドで内蔵スピーカーから再生し、内蔵マイクで拾いました。",
    results: [
      "待機 120 秒：Dictivo からの接続なし。",
      "3文の音声入力 90 秒：Dictivo からの接続なし。文字起こしは正確で、Dictivo の履歴に Local セッションとして保存されました。",
      "音声入力後の 180 秒：Dictivo からの接続なし。",
      "同じ3文で Cloud Fast と比較：接続 1 件、送信 910,683 バイト。",
    ],
    scopeTitle: "この測定でわかること、わからないこと",
    shows:
      "Cloud Fast での比較から、この記録方法でアップロードを捉えられることがわかります。Dictivo プロセスの接続 1 件が、Dictivo の Cloud Fast サービスへ 910,683 バイト（約 0.9 MB）を送信しました。Private Local モードでは、同じ3文で Dictivo からの接続は発生しませんでした。",
    limits:
      "限界：これはベンダー自身による測定で、Mac 1 台、アプリの 1 バージョン、ある1日の短い英語サンプルだけが対象です。今回はネットワークを遮断していません。ネットワークを禁止した状態での文字起こしエンジン単体の確認は、ベンチマーク手法のページにあります。バイト数から内容はわからず、毎秒のサンプリングではごく短い接続を見逃す場合があります。同じ日の先行する試行は、Dictivo の履歴から音声入力が一度も文字起こしされていなかったことがわかったため、破棄しました。",
    linkLabel: "2026年11月11日の測定データ（JSON）",
  },
  ko: {
    title: "2026년 11월 11일 자체 측정",
    setup:
      "2026년 11월 11일에 이 절차를 직접 실행했습니다. Dictivo 0.3.57, Apple 실리콘 MacBook Pro(Mac16,7), macOS 27.0.1입니다. Dictivo는 Private Local 모드였고 Quality 프로필과 Large v3 모델을 사용했습니다. Cloud Fast는 사용할 수 있었지만 잠그지 않았습니다. nettop으로 Mac 전체의 연결을 1초마다 기록하고 lsof로 열린 연결을 2초마다 나열한 뒤, Dictivo 프로세스의 연결만 남겼습니다. 음성은 고정된 영어 문장 세 개로, macOS의 say 명령으로 내장 스피커에서 재생하고 내장 마이크로 받았습니다.",
    results: [
      "대기 120초: Dictivo 연결 없음.",
      "세 문장 받아쓰기 90초: Dictivo 연결 없음. 전사 결과는 정확했고 Dictivo 기록에 Local 세션으로 저장되었습니다.",
      "받아쓰기 후 180초: Dictivo 연결 없음.",
      "같은 문장으로 Cloud Fast 비교: 연결 1개, 910,683바이트 전송.",
    ],
    scopeTitle: "이 측정이 보여 주는 것과 보여 주지 않는 것",
    shows:
      "Cloud Fast 비교는 이 기록 방법이 업로드를 잡아낸다는 것을 보여 줍니다. Dictivo 프로세스의 연결 1개가 Dictivo의 Cloud Fast 서비스로 910,683바이트(약 0.9MB)를 보냈습니다. Private Local 모드에서는 같은 문장으로 Dictivo 연결이 생기지 않았습니다.",
    limits:
      "한계: 공급사가 직접 한 측정이며 Mac 1대, 앱 버전 1개, 하루의 짧은 영어 샘플만 다룹니다. 이번에는 네트워크를 차단하지 않았습니다. 네트워크를 막은 상태에서 전사 엔진만 따로 확인한 결과는 벤치마크 방법 페이지에 있습니다. 바이트 수로는 내용을 알 수 없고, 1초 간격 샘플링은 아주 짧은 연결을 놓칠 수 있습니다. 같은 날 앞서 한 시도는 Dictivo 기록상 받아쓰기가 한 번도 전사되지 않은 것으로 확인되어 폐기했습니다.",
    linkLabel: "2026년 11월 11일 측정 데이터(JSON)",
  },
};
