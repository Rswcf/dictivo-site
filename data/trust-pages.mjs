export const TRUST_PAGES = [
  {
    slug: "privacy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    metaTitle: "Privacy Policy · Dictivo",
    metaDescription:
      "How Dictivo handles Local dictation, optional Cloud Fast uploads, licensing, support, and customer data.",
    lede:
      "Dictivo is built around a simple rule: Local dictation should stay local, and Cloud Fast should be an explicit choice.",
    sections: [
      {
        title: "Local mode",
        paragraphs: [
          "When you use Local mode, microphone audio is processed on your device. Dictivo does not upload Local recordings or Local transcripts for storage, analytics, or model training.",
          "Local transcripts, history, dictionary terms, snippets, settings, and selected local models are kept on the device where you use Dictivo. You can delete local history from the app.",
        ],
        bullets: [
          "No Dictivo account is required for Local dictation.",
          "Local mode does not send your audio to a transcription server.",
          "The free Local tier and the 14-day Local trial use the same Local privacy boundary.",
        ],
      },
      {
        title: "Cloud Fast",
        paragraphs: [
          "Cloud Fast is optional. If you select Cloud Fast, Dictivo uploads the current recording so it can be transcribed faster. Use Cloud Fast only for recordings you are comfortable processing remotely.",
          "Dictionary terms, snippets, local history, and local settings stay on your device. The app receives the transcript and then applies local cleanup on your device.",
        ],
        bullets: [
          "Cloud Fast uploads only recordings you send through Cloud Fast.",
          "Cloud Fast is separate from Local mode.",
          "Your monthly Cloud Fast quota is tied to your active Cloud Fast subscription and device binding.",
        ],
      },
      {
        title: "Purchases, licenses, and support",
        paragraphs: [
          "When you buy Dictivo, the checkout provider handles payment details, billing address, tax calculation, receipts, and payment security. Dictivo receives the information needed to issue and validate the license.",
          "If you email support, we use your message, email address, order reference, and related troubleshooting details only to answer the request and operate the customer relationship.",
        ],
        bullets: [
          "Use support@dictivo.app for purchase, refund, activation, and support requests.",
          "License checks are used to activate purchases, refresh status, and protect paid features.",
          "Dictivo does not sell customer contact details.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    navLabel: "Terms",
    title: "Terms of Use",
    eyebrow: "Terms",
    metaTitle: "Terms of Use · Dictivo",
    metaDescription:
      "The practical terms for using Dictivo, including Local, Cloud Fast, licenses, updates, refunds, and support.",
    lede:
      "These terms are written for customers, not lawyers. They describe what you can expect when you download, buy, and use Dictivo.",
    sections: [
      {
        title: "License to use Dictivo",
        paragraphs: [
          "Dictivo Local is sold as a personal desktop license. Buying Local unlocks the paid local models and includes 12 months of app updates and new local models.",
          "After the included update window ends, the version you already installed remains usable. Renewing the update window is optional and is only needed for future app updates and new local models.",
        ],
        bullets: [
          "Dictivo Local is currently $49 once.",
          "Optional future update renewal is currently $24 per year.",
          "Cloud Fast is a separate optional monthly subscription.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not use Dictivo to break laws, violate another person's rights, abuse support channels, reverse engineer license controls, or interfere with the service used for optional Cloud Fast.",
          "You are responsible for deciding whether a recording is appropriate for Local mode or Cloud Fast. Sensitive audio should stay in Local mode.",
        ],
      },
      {
        title: "Availability and changes",
        paragraphs: [
          "Dictivo is shipped as desktop software with a public beta label while the product continues to mature. We may improve, remove, or rename features as the product develops.",
          "Cloud Fast depends on remote processing and may be unavailable during maintenance or provider outages. Local mode remains the privacy-first path for everyday dictation.",
        ],
      },
    ],
  },
  {
    slug: "refund",
    navLabel: "Refunds",
    title: "Refund Policy",
    eyebrow: "Refunds",
    metaTitle: "Refund Policy · Dictivo",
    metaDescription:
      "How to request a Dictivo refund for Local purchases and Cloud Fast subscriptions.",
    lede:
      "Buying desktop software should not feel risky. If Dictivo does not fit your workflow, contact support and we will handle the request plainly.",
    sections: [
      {
        title: "Local license refunds",
        paragraphs: [
          "You can request a refund for a Dictivo Local purchase within 14 days of purchase. Email support@dictivo.app with the purchase email and order reference.",
          "After a refund is processed, the refunded license may be disabled and should no longer be used.",
        ],
        bullets: [
          "Refund window: 14 days from purchase.",
          "Contact: support@dictivo.app.",
          "Include the purchase email and order reference when possible.",
        ],
      },
      {
        title: "Cloud Fast subscriptions",
        paragraphs: [
          "Cloud Fast is monthly. You can manage or cancel the subscription from the billing link shown in the app or from your purchase receipt.",
          "If there is a billing mistake or activation problem, email support@dictivo.app. We will review the account and help resolve it.",
        ],
      },
      {
        title: "Before requesting a refund",
        paragraphs: [
          "If the issue is activation, update access, device binding, or Cloud Fast availability, support can often fix it quickly. Tell us what happened and which version of Dictivo you are using.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    navLabel: "Contact",
    title: "Contact Dictivo",
    eyebrow: "Contact",
    metaTitle: "Contact · Dictivo",
    metaDescription:
      "Contact Dictivo support for purchases, activation, refunds, security reports, and product questions.",
    lede:
      "Use the right address for the request and include enough context for us to reproduce the issue.",
    sections: [
      {
        title: "Customer support",
        paragraphs: [
          "For purchase, license, activation, update, refund, and Cloud Fast questions, email support@dictivo.app.",
          "For faster help, include your purchase email, app version, operating system, and a short description of what you expected and what happened.",
        ],
      },
      {
        title: "Security reports",
        paragraphs: [
          "If you believe you found a security issue, email security@dictivo.app with reproduction steps. Please avoid public disclosure until we have had time to investigate and respond.",
        ],
      },
      {
        title: "Product questions",
        paragraphs: [
          "For general product questions, platform availability, or trial questions, support@dictivo.app is the best starting point.",
        ],
      },
    ],
  },
  {
    slug: "about",
    navLabel: "About",
    title: "About Dictivo",
    eyebrow: "About",
    metaTitle: "About · Dictivo",
    metaDescription:
      "Dictivo is a private-first desktop dictation app for people who want Local by default and Cloud Fast only when they choose it.",
    lede:
      "Dictivo is a desktop dictation app for people who want the speed of voice without making cloud transcription the default.",
    sections: [
      {
        title: "The product position",
        paragraphs: [
          "Dictivo starts with Local mode because most dictation contains private working text: notes, drafts, names, client details, research, support replies, prompts, and unfinished thoughts.",
          "Cloud Fast exists for a different moment: when the recording is low-sensitivity and speed matters more than keeping the entire workflow local.",
        ],
      },
      {
        title: "What Dictivo is for",
        bullets: [
          "Private desktop dictation on macOS and Windows x64.",
          "A free Local tier, a 14-day full Local trial, and optional paid Local upgrade.",
          "Optional Cloud Fast minutes and subscription for selected recordings.",
          "A clear support path through support@dictivo.app.",
        ],
      },
      {
        title: "What Dictivo is not trying to be",
        paragraphs: [
          "Dictivo is not a meeting recorder, not a call recorder, and not a cloud-first workspace. It is focused on turning speech into text where you are already writing.",
        ],
      },
    ],
  },
];
