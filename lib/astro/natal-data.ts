import type { Bi, ZodiacSlug } from '../zodiac'
import type { AspectId, PlanetId } from './ephemeris'

export const PLANETS: Record<PlanetId, { name: Bi; symbol: string; governs: Bi; keywords: Bi }> = {
  sun: {
    name: { en: 'Sun', lt: 'Saulė' },
    symbol: '☉',
    governs: { en: 'Core identity, vitality, purpose — who you are becoming.', lt: 'Esminė tapatybė, gyvybingumas, tikslas — kuo tampate.' },
    keywords: { en: 'Self · Will · Life force', lt: 'Aš · Valia · Gyvybinė jėga' },
  },
  moon: {
    name: { en: 'Moon', lt: 'Mėnulis' },
    symbol: '☽',
    governs: { en: 'Emotions, instincts, needs, the inner child and what makes you feel safe.', lt: 'Emocijos, instinktai, poreikiai, vidinis vaikas ir tai, kas suteikia saugumo.' },
    keywords: { en: 'Feeling · Safety · Habit', lt: 'Jausmai · Saugumas · Įpročiai' },
  },
  mercury: {
    name: { en: 'Mercury', lt: 'Merkurijus' },
    symbol: '☿',
    governs: { en: 'Mind, communication, learning and how you process information.', lt: 'Protas, bendravimas, mokymasis ir informacijos apdorojimas.' },
    keywords: { en: 'Thought · Speech · Learning', lt: 'Mintis · Kalba · Mokymasis' },
  },
  venus: {
    name: { en: 'Venus', lt: 'Venera' },
    symbol: '♀',
    governs: { en: 'Love, beauty, pleasure, values and what you attract.', lt: 'Meilė, grožis, malonumas, vertybės ir tai, ką pritraukiate.' },
    keywords: { en: 'Love · Beauty · Value', lt: 'Meilė · Grožis · Vertė' },
  },
  mars: {
    name: { en: 'Mars', lt: 'Marsas' },
    symbol: '♂',
    governs: { en: 'Drive, desire, courage, anger and how you take action.', lt: 'Varomoji jėga, troškimas, drąsa, pyktis ir veikimo būdas.' },
    keywords: { en: 'Action · Desire · Courage', lt: 'Veiksmas · Troškimas · Drąsa' },
  },
  jupiter: {
    name: { en: 'Jupiter', lt: 'Jupiteris' },
    symbol: '♃',
    governs: { en: 'Growth, faith, luck, wisdom and where life expands.', lt: 'Augimas, tikėjimas, sėkmė, išmintis ir kur gyvenimas plečiasi.' },
    keywords: { en: 'Expansion · Meaning · Abundance', lt: 'Plėtra · Prasmė · Gausa' },
  },
  saturn: {
    name: { en: 'Saturn', lt: 'Saturnas' },
    symbol: '♄',
    governs: { en: 'Structure, discipline, responsibility, fear and long-term mastery.', lt: 'Struktūra, disciplina, atsakomybė, baimės ir ilgalaikė meistrystė.' },
    keywords: { en: 'Limits · Time · Mastery', lt: 'Ribos · Laikas · Meistrystė' },
  },
  uranus: {
    name: { en: 'Uranus', lt: 'Uranas' },
    symbol: '♅',
    governs: { en: 'Freedom, originality, sudden change and awakening (generational).', lt: 'Laisvė, originalumas, staigūs pokyčiai ir pabudimas (kartos planeta).' },
    keywords: { en: 'Awakening · Freedom · Innovation', lt: 'Pabudimas · Laisvė · Inovacija' },
  },
  neptune: {
    name: { en: 'Neptune', lt: 'Neptūnas' },
    symbol: '♆',
    governs: { en: 'Dreams, spirituality, imagination, compassion and illusion (generational).', lt: 'Svajonės, dvasingumas, vaizduotė, užuojauta ir iliuzijos (kartos planeta).' },
    keywords: { en: 'Dream · Spirit · Oneness', lt: 'Sapnas · Dvasia · Vienovė' },
  },
  pluto: {
    name: { en: 'Pluto', lt: 'Plutonas' },
    symbol: '♇',
    governs: { en: 'Power, transformation, death and rebirth, the shadow (generational).', lt: 'Galia, transformacija, mirtis ir atgimimas, šešėlis (kartos planeta).' },
    keywords: { en: 'Transformation · Power · Depth', lt: 'Transformacija · Galia · Gelmė' },
  },
  node: {
    name: { en: 'North Node', lt: 'Šiaurinis mazgas' },
    symbol: '☊',
    governs: { en: 'Soul direction — the qualities you are here to grow into. The South Node (opposite) shows familiar gifts from the past.', lt: 'Sielos kryptis — savybės, kurias atėjote išsiugdyti. Pietinis mazgas (priešingai) rodo pažįstamas praeities dovanas.' },
    keywords: { en: 'Destiny · Growth · Karma', lt: 'Likimas · Augimas · Karma' },
  },
}

/** How each sign colours a planet's expression. */
export const SIGN_STYLE: Record<ZodiacSlug, Bi> = {
  aries: { en: 'Boldly, directly and impulsively — with fire, courage and the urge to be first.', lt: 'Drąsiai, tiesiai ir impulsyviai — su ugnimi, drąsa ir noru būti pirmam.' },
  taurus: { en: 'Steadily, sensually and patiently — seeking comfort, security and beauty.', lt: 'Ramiai, jusliškai ir kantriai — ieškant komforto, saugumo ir grožio.' },
  gemini: { en: 'Curiously, playfully and versatilely — through words, ideas and variety.', lt: 'Smalsiai, žaismingai ir įvairiapusiškai — per žodžius, idėjas ir įvairovę.' },
  cancer: { en: 'Tenderly, protectively and intuitively — guided by feeling and belonging.', lt: 'Švelniai, globėjiškai ir intuityviai — vedamas jausmų ir priklausymo.' },
  leo: { en: 'Warmly, generously and dramatically — wanting to create, shine and be seen.', lt: 'Šiltai, dosniai ir dramatiškai — norint kurti, spindėti ir būti matomam.' },
  virgo: { en: 'Carefully, precisely and helpfully — refining, analysing and serving.', lt: 'Kruopščiai, tiksliai ir paslaugiai — tobulinant, analizuojant ir tarnaujant.' },
  libra: { en: 'Gracefully, fairly and diplomatically — through partnership and harmony.', lt: 'Grakščiai, teisingai ir diplomatiškai — per partnerystę ir harmoniją.' },
  scorpio: { en: 'Intensely, deeply and privately — all or nothing, transforming what it touches.', lt: 'Intensyviai, giliai ir slaptai — viskas arba nieko, transformuojant tai, ką paliečia.' },
  sagittarius: { en: 'Freely, optimistically and philosophically — seeking meaning and adventure.', lt: 'Laisvai, optimistiškai ir filosofiškai — ieškant prasmės ir nuotykių.' },
  capricorn: { en: 'Responsibly, ambitiously and patiently — building structures that last.', lt: 'Atsakingai, ambicingai ir kantriai — kuriant ilgaamžes struktūras.' },
  aquarius: { en: 'Originally, independently and idealistically — for the future and the collective.', lt: 'Originaliai, nepriklausomai ir idealistiškai — ateičiai ir bendruomenei.' },
  pisces: { en: 'Dreamily, compassionately and intuitively — dissolving boundaries, seeking the sacred.', lt: 'Svajingai, užjaučiančiai ir intuityviai — tirpdant ribas, ieškant šventumo.' },
}

export const HOUSES: Record<number, { name: Bi; domain: Bi }> = {
  1: { name: { en: 'Self & Appearance', lt: 'Asmenybė ir išvaizda' }, domain: { en: 'Identity, body, first impressions, how you meet the world.', lt: 'Tapatybė, kūnas, pirmas įspūdis, kaip pasitinkate pasaulį.' } },
  2: { name: { en: 'Resources & Values', lt: 'Ištekliai ir vertybės' }, domain: { en: 'Money, possessions, talents, self-worth.', lt: 'Pinigai, nuosavybė, talentai, savivertė.' } },
  3: { name: { en: 'Communication', lt: 'Bendravimas' }, domain: { en: 'Thinking, siblings, neighbours, short trips, learning.', lt: 'Mąstymas, broliai ir seserys, kaimynai, trumpos kelionės, mokymasis.' } },
  4: { name: { en: 'Home & Roots', lt: 'Namai ir šaknys' }, domain: { en: 'Family, ancestry, home, emotional foundation.', lt: 'Šeima, protėviai, namai, emocinis pamatas.' } },
  5: { name: { en: 'Creativity & Joy', lt: 'Kūryba ir džiaugsmas' }, domain: { en: 'Romance, children, play, creative self-expression.', lt: 'Romantika, vaikai, žaidimas, kūrybinė saviraiška.' } },
  6: { name: { en: 'Work & Health', lt: 'Darbas ir sveikata' }, domain: { en: 'Daily routines, service, body care, habits.', lt: 'Kasdienė rutina, tarnystė, kūno priežiūra, įpročiai.' } },
  7: { name: { en: 'Partnership', lt: 'Partnerystė' }, domain: { en: 'Marriage, close relationships, contracts, open enemies.', lt: 'Santuoka, artimi santykiai, sutartys, atviri priešai.' } },
  8: { name: { en: 'Transformation', lt: 'Transformacija' }, domain: { en: 'Intimacy, shared resources, death and rebirth, the occult.', lt: 'Intymumas, bendri ištekliai, mirtis ir atgimimas, okultizmas.' } },
  9: { name: { en: 'Meaning & Travel', lt: 'Prasmė ir kelionės' }, domain: { en: 'Philosophy, higher learning, faith, long journeys.', lt: 'Filosofija, aukštasis mokslas, tikėjimas, tolimos kelionės.' } },
  10: { name: { en: 'Career & Calling', lt: 'Karjera ir pašaukimas' }, domain: { en: 'Vocation, reputation, public role, achievements.', lt: 'Pašaukimas, reputacija, viešas vaidmuo, pasiekimai.' } },
  11: { name: { en: 'Community & Dreams', lt: 'Bendruomenė ir svajonės' }, domain: { en: 'Friends, groups, networks, hopes for the future.', lt: 'Draugai, grupės, tinklai, ateities viltys.' } },
  12: { name: { en: 'The Unconscious', lt: 'Pasąmonė' }, domain: { en: 'Spirituality, solitude, hidden patterns, karma, retreat.', lt: 'Dvasingumas, vienatvė, paslėpti modeliai, karma, atsitraukimas.' } },
}

export const ASPECTS: Record<AspectId, { name: Bi; nature: Bi; meaning: Bi }> = {
  conjunction: {
    name: { en: 'Conjunction', lt: 'Jungtis' },
    nature: { en: 'Fusion', lt: 'Susiliejimas' },
    meaning: { en: 'The two energies merge and act as one — intensified and inseparable.', lt: 'Dvi energijos susilieja ir veikia kaip viena — sustiprintos ir neatskiriamos.' },
  },
  sextile: {
    name: { en: 'Sextile', lt: 'Sekstilis' },
    nature: { en: 'Opportunity', lt: 'Galimybė' },
    meaning: { en: 'A friendly, cooperative link — talent that blossoms when you use it.', lt: 'Draugiškas, bendradarbiaujantis ryšys — talentas, kuris pražysta jį naudojant.' },
  },
  square: {
    name: { en: 'Square', lt: 'Kvadratas' },
    nature: { en: 'Tension', lt: 'Įtampa' },
    meaning: { en: 'Friction that demands action — a challenge that builds strength and character.', lt: 'Trintis, reikalaujanti veiksmo — iššūkis, ugdantis jėgą ir charakterį.' },
  },
  trine: {
    name: { en: 'Trine', lt: 'Trigonas' },
    nature: { en: 'Harmony', lt: 'Harmonija' },
    meaning: { en: 'Natural ease and flow — a gift that comes effortlessly.', lt: 'Natūralus lengvumas ir tėkmė — dovana, ateinanti be pastangų.' },
  },
  opposition: {
    name: { en: 'Opposition', lt: 'Opozicija' },
    nature: { en: 'Polarity', lt: 'Poliškumas' },
    meaning: { en: 'A tug between two poles, often projected onto others — the task is balance.', lt: 'Traukimas tarp dviejų polių, dažnai projektuojamas į kitus — užduotis yra pusiausvyra.' },
  },
}

/** Moon sign — emotional nature. */
export const MOON_IN: Record<ZodiacSlug, Bi> = {
  aries: { en: 'Quick, fiery feelings that flare and pass. You need independence, action and honesty to feel safe.', lt: 'Greiti, ugningi jausmai, kurie įsiliepsnoja ir praeina. Saugumui reikia nepriklausomybės, veiksmo ir atvirumo.' },
  taurus: { en: 'Calm, steady emotions. Comfort, nature, good food and physical touch restore you.', lt: 'Ramios, stabilios emocijos. Jus atkuria komfortas, gamta, geras maistas ir prisilietimai.' },
  gemini: { en: 'You process feelings by talking and thinking. Variety and conversation soothe a restless heart.', lt: 'Jausmus apdorojate kalbėdami ir mąstydami. Neramią širdį ramina įvairovė ir pokalbiai.' },
  cancer: { en: 'The Moon at home — deeply nurturing and sensitive. Family, home and belonging are essential.', lt: 'Mėnulis savo namuose — labai globojantis ir jautrus. Šeima, namai ir priklausymas yra būtini.' },
  leo: { en: 'Warm, expressive feelings. You need to be seen, appreciated and free to play and create.', lt: 'Šilti, išraiškingi jausmai. Jums reikia būti matomam, vertinamam ir laisvam žaisti bei kurti.' },
  virgo: { en: 'You feel safe through order and being useful. Worry eases when you care for body and routine.', lt: 'Saugiai jaučiatės per tvarką ir naudingumą. Nerimas atslūgsta rūpinantis kūnu ir rutina.' },
  libra: { en: 'You need harmony and partnership. Conflict unsettles you; beauty and fairness restore balance.', lt: 'Jums reikia harmonijos ir partnerystės. Konfliktai išmuša iš vėžių; pusiausvyrą atkuria grožis ir teisingumas.' },
  scorpio: { en: 'Intense, private emotions that run deep. Trust and emotional honesty are everything.', lt: 'Intensyvios, slaptos emocijos, tekančios giliai. Pasitikėjimas ir emocinis atvirumas — viskas.' },
  sagittarius: { en: 'Optimistic, freedom-loving feelings. Adventure, meaning and space keep your spirit high.', lt: 'Optimistiški, laisvę mylintys jausmai. Dvasią aukštai laiko nuotykiai, prasmė ir erdvė.' },
  capricorn: { en: 'Reserved, responsible emotions. You feel safe when in control; learn to allow softness.', lt: 'Santūrios, atsakingos emocijos. Saugiai jaučiatės kontroliuodami; mokykitės leisti sau švelnumą.' },
  aquarius: { en: 'You observe feelings from a distance. Friendship, freedom and ideals bring emotional security.', lt: 'Jausmus stebite iš atstumo. Emocinį saugumą suteikia draugystė, laisvė ir idealai.' },
  pisces: { en: 'Boundless, empathic feelings. You absorb moods — solitude, art and spirit restore you.', lt: 'Beribiai, empatiški jausmai. Sugeriate nuotaikas — jus atkuria vienatvė, menas ir dvasia.' },
}

/** Rising sign (Ascendant) — the mask, approach to life and first impression. */
export const RISING_IN: Record<ZodiacSlug, Bi> = {
  aries: { en: 'You meet life head-on — energetic, direct and pioneering. Others see you as bold and quick.', lt: 'Gyvenimą pasitinkate tiesiai — energingai, atvirai ir pradininkiškai. Kiti jus mato drąsų ir greitą.' },
  taurus: { en: 'Calm, grounded and pleasant presence. You approach life steadily and value comfort.', lt: 'Ramus, įsižeminęs ir malonus buvimas. Gyvenimą pasitinkate stabiliai ir vertinate komfortą.' },
  gemini: { en: 'Lively, curious and talkative. You meet the world through questions and connection.', lt: 'Gyvas, smalsus ir kalbus. Pasaulį pasitinkate per klausimus ir ryšius.' },
  cancer: { en: 'Gentle, caring and protective. You sense the emotional atmosphere first.', lt: 'Švelnus, rūpestingas ir globojantis. Pirmiausia pajuntate emocinę atmosferą.' },
  leo: { en: 'Radiant, warm and confident. You naturally draw attention and lead with heart.', lt: 'Spinduliuojantis, šiltas ir pasitikintis. Natūraliai traukiate dėmesį ir vadovaujate širdimi.' },
  virgo: { en: 'Modest, observant and helpful. You approach life carefully, noticing every detail.', lt: 'Kuklus, pastabus ir paslaugus. Gyvenimą pasitinkate atsargiai, pastebėdami kiekvieną detalę.' },
  libra: { en: 'Charming, graceful and diplomatic. You seek harmony and connection in every encounter.', lt: 'Žavus, grakštus ir diplomatiškas. Kiekviename susitikime ieškote harmonijos ir ryšio.' },
  scorpio: { en: 'Magnetic, intense and private. People sense depth and power behind your gaze.', lt: 'Magnetiškas, intensyvus ir paslaptingas. Žmonės už jūsų žvilgsnio jaučia gelmę ir galią.' },
  sagittarius: { en: 'Open, enthusiastic and adventurous. You meet life as a journey of discovery.', lt: 'Atviras, entuziastingas ir nuotykių ieškantis. Gyvenimą pasitinkate kaip atradimų kelionę.' },
  capricorn: { en: 'Serious, composed and capable. You appear mature and trustworthy from early on.', lt: 'Rimtas, susitvardęs ir gabus. Nuo mažens atrodote brandus ir patikimas.' },
  aquarius: { en: 'Original, friendly and a little detached. You approach life as an independent thinker.', lt: 'Originalus, draugiškas ir šiek tiek atsiribojęs. Gyvenimą pasitinkate kaip nepriklausomas mąstytojas.' },
  pisces: { en: 'Soft, dreamy and empathic. You absorb your surroundings and meet life intuitively.', lt: 'Švelnus, svajingas ir empatiškas. Sugeriate aplinką ir gyvenimą pasitinkate intuityviai.' },
}

/** Traditional + modern rulers (for chart ruler). */
export const SIGN_RULER: Record<ZodiacSlug, PlanetId> = {
  aries: 'mars',
  taurus: 'venus',
  gemini: 'mercury',
  cancer: 'moon',
  leo: 'sun',
  virgo: 'mercury',
  libra: 'venus',
  scorpio: 'pluto',
  sagittarius: 'jupiter',
  capricorn: 'saturn',
  aquarius: 'uranus',
  pisces: 'neptune',
}
