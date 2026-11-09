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

export type Source = 'science' | 'ayurveda' | 'combining'

export const SOURCE_STYLE: Record<Source, { color: string; label: Bi }> = {
  science: { color: '#2d6a4f', label: { en: 'Science', lt: 'Mokslas' } },
  ayurveda: { color: '#b5831a', label: { en: 'Ayurveda', lt: 'Ajurveda' } },
  combining: { color: '#7c5c3e', label: { en: 'Food combining', lt: 'Derinių tradicija' } },
}

export type PairCard = {
  a: string
  b: string
  title: Bi
  text: Bi
  source: Source
}

export const SYMBIOSES: PairCard[] = [
  {
    a: '🟠', b: '⚫', source: 'science',
    title: { en: 'Turmeric + black pepper', lt: 'Ciberžolė + juodieji pipirai' },
    text: { en: 'Piperine in pepper raises curcumin absorption up to twentyfold. Add a little fat too.', lt: 'Pipirų piperinas iki 20 kartų padidina kurkumino įsisavinimą. Pridėkite ir truputį riebalų.' },
  },
  {
    a: '🥛', b: '🌾', source: 'science',
    title: { en: 'Kefir or yogurt + oats, onion, banana', lt: 'Kefyras ar jogurtas + avižos, svogūnai, bananai' },
    text: { en: 'A true symbiosis — “synbiotic”: live bacteria (probiotic) plus the fibre they feed on (prebiotic) help each other settle in the gut.', lt: 'Tikra simbiozė — „sinbiotikas“: gyvos bakterijos (probiotikai) ir skaidulos, kuriomis jos minta (prebiotikai), padeda viena kitai įsikurti žarnyne.' },
  },
  {
    a: '🍅', b: '🫒', source: 'science',
    title: { en: 'Tomato + olive oil', lt: 'Pomidoras + alyvuogių aliejus' },
    text: { en: 'Lycopene is fat-soluble and is freed by gentle cooking — tomato sauce with olive oil gives far more than raw tomato alone.', lt: 'Likopenas tirpsta riebaluose ir išsiskiria švelniai kaitinant — pomidorų padažas su aliejumi duoda daug daugiau nei vien žalias pomidoras.' },
  },
  {
    a: '🥬', b: '🍋', source: 'science',
    title: { en: 'Spinach, lentils, buckwheat + lemon or peppers', lt: 'Špinatai, lęšiai, grikiai + citrina ar paprika' },
    text: { en: 'Vitamin C turns plant (non-haem) iron into a form the body absorbs several times better.', lt: 'Vitaminas C augalinę geležį paverčia forma, kurią kūnas įsisavina kelis kartus geriau.' },
  },
  {
    a: '🥕', b: '🧈', source: 'science',
    title: { en: 'Carrots, pumpkin, greens + healthy fat', lt: 'Morkos, moliūgai, žalumynai + sveiki riebalai' },
    text: { en: 'Beta-carotene and vitamins A, E and K need fat to be absorbed — dress salads, don’t eat them dry.', lt: 'Beta karotenui ir vitaminams A, E, K įsisavinti reikia riebalų — salotas pagardinkite, nevalgykite sausų.' },
  },
  {
    a: '🥦', b: '🌶️', source: 'science',
    title: { en: 'Broccoli + mustard, radish or rocket', lt: 'Brokoliai + garstyčios, ridikai ar rukola' },
    text: { en: 'Cooking destroys broccoli’s enzyme myrosinase; a raw crucifer alongside restores it, so protective sulforaphane can form.', lt: 'Kaitinant brokolių fermentas mirozinazė suyra; žalia kryžmažiedė daržovė šalia jį grąžina, ir susidaro apsauginis sulforafanas.' },
  },
  {
    a: '🍵', b: '🍋', source: 'science',
    title: { en: 'Green tea + lemon', lt: 'Žalioji arbata + citrina' },
    text: { en: 'Citrus keeps tea’s catechins stable through digestion, so more of them are absorbed.', lt: 'Citrusai apsaugo arbatos katechinus virškinant, todėl jų įsisavinama daugiau.' },
  },
  {
    a: '🫘', b: '🍚', source: 'science',
    title: { en: 'Beans + rice or corn', lt: 'Pupelės + ryžiai ar kukurūzai' },
    text: { en: 'Each supplies the amino acids the other lacks — together a complete plant protein. Cook well and spice with cumin or fennel.', lt: 'Kiekvienas papildo tai, ko trūksta kitam — kartu pilnavertis augalinis baltymas. Gerai išvirkite, gardinkite kmynais ar pankoliais.' },
  },
  {
    a: '🐟', b: '🥬', source: 'science',
    title: { en: 'Oily fish + leafy greens', lt: 'Riebi žuvis + lapiniai žalumynai' },
    text: { en: 'Vitamin D from salmon or sardines helps the body take up calcium from kale and other greens.', lt: 'Vitaminas D iš lašišos ar sardinių padeda kūnui pasisavinti kalcį iš lapinių kopūstų ir kitų žalumynų.' },
  },
]

export const CONFLICTS: PairCard[] = [
  {
    a: '🍊', b: '💊', source: 'science',
    title: { en: 'Grapefruit + some medicines', lt: 'Greipfrutas + kai kurie vaistai' },
    text: { en: 'A real danger: grapefruit blocks the enzyme that breaks down certain statins, blood-pressure and other drugs, so their level in the blood can rise sharply. Ask your pharmacist.', lt: 'Tikras pavojus: greipfrutas blokuoja fermentą, skaidantį kai kuriuos statinus, kraujospūdžio ir kitus vaistus, todėl jų kiekis kraujyje gali smarkiai padidėti. Pasitarkite su vaistininku.' },
  },
  {
    a: '🍺', b: '⚡', source: 'science',
    title: { en: 'Alcohol + energy drinks', lt: 'Alkoholis + energiniai gėrimai' },
    text: { en: 'Caffeine masks how drunk you are, so people drink more and take more risks; the strain on the heart adds up.', lt: 'Kofeinas užmaskuoja girtumą, todėl išgeriama daugiau ir daugiau rizikuojama; apkrova širdžiai sumuojasi.' },
  },
  {
    a: '☕', b: '🥩', source: 'science',
    title: { en: 'Tea or coffee + an iron-rich meal', lt: 'Arbata ar kava + geležies turtingas valgis' },
    text: { en: 'Tannins and polyphenols can cut iron absorption by half or more. Drink them an hour before or after the meal.', lt: 'Taninai ir polifenoliai gali perpus ir daugiau sumažinti geležies įsisavinimą. Gerkite valandą prieš ar po valgio.' },
  },
  {
    a: '🧀', b: '🥬', source: 'science',
    title: { en: 'Calcium + iron at the same meal', lt: 'Kalcis + geležis tame pačiame valgyje' },
    text: { en: 'Calcium (dairy, supplements) competes with iron for absorption. If you need iron, keep large amounts of dairy for another meal.', lt: 'Kalcis (pieno produktai, papildai) konkuruoja su geležimi. Jei trūksta geležies, didesnius pieno kiekius palikite kitam valgiui.' },
  },
  {
    a: '🍯', b: '🔥', source: 'ayurveda',
    title: { en: 'Heated honey', lt: 'Kaitintas medus' },
    text: { en: 'Ayurveda says honey heated above ~40 °C becomes “ama” — a sticky toxin. Science agrees heat destroys its enzymes. Add honey to warm, not hot, tea.', lt: 'Ajurveda teigia, kad virš ~40 °C kaitintas medus tampa „ama“ — lipniu toksinu. Mokslas pritaria, kad karštis suardo jo fermentus. Medų dėkite į šiltą, ne karštą arbatą.' },
  },
  {
    a: '🧈', b: '🍯', source: 'ayurveda',
    title: { en: 'Ghee + honey in equal amounts', lt: 'Lydytas sviestas + medus po lygiai' },
    text: { en: 'One of Ayurveda’s classic “viruddha” (opposing) foods — called a poison in the old texts. Unequal amounts are considered fine.', lt: 'Vienas klasikinių ajurvedos „viruddha“ (priešingų) derinių — senuosiuose tekstuose vadinamas nuodu. Nelygiais kiekiais laikomas tinkamu.' },
  },
  {
    a: '🐟', b: '🥛', source: 'ayurveda',
    title: { en: 'Fish + milk', lt: 'Žuvis + pienas' },
    text: { en: 'Opposite energies (heating and cooling) — Ayurveda links this pairing to blocked channels and skin problems.', lt: 'Priešingos energijos (šildanti ir vėsinanti) — ajurveda šį derinį sieja su užsikimšusiais kanalais ir odos problemomis.' },
  },
  {
    a: '🍋', b: '🥛', source: 'ayurveda',
    title: { en: 'Milk + sour fruit or banana', lt: 'Pienas + rūgštūs vaisiai ar bananas' },
    text: { en: 'Milk curdles with acid and grows heavy with banana — said to produce mucus and dull digestion.', lt: 'Pienas su rūgštimi sutraukia, o su bananu tampa sunkus — teigiama, kad kaupiasi gleivės ir slopsta virškinimas.' },
  },
  {
    a: '🥩', b: '🥔', source: 'combining',
    title: { en: 'Meat + potatoes or bread', lt: 'Mėsa + bulvės ar duona' },
    text: { en: 'The core rule of the Hay diet: concentrated protein and starch digest in opposite conditions, so the meal lingers and ferments.', lt: 'Pagrindinė Hay dietos taisyklė: koncentruoti baltymai ir krakmolas virškinami priešingomis sąlygomis, todėl valgis užsibūna ir rūgsta.' },
  },
  {
    a: '🍰', b: '🍎', source: 'combining',
    title: { en: 'Fruit as dessert after a heavy meal', lt: 'Vaisiai kaip desertas po sunkaus valgio' },
    text: { en: 'Fruit passes in 20–40 minutes; trapped behind a heavy meal it ferments. Eat fruit on its own, before food or between meals.', lt: 'Vaisiai praeina per 20–40 min.; užstrigę už sunkaus valgio rūgsta. Valgykite juos atskirai, prieš valgį ar tarp valgių.' },
  },
  {
    a: '🍉', b: '🍽️', source: 'combining',
    title: { en: 'Melon with anything', lt: 'Melionas su bet kuo' },
    text: { en: '“Eat it alone or leave it alone.” Watermelon and melon are the quickest foods of all.', lt: '„Valgyk atskirai arba nevalgyk.“ Arbūzas ir melionas virškinami greičiausiai iš visų.' },
  },
  {
    a: '🥚', b: '🧀', source: 'combining',
    title: { en: 'Two concentrated proteins', lt: 'Du koncentruoti baltymai' },
    text: { en: 'Meat with eggs, or fish with cheese, asks the stomach for two different timings at once.', lt: 'Mėsa su kiaušiniais ar žuvis su sūriu reikalauja iš skrandžio dviejų skirtingų ritmų vienu metu.' },
  },
]

export const PLATE_RULES: Bi[] = [
  { en: 'Half the plate vegetables or greens — they get along with everything except melon.', lt: 'Pusė lėkštės — daržovės ar žalumynai: jos dera su viskuo, išskyrus melioną.' },
  { en: 'Choose one star: protein or starch. Let vegetables and a little fat be its company.', lt: 'Pasirinkite vieną „žvaigždę“: baltymus arba krakmolą. Daržovės ir truputis riebalų — jos palyda.' },
  { en: 'Fruit on its own — in the morning or as a snack, not as dessert.', lt: 'Vaisiai — atskirai: ryte ar užkandžiui, ne desertui.' },
  { en: 'Pair for absorption: fat with vegetables, lemon with iron, pepper with turmeric.', lt: 'Derinkite dėl įsisavinimo: riebalai su daržovėmis, citrina su geležimi, pipirai su ciberžole.' },
  { en: 'Keep tea and coffee an hour away from your main meals.', lt: 'Arbatą ir kavą gerkite valandą atskirai nuo pagrindinių valgių.' },
  { en: 'Listen to your body: if a combination leaves you heavy, bloated or sleepy, it isn’t yours.', lt: 'Klausykite kūno: jei derinys palieka sunkumą, pūtimą ar mieguistumą — jis ne jums.' },
]
