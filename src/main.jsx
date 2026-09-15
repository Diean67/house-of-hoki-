import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './styles.css'

const copy = {
  en: {
    nav: ['Sessions', 'Activities', 'Programs', 'Resources', 'About'],
    book: 'Book a session',
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
      ['Is House of Hoki a medical service?', 'No. The current site uses neutral well-being and personal-growth language while Sarah’s professional scope and qualifications are being confirmed.'],
      ['Do I need an account?', 'No. You can request a session as a guest. An account is recommended for managing bookings and preferences.'],
      ['Is a requested time immediately confirmed?', 'Not yet. Sarah reviews every private session and orientation-call request before confirming it.'],
      ['Which languages are available?', 'House of Hoki supports English, German and Armenian. Each activity clearly states its operating language.']
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
    eyebrow: 'Wohlbefinden · persönliches Wachstum · Gemeinschaft', titleA: 'Ein Ort zum Ankommen.', titleB: 'Raum zum Wachsen.',
    intro: 'House of Hoki vereint persönliche Sitzungen, gemeinsame Aktivitäten und Community-Programme unter einem ruhigen Dach — online, bei Heidelberg und bald in Jerewan.',
    orient: 'Kostenlose 15-Min.-Orientierung', explore: 'Angebot entdecken', sectionKicker: 'Zwei Wege zum Anfang', sectionTitle: 'Persönlicher Raum. Gemeinsames Erleben.',
    sectionIntro: 'Wähle den Rahmen, der heute zu dir passt. Sarah prüft jede Anfrage persönlich, bevor etwas bestätigt wird.',
    privateTitle: 'Private Sitzungen', privateText: 'Ein fokussierter Raum, abgestimmt auf deine Ziele, dein Format und dein Tempo.', groupTitle: 'Gruppenaktivitäten', groupText: 'Begleitete Kreise und Workshops für Reflexion, Verbindung und praktisches Wachstum.',
    from: 'Ab', estimate: 'Persönliche Einschätzung', seeActivities: 'Aktivitäten ansehen', programsKicker: 'Ein Haus, mehrere Türen', programsTitle: 'Programme, die mit ihrer Gemeinschaft wachsen.',
    commonText: 'Ein kostenloses Community-Pilotprojekt in Armenien für 18- bis 45-Jährige, beginnend mit einem moderierten Gesprächskreis.', youthText: 'Programme für 16- bis 29-Jährige in Deutschland und Armenien — demnächst.', apply: 'Für Pilot bewerben', interest: 'Interesse anmelden',
    processKicker: 'Ein achtsamer erster Schritt', processTitle: 'Erst erkunden. Teilen, wenn du bereit bist.', steps: [['1','Anonym erkunden','Beantworte praktische Fragen — ohne Namen, E-Mail oder sensible Vorgeschichte.'],['2','Klare Einschätzung erhalten','Sieh Format, Dauer und eine transparente Preisspanne.'],['3','Termin anfragen','Teile Kontaktdaten erst, wenn du fortfahren möchtest.']],
    quote: '„Hoki“ bedeutet Geist — der Teil in uns, der Sinn, Verbindung und Raum zum Wachsen sucht.', locationTitle: 'In zwei Orten verwurzelt.', heidelberg: 'Bei Heidelberg', yerevan: 'Jerewan · demnächst', online: 'Online · wo du bist', faqTitle: 'Fragen, behutsam beantwortet.',
    faq: [['Ist House of Hoki ein medizinischer Dienst?','Nein. Die Website nutzt neutrale Begriffe, bis Sarahs beruflicher Umfang bestätigt ist.'],['Brauche ich ein Konto?','Nein. Du kannst als Gast anfragen. Ein Konto hilft bei der Verwaltung.'],['Ist mein Termin sofort bestätigt?','Nein. Sarah prüft jede Anfrage vor der Bestätigung.'],['Welche Sprachen gibt es?','Englisch, Deutsch und Armenisch. Jede Aktivität nennt ihre Sprache.']],
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
    eyebrow: 'Բարեկեցություն · անձնական աճ · համայնք', titleA: 'Վայր՝ կանգ առնելու։', titleB: 'Տարածք՝ դառնալու։',
    intro: 'House of Hoki-ն միավորում է անհատական հանդիպումները, խմբային գործունեությունն ու համայնքային ծրագրերը՝ առցանց, Հայդելբերգի մոտ և շուտով Երևանում։',
    orient: 'Անվճար 15 րոպե ծանոթացում', explore: 'Բացահայտել առաջարկները', sectionKicker: 'Սկսելու երկու ճանապարհ', sectionTitle: 'Անձնական տարածք։ Ընդհանուր փորձառություն։',
    sectionIntro: 'Ընտրեք այն միջավայրը, որը հիմա ձեզ հարմար է։ Սառան անձամբ դիտարկում է յուրաքանչյուր հարցում։', privateTitle: 'Անհատական հանդիպումներ', privateText: 'Կենտրոնացված անհատական տարածք՝ ձեր նպատակներին ու տեմպին համապատասխան։', groupTitle: 'Խմբային գործունեություն', groupText: 'Ուղղորդված շրջաններ և աշխատարաններ՝ մտորելու, կապվելու և աճելու համար։',
    from: 'Սկսած', estimate: 'Ստանալ գնահատում', seeActivities: 'Դիտել միջոցառումները', programsKicker: 'Մեկ տուն, մի քանի դուռ', programsTitle: 'Ծրագրեր, որոնք աճում են իրենց համայնքների հետ։',
    commonText: 'Անվճար համայնքային փորձնական ծրագիր Հայաստանում՝ 18–45 տարեկանների համար, որը սկսվում է քննարկման շրջանակից։', youthText: 'Շուտով՝ ծրագրեր 16–29 տարեկանների համար՝ Գերմանիայում և Հայաստանում։', apply: 'Դիմել փորձնական ծրագրին', interest: 'Գրանցել հետաքրքրությունը',
    processKicker: 'Խոհուն առաջին քայլ', processTitle: 'Նախ ուսումնասիրեք։ Կիսվեք՝ երբ պատրաստ լինեք։', steps: [['1','Ուսումնասիրել անանուն','Պատասխանեք մի քանի գործնական հարցի՝ առանց անվան կամ զգայուն պատմության։'],['2','Ստանալ հստակ գնահատում','Տեսեք առաջարկվող ձևաչափը, տևողությունն ու գնի միջակայքը։'],['3','Հարցում ուղարկել','Կիսվեք նվազագույն տվյալներով միայն շարունակելու դեպքում։']],
    quote: '«Հոգի»-ն մեր այն մասն է, որը փնտրում է իմաստ, կապ և աճելու տարածք։', locationTitle: 'Արմատավորված երկու վայրում։', heidelberg: 'Հայդելբերգի մոտ', yerevan: 'Երևան · շուտով', online: 'Առցանց · որտեղ էլ լինեք', faqTitle: 'Հարցեր՝ մեղմ պատասխաններով։',
    faq: [['Արդյո՞ք House of Hoki-ն բժշկական ծառայություն է։','Ոչ։ Կայքը օգտագործում է չեզոք բառապաշար, մինչև հաստատվի Սառայի մասնագիտական կարգավիճակը։'],['Հաշիվ պե՞տք է։','Ոչ։ Կարող եք հարցում ուղարկել որպես հյուր։'],['Ժամը անմիջապես հաստատվո՞ւմ է։','Ոչ։ Սառան դիտարկում է յուրաքանչյուր հարցում։'],['Ի՞նչ լեզուներ կան։','Անգլերեն, գերմաներեն և հայերեն։']],
    footer: 'Տարածք՝ կապվելու, խորհելու և աճելու համար։', estimateTitle: 'Գտեք ձեր մեկնարկային կետը', estimateIntro: 'Այս կարճ ուղեցույցը անանուն է և ախտորոշում չէ։',
    needsTitle: 'Ի՞նչը օգտակար կդարձնի այս հանդիպումը։', needsIntro: 'Կիսվեք միայն անհրաժեշտով՝ առանց անունների, ախտորոշումների կամ նույնականացնող տվյալների։', needsPlaceholder: 'Օրինակ՝ ցանկանում եմ աջակցություն փոփոխության ընթացքում, հանգիստ ընթացք և գործնական հաջորդ քայլեր…',
    aiTitle: 'Պատրաստում ենք ձեր գնահատումը', aiIntro: 'ԱԲ-ի օգնությամբ պլանավորումը առաջարկում է տևողություն և գնի միջակայք։ Այն ախտորոշում չէ և չի փոխարինում Սառայի դիտարկմանը։', analyze: 'Ստեղծել գնահատումը',
    paymentTitle: 'Նախընտրելի վճարման եղանակ', paymentIntro: 'Այժմ նշեք նախընտրությունը։ Վճարումը կատարվում է միայն հանդիպման և վերջնական գնի հաստատումից հետո։', paypal: 'PayPal', visa: 'Visa / քարտ', payLater: 'Ընտրել հետո',
    bookingKicker: 'Գաղտնիությունը՝ առաջնային', bookingTitle: 'Պլանավորեք ձեր հանդիպումը։', bookingIntro: 'Տասը կառուցվածքային հարցերը ստեղծում են հետևողական պլանավորման հիմք։ Այս նախատիպը պատասխանները պահում է միայն այս դիտարկիչում և արտաքին համակարգերին ոչինչ չի ուղարկում։',
    answerHint: 'Ընտրեք ձեզ առավել համապատասխան պատասխանը։ Ճիշտ կամ սխալ պատասխան չկա։',
    next: 'Հաջորդը', back: 'Հետ', request: 'Շարունակել հարցումը', close: 'Փակել'
  }
}

const programs = [
  { mark: 'CC', name: 'Common Club', status: 'Pilot · Armenia', className: 'clay', path: '/programs/common-club' },
  { mark: 'HY', name: 'Hoki for Youth', status: 'Germany · coming soon', className: 'sage', path: '/programs/hoki-youth-germany' },
  { mark: 'HY', name: 'Hoki for Youth', status: 'Armenia · coming soon', className: 'sand', path: '/programs/hoki-youth-armenia' },
]

function Logo() {
  return <div className="logo" aria-label="House of Hoki"><span className="logo-mark">H</span><span>House of Hoki<small>placeholder wordmark</small></span></div>
}

function Header({ lang, setLang }) {
  const t = copy[lang]
  const paths = ['/sessions','/activities','/programs','/resources','/about']
  return <header className="header"><Link className="logo-link" to="/"><Logo/></Link><nav aria-label="Main navigation">{t.nav.map((n,i)=><Link key={n} to={paths[i]}>{n}</Link>)}</nav><div className="header-actions"><label className="sr-only" htmlFor="lang">Language</label><select id="lang" value={lang} onChange={e=>setLang(e.target.value)}><option value="en">EN</option><option value="de">DE</option><option value="hy">HY</option></select><Link className="button small" to="/booking">{t.book}</Link></div></header>
}

function Art({ variant='arch' }) { return <div className={`art ${variant}`} aria-hidden="true"><span/><i/><b/></div> }

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
  const t=copy[lang]
  const questions=intakeQuestionTranslations[lang]||intakeQuestions
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
  const suggestedSetting=settingScore>=4?'small group':settingScore===3?'private or small group':'private'
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
    {step<questionCount&&<><p className="question-domain">{question.domain}</p><h2 id="structured-title">{question.prompt}</h2><p>{t.answerHint}</p><div className="scale-options">{question.options.map(([value,label],index)=><button key={value} className={String(responses[question.id])===String(value)?'scale-option selected':'scale-option'} onClick={()=>setResponses({...responses,[question.id]:value})}><b>{index+1}</b><span>{label}</span><i>{String(responses[question.id])===String(value)?'✓':''}</i></button>)}</div></>}
    {step===descriptionStep&&<><p className="question-domain">Additional context · optional</p><h2 id="structured-title">Anything else you would like Sarah to know?</h2><p>Your wording will appear unchanged in the professional-only report. Do not include names or details about other people.</p><label className="needs-field"><span className="sr-only">Optional description</span><textarea maxLength="1200" value={description} placeholder={t.needsPlaceholder} onChange={e=>setDescription(e.target.value)}/><small>{description.length} / 1200</small></label></>}
    {step===analysisStep&&<div className="ai-review"><div className={analyzing?'ai-orb working':'ai-orb'} aria-hidden="true">✦</div><p className="question-domain">Client Context Model</p><h2 id="structured-title">Preparing consistent booking guidance</h2><p>The production LLM will receive coded answers and return a fixed-schema professional report. This prototype processes everything locally.</p><div className="privacy-note"><strong>Professional only</strong><span>The internal summary is not displayed to the customer. The customer sees only suggested format, duration and price.</span></div></div>}
    {step===resultStep&&<><p className="question-domain">Your booking guidance</p><h2 id="structured-title">A suggested starting point</h2><div className="result-card"><span>Suggested format</span><strong>{suggestedSetting}</strong><span>Suggested duration</span><strong>{recommendedMinutes} minutes</strong><span>Estimated range</span><strong>{estimate.priceRange}</strong><small>Sarah reviews the internal profile and confirms all details. This is not a diagnosis or automated professional decision.</small></div><fieldset className="payment-options"><legend>{t.paymentTitle}</legend>{[['paypal',t.paypal],['visa',t.visa],['later',t.payLater]].map(([value,label])=><button type="button" key={value} className={payment===value?'payment-option selected':'payment-option'} onClick={()=>setPayment(value)}><span className="payment-symbol">{value==='paypal'?'P':value==='visa'?'V':'○'}</span><span>{label}</span><i>{payment===value?'✓':''}</i></button>)}</fieldset></>}
    <div className="modal-actions">{step>0&&<button className="text-button" disabled={analyzing} onClick={()=>setStep(current=>current-1)}>{t.back}</button>}<button className="button" disabled={nextDisabled||analyzing} onClick={advance}>{step===analysisStep?(analyzing?'Preparing…':'Prepare guidance'):step===resultStep?t.request:t.next}</button></div></section>
}

function HomePage({ lang }) {
  const [openFaq,setOpenFaq] = useState(0)
  const t = copy[lang]
  return <main>
      <section className="hero"><div className="hero-copy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleA}<em>{t.titleB}</em></h1><p className="lead">{t.intro}</p><div className="button-row"><Link className="button" to="/booking">{t.book}<span>→</span></Link><Link className="text-link" to="/sessions">{t.explore}<span>→</span></Link></div><div className="trust-row"><span>EN · DE · ՀՅ</span><span>Online & in person</span><span>Private by design</span></div></div><Art/></section>

      <section className="section intro-section"><div className="section-heading"><p className="eyebrow">{t.sectionKicker}</p><h2>{t.sectionTitle}</h2><p>{t.sectionIntro}</p></div><div className="service-grid"><article className="service-card"><div className="card-top"><span>01</span><Art variant="orb"/></div><h3>{t.privateTitle}</h3><p>{t.privateText}</p><div className="price"><span>{t.from}</span><strong>€85</strong><small>/ 60 min</small></div><Link className="card-link" to="/sessions/private-session">{t.estimate}<span>↗</span></Link></article><article className="service-card inverse"><div className="card-top"><span>02</span><Art variant="rings"/></div><h3>{t.groupTitle}</h3><p>{t.groupText}</p><div className="price"><span>{t.from}</span><strong>Free</strong><small>pilot activities</small></div><Link className="card-link" to="/activities/discussion-circle">{t.seeActivities}<span>↗</span></Link></article></div></section>

      <section className="program-section"><div className="section-heading light"><p className="eyebrow">{t.programsKicker}</p><h2>{t.programsTitle}</h2></div><div className="program-list">{programs.map((p,i)=><article className="program" key={p.status}><div className={`program-mark ${p.className}`}>{p.mark}</div><div><span>{p.status}</span><h3>{p.name}</h3><p>{i===0?t.commonText:t.youthText}</p></div><Link to={p.path} aria-label={`${i===0?t.apply:t.interest}: ${p.name}`}>{i===0?t.apply:t.interest}<span>→</span></Link></article>)}</div></section>

      <section className="section process" id="resources"><div className="section-heading"><p className="eyebrow">{t.processKicker}</p><h2>{t.processTitle}</h2></div><div className="steps">{t.steps.map(([n,title,desc])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section className="quote-section"><Art variant="flow"/><blockquote>{t.quote}</blockquote></section>

      <section className="section locations" id="about"><div className="section-heading"><p className="eyebrow">House of Hoki</p><h2>{t.locationTitle}</h2></div><div className="location-grid"><article><span>DE</span><h3>{t.heidelberg}</h3><p>Private sessions · weekdays</p></article><article><span>AM</span><h3>{t.yerevan}</h3><p>Programs · community · sessions</p></article><article><span>∞</span><h3>{t.online}</h3><p>English · Deutsch · Հայերեն</p></article></div></section>

      <section className="section faq-section"><div className="section-heading"><p className="eyebrow">FAQ</p><h2>{t.faqTitle}</h2></div><div className="faq-list">{t.faq.map(([q,a],i)=><article className={openFaq===i?'faq open':'faq'} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{String(i+1).padStart(2,'0')}</span><strong>{q}</strong><i>{openFaq===i?'−':'+'}</i></button>{openFaq===i&&<p>{a}</p>}</article>)}</div></section>

      <section className="cta"><p className="eyebrow">Your first step can be small</p><h2>{t.titleA}<br/>{t.titleB}</h2><div className="button-row"><Link className="button pale" to="/booking">{t.book}<span>→</span></Link><Link className="text-link pale" to="/orientation-call">{t.orient}<span>↗</span></Link></div></section>
    </main>
}

const routePages = {
  '/sessions/private-session': { kicker:'Private sessions', title:'A focused space for you.', intro:'A one-to-one session shaped around your goals, preferred format and pace.', facts:[['Format','Online · Heidelberg · Yerevan soon'],['Duration','60–120 minutes'],['Price','Starting at €85']], action:'Start your estimate' },
  '/activities/discussion-circle': { kicker:'Group activity', title:'Meet through meaningful conversation.', intro:'A facilitated discussion circle designed as the first Common Club pilot activity.', facts:[['Location','Yerevan'],['Language','Armenian · English'],['Availability','Pilot dates coming soon']], action:'Register interest' },
  '/programs/common-club': { kicker:'Common Club · Armenia', title:'Come together around what we share.', intro:'A free community pilot for people aged 18–45, owned with an independent program partner and facilitated with Sarah.', facts:[['Age','18–45'],['First format','Discussion circle'],['Admission','Questionnaire + approval']], action:'Apply to the pilot' },
  '/programs/hoki-youth-germany': { kicker:'Hoki for Youth · Germany', title:'A shared language for growing forward.', intro:'A developing well-being program for young people, sharing one identity with Hoki for Youth Armenia.', facts:[['Age','16–29'],['Region','Near Heidelberg'],['Status','Registering interest']], action:'Register interest' },
  '/programs/hoki-youth-armenia': { kicker:'Hoki for Youth · Armenia', title:'Local roots. Shared possibility.', intro:'A developing multilingual well-being program for young people in Armenia.', facts:[['Age','16–29'],['Region','Yerevan'],['Status','Registering interest']], action:'Register interest' },
}

function DetailPage({ page }) {
  return <main><section className="detail-hero"><div><p className="eyebrow">{page.kicker}</p><h1>{page.title}</h1><p className="lead">{page.intro}</p><div className="button-row"><Link className="button" to="/booking">{page.action}<span>→</span></Link><Link className="text-link" to="/orientation-call">Ask for a 15-min orientation<span>↗</span></Link></div></div><Art variant="orb"/></section><section className="detail-facts">{page.facts.map(([label,value])=><article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="detail-body"><p className="eyebrow">What to expect</p><h2>Clear information before commitment.</h2><div className="detail-columns"><p>Begin anonymously with a short questionnaire. The planning estimate helps identify a suitable starting format, duration and transparent price range.</p><p>Sarah reviews every request. A time, session plan and final price are confirmed before any payment is requested.</p></div></section></main>
}

function ListingPage({ type }) {
  const sessions = type==='sessions'
  return <main><section className="page-intro"><p className="eyebrow">House of Hoki</p><h1>{sessions?'Sessions made personal.':'Activities made to connect.'}</h1><p className="lead">{sessions?'Begin with an individual page that explains the format, range and next step.':'Explore current pilots and the group formats planned for the House of Hoki community.'}</p></section><section className="listing-grid">{sessions?<Link className="listing-card blush" to="/sessions/private-session"><span>01</span><h2>Private session</h2><p>Individual · couple · family</p><strong>Explore →</strong></Link>:<><Link className="listing-card chartreuse" to="/activities/discussion-circle"><span>01</span><h2>Discussion circle</h2><p>Common Club pilot · Yerevan</p><strong>Explore →</strong></Link><Link className="listing-card ice" to="/programs/common-club"><span>02</span><h2>Community activities</h2><p>More formats will follow the pilot.</p><strong>Explore →</strong></Link></>}</section></main>
}

function ProgramsPage() { return <main><section className="page-intro"><p className="eyebrow">One house · several doors</p><h1>Programs with their own purpose.</h1></section><section className="listing-grid three">{programs.map(p=><Link className={`listing-card ${p.className}`} to={p.path} key={p.path}><span>{p.status}</span><h2>{p.name}</h2><strong>Open program →</strong></Link>)}</section></main> }

function OrientationPage() { return <main><section className="page-intro"><p className="eyebrow">Free · 15 minutes</p><h1>Start with a short conversation.</h1><p className="lead">Request a normal call or WhatsApp orientation. Sarah reviews each request before confirming a time.</p><div className="button-row"><a className="button" href="mailto:hello@houseofhoki.com?subject=Orientation%20call%20request">Request by email <span>→</span></a><Link className="text-link" to="/contact">Other contact options <span>↗</span></Link></div></section><section className="detail-facts"><article><span>Length</span><strong>15 minutes</strong></article><article><span>Cost</span><strong>Free</strong></article><article><span>Confirmation</span><strong>Sarah approves</strong></article></section></main> }

function ContactPage() { return <main><section className="page-intro"><p className="eyebrow">Contact</p><h1>Choose what feels comfortable.</h1><p className="lead">Business email is available now. Separate German and Armenian WhatsApp, phone and Telegram details will be added after verification.</p></section><section className="contact-grid"><a href="mailto:hello@houseofhoki.com"><span>Email</span><strong>hello@houseofhoki.com</strong></a><article><span>Germany</span><strong>WhatsApp + phone · coming soon</strong></article><article><span>Armenia</span><strong>WhatsApp + phone + Telegram · coming soon</strong></article></section><CrisisNotice/></main> }

function CrisisNotice() { return <aside className="crisis-notice"><strong>Need urgent support?</strong><p>House of Hoki is not an emergency service. If you or someone else is in immediate danger, contact local emergency services.</p><Link to="/emergency-support">View verified support contacts →</Link></aside> }

function EmergencyPage() { return <main><section className="page-intro"><p className="eyebrow">Immediate support</p><h1>You do not have to handle a crisis alone.</h1><p className="lead">These external services are independent from House of Hoki. Availability can change; use the linked official source for current details.</p></section><section className="support-grid"><article><span>Germany · immediate danger</span><h2>Call 112</h2><a href="https://gesund.bund.de/en/notfallnummern" target="_blank" rel="noreferrer">Official German guidance ↗</a></article><article><span>Germany · emotional crisis</span><h2>Call 116 123</h2><a href="https://www.telefonseelsorge.de/" target="_blank" rel="noreferrer">TelefonSeelsorge ↗</a></article><article><span>Armenia · immediate danger</span><h2>Call 112</h2><a href="https://mia.gov.am/%D5%A1%D5%B0%D5%A1%D5%A6%D5%A1%D5%B6%D5%A3%D5%A5%D6%80%D5%AB-%D5%AF%D5%A1%D5%BC%D5%A1%D5%BE%D5%A1%D6%80%D5%B8%D6%82%D5%B4/" target="_blank" rel="noreferrer">Armenian Ministry of Internal Affairs ↗</a></article><article><span>Yerevan · emotional support</span><h2>0800 00 900</h2><a href="https://www.yerevan.am/en/news/erewani-k-aghak-apetarane-hogekan-arhoghjowt-yan-irazekman-nakhadzerhnowt-yown-hk-i-het-miasin-iraka/" target="_blank" rel="noreferrer">Yerevan Municipality information ↗</a></article></section></main> }

function SimplePage({ kicker, title, children }) { return <main><section className="page-intro"><p className="eyebrow">{kicker}</p><h1>{title}</h1><div className="prose">{children}</div></section></main> }

function BookingPage({ lang }) { const navigate=useNavigate(); const t=copy[lang]; return <main className="booking-page"><div className="booking-heading"><p className="eyebrow">{t.bookingKicker}</p><h1>{t.bookingTitle}</h1><p className="booking-intro">{t.bookingIntro}</p></div><div className="estimator-embedded"><StructuredEstimator lang={lang} onComplete={()=>navigate('/contact')}/></div><CrisisNotice/></main> }

function ScrollManager() { const { pathname }=useLocation(); useEffect(()=>{window.scrollTo(0,0)},[pathname]); return null }

function Footer({ t }) { return <footer><div><Logo/><p>{t.footer}</p></div><div className="footer-links"><Link to="/sessions">Services</Link><Link to="/programs">Programs</Link><Link to="/resources">Resources</Link><Link to="/contact">Contact</Link></div><div className="footer-meta"><span>© 2026 House of Hoki</span><span><Link to="/privacy">Privacy</Link> · <Link to="/cookies">Cookies</Link> · <Link to="/imprint">Imprint</Link></span><strong>18+ general services</strong></div></footer> }

function Site() {
  const [lang,setLangState] = useState(()=>localStorage.getItem('hoki-lang')||'en')
  const t=copy[lang]
  const setLang=value=>{setLangState(value);localStorage.setItem('hoki-lang',value);document.documentElement.lang=value}
  useEffect(()=>{document.documentElement.lang=lang},[lang])
  return <><ScrollManager/><Header lang={lang} setLang={setLang}/><Routes><Route path="/" element={<HomePage lang={lang}/>}/><Route path="/sessions" element={<ListingPage type="sessions"/>}/><Route path="/activities" element={<ListingPage type="activities"/>}/><Route path="/programs" element={<ProgramsPage/>}/>{Object.entries(routePages).map(([path,page])=><Route key={path} path={path} element={<DetailPage page={page}/>}/>)}<Route path="/booking" element={<BookingPage lang={lang}/>}/><Route path="/orientation-call" element={<OrientationPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/emergency-support" element={<EmergencyPage/>}/><Route path="/about" element={<SimplePage kicker="About" title="A home for thoughtful growth."><p>House of Hoki is developing as an umbrella platform for private sessions, shared activities and independently owned community programs.</p><p>Sarah’s final professional title, biography and qualifications will be published only after they are confirmed.</p></SimplePage>}/><Route path="/resources" element={<SimplePage kicker="Resources" title="Useful ideas, carefully shared."><p>Articles, frequently asked questions and practical well-being resources will be added after editorial and professional review.</p><CrisisNotice/></SimplePage>}/><Route path="/privacy" element={<SimplePage kicker="Legal draft" title="Privacy notice"><p>This page is a structural placeholder. A GDPR-reviewed privacy notice must be completed before collecting booking, questionnaire, analytics or payment data.</p></SimplePage>}/><Route path="/cookies" element={<SimplePage kicker="Legal draft" title="Cookie preferences"><p>Only essential language storage is currently used. Analytics and marketing cookies must remain off until a consent platform and final policy are configured.</p></SimplePage>}/><Route path="/imprint" element={<SimplePage kicker="Legal draft" title="Imprint"><p>Responsible entity, address, contact information and professional/legal disclosures must be supplied before public launch.</p></SimplePage>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes><Footer t={t}/></>
}

createRoot(document.getElementById('root')).render(<HashRouter><Site/></HashRouter>)
