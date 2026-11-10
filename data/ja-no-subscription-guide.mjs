// Batch B3: the Japanese 買い切り Mac dictation guide, /ja/guides/mac-dictation-app-no-subscription/,
// paired by hreflang with the English no-subscription guide. The generator builds the page, its
// sitemap entry, the hreflang on both twins, the Japanese footer and /ja/llms.txt lines only while
// JA_NO_SUBSCRIPTION_GUIDE_READY is true. Rendered by renderAnswerGuidePage() with code "ja"; the
// fact table is factRows plus a check-date cell per row from rowChecked.
// Stub: the head strings are final; the page copy is still to be written.
export const JA_NO_SUBSCRIPTION_GUIDE_READY = false;
export const JA_NO_SUBSCRIPTION_GUIDE_LASTMOD = "2026-11-10"; // placeholder; the release commit sets the merge day
export const JA_NO_SUBSCRIPTION_GUIDE_CHECKED = "2026-11-10"; // the competitor facts file and price spot-check date
export const JA_NO_SUBSCRIPTION_GUIDE_REFERENCES = [];

export function jaNoSubscriptionGuideCopy({ windows, checked = JA_NO_SUBSCRIPTION_GUIDE_CHECKED, lastmod = JA_NO_SUBSCRIPTION_GUIDE_LASTMOD } = {}) {
  return {
    navLabel: "買い切りのMac音声入力",
    metaTitle: "Mac音声入力アプリの買い切り版：サブスクなしで選ぶ",
    metaDescription:
      "買い切りで使えるMacの音声入力アプリを比較。価格、含まれるアップデート、Mac内で処理できるか（オフライン）を確認日つきで整理しました。Dictivo Localは買い切りで、12か月のアップデート込みです。",
    title: "買い切りで使えるMacの音声入力アプリは？",
    about: ["Mac 音声入力 買い切り", "Mac 音声入力 サブスクなし", "買い切り 音声入力 アプリ", "Mac 音声入力 オフライン 買い切り"],
    lede: "",
    lastUpdated: lastmod,
    answerTitle: "短い答え",
    answer: "",
    intentTitle: "",
    intentCaption: "",
    intentHeaders: [],
    intentRows: [],
    factTitle: "",
    factCaption: "",
    factHeaders: [],
    factRows: [],
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
