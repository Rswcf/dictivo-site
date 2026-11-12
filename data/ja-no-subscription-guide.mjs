import { guideLocalPrice } from "./local-offer-copy.mjs";
import { OFFLINE_GUIDE_PRICES_CHECKED } from "./offline-dictation-guide.mjs";

// Batch B3: the Japanese 買い切り Mac dictation guide, /ja/guides/mac-dictation-app-no-subscription/,
// paired by hreflang with the English no-subscription guide. The generator builds the page, its
// sitemap entry, the hreflang on both twins, the Japanese footer and /ja/llms.txt lines only while
// JA_NO_SUBSCRIPTION_GUIDE_READY is true. Rendered by renderAnswerGuidePage() with code "ja"; the
// fact table is factRows plus a check-date cell per row from rowChecked.
//
// Facts about other apps come only from the competitor facts file and the price spot-check of
// JA_NO_SUBSCRIPTION_GUIDE_CHECKED (desktop repository, docs/research/2026-11-09-mac-seo-aeo/raw/).
// Voice Type is not in that file: its row keeps the Japanese offline guide's facts and
// OFFLINE_GUIDE_PRICES_CHECKED. Voibe's processing cell comes from the same Japanese offline guide
// row; its price, update terms and platforms from the spot-check. No source covers other apps'
// Japanese support, so the page states none. A gap in the sources reads 記載なし. Written in
// Japanese for this page, not translated sentence by sentence from the English twin. The title, H1
// and intent rows target 買い切り; オフライン appears once in the intent column as a qualifier.
export const JA_NO_SUBSCRIPTION_GUIDE_READY = true;
export const JA_NO_SUBSCRIPTION_GUIDE_LASTMOD = "2026-11-12"; // Local needs macOS 13.3 from 0.3.58
export const JA_NO_SUBSCRIPTION_GUIDE_CHECKED = "2026-11-10"; // the competitor facts file and price spot-check date

const checkedLabel = (iso) => `（${iso}確認）`;
const read = checkedLabel(JA_NO_SUBSCRIPTION_GUIDE_CHECKED);

export const JA_NO_SUBSCRIPTION_GUIDE_REFERENCES = [
  ["Dictivo の料金とライセンス条件", "https://dictivo.app/ja/#pricing"],
  ["Dictivo の音声の流れ", "https://dictivo.app/ja/privacy/where-dictation-audio-goes/"],
  [`Apple サポート：Macで音声入力を使う（macOS 14 版、英語）${read}`, "https://support.apple.com/en-us/guide/mac-help/mh40584/14.0/mac/14.0"],
  [`Handy（GitHub）：README とライセンス${read}`, "https://github.com/cjpais/Handy"],
  [`Handy のダウンロード${read}`, "https://handy.computer/download"],
  [`JesType：対応環境、価格、ライセンス${read}`, "https://jestype.com/"],
  [`JesType ドキュメント：アップデートとライセンス確認${read}`, "https://jestype.com/docs/"],
  [`MacWhisper：機能と価格${read}`, "https://macwhisper.com/"],
  [`MacWhisper：ライセンスと台数${read}`, "https://docs.macwhisper.com/article/39-licensing"],
  [`Spokenly の料金${read}`, "https://spokenly.app/pricing"],
  [`Spokenly：プランと月額料金${read}`, "https://spokenly.app/"],
  [`Superwhisper のプラン${read}`, "https://superwhisper.com/docs/billing/plans"],
  [`Superwhisper：対応環境とローカルモデル${read}`, "https://superwhisper.com/"],
  [`VoiceInk：料金と動作環境${read}`, "https://tryvoiceink.com/pricing"],
  [`Voicetypr：支払い${read}`, "https://voicetypr.com/help/billing"],
  [`Voicetypr：対応環境とローカル処理${read}`, "https://voicetypr.com/"],
  [`Wispr Flow の料金${read}`, "https://wisprflow.ai/pricing"],
  [`Wispr Flow：What is Flow${read}`, "https://docs.wisprflow.ai/articles/2772472373-what-is-flow"],
  [`Voibe：料金と対応環境${read}`, "https://www.getvoibe.com/pricing/"],
  ["Voibe：セキュリティ", "https://www.getvoibe.com/security/"],
  [`Voice Type：App Store のページと価格${checkedLabel(OFFLINE_GUIDE_PRICES_CHECKED)}`, "https://apps.apple.com/us/app/voice-type-offline-dictation/id6736525125?mt=12"],
  ["Dictivo の Homebrew tap", "https://github.com/deepviewsdev/homebrew-tap"],
];

const formatDate = (iso) =>
  new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

const DICTIVO = "Dictivo（当サイトの製品）";
const NOT_STATED = "記載なし";
const ALL_UPDATES = "すべてのアップデート込み（ベンダー表記は「lifetime」）";

// Rows that keep the site's own facts (the Japanese offline guide) instead of the 2026-11-10 read.
const SITE_CHECKED_ROWS = ["Voice Type"];

// [アプリ, 対応するMac, 支払い方法, 買い切り価格, 含まれるアップデート, Mac内で処理（オフライン可）？].
// The generator adds the 確認日 cell. The ItemList description is 支払い方法 (index 2). The Spokenly
// and VoiceInk price cells start with the vendor name: their $29 and $49 equal Dictivo figures, and
// the price-output test looks for the vendor name before them.
function factRows(windows) {
  return [
    [
      "Apple Dictation",
      "macOSに付属。端末上での処理はApple Siliconと対応言語のみ。",
      "macOSに付属",
      "なし（macOSに付属）",
      "該当なし（macOSの一部）",
      "Apple Siliconでは、対応言語なら端末上で処理。Intel Macでは音声がAppleに送られます。",
    ],
    [
      "Handy",
      "Apple Silicon版とIntel版あり。対応するmacOSのバージョンは記載なし。",
      "無料（オープンソース）",
      "なし（無料、MITライセンス）",
      "該当なし（無料）",
      "はい。クラウドでの文字起こしは説明されていません。",
    ],
    [
      "JesType",
      "Apple Siliconのみ、macOS 13.4以降",
      "買い切り",
      "Personal €14.95（1台）、Pro €34.95（3台）、Team €49.95（6台）",
      ALL_UPDATES,
      "はい（モデルのダウンロード後）。ライセンスはオンラインで確認され、有料ライセンスは接続なしで最大30日使えます。",
    ],
    [
      "MacWhisper",
      NOT_STATED,
      "無料プラン＋買い切りのPro",
      "Pro €64（買い切り）",
      ALL_UPDATES,
      "はい（ローカルモデル）。リモートのモデルは任意です。",
    ],
    [
      "Spokenly",
      NOT_STATED,
      "無料プラン＋買い切りのLocal+（Proはサブスク）",
      "Spokenly：Local+は$29の買い切り。Proは月額$15、または年額$144（年払いで月額換算$12）。",
      NOT_STATED,
      "無料プランでは、はい（端末上のモデルを使用）。自分のAPIキーやProでは、音声がクラウドのプロバイダーに送られます。",
    ],
    [
      "Superwhisper",
      "記載なし。ローカルモデルが快適に動くのはApple Siliconだけ、とベンダーは説明しています。",
      "サブスクまたは買い切りのLifetime",
      "Lifetime $249.99（買い切り）。Proは月額$8.49、または年額$84.99。",
      "記載なし。Lifetimeのキーは失効しない、とベンダーは説明しています。",
      "無料プランはローカルモデルを使用。Proではクラウドのモデルが加わり、どちらが初期設定かは記載なし。",
    ],
    [
      "Voibe",
      NOT_STATED,
      "サブスクまたは買い切り（ライフタイム）",
      "1席あたり$199の買い切りでライフタイム利用。ほかに月額$9.90、年額$99。",
      "ライフタイムプランは、そのプランの今後のアップデートをすべて含む（ベンダー表記）",
      "ローカルモードのときのみ。Intel Macではクラウドで文字起こしします。",
    ],
    [
      "Voice Type",
      NOT_STATED,
      "買い切り（App Storeのアプリ内課金）",
      "7日間無料のあと、$19.99の買い切り",
      NOT_STATED,
      "はい。App Storeの説明では、音声は端末上で処理されます。",
    ],
    [
      "VoiceInk",
      "Apple Silicon、macOS 14.4以降（料金ページ）",
      "買い切り",
      "VoiceInk：Solo $25（Mac 1台）、Personal $39（2台）、Extended $49（3台）",
      ALL_UPDATES,
      "はい。任意のCloud Enhancementは、音声ではなくテキストを送ります。",
    ],
    [
      "Voicetypr",
      "macOS 14以降。Apple Silicon推奨で、Intelへの対応は限定的。",
      "買い切り",
      "$39（1台）、$69（2台）、$99（4台）、$199（10台）",
      ALL_UPDATES,
      "はい。クラウドでの文字起こしは任意です。",
    ],
    [
      "Wispr Flow",
      NOT_STATED,
      "サブスクのみ",
      "なし。Proは月額$15、年払いなら月額$12。",
      "該当なし（サブスク）",
      "いいえ。文字起こしにはインターネット接続が必要です。",
    ],
    [
      DICTIVO,
      windows
        ? "Apple SiliconとIntel。ローカル音声入力は macOS 13.3 以降（Dictivo 0.3.58 から）。同じライセンスでWindows x64も使えます。"
        : "Apple SiliconとIntel。ローカル音声入力は macOS 13.3 以降（Dictivo 0.3.58 から）。Windows x64 のダウンロードは一時的に利用できません。",
      "買い切り（Dictivo Local）",
      guideLocalPrice("ja"),
      "12か月分を含み、その後の更新は任意。買った版はそのまま使えます。",
      "Localモードでは端末上で処理。任意の月額アドオン Cloud Fast は、送った録音だけをアップロードします。",
    ],
  ];
}

export function jaNoSubscriptionGuideCopy({ windows, checked = JA_NO_SUBSCRIPTION_GUIDE_CHECKED, lastmod = JA_NO_SUBSCRIPTION_GUIDE_LASTMOD } = {}) {
  const checkedOn = formatDate(checked);
  const siteCheckedOn = formatDate(OFFLINE_GUIDE_PRICES_CHECKED);
  const rows = factRows(windows);
  const free = rows.filter(([, , pay]) => pay !== "サブスクのみ").length;
  const dictivoPlatforms = windows
    ? "Dictivo は Mac と Windows x64 で使えます。"
    : "Dictivo は Mac で使えます。Windows x64 のダウンロードは一時的に利用できません。";
  const devices = windows
    ? "はい。Dictivo Local の1つのライセンスで、個人用のデバイスを3台まで使えます。Mac でも Windows x64 のPCでもよく、価格は同じです。"
    : "はい。Dictivo Local の1つのライセンスで、個人用のMacを3台まで使えます。Windows x64 のダウンロードは一時的に利用できません。";
  return {
    navLabel: "買い切りのMac音声入力",
    metaTitle: "Mac音声入力アプリの買い切り版：サブスクなしで選ぶ",
    metaDescription:
      "買い切りで使えるMacの音声入力アプリを比較。価格、含まれるアップデート、Mac内で処理できるか（オフライン）を確認日つきで整理しました。Dictivo Localは買い切りで、12か月のアップデート込みです。",
    title: "買い切りで使えるMacの音声入力アプリは？",
    about: ["Mac 音声入力 買い切り", "Mac 音声入力 サブスクなし", "買い切り 音声入力 アプリ", "Mac 音声入力 オフライン 買い切り"],
    lede: `このページはDictivoが書いています。Dictivoは当サイトの製品です。表では、Macで使える音声入力の選択肢${rows.length}本について、支払い方法、買い切り価格、含まれるアップデート、音声をMac内で処理できるかを並べています。`,
    lastUpdated: lastmod,
    answerTitle: "短い答え",
    answer: `表の${rows.length}本のうち${free}本はサブスクなしで使えます。サブスク専用はWispr Flowだけです。買い切りの最安はJesType Personalの€14.95と、App StoreのVoice Typeの$19.99です。当サイトの製品Dictivo Localは買い切りで、12か月のアップデート込みです。確認日は${checkedOn}（Voice Typeは${siteCheckedOn}）。`,
    intentTitle: "よくある検索と短い答え",
    intentCaption: "サブスクなしのMac音声入力アプリを探すときのよくある検索と、それぞれで確認すること",
    intentHeaders: ["よくある検索", "短い答え", "確認すること"],
    intentRows: [
      [
        "mac 音声入力 買い切り",
        `表の${rows.length}本のうち${free}本はサブスクなしで使えます。サブスク専用はWispr Flowだけです。`,
        "買い切りの価格に、今後のアップデートが含まれるか。",
      ],
      [
        "mac 音声入力 サブスクなし",
        "JesType、VoiceInk、Voicetypr、Voice Type、Dictivo Localは買い切りで販売しています。MacWhisper、Spokenly、Superwhisper、Voibeは、ほかのプランと並べて買い切りを用意しています。",
        "買い切りがどのプランを指すか。何台のMacで使えるか。",
      ],
      [
        "mac 音声入力 オフライン 買い切り",
        "JesType、MacWhisper、VoiceInk、Voicetypr、Voice Type、Dictivo Localは、初期設定でMac内で文字起こしします。",
        "クラウドの機能が任意か。Intel Macで処理の仕方が変わらないか。",
      ],
      [
        "mac 音声入力 ライフタイム ライセンス",
        "SuperwhisperとVoibeは、サブスクと並べてライフタイムの買い切りを販売しています。",
        "ライフタイムでも、今後のアップデートがすべて含まれるとは限りません。更新の条件を読みましょう。",
      ],
      [
        "mac 音声入力 無料 サブスクなし",
        "Mac標準の音声入力は追加料金なしで使えます。Handyは無料のオープンソースです。MacWhisper、Spokenly、Superwhisperには無料プランがあります。",
        "無料で使える範囲と、音声の処理場所。",
      ],
      [
        "Dictivo はサブスクですか",
        "いいえ。Dictivo Localは買い切りで、12か月のアップデート込みです。その後の更新は任意です。",
        "Cloud Fastは別の月額アドオンです。Dictivo Localを使うのに必要ありません。",
      ],
    ],
    factTitle: "買い切りで使えるMacの音声入力アプリの比較",
    factCaption: "支払い方法、買い切り価格、含まれるアップデート、Mac内で処理できるかで比べたMacの音声入力アプリ（確認日つき）",
    factHeaders: ["アプリ", "対応するMac", "支払い方法", "買い切り価格", "含まれるアップデート", "Mac内で処理（オフライン可）？", "確認日"],
    factRows: rows,
    rowChecked: Object.fromEntries(rows.map(([name]) => [name, SITE_CHECKED_ROWS.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : checked])),
    itemListName: "買い切りで使えるMacの音声入力アプリ",
    methodTitle: "このページの確認方法",
    method: [
      "ほかのアプリの情報は、各ベンダーの公式ページとドキュメントから取りました。読んだ日は表の確認日の列にあります。読んだのは英語のページで、日本語のページは別に確認していません。ページの一覧は参考資料にあります。このページのために、アプリをインストールして試してはいません。",
      "価格は、ベンダーの表示どおりの通貨と金額で載せています。ベンダーのページに記載がない項目は「記載なし」としています。ほかのアプリの日本語への対応は確認していないため、このページでは扱いません。",
      "Dictivoの情報は、Dictivo自身のページとアプリのソースコードから取りました。速度や認識精度は測定していません。アプリ同士に点数もつけていません。",
    ],
    methodSignature: `Dictivo チーム、${checkedOn}。`,
    sections: [
      {
        title: "買い切りと「アップデート無期限」は別のこと",
        paragraphs: [
          "買い切りの価格で手に入るのはアプリです。今後のすべての版まで含まれるとは限りません。払う前に、各ベンダーのアップデート条件を読みましょう。",
          "JesType、MacWhisper、VoiceInk、Voicetypr は、買い切りの価格にすべてのアップデートが含まれると説明しています（ベンダー表記は「lifetime」）。Voibe は、ライフタイムの席にそのプランの今後のアップデートがすべて含まれるとしています。Superwhisper は Lifetime のキーは失効しないと説明していますが、プランのページにアップデートの条件は書かれていません。Spokenly と Voice Type は、読んだページにアップデートの条件がありません。",
          "Dictivo Local は12か月のアップデート込みです。その後の更新は任意です。更新しなくても、買った版はそのまま使えます。",
        ],
      },
      {
        title: "Macだけか、Windowsでも使えるか",
        paragraphs: [
          "Mac標準の音声入力、MacWhisper、VoiceInk は Mac のアプリです。MacWhisper と VoiceInk は、iPhone や iPad 版にも触れています。",
          `Handy、JesType、Spokenly、Superwhisper、Voibe、Voicetypr、Wispr Flow は Windows でも使えます。${dictivoPlatforms}`,
          "Voice Type については、Mac 版の App Store のページだけを見ています。",
        ],
        link: {
          label: "MacとWindowsで1つのライセンスの音声入力アプリ（英語）",
          href: "/guides/dictation-app-mac-windows-one-time-license/",
        },
      },
      {
        title: "Apple SiliconかIntelか",
        paragraphs: [
          "買う前に、Macのチップを確認しましょう。表のアプリには、Intel Macで動かないものや、Intel Macでは動き方が変わるものがあります。",
        ],
        bullets: [
          "VoiceInk と JesType は Apple Silicon の Mac 専用です。",
          "Voicetypr は Apple Silicon を推奨し、Intel Mac への対応は限定的です。",
          "Superwhisper は、ローカルモデルが快適に動くのは Apple Silicon だけだと説明しています。",
          "Voibe は、Intel Mac ではクラウドで文字起こしします。",
          "Mac標準の音声入力は、Intel Mac では音声を Apple に送ります。",
          "Handy は、Apple Silicon 用と Intel 用のビルドを別々に用意しています。",
          "Dictivo は Apple Silicon と Intel の Mac で使えます。ローカル音声入力には macOS 13.3 以降が必要です（Dictivo 0.3.58 から）。それより古い macOS では、ローカルエンジンが起動しません。",
        ],
        link: { label: "オフラインで使うための設定とアプリ比較", href: "/ja/guides/offline-dictation-on-mac/" },
      },
      {
        title: "Dictivoの位置づけ",
        paragraphs: [
          "Dictivo Local は買い切りです。買った版はずっと使えます。12か月のアップデート込みで、その後の更新は任意です。",
          "Local モードでは、モデルのダウンロード後に Mac 上で文字起こしします。Local の音声は文字起こしサーバーへ送られません。ショートカットを押して話すと、Dictivo が文字をクリップボード経由で使用中のアプリに貼り付けます。",
          "Tiny モデルは無料で使えます。すべての Local モデルを14日間、カード登録や Dictivo アカウントなしで試せます。月額がかかるのは Cloud Fast だけで、これは任意のアドオンです。",
        ],
        link: { label: "Dictivoの料金と体験の条件を見る", href: "/ja/#pricing" },
      },
      {
        title: "買う前に試す",
        paragraphs: [
          "払う前に、自分のMacで、自分の言葉で試しましょう。体験期間中は、すべての Local モデルを使えます。",
        ],
        steps: [
          "このページのダウンロードボタンから Dictivo を入手します。",
          { html: "Homebrewで入れる場合：<code>brew install --cask deepviewsdev/tap/dictivo</code>。ダウンロードボタンと同じ署名・公証済みのユニバーサル版が入ります。" },
          "Dictivo を開いて「Set up Local」を選び、推奨のモデルをダウンロードします。",
          "マイク（必須）とアクセシビリティ（推奨）を、求められたら許可します。",
          "使いたいアプリの入力欄をクリックし、Cmd+Shift+Space を押して話します。もう一度押すと、Dictivo が文字を貼り付けます。",
          "毎週書くメモやメールで同じことを試し、どれくらい直す必要があるかを確かめます。",
        ],
        link: { label: "日本語の例文で、最初の一文を試す", href: "/ja/guides/first-local-dictation/" },
      },
      {
        title: "買い切りが得になるのはどんなとき",
        paragraphs: [
          "サブスクは、使う月ごとに料金がかかります。Wispr Flow Pro は月額$12〜15です。買い切りは一度払えば、買った版を使い続けられます。",
          "ほぼ毎日音声入力し、1年以上使うつもりなら、買い切りが合います。アップデートの条件も確かめましょう。2年目以降に何が手に入るかは、それで決まります。",
          "たまにしか使わないなら、Mac標準の音声入力か無料のアプリから始めましょう。有料のアプリは、自分のMacで作業が本当に楽になると分かってから買えば十分です。",
        ],
        link: { label: "Dictivoの買い切り価格と更新の料金を見る", href: "/ja/#pricing" },
      },
    ],
    faqTitle: "買い切りのMac音声入力についての質問",
    faqs: [
      [
        "買い切りで使えるMacの音声入力アプリは？",
        "この表では、Mac標準の音声入力（macOSに付属）、Handy（無料）、JesType、MacWhisper Pro、Spokenly Local+、Superwhisper Lifetime、Voibe のライフタイム、Voice Type、VoiceInk、Voicetypr、Dictivo Local です。Superwhisper と Voibe はサブスクも販売しています。Wispr Flow はサブスクのみです。",
      ],
      [
        "Dictivoはサブスクですか？",
        "いいえ。Dictivo Local は買い切りで、買った版はずっと使えます。12か月のアップデート込みで、その後の更新は任意です。Cloud Fast は別の、任意の月額アドオンです。",
      ],
      [
        "Dictivoの12か月のアップデートが終わるとどうなりますか？",
        "手元の版はそのまま使えます。新しい版も使いたいときは、更新を購入できます。更新は任意です。更新の料金は、トップページの料金の欄で確認できます。",
      ],
      [
        "Superwhisperに買い切りはありますか？",
        "はい。Superwhisper は Lifetime プランを$249.99の買い切りで販売しています。Pro は月額$8.49、または年額$84.99です。プランのページには、Lifetime のアップデート条件は書かれていません。",
      ],
      [
        "MacWhisperは買い切りですか？",
        "はい。MacWhisper Pro は€64の買い切りで、すべてのアップデートが含まれるとベンダーは説明しています。無料版もあります。個人ライセンスには、3台を目安とする緩やかな上限があります。",
      ],
      [
        "サブスクなしで無料のMac音声入力アプリは？",
        "Mac標準の音声入力は macOS に付属しています。Handy は MIT ライセンスの無料のオープンソースです。MacWhisper、Spokenly、Superwhisper には無料プランがあります。Dictivo の Tiny モデルも無料です。",
      ],
      [
        "買い切りの音声入力アプリはオフラインで使えますか？",
        "多くは使えますが、初期設定を確かめましょう。JesType、MacWhisper、VoiceInk、Voicetypr、Voice Type、Dictivo Local は、初期設定で Mac 上で文字起こしします。Voibe はローカルモードのときだけです。Superwhisper の Pro ではクラウドのモデルが加わります。Wispr Flow はインターネット接続が必要です。",
      ],
      ["Dictivoの1つのライセンスを複数のMacで使えますか？", devices],
    ],
    relatedTitle: "関連する Dictivo のページ",
    relatedHeaders: ["ページ", "用途", "URL"],
    relatedRows: [
      ["Mac音声入力アプリ比較", "用途別にMacの音声入力アプリを比べる。", "https://dictivo.app/ja/guides/best-speech-to-text-apps-for-mac/"],
      ["Mac オフライン音声入力", "音声をMac内で処理するための設定とアプリ比較。", "https://dictivo.app/ja/guides/offline-dictation-on-mac/"],
      ["最初の一文を試す", "日本語の例文で、Dictivoの最初の音声入力を試す。", "https://dictivo.app/ja/guides/first-local-dictation/"],
      ["Superwhisperの代替", "DictivoとSuperwhisperを、用途と価格で比べる。", "https://dictivo.app/ja/compare/superwhisper-alternative/"],
      ["MacWhisperの代替", "DictivoとMacWhisperを、音声入力と録音ファイルの扱いで比べる。", "https://dictivo.app/ja/compare/macwhisper-alternative/"],
      ["VoiceInkの代替", "同じく買い切りのMacアプリ、VoiceInkとDictivoを比べる。", "https://dictivo.app/ja/compare/voiceink-alternative/"],
      ["料金", "Dictivoの買い切り価格、含まれるアップデート、更新の料金。", "https://dictivo.app/ja/#pricing"],
      ["返金（英語）", "Dictivoの返金の条件。", "https://dictivo.app/refund/"],
      ["MacとWindowsで1つのライセンス（英語）", "1回の購入でMacとWindowsの両方に使えるアプリを比べる。", "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/"],
      ["英語版", "このページの英語版。", "https://dictivo.app/guides/mac-dictation-app-no-subscription/"],
    ],
    referencesTitle: "参考資料",
  };
}
