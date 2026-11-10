import { OFFLINE_GUIDE_PRICES_CHECKED } from "./offline-dictation-guide.mjs";
import { JA_APPLE_DICTATION_HELP, JA_MAC_DICTATION_SHORTCUT_CHECKED } from "./ja-mac-dictation-shortcut-guide.mjs";

// Batch B3: the Japanese Mac speech-to-text guide, /ja/guides/best-speech-to-text-apps-for-mac/,
// paired by hreflang with the English guide. The generator builds the page, its sitemap entry, the
// hreflang on both twins, the Japanese footer and /ja/llms.txt lines only while
// JA_SPEECH_GUIDE_READY is true. Rendered by renderAnswerGuidePage() with code "ja"; the fact
// table is built from appRows, handPrices and rowChecked (speechToTextMacFactTable(copy, "ja")).
//
// Facts about other apps come only from the competitor facts file and the price spot-check of
// JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED (desktop repository, docs/research/2026-11-09-mac-seo-aeo/raw/),
// and, for Voice Type and Voibe, from the Japanese offline guide's own rows. Neither source covers
// other apps' Japanese support, so the page states it for Dictivo only (the app's language list at
// v0.3.57). Japanese UI labels are the app's own strings at v0.3.57. The copy is written in
// Japanese, not translated sentence by sentence from the English guide.
export const JA_SPEECH_GUIDE_READY = true;
export const JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD = "2026-11-10"; // placeholder; the release commit sets the merge day
export const JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED = "2026-11-10"; // the competitor facts file and price spot-check date

const checkedLabel = (iso) => `（${iso}確認）`;
const read = checkedLabel(JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED);

// Vendor pages carry the day a source read them: the facts file or spot-check (read), the site's
// 2026-09-29 offline-guide facts (Voice Type), or, for Apple's Japanese help page, the day the
// Japanese shortcut guide read it. Pages no source dates carry no date.
export const JA_SPEECH_TO_TEXT_MAC_GUIDE_REFERENCES = [
  ["Dictivo：Macでオフライン音声入力を始めるには", "https://dictivo.app/ja/guides/offline-dictation-on-mac/"],
  ["Dictivo：ローカル音声入力のMacモデルガイド", "https://dictivo.app/ja/mac-model-guide/"],
  ["Dictivo：音声入力データの行き先", "https://dictivo.app/ja/privacy/where-dictation-audio-goes/"],
  ["Dictivo：プライバシー証明", "https://dictivo.app/ja/privacy-proof/"],
  ["Dictivo の Homebrew tap（インストール・更新・削除）", "https://github.com/deepviewsdev/homebrew-tap"],
  ["Superwhisper：ローカルモデルとクラウドモデル", "https://superwhisper.com/models"],
  [`Superwhisper：プラン${read}`, "https://superwhisper.com/docs/billing/plans"],
  ["Wispr Flow：データの管理", "https://wisprflow.ai/data-controls"],
  [`Wispr Flow：料金${read}`, "https://wisprflow.ai/pricing"],
  [`Wispr Flow：What is Flow${read}`, "https://docs.wisprflow.ai/articles/2772472373-what-is-flow"],
  [`MacWhisper：音声入力、ファイルの文字起こし、料金${read}`, "https://www.macwhisper.com/"],
  ["MacWhisper：文字起こしを非公開に保つ方法と任意のクラウド機能", "https://docs.macwhisper.com/article/52-keeping-transcriptions-private"],
  ["VoiceInk：プライバシーと任意のクラウド機能", "https://tryvoiceink.com/privacy"],
  [`VoiceInk：料金${read}`, "https://tryvoiceink.com/pricing"],
  [`Voice Type：App Storeの掲載情報と価格${checkedLabel(OFFLINE_GUIDE_PRICES_CHECKED)}`, "https://apps.apple.com/us/app/voice-type-offline-dictation/id6736525125?mt=12"],
  ["Voibe：端末上のモードとクラウドのモード", "https://www.getvoibe.com/security/"],
  [`Voibe：料金${read}`, "https://www.getvoibe.com/pricing/"],
  [`Aiko：米国App Storeの掲載情報と価格${read}`, "https://apps.apple.com/us/app/aiko/id1672085276?platform=mac"],
  [`Handy：GitHubのREADMEとライセンス${read}`, "https://github.com/cjpais/Handy"],
  [`Handy：ダウンロード${read}`, "https://handy.computer/download"],
  [`Spokenly：料金${read}`, "https://spokenly.app/pricing"],
  [`Spokenly：対応環境とアカウント${read}`, "https://spokenly.app/"],
  ["Apple サポート：Use Dictation on Mac（英語）", "https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac"],
  [`Apple サポート：Use Dictation on Mac、macOS 14のガイド（英語）${read}`, "https://support.apple.com/en-us/guide/mac-help/mh40584/14.0/mac/14.0"],
  [`Apple サポート：Macでメッセージや書類を音声入力する${checkedLabel(JA_MAC_DICTATION_SHORTCUT_CHECKED)}`, JA_APPLE_DICTATION_HELP.dictate],
];

const formatDate = (iso) => new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

// [アプリ, 向いている用途, プライバシー・対応環境の注意点, 選ぶ場面]. The generator adds the price and
// 確認日 cells. The ItemList description is the 選ぶ場面 cell. Row keys are GUIDE_PRICE_SOURCES keys.
const APP_ROWS = [
  [
    "Dictivo Local",
    "ショートカットで始めて、使用中のアプリに貼り付けるその場の音声入力。",
    "Localはモデルのダウンロード後、Mac上で文字起こしします。任意の有料アドオンのCloud Fastは、選んだ録音をアップロードします。Apple SiliconとIntelのMacに対応。",
    "メール、メモ、ブラウザ、AIへの指示を毎日声で書き、音声をMacの外に出したくないとき。",
  ],
  [
    "Apple Dictation",
    "macOS標準の音声入力。文字を入力できる場所ならどこでも使えます。",
    "Appleのガイド（macOS 14）では、Apple Silicon搭載のMacで対応言語なら端末上で処理されます。IntelのMacや対応外の言語では、音声がAppleに送られます。",
    "たまに音声入力する程度で、アプリを追加したくないとき。最初に試す候補。",
  ],
  [
    "Handy",
    "Mac、Windows、Linuxで使える無料のオープンソース音声入力アプリ。",
    "ローカルモデルでコンピュータ上で文字起こしします。クラウドでの文字起こしの説明はありません。MacはApple Silicon版とIntel版があります。",
    "無料で、ソースコードを読めるローカルのアプリがほしいとき。",
  ],
  [
    "MacWhisper",
    "音声・動画ファイルの文字起こしと、システム全体の音声入力。",
    "ローカルモデルで文字起こしします。任意でリモートモデルに切り替えると、選んだプロバイダーで処理されます。",
    "インタビューや会議の録音を文字起こしし、その場の音声入力も使いたいとき。",
  ],
  [
    "Spokenly",
    "macOS、Windows、Linux、iPhoneで使える音声入力。",
    "無料プランは端末上のモデルで動き、通信なしで使えます。自分のAPIキーやProプランでは、音声がクラウドのプロバイダーに送られます。Local+を複数の端末で使うにはSpokenlyアカウントでサインインします。",
    "複数のOSで同じ音声入力アプリを使い、無料のローカルプランから始めたいとき。",
  ],
  [
    "Superwhisper",
    "モードを切り替えて使う音声入力。ローカルモデルとクラウドモデルを選べます。",
    "無料プランはローカルモデルを使います。ProはクラウドのボイスモデルとAIモードを追加するため、モードごとに使うモデルを確認してください。",
    "モードやモデルを自分で選び、同じライセンスをWindowsやスマートフォンでも使いたいとき。",
  ],
  [
    "VoiceInk",
    "Mac用のローカル音声入力アプリ。GPL-3.0のオープンソース。",
    "文字起こしは端末上で行います。任意のCloud Enhancementが送るのはテキストで、音声は送りません。Apple Silicon搭載のMac専用です。",
    "Apple Silicon搭載のMacで、ライセンスを一度買って使うローカル音声入力がほしいとき。",
  ],
  [
    "Voice Type",
    "入力欄で、キーを押している間だけ話すシンプルな音声入力。",
    "App Storeの説明では、インターネット不要で、音声は端末上に残ります。Appleのレシート検証のために通信する場合があります。",
    "Mac App Storeから入れられる小さな音声入力アプリがほしいとき。",
  ],
  [
    "Voibe",
    "端末上のモードとクラウドのモードを持つシンプルな音声入力。",
    "音声がMacに残るのはOn-Device Modeのときだけです。IntelのMacではクラウドで文字起こしします。",
    "シンプルな使い方を求め、On-Device Modeで使えるとき。",
  ],
  [
    "Wispr Flow",
    "Mac、Windows、iOS、Androidで使えるクラウド型の音声入力。",
    "文字起こしにはインターネット接続が必要で、音声はMacの外で処理されます。セットアップにはアカウントの作成かサインインが含まれます。",
    "クラウドでの処理を受け入れられ、スマートフォンでも同じツールを使いたいとき。",
  ],
];

// Rows that keep the site's 2026-09-29 facts (the Japanese offline guide's row) instead of a re-read.
const SITE_CHECKED_ROWS = ["Voice Type"];

// Price cells for apps without an entry in the generator's GUIDE_PRICE_SOURCES, as the vendor shows
// them on JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED (Spokenly Pro from the spot-check). The Spokenly cell
// starts with the vendor name, so the name sits right before its $29.
const HAND_PRICES = {
  Handy: "無料・オープンソース（MITライセンス）",
  Spokenly: "Spokenly：無料プランあり。Local+は$29の買い切り。Proは月額$15、または年額$144（年払いで月額換算$12）。",
};

export function jaSpeechToTextMacGuideCopy({ windows, checked = JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED, lastmod = JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD } = {}) {
  const year = checked.slice(0, 4);
  const checkedOn = formatDate(checked);
  const appRows = APP_ROWS;
  const rowCount = appRows.length;
  const platforms = windows
    ? "1つのDictivo Localライセンスで、macOSとWindows x64の両方に使えます。"
    : "macOS 版は利用できます。Windows x64 のダウンロードは一時的に利用できません。";
  return {
    navLabel: "Mac音声入力アプリ比較",
    metaTitle: `Mac音声入力アプリ比較（${year}）：用途別おすすめ${rowCount}本`,
    metaDescription:
      "Macで使える音声入力・文字起こしアプリ10本を用途別に比較。標準の音声入力、オフラインで使えるローカルアプリ、ファイルの文字起こし、クラウド型を、価格と確認日つきで整理しました。",
    title: `Macの音声入力アプリおすすめ比較（${year}年）：用途別に選ぶ`,
    about: ["Mac 音声入力 アプリ", "Mac 音声入力 おすすめ", "Mac 文字起こし アプリ", "音声入力 アプリ 比較"],
    lede: "Dictivoは当サイトの製品です。このページでは、Macで使える音声入力・文字起こしアプリを、その場の音声入力、録音ファイルの文字起こし、クラウド型といった用途ごとに並べ、音声の処理場所、価格、確認日とあわせて比べます。",
    lastUpdated: lastmod,
    answerTitle: "短い答え",
    answer: `Macの音声入力・文字起こしアプリ${rowCount}本を比べ、各行に確認日を付けました（大半は${checkedOn}確認）。まずはMac標準の音声入力を試してください。その場の音声入力で音声をMacに残したいなら、当サイトの製品のDictivo Local。音声入力と録音ファイルの文字起こしの両方ならMacWhisper。Wispr Flowなどのクラウド型は、音声を外部に送ってもよい場合に選びます。`,
    intentTitle: "どの質問に答えるページか",
    intentCaption: "Macの音声入力アプリを探すときのよくある検索と、それぞれで確認すること",
    intentHeaders: ["よくある検索", "合う使い方", "確認すること"],
    intentRows: [
      [
        "mac 音声入力 アプリ",
        "キー操作で始めて、使用中のアプリに話した文字を入れるアプリ。",
        "始め方のキー、権限の設定、カーソルの位置に文字が入るか。",
      ],
      [
        "mac 音声入力 おすすめ",
        "まずMac標準の音声入力。足りなければ専用アプリ。",
        "その場の音声入力か、録音の文字起こしか、その両方か。",
      ],
      [
        "mac 音声入力 ソフト",
        "メール、メモ、ブラウザ、コードエディタへの日常的な音声入力。",
        "音声がどこで処理されるか。話した後に直す手間がどれくらいか。",
      ],
      [
        "mac 文字起こし アプリ 無料",
        "MacWhisperの無料版など、録音ファイルを読み込めるアプリ。",
        "読み込める形式と書き出せる形式。無料版で使えるモデル。",
      ],
      [
        "mac 音声入力 無料 アプリ",
        "Mac標準の音声入力。次にHandyなどの無料アプリや、各アプリの無料プラン。",
        "無料プランの制限。音声がMacの外に出るかどうか。",
      ],
      [
        "mac 音声入力 日本語",
        "日本語で話して、日本語の文章として使いたい場合。",
        "Dictivoは日本語を含む11の文字起こし言語と「言語を自動検出」に対応しています（アプリの言語一覧）。ほかのアプリは、各ベンダーの対応言語の一覧で確認してください。",
      ],
    ],
    appTitle: "Mac音声入力アプリの比較",
    appCaption: "Macの音声入力・文字起こしアプリを用途別に比較。価格と確認日つき",
    appHeaders: ["アプリ", "向いている用途", "プライバシー・対応環境の注意点", "選ぶ場面", "価格（買い切り／サブスク）", "確認日"],
    appRows,
    handPrices: HAND_PRICES,
    rowChecked: Object.fromEntries(appRows.map(([name]) => [name, SITE_CHECKED_ROWS.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : checked])),
    itemListName: "用途別のMac音声入力アプリ",
    methodTitle: "このページの確認方法",
    method: [
      "各ベンダーの公式ページを、表の「確認日」の日付に読みました。読んだのは英語のページで、日本語版のページは別に確認していません。読んだページは「参考資料」に載せています。価格は各ベンダーの表示どおり、その通貨のまま載せています。",
      "Dictivoについての記載は、Dictivoのドキュメントとアプリのソースコードに基づきます。",
      "各アプリはインストールしておらず、速度や認識精度は測定していません。点数や順位も付けていません。",
      "日本語への対応を確認したのはDictivoだけです。ほかのアプリの対応言語は、各ベンダーの案内で確認してください。",
    ],
    methodSignature: `Dictivo チーム、${checkedOn}。`,
    sections: [
      {
        title: "この比較で分かること・分からないこと",
        paragraphs: [
          "このガイドはDictivoが書いており、Dictivoは当サイトの製品です。アプリを用途、音声の処理場所、対応環境、買い方で分けて並べました。点数を付けた順位表ではなく、候補を絞るための一覧です。",
          "試すときは、同じ日本語の文章を各アプリで話してください。短いメールと、仕事でよく書く一段落が向いています。直す量、話し終えてから使える文章になるまでの時間、普段のアプリに文字が入るかを比べます。ローカルとクラウドの設定は、実際に使う方で試してください。",
        ],
      },
      {
        title: "無料で試せる選択肢",
        paragraphs: [
          "まずはMac標準の音声入力です。追加のアプリは要りません。Handyは無料のオープンソースです。SpokenlyとSuperwhisperにはローカルモデルを使う無料プランがあり、MacWhisperの無料版はローカルモデルでファイルを文字起こしできます。無料で使える範囲は、インストールした版で確認してください。",
          "DictivoはTinyモデルが無料で、すべてのローカルモデルを14日間試せます。カード登録もDictivoアカウントも要りません。体験期間中に、自分のMacで直す手間がどれくらい減るかを確かめてください。",
        ],
        link: { label: "日本語の例文と練習欄で、最初の一文を試す", href: "/ja/guides/first-local-dictation/" },
      },
      {
        title: "用途から選ぶ：その場の入力、録音の文字起こし、クラウド",
        paragraphs: [
          "音声入力と文字起こしは似ていますが、使い方が違います。話しながら使用中のアプリに文字を入れるのか、すでにある録音を文字にするのかを先に決めると、候補がすぐ絞れます。",
        ],
        bullets: [
          "その場の音声入力：始め方のキー、文字が入る場所、履歴、よく使う単語を登録できるかを確認します。",
          "録音ファイルの文字起こし：読み込める形式、書き出せる形式、話者の区別、字幕、まとめて処理できるかを確認します。",
          "クラウド型の音声入力：処理の速さ、文章の整え方、スマートフォン対応、データの保存方針を確認します。",
          "オフラインで使う場合：モデルのサイズと、初期設定で何かをアップロードしないかを確認します。",
        ],
      },
      {
        title: "日本語で使うときの確認点",
        paragraphs: [
          "Dictivoは、日本語を含む11の言語で文字起こしできます。話す言語を固定するほか、「言語を自動検出」も選べます。アプリの表示言語も日本語に切り替えられます。",
          "言語を固定すると、「辞書」に登録した単語もローカル音声モデルにヒントとして渡されます。人名や社内の用語が多い場合は、言語を固定して試してください。",
          "ほかのアプリの日本語対応は、このページでは確認していません。各ベンダーの対応言語の一覧を見てから試してください。",
        ],
        bullets: [
          "「明日の打ち合わせは午後3時です。資料を営業部に送ってください。」のような短い文章で、数字と句読点がどう出るかを確認します。",
          "普段書く人名や製品名を入れた文章も試します。",
          "この例文は練習用で、測定した結果ではありません。",
        ],
      },
      {
        title: "Dictivoの位置づけ",
        paragraphs: [
          `Dictivoは、ローカル処理を基本にしたMac向けの音声入力アプリです。Apple SiliconとIntelのMacに対応しています。ショートカットを押して話すと、文字起こしをクリップボード経由で使用中のアプリに貼り付けます。${platforms}`,
          "会議の録音アプリでも、クラウドの文章作成ツールでもありません。録音ファイルの読み込みには対応しておらず、スマートフォン版もありません。",
          "Dictivo Localは買い切りで、12か月のアップデートが含まれます。その後の更新は任意で、買った版はそのまま使えます。Cloud Fastは任意の月額アドオンです。",
        ],
        bullets: [
          "Localは、モデルのダウンロード後にMac上で文字起こしします。Localの音声は文字起こしサーバーへ送られません。",
          "Cloud Fastは、速さを優先したい、機密性の低い録音だけに使います。",
          "ローカルモデルは7種類あり、Tinyは無料です。ほかのモデルは体験期間中かライセンスで使えます。",
        ],
        link: { label: "Dictivoの料金を見る", href: "/ja/#pricing" },
      },
      {
        title: "自分のMacで試す手順",
        paragraphs: [
          "普段使うアプリで、短い下書きを1つ声で書いてみてください。Cmd+Shift+SpaceはDictivoの初期設定で、Mac標準の音声入力のキーとは別です。",
        ],
        steps: [
          { html: "このページのダウンロードボタンからMac版をインストールします。Homebrewで入れる場合：<code>brew install --cask deepviewsdev/tap/dictivo</code>。ダウンロードボタンと同じ署名・公証済みのユニバーサル版が入ります。" },
          "Dictivoを開き、「Set up Local」からモデルを取得します。初回のダウンロードにはインターネット接続が必要です。",
          "「マイク」（必須）と「アクセシビリティ」（推奨）を許可します。",
          "文字を入れたい入力欄をクリックし、Cmd+Shift+Spaceを押します。",
          "話し終えたら、もう一度Cmd+Shift+Spaceを押します。文字起こしが入力欄に貼り付けられます。",
          "モデルの取得後にWi‑Fiを切り、同じ手順をもう一度試します。",
        ],
        link: { label: "通信を切って試す手順を詳しく見る", href: "/ja/guides/offline-dictation-on-mac/" },
      },
    ],
    faqTitle: "Macの音声入力アプリについての質問",
    faqs: [
      [
        "Macで使える音声入力アプリのおすすめは？",
        "用途によって変わります。その場の音声入力で音声をMacに残したいなら、Dictivo Local、Handy、VoiceInk、Voice Type、Spokenlyの無料プラン、ローカルモデルを使うSuperwhisper、On-Device ModeのVoibeを比べます。MacWhisperは音声入力と音声・動画ファイルの両方に使えます。複数の端末でクラウド型を使うならWispr Flowです。",
      ],
      [
        "Macで無料で使える音声入力アプリは？",
        "Mac標準の音声入力はmacOSに含まれています。Handyは無料のオープンソースです。SpokenlyとSuperwhisperにはローカルモデルを使う無料プランがあり、MacWhisperにも無料版があります。DictivoはTinyモデルが無料で、すべてのローカルモデルを14日間試せます。",
      ],
      [
        "Mac標準の音声入力と専用アプリの違いは？",
        "標準の音声入力は追加のアプリなしで、文字を入力できる場所ならどこでも使えます。Appleのガイド（macOS 14）では、Apple Silicon搭載のMacで対応言語なら端末上で処理され、IntelのMacや対応外の言語では音声がAppleに送られます。専用アプリは、始め方のキー、モデル、履歴、単語の登録、音声の処理場所を自分で決めたいときに向いています。",
      ],
      [
        "Macの音声入力はオフラインで使えますか？",
        "使えます。インストール後にローカルの音声モデルを使うアプリなら、通信なしで文字起こしできます。ただし、オフラインで動くことと、クラウドで処理した後にデータを残さないことは別の話です。DictivoのLocalは、モデルのダウンロード後にMac上で文字起こしします。",
      ],
      [
        "音声入力と文字起こしの違いは？",
        "音声入力は、話した言葉をその場で、入力中の場所に文字として入れることです。文字起こしは、すでにある録音を文字にすることを指す場合が多いです。Dictivoは音声入力のアプリで、録音ファイルは読み込めません。",
      ],
      [
        "DictivoとMacWhisperはどちらを選ぶべき？",
        "どちらもその場の音声入力に使えます。設定の手間、直す量、普段のアプリに文字が入るかを、自分のMacで比べてください。録音ファイルも文字起こししたいならMacWhisperです。Dictivoはショートカットで始める音声入力に絞ったアプリで、文字起こしを使用中のアプリに貼り付けます。",
      ],
      [
        "Dictivoは日本語に対応していますか？",
        "対応しています。日本語を含む11の言語で文字起こしでき、「言語を自動検出」も選べます。アプリの表示言語も日本語にできます。言語を固定すると、「辞書」の単語もローカル音声モデルにヒントとして渡されます。",
      ],
      [
        "録音ファイルを無料で文字起こしできるMacアプリは？",
        "MacWhisperです。無料版は音声・動画ファイルをMac上のローカルモデルで文字起こしでき、Proは買い切りです。Dictivoはその場の音声入力用で、録音ファイルは読み込めません。",
      ],
    ],
    relatedTitle: "関連する Dictivo のページ",
    relatedHeaders: ["ページ", "用途", "URL"],
    relatedRows: [
      [
        "買い切りのMac音声入力アプリ",
        "一度の購入で使えるMacの音声入力アプリを比べる。",
        "https://dictivo.app/ja/guides/mac-dictation-app-no-subscription/",
      ],
      [
        "Mac オフライン音声入力",
        "音声をMacに残せる音声入力アプリを比べる。",
        "https://dictivo.app/ja/guides/offline-dictation-on-mac/",
      ],
      [
        "最初の一文を試す",
        "モデルを入れ、日本語の例文で練習し、よくある設定の問題を直す。",
        "https://dictivo.app/ja/guides/first-local-dictation/",
      ],
      [
        "Macで音声入力できないとき",
        "Mac標準の音声入力の設定を、症状ごとに確認する。",
        "https://dictivo.app/ja/guides/mac-dictation-not-working/",
      ],
      [
        "Macの音声入力ショートカット",
        "Mac標準の音声入力のキーを確認・変更する。",
        "https://dictivo.app/ja/guides/mac-dictation-shortcut/",
      ],
      [
        "Superwhisperの代替",
        "Dictivoと、目的と料金で比べる。",
        "https://dictivo.app/ja/compare/superwhisper-alternative/",
      ],
      [
        "MacWhisperの代替",
        "音声入力の使い方と、録音ファイルへの対応で比べる。",
        "https://dictivo.app/ja/compare/macwhisper-alternative/",
      ],
      [
        "VoiceInkの代替",
        "Dictivoと、料金と対応OSで比べる。",
        "https://dictivo.app/ja/compare/voiceink-alternative/",
      ],
      [
        "Mac 機種ガイド",
        "自分のMacで快適に動くローカルモデルを確認する。",
        "https://dictivo.app/ja/mac-model-guide/",
      ],
      [
        "英語版",
        "このページの英語版（Best speech-to-text and dictation apps for Mac）。",
        "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
      ],
    ],
    referencesTitle: "参考資料",
  };
}
