// "What is Dictivo?": a short disclosed block right after a guide's answer, with the pricing link
// and the downloads, so a reader meets the product in the first quarter of the page. Guides opt in
// with an `introSource` (the download attribution prefix). Only these languages have copy; every
// other language renders no block. No price and no other product's name here.
export const GUIDE_INTRO_COPY = {
  en: {
    title: "What is Dictivo?",
    body: "Dictivo is this site's product: an offline dictation app for Mac and Windows. Press a shortcut, speak, and Dictivo pastes the text into the app you are using. Local mode keeps audio on your device. Dictivo Local is a one-time purchase with no subscription, and one license covers Mac and Windows.",
    pricingLink: "See pricing",
  },
  ja: {
    title: "Dictivoとは",
    body: "Dictivoは当サイトの製品で、Mac・Windows x64向けのオフライン音声入力アプリです。ショートカットを押して話すと、使用中のアプリにテキストを貼り付けます。Localモードでは、音声が端末の外に出ません。Dictivo Localは買い切りで、サブスクリプションではありません。1つのライセンスでMacとWindowsの両方に使えます。",
    pricingLink: "料金を見る",
  },
};
