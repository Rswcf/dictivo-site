export const PRODUCT_FILM = {
  path: "/demo/",
  lastmod: "2026-09-12",
  // First successful production deployment, GitHub Actions run 34593761455.
  uploadedAt: "2026-09-11T11:24:06Z",
  name: "Dictivo — Keep your flow",
  description: "Watch Dictivo turn a spoken draft into text. Local keeps audio on your device; Cloud Fast is there when you choose it. A 35-second product film with human dictation recordings.",
  video: "/assets/film-v08/dictivo-film-1080p.mp4",
  master: "/assets/film-v08/dictivo-film-4k.mp4",
  poster: "/assets/film-v08/poster.jpg",
  captions: "/assets/film-v08/captions.en.vtt",
  chinese: "/assets/film-v08/captions.zh-CN.vtt",
  credits: "/assets/film-v08/CREDITS.txt",
  duration: "PT35S",
};

// Labels describe the same English-language film on every localized homepage.
export const FILM_COPY = {
  en: { play: "Watch the film · 35 sec", alt: "Dictivo Local with a transcribed draft and the words Your voice. On your device.", summary: "Your voice. On your device. Cloud, when you choose.", link: "Film, transcript & credits", credit: "Human recordings: CSTR VCTK · CC BY 4.0" },
  de: { play: "Film ansehen · 35 Sek.", alt: "Dictivo Local mit einem transkribierten Entwurf und dem Hinweis, dass Audio auf dem Gerät bleibt.", summary: "Ihre Stimme. Auf Ihrem Gerät. Cloud, wenn Sie es möchten.", link: "Film, Transkript & Credits (EN)", credit: "Menschliche Sprachaufnahmen: CSTR VCTK · CC BY 4.0" },
  fr: { play: "Voir le film · 35 s", alt: "Dictivo Local affiche un brouillon transcrit et indique que l’audio reste sur l’appareil.", summary: "Votre voix. Sur votre appareil. Le cloud, si vous le choisissez.", link: "Film, transcription et crédits (EN)", credit: "Enregistrements de voix humaines : CSTR VCTK · CC BY 4.0" },
  es: { play: "Ver el vídeo · 35 s", alt: "Dictivo Local muestra un borrador transcrito y señala que el audio permanece en el dispositivo.", summary: "Tu voz. En tu dispositivo. La nube, cuando tú decidas.", link: "Vídeo, transcripción y créditos (EN)", credit: "Grabaciones de voces humanas: CSTR VCTK · CC BY 4.0" },
  it: { play: "Guarda il video · 35 s", alt: "Dictivo Local mostra una bozza trascritta e indica che l’audio rimane sul dispositivo.", summary: "La tua voce. Sul tuo dispositivo. Il cloud, quando lo scegli.", link: "Video, trascrizione e crediti (EN)", credit: "Registrazioni di voci umane: CSTR VCTK · CC BY 4.0" },
  nl: { play: "Bekijk de film · 35 sec", alt: "Dictivo Local toont een uitgeschreven concept en vermeldt dat audio op het apparaat blijft.", summary: "Je stem. Op je apparaat. De cloud, wanneer jij kiest.", link: "Film, transcript en credits (EN)", credit: "Menselijke stemopnamen: CSTR VCTK · CC BY 4.0" },
  pt: { play: "Ver o vídeo · 35 s", alt: "Dictivo Local mostra um rascunho transcrito e indica que o áudio fica no dispositivo.", summary: "A sua voz. No seu dispositivo. A nuvem, quando escolher.", link: "Vídeo, transcrição e créditos (EN)", credit: "Gravações de vozes humanas: CSTR VCTK · CC BY 4.0" },
  zh: { play: "观看短片 · 35 秒", alt: "Dictivo Local 展示口述草稿的转录结果，并说明声音留在设备上。", summary: "你的声音，留在你的设备。需要云端，由你选择。", link: "短片、文字稿与署名（英语）", credit: "真人录音：CSTR VCTK · CC BY 4.0" },
  ja: { play: "動画を見る・35秒", alt: "Dictivo Localが下書きの文字起こし結果と、音声をデバイス内で処理することを示しています。", summary: "あなたの声を、あなたのデバイスで。クラウドを使うかは、あなたが決める。", link: "動画・文字起こし・クレジット（英語）", credit: "人間の音声録音：CSTR VCTK · CC BY 4.0" },
  ko: { play: "영상 보기 · 35초", alt: "Dictivo Local이 초안의 받아쓰기 결과와 음성이 기기에 남는다는 안내를 보여 줍니다.", summary: "당신의 음성은 당신의 기기에. 클라우드는 원할 때 선택하세요.", link: "영상, 대본 및 크레딧 (영어)", credit: "사람의 음성 녹음: CSTR VCTK · CC BY 4.0" },
};

export const FILM_CHAPTERS = [
  { start: 0, end: 12, title: "Say it", description: "A human voice says: ‘I would like to see the figures for the second quarter.’ Dictivo’s Local transcription appears as a draft." },
  { start: 12, end: 19, title: "Your voice. On your device.", description: "Local is the default. Once a model is installed, dictation audio is processed on your computer without uploading it." },
  { start: 19, end: 29, title: "Cloud, when you choose", description: "A new draft opens, then Cloud Fast is selected. A second human recording says: ‘Everyone deserves to share in this success.’ Cloud Fast sends the selected recording for cloud transcription." },
  { start: 29, end: 35, title: "Keep your flow", description: "Try Dictivo on Mac or Windows. All local models are free to try for 14 days, without a card or Dictivo account." },
];
