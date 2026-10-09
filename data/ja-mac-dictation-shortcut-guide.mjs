// Japanese guide to the built-in macOS Dictation shortcut, paired with the English guide
// (/guides/mac-dictation-shortcut/) by hreflang. The macOS statements come from Apple's Japanese
// help pages below (read on JA_MAC_DICTATION_SHORTCUT_CHECKED); setting names are copied from
// those pages, never translated from the English guide. Apple names only two choices of the
// Shortcut pop-up menu, so this page names only those. Dictivo appears only in the third column
// of the quick reference, in its own disclosed section and in the last FAQ.
export const JA_MAC_DICTATION_SHORTCUT_LASTMOD = "2026-10-09"; // set to the publishing commit's date

// The day the Apple pages below were read for this guide.
export const JA_MAC_DICTATION_SHORTCUT_CHECKED = "2026-10-09";

const checked = `（${JA_MAC_DICTATION_SHORTCUT_CHECKED}確認）`;
const checkedOn = new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(
  new Date(`${JA_MAC_DICTATION_SHORTCUT_CHECKED}T00:00:00Z`),
);

export const JA_APPLE_DICTATION_HELP = {
  dictate: "https://support.apple.com/ja-jp/guide/mac-help/mh40584/mac",
  keyboardSettings: "https://support.apple.com/ja-jp/guide/mac-help/kbdm162/mac",
  keyboardShortcuts: "https://support.apple.com/ja-jp/102650",
  troubleshoot: "https://support.apple.com/ja-jp/guide/mac-help/mchlc480652b/mac",
  voiceControl: "https://support.apple.com/ja-jp/guide/mac-help/mh40719/mac",
  commands: "https://support.apple.com/ja-jp/guide/mac-help/mh40695/mac",
  featureAvailability: "https://www.apple.com/jp/macos/feature-availability/#dictation",
};

export const JA_MAC_DICTATION_SHORTCUT_REFERENCES = [
  [`Apple サポート：Macでメッセージや書類を音声入力する${checked}`, JA_APPLE_DICTATION_HELP.dictate],
  [`Apple サポート：Macの「キーボード」設定${checked}`, JA_APPLE_DICTATION_HELP.keyboardSettings],
  [`Apple サポート：Macのキーボードショートカット${checked}`, JA_APPLE_DICTATION_HELP.keyboardShortcuts],
  [`Apple サポート：Macの音声入力が正常に動作しない場合${checked}`, JA_APPLE_DICTATION_HELP.troubleshoot],
  [`Apple サポート：音声コントロールコマンドを使ってMacを操作する${checked}`, JA_APPLE_DICTATION_HELP.voiceControl],
  [`Apple サポート：Macでテキストの音声入力に使えるコマンド${checked}`, JA_APPLE_DICTATION_HELP.commands],
  [`Apple：macOSで利用できる機能（音声入力）${checked}`, JA_APPLE_DICTATION_HELP.featureAvailability],
];

// Dictivo's default shortcuts, naming Windows only while Windows downloads are public.
function dictivoShortcutJa(windows) {
  return windows ? "MacがCmd+Shift+Space、WindowsがCtrl+Shift+Space" : "Cmd+Shift+Space";
}

function dictivoPasteLastJa(windows) {
  return windows ? "MacがCmd+Shift+V、WindowsがCtrl+Shift+V" : "Cmd+Shift+V";
}

export function jaMacDictationShortcutCopy({ windows, troubleshootingPath, pricingPath, firstDictationPath }) {
  return {
    navLabel: "Macの音声入力ショートカット",
    metaTitle: "Macの音声入力ショートカット｜確認・変更・無効にする方法",
    metaDescription:
      "Macの音声入力のショートカットは「システム設定」の「キーボード」で確認・変更できます。マイクキーやfn + D、カスタマイズの手順、無効にする方法、Siriが起動する・反応しないときの確認点をAppleの手順に沿ってまとめました。",
    eyebrow: "音声入力のショートカット",
    title: "Macの音声入力ショートカット：確認・変更と、効かないときの対処",
    lede:
      "macOS標準の音声入力は、キーやキーの組み合わせを押して始められます。その設定は「キーボード」設定の「音声入力」にあります。このページでは、Appleが案内している選択肢、好きな組み合わせへの変更方法、ショートカットを無効にする方法、押しても反応しないときやSiriが起動するときの確認点をまとめました。",
    environmentLabel: "確認した環境",
    environment: `Appleの日本語サポート文書（macOS Tahoe 26とmacOS 27）を${checkedOn}に確認した内容です。実機での検証結果は含みません。`,
    answerTitle: "結論",
    answer:
      "Macの音声入力のショートカットは、アップルメニューから「システム設定」を開き、「キーボード」の「音声入力」にある「ショートカット」で確認・変更します。ファンクションキーの列にマイクキーがあるキーボードでは、マイクキーを押してすぐ放すと音声入力が始まります（押したままにするとSiriが起動します）。Appleはメニューの選択肢として「Fn（ファンクション）キーを2回押す」を挙げており、一覧にない組み合わせは「カスタマイズ」で設定できます。また、Appleのキーボードショートカット一覧には、fn + Dで音声入力を開始／停止できると記載されています。どのショートカットも、「音声入力」がオンで、「音声コントロール」がオフのときに使えます。",
    quickReference: {
      title: "ショートカット早見表",
      caption: `Macで音声入力を開始・終了・変更する方法。macOSはAppleの日本語サポート文書（${checkedOn}確認）、Dictivoは初期設定に基づきます。`,
      headers: ["操作", "macOS標準の音声入力", "Dictivo（当サイトの製品）"],
      rows: [
        ["開始", "マイクキーを押してすぐ放す、設定したショートカット、fn + D、または「編集」→「音声入力を開始」", `初期設定は${dictivoShortcutJa(windows)}（変更できます）`],
        ["終了", "Escapeキー、マイクキー、設定したショートカット、またはfn + D。30秒間声が検出されないと自動で止まります", "もう一度ショートカットを押す（押している間だけ録音する設定なら、キーを放す）"],
        ["ショートカットを変更", "「システム設定」→「キーボード」→「音声入力」→「ショートカット」", "Dictivoの「設定」→「ホットキー」"],
        ["改行", "「次の行」または「次の段落」と言う", "-"],
        ["直前の文字起こしを貼り付け", "-", `初期設定は${dictivoPasteLastJa(windows)}`],
      ],
    },
    tocLabel: "このページの内容",
    sections: [
      {
        kicker: "設定の場所",
        title: "ショートカットの設定場所とメニューの選択肢",
        paragraphs: [
          "アップルメニューから「システム設定」を開き、サイドバーの「キーボード」をクリックします（下にスクロールする必要がある場合があります）。「音声入力」の項目にある「ショートカット」のポップアップメニューで、音声入力を始めるショートカットを選びます。",
          "Appleのヘルプが選択肢として名前を挙げているのは、「Fn（ファンクション）キーを2回押す」と、一覧にない組み合わせを作る「カスタマイズ」の2つです。ほかにどの選択肢が表示されるかはMacの機種とmacOSのバージョンによって異なるため、お使いのMacのメニューで確認してください。",
          "ファンクションキーの列にマイクキーがあるキーボードでは、ショートカットとは別に、マイクキーでも音声入力を始められます。",
        ],
      },
      {
        kicker: "変更",
        title: "ショートカットを変更する（好きな組み合わせにする）",
        steps: [
          "「システム設定」→「キーボード」で「音声入力」に移動します。オフになっていればオンにします。初めてオンにするときは「有効にする」をクリックします。",
          "「ショートカット」のポップアップメニューをクリックし、使いたいショートカットを選びます。",
          "一覧にない組み合わせにしたいときは「カスタマイズ」を選び、使いたいキーを押します。Appleの例はOption＋Zキーです。",
        ],
        notes: [
          "ショートカットを選ぶと、Macの機種によっては「キーボード」設定の「fnキーを押して」（または「地球儀キーを押して」）の設定が自動で変わります。たとえば「Fn（ファンクション）キーを2回押す」を選ぶと、この設定は「音声入力を開始（Fnキーを2回押す）」になります。",
        ],
      },
      {
        kicker: "キー",
        title: "マイクキー・fnキー・地球儀キーとfn + D",
        paragraphs: [
          "マイクキーは、キーボードのファンクションキーの列にある場合に使えます。押してすぐ放すと音声入力が始まり、押したままにするとSiriが起動します（Siriが有効な場合）。",
          "「キーボード」設定の「fnキーを押して」（または「地球儀キーを押して」）で「音声入力を開始」を選ぶと、そのキーを2回押したときに音声入力が始まります。ほかの選択肢は「入力ソースを変更」「絵文字と記号を表示」「何もしない」です。",
          "Appleの「Macのキーボードショートカット」には「fn + D：音声入力を開始／停止します」と記載されています。同じ箇所に、「キーボード」設定で別の音声入力のショートカットを設定できる場合がある、とも書かれています。",
          "複数の言語で音声入力する場合は、音声入力中にカーソルの横に表示される言語をクリックするか、地球儀キー（ある場合）を押して、使う言語を選べます。",
        ],
      },
      {
        kicker: "無効にする",
        title: "ショートカットを無効にしたい・勝手に起動する",
        paragraphs: [
          "意図せず音声入力が始まるときは、「ショートカット」を普段押さない組み合わせに変えます。「カスタマイズ」を選んでから使いたいキーを押すと、一覧にない組み合わせも設定できます。",
          "fnキー（地球儀キー）を2回押したときに起動してしまう場合は、「キーボード」設定の「fnキーを押して」（または「地球儀キーを押して」）で「音声入力を開始」以外を選びます。",
          "音声入力そのものを使わないなら、「キーボード」設定で「音声入力」をオフにします。オフにすれば、ショートカットで起動することもなくなります。",
        ],
        links: [["音声入力が勝手に起動するときの確認点（症状別の直し方）", troubleshootingPath]],
      },
      {
        kicker: "反応しない",
        title: "押しても反応しない・Siriが起動するとき",
        steps: [
          "「システム設定」→「キーボード」で「音声入力」がオンか確認します。初めてオンにするときは「有効にする」をクリックします。",
          "「ショートカット」で選んでいるキーと、実際に押しているキーが同じか確認します。",
          "「システム設定」→「アクセシビリティ」→「音声コントロール」がオンならオフにします。オンの間は、標準の音声入力は使えません。",
          "マイクキーでSiriが起動するのは、キーを押したままにしているためです。押してすぐ放してください。",
          "文字を入れたい場所をクリックして、カーソルを置いてからショートカットを押します。",
          "メニューバーの「編集」→「音声入力を開始」で始まるなら、音声入力そのものは動いていて、原因はショートカットの設定です。アプリによっては、この項目がメニューに表示されないことがあります。",
          "別のアプリが同じキーの組み合わせを使っていないかも確認し、重なっていれば、どちらかのショートカットを変えます。",
        ],
        links: [["Macで音声入力できないときの直し方（症状別の確認手順）", troubleshootingPath]],
      },
      {
        kicker: "メニュー",
        title: "ショートカットを使わずに開始・終了する",
        paragraphs: [
          "文字を入れたい場所をクリックし、メニューバーの「編集」→「音声入力を開始」を選びます。アプリによっては、この項目が表示されないことがあります。",
          "終了するときは、Escapeキー、マイクキー（ある場合）、または音声入力のショートカットを押します。話せる長さに上限やタイムアウトはありませんが、30秒間声が検出されないと自動で止まります。",
        ],
      },
      {
        kicker: "コマンド",
        title: "音声入力中に使えるコマンド",
        paragraphs: [
          "次のコマンドは、音声入力中いつでも使えます。改行するときは「次の行」（Returnキーを1回押すのと同じ）、段落を分けるときは「次の段落」（Returnキーを2回押すのと同じ）と言います。改行は、音声入力を終えた時点で表示されます。",
          "記号は「感嘆符」のように名前で言います。「ハートの絵文字」のように、絵文字の名前を言って入力することもできます。",
          "日本語（日本）は、話している間に句読点が自動で入る「自動句読点」の対象です。不要なら「キーボード」→「音声入力」で「自動句読点」をオフにします。",
        ],
        links: [["Apple：Macでテキストの音声入力に使えるコマンド", JA_APPLE_DICTATION_HELP.commands]],
      },
    ],
    fieldTest: null,
    dictivo: {
      kicker: "標準機能以外の選択肢",
      title: "Dictivoのショートカット",
      paragraphs: [
        `ここからは当サイトの製品の案内です。Dictivoは、macOS標準の音声入力とは別の音声入力アプリで、ショートカットも「キーボード」設定ではなくDictivoの中で設定します。初期設定は${dictivoShortcutJa(windows)}です。1回押すと録音が始まり、もう一度押すと止まります。キーを押している間だけ録音する方式にも切り替えられます。`,
        `直前の文字起こしをもう一度貼り付けるショートカットもあり、初期設定は${dictivoPasteLastJa(windows)}です。どちらも、Dictivoの「設定」→「ホットキー」（英語表示ではSettings → Hotkeys）で変更できます。`,
        "Dictivoのショートカットと、macOSの音声入力のショートカットは別々の設定で、片方を変えてももう片方は変わりません。両方を使うなら、違うキーにしてください。文字起こしが終わると、Dictivoは使っているアプリに文字を貼り付けます。",
      ],
      links: [
        ["Dictivoで最初の1文を試す", firstDictationPath],
        ["Dictivoの料金と試用条件", pricingPath],
      ],
    },
    faqTitle: "よくある質問",
    faqs: [
      [
        "Macの音声入力のショートカットは何ですか？",
        "キーボードとmacOSのバージョンによって異なり、Appleのヘルプは一つの初期設定を明記していません。お使いのMacの設定は「システム設定」→「キーボード」→「音声入力」の「ショートカット」で確認できます。ファンクションキーの列にマイクキーがあれば、押してすぐ放すと始まります。Appleのキーボードショートカット一覧では、fn + Dでも開始／停止できるとされています。",
      ],
      [
        "ショートカットはどこで変更できますか？",
        "アップルメニューから「システム設定」を開き、「キーボード」の「音声入力」で「ショートカット」のポップアップメニューをクリックして、別の項目を選びます。",
      ],
      [
        "好きなキーの組み合わせにできますか？",
        "できます。「ショートカット」で「カスタマイズ」を選び、使いたいキーを押します。Appleの例はOption＋Zキーです。",
      ],
      [
        "マイクキーを押すとSiriが起動するのはなぜですか？",
        "マイクキーを押したままにすると、Siriが起動します（Siriが有効な場合）。音声入力を始めるときは、押してすぐ放してください。",
      ],
      [
        "音声入力のショートカットを無効にできますか？",
        "音声入力を使わないなら、「キーボード」設定で「音声入力」をオフにします。音声入力は使いたいが誤って起動してしまう場合は、「カスタマイズ」で普段押さない組み合わせに変えます。fnキーを2回押して起動してしまうなら、「fnキーを押して」の設定を「音声入力を開始」以外にします。",
      ],
      [
        "マイクキーはどこにありますか？",
        "マイクキーがあるキーボードでは、ファンクションキーの列にあります。Apple製の多くのキーボードでは、いちばん上の列です。マイクキーがない場合は、「ショートカット」で選んだキーかfn + Dを使います。",
      ],
      [
        "DictivoのショートカットはmacOSの音声入力と同じですか？",
        `いいえ。当サイトの製品であるDictivoは独自のショートカット（初期設定は${dictivoShortcutJa(windows)}）を使い、Dictivoの「設定」→「ホットキー」で変更します。片方を変えても、もう片方は変わりません。`,
      ],
    ],
    referencesTitle: "参考資料（公式情報）",
  };
}
