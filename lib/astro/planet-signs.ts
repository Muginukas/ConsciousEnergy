import type { Bi, ZodiacSlug } from '../zodiac'

type SignTexts = Record<ZodiacSlug, Bi>

const S = (en: string, lt: string): Bi => ({ en, lt })

/** Mercury in signs — how you think, learn and talk. */
const MERCURY: SignTexts = {
  aries: S('You think fast and speak directly. You decide quickly and get to the point — but may interrupt or speak before thinking.', 'Mąstote greitai ir kalbate tiesiai. Sprendžiate greitai ir einate prie esmės — bet galite pertraukti kitus ar kalbėti prieš pagalvodami.'),
  taurus: S('You think slowly but thoroughly. Once you understand something, you never forget it. You prefer practical, concrete ideas.', 'Mąstote lėtai, bet nuodugniai. Kartą supratę — niekada nepamirštate. Mėgstate praktiškas, konkrečias idėjas.'),
  gemini: S('A quick, curious mind that loves information, talking and learning many things at once. Witty and versatile, but easily distracted.', 'Greitas, smalsus protas, mėgstantis informaciją, pokalbius ir daug dalykų vienu metu. Sąmojingas ir universalus, bet lengvai išsiblaškantis.'),
  cancer: S('You think with your feelings and remember everything that touched you. You learn best in a safe, warm atmosphere.', 'Mąstote jausmais ir prisimenate viską, kas palietė širdį. Geriausiai mokotės saugioje, šiltoje aplinkoje.'),
  leo: S('You speak with confidence, warmth and drama — a natural storyteller and presenter who wants ideas to be noticed.', 'Kalbate su pasitikėjimu, šiluma ir dramatizmu — prigimtinis pasakotojas ir pranešėjas, norintis, kad idėjos būtų pastebėtos.'),
  virgo: S('Precise, analytical and practical. You notice details, love order and are excellent at solving problems — but can overthink and worry.', 'Tikslus, analitiškas ir praktiškas. Pastebite detales, mėgstate tvarką ir puikiai sprendžiate problemas — bet galite per daug galvoti ir nerimauti.'),
  libra: S('You think in terms of fairness and balance and always see both sides. Diplomatic speaker — but decisions can take long.', 'Mąstote teisingumo ir pusiausvyros kategorijomis, visada matote abi puses. Diplomatiškas kalbėtojas — bet sprendimai gali užtrukti.'),
  scorpio: S('A deep, investigative mind that wants the truth beneath the surface. You keep secrets well and your words can be powerful.', 'Gilus, tiriantis protas, norintis tiesos po paviršiumi. Gerai saugote paslaptis, o jūsų žodžiai gali būti galingi.'),
  sagittarius: S('You think in big pictures, philosophy and meaning. Honest and enthusiastic speaker — but can miss details or be too blunt.', 'Mąstote plačiais vaizdais, filosofija ir prasme. Nuoširdus ir entuziastingas kalbėtojas — bet galite praleisti detales ar būti per tiesus.'),
  capricorn: S('Practical, structured and serious thinking. You plan carefully, speak with authority and learn what is useful.', 'Praktiškas, struktūruotas ir rimtas mąstymas. Kruopščiai planuojate, kalbate autoritetingai ir mokotės to, kas naudinga.'),
  aquarius: S('Original, inventive and future-oriented. You think independently, love new ideas and technology — but can seem detached.', 'Originalus, išradingas ir nukreiptas į ateitį. Mąstote savarankiškai, mylite naujas idėjas ir technologijas — bet galite atrodyti atsiribojęs.'),
  pisces: S('You think in images, feelings and intuition. Poetic and imaginative — but facts and details can slip away.', 'Mąstote vaizdais, jausmais ir intuicija. Poetiškas ir vaizdingas — bet faktai ir detalės gali išslysti.'),
}

/** Venus in signs — how you love, what you find beautiful, what you value. */
const VENUS: SignTexts = {
  aries: S('You love passionately and directly — you take the first step and enjoy the chase. You need excitement and honesty in love.', 'Mylite aistringai ir tiesiai — žengiate pirmą žingsnį ir mėgstate siekti. Meilėje jums reikia jaudulio ir atvirumo.'),
  taurus: S('You love loyally and sensually. Touch, good food, comfort and stability are your love language. Slow to commit, then devoted.', 'Mylite ištikimai ir jusliškai. Prisilietimai, geras maistas, komfortas ir stabilumas — jūsų meilės kalba. Lėtai įsipareigojate, bet tada atsiduodate.'),
  gemini: S('You fall for minds first — conversation, humour and variety. You need a partner who is also a friend and keeps things interesting.', 'Pirmiausia įsimylite protą — pokalbius, humorą ir įvairovę. Jums reikia partnerio, kuris kartu yra draugas ir neleidžia nuobodžiauti.'),
  cancer: S('You love tenderly and protectively; home and family matter most. You need emotional safety and someone who truly cares.', 'Mylite švelniai ir globėjiškai; svarbiausia — namai ir šeima. Jums reikia emocinio saugumo ir žmogaus, kuris tikrai rūpinasi.'),
  leo: S('You love generously and romantically, with grand gestures. You want to adore and be adored — loyalty and appreciation are essential.', 'Mylite dosniai ir romantiškai, su dideliais gestais. Norite dievinti ir būti dievinamas — būtina ištikimybė ir įvertinimas.'),
  virgo: S('You show love through care and practical help. You notice details and value sincerity; you may be shy about big romantic words.', 'Meilę rodote rūpesčiu ir praktiška pagalba. Pastebite detales ir vertinate nuoširdumą; galite drovėtis didelių romantiškų žodžių.'),
  libra: S('Venus at home: romantic, charming and partnership-oriented. You love beauty, harmony and fairness in relationships.', 'Venera savo namuose: romantiškas, žavus ir orientuotas į partnerystę. Santykiuose mylite grožį, harmoniją ir teisingumą.'),
  scorpio: S('You love deeply, intensely and loyally — all or nothing. You need total trust and soul-level intimacy.', 'Mylite giliai, intensyviai ir ištikimai — viskas arba nieko. Jums reikia visiško pasitikėjimo ir sielos lygmens artumo.'),
  sagittarius: S('You love freely and adventurously. A partner should be a fellow traveller who shares your search for meaning and fun.', 'Mylite laisvai ir nuotykių kupinai. Partneris turi būti kelionių bendražygis, kuris dalijasi prasmės ir džiaugsmo paieškomis.'),
  capricorn: S('You love seriously and responsibly, building something lasting. You show love through commitment and reliability.', 'Mylite rimtai ir atsakingai, kurdami kažką ilgalaikio. Meilę rodote įsipareigojimu ir patikimumu.'),
  aquarius: S('You love in an unusual, friendly way and need freedom. Friendship and shared ideals come first; you dislike possessiveness.', 'Mylite neįprastai ir draugiškai, jums reikia laisvės. Pirmiausia — draugystė ir bendri idealai; nemėgstate savininkiškumo.'),
  pisces: S('You love unconditionally, romantically and spiritually. Very giving and compassionate — but watch out for idealising partners.', 'Mylite besąlygiškai, romantiškai ir dvasiškai. Labai dosnus ir užjaučiantis — bet saugokitės partnerių idealizavimo.'),
}

/** Mars in signs — how you act, fight and what drives you. */
const MARS: SignTexts = {
  aries: S('Mars at home: lots of energy, courage and initiative. You act instantly and love competition — patience is your lesson.', 'Marsas savo namuose: daug energijos, drąsos ir iniciatyvos. Veikiate akimirksniu ir mėgstate varžytis — kantrybė yra jūsų pamoka.'),
  taurus: S('Slow to start but unstoppable once moving. Great stamina and persistence; anger builds slowly but runs deep.', 'Lėtai pajudate, bet tada nesustabdomas. Didelė ištvermė ir atkaklumas; pyktis kaupiasi lėtai, bet giliai.'),
  gemini: S('You act through words and ideas; you do many things at once. Energy comes in bursts and you argue cleverly.', 'Veikiate žodžiais ir idėjomis; darote daug dalykų vienu metu. Energija ateina pliūpsniais, ginčijatės sumaniai.'),
  cancer: S('You act to protect family and loved ones. Anger may come out indirectly or emotionally; you fight hardest for home.', 'Veikiate gindami šeimą ir artimuosius. Pyktis gali reikštis netiesiogiai ar emocingai; labiausiai kovojate dėl namų.'),
  leo: S('You act with confidence, pride and creativity. You want to lead and shine; generosity and play fuel your energy.', 'Veikiate su pasitikėjimu, išdidumu ir kūrybiškumu. Norite vadovauti ir spindėti; jūsų energiją kursto dosnumas ir žaidimas.'),
  virgo: S('You act carefully and efficiently; you work hard and perfect every detail. Stress can turn into criticism or worry.', 'Veikiate kruopščiai ir efektyviai; dirbate sunkiai ir tobulinate kiekvieną detalę. Stresas gali virsti kritika ar nerimu.'),
  libra: S('You act through cooperation and diplomacy, fighting for fairness. Direct conflict feels uncomfortable; decisions take time.', 'Veikiate bendradarbiaudami ir diplomatiškai, kovojate už teisingumą. Tiesioginis konfliktas nepatogus; sprendimams reikia laiko.'),
  scorpio: S('Intense, strategic and powerful. You never give up, act behind the scenes and have deep passion and willpower.', 'Intensyvus, strategiškas ir galingas. Niekada nepasiduodate, veikiate užkulisiuose, turite gilią aistrą ir valią.'),
  sagittarius: S('You act with enthusiasm and love of adventure, sport and travel. You fight for ideals and beliefs — sometimes too bluntly.', 'Veikiate su entuziazmu, mėgstate nuotykius, sportą ir keliones. Kovojate už idealus ir įsitikinimus — kartais per tiesmukai.'),
  capricorn: S('Mars at its strongest: disciplined, ambitious and enduring. You work steadily toward long-term goals and achieve them.', 'Marsas stipriausias: disciplinuotas, ambicingas ir ištvermingas. Nuosekliai siekiate ilgalaikių tikslų ir juos pasiekiate.'),
  aquarius: S('You act for causes, groups and the future. Independent and original; you rebel against injustice and rigid rules.', 'Veikiate dėl idėjų, grupių ir ateities. Nepriklausomas ir originalus; maištaujate prieš neteisybę ir griežtas taisykles.'),
  pisces: S('You act through intuition, compassion and creativity. Energy flows like water — strong when inspired, low when not.', 'Veikiate intuicija, užuojauta ir kūrybiškumu. Energija teka kaip vanduo — stipri įkvėpus, silpna be įkvėpimo.'),
}

/** Jupiter in signs — where you find luck, growth and meaning. */
const JUPITER: SignTexts = {
  aries: S('Luck comes through courage and starting new things. You grow by taking initiative.', 'Sėkmė ateina per drąsą ir naujų dalykų pradžią. Augate imdamiesi iniciatyvos.'),
  taurus: S('Luck through patience, nature, beauty and building material security.', 'Sėkmė per kantrybę, gamtą, grožį ir materialaus saugumo kūrimą.'),
  gemini: S('Luck through learning, writing, talking, contacts and travel.', 'Sėkmė per mokymąsi, rašymą, bendravimą, ryšius ir keliones.'),
  cancer: S('Jupiter exalted: luck through family, home, caring and emotional generosity.', 'Jupiteris išaukštintas: sėkmė per šeimą, namus, rūpestį ir emocinį dosnumą.'),
  leo: S('Luck through creativity, self-expression, children and generosity of heart.', 'Sėkmė per kūrybą, saviraišką, vaikus ir širdies dosnumą.'),
  virgo: S('Luck through service, health, skilled work and attention to detail.', 'Sėkmė per tarnystę, sveikatą, meistrišką darbą ir dėmesį detalėms.'),
  libra: S('Luck through partnerships, beauty, art and fairness.', 'Sėkmė per partnerystes, grožį, meną ir teisingumą.'),
  scorpio: S('Luck through depth, research, transformation and shared resources.', 'Sėkmė per gelmę, tyrimus, transformaciją ir bendrus išteklius.'),
  sagittarius: S('Jupiter at home: luck through travel, philosophy, teaching, faith and adventure.', 'Jupiteris savo namuose: sėkmė per keliones, filosofiją, mokymą, tikėjimą ir nuotykius.'),
  capricorn: S('Luck through hard work, responsibility and patient long-term building.', 'Sėkmė per sunkų darbą, atsakomybę ir kantrų ilgalaikį kūrimą.'),
  aquarius: S('Luck through friends, communities, innovation and humanitarian ideals.', 'Sėkmė per draugus, bendruomenes, inovacijas ir humanistinius idealus.'),
  pisces: S('Luck through compassion, spirituality, art and intuition.', 'Sėkmė per užuojautą, dvasingumą, meną ir intuiciją.'),
}

/** Saturn in signs — your life lessons and where you build mastery. */
const SATURN: SignTexts = {
  aries: S('Lesson: to act with patience and to trust your own courage without rushing.', 'Pamoka: veikti kantriai ir pasitikėti savo drąsa neskubant.'),
  taurus: S('Lesson: to build real security and self-worth, not cling to possessions.', 'Pamoka: kurti tikrą saugumą ir savivertę, o ne laikytis daiktų.'),
  gemini: S('Lesson: to trust your mind and to communicate clearly and with depth.', 'Pamoka: pasitikėti savo protu ir bendrauti aiškiai bei giliai.'),
  cancer: S('Lesson: to feel safe expressing emotions and to create a secure home.', 'Pamoka: saugiai reikšti emocijas ir susikurti saugius namus.'),
  leo: S('Lesson: to shine and express yourself without fear of judgment.', 'Pamoka: spindėti ir reikštis nebijant vertinimo.'),
  virgo: S('Lesson: to work well without perfectionism and to care for health.', 'Pamoka: dirbti gerai be perfekcionizmo ir rūpintis sveikata.'),
  libra: S('Saturn exalted: lesson of committed, fair and balanced relationships.', 'Saturnas išaukštintas: įsipareigojusių, teisingų ir subalansuotų santykių pamoka.'),
  scorpio: S('Lesson: to face deep fears, trust others and let go of control.', 'Pamoka: pažvelgti į gilias baimes, pasitikėti kitais ir paleisti kontrolę.'),
  sagittarius: S('Lesson: to build your own wisdom and beliefs through experience.', 'Pamoka: kurti savo išmintį ir tikėjimą per patirtį.'),
  capricorn: S('Saturn at home: natural discipline and authority — lesson to also allow joy.', 'Saturnas savo namuose: natūrali disciplina ir autoritetas — pamoka leisti sau ir džiaugsmą.'),
  aquarius: S('Saturn at home (traditionally): lesson to belong to a group while staying yourself.', 'Saturnas savo namuose (tradiciškai): pamoka priklausyti grupei ir likti savimi.'),
  pisces: S('Lesson: to give spiritual sensitivity a form and to set healthy boundaries.', 'Pamoka: suteikti dvasiniam jautrumui formą ir nustatyti sveikas ribas.'),
}

export const PLANET_IN_SIGN: Partial<Record<'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn', SignTexts>> = {
  mercury: MERCURY,
  venus: VENUS,
  mars: MARS,
  jupiter: JUPITER,
  saturn: SATURN,
}

export const GENERATIONAL_NOTE: Bi = {
  en: 'This is a slow, generational planet — everyone born within several years of you shares this sign. It describes your generation more than you personally; it becomes personal through its house and aspects.',
  lt: 'Tai lėta kartos planeta — visi, gimę per kelerius metus nuo jūsų, turi ją tame pačiame ženkle. Ji labiau apibūdina jūsų kartą nei jus asmeniškai; asmenine tampa per namus ir aspektus.',
}
