/**
 * Symbiotic menu: dishes built from the shared food database (ångström values)
 * and checked against the food-combining matrix. A dish's values are computed,
 * never hand-entered:
 *  - vibration: gram-weighted average of its ingredients' Å values
 *  - harmony: every pair of distinct food groups rated via getPair
 *  - diet tags: derived from the ingredients (vegan, vegetarian, gluten-free)
 * Day plans aggregate the same way across their dishes.
 */

import { tierOf, type Bi } from './food-angstrom'
import { getPair, type GroupId, type Rating } from './food-combining'
import { food, type Food } from './food-db'

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type Diet = 'vegan' | 'vegetarian' | 'glutenFree'

export const MEALS: { id: Meal; label: Bi; icon: string }[] = [
  { id: 'breakfast', icon: '🌅', label: { en: 'Breakfast', lt: 'Pusryčiai' } },
  { id: 'lunch', icon: '☀️', label: { en: 'Lunch', lt: 'Pietūs' } },
  { id: 'dinner', icon: '🌙', label: { en: 'Dinner', lt: 'Vakarienė' } },
  { id: 'snack', icon: '🍃', label: { en: 'Snack & drink', lt: 'Užkandis ir gėrimas' } },
]

export const SEASONS: { id: Season; label: Bi; icon: string }[] = [
  { id: 'spring', icon: '🌱', label: { en: 'Spring', lt: 'Pavasaris' } },
  { id: 'summer', icon: '☀️', label: { en: 'Summer', lt: 'Vasara' } },
  { id: 'autumn', icon: '🍂', label: { en: 'Autumn', lt: 'Ruduo' } },
  { id: 'winter', icon: '❄️', label: { en: 'Winter', lt: 'Žiema' } },
]

export const DIETS: { id: Diet; label: Bi; icon: string }[] = [
  { id: 'vegan', icon: '🌿', label: { en: 'Vegan', lt: 'Veganiškas' } },
  { id: 'vegetarian', icon: '🥚', label: { en: 'Vegetarian', lt: 'Vegetariškas' } },
  { id: 'glutenFree', icon: '🌾', label: { en: 'Gluten-free', lt: 'Be glitimo' } },
]

type DishDef = {
  id: string
  meal: Meal
  icon: string
  name: Bi
  /** [food id, grams] */
  items: [string, number][]
  /** Empty = all year. */
  seasons?: Season[]
  synergy: Bi
  how: Bi
}

const b = (en: string, lt: string): Bi => ({ en, lt })

const D = (
  id: string,
  meal: Meal,
  icon: string,
  name: Bi,
  items: [string, number][],
  synergy: Bi,
  how: Bi,
  seasons: Season[] = [],
): DishDef => ({ id, meal, icon, name, items, synergy, how, seasons })

const DISHES: DishDef[] = [
  // ---------- Breakfast ----------
  D('green-smoothie', 'breakfast', '🥤', b('Green morning smoothie', 'Žaliasis rytinis kokteilis'),
    [['spinach', 60], ['banana', 120], ['flax', 15], ['ginger', 5]],
    b('Flax fat unlocks the carotenoids and vitamin K in spinach; banana softens the greens.', 'Linų sėmenų riebalai atrakina špinatų karotinoidus ir vitaminą K; bananas sušvelnina žalumynų skonį.'),
    b('Blend with a glass of water. Drink slowly, on its own.', 'Sutrinkite su stikline vandens. Gerkite lėtai, atskirai nuo kito maisto.')),
  D('overnight-oats', 'breakfast', '🥣', b('Overnight oats with kefir and banana', 'Per naktį mirkytos avižos su kefyru ir bananu'),
    [['oatsSoaked', 60], ['kefir', 150], ['banana', 80], ['almonds', 15]],
    b('A synbiotic bowl: live kefir cultures plus oat and banana fibre that feeds them.', 'Sinbiotinis dubenėlis: gyvos kefyro kultūros ir avižų bei banano skaidulos, kuriomis jos minta.'),
    b('Soak oats in kefir overnight; top with banana and almonds in the morning.', 'Avižas užpilkite kefyru vakare; ryte papuoškite bananu ir migdolais.')),
  D('apple-walnut', 'breakfast', '🍎', b('Apple, blueberries and walnuts', 'Obuolys, mėlynės ir graikiniai riešutai'),
    [['apple', 150], ['blueberry', 100], ['walnuts', 25]],
    b('Shelton’s favourite pairing: acid fruit helps nuts digest. Almost entirely raw — very high vibration.', 'Mėgstamiausias Sheltono derinys: rūgštūs vaisiai padeda virškinti riešutus. Beveik viskas žalia — labai aukšta vibracija.'),
    b('Slice the apple, add berries and soaked walnuts. Cinnamon if you like.', 'Supjaustykite obuolį, pridėkite uogų ir mirkytų riešutų. Jei norite — cinamono.'),
    ['summer', 'autumn']),
  D('green-buckwheat', 'breakfast', '🌾', b('Raw green-buckwheat porridge', 'Žalių grikių košė be virimo'),
    [['buckwheatGreen', 80], ['banana', 100], ['chia', 10], ['sunflower', 15]],
    b('Soaked, never cooked: green buckwheat keeps grain-level vibration; banana sweetens without sugar.', 'Mirkyti, nevirti žali grikiai išlaiko grūdo vibraciją; bananas pasaldina be cukraus.'),
    b('Soak overnight, rinse, blend with banana and a little water; top with seeds.', 'Mirkykite per naktį, nuplaukite, sutrinkite su bananu ir trupučiu vandens; ant viršaus — sėklos.')),
  D('buckwheat-herbs', 'breakfast', '🍚', b('Buckwheat with butter and fresh herbs', 'Grikiai su sviestu ir šviežiomis žolelėmis'),
    [['buckwheat', 180], ['butter', 10], ['dill', 20], ['cucumber', 100]],
    b('Butter steadies the blood-sugar rise; raw herbs and cucumber lift the plate’s vibration.', 'Sviestas sušvelnina cukraus šuolį kraujyje; žalios žolelės ir agurkas pakelia lėkštės vibraciją.'),
    b('Cook gently, add butter off the heat, plenty of dill and a cucumber on the side.', 'Virkite švelniai, sviestą dėkite nukėlę nuo ugnies, gausiai krapų ir agurkas šalia.')),
  D('avocado-rye', 'breakfast', '🥑', b('Rye sourdough with avocado and tomato', 'Ruginė raugo duona su avokadu ir pomidoru'),
    [['ryeBread', 60], ['avocado', 70], ['tomato', 60], ['rocket', 20]],
    b('Sourdough has fewer phytates; avocado’s fat carries the tomato’s lycopene. Starch + fat + vegetables — full symbiosis.', 'Raugo duonoje mažiau fitatų; avokado riebalai neša pomidoro likopeną. Krakmolas + riebalai + daržovės — pilna simbiozė.'),
    b('Mash avocado with salt, spread, top with tomato and rocket.', 'Avokadą sutrinkite su druska, užtepkite, ant viršaus — pomidoras ir rukola.')),
  D('eggs-spinach', 'breakfast', '🍳', b('Soft eggs with spinach and tomato', 'Minkšti kiaušiniai su špinatais ir pomidoru'),
    [['eggsSoft', 120], ['spinachCooked', 100], ['tomato', 100], ['butter', 5], ['parsley', 10]],
    b('One protein with vegetables; vitamin C in fresh tomato and parsley helps the iron in spinach and eggs.', 'Vienas baltymas su daržovėmis; šviežio pomidoro ir petražolių vitaminas C padeda įsisavinti špinatų ir kiaušinių geležį.'),
    b('Wilt spinach in butter, add soft-boiled eggs; fresh tomato and parsley on the side.', 'Špinatus apkepkite svieste, dėkite minkštai virtus kiaušinius; šalia — pomidoras ir petražolės.')),
  D('cottage-herbs', 'breakfast', '🧀', b('Cottage cheese with radishes and herbs', 'Varškė su ridikėliais ir žolelėmis'),
    [['cottage', 150], ['radish', 60], ['cucumber', 80], ['dill', 10], ['sourCream', 20]],
    b('A light protein meal kept savoury: vegetables, not sugar or bread, as its company.', 'Lengvas baltyminis valgis, sūrus: jo palyda — daržovės, ne cukrus ar duona.'),
    b('Mix cottage cheese with sour cream, herbs and salt; radishes and cucumber alongside.', 'Varškę sumaišykite su grietine, žolelėmis ir druska; šalia — ridikėliai ir agurkas.'),
    ['spring', 'summer']),
  D('chia-berries', 'breakfast', '🍓', b('Chia pudding with fresh berries', 'Šalavijų sėklų pudingas su šviežiomis uogomis'),
    [['chia', 25], ['raspberry', 80], ['strawberry', 80], ['almonds', 15]],
    b('Seeds and acid berries — an easy pair. Chia’s gel and berries’ vitamin C, all raw.', 'Sėklos ir rūgščios uogos — lengvas derinys. Šalavijų gelis ir uogų vitaminas C, viskas žalia.'),
    b('Soak chia in water or almond milk for 20 minutes; top with berries and almonds.', 'Šalavijų sėklas pamirkykite vandenyje ar migdolų piene 20 min.; ant viršaus — uogos ir migdolai.'),
    ['summer']),

  // ---------- Lunch ----------
  D('big-salad', 'lunch', '🥗', b('Big living salad with avocado and seeds', 'Didelės gyvos salotos su avokadu ir sėklomis'),
    [['lettuce', 100], ['carrot', 80], ['pepper', 60], ['avocado', 70], ['sunflower', 20], ['lemon', 15]],
    b('Avocado and seeds carry the carrot’s beta-carotene; lemon’s vitamin C frees the iron in the greens.', 'Avokadas ir sėklos padeda įsisavinti morkų beta karoteną; citrinos vitaminas C atlaisvina žalumynų geležį.'),
    b('Grate the carrot, slice the rest, dress with lemon, olive oil and salt.', 'Morką sutarkuokite, kitką supjaustykite, pagardinkite citrina, aliejumi ir druska.')),
  D('lentil-dal', 'lunch', '🍲', b('Golden lentil stew with tomato and lemon', 'Auksinis lęšių troškinys su pomidorais ir citrina'),
    [['lentils', 200], ['tomatoCooked', 100], ['spices', 5], ['cumin', 3], ['oliveOil', 10], ['lemon', 10], ['parsley', 15]],
    b('Four symbioses in one pot: turmeric + pepper, tomato + oil, lentils + lemon for iron, cumin against gas.', 'Keturios simbiozės viename puode: ciberžolė + pipirai, pomidorai + aliejus, lęšiai + citrina geležiai, kmynai nuo dujų.'),
    b('Simmer soaked lentils with tomatoes and spices; finish with oil, lemon and herbs off the heat.', 'Mirkytus lęšius troškinkite su pomidorais ir prieskoniais; nukėlę įpilkite aliejaus, citrinos, įberkite žolelių.'),
    ['autumn', 'winter']),
  D('potatoes-dill', 'lunch', '🥔', b('New potatoes with dill and sauerkraut', 'Jaunos bulvės su krapais ir raugintais kopūstais'),
    [['potatoes', 200], ['dill', 15], ['oliveOil', 10], ['sauerkraut', 100], ['cucumber', 80]],
    b('One starch with plenty of vegetables; raw sauerkraut brings live ferments and vitamin C.', 'Vienas krakmolas su gausiai daržovių; žali rauginti kopūstai atneša gyvų fermentų ir vitamino C.'),
    b('Boil potatoes in their skins, toss with oil and dill; serve with raw sauerkraut and cucumber.', 'Bulves virkite su lupenomis, sumaišykite su aliejumi ir krapais; patiekite su raugintais kopūstais ir agurku.'),
    ['summer', 'autumn']),
  D('beet-walnut', 'lunch', '🟣', b('Raw beetroot salad with walnuts and garlic', 'Žalių burokėlių salotos su graikiniais riešutais ir česnaku'),
    [['beetRaw', 120], ['walnuts', 20], ['garlic', 3], ['oliveOil', 10], ['rocket', 30]],
    b('Raw beetroot keeps its full value; walnut and oil fats carry its pigments, garlic sharpens digestion.', 'Žalias burokėlis išlaiko visą vertę; riešutų ir aliejaus riebalai neša jo pigmentus, česnakas pagyvina virškinimą.'),
    b('Grate beetroot finely, mix with crushed garlic, oil and salt; top with walnuts on rocket.', 'Burokėlį smulkiai sutarkuokite, sumaišykite su česnaku, aliejumi ir druska; ant rukolos, su riešutais.'),
    ['autumn', 'winter']),
  D('saltibarsciai', 'lunch', '🩷', b('Cold beetroot soup (without potatoes)', 'Šaltibarščiai (be bulvių)'),
    [['kefir', 300], ['beetBoiled', 100], ['cucumber', 80], ['dill', 10]],
    b('The Lithuanian summer classic, made lighter: kefir with vegetables only. Eat the hot potatoes separately, 30 minutes later — or not at all.', 'Lietuviška vasaros klasika, lengvesnė: kefyras tik su daržovėmis. Karštas bulves valgykite atskirai, po 30 min. — arba visai be jų.'),
    b('Grate beetroot and cucumber into cold kefir, add plenty of dill and salt.', 'Į šaltą kefyrą sutarkuokite burokėlius ir agurką, gausiai krapų ir druskos.'),
    ['summer']),
  D('spring-salad', 'lunch', '🌱', b('Spring salad with radishes and eggs', 'Pavasario salotos su ridikėliais ir kiaušiniais'),
    [['lettuce', 80], ['radish', 60], ['cucumber', 80], ['eggsSoft', 60], ['sourCream', 20], ['dill', 10]],
    b('One protein, a lot of young greens. The first vegetables of spring are the year’s most alive food.', 'Vienas baltymas, daug jaunų žalumynų. Pirmosios pavasario daržovės — gyviausias metų maistas.'),
    b('Slice everything, dress with sour cream, salt and dill.', 'Viską supjaustykite, pagardinkite grietine, druska ir krapais.'),
    ['spring']),
  D('quinoa-bowl', 'lunch', '🥙', b('Quinoa bowl with chickpeas and tahini', 'Bolivinės balandos dubuo su avinžirniais ir tahiniu'),
    [['quinoa', 120], ['chickpeas', 80], ['kale', 40], ['carrot', 50], ['sesame', 15], ['cumin', 3]],
    b('Chickpeas + sesame complete each other’s protein; kale and carrot with tahini fat for carotenoids.', 'Avinžirniai + sezamas papildo vienas kito baltymą; lapiniai kopūstai ir morkos su tahinio riebalais — karotinoidams.'),
    b('Layer warm quinoa, chickpeas, raw kale and carrot; drizzle tahini thinned with water.', 'Sudėkite šiltą balandą, avinžirnius, žalius lapinius kopūstus ir morką; užpilkite vandeniu atskiestu tahiniu.')),
  D('hummus-crudites', 'lunch', '🥕', b('Hummus with raw vegetable sticks', 'Humusas su žalių daržovių lazdelėmis'),
    [['hummus', 120], ['carrot', 80], ['cucumber', 80], ['pepper', 80], ['celery', 50]],
    b('Legumes with vegetables — the cleanest combination. Peppers add vitamin C for the chickpeas’ iron.', 'Ankštiniai su daržovėmis — švariausias derinys. Paprika prideda vitamino C avinžirnių geležiai.'),
    b('Cut vegetables into sticks and dip. Perfect for work or travel.', 'Daržoves supjaustykite lazdelėmis ir mirkykite. Puiku į darbą ar kelionę.')),
  D('cabbage-apple', 'lunch', '🥬', b('Fresh cabbage salad with apple and dill', 'Šviežių kopūstų salotos su obuoliu ir krapais'),
    [['cabbage', 150], ['carrot', 50], ['apple', 50], ['dill', 10], ['sunflowerOil', 10]],
    b('Cabbage and apple — acid fruit and vegetables work well; cold-pressed oil carries the carrot’s carotene.', 'Kopūstai ir obuolys — rūgštūs vaisiai su daržovėmis dera; šalto spaudimo aliejus neša morkų karoteną.'),
    b('Shred cabbage, massage with salt, add grated carrot and apple, dill and oil.', 'Kopūstą supjaustykite, pamaigykite su druska, pridėkite tarkuotos morkos, obuolio, krapų ir aliejaus.'),
    ['autumn', 'winter']),

  // ---------- Dinner ----------
  D('salmon-greens', 'dinner', '🐟', b('Salmon with broccoli and rocket', 'Lašiša su brokoliais ir rukola'),
    [['salmon', 150], ['broccoliSteamed', 150], ['rocket', 40], ['oliveOil', 10], ['lemon', 10]],
    b('Raw rocket restores broccoli’s sulforaphane enzyme; salmon’s vitamin D helps absorb calcium from the greens. Protein with vegetables only.', 'Žalia rukola grąžina brokolių fermentą sulforafanui; lašišos vitaminas D padeda pasisavinti žalumynų kalcį. Baltymai tik su daržovėmis.'),
    b('Bake the salmon, steam broccoli 4 minutes, serve over rocket with oil and lemon.', 'Lašišą iškepkite, brokolius garinkite 4 min., patiekite ant rukolos su aliejumi ir citrina.')),
  D('fish-zucchini', 'dinner', '🐠', b('Steamed white fish with zucchini and dill', 'Garinta balta žuvis su cukinija ir krapais'),
    [['fishSteamed', 150], ['zucchiniGrilled', 150], ['dill', 10], ['lemon', 10], ['oliveOil', 10]],
    b('The lightest protein dinner: gentle cooking, vegetables, lemon and herbs.', 'Lengviausia baltyminė vakarienė: švelnus gaminimas, daržovės, citrina ir žolelės.'),
    b('Steam fish 8–10 minutes over the grilled zucchini; finish with dill, lemon and oil.', 'Žuvį garinkite 8–10 min.; patiekite su kepta cukinija, krapais, citrina ir aliejumi.'),
    ['summer']),
  D('pumpkin-soup', 'dinner', '🎃', b('Pumpkin and ginger soup with seeds', 'Moliūgų ir imbiero sriuba su sėklomis'),
    [['pumpkin', 300], ['ginger', 10], ['oliveOil', 10], ['pumpkinSeeds', 20], ['parsley', 10]],
    b('Fat from oil and seeds carries pumpkin’s beta-carotene; ginger warms digestion in the evening.', 'Aliejaus ir sėklų riebalai neša moliūgo beta karoteną; imbieras vakare sušildo virškinimą.'),
    b('Bake pumpkin with ginger, blend with water, add oil and toasted seeds on top.', 'Moliūgą iškepkite su imbieru, sutrinkite su vandeniu, ant viršaus — aliejus ir paskrudintos sėklos.'),
    ['autumn', 'winter']),
  D('rice-beans', 'dinner', '🍛', b('Brown rice and beans with peppers and cumin', 'Rudieji ryžiai su pupelėmis, paprika ir kmynais'),
    [['rice', 120], ['beans', 120], ['pepper', 80], ['cumin', 5], ['oliveOil', 10]],
    b('A complete plant protein; raw pepper adds vitamin C for the beans’ iron, cumin eases digestion.', 'Pilnavertis augalinis baltymas; žalia paprika prideda vitamino C pupelių geležiai, kmynai lengvina virškinimą.'),
    b('Keep portions modest; add the pepper raw at the end.', 'Porcijos saikingos; papriką dėkite žalią pabaigoje.')),
  D('veg-buckwheat', 'dinner', '🥘', b('Buckwheat with steamed vegetables', 'Grikiai su garintomis daržovėmis'),
    [['buckwheat', 150], ['carrotSteamed', 80], ['broccoliSteamed', 80], ['tomatoCooked', 80], ['garlic', 3], ['oliveOil', 10]],
    b('Starch, vegetables and fat — every pair a symbiosis. Steaming keeps the vegetables near the body’s level.', 'Krakmolas, daržovės ir riebalai — kiekviena pora simbiozė. Garinant daržovės išlieka arti kūno lygio.'),
    b('Steam vegetables 5 minutes, fold into hot buckwheat with crushed garlic and oil.', 'Daržoves garinkite 5 min., sumaišykite su karštais grikiais, česnaku ir aliejumi.')),
  D('sweet-potato', 'dinner', '🍠', b('Baked sweet potato with kale and tahini', 'Keptas batatas su lapiniais kopūstais ir tahiniu'),
    [['sweetPotato', 200], ['kale', 40], ['sesame', 15], ['pumpkinSeeds', 10]],
    b('Sweet potato’s beta-carotene needs fat — tahini and seeds supply it; kale adds calcium.', 'Batato beta karotenui reikia riebalų — juos suteikia tahinis ir sėklos; lapiniai kopūstai prideda kalcio.'),
    b('Bake whole, split open, fill with massaged kale and tahini.', 'Iškepkite visą, perpjaukite, įdėkite pamaigytų lapinių kopūstų ir tahinio.'),
    ['autumn', 'winter']),
  D('mushroom-potato', 'dinner', '🍄', b('Potatoes with mushrooms and sour cream', 'Bulvės su grybais ir grietine'),
    [['potatoBaked', 180], ['mushrooms', 120], ['sourCream', 30], ['dill', 10], ['lettuce', 60]],
    b('A Lithuanian autumn dish that already combines well: starch, vegetables and a little fat — no meat beside it.', 'Lietuviškas rudens patiekalas, kuris jau gerai dera: krakmolas, daržovės ir truputis riebalų — be mėsos šalia.'),
    b('Bake potatoes, sauté mushrooms with onion, serve with sour cream, dill and a green salad.', 'Bulves iškepkite, grybus pakepinkite su svogūnais, patiekite su grietine, krapais ir žaliomis salotomis.'),
    ['autumn']),
  D('beef-sauerkraut', 'dinner', '🥩', b('Stewed beef with sauerkraut and greens', 'Troškinta jautiena su raugintais kopūstais ir žalumynais'),
    [['meatStewed', 120], ['sauerkraut', 120], ['lettuce', 60], ['garlic', 3]],
    b('If you eat meat, this is how: a small portion with raw ferments and greens, never with potatoes or bread. Lower vibration, high harmony.', 'Jei valgote mėsą — štai kaip: maža porcija su raugintais kopūstais ir žalumynais, niekada su bulvėmis ar duona. Žemesnė vibracija, aukšta harmonija.'),
    b('Serve sauerkraut raw beside the meat; add horseradish or mustard for digestion.', 'Raugintus kopūstus patiekite žalius šalia mėsos; virškinimui — krienų ar garstyčių.'),
    ['winter']),

  // ---------- Snacks & drinks ----------
  D('watermelon', 'snack', '🍉', b('Watermelon — on its own', 'Arbūzas — atskirai'),
    [['watermelon', 300]],
    b('Perfect alone: the fastest-digesting, most watery food. Eat 30 minutes before anything else.', 'Tobulas atskirai: greičiausiai virškinamas, vandeningiausias maistas. Valgykite 30 min. prieš kitą maistą.'),
    b('Chilled, between meals.', 'Atvėsintą, tarp valgių.'),
    ['summer']),
  D('berries-almonds', 'snack', '🫐', b('Berries with almonds', 'Uogos su migdolais'),
    [['blueberry', 150], ['almonds', 20]],
    b('Acid fruit and nuts — a light, very high-vibration snack that keeps you full.', 'Rūgštūs vaisiai ir riešutai — lengvas, labai aukštos vibracijos užkandis, ilgai palaikantis sotumą.'),
    b('A handful of each, mid-afternoon.', 'Po saują, popietę.'),
    ['summer']),
  D('carrot-juice', 'snack', '🥕', b('Fresh carrot-apple juice with flax oil', 'Šviežios morkų ir obuolių sultys su linų aliejumi'),
    [['carrot', 200], ['apple', 150], ['flaxOil', 5]],
    b('Five drops of oil turn the juice’s beta-carotene from wasted to absorbed.', 'Keli lašai aliejaus paverčia sulčių beta karoteną iš iššvaistyto į įsisavintą.'),
    b('Press and drink within 15 minutes — vibration falls fast after juicing.', 'Išspauskite ir išgerkite per 15 min. — vibracija po spaudimo krenta greitai.')),
  D('kefir-drink', 'snack', '🥛', b('Savoury kefir with cucumber and flax', 'Sūrus kefyras su agurku ir linų sėmenimis'),
    [['kefir', 250], ['cucumber', 80], ['dill', 10], ['flax', 10]],
    b('Probiotic kefir with flax fibre (prebiotic) — a small synbiotic between meals.', 'Probiotinis kefyras su linų skaidulomis (prebiotikas) — mažas sinbiotikas tarp valgių.'),
    b('Blend everything with a pinch of salt. Not late in the evening.', 'Viską sutrinkite su žiupsneliu druskos. Ne vėlai vakare.')),
  D('herbal-tea', 'snack', '🍵', b('Warm herbal tea with lemon and honey', 'Šilta žolelių arbata su citrina ir medumi'),
    [['herbalTea', 250], ['lemon', 10], ['honey', 10]],
    b('Honey stirred into warm, not hot, tea stays raw — Ayurveda’s rule and science’s agreement.', 'Medus šiltoje, ne karštoje arbatoje lieka gyvas — ajurvedos taisyklė, kuriai pritaria mokslas.'),
    b('Let the tea cool to drinking temperature before adding honey.', 'Prieš dėdami medų leiskite arbatai atvėsti iki gėrimo temperatūros.'),
    ['autumn', 'winter']),
]

/* ---------- Computed values ---------- */

export type DishIngredient = { food: Food; grams: number }

export type Dish = {
  id: string
  meal: Meal
  icon: string
  name: Bi
  synergy: Bi
  how: Bi
  seasons: Season[]
  ingredients: DishIngredient[]
  grams: number
  /** Gram-weighted average Å, rounded to 50. */
  angstrom: number
  tierId: string
  pairs: { a: GroupId; b: GroupId; rating: Rating }[]
  /** 0–100: good pairs 1, ok ½, bad 0. A single group scores 100. */
  harmony: number
  diets: Diet[]
}

const round50 = (n: number) => Math.round(n / 50) * 50

function build(def: DishDef): Dish {
  const ingredients = def.items.map(([id, grams]) => ({ food: food(id), grams }))
  const grams = ingredients.reduce((s, i) => s + i.grams, 0)
  const angstrom = round50(ingredients.reduce((s, i) => s + i.food.angstrom * i.grams, 0) / grams)
  const groups = [...new Set(ingredients.map((i) => i.food.group).filter((x): x is GroupId => x !== null))]
  const pairs: Dish['pairs'] = []
  for (let i = 0; i < groups.length; i++)
    for (let j = i + 1; j < groups.length; j++) pairs.push({ a: groups[i], b: groups[j], rating: getPair(groups[i], groups[j]).rating })
  const score = pairs.reduce((s, p) => s + (p.rating === 'good' ? 1 : p.rating === 'ok' ? 0.5 : 0), 0)
  const harmony = pairs.length ? Math.round((score / pairs.length) * 100) : 100
  const animals = ingredients.map((i) => i.food.animal).filter(Boolean)
  const diets: Diet[] = []
  if (animals.length === 0) diets.push('vegan')
  if (!animals.some((a) => a === 'meat' || a === 'fish')) diets.push('vegetarian')
  if (!ingredients.some((i) => i.food.gluten)) diets.push('glutenFree')
  return {
    id: def.id, meal: def.meal, icon: def.icon, name: def.name, synergy: def.synergy, how: def.how,
    seasons: def.seasons ?? [], ingredients, grams, angstrom, tierId: tierOf(angstrom).id, pairs, harmony, diets,
  }
}

export const MENU: Dish[] = DISHES.map(build)

const BY_ID = new Map(MENU.map((d) => [d.id, d]))

/* ---------- Day plans ---------- */

export type DayPlan = {
  id: string
  icon: string
  title: Bi
  intro: Bi
  slots: { time: string; label: Bi; dish: Dish }[]
  angstrom: number
  harmony: number
}

const slot = (time: string, en: string, lt: string, id: string) => {
  const dish = BY_ID.get(id)
  if (!dish) throw new Error(`Unknown dish: ${id}`)
  return { time, label: b(en, lt), dish }
}

function plan(id: string, icon: string, title: Bi, intro: Bi, slots: DayPlan['slots']): DayPlan {
  const grams = slots.reduce((s, x) => s + x.dish.grams, 0)
  const angstrom = round50(slots.reduce((s, x) => s + x.dish.angstrom * x.dish.grams, 0) / grams)
  const harmony = Math.round(slots.reduce((s, x) => s + x.dish.harmony, 0) / slots.length)
  return { id, icon, title, intro, slots, angstrom, harmony }
}

export const DAY_PLANS: DayPlan[] = [
  plan('vitality', '☀️', b('Vitality day (summer)', 'Gyvybingumo diena (vasara)'),
    b('Mostly raw and fresh: the highest-vibration day, for when you want lightness and energy.', 'Daugiausia žalio ir šviežio maisto: aukščiausios vibracijos diena, kai norisi lengvumo ir energijos.'),
    [
      slot('07:30', 'Breakfast', 'Pusryčiai', 'green-smoothie'),
      slot('10:30', 'Snack', 'Užkandis', 'watermelon'),
      slot('13:00', 'Lunch', 'Pietūs', 'big-salad'),
      slot('16:00', 'Snack', 'Užkandis', 'berries-almonds'),
      slot('19:00', 'Dinner', 'Vakarienė', 'fish-zucchini'),
    ]),
  plan('lithuanian', '🌾', b('Lithuanian seasonal day', 'Lietuviška sezoninė diena'),
    b('Familiar local food, combined the symbiotic way.', 'Pažįstamas vietinis maistas, suderintas simbiotiškai.'),
    [
      slot('08:00', 'Breakfast', 'Pusryčiai', 'buckwheat-herbs'),
      slot('13:00', 'Lunch', 'Pietūs', 'saltibarsciai'),
      slot('16:00', 'Snack', 'Užkandis', 'kefir-drink'),
      slot('19:00', 'Dinner', 'Vakarienė', 'potatoes-dill'),
    ]),
  plan('winter', '❄️', b('Warming winter day', 'Šildanti žiemos diena'),
    b('Cooked, spiced and grounding, with raw ferments to keep the vibration up.', 'Virtas, prieskoniais pagardintas, įžeminantis maistas, o rauginti produktai palaiko vibraciją.'),
    [
      slot('08:00', 'Breakfast', 'Pusryčiai', 'overnight-oats'),
      slot('13:00', 'Lunch', 'Pietūs', 'lentil-dal'),
      slot('16:00', 'Snack', 'Užkandis', 'herbal-tea'),
      slot('19:00', 'Dinner', 'Vakarienė', 'pumpkin-soup'),
    ]),
  plan('easy', '🕊️', b('Easy-digestion day', 'Lengvo virškinimo diena'),
    b('Simple plates of 3–5 ingredients with full harmony — a reset after heavy days.', 'Paprastos 3–5 ingredientų lėkštės su pilna harmonija — atsigavimas po sunkių dienų.'),
    [
      slot('08:00', 'Breakfast', 'Pusryčiai', 'avocado-rye'),
      slot('11:00', 'Snack', 'Užkandis', 'carrot-juice'),
      slot('13:30', 'Lunch', 'Pietūs', 'hummus-crudites'),
      slot('19:00', 'Dinner', 'Vakarienė', 'veg-buckwheat'),
    ]),
]
