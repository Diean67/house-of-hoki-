import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next, useTranslation } from 'react-i18next'
import './styles.css'

const copy = {
  en: {
    nav: ['Sessions', 'Activities', 'Programs', 'Resources', 'About'],
    book: 'Book a session',
    heroBrand: 'House of Hoki',
    eyebrow: 'Well-being · personal growth · community',
    titleA: 'A place to arrive.',
    titleB: 'Space to become.',
    intro: 'House of Hoki brings thoughtful private sessions, shared activities and community programs together under one calm roof — online, near Heidelberg and soon in Yerevan.',
    orient: 'Free 15-min orientation',
    explore: 'Explore what we offer',
    sectionKicker: 'Two ways to begin',
    sectionTitle: 'Personal space. Shared experience.',
    sectionIntro: 'Choose the setting that feels right today. Every request is reviewed by Sarah, with time to understand what you need before anything is confirmed.',
    privateTitle: 'Private sessions',
    privateText: 'Focused, one-to-one space shaped around your goals, preferred format and pace.',
    groupTitle: 'Group activities',
    groupText: 'Guided circles and workshops created for reflection, connection and practical growth.',
    from: 'Starting from',
    estimate: 'Get a personal estimate',
    seeActivities: 'See upcoming activities',
    programsKicker: 'One house, several doors',
    programsTitle: 'Programs that grow with their communities.',
    commonText: 'A free Armenia-based community pilot for people aged 18–45, beginning with a facilitated discussion circle.',
    youthText: 'Coming-soon programs for ages 16–29, shaped locally for Germany and Armenia.',
    apply: 'Apply to the pilot',
    interest: 'Register interest',
    processKicker: 'A thoughtful first step',
    processTitle: 'Explore first. Share only when ready.',
    steps: [
      ['1', 'Explore anonymously', 'Answer a few practical questions. No name, email or sensitive history required.'],
      ['2', 'Receive a clear estimate', 'See a suggested format, duration and transparent price range.'],
      ['3', 'Request your time', 'Share minimal contact details only when you decide to continue.']
    ],
    quote: '“Hoki” means spirit — the part of us that seeks meaning, connection and room to grow.',
    locationTitle: 'Rooted in two places.',
    heidelberg: 'Near Heidelberg',
    yerevan: 'Yerevan · coming soon',
    online: 'Online · wherever you are',
    faqTitle: 'Questions, answered gently.',
    faq: [
      ['What happens in a first session?', 'The first meeting is a chance to talk about what brings you here, ask questions and consider a helpful next step. You do not need to arrive with everything clearly defined.'],
      ['How do I know if this is the right fit?', 'Feeling safe and understood matters. Use the orientation call or first session to notice whether Sarah’s approach, pace and format feel comfortable.'],
      ['What if I do not know what to say?', 'That is completely okay. Gentle questions can help you begin, and you can share only what feels relevant.'],
      ['How long might support take?', 'It depends on your goals, circumstances and preferred pace. Sarah will discuss a starting plan with you and revisit it together.'],
      ['Is House of Hoki an emergency service?', 'No. If you or someone else is in immediate danger, contact local emergency services or use the verified urgent-support links on this website.']
    ],
    footer: 'A space to connect, reflect and grow.',
    estimateTitle: 'Find your starting point',
    estimateIntro: 'This short guide is anonymous. It creates a practical estimate, not a diagnosis.',
    needsTitle: 'What would make this session useful?',
    needsIntro: 'Share only what feels necessary. Avoid names, diagnoses, or other identifying details.',
    needsPlaceholder: 'For example: I would like support with a transition, prefer a calm pace, and want practical next steps…',
    aiTitle: 'Preparing your session estimate',
    aiIntro: 'An AI-assisted planning step reviews your preferences to suggest a duration and price range. It does not diagnose or replace Sarah’s review.',
    analyze: 'Create my estimate',
    paymentTitle: 'Preferred payment method',
    paymentIntro: 'Choose a preference now. Payment is requested only after Sarah confirms the session and final price.',
    paypal: 'PayPal', visa: 'Visa / card', payLater: 'Choose later',
    bookingKicker: 'Private by design', bookingTitle: 'Plan your session.', bookingIntro: 'Ten structured questions create consistent planning guidance. This prototype keeps answers in this browser and sends nothing externally.',
    answerHint: 'Choose the answer that feels closest. There is no right or wrong response.',
    next: 'Next', back: 'Back', request: 'Continue to request', close: 'Close',
  },
  de: {
    nav: ['Sitzungen', 'Aktivitäten', 'Programme', 'Ressourcen', 'Über uns'], book: 'Sitzung buchen',
    heroBrand: 'House of Hoki', eyebrow: 'Wohlbefinden · persönliches Wachstum · Gemeinschaft', titleA: 'Ein Ort zum Ankommen.', titleB: 'Raum zum Wachsen.',
    intro: 'House of Hoki vereint persönliche Sitzungen, gemeinsame Aktivitäten und Community-Programme unter einem ruhigen Dach — online, bei Heidelberg und bald in Jerewan.',
    orient: 'Kostenlose 15-Min.-Orientierung', explore: 'Angebot entdecken', sectionKicker: 'Zwei Wege zum Anfang', sectionTitle: 'Persönlicher Raum. Gemeinsames Erleben.',
    sectionIntro: 'Wähle den Rahmen, der heute zu dir passt. Sarah prüft jede Anfrage persönlich, bevor etwas bestätigt wird.',
    privateTitle: 'Private Sitzungen', privateText: 'Ein fokussierter Raum, abgestimmt auf deine Ziele, dein Format und dein Tempo.', groupTitle: 'Gruppenaktivitäten', groupText: 'Begleitete Kreise und Workshops für Reflexion, Verbindung und praktisches Wachstum.',
    from: 'Ab', estimate: 'Persönliche Einschätzung', seeActivities: 'Aktivitäten ansehen', programsKicker: 'Ein Haus, mehrere Türen', programsTitle: 'Programme, die mit ihrer Gemeinschaft wachsen.',
    commonText: 'Ein kostenloses Community-Pilotprojekt in Armenien für 18- bis 45-Jährige, beginnend mit einem moderierten Gesprächskreis.', youthText: 'Programme für 16- bis 29-Jährige in Deutschland und Armenien — demnächst.', apply: 'Für Pilot bewerben', interest: 'Interesse anmelden',
    processKicker: 'Ein achtsamer erster Schritt', processTitle: 'Erst erkunden. Teilen, wenn du bereit bist.', steps: [['1','Anonym erkunden','Beantworte praktische Fragen — ohne Namen, E-Mail oder sensible Vorgeschichte.'],['2','Klare Einschätzung erhalten','Sieh Format, Dauer und eine transparente Preisspanne.'],['3','Termin anfragen','Teile Kontaktdaten erst, wenn du fortfahren möchtest.']],
    quote: '„Hoki“ bedeutet Geist — der Teil in uns, der Sinn, Verbindung und Raum zum Wachsen sucht.', locationTitle: 'In zwei Orten verwurzelt.', heidelberg: 'Bei Heidelberg', yerevan: 'Jerewan · demnächst', online: 'Online · wo du bist', faqTitle: 'Fragen, behutsam beantwortet.',
    faq: [['Was passiert in einer ersten Sitzung?','Das erste Gespräch bietet Raum, dein Anliegen zu schildern, Fragen zu stellen und einen hilfreichen nächsten Schritt zu finden. Du musst noch nicht alles klar benennen können.'],['Woran merke ich, ob es zwischenmenschlich passt?','Sich sicher und verstanden zu fühlen, ist wichtig. Nutze das Orientierungsgespräch oder die erste Sitzung, um Sarahs Arbeitsweise, Tempo und Format kennenzulernen.'],['Was, wenn ich nicht weiß, was ich sagen soll?','Das ist völlig in Ordnung. Behutsame Fragen können den Anfang erleichtern, und du teilst nur, was sich relevant anfühlt.'],['Wie lange kann eine Begleitung dauern?','Das hängt von deinen Zielen, deiner Situation und deinem Tempo ab. Sarah bespricht mit dir einen ersten Plan und passt ihn gemeinsam mit dir an.'],['Ist House of Hoki ein Notfalldienst?','Nein. Bei unmittelbarer Gefahr kontaktiere den örtlichen Notruf oder nutze die geprüften Akuthilfe-Links auf dieser Website.']],
    footer: 'Ein Raum für Verbindung, Reflexion und Wachstum.', estimateTitle: 'Finde deinen Ausgangspunkt', estimateIntro: 'Dieser kurze Weg ist anonym und keine Diagnose.',
    needsTitle: 'Was würde diese Sitzung hilfreich machen?', needsIntro: 'Teile nur das Nötige. Bitte keine Namen, Diagnosen oder identifizierenden Details.', needsPlaceholder: 'Zum Beispiel: Ich wünsche mir Unterstützung bei einer Veränderung, ein ruhiges Tempo und praktische nächste Schritte …',
    aiTitle: 'Deine Einschätzung wird vorbereitet', aiIntro: 'Eine KI-gestützte Planung schlägt Dauer und Preisspanne vor. Sie stellt keine Diagnose und ersetzt Sarahs Prüfung nicht.', analyze: 'Einschätzung erstellen',
    paymentTitle: 'Bevorzugte Zahlungsart', paymentIntro: 'Wähle jetzt eine Präferenz. Bezahlt wird erst nach Sarahs Bestätigung von Termin und Endpreis.', paypal: 'PayPal', visa: 'Visa / Karte', payLater: 'Später wählen',
    bookingKicker: 'Vertraulich gestaltet', bookingTitle: 'Plane deine Sitzung.', bookingIntro: 'Zehn strukturierte Fragen schaffen eine einheitliche Planungsgrundlage. Dieser Prototyp speichert die Antworten nur in diesem Browser und sendet nichts nach außen.',
    answerHint: 'Wähle die Antwort, die am ehesten passt. Es gibt keine richtige oder falsche Antwort.',
    next: 'Weiter', back: 'Zurück', request: 'Anfrage fortsetzen', close: 'Schließen'
  },
  hy: {
    nav: ['Անհատական', 'Խմբային', 'Ծրագրեր', 'Նյութեր', 'Մեր մասին'], book: 'Ամրագրել հանդիպում',
    heroBrand: 'House of Hoki', eyebrow: 'Բարեկեցություն · անձնական աճ · համայնք', titleA: 'Վայր՝ կանգ առնելու։', titleB: 'Տարածք՝ դառնալու։',
    intro: 'House of Hoki-ն միավորում է անհատական հանդիպումները, խմբային գործունեությունն ու համայնքային ծրագրերը՝ առցանց, Հայդելբերգի մոտ և շուտով Երևանում։',
    orient: 'Անվճար 15 րոպե ծանոթացում', explore: 'Բացահայտել առաջարկները', sectionKicker: 'Սկսելու երկու ճանապարհ', sectionTitle: 'Անձնական տարածք։ Ընդհանուր փորձառություն։',
    sectionIntro: 'Ընտրեք այն միջավայրը, որը հիմա ձեզ հարմար է։ Սառան անձամբ դիտարկում է յուրաքանչյուր հարցում։', privateTitle: 'Անհատական հանդիպումներ', privateText: 'Կենտրոնացված անհատական տարածք՝ ձեր նպատակներին ու տեմպին համապատասխան։', groupTitle: 'Խմբային գործունեություն', groupText: 'Ուղղորդված շրջաններ և աշխատարաններ՝ մտորելու, կապվելու և աճելու համար։',
    from: 'Սկսած', estimate: 'Ստանալ գնահատում', seeActivities: 'Դիտել միջոցառումները', programsKicker: 'Մեկ տուն, մի քանի դուռ', programsTitle: 'Ծրագրեր, որոնք աճում են իրենց համայնքների հետ։',
    commonText: 'Անվճար համայնքային փորձնական ծրագիր Հայաստանում՝ 18–45 տարեկանների համար, որը սկսվում է քննարկման շրջանակից։', youthText: 'Շուտով՝ ծրագրեր 16–29 տարեկանների համար՝ Գերմանիայում և Հայաստանում։', apply: 'Դիմել փորձնական ծրագրին', interest: 'Գրանցել հետաքրքրությունը',
    processKicker: 'Խոհուն առաջին քայլ', processTitle: 'Նախ ուսումնասիրեք։ Կիսվեք՝ երբ պատրաստ լինեք։', steps: [['1','Ուսումնասիրել անանուն','Պատասխանեք մի քանի գործնական հարցի՝ առանց անվան կամ զգայուն պատմության։'],['2','Ստանալ հստակ գնահատում','Տեսեք առաջարկվող ձևաչափը, տևողությունն ու գնի միջակայքը։'],['3','Հարցում ուղարկել','Կիսվեք նվազագույն տվյալներով միայն շարունակելու դեպքում։']],
    quote: '«Հոգի»-ն մեր այն մասն է, որը փնտրում է իմաստ, կապ և աճելու տարածք։', locationTitle: 'Արմատավորված երկու վայրում։', heidelberg: 'Հայդելբերգի մոտ', yerevan: 'Երևան · շուտով', online: 'Առցանց · որտեղ էլ լինեք', faqTitle: 'Հարցեր՝ մեղմ պատասխաններով։',
    faq: [['Ի՞նչ է տեղի ունենում առաջին հանդիպման ընթացքում։','Առաջին զրույցը հնարավորություն է պատմելու, թե ինչն է ձեզ այստեղ բերել, հարցեր տալու և օգտակար հաջորդ քայլը միասին գտնելու։ Պարտադիր չէ ամեն ինչ նախապես հստակ ձևակերպել։'],['Ինչպե՞ս իմանամ, որ այս մոտեցումն ինձ հարմար է։','Անվտանգ և հասկացված զգալը կարևոր է։ Ծանոթացման զանգը կամ առաջին հանդիպումը կարող է օգնել հասկանալ՝ արդյոք Սառայի մոտեցումը, տեմպն ու ձևաչափը հարմար են ձեզ։'],['Ի՞նչ անել, եթե չգիտեմ՝ ինչ ասել։','Դա լիովին բնական է։ Մեղմ հարցերը կարող են օգնել սկսել, իսկ դուք կարող եք կիսվել միայն նրանով, ինչն անհրաժեշտ եք համարում։'],['Որքա՞ն կարող է տևել աջակցությունը։','Դա կախված է ձեր նպատակներից, իրավիճակից և նախընտրելի տեմպից։ Սառան ձեզ հետ կքննարկի մեկնարկային պլանը և անհրաժեշտության դեպքում միասին կվերանայի այն։'],['House of Hoki-ն շտապ օգնության ծառայությո՞ւն է։','Ոչ։ Անմիջական վտանգի դեպքում դիմեք տեղական շտապ ծառայությանը կամ օգտվեք կայքի ստուգված շտապ աջակցության հղումներից։']],
    footer: 'Տարածք՝ կապվելու, խորհելու և աճելու համար։', estimateTitle: 'Գտեք ձեր մեկնարկային կետը', estimateIntro: 'Այս կարճ ուղեցույցը անանուն է և ախտորոշում չէ։',
    needsTitle: 'Ի՞նչը օգտակար կդարձնի այս հանդիպումը։', needsIntro: 'Կիսվեք միայն անհրաժեշտով՝ առանց անունների, ախտորոշումների կամ նույնականացնող տվյալների։', needsPlaceholder: 'Օրինակ՝ ցանկանում եմ աջակցություն փոփոխության ընթացքում, հանգիստ ընթացք և գործնական հաջորդ քայլեր…',
    aiTitle: 'Պատրաստում ենք ձեր գնահատումը', aiIntro: 'ԱԲ-ի օգնությամբ պլանավորումը առաջարկում է տևողություն և գնի միջակայք։ Այն ախտորոշում չէ և չի փոխարինում Սառայի դիտարկմանը։', analyze: 'Ստեղծել գնահատումը',
    paymentTitle: 'Նախընտրելի վճարման եղանակ', paymentIntro: 'Այժմ նշեք նախընտրությունը։ Վճարումը կատարվում է միայն հանդիպման և վերջնական գնի հաստատումից հետո։', paypal: 'PayPal', visa: 'Visa / քարտ', payLater: 'Ընտրել հետո',
    bookingKicker: 'Գաղտնիությունը՝ առաջնային', bookingTitle: 'Պլանավորեք ձեր հանդիպումը։', bookingIntro: 'Տասը կառուցվածքային հարցերը ստեղծում են հետևողական պլանավորման հիմք։ Այս նախատիպը պատասխանները պահում է միայն այս դիտարկիչում և արտաքին համակարգերին ոչինչ չի ուղարկում։',
    answerHint: 'Ընտրեք ձեզ առավել համապատասխան պատասխանը։ Ճիշտ կամ սխալ պատասխան չկա։',
    next: 'Հաջորդը', back: 'Հետ', request: 'Շարունակել հարցումը', close: 'Փակել'
  }
}

const extraCopy = {
  en: {
    language:'Language', region:'Region', chooseRegion:'Choose region', regions:{de:'Germany',am:'Armenia'}, placeholderWordmark:'Placeholder wordmark',
    cookieBanner:{title:'Your privacy choices',text:'We use necessary cookies to operate this website. With your consent, a preference cookie remembers your chosen language. Analytics and marketing cookies are currently disabled.',customize:'Manage choices',reject:'Reject optional cookies',accept:'Accept preferences',settingsTitle:'Cookie preferences',necessary:'Necessary cookies',necessaryText:'Required for your consent choice and core website operation. Always active.',preferenceCategory:'Language preference',preferenceText:'Remembers the language you select on this device.',save:'Save choices',policy:'Read our cookie notice'},
    trust:['English · German · Armenian','Online & in person','Private by design'], reflectionKicker:'Everyday psychology', reflectionTitle:'The questions beneath the surface.', reflectionIntro:'You do not need the perfect words before you begin. Sometimes a small, honest question is enough to open a new direction.', reflectionQuestions:['Why do I keep overthinking the same things?','How can I set boundaries without feeling guilty?','Why do I feel overwhelmed when everything looks fine?','Can talking help me change old patterns?','How do I become kinder to myself?','What would feeling more like myself look like?'], therapyImageAlt:'A therapist and a client having a calm conversation in a welcoming room', per60:'/ 60 min', free:'Free', pilotActivities:'Pilot activities', statuses:['Pilot · Armenia','Germany · coming soon','Armenia · coming soon'],
    locationDetails:['Private sessions · weekdays','Programs · community · sessions','English · German · Armenian'], ctaKicker:'Your first step can be small',
    booking:{optionalDomain:'Additional context · optional',optionalTitle:'Anything else you would like Sarah to know?',optionalHelp:'Your wording will appear unchanged in the professional-only report. Do not include names or details about other people.',optionalLabel:'Optional description',model:'Client Context Model',analysisTitle:'Preparing consistent booking guidance',analysisText:'The production LLM will receive coded answers and return a fixed-schema professional report. This prototype processes everything locally.',professionalOnly:'Professional only',professionalOnlyText:'The internal summary is not displayed to the customer. The customer sees only suggested format, duration and price.',guidance:'Your booking guidance',resultTitle:'A suggested starting point',suggestedFormat:'Suggested format',suggestedDuration:'Suggested duration',estimatedRange:'Estimated range',resultNote:'Sarah reviews the internal profile and confirms all details. This is not a diagnosis or automated professional decision.',preparing:'Preparing…',prepare:'Prepare guidance',minutes:'{{count}} minutes',settings:{private:'Private',group:'Small group',either:'Private or small group'}},
    details:{orientation:'Ask for a 15-min orientation',expect:'What to expect',clear:'Clear information before commitment.',expectA:'Begin anonymously with a short questionnaire. The planning estimate helps identify a suitable starting format, duration and transparent price range.',expectB:'Sarah reviews every request. A time, session plan and final price are confirmed before any payment is requested.'},
    listing:{sessionsTitle:'Sessions made personal.',activitiesTitle:'Activities made to connect.',sessionsIntro:'Begin with an individual page that explains the format, range and next step.',activitiesIntro:'Explore current pilots and the group formats planned for the House of Hoki community.',private:'Private session',privateMeta:'Individual · couple · family',discussion:'Discussion circle',discussionMeta:'Common Club pilot · Yerevan',community:'Community activities',communityMeta:'More formats will follow the pilot.',explore:'Explore →',programsKicker:'One house · several doors',programsTitle:'Programs with their own purpose.',open:'Open program →'},
    orientationPage:{kicker:'Free · 15 minutes',title:'Start with a short conversation.',intro:'Request a normal call or WhatsApp orientation. Sarah reviews each request before confirming a time.',email:'Request by email',other:'Other contact options',facts:[['Length','15 minutes'],['Cost','Free'],['Confirmation','Sarah approves']]},
    contactPage:{kicker:'Contact',title:'Choose what feels comfortable.',intro:'Business email is available now. Separate German and Armenian WhatsApp, phone and Telegram details will be added after verification.',germany:'Germany',germanyText:'WhatsApp + phone · coming soon',armenia:'Armenia',armeniaText:'WhatsApp + phone + Telegram · coming soon'},
    crisis:{title:'Need urgent support?',text:'House of Hoki is not an emergency service. If you or someone else is in immediate danger, contact local emergency services.',link:'View verified support contacts →'},
    emergency:{kicker:'Immediate support',title:'You do not have to handle a crisis alone.',intro:'These external services are independent from House of Hoki. Availability can change; use the linked official source for current details.',cards:[['Germany · immediate danger','Call 112','Official German guidance ↗'],['Germany · emotional crisis','Call 116 123','TelefonSeelsorge ↗'],['Armenia · immediate danger','Call 112','Armenian Ministry of Internal Affairs ↗'],['Yerevan · emotional support','0800 00 900','Yerevan Municipality information ↗']]},
    pages:{about:['About','A home for thoughtful growth.','House of Hoki is developing as an umbrella platform for private sessions, shared activities and independently owned community programs.','Sarah’s final professional title, biography and qualifications will be published only after they are confirmed.'],resources:['Resources','Useful ideas, carefully shared.','Articles, frequently asked questions and practical well-being resources will be added after editorial and professional review.'],privacy:['Legal draft','Privacy notice','This page is a structural placeholder. A GDPR-reviewed privacy notice must be completed before collecting booking, questionnaire, analytics or payment data.'],cookies:['Legal draft','Cookie preferences','Necessary cookies store your consent choice. With permission, one preference cookie remembers your selected language. Analytics and marketing cookies are currently disabled.'],imprint:['Legal draft','Imprint','Responsible entity, address, contact information and professional/legal disclosures must be supplied before public launch.']},
    footerLinks:['Services','Programs','Resources','Contact'], legalLinks:['Privacy','Cookies','Imprint'], ageNote:'18+ general services'
  },
  de: {
    language:'Sprache', region:'Region', chooseRegion:'Region wählen', regions:{de:'Deutschland',am:'Armenien'}, placeholderWordmark:'Vorläufige Wortmarke', trust:['Englisch · Deutsch · Armenisch','Online & vor Ort','Vertraulich gestaltet'], reflectionKicker:'Psychologie im Alltag', reflectionTitle:'Die Fragen unter der Oberfläche.', reflectionIntro:'Du brauchst nicht die perfekten Worte, um zu beginnen. Manchmal öffnet schon eine kleine, ehrliche Frage eine neue Richtung.', reflectionQuestions:['Warum denke ich immer wieder über dieselben Dinge nach?','Wie kann ich Grenzen setzen, ohne mich schuldig zu fühlen?','Warum bin ich überfordert, obwohl alles in Ordnung wirkt?','Kann ein Gespräch helfen, alte Muster zu verändern?','Wie kann ich freundlicher mit mir selbst werden?','Wie würde es sich anfühlen, wieder mehr ich selbst zu sein?'], therapyImageAlt:'Eine Therapeutin und eine Klientin in einem ruhigen Gespräch in einem einladenden Raum', per60:'/ 60 Min.', free:'Kostenlos', pilotActivities:'Pilotaktivitäten', statuses:['Pilot · Armenien','Deutschland · demnächst','Armenien · demnächst'], locationDetails:['Private Sitzungen · werktags','Programme · Gemeinschaft · Sitzungen','Englisch · Deutsch · Armenisch'], ctaKicker:'Der erste Schritt darf klein sein',
    cookieBanner:{title:'Deine Datenschutzauswahl',text:'Wir verwenden notwendige Cookies für den Betrieb der Website. Mit deiner Einwilligung speichert ein Präferenz-Cookie deine gewählte Sprache. Analyse- und Marketing-Cookies sind derzeit deaktiviert.',customize:'Auswahl verwalten',reject:'Optionale Cookies ablehnen',accept:'Präferenzen akzeptieren',settingsTitle:'Cookie-Einstellungen',necessary:'Notwendige Cookies',necessaryText:'Erforderlich für deine Einwilligungswahl und den Betrieb der Website. Immer aktiv.',preferenceCategory:'Spracheinstellung',preferenceText:'Speichert die von dir gewählte Sprache auf diesem Gerät.',save:'Auswahl speichern',policy:'Cookie-Hinweis lesen'},
    booking:{optionalDomain:'Zusätzlicher Kontext · optional',optionalTitle:'Möchtest du Sarah noch etwas mitteilen?',optionalHelp:'Deine Formulierung erscheint unverändert im Bericht nur für die Fachperson. Bitte nenne keine Namen oder Details über andere Personen.',optionalLabel:'Optionale Beschreibung',model:'Klientenkontext-Modell',analysisTitle:'Einheitliche Buchungsempfehlung wird vorbereitet',analysisText:'Das spätere Sprachmodell erhält codierte Antworten und liefert einen Fachbericht nach festem Schema. Dieser Prototyp verarbeitet alles lokal.',professionalOnly:'Nur für die Fachperson',professionalOnlyText:'Die interne Zusammenfassung wird Kunden nicht angezeigt. Sie sehen nur Format, Dauer und Preis.',guidance:'Deine Buchungsempfehlung',resultTitle:'Ein möglicher Ausgangspunkt',suggestedFormat:'Empfohlenes Format',suggestedDuration:'Empfohlene Dauer',estimatedRange:'Geschätzte Preisspanne',resultNote:'Sarah prüft das interne Profil und bestätigt alle Details. Dies ist weder eine Diagnose noch eine automatisierte fachliche Entscheidung.',preparing:'Wird vorbereitet …',prepare:'Empfehlung erstellen',minutes:'{{count}} Minuten',settings:{private:'Privat',group:'Kleine Gruppe',either:'Privat oder kleine Gruppe'}},
    details:{orientation:'15-Min.-Orientierung anfragen',expect:'Was dich erwartet',clear:'Klare Informationen vor der Entscheidung.',expectA:'Beginne anonym mit einem kurzen Fragebogen. Die Planungshilfe schlägt Format, Dauer und eine transparente Preisspanne vor.',expectB:'Sarah prüft jede Anfrage. Termin, Sitzungsplan und Endpreis werden vor jeder Zahlung bestätigt.'},
    listing:{sessionsTitle:'Sitzungen, persönlich gestaltet.',activitiesTitle:'Aktivitäten, die verbinden.',sessionsIntro:'Jede Leistung hat eine eigene Seite mit Format, Preisspanne und nächstem Schritt.',activitiesIntro:'Entdecke aktuelle Pilotprojekte und geplante Gruppenformate.',private:'Private Sitzung',privateMeta:'Einzelperson · Paar · Familie',discussion:'Gesprächskreis',discussionMeta:'Common-Club-Pilot · Jerewan',community:'Community-Aktivitäten',communityMeta:'Weitere Formate folgen nach dem Pilotprojekt.',explore:'Entdecken →',programsKicker:'Ein Haus · mehrere Türen',programsTitle:'Programme mit eigenem Ziel.',open:'Programm öffnen →'},
    orientationPage:{kicker:'Kostenlos · 15 Minuten',title:'Beginne mit einem kurzen Gespräch.',intro:'Bitte um ein normales Telefonat oder eine WhatsApp-Orientierung. Sarah bestätigt den Termin persönlich.',email:'Per E-Mail anfragen',other:'Weitere Kontaktwege',facts:[['Dauer','15 Minuten'],['Kosten','Kostenlos'],['Bestätigung','Durch Sarah']]},
    contactPage:{kicker:'Kontakt',title:'Wähle, was sich angenehm anfühlt.',intro:'Die geschäftliche E-Mail ist bereits verfügbar. Deutsche und armenische WhatsApp-, Telefon- und Telegram-Kontakte folgen nach Prüfung.',germany:'Deutschland',germanyText:'WhatsApp + Telefon · demnächst',armenia:'Armenien',armeniaText:'WhatsApp + Telefon + Telegram · demnächst'},
    crisis:{title:'Brauchst du dringend Unterstützung?',text:'House of Hoki ist kein Notfalldienst. Bei unmittelbarer Gefahr wende dich an den örtlichen Notruf.',link:'Geprüfte Hilfskontakte anzeigen →'},
    emergency:{kicker:'Soforthilfe',title:'Du musst eine Krise nicht allein bewältigen.',intro:'Diese externen Dienste sind unabhängig von House of Hoki. Prüfe aktuelle Angaben über die offiziellen Links.',cards:[['Deutschland · unmittelbare Gefahr','112 anrufen','Offizielle deutsche Hinweise ↗'],['Deutschland · seelische Krise','116 123 anrufen','TelefonSeelsorge ↗'],['Armenien · unmittelbare Gefahr','112 anrufen','Armenisches Innenministerium ↗'],['Jerewan · emotionale Unterstützung','0800 00 900','Informationen der Stadt Jerewan ↗']]},
    pages:{about:['Über uns','Ein Zuhause für achtsames Wachstum.','House of Hoki entsteht als Dach für private Sitzungen, gemeinsame Aktivitäten und unabhängig geführte Community-Programme.','Sarahs endgültige Berufsbezeichnung, Biografie und Qualifikationen werden erst nach Bestätigung veröffentlicht.'],resources:['Ressourcen','Nützliche Ideen, sorgfältig geteilt.','Artikel, häufige Fragen und praktische Ressourcen werden nach redaktioneller und fachlicher Prüfung ergänzt.'],privacy:['Rechtlicher Entwurf','Datenschutzhinweis','Diese Seite ist ein Platzhalter. Vor der Erhebung von Buchungs-, Fragebogen-, Analyse- oder Zahlungsdaten ist ein DSGVO-geprüfter Hinweis erforderlich.'],cookies:['Rechtlicher Entwurf','Cookie-Einstellungen','Notwendige Cookies speichern deine Einwilligungswahl. Mit Erlaubnis speichert ein Präferenz-Cookie die gewählte Sprache. Analyse- und Marketing-Cookies sind derzeit deaktiviert.'],imprint:['Rechtlicher Entwurf','Impressum','Verantwortliche Stelle, Adresse, Kontaktdaten und rechtliche Angaben müssen vor Veröffentlichung ergänzt werden.']}, footerLinks:['Leistungen','Programme','Ressourcen','Kontakt'],legalLinks:['Datenschutz','Cookies','Impressum'],ageNote:'Allgemeine Angebote ab 18'
  },
  hy: {
    language:'Լեզու', region:'Տարածաշրջան', chooseRegion:'Ընտրել տարածաշրջանը', regions:{de:'Գերմանիա',am:'Հայաստան'}, placeholderWordmark:'Ժամանակավոր անվանում', trust:['Անգլերեն · Գերմաներեն · Հայերեն','Առցանց և առկա','Գաղտնիությունը՝ առաջնային'], reflectionKicker:'Առօրյա հոգեբանություն', reflectionTitle:'Մակերեսի տակ գտնվող հարցերը։', reflectionIntro:'Սկսելու համար կատարյալ բառեր պետք չեն։ Երբեմն մի փոքր, անկեղծ հարցն արդեն կարող է նոր ուղղություն բացել։', reflectionQuestions:['Ինչո՞ւ եմ նույն բաների մասին կրկին ու կրկին մտածում։','Ինչպե՞ս սահմաններ դնեմ՝ առանց մեղավոր զգալու։','Ինչո՞ւ եմ ծանրաբեռնված զգում, երբ արտաքինից ամեն ինչ լավ է։','Կարո՞ղ է զրույցն օգնել փոխել հին սովորությունները։','Ինչպե՞ս ավելի բարի լինեմ ինքս իմ հանդեպ։','Ինչպիսի՞ն կլիներ նորից ավելի շատ ինքս ինձ նման զգալը։'], therapyImageAlt:'Թերապևտի և այցելուի հանգիստ զրույցը հարմարավետ սենյակում', per60:'/ 60 րոպե', free:'Անվճար', pilotActivities:'Փորձնական միջոցառումներ', statuses:['Փորձնական · Հայաստան','Գերմանիա · շուտով','Հայաստան · շուտով'], locationDetails:['Անհատական հանդիպումներ · աշխատանքային օրերին','Ծրագրեր · համայնք · հանդիպումներ','Անգլերեն · Գերմաներեն · Հայերեն'], ctaKicker:'Առաջին քայլը կարող է փոքր լինել',
    cookieBanner:{title:'Ձեր գաղտնիության ընտրությունը',text:'Կայքի աշխատանքի համար օգտագործում ենք անհրաժեշտ cookie-ներ։ Ձեր համաձայնությամբ նախընտրության cookie-ն հիշում է ընտրված լեզուն։ Վերլուծական և գովազդային cookie-ները այժմ անջատված են։',customize:'Կառավարել ընտրությունը',reject:'Մերժել ոչ պարտադիր cookie-ները',accept:'Ընդունել նախընտրությունները',settingsTitle:'Cookie կարգավորումներ',necessary:'Անհրաժեշտ cookie-ներ',necessaryText:'Անհրաժեշտ է համաձայնության ընտրության և կայքի աշխատանքի համար։ Միշտ ակտիվ է։',preferenceCategory:'Լեզվի նախընտրություն',preferenceText:'Այս սարքում հիշում է ձեր ընտրած լեզուն։',save:'Պահպանել ընտրությունը',policy:'Կարդալ cookie ծանուցումը'},
    booking:{optionalDomain:'Լրացուցիչ համատեքստ · ոչ պարտադիր',optionalTitle:'Ուրիշ ի՞նչ կցանկանայիք հայտնել Սառային։',optionalHelp:'Ձեր գրածը անփոփոխ կներառվի միայն մասնագետի զեկույցում։ Մի նշեք այլ մարդկանց անուններ կամ տվյալներ։',optionalLabel:'Ոչ պարտադիր նկարագրություն',model:'Հաճախորդի համատեքստի մոդել',analysisTitle:'Պատրաստվում է հետևողական ամրագրման ուղեցույցը',analysisText:'Ապագա լեզվային մոդելը կստանա կոդավորված պատասխաններ և կվերադարձնի հաստատուն կառուցվածքով մասնագիտական զեկույց։ Այս նախատիպը ամեն ինչ մշակում է տեղային։',professionalOnly:'Միայն մասնագետի համար',professionalOnlyText:'Ներքին ամփոփագիրը հաճախորդին չի ցուցադրվում։ Հաճախորդը տեսնում է միայն ձևաչափը, տևողությունը և գինը։',guidance:'Ձեր ամրագրման ուղեցույցը',resultTitle:'Առաջարկվող մեկնարկային տարբերակ',suggestedFormat:'Առաջարկվող ձևաչափ',suggestedDuration:'Առաջարկվող տևողություն',estimatedRange:'Գնահատված գնի միջակայք',resultNote:'Սառան ուսումնասիրում է ներքին պրոֆիլը և հաստատում մանրամասները։ Սա ախտորոշում կամ ավտոմատ մասնագիտական որոշում չէ։',preparing:'Պատրաստվում է…',prepare:'Պատրաստել ուղեցույցը',minutes:'{{count}} րոպե',settings:{private:'Անհատական',group:'Փոքր խումբ',either:'Անհատական կամ փոքր խումբ'}},
    details:{orientation:'Դիմել 15 րոպեանոց ծանոթացման համար',expect:'Ինչ սպասել',clear:'Հստակ տեղեկություն՝ նախքան որոշումը։',expectA:'Սկսեք անանուն կարճ հարցաշարից։ Պլանավորման գնահատումը օգնում է ընտրել ձևաչափը, տևողությունը և գնի միջակայքը։',expectB:'Սառան ուսումնասիրում է յուրաքանչյուր հարցում։ Ժամը, ծրագիրը և վերջնական գինը հաստատվում են վճարումից առաջ։'},
    listing:{sessionsTitle:'Անձնական ձևաչափով հանդիպումներ։',activitiesTitle:'Միավորող միջոցառումներ։',sessionsIntro:'Յուրաքանչյուր ծառայության էջը բացատրում է ձևաչափը, միջակայքը և հաջորդ քայլը։',activitiesIntro:'Բացահայտեք ընթացիկ փորձնական և նախատեսվող խմբային ձևաչափերը։',private:'Անհատական հանդիպում',privateMeta:'Անհատ · զույգ · ընտանիք',discussion:'Քննարկման շրջան',discussionMeta:'Common Club փորձնական · Երևան',community:'Համայնքային միջոցառումներ',communityMeta:'Նոր ձևաչափեր կավելացվեն փորձնական փուլից հետո։',explore:'Բացահայտել →',programsKicker:'Մեկ տուն · մի քանի դուռ',programsTitle:'Ծրագրեր՝ սեփական նպատակով։',open:'Բացել ծրագիրը →'},
    orientationPage:{kicker:'Անվճար · 15 րոպե',title:'Սկսեք կարճ զրույցից։',intro:'Դիմեք սովորական զանգի կամ WhatsApp ծանոթացման համար։ Սառան հաստատում է յուրաքանչյուր ժամադրություն։',email:'Դիմել էլ. փոստով',other:'Այլ կապի տարբերակներ',facts:[['Տևողություն','15 րոպե'],['Արժեք','Անվճար'],['Հաստատում','Սառայի կողմից']]},
    contactPage:{kicker:'Կապ',title:'Ընտրեք ձեզ հարմար տարբերակը։',intro:'Գործարար էլ. փոստն արդեն հասանելի է։ Գերմանական և հայկական WhatsApp, հեռախոս և Telegram տվյալները կավելացվեն ստուգումից հետո։',germany:'Գերմանիա',germanyText:'WhatsApp + հեռախոս · շուտով',armenia:'Հայաստան',armeniaText:'WhatsApp + հեռախոս + Telegram · շուտով'},
    crisis:{title:'Շտապ աջակցության կարիք ունե՞ք։',text:'House of Hoki-ն շտապ օգնության ծառայություն չէ։ Անմիջական վտանգի դեպքում դիմեք տեղական շտապ ծառայությանը։',link:'Դիտել ստուգված աջակցության տվյալները →'},
    emergency:{kicker:'Անհապաղ աջակցություն',title:'Պարտադիր չէ ճգնաժամը հաղթահարել միայնակ։',intro:'Այս արտաքին ծառայությունները անկախ են House of Hoki-ից։ Ընթացիկ տվյալները ստուգեք պաշտոնական հղումներով։',cards:[['Գերմանիա · անմիջական վտանգ','Զանգահարել 112','Գերմանիայի պաշտոնական ուղեցույց ↗'],['Գերմանիա · հուզական ճգնաժամ','Զանգահարել 116 123','TelefonSeelsorge ↗'],['Հայաստան · անմիջական վտանգ','Զանգահարել 112','ՀՀ ներքին գործերի նախարարություն ↗'],['Երևան · հուզական աջակցություն','0800 00 900','Երևանի քաղաքապետարանի տեղեկություն ↗']]},
    pages:{about:['Մեր մասին','Խոհուն աճի տուն։','House of Hoki-ն զարգանում է որպես անհատական հանդիպումների, ընդհանուր միջոցառումների և անկախ համայնքային ծրագրերի հարթակ։','Սառայի մասնագիտական վերջնական կոչումը, կենսագրությունն ու որակավորումները կհրապարակվեն հաստատվելուց հետո։'],resources:['Նյութեր','Օգտակար մտքեր՝ խնամքով ներկայացված։','Հոդվածները, հաճախ տրվող հարցերն ու գործնական նյութերը կավելացվեն խմբագրական և մասնագիտական ստուգումից հետո։'],privacy:['Իրավական նախագիծ','Գաղտնիության ծանուցում','Սա կառուցվածքային տեղապահ է։ Նախքան ամրագրման, հարցաշարի, վերլուծության կամ վճարման տվյալներ հավաքելը անհրաժեշտ է GDPR-ով ստուգված ծանուցում։'],cookies:['Իրավական նախագիծ','Cookie կարգավորումներ','Անհրաժեշտ cookie-ները պահում են համաձայնության ընտրությունը։ Թույլտվության դեպքում մեկ նախընտրության cookie հիշում է ընտրված լեզուն։ Վերլուծական և գովազդային cookie-ները հիմա անջատված են։'],imprint:['Իրավական նախագիծ','Իրավական տեղեկություններ','Պատասխանատու անձի, հասցեի, կապի և իրավական տվյալները պետք է լրացվեն մինչև հրապարակումը։']}, footerLinks:['Ծառայություններ','Ծրագրեր','Նյութեր','Կապ'],legalLinks:['Գաղտնիություն','Cookie-ներ','Իրավական տվյալներ'],ageNote:'Ընդհանուր ծառայությունները՝ 18+'
  }
}

Object.keys(copy).forEach(language=>Object.assign(copy[language],extraCopy[language]))
const detector=new LanguageDetector()
i18n.use(detector).use(initReactI18next).init({resources:Object.fromEntries(Object.entries(copy).map(([key,value])=>[key,{translation:value}])),fallbackLng:'en',supportedLngs:['en','de','hy'],load:'languageOnly',interpolation:{escapeValue:false},detection:{order:['cookie','navigator'],lookupCookie:'hoki_lang',caches:[]}})

const programs = [
  { mark: 'CC', name: 'Common Club', status: 'Pilot · Armenia', className: 'clay', path: '/programs/common-club' },
  { mark: 'HY', name: 'Hoki for Youth', status: 'Germany · coming soon', className: 'sage', path: '/programs/hoki-youth-germany' },
  { mark: 'HY', name: 'Hoki for Youth', status: 'Armenia · coming soon', className: 'sand', path: '/programs/hoki-youth-armenia' },
]

function Logo() {
  const { t }=useTranslation()
  return <div className="logo" aria-label="House of Hoki"><span className="logo-mark">H</span><span>House of Hoki<small>{t('placeholderWordmark')}</small></span></div>
}

function Header({ lang, setLang }) {
  const { t }=useTranslation()
  const paths = ['/sessions','/activities','/programs','/resources','/about']
  const nav=t('nav',{returnObjects:true})
  return <header className="header"><Link className="logo-link" to="/"><Logo/></Link><nav aria-label="Main navigation">{nav.map((n,i)=><Link key={n} to={paths[i]}>{n}</Link>)}</nav><div className="header-actions"><label className="sr-only" htmlFor="lang">{t('language')}</label><select id="lang" value={lang} onChange={e=>setLang(e.target.value)}><option value="en">EN</option><option value="de">DE</option><option value="hy">HY</option></select><Link className="button small" to="/booking">{t('book')}</Link></div></header>
}

function Art({ variant='arch' }) { return <div className={`art ${variant}`} aria-hidden="true"><span/><i/><b/></div> }

function HeroPoster({ copy: t, lang }) {
  return <section className="hero hero-poster" aria-labelledby="home-title">
    <div className="hero-poster-visual">
      <picture className="hero-poster-picture">
        <source media="(max-width: 600px)" srcSet={`${import.meta.env.BASE_URL}hero-mobile.png`}/>
        <img className="hero-poster-image" src={`${import.meta.env.BASE_URL}hero-background.png`} alt="" aria-hidden="true"/>
      </picture>
      <div className="hero-poster-questions" aria-hidden="true">{t.reflectionQuestions.slice(0,3).map((question,index)=><span className={`floating-question poster-question-${index+1}`} key={question}>{question}</span>)}</div>
    </div>
    <div className={`hero-poster-heading lang-${lang}`}>
      <p className="hero-wordmark">{t.heroBrand}</p>
      <h1 id="home-title"><span>{t.titleA}</span><em>{t.titleB}</em></h1>
    </div>
    <div className="hero-poster-content">
      <p className="eyebrow">{t.eyebrow}</p>
      <p className="hero-poster-intro">{t.intro}</p>
      <div className="button-row"><Link className="button" to="/booking">{t.book}<span>→</span></Link><Link className="text-link" to="/sessions">{t.explore}<span>→</span></Link></div>
      <div className="trust-row">{t.trust.map(item=><span key={item}>{item}</span>)}</div>
    </div>
  </section>
}

function Estimator({ lang, onClose, embedded=false }) {
  const t = copy[lang]
  const [step,setStep] = useState(0)
  const [answers,setAnswers] = useState({ setting:'individual', format:'online', duration:'90', needs:'', payment:'later' })
  const [analyzing,setAnalyzing] = useState(false)
  const questions = [
    { title: lang==='de'?'Für wen ist die Sitzung?':lang==='hy'?'Ո՞ւմ համար է հանդիպումը։':'Who is the session for?', key:'setting', options:[['individual','Individual'],['couple','Couple'],['family','Family']] },
    { title: lang==='de'?'Welches Format passt?':lang==='hy'?'Ո՞ր ձևաչափն է հարմար։':'Which format suits you?', key:'format', options:[['online','Online'],['heidelberg','Near Heidelberg'],['yerevan','Yerevan · soon']] },
    { title: lang==='de'?'Welche Dauer bevorzugst du?':lang==='hy'?'Ի՞նչ տևողություն եք նախընտրում։':'What duration do you prefer?', key:'duration', options:[['60','60 min'],['90','90 min'],['120','120 min']] },
  ]
  const base = answers.duration==='60'?85:answers.duration==='90'?120:155
  const extra = answers.setting==='couple'?20:answers.setting==='family'?40:0
  const needsAdjustment = answers.needs.trim().length > 180 ? 30 : answers.needs.trim().length > 60 ? 15 : 0
  const suggestedDuration = Math.min(120, Number(answers.duration) + needsAdjustment)
  const min = base + extra + (needsAdjustment ? 20 : 0)
  const runAnalysis = () => {
    setAnalyzing(true)
    window.setTimeout(() => { setAnalyzing(false); setStep(5) }, 900)
  }
  const progress = Math.min(100, ((step + 1) / 6) * 100)
  return <div className={embedded?'estimator-embedded':'modal-backdrop'} role="presentation" onMouseDown={e=>!embedded&&e.target===e.currentTarget&&onClose()}><section className="modal" role="dialog" aria-modal={!embedded} aria-labelledby="estimate-title">{!embedded&&<button className="icon-button" onClick={onClose} aria-label={t.close}>×</button>}<div className="estimate-progress" aria-hidden="true"><span style={{width:`${progress}%`}}/></div><div className="modal-kicker">{step<3?`0${step+1} / 06`:step===3?'04 / 06':step===4?'05 / 06':'06 / 06'}</div>
    {step<3&&<><h2 id="estimate-title">{questions[step].title}</h2><p>{t.estimateIntro}</p><div className="option-grid">{questions[step].options.map(([value,label])=><button key={value} className={answers[questions[step].key]===value?'option selected':'option'} onClick={()=>setAnswers({...answers,[questions[step].key]:value})}><span>{label}</span><i>{answers[questions[step].key]===value?'✓':'→'}</i></button>)}</div></>}
    {step===3&&<><h2 id="estimate-title">{t.needsTitle}</h2><p>{t.needsIntro}</p><label className="needs-field"><span className="sr-only">{t.needsTitle}</span><textarea maxLength="600" value={answers.needs} placeholder={t.needsPlaceholder} onChange={e=>setAnswers({...answers,needs:e.target.value})}/><small>{answers.needs.length} / 600</small></label></>}
    {step===4&&<div className="ai-review"><div className={analyzing?'ai-orb working':'ai-orb'} aria-hidden="true">✦</div><h2 id="estimate-title">{t.aiTitle}</h2><p>{t.aiIntro}</p><div className="privacy-note"><strong>Privacy first</strong><span>Your text should be processed by a secured backend and is not sent to an LLM in this prototype.</span></div></div>}
    {step===5&&<><h2 id="estimate-title">{t.estimateTitle}</h2><p>{t.paymentIntro}</p><div className="result-card"><span>AI-assisted suggestion</span><strong>{suggestedDuration} min · {answers.setting}</strong><span>Estimated range</span><strong>€{min}–€{min+25}</strong><small>This is a planning estimate, not a diagnosis. Sarah confirms the duration and final price before payment.</small></div><fieldset className="payment-options"><legend>{t.paymentTitle}</legend>{[['paypal',t.paypal],['visa',t.visa],['later',t.payLater]].map(([value,label])=><button type="button" key={value} className={answers.payment===value?'payment-option selected':'payment-option'} onClick={()=>setAnswers({...answers,payment:value})}><span className="payment-symbol">{value==='paypal'?'P':value==='visa'?'V':'○'}</span><span>{label}</span><i>{answers.payment===value?'✓':''}</i></button>)}</fieldset></>}
    <div className="modal-actions">{step>0&&<button className="text-button" disabled={analyzing} onClick={()=>setStep(step-1)}>{t.back}</button>}<button className="button" disabled={analyzing} onClick={()=>step<4?setStep(step+1):step===4?runAnalysis():onClose()}>{step<4?t.next:step===4?(analyzing?'Analyzing…':t.analyze):t.request}</button></div></section></div>
}

const intakeQuestions = [
  { id:'focus', domain:'Primary focus', prompt:'What would you mainly like support with?', options:[['stress','Stress or overwhelm'],['transition','A life transition'],['relationships','Relationships or communication'],['self','Self-understanding or confidence'],['loss','Loss, grief, or another concern']] },
  { id:'intensity', domain:'Current intensity', prompt:'How strong does this concern feel right now?', options:[[1,'Very manageable'],[2,'Mostly manageable'],[3,'In the middle'],[4,'Quite strong'],[5,'Very strong']] },
  { id:'impact', domain:'Daily-life impact', prompt:'How much is it affecting your everyday life?', options:[[1,'Almost not at all'],[2,'A little'],[3,'Noticeably'],[4,'A lot'],[5,'Across most areas']] },
  { id:'duration', domain:'Time course', prompt:'How long has this been present?', options:[[1,'Less than 2 weeks'],[2,'2–6 weeks'],[3,'2–6 months'],[4,'6–12 months'],[5,'More than a year']] },
  { id:'clarity', domain:'Goal clarity', prompt:'How clear are you about what you want from a session?', options:[[1,'Not clear yet'],[2,'Only a rough sense'],[3,'Partly clear'],[4,'Mostly clear'],[5,'Very clear']] },
  { id:'capacity', domain:'Current capacity', prompt:'How much energy do you currently have for reflection or change?', options:[[1,'Very little'],[2,'Limited'],[3,'Some'],[4,'A good amount'],[5,'A lot']] },
  { id:'style', domain:'Support style', prompt:'What kind of support feels most useful?', options:[[1,'Mostly listening'],[2,'Listening with gentle questions'],[3,'A balanced mixture'],[4,'Structured guidance'],[5,'Practical tools and actions']] },
  { id:'pace', domain:'Preferred pace', prompt:'What pace would feel most comfortable?', options:[[1,'Very gentle'],[2,'Gentle'],[3,'Balanced'],[4,'Focused'],[5,'Highly focused']] },
  { id:'setting', domain:'Setting preference', prompt:'Which setting currently feels most comfortable?', options:[[1,'Definitely private'],[2,'Probably private'],[3,'Open to either'],[4,'Interested in a small group'],[5,'Definitely a group']] },
  { id:'experience', domain:'Previous support', prompt:'How familiar are you with guided well-being or therapy sessions?', options:[[1,'This would be my first time'],[2,'One or two past sessions'],[3,'Some previous experience'],[4,'Regular experience in the past'],[5,'Currently receiving support']] },
]

const intakeQuestionTranslations = {
  de: [
    { id:'focus', domain:'Hauptanliegen', prompt:'Wobei wünschst du dir hauptsächlich Unterstützung?', options:[['stress','Stress oder Überforderung'],['transition','Eine Lebensveränderung'],['relationships','Beziehungen oder Kommunikation'],['self','Selbstverständnis oder Selbstvertrauen'],['loss','Verlust, Trauer oder ein anderes Anliegen']] },
    { id:'intensity', domain:'Aktuelle Intensität', prompt:'Wie stark fühlt sich dieses Anliegen gerade an?', options:[[1,'Sehr gut handhabbar'],[2,'Meist handhabbar'],[3,'Mittel'],[4,'Ziemlich stark'],[5,'Sehr stark']] },
    { id:'impact', domain:'Auswirkung im Alltag', prompt:'Wie sehr beeinflusst es deinen Alltag?', options:[[1,'Fast gar nicht'],[2,'Ein wenig'],[3,'Spürbar'],[4,'Sehr'],[5,'In fast allen Bereichen']] },
    { id:'duration', domain:'Zeitraum', prompt:'Seit wann besteht dieses Anliegen?', options:[[1,'Weniger als 2 Wochen'],[2,'2–6 Wochen'],[3,'2–6 Monate'],[4,'6–12 Monate'],[5,'Mehr als ein Jahr']] },
    { id:'clarity', domain:'Klarheit des Ziels', prompt:'Wie klar ist dir, was du aus einer Sitzung mitnehmen möchtest?', options:[[1,'Noch nicht klar'],[2,'Nur eine grobe Vorstellung'],[3,'Teilweise klar'],[4,'Überwiegend klar'],[5,'Sehr klar']] },
    { id:'capacity', domain:'Aktuelle Kapazität', prompt:'Wie viel Energie hast du momentan für Reflexion oder Veränderung?', options:[[1,'Sehr wenig'],[2,'Begrenzt'],[3,'Etwas'],[4,'Ziemlich viel'],[5,'Sehr viel']] },
    { id:'style', domain:'Art der Unterstützung', prompt:'Welche Art von Unterstützung wäre am hilfreichsten?', options:[[1,'Vor allem Zuhören'],[2,'Zuhören mit sanften Fragen'],[3,'Eine ausgewogene Mischung'],[4,'Strukturierte Begleitung'],[5,'Praktische Werkzeuge und Schritte']] },
    { id:'pace', domain:'Bevorzugtes Tempo', prompt:'Welches Tempo würde sich angenehm anfühlen?', options:[[1,'Sehr behutsam'],[2,'Behutsam'],[3,'Ausgewogen'],[4,'Fokussiert'],[5,'Sehr fokussiert']] },
    { id:'setting', domain:'Bevorzugter Rahmen', prompt:'Welcher Rahmen fühlt sich momentan am angenehmsten an?', options:[[1,'Auf jeden Fall privat'],[2,'Eher privat'],[3,'Offen für beides'],[4,'Interesse an einer kleinen Gruppe'],[5,'Auf jeden Fall Gruppe']] },
    { id:'experience', domain:'Bisherige Erfahrung', prompt:'Wie vertraut bist du mit begleiteten Wohlfühl- oder Therapiesitzungen?', options:[[1,'Das wäre mein erstes Mal'],[2,'Ein oder zwei frühere Sitzungen'],[3,'Etwas Erfahrung'],[4,'Früher regelmäßige Erfahrung'],[5,'Derzeit in Begleitung']] },
  ],
  hy: [
    { id:'focus', domain:'Հիմնական թեմա', prompt:'Հիմնականում ինչի՞ համար եք աջակցություն ցանկանում։', options:[['stress','Սթրես կամ գերծանրաբեռնվածություն'],['transition','Կյանքի փոփոխություն'],['relationships','Հարաբերություններ կամ հաղորդակցություն'],['self','Ինքնաճանաչում կամ ինքնավստահություն'],['loss','Կորուստ, վիշտ կամ այլ հարց']] },
    { id:'intensity', domain:'Ընթացիկ ուժգնություն', prompt:'Որքա՞ն ուժեղ է այս հարցը զգացվում հիմա։', options:[[1,'Շատ կառավարելի'],[2,'Հիմնականում կառավարելի'],[3,'Միջին'],[4,'Բավական ուժեղ'],[5,'Շատ ուժեղ']] },
    { id:'impact', domain:'Ազդեցություն առօրյայի վրա', prompt:'Որքա՞ն է դա ազդում ձեր առօրյա կյանքի վրա։', options:[[1,'Գրեթե չի ազդում'],[2,'Մի փոքր'],[3,'Նկատելիորեն'],[4,'Շատ'],[5,'Գրեթե բոլոր ոլորտներում']] },
    { id:'duration', domain:'Տևողություն', prompt:'Որքա՞ն ժամանակ է այս հարցը առկա։', options:[[1,'2 շաբաթից պակաս'],[2,'2–6 շաբաթ'],[3,'2–6 ամիս'],[4,'6–12 ամիս'],[5,'Մեկ տարուց ավելի']] },
    { id:'clarity', domain:'Նպատակի հստակություն', prompt:'Որքա՞ն հստակ գիտեք, թե ինչ եք ուզում ստանալ հանդիպումից։', options:[[1,'Դեռ հստակ չէ'],[2,'Միայն ընդհանուր պատկերացում'],[3,'Մասամբ հստակ'],[4,'Հիմնականում հստակ'],[5,'Շատ հստակ']] },
    { id:'capacity', domain:'Ընթացիկ ներուժ', prompt:'Որքա՞ն էներգիա ունեք հիմա մտորումների կամ փոփոխության համար։', options:[[1,'Շատ քիչ'],[2,'Սահմանափակ'],[3,'Որոշ չափով'],[4,'Բավականաչափ'],[5,'Շատ']] },
    { id:'style', domain:'Աջակցության ձև', prompt:'Ինչպիսի՞ աջակցությունն է ձեզ առավել օգտակար թվում։', options:[[1,'Հիմնականում լսել'],[2,'Լսել և մեղմ հարցեր տալ'],[3,'Հավասարակշռված համադրություն'],[4,'Կառուցվածքային ուղղորդում'],[5,'Գործնական միջոցներ և քայլեր']] },
    { id:'pace', domain:'Նախընտրելի ընթացք', prompt:'Ի՞նչ ընթացք կլինի ձեզ համար առավել հարմար։', options:[[1,'Շատ մեղմ'],[2,'Մեղմ'],[3,'Հավասարակշռված'],[4,'Կենտրոնացված'],[5,'Շատ կենտրոնացված']] },
    { id:'setting', domain:'Միջավայրի նախընտրություն', prompt:'Ո՞ր միջավայրն է այժմ առավել հարմար թվում։', options:[[1,'Անպայման անհատական'],[2,'Ավելի շուտ անհատական'],[3,'Բաց եմ երկուսի համար'],[4,'Հետաքրքրված եմ փոքր խմբով'],[5,'Անպայման խմբային']] },
    { id:'experience', domain:'Նախորդ փորձ', prompt:'Որքա՞ն ծանոթ եք ուղղորդվող բարեկեցության կամ թերապիայի հանդիպումներին։', options:[[1,'Սա կլինի առաջին անգամ'],[2,'Մեկ կամ երկու հանդիպում նախկինում'],[3,'Որոշ փորձ ունեմ'],[4,'Նախկինում կանոնավոր փորձ'],[5,'Այժմ ստանում եմ աջակցություն']] },
  ]
}

i18n.addResourceBundle('en','translation',{intakeQuestions},true,true)
i18n.addResourceBundle('de','translation',{intakeQuestions:intakeQuestionTranslations.de},true,true)
i18n.addResourceBundle('hy','translation',{intakeQuestions:intakeQuestionTranslations.hy},true,true)

function createProfessionalReport(responses, description, estimate) {
  const answerFor = id => {
    const question = intakeQuestions.find(item=>item.id===id)
    const selected = question?.options.find(([value])=>String(value)===String(responses[id]))
    return selected ? { code:selected[0], label:selected[1] } : { code:null, label:'Not answered' }
  }
  return {
    schemaVersion:'hoki-client-context-v1',
    reportAudience:'professional_only',
    sections:[
      { order:1, key:'primary_focus', title:'Primary focus', value:answerFor('focus') },
      { order:2, key:'current_intensity', title:'Current intensity', value:answerFor('intensity') },
      { order:3, key:'daily_life_impact', title:'Daily-life impact', value:answerFor('impact') },
      { order:4, key:'time_course', title:'Time course', value:answerFor('duration') },
      { order:5, key:'goal_clarity', title:'Goal clarity', value:answerFor('clarity') },
      { order:6, key:'current_capacity', title:'Current capacity', value:answerFor('capacity') },
      { order:7, key:'preferred_support_style', title:'Preferred support style', value:answerFor('style') },
      { order:8, key:'preferred_pace', title:'Preferred pace', value:answerFor('pace') },
      { order:9, key:'setting_preference', title:'Setting preference', value:answerFor('setting') },
      { order:10, key:'previous_support', title:'Previous support experience', value:answerFor('experience') },
      { order:11, key:'customer_description_verbatim', title:'Optional customer description — verbatim', value:description || 'Not provided', transform:'none' },
      { order:12, key:'planning_recommendation', title:'Planning recommendation', value:estimate },
      { order:13, key:'safety_scope', title:'Safety scope', value:'Risk and diagnosis are not assessed by this booking intake.' },
    ]
  }
}

function StructuredEstimator({ lang, onComplete }) {
  const { t }=useTranslation()
  const questions=t('intakeQuestions',{returnObjects:true})
  const [step,setStep]=useState(0)
  const [responses,setResponses]=useState({})
  const [description,setDescription]=useState('')
  const [payment,setPayment]=useState('later')
  const [analyzing,setAnalyzing]=useState(false)
  const questionCount=questions.length
  const descriptionStep=questionCount
  const analysisStep=questionCount+1
  const resultStep=questionCount+2
  const totalSteps=resultStep+1
  const question=questions[step]
  const numeric=id=>Number(responses[id]||0)
  const complexity=numeric('intensity')+numeric('impact')+numeric('duration')+(6-(numeric('clarity')||3))
  const recommendedMinutes=complexity>=16?120:complexity>=11?90:60
  const settingScore=numeric('setting')
  const settingKey=settingScore>=4?'group':settingScore===3?'either':'private'
  const suggestedSetting=t(`booking.settings.${settingKey}`)
  const min=recommendedMinutes===60?85:recommendedMinutes===90?120:155
  const estimate={ suggestedSetting, recommendedMinutes, priceRange:`€${min}–€${min+25}`, rationale:'Planning guidance based on structured preferences; professional confirmation required.' }
  const professionalReport=useMemo(()=>createProfessionalReport(responses,description,estimate),[responses,description,recommendedMinutes,suggestedSetting,min])
  const nextDisabled=step<questionCount&&!responses[question?.id]
  const advance=()=>{
    if(step===analysisStep){
      setAnalyzing(true)
      window.setTimeout(()=>{setAnalyzing(false);setStep(resultStep)},900)
    } else if(step===resultStep){ onComplete?.(professionalReport) }
    else setStep(current=>current+1)
  }
  return <section className="modal structured-estimator" aria-labelledby="structured-title"><div className="estimate-progress" aria-hidden="true"><span style={{width:`${((step+1)/totalSteps)*100}%`}}/></div><div className="modal-kicker">{String(step+1).padStart(2,'0')} / {totalSteps}</div>
    {step<questionCount&&<><p className="question-domain">{question.domain}</p><h2 id="structured-title">{question.prompt}</h2><p>{t('answerHint')}</p><div className="scale-options">{question.options.map(([value,label],index)=><button key={value} className={String(responses[question.id])===String(value)?'scale-option selected':'scale-option'} onClick={()=>setResponses({...responses,[question.id]:value})}><b>{index+1}</b><span>{label}</span><i>{String(responses[question.id])===String(value)?'✓':''}</i></button>)}</div></>}
    {step===descriptionStep&&<><p className="question-domain">{t('booking.optionalDomain')}</p><h2 id="structured-title">{t('booking.optionalTitle')}</h2><p>{t('booking.optionalHelp')}</p><label className="needs-field"><span className="sr-only">{t('booking.optionalLabel')}</span><textarea maxLength="1200" value={description} placeholder={t('needsPlaceholder')} onChange={e=>setDescription(e.target.value)}/><small>{description.length} / 1200</small></label></>}
    {step===analysisStep&&<div className="ai-review"><div className={analyzing?'ai-orb working':'ai-orb'} aria-hidden="true">✦</div><p className="question-domain">{t('booking.model')}</p><h2 id="structured-title">{t('booking.analysisTitle')}</h2><p>{t('booking.analysisText')}</p><div className="privacy-note"><strong>{t('booking.professionalOnly')}</strong><span>{t('booking.professionalOnlyText')}</span></div></div>}
    {step===resultStep&&<><p className="question-domain">{t('booking.guidance')}</p><h2 id="structured-title">{t('booking.resultTitle')}</h2><div className="result-card"><span>{t('booking.suggestedFormat')}</span><strong>{suggestedSetting}</strong><span>{t('booking.suggestedDuration')}</span><strong>{t('booking.minutes',{count:recommendedMinutes})}</strong><span>{t('booking.estimatedRange')}</span><strong>{estimate.priceRange}</strong><small>{t('booking.resultNote')}</small></div><fieldset className="payment-options"><legend>{t('paymentTitle')}</legend>{[['paypal',t('paypal')],['visa',t('visa')],['later',t('payLater')]].map(([value,label])=><button type="button" key={value} className={payment===value?'payment-option selected':'payment-option'} onClick={()=>setPayment(value)}><span className="payment-symbol">{value==='paypal'?'P':value==='visa'?'V':'○'}</span><span>{label}</span><i>{payment===value?'✓':''}</i></button>)}</fieldset></>}
    <div className="modal-actions">{step>0&&<button className="text-button" disabled={analyzing} onClick={()=>setStep(current=>current-1)}>{t('back')}</button>}<button className="button" disabled={nextDisabled||analyzing} onClick={advance}>{step===analysisStep?(analyzing?t('booking.preparing'):t('booking.prepare')):step===resultStep?t('request'):t('next')}</button></div></section>
}

function HomePage({ lang }) {
  const [openFaq,setOpenFaq] = useState(0)
  const t = copy[lang]
  return <main>
      <HeroPoster copy={t} lang={lang}/>

      <section className="reflection-section" aria-labelledby="reflection-title"><div className="reflection-heading"><p className="eyebrow">{t.reflectionKicker}</p><h2 id="reflection-title">{t.reflectionTitle}</h2><p>{t.reflectionIntro}</p></div><div className="question-cloud">{t.reflectionQuestions.map((question,index)=><Link className={`question-card card-${index+1}`} to="/booking" key={question}><span>{String(index+1).padStart(2,'0')}</span><strong>{question}</strong><i aria-hidden="true">↗</i></Link>)}</div></section>

      <section className="section intro-section"><div className="section-heading"><p className="eyebrow">{t.sectionKicker}</p><h2>{t.sectionTitle}</h2><p>{t.sectionIntro}</p></div><div className="service-grid"><article className="service-card"><div className="card-top"><span>01</span><Art variant="orb"/></div><h3>{t.privateTitle}</h3><p>{t.privateText}</p><div className="price"><span>{t.from}</span><strong>€85</strong><small>{t.per60}</small></div><Link className="card-link" to="/sessions/private-session">{t.estimate}<span>↗</span></Link></article><article className="service-card inverse"><div className="card-top"><span>02</span><Art variant="rings"/></div><h3>{t.groupTitle}</h3><p>{t.groupText}</p><div className="price"><span>{t.from}</span><strong>{t.free}</strong><small>{t.pilotActivities}</small></div><Link className="card-link" to="/activities/discussion-circle">{t.seeActivities}<span>↗</span></Link></article></div></section>

      <section className="program-section"><div className="section-heading light"><p className="eyebrow">{t.programsKicker}</p><h2>{t.programsTitle}</h2></div><div className="program-list">{programs.map((p,i)=><article className="program" key={p.path}><div className={`program-mark ${p.className}`}>{p.mark}</div><div><span>{t.statuses[i]}</span><h3>{p.name}</h3><p>{i===0?t.commonText:t.youthText}</p></div><Link to={p.path} aria-label={`${i===0?t.apply:t.interest}: ${p.name}`}>{i===0?t.apply:t.interest}<span>→</span></Link></article>)}</div></section>

      <section className="section process" id="resources"><div className="section-heading"><p className="eyebrow">{t.processKicker}</p><h2>{t.processTitle}</h2></div><div className="steps">{t.steps.map(([n,title,desc])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section className="quote-section"><Art variant="flow"/><blockquote>{t.quote}</blockquote></section>

      <section className="section locations" id="about"><div className="section-heading"><p className="eyebrow">House of Hoki</p><h2>{t.locationTitle}</h2></div><div className="location-grid"><article><span>DE</span><h3>{t.heidelberg}</h3><p>{t.locationDetails[0]}</p></article><article><span>AM</span><h3>{t.yerevan}</h3><p>{t.locationDetails[1]}</p></article><article><span>∞</span><h3>{t.online}</h3><p>{t.locationDetails[2]}</p></article></div></section>

      <section className="section faq-section"><div className="section-heading"><p className="eyebrow">FAQ</p><h2>{t.faqTitle}</h2></div><div className="faq-list">{t.faq.map(([q,a],i)=><article className={openFaq===i?'faq open':'faq'} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{String(i+1).padStart(2,'0')}</span><strong>{q}</strong><i>{openFaq===i?'−':'+'}</i></button>{openFaq===i&&<p>{a}</p>}</article>)}</div></section>

      <section className="cta"><p className="eyebrow">{t.ctaKicker}</p><h2>{t.titleA}<br/>{t.titleB}</h2><div className="button-row"><Link className="button pale" to="/booking">{t.book}<span>→</span></Link><Link className="text-link pale" to="/orientation-call">{t.orient}<span>↗</span></Link></div></section>
    </main>
}

const routePages = { en: {
  '/sessions/private-session': { kicker:'Private sessions', title:'A focused space for you.', intro:'A one-to-one session shaped around your goals, preferred format and pace.', facts:[['Format','Online · Heidelberg · Yerevan soon'],['Duration','60–120 minutes'],['Price','Starting at €85']], action:'Start your estimate' },
  '/activities/discussion-circle': { kicker:'Group activity', title:'Meet through meaningful conversation.', intro:'A facilitated discussion circle designed as the first Common Club pilot activity.', facts:[['Location','Yerevan'],['Language','Armenian · English'],['Availability','Pilot dates coming soon']], action:'Register interest' },
  '/programs/common-club': { kicker:'Common Club · Armenia', title:'Come together around what we share.', intro:'A free community pilot for people aged 18–45, owned with an independent program partner and facilitated with Sarah.', facts:[['Age','18–45'],['First format','Discussion circle'],['Admission','Questionnaire + approval']], action:'Apply to the pilot' },
  '/programs/hoki-youth-germany': { kicker:'Hoki for Youth · Germany', title:'A shared language for growing forward.', intro:'A developing well-being program for young people, sharing one identity with Hoki for Youth Armenia.', facts:[['Age','16–29'],['Region','Near Heidelberg'],['Status','Registering interest']], action:'Register interest' },
  '/programs/hoki-youth-armenia': { kicker:'Hoki for Youth · Armenia', title:'Local roots. Shared possibility.', intro:'A developing multilingual well-being program for young people in Armenia.', facts:[['Age','16–29'],['Region','Yerevan'],['Status','Registering interest']], action:'Register interest' },
}, de: {
  '/sessions/private-session':{kicker:'Private Sitzungen',title:'Ein fokussierter Raum für dich.',intro:'Eine persönliche Sitzung, abgestimmt auf deine Ziele, dein Format und dein Tempo.',facts:[['Format','Online · Heidelberg · Jerewan demnächst'],['Dauer','60–120 Minuten'],['Preis','Ab 85 €']],action:'Einschätzung starten'},
  '/activities/discussion-circle':{kicker:'Gruppenaktivität',title:'Begegnung durch bedeutungsvolle Gespräche.',intro:'Ein moderierter Gesprächskreis als erste Pilotaktivität des Common Club.',facts:[['Ort','Jerewan'],['Sprache','Armenisch · Englisch'],['Verfügbarkeit','Pilottermine folgen']],action:'Interesse anmelden'},
  '/programs/common-club':{kicker:'Common Club · Armenien',title:'Zusammenkommen durch das, was uns verbindet.',intro:'Ein kostenloses Community-Pilotprojekt für 18- bis 45-Jährige, gemeinsam mit einem unabhängigen Programmpartner und Sarah als Begleiterin.',facts:[['Alter','18–45'],['Erstes Format','Gesprächskreis'],['Aufnahme','Fragebogen + Bestätigung']],action:'Für Pilot bewerben'},
  '/programs/hoki-youth-germany':{kicker:'Hoki for Youth · Deutschland',title:'Eine gemeinsame Sprache fürs Weiterwachsen.',intro:'Ein entstehendes Wohlfühlprogramm für junge Menschen mit gemeinsamer Identität in Deutschland und Armenien.',facts:[['Alter','16–29'],['Region','Bei Heidelberg'],['Status','Interessenliste']],action:'Interesse anmelden'},
  '/programs/hoki-youth-armenia':{kicker:'Hoki for Youth · Armenien',title:'Lokale Wurzeln. Gemeinsame Möglichkeiten.',intro:'Ein entstehendes mehrsprachiges Wohlfühlprogramm für junge Menschen in Armenien.',facts:[['Alter','16–29'],['Region','Jerewan'],['Status','Interessenliste']],action:'Interesse anmelden'}
}, hy: {
  '/sessions/private-session':{kicker:'Անհատական հանդիպումներ',title:'Կենտրոնացված տարածք ձեզ համար։',intro:'Անհատական հանդիպում՝ ձեր նպատակներին, նախընտրելի ձևաչափին և տեմպին համապատասխան։',facts:[['Ձևաչափ','Առցանց · Հայդելբերգ · Երևան՝ շուտով'],['Տևողություն','60–120 րոպե'],['Գին','Սկսած €85-ից']],action:'Սկսել գնահատումը'},
  '/activities/discussion-circle':{kicker:'Խմբային միջոցառում',title:'Ծանոթացեք իմաստալից զրույցի միջոցով։',intro:'Ուղղորդվող քննարկման շրջան՝ որպես Common Club-ի առաջին փորձնական միջոցառում։',facts:[['Վայր','Երևան'],['Լեզու','Հայերեն · Անգլերեն'],['Հասանելիություն','Ամսաթվերը՝ շուտով']],action:'Գրանցել հետաքրքրությունը'},
  '/programs/common-club':{kicker:'Common Club · Հայաստան',title:'Միավորվենք մեր ընդհանրությունների շուրջ։',intro:'Անվճար համայնքային փորձնական ծրագիր 18–45 տարեկանների համար՝ անկախ գործընկերոջ և Սառայի աջակցությամբ։',facts:[['Տարիք','18–45'],['Առաջին ձևաչափ','Քննարկման շրջան'],['Ընդունելություն','Հարցաշար + հաստատում']],action:'Դիմել փորձնական ծրագրին'},
  '/programs/hoki-youth-germany':{kicker:'Hoki for Youth · Գերմանիա',title:'Ընդհանուր լեզու՝ առաջ աճելու համար։',intro:'Երիտասարդների բարեկեցության զարգացող ծրագիր՝ նույն ինքնությամբ Գերմանիայում և Հայաստանում։',facts:[['Տարիք','16–29'],['Տարածաշրջան','Հայդելբերգի մոտ'],['Կարգավիճակ','Հետաքրքրության գրանցում']],action:'Գրանցել հետաքրքրությունը'},
  '/programs/hoki-youth-armenia':{kicker:'Hoki for Youth · Հայաստան',title:'Տեղական արմատներ։ Ընդհանուր հնարավորություններ։',intro:'Երիտասարդների համար զարգացող բազմալեզու բարեկեցության ծրագիր Հայաստանում։',facts:[['Տարիք','16–29'],['Տարածաշրջան','Երևան'],['Կարգավիճակ','Հետաքրքրության գրանցում']],action:'Գրանցել հետաքրքրությունը'}
}}

function DetailPage({ page }) {
  const {t}=useTranslation()
  return <main><section className="detail-hero"><div><p className="eyebrow">{page.kicker}</p><h1>{page.title}</h1><p className="lead">{page.intro}</p><div className="button-row"><Link className="button" to="/booking">{page.action}<span>→</span></Link><Link className="text-link" to="/orientation-call">{t('details.orientation')}<span>↗</span></Link></div></div><Art variant="orb"/></section><section className="detail-facts">{page.facts.map(([label,value])=><article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="detail-body"><p className="eyebrow">{t('details.expect')}</p><h2>{t('details.clear')}</h2><div className="detail-columns"><p>{t('details.expectA')}</p><p>{t('details.expectB')}</p></div></section></main>
}

function ListingPage({ type }) {
  const {t}=useTranslation()
  const sessions = type==='sessions'
  return <main><section className="page-intro"><p className="eyebrow">House of Hoki</p><h1>{t(sessions?'listing.sessionsTitle':'listing.activitiesTitle')}</h1><p className="lead">{t(sessions?'listing.sessionsIntro':'listing.activitiesIntro')}</p></section><section className="listing-grid">{sessions?<Link className="listing-card blush" to="/sessions/private-session"><span>01</span><h2>{t('listing.private')}</h2><p>{t('listing.privateMeta')}</p><strong>{t('listing.explore')}</strong></Link>:<><Link className="listing-card chartreuse" to="/activities/discussion-circle"><span>01</span><h2>{t('listing.discussion')}</h2><p>{t('listing.discussionMeta')}</p><strong>{t('listing.explore')}</strong></Link><Link className="listing-card ice" to="/programs/common-club"><span>02</span><h2>{t('listing.community')}</h2><p>{t('listing.communityMeta')}</p><strong>{t('listing.explore')}</strong></Link></>}</section></main>
}

function ProgramsPage() { const {t}=useTranslation(); const statuses=t('statuses',{returnObjects:true}); return <main><section className="page-intro"><p className="eyebrow">{t('listing.programsKicker')}</p><h1>{t('listing.programsTitle')}</h1></section><section className="listing-grid three">{programs.map((p,i)=><Link className={`listing-card ${p.className}`} to={p.path} key={p.path}><span>{statuses[i]}</span><h2>{p.name}</h2><strong>{t('listing.open')}</strong></Link>)}</section></main> }

function OrientationPage() { const {t}=useTranslation(); const facts=t('orientationPage.facts',{returnObjects:true}); return <main><section className="page-intro"><p className="eyebrow">{t('orientationPage.kicker')}</p><h1>{t('orientationPage.title')}</h1><p className="lead">{t('orientationPage.intro')}</p><div className="button-row"><a className="button" href="mailto:hello@houseofhoki.com?subject=Orientation%20call%20request">{t('orientationPage.email')} <span>→</span></a><Link className="text-link" to="/contact">{t('orientationPage.other')} <span>↗</span></Link></div></section><section className="detail-facts">{facts.map(([label,value])=><article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section></main> }

function ContactPage() { const {t}=useTranslation(); return <main><section className="page-intro"><p className="eyebrow">{t('contactPage.kicker')}</p><h1>{t('contactPage.title')}</h1><p className="lead">{t('contactPage.intro')}</p></section><section className="contact-grid"><a href="mailto:hello@houseofhoki.com"><span>Email</span><strong>hello@houseofhoki.com</strong></a><article><span>{t('contactPage.germany')}</span><strong>{t('contactPage.germanyText')}</strong></article><article><span>{t('contactPage.armenia')}</span><strong>{t('contactPage.armeniaText')}</strong></article></section><CrisisNotice/></main> }

function CrisisNotice() { const {t}=useTranslation(); return <aside className="crisis-notice"><strong>{t('crisis.title')}</strong><p>{t('crisis.text')}</p><Link to="/emergency-support">{t('crisis.link')}</Link></aside> }

function EmergencyPage() { const {t}=useTranslation(); const cards=t('emergency.cards',{returnObjects:true}); const links=['https://gesund.bund.de/en/notfallnummern','https://www.telefonseelsorge.de/','https://mia.gov.am/%D5%A1%D5%B0%D5%A1%D5%A6%D5%A1%D5%B6%D5%A3%D5%A5%D6%80%D5%AB-%D5%AF%D5%A1%D5%BC%D5%A1%D5%BE%D5%A1%D6%80%D5%B8%D6%82%D5%B4/','https://www.yerevan.am/en/news/erewani-k-aghak-apetarane-hogekan-arhoghjowt-yan-irazekman-nakhadzerhnowt-yown-hk-i-het-miasin-iraka/']; return <main><section className="page-intro"><p className="eyebrow">{t('emergency.kicker')}</p><h1>{t('emergency.title')}</h1><p className="lead">{t('emergency.intro')}</p></section><section className="support-grid">{cards.map(([label,number,link],i)=><article key={label}><span>{label}</span><h2>{number}</h2><a href={links[i]} target="_blank" rel="noreferrer">{link}</a></article>)}</section></main> }

function SimplePage({ kicker, title, children }) { return <main><section className="page-intro"><p className="eyebrow">{kicker}</p><h1>{title}</h1><div className="prose">{children}</div></section></main> }

function BookingPage({ lang }) { const navigate=useNavigate(); const {t}=useTranslation(); return <main className="booking-page"><div className="booking-heading"><p className="eyebrow">{t('bookingKicker')}</p><h1>{t('bookingTitle')}</h1><p className="booking-intro">{t('bookingIntro')}</p></div><div className="estimator-embedded"><StructuredEstimator lang={lang} onComplete={()=>navigate('/contact')}/></div><CrisisNotice/></main> }

function ScrollManager() { const { pathname }=useLocation(); useEffect(()=>{window.scrollTo(0,0)},[pathname]); return null }

function Footer({onCookieSettings}) { const {t}=useTranslation(); const footerLinks=t('footerLinks',{returnObjects:true}); const legal=t('legalLinks',{returnObjects:true}); return <footer><div><Logo/><p>{t('footer')}</p></div><div className="footer-links"><Link to="/sessions">{footerLinks[0]}</Link><Link to="/programs">{footerLinks[1]}</Link><Link to="/resources">{footerLinks[2]}</Link><Link to="/contact">{footerLinks[3]}</Link></div><div className="footer-meta"><span>© 2026 House of Hoki</span><span><Link to="/privacy">{legal[0]}</Link> · <Link to="/cookies">{legal[1]}</Link> · <button className="footer-cookie-button" onClick={onCookieSettings}>{t('cookieBanner.settingsTitle')}</button> · <Link to="/imprint">{legal[2]}</Link></span><strong>{t('ageNote')}</strong></div></footer> }

function CookieBanner({currentChoice,onChoose,onClose}) { const {t}=useTranslation(); const [details,setDetails]=useState(Boolean(currentChoice)); const [allowLanguage,setAllowLanguage]=useState(currentChoice==='preferences'); return <div className="cookie-backdrop"><aside className="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><div className="cookie-copy"><strong id="cookie-title">{t(details?'cookieBanner.settingsTitle':'cookieBanner.title')}</strong><p>{t('cookieBanner.text')}</p><Link to="/cookies" onClick={onClose}>{t('cookieBanner.policy')} →</Link></div>{details&&<div className="cookie-categories"><label className="cookie-category"><span><strong>{t('cookieBanner.necessary')}</strong><small>{t('cookieBanner.necessaryText')}</small></span><input type="checkbox" checked disabled aria-label={t('cookieBanner.necessary')}/></label><label className="cookie-category"><span><strong>{t('cookieBanner.preferenceCategory')}</strong><small>{t('cookieBanner.preferenceText')}</small></span><input type="checkbox" checked={allowLanguage} onChange={e=>setAllowLanguage(e.target.checked)} aria-label={t('cookieBanner.preferenceCategory')}/></label></div>}<div className="cookie-actions">{details?<><button className="cookie-button secondary" onClick={()=>onChoose('essential')}>{t('cookieBanner.reject')}</button><button className="cookie-button primary" onClick={()=>onChoose(allowLanguage?'preferences':'essential')}>{t('cookieBanner.save')}</button></>:<><button className="cookie-button secondary" onClick={()=>onChoose('essential')}>{t('cookieBanner.reject')}</button><button className="cookie-button secondary" onClick={()=>setDetails(true)}>{t('cookieBanner.customize')}</button><button className="cookie-button primary" onClick={()=>onChoose('preferences')}>{t('cookieBanner.accept')}</button></>}</div></aside></div> }

function Site() {
  const {t,i18n}=useTranslation()
  const lang=i18n.resolvedLanguage||'en'
  const readCookie=name=>document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]
  const [cookieChoice,setCookieChoice]=useState(()=>readCookie('hoki_cookie_choice')||'')
  const [showCookieSettings,setShowCookieSettings]=useState(()=>!readCookie('hoki_cookie_choice'))
  const saveCookie=(name,value)=>{document.cookie=`${name}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`}
  const removeCookie=name=>{document.cookie=`${name}=; Max-Age=0; Path=/; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`}
  const setLang=value=>{i18n.changeLanguage(value);if(cookieChoice==='preferences')saveCookie('hoki_lang',value)}
  const chooseCookies=choice=>{setCookieChoice(choice);setShowCookieSettings(false);saveCookie('hoki_cookie_choice',choice);if(choice==='preferences')saveCookie('hoki_lang',lang);else removeCookie('hoki_lang')}
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir='ltr'},[lang])
  const pages=t('pages',{returnObjects:true})
  const simple=(key,withCrisis=false)=>{const [kicker,title,...paragraphs]=pages[key];return <SimplePage kicker={kicker} title={title}>{paragraphs.map(text=><p key={text}>{text}</p>)}{withCrisis&&<CrisisNotice/>}</SimplePage>}
  return <><ScrollManager/><Header lang={lang} setLang={setLang}/><Routes><Route path="/" element={<HomePage lang={lang}/>}/><Route path="/sessions" element={<ListingPage type="sessions"/>}/><Route path="/activities" element={<ListingPage type="activities"/>}/><Route path="/programs" element={<ProgramsPage/>}/>{Object.entries(routePages[lang]||routePages.en).map(([path,page])=><Route key={`${lang}-${path}`} path={path} element={<DetailPage page={page}/>}/>)}<Route path="/booking" element={<BookingPage lang={lang}/>}/><Route path="/orientation-call" element={<OrientationPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/emergency-support" element={<EmergencyPage/>}/><Route path="/about" element={simple('about')}/><Route path="/resources" element={simple('resources',true)}/><Route path="/privacy" element={simple('privacy')}/><Route path="/cookies" element={simple('cookies')}/><Route path="/imprint" element={simple('imprint')}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes><Footer onCookieSettings={()=>setShowCookieSettings(true)}/>{showCookieSettings&&<CookieBanner currentChoice={cookieChoice} onChoose={chooseCookies} onClose={()=>setShowCookieSettings(false)}/>}</>
}

createRoot(document.getElementById('root')).render(<HashRouter><Site/></HashRouter>)
