// Batch B3: the Japanese Mac speech-to-text guide, /ja/guides/best-speech-to-text-apps-for-mac/,
// paired by hreflang with the English guide. The generator builds the page, its sitemap entry, the
// hreflang on both twins, the Japanese footer and /ja/llms.txt lines only while
// JA_SPEECH_GUIDE_READY is true. Rendered by renderAnswerGuidePage() with code "ja"; the fact
// table is built from appRows, handPrices and rowChecked (speechToTextMacFactTable(copy, "ja")).
// Stub: the head strings are final; the page copy is still to be written.
export const JA_SPEECH_GUIDE_READY = false;
export const JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD = "2026-11-10"; // placeholder; the release commit sets the merge day
export const JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED = "2026-11-10"; // the competitor facts file and price spot-check date
export const JA_SPEECH_TO_TEXT_MAC_GUIDE_REFERENCES = [];

export function jaSpeechToTextMacGuideCopy({ windows, checked = JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED, lastmod = JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD } = {}) {
  const year = checked.slice(0, 4);
  const appRows = [];
  // The title counts the table's rows; the stub has none yet, so it names the planned ten.
  const rowCount = appRows.length || 10;
  return {
    navLabel: "Mac音声入力アプリ比較",
    metaTitle: `Mac音声入力アプリ比較（${year}）：用途別おすすめ${rowCount}本`,
    metaDescription:
      "Macで使える音声入力・文字起こしアプリ10本を用途別に比較。標準の音声入力、オフラインで使えるローカルアプリ、ファイルの文字起こし、クラウド型を、価格と確認日つきで整理しました。",
    title: `Macの音声入力アプリおすすめ比較（${year}年）：用途別に選ぶ`,
    about: ["Mac 音声入力 アプリ", "Mac 音声入力 おすすめ", "Mac 文字起こし アプリ", "音声入力 アプリ 比較"],
    lede: "",
    lastUpdated: lastmod,
    answerTitle: "短い答え",
    answer: "",
    intentTitle: "",
    intentCaption: "",
    intentHeaders: [],
    intentRows: [],
    appTitle: "",
    appCaption: "",
    appHeaders: [],
    appRows,
    handPrices: {},
    rowChecked: {},
    itemListName: "",
    methodTitle: "このページの確認方法",
    method: [],
    methodSignature: "",
    sections: [],
    faqTitle: "",
    faqs: [],
    relatedTitle: "関連する Dictivo のページ",
    relatedHeaders: ["ページ", "用途", "URL"],
    relatedRows: [],
    referencesTitle: "参考資料",
  };
}
