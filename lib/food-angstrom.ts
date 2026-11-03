/**
 * Food vitality pyramid based on André Simoneton's ångström (Å) scale.
 *
 * In the 1930s–40s the French engineer André Simoneton, building on Bovis'
 * biometer, classified foods by the wavelength of the "vital radiation" he
 * attributed to them. A healthy human body was placed at ~6,500 Å; foods above
 * that line were said to raise our vitality, foods below it to draw on it.
 *
 * The pyramid is drawn the conventional way round: the widest tier (eat the
 * most) is the most alive food, the narrow apex (eat the least) is the "dead"
 * food. Values are the commonly cited approximations, not lab measurements.
 */

export type Bi = { en: string; lt: string }

export type FoodItem = {
  name: Bi
  /** Approximate value or range in ångströms, as reported. */
  angstrom: string
}

export type FoodTier = {
  id: 'living' | 'supporting' | 'low' | 'dead'
  range: string
  min: number
  max: number
  color: string
  textColor: string
  title: Bi
  subtitle: Bi
  guidance: Bi
  description: Bi
  items: FoodItem[]
}

export const BODY_ANGSTROM = 6500
export const SCALE_MAX = 10000

/** Ordered from the base of the pyramid (widest) to the apex. */
export const FOOD_TIERS: FoodTier[] = [
  {
    id: 'living',
    range: '6 500 – 10 000 Å',
    min: 6500,
    max: 10000,
    color: '#2d6a4f',
    textColor: '#fdfaf5',
    title: { en: 'Living foods', lt: 'Gyvas maistas' },
    subtitle: { en: 'Superior vitality', lt: 'Aukščiausias gyvybingumas' },
    guidance: { en: 'The base — most of every plate', lt: 'Pagrindas — didžioji lėkštės dalis' },
    description: {
      en: 'Fresh, whole, raw or barely touched foods that radiate above the body’s own 6,500 Å. Simoneton held that they add vitality rather than spend it. Ripe fruit eaten soon after picking scores highest.',
      lt: 'Švieži, nesmulkinti, žali ar vos paruošti produktai, spinduliuojantys daugiau nei paties kūno 6 500 Å. Simonetono teigimu, jie gyvybingumą prideda, o ne eikvoja. Aukščiausiai vertinami prinokę, ką tik nuskinti vaisiai.',
    },
    items: [
      { name: { en: 'Fresh ripe fruit (just picked)', lt: 'Švieži prinokę vaisiai (ką tik nuskinti)' }, angstrom: '8 000 – 10 000' },
      { name: { en: 'Raw fresh vegetables & greens', lt: 'Žalios šviežios daržovės ir žalumynai' }, angstrom: '8 000 – 9 500' },
      { name: { en: 'Sprouts & germinated seeds', lt: 'Daigai ir daiginta sėkla' }, angstrom: '8 500 – 9 500' },
      { name: { en: 'Whole grains (wheat, buckwheat, oats)', lt: 'Viso grūdo kruopos (kviečiai, grikiai, avižos)' }, angstrom: '8 500' },
      { name: { en: 'Cold-pressed olive oil', lt: 'Šalto spaudimo alyvuogių aliejus' }, angstrom: '8 500' },
      { name: { en: 'Almonds, hazelnuts & walnuts', lt: 'Migdolai, lazdyno ir graikiniai riešutai' }, angstrom: '8 000' },
      { name: { en: 'Fresh butter', lt: 'Šviežias sviestas' }, angstrom: '8 000' },
      { name: { en: 'Fresh eggs', lt: 'Švieži kiaušiniai' }, angstrom: '7 000 – 8 000' },
      { name: { en: 'Fresh sea fish', lt: 'Šviežia jūros žuvis' }, angstrom: '6 500 – 8 500' },
      { name: { en: 'Fresh raw milk (first hours)', lt: 'Šviežias nevirintas pienas (pirmosios valandos)' }, angstrom: '6 500' },
    ],
  },
  {
    id: 'supporting',
    range: '3 000 – 6 500 Å',
    min: 3000,
    max: 6500,
    color: '#6b8f71',
    textColor: '#fdfaf5',
    title: { en: 'Supporting foods', lt: 'Palaikantis maistas' },
    subtitle: { en: 'Below the body’s level', lt: 'Žemiau kūno lygio' },
    guidance: { en: 'Moderate — they nourish but don’t lift', lt: 'Saikingai — maitina, bet nepakelia' },
    description: {
      en: 'Foods that still sustain life but sit under the body’s 6,500 Å. Cooking, storage and time move foods down into this tier — a vegetable loses vibration the longer it is boiled.',
      lt: 'Produktai, vis dar palaikantys gyvybę, bet esantys žemiau kūno 6 500 Å. Virimas, laikymas ir laikas nustumia maistą į šią pakopą — kuo ilgiau verdama daržovė, tuo labiau krenta jos vibracija.',
    },
    items: [
      { name: { en: 'Cooked & steamed vegetables', lt: 'Virtos ir garintos daržovės' }, angstrom: '3 000 – 6 000' },
      { name: { en: 'Cooked fish', lt: 'Virta / kepta žuvis' }, angstrom: '4 000 – 5 000' },
      { name: { en: 'Milk a day after milking', lt: 'Parą stovėjęs pienas' }, angstrom: '4 000' },
      { name: { en: 'Unrefined cane sugar', lt: 'Nerafinuotas cukranendrių cukrus' }, angstrom: '4 000 – 6 000' },
      { name: { en: 'Peanut oil', lt: 'Žemės riešutų aliejus' }, angstrom: '4 000 – 5 000' },
      { name: { en: 'Wholemeal bread', lt: 'Rupių miltų duona' }, angstrom: '4 000 – 6 000' },
      { name: { en: 'Natural wine (small amounts)', lt: 'Natūralus vynas (nedaug)' }, angstrom: '4 500' },
    ],
  },
  {
    id: 'low',
    range: '< 3 000 Å',
    min: 0,
    max: 3000,
    color: '#c17a24',
    textColor: '#fdfaf5',
    title: { en: 'Low-vibration foods', lt: 'Žemos vibracijos maistas' },
    subtitle: { en: 'Draw on your energy', lt: 'Naudoja jūsų energiją' },
    guidance: { en: 'Occasionally', lt: 'Retkarčiais' },
    description: {
      en: 'Heavily cooked, cured or stimulating foods. Simoneton said the body must lend its own energy to digest them, which is why they can leave you heavy or wired.',
      lt: 'Ilgai virti, sūdyti ar stimuliuojantys produktai. Simonetonas teigė, kad jiems suvirškinti kūnas turi skolinti savo energiją — todėl po jų galime jaustis sunkūs arba perdirgę.',
    },
    items: [
      { name: { en: 'Cooked meat', lt: 'Termiškai apdorota mėsa' }, angstrom: '< 3 000' },
      { name: { en: 'Sausages & cured meats', lt: 'Dešros ir rūkyta mėsa' }, angstrom: '< 3 000' },
      { name: { en: 'Coffee & black tea', lt: 'Kava ir juodoji arbata' }, angstrom: '< 3 000' },
      { name: { en: 'Chocolate', lt: 'Šokoladas' }, angstrom: '< 3 000' },
      { name: { en: 'Jams & cooked fruit', lt: 'Uogienės ir virti vaisiai' }, angstrom: '< 3 000' },
      { name: { en: 'Processed cheese', lt: 'Lydytas sūris' }, angstrom: '< 3 000' },
      { name: { en: 'White bread', lt: 'Balta duona' }, angstrom: '< 3 000' },
    ],
  },
  {
    id: 'dead',
    range: '≈ 0 Å',
    min: 0,
    max: 0,
    color: '#5c5447',
    textColor: '#fdfaf5',
    title: { en: '“Dead” foods', lt: '„Negyvas“ maistas' },
    subtitle: { en: 'No measurable vitality', lt: 'Gyvybingumo nėra' },
    guidance: { en: 'The apex — as little as possible', lt: 'Viršūnė — kuo mažiau' },
    description: {
      en: 'Industrially refined, preserved or pasteurised products. In Simoneton’s readings they registered close to zero: calories without life force.',
      lt: 'Pramoniniu būdu rafinuoti, konservuoti ar pasterizuoti produktai. Simonetono matavimuose jie buvo arti nulio: kalorijos be gyvybinės jėgos.',
    },
    items: [
      { name: { en: 'Margarine', lt: 'Margarinas' }, angstrom: '0' },
      { name: { en: 'Refined white sugar', lt: 'Rafinuotas baltas cukrus' }, angstrom: '0' },
      { name: { en: 'Bleached white flour', lt: 'Balinti balti miltai' }, angstrom: '0' },
      { name: { en: 'Canned & preserved foods', lt: 'Konservai' }, angstrom: '0' },
      { name: { en: 'Pasteurised / boiled milk', lt: 'Pasterizuotas / virintas pienas' }, angstrom: '0' },
      { name: { en: 'Spirits & liqueurs', lt: 'Stiprieji gėrimai ir likeriai' }, angstrom: '0' },
    ],
  },
]

export const RAISE_TIPS: Bi[] = [
  {
    en: 'Eat it fresh. Vibration falls from the moment of harvest — local and seasonal beats long-haul and stored.',
    lt: 'Valgykite šviežią. Vibracija krenta nuo nuskynimo akimirkos — vietinis ir sezoninis maistas pranašesnis už atvežtą iš toli ar ilgai laikytą.',
  },
  {
    en: 'Cook gently and briefly. Steaming or a quick sauté keeps far more than long boiling or frying.',
    lt: 'Gaminkite švelniai ir trumpai. Garinant ar trumpai pakepinant išsaugoma kur kas daugiau nei ilgai verdant ar kepant.',
  },
  {
    en: 'Make half the plate raw. A salad, sprouts or fruit alongside a cooked meal lifts the whole plate.',
    lt: 'Pusė lėkštės — žalio maisto. Salotos, daigai ar vaisiai prie virto patiekalo pakelia visą lėkštę.',
  },
  {
    en: 'Choose whole over refined: whole grain, cold-pressed oil, unrefined sugar or honey.',
    lt: 'Rinkitės nerafinuotą: viso grūdo, šalto spaudimo aliejų, nerafinuotą cukrų ar medų.',
  },
  {
    en: 'Sprout seeds and grains at home. Germination is the most alive food you can grow on a windowsill.',
    lt: 'Daiginkite sėklas ir grūdus namuose. Daigai — gyviausias maistas, kurį galima užsiauginti ant palangės.',
  },
  {
    en: 'Eat calmly and with gratitude. The state you eat in is part of the meal.',
    lt: 'Valgykite ramiai ir su dėkingumu. Būsena, kurioje valgote, yra patiekalo dalis.',
  },
]
