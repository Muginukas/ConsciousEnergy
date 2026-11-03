import type { Bi } from '../zodiac'

/**
 * Plain-language meaning of every planet pair (and planets with ASC / MC).
 * theme — what the two parts of you "talk about"
 * easy  — how it shows up with a flowing aspect (trine, sextile, easy conjunction)
 * hard  — how it shows up with a tense aspect (square, opposition)
 * tip   — one practical suggestion
 */
export interface PairMeaning {
  theme: Bi
  easy: Bi
  hard: Bi
  tip: Bi
}

const P = (
  themeEn: string, themeLt: string,
  easyEn: string, easyLt: string,
  hardEn: string, hardLt: string,
  tipEn: string, tipLt: string
): PairMeaning => ({
  theme: { en: themeEn, lt: themeLt },
  easy: { en: easyEn, lt: easyLt },
  hard: { en: hardEn, lt: hardLt },
  tip: { en: tipEn, lt: tipLt },
})

export const PAIRS: Record<string, PairMeaning> = {
  /* ── Sun ── */
  'sun-moon': P(
    'What you want (Sun) and what you need to feel safe (Moon) — your head and your heart.',
    'Ko norite (Saulė) ir ko jums reikia, kad jaustumėtės saugiai (Mėnulis) — jūsų protas ir širdis.',
    'Your goals and your feelings pull in the same direction, so you feel whole and at peace with yourself. People sense you are “all of one piece”.',
    'Jūsų tikslai ir jausmai traukia ta pačia kryptimi, todėl jaučiatės vientisas ir ramus su savimi. Žmonės jaučia, kad esate „iš vieno gabalo“.',
    'You often want one thing but feel another — e.g. you chase a career while part of you longs for home. This inner tug can feel tiring, yet it makes you very self-aware.',
    'Dažnai norite vieno, o jaučiate kita — pvz., siekiate karjeros, o dalis jūsų ilgisi namų. Šis vidinis traukimas vargina, bet daro jus labai sąmoningą.',
    'Before big decisions ask two questions: “What do I want?” and “What do I need?” — and look for an option that honours both.',
    'Prieš svarbius sprendimus paklauskite savęs dviejų dalykų: „Ko aš noriu?“ ir „Ko man reikia?“ — ir ieškokite varianto, kuris gerbia abu.'
  ),
  'sun-mercury': P(
    'Your identity and your way of thinking and speaking.',
    'Jūsų tapatybė ir jūsų mąstymo bei kalbėjimo būdas.',
    'You think and speak exactly like who you are — your words carry your personality and conviction.',
    'Mąstote ir kalbate lygiai taip, kas esate — jūsų žodžiuose jaučiasi asmenybė ir įsitikinimas.',
    'You may identify so strongly with your opinions that criticism of an idea feels like criticism of you.',
    'Galite taip stipriai tapatintis su savo nuomonėmis, kad idėjos kritika atrodo kaip jūsų kritika.',
    'Practise saying “that’s one idea” instead of “that’s what I think” — it makes listening easier.',
    'Treniruokitės sakyti „tai viena iš idėjų“, o ne „aš taip manau“ — tai palengvina klausymąsi.'
  ),
  'sun-venus': P(
    'Your identity and your capacity for love, beauty and pleasure.',
    'Jūsų tapatybė ir gebėjimas mylėti, kurti grožį bei mėgautis.',
    'You are naturally charming and warm. Art, beauty and harmony are part of who you are, and people enjoy your company.',
    'Esate natūraliai žavus ir šiltas. Menas, grožis ir harmonija yra jūsų dalis, žmonės mėgsta jūsų draugiją.',
    'You may want to be liked so much that you avoid conflict or say yes when you mean no.',
    'Galite taip norėti patikti, kad vengiate konfliktų arba sakote „taip“, kai galvojate „ne“.',
    'Your charm is a gift — use it to bring people together, but keep an honest “no” in your pocket.',
    'Jūsų žavesys — dovana; naudokite jį jungti žmones, bet visada turėkite nuoširdų „ne“.'
  ),
  'sun-mars': P(
    'Your identity and your drive, courage and anger.',
    'Jūsų tapatybė ir jūsų varomoji jėga, drąsa bei pyktis.',
    'You have plenty of energy and courage. When you decide something, you act — people see you as strong and decisive.',
    'Turite daug energijos ir drąsos. Kai ką nusprendžiate — veikiate; žmonės jus mato kaip stiprų ir ryžtingą.',
    'Energy can come out as impatience, rushing or quick anger. You may feel you must constantly prove yourself.',
    'Energija gali prasiveržti kaip nekantrumas, skubėjimas ar greitas pyktis. Galite jausti, kad nuolat turite kažką įrodyti.',
    'Give this fire a daily outlet: sport, physical work or breath of fire. A tired body makes a calm mind.',
    'Kasdien duokite šiai ugniai išeitį: sportas, fizinis darbas ar „ugnies kvėpavimas“. Pavargęs kūnas — ramus protas.'
  ),
  'sun-jupiter': P(
    'Your identity and your optimism, faith and urge to grow.',
    'Jūsų tapatybė ir jūsų optimizmas, tikėjimas bei noras augti.',
    'You tend to be lucky, generous and optimistic. You inspire others and doors often open for you.',
    'Dažnai sekasi, esate dosnus ir optimistiškas. Įkvepiate kitus, ir durys jums dažnai atsiveria.',
    'You may overdo things: promise too much, spend too much or believe everything will work out without effort.',
    'Galite persistengti: per daug žadėti, per daug išleisti ar tikėti, kad viskas susitvarkys be pastangų.',
    'Dream big, but write down a concrete first step — Jupiter needs a little structure to deliver.',
    'Svajokite plačiai, bet užsirašykite konkretų pirmą žingsnį — Jupiteriui reikia šiek tiek struktūros.'
  ),
  'sun-saturn': P(
    'Your identity and your sense of duty, discipline and limits.',
    'Jūsų tapatybė ir jūsų pareigos jausmas, disciplina bei ribos.',
    'You are responsible, patient and reliable. You build slowly but what you build lasts, and you mature well with age.',
    'Esate atsakingas, kantrus ir patikimas. Kuriate lėtai, bet tai, ką sukuriate, išlieka; su amžiumi tik stiprėjate.',
    'You may feel you are never good enough, carry a heavy inner critic, or felt pressure from a parent or authority early on.',
    'Galite jausti, kad niekada nesate pakankamai geras, nešiotis griežtą vidinį kritiką ar anksti jausti tėvų ar autoritetų spaudimą.',
    'Praise yourself for small steps. Your success comes later than others’ — but it comes and it stays.',
    'Pagirkite save už mažus žingsnius. Jūsų sėkmė ateina vėliau nei kitų — bet ateina ir išlieka.'
  ),
  'sun-uranus': P(
    'Your identity and your need for freedom and originality.',
    'Jūsų tapatybė ir jūsų laisvės bei originalumo poreikis.',
    'You are original and inventive, unafraid to be different. You bring fresh ideas and change wherever you go.',
    'Esate originalus ir išradingas, nebijote būti kitoks. Kur bepasirodytumėte, atnešate naujų idėjų ir pokyčių.',
    'You may rebel automatically, change direction suddenly or feel you don’t fit anywhere.',
    'Galite automatiškai maištauti, staiga keisti kryptį ar jausti, kad niekur netinkate.',
    'Your difference is your contribution. Find a community of fellow “outsiders” — you will feel at home.',
    'Jūsų kitoniškumas — jūsų indėlis. Suraskite panašių „kitokių“ bendruomenę — jausitės kaip namie.'
  ),
  'sun-neptune': P(
    'Your identity and your imagination, sensitivity and spirituality.',
    'Jūsų tapatybė ir jūsų vaizduotė, jautrumas bei dvasingumas.',
    'You are intuitive, artistic and compassionate. You may have a gift for music, film, healing or spiritual work.',
    'Esate intuityvus, meniškas ir užjaučiantis. Galite turėti dovaną muzikai, kinui, gydymui ar dvasiniam darbui.',
    'Your sense of self can feel foggy; you may idealise others, escape into fantasy or have trouble saying who you really are.',
    'Savęs pojūtis gali būti miglotas; galite idealizuoti kitus, bėgti į fantazijas ar sunkiai pasakyti, kas iš tiesų esate.',
    'Ground your sensitivity with routine: regular sleep, nature and a creative practice turn dreams into reality.',
    'Įžeminkite jautrumą rutina: reguliarus miegas, gamta ir kūrybinė praktika paverčia svajones realybe.'
  ),
  'sun-pluto': P(
    'Your identity and your power, depth and capacity for transformation.',
    'Jūsų tapatybė ir jūsų galia, gelmė bei gebėjimas transformuotis.',
    'You have strong willpower and psychological insight. You can rise again after any crisis — like a phoenix.',
    'Turite stiprią valią ir psichologinę įžvalgą. Po bet kokios krizės galite pakilti iš naujo — kaip feniksas.',
    'Life may bring intense power struggles or crises; you may try to control everything or fear losing control.',
    'Gyvenimas gali atnešti intensyvių galios kovų ar krizių; galite bandyti viską kontroliuoti arba bijoti prarasti kontrolę.',
    'Let go of what has ended. Your power grows each time you transform instead of holding on.',
    'Paleiskite tai, kas baigėsi. Jūsų galia auga kiekvieną kartą, kai transformuojatės, o ne laikotės.'
  ),
  'sun-asc': P(
    'Who you are inside and how others see you.',
    'Kas esate viduje ir kaip jus mato kiti.',
    'What people see is what you are — your personality shines clearly and you make a strong first impression.',
    'Ką žmonės mato, tas ir esate — jūsų asmenybė aiškiai spindi, paliekate stiprų pirmą įspūdį.',
    'People may misread you at first; your outer style and inner self feel different and need time to align.',
    'Žmonės iš pradžių gali jus suprasti klaidingai; išorinis stilius ir vidinė esybė skiriasi ir jiems reikia laiko susiderinti.',
    'Let people get to know you over time — your depth shows after the first impression.',
    'Leiskite žmonėms pažinti jus pamažu — jūsų gelmė atsiskleidžia po pirmo įspūdžio.'
  ),
  'sun-mc': P(
    'Your identity and your career, public role and life direction.',
    'Jūsų tapatybė ir jūsų karjera, viešas vaidmuo bei gyvenimo kryptis.',
    'Your calling fits who you are; recognition comes naturally when you simply do what you love.',
    'Jūsų pašaukimas atitinka tai, kas esate; pripažinimas ateina natūraliai, kai tiesiog darote tai, ką mylite.',
    'Career and personal identity may pull apart — what you do for a living may not feel like “you”.',
    'Karjera ir asmeninė tapatybė gali nesutapti — tai, ką dirbate, gali atrodyti „ne jūsų“.',
    'Ask: “What would I do even without pay?” — your vocation hides in that answer.',
    'Paklauskite: „Ką daryčiau net be atlygio?“ — jūsų pašaukimas slypi šiame atsakyme.'
  ),

  /* ── Moon ── */
  'moon-mercury': P(
    'Your feelings and your thoughts — how you talk about emotions.',
    'Jūsų jausmai ir mintys — kaip kalbate apie emocijas.',
    'You can put feelings into words easily; you are a good listener and have emotional intelligence.',
    'Lengvai išreiškiate jausmus žodžiais; esate geras klausytojas ir turite emocinio intelekto.',
    'Your mind and heart argue: you may overthink feelings or speak emotionally and later regret it.',
    'Protas ir širdis ginčijasi: galite per daug analizuoti jausmus arba kalbėti emocijų pagauti ir vėliau gailėtis.',
    'Journaling helps: write feelings down first, decide what to say later.',
    'Padeda dienoraštis: pirma užrašykite jausmus, o ką pasakyti — nuspręskite vėliau.'
  ),
  'moon-venus': P(
    'Your emotional needs and your way of loving and enjoying life.',
    'Jūsų emociniai poreikiai ir jūsų būdas mylėti bei mėgautis gyvenimu.',
    'You are gentle, affectionate and caring. You create a cosy, beautiful home and people feel comfortable around you.',
    'Esate švelnus, meilus ir rūpestingas. Kuriate jaukius, gražius namus, žmonės šalia jūsų jaučiasi patogiai.',
    'You may seek comfort in food, shopping or approval, or confuse being needed with being loved.',
    'Galite ieškoti paguodos maiste, pirkiniuose ar pritarime, arba painioti „būti reikalingam“ su „būti mylimam“.',
    'Give yourself the tenderness you give others — a warm bath, music or time with a friend.',
    'Duokite sau tą švelnumą, kurį dovanojate kitiems — šilta vonia, muzika ar laikas su draugu.'
  ),
  'moon-mars': P(
    'Your feelings and your anger, drive and reactions.',
    'Jūsų jausmai ir jūsų pyktis, varomoji jėga bei reakcijos.',
    'You act on your feelings with courage and protect the people you love. Emotions give you energy.',
    'Veikiate pagal jausmus drąsiai ir ginate tuos, kuriuos mylite. Emocijos suteikia jums energijos.',
    'You may react quickly and hotly — feelings turn into irritation or arguments before you notice.',
    'Galite reaguoti greitai ir karštai — jausmai virsta irzlumu ar ginču, dar nespėjus pastebėti.',
    'When you feel the heat rise, take ten slow breaths or move your body before responding.',
    'Pajutę kylantį karštį, prieš atsakydami padarykite dešimt lėtų įkvėpimų arba pajudinkite kūną.'
  ),
  'moon-jupiter': P(
    'Your feelings and your optimism, generosity and faith.',
    'Jūsų jausmai ir jūsų optimizmas, dosnumas bei tikėjimas.',
    'You are emotionally generous, hopeful and kind. You recover from sadness quickly and lift others’ spirits.',
    'Esate emociškai dosnus, viltingas ir geras. Greitai atsigaunate po liūdesio ir pakeliate kitų nuotaiką.',
    'You may overindulge to feel good (food, promises, spending) or exaggerate emotions.',
    'Galite persistengti, norėdami jaustis gerai (maistas, pažadai, išlaidos), arba perdėti emocijas.',
    'Share your abundance, but notice when “more” is filling an emotional gap.',
    'Dalinkitės savo gausa, bet pastebėkite, kada „daugiau“ užpildo emocinę tuštumą.'
  ),
  'moon-saturn': P(
    'Your feelings and your discipline, fears and responsibility.',
    'Jūsų jausmai ir jūsų disciplina, baimės bei atsakomybė.',
    'You are emotionally stable, loyal and dependable — others lean on you in hard times.',
    'Esate emociškai stabilus, ištikimas ir patikimas — sunkiu metu kiti remiasi į jus.',
    'You may hold feelings back, feel lonely or believe you must be strong all the time; childhood may have felt strict or cold.',
    'Galite sulaikyti jausmus, jaustis vienišas ar tikėti, kad visada turite būti stiprus; vaikystė galėjo būti griežta ar šalta.',
    'It is safe to need others. Start by sharing one small feeling with someone you trust.',
    'Būti kitiems reikalingam — saugu. Pradėkite nuo vieno mažo jausmo, pasidalinto su patikimu žmogumi.'
  ),
  'moon-uranus': P(
    'Your emotional needs and your need for freedom and change.',
    'Jūsų emociniai poreikiai ir jūsų laisvės bei pokyčių poreikis.',
    'You need space and independence in relationships and stay open-minded about unusual ways of living.',
    'Santykiuose jums reikia erdvės ir nepriklausomybės; esate atviras netradiciniams gyvenimo būdams.',
    'Moods can change suddenly; you may push people away when they get too close or feel restless at home.',
    'Nuotaikos gali keistis staiga; galite atstumti žmones, kai jie priartėja per arti, ar jaustis neramiai namie.',
    'Build freedom into your relationships (own time, own space) rather than running from them.',
    'Įtraukite laisvę į santykius (savas laikas, sava erdvė), užuot nuo jų bėgę.'
  ),
  'moon-neptune': P(
    'Your feelings and your empathy, intuition and imagination.',
    'Jūsų jausmai ir jūsų empatija, intuicija bei vaizduotė.',
    'You are deeply empathic and intuitive, almost psychic; you sense others’ feelings and have a rich inner world.',
    'Esate labai empatiškas ir intuityvus, beveik aiškiaregys; jaučiate kitų jausmus ir turite turtingą vidinį pasaulį.',
    'You may absorb other people’s moods, feel lost or overwhelmed, or escape through daydreams or substances.',
    'Galite sugerti kitų nuotaikas, jaustis pasimetęs ar priblokštas, bėgti į svajones ar svaigalus.',
    'Ask yourself: “Is this feeling mine or someone else’s?” Regular time alone and in water helps you reset.',
    'Paklauskite savęs: „Ar šis jausmas mano, ar kito žmogaus?“ Reguliarus laikas vienumoje ir prie vandens padeda atsistatyti.'
  ),
  'moon-pluto': P(
    'Your feelings and their depth, intensity and power.',
    'Jūsų jausmai ir jų gelmė, intensyvumas bei galia.',
    'Your emotions are deep and you can heal others — you understand pain and are not afraid of it.',
    'Jūsų emocijos gilios, galite gydyti kitus — suprantate skausmą ir jo nebijote.',
    'Feelings can be overwhelming: jealousy, fear of abandonment or a need to control the people you love.',
    'Jausmai gali užlieti: pavydas, apleistumo baimė ar noras kontroliuoti mylimus žmones.',
    'Therapy, breathwork or deep journaling turn this intensity into wisdom.',
    'Terapija, kvėpavimo praktikos ar gilus dienoraštis šį intensyvumą paverčia išmintimi.'
  ),
  'moon-asc': P(
    'Your emotional nature and how you come across.',
    'Jūsų emocinė prigimtis ir kaip atrodote kitiems.',
    'Your feelings show openly; people see you as warm, caring and approachable.',
    'Jūsų jausmai matosi atvirai; žmonės jus mato kaip šiltą, rūpestingą ir lengvai prieinamą.',
    'Your moods may show on your face before you are ready to share them.',
    'Nuotaikos gali atsispindėti veide anksčiau, nei esate pasiruošęs jomis dalintis.',
    'Treat your sensitivity as a strength — it makes people trust you quickly.',
    'Laikykite jautrumą stiprybe — dėl jo žmonės greitai jumis pasitiki.'
  ),
  'moon-mc': P(
    'Your emotional needs and your career and public life.',
    'Jūsų emociniai poreikiai ir jūsų karjera bei viešas gyvenimas.',
    'You do well in caring, public-facing work; people feel your warmth and the public may relate to you.',
    'Jums sekasi rūpinimosi, su žmonėmis susijusiame darbe; žmonės jaučia jūsų šilumą.',
    'Work and family needs may compete; you may feel torn between career and home.',
    'Darbo ir šeimos poreikiai gali varžytis; galite jaustis draskomas tarp karjeros ir namų.',
    'Choose work that feels like a “home” — a team or mission you belong to.',
    'Rinkitės darbą, kuris jaučiasi kaip „namai“ — komandą ar misiją, kuriai priklausote.'
  ),

  /* ── Mercury ── */
  'mercury-venus': P(
    'Your mind and your sense of beauty — how gracefully you speak.',
    'Jūsų protas ir grožio pojūtis — kaip grakščiai kalbate.',
    'You speak kindly and charmingly; you may have a gift for writing, poetry, design or diplomacy.',
    'Kalbate maloniai ir žaviai; galite turėti dovaną rašymui, poezijai, dizainui ar diplomatijai.',
    'You may avoid saying hard truths to keep the peace.',
    'Galite vengti pasakyti nemalonią tiesą, kad išlaikytumėte ramybę.',
    'Your words can heal and persuade — use them in writing, teaching or mediation.',
    'Jūsų žodžiai gali gydyti ir įtikinti — naudokite juos rašyme, mokyme ar tarpininkaujant.'
  ),
  'mercury-mars': P(
    'Your mind and your energy — how sharply you think and argue.',
    'Jūsų protas ir energija — kaip aštriai mąstote ir ginčijatės.',
    'You think fast, decide quickly and speak directly; you are a strong debater.',
    'Mąstote greitai, sprendžiate greitai ir kalbate tiesiai; esate stiprus diskutuotojas.',
    'Words can come out sharp; you may argue for the sake of it or speak before thinking.',
    'Žodžiai gali išsprūsti aštriai; galite ginčytis dėl ginčo ar kalbėti prieš pagalvodami.',
    'Pause one breath before answering in heated moments — your point will land better.',
    'Įkaitusiomis akimirkomis prieš atsakydami padarykite vieną įkvėpimą — jūsų mintis bus išgirsta geriau.'
  ),
  'mercury-jupiter': P(
    'Your mind and your big-picture vision, beliefs and learning.',
    'Jūsų protas ir platus požiūris, tikėjimai bei mokymasis.',
    'You love learning, teaching and big ideas. You see the meaning behind details and inspire with words.',
    'Mylite mokytis, mokyti ir dideles idėjas. Matote prasmę už detalių ir įkvepiate žodžiais.',
    'You may overlook details, talk too much or promise more than you can deliver.',
    'Galite praleisti detales, per daug kalbėti arba žadėti daugiau, nei galite įvykdyti.',
    'Teaching, writing or travel feed your mind — but always check the small print.',
    'Mokymas, rašymas ar kelionės maitina jūsų protą — bet visada perskaitykite smulkų šriftą.'
  ),
  'mercury-saturn': P(
    'Your mind and your discipline — how seriously and carefully you think.',
    'Jūsų protas ir disciplina — kaip rimtai ir kruopščiai mąstote.',
    'You think clearly, carefully and practically; you are good at planning, structure and serious study.',
    'Mąstote aiškiai, kruopščiai ir praktiškai; jums sekasi planuoti, struktūruoti ir rimtai mokytis.',
    'You may doubt your intelligence, fear speaking up or be very critical of your own ideas.',
    'Galite abejoti savo protu, bijoti pasisakyti ar būti labai kritiškas savo idėjoms.',
    'You are smarter than your inner critic says. Prepare well — and then speak.',
    'Esate protingesnis, nei sako vidinis kritikas. Gerai pasiruoškite — ir tada kalbėkite.'
  ),
  'mercury-uranus': P(
    'Your mind and your originality — flashes of genius.',
    'Jūsų protas ir originalumas — genialumo blyksniai.',
    'You think fast and originally; sudden insights, technology and new ideas come naturally.',
    'Mąstote greitai ir originaliai; staigios įžvalgos, technologijos ir naujos idėjos jums natūralūs.',
    'Your mind may race, jump between topics or feel nervous; others may find you hard to follow.',
    'Protas gali lėkti, šokinėti tarp temų ar būti neramus; kitiems gali būti sunku jus sekti.',
    'Write ideas down the moment they come, and explain them step by step to others.',
    'Užsirašykite idėjas tą akimirką, kai jos ateina, ir aiškinkite kitiems žingsnis po žingsnio.'
  ),
  'mercury-neptune': P(
    'Your mind and your imagination and intuition.',
    'Jūsų protas, vaizduotė ir intuicija.',
    'You think in images and feelings; poetic, musical and intuitive — you read between the lines.',
    'Mąstote vaizdais ir jausmais; esate poetiškas, muzikalus ir intuityvus — skaitote tarp eilučių.',
    'Thoughts can be foggy or forgetful; you may misunderstand or be misunderstood, or believe what you want to believe.',
    'Mintys gali būti miglotos ar užmaršios; galite klaidingai suprasti arba būti nesuprastas, ar tikėti tuo, kuo norite tikėti.',
    'Use your imagination creatively, but double-check facts and important agreements in writing.',
    'Vaizduotę naudokite kūrybai, bet faktus ir svarbius susitarimus pasitikrinkite raštu.'
  ),
  'mercury-pluto': P(
    'Your mind and its depth — the researcher and detective in you.',
    'Jūsų protas ir jo gelmė — tyrėjas ir detektyvas jumyse.',
    'You see beneath the surface; you are a powerful researcher, psychologist or persuasive speaker.',
    'Matote po paviršiumi; esate stiprus tyrėjas, psichologas ar įtikinantis kalbėtojas.',
    'Thoughts can become obsessive; you may use words as weapons or keep secrets.',
    'Mintys gali tapti įkyrios; galite žodžius naudoti kaip ginklą ar laikyti paslaptis.',
    'Point your depth at research or healing work — and let go of thoughts that loop.',
    'Nukreipkite savo gelmę į tyrimus ar gydymo darbą — ir paleiskite ratu besisukančias mintis.'
  ),
  'mercury-asc': P(
    'Your mind and your outward style — you come across as a thinker and talker.',
    'Jūsų protas ir išorinis stilius — atrodote kaip mąstytojas ir kalbėtojas.',
    'People see you as smart, curious and communicative; you make contact easily.',
    'Žmonės jus mato kaip protingą, smalsų ir komunikabilų; lengvai užmezgate ryšį.',
    'You may come across as nervous or talk more than you listen at first meetings.',
    'Pirmo susitikimo metu galite atrodyti nervingas ar daugiau kalbėti nei klausytis.',
    'Ask one more question than you normally would — curiosity is your best introduction.',
    'Užduokite vienu klausimu daugiau nei įprastai — smalsumas yra geriausias jūsų prisistatymas.'
  ),
  'mercury-mc': P(
    'Your mind and your career — work with words, ideas and information.',
    'Jūsų protas ir karjera — darbas su žodžiais, idėjomis ir informacija.',
    'Careers in communication, writing, teaching, trade or media suit you well.',
    'Jums tinka karjera bendravimo, rašymo, mokymo, prekybos ar žiniasklaidos srityse.',
    'You may struggle to choose one career path because so many things interest you.',
    'Gali būti sunku pasirinkti vieną kelią, nes domina tiek daug dalykų.',
    'Combine interests into one role (e.g. writer about many topics) rather than choosing only one.',
    'Sujunkite pomėgius į vieną vaidmenį (pvz., rašantis apie daug temų), užuot rinkęsi tik vieną.'
  ),

  /* ── Venus ── */
  'venus-mars': P(
    'Your love style and your desire — attraction, romance and sexuality.',
    'Jūsų meilės būdas ir troškimas — trauka, romantika ir seksualumas.',
    'You are magnetic and passionate; you know how to combine tenderness with desire.',
    'Esate magnetiškas ir aistringas; mokate sujungti švelnumą su aistra.',
    'Love life can be stormy: attraction to “difficult” partners or a clash between what you want and what you need.',
    'Meilės gyvenimas gali būti audringas: trauka „sudėtingiems“ partneriams ar konfliktas tarp to, ko trokštate ir ko jums reikia.',
    'Notice what truly attracts you and what truly nourishes you — the best partner offers both.',
    'Pastebėkite, kas jus iš tiesų traukia ir kas iš tiesų maitina — geriausias partneris suteikia abu.'
  ),
  'venus-jupiter': P(
    'Your love and pleasure with abundance and generosity.',
    'Jūsų meilė ir malonumas su gausa bei dosnumu.',
    'You are warm, generous and popular; love, money and pleasures tend to flow to you.',
    'Esate šiltas, dosnus ir populiarus; meilė, pinigai ir malonumai dažnai teka jūsų link.',
    'You may overspend, overindulge or expect too much from partners.',
    'Galite per daug išleisti, per daug mėgautis ar per daug tikėtis iš partnerių.',
    'Gratitude multiplies your luck; a budget keeps it.',
    'Dėkingumas daugina jūsų sėkmę, o biudžetas ją išlaiko.'
  ),
  'venus-saturn': P(
    'Your love and pleasure with commitment, seriousness and limits.',
    'Jūsų meilė ir malonumas su įsipareigojimu, rimtumu ir ribomis.',
    'You are loyal and serious in love; relationships grow stronger over time and you value lasting quality.',
    'Esate ištikimas ir rimtas meilėje; santykiai laikui bėgant stiprėja, vertinate ilgaamžę kokybę.',
    'You may fear rejection, feel unlovable, or hold back affection; love may come later in life.',
    'Galite bijoti atstūmimo, jaustis nemylimas ar sulaikyti švelnumą; meilė gali ateiti vėliau gyvenime.',
    'You are worthy of love now. Let someone in slowly — trust grows step by step.',
    'Esate vertas meilės jau dabar. Įsileiskite žmogų pamažu — pasitikėjimas auga žingsnis po žingsnio.'
  ),
  'venus-uranus': P(
    'Your love style and your need for freedom and excitement.',
    'Jūsų meilės būdas ir laisvės bei jaudulio poreikis.',
    'You love in an original, open-minded way; friendship and freedom are part of your romance.',
    'Mylite originaliai ir atvirai; draugystė ir laisvė yra jūsų romantikos dalis.',
    'Attractions may start suddenly and end suddenly; you may fear being tied down.',
    'Trauka gali prasidėti staiga ir baigtis staiga; galite bijoti būti pririštas.',
    'Choose a partner who is also a best friend and gives you room to breathe.',
    'Rinkitės partnerį, kuris kartu yra geriausias draugas ir palieka erdvės kvėpuoti.'
  ),
  'venus-neptune': P(
    'Your way of loving and your dreams — romance, art and spiritual love.',
    'Jūsų meilės būdas ir svajonės — romantika, menas ir dvasinė meilė.',
    'You have a rare gift for beauty and compassion. Music, painting, dance, film, design or healing come naturally — you can make people feel something deep. In love you are tender, romantic and able to love unconditionally.',
    'Turite retą grožio ir užuojautos dovaną. Muzika, tapyba, šokis, kinas, dizainas ar gydymas jums natūralūs — galite priversti žmones pajusti kažką gilaus. Meilėje esate švelnus, romantiškas ir gebate mylėti besąlygiškai.',
    'You may idealise partners and later feel disappointed, fall for people who need “saving”, or ignore red flags.',
    'Galite idealizuoti partnerius ir vėliau nusivilti, įsimylėti tuos, kuriuos reikia „gelbėti“, ar nepastebėti pavojaus ženklų.',
    'Give this gift a form: play an instrument, paint, sing, dance or volunteer — creative practice is where your “talent blossoms”. In love, see the real person, not only the dream.',
    'Duokite šiai dovanai formą: grokite, tapykite, dainuokite, šokite ar savanoriaukite — kūrybinėje praktikoje jūsų „talentas pražysta“. Meilėje matykite tikrą žmogų, ne tik svajonę.'
  ),
  'venus-pluto': P(
    'Your love and its intensity — deep, transformative relationships.',
    'Jūsų meilė ir jos intensyvumas — gilūs, transformuojantys santykiai.',
    'You love deeply and loyally; relationships transform you and you are magnetic.',
    'Mylite giliai ir ištikimai; santykiai jus transformuoja, esate magnetiškas.',
    'Love can become obsessive or controlling; jealousy and power games may appear.',
    'Meilė gali tapti apsėdimu ar kontrole; gali atsirasti pavydas ir galios žaidimai.',
    'Real intimacy needs trust, not control — practise letting the other be free.',
    'Tikram artumui reikia pasitikėjimo, ne kontrolės — mokykitės leisti kitam būti laisvam.'
  ),
  'venus-asc': P(
    'Your charm and your appearance.',
    'Jūsų žavesys ir išvaizda.',
    'You come across as attractive, friendly and pleasant; people like you at first sight.',
    'Atrodote patrauklus, draugiškas ir malonus; žmonės jus pamėgsta iš pirmo žvilgsnio.',
    'You may care too much about appearances or about being liked.',
    'Galite per daug rūpintis išvaizda ar tuo, ar patinkate.',
    'Your natural grace opens doors — let your inner beauty match it.',
    'Jūsų natūralus grakštumas atveria duris — tegul vidinis grožis jį atitinka.'
  ),
  'venus-mc': P(
    'Your love of beauty and your career — work in art, beauty or harmony.',
    'Jūsų grožio meilė ir karjera — darbas mene, grožio ar harmonijos srityje.',
    'Careers in art, design, beauty, diplomacy or people-work suit you; you are well-liked professionally.',
    'Jums tinka karjera mene, dizaine, grožio srityje, diplomatijoje ar darbe su žmonėmis; esate mėgstamas darbe.',
    'You may choose comfort over ambition, or mix work and love in complicated ways.',
    'Galite rinktis komfortą vietoj ambicijų ar sudėtingai maišyti darbą ir meilę.',
    'Work that brings beauty or harmony into the world will feel like your true calling.',
    'Darbas, kuris į pasaulį neša grožį ar harmoniją, jausis kaip tikrasis pašaukimas.'
  ),

  /* ── Mars ── */
  'mars-jupiter': P(
    'Your drive with big vision and enthusiasm.',
    'Jūsų veržlumas su didele vizija ir entuziazmu.',
    'You have lots of energy for big projects, sport and adventure; you act with confidence and get things done.',
    'Turite daug energijos dideliems projektams, sportui ir nuotykiams; veikiate drąsiai ir pasiekiate rezultatų.',
    'You may take on too much, take big risks or burn out from over-enthusiasm.',
    'Galite prisiimti per daug, rizikuoti ar perdegti nuo per didelio entuziazmo.',
    'Pick one big goal at a time and pace your energy — you will achieve more.',
    'Pasirinkite vieną didelį tikslą vienu metu ir paskirstykite energiją — pasieksite daugiau.'
  ),
  'mars-saturn': P(
    'Your drive and your brakes — action meeting discipline.',
    'Jūsų veržlumas ir stabdžiai — veiksmas susitinka su disciplina.',
    'You have enormous endurance and self-control; you can work steadily toward hard, long-term goals.',
    'Turite didžiulę ištvermę ir savitvardą; galite nuosekliai siekti sunkių, ilgalaikių tikslų.',
    'You may feel blocked or frustrated, as if pressing gas and brake at once; anger may be held in.',
    'Galite jaustis užblokuotas ar frustruotas, tarsi spaustumėte dujas ir stabdį vienu metu; pyktis gali būti užgniaužtas.',
    'Slow, consistent effort (strength training, martial arts, long projects) turns frustration into mastery.',
    'Lėtos, nuoseklios pastangos (jėgos treniruotės, kovos menai, ilgi projektai) frustraciją paverčia meistryste.'
  ),
  'mars-uranus': P(
    'Your drive and your urge for freedom — sudden action.',
    'Jūsų veržlumas ir laisvės troškimas — staigus veiksmas.',
    'You are brave, inventive and quick to act; you break new ground and love excitement.',
    'Esate drąsus, išradingas ir greitai veikiate; pramušate naujus kelius ir mėgstate jaudulį.',
    'You may be impulsive, accident-prone or rebel against any restriction.',
    'Galite būti impulsyvus, linkęs į nelaimingus atsitikimus ar maištauti prieš bet kokius apribojimus.',
    'Slow down physically when excited — and channel the rebel into innovation.',
    'Susijaudinę sulėtėkite fiziškai — ir maištininką nukreipkite į inovacijas.'
  ),
  'mars-neptune': P(
    'Your drive and your dreams — acting for an ideal.',
    'Jūsų veržlumas ir svajonės — veikimas dėl idealo.',
    'You act for ideals, compassion or art; dance, swimming and spiritual causes inspire you.',
    'Veikiate dėl idealų, užuojautos ar meno; jus įkvepia šokis, plaukimas ir dvasinės idėjos.',
    'Energy may feel low or scattered; you may avoid conflict or not know what you really want.',
    'Energija gali būti silpna ar išsibarsčiusi; galite vengti konfliktų ar nežinoti, ko iš tiesų norite.',
    'Act for something greater than yourself — and rest more than others need to.',
    'Veikite dėl kažko didesnio už save — ir ilsėkitės daugiau, nei reikia kitiems.'
  ),
  'mars-pluto': P(
    'Your drive and your deep power — extreme willpower.',
    'Jūsų veržlumas ir gili galia — kraštutinė valia.',
    'You have incredible willpower and stamina; you can achieve what seems impossible.',
    'Turite neįtikėtiną valią ir ištvermę; galite pasiekti tai, kas atrodo neįmanoma.',
    'Anger can be intense; power struggles or all-or-nothing behaviour may appear.',
    'Pyktis gali būti intensyvus; gali atsirasti galios kovų ar „viskas arba nieko“ elgesio.',
    'Intense physical practice (martial arts, intense breathwork) safely channels this power.',
    'Intensyvi fizinė praktika (kovos menai, intensyvus kvėpavimas) saugiai nukreipia šią galią.'
  ),
  'mars-asc': P(
    'Your drive and how you come across — energetic and direct.',
    'Jūsų veržlumas ir kaip atrodote — energingas ir tiesus.',
    'You come across as strong, sporty and confident; you take initiative naturally.',
    'Atrodote stiprus, sportiškas ir pasitikintis; natūraliai imatės iniciatyvos.',
    'You may seem aggressive or impatient to others without meaning to.',
    'Kitiems galite atrodyti agresyvus ar nekantrus, to nenorėdamas.',
    'Lead with a smile — your strength is easier to accept when warm.',
    'Veskite su šypsena — jūsų jėgą lengviau priimti, kai ji šilta.'
  ),
  'mars-mc': P(
    'Your drive and your career — ambition and competition.',
    'Jūsų veržlumas ir karjera — ambicija ir konkurencija.',
    'You are ambitious and hard-working; leadership, entrepreneurship or sport may suit you.',
    'Esate ambicingas ir darbštus; jums gali tikti vadovavimas, verslumas ar sportas.',
    'You may clash with bosses or authorities, or burn out chasing success.',
    'Galite konfliktuoti su vadovais ar autoritetais, ar perdegti siekdamas sėkmės.',
    'Being your own boss or leading a team may be the healthiest outlet for this energy.',
    'Būti pačiam sau vadovu ar vadovauti komandai gali būti sveikiausia šios energijos išeitis.'
  ),

  /* ── Jupiter ── */
  'jupiter-saturn': P(
    'Growth and limits — balancing optimism with realism.',
    'Augimas ir ribos — optimizmo ir realizmo pusiausvyra.',
    'You combine vision with practicality — good at building lasting success step by step.',
    'Jungiate viziją su praktiškumu — mokate žingsnis po žingsnio kurti ilgalaikę sėkmę.',
    'You may swing between over-optimism and pessimism, or feel opportunities are blocked.',
    'Galite svyruoti tarp per didelio optimizmo ir pesimizmo, ar jausti, kad galimybės užblokuotos.',
    'Dream, then plan, then act — in that order.',
    'Svajokite, tada planuokite, tada veikite — būtent tokia tvarka.'
  ),
  'jupiter-uranus': P(
    'Growth through sudden opportunities and new ideas (generational).',
    'Augimas per staigias galimybes ir naujas idėjas (kartos aspektas).',
    'Lucky breaks and sudden insights; you embrace progress and freedom.',
    'Staigios sėkmės ir įžvalgos; priimate pažangą ir laisvę.',
    'Restlessness and sudden changes of direction in beliefs or plans.',
    'Neramumas ir staigūs krypties pokyčiai tikėjimuose ar planuose.',
    'Stay open to surprises — your best luck often comes unexpectedly.',
    'Likite atviri staigmenoms — didžiausia sėkmė dažnai ateina netikėtai.'
  ),
  'jupiter-neptune': P(
    'Faith and dreams — spiritual idealism (generational).',
    'Tikėjimas ir svajonės — dvasinis idealizmas (kartos aspektas).',
    'Deep spiritual faith, compassion and imagination; a generous heart.',
    'Gilus dvasinis tikėjimas, užuojauta ir vaizduotė; dosni širdis.',
    'Unrealistic hopes or being too trusting.',
    'Nerealios viltys ar per didelis patiklumas.',
    'Keep your ideals, but verify before you trust.',
    'Saugokite idealus, bet prieš pasitikėdami patikrinkite.'
  ),
  'jupiter-pluto': P(
    'Growth and power — ambition on a large scale.',
    'Augimas ir galia — didelio masto ambicija.',
    'Ability to achieve big things, influence and regenerate resources.',
    'Gebėjimas pasiekti didelių dalykų, daryti įtaką ir atkurti išteklius.',
    'Power struggles or obsession with success or wealth.',
    'Galios kovos ar apsėdimas sėkme ar turtu.',
    'Use influence for the common good — it multiplies.',
    'Naudokite įtaką bendram labui — ji dauginasi.'
  ),
  'jupiter-asc': P(
    'Optimism in your personality — you come across as generous and cheerful.',
    'Optimizmas jūsų asmenybėje — atrodote dosnus ir linksmas.',
    'People see you as warm, lucky and wise; you often get help from others.',
    'Žmonės jus mato kaip šiltą, laimingą ir išmintingą; dažnai sulaukiate pagalbos.',
    'You may overpromise or put on weight easily.',
    'Galite per daug žadėti ar lengvai priaugti svorio.',
    'Your positivity is contagious — use it to encourage others.',
    'Jūsų pozityvumas užkrečiamas — naudokite jį kitiems padrąsinti.'
  ),
  'jupiter-mc': P(
    'Luck and growth in career.',
    'Sėkmė ir augimas karjeroje.',
    'Good fortune in career; teaching, law, travel or publishing may bring success.',
    'Sėkmė karjeroje; mokymas, teisė, kelionės ar leidyba gali atnešti pasisekimą.',
    'You may aim too high too quickly or take on more than you can handle.',
    'Galite siekti per aukštai per greitai ar prisiimti daugiau, nei pajėgiate.',
    'Your career grows best when it has a meaning bigger than money.',
    'Karjera auga geriausiai, kai turi prasmę, didesnę už pinigus.'
  ),

  /* ── Saturn ── */
  'saturn-uranus': P(
    'Old and new — tradition meets change (generational).',
    'Sena ir nauja — tradicija susitinka su pokyčiu (kartos aspektas).',
    'You can bring innovation into stable structures.',
    'Galite įnešti naujovių į stabilias struktūras.',
    'Tension between security and freedom.',
    'Įtampa tarp saugumo ir laisvės.',
    'Change things gradually — revolution through reform.',
    'Keiskite dalykus palaipsniui — revoliucija per reformą.'
  ),
  'saturn-neptune': P(
    'Reality and dreams (generational).',
    'Realybė ir svajonės (kartos aspektas).',
    'You can make dreams practical and give spiritual ideals a form.',
    'Galite svajones paversti praktiškomis ir dvasiniams idealams suteikti formą.',
    'Disillusionment or fear of the unknown.',
    'Nusivylimas ar nežinomybės baimė.',
    'Build your dream one brick at a time.',
    'Statykite savo svajonę po vieną plytą.'
  ),
  'saturn-pluto': P(
    'Structure and transformation — endurance under pressure (generational).',
    'Struktūra ir transformacija — ištvermė spaudžiant (kartos aspektas).',
    'Enormous resilience; you can rebuild after collapse.',
    'Didžiulis atsparumas; galite atstatyti viską po griūties.',
    'Heavy pressure, fear of loss or harsh experiences.',
    'Sunkus spaudimas, praradimo baimė ar griežtos patirtys.',
    'Hard times make you unbreakable — be gentle with yourself while they pass.',
    'Sunkūs laikai jus daro nepalaužiamą — būkite švelnus sau, kol jie praeina.'
  ),
  'saturn-asc': P(
    'Seriousness in your personality — you come across as mature and reserved.',
    'Rimtumas jūsų asmenybėje — atrodote brandus ir santūrus.',
    'People see you as responsible and trustworthy; you age well.',
    'Žmonės jus mato kaip atsakingą ir patikimą; su amžiumi gražėjate.',
    'You may seem cold or shy; you may have felt you had to grow up too early.',
    'Galite atrodyti šaltas ar drovus; galėjote jausti, kad turėjote per anksti suaugti.',
    'Let people see your humour — it softens your seriousness.',
    'Leiskite žmonėms pamatyti jūsų humorą — jis sušvelnina rimtumą.'
  ),
  'saturn-mc': P(
    'Discipline and career — slow, solid climb to the top.',
    'Disciplina ir karjera — lėtas, tvirtas kilimas į viršūnę.',
    'You can reach a respected, high position through hard work and patience.',
    'Sunkiu darbu ir kantrybe galite pasiekti gerbiamą, aukštą poziciją.',
    'Career may feel heavy, delayed or under pressure from authorities.',
    'Karjera gali atrodyti sunki, vėluojanti ar spaudžiama autoritetų.',
    'Your career peaks later in life — keep going.',
    'Jūsų karjeros viršūnė ateina vėliau gyvenime — nesustokite.'
  ),

  /* ── Outer planets ── */
  'uranus-neptune': P(
    'Generational: spiritual awakening through new technologies and ideals.',
    'Kartos aspektas: dvasinis pabudimas per naujas technologijas ir idealus.',
    'Your generation dreams of a freer, more spiritual world.',
    'Jūsų karta svajoja apie laisvesnį, dvasingesnį pasaulį.',
    'Collective confusion about ideals and change.',
    'Kolektyvinė sumaištis dėl idealų ir pokyčių.',
    'Personal meaning comes when this aspect touches your personal planets.',
    'Asmeninę prasmę įgyja, kai šis aspektas liečia jūsų asmenines planetas.'
  ),
  'uranus-pluto': P(
    'Generational: radical social transformation.',
    'Kartos aspektas: radikali socialinė transformacija.',
    'Your generation drives deep change and innovation.',
    'Jūsų karta skatina gilius pokyčius ir inovacijas.',
    'Upheaval and revolutionary tensions in society.',
    'Sukrėtimai ir revoliucinė įtampa visuomenėje.',
    'Personal meaning comes when this aspect touches your personal planets.',
    'Asmeninę prasmę įgyja, kai šis aspektas liečia jūsų asmenines planetas.'
  ),
  'neptune-pluto': P(
    'Generational: the deep spiritual evolution of humanity (shared by everyone alive today).',
    'Kartos aspektas: gili žmonijos dvasinė evoliucija (bendras visiems šiandien gyvenantiems).',
    'A long, slow spiritual transformation of collective consciousness.',
    'Ilga, lėta kolektyvinės sąmonės dvasinė transformacija.',
    'Collective fears and spiritual crises.',
    'Kolektyvinės baimės ir dvasinės krizės.',
    'This aspect is common to whole generations — focus on your personal planets.',
    'Šis aspektas bendras ištisoms kartoms — susitelkite į asmenines planetas.'
  ),
  'uranus-asc': P(
    'Originality in your personality — you come across as unusual and independent.',
    'Originalumas jūsų asmenybėje — atrodote neįprastas ir nepriklausomas.',
    'People see you as unique, modern and exciting.',
    'Žmonės jus mato kaip unikalų, modernų ir įdomų.',
    'You may seem unpredictable or detached; life brings sudden changes.',
    'Galite atrodyti nenuspėjamas ar atsiribojęs; gyvenimas atneša staigių pokyčių.',
    'Embrace your uniqueness — it attracts the right people.',
    'Priimkite savo unikalumą — jis pritraukia tinkamus žmones.'
  ),
  'uranus-mc': P(
    'Freedom and change in your career.',
    'Laisvė ir pokyčiai karjeroje.',
    'You thrive in innovative, technological or freelance work.',
    'Klestite inovatyviame, technologiniame ar laisvai samdomame darbe.',
    'Career may change suddenly; strict hierarchies may feel suffocating.',
    'Karjera gali staiga keistis; griežtos hierarchijos gali dusinti.',
    'Look for work that gives you freedom and lets you innovate.',
    'Ieškokite darbo, suteikiančio laisvę ir leidžiančio kurti naujoves.'
  ),
  'neptune-asc': P(
    'Sensitivity in your personality — you come across as dreamy and mysterious.',
    'Jautrumas jūsų asmenybėje — atrodote svajingas ir paslaptingas.',
    'People see you as gentle, artistic and spiritual — almost magical.',
    'Žmonės jus mato kaip švelnų, menišką ir dvasingą — beveik magišką.',
    'Others may project their fantasies onto you; you may absorb your surroundings.',
    'Kiti gali projektuoti į jus savo fantazijas; galite sugerti aplinką.',
    'Protect your energy in crowds and choose your environment carefully.',
    'Saugokite savo energiją minioje ir atidžiai rinkitės aplinką.'
  ),
  'neptune-mc': P(
    'Dreams and spirituality in your career.',
    'Svajonės ir dvasingumas karjeroje.',
    'Careers in art, film, music, healing or spiritual work suit you.',
    'Jums tinka karjera mene, kine, muzikoje, gydyme ar dvasiniame darbe.',
    'Career direction may feel unclear or confusing.',
    'Karjeros kryptis gali atrodyti neaiški ar paini.',
    'Follow inspiration, but set concrete goals to make it real.',
    'Sekite įkvėpimą, bet išsikelkite konkrečius tikslus, kad jį įgyvendintumėte.'
  ),
  'pluto-asc': P(
    'Power in your personality — you come across as intense and magnetic.',
    'Galia jūsų asmenybėje — atrodote intensyvus ir magnetiškas.',
    'People sense your strength and depth; you can transform others by your presence.',
    'Žmonės jaučia jūsų jėgą ir gelmę; galite transformuoti kitus savo buvimu.',
    'You may seem intimidating or very private.',
    'Galite atrodyti bauginantis ar labai uždaras.',
    'Your intensity is a gift — let warmth show alongside it.',
    'Jūsų intensyvumas — dovana; leiskite šalia jo matytis šilumai.'
  ),
  'pluto-mc': P(
    'Power and transformation in your career.',
    'Galia ir transformacija karjeroje.',
    'You can hold powerful positions and transform organisations.',
    'Galite užimti įtakingas pozicijas ir transformuoti organizacijas.',
    'Power struggles at work or dramatic career changes.',
    'Galios kovos darbe ar dramatiški karjeros pokyčiai.',
    'Use your influence to heal and rebuild, not to control.',
    'Naudokite įtaką gydyti ir atstatyti, ne kontroliuoti.'
  ),
}

export const ASPECT_PLAIN = {
  conjunction: {
    en: 'The two planets stand together, so their energies blend into one strong force. It can be a gift or a challenge — depending on how you use it.',
    lt: 'Abi planetos stovi kartu, todėl jų energijos susilieja į vieną stiprią jėgą. Tai gali būti dovana arba iššūkis — priklauso nuo to, kaip ją naudojate.',
  },
  sextile: {
    en: 'A friendly link (60°). These two parts of you cooperate easily — but the opportunity opens only when you actively use it.',
    lt: 'Draugiškas ryšys (60°). Šios dvi jūsų dalys lengvai bendradarbiauja — bet galimybė atsiveria tik tada, kai ją aktyviai naudojate.',
  },
  trine: {
    en: 'The most harmonious link (120°). A natural talent you were born with — it works almost by itself.',
    lt: 'Harmoningiausias ryšys (120°). Įgimtas talentas — jis veikia beveik savaime.',
  },
  square: {
    en: 'A tense link (90°). These two parts of you want different things and create friction — but this tension is what pushes you to grow and become strong.',
    lt: 'Įtemptas ryšys (90°). Šios dvi jūsų dalys nori skirtingų dalykų ir kelia trintį — tačiau būtent ši įtampa verčia augti ir tapti stipriu.',
  },
  opposition: {
    en: 'A tug-of-war (180°). You swing between two poles and often meet the “other side” through other people. The task is to find balance.',
    lt: 'Virvės traukimas (180°). Svyruojate tarp dviejų polių ir dažnai „kitą pusę“ sutinkate per kitus žmones. Užduotis — rasti pusiausvyrą.',
  },
} as const

export const PLAIN_LABELS = {
  en: { about: 'What it’s about', shows: 'How it shows up in your life', gift: 'The gift', watch: 'Watch out for', challenge: 'The challenge', tip: 'Try this' },
  lt: { about: 'Apie ką tai', shows: 'Kaip tai pasireiškia jūsų gyvenime', gift: 'Dovana', watch: 'Atkreipkite dėmesį', challenge: 'Iššūkis', tip: 'Patarimas' },
}
