// Decision guidance adapted from compare-pages.mjs, reviewed 2026-09-12.
// Prices and platform versions belong in compare-fact-locales.mjs, not this prose.
// These are suggested evaluation tasks, not claims of completed comparative tests.

const decisionCopy = {
  ja: {
    fit: "向いている用途", decision: "選ぶ基準", test: "自分の環境で確認",
    modeFaq: ["DictivoのCloud Fastでも音声は端末内に残りますか？", "いいえ。Localはモデルのインストール後、端末上で音声を認識します。Cloud Fastは選択した録音をサーバーに送って処理します。音声を外部に送れない作業ではLocalを使ってください。"],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "スマートフォンとクラウド文章編集が必要ならWispr Flow",
        fitText: "MacやWindowsだけでなく、スマートフォンでも音声入力したい人はWispr Flowの対応端末と編集機能を確認してください。チームでの運用やクラウドでの文章整形まで必要なら、端末内の文字起こしだけで置き換えられるとは限りません。",
        decisionTitle: "音声を送信しないことが条件ならDictivo Local",
        decisionText: "Wispr Flowのデータ共有とクラウド保存の設定は、音声認識をオフラインにはしません。機密の下書きを端末上で入力することが目的ならDictivo Localが候補です。比較表では処理場所と継続費用を別々に確認してください。",
        testText: "機密情報を含まないメールの下書きで、句読点、修正回数、入力先への貼り付けを確認してください。Dictivoはモデルの準備後にLocalで試し、必要なら接続を切って同じ操作を確かめます。",
        faqs: [["Wispr Flowはオフラインで使えますか？", "WisprのData Controlsでは、音声認識はクラウドで行うと説明されています。保存やモデル改善への共有を無効にしても、認識処理が端末内に変わるわけではありません。"], ["DictivoでWispr Flowのモバイル用途も置き換えられますか？", "この比較のDictivoはデスクトップ向けの音声入力です。iPhoneやAndroidでの入力が必須なら、Wispr Flowの対応状況を確認し、その用途も含めて選んでください。"]],
      },
      "superwhisper-alternative": {
        fitTitle: "モードやモデルを細かく使い分けるならSuperwhisper",
        fitText: "Superwhisperにはローカルとクラウドのモデル、および出力を調整するモードがあります。メールやコードなどに合わせてすでに設定を作り込んでいる場合は、その設定を引き継げるかが乗り換えの重要な判断材料です。",
        decisionTitle: "両方のローカル処理を前提に、日常の操作と料金を比べる",
        decisionText: "Superwhisperもローカルモデルでは端末上で認識できます。Dictivoを選ぶ理由は、相手が必ず音声を送るからではありません。ホットキー、履歴、辞書、定型文で日々の入力が足りるかと、必要なライセンス費用を比べてください。",
        testText: "同じMac、マイク、短い文章で両方のローカルモデルを試してください。モデル名を記録し、文字が使えるまでの待ち時間と修正箇所を確認します。モデルの条件が違う結果を、アプリ全体の精度差とは扱わないでください。",
        faqs: [["Superwhisperでも音声をローカルに保てますか？", "はい。ローカルモデルは端末上で動作します。クラウドモデルや追加のAI処理を使う場合は、別途その処理先と設定を確認してください。"], ["SuperwhisperからDictivoへ移れば精度は上がりますか？", "このページでは精度の向上を実証していません。モデル、言語、マイク、話し方によって結果は変わります。普段使う固有名詞や文章を両方で試して判断してください。"]],
      },
      "macwhisper-alternative": {
        fitTitle: "録音ファイル、字幕、書き出しが中心ならMacWhisper",
        fitText: "インタビューや講義などの既存ファイルを文字起こしし、字幕や書き出しまで行うならMacWhisperの機能を確認してください。MacWhisperにはシステム全体の音声入力もあり、ファイル専用のアプリとして扱うのは正確ではありません。",
        decisionTitle: "入力中のアプリに声で書く操作を比べる",
        decisionText: "Dictivoは、入力欄にカーソルを置き、ショートカットで録音して文字を戻す作業が中心です。MacWhisperも音声入力に対応するため、両方の実際の操作で選んでください。どちらもローカル処理が可能で、プライバシーだけでは決まりません。",
        testText: "普段のメールアプリで短い下書きを入力し、貼り付けと修正を確認します。録音ファイルの一括処理や字幕が必要なら、その作業もMacWhisperで別に試してください。入力用のデモだけでファイル機能を評価しないでください。",
        faqs: [["MacWhisperはアプリへの音声入力にも対応していますか？", "はい。MacWhisperはシステム全体の音声入力を案内しています。比較ではファイル文字起こしの機能と、入力先アプリでの使いやすさを分けて確認してください。"], ["DictivoでMacWhisperのファイル処理を置き換えられますか？", "Dictivoはホットキーによる音声入力を中心とする製品です。一括文字起こし、字幕、書き出しが主目的なら、MacWhisperの必要な機能を確認してください。"]],
      },
      "voiceink-alternative": {
        fitTitle: "買い切りとアップデート条件を重視するならVoiceInkも候補",
        fitText: "VoiceInkはMacでのローカル音声入力に対応し、台数別の買い切りプランと無期限のアップデートを案内しています。ローカル処理と価格を重視する人にとって、比較から外す理由はありません。",
        decisionTitle: "安さではなく、設定と日常の入力でDictivoを評価する",
        decisionText: "Dictivo Localの更新期間とVoiceInkのアップデート条件は異なります。台数と利用年数をそろえて比較してください。Dictivoではハードウェアに合わせたモデル設定、履歴、辞書、LocalとCloud Fastの切り替えが自分の作業に合うかを確かめます。",
        testText: "会社名やよく使う表現を含む、機密性のない下書きを両方で試してください。最初の設定から貼り付け後の修正までを比べ、VoiceInkで文章補正を有効にする場合はその送信先も確認します。",
        faqs: [["VoiceInkのローカル認識なら、追加の文章補正もローカルですか？", "音声認識と文章補正は別に確認が必要です。任意のクラウド補正を使うと、音声認識がローカルでもテキストを外部サービスに送る場合があります。"], ["DictivoのほうがVoiceInkより安いですか？", "常に安いとは言えません。VoiceInkは台数別プランと無期限のアップデートを案内しています。最新の比較表で台数、通貨、Dictivoの任意の更新費用をそろえて判断してください。"]],
      },
      "macos-dictation-alternative": {
        fitTitle: "短い入力で足りるなら、まずmacOS標準の音声入力",
        fitText: "macOSの音声入力は追加購入なしで使えます。検索や短いメッセージを時々入力し、今の結果に満足しているなら、それだけで目的を果たせる場合があります。有料アプリへの変更が必要とは限りません。",
        decisionTitle: "履歴、辞書、モデル選択が役立つかを確かめる",
        decisionText: "Dictivoはローカル履歴、辞書、定型文、モデル選択を日常の入力に組み込めます。購入判断では、それらが自分の修正や繰り返し入力を減らすかを確認してください。Appleの音声入力を一律にクラウド処理とみなすことはできません。",
        testText: "キーボード設定で音声入力の処理場所と通信の要否を確認します。そのうえで普段の固有名詞を含む文章を両方に入力し、修正量と、入力が失敗したときに文章を取り戻す操作を比べてください。",
        faqs: [["macOSの音声入力は必ずオフラインですか？", "Mac、言語、設定によって異なります。Appleの案内に従い、キーボード設定で端末上の処理か、インターネットが必要かを確認してください。"], ["macOS標準機能が無料なのに、Dictivoを買う理由はありますか？", "履歴、辞書、定型文、モデル選択が日々の入力に役立つ場合です。試用で確かめ、標準機能で十分なら、そのまま使う選択も妥当です。"]],
      },
      "dragon-alternative": {
        fitTitle: "音声コマンドや既存の語彙設定が重要ならDragon Professional",
        fitText: "Dragon Professional v16はWindows向けのローカル音声認識と音声コマンドを備えています。蓄積した語彙やマクロ、手を使わないPC操作に依存する場合は、文字起こしができるだけで代替できるとは限りません。",
        decisionTitle: "文章入力の代替と、PC操作の代替を分ける",
        decisionText: "Dictivoはホットキーでメール、文書、メモに音声入力する用途が中心です。音声プロファイルの学習を前提としませんが、Dragonのコマンドや専門業務の機能をそのまま置き換える製品ではありません。現在の対応OSも比較してください。",
        testText: "普段使う単語、修正操作、必須の音声コマンドを一覧にします。同じ作業で使えるかを一つずつ確認し、文字起こしだけが成功したことを、アクセシビリティ用途全体の移行成功とは扱わないでください。",
        faqs: [["Dragon Professionalはクラウド専用ですか？", "いいえ。ここで比較するProfessional v16のデスクトップ版はローカル処理で、初期のインストールと有効化には通信が必要です。Dragonの別のクラウド製品と区別してください。"], ["DictivoはDragonのハンズフリー操作を置き換えられますか？", "同等の置き換えとは言えません。Dictivoはホットキーによる文章入力が中心です。PC全体の音声操作や独自マクロが必要なら、必要な操作ごとに対応を確認してください。"]],
      },
    },
  },
  zh: {
    fit: "适用场景", decision: "选择依据", test: "用自己的任务验证",
    modeFaq: ["Dictivo 的 Cloud Fast 也把音频留在本机吗？", "不是。Local 在安装模型后于本机识别语音；Cloud Fast 会上传所选录音到服务器处理。不能向外发送音频的任务应使用 Local。"],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "需要手机输入和云端改写时，考虑 Wispr Flow",
        fitText: "如果工作跨越电脑与手机，或依赖团队功能和云端文章整理，应把 Wispr Flow 的这些能力纳入比较。单纯的本地桌面听写不一定能覆盖完整的移动与协作流程。",
        decisionTitle: "不能上传音频时，考虑 Dictivo Local",
        decisionText: "Wispr Flow 的数据共享和云端存储设置不会把语音识别变成离线处理。如果主要任务是在桌面输入私密草稿，Dictivo Local 是候选方案。处理位置和长期费用应分别比较。",
        testText: "用不含机密信息的邮件草稿，检查标点、修改次数和粘贴到目标应用的结果。Dictivo 模型安装完成后，选 Local；需要验证离线工作时，可断网重复同一任务。",
        faqs: [["Wispr Flow 能离线识别语音吗？", "其 Data Controls 页面说明，语音识别在云端进行。关闭存储或模型改进共享，不会把识别处理改为本地。"], ["Dictivo 能替代 Wispr Flow 的手机用途吗？", "这里比较的 Dictivo 是桌面语音输入工具。若 iPhone 或 Android 输入不可缺少，应单独确认 Wispr Flow 的移动支持并纳入选择。"]],
      },
      "superwhisper-alternative": {
        fitTitle: "需要多种模式和模型时，考虑 Superwhisper",
        fitText: "Superwhisper 提供本地与云端模型，以及调整输出的模式。如果你已经为邮件、代码等任务配置了工作流，迁移是否会丢失这些设置，比单看价格更值得确认。",
        decisionTitle: "两者都能本地处理，比较操作与费用",
        decisionText: "Superwhisper 的本地模型同样在设备上识别语音。选择 Dictivo 不应建立在对方必然上传音频的误解上。重点看热键、历史、词典和片段是否足够完成日常输入，以及相应的许可费用。",
        testText: "在同一电脑和麦克风上，用同一段文字分别测试本地模型。记录模型名称、文本可用前的等待时间和修正点；模型条件不同的结果不能直接归因于整个软件的精度。",
        faqs: [["Superwhisper 也能把语音保留在本机吗？", "可以，本地模型在设备上运行。如果选用云端模型或额外 AI 处理，需要另行核对处理位置与设置。"], ["换成 Dictivo 就会提高准确率吗？", "本页没有证明这样的提升。模型、语言、麦克风和说话方式都会影响结果。请用日常的人名、术语和句子分别试用。"]],
      },
      "macwhisper-alternative": {
        fitTitle: "录音文件、字幕和导出是重点时，考虑 MacWhisper",
        fitText: "如果输入是已有采访或讲座录音，还要制作字幕或导出，应检查 MacWhisper 的相关功能。它也提供系统级听写，不能把它简单归为只能处理文件的软件。",
        decisionTitle: "比较在当前应用里说话并输入的体验",
        decisionText: "Dictivo 围绕光标所在的输入框、快捷键录音和返回文字设计。MacWhisper 同样支持听写，因此要用真实操作比较。两者均有本地处理路径，隐私本身不足以决定选择。",
        testText: "在常用邮件应用里输入短草稿，检查粘贴和修正。如果还需要批量文件或字幕，请另外验证 MacWhisper 的相应任务；不能用一次听写演示评价文件功能。",
        faqs: [["MacWhisper 也支持向应用中听写吗？", "支持，其产品页介绍了系统级听写。请把文件转写能力与目标应用里的输入体验分开比较。"], ["Dictivo 能替代 MacWhisper 的文件处理吗？", "Dictivo 主要用于热键听写。如果重点是批量转写、字幕和导出，应核对 MacWhisper 是否覆盖所需功能。"]],
      },
      "voiceink-alternative": {
        fitTitle: "看重买断和更新条件时，也应考虑 VoiceInk",
        fitText: "VoiceInk 提供 Mac 本地听写，并按设备数量提供买断方案和终身更新。对重视本地处理与价格的人来说，它是值得认真比较的候选。",
        decisionTitle: "用设置和日常操作评价 Dictivo，而非预设更便宜",
        decisionText: "Dictivo Local 与 VoiceInk 的更新条件不同。请按同样设备数和使用年限计算，再检查 Dictivo 的硬件模型建议、历史、词典和 Local／Cloud Fast 切换是否适合自己的任务。",
        testText: "用含常见公司名和固定表达、但不含机密的草稿试用两者。从首次设置到粘贴后的修改一起比较；若启用 VoiceInk 的文章增强，也应确认文字的处理位置。",
        faqs: [["VoiceInk 的语音识别在本地，文章增强也一定在本地吗？", "需要分别检查。可选的云端增强可能向外部服务发送文字，即使最初的语音识别在本地进行。"], ["Dictivo 比 VoiceInk 便宜吗？", "不能一概而论。VoiceInk 提供按设备数划分的方案和终身更新。请在最新比较表中统一设备数、币种与 Dictivo 的可选更新费用再判断。"]],
      },
      "macos-dictation-alternative": {
        fitTitle: "偶尔输入短句，先试 macOS 自带听写",
        fitText: "macOS 听写无需额外购买。如果只是偶尔输入搜索词或短消息，并且满意现有结果，系统功能可能已经足够，没有必要仅为了换工具而付费。",
        decisionTitle: "确认历史、词典和模型选择是否有价值",
        decisionText: "Dictivo 把本地历史、词典、片段与模型选择用于日常输入。应验证这些功能能否减少你的修正与重复操作。不能把 Apple 听写一概描述成云端处理。",
        testText: "先在键盘设置中确认处理位置和联网要求，再用日常专有名词组成的句子测试两者。比较修正量，以及输入失败时找回文字的操作。",
        faqs: [["macOS 听写一定能离线吗？", "取决于 Mac、语言和设置。请依 Apple 的说明，在键盘设置中确认是在设备上处理，还是需要互联网。"], ["系统听写免费，为什么还要买 Dictivo？", "当历史、词典、片段与模型选择能改善每天的输入时，才有购买理由。先通过试用验证；系统功能足够时继续使用也合理。"]],
      },
      "dragon-alternative": {
        fitTitle: "依赖语音命令和已有词汇配置时，考虑 Dragon Professional",
        fitText: "Dragon Professional v16 提供 Windows 本地语音识别和语音命令。如果工作依赖积累的词汇、宏或免手操作，另一个软件能转出文字，不等于能替代完整工作流。",
        decisionTitle: "把文字输入与整机语音控制分开比较",
        decisionText: "Dictivo 主要通过热键向邮件、文档和笔记输入文字，无需先训练个人语音档案。它并非 Dragon 命令和专门业务功能的直接替代品，也应核对双方当前支持的系统。",
        testText: "列出常用术语、修改操作和必需的语音命令，逐项验证。一次文字识别成功，不能作为整个无障碍工作流可以迁移的依据。",
        faqs: [["Dragon Professional 是纯云端软件吗？", "不是。这里比较的 Professional v16 桌面版在本地处理，首次安装和激活需要联网。不要与 Dragon 的独立云端产品混淆。"], ["Dictivo 能代替 Dragon 的免手操作吗？", "不能视为同等替换。Dictivo 以热键文字输入为主；如果需要整机语音控制或自定义宏，应逐项核对必需操作。"]],
      },
    },
  },
  ko: {
    fit: "적합한 작업", decision: "선택 기준", test: "직접 확인할 작업",
    modeFaq: ["Dictivo의 Cloud Fast도 음성을 기기에 보관하나요?", "아니요. Local은 모델 설치 후 기기에서 음성을 인식합니다. Cloud Fast는 선택한 녹음을 서버로 보내 처리합니다. 음성을 외부로 보낼 수 없는 작업에는 Local을 사용하세요."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "모바일 입력과 클라우드 편집이 필요하다면 Wispr Flow",
        fitText: "컴퓨터와 휴대폰을 오가거나 팀 기능과 클라우드 문장 편집을 사용한다면 Wispr Flow의 해당 기능을 함께 비교하세요. 로컬 데스크톱 받아쓰기만으로 모바일·협업 작업 전체를 대체할 수 있는 것은 아닙니다.",
        decisionTitle: "음성 업로드가 불가능한 작업에는 Dictivo Local",
        decisionText: "Wispr Flow의 데이터 공유와 클라우드 저장 설정은 음성 인식을 오프라인 처리로 바꾸지 않습니다. 데스크톱에서 비공개 초안을 작성하는 것이 목적이라면 Dictivo Local을 검토하세요. 처리 위치와 장기 비용은 따로 비교해야 합니다.",
        testText: "기밀이 없는 이메일 초안으로 문장 부호, 수정 횟수, 대상 앱에 붙여넣기를 확인하세요. Dictivo 모델을 준비한 뒤 Local을 선택하고, 오프라인 사용을 확인하려면 연결을 끊고 같은 작업을 반복하세요.",
        faqs: [["Wispr Flow는 오프라인 음성 인식을 지원하나요?", "Wispr의 Data Controls는 음성 인식이 클라우드에서 이루어진다고 설명합니다. 저장이나 모델 개선용 공유를 꺼도 인식 처리가 로컬로 바뀌지는 않습니다."], ["Dictivo로 Wispr Flow의 모바일 작업도 대체할 수 있나요?", "여기서 비교하는 Dictivo는 데스크톱 음성 입력 도구입니다. iPhone이나 Android 입력이 필수라면 Wispr Flow의 모바일 지원을 별도로 확인해 선택하세요."]],
      },
      "superwhisper-alternative": {
        fitTitle: "모드와 모델을 세밀하게 조정한다면 Superwhisper",
        fitText: "Superwhisper는 로컬·클라우드 모델과 출력을 조정하는 모드를 제공합니다. 이메일이나 코드용 설정을 이미 만들어 두었다면, 전환할 때 그 작업 방식을 유지할 수 있는지 확인하는 것이 중요합니다.",
        decisionTitle: "두 제품의 로컬 처리와 실제 조작, 비용을 비교",
        decisionText: "Superwhisper도 로컬 모델은 기기에서 음성을 인식합니다. 상대 제품이 반드시 음성을 업로드한다는 전제로 Dictivo를 선택해서는 안 됩니다. 단축키, 기록, 사전, 스니펫이 일상 입력에 충분한지와 필요한 라이선스 비용을 비교하세요.",
        testText: "같은 컴퓨터와 마이크에서 같은 문장을 로컬 모델로 입력하세요. 모델 이름, 텍스트가 준비될 때까지 걸린 시간, 수정 내용을 기록합니다. 서로 다른 모델의 결과를 앱 전체의 정확도 차이로 판단하지 마세요.",
        faqs: [["Superwhisper도 음성을 기기에 남길 수 있나요?", "네. 로컬 모델은 기기에서 실행됩니다. 클라우드 모델이나 추가 AI 처리를 사용한다면 처리 위치와 설정을 별도로 확인해야 합니다."], ["Dictivo로 바꾸면 정확도가 올라가나요?", "이 페이지는 정확도 향상을 입증하지 않습니다. 모델, 언어, 마이크, 말하는 방식에 따라 결과가 달라집니다. 평소 쓰는 이름과 용어, 문장으로 직접 비교하세요."]],
      },
      "macwhisper-alternative": {
        fitTitle: "녹음 파일, 자막, 내보내기가 중심이라면 MacWhisper",
        fitText: "인터뷰나 강의 파일을 전사하고 자막이나 파일로 내보내야 한다면 MacWhisper의 관련 기능을 확인하세요. MacWhisper는 시스템 전체 받아쓰기도 제공하므로 파일 전용 도구로 분류하는 것은 정확하지 않습니다.",
        decisionTitle: "현재 앱에서 말하고 입력하는 과정을 비교",
        decisionText: "Dictivo는 입력란에 커서를 두고 단축키로 녹음한 뒤 텍스트를 돌려받는 작업에 초점을 맞춥니다. MacWhisper도 받아쓰기를 지원하므로 실제 조작으로 비교하세요. 두 제품 모두 로컬 처리가 가능해 개인정보 보호만으로 선택이 결정되지는 않습니다.",
        testText: "평소 이메일 앱에서 짧은 초안을 입력하고 붙여넣기와 수정을 확인하세요. 일괄 파일 처리나 자막이 필요하면 MacWhisper에서 그 작업도 따로 시험하세요. 받아쓰기 데모만으로 파일 기능을 평가하지 마세요.",
        faqs: [["MacWhisper도 앱에 직접 받아쓰기를 할 수 있나요?", "네. 제품 페이지에서 시스템 전체 받아쓰기를 안내합니다. 파일 전사 기능과 대상 앱에서의 입력 편의성을 나누어 비교하세요."], ["Dictivo가 MacWhisper의 파일 작업을 대체하나요?", "Dictivo는 단축키 받아쓰기가 중심입니다. 일괄 전사, 자막, 내보내기가 주목적이라면 MacWhisper에서 필요한 기능을 확인하세요."]],
      },
      "voiceink-alternative": {
        fitTitle: "일회 구매와 업데이트 조건을 중시한다면 VoiceInk도 검토",
        fitText: "VoiceInk는 Mac 로컬 받아쓰기와 기기 수별 일회 구매 요금제, 평생 업데이트를 안내합니다. 로컬 처리와 비용이 중요하다면 충분히 비교할 가치가 있는 후보입니다.",
        decisionTitle: "더 저렴하다고 가정하지 말고 설정과 입력으로 Dictivo 평가",
        decisionText: "Dictivo Local과 VoiceInk의 업데이트 조건은 다릅니다. 같은 기기 수와 사용 기간으로 비교하세요. Dictivo의 하드웨어별 모델 안내, 기록, 사전, Local·Cloud Fast 전환이 자신의 작업에 맞는지 확인해야 합니다.",
        testText: "기밀이 없는 회사명과 자주 쓰는 표현을 포함한 초안을 두 제품에서 입력하세요. 초기 설정부터 붙여넣기 후 수정까지 비교하고, VoiceInk의 문장 보정을 사용한다면 텍스트 처리 위치도 확인하세요.",
        faqs: [["VoiceInk가 음성을 로컬로 인식하면 문장 보정도 로컬인가요?", "별도로 확인해야 합니다. 선택형 클라우드 보정은 음성 인식이 로컬이어도 텍스트를 외부 서비스로 보낼 수 있습니다."], ["Dictivo가 VoiceInk보다 저렴한가요?", "항상 그렇지는 않습니다. VoiceInk는 기기 수별 요금제와 평생 업데이트를 제공합니다. 최신 비교표에서 기기 수, 통화, Dictivo의 선택형 업데이트 비용을 맞춰 비교하세요."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "가끔 짧게 입력한다면 macOS 기본 받아쓰기부터",
        fitText: "macOS 받아쓰기는 추가 구매 없이 사용할 수 있습니다. 검색어나 짧은 메시지를 가끔 입력하고 현재 결과에 만족한다면 기본 기능만으로 충분할 수 있습니다. 유료 앱으로 바꿀 필요가 없는 경우도 있습니다.",
        decisionTitle: "기록, 사전, 모델 선택의 실제 가치를 확인",
        decisionText: "Dictivo는 로컬 기록, 사전, 스니펫, 모델 선택을 일상 입력에 활용할 수 있습니다. 이러한 기능이 수정과 반복 작업을 줄이는지 확인하세요. Apple 받아쓰기를 전부 클라우드 처리라고 설명할 수는 없습니다.",
        testText: "키보드 설정에서 처리 위치와 인터넷 필요 여부를 확인하세요. 그다음 자주 쓰는 고유명사가 포함된 문장을 두 제품에 입력해 수정량과 입력 실패 후 텍스트를 복구하는 과정을 비교하세요.",
        faqs: [["macOS 받아쓰기는 항상 오프라인인가요?", "Mac, 언어, 설정에 따라 다릅니다. Apple 안내에 따라 키보드 설정에서 기기 내 처리인지, 인터넷이 필요한지 확인하세요."], ["기본 받아쓰기가 무료인데 Dictivo를 구매할 이유가 있나요?", "기록, 사전, 스니펫, 모델 선택이 매일의 입력에 도움이 되는 경우입니다. 체험으로 확인하고, 기본 기능이 충분하다면 그대로 사용해도 좋습니다."]],
      },
      "dragon-alternative": {
        fitTitle: "음성 명령과 기존 어휘 설정에 의존한다면 Dragon Professional",
        fitText: "Dragon Professional v16은 Windows용 로컬 음성 인식과 음성 명령을 제공합니다. 축적한 어휘, 매크로, 손을 쓰지 않는 PC 조작에 의존한다면 텍스트 전사만으로 전체 작업을 대체할 수는 없습니다.",
        decisionTitle: "텍스트 입력과 PC 음성 제어를 나눠 비교",
        decisionText: "Dictivo는 단축키로 이메일, 문서, 메모에 음성을 입력하는 작업이 중심이며 개인 음성 프로필 학습을 전제로 하지 않습니다. Dragon 명령이나 전문 업무 기능의 직접적인 대체품은 아닙니다. 현재 지원하는 운영체제도 비교하세요.",
        testText: "평소 용어, 수정 동작, 필수 음성 명령 목록을 만들고 하나씩 확인하세요. 전사 한 번의 성공을 접근성 작업 전체를 이전할 수 있다는 근거로 삼지 마세요.",
        faqs: [["Dragon Professional은 클라우드 전용인가요?", "아니요. 여기서 비교하는 Professional v16 데스크톱판은 로컬 처리이며 초기 설치와 활성화에는 인터넷이 필요합니다. 별도의 Dragon 클라우드 제품과 구분하세요."], ["Dictivo가 Dragon의 핸즈프리 조작을 대체하나요?", "동등한 대체라고 볼 수 없습니다. Dictivo는 단축키 텍스트 입력에 초점을 맞춥니다. PC 전체 음성 제어나 사용자 매크로가 필요하면 필수 동작별로 지원을 확인하세요."]],
      },
    },
  },
  de: {
    fit: "Passende Aufgaben", decision: "Entscheidung", test: "Selbst prüfen",
    modeFaq: ["Bleibt Audio auch mit Dictivo Cloud Fast auf dem Gerät?", "Nein. Local erkennt Sprache nach der Modellinstallation auf dem Gerät. Cloud Fast lädt die ausgewählte Aufnahme zur Verarbeitung auf einen Server hoch. Für Aufgaben ohne Audio-Upload verwenden Sie Local."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "Wispr Flow für mobile Eingabe und Cloud-Bearbeitung",
        fitText: "Wer zwischen Computer und Smartphone wechselt oder Teamfunktionen und Cloud-Textbearbeitung braucht, sollte diese Fähigkeiten von Wispr Flow mitbewerten. Lokales Desktop-Diktat ersetzt nicht automatisch den gesamten mobilen und gemeinsamen Arbeitsablauf.",
        decisionTitle: "Dictivo Local, wenn Audio nicht hochgeladen werden darf",
        decisionText: "Wispr Flows Einstellungen für Datenfreigabe und Cloud-Speicherung machen die Spracherkennung nicht offline. Für private Entwürfe am Desktop kommt Dictivo Local infrage. Vergleichen Sie Verarbeitungsort und laufende Kosten getrennt.",
        testText: "Diktieren Sie einen unvertraulichen E-Mail-Entwurf und prüfen Sie Zeichensetzung, Korrekturen und Einfügen in die Ziel-App. Testen Sie Dictivo nach der Modellinstallation in Local; für die Offline-Prüfung wiederholen Sie die Aufgabe ohne Verbindung.",
        faqs: [["Kann Wispr Flow Sprache offline erkennen?", "Laut Wisprs Data Controls erfolgt die Spracherkennung in der Cloud. Das Abschalten von Speicherung oder Freigabe zur Modellverbesserung verlagert die Erkennung nicht auf das Gerät."], ["Ersetzt Dictivo auch Wispr Flows mobile Nutzung?", "Hier geht es um Dictivo als Desktop-Diktierwerkzeug. Wenn Eingabe auf iPhone oder Android unverzichtbar ist, prüfen Sie Wispr Flows mobile Unterstützung als eigene Anforderung."]],
      },
      "superwhisper-alternative": {
        fitTitle: "Superwhisper für individuell eingerichtete Modi und Modelle",
        fitText: "Superwhisper bietet lokale und Cloud-Modelle sowie Modi zur Ausgabeanpassung. Wenn Sie bereits Einstellungen für E-Mails oder Code aufgebaut haben, ist deren Erhalt ein wichtiger Punkt beim Wechsel.",
        decisionTitle: "Lokale Verarbeitung bei beiden: Bedienung und Kosten vergleichen",
        decisionText: "Auch Superwhispers lokale Modelle erkennen Sprache auf dem Gerät. Ein Wechsel zu Dictivo sollte nicht auf der Annahme beruhen, Superwhisper lade jedes Audio hoch. Prüfen Sie, ob Hotkey, Verlauf, Wörterbuch und Textbausteine Ihren Alltag abdecken und welche Lizenz Sie benötigen.",
        testText: "Verwenden Sie auf demselben Computer und Mikrofon denselben Text mit lokalen Modellen. Notieren Sie Modellnamen, Wartezeit bis zum fertigen Text und Korrekturen. Unterschiedliche Modelle belegen keinen pauschalen Genauigkeitsunterschied zwischen Apps.",
        faqs: [["Kann Superwhisper Audio auf dem Gerät behalten?", "Ja, lokale Modelle laufen auf dem Gerät. Bei Cloud-Modellen oder zusätzlicher KI-Verarbeitung müssen Sie Verarbeitungsort und Einstellungen gesondert prüfen."], ["Wird die Erkennung durch den Wechsel zu Dictivo genauer?", "Diese Seite belegt keine solche Verbesserung. Modell, Sprache, Mikrofon und Sprechweise beeinflussen das Ergebnis. Testen Sie Ihre üblichen Namen, Begriffe und Sätze in beiden Apps."]],
      },
      "macwhisper-alternative": {
        fitTitle: "MacWhisper für Aufnahmedateien, Untertitel und Exporte",
        fitText: "Wenn Sie vorhandene Interviews oder Vorlesungen transkribieren und Untertitel oder Exporte benötigen, prüfen Sie MacWhispers entsprechende Funktionen. MacWhisper bietet außerdem systemweites Diktat und ist daher kein reines Dateiwerkzeug.",
        decisionTitle: "Den Weg von der Stimme in die aktuelle App vergleichen",
        decisionText: "Dictivo konzentriert sich auf das Eingabefeld, die Aufnahme per Tastenkürzel und die Rückgabe des Textes. Da auch MacWhisper Diktat unterstützt, zählt die tatsächliche Bedienung. Beide können lokal verarbeiten; Datenschutz allein entscheidet diesen Vergleich nicht.",
        testText: "Diktieren Sie in Ihrer üblichen Mail-App einen kurzen Entwurf und prüfen Sie Einfügen und Korrekturen. Benötigen Sie Stapelverarbeitung oder Untertitel, testen Sie diese Aufgaben in MacWhisper zusätzlich. Eine Diktat-Demo bewertet keine Dateifunktionen.",
        faqs: [["Unterstützt MacWhisper auch Diktat in Apps?", "Ja, die Produktseite beschreibt systemweites Diktat. Vergleichen Sie Dateitranskription und Eingabekomfort in Ihrer Ziel-App getrennt."], ["Ersetzt Dictivo MacWhispers Dateiverarbeitung?", "Dictivo ist auf Hotkey-Diktat ausgerichtet. Wenn Stapeltranskription, Untertitel oder Exporte im Mittelpunkt stehen, prüfen Sie die dafür benötigten MacWhisper-Funktionen."]],
      },
      "voiceink-alternative": {
        fitTitle: "VoiceInk bei Einmalkauf und Update-Bedingungen berücksichtigen",
        fitText: "VoiceInk bietet lokales Mac-Diktat, Einmalkaufpläne nach Gerätezahl und lebenslange Updates. Wenn lokale Verarbeitung und Preis wichtig sind, gehört es in die engere Auswahl.",
        decisionTitle: "Dictivo an Einrichtung und Alltag messen, nicht an einem Preisversprechen",
        decisionText: "Die Update-Bedingungen von Dictivo Local und VoiceInk unterscheiden sich. Vergleichen Sie dieselbe Gerätezahl und Nutzungsdauer. Prüfen Sie dann, ob Dictivos Hardware-Modellvorschläge, Verlauf, Wörterbuch und Local-/Cloud-Fast-Auswahl zu Ihren Aufgaben passen.",
        testText: "Nutzen Sie einen unvertraulichen Entwurf mit Firmennamen und häufigen Formulierungen. Vergleichen Sie alles von der Einrichtung bis zu Korrekturen nach dem Einfügen. Bei VoiceInks Textverbesserung prüfen Sie auch den Verarbeitungsort des Textes.",
        faqs: [["Ist bei lokaler VoiceInk-Erkennung auch die Textverbesserung lokal?", "Das muss getrennt geprüft werden. Optionale Cloud-Verbesserung kann Text an einen externen Dienst senden, obwohl die Spracherkennung lokal erfolgt."], ["Ist Dictivo günstiger als VoiceInk?", "Nicht grundsätzlich. VoiceInk bietet Pläne nach Gerätezahl und lebenslange Updates. Vergleichen Sie die aktuelle Tabelle mit gleicher Gerätezahl, Währung und Dictivos optionalen Update-Kosten."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "Für gelegentliche kurze Eingaben zuerst macOS-Diktat testen",
        fitText: "macOS-Diktat erfordert keinen zusätzlichen Kauf. Wenn Sie nur gelegentlich Suchbegriffe oder kurze Nachrichten diktieren und mit dem Ergebnis zufrieden sind, kann die eingebaute Funktion bereits ausreichen.",
        decisionTitle: "Den Nutzen von Verlauf, Wörterbuch und Modellwahl prüfen",
        decisionText: "Dictivo ergänzt die Eingabe um lokalen Verlauf, Wörterbuch, Textbausteine und Modellwahl. Entscheidend ist, ob diese Funktionen Ihre Korrekturen und Wiederholungen verringern. Apples Diktat lässt sich nicht pauschal als Cloud-Verarbeitung beschreiben.",
        testText: "Prüfen Sie in den Tastatureinstellungen den Verarbeitungsort und die Internetanforderung. Diktieren Sie anschließend in beiden Werkzeugen Sätze mit Ihren Eigennamen und vergleichen Sie Korrekturen sowie das Wiederfinden von Text nach fehlgeschlagener Eingabe.",
        faqs: [["Funktioniert macOS-Diktat immer offline?", "Das hängt von Mac, Sprache und Einstellungen ab. Prüfen Sie gemäß Apples Anleitung in den Tastatureinstellungen, ob lokal verarbeitet wird oder Internet nötig ist."], ["Warum Dictivo kaufen, wenn macOS-Diktat kostenlos ist?", "Wenn Verlauf, Wörterbuch, Textbausteine und Modellwahl bei täglicher Eingabe helfen. Prüfen Sie das im Test; reicht die eingebaute Funktion, ist es sinnvoll, dabei zu bleiben."]],
      },
      "dragon-alternative": {
        fitTitle: "Dragon Professional für Sprachbefehle und vorhandenes Vokabular",
        fitText: "Dragon Professional v16 verbindet lokale Windows-Spracherkennung mit Sprachbefehlen. Wenn Sie auf eigenes Vokabular, Makros oder freihändige PC-Steuerung angewiesen sind, ersetzt eine andere Transkription nicht automatisch Ihren gesamten Arbeitsablauf.",
        decisionTitle: "Texteingabe und PC-Sprachsteuerung getrennt betrachten",
        decisionText: "Dictivo ist auf Hotkey-Diktat in E-Mails, Dokumente und Notizen ausgerichtet und setzt kein trainiertes persönliches Sprachprofil voraus. Es ist kein direkter Ersatz für Dragon-Befehle oder Spezialfunktionen. Vergleichen Sie auch die aktuell unterstützten Betriebssysteme.",
        testText: "Listen Sie Ihre üblichen Begriffe, Korrekturschritte und unverzichtbaren Sprachbefehle auf und prüfen Sie sie einzeln. Eine erfolgreiche Transkription belegt nicht, dass sich ein kompletter barrierefreier Arbeitsablauf übertragen lässt.",
        faqs: [["Ist Dragon Professional ein reines Cloud-Produkt?", "Nein. Die hier verglichene Desktop-Ausgabe Professional v16 verarbeitet lokal; die erste Installation und Aktivierung benötigen Internet. Unterscheiden Sie sie von separaten Dragon-Cloud-Produkten."], ["Ersetzt Dictivo Dragons freihändige Bedienung?", "Nicht gleichwertig. Dictivo konzentriert sich auf Texteingabe per Hotkey. Für vollständige PC-Sprachsteuerung oder eigene Makros müssen Sie jede unverzichtbare Funktion gesondert prüfen."]],
      },
    },
  },
  fr: {
    fit: "Usages adaptés", decision: "Critères de choix", test: "À vérifier vous-même",
    modeFaq: ["L'audio reste-t-il sur l'appareil avec Dictivo Cloud Fast ?", "Non. Local reconnaît la parole sur l'appareil après l'installation du modèle. Cloud Fast envoie l'enregistrement sélectionné à un serveur pour le traiter. Utilisez Local si l'audio ne doit pas être envoyé."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "Wispr Flow pour le mobile et la réécriture cloud",
        fitText: "Si vous passez de l'ordinateur au téléphone ou utilisez des fonctions d'équipe et de réécriture cloud, intégrez ces capacités de Wispr Flow à la comparaison. Une dictée locale sur ordinateur ne remplace pas forcément tout ce parcours.",
        decisionTitle: "Dictivo Local lorsque l'envoi audio est exclu",
        decisionText: "Les réglages de partage et de stockage de Wispr Flow ne rendent pas la reconnaissance vocale hors ligne. Dictivo Local est une option pour rédiger des brouillons privés sur ordinateur. Comparez séparément le lieu de traitement et les dépenses récurrentes.",
        testText: "Dictez un brouillon d'e-mail non confidentiel et vérifiez ponctuation, corrections et insertion dans l'app cible. Après avoir installé le modèle Dictivo, choisissez Local ; pour vérifier le fonctionnement hors ligne, répétez sans connexion.",
        faqs: [["Wispr Flow reconnaît-il la parole hors ligne ?", "Sa page Data Controls indique un traitement dans le cloud. Désactiver le stockage ou le partage pour améliorer les modèles ne déplace pas la reconnaissance sur l'appareil."], ["Dictivo remplace-t-il aussi les usages mobiles de Wispr Flow ?", "Cette comparaison porte sur Dictivo comme outil de dictée sur ordinateur. Si la saisie sur iPhone ou Android est indispensable, vérifiez séparément la prise en charge mobile de Wispr Flow."]],
      },
      "superwhisper-alternative": {
        fitTitle: "Superwhisper pour des modes et modèles personnalisés",
        fitText: "Superwhisper propose des modèles locaux et cloud ainsi que des modes pour adapter le résultat. Si vous avez déjà configuré des usages pour les e-mails ou le code, vérifiez ce que vous conserveriez en changeant d'app.",
        decisionTitle: "Deux solutions locales : comparer les gestes et le coût",
        decisionText: "Les modèles locaux de Superwhisper reconnaissent aussi la parole sur l'appareil. Choisir Dictivo ne doit pas reposer sur l'idée que Superwhisper envoie forcément tout l'audio. Évaluez raccourci, historique, dictionnaire, extraits et licence nécessaires à votre quotidien.",
        testText: "Utilisez le même ordinateur, microphone et texte avec des modèles locaux. Notez les modèles, l'attente jusqu'au texte utilisable et les corrections. Des modèles différents ne prouvent pas une différence générale de précision entre les apps.",
        faqs: [["Superwhisper peut-il conserver l'audio sur l'appareil ?", "Oui, ses modèles locaux fonctionnent sur l'appareil. Avec des modèles cloud ou un traitement IA supplémentaire, vérifiez séparément le lieu de traitement et les réglages."], ["Passer à Dictivo améliore-t-il la précision ?", "Cette page ne démontre pas une telle amélioration. Modèle, langue, microphone et manière de parler influencent le résultat. Essayez vos noms, termes et phrases habituels dans les deux apps."]],
      },
      "macwhisper-alternative": {
        fitTitle: "MacWhisper pour les fichiers, sous-titres et exports",
        fitText: "Pour transcrire des entretiens ou cours déjà enregistrés et produire des sous-titres ou exports, examinez les fonctions de MacWhisper. Il propose aussi la dictée dans les apps : le décrire comme un simple outil de fichiers serait inexact.",
        decisionTitle: "Comparer le passage de la voix à l'app active",
        decisionText: "Dictivo se concentre sur le champ actif, l'enregistrement au raccourci et le retour du texte. MacWhisper prenant aussi en charge la dictée, comparez les gestes réels. Les deux permettent un traitement local ; la confidentialité seule ne tranche pas.",
        testText: "Dictez un court brouillon dans votre messagerie habituelle et vérifiez insertion et corrections. Si vous avez besoin de lots de fichiers ou de sous-titres, testez ces tâches séparément dans MacWhisper. Une démonstration de dictée ne les évalue pas.",
        faqs: [["MacWhisper permet-il aussi de dicter dans les apps ?", "Oui, sa page produit décrit la dictée à l'échelle du système. Comparez séparément la transcription de fichiers et le confort de saisie dans votre app cible."], ["Dictivo remplace-t-il le traitement de fichiers de MacWhisper ?", "Dictivo est centré sur la dictée au raccourci. Pour la transcription par lots, les sous-titres ou les exports, vérifiez les fonctions MacWhisper nécessaires à votre tâche."]],
      },
      "voiceink-alternative": {
        fitTitle: "VoiceInk pour l'achat unique et les conditions de mise à jour",
        fitText: "VoiceInk propose la dictée locale sur Mac, des achats selon le nombre d'appareils et des mises à jour à vie. Si le traitement local et le prix sont déterminants, c'est une option à comparer sérieusement.",
        decisionTitle: "Évaluer Dictivo sur la configuration et la saisie quotidienne",
        decisionText: "Dictivo Local et VoiceInk ont des conditions de mise à jour différentes. Comparez le même nombre d'appareils et la même durée. Vérifiez ensuite si le choix de modèle selon le matériel, l'historique, le dictionnaire et Local/Cloud Fast conviennent à vos tâches.",
        testText: "Essayez un brouillon non confidentiel contenant des noms d'entreprise et des expressions fréquentes. Comparez de la configuration initiale aux corrections après insertion. Avec l'amélioration de texte VoiceInk, vérifiez également où le texte est traité.",
        faqs: [["La reconnaissance locale de VoiceInk implique-t-elle une correction locale ?", "Il faut vérifier séparément. Une amélioration cloud facultative peut envoyer le texte à un service externe même si la reconnaissance vocale s'est faite localement."], ["Dictivo est-il moins cher que VoiceInk ?", "Pas systématiquement. VoiceInk annonce des offres par nombre d'appareils et des mises à jour à vie. Comparez le tableau actuel à appareils et devise identiques, avec les mises à jour facultatives de Dictivo."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "Pour quelques phrases, commencer par la dictée macOS",
        fitText: "La dictée macOS ne demande aucun achat supplémentaire. Si vous dictez occasionnellement une recherche ou un message et êtes satisfait du résultat, la fonction intégrée peut suffire sans passer à une app payante.",
        decisionTitle: "Vérifier l'utilité de l'historique, du dictionnaire et des modèles",
        decisionText: "Dictivo ajoute historique local, dictionnaire, extraits et choix de modèle à la saisie quotidienne. Vérifiez si ces fonctions réduisent vos corrections et répétitions. Il serait inexact de présenter toute dictée Apple comme un traitement cloud.",
        testText: "Vérifiez le lieu de traitement et le besoin de connexion dans les réglages Clavier. Dictez ensuite vos noms propres habituels dans les deux outils, puis comparez corrections et récupération du texte après une insertion ratée.",
        faqs: [["La dictée macOS fonctionne-t-elle toujours hors ligne ?", "Cela dépend du Mac, de la langue et des réglages. Suivez les indications Apple dans les réglages Clavier pour savoir si le traitement est local ou nécessite Internet."], ["Pourquoi payer Dictivo si la dictée macOS est gratuite ?", "Si l'historique, le dictionnaire, les extraits et le choix de modèle facilitent votre saisie quotidienne. Vérifiez-le pendant l'essai ; garder la fonction intégrée est raisonnable si elle suffit."]],
      },
      "dragon-alternative": {
        fitTitle: "Dragon Professional pour les commandes et le vocabulaire existant",
        fitText: "Dragon Professional v16 associe reconnaissance locale sous Windows et commandes vocales. Si vous dépendez de votre vocabulaire, de macros ou du contrôle sans les mains, obtenir une transcription ne suffit pas à remplacer tout le travail.",
        decisionTitle: "Séparer saisie de texte et commande vocale du PC",
        decisionText: "Dictivo vise la dictée au raccourci dans les e-mails, documents et notes, sans entraînement préalable d'un profil vocal personnel. Il ne remplace pas directement les commandes Dragon ou ses fonctions spécialisées. Comparez aussi les systèmes actuellement pris en charge.",
        testText: "Listez vos termes courants, gestes de correction et commandes indispensables, puis vérifiez-les un par un. Une transcription réussie ne prouve pas qu'un parcours d'accessibilité complet puisse être transféré.",
        faqs: [["Dragon Professional fonctionne-t-il uniquement dans le cloud ?", "Non. L'édition de bureau Professional v16 comparée ici traite localement ; installation et activation initiales nécessitent Internet. Distinguez-la des autres produits cloud Dragon."], ["Dictivo remplace-t-il le contrôle sans les mains de Dragon ?", "Ce n'est pas un remplacement équivalent. Dictivo se concentre sur la saisie au raccourci. Pour contrôler tout le PC par la voix ou utiliser des macros, vérifiez chaque fonction indispensable."]],
      },
    },
  },
  es: {
    fit: "Usos adecuados", decision: "Criterios de elección", test: "Compruébalo con tu trabajo",
    modeFaq: ["¿El audio sigue en el dispositivo con Dictivo Cloud Fast?", "No. Local reconoce la voz en el dispositivo tras instalar el modelo. Cloud Fast sube la grabación seleccionada a un servidor para procesarla. Usa Local cuando el audio no pueda enviarse fuera."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "Wispr Flow para escribir en el móvil y editar en la nube",
        fitText: "Si alternas entre ordenador y teléfono o necesitas funciones de equipo y edición de texto en la nube, incluye esas capacidades de Wispr Flow en la comparación. El dictado local de escritorio no sustituye automáticamente todo ese flujo.",
        decisionTitle: "Dictivo Local cuando el audio no puede subirse",
        decisionText: "Los controles de uso compartido y almacenamiento de Wispr Flow no convierten el reconocimiento en un proceso sin conexión. Dictivo Local es una opción para borradores privados en el escritorio. Compara por separado el lugar de procesamiento y los gastos recurrentes.",
        testText: "Dicta un borrador de correo no confidencial y comprueba puntuación, correcciones e inserción en la app destino. Tras instalar el modelo de Dictivo, elige Local; para comprobar el uso sin conexión, repite la tarea desconectado.",
        faqs: [["¿Wispr Flow reconoce la voz sin conexión?", "Su página Data Controls indica que el reconocimiento se realiza en la nube. Desactivar el almacenamiento o compartir datos para mejorar modelos no traslada el reconocimiento al dispositivo."], ["¿Dictivo sustituye también el uso móvil de Wispr Flow?", "Aquí se compara Dictivo como herramienta de dictado de escritorio. Si escribir en iPhone o Android es imprescindible, comprueba por separado la compatibilidad móvil de Wispr Flow."]],
      },
      "superwhisper-alternative": {
        fitTitle: "Superwhisper para configurar modos y modelos",
        fitText: "Superwhisper ofrece modelos locales y de nube, además de modos para adaptar el resultado. Si ya configuraste flujos para correo o código, conservar esas configuraciones es un criterio importante antes de cambiar.",
        decisionTitle: "Ambos pueden ser locales: compara el manejo y el coste",
        decisionText: "Los modelos locales de Superwhisper también reconocen voz en el dispositivo. Elegir Dictivo no debe basarse en asumir que Superwhisper siempre sube el audio. Comprueba si atajo, historial, diccionario y fragmentos cubren tu trabajo, y qué licencia necesitas.",
        testText: "Usa el mismo ordenador, micrófono y texto con modelos locales. Anota modelo, espera hasta disponer del texto y correcciones. Resultados de modelos distintos no demuestran una diferencia general de precisión entre apps.",
        faqs: [["¿Superwhisper también puede mantener el audio en el dispositivo?", "Sí, sus modelos locales se ejecutan en él. Si eliges modelos de nube o procesamiento adicional de IA, comprueba por separado el destino y los ajustes."], ["¿Cambiar a Dictivo mejora la precisión?", "Esta página no demuestra esa mejora. Modelo, idioma, micrófono y forma de hablar afectan al resultado. Prueba tus nombres, términos y frases habituales en ambas apps."]],
      },
      "macwhisper-alternative": {
        fitTitle: "MacWhisper para archivos, subtítulos y exportaciones",
        fitText: "Si transcribes entrevistas o clases ya grabadas y necesitas subtítulos o exportar, revisa las funciones de MacWhisper. También ofrece dictado en todo el sistema, por lo que no sería exacto describirlo como una herramienta solo de archivos.",
        decisionTitle: "Compara cómo llega la voz a la app activa",
        decisionText: "Dictivo se centra en el campo activo, grabar con un atajo y devolver el texto. MacWhisper también permite dictar, así que compara el uso real. Ambos ofrecen procesamiento local; la privacidad por sí sola no resuelve la elección.",
        testText: "Dicta un borrador breve en tu correo habitual y comprueba inserción y correcciones. Si necesitas lotes de archivos o subtítulos, prueba esas tareas por separado en MacWhisper. Una demostración de dictado no evalúa las funciones de archivos.",
        faqs: [["¿MacWhisper también permite dictar en otras apps?", "Sí, su página de producto describe el dictado en todo el sistema. Compara por separado la transcripción de archivos y la facilidad de entrada en tu app destino."], ["¿Dictivo sustituye el procesamiento de archivos de MacWhisper?", "Dictivo se centra en dictar con un atajo. Si lo principal es la transcripción por lotes, los subtítulos o exportar, comprueba las funciones de MacWhisper que necesitas."]],
      },
      "voiceink-alternative": {
        fitTitle: "Considera VoiceInk para compra única y actualizaciones",
        fitText: "VoiceInk ofrece dictado local en Mac, planes de compra según el número de dispositivos y actualizaciones de por vida. Si priorizas procesamiento local y precio, merece una comparación seria.",
        decisionTitle: "Evalúa Dictivo por la configuración y el trabajo diario",
        decisionText: "Las condiciones de actualización de Dictivo Local y VoiceInk son diferentes. Compara el mismo número de dispositivos y años de uso. Después comprueba si las sugerencias de modelo según el equipo, el historial, el diccionario y Local/Cloud Fast encajan con tus tareas.",
        testText: "Prueba un borrador no confidencial con nombres de empresa y expresiones frecuentes. Compara desde la configuración hasta las correcciones tras insertar. Si activas la mejora de texto de VoiceInk, comprueba también dónde se procesa ese texto.",
        faqs: [["¿El reconocimiento local de VoiceInk implica que la mejora del texto también sea local?", "Hay que comprobarlo por separado. Una mejora opcional en la nube puede enviar texto a un servicio externo aunque la voz se haya reconocido localmente."], ["¿Dictivo es más barato que VoiceInk?", "No siempre. VoiceInk anuncia planes por número de dispositivos y actualizaciones de por vida. Compara la tabla actual con igual número de equipos, moneda y costes opcionales de actualización de Dictivo."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "Para frases ocasionales, empieza por el dictado de macOS",
        fitText: "El dictado de macOS no requiere otra compra. Si solo dictas búsquedas o mensajes cortos de vez en cuando y te satisface el resultado, la función integrada puede bastar sin pasar a una app de pago.",
        decisionTitle: "Comprueba el valor del historial, diccionario y elección de modelos",
        decisionText: "Dictivo incorpora historial local, diccionario, fragmentos y elección de modelo a la entrada diaria. Comprueba si reducen tus correcciones y repeticiones. No es exacto presentar todo el dictado de Apple como procesamiento en la nube.",
        testText: "Consulta en los ajustes de Teclado dónde se procesa y si necesita Internet. Después dicta frases con tus nombres propios habituales en ambas herramientas y compara las correcciones y la recuperación del texto tras una inserción fallida.",
        faqs: [["¿El dictado de macOS siempre funciona sin conexión?", "Depende del Mac, idioma y ajustes. Sigue las indicaciones de Apple en los ajustes de Teclado para saber si el procesamiento es local o necesita Internet."], ["¿Por qué pagar Dictivo si el dictado de macOS es gratis?", "Si el historial, diccionario, fragmentos y elección de modelo ayudan en tu entrada diaria. Compruébalo durante la prueba; mantener la función integrada es razonable cuando basta."]],
      },
      "dragon-alternative": {
        fitTitle: "Dragon Professional para comandos y vocabulario ya configurado",
        fitText: "Dragon Professional v16 combina reconocimiento local en Windows y comandos de voz. Si dependes de vocabulario acumulado, macros o control del PC sin manos, otra transcripción no sustituye automáticamente todo tu trabajo.",
        decisionTitle: "Separa la entrada de texto del control del PC por voz",
        decisionText: "Dictivo se centra en dictar con un atajo en correos, documentos y notas, sin entrenar previamente un perfil de voz personal. No sustituye directamente los comandos de Dragon ni sus funciones especializadas. Compara también los sistemas compatibles actuales.",
        testText: "Enumera términos habituales, pasos de corrección y comandos imprescindibles, y verifícalos uno a uno. Una transcripción correcta no demuestra que puedas trasladar todo un flujo de accesibilidad.",
        faqs: [["¿Dragon Professional es exclusivamente de nube?", "No. La edición de escritorio Professional v16 comparada aquí procesa localmente; la primera instalación y activación necesitan Internet. Distínguela de los productos de nube separados de Dragon."], ["¿Dictivo sustituye el control sin manos de Dragon?", "No es una sustitución equivalente. Dictivo se centra en entrada de texto con atajo. Para controlar todo el PC por voz o usar macros, comprueba cada función imprescindible."]],
      },
    },
  },
  it: {
    fit: "Usi adatti", decision: "Criteri di scelta", test: "Da verificare sul tuo lavoro",
    modeFaq: ["L'audio resta sul dispositivo anche con Dictivo Cloud Fast?", "No. Local riconosce la voce sul dispositivo dopo aver installato il modello. Cloud Fast invia la registrazione selezionata a un server per elaborarla. Usa Local quando l'audio non può essere inviato all'esterno."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "Wispr Flow per dettare da mobile e riscrivere nel cloud",
        fitText: "Se alterni computer e telefono o usi funzioni di team e revisione del testo nel cloud, includi queste capacità di Wispr Flow nel confronto. La dettatura locale da desktop non sostituisce automaticamente l'intero flusso mobile e collaborativo.",
        decisionTitle: "Dictivo Local quando non puoi caricare l'audio",
        decisionText: "Le impostazioni di condivisione e archiviazione di Wispr Flow non rendono il riconoscimento offline. Dictivo Local è un'opzione per scrivere bozze riservate sul computer. Confronta separatamente il luogo di elaborazione e i costi ricorrenti.",
        testText: "Detta una bozza di email non riservata e controlla punteggiatura, correzioni e inserimento nell'app. Dopo l'installazione del modello Dictivo, scegli Local; per verificare l'uso offline, ripeti senza connessione.",
        faqs: [["Wispr Flow riconosce la voce offline?", "La pagina Data Controls descrive il riconoscimento nel cloud. Disattivare archiviazione o condivisione per migliorare i modelli non sposta il riconoscimento sul dispositivo."], ["Dictivo sostituisce anche gli usi mobili di Wispr Flow?", "Qui confrontiamo Dictivo come strumento di dettatura desktop. Se l'inserimento su iPhone o Android è indispensabile, verifica separatamente il supporto mobile di Wispr Flow."]],
      },
      "superwhisper-alternative": {
        fitTitle: "Superwhisper per modalità e modelli personalizzati",
        fitText: "Superwhisper offre modelli locali e cloud, oltre a modalità per adattare il risultato. Se hai già configurato flussi per email o codice, verifica cosa potrai conservare passando a un'altra app.",
        decisionTitle: "Entrambi possono lavorare in locale: confronta uso e costo",
        decisionText: "Anche i modelli locali di Superwhisper riconoscono la voce sul dispositivo. Scegliere Dictivo non dovrebbe basarsi sull'idea che Superwhisper carichi sempre l'audio. Valuta se scorciatoia, cronologia, dizionario e frammenti coprono il tuo lavoro e quale licenza serve.",
        testText: "Usa lo stesso computer, microfono e testo con modelli locali. Annota modello, attesa fino al testo utilizzabile e correzioni. Modelli diversi non dimostrano una differenza generale di precisione tra le app.",
        faqs: [["Superwhisper può mantenere l'audio sul dispositivo?", "Sì, i modelli locali vengono eseguiti sul dispositivo. Con modelli cloud o elaborazione IA aggiuntiva, verifica separatamente il luogo di elaborazione e le impostazioni."], ["Passare a Dictivo migliora la precisione?", "Questa pagina non dimostra tale miglioramento. Modello, lingua, microfono e modo di parlare influenzano il risultato. Prova nomi, termini e frasi abituali in entrambe le app."]],
      },
      "macwhisper-alternative": {
        fitTitle: "MacWhisper per file registrati, sottotitoli ed esportazioni",
        fitText: "Se trascrivi interviste o lezioni già registrate e ti servono sottotitoli o esportazioni, verifica le funzioni di MacWhisper. Offre anche dettatura a livello di sistema: descriverlo come strumento solo per file sarebbe inesatto.",
        decisionTitle: "Confronta il passaggio dalla voce all'app attiva",
        decisionText: "Dictivo si concentra sul campo attivo, sulla registrazione con scorciatoia e sul ritorno del testo. Anche MacWhisper supporta la dettatura, quindi confronta l'uso reale. Entrambi consentono elaborazione locale: la privacy da sola non decide il confronto.",
        testText: "Detta una breve bozza nella tua app di posta e verifica inserimento e correzioni. Se servono lotti di file o sottotitoli, prova separatamente queste attività in MacWhisper. Una demo di dettatura non valuta le funzioni per file.",
        faqs: [["MacWhisper permette anche di dettare nelle app?", "Sì, la pagina del prodotto descrive la dettatura a livello di sistema. Confronta separatamente la trascrizione di file e la comodità di inserimento nella tua app."], ["Dictivo sostituisce l'elaborazione dei file di MacWhisper?", "Dictivo è incentrato sulla dettatura con scorciatoia. Per trascrizioni in serie, sottotitoli o esportazioni, verifica le funzioni di MacWhisper necessarie al tuo lavoro."]],
      },
      "voiceink-alternative": {
        fitTitle: "Considera VoiceInk per acquisto unico e aggiornamenti",
        fitText: "VoiceInk propone dettatura locale su Mac, piani di acquisto per numero di dispositivi e aggiornamenti a vita. Se elaborazione locale e prezzo sono decisivi, merita un confronto attento.",
        decisionTitle: "Valuta Dictivo sulla configurazione e sull'uso quotidiano",
        decisionText: "Le condizioni di aggiornamento di Dictivo Local e VoiceInk sono diverse. Confronta lo stesso numero di dispositivi e anni d'uso. Poi verifica se suggerimenti di modello in base all'hardware, cronologia, dizionario e Local/Cloud Fast sono adatti alle tue attività.",
        testText: "Prova una bozza non riservata con nomi aziendali ed espressioni frequenti. Confronta dalla configurazione alle correzioni dopo l'inserimento. Se attivi il miglioramento del testo di VoiceInk, verifica anche dove viene elaborato il testo.",
        faqs: [["Il riconoscimento locale di VoiceInk implica anche una revisione locale?", "Va verificato separatamente. Un miglioramento cloud facoltativo può inviare testo a un servizio esterno anche quando il riconoscimento vocale è locale."], ["Dictivo costa meno di VoiceInk?", "Non sempre. VoiceInk propone piani per numero di dispositivi e aggiornamenti a vita. Confronta la tabella attuale a parità di dispositivi, valuta e costi facoltativi di aggiornamento di Dictivo."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "Per poche frasi occasionali, inizia dalla dettatura macOS",
        fitText: "La dettatura macOS non richiede un acquisto aggiuntivo. Se detti ricerche o brevi messaggi solo ogni tanto e il risultato ti soddisfa, la funzione integrata può bastare senza passare a un'app a pagamento.",
        decisionTitle: "Verifica il valore di cronologia, dizionario e modelli",
        decisionText: "Dictivo aggiunge cronologia locale, dizionario, frammenti e scelta del modello all'inserimento quotidiano. Verifica se riducono correzioni e ripetizioni. Non è corretto descrivere tutta la dettatura Apple come elaborazione cloud.",
        testText: "Controlla nelle impostazioni Tastiera il luogo di elaborazione e se occorre Internet. Poi detta frasi con i tuoi nomi propri abituali nei due strumenti e confronta correzioni e recupero del testo dopo un inserimento non riuscito.",
        faqs: [["La dettatura macOS funziona sempre offline?", "Dipende da Mac, lingua e impostazioni. Segui le indicazioni Apple nelle impostazioni Tastiera per capire se il trattamento è locale o richiede Internet."], ["Perché pagare Dictivo se la dettatura macOS è gratuita?", "Se cronologia, dizionario, frammenti e scelta del modello aiutano nell'uso quotidiano. Verificalo durante la prova; mantenere la funzione integrata è ragionevole se basta."]],
      },
      "dragon-alternative": {
        fitTitle: "Dragon Professional per comandi e vocabolario già configurato",
        fitText: "Dragon Professional v16 unisce riconoscimento locale su Windows e comandi vocali. Se dipendi da vocabolario accumulato, macro o controllo del PC senza mani, una trascrizione alternativa non sostituisce automaticamente l'intero lavoro.",
        decisionTitle: "Separa inserimento di testo e controllo vocale del PC",
        decisionText: "Dictivo punta sulla dettatura con scorciatoia in email, documenti e note, senza addestrare prima un profilo vocale personale. Non sostituisce direttamente i comandi Dragon o le sue funzioni specialistiche. Confronta anche i sistemi attualmente supportati.",
        testText: "Elenca termini abituali, operazioni di correzione e comandi indispensabili, poi verificali singolarmente. Una trascrizione riuscita non dimostra che sia trasferibile un intero flusso di accessibilità.",
        faqs: [["Dragon Professional è solo cloud?", "No. L'edizione desktop Professional v16 qui confrontata elabora localmente; installazione e attivazione iniziali richiedono Internet. Distinguila dai prodotti cloud separati di Dragon."], ["Dictivo sostituisce il controllo senza mani di Dragon?", "Non è un sostituto equivalente. Dictivo si concentra sull'inserimento di testo con scorciatoia. Per controllare tutto il PC a voce o usare macro, verifica ogni funzione indispensabile."]],
      },
    },
  },
  nl: {
    fit: "Passende taken", decision: "Keuzecriteria", test: "Zelf uitproberen",
    modeFaq: ["Blijft audio ook met Dictivo Cloud Fast op het apparaat?", "Nee. Local herkent spraak op het apparaat nadat het model is geïnstalleerd. Cloud Fast uploadt de gekozen opname naar een server voor verwerking. Gebruik Local voor taken waarbij audio niet mag worden verstuurd."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "Wispr Flow voor mobiel dicteren en bewerken in de cloud",
        fitText: "Wissel je tussen computer en telefoon of gebruik je teamfuncties en tekstbewerking in de cloud, neem die mogelijkheden van Wispr Flow dan mee. Lokaal desktopdicteren vervangt niet vanzelf de hele mobiele en gezamenlijke werkwijze.",
        decisionTitle: "Dictivo Local wanneer audio uploaden geen optie is",
        decisionText: "Wispr Flows instellingen voor gegevens delen en cloudopslag maken de spraakherkenning niet offline. Dictivo Local is een kandidaat voor privéconcepten op de desktop. Vergelijk de verwerkingslocatie en terugkerende kosten apart.",
        testText: "Dicteer een niet-vertrouwelijk e-mailconcept en controleer leestekens, correcties en invoegen in de doelapp. Kies na installatie van het Dictivo-model Local; herhaal zonder verbinding om offline gebruik te controleren.",
        faqs: [["Kan Wispr Flow spraak offline herkennen?", "Volgens de pagina Data Controls vindt spraakherkenning in de cloud plaats. Opslag of delen voor modelverbetering uitschakelen verplaatst de herkenning niet naar het apparaat."], ["Vervangt Dictivo ook het mobiele gebruik van Wispr Flow?", "Hier vergelijken we Dictivo als desktopdicteertool. Is invoer op iPhone of Android onmisbaar, controleer dan Wispr Flows mobiele ondersteuning als aparte eis."]],
      },
      "superwhisper-alternative": {
        fitTitle: "Superwhisper voor aangepaste modi en modellen",
        fitText: "Superwhisper biedt lokale en cloudmodellen en modi om de uitvoer aan te passen. Heb je al instellingen opgebouwd voor e-mail of code, controleer dan wat je bij een overstap kunt behouden.",
        decisionTitle: "Beide kunnen lokaal werken: vergelijk bediening en kosten",
        decisionText: "Ook Superwhispers lokale modellen herkennen spraak op het apparaat. Kies Dictivo niet vanuit de aanname dat Superwhisper alle audio uploadt. Beoordeel of sneltoets, geschiedenis, woordenboek en fragmenten je dagelijkse taken dekken en welke licentie je nodig hebt.",
        testText: "Gebruik dezelfde computer, microfoon en tekst met lokale modellen. Noteer model, wachttijd tot bruikbare tekst en correcties. Verschillende modellen bewijzen geen algemeen nauwkeurigheidsverschil tussen de apps.",
        faqs: [["Kan Superwhisper audio op het apparaat houden?", "Ja, lokale modellen draaien op het apparaat. Gebruik je cloudmodellen of extra AI-verwerking, controleer dan apart de verwerkingslocatie en instellingen."], ["Wordt de herkenning nauwkeuriger als ik naar Dictivo overstap?", "Deze pagina toont zo'n verbetering niet aan. Model, taal, microfoon en spreekstijl beïnvloeden het resultaat. Probeer je gebruikelijke namen, termen en zinnen in beide apps."]],
      },
      "macwhisper-alternative": {
        fitTitle: "MacWhisper voor opnamen, ondertitels en export",
        fitText: "Transcribeer je bestaande interviews of colleges en heb je ondertitels of export nodig, bekijk dan MacWhispers functies daarvoor. MacWhisper biedt ook systeembreed dicteren en is dus niet uitsluitend een bestandstool.",
        decisionTitle: "Vergelijk de weg van je stem naar de actieve app",
        decisionText: "Dictivo richt zich op het actieve tekstveld, opnemen via een sneltoets en tekst terugplaatsen. MacWhisper ondersteunt ook dicteren, dus vergelijk de werkelijke bediening. Beide kunnen lokaal verwerken; privacy alleen beslist deze keuze niet.",
        testText: "Dicteer een kort concept in je gewone mailapp en controleer invoegen en correcties. Heb je batchverwerking of ondertitels nodig, test die taken dan afzonderlijk in MacWhisper. Een dicteerdemo beoordeelt geen bestandsfuncties.",
        faqs: [["Kan MacWhisper ook in apps dicteren?", "Ja, de productpagina beschrijft systeembreed dicteren. Vergelijk bestandstranscriptie en invoergemak in je doelapp afzonderlijk."], ["Vervangt Dictivo MacWhispers bestandsverwerking?", "Dictivo richt zich op dicteren via een sneltoets. Draait je werk vooral om batchtranscriptie, ondertitels of export, controleer dan de benodigde MacWhisper-functies."]],
      },
      "voiceink-alternative": {
        fitTitle: "Neem VoiceInk mee bij eenmalige aankoop en updates",
        fitText: "VoiceInk biedt lokaal Mac-dicteren, aankoopplannen per aantal apparaten en levenslange updates. Als lokale verwerking en prijs belangrijk zijn, is het een serieuze kandidaat.",
        decisionTitle: "Beoordeel Dictivo op installatie en dagelijks gebruik",
        decisionText: "Dictivo Local en VoiceInk hebben verschillende updatevoorwaarden. Vergelijk hetzelfde aantal apparaten en dezelfde gebruiksduur. Controleer daarna of hardwaregerichte modelkeuze, geschiedenis, woordenboek en Local/Cloud Fast bij je taken passen.",
        testText: "Probeer een niet-vertrouwelijk concept met bedrijfsnamen en veelgebruikte zinnen. Vergelijk van eerste installatie tot correcties na invoegen. Gebruik je VoiceInks tekstverbetering, controleer dan ook waar de tekst wordt verwerkt.",
        faqs: [["Betekent lokale VoiceInk-herkenning dat tekstverbetering ook lokaal is?", "Dat moet je apart controleren. Optionele cloudverbetering kan tekst naar een externe dienst sturen terwijl de spraakherkenning lokaal gebeurt."], ["Is Dictivo goedkoper dan VoiceInk?", "Niet altijd. VoiceInk biedt plannen per aantal apparaten en levenslange updates. Vergelijk de actuele tabel bij gelijke aantallen en valuta, inclusief Dictivos optionele updatekosten."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "Begin voor af en toe een korte zin bij macOS-dicteren",
        fitText: "Voor macOS-dicteren hoef je niets extra te kopen. Dicteer je af en toe een zoekopdracht of kort bericht en ben je tevreden met de uitkomst, dan kan de ingebouwde functie voldoende zijn.",
        decisionTitle: "Toets het nut van geschiedenis, woordenboek en modelkeuze",
        decisionText: "Dictivo voegt lokale geschiedenis, woordenboek, fragmenten en modelkeuze toe aan dagelijkse invoer. Controleer of die je correcties en herhalingen verminderen. Het is niet juist om alle Apple-dicteerfuncties als cloudverwerking te beschrijven.",
        testText: "Controleer in de toetsenbordinstellingen de verwerkingslocatie en of internet nodig is. Dicteer daarna in beide tools zinnen met je gebruikelijke eigennamen en vergelijk correcties en tekstherstel na mislukte invoer.",
        faqs: [["Werkt macOS-dicteren altijd offline?", "Dat hangt af van Mac, taal en instellingen. Volg Apples uitleg in de toetsenbordinstellingen om te zien of verwerking lokaal gebeurt of internet nodig is."], ["Waarom Dictivo kopen als macOS-dicteren gratis is?", "Wanneer geschiedenis, woordenboek, fragmenten en modelkeuze helpen bij dagelijkse invoer. Controleer dat tijdens de proefperiode; de ingebouwde functie houden is logisch als die voldoet."]],
      },
      "dragon-alternative": {
        fitTitle: "Dragon Professional voor spraakopdrachten en bestaand vocabulaire",
        fitText: "Dragon Professional v16 combineert lokale Windows-spraakherkenning met spraakopdrachten. Ben je afhankelijk van opgebouwd vocabulaire, macro's of handsfree pc-bediening, dan vervangt een andere transcriptie niet automatisch je hele werkwijze.",
        decisionTitle: "Scheid tekstinvoer van spraakbediening van de pc",
        decisionText: "Dictivo richt zich op sneltoetsdicteren in e-mails, documenten en notities, zonder vooraf een persoonlijk spraakprofiel te trainen. Het vervangt Dragon-opdrachten of specialistische functies niet direct. Vergelijk ook de momenteel ondersteunde besturingssystemen.",
        testText: "Maak een lijst van gebruikelijke termen, correctiestappen en onmisbare spraakopdrachten en toets ze een voor een. Een geslaagde transcriptie bewijst niet dat een hele toegankelijkheidswerkwijze kan worden overgezet.",
        faqs: [["Is Dragon Professional uitsluitend een cloudproduct?", "Nee. De hier vergeleken desktopeditie Professional v16 verwerkt lokaal; eerste installatie en activering vragen internet. Onderscheid die van aparte Dragon-cloudproducten."], ["Vervangt Dictivo Dragons handsfree bediening?", "Niet gelijkwaardig. Dictivo richt zich op tekstinvoer via een sneltoets. Voor volledige pc-spraakbesturing of eigen macro's moet je iedere onmisbare functie apart controleren."]],
      },
    },
  },
  pt: {
    fit: "Usos indicados", decision: "Critérios de escolha", test: "Teste com o seu trabalho",
    modeFaq: ["O áudio também fica no dispositivo com o Dictivo Cloud Fast?", "Não. O Local reconhece a fala no dispositivo após instalar o modelo. O Cloud Fast envia a gravação selecionada a um servidor para processamento. Use Local quando o áudio não puder ser enviado para fora."],
    pages: {
      "wispr-flow-alternative": {
        fitTitle: "Wispr Flow para digitação no celular e edição na nuvem",
        fitText: "Se você alterna entre computador e celular ou precisa de funções de equipe e edição de texto na nuvem, inclua essas capacidades do Wispr Flow na comparação. Ditado local no desktop não substitui automaticamente todo esse fluxo.",
        decisionTitle: "Dictivo Local quando não é possível enviar o áudio",
        decisionText: "Os ajustes de compartilhamento e armazenamento do Wispr Flow não tornam o reconhecimento offline. O Dictivo Local é uma opção para rascunhos privados no computador. Compare separadamente o local de processamento e os gastos recorrentes.",
        testText: "Dite um rascunho de e-mail não confidencial e confira pontuação, correções e inserção no aplicativo de destino. Após instalar o modelo Dictivo, escolha Local; para verificar o uso offline, repita sem conexão.",
        faqs: [["O Wispr Flow reconhece fala offline?", "A página Data Controls informa que o reconhecimento ocorre na nuvem. Desativar armazenamento ou compartilhamento para melhorar modelos não transfere o reconhecimento para o dispositivo."], ["O Dictivo também substitui o uso móvel do Wispr Flow?", "Aqui comparamos o Dictivo como ferramenta de ditado no desktop. Se digitar no iPhone ou Android for indispensável, confira separadamente o suporte móvel do Wispr Flow."]],
      },
      "superwhisper-alternative": {
        fitTitle: "Superwhisper para modos e modelos personalizados",
        fitText: "O Superwhisper oferece modelos locais e de nuvem, além de modos para adaptar o resultado. Se você já configurou fluxos para e-mails ou código, confira o que poderá manter ao trocar de aplicativo.",
        decisionTitle: "Os dois podem ser locais: compare operação e custo",
        decisionText: "Os modelos locais do Superwhisper também reconhecem a fala no dispositivo. Escolher o Dictivo não deve partir da suposição de que o Superwhisper sempre envia o áudio. Avalie se atalho, histórico, dicionário e trechos atendem ao seu dia a dia e qual licença precisa.",
        testText: "Use o mesmo computador, microfone e texto com modelos locais. Anote modelo, espera até o texto estar pronto e correções. Modelos diferentes não demonstram uma diferença geral de precisão entre os aplicativos.",
        faqs: [["O Superwhisper também pode manter o áudio no dispositivo?", "Sim, os modelos locais rodam no dispositivo. Com modelos de nuvem ou processamento adicional de IA, confira separadamente o local de processamento e os ajustes."], ["Mudar para o Dictivo melhora a precisão?", "Esta página não comprova essa melhoria. Modelo, idioma, microfone e maneira de falar afetam o resultado. Teste seus nomes, termos e frases habituais nos dois aplicativos."]],
      },
      "macwhisper-alternative": {
        fitTitle: "MacWhisper para arquivos gravados, legendas e exportações",
        fitText: "Se você transcreve entrevistas ou aulas já gravadas e precisa de legendas ou exportações, confira os recursos do MacWhisper. Ele também oferece ditado em todo o sistema; descrevê-lo como ferramenta apenas de arquivos seria incorreto.",
        decisionTitle: "Compare o caminho da voz até o aplicativo ativo",
        decisionText: "O Dictivo se concentra no campo ativo, na gravação com atalho e no retorno do texto. Como o MacWhisper também aceita ditado, compare o uso real. Os dois permitem processamento local; só a privacidade não decide essa escolha.",
        testText: "Dite um rascunho curto no seu aplicativo de e-mail e confira inserção e correções. Se precisar de lotes de arquivos ou legendas, teste essas tarefas separadamente no MacWhisper. Uma demonstração de ditado não avalia funções de arquivos.",
        faqs: [["O MacWhisper também permite ditar em aplicativos?", "Sim, a página do produto descreve ditado em todo o sistema. Compare separadamente a transcrição de arquivos e a facilidade de entrada no aplicativo de destino."], ["O Dictivo substitui o processamento de arquivos do MacWhisper?", "O Dictivo é focado em ditado com atalho. Se transcrição em lote, legendas ou exportações forem o principal, confira os recursos necessários do MacWhisper."]],
      },
      "voiceink-alternative": {
        fitTitle: "Considere o VoiceInk para compra única e atualizações",
        fitText: "O VoiceInk oferece ditado local no Mac, planos de compra por número de dispositivos e atualizações vitalícias. Se processamento local e preço forem importantes, ele merece uma comparação cuidadosa.",
        decisionTitle: "Avalie o Dictivo pela configuração e pelo uso diário",
        decisionText: "As condições de atualização do Dictivo Local e do VoiceInk são diferentes. Compare o mesmo número de dispositivos e anos de uso. Depois confira se sugestões de modelo conforme o hardware, histórico, dicionário e Local/Cloud Fast se ajustam às suas tarefas.",
        testText: "Teste um rascunho não confidencial com nomes de empresas e expressões frequentes. Compare da configuração inicial às correções após inserir. Ao ativar o aprimoramento de texto do VoiceInk, confira também onde o texto é processado.",
        faqs: [["O reconhecimento local do VoiceInk significa que o aprimoramento também é local?", "É preciso verificar separadamente. Um aprimoramento opcional na nuvem pode enviar texto a um serviço externo, mesmo com reconhecimento de voz local."], ["O Dictivo é mais barato que o VoiceInk?", "Nem sempre. O VoiceInk anuncia planos por número de dispositivos e atualizações vitalícias. Compare a tabela atual com os mesmos dispositivos e moeda, incluindo os custos opcionais de atualização do Dictivo."]],
      },
      "macos-dictation-alternative": {
        fitTitle: "Para poucas frases ocasionais, comece pelo ditado do macOS",
        fitText: "O ditado do macOS não exige compra adicional. Se você só dita buscas ou mensagens curtas de vez em quando e está satisfeito com o resultado, a função integrada pode bastar sem um aplicativo pago.",
        decisionTitle: "Confira o valor do histórico, dicionário e escolha de modelos",
        decisionText: "O Dictivo acrescenta histórico local, dicionário, trechos e escolha de modelo à entrada diária. Confira se esses recursos reduzem correções e repetições. Não é correto apresentar todo o ditado da Apple como processamento na nuvem.",
        testText: "Confira nos ajustes de Teclado o local de processamento e a necessidade de Internet. Depois dite frases com seus nomes próprios habituais nas duas ferramentas e compare correções e recuperação do texto após uma inserção que falhou.",
        faqs: [["O ditado do macOS sempre funciona offline?", "Depende do Mac, idioma e ajustes. Siga as instruções da Apple nos ajustes de Teclado para saber se o processamento é local ou precisa de Internet."], ["Por que pagar pelo Dictivo se o ditado do macOS é grátis?", "Se histórico, dicionário, trechos e escolha de modelo ajudarem na entrada diária. Confira durante o teste; continuar com a função integrada é razoável quando ela basta."]],
      },
      "dragon-alternative": {
        fitTitle: "Dragon Professional para comandos e vocabulário já configurado",
        fitText: "O Dragon Professional v16 combina reconhecimento local no Windows com comandos de voz. Se você depende de vocabulário acumulado, macros ou controle do PC sem as mãos, outra transcrição não substitui automaticamente todo o trabalho.",
        decisionTitle: "Separe entrada de texto de controle do PC por voz",
        decisionText: "O Dictivo se concentra em ditado com atalho em e-mails, documentos e notas, sem treinamento prévio de perfil de voz pessoal. Não substitui diretamente os comandos do Dragon ou funções especializadas. Compare também os sistemas atualmente compatíveis.",
        testText: "Liste termos habituais, ações de correção e comandos indispensáveis e verifique um por um. Uma transcrição bem-sucedida não comprova que todo um fluxo de acessibilidade pode ser transferido.",
        faqs: [["O Dragon Professional é exclusivamente de nuvem?", "Não. A edição desktop Professional v16 comparada aqui processa localmente; a instalação e ativação iniciais precisam de Internet. Diferencie-a dos produtos de nuvem separados da Dragon."], ["O Dictivo substitui o controle sem as mãos do Dragon?", "Não é uma substituição equivalente. O Dictivo se concentra em entrada de texto com atalho. Para controle de todo o PC por voz ou macros, confira cada função indispensável."]],
      },
    },
  },
};

export const COMPARISON_DECISION_LOCALES = Object.freeze(Object.keys(decisionCopy));

function getDecision(page, locale) {
  const copy = decisionCopy[locale];
  if (!copy) return null;
  const entry = copy.pages[page.slug];
  if (!entry) throw new Error(`Missing comparison decision: ${locale}/${page.slug}`);
  return { copy, entry };
}

/** null means use the existing English page; supported locales fail on missing pages. */
export function localizedComparisonSections(page, locale) {
  const value = getDecision(page, locale);
  if (!value) return null;
  const { copy, entry } = value;
  return [
    { kicker: copy.fit, title: entry.fitTitle, paragraphs: [entry.fitText] },
    { kicker: copy.decision, title: entry.decisionTitle, paragraphs: [entry.decisionText] },
    { kicker: copy.test, title: copy.test, paragraphs: [entry.testText] },
  ];
}

/** Use the same returned FAQ pairs for visible content and FAQPage structured data. */
export function localizedComparisonFaqs(page, locale) {
  const value = getDecision(page, locale);
  if (!value) return null;
  const { copy, entry } = value;
  return [...entry.faqs.map((pair) => [...pair]), [...copy.modeFaq]];
}
