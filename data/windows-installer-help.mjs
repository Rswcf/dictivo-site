// User-facing Windows download triage. Keep reputation warnings separate from execution
// policy and malware detections. No protection changes or blanket safety assurances.
export const WINDOWS_INSTALL_HELP_LASTMOD = "2026-10-31";
export const WINDOWS_INSTALL_HELP_PATHS = Object.freeze({
  en: "/guides/windows-installer-blocked/",
  de: "/de/guides/windows-installer-blocked/",
  zh: "/zh/guides/windows-installer-blocked/",
  "zh-hant": "/zh-hant/guides/windows-installer-blocked/",
});
export const windowsInstallHelpPath = (code = "en") => WINDOWS_INSTALL_HELP_PATHS[code] ?? WINDOWS_INSTALL_HELP_PATHS.en;

export const WINDOWS_INSTALL_ENTRY_COPY = {
  en: { label: "Windows installer blocked? Read the installation help", note: "Windows may warn about an unsigned or unfamiliar installer. SmartScreen and Smart App Control need different steps; identify the warning before continuing." },
  de: { label: "Windows blockiert die Installation? Zur Hilfe", note: "Windows kann vor unbekannten oder unsignierten Installern warnen. SmartScreen und Smart App Control erfordern unterschiedliche Schritte. Prüfen Sie zuerst den Hinweis." },
  fr: { label: "Installation Windows bloquée ? Lire l’aide (en anglais)", note: "Windows peut avertir pour un programme inconnu ou non signé. SmartScreen et Smart App Control nécessitent des démarches différentes : identifiez d’abord le message." },
  es: { label: "¿Windows bloquea el instalador? Consulta la ayuda (en inglés)", note: "Windows puede advertir sobre un instalador desconocido o sin firma. SmartScreen y Smart App Control requieren pasos distintos: identifica primero el aviso." },
  it: { label: "Installer Windows bloccato? Leggi la guida (in inglese)", note: "Windows può segnalare un installer sconosciuto o non firmato. SmartScreen e Smart App Control richiedono passaggi diversi: controlla prima il messaggio." },
  nl: { label: "Windows blokkeert de installatie? Lees de hulp (Engels)", note: "Windows kan waarschuwen voor onbekende of niet-ondertekende installers. SmartScreen en Smart App Control vragen om verschillende stappen. Controleer eerst de melding." },
  pt: { label: "O Windows bloqueou o instalador? Leia a ajuda (em inglês)", note: "O Windows pode alertar sobre um instalador desconhecido ou sem assinatura. SmartScreen e Smart App Control exigem passos diferentes: identifique primeiro o aviso." },
  zh: { label: "Windows 安装包被拦截？查看解决方法", note: "Windows 可能提示安装包不常见或未签名。SmartScreen 与智能应用控制（Smart App Control）的处理方式不同，请先确认提示类型。" },
  ja: { label: "Windows でインストーラーがブロックされた場合（英語）", note: "未署名または利用実績の少ないインストーラーには警告が出る場合があります。SmartScreen と Smart App Control は対処方法が異なります。まず警告の種類を確認してください。" },
  ko: { label: "Windows 설치 파일이 차단되었나요? 도움말 보기(영어)", note: "Windows는 서명되지 않았거나 생소한 설치 파일에 경고할 수 있습니다. SmartScreen과 Smart App Control은 해결 방법이 다르므로 먼저 경고 종류를 확인하세요." },
};

const MS = {
  sac: "https://support.microsoft.com/en-us/windows/security/threat-malware-protection/smart-app-control-frequently-asked-questions",
  sacOverview: "https://learn.microsoft.com/en-us/windows/apps/develop/smart-app-control/overview",
  signing: "https://learn.microsoft.com/en-us/windows/apps/develop/smart-app-control/code-signing-for-smart-app-control",
  smartscreen: "https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/",
  publish: "https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/publish-first-app",
  extensions: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/common-file-name-extensions-in-windows",
  history: "https://support.microsoft.com/en-us/windows/security/windows-security/protection-history-in-the-windows-security-app",
  security: "https://support.microsoft.com/en-us/windows/security/windows-security/windows-security-app-overview",
};
export const WINDOWS_INSTALL_HELP_REFERENCES = [
  ["Microsoft Support — Smart App Control FAQ", MS.sac],
  ["Microsoft Learn — Smart App Control overview", MS.sacOverview],
  ["Microsoft Learn — Sign your app for Smart App Control", MS.signing],
  ["Microsoft Learn — Microsoft Defender SmartScreen", MS.smartscreen],
  ["Microsoft Learn — Publish your first Windows app: SmartScreen", MS.publish],
  ["Microsoft Support — File name extensions", MS.extensions],
  ["Microsoft Support — Protection History", MS.history],
  ["Microsoft Support — Windows Security", MS.security],
];

export const WINDOWS_INSTALL_HELP_COPY = {
  en: {
    navLabel: "Windows installation help", eyebrow: "Help / Windows installation",
    metaTitle: "Dictivo EXE Blocked on Windows? SmartScreen & Smart App Control Help",
    metaDescription: "Cannot open the Dictivo Windows installer? Identify Edge, SmartScreen, Smart App Control, and missing-file warnings, then follow the right next step.",
    title: "Windows blocked the Dictivo installer: what to do",
    lede: "A download warning and a blocked app are different problems. Match the message below before changing anything.",
    environmentLabel: "Applies to", environment: "Dictivo Windows x64 downloads; Windows 11 and Windows 10. Smart App Control applies to Windows 11. Button names vary with language and Windows version.",
    answerTitle: "Start with the message, not the file icon",
    answer: "If you downloaded from Dictivo and see a reputation-only SmartScreen warning, Windows may offer a choice to continue. Smart App Control is different: it has no per-app exception. Keep protection enabled and contact us if it blocks Dictivo. Do not disable Defender or restore a malware detection just to install the app.",
    answerLinks: [["Official downloads", "/#downloads"], ["Contact Dictivo support", "/contact/"]],
    quickReference: { title: "Which message do you see?", caption: "Choose the matching section. A warning is not a guarantee of either safety or malware.", headers: ["What you see", "Likely layer", "Next step"], rows: [
      ["Not commonly downloaded in Edge", "Download reputation", "Section 2: review the download warning"],
      ["Windows protected your PC / unrecognized app", "SmartScreen", "Section 3: More info, if offered"],
      ["Smart App Control blocked this app", "Windows 11 execution policy", "Section 4: contact us; no per-app allow button"],
      ["File missing, quarantined, or a threat name", "Incomplete download or security detection", "Sections 1 and 5: check the download and Protection History"],
      ["Blocked by your administrator", "Organization policy", "Section 5: ask your IT administrator"],
    ] },
    tocLabel: "Find your next step",
    sections: [
      { kicker: "01 / Check the file", title: "No EXE, or a download that will not open", paragraphs: ["Use dictivo.app, whose Windows download links lead to downloads.dictivo.app. Avoid third-party mirrors. The public Windows package is x64; check the system type if Windows says the app cannot run on your PC."], steps: ["Open the browser’s Downloads list and check whether the download finished or is awaiting a decision.", "In File Explorer, select View → Show → File name extensions. Confirm the full filename ends in .exe or .msi.", "Do not rename a partial download, an HTML page, or a Mac .dmg to .exe. Download the correct file again from the official page if it is incomplete."], links: [["Microsoft: show file extensions", MS.extensions], ["Official downloads", "/#downloads"]] },
      { kicker: "02 / Browser warning", title: "Edge says the file is not commonly downloaded", paragraphs: ["A low-reputation warning is different from a specific malware or unsafe-file detection. Only proceed if you intended to download Dictivo from the official source and accept the remaining uncertainty."], steps: ["Open Downloads in Edge and read the exact warning beside the Dictivo file.", "For the uncommon-download warning only, open the file’s … menu. If offered, choose Keep, then Show more → Keep anyway. Names and menus may vary.", "Wait for the completed file or Open file action. Keeping the download does not override Smart App Control when you launch it."], notes: ["If Edge reports malware, calls the file unsafe, or provides no keep option, stop and send us the message. Do not switch off browser protection."], links: [["Microsoft: download reputation checks", MS.smartscreen]] },
      { kicker: "03 / Launch warning", title: "SmartScreen says Windows protected your PC", steps: ["Confirm the filename matches the installer you deliberately downloaded from Dictivo. Review any publisher information.", "If the message is only an unrecognized-app warning and you choose to continue, select More info, then Run anyway if Windows offers it.", "If Run anyway is absent, or another policy blocks the next step, stop and use the matching section below."], notes: ["Dictivo’s public Windows EXE for version 0.3.57 is not code-signed. An unknown-publisher message does not establish that a file is safe. A signature also does not guarantee that every reputation warning disappears."], links: [["Microsoft: SmartScreen for new apps", MS.publish]] },
      { kicker: "04 / Smart App Control", title: "Smart App Control blocks Dictivo", paragraphs: ["This is not the SmartScreen dialog above. Windows 11 can block unfamiliar, unsigned code when it cannot establish trust. Microsoft currently provides no individual-app exception."], steps: ["Open Windows Security → App & browser control → Smart App Control settings.", "Note whether it shows On, Evaluation, or Off. Leave the setting unchanged.", "Contact support@dictivo.app with the block message and installer version. Ask us for a build that meets Windows trust requirements."], notes: ["The durable fix is a trusted distribution and signing path from us. We do not ask you to disable Smart App Control, reset Windows, edit the registry, or add a Defender exclusion. An MSI, renamed file, or administrator launch is not a fix for SAC trust."], links: [["Microsoft: Smart App Control FAQ", MS.sac], ["Microsoft: signing requirements", MS.signing]] },
      { kicker: "05 / Other blocks", title: "A file disappears, or an administrator blocks it", paragraphs: ["Windows includes its own security protections even if you installed no separate antivirus. A missing file alone does not identify which protection acted."], steps: ["Open Windows Security → Protection history and look for an entry matching the filename and time. Record the detection name if present.", "If there is a malware or quarantine alert, leave the file blocked and contact us. Do not restore it or add an exclusion on our behalf.", "On a work or school PC, ask IT to review an administrator or application-control block. This guide cannot override organization policies."], links: [["Microsoft: Protection History", MS.history], ["Microsoft: Windows Security", MS.security]] },
      { kicker: "06 / Get help", title: "Send the details that identify the block", paragraphs: ["Email support@dictivo.app, or use our contact page. Include:"], bullets: ["The exact warning, or a screenshot cropped to the warning.", "Your Windows version/build, browser, full installer filename, and download page URL.", "Where it fails: saving the download, opening the installer, launching Dictivo, or opening it after an update.", "The SAC state, or a matching Protection History detection, if available."], notes: ["Please omit passwords, license keys, recordings, transcripts, and unrelated personal information. We may request a targeted diagnostic log later; you do not need to send a full system log to start."], links: [["Contact Dictivo support", "/contact/"], ["Email support", "mailto:support@dictivo.app?subject=Windows%20installer%20blocked"]] },
    ],
    dictivo: null, faqTitle: "Common questions", faqs: [
      ["It worked before. Why is it blocked after an update?", "An update changes the files Windows evaluates. Identify the new warning instead of assuming the earlier permission covers this build or every bundled component."],
      ["Should I use the MSI instead?", "The MSI is an alternative installation format, not a bypass for Smart App Control, malware detection, or an administrator policy."],
      ["Does this mean Dictivo is already fixed for SAC?", "No. This guide helps identify the block; it does not change the signature or trust of the installer. If SAC blocks your build, contact us before trying to proceed."],
    ], referencesTitle: "Microsoft guidance",
  },
  zh: {
    navLabel: "Windows 安装帮助", eyebrow: "帮助 / Windows 安装",
    metaTitle: "Dictivo EXE 被 Windows 拦截？SmartScreen 与智能应用控制解决方法",
    metaDescription: "Dictivo Windows 安装包无法打开？区分 Edge 下载提示、SmartScreen、智能应用控制、文件丢失及管理员策略，找到对应的处理方法。",
    title: "Windows 阻止打开 Dictivo 安装包，怎么办？",
    lede: "下载被提醒、安装包被阻止、文件消失，并不是同一个问题。先看提示内容，再选择对应的处理方法。",
    environmentLabel: "适用范围", environment: "Dictivo Windows x64 安装包；Windows 11 与 Windows 10。智能应用控制仅适用于 Windows 11。按钮名称会随系统语言和版本变化。",
    answerTitle: "先确认提示类型，不要只看文件图标",
    answer: "如果确认从 Dictivo 官网下载，且只有 SmartScreen 的应用信誉提示，Windows 可能提供继续运行的选项。智能应用控制（Smart App Control，简称 SAC）不同：目前没有单独放行某个应用的选项。遇到 SAC 拦截，请保留防护并联系我们；不要为了安装 Dictivo 关闭 Defender 或恢复被报为恶意软件的文件。",
    answerLinks: [["官方下载入口", "/zh/#downloads"], ["联系 Dictivo 支持", "/contact/"]],
    quickReference: { title: "你看到的是哪种提示？", caption: "按提示选择下方章节。提示本身既不保证文件安全，也不等于已经确认为病毒。", headers: ["提示或现象", "可能涉及的功能", "下一步"], rows: [
      ["Edge 提示不常见下载", "下载信誉检查", "第 2 节：确认下载提示"],
      ["Windows 已保护你的电脑／无法识别的应用", "SmartScreen", "第 3 节：查看是否有更多信息"],
      ["智能应用控制已阻止此应用", "Windows 11 应用运行策略", "第 4 节：联系我们，没有单应用放行按钮"],
      ["文件消失、被隔离或出现威胁名称", "下载未完成或安全检测", "第 1、5 节：检查下载与保护历史记录"],
      ["管理员已阻止此应用", "组织的管理策略", "第 5 节：联系 IT 管理员"],
    ] },
    tocLabel: "查找处理方法",
    sections: [
      { kicker: "01 / 确认文件", title: "找不到 EXE，或下载文件打不开", paragraphs: ["请从 dictivo.app 下载；官网 Windows 下载链接指向 downloads.dictivo.app。不要使用第三方下载镜像。当前公开的 Windows 安装包为 x64；若提示此应用无法在你的电脑上运行，请核对系统类型。"], steps: ["打开浏览器的下载列表，确认下载已完成，还是仍在等待你处理提示。", "在文件资源管理器中选择「查看 → 显示 → 文件扩展名」，查看完整名称是否以 .exe 或 .msi 结尾。", "不要把未完成的下载、网页文件或 Mac 的 .dmg 改名为 .exe。文件不完整时，请从官方下载页重新下载正确的安装包。"], links: [["微软：显示文件扩展名", MS.extensions], ["官方下载入口", "/zh/#downloads"]] },
      { kicker: "02 / 浏览器提示", title: "Edge 提示安装包不是常见下载", paragraphs: ["下载信誉不足的提示，与明确的恶意软件或不安全文件检测不同。只有在你确实想从官网下载 Dictivo、核对来源并接受剩余不确定性时，才考虑继续。"], steps: ["打开 Edge 下载列表，阅读 Dictivo 文件旁的完整提示。", "仅针对不常见下载提示：打开文件旁的「…」菜单；若提供相应选项，选择「保留」，再按页面提示选择「显示更多 → 仍然保留」。菜单可能因版本不同而变化。", "等到文件下载完成，或出现「打开文件」。保留下载文件并不能绕过运行时的 SAC 拦截。"], notes: ["如果提示病毒、恶意软件、不安全文件，或没有保留选项，请停止并把提示发给我们，不要关闭浏览器防护。"], links: [["微软：下载信誉检查", MS.smartscreen]] },
      { kicker: "03 / 启动提示", title: "SmartScreen 提示 Windows 已保护你的电脑", steps: ["确认提示里的文件名与自己从 Dictivo 官网下载的安装包一致，并查看发布者信息。", "若仅为无法识别应用的信誉提示，且你决定继续，可选择「更多信息」，再选择系统提供的「仍要运行」。", "如果没有「仍要运行」，或下一步出现其他策略拦截，请停止，按对应章节处理。"], notes: ["Dictivo 0.3.57 的公开 Windows EXE 尚未进行代码签名。「未知发布者」不证明文件安全；有签名也不保证所有信誉提示都会消失。"], links: [["微软：新应用与 SmartScreen", MS.publish]] },
      { kicker: "04 / 智能应用控制", title: "SAC 已阻止 Dictivo 运行", paragraphs: ["这不是上面的 SmartScreen 对话框。Windows 11 无法确认应用可信时，可能阻止不熟悉的未签名代码。微软目前没有为单个应用提供放行例外。"], steps: ["打开「Windows 安全中心 → 应用和浏览器控制 → 智能应用控制设置」。", "记下当前是「开启」「评估」还是「关闭」，不要更改设置。", "把拦截提示和安装包版本发给 support@dictivo.app，请我们提供满足 Windows 信任要求的版本。"], notes: ["长期解决办法需要我们完善可信分发与签名。我们不要求你关闭 SAC、重置 Windows、修改注册表或添加 Defender 排除项。换 MSI、改文件名或以管理员身份运行，都不能解决 SAC 的信任问题。"], links: [["微软：智能应用控制常见问题", MS.sac], ["微软：签名要求", MS.signing]] },
      { kicker: "05 / 其他拦截", title: "文件消失、被隔离，或被管理员阻止", paragraphs: ["即使没有安装第三方杀毒软件，Windows 也有内置防护。仅凭文件消失，不能确定是哪项功能进行了处理。"], steps: ["打开「Windows 安全中心 → 保护历史记录」，查找文件名和时间相符的记录；如有威胁名称，请记下。", "如果是恶意软件或隔离提示，请保留拦截并联系我们，不要为了安装本软件恢复文件或添加排除项。", "若使用公司或学校的电脑，遇到管理员或应用控制策略拦截，请由 IT 审核；本指南不能覆盖组织策略。"], links: [["微软：保护历史记录", MS.history], ["微软：Windows 安全中心", MS.security]] },
      { kicker: "06 / 联系支持", title: "把能定位问题的信息发给我们", paragraphs: ["请发邮件至 support@dictivo.app，或通过联系页面找到我们。请提供："], bullets: ["完整提示文字，或仅保留提示区域的截图。", "Windows 版本及内部版本号、浏览器、完整安装包文件名，以及下载页面地址。", "问题发生在保存下载、打开安装包、启动 Dictivo，还是更新后再次启动。", "如能查看，请附上 SAC 当前状态，或对应的保护历史记录及威胁名称。"], notes: ["请不要发送密码、许可证密钥、录音、听写内容或无关个人信息。需要时我们会再索取针对性的诊断日志，首次联系不必发送完整系统日志。"], links: [["联系 Dictivo 支持", "/contact/"], ["发送支持邮件", "mailto:support@dictivo.app?subject=Windows%20installer%20blocked"]] },
    ],
    dictivo: null, faqTitle: "常见问题", faqs: [
      ["之前能用，为什么更新后又被拦截？", "更新会改变 Windows 检查的文件。请先确认这次的完整提示；此前允许过旧版本，不代表新版本及所有附带组件都会被允许。"],
      ["换成 MSI 能解决吗？", "MSI 是另一种安装格式，不能绕过智能应用控制、恶意软件检测或管理员策略。"],
      ["这篇文章是否表示 Dictivo 已解决 SAC 拦截？", "不是。本文帮助识别拦截类型，不会改变安装包本身的签名或可信状态。若 SAC 仍阻止当前版本，请先联系我们。"],
    ], referencesTitle: "微软官方说明",
  },
  de: {
    navLabel: "Windows-Installationshilfe", eyebrow: "Hilfe / Windows-Installation",
    metaTitle: "Dictivo-EXE unter Windows blockiert? SmartScreen- und SAC-Hilfe",
    metaDescription: "Der Dictivo-Installer lässt sich nicht öffnen? Unterscheiden Sie Edge, SmartScreen, Smart App Control und fehlende Dateien und finden Sie den nächsten Schritt.",
    title: "Windows blockiert den Dictivo-Installer: Was tun?",
    lede: "Eine Downloadwarnung und eine blockierte Anwendung haben unterschiedliche Ursachen. Lesen Sie zuerst den genauen Hinweis.",
    environmentLabel: "Gilt für", environment: "Dictivo-Downloads für Windows x64; Windows 11 und Windows 10. Smart App Control gibt es unter Windows 11. Bezeichnungen unterscheiden sich je nach Sprache und Windows-Version.",
    answerTitle: "Entscheidend ist die Meldung, nicht das Dateisymbol",
    answer: "Bei einem bewusst von Dictivo heruntergeladenen Installer kann SmartScreen bei einer reinen Reputationswarnung eine Fortsetzung anbieten. Smart App Control ist anders: Es gibt keine Ausnahme für einzelne Apps. Lassen Sie den Schutz aktiv und kontaktieren Sie uns, wenn er Dictivo blockiert. Schalten Sie Defender nicht ab und stellen Sie keine als Schadsoftware erkannte Datei wieder her, nur um Dictivo zu installieren.",
    answerLinks: [["Offizielle Downloads", "/de/#downloads"], ["Dictivo-Support kontaktieren", "/contact/"]],
    quickReference: { title: "Welche Meldung sehen Sie?", caption: "Wählen Sie den passenden Abschnitt. Eine Warnung allein beweist weder Sicherheit noch Schadsoftware.", headers: ["Meldung oder Symptom", "Mögliche Schutzfunktion", "Nächster Schritt"], rows: [
      ["Edge: nicht häufig heruntergeladen", "Downloadreputation", "Abschnitt 2: Downloadwarnung prüfen"],
      ["Der Computer wurde durch Windows geschützt / unbekannte App", "SmartScreen", "Abschnitt 3: Weitere Informationen, falls angeboten"],
      ["Smart App Control hat die App blockiert", "Ausführungskontrolle in Windows 11", "Abschnitt 4: uns kontaktieren; keine Einzel-Ausnahme"],
      ["Datei fehlt, ist in Quarantäne oder hat einen Bedrohungsnamen", "Unvollständiger Download oder Sicherheitsfund", "Abschnitte 1 und 5: Download und Schutzverlauf prüfen"],
      ["Vom Administrator blockiert", "Organisationsrichtlinie", "Abschnitt 5: IT-Administration kontaktieren"],
    ] },
    tocLabel: "Den nächsten Schritt finden",
    sections: [
      { kicker: "01 / Datei prüfen", title: "Keine EXE, oder der Download lässt sich nicht öffnen", paragraphs: ["Laden Sie Dictivo über dictivo.app herunter. Die Windows-Links führen zu downloads.dictivo.app. Meiden Sie fremde Downloadportale. Das öffentliche Windows-Paket ist für x64; prüfen Sie den Systemtyp, falls Windows die App als nicht ausführbar meldet."], steps: ["Öffnen Sie die Downloadliste im Browser. Prüfen Sie, ob der Download abgeschlossen ist oder auf eine Entscheidung wartet.", "Wählen Sie im Datei-Explorer Ansicht → Anzeigen → Dateinamenerweiterungen. Prüfen Sie den vollständigen Namen auf .exe oder .msi.", "Benennen Sie keinen unvollständigen Download, keine HTML-Seite und keine Mac-Datei mit .dmg in .exe um. Laden Sie eine unvollständige Datei erneut von der offiziellen Seite herunter."], links: [["Microsoft: Dateinamenerweiterungen", MS.extensions], ["Offizielle Downloads", "/de/#downloads"]] },
      { kicker: "02 / Browserwarnung", title: "Edge meldet einen seltenen Download", paragraphs: ["Eine geringe Downloadreputation ist etwas anderes als ein konkreter Schadsoftwarefund oder eine Warnung vor einer unsicheren Datei. Fahren Sie nur fort, wenn Sie Dictivo bewusst von der offiziellen Quelle herunterladen und die verbleibende Unsicherheit akzeptieren."], steps: ["Öffnen Sie die Downloads in Edge und lesen Sie den vollständigen Hinweis zur Dictivo-Datei.", "Nur bei der Warnung vor einem seltenen Download: Öffnen Sie das …-Menü der Datei. Falls angeboten, wählen Sie Beibehalten und anschließend Mehr anzeigen → Trotzdem beibehalten. Bezeichnungen können abweichen.", "Warten Sie auf den abgeschlossenen Download oder Datei öffnen. Das Beibehalten der Datei hebt keine spätere SAC-Sperre auf."], notes: ["Bei einem Schadsoftwarefund, einer als unsicher eingestuften Datei oder fehlender Beibehalten-Option: Stoppen Sie und senden Sie uns die Meldung. Schalten Sie den Browserschutz nicht ab."], links: [["Microsoft: Downloadreputation", MS.smartscreen]] },
      { kicker: "03 / Startwarnung", title: "SmartScreen meldet: Der Computer wurde durch Windows geschützt", steps: ["Prüfen Sie, ob der Dateiname zum bewusst von Dictivo geladenen Installer gehört. Lesen Sie die Herausgeberangabe.", "Handelt es sich nur um eine Warnung vor einer unbekannten App und möchten Sie fortfahren, wählen Sie Weitere Informationen und dann Trotzdem ausführen, falls Windows dies anbietet.", "Fehlt diese Schaltfläche oder erscheint eine weitere Richtliniensperre, stoppen Sie und folgen Sie dem passenden Abschnitt."], notes: ["Die öffentliche Windows-EXE von Dictivo 0.3.57 ist nicht codesigniert. Ein unbekannter Herausgeber belegt keine Sicherheit. Auch eine Signatur verhindert nicht automatisch jede Reputationswarnung."], links: [["Microsoft: SmartScreen bei neuen Apps", MS.publish]] },
      { kicker: "04 / Smart App Control", title: "Smart App Control blockiert Dictivo", paragraphs: ["Das ist nicht der SmartScreen-Dialog aus Abschnitt 3. Windows 11 kann unbekannten, unsignierten Code sperren, wenn es dessen Vertrauenswürdigkeit nicht feststellen kann. Microsoft bietet derzeit keine Ausnahme für einzelne Apps."], steps: ["Öffnen Sie Windows-Sicherheit → App- & Browsersteuerung → Einstellungen für Smart App Control.", "Notieren Sie Ein, Auswertung oder Aus. Ändern Sie die Einstellung nicht.", "Senden Sie die Sperrmeldung und die Installerversion an support@dictivo.app. Bitten Sie uns um eine Version, die die Vertrauensanforderungen von Windows erfüllt."], notes: ["Die dauerhafte Lösung erfordert eine vertrauenswürdige Verteilung und Signierung durch uns. Wir verlangen weder das Abschalten von SAC noch ein Zurücksetzen von Windows, Registry-Eingriffe oder Defender-Ausnahmen. MSI, Umbenennen oder ein Administratorstart beheben kein SAC-Vertrauensproblem."], links: [["Microsoft: Smart App Control FAQ", MS.sac], ["Microsoft: Signaturanforderungen", MS.signing]] },
      { kicker: "05 / Weitere Sperren", title: "Die Datei verschwindet oder wird vom Administrator blockiert", paragraphs: ["Windows enthält eigenen Schutz, auch ohne zusätzlich installiertes Antivirenprogramm. Eine fehlende Datei allein zeigt nicht, welche Funktion eingegriffen hat."], steps: ["Öffnen Sie Windows-Sicherheit → Schutzverlauf. Suchen Sie nach Dateiname und Zeitpunkt und notieren Sie gegebenenfalls den Bedrohungsnamen.", "Bei einem Schadsoftware- oder Quarantänehinweis: Lassen Sie die Datei blockiert und kontaktieren Sie uns. Stellen Sie sie nicht für uns wieder her und legen Sie keine Ausnahme an.", "Auf Firmen- oder Schulgeräten lassen Sie eine Administrator- oder Anwendungskontrollsperre von der IT prüfen. Diese Anleitung hebt Organisationsrichtlinien nicht auf."], links: [["Microsoft: Schutzverlauf", MS.history], ["Microsoft: Windows-Sicherheit", MS.security]] },
      { kicker: "06 / Support", title: "Diese Angaben helfen uns, die Sperre zuzuordnen", paragraphs: ["Schreiben Sie an support@dictivo.app oder nutzen Sie die Kontaktseite. Bitte nennen Sie:"], bullets: ["Den genauen Warntext oder einen auf die Meldung zugeschnittenen Screenshot.", "Windows-Version und Build, Browser, vollständigen Installernamen und die Downloadseite.", "Den betroffenen Schritt: Download speichern, Installer öffnen, Dictivo starten oder Start nach einem Update.", "Falls verfügbar: SAC-Status oder passenden Eintrag im Schutzverlauf mit Bedrohungsname."], notes: ["Senden Sie keine Passwörter, Lizenzschlüssel, Aufnahmen, Diktate oder sonstige private Inhalte. Bei Bedarf bitten wir später um ein gezieltes Diagnoseprotokoll. Für die erste Anfrage ist kein vollständiges Systemprotokoll nötig."], links: [["Dictivo-Support kontaktieren", "/contact/"], ["E-Mail an den Support", "mailto:support@dictivo.app?subject=Windows%20installer%20blocked"]] },
    ],
    dictivo: null, faqTitle: "Häufige Fragen", faqs: [
      ["Warum wird eine zuvor funktionierende App nach einem Update blockiert?", "Ein Update ändert die Dateien, die Windows prüft. Ordnen Sie die neue Meldung zu. Eine frühere Freigabe gilt nicht automatisch für diese Version und alle mitgelieferten Komponenten."],
      ["Hilft der MSI-Installer?", "MSI ist ein alternatives Installationsformat. Es umgeht weder Smart App Control noch Schadsoftwareerkennung oder Administratorrichtlinien."],
      ["Ist damit die SAC-Sperre für Dictivo behoben?", "Nein. Die Anleitung hilft beim Einordnen der Sperre; sie ändert weder Signatur noch Vertrauen des Installers. Kontaktieren Sie uns, wenn SAC Ihre Version blockiert."],
    ], referencesTitle: "Microsoft-Dokumentation",
  },
};
