/**
 * Shared food database: every food with its approximate ångström (Å) value,
 * its category for browsing, and its food-combining group.
 *
 * `s: true` marks foods (or food types) for which Simoneton's own figures are
 * commonly cited. All other values are estimated from his tiers and rules:
 * fresh, raw and ripe score highest; time, heat, refining and preserving lower
 * the value; industrial products fall towards zero.
 */

import type { Bi } from './food-angstrom'
import type { GroupId } from './food-combining'

export type CategoryId =
  | 'fruit'
  | 'berries'
  | 'veg'
  | 'greens'
  | 'cookedVeg'
  | 'grains'
  | 'legumes'
  | 'nuts'
  | 'fats'
  | 'dairy'
  | 'fish'
  | 'meat'
  | 'sweet'
  | 'drinks'
  | 'ferments'
  | 'processed'

export const CATEGORIES: { id: CategoryId; icon: string; name: Bi }[] = [
  { id: 'fruit', icon: '🍎', name: { en: 'Fruit', lt: 'Vaisiai' } },
  { id: 'berries', icon: '🫐', name: { en: 'Berries', lt: 'Uogos' } },
  { id: 'veg', icon: '🥕', name: { en: 'Raw vegetables', lt: 'Žalios daržovės' } },
  { id: 'greens', icon: '🌿', name: { en: 'Greens, herbs & sprouts', lt: 'Žalumynai, žolelės ir daigai' } },
  { id: 'cookedVeg', icon: '🍲', name: { en: 'Cooked vegetables', lt: 'Termiškai apdorotos daržovės' } },
  { id: 'grains', icon: '🌾', name: { en: 'Grains & bread', lt: 'Grūdai ir duona' } },
  { id: 'legumes', icon: '🫘', name: { en: 'Legumes', lt: 'Ankštiniai' } },
  { id: 'nuts', icon: '🌰', name: { en: 'Nuts & seeds', lt: 'Riešutai ir sėklos' } },
  { id: 'fats', icon: '🫒', name: { en: 'Oils & fats', lt: 'Aliejai ir riebalai' } },
  { id: 'dairy', icon: '🥛', name: { en: 'Dairy & eggs', lt: 'Pieno produktai ir kiaušiniai' } },
  { id: 'fish', icon: '🐟', name: { en: 'Fish & seafood', lt: 'Žuvis ir jūros gėrybės' } },
  { id: 'meat', icon: '🥩', name: { en: 'Meat', lt: 'Mėsa' } },
  { id: 'sweet', icon: '🍯', name: { en: 'Sweeteners & sweets', lt: 'Saldikliai ir saldumynai' } },
  { id: 'drinks', icon: '🍵', name: { en: 'Drinks', lt: 'Gėrimai' } },
  { id: 'ferments', icon: '🫙', name: { en: 'Ferments', lt: 'Fermentuoti produktai' } },
  { id: 'processed', icon: '🏭', name: { en: 'Industrial foods', lt: 'Pramoniniai produktai' } },
]

export type Food = {
  id: string
  name: Bi
  cat: CategoryId
  /** Food-combining group; null for drinks, sweeteners and the like. */
  group: GroupId | null
  angstrom: number
  /** Simoneton's own figure is commonly cited for this food (type). */
  s?: boolean
  /** Contains gluten. */
  gluten?: boolean
  /** Animal origin: 'meat' | 'fish' | 'dairy' | 'egg' | 'honey'. */
  animal?: 'meat' | 'fish' | 'dairy' | 'egg' | 'honey'
}

type Opt = Pick<Food, 's' | 'gluten' | 'animal'>

const f = (id: string, en: string, lt: string, cat: CategoryId, group: GroupId | null, angstrom: number, opt: Opt = {}): Food => ({
  id,
  name: { en, lt },
  cat,
  group,
  angstrom,
  ...opt,
})

const S = { s: true } as const

export const FOODS: Food[] = [
  // Fruit
  f('apple', 'Apple', 'Obuolys', 'fruit', 'sourFruit', 9000, S),
  f('pear', 'Pear', 'Kriaušė', 'fruit', 'sweetFruit', 8500, S),
  f('banana', 'Ripe banana', 'Prinokęs bananas', 'fruit', 'sweetFruit', 8500, S),
  f('orange', 'Orange', 'Apelsinas', 'fruit', 'sourFruit', 8500, S),
  f('lemon', 'Lemon', 'Citrina', 'fruit', 'sourFruit', 9000, S),
  f('grapefruit', 'Grapefruit', 'Greipfrutas', 'fruit', 'sourFruit', 8500),
  f('grapes', 'Grapes', 'Vynuogės', 'fruit', 'sweetFruit', 9000, S),
  f('figFresh', 'Fresh figs', 'Šviežios figos', 'fruit', 'sweetFruit', 9000),
  f('plum', 'Plums', 'Slyvos', 'fruit', 'sourFruit', 8500),
  f('cherry', 'Cherries', 'Vyšnios ir trešnės', 'fruit', 'sourFruit', 9000),
  f('apricot', 'Apricots', 'Abrikosai', 'fruit', 'sweetFruit', 8500),
  f('peach', 'Peaches', 'Persikai', 'fruit', 'sweetFruit', 8500),
  f('kiwi', 'Kiwi', 'Kivis', 'fruit', 'sourFruit', 9000),
  f('pineapple', 'Pineapple', 'Ananasas', 'fruit', 'sourFruit', 8500),
  f('mango', 'Mango', 'Mangas', 'fruit', 'sweetFruit', 8500),
  f('avocado', 'Avocado', 'Avokadas', 'fruit', 'fat', 8500),
  f('watermelon', 'Watermelon', 'Arbūzas', 'fruit', 'melon', 9000),
  f('melon', 'Melon', 'Melionas', 'fruit', 'melon', 9000),
  f('dates', 'Dates (dried)', 'Datulės (džiovintos)', 'fruit', 'sweetFruit', 7500),
  f('raisins', 'Raisins', 'Razinos', 'fruit', 'sweetFruit', 7500),
  f('driedApricot', 'Dried apricots', 'Džiovinti abrikosai', 'fruit', 'sweetFruit', 7000),
  f('stewedFruit', 'Stewed fruit / compote', 'Virti vaisiai / kompotas', 'fruit', 'sweetFruit', 2500, S),

  // Berries
  f('strawberry', 'Strawberries', 'Braškės', 'berries', 'sourFruit', 9500),
  f('blueberry', 'Blueberries', 'Mėlynės', 'berries', 'sourFruit', 9500),
  f('raspberry', 'Raspberries', 'Avietės', 'berries', 'sourFruit', 9500),
  f('currant', 'Blackcurrants', 'Juodieji serbentai', 'berries', 'sourFruit', 9500),
  f('seaBuckthorn', 'Sea buckthorn', 'Šaltalankiai', 'berries', 'sourFruit', 9500),
  f('cranberry', 'Cranberries', 'Spanguolės', 'berries', 'sourFruit', 9000),
  f('lingonberry', 'Lingonberries', 'Bruknės', 'berries', 'sourFruit', 9000),
  f('gooseberry', 'Gooseberries', 'Agrastai', 'berries', 'sourFruit', 9000),
  f('frozenBerries', 'Frozen berries', 'Šaldytos uogos', 'berries', 'sourFruit', 7000),

  // Raw vegetables
  f('cucumber', 'Cucumber', 'Agurkas', 'veg', 'veg', 9000, S),
  f('tomato', 'Fresh tomato', 'Šviežias pomidoras', 'veg', 'veg', 8000, S),
  f('pepper', 'Bell pepper', 'Paprika', 'veg', 'veg', 8500),
  f('zucchini', 'Zucchini', 'Cukinija', 'veg', 'veg', 8000),
  f('cabbage', 'White cabbage', 'Baltasis kopūstas', 'veg', 'veg', 8500, S),
  f('broccoliRaw', 'Raw broccoli', 'Žali brokoliai', 'veg', 'veg', 8500),
  f('cauliflower', 'Raw cauliflower', 'Žalias žiedinis kopūstas', 'veg', 'veg', 8000),
  f('kohlrabi', 'Kohlrabi', 'Kaliaropė', 'veg', 'veg', 8500),
  f('radish', 'Radish', 'Ridikėliai', 'veg', 'veg', 8500),
  f('onion', 'Raw onion', 'Žalias svogūnas', 'veg', 'veg', 8000),
  f('garlic', 'Garlic', 'Česnakas', 'veg', 'veg', 8500),
  f('carrot', 'Raw carrot', 'Žalia morka', 'veg', 'veg', 8500, S),
  f('beetRaw', 'Raw beetroot', 'Žalias burokėlis', 'veg', 'veg', 8500),
  f('celery', 'Celery', 'Salierai', 'veg', 'veg', 9000),
  f('asparagus', 'Asparagus', 'Šparagai', 'veg', 'veg', 8500),
  f('ginger', 'Fresh ginger', 'Šviežias imbieras', 'veg', 'veg', 8500),
  f('peasFresh', 'Fresh green peas', 'Švieži žalieji žirneliai', 'veg', 'veg', 8500),
  f('cornCob', 'Fresh sweet corn', 'Švieži saldieji kukurūzai', 'veg', 'starch', 6500),

  // Greens, herbs & sprouts
  f('lettuce', 'Lettuce', 'Salotos', 'greens', 'veg', 9000, S),
  f('spinach', 'Fresh spinach', 'Švieži špinatai', 'greens', 'veg', 8500, S),
  f('kale', 'Kale', 'Lapiniai kopūstai', 'greens', 'veg', 9000),
  f('rocket', 'Rocket', 'Rukola', 'greens', 'veg', 9000),
  f('dill', 'Dill', 'Krapai', 'greens', 'veg', 9000),
  f('parsley', 'Parsley', 'Petražolės', 'greens', 'veg', 9500),
  f('nettle', 'Young nettle', 'Jaunos dilgėlės', 'greens', 'veg', 9500),
  f('sorrel', 'Sorrel', 'Rūgštynės', 'greens', 'veg', 9000),
  f('basil', 'Basil', 'Bazilikas', 'greens', 'veg', 9000),
  f('mint', 'Mint', 'Mėta', 'greens', 'veg', 9000),
  f('wheatSprouts', 'Wheat sprouts', 'Kviečių daigai', 'greens', 'starch', 9500),
  f('mungSprouts', 'Mung bean sprouts', 'Mung pupelių daigai', 'greens', 'veg', 9000),
  f('microgreens', 'Microgreens', 'Mikrožalumynai', 'greens', 'veg', 9500),
  f('spices', 'Turmeric & black pepper', 'Ciberžolė ir juodieji pipirai', 'greens', 'veg', 8000),
  f('cumin', 'Cumin & fennel seed', 'Kmynai ir pankoliai', 'greens', 'veg', 8000),

  // Cooked vegetables
  f('broccoliSteamed', 'Steamed broccoli', 'Garinti brokoliai', 'cookedVeg', 'veg', 6000, S),
  f('carrotSteamed', 'Steamed carrots', 'Garintos morkos', 'cookedVeg', 'veg', 6500, S),
  f('carrotBoiled', 'Boiled carrots', 'Virtos morkos', 'cookedVeg', 'veg', 5000, S),
  f('spinachCooked', 'Sautéed spinach', 'Troškinti špinatai', 'cookedVeg', 'veg', 6000),
  f('tomatoCooked', 'Stewed tomatoes', 'Troškinti pomidorai', 'cookedVeg', 'veg', 5500),
  f('beetBoiled', 'Boiled beetroot', 'Virti burokėliai', 'cookedVeg', 'veg', 5500),
  f('cabbageStewed', 'Stewed cabbage', 'Troškinti kopūstai', 'cookedVeg', 'veg', 4500),
  f('pumpkin', 'Baked pumpkin', 'Keptas moliūgas', 'cookedVeg', 'veg', 5500),
  f('zucchiniGrilled', 'Grilled zucchini', 'Kepta cukinija', 'cookedVeg', 'veg', 5000),
  f('mushrooms', 'Cooked mushrooms', 'Virti grybai', 'cookedVeg', 'veg', 4500),
  f('potatoes', 'Boiled potatoes', 'Virtos bulvės', 'cookedVeg', 'starch', 5000, S),
  f('potatoBaked', 'Baked potatoes', 'Keptos bulvės orkaitėje', 'cookedVeg', 'starch', 4500),
  f('sweetPotato', 'Baked sweet potato', 'Kepta batatas', 'cookedVeg', 'starch', 5000),
  f('potatoFried', 'Fried potatoes', 'Keptos bulvės keptuvėje', 'cookedVeg', 'starch', 3000),
  f('fries', 'French fries', 'Bulvytės fri', 'cookedVeg', 'starch', 1500),

  // Grains & bread
  f('wheatWhole', 'Whole wheat grain', 'Viso grūdo kviečiai', 'grains', 'starch', 8500, { s: true, gluten: true }),
  f('buckwheatGreen', 'Green (raw) buckwheat, soaked', 'Žali grikiai, mirkyti', 'grains', 'starch', 8500),
  f('buckwheat', 'Buckwheat, cooked', 'Grikiai, virti', 'grains', 'starch', 6000),
  f('oatsSoaked', 'Rolled oats, soaked', 'Avižiniai dribsniai, mirkyti', 'grains', 'starch', 8000, { gluten: true }),
  f('oatmeal', 'Oat porridge, cooked', 'Avižinė košė, virta', 'grains', 'starch', 5500, { gluten: true }),
  f('millet', 'Millet, cooked', 'Soros, virtos', 'grains', 'starch', 5500),
  f('quinoa', 'Quinoa, cooked', 'Bolivinė balanda, virta', 'grains', 'starch', 6000),
  f('rice', 'Brown rice, cooked', 'Rudieji ryžiai, virti', 'grains', 'starch', 5500),
  f('whiteRice', 'White rice', 'Baltieji ryžiai', 'grains', 'starch', 3000),
  f('ryeBread', 'Rye sourdough bread', 'Ruginė raugo duona', 'grains', 'starch', 6000, { gluten: true }),
  f('wholemealBread', 'Wholemeal bread', 'Rupių miltų duona', 'grains', 'starch', 5000, { s: true, gluten: true }),
  f('wholegrainPasta', 'Wholegrain pasta', 'Viso grūdo makaronai', 'grains', 'starch', 4500, { gluten: true }),
  f('pasta', 'White pasta', 'Balti makaronai', 'grains', 'starch', 2500, { gluten: true }),
  f('whiteBread', 'White bread', 'Balta duona', 'grains', 'starch', 2000, { s: true, gluten: true }),
  f('whiteFlour', 'Bleached white flour', 'Balinti balti miltai', 'grains', 'starch', 0, { s: true, gluten: true }),

  // Legumes
  f('lentils', 'Lentils, cooked', 'Lęšiai, virti', 'legumes', 'legumes', 5000),
  f('beans', 'Beans, cooked', 'Pupelės, virtos', 'legumes', 'legumes', 5000),
  f('chickpeas', 'Chickpeas, cooked', 'Avinžirniai, virti', 'legumes', 'legumes', 5000),
  f('hummus', 'Hummus', 'Humusas', 'legumes', 'legumes', 5500),
  f('sproutedLentils', 'Sprouted lentils', 'Daiginti lęšiai', 'legumes', 'legumes', 8500),
  f('tofu', 'Tofu', 'Tofu', 'legumes', 'legumes', 4500),
  f('cannedBeans', 'Canned beans', 'Konservuotos pupelės', 'legumes', 'legumes', 1500),

  // Nuts & seeds
  f('almonds', 'Almonds', 'Migdolai', 'nuts', 'nuts', 8000, S),
  f('walnuts', 'Walnuts', 'Graikiniai riešutai', 'nuts', 'nuts', 8000, S),
  f('hazelnuts', 'Hazelnuts', 'Lazdyno riešutai', 'nuts', 'nuts', 8000, S),
  f('sunflower', 'Sunflower seeds', 'Saulėgrąžos', 'nuts', 'nuts', 8000),
  f('pumpkinSeeds', 'Pumpkin seeds', 'Moliūgų sėklos', 'nuts', 'nuts', 8000),
  f('flax', 'Ground flaxseed', 'Malti linų sėmenys', 'nuts', 'nuts', 8000),
  f('chia', 'Chia seeds', 'Šalavijų sėklos', 'nuts', 'nuts', 8000),
  f('sesame', 'Sesame / tahini', 'Sezamas / tahinis', 'nuts', 'nuts', 7500),
  f('cashews', 'Cashews', 'Anakardžiai', 'nuts', 'nuts', 6000),
  f('saltedPeanuts', 'Roasted salted peanuts', 'Skrudinti sūdyti žemės riešutai', 'nuts', 'nuts', 3000),

  // Oils & fats
  f('oliveOil', 'Cold-pressed olive oil', 'Šalto spaudimo alyvuogių aliejus', 'fats', 'fat', 8500, S),
  f('flaxOil', 'Cold-pressed flax oil', 'Šalto spaudimo linų aliejus', 'fats', 'fat', 8500),
  f('sunflowerOil', 'Cold-pressed sunflower oil', 'Šalto spaudimo saulėgrąžų aliejus', 'fats', 'fat', 8000),
  f('butter', 'Fresh butter', 'Šviežias sviestas', 'fats', 'fat', 8000, { s: true, animal: 'dairy' }),
  f('ghee', 'Ghee', 'Lydytas sviestas (ghi)', 'fats', 'fat', 7000, { animal: 'dairy' }),
  f('coconut', 'Unsweetened coconut flakes', 'Nesaldintos kokoso drožlės', 'nuts', 'nuts', 6500),
  f('coconutOil', 'Virgin coconut oil', 'Nerafinuotas kokosų aliejus', 'fats', 'fat', 7500),
  f('peanutOil', 'Peanut oil', 'Žemės riešutų aliejus', 'fats', 'fat', 4500, S),
  f('refinedOil', 'Refined vegetable oil', 'Rafinuotas augalinis aliejus', 'fats', 'fat', 2000),
  f('margarine', 'Margarine', 'Margarinas', 'fats', 'fat', 0, S),

  // Dairy & eggs
  f('milkRaw', 'Fresh raw milk', 'Šviežias nevirintas pienas', 'dairy', 'milk', 6500, { s: true, animal: 'dairy' }),
  f('milkDay', 'Milk a day after milking', 'Parą stovėjęs pienas', 'dairy', 'milk', 4000, { s: true, animal: 'dairy' }),
  f('milkPast', 'Pasteurised milk', 'Pasterizuotas pienas', 'dairy', 'milk', 0, { s: true, animal: 'dairy' }),
  f('kefir', 'Kefir', 'Kefyras', 'dairy', 'milk', 6500, { animal: 'dairy' }),
  f('yogurt', 'Live yogurt', 'Gyvas jogurtas', 'dairy', 'milk', 6000, { animal: 'dairy' }),
  f('cottage', 'Fresh cottage cheese', 'Šviežia varškė', 'dairy', 'protein', 6000, { animal: 'dairy' }),
  f('sourCream', 'Sour cream', 'Grietinė', 'dairy', 'fat', 5500, { animal: 'dairy' }),
  f('hardCheese', 'Aged hard cheese', 'Brandintas kietasis sūris', 'dairy', 'protein', 4000, { animal: 'dairy' }),
  f('processedCheese', 'Processed cheese', 'Lydytas sūris', 'dairy', 'protein', 1500, { s: true, animal: 'dairy' }),
  f('eggs', 'Fresh eggs', 'Švieži kiaušiniai', 'dairy', 'protein', 7500, { s: true, animal: 'egg' }),
  f('eggsSoft', 'Soft-boiled eggs', 'Minkštai virti kiaušiniai', 'dairy', 'protein', 6000, { animal: 'egg' }),
  f('eggsFried', 'Fried eggs', 'Kiaušinienė (kepta)', 'dairy', 'protein', 4000, { animal: 'egg' }),

  // Fish & seafood
  f('fishFresh', 'Very fresh sea fish (raw / cured)', 'Labai šviežia jūros žuvis (žalia / marinuota)', 'fish', 'protein', 7500, { s: true, animal: 'fish' }),
  f('salmon', 'Baked salmon', 'Kepta lašiša', 'fish', 'protein', 5000, { s: true, animal: 'fish' }),
  f('fishSteamed', 'Steamed white fish', 'Garinta balta žuvis', 'fish', 'protein', 5500, { animal: 'fish' }),
  f('herring', 'Salted herring', 'Sūdyta silkė', 'fish', 'protein', 3500, { animal: 'fish' }),
  f('smokedFish', 'Smoked fish', 'Rūkyta žuvis', 'fish', 'protein', 3000, { animal: 'fish' }),
  f('shrimp', 'Boiled shrimp', 'Virtos krevetės', 'fish', 'protein', 4500, { animal: 'fish' }),
  f('cannedTuna', 'Canned tuna', 'Konservuotas tunas', 'fish', 'protein', 1000, { animal: 'fish' }),

  // Meat
  f('chicken', 'Boiled chicken', 'Virta vištiena', 'meat', 'protein', 3000, { s: true, animal: 'meat' }),
  f('meatStewed', 'Stewed meat', 'Troškinta mėsa', 'meat', 'protein', 2500, { s: true, animal: 'meat' }),
  f('meatFried', 'Fried or grilled meat', 'Kepta ar grilinta mėsa', 'meat', 'protein', 2000, { animal: 'meat' }),
  f('broth', 'Bone broth', 'Kaulų sultinys', 'meat', 'protein', 3500, { animal: 'meat' }),
  f('ham', 'Ham & cured meats', 'Kumpis ir vytinta mėsa', 'meat', 'protein', 1500, { s: true, animal: 'meat' }),
  f('sausage', 'Sausages', 'Dešros ir dešrelės', 'meat', 'protein', 1000, { s: true, animal: 'meat' }),

  // Sweeteners & sweets
  f('honey', 'Raw honey', 'Nekaitintas medus', 'sweet', null, 8000, { animal: 'honey' }),
  f('honeyHeated', 'Heated honey', 'Kaitintas medus', 'sweet', null, 2000, { animal: 'honey' }),
  f('caneSugar', 'Unrefined cane sugar', 'Nerafinuotas cukranendrių cukrus', 'sweet', null, 5000, S),
  f('mapleSyrup', 'Maple syrup', 'Klevų sirupas', 'sweet', null, 4000),
  f('rawCacao', 'Raw cacao', 'Žalia kakava', 'sweet', null, 6000),
  f('darkChocolate', 'Dark chocolate (70%+)', 'Juodasis šokoladas (70 %+)', 'sweet', null, 3500),
  f('chocolate', 'Milk chocolate', 'Pieninis šokoladas', 'sweet', null, 2000, { s: true, animal: 'dairy' }),
  f('jam', 'Jam', 'Uogienė', 'sweet', null, 2000, S),
  f('whiteSugar', 'Refined white sugar', 'Rafinuotas baltas cukrus', 'sweet', null, 0, S),

  // Drinks
  f('freshJuice', 'Freshly pressed juice', 'Ką tik spaustos sultys', 'drinks', null, 8500),
  f('herbalTea', 'Herbal tea (warm, not boiled)', 'Žolelių arbata (šilta, nevirinta)', 'drinks', null, 6000),
  f('greenTea', 'Green tea', 'Žalioji arbata', 'drinks', null, 4500),
  f('wine', 'Natural wine', 'Natūralus vynas', 'drinks', null, 4500, S),
  f('blackTea', 'Black tea', 'Juodoji arbata', 'drinks', null, 2500, S),
  f('coffee', 'Coffee', 'Kava', 'drinks', null, 2000, S),
  f('beer', 'Beer', 'Alus', 'drinks', null, 2000),
  f('pastJuice', 'Pasteurised boxed juice', 'Pasterizuotos pakuotos sultys', 'drinks', null, 1500),
  f('spirits', 'Spirits & liqueurs', 'Stiprieji gėrimai ir likeriai', 'drinks', null, 0, S),
  f('soda', 'Soft drinks', 'Gaivieji gėrimai', 'drinks', null, 0),

  // Ferments
  f('sauerkraut', 'Raw sauerkraut', 'Žali rauginti kopūstai', 'ferments', 'veg', 7500),
  f('pickles', 'Lacto-fermented cucumbers', 'Rauginti agurkai', 'ferments', 'veg', 7000),
  f('kombucha', 'Kombucha', 'Kombuča', 'ferments', null, 6500),
  f('kvass', 'Homemade bread kvass', 'Naminė duonos gira', 'ferments', null, 6000, { gluten: true }),
  f('miso', 'Miso', 'Miso', 'ferments', 'legumes', 6000),
  f('vinegarPickles', 'Vinegar pickles (pasteurised)', 'Marinuoti acte (pasterizuoti)', 'ferments', 'veg', 2000),

  // Industrial foods
  f('cannedVeg', 'Canned vegetables', 'Konservuotos daržovės', 'processed', 'veg', 1000, S),
  f('readyMeal', 'Ready meals', 'Pusgaminiai ir gatavi patiekalai', 'processed', null, 1500),
  f('cereal', 'Sweetened breakfast cereal', 'Saldinti pusryčių dribsniai', 'processed', 'starch', 500, { gluten: true }),
  f('chips', 'Crisps', 'Traškučiai', 'processed', 'starch', 500),
  f('instantNoodles', 'Instant noodles', 'Greitai paruošiami makaronai', 'processed', 'starch', 0, { gluten: true }),
  f('pastries', 'Industrial pastries', 'Pramoniniai kepiniai', 'processed', 'starch', 500, { gluten: true }),
]

const BY_ID = new Map(FOODS.map((x) => [x.id, x]))

export function food(id: string): Food {
  const x = BY_ID.get(id)
  if (!x) throw new Error(`Unknown food: ${id}`)
  return x
}
