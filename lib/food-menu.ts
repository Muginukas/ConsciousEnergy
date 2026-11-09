/**
 * Symbiotic menu: dishes built from the food pyramid (ångström values) and the
 * food-combining matrix. Each dish's values are computed, not hand-entered:
 *  - vibration: portion-weighted average of its ingredients' Å values
 *  - harmony: every pair of distinct food groups in the dish rated via getPair
 * Ingredient Å values follow Simoneton's figures where he gave them and are
 * otherwise estimated from the pyramid tiers (raw/fresh high, cooked lower).
 */

import { FOOD_TIERS, type Bi } from './food-angstrom'
import { FOOD_GROUPS, getPair, type GroupId, type Rating } from './food-combining'

type Ingredient = { name: Bi; group: GroupId; angstrom: number }

const I = (en: string, lt: string, group: GroupId, angstrom: number): Ingredient => ({
  name: { en, lt },
  group,
  angstrom,
})

const ING = {
  spinach: I('Fresh spinach', 'Švieži špinatai', 'veg', 8500),
  spinachCooked: I('Sautéed spinach', 'Troškinti špinatai', 'veg', 6000),
  greens: I('Leafy greens', 'Lapinės salotos', 'veg', 9000),
  rocket: I('Rocket', 'Rukola', 'veg', 9000),
  herbs: I('Dill & parsley', 'Krapai ir petražolės', 'veg', 9000),
  cucumber: I('Cucumber', 'Agurkas', 'veg', 9000),
  carrot: I('Raw carrot', 'Žalia morka', 'veg', 8500),
  pepper: I('Bell pepper', 'Paprika', 'veg', 8500),
  tomato: I('Fresh tomato', 'Šviežias pomidoras', 'veg', 8000),
  tomatoCooked: I('Stewed tomato', 'Troškinti pomidorai', 'veg', 5500),
  broccoli: I('Steamed broccoli', 'Garinti brokoliai', 'veg', 6000),
  pumpkin: I('Pumpkin (cooked)', 'Moliūgas (virtas)', 'veg', 5500),
  sauerkraut: I('Sauerkraut', 'Rauginti kopūstai', 'veg', 7500),
  spices: I('Turmeric & black pepper', 'Ciberžolė ir juodieji pipirai', 'veg', 8000),
  ginger: I('Fresh ginger', 'Šviežias imbieras', 'veg', 8500),
  cumin: I('Cumin & garlic', 'Kmynai ir česnakas', 'veg', 8000),
  oliveOil: I('Cold-pressed olive oil', 'Šalto spaudimo alyvuogių aliejus', 'fat', 8500),
  butter: I('Fresh butter', 'Šviežias sviestas', 'fat', 8000),
  avocado: I('Avocado', 'Avokadas', 'fat', 8500),
  flax: I('Ground flaxseed', 'Malti linų sėmenys', 'nuts', 8000),
  walnuts: I('Walnuts', 'Graikiniai riešutai', 'nuts', 8000),
  almonds: I('Almonds', 'Migdolai', 'nuts', 8000),
  sunflower: I('Sunflower seeds', 'Saulėgrąžos', 'nuts', 8000),
  pumpkinSeeds: I('Pumpkin seeds', 'Moliūgų sėklos', 'nuts', 8000),
  banana: I('Ripe banana', 'Prinokęs bananas', 'sweetFruit', 8500),
  apple: I('Apple', 'Obuolys', 'sourFruit', 9000),
  berries: I('Fresh berries', 'Šviežios uogos', 'sourFruit', 9500),
  lemon: I('Lemon juice', 'Citrinos sultys', 'sourFruit', 9000),
  watermelon: I('Watermelon', 'Arbūzas', 'melon', 9000),
  oatsSoaked: I('Soaked rolled oats', 'Mirkytos avižos', 'starch', 8000),
  buckwheat: I('Buckwheat (cooked)', 'Grikiai (virti)', 'starch', 6000),
  potatoes: I('New potatoes (boiled)', 'Jaunos bulvės (virtos)', 'starch', 5000),
  rice: I('Brown rice (cooked)', 'Rudieji ryžiai (virti)', 'starch', 5500),
  lentils: I('Red lentils (cooked)', 'Raudonieji lęšiai (virti)', 'legumes', 5000),
  beans: I('Black beans (cooked)', 'Juodosios pupelės (virtos)', 'legumes', 5000),
  kefir: I('Kefir', 'Kefyras', 'milk', 6500),
  salmon: I('Baked salmon', 'Kepta lašiša', 'protein', 5000),
  eggs: I('Soft-cooked eggs', 'Minkštai virti kiaušiniai', 'protein', 6000),
}

type IngKey = keyof typeof ING

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export const MEALS: { id: Meal; label: Bi; icon: string }[] = [
  { id: 'breakfast', icon: '🌅', label: { en: 'Breakfast', lt: 'Pusryčiai' } },
  { id: 'lunch', icon: '☀️', label: { en: 'Lunch', lt: 'Pietūs' } },
  { id: 'dinner', icon: '🌙', label: { en: 'Dinner', lt: 'Vakarienė' } },
  { id: 'snack', icon: '🍃', label: { en: 'Snack', lt: 'Užkandis' } },
]

type DishDef = {
  id: string
  meal: Meal
  icon: string
  name: Bi
  /** [ingredient, grams] */
  items: [IngKey, number][]
  synergy: Bi
  how: Bi
}

const DISHES: DishDef[] = [
  {
    id: 'green-smoothie', meal: 'breakfast', icon: '🥤',
    name: { en: 'Green morning smoothie', lt: 'Žaliasis rytinis kokteilis' },
    items: [['spinach', 60], ['banana', 120], ['flax', 15], ['ginger', 5]],
    synergy: { en: 'Flax fat unlocks the carotenoids and vitamin K in spinach; banana softens the greens.', lt: 'Linų sėmenų riebalai atrakina špinatų karotinoidus ir vitaminą K; bananas sušvelnina žalumynų skonį.' },
    how: { en: 'Blend with a glass of water. Drink slowly, on its own.', lt: 'Sutrinkite su stikline vandens. Gerkite lėtai, atskirai nuo kito maisto.' },
  },
  {
    id: 'overnight-oats', meal: 'breakfast', icon: '🥣',
    name: { en: 'Overnight oats with kefir and banana', lt: 'Per naktį mirkytos avižos su kefyru ir bananu' },
    items: [['oatsSoaked', 60], ['kefir', 150], ['banana', 80], ['almonds', 15]],
    synergy: { en: 'A synbiotic bowl: live kefir cultures plus oat and banana fibre that feeds them.', lt: 'Sinbiotinis dubenėlis: gyvos kefyro kultūros ir avižų bei banano skaidulos, kuriomis jos minta.' },
    how: { en: 'Soak oats in kefir overnight; top with sliced banana and almonds in the morning.', lt: 'Avižas užpilkite kefyru vakare; ryte papuoškite banano griežinėliais ir migdolais.' },
  },
  {
    id: 'apple-walnut', meal: 'breakfast', icon: '🍎',
    name: { en: 'Apple, berries and walnuts', lt: 'Obuolys, uogos ir graikiniai riešutai' },
    items: [['apple', 150], ['berries', 100], ['walnuts', 25]],
    synergy: { en: 'Shelton’s favourite pairing: acid fruit helps nuts digest. Almost entirely raw — very high vibration.', lt: 'Mėgstamiausias Sheltono derinys: rūgštūs vaisiai padeda virškinti riešutus. Beveik viskas žalia — labai aukšta vibracija.' },
    how: { en: 'Slice the apple, add berries and crushed walnuts. Cinnamon if you like.', lt: 'Supjaustykite obuolį, pridėkite uogų ir smulkintų riešutų. Jei norite — cinamono.' },
  },
  {
    id: 'buckwheat', meal: 'breakfast', icon: '🌾',
    name: { en: 'Buckwheat with butter and fresh herbs', lt: 'Grikiai su sviestu ir šviežiomis žolelėmis' },
    items: [['buckwheat', 180], ['butter', 10], ['herbs', 20], ['cucumber', 100]],
    synergy: { en: 'Butter steadies the rise in blood sugar; raw herbs and cucumber lift the plate’s vibration.', lt: 'Sviestas sušvelnina cukraus šuolį kraujyje; žalios žolelės ir agurkas pakelia lėkštės vibraciją.' },
    how: { en: 'Cook buckwheat gently, add butter off the heat, plenty of dill and a cucumber on the side.', lt: 'Grikius virkite švelniai, sviestą dėkite nukėlę nuo ugnies, gausiai krapų ir agurkas šalia.' },
  },
  {
    id: 'big-salad', meal: 'lunch', icon: '🥗',
    name: { en: 'Big living salad with avocado and seeds', lt: 'Didelės gyvos salotos su avokadu ir sėklomis' },
    items: [['greens', 100], ['carrot', 80], ['pepper', 60], ['avocado', 70], ['sunflower', 20], ['lemon', 15]],
    synergy: { en: 'Avocado and seeds carry the carrot’s beta-carotene; lemon’s vitamin C frees the iron in the greens.', lt: 'Avokadas ir sėklos padeda įsisavinti morkų beta karoteną; citrinos vitaminas C atlaisvina žalumynų geležį.' },
    how: { en: 'Grate the carrot, slice the rest, dress with lemon, olive oil and salt.', lt: 'Morką sutarkuokite, kitką supjaustykite, pagardinkite citrina, aliejumi ir druska.' },
  },
  {
    id: 'lentil-dal', meal: 'lunch', icon: '🍲',
    name: { en: 'Golden lentil stew with tomato and lemon', lt: 'Auksinis lęšių troškinys su pomidorais ir citrina' },
    items: [['lentils', 200], ['tomatoCooked', 100], ['spices', 5], ['oliveOil', 10], ['lemon', 10], ['herbs', 15]],
    synergy: { en: 'Three symbioses in one pot: turmeric + pepper, tomato + olive oil, lentils + lemon for iron.', lt: 'Trys simbiozės viename puode: ciberžolė + pipirai, pomidorai + aliejus, lęšiai + citrina geležiai.' },
    how: { en: 'Simmer lentils with tomatoes and spices; finish with olive oil, lemon and fresh herbs off the heat.', lt: 'Lęšius troškinkite su pomidorais ir prieskoniais; nukėlę įpilkite aliejaus, citrinos ir įberkite žolelių.' },
  },
  {
    id: 'potatoes-dill', meal: 'lunch', icon: '🥔',
    name: { en: 'New potatoes with dill, oil and sauerkraut', lt: 'Jaunos bulvės su krapais, aliejumi ir raugintais kopūstais' },
    items: [['potatoes', 200], ['herbs', 15], ['oliveOil', 10], ['sauerkraut', 100], ['cucumber', 80]],
    synergy: { en: 'One starch with plenty of vegetables; sauerkraut brings live ferments for digestion.', lt: 'Vienas krakmolas su gausiai daržovių; rauginti kopūstai atneša gyvų fermentų virškinimui.' },
    how: { en: 'Boil potatoes in their skins, toss with oil and dill; serve with raw sauerkraut and cucumber.', lt: 'Bulves virkite su lupenomis, sumaišykite su aliejumi ir krapais; patiekite su žaliais raugintais kopūstais ir agurku.' },
  },
  {
    id: 'salmon-greens', meal: 'dinner', icon: '🐟',
    name: { en: 'Salmon with broccoli and rocket', lt: 'Lašiša su brokoliais ir rukola' },
    items: [['salmon', 150], ['broccoli', 150], ['rocket', 40], ['oliveOil', 10], ['lemon', 10]],
    synergy: { en: 'Raw rocket restores broccoli’s sulforaphane enzyme; salmon’s vitamin D helps absorb calcium from the greens. Protein with vegetables only — no starch.', lt: 'Žalia rukola grąžina brokolių fermentą sulforafanui; lašišos vitaminas D padeda pasisavinti žalumynų kalcį. Baltymai tik su daržovėmis — be krakmolo.' },
    how: { en: 'Bake the salmon, steam the broccoli for 4 minutes, serve over rocket with oil and lemon.', lt: 'Lašišą iškepkite, brokolius garinkite 4 min., patiekite ant rukolos su aliejumi ir citrina.' },
  },
  {
    id: 'pumpkin-soup', meal: 'dinner', icon: '🎃',
    name: { en: 'Pumpkin and ginger soup with seeds', lt: 'Moliūgų ir imbiero sriuba su sėklomis' },
    items: [['pumpkin', 300], ['ginger', 10], ['oliveOil', 10], ['pumpkinSeeds', 20], ['herbs', 10]],
    synergy: { en: 'Fat from oil and seeds carries pumpkin’s beta-carotene; ginger warms digestion in the evening.', lt: 'Aliejaus ir sėklų riebalai neša moliūgo beta karoteną; imbieras vakare sušildo virškinimą.' },
    how: { en: 'Simmer pumpkin with ginger, blend, add oil and toasted seeds on top.', lt: 'Moliūgą išvirkite su imbieru, sutrinkite, ant viršaus — aliejus ir paskrudintos sėklos.' },
  },
  {
    id: 'eggs-spinach', meal: 'dinner', icon: '🍳',
    name: { en: 'Eggs with spinach and tomatoes', lt: 'Kiaušiniai su špinatais ir pomidorais' },
    items: [['eggs', 120], ['spinachCooked', 100], ['tomato', 100], ['butter', 5], ['herbs', 10]],
    synergy: { en: 'A single protein with vegetables; vitamin C in fresh tomato helps the iron in spinach and eggs.', lt: 'Vienas baltymas su daržovėmis; šviežio pomidoro vitaminas C padeda įsisavinti špinatų ir kiaušinių geležį.' },
    how: { en: 'Wilt spinach in butter, add soft-cooked eggs; fresh tomato and herbs on the side.', lt: 'Špinatus apkepkite svieste, dėkite minkštai virtus kiaušinius; šalia — šviežias pomidoras ir žolelės.' },
  },
  {
    id: 'rice-beans', meal: 'dinner', icon: '🍛',
    name: { en: 'Rice and beans with peppers and cumin', lt: 'Ryžiai su pupelėmis, paprika ir kmynais' },
    items: [['rice', 120], ['beans', 120], ['pepper', 80], ['cumin', 5], ['oliveOil', 10], ['lemon', 10]],
    synergy: { en: 'A complete plant protein; raw pepper and lemon add vitamin C for the beans’ iron, cumin eases digestion.', lt: 'Pilnavertis augalinis baltymas; žalia paprika ir citrina prideda vitamino C pupelių geležiai, kmynai lengvina virškinimą.' },
    how: { en: 'Keep portions modest; add the pepper raw at the end.', lt: 'Porcijos saikingos; papriką dėkite žalią pabaigoje.' },
  },
  {
    id: 'watermelon', meal: 'snack', icon: '🍉',
    name: { en: 'Watermelon — on its own', lt: 'Arbūzas — atskirai' },
    items: [['watermelon', 300]],
    synergy: { en: 'Perfect alone: the fastest-digesting, highest-water food. Eat 30 minutes before anything else.', lt: 'Tobulas atskirai: greičiausiai virškinamas, vandeningiausias maistas. Valgykite 30 min. prieš kitą maistą.' },
    how: { en: 'Chilled, between meals.', lt: 'Atvėsintą, tarp valgių.' },
  },
  {
    id: 'berries-almonds', meal: 'snack', icon: '🫐',
    name: { en: 'Berries with almonds', lt: 'Uogos su migdolais' },
    items: [['berries', 150], ['almonds', 20]],
    synergy: { en: 'Acid fruit and nuts — a light, high-vibration snack that keeps you full.', lt: 'Rūgštūs vaisiai ir riešutai — lengvas, aukštos vibracijos užkandis, ilgai palaikantis sotumą.' },
    how: { en: 'A handful of each, mid-afternoon.', lt: 'Po saują, popietę.' },
  },
]

export type DishIngredient = { name: Bi; group: GroupId; icon: string; angstrom: number; grams: number }

export type Dish = {
  id: string
  meal: Meal
  icon: string
  name: Bi
  synergy: Bi
  how: Bi
  ingredients: DishIngredient[]
  /** Portion-weighted average Å. */
  angstrom: number
  tierId: string
  /** Pairs of distinct food groups in the dish. */
  pairs: { a: GroupId; b: GroupId; rating: Rating }[]
  /** 0–100: good pairs count 1, ok pairs 0.5, bad 0. A single group scores 100. */
  harmony: number
}

const icon = (g: GroupId) => FOOD_GROUPS.find((x) => x.id === g)!.icon

function tierFor(a: number) {
  return FOOD_TIERS.find((t) => t.max > 0 && a >= t.min && a <= t.max)?.id ?? 'dead'
}

function build(def: DishDef): Dish {
  const ingredients = def.items.map(([k, grams]) => ({ ...ING[k], icon: icon(ING[k].group), grams }))
  const total = ingredients.reduce((s, i) => s + i.grams, 0)
  const angstrom = Math.round(ingredients.reduce((s, i) => s + i.angstrom * i.grams, 0) / total / 50) * 50
  const groups = [...new Set(ingredients.map((i) => i.group))]
  const pairs: Dish['pairs'] = []
  for (let i = 0; i < groups.length; i++)
    for (let j = i + 1; j < groups.length; j++)
      pairs.push({ a: groups[i], b: groups[j], rating: getPair(groups[i], groups[j]).rating })
  const score = pairs.reduce((s, p) => s + (p.rating === 'good' ? 1 : p.rating === 'ok' ? 0.5 : 0), 0)
  const harmony = pairs.length ? Math.round((score / pairs.length) * 100) : 100
  return { id: def.id, meal: def.meal, icon: def.icon, name: def.name, synergy: def.synergy, how: def.how, ingredients, angstrom, tierId: tierFor(angstrom), pairs, harmony }
}

export const MENU: Dish[] = DISHES.map(build)
