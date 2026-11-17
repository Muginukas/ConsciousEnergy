/**
 * Wu Xing — the Five Elements (Five Phases) of Chinese cosmology — and the
 * sexagenary (60-year) cycle of Heavenly Stems × Earthly Branches.
 *
 * Every Chinese year pairs a Heavenly Stem (element + yin/yang) with an
 * Earthly Branch (animal). Ten stems × twelve branches, matched by polarity,
 * give 60 unique combinations, so e.g. the Fire Horse (丙午) returns only once
 * every 60 years: 1966, 2026, 2086.
 */
import * as Astronomy from 'astronomy-engine'
import { CHINESE_ANIMALS, ChineseAnimal } from './zodiac'

type Bi = { en: string; lt: string }

export type ElementId = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export interface WuxingElement {
  id: ElementId
  hanzi: string
  pinyin: string
  name: Bi
  /** Accent colour readable on the cream background. */
  color: string
  /** Soft background tint. */
  tint: string
  stems: { yang: { hanzi: string; pinyin: string }; yin: { hanzi: string; pinyin: string } }
  keywords: Bi
  season: Bi
  direction: Bi
  colour: Bi
  organs: Bi
  sense: Bi
  taste: Bi
  virtue: { hanzi: string; pinyin: string; name: Bi }
  emotion: { balanced: Bi; unbalanced: Bi }
  healingSound: string
  description: Bi
  /** How the element colours a year or a person born in it. */
  inYear: Bi
  balance: Bi
  foods: Bi
  practices: { category: string; slug: string; title: Bi }[]
}

export const WUXING: WuxingElement[] = [
  {
    id: 'wood',
    hanzi: '木',
    pinyin: 'mù',
    name: { en: 'Wood', lt: 'Medis' },
    color: '#3f8f5c',
    tint: '#e9f5ec',
    stems: { yang: { hanzi: '甲', pinyin: 'jiǎ' }, yin: { hanzi: '乙', pinyin: 'yǐ' } },
    keywords: { en: 'Growth · vision · kindness', lt: 'Augimas · vizija · gerumas' },
    season: { en: 'Spring', lt: 'Pavasaris' },
    direction: { en: 'East', lt: 'Rytai' },
    colour: { en: 'Green', lt: 'Žalia' },
    organs: { en: 'Liver · gallbladder', lt: 'Kepenys · tulžies pūslė' },
    sense: { en: 'Eyes', lt: 'Akys' },
    taste: { en: 'Sour', lt: 'Rūgštus' },
    virtue: { hanzi: '仁', pinyin: 'rén', name: { en: 'Benevolence', lt: 'Gerumas' } },
    emotion: {
      balanced: { en: 'Kindness, patience, clear vision', lt: 'Gerumas, kantrybė, aiški vizija' },
      unbalanced: { en: 'Anger, frustration, rigidity', lt: 'Pyktis, frustracija, sustingimas' },
    },
    healingSound: 'Shhh',
    description: {
      en: 'Wood is the energy of spring: the seed breaking through the soil and reaching for the light. It plans, grows, expands and bends without breaking.',
      lt: 'Medis — pavasario energija: sėkla, prasiveržianti pro dirvą ir besistiebianti į šviesą. Ji planuoja, auga, plečiasi ir linksta, bet nelūžta.',
    },
    inYear: {
      en: 'Wood years and Wood people are generous, cooperative and growth-minded — builders of projects and communities.',
      lt: 'Medžio metai ir Medžio žmonės dosnūs, bendradarbiaujantys, orientuoti į augimą — projektų ir bendruomenių kūrėjai.',
    },
    balance: {
      en: 'Move every day, stretch the sides of the body, spend mornings in green nature and give anger a healthy outlet instead of swallowing it.',
      lt: 'Judėkite kasdien, tempkite šonus, rytus leiskite žalioje gamtoje ir pykčiui duokite sveiką išeitį, užuot jį nuryję.',
    },
    foods: {
      en: 'Leafy greens, sprouts, lemon, apple-cider vinegar, fermented vegetables.',
      lt: 'Lapinės daržovės, daigai, citrina, obuolių sidro actas, raugintos daržovės.',
    },
    practices: [
      { category: 'yoga', slug: 'yin-yoga', title: { en: 'Yin yoga', lt: 'Jin joga' } },
      { category: 'energy', slug: 'qigong-basics', title: { en: 'Qigong basics', lt: 'Čigongo pagrindai' } },
    ],
  },
  {
    id: 'fire',
    hanzi: '火',
    pinyin: 'huǒ',
    name: { en: 'Fire', lt: 'Ugnis' },
    color: '#d0572f',
    tint: '#fcebe4',
    stems: { yang: { hanzi: '丙', pinyin: 'bǐng' }, yin: { hanzi: '丁', pinyin: 'dīng' } },
    keywords: { en: 'Passion · joy · connection', lt: 'Aistra · džiaugsmas · ryšys' },
    season: { en: 'Summer', lt: 'Vasara' },
    direction: { en: 'South', lt: 'Pietūs' },
    colour: { en: 'Red', lt: 'Raudona' },
    organs: { en: 'Heart · small intestine', lt: 'Širdis · plonoji žarna' },
    sense: { en: 'Tongue (speech)', lt: 'Liežuvis (kalba)' },
    taste: { en: 'Bitter', lt: 'Kartus' },
    virtue: { hanzi: '禮', pinyin: 'lǐ', name: { en: 'Propriety, warm respect', lt: 'Pagarba, šiltas mandagumas' } },
    emotion: {
      balanced: { en: 'Joy, love, enthusiasm', lt: 'Džiaugsmas, meilė, entuziazmas' },
      unbalanced: { en: 'Over-excitement, restlessness, anxiety', lt: 'Persijaudinimas, nerimastingumas, nerimas' },
    },
    healingSound: 'Haaa',
    description: {
      en: 'Fire is the peak of summer: maximum light, warmth and expression. It connects, inspires and transforms — and, unchecked, it burns out.',
      lt: 'Ugnis — vasaros viršūnė: daugiausia šviesos, šilumos ir raiškos. Ji jungia, įkvepia ir transformuoja, o nevaldoma — perdega.',
    },
    inYear: {
      en: 'Fire years and Fire people are dynamic, passionate and charismatic — fast, bold and sometimes impatient.',
      lt: 'Ugnies metai ir Ugnies žmonės dinamiški, aistringi, charizmatiški — greiti, drąsūs, kartais nekantrūs.',
    },
    balance: {
      en: 'Protect your sleep, cool down with slow breathing, share joy with people you love and rest before you are exhausted.',
      lt: 'Saugokite miegą, vėsinkitės lėtu kvėpavimu, dalykitės džiaugsmu su artimaisiais ir ilsėkitės prieš išsekdami.',
    },
    foods: {
      en: 'Bitter greens (dandelion, rocket), berries, cacao in moderation, cooling cucumber and watermelon in heat.',
      lt: 'Kartūs lapai (kiaulpienės, rukola), uogos, saikingai kakava, karštyje — vėsinantys agurkai ir arbūzai.',
    },
    practices: [
      { category: 'meditation', slug: 'loving-kindness', title: { en: 'Loving-kindness', lt: 'Meilės ir gerumo meditacija' } },
      { category: 'breathwork', slug: 'coherent-breathing', title: { en: 'Coherent breathing', lt: 'Koherentinis kvėpavimas' } },
    ],
  },
  {
    id: 'earth',
    hanzi: '土',
    pinyin: 'tǔ',
    name: { en: 'Earth', lt: 'Žemė' },
    color: '#b8861b',
    tint: '#fbf3dc',
    stems: { yang: { hanzi: '戊', pinyin: 'wù' }, yin: { hanzi: '己', pinyin: 'jǐ' } },
    keywords: { en: 'Grounding · trust · nourishment', lt: 'Įsižeminimas · pasitikėjimas · maitinimas' },
    season: { en: 'Late summer & the turning of every season', lt: 'Vėlyva vasara ir kiekvienas sezonų virsmas' },
    direction: { en: 'Centre', lt: 'Centras' },
    colour: { en: 'Yellow', lt: 'Geltona' },
    organs: { en: 'Spleen · stomach', lt: 'Blužnis · skrandis' },
    sense: { en: 'Mouth', lt: 'Burna' },
    taste: { en: 'Sweet', lt: 'Saldus' },
    virtue: { hanzi: '信', pinyin: 'xìn', name: { en: 'Trustworthiness', lt: 'Patikimumas' } },
    emotion: {
      balanced: { en: 'Empathy, stability, care', lt: 'Empatija, stabilumas, rūpestis' },
      unbalanced: { en: 'Worry, overthinking, people-pleasing', lt: 'Nerimas, perdėtas galvojimas, noras visiems įtikti' },
    },
    healingSound: 'Hooo',
    description: {
      en: 'Earth is the centre that holds everything together — the harvest, the hearth, the pause between seasons. It nourishes, stabilises and receives.',
      lt: 'Žemė — centras, laikantis viską kartu: derlius, židinys, pauzė tarp sezonų. Ji maitina, stabilizuoja ir priima.',
    },
    inYear: {
      en: 'Earth years and Earth people are steady, practical and reliable — they build foundations and keep their word.',
      lt: 'Žemės metai ir Žemės žmonės pastovūs, praktiški ir patikimi — kuria pamatus ir laikosi žodžio.',
    },
    balance: {
      en: 'Eat warm, regular meals, walk barefoot, keep a simple daily rhythm and care for yourself as much as you care for others.',
      lt: 'Valgykite šiltai ir reguliariai, vaikščiokite basomis, laikykitės paprasto dienos ritmo ir rūpinkitės savimi taip pat, kaip kitais.',
    },
    foods: {
      en: 'Root vegetables, pumpkin, millet, oats, sweet potato, dates — cooked and warm.',
      lt: 'Šakniavaisiai, moliūgas, soros, avižos, batatai, datulės — virti ir šilti.',
    },
    practices: [
      { category: 'meditation', slug: 'body-scan', title: { en: 'Body scan', lt: 'Kūno skenavimas' } },
      { category: 'chakras', slug: 'muladhara-root', title: { en: 'Root chakra', lt: 'Šaknies čakra' } },
    ],
  },
  {
    id: 'metal',
    hanzi: '金',
    pinyin: 'jīn',
    name: { en: 'Metal', lt: 'Metalas' },
    color: '#6f7784',
    tint: '#eef0f3',
    stems: { yang: { hanzi: '庚', pinyin: 'gēng' }, yin: { hanzi: '辛', pinyin: 'xīn' } },
    keywords: { en: 'Clarity · courage · letting go', lt: 'Aiškumas · drąsa · paleidimas' },
    season: { en: 'Autumn', lt: 'Ruduo' },
    direction: { en: 'West', lt: 'Vakarai' },
    colour: { en: 'White', lt: 'Balta' },
    organs: { en: 'Lungs · large intestine', lt: 'Plaučiai · storoji žarna' },
    sense: { en: 'Nose', lt: 'Nosis' },
    taste: { en: 'Pungent', lt: 'Aštrus' },
    virtue: { hanzi: '義', pinyin: 'yì', name: { en: 'Righteousness', lt: 'Teisingumas' } },
    emotion: {
      balanced: { en: 'Courage, integrity, acceptance', lt: 'Drąsa, vientisumas, priėmimas' },
      unbalanced: { en: 'Grief, holding on, perfectionism', lt: 'Liūdesys, kabinimasis, perfekcionizmas' },
    },
    healingSound: 'Sssss',
    description: {
      en: 'Metal is autumn: the leaves fall and only the essential remains. It refines, structures, values quality and knows how to let go.',
      lt: 'Metalas — ruduo: lapai krenta, lieka tik esmė. Jis grynina, struktūruoja, vertina kokybę ir moka paleisti.',
    },
    inYear: {
      en: 'Metal years and Metal people are determined, principled and strong-willed — clear in their values, sharp in focus.',
      lt: 'Metalo metai ir Metalo žmonės ryžtingi, principingi, stiprios valios — aiškių vertybių, aštraus dėmesio.',
    },
    balance: {
      en: 'Breathe deeply, declutter your space, let yourself grieve what has ended and practise gratitude for what remains.',
      lt: 'Kvėpuokite giliai, išvalykite erdvę nuo pertekliaus, leiskite sau gedėti to, kas baigėsi, ir dėkokite už tai, kas liko.',
    },
    foods: {
      en: 'Onion, garlic, ginger, radish, pear, white rice, cauliflower.',
      lt: 'Svogūnai, česnakai, imbieras, ridikai, kriaušės, baltieji ryžiai, žiediniai kopūstai.',
    },
    practices: [
      { category: 'breathwork', slug: 'ujjayi', title: { en: 'Ujjayi breath', lt: 'Ujjayi kvėpavimas' } },
      { category: 'breathwork', slug: '478-breathing', title: { en: '4-7-8 breathing', lt: '4-7-8 kvėpavimas' } },
    ],
  },
  {
    id: 'water',
    hanzi: '水',
    pinyin: 'shuǐ',
    name: { en: 'Water', lt: 'Vanduo' },
    color: '#3b6fc0',
    tint: '#e7effa',
    stems: { yang: { hanzi: '壬', pinyin: 'rén' }, yin: { hanzi: '癸', pinyin: 'guǐ' } },
    keywords: { en: 'Wisdom · intuition · flow', lt: 'Išmintis · intuicija · tėkmė' },
    season: { en: 'Winter', lt: 'Žiema' },
    direction: { en: 'North', lt: 'Šiaurė' },
    colour: { en: 'Black · deep blue', lt: 'Juoda · tamsiai mėlyna' },
    organs: { en: 'Kidneys · bladder', lt: 'Inkstai · šlapimo pūslė' },
    sense: { en: 'Ears', lt: 'Ausys' },
    taste: { en: 'Salty', lt: 'Sūrus' },
    virtue: { hanzi: '智', pinyin: 'zhì', name: { en: 'Wisdom', lt: 'Išmintis' } },
    emotion: {
      balanced: { en: 'Calm will, trust, deep knowing', lt: 'Rami valia, pasitikėjimas, gilus žinojimas' },
      unbalanced: { en: 'Fear, insecurity, isolation', lt: 'Baimė, nesaugumas, užsisklendimas' },
    },
    healingSound: 'Chooo',
    description: {
      en: 'Water is winter: stillness, depth and stored life-force. It flows around every obstacle, listens inward and holds the seed of the next spring.',
      lt: 'Vanduo — žiema: ramybė, gylis ir sukaupta gyvybinė jėga. Jis apteka bet kokią kliūtį, klausosi vidaus ir saugo kito pavasario sėklą.',
    },
    inYear: {
      en: 'Water years and Water people are intuitive, adaptable and communicative — they move softly but reach far.',
      lt: 'Vandens metai ir Vandens žmonės intuityvūs, lankstūs ir komunikabilūs — juda švelniai, bet nueina toli.',
    },
    balance: {
      en: 'Rest deeply, go to bed earlier in winter, keep the lower back and feet warm, and give yourself regular silence.',
      lt: 'Ilsėkitės giliai, žiemą eikite miegoti anksčiau, šildykite juosmenį ir pėdas, reguliariai skirkite sau tylos.',
    },
    foods: {
      en: 'Black beans, seaweed, walnuts, black sesame, bone or miso broth, a pinch of good salt.',
      lt: 'Juodosios pupelės, jūros dumbliai, graikiniai riešutai, juodieji sezamai, kaulų ar miso sultinys, žiupsnelis geros druskos.',
    },
    practices: [
      { category: 'meditation', slug: 'yoga-nidra', title: { en: 'Yoga nidra', lt: 'Joga nidra' } },
      { category: 'energy', slug: 'microcosmic-orbit', title: { en: 'Microcosmic orbit', lt: 'Mikrokosminė orbita' } },
    ],
  },
]

export const WUXING_MAP: Record<ElementId, WuxingElement> = Object.fromEntries(
  WUXING.map((e) => [e.id, e]),
) as Record<ElementId, WuxingElement>

const ORDER: ElementId[] = ['wood', 'fire', 'earth', 'metal', 'water']

/** Generating (Sheng 生) cycle: each element feeds the next. */
export function generates(e: ElementId): ElementId {
  return ORDER[(ORDER.indexOf(e) + 1) % 5]
}

/** Controlling (Ke 克) cycle: each element restrains the one two steps ahead. */
export function controls(e: ElementId): ElementId {
  return ORDER[(ORDER.indexOf(e) + 2) % 5]
}

export const SHENG_TEXT: Record<ElementId, Bi> = {
  wood: { en: 'Wood feeds Fire', lt: 'Medis maitina Ugnį' },
  fire: { en: 'Fire makes Earth (ash)', lt: 'Ugnis kuria Žemę (pelenus)' },
  earth: { en: 'Earth bears Metal', lt: 'Žemė gimdo Metalą' },
  metal: { en: 'Metal gathers Water', lt: 'Metalas renka Vandenį' },
  water: { en: 'Water nourishes Wood', lt: 'Vanduo maitina Medį' },
}

export const KE_TEXT: Record<ElementId, Bi> = {
  wood: { en: 'Wood parts Earth (roots)', lt: 'Medis skaido Žemę (šaknimis)' },
  fire: { en: 'Fire melts Metal', lt: 'Ugnis lydo Metalą' },
  earth: { en: 'Earth dams Water', lt: 'Žemė užtvenkia Vandenį' },
  metal: { en: 'Metal cuts Wood', lt: 'Metalas kerta Medį' },
  water: { en: 'Water puts out Fire', lt: 'Vanduo gesina Ugnį' },
}

/* ───────────────────────── Sexagenary cycle ───────────────────────── */

export const BRANCH_HANZI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
/** Animal written with its traditional character, as in the reel. */
export const ANIMAL_HANZI = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬']
/** The fixed (native) element of each Earthly Branch. */
export const BRANCH_ELEMENT: ElementId[] = [
  'water', 'earth', 'wood', 'wood', 'earth', 'fire', 'fire', 'earth', 'metal', 'metal', 'earth', 'water',
]

const mod = (n: number, m: number) => ((n % m) + m) % m

export interface ChineseYear {
  /** Gregorian year in which this Chinese year begins. */
  year: number
  stemIndex: number
  branchIndex: number
  element: WuxingElement
  yang: boolean
  animal: ChineseAnimal
  animalHanzi: string
  /** e.g. 丙午 */
  ganzhi: string
  /** Position 1–60 in the sexagenary cycle (甲子 = 1). */
  cyclePosition: number
}

export function chineseYear(year: number): ChineseYear {
  const stemIndex = mod(year - 4, 10)
  const branchIndex = mod(year - 4, 12)
  const element = WUXING[Math.floor(stemIndex / 2)]
  const yang = stemIndex % 2 === 0
  const stem = yang ? element.stems.yang : element.stems.yin
  return {
    year,
    stemIndex,
    branchIndex,
    element,
    yang,
    animal: CHINESE_ANIMALS[branchIndex],
    animalHanzi: ANIMAL_HANZI[branchIndex],
    ganzhi: stem.hanzi + BRANCH_HANZI[branchIndex],
    cyclePosition: mod(year - 4, 60) + 1,
  }
}

/** Years (within range) that share the same stem+branch as `year`. */
export function sameCycleYears(year: number, from = 1900, to = 2100): number[] {
  const out: number[] = []
  for (let y = from + mod(year - from, 60); y <= to; y += 60) out.push(y)
  return out
}

/** The five element versions of an animal, with the years in [from, to]. */
export function animalVersions(branchIndex: number, from = 1900, to = 2100) {
  // First year >= from with this branch
  const first = from + mod(branchIndex - mod(from - 4, 12), 12)
  const map = new Map<ElementId, number[]>()
  for (let y = first; y <= to; y += 12) {
    const cy = chineseYear(y)
    const list = map.get(cy.element.id) ?? []
    list.push(y)
    map.set(cy.element.id, list)
  }
  return ORDER.filter((id) => map.has(id)).map((id) => ({ element: WUXING_MAP[id], years: map.get(id)! }))
}

/* ───────────────────────── Lunar New Year ───────────────────────── */

export interface YMD {
  year: number
  month: number
  day: number
}

const CHINA_OFFSET_MS = 8 * 3600 * 1000

function chinaDate(t: Astronomy.AstroTime): YMD {
  const d = new Date(t.date.getTime() + CHINA_OFFSET_MS)
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() }
}

const ymdKey = (d: YMD) => d.year * 10000 + d.month * 100 + d.day

const lnyCache = new Map<number, YMD>()

/**
 * Date of Chinese (Lunar) New Year in the given Gregorian year, computed
 * astronomically in China time (UTC+8): the second new moon after the winter
 * solstice, pushed to the next new moon if it falls before 21 January
 * (the rare years with a leap 11th/12th month, e.g. 2033–34).
 */
export function lunarNewYear(year: number): YMD {
  const cached = lnyCache.get(year)
  if (cached) return cached
  const solstice = Astronomy.Seasons(year - 1).dec_solstice
  const solsticeDay = ymdKey(chinaDate(solstice))
  let t = Astronomy.SearchMoonPhase(0, solstice.AddDays(-2), 40)!
  const moons: YMD[] = []
  while (moons.length < 3) {
    const d = chinaDate(t)
    // The new moon on the solstice day itself starts month 11, so skip it.
    if (ymdKey(d) > solsticeDay) moons.push(d)
    t = Astronomy.SearchMoonPhase(0, t.AddDays(1), 40)!
  }
  let lny = moons[1]
  if (ymdKey(lny) < year * 10000 + 121) lny = moons[2]
  lnyCache.set(year, lny)
  return lny
}

/** The Chinese year a birth date belongs to (Lunar New Year boundary). */
export function chineseYearForDate(date: YMD): { cy: ChineseYear; lny: YMD; beforeNewYear: boolean } {
  const lny = lunarNewYear(date.year)
  const beforeNewYear = ymdKey(date) < ymdKey(lny)
  const cy = chineseYear(beforeNewYear ? date.year - 1 : date.year)
  return { cy, lny, beforeNewYear }
}

/* ───────────────────────── Personal relation to a year ───────────────────────── */

export type Relation = 'same' | 'nourishes-you' | 'you-nourish' | 'you-control' | 'controls-you'

export function relation(you: ElementId, year: ElementId): Relation {
  if (you === year) return 'same'
  if (generates(year) === you) return 'nourishes-you'
  if (generates(you) === year) return 'you-nourish'
  if (controls(you) === year) return 'you-control'
  return 'controls-you'
}

export const RELATION_TEXT: Record<Relation, { title: Bi; text: Bi }> = {
  same: {
    title: { en: 'Your own element — amplified', lt: 'Jūsų pačių elementas — sustiprintas' },
    text: {
      en: 'The year speaks your language. Your gifts are amplified — and so are your habits. Use the tailwind, but consciously balance with the element that controls yours.',
      lt: 'Metai kalba jūsų kalba. Jūsų dovanos sustiprėja — kartu ir įpročiai. Naudokitės palankiu vėju, bet sąmoningai balansuokite elementu, kuris valdo jūsiškį.',
    },
  },
  'nourishes-you': {
    title: { en: 'The year nourishes you', lt: 'Metai jus maitina' },
    text: {
      en: 'The year’s element is your “mother” in the generating cycle. Support comes more easily — a good time to receive, learn and begin.',
      lt: 'Metų elementas generavimo cikle jums yra „motina“. Parama ateina lengviau — geras laikas priimti, mokytis ir pradėti.',
    },
  },
  'you-nourish': {
    title: { en: 'You nourish the year', lt: 'Jūs maitinate metus' },
    text: {
      en: 'Your element feeds the year’s element. Creativity and giving flow outward — rewarding, but tiring. Protect your reserves and rest on purpose.',
      lt: 'Jūsų elementas maitina metų elementą. Kūryba ir davimas teka į išorę — tai atlygina, bet vargina. Saugokite atsargas ir ilsėkitės sąmoningai.',
    },
  },
  'you-control': {
    title: { en: 'You shape the year', lt: 'Jūs formuojate metus' },
    text: {
      en: 'Your element restrains the year’s element. You have influence and can achieve a lot — through effort. Lead with patience rather than force.',
      lt: 'Jūsų elementas tramdo metų elementą. Turite įtakos ir galite daug pasiekti — su pastangomis. Vadovaukite kantrybe, ne jėga.',
    },
  },
  'controls-you': {
    title: { en: 'The year tests you', lt: 'Metai jus išbando' },
    text: {
      en: 'The year’s element restrains yours. Expect pressure and lessons — the kind that forge character. Strengthen your element and the one that feeds it.',
      lt: 'Metų elementas tramdo jūsiškį. Tikėkitės spaudimo ir pamokų — tokių, kurios grūdina charakterį. Stiprinkite savo elementą ir tą, kuris jį maitina.',
    },
  },
}
