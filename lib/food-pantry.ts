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

import { tierOf, type Bi, type FoodTier } from './food-angstrom'
import { FOOD_GROUPS, getPair, type GroupId, type Rating } from './food-combining'
import { food } from './food-db'
import type { Meal } from './food-menu'
import { EXTRA_RECIPES } from './food-recipes-extra'

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
  I('cottage', '🤍', 'Cottage cheese', 'Varškė', 'cottage', ['curd', 'quark', 'varškės']),
  I('cheese', '🧀', 'Cheese', 'Sūris', 'hardCheese', ['sūrio']),
  I('chicken', '🍗', 'Chicken / turkey', 'Vištiena / kalakutiena', 'chicken', ['višta', 'kalakutiena', 'turkey', 'paukštiena']),
  I('meat', '🥩', 'Meat (pork, beef)', 'Mėsa (kiauliena, jautiena)', 'meatStewed', ['kiauliena', 'jautiena', 'faršas', 'mince', 'pork', 'beef']),
  I('fish', '🐟', 'White fish', 'Balta žuvis', 'fishSteamed', ['žuvis', 'menkė', 'lydeka', 'cod']),
  I('salmon', '🍣', 'Salmon', 'Lašiša', 'salmon', ['upėtakis', 'trout']),
  I('herring', '🐟', 'Herring', 'Silkė', 'herring'),
  I('shrimp', '🦐', 'Shrimp', 'Krevetės', 'shrimp', ['krevetė', 'jūros gėrybės', 'prawns']),
  // Legumes
  I('lentils', '🫘', 'Lentils', 'Lęšiai', 'lentils'),
  I('beans', '🫘', 'Beans', 'Pupelės', 'beans'),
  I('chickpeas', '🧆', 'Chickpeas', 'Avinžirniai', 'chickpeas', ['humusas']),
  I('tofu', '⬜', 'Tofu', 'Tofu', 'tofu'),
  // Grains & starch
  I('buckwheat', '🌾', 'Buckwheat', 'Grikiai', 'buckwheat', ['grikių', 'kasha']),
  I('greenBuckwheat', '🌱', 'Green (raw) buckwheat', 'Žali grikiai', 'buckwheatGreen', ['žalių grikių']),
  I('buckwheatFlour', '🌾', 'Buckwheat flour', 'Grikių miltai', 'buckwheat', ['miltai']),
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
  I('kale', '🥬', 'Kale', 'Lapiniai kopūstai', 'kale', ['kale', 'garbanotieji']),
  I('sorrel', '🌿', 'Sorrel', 'Rūgštynės', 'sorrel', ['rūgštynių']),
  I('nettle', '🌱', 'Young nettles', 'Dilgėlės', 'nettle', ['dilgėlė', 'dilgėlių']),
  I('asparagus', '🌱', 'Asparagus', 'Šparagai', 'asparagus', ['šparagas']),
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
  I('coconutOil', '🥥', 'Coconut oil', 'Kokosų aliejus', 'coconutOil', ['kokosų']),
  I('sourCream', '🥛', 'Sour cream', 'Grietinė', 'sourCream', ['grietinėlė', 'cream']),
  I('avocado', '🥑', 'Avocado', 'Avokadas', 'avocado'),
  // Nuts & seeds
  I('walnuts', '🌰', 'Walnuts', 'Graikiniai riešutai', 'walnuts', ['riešutai', 'nuts']),
  I('seeds', '🌻', 'Sunflower / pumpkin seeds', 'Saulėgrąžos / moliūgų sėklos', 'pumpkinSeeds', ['sėklos', 'saulėgrąžos', 'seeds']),
  I('flax', '🟤', 'Flaxseed', 'Linų sėmenys', 'flax', ['sėmenys']),
  I('almonds', '🌰', 'Almonds', 'Migdolai', 'almonds', ['migdolas']),
  I('sesame', '⚪', 'Sesame / tahini', 'Sezamas / tahinis', 'sesame', ['sezamo', 'tahini', 'tahinis']),
  I('chia', '⚫', 'Chia seeds', 'Chia sėklos', 'chia', ['čija', 'šalavijų']),
  // Dairy
  I('kefir', '🥛', 'Kefir', 'Kefyras', 'kefir', ['rūgpienis', 'pasukos']),
  I('yogurt', '🥛', 'Yogurt', 'Jogurtas', 'yogurt'),
  I('milk', '🥛', 'Milk', 'Pienas', 'milkPast'),
  // Fruit
  I('apple', '🍎', 'Apples', 'Obuoliai', 'apple', ['obuolys']),
  I('banana', '🍌', 'Bananas', 'Bananai', 'banana', ['bananas']),
  I('pear', '🍐', 'Pears', 'Kriaušės', 'pear', ['kriaušė']),
  I('orange', '🍊', 'Oranges', 'Apelsinai', 'orange', ['apelsinas', 'mandarinai', 'citrusai']),
  I('plum', '🟣', 'Plums', 'Slyvos', 'plum', ['slyva']),
  I('driedFruit', '🍇', 'Raisins / dates', 'Razinos / datulės', 'raisins', ['razinos', 'datulės', 'džiovinti vaisiai', 'dates', 'raisins', 'figos']),
  I('berries', '🫐', 'Berries', 'Uogos', 'frozenBerries', ['mėlynės', 'braškės', 'avietės', 'spanguolės']),
  I('lemon', '🍋', 'Lemon', 'Citrina', 'lemon', ['citrinos', 'laimas', 'lime'], true),
  I('honey', '🍯', 'Honey', 'Medus', 'honey'),
  I('cinnamon', '🟫', 'Cinnamon / spices', 'Cinamonas / prieskoniai', 'spices', ['cinamonas', 'kardamonas', 'ciberžolė', 'prieskoniai'], true),
]

export const PANTRY_BY_ID = new Map(PANTRY.map((p) => [p.id, p]))

export function pantryGroup(id: string): GroupId | null {
  const p = PANTRY_BY_ID.get(id)
  return p ? food(p.foodId).group : null
}

export const SHELVES: PantryShelf[] = [
  { id: 'protein', name: b('Protein', 'Baltymai'), items: ['eggs', 'cottage', 'cheese', 'chicken', 'meat', 'fish', 'salmon', 'herring', 'shrimp'] },
  { id: 'legumes', name: b('Legumes', 'Ankštiniai'), items: ['lentils', 'beans', 'chickpeas', 'tofu'] },
  { id: 'starch', name: b('Grains & potatoes', 'Grūdai ir bulvės'), items: ['buckwheat', 'greenBuckwheat', 'buckwheatFlour', 'rice', 'oats', 'millet', 'quinoa', 'pasta', 'bread', 'potatoes', 'sweetPotato'] },
  { id: 'veg', name: b('Vegetables', 'Daržovės'), items: ['carrot', 'onion', 'garlic', 'cabbage', 'beet', 'zucchini', 'pumpkin', 'tomato', 'cucumber', 'pepper', 'broccoli', 'cauliflower', 'spinach', 'kale', 'sorrel', 'nettle', 'asparagus', 'lettuce', 'mushrooms', 'radish', 'celery', 'peas', 'sauerkraut', 'pickles', 'dill', 'parsley', 'ginger'] },
  { id: 'fat', name: b('Fats', 'Riebalai'), items: ['butter', 'oliveOil', 'oil', 'coconutOil', 'sourCream', 'avocado'] },
  { id: 'nuts', name: b('Nuts & seeds', 'Riešutai ir sėklos'), items: ['walnuts', 'almonds', 'seeds', 'flax', 'sesame', 'chia'] },
  { id: 'dairy', name: b('Milk & kefir', 'Pienas ir kefyras'), items: ['kefir', 'yogurt', 'milk'] },
  { id: 'fruit', name: b('Fruit & sweet', 'Vaisiai ir saldu'), items: ['apple', 'pear', 'orange', 'plum', 'banana', 'driedFruit', 'berries', 'lemon', 'honey', 'cinnamon'] },
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
  /** Gram-weighted ångström value of the required ingredients (estimated weights). */
  angstrom: number
  tierId: FoodTier['id']
}

type RecipeDef = Omit<Recipe, 'harmony' | 'angstrom' | 'tierId'>

const ing = (id: string, en: string, lt: string, optional = false): RecipeIngredient => ({ id, amount: b(en, lt), optional })

const RECIPE_DEFS: RecipeDef[] = [
  // ---------- Dinner ----------
  {
    id: 'buckwheat-veg', icon: '🌾', meals: ['dinner', 'lunch', 'breakfast'], minutes: 25,
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
    id: 'buckwheat-mushrooms', icon: '🍄', meals: ['dinner', 'lunch'], minutes: 25,
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
  // ---------- Buckwheat in every combination ----------
  {
    id: 'bw-pumpkin', icon: '🎃', meals: ['breakfast', 'dinner'], minutes: 25,
    name: b('Buckwheat porridge with baked pumpkin and butter', 'Grikių košė su keptu moliūgu ir sviestu'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('pumpkin', '200 g', '200 g'),
      ing('butter', '1 tsp', '1 š-ėlis'),
      ing('seeds', '1 tbsp', '1 š.', true),
      ing('cinnamon', 'a pinch', 'žiupsnelis', true),
    ],
    steps: [
      b('Cook the buckwheat with diced pumpkin in 1¼ cups of water for 15 minutes (the pumpkin melts into it).', 'Grikius virk kartu su kubeliais pjaustytu moliūgu 1¼ stiklinės vandens 15 min. (moliūgas ištirpsta košėje).'),
      b('Stir in butter and cinnamon, sprinkle with seeds.', 'Įmaišyk sviesto ir cinamono, pabarstyk sėklomis.'),
    ],
    why: b('Grain + vegetable + fat — full symbiosis, sweet without sugar.', 'Kruopos + daržovė + riebalai — pilna simbiozė, saldu be cukraus.'),
  },
  {
    id: 'bw-green-banana', icon: '🍌', meals: ['breakfast'], minutes: 5,
    name: b('Raw green-buckwheat porridge with banana', 'Žalių grikių košė su bananu (be virimo)'),
    ingredients: [
      ing('greenBuckwheat', '½ cup, soaked overnight', '½ stiklinės, mirkytų per naktį'),
      ing('banana', '1', '1'),
      ing('flax', '1 tbsp', '1 š.', true),
      ing('cinnamon', 'a pinch', 'žiupsnelis', true),
    ],
    steps: [
      b('Soak green buckwheat overnight, rinse well in the morning.', 'Žalius grikius užmirkyk vakare, ryte gerai perplauk.'),
      b('Blend with banana, cinnamon and a little water into a creamy porridge; top with flax.', 'Sutrink su bananu, cinamonu ir trupučiu vandens iki kreminės košės; pabarstyk sėmenimis.'),
    ],
    why: b('Living, unheated grain — the highest-vibration breakfast from buckwheat. Sweet fruit suits grain.', 'Gyvos, nekaitintos kruopos — aukščiausios vibracijos grikių pusryčiai. Saldūs vaisiai dera su kruopomis.'),
  },
  {
    id: 'bw-milk', icon: '🥛', meals: ['breakfast'], minutes: 20,
    name: b('Buckwheat milk porridge with cinnamon', 'Pieniška grikių košė su cinamonu'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('milk', '1 cup', '1 stiklinė'),
      ing('butter', '1 tsp', '1 š-ėlis', true),
      ing('cinnamon', 'a pinch', 'žiupsnelis', true),
    ],
    steps: [
      b('Cook the buckwheat in 1 cup of water for 10 minutes until the water is absorbed.', 'Grikius virk 1 stiklinėje vandens 10 min., kol susigers vanduo.'),
      b('Pour in the milk, add cinnamon or cardamom and simmer 5 more minutes. Finish with butter.', 'Įpilk pieno, įberk cinamono ar kardamono ir pavirk dar 5 min. Pabaik sviestu.'),
    ],
    why: b('A childhood classic; grain with milk is moderate — spices make it lighter.', 'Vaikystės klasika; kruopos su pienu dera saikingai — prieskoniai palengvina.'),
  },
  {
    id: 'bw-raisins', icon: '🍇', meals: ['breakfast'], minutes: 20,
    name: b('Buckwheat with raisins and walnuts', 'Grikiai su razinomis ir graikiniais riešutais'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('driedFruit', 'a handful', 'saujelė'),
      ing('walnuts', 'a handful', 'saujelė', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Cook the buckwheat; add raisins or chopped dates for the last 5 minutes so they plump up.', 'Išvirk grikius; paskutinėms 5 min. įmesk razinų ar smulkintų datulių, kad išbrinktų.'),
      b('Serve with butter and walnuts.', 'Patiek su sviestu ir riešutais.'),
    ],
    why: b('Sweet dried fruit goes with grain; sour fruit (apple, berries) would not.', 'Saldūs džiovinti vaisiai dera su kruopomis; rūgštūs (obuolys, uogos) — ne.'),
  },
  {
    id: 'bw-avocado', icon: '🥑', meals: ['breakfast', 'lunch'], minutes: 20,
    name: b('Savoury buckwheat with avocado and tomato', 'Sūrūs grikiai su avokadu ir pomidoru'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('avocado', '½–1', '½–1'),
      ing('tomato', '1', '1', true),
      ing('seeds', '1 tbsp', '1 š.', true),
      ing('parsley', 'a little', 'truputis', true),
    ],
    steps: [
      b('Cook the buckwheat and let it cool slightly.', 'Išvirk grikius ir šiek tiek atvėsink.'),
      b('Top with sliced avocado, tomato, seeds, salt and herbs.', 'Papuošk avokado ir pomidoro skiltelėmis, sėklomis, druska ir žolelėmis.'),
    ],
    why: b('Grain with fat and vegetables — a filling breakfast without eggs or cheese.', 'Kruopos su riebalais ir daržovėmis — sotūs pusryčiai be kiaušinių ar sūrio.'),
  },
  {
    id: 'bw-pancakes', icon: '🥞', meals: ['breakfast'], minutes: 25,
    name: b('Buckwheat-banana pancakes (no eggs)', 'Grikių ir bananų blynai (be kiaušinių)'),
    ingredients: [
      ing('buckwheatFlour', '1 cup', '1 stiklinė'),
      ing('banana', '2 ripe', '2 prinokę'),
      ing('oil', 'for the pan', 'kepimui'),
      ing('kefir', '½ cup (or water)', '½ stiklinės (arba vandens)', true),
      ing('cinnamon', 'a pinch', 'žiupsnelis', true),
    ],
    steps: [
      b('Mash the bananas, mix with buckwheat flour, kefir or water, cinnamon and a pinch of salt into a thick batter.', 'Sutrink bananus, sumaišyk su grikių miltais, kefyru ar vandeniu, cinamonu ir žiupsneliu druskos iki tirštos tešlos.'),
      b('Fry small pancakes in a little oil, 2–3 minutes each side.', 'Kepk mažus blynelius su trupučiu aliejaus, po 2–3 min. iš kiekvienos pusės.'),
    ],
    why: b('Banana binds instead of egg — so no protein–starch clash. Gluten-free.', 'Bananas suriša vietoj kiaušinio — todėl nėra baltymų ir krakmolo konflikto. Be glitimo.'),
  },
  {
    id: 'bw-granola', icon: '🥣', meals: ['breakfast'], minutes: 30,
    name: b('Buckwheat granola with seeds and honey', 'Grikių granola su sėklomis ir medumi'),
    ingredients: [
      ing('greenBuckwheat', '1 cup', '1 stiklinė'),
      ing('seeds', '½ cup', '½ stiklinės'),
      ing('oil', '2 tbsp (or coconut oil)', '2 š. (arba kokosų aliejaus)'),
      ing('walnuts', 'a handful', 'sauja', true),
      ing('driedFruit', 'a handful', 'sauja', true),
      ing('honey', '2 tbsp', '2 š.', true),
    ],
    steps: [
      b('Mix green buckwheat, seeds, chopped nuts, oil and a little honey or syrup.', 'Sumaišyk žalius grikius, sėklas, smulkintus riešutus, aliejų ir truputį medaus ar sirupo.'),
      b('Bake at 160 °C for 20 minutes, stirring once; add dried fruit when cool. Eat with banana or on its own.', 'Kepk 160 °C orkaitėje 20 min., kartą pamaišęs; atvėsus įdėk džiovintų vaisių. Valgyk su bananu arba vieną.'),
    ],
    why: b('Crunchy grain with seeds and fat — keep it away from yogurt with berries (milk + sour fruit clash).', 'Traški kruopų ir sėklų granola — tik nevalgyk su jogurtu ir uogomis (pienas + rūgštūs vaisiai nedera).'),
  },
  {
    id: 'bw-spinach', icon: '🌿', meals: ['breakfast', 'lunch', 'dinner'], minutes: 20,
    name: b('Buckwheat with garlicky spinach', 'Grikiai su špinatais ir česnaku'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('spinach', '2 handfuls', '2 saujos'),
      ing('butter', '1 tsp (or olive oil)', '1 š-ėlis (arba alyvuogių aliejaus)'),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Cook the buckwheat. In a pan, warm butter with garlic and wilt the spinach.', 'Išvirk grikius. Keptuvėje pašildyk sviestą su česnaku ir suvytink špinatus.'),
      b('Mix together, salt, sprinkle with seeds.', 'Sumaišyk, pasūdyk, pabarstyk sėklomis.'),
    ],
    why: b('Greens with grain and fat — iron and minerals, full symbiosis.', 'Žalumynai su kruopomis ir riebalais — geležis ir mineralai, pilna simbiozė.'),
  },
  {
    id: 'bw-sauerkraut', icon: '🫙', meals: ['lunch', 'dinner'], minutes: 20,
    name: b('Buckwheat with sauerkraut and onion', 'Grikiai su raugintais kopūstais ir svogūnais'),
    ingredients: [
      ing('buckwheat', '1 cup', '1 stiklinė'),
      ing('sauerkraut', '200 g', '200 g'),
      ing('oil', '1 tbsp', '1 š.'),
      ing('onion', '1', '1', true),
    ],
    steps: [
      b('Cook the buckwheat; gently fry the onion in oil.', 'Išvirk grikius; aliejuje lengvai pakepink svogūną.'),
      b('Mix the warm buckwheat with onion and raw sauerkraut (don’t cook it — keep the living cultures).', 'Šiltus grikius sumaišyk su svogūnais ir žaliais raugintais kopūstais (nevirk — kad liktų gyvos kultūros).'),
    ],
    why: b('Fermented cabbage brings enzymes and probiotics to the grain.', 'Rauginti kopūstai kruopoms prideda fermentų ir probiotikų.'),
  },
  {
    id: 'bw-salad', icon: '🥗', meals: ['lunch'], minutes: 20,
    name: b('Buckwheat salad with cucumber, tomato and dill', 'Grikių salotos su agurku, pomidoru ir krapais'),
    ingredients: [
      ing('buckwheat', '½ cup', '½ stiklinės'),
      ing('cucumber', '1', '1'),
      ing('tomato', '1–2', '1–2'),
      ing('oliveOil', '2 tbsp', '2 š.'),
      ing('dill', 'a handful', 'saujelė', true),
      ing('onion', '¼ (or spring onion)', '¼ (arba laiškinių)', true),
    ],
    steps: [
      b('Cook and cool the buckwheat.', 'Išvirk ir atvėsink grikius.'),
      b('Mix with diced cucumber, tomato, onion, dill, olive oil and salt.', 'Sumaišyk su kubeliais pjaustytu agurku, pomidoru, svogūnu, krapais, alyvuogių aliejumi ir druska.'),
    ],
    why: b('A Lithuanian tabbouleh: grain with plenty of fresh vegetables at midday.', 'Lietuviškas tabulė: kruopos su gausiai šviežių daržovių vidurdienį.'),
  },
  // ---------- Oats, millet, rice ----------
  {
    id: 'oats-pear', icon: '🍐', meals: ['breakfast'], minutes: 30,
    name: b('Baked oats with pear and walnuts', 'Kepta avižinė košė su kriaušėmis ir riešutais'),
    ingredients: [
      ing('oats', '1 cup', '1 stiklinė'),
      ing('pear', '1–2', '1–2'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('walnuts', 'a handful', 'sauja', true),
      ing('cinnamon', '½ tsp', '½ š-ėlio', true),
    ],
    steps: [
      b('Mix oats with 1½ cups of water, cinnamon and a pinch of salt; pour into a buttered dish.', 'Avižas sumaišyk su 1½ stiklinės vandens, cinamonu ir žiupsneliu druskos; supilk į sviestu išteptą indą.'),
      b('Top with pear slices and walnuts, bake at 180 °C for 25 minutes.', 'Ant viršaus sudėk kriaušių skilteles ir riešutus, kepk 180 °C orkaitėje 25 min.'),
    ],
    why: b('Pear is a sweet fruit, so it pairs with grain (an apple would clash).', 'Kriaušė — saldus vaisius, todėl dera su kruopomis (obuolys nederėtų).'),
  },
  {
    id: 'oats-savory', icon: '🌿', meals: ['breakfast'], minutes: 10,
    name: b('Savoury oats with spinach and seeds', 'Sūri avižinė košė su špinatais ir sėklomis'),
    ingredients: [
      ing('oats', '½ cup', '½ stiklinės'),
      ing('spinach', 'a handful', 'sauja'),
      ing('butter', '1 tsp (or olive oil)', '1 š-ėlis (arba alyvuogių aliejaus)'),
      ing('seeds', '1 tbsp', '1 š.', true),
      ing('garlic', '½ clove', '½ skiltelės', true),
    ],
    steps: [
      b('Cook oats in salted water for 5 minutes, stir in spinach at the end.', 'Avižas virk pasūdytame vandenyje 5 min., pabaigoje įmaišyk špinatus.'),
      b('Finish with butter, a little garlic and seeds.', 'Pagardink sviestu, trupučiu česnako ir sėklomis.'),
    ],
    why: b('Grain + greens + fat: a breakfast that keeps you full without eggs.', 'Kruopos + žalumynai + riebalai: pusryčiai, kurie pasotina be kiaušinių.'),
  },
  {
    id: 'oats-kefir', icon: '🥛', meals: ['breakfast'], minutes: 5,
    name: b('Overnight oats with kefir and banana', 'Per naktį mirkytos avižos su kefyru ir bananu'),
    ingredients: [
      ing('oats', '½ cup', '½ stiklinės'),
      ing('kefir', '1 cup', '1 stiklinė'),
      ing('banana', '1', '1'),
      ing('walnuts', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('In the evening pour kefir over the oats and leave in the fridge.', 'Vakare avižas užpilk kefyru ir palik šaldytuve.'),
      b('In the morning top with banana and walnuts.', 'Ryte papuošk bananu ir riešutais.'),
    ],
    why: b('A synbiotic: kefir cultures plus oat and banana fibre that feeds them.', 'Sinbiotikas: kefyro kultūros ir avižų bei banano skaidulos, kuriomis jos minta.'),
  },
  {
    id: 'millet-veg', icon: '🌾', meals: ['lunch', 'dinner'], minutes: 30,
    name: b('Millet with zucchini and carrots', 'Soros su cukinija ir morkomis'),
    ingredients: [
      ing('millet', '1 cup', '1 stiklinė'),
      ing('zucchini', '1', '1'),
      ing('carrot', '1', '1'),
      ing('oliveOil', '1 tbsp', '1 š.'),
      ing('parsley', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Rinse millet in hot water, cook in 2½ cups of water for 20 minutes.', 'Soras nuplauk karštu vandeniu, virk 2½ stiklinės vandens 20 min.'),
      b('Sauté diced zucchini and grated carrot in oil, mix into the millet with herbs.', 'Aliejuje pakepink kubeliais pjaustytą cukiniją ir tarkuotą morką, įmaišyk į soras su žolelėmis.'),
    ],
    why: b('Alkaline, gluten-free grain with vegetables — light and warming.', 'Šarminės kruopos be glitimo su daržovėmis — lengva ir šildo.'),
  },
  {
    id: 'millet-milk', icon: '🥛', meals: ['breakfast'], minutes: 25,
    name: b('Millet milk porridge with raisins', 'Pieniška sorų košė su razinomis'),
    ingredients: [
      ing('millet', '½ cup', '½ stiklinės'),
      ing('milk', '1 cup', '1 stiklinė'),
      ing('driedFruit', 'a handful', 'saujelė', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Cook rinsed millet in 1 cup of water for 15 minutes, add milk and raisins and simmer 5 more.', 'Nuplautas soras virk 1 stiklinėje vandens 15 min., įpilk pieno, įmesk razinų ir pavirk dar 5 min.'),
      b('Finish with butter.', 'Pabaik sviestu.'),
    ],
    why: b('Grain with milk and sweet dried fruit — all moderate pairs, a gentle warm breakfast.', 'Kruopos su pienu ir saldžiais džiovintais vaisiais — saikingi deriniai, švelnūs šilti pusryčiai.'),
  },
  {
    id: 'rice-pumpkin', icon: '🎃', meals: ['breakfast', 'dinner'], minutes: 30,
    name: b('Rice and pumpkin porridge', 'Ryžių košė su moliūgu'),
    ingredients: [
      ing('rice', '½ cup', '½ stiklinės'),
      ing('pumpkin', '300 g', '300 g'),
      ing('butter', '1 tsp', '1 š-ėlis'),
      ing('milk', '½ cup', '½ stiklinės', true),
      ing('cinnamon', 'a pinch', 'žiupsnelis', true),
    ],
    steps: [
      b('Cook rice with diced pumpkin in 2 cups of water for 20–25 minutes until soft.', 'Ryžius su kubeliais pjaustytu moliūgu virk 2 stiklinėse vandens 20–25 min., kol suminkštės.'),
      b('Mash a little, add milk if you like, butter and cinnamon.', 'Šiek tiek patrink, jei nori — įpilk pieno, įdėk sviesto ir cinamono.'),
    ],
    why: b('Soft, sweet and soothing — grain with vegetable and fat.', 'Minkšta, saldi ir raminanti — kruopos su daržove ir riebalais.'),
  },
  {
    id: 'rice-peas', icon: '🟢', meals: ['lunch', 'dinner'], minutes: 25,
    name: b('Rice with green peas and carrots', 'Ryžiai su žaliaisiais žirneliais ir morkomis'),
    ingredients: [
      ing('rice', '1 cup', '1 stiklinė'),
      ing('peas', '1 cup', '1 stiklinė'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1', true),
      ing('butter', '1 tbsp', '1 š.'),
    ],
    steps: [
      b('Soften onion and carrot in butter, add rice and 2 cups of water; cook 15 minutes.', 'Svieste suminkštink svogūną ir morką, sudėk ryžius ir 2 stiklines vandens; virk 15 min.'),
      b('Stir in the peas and cook 3 more minutes.', 'Įmaišyk žirnelius ir pavirk dar 3 min.'),
    ],
    why: b('Fresh green peas count as a vegetable here — so they pair freely with grain.', 'Švieži žalieji žirneliai čia skaičiuojami kaip daržovė — todėl laisvai dera su kruopomis.'),
  },
  // ---------- Potatoes, pasta, bread ----------
  {
    id: 'potato-salad', icon: '🥔', meals: ['lunch', 'dinner'], minutes: 30,
    name: b('Potato salad with pickles (no mayo, no eggs)', 'Bulvių salotos su raugintais agurkais (be majonezo ir kiaušinių)'),
    ingredients: [
      ing('potatoes', '5', '5'),
      ing('pickles', '3', '3'),
      ing('oil', '2 tbsp', '2 š.'),
      ing('onion', '½', '½', true),
      ing('dill', 'a handful', 'saujelė', true),
      ing('peas', 'a handful', 'sauja', true),
    ],
    steps: [
      b('Boil potatoes in their skins, peel and dice while warm.', 'Bulves išvirk su lupenomis, nulupk ir supjaustyk kubeliais, kol šiltos.'),
      b('Mix with diced pickles, onion, peas, dill, oil and a splash of pickle brine.', 'Sumaišyk su kubeliais pjaustytais agurkais, svogūnu, žirneliais, krapais, aliejumi ir trupučiu agurkų sūrymo.'),
    ],
    why: b('Starch with vegetables, ferments and fat — the classic without the clashing eggs.', 'Krakmolas su daržovėmis, raugais ir riebalais — klasika be nederančių kiaušinių.'),
  },
  {
    id: 'potato-soup', icon: '🍲', meals: ['lunch', 'dinner'], minutes: 30,
    name: b('Potato soup with dill', 'Bulvienė su krapais'),
    ingredients: [
      ing('potatoes', '4', '4'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('butter', '1 tbsp', '1 š.'),
      ing('dill', 'a big handful', 'didelė sauja', true),
      ing('sourCream', 'to serve', 'patiekimui', true),
    ],
    steps: [
      b('Soften onion and carrot in butter, add diced potatoes and 1.2 l of water; simmer 20 minutes.', 'Svieste suminkštink svogūną ir morką, sudėk kubeliais pjaustytas bulves ir 1,2 l vandens; virk 20 min.'),
      b('Mash a few potatoes in the pot for thickness, salt, add plenty of dill.', 'Kelias bulves puode patrink tirštumui, pasūdyk, įdėk gausiai krapų.'),
    ],
    why: b('A simple, warming starch-and-vegetable soup.', 'Paprasta, šildanti krakmolo ir daržovių sriuba.'),
  },
  {
    id: 'potato-kefir', icon: '🥛', meals: ['lunch'], minutes: 25,
    name: b('Boiled potatoes with kefir and dill', 'Virtos bulvės su kefyru ir krapais'),
    ingredients: [
      ing('potatoes', '4–5', '4–5'),
      ing('kefir', '1 glass', '1 stiklinė'),
      ing('dill', 'a handful', 'saujelė'),
      ing('butter', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Boil young potatoes, toss with butter and dill.', 'Išvirk jaunas bulves, apibarstyk krapais, įdėk sviesto.'),
      b('Eat with a glass of cold kefir.', 'Valgyk užsigerdamas stikline šalto kefyro.'),
    ],
    why: b('A Lithuanian summer lunch; potatoes with fermented milk combine moderately.', 'Lietuviški vasaros pietūs; bulvės su raugintu pienu dera saikingai.'),
  },
  {
    id: 'pasta-broccoli', icon: '🍝', meals: ['lunch', 'dinner'], minutes: 15,
    name: b('Pasta with broccoli, garlic and olive oil', 'Makaronai su brokoliais, česnaku ir alyvuogių aliejumi'),
    ingredients: [
      ing('pasta', '200 g', '200 g'),
      ing('broccoli', '1 head', '1 galva'),
      ing('oliveOil', '3 tbsp', '3 š.'),
      ing('garlic', '2 cloves', '2 skiltelės', true),
      ing('seeds', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Cook pasta; add broccoli florets to the same pot for the last 4 minutes.', 'Virk makaronus; paskutinėms 4 min. į tą patį puodą sudėk brokolių žiedynus.'),
      b('Drain and toss with olive oil warmed with garlic; sprinkle with seeds.', 'Nukošk ir sumaišyk su alyvuogių aliejumi, pašildytu su česnaku; pabarstyk sėklomis.'),
    ],
    why: b('Starch + vegetables + fat: no cheese or meat sauce, so it digests lightly.', 'Krakmolas + daržovės + riebalai: be sūrio ar mėsos padažo — virškinama lengvai.'),
  },
  {
    id: 'bread-radish', icon: '🍞', meals: ['breakfast', 'lunch'], minutes: 5,
    name: b('Rye bread with butter, radishes and cucumber', 'Ruginė duona su sviestu, ridikėliais ir agurku'),
    ingredients: [
      ing('bread', '2 slices', '2 riekės'),
      ing('butter', 'a thin layer', 'plonas sluoksnis'),
      ing('radish', '4–5', '4–5'),
      ing('cucumber', '½', '½', true),
      ing('dill', 'a little', 'truputis', true),
    ],
    steps: [
      b('Spread the bread thinly with butter, cover with radish and cucumber slices, salt and dill.', 'Duoną plonai patepk sviestu, uždėk ridikėlių ir agurko griežinėlių, pabarstyk druska ir krapais.'),
    ],
    why: b('Bread with fat and vegetables — keep cheese and ham for a different meal.', 'Duona su riebalais ir daržovėmis — sūrį ir kumpį palik kitam valgiui.'),
  },
  // ---------- Eggs & cottage cheese ----------
  {
    id: 'eggs-mushrooms', icon: '🍄', meals: ['breakfast', 'dinner'], minutes: 15,
    name: b('Eggs with mushrooms and zucchini', 'Kiaušiniai su grybais ir cukinija'),
    ingredients: [
      ing('eggs', '2–3', '2–3'),
      ing('mushrooms', '150 g', '150 g'),
      ing('zucchini', '½', '½', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
      ing('parsley', 'a little', 'truputis', true),
    ],
    steps: [
      b('Fry sliced mushrooms and zucchini until golden.', 'Pakepink pjaustytus grybus ir cukiniją, kol pagels.'),
      b('Pour in beaten eggs and cook gently until set. No toast — salad instead.', 'Užpilk išplaktus kiaušinius ir kepk ant mažos ugnies, kol sustings. Be skrebučio — su salotomis.'),
    ],
    why: b('Protein with vegetables — the ideal pair.', 'Baltymai su daržovėmis — idealus derinys.'),
  },
  {
    id: 'eggs-cabbage', icon: '🥬', meals: ['breakfast', 'dinner'], minutes: 20,
    name: b('Eggs with stewed cabbage', 'Kiaušiniai su troškintais kopūstais'),
    ingredients: [
      ing('eggs', '2', '2'),
      ing('cabbage', '¼ head', '¼ galvos'),
      ing('onion', '½', '½', true),
      ing('butter', '1 tsp', '1 š-ėlis', true),
      ing('dill', 'a little', 'truputis', true),
    ],
    steps: [
      b('Stew shredded cabbage with onion and a splash of water for 10 minutes.', 'Smulkintus kopūstus su svogūnu ir trupučiu vandens troškink 10 min.'),
      b('Make two wells, crack in the eggs, cover and cook 5 minutes.', 'Padaryk dvi duobutes, įmušk kiaušinius, uždenk ir virk 5 min.'),
    ],
    why: b('Cabbage with eggs — cheap, filling and well combined.', 'Kopūstai su kiaušiniais — pigu, soti ir gerai suderinta.'),
  },
  {
    id: 'cottage-tomato', icon: '🍅', meals: ['breakfast', 'dinner'], minutes: 5,
    name: b('Cottage cheese with tomatoes, garlic and herbs', 'Varškė su pomidorais, česnaku ir žolelėmis'),
    ingredients: [
      ing('cottage', '200 g', '200 g'),
      ing('tomato', '2', '2'),
      ing('garlic', '½ clove', '½ skiltelės', true),
      ing('parsley', 'a handful', 'saujelė', true),
      ing('oliveOil', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Mix cottage cheese with crushed garlic, herbs and salt; serve with tomato slices and a drop of olive oil.', 'Varškę sumaišyk su spaustu česnaku, žolelėmis ir druska; patiek su pomidorų griežinėliais ir lašu alyvuogių aliejaus.'),
    ],
    why: b('Protein with vegetables — a savoury, no-cook alternative to sweet curd.', 'Baltymai su daržovėmis — sūri, nevirta alternatyva saldžiai varškei.'),
  },
  {
    id: 'cottage-pumpkin-bake', icon: '🎃', meals: ['breakfast', 'dinner'], minutes: 40,
    name: b('Cottage cheese and pumpkin bake (no flour)', 'Varškės ir moliūgo apkepas (be miltų)'),
    ingredients: [
      ing('cottage', '400 g', '400 g'),
      ing('pumpkin', '300 g, grated', '300 g, tarkuoto'),
      ing('eggs', '2', '2'),
      ing('cinnamon', '½ tsp', '½ š-ėlio', true),
      ing('honey', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Mix cottage cheese, eggs, grated pumpkin, cinnamon and a little honey.', 'Sumaišyk varškę, kiaušinius, tarkuotą moliūgą, cinamoną ir truputį medaus.'),
      b('Bake in a greased dish at 180 °C for 35 minutes.', 'Kepk riebalais išteptame inde 180 °C orkaitėje 35 min.'),
    ],
    why: b('No semolina or flour — protein with vegetable only, so it sits light.', 'Be manų ar miltų — tik baltymai su daržove, todėl negula sunkiai.'),
  },
  {
    id: 'yogurt-banana', icon: '🍌', meals: ['breakfast'], minutes: 3,
    name: b('Yogurt with banana and flax', 'Jogurtas su bananu ir sėmenimis'),
    ingredients: [
      ing('yogurt', '200 g', '200 g'),
      ing('banana', '1', '1'),
      ing('flax', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Slice banana into live yogurt, sprinkle with ground flax.', 'Į gyvą jogurtą supjaustyk bananą, pabarstyk maltais sėmenimis.'),
    ],
    why: b('Sweet fruit with yogurt is moderate; sour berries with yogurt would clash.', 'Saldūs vaisiai su jogurtu dera saikingai; rūgščios uogos su jogurtu — nedera.'),
  },
  // ---------- More cottage cheese ----------
  {
    id: 'cottage-sourcream', icon: '🤍', meals: ['breakfast', 'dinner'], minutes: 5,
    name: b('Cottage cheese with sour cream and dill', 'Varškė su grietine ir krapais'),
    ingredients: [
      ing('cottage', '200 g', '200 g'),
      ing('sourCream', '2 tbsp', '2 š.'),
      ing('dill', 'a handful', 'saujelė'),
      ing('cucumber', '½', '½', true),
      ing('garlic', '½ clove', '½ skiltelės', true),
    ],
    steps: [
      b('Mash cottage cheese with sour cream, chopped dill, a little garlic and salt.', 'Varškę sutrink su grietine, smulkintais krapais, trupučiu česnako ir druska.'),
      b('Eat with cucumber slices or salad leaves instead of bread.', 'Valgyk su agurko griežinėliais ar salotų lapais vietoj duonos.'),
    ],
    why: b('The Lithuanian classic; protein with a little fat and herbs. Without bread it stays light.', 'Lietuviška klasika: baltymai su trupučiu riebalų ir žolelėmis. Be duonos lieka lengva.'),
  },
  {
    id: 'cottage-apple', icon: '🍎', meals: ['breakfast'], minutes: 5,
    name: b('Cottage cheese with grated apple and cinnamon', 'Varškė su tarkuotu obuoliu ir cinamonu'),
    ingredients: [
      ing('cottage', '200 g', '200 g'),
      ing('apple', '1', '1'),
      ing('cinnamon', 'a pinch', 'žiupsnelis', true),
      ing('honey', '1 tsp', '1 š-ėlis', true),
    ],
    steps: [
      b('Grate the apple into the cottage cheese, add cinnamon and a little honey; mix.', 'Į varškę sutarkuok obuolį, įberk cinamono, įdėk truputį medaus ir išmaišyk.'),
    ],
    why: b('Sour fruit with protein combines moderately — far lighter than curd with jam or bread.', 'Rūgštūs vaisiai su baltymais dera saikingai — daug lengviau nei varškė su uogiene ar duona.'),
  },
  {
    id: 'cottage-avocado', icon: '🥑', meals: ['breakfast', 'lunch'], minutes: 10,
    name: b('Cottage cheese and avocado spread with vegetable sticks', 'Varškės ir avokado užtepėlė su daržovių lazdelėmis'),
    ingredients: [
      ing('cottage', '150 g', '150 g'),
      ing('avocado', '1', '1'),
      ing('carrot', '2', '2'),
      ing('cucumber', '1', '1', true),
      ing('pepper', '1', '1', true),
      ing('lemon', 'a squeeze', 'keli lašai', true),
    ],
    steps: [
      b('Mash avocado with cottage cheese, lemon juice and salt.', 'Avokadą sutrink su varške, citrinos sultimis ir druska.'),
      b('Dip carrot, cucumber and pepper sticks into it.', 'Valgyk padažydamas morkų, agurkų ir paprikų lazdeles.'),
    ],
    why: b('Protein and fat with raw vegetables — vegetables replace the bread.', 'Baltymai ir riebalai su žaliomis daržovėmis — daržovės atstoja duoną.'),
  },
  {
    id: 'cottage-spinach-bake', icon: '🌿', meals: ['breakfast', 'dinner'], minutes: 35,
    name: b('Cottage cheese and spinach bake', 'Varškės ir špinatų apkepas'),
    ingredients: [
      ing('cottage', '400 g', '400 g'),
      ing('spinach', '3 handfuls', '3 saujos'),
      ing('eggs', '2', '2'),
      ing('cheese', '50 g, grated', '50 g, tarkuoto', true),
      ing('garlic', '1 clove', '1 skiltelė', true),
    ],
    steps: [
      b('Wilt the spinach with garlic, chop it and mix with cottage cheese, eggs and salt.', 'Špinatus suvytink su česnaku, susmulkink ir sumaišyk su varške, kiaušiniais ir druska.'),
      b('Pour into a greased dish, sprinkle with cheese and bake at 180 °C for 25–30 minutes.', 'Supilk į riebalais išteptą indą, apibarstyk sūriu ir kepk 180 °C orkaitėje 25–30 min.'),
    ],
    why: b('A savoury curd bake without semolina or flour — protein with greens only.', 'Sūrus varškės apkepas be manų ar miltų — tik baltymai su žalumynais.'),
  },
  {
    id: 'cottage-stuffed-peppers', icon: '🫑', meals: ['lunch', 'dinner'], minutes: 15,
    name: b('Peppers and tomatoes stuffed with herbed cottage cheese', 'Paprikos ir pomidorai, įdaryti varške su žolelėmis'),
    ingredients: [
      ing('cottage', '250 g', '250 g'),
      ing('pepper', '2', '2'),
      ing('tomato', '2', '2', true),
      ing('dill', 'a handful', 'saujelė', true),
      ing('garlic', '1 clove', '1 skiltelė', true),
    ],
    steps: [
      b('Mix cottage cheese with herbs, garlic and salt.', 'Varškę sumaišyk su žolelėmis, česnaku ir druska.'),
      b('Halve the peppers, hollow out the tomatoes and fill them with the curd. Eat raw, or bake 15 minutes at 190 °C.', 'Paprikas perpjauk per pusę, pomidorus išskobk ir prikimšk varškės. Valgyk žalius arba kepk 15 min. 190 °C orkaitėje.'),
    ],
    why: b('Protein in a vegetable “cup” — a colourful, easy dinner.', 'Baltymai daržovių „puodelyje“ — spalvinga ir lengva vakarienė.'),
  },
  {
    id: 'cottage-cold-soup', icon: '🥒', meals: ['lunch'], minutes: 10,
    name: b('Cold cucumber and cottage cheese soup', 'Šalta agurkų ir varškės sriuba'),
    ingredients: [
      ing('cottage', '150 g', '150 g'),
      ing('cucumber', '2', '2'),
      ing('dill', 'a big handful', 'didelė sauja'),
      ing('radish', '4', '4', true),
      ing('garlic', '½ clove', '½ skiltelės', true),
    ],
    steps: [
      b('Blend cottage cheese with one cucumber, garlic, salt and a glass of cold water until smooth.', 'Varškę sutrink su vienu agurku, česnaku, druska ir stikline šalto vandens iki vientisos masės.'),
      b('Add the second cucumber and radishes, diced, and plenty of dill. Serve cold.', 'Įmaišyk kubeliais pjaustytą antrą agurką, ridikėlius ir gausiai krapų. Patiek šaltą.'),
    ],
    why: b('A summer soup with protein and vegetables only — refreshing and light.', 'Vasaros sriuba tik iš baltymų ir daržovių — gaivi ir lengva.'),
  },
  // ---------- Legumes ----------
  {
    id: 'hummus-veg', icon: '🧆', meals: ['lunch'], minutes: 10,
    name: b('Hummus with vegetable sticks', 'Humusas su daržovių lazdelėmis'),
    ingredients: [
      ing('chickpeas', '1 can', '1 skardinė'),
      ing('oliveOil', '3 tbsp', '3 š.'),
      ing('carrot', '2', '2'),
      ing('cucumber', '1', '1'),
      ing('pepper', '1', '1', true),
      ing('garlic', '1 clove', '1 skiltelė', true),
      ing('lemon', '½', '½', true),
    ],
    steps: [
      b('Blend chickpeas with olive oil, garlic, lemon juice, salt and a little water until smooth.', 'Avinžirnius sutrink su alyvuogių aliejumi, česnaku, citrinos sultimis, druska ir trupučiu vandens iki vientisos masės.'),
      b('Serve with carrot, cucumber and pepper sticks instead of bread.', 'Patiek su morkų, agurkų ir paprikų lazdelėmis vietoj duonos.'),
    ],
    why: b('Legumes with vegetables and olive oil — symbiosis; bread alongside would be heavier.', 'Ankštiniai su daržovėmis ir alyvuogių aliejumi — simbiozė; su duona būtų sunkiau.'),
  },
  {
    id: 'lentil-beet-salad', icon: '🟣', meals: ['lunch', 'dinner'], minutes: 25,
    name: b('Lentil salad with beetroot and dill', 'Lęšių salotos su burokėliais ir krapais'),
    ingredients: [
      ing('lentils', '¾ cup', '¾ stiklinės'),
      ing('beet', '2 cooked', '2 virti'),
      ing('oil', '2 tbsp', '2 š.'),
      ing('onion', '½', '½', true),
      ing('dill', 'a handful', 'saujelė', true),
    ],
    steps: [
      b('Cook green or brown lentils for 20 minutes so they stay whole; drain.', 'Žalius ar rudus lęšius virk 20 min., kad liktų sveiki; nukošk.'),
      b('Mix with diced beetroot, onion, dill, oil and salt.', 'Sumaišyk su kubeliais pjaustytais burokėliais, svogūnu, krapais, aliejumi ir druska.'),
    ],
    why: b('Legumes with vegetables — beetroot’s sweetness balances the lentils.', 'Ankštiniai su daržovėmis — burokėlių saldumas subalansuoja lęšius.'),
  },
  {
    id: 'bean-soup', icon: '🫘', meals: ['lunch', 'dinner'], minutes: 30,
    name: b('Bean and vegetable soup', 'Pupelių ir daržovių sriuba'),
    ingredients: [
      ing('beans', '1 can', '1 skardinė'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('tomato', '2', '2'),
      ing('celery', '1 stalk', '1 stiebas', true),
      ing('oliveOil', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Soften onion, carrot and celery in oil; add tomatoes, beans and 1 l of water.', 'Aliejuje suminkštink svogūną, morką ir salierą; sudėk pomidorus, pupeles ir 1 l vandens.'),
      b('Simmer 20 minutes with a bay leaf, cumin and salt.', 'Virk 20 min. su lauro lapu, kmynais ir druska.'),
    ],
    why: b('Plant protein with vegetables; cumin makes beans easier to digest.', 'Augaliniai baltymai su daržovėmis; kmynai padeda lengviau suvirškinti pupeles.'),
  },
  // ---------- Fish & meat ----------
  {
    id: 'fish-soup', icon: '🐟', meals: ['lunch', 'dinner'], minutes: 30,
    name: b('Light fish soup (no potatoes)', 'Lengva žuvienė (be bulvių)'),
    ingredients: [
      ing('fish', '300 g', '300 g'),
      ing('carrot', '1', '1'),
      ing('onion', '1', '1'),
      ing('celery', '1 stalk', '1 stiebas', true),
      ing('dill', 'a big handful', 'didelė sauja', true),
    ],
    steps: [
      b('Simmer carrot, onion and celery in 1.2 l of water with a bay leaf for 10 minutes.', 'Morką, svogūną ir salierą virk 1,2 l vandens su lauro lapu 10 min.'),
      b('Add fish pieces and cook 8–10 minutes more. Salt and add lots of dill.', 'Sudėk žuvies gabalėlius ir virk dar 8–10 min. Pasūdyk ir įdėk daug krapų.'),
    ],
    why: b('Fish with vegetables only — the lightest warm protein dinner.', 'Žuvis tik su daržovėmis — lengviausia šilta baltyminė vakarienė.'),
  },
  {
    id: 'chicken-salad', icon: '🥗', meals: ['lunch', 'dinner'], minutes: 20,
    name: b('Chicken salad with cucumber and greens', 'Vištienos salotos su agurku ir žalumynais'),
    ingredients: [
      ing('chicken', '200 g', '200 g'),
      ing('lettuce', 'a bowl', 'dubenėlis'),
      ing('cucumber', '1', '1'),
      ing('oliveOil', '2 tbsp', '2 š.'),
      ing('dill', 'a handful', 'saujelė', true),
      ing('radish', '4', '4', true),
    ],
    steps: [
      b('Boil or bake the chicken, cool and slice.', 'Vištieną išvirk ar iškepk, atvėsink ir supjaustyk.'),
      b('Toss with salad leaves, cucumber, radishes, dill, olive oil and salt.', 'Sumaišyk su salotų lapais, agurku, ridikėliais, krapais, alyvuogių aliejumi ir druska.'),
    ],
    why: b('Meat with fresh vegetables — no croutons, so protein and starch stay apart.', 'Mėsa su šviežiomis daržovėmis — be skrebučių, todėl baltymai ir krakmolas atskirai.'),
  },
  {
    id: 'beef-stew', icon: '🥩', meals: ['lunch', 'dinner'], minutes: 90,
    name: b('Beef stew with carrots and celery', 'Jautienos troškinys su morkomis ir salierais'),
    ingredients: [
      ing('meat', '500 g', '500 g'),
      ing('carrot', '3', '3'),
      ing('onion', '2', '2'),
      ing('celery', '2 stalks', '2 stiebai'),
      ing('tomato', '2', '2', true),
      ing('oil', '1 tbsp', '1 š.', true),
    ],
    steps: [
      b('Brown the meat in oil, add onions, carrots and celery in large chunks.', 'Mėsą apkepink aliejuje, sudėk dideliais gabalais pjaustytus svogūnus, morkas ir salierus.'),
      b('Add tomatoes and water to cover; stew covered on low heat for 1–1½ hours.', 'Sudėk pomidorus ir užpilk vandeniu; troškink uždengęs ant mažos ugnies 1–1½ val.'),
    ],
    why: b('Slow stewing softens collagen; vegetables instead of potatoes keep it combinable.', 'Lėtas troškinimas suminkština kolageną; daržovės vietoj bulvių išlaiko derinį.'),
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
    ],
    steps: [
      b('Top cottage cheese with berries (thawed if frozen) and a little honey. Skip nuts and seeds here — two dense proteins together.', 'Varškę papuošk uogomis (jei šaldytos — atšildytomis) ir trupučiu medaus. Riešutų ir sėklų čia nedėk — du tankūs baltymai kartu.'),
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

/** Approximate weight of one piece of an item, in grams. */
const PIECE_G: Record<string, number> = {
  eggs: 55, apple: 150, banana: 120, pear: 150, carrot: 80, onion: 100, tomato: 120, cucumber: 150,
  pepper: 150, potatoes: 150, sweetPotato: 200, beet: 150, zucchini: 250, avocado: 150, lemon: 60,
  radish: 15, mushrooms: 20, pickles: 60, sauerkraut: 100, herring: 80, fish: 150, salmon: 150,
  chicken: 150, meat: 150, garlic: 5, broccoli: 400, cauliflower: 600, cabbage: 1000, lettuce: 200,
}
/** Approximate weight of a cup / glass of an item, in grams. */
const CUP_G: Record<string, number> = { oats: 90, berries: 150, walnuts: 100, seeds: 130, lettuce: 50, spinach: 30, kefir: 240, yogurt: 240, milk: 240 }

/** Turns a free-text amount ("1–2", "½ cup", "200 g fillet", "a handful") into estimated grams. */
export function amountGrams(id: string, text: string): number {
  const t = text.toLowerCase().replace(/\(.*?\)/g, '').split(' or ')[0].trim()
  const num = (x: string) =>
    x.split(/[–-]/).map((v) => {
      const m = v.trim().match(/^(\d+)?\s*([½¼¾])?/)!
      return (m[1] ? +m[1] : 0) + ({ '½': 0.5, '¼': 0.25, '¾': 0.75 }[m[2] ?? ''] ?? 0)
    }).reduce((a, v, _, arr) => a + v / arr.length, 0)
  const lead = t.match(/^[\d½¼¾][\d½¼¾–\- ]*/)
  const n = lead ? num(lead[0]) || 1 : 1
  if (/\bg\b/.test(t) && lead) return n
  if (t.includes('tbsp')) return n * 15
  if (t.includes('tsp')) return n * 5
  if (t.includes('cup') || t.includes('glass')) return n * (CUP_G[id] ?? 180)
  if (t.includes('can')) return n * 240
  if (t.includes('big handful')) return 45
  if (t.includes('handful')) return n * 30
  if (t.includes('bowl')) return n * 200
  if (t.includes('clove')) return n * 5
  if (t.includes('slice')) return n * 40
  if (t.includes('stalk')) return n * 40
  if (t.includes(' cm')) return n * 5
  if (t.includes('head')) return n * (PIECE_G[id] ?? 400)
  if (t.includes('fillet')) return n * (PIECE_G[id] ?? 120)
  if (t.includes('pinch') || t.includes('leaves')) return 2
  if (!lead) return 10 // "a little", "to serve", "for the pan", "a squeeze"
  return n * (PIECE_G[id] ?? 100)
}

const round50 = (n: number) => Math.round(n / 50) * 50

function recipeAngstrom(r: RecipeDef): number {
  const parts = r.ingredients.filter((i) => !i.optional).map((i) => ({ a: food(PANTRY_BY_ID.get(i.id)!.foodId).angstrom, g: amountGrams(i.id, i.amount.en) }))
  const grams = parts.reduce((s, x) => s + x.g, 0)
  return round50(parts.reduce((s, x) => s + x.a * x.g, 0) / grams)
}

export const RECIPES: Recipe[] = [...RECIPE_DEFS, ...EXTRA_RECIPES].map((r) => {
  for (const i of r.ingredients) if (!PANTRY_BY_ID.has(i.id)) throw new Error(`Unknown pantry item ${i.id} in ${r.id}`)
  const angstrom = recipeAngstrom(r)
  return { ...r, harmony: recipeHarmony(r), angstrom, tierId: tierOf(angstrom).id }
})

/**
 * Families of pantry items that can stand in for each other in a recipe
 * (any carrot-like vegetable for another, rice for buckwheat, salmon for white fish).
 * Vegetables (non-seasoning) form one family automatically.
 */
const FAMILIES: string[][] = [
  ['fish', 'salmon', 'shrimp'],
  ['chicken', 'meat'],
  ['buckwheat', 'greenBuckwheat', 'rice', 'millet', 'quinoa'],
  ['potatoes', 'sweetPotato'],
  ['lentils', 'beans', 'chickpeas'],
  ['butter', 'oliveOil', 'oil', 'coconutOil'],
  ['kefir', 'yogurt'],
  ['walnuts', 'almonds', 'seeds', 'sesame'],
  ['orange', 'berries', 'plum'],
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

/* ---------- Explore by base ingredient ---------- */

/** Main ingredients you can explore, with the pantry ids that count as them. */
export type BaseShelf = 'grains' | 'protein' | 'legumes' | 'veg' | 'fruitDairy'

export const BASE_SHELVES: { id: BaseShelf; name: Bi }[] = [
  { id: 'grains', name: b('Grains, potatoes & bread', 'Kruopos, bulvės ir duona') },
  { id: 'protein', name: b('Eggs, dairy, meat & fish', 'Kiaušiniai, varškė, mėsa ir žuvis') },
  { id: 'legumes', name: b('Legumes', 'Ankštiniai') },
  { id: 'veg', name: b('Vegetables & mushrooms', 'Daržovės ir grybai') },
  { id: 'fruitDairy', name: b('Fruit, nuts & fermented milk', 'Vaisiai, riešutai ir rauginti pieno produktai') },
]

/** Main ingredients you can explore, with the pantry ids that count as them. */
export const BASES: { id: string; ids: string[]; shelf: BaseShelf; label?: Bi }[] = [
  { id: 'buckwheat', ids: ['buckwheat', 'greenBuckwheat', 'buckwheatFlour'], shelf: 'grains' },
  { id: 'oats', ids: ['oats'], shelf: 'grains' },
  { id: 'millet', ids: ['millet'], shelf: 'grains' },
  { id: 'rice', ids: ['rice'], shelf: 'grains' },
  { id: 'quinoa', ids: ['quinoa'], shelf: 'grains' },
  { id: 'potatoes', ids: ['potatoes', 'sweetPotato'], shelf: 'grains' },
  { id: 'pasta', ids: ['pasta'], shelf: 'grains' },
  { id: 'bread', ids: ['bread'], shelf: 'grains' },
  { id: 'eggs', ids: ['eggs'], shelf: 'protein' },
  { id: 'cottage', ids: ['cottage'], shelf: 'protein' },
  { id: 'cheese', ids: ['cheese'], shelf: 'protein' },
  { id: 'chicken', ids: ['chicken'], shelf: 'protein' },
  { id: 'meat', ids: ['meat'], shelf: 'protein' },
  { id: 'fish', ids: ['fish', 'salmon', 'herring', 'shrimp'], shelf: 'protein', label: b('Fish & seafood', 'Žuvis ir jūros gėrybės') },
  { id: 'lentils', ids: ['lentils'], shelf: 'legumes' },
  { id: 'beans', ids: ['beans'], shelf: 'legumes' },
  { id: 'chickpeas', ids: ['chickpeas'], shelf: 'legumes' },
  { id: 'tofu', ids: ['tofu'], shelf: 'legumes' },
  { id: 'pumpkin', ids: ['pumpkin'], shelf: 'veg' },
  { id: 'cabbage', ids: ['cabbage', 'sauerkraut'], shelf: 'veg' },
  { id: 'zucchini', ids: ['zucchini'], shelf: 'veg' },
  { id: 'mushrooms', ids: ['mushrooms'], shelf: 'veg' },
  { id: 'beet', ids: ['beet'], shelf: 'veg' },
  { id: 'spinach', ids: ['spinach', 'kale', 'sorrel', 'nettle'], shelf: 'veg', label: b('Spinach & leafy greens', 'Špinatai ir lapiniai žalumynai') },
  { id: 'cauliflower', ids: ['cauliflower'], shelf: 'veg' },
  { id: 'broccoli', ids: ['broccoli'], shelf: 'veg' },
  { id: 'carrot', ids: ['carrot'], shelf: 'veg' },
  { id: 'tomato', ids: ['tomato'], shelf: 'veg' },
  { id: 'pepper', ids: ['pepper'], shelf: 'veg' },
  { id: 'cucumber', ids: ['cucumber'], shelf: 'veg' },
  { id: 'avocado', ids: ['avocado'], shelf: 'veg' },
  { id: 'banana', ids: ['banana'], shelf: 'fruitDairy' },
  { id: 'apple', ids: ['apple'], shelf: 'fruitDairy' },
  { id: 'berries', ids: ['berries', 'orange'], shelf: 'fruitDairy', label: b('Berries & citrus', 'Uogos ir citrusai') },
  { id: 'pear', ids: ['pear'], shelf: 'fruitDairy' },
  { id: 'walnuts', ids: ['walnuts', 'almonds', 'seeds', 'chia', 'sesame'], shelf: 'fruitDairy', label: b('Nuts & seeds', 'Riešutai ir sėklos') },
  { id: 'kefir', ids: ['kefir', 'yogurt'], shelf: 'fruitDairy', label: b('Kefir & yogurt', 'Kefyras ir jogurtas') },
]

export type Combo = {
  /** Food groups of the recipe's required, non-seasoning ingredients; base group first. */
  groups: GroupId[]
  harmony: number
  recipes: Recipe[]
}

/** Recipes that use a base (as a required ingredient), grouped by their food-group combination. */
export function combosForBase(baseId: string, meal: Meal | 'all'): Combo[] {
  const base = BASES.find((x) => x.id === baseId)
  if (!base) return []
  const baseGroup = pantryGroup(base.ids[0])
  const recipes = RECIPES.filter(
    (r) => (meal === 'all' || r.meals.includes(meal)) && r.ingredients.some((i) => !i.optional && base.ids.includes(i.id)),
  )
  const order = FOOD_GROUPS.map((g) => g.id)
  const map = new Map<string, Combo>()
  for (const r of recipes) {
    const gs = [
      ...new Set(
        r.ingredients
          .filter((i) => !i.optional && !PANTRY_BY_ID.get(i.id)?.condiment)
          .map((i) => pantryGroup(i.id))
          .filter((g): g is GroupId => g !== null),
      ),
    ].sort((a, b) => (a === baseGroup ? -1 : b === baseGroup ? 1 : order.indexOf(a) - order.indexOf(b)))
    const key = gs.join('+')
    const c = map.get(key) ?? { groups: gs, harmony: harmonyOf(gs).harmony, recipes: [] }
    c.recipes.push(r)
    map.set(key, c)
  }
  return [...map.values()].sort((a, b) => b.harmony - a.harmony || b.recipes.length - a.recipes.length)
}

export function recipeCountForBase(baseId: string): number {
  return combosForBase(baseId, 'all').reduce((n, c) => n + c.recipes.length, 0)
}
