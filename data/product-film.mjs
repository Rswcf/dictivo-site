export const PRODUCT_FILM = {
  path: "/demo/",
  lastmod: "2026-11-12",
  // The date of the pull request that published this film. If the first production deploy with
  // the film-v09 files falls on a later day, set this to the time of that deploy.
  uploadedAt: "2026-11-12T16:00:00Z",
  name: "Dictivo — Keep your flow",
  description: "Watch Dictivo turn speech into text in Mail and Notes on a Mac: Local keeps audio on your device, and Cloud Fast is there when you choose it. A 68-second film made from real screen recordings.",
  video: "/assets/film-v09/dictivo-film-1080p.mp4",
  master: "/assets/film-v09/dictivo-film-4k.mp4",
  poster: "/assets/film-v09/poster.jpg",
  posterSmall: "/assets/film-v09/poster-800.webp",
  // 2160 x 1215, for the 1080px homepage film on 2x screens. No film-v08 file matches it.
  posterLarge: "/assets/film-v09/poster-2160.webp",
  captions: "/assets/film-v09/captions.en.vtt",
  chinese: "/assets/film-v09/captions.zh-CN.vtt",
  chineseTraditional: "/assets/film-v09/captions.zh-Hant.vtt",
  credits: "/assets/film-v09/CREDITS.txt",
  duration: "PT68S",
};

// Public URLs of the previous film (film-v08, 2026-09-11 to 2026-11-12). The build writes a 301
// from each one to the file that replaces it, so old embeds and shared links keep working.
export const RETIRED_FILM_URLS = Object.freeze([
  ["/assets/film-v08/dictivo-film-1080p.mp4", PRODUCT_FILM.video],
  ["/assets/film-v08/dictivo-film-4k.mp4", PRODUCT_FILM.master],
  ["/assets/film-v08/poster.jpg", PRODUCT_FILM.poster],
  ["/assets/film-v08/poster-800.webp", PRODUCT_FILM.posterSmall],
  ["/assets/film-v08/captions.en.vtt", PRODUCT_FILM.captions],
  ["/assets/film-v08/captions.zh-CN.vtt", PRODUCT_FILM.chinese],
  ["/assets/film-v08/captions.zh-Hant.vtt", PRODUCT_FILM.chineseTraditional],
  ["/assets/film-v08/CREDITS.txt", PRODUCT_FILM.credits],
]);

// Labels for the same English-language film in each language. `play` and `alt` label the homepage
// player; `link` names /demo/ in each llms.txt. Only the English `credit` is used, in the /demo/
// caption: the homepage film has had no caption since 2026-11-12.
export const FILM_COPY = {
  en: { play: "Watch the film · 68 sec", alt: "A new Mail message with a dictated sentence. The Dictivo Companion shows Pasted and 14 words saved.", link: "Film, transcript & credits", credit: "Real screen recordings · AI-generated voice and music" },
  de: { play: "Film ansehen · 68 Sek.", alt: "Eine neue Nachricht in Mail mit einem diktierten Satz. Der Dictivo Companion meldet: eingefügt, 14 Wörter gespart.", link: "Film, Transkript & Credits (EN)" },
  fr: { play: "Voir le film · 68 s", alt: "Un nouveau message dans Mail avec une phrase dictée. Le Dictivo Companion indique que le texte est collé et que 14 mots ont été économisés.", link: "Film, transcription et crédits (EN)" },
  es: { play: "Ver el vídeo · 68 s", alt: "Un mensaje nuevo en Mail con una frase dictada. Dictivo Companion indica que el texto se ha pegado y que se han ahorrado 14 palabras.", link: "Vídeo, transcripción y créditos (EN)" },
  it: { play: "Guarda il video · 68 s", alt: "Un nuovo messaggio in Mail con una frase dettata. Dictivo Companion indica che il testo è stato incollato e che sono state risparmiate 14 parole.", link: "Video, trascrizione e crediti (EN)" },
  nl: { play: "Bekijk de film · 68 sec", alt: "Een nieuw bericht in Mail met een gedicteerde zin. De Dictivo Companion meldt dat de tekst is geplakt en dat 14 woorden zijn bespaard.", link: "Film, transcript en credits (EN)" },
  pt: { play: "Ver o vídeo · 68 s", alt: "Uma nova mensagem no Mail com uma frase ditada. O Dictivo Companion indica que o texto foi colado e que 14 palavras foram economizadas.", link: "Vídeo, transcrição e créditos (EN)" },
  zh: { play: "观看短片 · 68 秒", alt: "Mail 中的一封新邮件，里面是一句口述的话。Dictivo Companion 显示“已粘贴”和“省下 14 个词”。", link: "短片、文字稿与署名（英语）" },
  ja: { play: "動画を見る・68秒", alt: "Mailの新規メッセージに、音声入力した一文が入っています。Dictivo Companionには、貼り付けが完了し14語を節約したことが表示されています。", link: "動画・文字起こし・クレジット（英語）" },
  ko: { play: "영상 보기 · 68초", alt: "Mail의 새 메시지에 받아쓴 문장이 들어 있습니다. Dictivo Companion이 붙여넣기가 끝났고 14단어를 절약했다고 표시합니다.", link: "영상, 대본 및 크레딧 (영어)" },
};

export const FILM_CHAPTERS = [
  { start: 0, end: 10, title: "Say it", description: "“Typing is slow.” is typed and deleted. The film names what you can say instead: emails, notes, prompts, your next draft. Dictivo: on-device dictation." },
  { start: 10, end: 26, title: "Dictate into Mail", description: "In a Mail draft, the shortcut starts Dictivo in Local mode. A generated voice says: ‘Hi Maya, Thursday works for me. Please send the updated agenda before our meeting.’ Dictivo pastes the sentence, and the Companion shows 14 words saved." },
  { start: 26, end: 34, title: "In the app you’re using", description: "The same shortcut pastes a note and an AI prompt into Notes, both transcribed in Local mode." },
  { start: 34, end: 48, title: "Where does your voice go?", description: "In Local mode, dictation audio stays on your computer. The app shows “Private Local is ready” and “Audio stays on this device.” No cloud upload, no Dictivo account, and a network test at dictivo.app/privacy/local-dictation-network-test." },
  { start: 48, end: 56, title: "Cloud Fast, when you choose", description: "One click switches to Cloud Fast, which uploads the recording you choose: ‘Quick update: the launch moved to Tuesday.’ One click switches back to Private Local." },
  { start: 56, end: 68, title: "Keep your flow", description: "Dictivo Local: pay once, keep it forever, no subscription. Every local model is free to try for 14 days, without a card or Dictivo account. Download for Mac or Windows." },
];
