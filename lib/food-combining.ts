/**
 * Food combining: which food groups support each other ("symbiosis") and
 * which clash. Ratings follow the classic food-combining tradition (Hay,
 * Shelton) softened where modern nutrition clearly disagrees. The pair cards
 * below are tagged by source so readers can tell evidence from tradition.
 */

import type { Bi } from './food-angstrom'

export type GroupId =
  | 'protein'
  | 'legumes'
  | 'starch'
  | 'veg'
  | 'fat'
  | 'nuts'
  | 'sweetFruit'
  | 'sourFruit'
  | 'melon'
  | 'milk'

export type Rating = 'good' | 'ok' | 'bad'

export type FoodGroup = {
  id: GroupId
  icon: string
  name: Bi
  examples: Bi
}

export const FOOD_GROUPS: FoodGroup[] = [
  { id: 'protein', icon: '🥩', name: { en: 'Animal protein', lt: 'Gyvūniniai baltymai' }, examples: { en: 'meat, fish, eggs, cheese', lt: 'mėsa, žuvis, kiaušiniai, sūris' } },
  { id: 'legumes', icon: '🫘', name: { en: 'Legumes', lt: 'Ankštiniai' }, examples: { en: 'beans, lentils, chickpeas, peas', lt: 'pupelės, lęšiai, avinžirniai, žirniai' } },
  { id: 'starch', icon: '🍞', name: { en: 'Grains & starches', lt: 'Grūdai ir krakmolas' }, examples: { en: 'bread, rice, potatoes, pasta, buckwheat', lt: 'duona, ryžiai, bulvės, makaronai, grikiai' } },
  { id: 'veg', icon: '🥬', name: { en: 'Vegetables & greens', lt: 'Daržovės ir žalumynai' }, examples: { en: 'leafy greens, cucumber, cabbage, broccoli, herbs', lt: 'lapinės daržovės, agurkai, kopūstai, brokoliai, žolelės' } },
  { id: 'fat', icon: '🫒', name: { en: 'Healthy fats', lt: 'Sveiki riebalai' }, examples: { en: 'olive oil, butter, avocado, cream', lt: 'alyvuogių aliejus, sviestas, avokadas, grietinėlė' } },
  { id: 'nuts', icon: '🌰', name: { en: 'Nuts & seeds', lt: 'Riešutai ir sėklos' }, examples: { en: 'almonds, walnuts, sunflower, flax', lt: 'migdolai, graikiniai riešutai, saulėgrąžos, linų sėmenys' } },
  { id: 'sweetFruit', icon: '🍌', name: { en: 'Sweet fruit', lt: 'Saldūs vaisiai' }, examples: { en: 'banana, dates, figs, raisins, grapes', lt: 'bananai, datulės, figos, razinos, vynuogės' } },
  { id: 'sourFruit', icon: '🍋', name: { en: 'Sour fruit & berries', lt: 'Rūgštūs vaisiai ir uogos' }, examples: { en: 'citrus, apples, berries, kiwi', lt: 'citrusai, obuoliai, uogos, kiviai' } },
  { id: 'melon', icon: '🍉', name: { en: 'Melons', lt: 'Melionai' }, examples: { en: 'watermelon, melon', lt: 'arbūzas, melionas' } },
  { id: 'milk', icon: '🥛', name: { en: 'Fresh milk', lt: 'Šviežias pienas' }, examples: { en: 'milk (fermented dairy is gentler)', lt: 'pienas (rauginti produktai švelnesni)' } },
]

type PairNote = { rating: Rating; note?: Bi }

const P = (rating: Rating, en?: string, lt?: string): PairNote =>
  en && lt ? { rating, note: { en, lt } } : { rating }

/** Upper triangle of the symmetric matrix, keyed "a|b" in FOOD_GROUPS order. */
const PAIRS: Record<string, PairNote> = {
  'protein|protein': P('ok', 'One concentrated protein per meal digests most easily.', 'Vienas koncentruotas baltymas per valgį virškinamas lengviausiai.'),
  'protein|legumes': P('bad', 'Two concentrated proteins at once overload digestion.', 'Du koncentruoti baltymai vienu metu perkrauna virškinimą.'),
  'protein|starch': P('bad', 'The classic clash of food combining: protein needs acid, starch needs an alkaline start. Meat and potatoes sit heavy.', 'Klasikinis derinių konfliktas: baltymams reikia rūgščios terpės, krakmolui — šarminės. Mėsa su bulvėmis guli sunkiai.'),
  'protein|veg': P('good', 'The ideal partner: greens and vegetables carry protein through with fibre, enzymes and minerals.', 'Idealus partneris: žalumynai ir daržovės padeda suvirškinti baltymus — skaidulos, fermentai, mineralai.'),
  'protein|fat': P('ok', 'Fat slows protein digestion — fine in small amounts, e.g. olive oil on fish.', 'Riebalai lėtina baltymų virškinimą — nedaug tinka, pvz., alyvuogių aliejus ant žuvies.'),
  'protein|nuts': P('bad', 'Two dense proteins — heavy together.', 'Du tankūs baltymai — kartu sunku.'),
  'protein|sweetFruit': P('bad', 'Sugar held back behind slow protein ferments.', 'Cukrus, užlaikytas už lėtai virškinamų baltymų, rūgsta.'),
  'protein|sourFruit': P('ok', 'A squeeze of lemon on fish is fine; a fruit dessert after meat is not.', 'Citrinos sultys ant žuvies tinka; vaisių desertas po mėsos — ne.'),
  'protein|melon': P('bad', 'Melon digests in minutes; held behind protein it ferments.', 'Melionas suvirškinamas per kelias minutes; užlaikytas už baltymų — rūgsta.'),
  'protein|milk': P('bad', 'Ayurveda counts fish or meat with milk among the most incompatible foods.', 'Ajurveda žuvį ar mėsą su pienu laiko vienu nesuderinamiausių derinių.'),
  'legumes|legumes': P('ok'),
  'legumes|starch': P('ok', 'Nutrition science: together they make a complete protein (rice and beans). Food combining: heavy. Eat smaller portions, well cooked, with spices.', 'Mityba: kartu sudaro pilnavertį baltymą (ryžiai ir pupelės). Derinių tradicija: sunku. Mažesnės porcijos, gerai išvirta, su prieskoniais.'),
  'legumes|veg': P('good', 'Vegetables lighten legumes and add the vitamin C that helps their iron absorb.', 'Daržovės palengvina ankštinius ir prideda vitamino C, kuris padeda įsisavinti jų geležį.'),
  'legumes|fat': P('good', 'Olive oil with lentils or hummus — a classic, easy pairing.', 'Alyvuogių aliejus su lęšiais ar humusu — klasikinis, lengvas derinys.'),
  'legumes|nuts': P('ok'),
  'legumes|sweetFruit': P('bad', 'Sugar plus slow-digesting legumes means gas and bloating.', 'Cukrus kartu su lėtai virškinamais ankštiniais — dujos ir pilvo pūtimas.'),
  'legumes|sourFruit': P('ok', 'Lemon juice over lentils helps iron; a fruit bowl alongside does not.', 'Citrinos sultys ant lęšių padeda geležiai; vaisių dubenėlis šalia — ne.'),
  'legumes|melon': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'legumes|milk': P('bad', 'Heavy and gas-forming together.', 'Kartu sunku ir sukelia dujas.'),
  'starch|starch': P('ok', 'One starch at a time is lighter (not bread with potatoes and pasta).', 'Vienas krakmolingas produktas vienu metu lengvesnis (ne duona su bulvėmis ir makaronais).'),
  'starch|veg': P('good', 'Grains and potatoes with plenty of vegetables — a light, balanced plate.', 'Grūdai ir bulvės su gausiai daržovių — lengva, subalansuota lėkštė.'),
  'starch|fat': P('good', 'Butter on buckwheat, olive oil on potatoes: fat steadies the rise in blood sugar.', 'Sviestas ant grikių, aliejus ant bulvių: riebalai sušvelnina cukraus šuolį kraujyje.'),
  'starch|nuts': P('ok'),
  'starch|sweetFruit': P('ok', 'Porridge with dried fruit suits many people; sensitive digestion may ferment it.', 'Košė su džiovintais vaisiais tinka daugeliui; jautrus virškinimas gali rūgti.'),
  'starch|sourFruit': P('bad', 'Acid stops the starch-digesting enzyme in saliva — bread with oranges or apples ferments.', 'Rūgštis stabdo seilių fermentą, skaidantį krakmolą — duona su apelsinais ar obuoliais rūgsta.'),
  'starch|melon': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'starch|milk': P('ok', 'Milk porridge is traditional; spices like cinnamon or cardamom make it lighter.', 'Pieniška košė — tradicinė; cinamonas ar kardamonas ją palengvina.'),
  'veg|veg': P('good', 'Vegetables combine with each other freely — the more colours, the better.', 'Daržovės tarpusavyje derinasi laisvai — kuo daugiau spalvų, tuo geriau.'),
  'veg|fat': P('good', 'Fat unlocks vitamins A, D, E and K and carotenoids in vegetables.', 'Riebalai atrakina daržovėse esančius vitaminus A, D, E, K ir karotinoidus.'),
  'veg|nuts': P('good', 'Seeds on salad — extra minerals and fats that carry vitamins.', 'Sėklos ant salotų — papildomi mineralai ir riebalai, nešantys vitaminus.'),
  'veg|sweetFruit': P('ok', 'Leafy greens blend well with fruit in smoothies; starchy vegetables less so.', 'Lapiniai žalumynai gerai dera su vaisiais kokteiliuose; krakmolingos daržovės — mažiau.'),
  'veg|sourFruit': P('good', 'Lemon on greens: vitamin C multiplies iron absorption.', 'Citrina ant žalumynų: vitaminas C kelis kartus padidina geležies įsisavinimą.'),
  'veg|melon': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'veg|milk': P('ok'),
  'fat|fat': P('ok', 'One main fat per dish is plenty.', 'Vieno pagrindinio riebalo patiekale pakanka.'),
  'fat|nuts': P('ok'),
  'fat|sweetFruit': P('ok'),
  'fat|sourFruit': P('ok', 'Avocado with lime or citrus works well.', 'Avokadas su laimu ar citrusais dera gerai.'),
  'fat|melon': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'fat|milk': P('ok'),
  'nuts|nuts': P('ok'),
  'nuts|sweetFruit': P('ok', 'Dates with almonds: a small, dense snack — easy to overeat.', 'Datulės su migdolais: maži, tirštų kalorijų užkandžiai — lengva persivalgyti.'),
  'nuts|sourFruit': P('good', 'Shelton’s favourite: acid fruit helps nuts digest. Apple with walnuts, berries with almonds.', 'Sheltono mėgstamas: rūgštūs vaisiai padeda virškinti riešutus. Obuolys su graikiniais riešutais, uogos su migdolais.'),
  'nuts|melon': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'nuts|milk': P('ok'),
  'sweetFruit|sweetFruit': P('good'),
  'sweetFruit|sourFruit': P('ok', 'Sub-acid fruits (pear, grape) bridge the two; banana with orange is heavier.', 'Pusiau rūgštūs vaisiai (kriaušė, vynuogė) jungia abi grupes; bananas su apelsinu sunkesnis.'),
  'sweetFruit|melon': P('bad', '“Eat it alone or leave it alone.”', '„Valgyk atskirai arba nevalgyk.“'),
  'sweetFruit|milk': P('ok', 'Ayurveda warns against milk with banana in particular.', 'Ajurveda ypač perspėja dėl pieno su bananu.'),
  'sourFruit|sourFruit': P('good'),
  'sourFruit|melon': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'sourFruit|milk': P('bad', 'Acid curdles milk in the stomach — Ayurveda lists it as incompatible.', 'Rūgštis sutraukia pieną skrandyje — ajurveda tai laiko nesuderinamu.'),
  'melon|melon': P('good', 'Melons on their own, 30 minutes before other food.', 'Melionai atskirai, 30 min. prieš kitą maistą.'),
  'melon|milk': P('bad', 'Melon is best eaten alone.', 'Melioną geriausia valgyti atskirai.'),
  'milk|milk': P('ok', 'Warm, spiced milk on its own is the gentlest way.', 'Šiltas pienas su prieskoniais, išgertas atskirai — švelniausias būdas.'),
}

const ORDER = FOOD_GROUPS.map((g) => g.id)

export function getPair(a: GroupId, b: GroupId): PairNote {
  const [x, y] = ORDER.indexOf(a) <= ORDER.indexOf(b) ? [a, b] : [b, a]
  return PAIRS[`${x}|${y}`] ?? { rating: 'ok' }
}

export const RATING_STYLE: Record<Rating, { color: string; bg: string; label: Bi; symbol: string }> = {
  good: { color: '#2d6a4f', bg: '#d8efe2', symbol: '✓', label: { en: 'Symbiosis', lt: 'Simbiozė' } },
  ok: { color: '#8a6a12', bg: '#f6ecc6', symbol: '~', label: { en: 'OK in moderation', lt: 'Tinka saikingai' } },
  bad: { color: '#a63d2a', bg: '#f6d9d1', symbol: '✕', label: { en: 'Conflict', lt: 'Konfliktas' } },
}
