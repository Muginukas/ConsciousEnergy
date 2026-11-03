import { CategorySlug, Locale } from './types'

/**
 * Western (tropical) zodiac reference data, bilingual (EN / LT).
 * Also includes the four elements, three modalities, a simple aspect-based
 * compatibility model and the Chinese zodiac by birth year.
 */

export type Bi = { en: string; lt: string }
export type BiList = { en: string[]; lt: string[] }

export type Element = 'fire' | 'earth' | 'air' | 'water'
export type Modality = 'cardinal' | 'fixed' | 'mutable'

export type ZodiacSlug =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces'

export interface PracticeRef {
  category: CategorySlug
  slug: string
}

export interface ZodiacSign {
  slug: ZodiacSlug
  symbol: string
  name: Bi
  latin: string
  /** [month, day] inclusive, tropical dates */
  start: [number, number]
  end: [number, number]
  element: Element
  modality: Modality
  ruler: Bi
  house: number
  motto: Bi
  archetype: Bi
  keywords: BiList
  overview: Bi
  strengths: BiList
  challenges: BiList
  love: Bi
  career: Bi
  health: Bi
  body: Bi
  growth: Bi
  colors: BiList
  stones: BiList
  metal: Bi
  day: Bi
  numbers: number[]
  chakra: PracticeRef
  practices: PracticeRef[]
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    slug: 'aries',
    symbol: '♈\uFE0E',
    name: { en: 'Aries', lt: 'Avinas' },
    latin: 'Aries',
    start: [3, 21],
    end: [4, 19],
    element: 'fire',
    modality: 'cardinal',
    ruler: { en: 'Mars', lt: 'Marsas' },
    house: 1,
    motto: { en: 'I am', lt: 'Aš esu' },
    archetype: { en: 'The Pioneer', lt: 'Pradininkas' },
    keywords: {
      en: ['Courage', 'Initiative', 'Energy', 'Directness', 'Independence'],
      lt: ['Drąsa', 'Iniciatyva', 'Energija', 'Tiesumas', 'Nepriklausomybė'],
    },
    overview: {
      en: 'Aries opens the zodiac wheel and carries the raw spark of new beginnings. Ruled by Mars, Aries is bold, fast and honest — a natural starter who would rather act and learn than wait for permission. Its energy is like the first green shoot of spring breaking through the soil.',
      lt: 'Avinas atveria zodiako ratą ir neša pirminę naujų pradžių kibirkštį. Valdomas Marso, jis drąsus, greitas ir atviras — prigimtinis pradininkas, kuris mieliau veikia ir mokosi veikdamas, nei laukia leidimo. Jo energija primena pirmąjį pavasario daigą, prasiveržiantį pro žemę.',
    },
    strengths: {
      en: ['Brave and decisive', 'Enthusiastic and motivating', 'Honest and straightforward', 'Quick to recover from setbacks', 'Natural leader in a crisis'],
      lt: ['Drąsus ir ryžtingas', 'Entuziastingas, užkrečia kitus', 'Sąžiningas ir tiesus', 'Greitai atsigauna po nesėkmių', 'Natūralus lyderis krizėje'],
    },
    challenges: {
      en: ['Impatience', 'Impulsive decisions', 'Quick temper', 'Losing interest once the thrill fades'],
      lt: ['Nekantrumas', 'Impulsyvūs sprendimai', 'Greitas pyktis', 'Praranda susidomėjimą, kai išblėsta azartas'],
    },
    love: {
      en: 'Passionate, direct and playful. Aries loves the chase and needs a partner who keeps up, respects their independence and does not play games.',
      lt: 'Aistringas, tiesus ir žaismingas. Avinas mėgsta siekti, todėl jam reikia partnerio, kuris neatsilieka, gerbia jo laisvę ir nežaidžia žaidimų.',
    },
    career: {
      en: 'Thrives where speed, competition and initiative are rewarded: entrepreneurship, sports, emergency services, sales, launching new projects.',
      lt: 'Klesti ten, kur vertinamas greitis, konkurencija ir iniciatyva: verslumas, sportas, gelbėjimo tarnybos, pardavimai, naujų projektų paleidimas.',
    },
    health: {
      en: 'High physical energy that needs an outlet. Prone to headaches, tension and burnout from rushing. Regular intense movement and cooling breath help.',
      lt: 'Didelė fizinė energija, kuriai reikia išeities. Linkęs į galvos skausmus, įtampą ir perdegimą skubant. Padeda reguliarus intensyvus judėjimas ir vėsinantis kvėpavimas.',
    },
    body: { en: 'Head, face, brain', lt: 'Galva, veidas, smegenys' },
    growth: {
      en: 'Learning patience and channelling fire into sustained purpose rather than short bursts. The lesson: true courage includes listening.',
      lt: 'Išmokti kantrybės ir nukreipti ugnį į ilgalaikį tikslą, o ne į trumpus pliūpsnius. Pamoka: tikra drąsa apima ir gebėjimą išklausyti.',
    },
    colors: { en: ['Red', 'Scarlet'], lt: ['Raudona', 'Skaisčiai raudona'] },
    stones: { en: ['Diamond', 'Bloodstone', 'Red jasper'], lt: ['Deimantas', 'Heliotropas', 'Raudonasis jaspis'] },
    metal: { en: 'Iron', lt: 'Geležis' },
    day: { en: 'Tuesday', lt: 'Antradienis' },
    numbers: [1, 9],
    chakra: { category: 'chakras', slug: 'manipura-solar-plexus' },
    practices: [
      { category: 'breathwork', slug: 'kapalabhati' },
      { category: 'kundalini', slug: 'breath-of-fire' },
      { category: 'meditation', slug: 'mindfulness' },
    ],
  },
  {
    slug: 'taurus',
    symbol: '♉\uFE0E',
    name: { en: 'Taurus', lt: 'Jautis' },
    latin: 'Taurus',
    start: [4, 20],
    end: [5, 20],
    element: 'earth',
    modality: 'fixed',
    ruler: { en: 'Venus', lt: 'Venera' },
    house: 2,
    motto: { en: 'I have', lt: 'Aš turiu' },
    archetype: { en: 'The Builder', lt: 'Statytojas' },
    keywords: {
      en: ['Stability', 'Sensuality', 'Patience', 'Loyalty', 'Abundance'],
      lt: ['Stabilumas', 'Juslingumas', 'Kantrybė', 'Ištikimybė', 'Gausa'],
    },
    overview: {
      en: 'Taurus is the steady, grounded heart of spring. Ruled by Venus, it loves beauty, comfort and the pleasures of the body — good food, nature, music, touch. Taurus builds slowly and surely, and what it builds tends to last.',
      lt: 'Jautis — rami, įsišaknijusi pavasario širdis. Valdomas Veneros, jis myli grožį, komfortą ir kūno malonumus — gerą maistą, gamtą, muziką, prisilietimus. Jautis kuria lėtai, bet tvirtai, ir tai, ką sukuria, išlieka ilgam.',
    },
    strengths: {
      en: ['Reliable and patient', 'Practical and resourceful', 'Deeply loyal', 'Calm under pressure', 'Strong sense of beauty'],
      lt: ['Patikimas ir kantrus', 'Praktiškas ir išradingas', 'Labai ištikimas', 'Ramus spaudimo metu', 'Stiprus grožio pojūtis'],
    },
    challenges: {
      en: ['Stubbornness', 'Resistance to change', 'Possessiveness', 'Over-indulgence'],
      lt: ['Užsispyrimas', 'Pasipriešinimas pokyčiams', 'Savininkiškumas', 'Polinkis persistengti malonumuose'],
    },
    love: {
      en: 'Slow to commit but deeply devoted once in. Taurus shows love through touch, presence and care, and needs security and consistency.',
      lt: 'Lėtai įsipareigoja, bet tada atsiduoda visa širdimi. Jautis meilę rodo prisilietimais, buvimu šalia ir rūpesčiu, o jam pačiam reikia saugumo ir pastovumo.',
    },
    career: {
      en: 'Excels in steady, tangible work: finance, architecture, gardening, cooking, design, music, real estate and any craft that rewards patience.',
      lt: 'Puikiai sekasi stabiliame, apčiuopiamame darbe: finansai, architektūra, sodininkystė, kulinarija, dizainas, muzika, nekilnojamas turtas ir bet koks amatas, kuriame svarbi kantrybė.',
    },
    health: {
      en: 'Robust constitution, but sensitive throat and a tendency toward sluggishness. Time in nature, gentle daily movement and mindful eating keep Taurus vital.',
      lt: 'Stipri sveikata, tačiau jautri gerklė ir polinkis į vangumą. Jautį gyvybingą palaiko buvimas gamtoje, švelnus kasdienis judėjimas ir sąmoningas valgymas.',
    },
    body: { en: 'Neck, throat, thyroid', lt: 'Kaklas, gerklė, skydliaukė' },
    growth: {
      en: 'Discovering that true security lives within, not in possessions. The lesson: let go gracefully and allow life to move.',
      lt: 'Atrasti, kad tikras saugumas gyvena viduje, o ne daiktuose. Pamoka: grakščiai paleisti ir leisti gyvenimui tekėti.',
    },
    colors: { en: ['Green', 'Pink', 'Earth tones'], lt: ['Žalia', 'Rožinė', 'Žemės atspalviai'] },
    stones: { en: ['Emerald', 'Rose quartz', 'Jade'], lt: ['Smaragdas', 'Rožinis kvarcas', 'Nefritas'] },
    metal: { en: 'Copper', lt: 'Varis' },
    day: { en: 'Friday', lt: 'Penktadienis' },
    numbers: [2, 6],
    chakra: { category: 'chakras', slug: 'muladhara-root' },
    practices: [
      { category: 'meditation', slug: 'body-scan' },
      { category: 'yoga', slug: 'hatha-yoga' },
      { category: 'energy', slug: 'qigong-basics' },
    ],
  },
  {
    slug: 'gemini',
    symbol: '♊\uFE0E',
    name: { en: 'Gemini', lt: 'Dvyniai' },
    latin: 'Gemini',
    start: [5, 21],
    end: [6, 20],
    element: 'air',
    modality: 'mutable',
    ruler: { en: 'Mercury', lt: 'Merkurijus' },
    house: 3,
    motto: { en: 'I think', lt: 'Aš mąstau' },
    archetype: { en: 'The Messenger', lt: 'Pasiuntinys' },
    keywords: {
      en: ['Curiosity', 'Communication', 'Versatility', 'Wit', 'Learning'],
      lt: ['Smalsumas', 'Bendravimas', 'Universalumas', 'Sąmojis', 'Mokymasis'],
    },
    overview: {
      en: 'Gemini is the curious mind of the zodiac, symbolised by the Twins. Ruled by Mercury, it gathers ideas, connects people and translates between worlds. Quick, playful and endlessly interested, Gemini keeps life moving.',
      lt: 'Dvyniai — smalsus zodiako protas, simbolizuojamas dvynių. Valdomi Merkurijaus, jie renka idėjas, jungia žmones ir verčia iš vieno pasaulio kalbos į kitą. Greiti, žaismingi ir be galo smalsūs, Dvyniai neleidžia gyvenimui sustingti.',
    },
    strengths: {
      en: ['Brilliant communicator', 'Adaptable and quick-witted', 'Curious lifelong learner', 'Sociable and fun', 'Sees many perspectives'],
      lt: ['Puikus bendrautojas', 'Prisitaikantys ir sąmojingi', 'Smalsūs, mokosi visą gyvenimą', 'Draugiški ir linksmi', 'Mato daug požiūrių'],
    },
    challenges: {
      en: ['Restlessness', 'Scattered focus', 'Nervous energy', 'Avoiding deep feelings'],
      lt: ['Nenustygimas vietoje', 'Išsiblaškymas', 'Nervinė įtampa', 'Gilių jausmų vengimas'],
    },
    love: {
      en: 'Needs mental chemistry first. Gemini falls for great conversation, humour and freedom — boredom is the real enemy of romance.',
      lt: 'Pirmiausia reikia proto chemijos. Dvyniai įsimyli puikų pokalbį, humorą ir laisvę — tikrasis romantikos priešas yra nuobodulys.',
    },
    career: {
      en: 'Shines in writing, journalism, teaching, marketing, media, languages, sales, and any role with variety and lots of people.',
      lt: 'Spindi rašyme, žurnalistikoje, mokyme, rinkodaroje, žiniasklaidoje, kalbose, pardavimuose ir bet kur, kur daug įvairovės bei žmonių.',
    },
    health: {
      en: 'The nervous system and lungs need care. Overthinking and poor sleep are common; slow, rhythmic breathing calms the busy mind.',
      lt: 'Reikia rūpintis nervų sistema ir plaučiais. Dažnas per didelis mąstymas ir prastas miegas; lėtas, ritmingas kvėpavimas ramina neramų protą.',
    },
    body: { en: 'Lungs, shoulders, arms, hands, nervous system', lt: 'Plaučiai, pečiai, rankos, plaštakos, nervų sistema' },
    growth: {
      en: 'Moving from information to wisdom — from knowing many things to deeply understanding a few. The lesson: stillness of mind.',
      lt: 'Pereiti nuo informacijos prie išminties — nuo daugybės žinių prie gilaus kelių dalykų supratimo. Pamoka: proto tyla.',
    },
    colors: { en: ['Yellow', 'Light green'], lt: ['Geltona', 'Šviesiai žalia'] },
    stones: { en: ['Agate', 'Citrine', 'Tiger’s eye'], lt: ['Agatas', 'Citrinas', 'Tigro akis'] },
    metal: { en: 'Mercury (quicksilver)', lt: 'Gyvsidabris' },
    day: { en: 'Wednesday', lt: 'Trečiadienis' },
    numbers: [3, 5],
    chakra: { category: 'chakras', slug: 'vishuddha-throat' },
    practices: [
      { category: 'breathwork', slug: 'nadi-shodhana' },
      { category: 'breathwork', slug: 'box-breathing' },
      { category: 'meditation', slug: 'vipassana' },
    ],
  },
  {
    slug: 'cancer',
    symbol: '♋\uFE0E',
    name: { en: 'Cancer', lt: 'Vėžys' },
    latin: 'Cancer',
    start: [6, 21],
    end: [7, 22],
    element: 'water',
    modality: 'cardinal',
    ruler: { en: 'Moon', lt: 'Mėnulis' },
    house: 4,
    motto: { en: 'I feel', lt: 'Aš jaučiu' },
    archetype: { en: 'The Nurturer', lt: 'Globėjas' },
    keywords: {
      en: ['Care', 'Intuition', 'Home', 'Emotion', 'Protection'],
      lt: ['Rūpestis', 'Intuicija', 'Namai', 'Emocijos', 'Apsauga'],
    },
    overview: {
      en: 'Cancer is the emotional home of the zodiac. Ruled by the Moon, it feels deeply, remembers everything and protects the people it loves. Beneath a protective shell lives a tender, intuitive and fiercely loyal heart.',
      lt: 'Vėžys — emociniai zodiako namai. Valdomas Mėnulio, jis giliai jaučia, viską prisimena ir saugo tuos, kuriuos myli. Po apsauginiu kiautu slypi švelni, intuityvi ir nepaprastai ištikima širdis.',
    },
    strengths: {
      en: ['Deeply caring', 'Strong intuition', 'Loyal and protective', 'Emotionally intelligent', 'Creates a sense of home'],
      lt: ['Labai rūpestingas', 'Stipri intuicija', 'Ištikimas ir globojantis', 'Emociškai protingas', 'Sukuria namų jausmą'],
    },
    challenges: {
      en: ['Moodiness', 'Over-sensitivity', 'Holding on to the past', 'Withdrawing into the shell'],
      lt: ['Nuotaikų kaita', 'Per didelis jautrumas', 'Laikymasis praeities', 'Užsidarymas savo kiaute'],
    },
    love: {
      en: 'Romantic, devoted and nurturing. Cancer needs emotional safety and a partner who values family, tenderness and loyalty.',
      lt: 'Romantiškas, atsidavęs ir globojantis. Vėžiui reikia emocinio saugumo ir partnerio, kuris vertina šeimą, švelnumą ir ištikimybę.',
    },
    career: {
      en: 'Gifted in caring professions: healthcare, psychology, teaching, hospitality, cooking, social work, history and family business.',
      lt: 'Gabus rūpinimosi profesijose: sveikatos priežiūra, psichologija, mokymas, svetingumas, kulinarija, socialinis darbas, istorija, šeimos verslas.',
    },
    health: {
      en: 'Emotions show up in the stomach and digestion. Tides of mood follow the Moon; gentle rhythms, warm food and emotional release support Cancer.',
      lt: 'Emocijos atsiliepia skrandžiui ir virškinimui. Nuotaikų potvyniai seka Mėnulį; Vėžį palaiko švelnūs ritmai, šiltas maistas ir emocijų paleidimas.',
    },
    body: { en: 'Chest, breasts, stomach', lt: 'Krūtinė, skrandis' },
    growth: {
      en: 'Learning to nurture the self as generously as others, and to feel without being flooded. The lesson: emotional boundaries.',
      lt: 'Išmokti globoti save taip pat dosniai kaip kitus ir jausti neskęstant jausmuose. Pamoka: emocinės ribos.',
    },
    colors: { en: ['Silver', 'White', 'Sea blue'], lt: ['Sidabrinė', 'Balta', 'Jūros mėlyna'] },
    stones: { en: ['Moonstone', 'Pearl', 'Ruby'], lt: ['Mėnulio akmuo', 'Perlas', 'Rubinas'] },
    metal: { en: 'Silver', lt: 'Sidabras' },
    day: { en: 'Monday', lt: 'Pirmadienis' },
    numbers: [2, 7],
    chakra: { category: 'chakras', slug: 'svadhisthana-sacral' },
    practices: [
      { category: 'meditation', slug: 'loving-kindness' },
      { category: 'yoga', slug: 'yin-yoga' },
      { category: 'meditation', slug: 'yoga-nidra' },
    ],
  },
  {
    slug: 'leo',
    symbol: '♌\uFE0E',
    name: { en: 'Leo', lt: 'Liūtas' },
    latin: 'Leo',
    start: [7, 23],
    end: [8, 22],
    element: 'fire',
    modality: 'fixed',
    ruler: { en: 'Sun', lt: 'Saulė' },
    house: 5,
    motto: { en: 'I will', lt: 'Aš noriu' },
    archetype: { en: 'The Sovereign', lt: 'Valdovas' },
    keywords: {
      en: ['Creativity', 'Generosity', 'Confidence', 'Warmth', 'Self-expression'],
      lt: ['Kūrybiškumas', 'Dosnumas', 'Pasitikėjimas', 'Šiluma', 'Saviraiška'],
    },
    overview: {
      en: 'Leo is the radiant heart of summer, ruled by the Sun itself. Warm, generous and expressive, Leo wants to create, to shine and to bring joy. At its best, Leo leads with the heart and lifts everyone around it.',
      lt: 'Liūtas — spinduliuojanti vasaros širdis, valdoma pačios Saulės. Šiltas, dosnus ir išraiškingas, Liūtas nori kurti, spindėti ir dovanoti džiaugsmą. Geriausiu atveju jis vadovauja širdimi ir pakylėja visus aplinkinius.',
    },
    strengths: {
      en: ['Warm-hearted and generous', 'Charismatic and confident', 'Creative and playful', 'Loyal protector', 'Inspires others'],
      lt: ['Šiltas ir dosnus', 'Charizmatiškas ir pasitikintis', 'Kūrybingas ir žaismingas', 'Ištikimas gynėjas', 'Įkvepia kitus'],
    },
    challenges: {
      en: ['Pride', 'Need for recognition', 'Drama', 'Difficulty accepting criticism'],
      lt: ['Išdidumas', 'Pripažinimo poreikis', 'Dramatizmas', 'Sunkiai priima kritiką'],
    },
    love: {
      en: 'Grand, romantic and wholehearted. Leo loves to adore and be adored, and stays loyal to a partner who appreciates and celebrates them.',
      lt: 'Didingas, romantiškas ir visa širdimi. Liūtas mėgsta dievinti ir būti dievinamas, ir lieka ištikimas partneriui, kuris jį vertina ir šlovina.',
    },
    career: {
      en: 'Born for the stage and leadership: arts, acting, entertainment, management, teaching, design, children’s work and any visible role.',
      lt: 'Gimęs scenai ir vadovavimui: menai, aktorystė, pramogos, vadyba, mokymas, dizainas, darbas su vaikais ir bet koks matomas vaidmuo.',
    },
    health: {
      en: 'Strong vitality centred in the heart and spine. Needs joy and play to stay well; heart-opening practices keep the fire balanced.',
      lt: 'Stiprus gyvybingumas, sutelktas širdyje ir stubure. Kad būtų sveikas, reikia džiaugsmo ir žaidimo; širdį atveriančios praktikos subalansuoja ugnį.',
    },
    body: { en: 'Heart, spine, upper back', lt: 'Širdis, stuburas, viršutinė nugaros dalis' },
    growth: {
      en: 'Shining from authentic inner light rather than outside applause. The lesson: humility and heart-centred leadership.',
      lt: 'Šviesti iš autentiškos vidinės šviesos, o ne dėl aplodismentų. Pamoka: nuolankumas ir širdimi grįstas vadovavimas.',
    },
    colors: { en: ['Gold', 'Orange', 'Purple'], lt: ['Auksinė', 'Oranžinė', 'Violetinė'] },
    stones: { en: ['Ruby', 'Peridot', 'Sunstone'], lt: ['Rubinas', 'Peridotas', 'Saulės akmuo'] },
    metal: { en: 'Gold', lt: 'Auksas' },
    day: { en: 'Sunday', lt: 'Sekmadienis' },
    numbers: [1, 4],
    chakra: { category: 'chakras', slug: 'anahata-heart' },
    practices: [
      { category: 'yoga', slug: 'sun-salutation' },
      { category: 'chakras', slug: 'anahata-heart' },
      { category: 'meditation', slug: 'trataka' },
    ],
  },
  {
    slug: 'virgo',
    symbol: '♍\uFE0E',
    name: { en: 'Virgo', lt: 'Mergelė' },
    latin: 'Virgo',
    start: [8, 23],
    end: [9, 22],
    element: 'earth',
    modality: 'mutable',
    ruler: { en: 'Mercury', lt: 'Merkurijus' },
    house: 6,
    motto: { en: 'I analyse', lt: 'Aš analizuoju' },
    archetype: { en: 'The Healer', lt: 'Gydytojas' },
    keywords: {
      en: ['Service', 'Precision', 'Health', 'Humility', 'Improvement'],
      lt: ['Tarnystė', 'Tikslumas', 'Sveikata', 'Kuklumas', 'Tobulėjimas'],
    },
    overview: {
      en: 'Virgo is the harvest sign — sorting, refining and making things whole. Ruled by Mercury, Virgo combines a sharp mind with practical hands and a quiet desire to be useful. It notices the details others miss and heals through care and order.',
      lt: 'Mergelė — derliaus ženklas: ji rūšiuoja, tobulina ir daro dalykus visumą. Valdoma Merkurijaus, Mergelė jungia aštrų protą su praktiškomis rankomis ir tyliu noru būti naudinga. Ji pastebi detales, kurių kiti nemato, ir gydo rūpesčiu bei tvarka.',
    },
    strengths: {
      en: ['Detail-oriented and precise', 'Helpful and dependable', 'Analytical problem-solver', 'Health-conscious', 'Modest and hard-working'],
      lt: ['Dėmesinga detalėms ir tiksli', 'Paslaugi ir patikima', 'Analitiškai sprendžia problemas', 'Rūpinasi sveikata', 'Kukli ir darbšti'],
    },
    challenges: {
      en: ['Perfectionism', 'Self-criticism', 'Worry and overthinking', 'Being overly critical of others'],
      lt: ['Perfekcionizmas', 'Savikritika', 'Nerimas ir perdėtas mąstymas', 'Per didelis kitų kritikavimas'],
    },
    love: {
      en: 'Shows love through acts of service and attention. Virgo opens slowly and needs a partner who is sincere, reliable and appreciates small gestures.',
      lt: 'Meilę rodo darbais ir dėmesiu. Mergelė atsiveria lėtai, jai reikia nuoširdaus, patikimo partnerio, kuris vertina mažus gestus.',
    },
    career: {
      en: 'Excels in health, medicine, nutrition, research, editing, analytics, accounting, craftsmanship and any field needing precision.',
      lt: 'Puikiai sekasi sveikatos srityje, medicinoje, mityboje, tyrimuose, redagavime, analitikoje, apskaitoje, amatuose ir visur, kur reikia tikslumo.',
    },
    health: {
      en: 'Digestion and the nervous system reflect stress. Clean routines, mindful eating and letting go of worry are Virgo’s medicine.',
      lt: 'Virškinimas ir nervų sistema atspindi stresą. Mergelės vaistai — tvarkinga dienotvarkė, sąmoningas valgymas ir nerimo paleidimas.',
    },
    body: { en: 'Intestines, digestive system, nervous system', lt: 'Žarnynas, virškinimo ir nervų sistema' },
    growth: {
      en: 'Accepting imperfection as part of wholeness. The lesson: serving from love, not from the fear of not being enough.',
      lt: 'Priimti netobulumą kaip visumos dalį. Pamoka: tarnauti iš meilės, o ne iš baimės būti nepakankama.',
    },
    colors: { en: ['Navy', 'Beige', 'Forest green'], lt: ['Tamsiai mėlyna', 'Smėlio', 'Miško žalia'] },
    stones: { en: ['Sapphire', 'Peridot', 'Amazonite'], lt: ['Safyras', 'Peridotas', 'Amazonitas'] },
    metal: { en: 'Mercury (quicksilver)', lt: 'Gyvsidabris' },
    day: { en: 'Wednesday', lt: 'Trečiadienis' },
    numbers: [5, 6],
    chakra: { category: 'chakras', slug: 'manipura-solar-plexus' },
    practices: [
      { category: 'meditation', slug: 'mindfulness' },
      { category: 'breathwork', slug: 'coherent-breathing' },
      { category: 'yoga', slug: 'hatha-yoga' },
    ],
  },
  {
    slug: 'libra',
    symbol: '♎\uFE0E',
    name: { en: 'Libra', lt: 'Svarstyklės' },
    latin: 'Libra',
    start: [9, 23],
    end: [10, 22],
    element: 'air',
    modality: 'cardinal',
    ruler: { en: 'Venus', lt: 'Venera' },
    house: 7,
    motto: { en: 'I balance', lt: 'Aš derinu' },
    archetype: { en: 'The Diplomat', lt: 'Diplomatas' },
    keywords: {
      en: ['Harmony', 'Partnership', 'Beauty', 'Justice', 'Diplomacy'],
      lt: ['Harmonija', 'Partnerystė', 'Grožis', 'Teisingumas', 'Diplomatija'],
    },
    overview: {
      en: 'Libra arrives at the autumn equinox, when day and night stand in balance. Ruled by Venus, it seeks harmony, fairness and beauty in relationships and surroundings. Libra is the peacemaker who sees both sides of every story.',
      lt: 'Svarstyklės ateina rudens lygiadienį, kai diena ir naktis susilygina. Valdomos Veneros, jos ieško harmonijos, teisingumo ir grožio santykiuose bei aplinkoje. Svarstyklės — taikdarė, matanti abi kiekvienos istorijos puses.',
    },
    strengths: {
      en: ['Diplomatic and fair', 'Charming and sociable', 'Refined aesthetic sense', 'Excellent partner and collaborator', 'Calm mediator'],
      lt: ['Diplomatiškos ir teisingos', 'Žavios ir draugiškos', 'Rafinuotas estetinis jausmas', 'Puikios partnerės ir bendradarbės', 'Ramios tarpininkės'],
    },
    challenges: {
      en: ['Indecision', 'People-pleasing', 'Avoiding conflict', 'Losing themselves in relationships'],
      lt: ['Neryžtingumas', 'Noras visiems įtikti', 'Konfliktų vengimas', 'Savęs praradimas santykiuose'],
    },
    love: {
      en: 'The sign of partnership. Libra is romantic, considerate and attentive, and blossoms in an equal, graceful relationship.',
      lt: 'Partnerystės ženklas. Svarstyklės romantiškos, dėmesingos ir mandagios, jos pražysta lygiaverčiuose, grakščiuose santykiuose.',
    },
    career: {
      en: 'Natural in law, mediation, diplomacy, design, fashion, art, HR, counselling and client-facing roles.',
      lt: 'Natūraliai jaučiasi teisėje, mediacijoje, diplomatijoje, dizaine, madoje, mene, personalo valdyme, konsultavime ir darbe su klientais.',
    },
    health: {
      en: 'Kidneys and lower back mirror inner balance. Disharmony quickly affects wellbeing; graceful movement and balanced breathing restore it.',
      lt: 'Inkstai ir juosmuo atspindi vidinę pusiausvyrą. Disharmonija greitai paveikia savijautą; ją atkuria grakštus judesys ir subalansuotas kvėpavimas.',
    },
    body: { en: 'Kidneys, lower back, skin', lt: 'Inkstai, juosmuo, oda' },
    growth: {
      en: 'Finding balance within instead of seeking it through others. The lesson: choosing, even when it disappoints someone.',
      lt: 'Rasti pusiausvyrą viduje, o ne ieškoti jos per kitus. Pamoka: rinktis, net jei tai ką nors nuvilia.',
    },
    colors: { en: ['Pastel blue', 'Pink', 'Lavender'], lt: ['Pastelinė mėlyna', 'Rožinė', 'Levandų'] },
    stones: { en: ['Opal', 'Lapis lazuli', 'Rose quartz'], lt: ['Opalas', 'Lazuritas', 'Rožinis kvarcas'] },
    metal: { en: 'Copper', lt: 'Varis' },
    day: { en: 'Friday', lt: 'Penktadienis' },
    numbers: [6, 7],
    chakra: { category: 'chakras', slug: 'anahata-heart' },
    practices: [
      { category: 'breathwork', slug: 'nadi-shodhana' },
      { category: 'breathwork', slug: 'coherent-breathing' },
      { category: 'meditation', slug: 'loving-kindness' },
    ],
  },
  {
    slug: 'scorpio',
    symbol: '♏\uFE0E',
    name: { en: 'Scorpio', lt: 'Skorpionas' },
    latin: 'Scorpio',
    start: [10, 23],
    end: [11, 21],
    element: 'water',
    modality: 'fixed',
    ruler: { en: 'Pluto (traditionally Mars)', lt: 'Plutonas (tradiciškai Marsas)' },
    house: 8,
    motto: { en: 'I desire', lt: 'Aš trokštu' },
    archetype: { en: 'The Alchemist', lt: 'Alchemikas' },
    keywords: {
      en: ['Transformation', 'Intensity', 'Depth', 'Passion', 'Regeneration'],
      lt: ['Transformacija', 'Intensyvumas', 'Gelmė', 'Aistra', 'Atsinaujinimas'],
    },
    overview: {
      en: 'Scorpio is the sign of death and rebirth — the phoenix rising from the ashes. Ruled by Pluto and Mars, it dives beneath the surface to the hidden truth of things. Intense, magnetic and loyal, Scorpio transforms everything it touches.',
      lt: 'Skorpionas — mirties ir atgimimo ženklas, feniksas, kylantis iš pelenų. Valdomas Plutono ir Marso, jis neria po paviršiumi iki paslėptos tiesos. Intensyvus, magnetiškas ir ištikimas, Skorpionas transformuoja viską, ką paliečia.',
    },
    strengths: {
      en: ['Deeply perceptive', 'Passionate and determined', 'Fiercely loyal', 'Resilient through crisis', 'Magnetic presence'],
      lt: ['Labai įžvalgus', 'Aistringas ir ryžtingas', 'Nepaprastai ištikimas', 'Atsparus krizėms', 'Magnetiškas buvimas'],
    },
    challenges: {
      en: ['Jealousy', 'Secrecy', 'Holding grudges', 'Need for control'],
      lt: ['Pavydas', 'Slaptumas', 'Nuoskaudų laikymas', 'Kontrolės poreikis'],
    },
    love: {
      en: 'All or nothing. Scorpio seeks soul-level intimacy, total honesty and trust — and gives profound devotion in return.',
      lt: 'Viskas arba nieko. Skorpionas ieško sielos lygmens artumo, visiško atvirumo ir pasitikėjimo — ir atsilygina gilia ištikimybe.',
    },
    career: {
      en: 'Powerful in psychology, research, investigation, surgery, finance, crisis work, healing and anything involving hidden depths.',
      lt: 'Stiprus psichologijoje, tyrimuose, tyrėjo darbe, chirurgijoje, finansuose, krizių valdyme, gydyme ir visur, kur slypi gelmės.',
    },
    health: {
      en: 'Strong regenerative power. Suppressed emotion settles in the reproductive and elimination systems; release and sacral practices help.',
      lt: 'Stipri atsinaujinimo galia. Užgniaužtos emocijos nusėda reprodukcinėje ir šalinimo sistemose; padeda paleidimo ir sakralinės praktikos.',
    },
    body: { en: 'Reproductive organs, pelvis, elimination system', lt: 'Lytiniai organai, dubuo, šalinimo sistema' },
    growth: {
      en: 'Transmuting intensity into healing and letting go of control. The lesson: trust and forgiveness as true power.',
      lt: 'Paversti intensyvumą gydymu ir paleisti kontrolę. Pamoka: pasitikėjimas ir atleidimas — tikroji galia.',
    },
    colors: { en: ['Deep red', 'Black', 'Maroon'], lt: ['Tamsiai raudona', 'Juoda', 'Bordo'] },
    stones: { en: ['Obsidian', 'Topaz', 'Garnet'], lt: ['Obsidianas', 'Topazas', 'Granatas'] },
    metal: { en: 'Iron, plutonium', lt: 'Geležis, plutonis' },
    day: { en: 'Tuesday', lt: 'Antradienis' },
    numbers: [8, 9],
    chakra: { category: 'chakras', slug: 'svadhisthana-sacral' },
    practices: [
      { category: 'kundalini', slug: 'sat-kriya' },
      { category: 'seed-energy', slug: 'seed-orbit-cultivation' },
      { category: 'breathwork', slug: 'holotropic' },
    ],
  },
  {
    slug: 'sagittarius',
    symbol: '♐\uFE0E',
    name: { en: 'Sagittarius', lt: 'Šaulys' },
    latin: 'Sagittarius',
    start: [11, 22],
    end: [12, 21],
    element: 'fire',
    modality: 'mutable',
    ruler: { en: 'Jupiter', lt: 'Jupiteris' },
    house: 9,
    motto: { en: 'I see', lt: 'Aš matau' },
    archetype: { en: 'The Seeker', lt: 'Ieškotojas' },
    keywords: {
      en: ['Freedom', 'Optimism', 'Adventure', 'Philosophy', 'Truth'],
      lt: ['Laisvė', 'Optimizmas', 'Nuotykiai', 'Filosofija', 'Tiesa'],
    },
    overview: {
      en: 'Sagittarius is the archer aiming its arrow at the horizon. Ruled by expansive Jupiter, it longs for meaning, travel, wisdom and freedom. Generous, honest and funny, Sagittarius turns life into a great adventure of discovery.',
      lt: 'Šaulys — lankininkas, taikantis strėlę į horizontą. Valdomas plečiančio Jupiterio, jis trokšta prasmės, kelionių, išminties ir laisvės. Dosnus, tiesus ir linksmas, Šaulys gyvenimą paverčia didžiu atradimų nuotykiu.',
    },
    strengths: {
      en: ['Optimistic and inspiring', 'Adventurous and open-minded', 'Honest and generous', 'Philosophical', 'Great sense of humour'],
      lt: ['Optimistiškas ir įkvepiantis', 'Nuotykių mėgėjas, atviro proto', 'Sąžiningas ir dosnus', 'Filosofiškas', 'Puikus humoro jausmas'],
    },
    challenges: {
      en: ['Restlessness', 'Tactless bluntness', 'Over-promising', 'Fear of commitment'],
      lt: ['Nerimastingumas', 'Netaktiškas tiesmukumas', 'Per daug žada', 'Įsipareigojimų baimė'],
    },
    love: {
      en: 'Loves a partner who is also a friend and fellow explorer. Sagittarius needs freedom, laughter and shared growth.',
      lt: 'Myli partnerį, kuris kartu yra draugas ir kelionių bendražygis. Šauliui reikia laisvės, juoko ir bendro augimo.',
    },
    career: {
      en: 'Thrives in travel, teaching, publishing, philosophy, law, sports, coaching, spirituality and international work.',
      lt: 'Klesti kelionėse, mokyme, leidyboje, filosofijoje, teisėje, sporte, ugdomajame vadovavime (koučinge), dvasingume ir tarptautiniame darbe.',
    },
    health: {
      en: 'Hips, thighs and liver are sensitive; excess is the main risk. Movement outdoors, stretching the hips and moderation keep Sagittarius strong.',
      lt: 'Jautrūs klubai, šlaunys ir kepenys; didžiausia rizika — perteklius. Šaulį stiprų palaiko judėjimas lauke, klubų tempimas ir saikas.',
    },
    body: { en: 'Hips, thighs, liver', lt: 'Klubai, šlaunys, kepenys' },
    growth: {
      en: 'Finding the truth within instead of always beyond the horizon. The lesson: depth and commitment as a doorway to freedom.',
      lt: 'Rasti tiesą viduje, o ne visada už horizonto. Pamoka: gilumas ir įsipareigojimas — durys į laisvę.',
    },
    colors: { en: ['Purple', 'Royal blue', 'Turquoise'], lt: ['Violetinė', 'Karališkai mėlyna', 'Turkio'] },
    stones: { en: ['Turquoise', 'Amethyst', 'Topaz'], lt: ['Turkis', 'Ametistas', 'Topazas'] },
    metal: { en: 'Tin', lt: 'Alavas' },
    day: { en: 'Thursday', lt: 'Ketvirtadienis' },
    numbers: [3, 9],
    chakra: { category: 'chakras', slug: 'ajna-third-eye' },
    practices: [
      { category: 'yoga', slug: 'vinyasa-flow' },
      { category: 'breathwork', slug: 'wim-hof' },
      { category: 'meditation', slug: 'zen-zazen' },
    ],
  },
  {
    slug: 'capricorn',
    symbol: '♑\uFE0E',
    name: { en: 'Capricorn', lt: 'Ožiaragis' },
    latin: 'Capricornus',
    start: [12, 22],
    end: [1, 19],
    element: 'earth',
    modality: 'cardinal',
    ruler: { en: 'Saturn', lt: 'Saturnas' },
    house: 10,
    motto: { en: 'I use', lt: 'Aš panaudoju' },
    archetype: { en: 'The Master', lt: 'Meistras' },
    keywords: {
      en: ['Discipline', 'Ambition', 'Responsibility', 'Endurance', 'Mastery'],
      lt: ['Disciplina', 'Ambicijos', 'Atsakomybė', 'Ištvermė', 'Meistrystė'],
    },
    overview: {
      en: 'Capricorn begins at the winter solstice, the darkest night when light is reborn. Ruled by Saturn, it climbs steadily toward the summit, building structures that stand the test of time. Wise, patient and quietly humorous, Capricorn grows younger as it ages.',
      lt: 'Ožiaragis prasideda žiemos saulėgrįžą — tamsiausią naktį, kai atgimsta šviesa. Valdomas Saturno, jis atkakliai kopia į viršūnę, kurdamas laiko išbandymą atlaikančias struktūras. Išmintingas, kantrus ir tyliai sąmojingas, Ožiaragis su metais tarsi jaunėja.',
    },
    strengths: {
      en: ['Disciplined and responsible', 'Ambitious and strategic', 'Patient and persistent', 'Practical wisdom', 'Dry, clever humour'],
      lt: ['Disciplinuotas ir atsakingas', 'Ambicingas ir strategiškas', 'Kantrus ir atkaklus', 'Praktiška išmintis', 'Sausas, protingas humoras'],
    },
    challenges: {
      en: ['Pessimism', 'Workaholism', 'Emotional reserve', 'Being too hard on themselves'],
      lt: ['Pesimizmas', 'Darboholizmas', 'Emocinis santūrumas', 'Per didelis griežtumas sau'],
    },
    love: {
      en: 'Serious about love and built for the long term. Capricorn shows devotion through commitment, reliability and building a future together.',
      lt: 'Rimtai žiūri į meilę ir siekia ilgalaikių santykių. Ožiaragis atsidavimą rodo įsipareigojimu, patikimumu ir bendros ateities kūrimu.',
    },
    career: {
      en: 'Excels in management, business, government, engineering, architecture, finance and any long-term building of structures and legacy.',
      lt: 'Puikiai sekasi vadyboje, versle, valstybės tarnyboje, inžinerijoje, architektūroje, finansuose ir ilgalaikiame struktūrų bei palikimo kūrime.',
    },
    health: {
      en: 'Bones, joints, knees and teeth carry the weight of responsibility. Rest, warmth, flexibility work and permission to play restore balance.',
      lt: 'Kaulai, sąnariai, keliai ir dantys neša atsakomybės naštą. Pusiausvyrą atkuria poilsis, šiluma, lankstumo pratimai ir leidimas sau žaisti.',
    },
    body: { en: 'Bones, knees, joints, teeth, skin', lt: 'Kaulai, keliai, sąnariai, dantys, oda' },
    growth: {
      en: 'Realising that worth is not measured by achievement. The lesson: soften, rest, and let joy be part of the climb.',
      lt: 'Suvokti, kad vertė nematuojama pasiekimais. Pamoka: suminkštėti, pailsėti ir leisti džiaugsmui tapti kopimo dalimi.',
    },
    colors: { en: ['Charcoal', 'Brown', 'Dark green'], lt: ['Grafito', 'Ruda', 'Tamsiai žalia'] },
    stones: { en: ['Garnet', 'Onyx', 'Smoky quartz'], lt: ['Granatas', 'Oniksas', 'Dūminis kvarcas'] },
    metal: { en: 'Lead', lt: 'Švinas' },
    day: { en: 'Saturday', lt: 'Šeštadienis' },
    numbers: [4, 8],
    chakra: { category: 'chakras', slug: 'muladhara-root' },
    practices: [
      { category: 'meditation', slug: 'zen-zazen' },
      { category: 'yoga', slug: 'yin-yoga' },
      { category: 'energy', slug: 'microcosmic-orbit' },
    ],
  },
  {
    slug: 'aquarius',
    symbol: '♒\uFE0E',
    name: { en: 'Aquarius', lt: 'Vandenis' },
    latin: 'Aquarius',
    start: [1, 20],
    end: [2, 18],
    element: 'air',
    modality: 'fixed',
    ruler: { en: 'Uranus (traditionally Saturn)', lt: 'Uranas (tradiciškai Saturnas)' },
    house: 11,
    motto: { en: 'I know', lt: 'Aš žinau' },
    archetype: { en: 'The Visionary', lt: 'Vizionierius' },
    keywords: {
      en: ['Innovation', 'Humanity', 'Freedom', 'Originality', 'Community'],
      lt: ['Inovacijos', 'Žmogiškumas', 'Laisvė', 'Originalumas', 'Bendruomenė'],
    },
    overview: {
      en: 'Aquarius is the water-bearer pouring new ideas onto humanity. Ruled by Uranus and Saturn, it is inventive, independent and future-oriented. Aquarius cares about the collective, breaks outdated rules and dreams of a freer, fairer world.',
      lt: 'Vandenis — vandens nešėjas, liejantis naujas idėjas žmonijai. Valdomas Urano ir Saturno, jis išradingas, nepriklausomas ir nukreiptas į ateitį. Vandenis rūpinasi bendruomene, laužo pasenusias taisykles ir svajoja apie laisvesnį, teisingesnį pasaulį.',
    },
    strengths: {
      en: ['Original and inventive', 'Humanitarian', 'Independent thinker', 'Loyal friend', 'Open-minded and tolerant'],
      lt: ['Originalus ir išradingas', 'Humanistas', 'Nepriklausomai mąstantis', 'Ištikimas draugas', 'Atviras ir tolerantiškas'],
    },
    challenges: {
      en: ['Emotional detachment', 'Stubborn ideals', 'Rebelliousness for its own sake', 'Feeling like an outsider'],
      lt: ['Emocinis atsiribojimas', 'Užsispyrę idealai', 'Maištas dėl maišto', 'Svetimumo jausmas'],
    },
    love: {
      en: 'Friendship first. Aquarius needs a partner who respects their independence, shares their ideals and enjoys unconventional love.',
      lt: 'Pirmiausia draugystė. Vandeniui reikia partnerio, kuris gerbia jo nepriklausomybę, dalijasi idealais ir mėgsta netradicinę meilę.',
    },
    career: {
      en: 'At home in technology, science, innovation, social causes, astrology, aviation, NGOs and any field that shapes the future.',
      lt: 'Jaučiasi kaip namie technologijose, moksle, inovacijose, socialinėse iniciatyvose, astrologijoje, aviacijoje, NVO ir srityse, kuriančiose ateitį.',
    },
    health: {
      en: 'Circulation, ankles and the nervous system are sensitive. Grounding, rhythmic breath and body awareness balance a very active mind.',
      lt: 'Jautri kraujotaka, kulkšnys ir nervų sistema. Labai aktyvų protą subalansuoja įsižeminimas, ritmingas kvėpavimas ir kūno pajautimas.',
    },
    body: { en: 'Ankles, calves, circulation', lt: 'Kulkšnys, blauzdos, kraujotaka' },
    growth: {
      en: 'Bringing the heart into the vision. The lesson: love humanity by also loving the person right in front of you.',
      lt: 'Įtraukti širdį į viziją. Pamoka: mylėti žmoniją mylint ir žmogų, esantį čia pat, prieš tave.',
    },
    colors: { en: ['Electric blue', 'Turquoise', 'Silver'], lt: ['Elektrinė mėlyna', 'Turkio', 'Sidabrinė'] },
    stones: { en: ['Amethyst', 'Aquamarine', 'Garnet'], lt: ['Ametistas', 'Akvamarinas', 'Granatas'] },
    metal: { en: 'Aluminium, uranium', lt: 'Aliuminis, uranas' },
    day: { en: 'Saturday', lt: 'Šeštadienis' },
    numbers: [4, 7],
    chakra: { category: 'chakras', slug: 'ajna-third-eye' },
    practices: [
      { category: 'energy', slug: 'pranic-breathing' },
      { category: 'breathwork', slug: 'ujjayi' },
      { category: 'chakras', slug: 'ajna-third-eye' },
    ],
  },
  {
    slug: 'pisces',
    symbol: '♓\uFE0E',
    name: { en: 'Pisces', lt: 'Žuvys' },
    latin: 'Pisces',
    start: [2, 19],
    end: [3, 20],
    element: 'water',
    modality: 'mutable',
    ruler: { en: 'Neptune (traditionally Jupiter)', lt: 'Neptūnas (tradiciškai Jupiteris)' },
    house: 12,
    motto: { en: 'I believe', lt: 'Aš tikiu' },
    archetype: { en: 'The Mystic', lt: 'Mistikas' },
    keywords: {
      en: ['Compassion', 'Imagination', 'Spirituality', 'Intuition', 'Oneness'],
      lt: ['Užuojauta', 'Vaizduotė', 'Dvasingumas', 'Intuicija', 'Vienovė'],
    },
    overview: {
      en: 'Pisces closes the zodiac wheel and holds the wisdom of all the signs before it. Ruled by Neptune and Jupiter, it is the dreamer, the artist and the mystic — swimming between the visible world and the ocean of spirit. Pisces feels everything and heals through compassion.',
      lt: 'Žuvys užbaigia zodiako ratą ir talpina visų ankstesnių ženklų išmintį. Valdomos Neptūno ir Jupiterio, jos — svajotojos, menininkės ir mistikės, plaukiojančios tarp matomo pasaulio ir dvasios vandenyno. Žuvys jaučia viską ir gydo užuojauta.',
    },
    strengths: {
      en: ['Compassionate and kind', 'Deeply intuitive', 'Artistic and imaginative', 'Spiritually attuned', 'Selfless and gentle'],
      lt: ['Užjaučiančios ir geros', 'Labai intuityvios', 'Meniškos ir kūrybingos', 'Dvasiškai jautrios', 'Nesavanaudiškos ir švelnios'],
    },
    challenges: {
      en: ['Escapism', 'Weak boundaries', 'Victim mentality', 'Absorbing others’ emotions'],
      lt: ['Bėgimas nuo realybės', 'Silpnos ribos', 'Aukos mąstysena', 'Kitų emocijų sugėrimas'],
    },
    love: {
      en: 'Dreamy, devoted and soulful. Pisces longs for a spiritual, almost magical union and needs a partner who is gentle yet grounding.',
      lt: 'Svajingos, atsidavusios ir sielingos. Žuvys ilgisi dvasinės, beveik magiškos sąjungos, joms reikia švelnaus, bet įžeminančio partnerio.',
    },
    career: {
      en: 'Gifted in music, art, film, poetry, healing, therapy, spiritual work, charity and caring for the vulnerable.',
      lt: 'Gabios muzikoje, mene, kine, poezijoje, gydyme, terapijoje, dvasiniame darbe, labdaroje ir rūpinantis pažeidžiamais.',
    },
    health: {
      en: 'Feet, lymph and immunity are sensitive; Pisces absorbs the atmosphere around them. Rest, water, sleep and energetic cleansing are essential.',
      lt: 'Jautrios pėdos, limfa ir imunitetas; Žuvys sugeria aplinkos atmosferą. Būtina poilsis, vanduo, miegas ir energetinis apsivalymas.',
    },
    body: { en: 'Feet, lymphatic system, immune system', lt: 'Pėdos, limfinė ir imuninė sistema' },
    growth: {
      en: 'Grounding spiritual sensitivity in daily life and healthy boundaries. The lesson: compassion that includes oneself.',
      lt: 'Įžeminti dvasinį jautrumą kasdienybėje ir sveikose ribose. Pamoka: užuojauta, apimanti ir save.',
    },
    colors: { en: ['Sea green', 'Lilac', 'Soft violet'], lt: ['Jūros žalia', 'Alyvinė', 'Švelniai violetinė'] },
    stones: { en: ['Aquamarine', 'Amethyst', 'Moonstone'], lt: ['Akvamarinas', 'Ametistas', 'Mėnulio akmuo'] },
    metal: { en: 'Tin, platinum', lt: 'Alavas, platina' },
    day: { en: 'Thursday', lt: 'Ketvirtadienis' },
    numbers: [3, 7],
    chakra: { category: 'chakras', slug: 'sahasrara-crown' },
    practices: [
      { category: 'meditation', slug: 'yoga-nidra' },
      { category: 'energy', slug: 'reiki-self-healing' },
      { category: 'chakras', slug: 'sahasrara-crown' },
    ],
  },
]

export const ZODIAC_MAP: Record<ZodiacSlug, ZodiacSign> = Object.fromEntries(
  ZODIAC_SIGNS.map((s) => [s.slug, s])
) as Record<ZodiacSlug, ZodiacSign>

export const ZODIAC_SLUGS = ZODIAC_SIGNS.map((s) => s.slug)

/* ───────────────────────── Elements & modalities ───────────────────────── */

export interface ElementInfo {
  id: Element
  icon: string
  color: string
  name: Bi
  quality: Bi
  description: Bi
  balance: Bi
}

export const ELEMENTS: ElementInfo[] = [
  {
    id: 'fire',
    icon: '🜂',
    color: '#c2410c',
    name: { en: 'Fire', lt: 'Ugnis' },
    quality: { en: 'Spirit · Action · Inspiration', lt: 'Dvasia · Veiksmas · Įkvėpimas' },
    description: {
      en: 'Aries, Leo, Sagittarius. Passionate, spontaneous and courageous. Fire signs lead with enthusiasm and warm everyone around them.',
      lt: 'Avinas, Liūtas, Šaulys. Aistringi, spontaniški ir drąsūs. Ugnies ženklai veda entuziazmu ir sušildo visus aplinkui.',
    },
    balance: {
      en: 'Balance with cooling breath, stillness meditation and grounding.',
      lt: 'Subalansuokite vėsinančiu kvėpavimu, ramybės meditacija ir įsižeminimu.',
    },
  },
  {
    id: 'earth',
    icon: '🜃',
    color: '#4d7c0f',
    name: { en: 'Earth', lt: 'Žemė' },
    quality: { en: 'Body · Stability · Manifestation', lt: 'Kūnas · Stabilumas · Įgyvendinimas' },
    description: {
      en: 'Taurus, Virgo, Capricorn. Practical, reliable and sensual. Earth signs make ideas real and build lasting foundations.',
      lt: 'Jautis, Mergelė, Ožiaragis. Praktiški, patikimi ir juslingi. Žemės ženklai idėjas paverčia realybe ir kuria tvirtus pamatus.',
    },
    balance: {
      en: 'Balance with dynamic movement, energising breath and play.',
      lt: 'Subalansuokite dinamišku judėjimu, energizuojančiu kvėpavimu ir žaidimu.',
    },
  },
  {
    id: 'air',
    icon: '🜁',
    color: '#0369a1',
    name: { en: 'Air', lt: 'Oras' },
    quality: { en: 'Mind · Connection · Ideas', lt: 'Protas · Ryšys · Idėjos' },
    description: {
      en: 'Gemini, Libra, Aquarius. Intellectual, social and communicative. Air signs connect people and ideas and see the big picture.',
      lt: 'Dvyniai, Svarstyklės, Vandenis. Intelektualūs, socialūs ir komunikabilūs. Oro ženklai jungia žmones bei idėjas ir mato visumą.',
    },
    balance: {
      en: 'Balance with body awareness, grounding and heart-centred practice.',
      lt: 'Subalansuokite kūno pajautimu, įsižeminimu ir širdies praktikomis.',
    },
  },
  {
    id: 'water',
    icon: '🜄',
    color: '#4338ca',
    name: { en: 'Water', lt: 'Vanduo' },
    quality: { en: 'Soul · Emotion · Intuition', lt: 'Siela · Emocijos · Intuicija' },
    description: {
      en: 'Cancer, Scorpio, Pisces. Emotional, intuitive and empathic. Water signs feel deeply and heal through connection and compassion.',
      lt: 'Vėžys, Skorpionas, Žuvys. Emocingi, intuityvūs ir empatiški. Vandens ženklai giliai jaučia ir gydo ryšiu bei užuojauta.',
    },
    balance: {
      en: 'Balance with clear boundaries, structured routine and energising breath.',
      lt: 'Subalansuokite aiškiomis ribomis, struktūruota dienotvarke ir energizuojančiu kvėpavimu.',
    },
  },
]

export const ELEMENT_MAP = Object.fromEntries(ELEMENTS.map((e) => [e.id, e])) as Record<Element, ElementInfo>

export interface ModalityInfo {
  id: Modality
  name: Bi
  description: Bi
}

export const MODALITIES: ModalityInfo[] = [
  {
    id: 'cardinal',
    name: { en: 'Cardinal', lt: 'Kardinalūs' },
    description: {
      en: 'Aries, Cancer, Libra, Capricorn. They begin each season — initiators who start things and set direction.',
      lt: 'Avinas, Vėžys, Svarstyklės, Ožiaragis. Jie pradeda kiekvieną metų laiką — iniciatoriai, kurie pradeda ir nustato kryptį.',
    },
  },
  {
    id: 'fixed',
    name: { en: 'Fixed', lt: 'Fiksuoti' },
    description: {
      en: 'Taurus, Leo, Scorpio, Aquarius. The heart of each season — stabilisers who sustain, deepen and persevere.',
      lt: 'Jautis, Liūtas, Skorpionas, Vandenis. Kiekvieno metų laiko širdis — stabilizuotojai, kurie palaiko, gilina ir ištveria.',
    },
  },
  {
    id: 'mutable',
    name: { en: 'Mutable', lt: 'Kintami' },
    description: {
      en: 'Gemini, Virgo, Sagittarius, Pisces. They close each season — adapters who transform, flex and prepare the next cycle.',
      lt: 'Dvyniai, Mergelė, Šaulys, Žuvys. Jie užbaigia kiekvieną metų laiką — prisitaikantys, kurie keičia, lanksčiai derinasi ir paruošia naują ciklą.',
    },
  },
]

export const MODALITY_MAP = Object.fromEntries(MODALITIES.map((m) => [m.id, m])) as Record<Modality, ModalityInfo>

/* ───────────────────────── Sign finder ───────────────────────── */

const toOrdinal = (m: number, d: number) => m * 100 + d

/** Returns the tropical sun sign for a month (1-12) and day. */
export function signForDate(month: number, day: number): ZodiacSign {
  const v = toOrdinal(month, day)
  for (const s of ZODIAC_SIGNS) {
    const a = toOrdinal(...s.start)
    const b = toOrdinal(...s.end)
    if (a <= b ? v >= a && v <= b : v >= a || v <= b) return s
  }
  return ZODIAC_MAP.capricorn
}

/**
 * If the date is within two days of a sign boundary, return the neighbouring
 * sign — exact cusps shift a little from year to year.
 */
export function cuspNeighbour(month: number, day: number): ZodiacSign | null {
  const sign = signForDate(month, day)
  const idx = ZODIAC_SIGNS.indexOf(sign)
  const daysFrom = (m: number, d: number) => {
    const base = Date.UTC(2001, month - 1, day)
    // compare across year edge by testing adjacent years
    const candidates = [2000, 2001, 2002].map((y) => Math.abs(Date.UTC(y, m - 1, d) - base))
    return Math.min(...candidates) / 86400000
  }
  if (daysFrom(...sign.start) <= 2) return ZODIAC_SIGNS[(idx + 11) % 12]
  if (daysFrom(...sign.end) <= 2) return ZODIAC_SIGNS[(idx + 1) % 12]
  return null
}

export function formatRange(sign: ZodiacSign, locale: Locale): string {
  const fmt = (m: number, d: number) =>
    new Date(Date.UTC(2001, m - 1, d)).toLocaleDateString(locale === 'lt' ? 'lt-LT' : 'en-GB', {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  return `${fmt(...sign.start)} – ${fmt(...sign.end)}`
}

/* ───────────────────────── Compatibility ───────────────────────── */

export interface Compatibility {
  score: number
  aspect: Bi
  summary: Bi
}

/**
 * Classic aspect-based compatibility: the angular distance between two signs
 * on the wheel (conjunction, sextile, square, trine, quincunx, opposition).
 */
export function compatibility(a: ZodiacSlug, b: ZodiacSlug): Compatibility {
  const i = ZODIAC_SLUGS.indexOf(a)
  const j = ZODIAC_SLUGS.indexOf(b)
  const raw = Math.abs(i - j)
  const dist = Math.min(raw, 12 - raw)

  switch (dist) {
    case 0:
      return {
        score: 75,
        aspect: { en: 'Same sign (conjunction)', lt: 'Tas pats ženklas (konjunkcija)' },
        summary: {
          en: 'You understand each other instantly — a mirror. The gift is deep recognition; the risk is amplifying the same blind spots.',
          lt: 'Suprantate vienas kitą iš karto — tarsi veidrodis. Dovana — gilus atpažinimas; rizika — tų pačių aklųjų zonų sustiprinimas.',
        },
      }
    case 1:
      return {
        score: 55,
        aspect: { en: 'Neighbours (semi-sextile)', lt: 'Kaimynai (pusiau sekstilis)' },
        summary: {
          en: 'Different elements and rhythms, yet each holds what the other is learning. Growth comes through patience and curiosity.',
          lt: 'Skirtingi elementai ir ritmai, tačiau kiekvienas turi tai, ko mokosi kitas. Augimas ateina per kantrybę ir smalsumą.',
        },
      }
    case 2:
      return {
        score: 85,
        aspect: { en: 'Sextile', lt: 'Sekstilis' },
        summary: {
          en: 'Friendly, complementary elements (fire–air or earth–water). Easy flow, mutual support and plenty of shared opportunities.',
          lt: 'Draugiški, vienas kitą papildantys elementai (ugnis–oras arba žemė–vanduo). Lengvas srautas, abipusė parama ir daug bendrų galimybių.',
        },
      }
    case 3:
      return {
        score: 45,
        aspect: { en: 'Square', lt: 'Kvadratas' },
        summary: {
          en: 'Dynamic tension — sparks fly in both directions. Challenging but powerful: this bond pushes both of you to grow.',
          lt: 'Dinamiška įtampa — kibirkštys skrenda į abi puses. Sudėtinga, bet galinga: šis ryšys verčia abu augti.',
        },
      }
    case 4:
      return {
        score: 95,
        aspect: { en: 'Trine (same element)', lt: 'Trigonas (tas pats elementas)' },
        summary: {
          en: 'The most harmonious match — you share an element and speak the same energetic language. Natural ease and deep understanding.',
          lt: 'Harmoningiausia pora — jus jungia tas pats elementas ir ta pati energetinė kalba. Natūralus lengvumas ir gilus supratimas.',
        },
      }
    case 5:
      return {
        score: 50,
        aspect: { en: 'Quincunx', lt: 'Kvinkunksas' },
        summary: {
          en: 'Very different needs that require constant adjustment. Fascinating and karmic — it works when both stay flexible.',
          lt: 'Labai skirtingi poreikiai, reikalaujantys nuolatinio prisitaikymo. Žavu ir karmiška — veikia, kai abu lieka lankstūs.',
        },
      }
    default:
      return {
        score: 70,
        aspect: { en: 'Opposition', lt: 'Opozicija' },
        summary: {
          en: 'Opposites attract — strong magnetism. You hold each other’s missing half; balance and respect turn polarity into wholeness.',
          lt: 'Priešingybės traukia — stiprus magnetizmas. Turite vienas kito trūkstamą pusę; pusiausvyra ir pagarba poliškumą paverčia visuma.',
        },
      }
  }
}

/* ───────────────────────── Chinese zodiac ───────────────────────── */

export interface ChineseAnimal {
  id: string
  emoji: string
  name: Bi
  traits: Bi
}

export const CHINESE_ANIMALS: ChineseAnimal[] = [
  { id: 'rat', emoji: '🐀', name: { en: 'Rat', lt: 'Žiurkė' }, traits: { en: 'Clever, resourceful, quick-witted and charming.', lt: 'Protinga, išradinga, sąmojinga ir žavi.' } },
  { id: 'ox', emoji: '🐂', name: { en: 'Ox', lt: 'Jautis' }, traits: { en: 'Diligent, dependable, strong and determined.', lt: 'Darbštus, patikimas, stiprus ir ryžtingas.' } },
  { id: 'tiger', emoji: '🐅', name: { en: 'Tiger', lt: 'Tigras' }, traits: { en: 'Brave, confident, competitive and magnetic.', lt: 'Drąsus, pasitikintis, varžytis mėgstantis ir magnetiškas.' } },
  { id: 'rabbit', emoji: '🐇', name: { en: 'Rabbit', lt: 'Triušis' }, traits: { en: 'Gentle, elegant, kind and diplomatic.', lt: 'Švelnus, elegantiškas, geras ir diplomatiškas.' } },
  { id: 'dragon', emoji: '🐉', name: { en: 'Dragon', lt: 'Drakonas' }, traits: { en: 'Powerful, ambitious, lucky and charismatic.', lt: 'Galingas, ambicingas, laimingas ir charizmatiškas.' } },
  { id: 'snake', emoji: '🐍', name: { en: 'Snake', lt: 'Gyvatė' }, traits: { en: 'Wise, intuitive, graceful and mysterious.', lt: 'Išmintinga, intuityvi, grakšti ir paslaptinga.' } },
  { id: 'horse', emoji: '🐎', name: { en: 'Horse', lt: 'Arklys' }, traits: { en: 'Energetic, free-spirited, warm and adventurous.', lt: 'Energingas, laisvos dvasios, šiltas ir nuotykių ieškantis.' } },
  { id: 'goat', emoji: '🐐', name: { en: 'Goat', lt: 'Ožka' }, traits: { en: 'Gentle, creative, compassionate and calm.', lt: 'Švelni, kūrybinga, užjaučianti ir rami.' } },
  { id: 'monkey', emoji: '🐒', name: { en: 'Monkey', lt: 'Beždžionė' }, traits: { en: 'Inventive, playful, curious and clever.', lt: 'Išradinga, žaisminga, smalsi ir gudri.' } },
  { id: 'rooster', emoji: '🐓', name: { en: 'Rooster', lt: 'Gaidys' }, traits: { en: 'Observant, hard-working, honest and confident.', lt: 'Pastabus, darbštus, sąžiningas ir pasitikintis.' } },
  { id: 'dog', emoji: '🐕', name: { en: 'Dog', lt: 'Šuo' }, traits: { en: 'Loyal, honest, protective and fair.', lt: 'Ištikimas, sąžiningas, saugantis ir teisingas.' } },
  { id: 'pig', emoji: '🐖', name: { en: 'Pig', lt: 'Kiaulė' }, traits: { en: 'Generous, sincere, easy-going and kind-hearted.', lt: 'Dosni, nuoširdi, nesudėtinga ir geraširdė.' } },
]

const CHINESE_ELEMENTS: Bi[] = [
  { en: 'Metal', lt: 'Metalas' },
  { en: 'Water', lt: 'Vanduo' },
  { en: 'Wood', lt: 'Medis' },
  { en: 'Fire', lt: 'Ugnis' },
  { en: 'Earth', lt: 'Žemė' },
]

/**
 * Chinese zodiac animal and element by Gregorian year. The Chinese year
 * starts at Lunar New Year (between 21 Jan and 20 Feb), so births in
 * January–February may belong to the previous year's animal.
 */
export function chineseZodiac(year: number): { animal: ChineseAnimal; element: Bi } {
  const animal = CHINESE_ANIMALS[(((year - 2020) % 12) + 12) % 12]
  // Years ending 0/1 = Metal, 2/3 = Water, 4/5 = Wood, 6/7 = Fire, 8/9 = Earth
  const element = CHINESE_ELEMENTS[Math.floor((((year % 10) + 10) % 10) / 2)]
  return { animal, element }
}
