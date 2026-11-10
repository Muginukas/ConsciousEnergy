/**
 * "What's in my kitchen": everyday ingredients people actually have at home,
 * a small recipe book built from them, and the logic that
 *  - checks whether the chosen ingredients combine well (food-combining matrix),
 *  - splits a clashing set into compatible plates,
 *  - suggests swaps and additions,
 *  - ranks recipes by how much of each one the user already has.
 *
 * Every pantry item points at a food in the shared database (`food-db.ts`),
 * from which it takes its food-combining group and ångström value.
 */

import type { Bi } from './food-angstrom'
import { FOOD_GROUPS, getPair, type GroupId, type Rating } from './food-combining'
import { food } from './food-db'
import type { Meal } from './food-menu'

const b = (en: string, lt: string): Bi => ({ en, lt })

/* ---------- Pantry ---------- */

export type PantryItem = {
  id: string
  icon: string
  name: Bi
  /** Food in the shared database this item is valued as. */
  foodId: string
  /** Extra words people type for it (any language, any case). */
  aliases?: string[]
  /** Seasoning amounts only (lemon juice, garlic, herbs) — left out of the combining check. */
  condiment?: boolean
}

export type PantryShelf = { id: string; name: Bi; items: string[] }

const I = (id: string, icon: string, en: string, lt: string, foodId: string, aliases: string[] = [], condiment = false): PantryItem => ({
  id, icon, name: b(en, lt), foodId, aliases, condiment,
})

export const PANTRY: PantryItem[] = [
  // Protein
  I('eggs', '🥚', 'Eggs', 'Kiaušiniai', 'eggs', ['kiaušinis', 'egg', 'omletas', 'kiaušinienė']),
  I('cottage', '🥣', 'Cottage cheese', 'Varškė', 'cottage', ['curd', 'quark']),
  I('cheese', '🧀', 'Cheese', 'Sūris', 'hardCheese', ['sūrio']),
  I('chicken', '🍗', 'Chicken / turkey', 'Vištiena / kalakutiena', 'chicken', ['višta', 'kalakutiena', 'turkey', 'paukštiena']),
  I('meat', '🥩', 'Meat (pork, beef)', 'Mėsa (kiauliena, jautiena)', 'meatStewed', ['kiauliena', 'jautiena', 'faršas', 'mince', 'pork', 'beef']),
  I('fish', '🐟', 'White fish', 'Balta žuvis', 'fishSteamed', ['žuvis', 'menkė', 'lydeka', 'cod']),
  I('salmon', '🍣', 'Salmon', 'Lašiša', 'salmon', ['upėtakis', 'trout']),
  I('herring', '🐟', 'Herring', 'Silkė', 'herring'),
  // Legumes
  I('lentils', '🫘', 'Lentils', 'Lęšiai', 'lentils'),
  I('beans', '🫘', 'Beans', 'Pupelės', 'beans'),
  I('chickpeas', '🧆', 'Chickpeas', 'Avinžirniai', 'chickpeas', ['humusas']),
  I('tofu', '⬜', 'Tofu', 'Tofu', 'tofu'),
  // Grains & starch
  I('buckwheat', '🌾', 'Buckwheat', 'Grikiai', 'buckwheat', ['grikių', 'kasha']),
  I('rice', '🍚', 'Rice', 'Ryžiai', 'rice'),
  I('oats', '🥣', 'Oats', 'Avižiniai dribsniai', 'oatsSoaked', ['avižos', 'dribsniai', 'porridge']),
  I('millet', '🌾', 'Millet', 'Soros', 'millet'),
  I('quinoa', '🌾', 'Quinoa', 'Bolivinė balanda', 'quinoa', ['kinva', 'kynva']),
  I('pasta', '🍝', 'Pasta', 'Makaronai', 'wholegrainPasta', ['spagečiai', 'spaghetti']),
  I('bread', '🍞', 'Rye bread', 'Ruginė duona', 'ryeBread', ['duona']),
  I('potatoes', '🥔', 'Potatoes', 'Bulvės', 'potatoBaked', ['bulvė', 'potato']),
  I('sweetPotato', '🍠', 'Sweet potato', 'Batatas', 'sweetPotato', ['batatai']),
  // Vegetables
  I('carrot', '🥕', 'Carrots', 'Morkos', 'carrotSteamed', ['morka']),
  I('onion', '🧅', 'Onion', 'Svogūnai', 'onion', ['svogūnas', 'porai', 'leek']),
  I('garlic', '🧄', 'Garlic', 'Česnakai', 'garlic', ['česnakas'], true),
  I('cabbage', '🥬', 'Cabbage', 'Kopūstai', 'cabbageStewed', ['kopūstas']),
  I('beet', '🟣', 'Beetroot', 'Burokėliai', 'beetBoiled', ['burokas', 'burokai', 'beet']),
  I('zucchini', '🥒', 'Zucchini', 'Cukinijos', 'zucchiniGrilled', ['cukinija', 'courgette', 'aguročiai']),
  I('pumpkin', '🎃', 'Pumpkin', 'Moliūgas', 'pumpkin', ['moliūgai']),
  I('tomato', '🍅', 'Tomatoes', 'Pomidorai', 'tomatoCooked', ['pomidoras']),
  I('cucumber', '🥒', 'Cucumber', 'Agurkai', 'cucumber', ['agurkas']),
  I('pepper', '🫑', 'Bell pepper', 'Paprikos', 'pepper', ['paprika']),
  I('broccoli', '🥦', 'Broccoli', 'Brokoliai', 'broccoliSteamed', ['brokolis']),
  I('cauliflower', '🥦', 'Cauliflower', 'Žiediniai kopūstai', 'cauliflower', ['kalafioras', 'žiedinis']),
  I('spinach', '🌿', 'Spinach', 'Špinatai', 'spinach'),
  I('lettuce', '🥗', 'Salad leaves', 'Salotos', 'lettuce', ['salotų', 'rukola', 'rocket']),
  I('mushrooms', '🍄', 'Mushrooms', 'Grybai', 'mushrooms', ['pievagrybiai', 'baravykai', 'champignons']),
  I('radish', '🔴', 'Radishes', 'Ridikėliai', 'radish', ['ridikai']),
  I('celery', '🥬', 'Celery', 'Salierai', 'celery', ['saliera']),
  I('peas', '🟢', 'Green peas', 'Žalieji žirneliai', 'peasFresh', ['žirneliai', 'žirniai']),
  I('sauerkraut', '🫙', 'Sauerkraut', 'Rauginti kopūstai', 'sauerkraut', ['raugintų']),
  I('pickles', '🥒', 'Pickled cucumbers', 'Rauginti agurkai', 'pickles', ['marinuoti agurkai']),
  I('dill', '🌿', 'Dill', 'Krapai', 'dill', [], true),
  I('parsley', '🌿', 'Parsley', 'Petražolės', 'parsley', ['žalumynai', 'herbs'], true),
  I('ginger', '🫚', 'Ginger', 'Imbieras', 'ginger', [], true),
  // Fats
  I('butter', '🧈', 'Butter', 'Sviestas', 'butter', ['ghi', 'ghee']),
  I('oliveOil', '🫒', 'Olive oil', 'Alyvuogių aliejus', 'oliveOil', ['alyvuogių']),
  I('oil', '🌻', 'Sunflower / rapeseed oil', 'Aliejus (saulėgrąžų, rapsų)', 'sunflowerOil', ['aliejus', 'oil', 'rapsų']),
  I('sourCream', '🥛', 'Sour cream', 'Grietinė', 'sourCream', ['grietinėlė', 'cream']),
  I('avocado', '🥑', 'Avocado', 'Avokadas', 'avocado'),
  // Nuts & seeds
  I('walnuts', '🌰', 'Walnuts', 'Graikiniai riešutai', 'walnuts', ['riešutai', 'nuts']),
  I('seeds', '🌻', 'Sunflower / pumpkin seeds', 'Saulėgrąžos / moliūgų sėklos', 'pumpkinSeeds', ['sėklos', 'saulėgrąžos', 'seeds']),
  I('flax', '🟤', 'Flaxseed', 'Linų sėmenys', 'flax', ['sėmenys']),
  // Dairy
  I('kefir', '🥛', 'Kefir', 'Kefyras', 'kefir', ['rūgpienis', 'pasukos']),
  I('yogurt', '🥛', 'Yogurt', 'Jogurtas', 'yogurt'),
  I('milk', '🥛', 'Milk', 'Pienas', 'milkPast'),
  // Fruit
  I('apple', '🍎', 'Apples', 'Obuoliai', 'apple', ['obuolys']),
  I('banana', '🍌', 'Bananas', 'Bananai', 'banana', ['bananas']),
  I('berries', '🫐', 'Berries', 'Uogos', 'frozenBerries', ['mėlynės', 'braškės', 'avietės', 'spanguolės']),
  I('lemon', '🍋', 'Lemon', 'Citrina', 'lemon', ['citrinos', 'laimas', 'lime'], true),
  I('honey', '🍯', 'Honey', 'Medus', 'honey'),
]

export const PANTRY_BY_ID = new Map(PANTRY.map((p) => [p.id, p]))

export function pantryGroup(id: string): GroupId | null {
  const p = PANTRY_BY_ID.get(id)
  return p ? food(p.foodId).group : null
}

export const SHELVES: PantryShelf[] = [
  { id: 'protein', name: b('Protein', 'Baltymai'), items: ['eggs', 'cottage', 'cheese', 'chicken', 'meat', 'fish', 'salmon', 'herring'] },
  { id: 'legumes', name: b('Legumes', 'Ankštiniai'), items: ['lentils', 'beans', 'chickpeas', 'tofu'] },
  { id: 'starch', name: b('Grains & potatoes', 'Grūdai ir bulvės'), items: ['buckwheat', 'rice', 'oats', 'millet', 'quinoa', 'pasta', 'bread', 'potatoes', 'sweetPotato'] },
  { id: 'veg', name: b('Vegetables', 'Daržovės'), items: ['carrot', 'onion', 'garlic', 'cabbage', 'beet', 'zucchini', 'pumpkin', 'tomato', 'cucumber', 'pepper', 'broccoli', 'cauliflower', 'spinach', 'lettuce', 'mushrooms', 'radish', 'celery', 'peas', 'sauerkraut', 'pickles', 'dill', 'parsley', 'ginger'] },
  { id: 'fat', name: b('Fats', 'Riebalai'), items: ['butter', 'oliveOil', 'oil', 'sourCream', 'avocado'] },
  { id: 'nuts', name: b('Nuts & seeds', 'Riešutai ir sėklos'), items: ['walnuts', 'seeds', 'flax'] },
  { id: 'dairy', name: b('Milk & kefir', 'Pienas ir kefyras'), items: ['kefir', 'yogurt', 'milk'] },
  { id: 'fruit', name: b('Fruit & sweet', 'Vaisiai ir saldu'), items: ['apple', 'banana', 'berries', 'lemon', 'honey'] },
]

/* ---------- Free-text matching ("kiaušiniai, grikiai") ---------- */

export const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').trim()

const commonPrefix = (a: string, b: string) => {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  return i
}

/** Every word a pantry item can be recognised by, normalised. */
const WORDS: { id: string; word: string }[] = PANTRY.flatMap((p) =>
  [p.name.lt, p.name.en, ...(p.aliases ?? [])]
    .flatMap((n) => normalize(n).split(/\s+/))
    .filter((w) => w.length >= 3)
    .map((word) => ({ id: p.id, word })),
)

/**
 * Best pantry item for a typed word, tolerant of Lithuanian endings
 * ("kiaušinių", "grikius", "morkų") by comparing shared prefixes.
 */
export function matchWord(raw: string): string | null {
  const t = normalize(raw)
  if (t.length < 3) return null
  // Whole phrase first (e.g. "rauginti kopustai").
  const phrase = PANTRY.find((p) => [p.name.lt, p.name.en, ...(p.aliases ?? [])].some((n) => normalize(n) === t))
  if (phrase) return phrase.id
  let best: { id: string; score: number } | null = null
  for (const tok of t.split(/\s+/)) {
    for (const w of WORDS) {
      const cp = commonPrefix(tok, w.word)
      const need = Math.min(4, tok.length, w.word.length)
      if (cp < need) continue
      const score = cp * 10 - Math.abs(w.word.length - tok.length)
      if (!best || score > best.score) best = { id: w.id, score }
    }
  }
  return best?.id ?? null
}

/** Live suggestions for the search box. */
export function suggest(raw: string, exclude: Set<string>, limit = 6): PantryItem[] {
  const t = normalize(raw)
  if (t.length < 2) return []
  const hits = new Map<string, number>()
  for (const w of WORDS) {
    if (exclude.has(w.id)) continue
    const cp = commonPrefix(t, w.word)
    const contains = w.word.includes(t)
    const score = cp >= Math.min(t.length, 4) ? cp * 10 : contains ? 5 : 0
    if (score > (hits.get(w.id) ?? 0)) hits.set(w.id, score)
  }
  return [...hits.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => PANTRY_BY_ID.get(id)!)
}

const MEAL_WORDS: [string, Meal][] = [
  ['pusryc', 'breakfast'], ['breakfast', 'breakfast'], ['ryt', 'breakfast'],
  ['piet', 'lunch'], ['lunch', 'lunch'],
  ['vakar', 'dinner'], ['dinner', 'dinner'], ['supper', 'dinner'],
]

/** A word like "vakarienė" or "pietums" names a meal, not an ingredient. */
export function matchMeal(raw: string): Meal | null {
  const t = normalize(raw)
  return MEAL_WORDS.find(([w]) => t.startsWith(w))?.[1] ?? null
}

/** Split "kiaušiniai, grikiai ir svogūnai, vakarienė" into pantry ids (and a meal, if named). */
export function parseList(text: string): { ids: string[]; unknown: string[]; meal: Meal | null } {
  const parts = text.split(/[,;\n]+|\s+ir\s+|\s+and\s+/i).map((s) => s.trim()).filter(Boolean)
  const ids: string[] = []
  const unknown: string[] = []
  let meal: Meal | null = null
  for (const part of parts) {
    const m = matchMeal(part)
    if (m) {
      meal = m
      continue
    }
    const id = matchWord(part)
    if (id) {
      if (!ids.includes(id)) ids.push(id)
    } else unknown.push(part)
  }
  return { ids, unknown, meal }
}

/* ---------- Combining analysis ---------- */

export type Conflict = { a: string; b: string; ga: GroupId; gb: GroupId; note?: Bi }

export type Plate = {
  /** Pantry ids on this plate. */
  items: string[]
  groups: GroupId[]
}

export type Analysis = {
  groups: GroupId[]
  pairs: { a: GroupId; b: GroupId; rating: Rating }[]
  harmony: number
  conflicts: Conflict[]
  plates: Plate[]
  /** Groups that are a symbiosis with everything chosen and not present yet. */
  additions: GroupId[]
}

const RATING_SCORE: Record<Rating, number> = { good: 1, ok: 0.5, bad: 0 }

export function harmonyOf(groups: GroupId[]) {
  const pairs: Analysis['pairs'] = []
  for (let i = 0; i < groups.length; i++)
    for (let j = i + 1; j < groups.length; j++) pairs.push({ a: groups[i], b: groups[j], rating: getPair(groups[i], groups[j]).rating })
  const harmony = pairs.length ? Math.round((pairs.reduce((s, p) => s + RATING_SCORE[p.rating], 0) / pairs.length) * 100) : 100
  return { pairs, harmony }
}

/** Groups that sit happily next to anything once they're not in conflict (vegetables). */
const NEUTRAL: GroupId[] = ['veg']
const ADDITION_ORDER: GroupId[] = ['veg', 'fat', 'nuts', 'sourFruit']

export function analyze(ids: string[]): Analysis {
  const active = ids.filter((id) => !PANTRY_BY_ID.get(id)?.condiment)
  const groupOf = new Map(active.map((id) => [id, pantryGroup(id)] as const))
  const groups = [...new Set([...groupOf.values()].filter((g): g is GroupId => g !== null))]
  const { pairs, harmony } = harmonyOf(groups)

  // Conflicts, item by item (first item of each group stands for it in the note).
  const conflicts: Conflict[] = []
  for (const p of pairs.filter((x) => x.rating === 'bad')) {
    const a = active.find((id) => groupOf.get(id) === p.a)!
    const bb = active.find((id) => groupOf.get(id) === p.b)!
    conflicts.push({ a, b: bb, ga: p.a, gb: p.b, note: getPair(p.a, p.b).note })
  }

  // Greedy split into plates without any conflict.
  const plates: Plate[] = []
  const groupItems = (g: GroupId) => active.filter((id) => groupOf.get(id) === g)
  const condiments = ids.filter((id) => PANTRY_BY_ID.get(id)?.condiment)
  if (conflicts.length) {
    const concentrates = groups.filter((g) => !NEUTRAL.includes(g))
    const sets: GroupId[][] = []
    for (const g of concentrates) {
      const home = sets.find((s) => s.every((x) => getPair(x, g).rating !== 'bad'))
      if (home) home.push(g)
      else sets.push([g])
    }
    // A group may fit several plates (e.g. fat); add it wherever it fits.
    for (const g of concentrates)
      for (const s of sets) if (!s.includes(g) && s.every((x) => getPair(x, g).rating !== 'bad')) s.push(g)
    for (const s of sets) {
      const neutral = NEUTRAL.filter((n) => groups.includes(n) && s.every((x) => getPair(x, n).rating !== 'bad'))
      const all = [...s, ...neutral]
      plates.push({ groups: all, items: [...all.flatMap(groupItems), ...condiments] })
    }
  }

  const additions = ADDITION_ORDER.filter(
    (g) => !groups.includes(g) && groups.length > 0 && groups.every((x) => getPair(x, g).rating === 'good'),
  )

  return { groups, pairs, harmony, conflicts, plates, additions }
}

/** Groups that are a symbiosis with `g` (used for swap suggestions). */
export function goodPartners(g: GroupId): GroupId[] {
  return FOOD_GROUPS.map((x) => x.id).filter((x) => x !== g && getPair(g, x).rating === 'good')
}

/* ---------- Meal guidance ---------- */

export const MEAL_TIPS: Partial<Record<Meal, Bi[]>> = {
  breakfast: [
    b('Start light: fruit on its own, or a porridge with fat and seeds.', 'Pradėk lengvai: vaisiai atskirai arba košė su riebalais ir sėklomis.'),
    b('Eggs or cottage cheese go best with vegetables, not with bread.', 'Kiaušiniai ar varškė geriausiai dera su daržovėmis, ne su duona.'),
  ],
  lunch: [
    b('Midday digestion is strongest — the time for the heartiest plate.', 'Vidurdienį virškinimas stipriausias — laikas sočiausiam patiekalui.'),
    b('Half the plate vegetables, a quarter one concentrated food.', 'Pusė lėkštės daržovių, ketvirtis — vienas koncentruotas produktas.'),
  ],
  dinner: [
    b('Eat dinner 2–3 hours before sleep, and a little lighter than lunch.', 'Vakarieniauk 2–3 val. prieš miegą ir šiek tiek lengviau nei per pietus.'),
    b('Warm, cooked or stewed food calms the body in the evening; leave big raw salads for the day.', 'Vakare šiltas, virtas ar troškintas maistas ramina kūną; dideles žalias salotas palik dienai.'),
    b('One concentrated food (eggs, fish, grain or legumes) plus plenty of vegetables.', 'Vienas koncentruotas produktas (kiaušiniai, žuvis, kruopos ar ankštiniai) ir daug daržovių.'),
    b('Fruit, sweets and kefir are better earlier in the day.', 'Vaisius, saldumynus ir kefyrą geriau valgyti anksčiau dieną.'),
  ],
}

/* ---------- Recipes ---------- */

export type RecipeIngredient = { id: string; amount: Bi; optional?: boolean }

export type Recipe = {
  id: string
  icon: string
  name: Bi
  meals: Meal[]
  minutes: number
  ingredients: RecipeIngredient[]
  steps: Bi[]
  why: Bi
  /** Computed from the non-condiment ingredients. */
  harmony: number
}

type RecipeDef = Omit<Recipe, 'harmony'>

const ing = (id: string, en: string, lt: string, optional = false): RecipeIngredient => ({ id, amount: b(en, lt), optional })

const RECIPE_DEFS: RecipeDef[] = [
  // ---------- Dinner ----------
  {
    id: 'buckwheat-veg', icon: '🌾', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Buckwheat with stewed vegetables and butter', 'Grikiai su troškintomis daržovėmis ir sviestu'),
    ingredients: [
      ing('buckwheat', '1 cup', '1 stiklinė'),
      ing('carrot', '1–2', '1–2'),
      ing('onion', '1', '1'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('zucchini', '½', '½', true),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Rinse the buckwheat, pour in 2 cups of boiling salted water, cover and simmer on low heat for 15 minutes.', 'Grikius nuplauk, užpilk 2 stiklinėmis verdančio pasūdyto vandens, uždenk ir virk ant mažos ugnies 15 min.'),
      b('Meanwhile dice the onion and carrot (and zucchini) and stew them in a pan with a splash of water until soft.', 'Tuo metu supjaustyk svogūną ir morką (ir cukiniją) ir troškink keptuvėje su trupučiu vandens, kol suminkštės.'),
      b('Stir the vegetables into the buckwheat, add butter, crushed garlic and plenty of dill.', 'Daržoves sumaišyk su grikiais, įdėk sviesto, spaustą česnaką ir gausiai krapų.'),
    ],
    why: b('Grain + vegetables + fat — full symbiosis. Buckwheat is warming and grounding, ideal for the evening.', 'Kruopos + daržovės + riebalai — pilna simbiozė. Grikiai šildo ir įžemina — puikiai tinka vakarui.'),
  },
  {
    id: 'buckwheat-mushrooms', icon: '🍄', meals: ['dinner'], minutes: 25,
    name: b('Buckwheat with mushrooms and onions', 'Grikiai su grybais ir svogūnais'),
    ingredients: [
      ing('buckwheat', '1 cup', '1 stiklinė'),
      ing('mushrooms', '250 g', '250 g'),
      ing('onion', '1–2', '1–2'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('sourCream', '2 tbsp', '2 š.', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Cook the buckwheat: 1 part grain to 2 parts salted water, 15 minutes covered on low heat.', 'Išvirk grikius: 1 dalis kruopų ir 2 dalys pasūdyto vandens, 15 min. uždengus ant mažos ugnies.'),
      b('Gently fry sliced onion in butter, add sliced mushrooms and cook until their liquid evaporates.', 'Svieste pakepink svogūną, sudėk pjaustytus grybus ir kepk, kol išgaruos jų skystis.'),
      b('Mix with the buckwheat; serve with a spoon of sour cream and dill.', 'Sumaišyk su grikiais; patiek su šaukštu grietinės ir krapais.'),
    ],
    why: b('A Lithuanian classic that combines well: mushrooms count as vegetables, so nothing clashes with the grain.', 'Lietuviška klasika, kuri dera: grybai skaičiuojami kaip daržovės, todėl niekas nekonfliktuoja su kruopomis.'),
  },
  {
    id: 'eggs-tomato', icon: '🍳', meals: ['dinner', 'breakfast'], minutes: 20,
    name: b('Eggs poached in tomato and pepper sauce', 'Kiaušiniai, troškinti pomidorų ir paprikų padaže'),
    ingredients: [
      ing('eggs', '2–3', '2–3'),
      ing('tomato', '3–4 (or a can)', '3–4 (arba skardinė)'),
      ing('pepper', '1', '1'),
      ing('onion', '1', '1'),
      ing('garlic', '1–2 cloves', '1–2 skiltelės', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Soften chopped onion and pepper in a little oil, add garlic and chopped tomatoes; simmer 8–10 minutes into a thick sauce.', 'Aliejuje suminkštink smulkintą svogūną ir papriką, įdėk česnaką ir pjaustytus pomidorus; troškink 8–10 min., kol padažas sutirštės.'),
      b('Make small wells in the sauce, crack in the eggs, cover and cook 5–6 minutes until the whites set.', 'Padaže padaryk duobutes, įmušk kiaušinius, uždenk ir virk 5–6 min., kol sustings baltymai.'),
      b('Sprinkle with parsley. Eat without bread — or with plenty of salad leaves.', 'Pabarstyk petražolėmis. Valgyk be duonos — arba su gausiai salotų lapų.'),
    ],
    why: b('Protein with vegetables is the ideal pair. Eggs without bread or potatoes digest quickly and lightly.', 'Baltymai su daržovėmis — idealus derinys. Kiaušiniai be duonos ar bulvių virškinami greitai ir lengvai.'),
  },
  {
    id: 'omelette-spinach', icon: '🥚', meals: ['dinner', 'breakfast'], minutes: 12,
    name: b('Vegetable omelette with spinach', 'Daržovių omletas su špinatais'),
    ingredients: [
      ing('eggs', '2–3', '2–3'),
      ing('spinach', '2 handfuls', '2 saujos'),
      ing('onion', '½', '½', true),
      ing('tomato', '1', '1', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
      ing('cheese', 'a little, grated', 'truputis, tarkuoto', true),
    ],
    steps: [
      b('Wilt the onion and spinach in a pan with a little butter.', 'Keptuvėje su trupučiu sviesto suvytink svogūną ir špinatus.'),
      b('Whisk the eggs with salt, pour over the greens, add sliced tomato and cook covered on low heat for 4–5 minutes.', 'Kiaušinius išplak su druska, užpilk ant žalumynų, sudėk pomidoro griežinėlius ir kepk uždengtą ant mažos ugnies 4–5 min.'),
      b('Sprinkle cheese if you like and fold. Serve with a green salad.', 'Jei nori, pabarstyk sūriu ir perlenk. Patiek su žalomis salotomis.'),
    ],
    why: b('Quick, light and high in protein. Cheese with eggs is fine — both are animal protein.', 'Greita, lengva ir daug baltymų. Sūris su kiaušiniais tinka — abu gyvūniniai baltymai.'),
  },
  {
    id: 'zucchini-fritters', icon: '🥒', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Flourless zucchini fritters', 'Cukinijų blyneliai be miltų'),
    ingredients: [
      ing('zucchini', '2 medium', '2 vidutinės'),
      ing('eggs', '2', '2'),
      ing('cheese', '50 g, grated', '50 g, tarkuoto', true),
      ing('dill', 'a handful', 'saujelė', true),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('oil', 'for the pan', 'kepimui'),
    ],
    steps: [
      b('Grate the zucchini, salt it and leave for 10 minutes, then squeeze out the water well.', 'Cukinijas sutarkuok, pasūdyk, palik 10 min., tada gerai nuspausk skystį.'),
      b('Mix with eggs, grated cheese, chopped dill and garlic.', 'Sumaišyk su kiaušiniais, tarkuotu sūriu, smulkintais krapais ir česnaku.'),
      b('Fry small fritters in a little oil, 2–3 minutes each side. Serve with a cucumber salad.', 'Kepk mažus blynelius su trupučiu aliejaus, po 2–3 min. iš kiekvienos pusės. Patiek su agurkų salotomis.'),
    ],
    why: b('No flour, so no protein–starch clash: just eggs and vegetables.', 'Be miltų — todėl nėra baltymų ir krakmolo konflikto: tik kiaušiniai ir daržovės.'),
  },
  {
    id: 'pumpkin-soup', icon: '🎃', meals: ['dinner', 'lunch'], minutes: 30,
    name: b('Creamy pumpkin and carrot soup with ginger', 'Trinta moliūgų ir morkų sriuba su imbieru'),
    ingredients: [
      ing('pumpkin', '500 g', '500 g'),
      ing('carrot', '2', '2'),
      ing('onion', '1', '1'),
      ing('ginger', '2 cm', '2 cm', true),
      ing('butter', '1 tbsp (or olive oil)', '1 š. (arba alyvuogių aliejaus)'),
      ing('seeds', '1 tbsp, to sprinkle', '1 š., pabarstyti', true),
    ],
    steps: [
      b('Soften the onion in butter, add diced pumpkin, carrots and grated ginger.', 'Svieste suminkštink svogūną, sudėk kubeliais pjaustytą moliūgą, morkas ir tarkuotą imbierą.'),
      b('Cover with water just to the top of the vegetables, salt and simmer 20 minutes.', 'Užpilk vandeniu tiek, kad apsemtų daržoves, pasūdyk ir virk 20 min.'),
      b('Blend until smooth. Serve sprinkled with seeds.', 'Sutrink iki vientisos masės. Patiek pabarsčius sėklomis.'),
    ],
    why: b('Vegetables only — light, warming and calming before sleep.', 'Vien daržovės — lengva, šildanti ir raminanti prieš miegą.'),
  },
  {
    id: 'fish-veg', icon: '🐟', meals: ['dinner'], minutes: 25,
    name: b('Steamed or baked fish with vegetables', 'Garinta ar kepta žuvis su daržovėmis'),
    ingredients: [
      ing('fish', '200 g fillet', '200 g filė'),
      ing('broccoli', '1 head', '1 galva'),
      ing('carrot', '1–2', '1–2'),
      ing('lemon', '½', '½', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Season the fish with salt, pepper and a little lemon juice.', 'Žuvį pagardink druska, pipirais ir trupučiu citrinos sulčių.'),
      b('Steam (or bake at 190 °C) the fish together with broccoli florets and carrot sticks for 12–15 minutes.', 'Garink (arba kepk 190 °C orkaitėje) žuvį kartu su brokolių žiedynais ir morkų lazdelėmis 12–15 min.'),
      b('Drizzle with olive oil and plenty of dill.', 'Apšlakstyk alyvuogių aliejumi ir gausiai pabarstyk krapais.'),
    ],
    why: b('Fish with vegetables is a classic symbiosis; skip potatoes or rice and the plate stays light.', 'Žuvis su daržovėmis — klasikinė simbiozė; be bulvių ar ryžių lėkštė lieka lengva.'),
  },
  {
    id: 'salmon-salad', icon: '🍣', meals: ['dinner', 'lunch'], minutes: 20,
    name: b('Salmon on warm greens', 'Lašiša ant šiltų žalumynų'),
    ingredients: [
      ing('salmon', '150–200 g', '150–200 g'),
      ing('spinach', '2 handfuls', '2 saujos'),
      ing('zucchini', '1', '1', true),
      ing('cucumber', '1', '1', true),
      ing('lemon', '½', '½', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Bake the salmon at 200 °C for 12–15 minutes (or pan-fry 3–4 minutes each side).', 'Kepk lašišą 200 °C orkaitėje 12–15 min. (arba keptuvėje po 3–4 min. iš kiekvienos pusės).'),
      b('Briefly sauté zucchini slices and wilt the spinach in the same pan.', 'Toje pačioje keptuvėje trumpai pakepink cukinijos griežinėlius ir suvytink špinatus.'),
      b('Serve the salmon on the greens with cucumber, lemon and dill.', 'Lašišą patiek ant žalumynų su agurku, citrina ir krapais.'),
    ],
    why: b('Omega-3 fat from salmon helps absorb the vitamins in the greens.', 'Lašišos omega-3 riebalai padeda įsisavinti žalumynų vitaminus.'),
  },
  {
    id: 'chicken-cabbage', icon: '🍗', meals: ['dinner', 'lunch'], minutes: 35,
    name: b('Chicken with stewed cabbage and carrots', 'Vištiena su troškintais kopūstais ir morkomis'),
    ingredients: [
      ing('chicken', '300 g', '300 g'),
      ing('cabbage', '½ head', '½ galvos'),
      ing('carrot', '2', '2'),
      ing('onion', '1', '1'),
      ing('oil', '1 tbsp', '1 š.', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Brown the diced chicken briefly in a little oil, then add the onion.', 'Kubeliais pjaustytą vištieną trumpai apkepink su trupučiu aliejaus, tada sudėk svogūną.'),
      b('Add shredded cabbage, grated carrot, ½ cup of water and salt; cover and stew 20–25 minutes.', 'Sudėk smulkintus kopūstus, tarkuotą morką, ½ stiklinės vandens ir druskos; uždenk ir troškink 20–25 min.'),
      b('Finish with dill. No potatoes needed — the cabbage makes it filling.', 'Pabaik krapais. Bulvių nereikia — kopūstai patiekalą daro sotų.'),
    ],
    why: b('Meat with vegetables instead of potatoes — protein and starch stay apart.', 'Mėsa su daržovėmis vietoj bulvių — baltymai ir krakmolas lieka atskirai.'),
  },
  {
    id: 'meat-sauerkraut', icon: '🥩', meals: ['dinner', 'lunch'], minutes: 45,
    name: b('Meat stewed with sauerkraut', 'Mėsa, troškinta su raugintais kopūstais'),
    ingredients: [
      ing('meat', '300 g', '300 g'),
      ing('sauerkraut', '400 g', '400 g'),
      ing('onion', '1', '1'),
      ing('carrot', '1', '1', true),
      ing('oil', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Brown the meat pieces with the onion.', 'Mėsos gabaliukus apkepink su svogūnu.'),
      b('Add sauerkraut, grated carrot and 1 cup of water; cover and stew 30–40 minutes on low heat.', 'Sudėk raugintus kopūstus, tarkuotą morką ir stiklinę vandens; uždenk ir troškink 30–40 min. ant mažos ugnies.'),
      b('Serve with a spoon of fresh raw sauerkraut on top for living enzymes.', 'Patiek su šaukštu šviežių žalių raugintų kopūstų viršuje — gyviems fermentams.'),
    ],
    why: b('Fermented cabbage helps digest meat. A heavier dish — eat it earlier in the evening.', 'Rauginti kopūstai padeda virškinti mėsą. Sunkesnis patiekalas — valgyk anksčiau vakare.'),
  },
  {
    id: 'lentil-stew', icon: '🫘', meals: ['dinner', 'lunch'], minutes: 30,
    name: b('Lentil and vegetable stew', 'Lęšių ir daržovių troškinys'),
    ingredients: [
      ing('lentils', '1 cup', '1 stiklinė'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('tomato', '2 (or a can)', '2 (arba skardinė)'),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Soften onion, carrot and garlic in oil; add a pinch of cumin or turmeric if you have it.', 'Aliejuje suminkštink svogūną, morką ir česnaką; jei turi, įberk kmynų ar ciberžolės.'),
      b('Add rinsed lentils, tomatoes and 3 cups of water; simmer 20–25 minutes until soft.', 'Sudėk nuplautus lęšius, pomidorus ir 3 stiklines vandens; virk 20–25 min., kol suminkštės.'),
      b('Season with salt, a squeeze of lemon and parsley.', 'Pagardink druska, citrinos sultimis ir petražolėmis.'),
    ],
    why: b('Legumes with vegetables and olive oil — symbiosis. Spices make the lentils lighter to digest.', 'Ankštiniai su daržovėmis ir alyvuogių aliejumi — simbiozė. Prieskoniai padeda lęšius lengviau suvirškinti.'),
  },
  {
    id: 'chickpea-spinach', icon: '🧆', meals: ['dinner', 'lunch'], minutes: 20,
    name: b('Chickpeas with spinach and tomatoes', 'Avinžirniai su špinatais ir pomidorais'),
    ingredients: [
      ing('chickpeas', '1 can or 1½ cups cooked', '1 skardinė arba 1½ stiklinės virtų'),
      ing('spinach', '2 handfuls', '2 saujos'),
      ing('tomato', '2–3', '2–3'),
      ing('onion', '1', '1'),
      ing('ginger', '1 cm', '1 cm', true),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Soften onion, garlic and ginger in oil; add chopped tomatoes and cook 5 minutes.', 'Aliejuje suminkštink svogūną, česnaką ir imbierą; sudėk pjaustytus pomidorus ir virk 5 min.'),
      b('Add the chickpeas and simmer 10 minutes; stir in the spinach at the end until it wilts.', 'Sudėk avinžirnius ir troškink 10 min.; pabaigoje įmaišyk špinatus, kol suvys.'),
    ],
    why: b('Vitamin C in tomatoes helps the body absorb iron from chickpeas and spinach.', 'Pomidorų vitaminas C padeda įsisavinti avinžirnių ir špinatų geležį.'),
  },
  {
    id: 'bean-stew', icon: '🫘', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Bean and pepper stew', 'Pupelių ir paprikų troškinys'),
    ingredients: [
      ing('beans', '1 can or 1½ cups cooked', '1 skardinė arba 1½ stiklinės virtų'),
      ing('pepper', '1–2', '1–2'),
      ing('tomato', '2–3', '2–3'),
      ing('onion', '1', '1'),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Fry onion, garlic and diced pepper in oil for 5 minutes.', 'Aliejuje 5 min. pakepink svogūną, česnaką ir kubeliais pjaustytą papriką.'),
      b('Add tomatoes and beans, a pinch of paprika and cumin; simmer 15 minutes.', 'Sudėk pomidorus ir pupeles, žiupsnelį maltos paprikos ir kmynų; troškink 15 min.'),
      b('Finish with parsley and a little olive oil.', 'Pabaik petražolėmis ir trupučiu alyvuogių aliejaus.'),
    ],
    why: b('A warming plant-protein dinner; vegetables lighten the beans.', 'Šildanti augalinių baltymų vakarienė; daržovės palengvina pupeles.'),
  },
  {
    id: 'baked-potatoes', icon: '🥔', meals: ['dinner', 'lunch'], minutes: 40,
    name: b('Oven potatoes with vegetables and dill', 'Orkaitėje keptos bulvės su daržovėmis ir krapais'),
    ingredients: [
      ing('potatoes', '4–5', '4–5'),
      ing('carrot', '2', '2'),
      ing('onion', '1', '1'),
      ing('oil', '2 tbsp (or olive oil)', '2 š. (arba alyvuogių)'),
      ing('zucchini', '1', '1', true),
      ing('dill', 'a handful', 'saujelė', true),
      ing('sourCream', 'to serve', 'patiekimui', true),
    ],
    steps: [
      b('Cut potatoes, carrots, onion (and zucchini) into chunks, toss with oil, salt and caraway.', 'Bulves, morkas, svogūną (ir cukiniją) supjaustyk gabalėliais, sumaišyk su aliejumi, druska ir kmynais.'),
      b('Bake at 200 °C for 30–35 minutes, turning once.', 'Kepk 200 °C orkaitėje 30–35 min., vieną kartą apvertęs.'),
      b('Sprinkle with dill; serve with sour cream and sauerkraut or pickles.', 'Pabarstyk krapais; patiek su grietine ir raugintais kopūstais ar agurkais.'),
    ],
    why: b('Potatoes are best with vegetables and fat — not with meat. Fermented sides add living enzymes.', 'Bulvės geriausiai dera su daržovėmis ir riebalais — ne su mėsa. Rauginti priedai prideda gyvų fermentų.'),
  },
  {
    id: 'veg-rice', icon: '🍚', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Rice with stir-fried vegetables and ginger', 'Ryžiai su keptomis daržovėmis ir imbieru'),
    ingredients: [
      ing('rice', '1 cup', '1 stiklinė'),
      ing('carrot', '1', '1'),
      ing('pepper', '1', '1'),
      ing('broccoli', '½ head', '½ galvos', true),
      ing('onion', '1', '1'),
      ing('ginger', '2 cm', '2 cm', true),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oil', '1 tbsp', '1 š.'),
    ],
    steps: [
      b('Cook the rice (1 part rice to 2 parts water).', 'Išvirk ryžius (1 dalis ryžių ir 2 dalys vandens).'),
      b('Stir-fry strips of carrot, pepper, onion and broccoli with ginger and garlic for 5–7 minutes so they stay crisp.', 'Pakepink juostelėmis pjaustytas morkas, papriką, svogūną ir brokolius su imbieru ir česnaku 5–7 min., kad liktų traškūs.'),
      b('Mix with the rice; season with salt or a little soy sauce.', 'Sumaišyk su ryžiais; pagardink druska ar trupučiu sojų padažo.'),
    ],
    why: b('Grain with lots of vegetables — light, balanced, and quick.', 'Kruopos su daug daržovių — lengva, subalansuota ir greita.'),
  },
  {
    id: 'cabbage-mushroom', icon: '🥬', meals: ['dinner'], minutes: 30,
    name: b('Stewed cabbage with mushrooms', 'Troškinti kopūstai su grybais'),
    ingredients: [
      ing('cabbage', '½ head', '½ galvos'),
      ing('mushrooms', '200 g', '200 g'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('oil', '1 tbsp', '1 š.'),
      ing('tomato', '1–2', '1–2', true),
    ],
    steps: [
      b('Fry onion and mushrooms in oil until golden.', 'Aliejuje apkepink svogūną ir grybus, kol pagels.'),
      b('Add shredded cabbage, grated carrot (and tomato), a little water and salt; stew covered 20 minutes.', 'Sudėk smulkintus kopūstus, tarkuotą morką (ir pomidorą), truputį vandens ir druskos; troškink uždengtus 20 min.'),
    ],
    why: b('Only vegetables and fat — about as easy on digestion as a warm dinner gets.', 'Tik daržovės ir riebalai — lengviau suvirškinamos šiltos vakarienės beveik nebūna.'),
  },
  {
    id: 'millet-pumpkin', icon: '🌾', meals: ['dinner', 'breakfast'], minutes: 30,
    name: b('Millet with baked pumpkin and butter', 'Soros su keptu moliūgu ir sviestu'),
    ingredients: [
      ing('millet', '1 cup', '1 stiklinė'),
      ing('pumpkin', '300 g', '300 g'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Rinse millet in hot water, cook in 2½ cups of salted water for 20 minutes.', 'Soras nuplauk karštu vandeniu, virk 2½ stiklinės pasūdyto vandens 20 min.'),
      b('Bake pumpkin cubes at 200 °C for 20 minutes (or cook them with the millet).', 'Moliūgo kubelius kepk 200 °C orkaitėje 20 min. (arba virk kartu su soromis).'),
      b('Mix with butter, top with seeds.', 'Sumaišyk su sviestu, pabarstyk sėklomis.'),
    ],
    why: b('Millet is alkaline and gluten-free; with pumpkin and butter it is soft and soothing.', 'Soros šarminės ir be glitimo; su moliūgu ir sviestu — švelnios ir raminančios.'),
  },
  {
    id: 'cottage-herbs', icon: '🥣', meals: ['dinner', 'breakfast'], minutes: 5,
    name: b('Cottage cheese with herbs, cucumber and radish', 'Varškė su žolelėmis, agurku ir ridikėliais'),
    ingredients: [
      ing('cottage', '200 g', '200 g'),
      ing('cucumber', '1', '1'),
      ing('radish', '4–5', '4–5', true),
      ing('dill', 'a handful', 'saujelė', true),
      ing('sourCream', '1–2 tbsp', '1–2 š.', true),
    ],
    steps: [
      b('Mix cottage cheese with sour cream, chopped dill and salt.', 'Varškę sumaišyk su grietine, smulkintais krapais ir druska.'),
      b('Add diced cucumber and radishes. Eat without bread.', 'Įmaišyk kubeliais pjaustytą agurką ir ridikėlius. Valgyk be duonos.'),
    ],
    why: b('A light, cool protein dinner with no cooking — vegetables instead of bread keep it easy.', 'Lengva, vėsi baltyminė vakarienė be virimo — daržovės vietoj duonos.'),
  },
  {
    id: 'pasta-veg', icon: '🍝', meals: ['dinner', 'lunch'], minutes: 20,
    name: b('Pasta with zucchini and tomatoes', 'Makaronai su cukinija ir pomidorais'),
    ingredients: [
      ing('pasta', '200 g', '200 g'),
      ing('zucchini', '1', '1'),
      ing('tomato', '3', '3'),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oliveOil', '2 tbsp', '2 š.'),
      ing('parsley', 'or basil', 'arba baziliko', true),
    ],
    steps: [
      b('Cook the pasta al dente.', 'Išvirk makaronus al dente.'),
      b('Meanwhile sauté garlic and diced zucchini in olive oil, add tomatoes and cook 5 minutes.', 'Tuo metu alyvuogių aliejuje pakepink česnaką ir kubeliais pjaustytą cukiniją, sudėk pomidorus ir virk 5 min.'),
      b('Toss with the pasta and herbs. No meat or cheese sauce — that’s what keeps it light.', 'Sumaišyk su makaronais ir žolelėmis. Be mėsos ar sūrio padažo — todėl lengva.'),
    ],
    why: b('Starch + vegetables + olive oil — the Mediterranean symbiosis.', 'Krakmolas + daržovės + alyvuogių aliejus — Viduržemio jūros simbiozė.'),
  },
  {
    id: 'beet-salad', icon: '🟣', meals: ['dinner', 'lunch'], minutes: 10,
    name: b('Warm beetroot salad with walnuts', 'Šiltos burokėlių salotos su graikiniais riešutais'),
    ingredients: [
      ing('beet', '3 cooked', '3 virti'),
      ing('walnuts', 'a handful', 'sauja'),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('oil', '1 tbsp', '1 š.'),
      ing('lettuce', 'a few leaves', 'keli lapai', true),
    ],
    steps: [
      b('Dice or grate the cooked beetroot and warm it gently.', 'Virtus burokėlius supjaustyk ar sutarkuok ir lengvai pašildyk.'),
      b('Mix with crushed walnuts, garlic, oil and salt. Serve on salad leaves.', 'Sumaišyk su smulkintais riešutais, česnaku, aliejumi ir druska. Patiek ant salotų lapų.'),
    ],
    why: b('Vegetables with nuts and fat — all symbiosis. Beetroot supports the liver overnight.', 'Daržovės su riešutais ir riebalais — visa simbiozė. Burokėliai naktį palaiko kepenis.'),
  },
  {
    id: 'chicken-soup', icon: '🍲', meals: ['dinner', 'lunch'], minutes: 40,
    name: b('Chicken and vegetable soup (no noodles)', 'Vištienos ir daržovių sriuba (be makaronų)'),
    ingredients: [
      ing('chicken', '300 g', '300 g'),
      ing('carrot', '2', '2'),
      ing('onion', '1', '1'),
      ing('celery', '1–2 stalks', '1–2 stiebai', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Cover the chicken with 1.5 l of cold water, bring to the boil, skim, and simmer 20 minutes.', 'Vištieną užpilk 1,5 l šalto vandens, užvirink, nugriebk putas ir virk 20 min.'),
      b('Add sliced carrots, onion and celery, salt and a bay leaf; cook 15 minutes more.', 'Sudėk pjaustytas morkas, svogūną ir salierą, druskos ir lauro lapą; virk dar 15 min.'),
      b('Serve with lots of dill. Leave out noodles or bread so protein and starch don’t meet.', 'Patiek su gausiai krapų. Makaronų ar duonos nedėk — kad nesusitiktų baltymai ir krakmolas.'),
    ],
    why: b('A light, warming protein-and-vegetable soup — easy on digestion at night.', 'Lengva, šildanti baltymų ir daržovių sriuba — naktį nevargina virškinimo.'),
  },
  {
    id: 'chicken-peppers', icon: '🍗', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Pan-fried chicken with peppers and broccoli', 'Keptuvėje kepta vištiena su paprikomis ir brokoliais'),
    ingredients: [
      ing('chicken', '300 g', '300 g'),
      ing('pepper', '1–2', '1–2'),
      ing('broccoli', '½ head', '½ galvos'),
      ing('onion', '1', '1', true),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oil', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Cut the chicken into strips and fry in a hot pan with a little oil for 5–6 minutes.', 'Vištieną supjaustyk juostelėmis ir kepk įkaitintoje keptuvėje su trupučiu aliejaus 5–6 min.'),
      b('Add pepper strips, broccoli florets, onion and garlic; fry 5 more minutes, stirring.', 'Sudėk paprikų juosteles, brokolių žiedynus, svogūną ir česnaką; kepk dar 5 min. maišydamas.'),
      b('Season with salt, pepper and a pinch of paprika.', 'Pagardink druska, pipirais ir žiupsneliu maltos paprikos.'),
    ],
    why: b('Meat with vegetables, no side of rice or potatoes — a clean, light plate.', 'Mėsa su daržovėmis, be ryžių ar bulvių garnyro — švari, lengva lėkštė.'),
  },
  {
    id: 'meatballs-tomato', icon: '🍅', meals: ['dinner', 'lunch'], minutes: 35,
    name: b('Meatballs in tomato sauce with zucchini', 'Mėsos kukuliai pomidorų padaže su cukinija'),
    ingredients: [
      ing('meat', '400 g mince', '400 g faršo'),
      ing('tomato', '4 (or a can)', '4 (arba skardinė)'),
      ing('onion', '1', '1'),
      ing('zucchini', '1', '1', true),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Mix the mince with half the onion (grated), salt and herbs; roll into small balls.', 'Faršą sumaišyk su puse tarkuoto svogūno, druska ir žolelėmis; suformuok mažus kukulius.'),
      b('Soften the rest of the onion and garlic, add tomatoes and diced zucchini, simmer 5 minutes.', 'Suminkštink likusį svogūną ir česnaką, sudėk pomidorus ir kubeliais pjaustytą cukiniją, troškink 5 min.'),
      b('Lay the meatballs in the sauce, cover and simmer 15–20 minutes. Serve without pasta, with salad.', 'Sudėk kukulius į padažą, uždenk ir troškink 15–20 min. Patiek be makaronų, su salotomis.'),
    ],
    why: b('No breadcrumbs or pasta: meat stays with vegetables only.', 'Be džiūvėsėlių ir makaronų: mėsa lieka tik su daržovėmis.'),
  },
  {
    id: 'fish-cakes', icon: '🐟', meals: ['dinner'], minutes: 25,
    name: b('Fish cakes with dill', 'Žuvies kotletai su krapais'),
    ingredients: [
      ing('fish', '400 g fillet', '400 g filė'),
      ing('eggs', '1', '1'),
      ing('onion', '1', '1'),
      ing('dill', 'a big handful', 'didelė sauja', true),
      ing('oil', 'for the pan', 'kepimui', true),
      ing('cucumber', 'for a side salad', 'salotoms šalia', true),
    ],
    steps: [
      b('Finely chop or mince the fish with the onion; mix in the egg, dill, salt and pepper.', 'Žuvį su svogūnu smulkiai sukapok ar sumalk; įmaišyk kiaušinį, krapus, druską ir pipirus.'),
      b('Shape small cakes with wet hands and fry 3–4 minutes each side (or bake at 200 °C for 15 minutes).', 'Šlapiomis rankomis suformuok kotletukus ir kepk po 3–4 min. iš kiekvienos pusės (arba 200 °C orkaitėje 15 min.).'),
      b('Serve with cucumber salad.', 'Patiek su agurkų salotomis.'),
    ],
    why: b('Fish and egg are both protein — a fine pair. No flour or bread needed.', 'Žuvis ir kiaušinis — abu baltymai, dera. Miltų ar duonos nereikia.'),
  },
  {
    id: 'herring-beet', icon: '🐟', meals: ['dinner', 'lunch'], minutes: 10,
    name: b('Herring with beetroot and onion (no potatoes)', 'Silkė su burokėliais ir svogūnais (be bulvių)'),
    ingredients: [
      ing('herring', '2 fillets', '2 filė'),
      ing('beet', '2 cooked', '2 virti'),
      ing('onion', '1', '1'),
      ing('oil', '1 tbsp', '1 š.', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Cut the herring into pieces, slice the onion into thin rings.', 'Silkę supjaustyk gabalėliais, svogūną — plonais žiedais.'),
      b('Dice the beetroot, dress with oil; lay the herring and onion on top, sprinkle with dill.', 'Burokėlius supjaustyk kubeliais, apšlakstyk aliejumi; ant viršaus sudėk silkę ir svogūnus, pabarstyk krapais.'),
    ],
    why: b('The Lithuanian classic without boiled potatoes — fish with vegetables combines well.', 'Lietuviška klasika be virtų bulvių — žuvis su daržovėmis dera gerai.'),
  },
  {
    id: 'egg-salad', icon: '🥗', meals: ['dinner', 'lunch'], minutes: 15,
    name: b('Egg and cucumber salad with herbs', 'Kiaušinių ir agurkų salotos su žolelėmis'),
    ingredients: [
      ing('eggs', '3', '3'),
      ing('cucumber', '1', '1'),
      ing('lettuce', 'a bowl', 'dubenėlis'),
      ing('radish', '4–5', '4–5', true),
      ing('dill', 'a handful', 'saujelė', true),
      ing('sourCream', '2 tbsp (or oil)', '2 š. (arba aliejaus)', true),
    ],
    steps: [
      b('Hard-boil the eggs (9 minutes), cool and quarter them.', 'Kiaušinius virk kietai (9 min.), atvėsink ir supjaustyk ketvirčiais.'),
      b('Mix salad leaves, cucumber, radishes and dill; top with the eggs and a spoon of sour cream.', 'Sumaišyk salotų lapus, agurką, ridikėlius ir krapus; ant viršaus sudėk kiaušinius ir šaukštą grietinės.'),
    ],
    why: b('Protein with fresh vegetables — light enough for a late dinner.', 'Baltymai su šviežiomis daržovėmis — pakankamai lengva ir vėlesnei vakarienei.'),
  },
  {
    id: 'zucchini-bake', icon: '🧀', meals: ['dinner'], minutes: 35,
    name: b('Zucchini and tomato bake with cheese', 'Cukinijų ir pomidorų apkepas su sūriu'),
    ingredients: [
      ing('zucchini', '2', '2'),
      ing('tomato', '2–3', '2–3'),
      ing('eggs', '2', '2'),
      ing('cheese', '80 g', '80 g'),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Slice zucchini and tomatoes into rounds and layer them in a baking dish.', 'Cukinijas ir pomidorus supjaustyk griežinėliais ir sluoksniais sudėk į kepimo indą.'),
      b('Whisk eggs with garlic, salt and herbs, pour over, top with grated cheese.', 'Kiaušinius išplak su česnaku, druska ir žolelėmis, užpilk ant daržovių, apibarstyk tarkuotu sūriu.'),
      b('Bake at 190 °C for 25 minutes until golden.', 'Kepk 190 °C orkaitėje 25 min., kol paruduos.'),
    ],
    why: b('A warm, filling dinner without flour: eggs and cheese with vegetables.', 'Šilta, soti vakarienė be miltų: kiaušiniai ir sūris su daržovėmis.'),
  },
  {
    id: 'tofu-veg', icon: '⬜', meals: ['dinner', 'lunch'], minutes: 20,
    name: b('Tofu stir-fry with vegetables and ginger', 'Tofu su daržovėmis ir imbieru'),
    ingredients: [
      ing('tofu', '200 g', '200 g'),
      ing('broccoli', '½ head', '½ galvos'),
      ing('carrot', '1', '1'),
      ing('pepper', '1', '1', true),
      ing('ginger', '2 cm', '2 cm', true),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oil', '1 tbsp', '1 š.'),
    ],
    steps: [
      b('Press the tofu dry, cube it and fry until golden on all sides.', 'Tofu nusausink, supjaustyk kubeliais ir apkepk, kol pagels iš visų pusių.'),
      b('Add carrot strips, broccoli, pepper, ginger and garlic; stir-fry 5 minutes.', 'Sudėk morkų juosteles, brokolius, papriką, imbierą ir česnaką; kepk maišydamas 5 min.'),
      b('Season with soy sauce or salt.', 'Pagardink sojų padažu arba druska.'),
    ],
    why: b('Plant protein with vegetables and a little fat — full symbiosis.', 'Augaliniai baltymai su daržovėmis ir trupučiu riebalų — pilna simbiozė.'),
  },
  {
    id: 'lentil-pumpkin-soup', icon: '🥣', meals: ['dinner', 'lunch'], minutes: 30,
    name: b('Red lentil soup with pumpkin and ginger', 'Raudonųjų lęšių sriuba su moliūgu ir imbieru'),
    ingredients: [
      ing('lentils', '¾ cup', '¾ stiklinės'),
      ing('pumpkin', '300 g', '300 g'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('ginger', '2 cm', '2 cm', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Soften onion, carrot and ginger in oil; add turmeric or cumin if you have them.', 'Aliejuje suminkštink svogūną, morką ir imbierą; jei turi, įberk ciberžolės ar kmynų.'),
      b('Add diced pumpkin, rinsed lentils and 1 l of water; simmer 20 minutes.', 'Sudėk kubeliais pjaustytą moliūgą, nuplautus lęšius ir 1 l vandens; virk 20 min.'),
      b('Blend smooth, salt to taste.', 'Sutrink iki vientisos masės, pasūdyk pagal skonį.'),
    ],
    why: b('Legumes with vegetables, gently spiced — creamy without any cream.', 'Ankštiniai su daržovėmis, švelniai pagardinti — kreminė be grietinėlės.'),
  },
  {
    id: 'bean-beet-salad', icon: '🟣', meals: ['dinner', 'lunch'], minutes: 15,
    name: b('Beetroot and bean salad with pickles (vinaigrette)', 'Burokėlių ir pupelių salotos su raugintais agurkais (vinegretas)'),
    ingredients: [
      ing('beet', '2 cooked', '2 virti'),
      ing('beans', '1 can', '1 skardinė'),
      ing('pickles', '2', '2'),
      ing('onion', '½', '½', true),
      ing('sauerkraut', 'a handful', 'sauja', true),
      ing('oil', '2 tbsp', '2 š.'),
    ],
    steps: [
      b('Dice the beetroot, pickles and onion; rinse the beans.', 'Burokėlius, agurkus ir svogūną supjaustyk kubeliais; pupeles nuplauk.'),
      b('Mix everything with sauerkraut and oil, salt to taste.', 'Viską sumaišyk su raugintais kopūstais ir aliejumi, pasūdyk pagal skonį.'),
    ],
    why: b('Classic vinaigrette without potatoes: beans with vegetables, plus living ferments.', 'Klasikinis vinegretas be bulvių: pupelės su daržovėmis ir gyvi fermentai.'),
  },
  {
    id: 'broccoli-soup', icon: '🥦', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Creamy broccoli soup', 'Trinta brokolių sriuba'),
    ingredients: [
      ing('broccoli', '1 head', '1 galva'),
      ing('onion', '1', '1'),
      ing('potatoes', '1–2 (for creaminess)', '1–2 (tirštumui)'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('seeds', 'to sprinkle', 'pabarstyti', true),
    ],
    steps: [
      b('Soften the onion and garlic in butter, add diced potato and 800 ml of water; cook 10 minutes.', 'Svieste suminkštink svogūną ir česnaką, sudėk kubeliais pjaustytą bulvę ir 800 ml vandens; virk 10 min.'),
      b('Add broccoli florets and cook 7 more minutes — no longer, so it stays green.', 'Sudėk brokolių žiedynus ir virk dar 7 min. — ne ilgiau, kad liktų žali.'),
      b('Blend, salt, serve with seeds.', 'Sutrink, pasūdyk, patiek su sėklomis.'),
    ],
    why: b('Vegetables with a little starch and butter — soft, soothing and filling.', 'Daržovės su trupučiu krakmolo ir sviesto — švelnu, ramina ir pasotina.'),
  },
  {
    id: 'mushroom-soup', icon: '🍄', meals: ['dinner', 'lunch'], minutes: 30,
    name: b('Mushroom soup with potatoes and dill', 'Grybų sriuba su bulvėmis ir krapais'),
    ingredients: [
      ing('mushrooms', '300 g', '300 g'),
      ing('potatoes', '2–3', '2–3'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('butter', '1 tbsp', '1 š.', true),
      ing('sourCream', 'to serve', 'patiekimui', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Fry onion and sliced mushrooms in butter for 5 minutes.', 'Svieste 5 min. pakepink svogūną ir pjaustytus grybus.'),
      b('Add diced potatoes, grated carrot and 1.2 l of water; simmer 20 minutes, salt.', 'Sudėk kubeliais pjaustytas bulves, tarkuotą morką ir 1,2 l vandens; virk 20 min., pasūdyk.'),
      b('Serve with a spoon of sour cream and dill.', 'Patiek su šaukštu grietinės ir krapais.'),
    ],
    why: b('Starch with vegetables and fat — a hearty soup that still combines well.', 'Krakmolas su daržovėmis ir riebalais — soti sriuba, kuri vis tiek dera.'),
  },
  {
    id: 'borscht', icon: '🍲', meals: ['dinner', 'lunch'], minutes: 40,
    name: b('Hot beetroot soup (vegetable borscht)', 'Karšti burokėlių barščiai (daržovių)'),
    ingredients: [
      ing('beet', '3 raw or cooked', '3 žali ar virti'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('cabbage', '¼ head', '¼ galvos', true),
      ing('potatoes', '2', '2', true),
      ing('sourCream', 'to serve', 'patiekimui', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Soften onion and grated carrot in a little oil.', 'Su trupučiu aliejaus suminkštink svogūną ir tarkuotą morką.'),
      b('Add grated beetroot, shredded cabbage, diced potatoes and 1.5 l of water; simmer 25 minutes.', 'Sudėk tarkuotus burokėlius, smulkintus kopūstus, kubeliais pjaustytas bulves ir 1,5 l vandens; virk 25 min.'),
      b('Season with salt, a splash of lemon or vinegar; serve with sour cream and dill.', 'Pagardink druska, trupučiu citrinos ar acto; patiek su grietine ir krapais.'),
    ],
    why: b('A vegetable soup without meat — beetroot and cabbage warm and cleanse.', 'Daržovių sriuba be mėsos — burokėliai ir kopūstai šildo ir valo.'),
  },
  {
    id: 'sauerkraut-soup', icon: '🫙', meals: ['dinner', 'lunch'], minutes: 35,
    name: b('Sauerkraut soup', 'Raugintų kopūstų sriuba'),
    ingredients: [
      ing('sauerkraut', '400 g', '400 g'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('potatoes', '2', '2', true),
      ing('oil', '1 tbsp', '1 š.', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Soften onion and carrot in oil, add the sauerkraut and 1.2 l of water.', 'Aliejuje suminkštink svogūną ir morką, sudėk raugintus kopūstus ir 1,2 l vandens.'),
      b('Add diced potatoes, a bay leaf and peppercorns; simmer 25 minutes.', 'Sudėk kubeliais pjaustytas bulves, lauro lapą ir pipirų; virk 25 min.'),
      b('Before serving stir in a spoon of raw sauerkraut and dill.', 'Prieš patiekdamas įmaišyk šaukštą žalių raugintų kopūstų ir krapų.'),
    ],
    why: b('Warming and sour — good for digestion in the cold season.', 'Šildanti ir rūgštoka — gera virškinimui šaltuoju metų laiku.'),
  },
  {
    id: 'stuffed-peppers', icon: '🫑', meals: ['dinner', 'lunch'], minutes: 50,
    name: b('Peppers stuffed with rice and vegetables', 'Paprikos, įdarytos ryžiais ir daržovėmis'),
    ingredients: [
      ing('pepper', '4', '4'),
      ing('rice', '¾ cup', '¾ stiklinės'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('tomato', '3 (or a can)', '3 (arba skardinė)'),
      ing('oliveOil', '1 tbsp', '1 š.', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Half-cook the rice (10 minutes). Soften onion and grated carrot in oil and mix with the rice and herbs.', 'Ryžius pusiau išvirk (10 min.). Aliejuje suminkštink svogūną ir tarkuotą morką, sumaišyk su ryžiais ir žolelėmis.'),
      b('Cut the tops off the peppers, remove seeds and fill them with the rice.', 'Paprikoms nupjauk viršūnes, išimk sėklas ir prikimšk ryžių.'),
      b('Stand them in a pot, pour over chopped tomatoes and a cup of water; cover and stew 30 minutes.', 'Sustatyk į puodą, užpilk pjaustytais pomidorais ir stikline vandens; uždengtas troškink 30 min.'),
    ],
    why: b('Rice with vegetables instead of mince — the combining-friendly version.', 'Ryžiai su daržovėmis vietoj faršo — derinius atitinkanti versija.'),
  },
  {
    id: 'mushroom-rice', icon: '🍚', meals: ['dinner', 'lunch'], minutes: 30,
    name: b('Mushroom rice (simple risotto)', 'Ryžiai su grybais (paprastas rizotas)'),
    ingredients: [
      ing('rice', '1 cup', '1 stiklinė'),
      ing('mushrooms', '250 g', '250 g'),
      ing('onion', '1', '1'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Fry onion, garlic and mushrooms in butter for 5 minutes.', 'Svieste 5 min. pakepink svogūną, česnaką ir grybus.'),
      b('Stir in the rice, then add 2½ cups of hot water a little at a time, stirring, for 18–20 minutes.', 'Įmaišyk ryžius, tada po truputį pilk 2½ stiklinės karšto vandens, maišydamas, 18–20 min.'),
      b('Salt, add a knob of butter and parsley. No parmesan — keeps it light.', 'Pasūdyk, įdėk gabalėlį sviesto ir petražolių. Be parmezano — taip lengviau.'),
    ],
    why: b('Grain with mushrooms and butter — soft, calming evening food.', 'Kruopos su grybais ir sviestu — švelnus, raminantis vakaro maistas.'),
  },
  {
    id: 'quinoa-veg', icon: '🌾', meals: ['dinner', 'lunch'], minutes: 25,
    name: b('Quinoa with roasted vegetables', 'Bolivinė balanda su keptomis daržovėmis'),
    ingredients: [
      ing('quinoa', '¾ cup', '¾ stiklinės'),
      ing('zucchini', '1', '1'),
      ing('pepper', '1', '1'),
      ing('tomato', '2', '2', true),
      ing('oliveOil', '2 tbsp', '2 š.'),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Rinse the quinoa and cook in 1½ cups of water for 15 minutes.', 'Bolivinę balandą nuplauk ir virk 1½ stiklinės vandens 15 min.'),
      b('Roast chunks of zucchini and pepper with olive oil and salt at 200 °C for 20 minutes.', 'Cukinijų ir paprikų gabalėlius su alyvuogių aliejumi ir druska kepk 200 °C orkaitėje 20 min.'),
      b('Mix with the quinoa, fresh tomatoes and parsley.', 'Sumaišyk su bolivine balanda, šviežiais pomidorais ir petražolėmis.'),
    ],
    why: b('A light, gluten-free grain with vegetables and olive oil.', 'Lengvos kruopos be glitimo su daržovėmis ir alyvuogių aliejumi.'),
  },
  {
    id: 'mash-cabbage', icon: '🥔', meals: ['dinner', 'lunch'], minutes: 35,
    name: b('Potato mash with stewed cabbage', 'Bulvių košė su troškintais kopūstais'),
    ingredients: [
      ing('potatoes', '5–6', '5–6'),
      ing('cabbage', '½ head', '½ galvos'),
      ing('onion', '1', '1'),
      ing('butter', '1–2 tbsp', '1–2 š.'),
      ing('carrot', '1', '1', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Boil the potatoes in salted water, mash with butter and a little of the cooking water (no milk needed).', 'Bulves išvirk pasūdytame vandenyje, sutrink su sviestu ir trupučiu nuoviro (pieno nereikia).'),
      b('Stew shredded cabbage with onion and carrot for 20 minutes.', 'Smulkintus kopūstus troškink su svogūnu ir morka 20 min.'),
      b('Serve together, sprinkled with dill.', 'Patiek kartu, pabarstęs krapais.'),
    ],
    why: b('Potatoes with vegetables and butter, instead of with a cutlet — a homely dish that combines.', 'Bulvės su daržovėmis ir sviestu vietoj kotleto — naminis patiekalas, kuris dera.'),
  },
  {
    id: 'sweet-potato-spinach', icon: '🍠', meals: ['dinner', 'lunch'], minutes: 40,
    name: b('Baked sweet potato with spinach and avocado', 'Keptas batatas su špinatais ir avokadu'),
    ingredients: [
      ing('sweetPotato', '2', '2'),
      ing('spinach', '2 handfuls', '2 saujos'),
      ing('avocado', '1', '1', true),
      ing('oliveOil', '1 tbsp', '1 š.'),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Bake the sweet potatoes whole at 200 °C for 35–40 minutes until soft.', 'Batatus kepk sveikus 200 °C orkaitėje 35–40 min., kol suminkštės.'),
      b('Wilt the spinach with olive oil and salt.', 'Špinatus suvytink su alyvuogių aliejumi ir druska.'),
      b('Split the potatoes, fill with spinach and avocado, sprinkle with seeds.', 'Batatus perpjauk, įdėk špinatų ir avokado, pabarstyk sėklomis.'),
    ],
    why: b('Starch with greens and good fats — sweet, grounding and easy to digest.', 'Krakmolas su žalumynais ir gerais riebalais — saldu, įžeminanti ir lengvai virškinama.'),
  },
  {
    id: 'ratatouille', icon: '🍆', meals: ['dinner', 'lunch'], minutes: 35,
    name: b('Stewed zucchini, pepper and tomato (ratatouille style)', 'Troškintos cukinijos, paprikos ir pomidorai (ratatouille)'),
    ingredients: [
      ing('zucchini', '2', '2'),
      ing('pepper', '1–2', '1–2'),
      ing('tomato', '3–4', '3–4'),
      ing('onion', '1', '1'),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('oliveOil', '2 tbsp', '2 š.'),
    ],
    steps: [
      b('Soften onion and garlic in olive oil, add diced pepper and zucchini; cook 5 minutes.', 'Alyvuogių aliejuje suminkštink svogūną ir česnaką, sudėk kubeliais pjaustytas paprikas ir cukinijas; kepk 5 min.'),
      b('Add chopped tomatoes, salt and dried herbs; cover and stew 20 minutes.', 'Sudėk pjaustytus pomidorus, druskos ir džiovintų žolelių; uždengęs troškink 20 min.'),
      b('Eat on its own, or with a fried egg, buckwheat or fish — it goes with any one of them.', 'Valgyk vieną arba su kiaušiniu, grikiais ar žuvimi — dera su bet kuriuo vienu iš jų.'),
    ],
    why: b('Vegetables only — a universal partner for any single protein or grain.', 'Vien daržovės — universalus partneris bet kuriam vienam baltymui ar kruopoms.'),
  },
  {
    id: 'roast-cauliflower', icon: '🥦', meals: ['dinner', 'lunch'], minutes: 30,
    name: b('Roasted cauliflower with turmeric and garlic', 'Keptas žiedinis kopūstas su ciberžole ir česnaku'),
    ingredients: [
      ing('cauliflower', '1 head', '1 galva'),
      ing('oliveOil', '2 tbsp', '2 š.'),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('parsley', 'a handful', 'saujelė', true),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Break the cauliflower into florets, toss with olive oil, garlic, salt, turmeric and black pepper.', 'Žiedinį kopūstą išardyk žiedynais, sumaišyk su alyvuogių aliejumi, česnaku, druska, ciberžole ir juodaisiais pipirais.'),
      b('Roast at 210 °C for 20–25 minutes until golden at the edges.', 'Kepk 210 °C orkaitėje 20–25 min., kol kraštai paruduos.'),
      b('Sprinkle with parsley and seeds.', 'Pabarstyk petražolėmis ir sėklomis.'),
    ],
    why: b('Vegetables and fat; black pepper makes turmeric many times more available.', 'Daržovės ir riebalai; juodieji pipirai kelis kartus padidina ciberžolės įsisavinimą.'),
  },
  {
    id: 'cabbage-carrot-salad', icon: '🥬', meals: ['lunch', 'dinner'], minutes: 10,
    name: b('Cabbage and carrot salad', 'Kopūstų ir morkų salotos'),
    ingredients: [
      ing('cabbage', '¼ head', '¼ galvos'),
      ing('carrot', '2', '2'),
      ing('oil', '1–2 tbsp', '1–2 š.'),
      ing('dill', 'a handful', 'saujelė', true),
      ing('lemon', '½', '½', true),
    ],
    steps: [
      b('Finely shred the cabbage, sprinkle with salt and crush with your hands until it softens.', 'Kopūstus plonai supjaustyk, pabarstyk druska ir rankomis paspaudyk, kol suminkštės.'),
      b('Add grated carrots, oil, dill and a little lemon juice.', 'Įdėk tarkuotų morkų, aliejaus, krapų ir trupučiu citrinos sulčių.'),
    ],
    why: b('A raw side that suits any main — fish, eggs, grains or potatoes.', 'Žalias priedas, tinkantis prie bet kurio pagrindinio — žuvies, kiaušinių, kruopų ar bulvių.'),
  },
  // ---------- Breakfast & lunch ----------
  {
    id: 'scrambled-tomato', icon: '🍳', meals: ['breakfast', 'dinner'], minutes: 10,
    name: b('Scrambled eggs with tomatoes and onion', 'Plakta kiaušinienė su pomidorais ir svogūnais'),
    ingredients: [
      ing('eggs', '2–3', '2–3'),
      ing('tomato', '1–2', '1–2'),
      ing('onion', '½', '½', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
      ing('parsley', 'a little', 'truputis', true),
    ],
    steps: [
      b('Soften the onion in butter, add diced tomato for 2 minutes.', 'Svieste suminkštink svogūną, sudėk kubeliais pjaustytą pomidorą ir pakepink 2 min.'),
      b('Pour in the beaten eggs and stir gently over low heat until just set. Eat without bread.', 'Supilk išplaktus kiaušinius ir švelniai maišyk ant mažos ugnies, kol sustings. Valgyk be duonos.'),
    ],
    why: b('Eggs with vegetables — quick protein that combines well.', 'Kiaušiniai su daržovėmis — greiti baltymai, kurie dera.'),
  },
  {
    id: 'cottage-berries', icon: '🫐', meals: ['breakfast'], minutes: 5,
    name: b('Cottage cheese with berries', 'Varškė su uogomis'),
    ingredients: [
      ing('cottage', '200 g', '200 g'),
      ing('berries', 'a handful', 'sauja'),
      ing('honey', '1 tsp', '1 š-ėlis', true),
      ing('flax', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Top cottage cheese with berries (thawed if frozen), a little honey and flax.', 'Varškę papuošk uogomis (jei šaldytos — atšildytomis), trupučiu medaus ir sėmenimis.'),
    ],
    why: b('Protein with sour berries is moderate — better than with sweet jam or bread.', 'Baltymai su rūgščiomis uogomis dera saikingai — geriau nei su uogiene ar duona.'),
  },
  {
    id: 'berries-nuts', icon: '🫐', meals: ['breakfast'], minutes: 5,
    name: b('Berries with walnuts and seeds', 'Uogos su riešutais ir sėklomis'),
    ingredients: [
      ing('berries', '1 bowl', '1 dubenėlis'),
      ing('walnuts', 'a handful', 'sauja'),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Mix berries with soaked walnuts and seeds. Eat slowly, on its own.', 'Sumaišyk uogas su mirkytais riešutais ir sėklomis. Valgyk lėtai, atskirai nuo kito maisto.'),
    ],
    why: b('Shelton’s favourite pairing: acid fruit helps nuts digest. Mostly raw — very high vibration.', 'Sheltono mėgstamas derinys: rūgštūs vaisiai padeda virškinti riešutus. Beveik viskas žalia — labai aukšta vibracija.'),
  },
  {
    id: 'apple-walnuts', icon: '🍎', meals: ['breakfast'], minutes: 5,
    name: b('Apple with walnuts and cinnamon', 'Obuolys su graikiniais riešutais ir cinamonu'),
    ingredients: [
      ing('apple', '1–2', '1–2'),
      ing('walnuts', 'a handful', 'sauja'),
      ing('honey', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Slice the apple, add walnuts, sprinkle cinnamon, drizzle with a little honey.', 'Supjaustyk obuolį, įdėk riešutų, pabarstyk cinamonu, užlašink truputį medaus.'),
    ],
    why: b('Sour fruit + nuts — symbiosis. No bread or porridge alongside.', 'Rūgštūs vaisiai + riešutai — simbiozė. Be duonos ar košės šalia.'),
  },
  {
    id: 'kefir-banana', icon: '🥤', meals: ['breakfast'], minutes: 5,
    name: b('Kefir smoothie with banana and flax', 'Kefyro kokteilis su bananu ir sėmenimis'),
    ingredients: [
      ing('kefir', '1 glass', '1 stiklinė'),
      ing('banana', '1', '1'),
      ing('flax', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Blend everything and drink slowly, on its own.', 'Viską sutrink ir gerk lėtai, atskirai nuo kito maisto.'),
    ],
    why: b('Live kefir cultures plus banana and flax fibre that feeds them.', 'Gyvos kefyro kultūros ir banano bei sėmenų skaidulos, kuriomis jos minta.'),
  },
  {
    id: 'millet-butter', icon: '🌾', meals: ['breakfast'], minutes: 25,
    name: b('Millet porridge with butter and banana', 'Sorų košė su sviestu ir bananu'),
    ingredients: [
      ing('millet', '½ cup', '½ stiklinės'),
      ing('butter', '1 tsp', '1 š-ėlis'),
      ing('banana', '1', '1', true),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Rinse millet in hot water and cook in 1½ cups of water for 20 minutes.', 'Soras nuplauk karštu vandeniu ir virk 1½ stiklinės vandens 20 min.'),
      b('Add butter, top with banana slices and seeds.', 'Įdėk sviesto, papuošk banano griežinėliais ir sėklomis.'),
    ],
    why: b('Warm, gluten-free grain with fat — sweet banana pairs with it, sour fruit would not.', 'Šiltos kruopos be glitimo su riebalais — saldus bananas dera, rūgštūs vaisiai — ne.'),
  },
  {
    id: 'oats-banana', icon: '🥣', meals: ['breakfast'], minutes: 10,
    name: b('Oat porridge with banana and walnuts', 'Avižinė košė su bananu ir riešutais'),
    ingredients: [
      ing('oats', '½ cup', '½ stiklinės'),
      ing('banana', '1', '1'),
      ing('walnuts', 'a handful', 'saujelė', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
      ing('flax', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Cook oats in water for 5 minutes (or soak overnight).', 'Avižas virk vandenyje 5 min. (arba užmirkyk vakare).'),
      b('Top with sliced banana, walnuts, flax and a little butter.', 'Papuošk banano griežinėliais, riešutais, sėmenimis ir trupučiu sviesto.'),
    ],
    why: b('Sweet banana pairs with grain; sour fruit like apple would clash with the starch.', 'Saldus bananas dera su kruopomis; rūgštūs vaisiai, pvz., obuolys, konfliktuotų su krakmolu.'),
  },
  {
    id: 'buckwheat-kefir', icon: '🌾', meals: ['breakfast', 'lunch'], minutes: 15,
    name: b('Buckwheat with kefir (Lithuanian style)', 'Grikiai su kefyru (lietuviškai)'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('kefir', '1 glass', '1 stiklinė'),
      ing('butter', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Cook buckwheat; add butter.', 'Išvirk grikius; įdėk sviesto.'),
      b('Eat warm with a glass of cold kefir alongside.', 'Valgyk šiltus, užsigerdamas stikline šalto kefyro.'),
    ],
    why: b('A traditional pair — grain with fermented milk is moderate and gentle. Better in the morning than late evening.', 'Tradicinis derinys — kruopos su raugintu pienu dera saikingai. Geriau ryte nei vėlai vakare.'),
  },
  {
    id: 'eggs-avocado', icon: '🥑', meals: ['breakfast'], minutes: 10,
    name: b('Soft-boiled eggs with avocado and cucumber', 'Minkšti kiaušiniai su avokadu ir agurku'),
    ingredients: [
      ing('eggs', '2', '2'),
      ing('avocado', '½', '½', true),
      ing('cucumber', '1', '1'),
      ing('tomato', '1', '1', true),
    ],
    steps: [
      b('Boil the eggs for 6 minutes.', 'Kiaušinius virk 6 min.'),
      b('Serve with sliced avocado, cucumber and tomato, salt and pepper.', 'Patiek su pjaustytu avokadu, agurku ir pomidoru, druska ir pipirais.'),
    ],
    why: b('Protein with vegetables, without bread — a light, long-lasting breakfast.', 'Baltymai su daržovėmis, be duonos — lengvi ir ilgam sotūs pusryčiai.'),
  },
  {
    id: 'rye-avocado', icon: '🍞', meals: ['breakfast', 'lunch'], minutes: 5,
    name: b('Rye bread with avocado and tomato', 'Ruginė duona su avokadu ir pomidoru'),
    ingredients: [
      ing('bread', '2 slices', '2 riekės'),
      ing('avocado', '1', '1'),
      ing('tomato', '1', '1', true),
      ing('seeds', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Mash avocado with salt, spread on bread, top with tomato and seeds.', 'Avokadą sutrink su druska, užtepk ant duonos, papuošk pomidoru ir sėklomis.'),
    ],
    why: b('Starch with fat and vegetables — a good combination; keep cheese and ham for another meal.', 'Krakmolas su riebalais ir daržovėmis — geras derinys; sūrį ir kumpį palik kitam valgiui.'),
  },
  {
    id: 'chickpea-salad', icon: '🥗', meals: ['lunch'], minutes: 10,
    name: b('Chickpea salad with vegetables', 'Avinžirnių salotos su daržovėmis'),
    ingredients: [
      ing('chickpeas', '1 can', '1 skardinė'),
      ing('cucumber', '1', '1'),
      ing('tomato', '2', '2'),
      ing('lettuce', 'a bowl', 'dubenėlis', true),
      ing('oliveOil', '2 tbsp', '2 š.'),
      ing('lemon', '½', '½', true),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Mix chickpeas with chopped cucumber, tomato, salad leaves and parsley.', 'Avinžirnius sumaišyk su pjaustytu agurku, pomidorais, salotų lapais ir petražolėmis.'),
      b('Dress with olive oil, lemon juice and salt.', 'Pagardink alyvuogių aliejumi, citrinos sultimis ir druska.'),
    ],
    why: b('Raw vegetables at midday when digestion is strongest; lemon helps absorb the iron.', 'Žalios daržovės vidurdienį, kai virškinimas stipriausias; citrina padeda įsisavinti geležį.'),
  },
]

function recipeHarmony(r: RecipeDef): number {
  const groups = [
    ...new Set(
      r.ingredients
        .filter((i) => !PANTRY_BY_ID.get(i.id)?.condiment)
        .map((i) => pantryGroup(i.id))
        .filter((g): g is GroupId => g !== null),
    ),
  ]
  return harmonyOf(groups).harmony
}

export const RECIPES: Recipe[] = RECIPE_DEFS.map((r) => {
  for (const i of r.ingredients) if (!PANTRY_BY_ID.has(i.id)) throw new Error(`Unknown pantry item ${i.id} in ${r.id}`)
  return { ...r, harmony: recipeHarmony(r) }
})

/**
 * Families of pantry items that can stand in for each other in a recipe
 * (any carrot-like vegetable for another, rice for buckwheat, salmon for white fish).
 * Vegetables (non-seasoning) form one family automatically.
 */
const FAMILIES: string[][] = [
  ['fish', 'salmon'],
  ['chicken', 'meat'],
  ['buckwheat', 'rice', 'millet', 'quinoa'],
  ['potatoes', 'sweetPotato'],
  ['lentils', 'beans', 'chickpeas'],
  ['butter', 'oliveOil', 'oil'],
  ['kefir', 'yogurt'],
  ['walnuts', 'seeds'],
  ['cottage', 'cheese'],
]

function familyOf(id: string): string[] {
  const fam = FAMILIES.find((f) => f.includes(id))
  if (fam) return fam
  const p = PANTRY_BY_ID.get(id)
  if (p && !p.condiment && pantryGroup(id) === 'veg' && id !== 'sauerkraut' && id !== 'pickles')
    return PANTRY.filter((x) => !x.condiment && pantryGroup(x.id) === 'veg' && x.id !== 'sauerkraut' && x.id !== 'pickles').map((x) => x.id)
  return [id]
}

export type RecipeMatch = {
  recipe: Recipe
  have: string[]
  missing: string[]
  missingOptional: string[]
  /** For a missing ingredient: things the user has that can replace it. */
  subs: Record<string, string[]>
  /** Share of required ingredients covered (owned = 1, replaceable = ¾), 0–1. */
  coverage: number
  /** Required ingredients owned / total. */
  haveRequired: number
  required: number
}

/** Recipes for a meal ranked by how much of them the user already has. */
export function matchRecipes(ids: string[], meal: Meal): RecipeMatch[] {
  const owned = new Set(ids)
  return RECIPES.filter((r) => r.meals.includes(meal))
    .map((recipe) => {
      const inRecipe = new Set(recipe.ingredients.map((i) => i.id))
      const req = recipe.ingredients.filter((i) => !i.optional).map((i) => i.id)
      const opt = recipe.ingredients.filter((i) => i.optional).map((i) => i.id)
      const have = recipe.ingredients.map((i) => i.id).filter((id) => owned.has(id))
      const missing = req.filter((id) => !owned.has(id))
      const missingOptional = opt.filter((id) => !owned.has(id))
      const used = new Set<string>()
      const subs: Record<string, string[]> = {}
      for (const id of missing) {
        const alt = familyOf(id).filter((x) => x !== id && owned.has(x) && !inRecipe.has(x) && !used.has(x)).slice(0, 2)
        if (alt.length) {
          subs[id] = alt
          used.add(alt[0])
        }
      }
      // A swap within a close family (rice for buckwheat) counts ¾; any-vegetable swaps ½.
      const subScore = Object.keys(subs).reduce((t, id) => t + (FAMILIES.some((f) => f.includes(id)) ? 0.75 : 0.5), 0)
      const haveRequired = req.length - missing.length
      return {
        recipe, have, missing, missingOptional, subs,
        coverage: (haveRequired + subScore) / req.length,
        haveRequired,
        required: req.length,
      }
    })
    // Show a recipe when its main ingredient is at hand (or has a close stand-in), or most of it is.
    .filter((m) => {
      const main = m.recipe.ingredients[0].id
      const closeSub = main in m.subs && FAMILIES.some((f) => f.includes(main))
      return owned.has(main) || closeSub || m.haveRequired / m.required >= 0.6
    })
    .sort(
      (a, b) =>
        // Recipes built on something you have come first.
        Number(owned.has(b.recipe.ingredients[0].id)) - Number(owned.has(a.recipe.ingredients[0].id)) ||
        b.coverage - a.coverage ||
        b.have.length - a.have.length ||
        a.recipe.minutes - b.recipe.minutes,
    )
}
