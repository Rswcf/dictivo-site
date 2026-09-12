// Matches desktop trialCensus.ts. Content-free trial milestones are separate
// from optional usage statistics; failed deliveries may retry.
export const TRIAL_MILESTONE_LASTMOD = "2026-09-12";
export const TRIAL_MILESTONE_COPY = {
  en: {
    usage: "Usage statistics are off unless you enable them in Settings.",
    trial: "Separately from that setting, the Local trial reports two milestones to api.dictivo.app: trial start and the first Local transcript successfully copied or pasted. Reports contain a hashed device identifier, platform, app version, trial-start time and a capability flag; the success report adds its time. Failed deliveries may retry. Neither report contains audio or transcript text.",
    network: "The app may also use the network for update checks, model downloads, licenses, billing, support and optional Cloud Fast. These product operations are separate from uploading Local recordings for transcription.",
  },
  de: {
    usage: "Nutzungsstatistiken bleiben aus, bis du sie in den Einstellungen aktivierst.",
    trial: "Unabhängig davon meldet der Local-Test zwei Meilensteine an api.dictivo.app: den Testbeginn und das erste erfolgreich kopierte oder eingefügte Local-Transkript. Die Meldungen enthalten eine gehashte Gerätekennung, Plattform, App-Version, Testbeginn und eine Kennzeichnung der unterstützten Erfassung; die Erfolgsmeldung ergänzt ihren Zeitpunkt. Fehlgeschlagene Übertragungen können wiederholt werden. Keine Meldung enthält Audio oder Transkripttext.",
    network: "Die App kann außerdem für Updates, Modelldownloads, Lizenzen, Abrechnung, Support und optionales Cloud Fast das Netzwerk nutzen. Diese Produktfunktionen sind vom Hochladen lokaler Aufnahmen zur Transkription getrennt.",
  },
  fr: {
    usage: "Les statistiques d'utilisation restent désactivées tant que vous ne les activez pas dans les Réglages.",
    trial: "Indépendamment de ce réglage, l'essai Local signale deux étapes à api.dictivo.app : son démarrage et la première transcription Local copiée ou collée avec succès. Les rapports contiennent un identifiant d'appareil haché, la plateforme, la version de l'app, l'heure de début de l'essai et un indicateur de prise en charge du suivi ; le rapport de réussite ajoute son heure. Les envois échoués peuvent être réessayés. Aucun rapport ne contient d'audio ni de texte transcrit.",
    network: "L'app peut aussi utiliser le réseau pour les mises à jour, téléchargements de modèles, licences, paiements, support et Cloud Fast en option. Ces opérations sont distinctes de l'envoi d'enregistrements Local pour transcription.",
  },
  es: {
    usage: "Las estadísticas de uso permanecen desactivadas hasta que las actives en Ajustes.",
    trial: "Con independencia de ese ajuste, la prueba Local comunica dos hitos a api.dictivo.app: el inicio y la primera transcripción Local copiada o pegada correctamente. Los informes incluyen un identificador de dispositivo con hash, plataforma, versión de la app, hora de inicio de la prueba y un indicador de compatibilidad con esta medición; el informe de éxito añade su hora. Los envíos fallidos pueden reintentarse. Ningún informe contiene audio ni texto transcrito.",
    network: "La app también puede usar la red para actualizaciones, descargas de modelos, licencias, pagos, soporte y Cloud Fast opcional. Estas operaciones son distintas de subir grabaciones Local para transcribirlas.",
  },
  it: {
    usage: "Le statistiche d'uso restano disattivate finché non le attivi nelle Impostazioni.",
    trial: "Indipendentemente da questa impostazione, la prova Local segnala due eventi a api.dictivo.app: l'avvio e la prima trascrizione Local copiata o incollata correttamente. I rapporti contengono un identificatore del dispositivo sottoposto a hash, piattaforma, versione dell'app, ora di avvio della prova e un indicatore di supporto alla misurazione; il rapporto di successo aggiunge la propria ora. Gli invii non riusciti possono essere ritentati. Nessun rapporto contiene audio o testo trascritto.",
    network: "L'app può anche usare la rete per aggiornamenti, download dei modelli, licenze, pagamenti, assistenza e Cloud Fast opzionale. Queste operazioni sono distinte dal caricamento di registrazioni Local per la trascrizione.",
  },
  nl: {
    usage: "Gebruiksstatistieken blijven uit totdat je ze in Instellingen aanzet.",
    trial: "Los van die instelling meldt de Local-proefperiode twee mijlpalen aan api.dictivo.app: de start en het eerste succesvol gekopieerde of geplakte Local-transcript. De meldingen bevatten een gehashte apparaat-ID, platform, appversie, starttijd van de proefperiode en een aanduiding dat deze meting wordt ondersteund; de succesmelding voegt het eigen tijdstip toe. Mislukte verzendingen kunnen opnieuw worden geprobeerd. Geen melding bevat audio of transcripttekst.",
    network: "De app kan ook het netwerk gebruiken voor updates, modeldownloads, licenties, betalingen, support en optionele Cloud Fast. Deze acties staan los van het uploaden van Local-opnames voor transcriptie.",
  },
  pt: {
    usage: "As estatísticas de uso ficam desligadas até você ativá-las em Configurações.",
    trial: "Independentemente dessa configuração, o teste Local informa dois marcos a api.dictivo.app: o início e a primeira transcrição Local copiada ou colada com sucesso. Os relatórios contêm um identificador de dispositivo com hash, plataforma, versão do app, hora de início do teste e um indicador de suporte à medição; o relatório de sucesso acrescenta sua hora. Envios que falham podem ser repetidos. Nenhum relatório contém áudio ou texto transcrito.",
    network: "O app também pode usar a rede para atualizações, downloads de modelos, licenças, pagamentos, suporte e Cloud Fast opcional. Essas operações são distintas do envio de gravações Local para transcrição.",
  },
  zh: {
    usage: "使用统计默认关闭，只有你在设置中开启后才发送。",
    trial: "独立于该设置，Local 试用会向 api.dictivo.app 上报两个里程碑：开始试用，以及首次成功复制或粘贴 Local 转录结果。上报包含设备标识的哈希值、平台、应用版本、试用开始时间和是否支持该统计的标记；成功上报还包含成功时间。发送失败可能重试。两类上报均不包含音频或转录文本。",
    network: "应用还可能为更新检查、模型下载、许可证、账单、支持服务和可选 Cloud Fast 使用网络。这些产品操作与上传 Local 录音进行转写是不同的用途。",
  },
  ja: {
    usage: "使用統計は、設定で有効にするまで送信されません。",
    trial: "この設定とは別に、Local トライアルは開始時と、Local の文字起こし結果を初めて正常にコピーまたは貼り付けた時の2段階を api.dictivo.app に報告します。報告にはハッシュ化されたデバイス識別子、プラットフォーム、アプリ版、試用開始時刻、この計測への対応フラグが含まれ、成功報告には成功時刻も含まれます。送信に失敗すると再試行する場合があります。どちらも音声や文字起こしテキストは含みません。",
    network: "更新確認、モデルダウンロード、ライセンス、請求、サポート、任意の Cloud Fast にもネットワークを使う場合があります。これらの製品操作は、Local 録音を文字起こしのためにアップロードすることとは別です。",
  },
  ko: {
    usage: "사용 통계는 설정에서 켜기 전까지 전송되지 않습니다.",
    trial: "이 설정과 별도로 Local 체험은 시작 시점과 Local 전사 결과를 처음 성공적으로 복사하거나 붙여넣은 시점을 api.dictivo.app에 보고합니다. 보고에는 해시 처리한 기기 식별자, 플랫폼, 앱 버전, 체험 시작 시각, 해당 측정 지원 여부가 포함되며 성공 보고에는 성공 시각도 추가됩니다. 전송이 실패하면 재시도할 수 있습니다. 어느 보고에도 오디오나 전사 텍스트는 포함되지 않습니다.",
    network: "앱은 업데이트 확인, 모델 다운로드, 라이선스, 결제, 지원, 선택형 Cloud Fast에도 네트워크를 사용할 수 있습니다. 이 제품 작업은 Local 녹음을 전사를 위해 업로드하는 것과 다릅니다.",
  },
};

export function trialNetworkCopy(locale) {
  const copy = TRIAL_MILESTONE_COPY[locale];
  if (!copy) throw new Error(`Missing trial milestone copy: ${locale}`);
  return `${copy.network} ${copy.usage} ${copy.trial}`;
}
