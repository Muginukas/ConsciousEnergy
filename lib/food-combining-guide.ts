/**
 * Classified knowledge for the food-combining page: synergies and conflicts
 * grouped by mechanism and tagged by source, digestion times, eating order
 * and a per-product pairing guide.
 */

import type { Bi } from './food-angstrom'

const b = (en: string, lt: string): Bi => ({ en, lt })

/* ---------- Sources ---------- */

export type Source = 'science' | 'ayurveda' | 'combining' | 'folk'

export const SOURCE_STYLE: Record<Source, { color: string; label: Bi }> = {
  science: { color: '#2d6a4f', label: b('Science', 'Mokslas') },
  ayurveda: { color: '#b5831a', label: b('Ayurveda', 'Ajurveda') },
  combining: { color: '#7c5c3e', label: b('Food combining', 'Derinių tradicija') },
  folk: { color: '#4a4580', label: b('Folk wisdom', 'Liaudies išmintis') },
}

export type PairCard = { a: string; b: string; title: Bi; text: Bi; source: Source }

const card = (a: string, bb: string, source: Source, title: Bi, text: Bi): PairCard => ({ a, b: bb, source, title, text })

/* ---------- Symbioses, by mechanism ---------- */

export type Section = { id: string; icon: string; title: Bi; intro: Bi; cards: PairCard[] }

export const SYMBIOSIS_SECTIONS: Section[] = [
  {
    id: 'absorption', icon: '🧲',
    title: b('Better absorption', 'Geresnis įsisavinimas'),
    intro: b('One food opens the door for a nutrient in the other.', 'Vienas produktas atveria duris kito maistinei medžiagai.'),
    cards: [
      card('🟠', '⚫', 'science', b('Turmeric + black pepper', 'Ciberžolė + juodieji pipirai'), b('Piperine raises curcumin absorption up to twentyfold. Add a little fat too — curcumin is fat-soluble.', 'Piperinas iki 20 kartų padidina kurkumino įsisavinimą. Pridėkite ir truputį riebalų — kurkuminas tirpsta riebaluose.')),
      card('🍅', '🫒', 'science', b('Tomato + olive oil', 'Pomidoras + alyvuogių aliejus'), b('Lycopene is fat-soluble and is freed by gentle cooking — tomato sauce with oil gives far more than raw tomato alone.', 'Likopenas tirpsta riebaluose ir išsiskiria švelniai kaitinant — pomidorų padažas su aliejumi duoda daug daugiau nei žalias pomidoras.')),
      card('🥬', '🍋', 'science', b('Plant iron + vitamin C', 'Augalinė geležis + vitaminas C'), b('Lemon, peppers, sauerkraut or berries alongside spinach, lentils or buckwheat can multiply non-haem iron absorption.', 'Citrina, paprika, rauginti kopūstai ar uogos prie špinatų, lęšių ar grikių kelis kartus padidina augalinės geležies įsisavinimą.')),
      card('🥕', '🧈', 'science', b('Carotenoids + fat', 'Karotinoidai + riebalai'), b('Beta-carotene and vitamins A, D, E and K need fat. A salad with oil or avocado yields several times more than a dry one.', 'Beta karotenui ir vitaminams A, D, E, K reikia riebalų. Salotos su aliejumi ar avokadu duoda kelis kartus daugiau nei sausos.')),
      card('🐟', '🥬', 'science', b('Vitamin D + calcium', 'Vitaminas D + kalcis'), b('Vitamin D from oily fish or eggs helps the gut take up calcium from greens, sesame and dairy.', 'Vitaminas D iš riebios žuvies ar kiaušinių padeda žarnynui pasisavinti kalcį iš žalumynų, sezamo ir pieno produktų.')),
      card('🧄', '🌾', 'science', b('Garlic & onion + grains or legumes', 'Česnakas ir svogūnai + grūdai ar ankštiniai'), b('Studies show their sulphur compounds raise the iron and zinc the body can draw from cereals and pulses.', 'Tyrimai rodo, kad jų sieros junginiai padidina geležies ir cinko kiekį, kurį kūnas gauna iš kruopų ir ankštinių.')),
      card('🍵', '🍋', 'science', b('Green tea + lemon', 'Žalioji arbata + citrina'), b('Citrus keeps tea catechins stable through digestion, so more of them reach the blood.', 'Citrusai apsaugo arbatos katechinus virškinant, todėl daugiau jų patenka į kraują.')),
    ],
  },
  {
    id: 'enzymes', icon: '⚗️',
    title: b('Awakened enzymes', 'Pažadinti fermentai'),
    intro: b('Some protective compounds only form when an enzyme meets its partner.', 'Kai kurios apsauginės medžiagos susidaro tik fermentui susitikus su partneriu.'),
    cards: [
      card('🥦', '🌶️', 'science', b('Cooked broccoli + mustard, radish or rocket', 'Virti brokoliai + garstyčios, ridikai ar rukola'), b('Heat destroys broccoli’s myrosinase; a raw crucifer alongside supplies it, so protective sulforaphane can still form.', 'Karštis suardo brokolių mirozinazę; žalia kryžmažiedė daržovė šalia jos suteikia, ir apsauginis sulforafanas vis tiek susidaro.')),
      card('🧄', '⏱️', 'science', b('Garlic + 10 minutes of air', 'Česnakas + 10 minučių oro'), b('Crush or chop garlic and let it rest before heating: the enzyme alliinase needs time to make allicin, which heat would otherwise prevent.', 'Česnaką sutrinkite ar susmulkinkite ir palaukite prieš kaitindami: fermentui aliinazei reikia laiko alicinui pagaminti, kitaip karštis tai sustabdo.')),
    ],
  },
  {
    id: 'microbiome', icon: '🦠',
    title: b('Feeding the gut', 'Žarnyno mikrobiotai'),
    intro: b('The most literal symbioses: food for the bacteria that live with us.', 'Tiesioginės simbiozės: maistas bakterijoms, kurios gyvena kartu su mumis.'),
    cards: [
      card('🥛', '🌾', 'science', b('Kefir or yogurt + oats, onion, banana', 'Kefyras ar jogurtas + avižos, svogūnai, bananai'), b('A synbiotic: live bacteria (probiotic) plus the fibre they eat (prebiotic) help each other settle in the gut.', 'Sinbiotikas: gyvos bakterijos (probiotikai) ir skaidulos, kuriomis jos minta (prebiotikai), padeda viena kitai įsikurti žarnyne.')),
      card('🥔', '❄️', 'science', b('Cooked potatoes or rice, then cooled', 'Virtos bulvės ar ryžiai, vėliau atvėsinti'), b('Cooling turns part of the starch into resistant starch, which feeds gut bacteria and softens the blood-sugar rise.', 'Atvėsus dalis krakmolo tampa rezistentiniu — jis maitina žarnyno bakterijas ir sušvelnina cukraus šuolį kraujyje.')),
      card('🫙', '🥗', 'folk', b('Sauerkraut + a varied plant plate', 'Rauginti kopūstai + įvairi augalinė lėkštė'), b('Live lactic bacteria and the vitamin C of raw sauerkraut sit best beside many different vegetables and whole grains.', 'Gyvos pieno rūgšties bakterijos ir žalių raugintų kopūstų vitaminas C geriausiai dera su įvairiomis daržovėmis ir viso grūdo produktais.')),
    ],
  },
  {
    id: 'protein', icon: '🧩',
    title: b('Complete plant protein', 'Pilnavertis augalinis baltymas'),
    intro: b('Two incomplete proteins that fill each other’s gaps.', 'Du nepilnaverčiai baltymai, užpildantys vienas kito spragas.'),
    cards: [
      card('🫘', '🍚', 'science', b('Beans + rice or corn', 'Pupelės + ryžiai ar kukurūzai'), b('Legumes are low in methionine, grains in lysine — together a complete protein. Not necessarily in one bite: within the same day is enough.', 'Ankštiniuose mažai metionino, grūduose — lizino; kartu — pilnavertis baltymas. Nebūtina viename kąsnyje: pakanka tą pačią dieną.')),
      card('🫘', '🌰', 'science', b('Chickpeas + sesame (hummus)', 'Avinžirniai + sezamas (humusas)'), b('Tahini supplies the amino acids chickpeas lack; lemon and garlic in hummus add iron absorption on top.', 'Tahinis papildo aminorūgštis, kurių trūksta avinžirniams; citrina ir česnakas humuse dar pagerina geležies įsisavinimą.')),
    ],
  },
  {
    id: 'digestion', icon: '🔥',
    title: b('Easier digestion', 'Lengvesnis virškinimas'),
    intro: b('Spices and partners that kindle the digestive fire.', 'Prieskoniai ir partneriai, kurie įkuria virškinimo ugnį.'),
    cards: [
      card('🫘', '🌱', 'ayurveda', b('Legumes + cumin, fennel, ginger or bay', 'Ankštiniai + kmynai, pankoliai, imbieras ar lauras'), b('Carminative spices reduce the gas and heaviness of beans and lentils — a rule in every bean-eating cuisine.', 'Vėjus varantys prieskoniai sumažina pupelių ir lęšių sukeliamas dujas ir sunkumą — taisyklė visose ankštinius valgančiose virtuvėse.')),
      card('🥩', '🌿', 'folk', b('Heavy food + horseradish, mustard or bitter greens', 'Sunkus maistas + krienai, garstyčios ar kartūs žalumynai'), b('Pungent and bitter tastes stimulate bile and stomach juices — why fatty dishes have always been served with them.', 'Aštrus ir kartus skonis skatina tulžį ir skrandžio sultis — todėl riebūs patiekalai nuo seno patiekiami su jais.')),
      card('🫚', '🍽️', 'ayurveda', b('A slice of ginger with salt and lemon before a meal', 'Imbiero griežinėlis su druska ir citrina prieš valgį'), b('Ayurveda’s classic appetiser to awaken agni, the digestive fire, 15 minutes before eating.', 'Klasikinis ajurvedos užkandis agni, virškinimo ugniai, pažadinti — likus 15 min. iki valgio.')),
    ],
  },
  {
    id: 'antinutrients', icon: '💧',
    title: b('Unlocking seeds and grains', 'Sėklų ir grūdų atrakinimas'),
    intro: b('Not a pair of foods but a pair with time and water — preparations that disarm anti-nutrients.', 'Ne dviejų produktų pora, o produktas ir laikas su vandeniu — paruošimas, nuginkluojantis antimaistines medžiagas.'),
    cards: [
      card('🫘', '💧', 'science', b('Grains & legumes + overnight soaking', 'Grūdai ir ankštiniai + mirkymas per naktį'), b('Soaking and sprouting break down phytic acid, which otherwise binds iron, zinc and calcium; it also shortens cooking and reduces gas.', 'Mirkymas ir daiginimas suskaido fitino rūgštį, kuri kitaip suriša geležį, cinką ir kalcį; be to, sutrumpėja virimas ir mažiau dujų.')),
      card('🍞', '🫙', 'science', b('Rye + sourdough', 'Rugiai + raugas'), b('Long sourdough fermentation lowers phytates and the bread’s glycaemic impact compared with yeasted bread.', 'Ilgas rauginimas sumažina fitatų kiekį ir duonos poveikį cukraus kiekiui kraujyje, palyginti su mielinė duona.')),
      card('🥬', '♨️', 'science', b('Spinach & sorrel + a quick blanch', 'Špinatai ir rūgštynės + trumpas blanširavimas'), b('Boiling briefly and discarding the water removes a large part of the oxalates that bind calcium.', 'Trumpai pavirus ir nupylus vandenį pašalinama didelė dalis oksalatų, surišančių kalcį.')),
    ],
  },
]

/* ---------- Conflicts, by kind ---------- */

export const CONFLICT_SECTIONS: Section[] = [
  {
    id: 'danger', icon: '⚠️',
    title: b('Real health risks', 'Tikri pavojai sveikatai'),
    intro: b('Proven interactions that can genuinely harm. Take these seriously.', 'Įrodytos sąveikos, kurios gali iš tiesų pakenkti. Vertinkite rimtai.'),
    cards: [
      card('🍊', '💊', 'science', b('Grapefruit + some medicines', 'Greipfrutas + kai kurie vaistai'), b('Grapefruit blocks the enzyme that breaks down certain statins, blood-pressure, heart and other drugs, so blood levels can rise dangerously. Ask your pharmacist.', 'Greipfrutas blokuoja fermentą, skaidantį kai kuriuos statinus, kraujospūdžio, širdies ir kitus vaistus, todėl jų kiekis kraujyje gali pavojingai padidėti. Pasitarkite su vaistininku.')),
      card('🍷', '💊', 'science', b('Alcohol + paracetamol', 'Alkoholis + paracetamolis'), b('Both are processed by the liver; together, especially with regular drinking, they raise the risk of liver damage.', 'Abu apdoroja kepenys; kartu, ypač reguliariai geriant, didėja kepenų pažeidimo rizika.')),
      card('🍺', '⚡', 'science', b('Alcohol + energy drinks', 'Alkoholis + energiniai gėrimai'), b('Caffeine masks how drunk you are, so people drink more and take more risks; the strain on the heart adds up.', 'Kofeinas užmaskuoja girtumą, todėl išgeriama daugiau ir daugiau rizikuojama; apkrova širdžiai sumuojasi.')),
      card('🧀', '💊', 'science', b('Aged cheese, cured meat, soy sauce + MAOI drugs', 'Brandintas sūris, vytinta mėsa, sojų padažas + MAO inhibitoriai'), b('Tyramine in aged and fermented foods can cause a dangerous blood-pressure spike with this group of antidepressants.', 'Tiraminas brandintuose ir fermentuotuose produktuose su šia antidepresantų grupe gali sukelti pavojingą kraujospūdžio šuolį.')),
      card('🥬', '💊', 'science', b('Leafy greens + warfarin', 'Lapiniai žalumynai + varfarinas'), b('Vitamin K counteracts this blood thinner. Greens are not forbidden — keep the amount steady from day to day and tell your doctor.', 'Vitaminas K veikia priešingai šiam kraują skystinančiam vaistui. Žalumynai nedraudžiami — valgykite pastovų kiekį kasdien ir informuokite gydytoją.')),
      card('🥚', '🔁', 'science', b('Raw egg whites, often', 'Žali kiaušinių baltymai, dažnai'), b('Raw white binds biotin and carries a salmonella risk. Cooked or soft-cooked eggs avoid both.', 'Žalias baltymas suriša biotiną ir kelia salmoneliozės riziką. Virti ar minkštai virti kiaušiniai išvengia abiejų.')),
    ],
  },
  {
    id: 'blockers', icon: '🚫',
    title: b('Absorption blockers', 'Įsisavinimo blokatoriai'),
    intro: b('Not harmful, but they steal nutrients from the meal.', 'Nekenksmingi, bet vagia maistines medžiagas iš valgio.'),
    cards: [
      card('☕', '🥩', 'science', b('Tea or coffee + an iron-rich meal', 'Arbata ar kava + geležies turtingas valgis'), b('Tannins and polyphenols can cut iron absorption by half or more. Drink them an hour before or after eating.', 'Taninai ir polifenoliai gali perpus ir daugiau sumažinti geležies įsisavinimą. Gerkite valandą prieš ar po valgio.')),
      card('🧀', '🥬', 'science', b('Calcium + iron at once', 'Kalcis + geležis vienu metu'), b('Calcium from dairy or supplements competes with iron. If you need iron, keep big dairy portions for another meal.', 'Kalcis iš pieno produktų ar papildų konkuruoja su geležimi. Jei trūksta geležies, didesnes pieno porcijas palikite kitam valgiui.')),
      card('🌿', '🥛', 'science', b('Spinach, sorrel, rhubarb as a calcium source', 'Špinatai, rūgštynės, rabarbarai kaip kalcio šaltinis'), b('Their oxalates bind their own calcium, so little of it is absorbed. Count on dairy, sesame, kale or cabbage for calcium instead.', 'Jų oksalatai suriša jų pačių kalcį, todėl jo įsisavinama mažai. Kalcio ieškokite pieno produktuose, sezame, lapiniuose ar paprastuose kopūstuose.')),
      card('🌾', '⛓️', 'science', b('Unsoaked bran, grains & legumes + minerals', 'Nemirkytos sėlenos, grūdai ir ankštiniai + mineralai'), b('Phytic acid binds zinc, iron and calcium. Soaking, sprouting and sourdough largely undo it.', 'Fitino rūgštis suriša cinką, geležį ir kalcį. Mirkymas, daiginimas ir raugas tai didžiąja dalimi panaikina.')),
      card('🍷', '🅱️', 'science', b('Alcohol + B vitamins', 'Alkoholis + B grupės vitaminai'), b('Alcohol reduces absorption of thiamine (B1) and folate and increases their loss.', 'Alkoholis mažina tiamino (B1) ir folio rūgšties įsisavinimą ir didina jų netekimą.')),
    ],
  },
  {
    id: 'viruddha', icon: '🕉️',
    title: b('Ayurveda’s “viruddha” — opposing foods', 'Ajurvedos „viruddha“ — priešingi maisto produktai'),
    intro: b('Pairs that Ayurveda says create “ama”, a sticky toxin at the root of disease.', 'Deriniai, kurie, pasak ajurvedos, sukuria „ama“ — lipnų toksiną, ligų šaknį.'),
    cards: [
      card('🍯', '🔥', 'ayurveda', b('Heated honey', 'Kaitintas medus'), b('Honey above ~40 °C is said to turn into ama. Science agrees heat destroys its enzymes. Stir it into warm, not hot, tea.', 'Medus virš ~40 °C, sakoma, virsta ama. Mokslas pritaria, kad karštis suardo jo fermentus. Dėkite į šiltą, ne karštą arbatą.')),
      card('🧈', '🍯', 'ayurveda', b('Ghee + honey in equal amounts', 'Lydytas sviestas + medus po lygiai'), b('A classic viruddha, called a poison in the old texts. Unequal amounts are considered fine.', 'Klasikinė viruddha, senuosiuose tekstuose vadinama nuodu. Nelygiais kiekiais laikoma tinkama.')),
      card('🐟', '🥛', 'ayurveda', b('Fish + milk', 'Žuvis + pienas'), b('Heating and cooling energies clash — linked in Ayurveda to blocked channels and skin problems.', 'Šildanti ir vėsinanti energijos susiduria — ajurveda tai sieja su užsikimšusiais kanalais ir odos problemomis.')),
      card('🍋', '🥛', 'ayurveda', b('Milk + sour fruit or banana', 'Pienas + rūgštūs vaisiai ar bananas'), b('Milk curdles with acid and grows heavy with banana — said to build mucus and dull digestion.', 'Pienas su rūgštimi sutraukia, su bananu tampa sunkus — sakoma, kaupia gleives ir slopina virškinimą.')),
      card('🥣', '🌙', 'ayurveda', b('Yogurt at night, or heated', 'Jogurtas vakare ar pašildytas'), b('Yogurt is heavy and channel-blocking; Ayurveda keeps it for midday and never cooks it. Thinned with water and spices it becomes light lassi.', 'Jogurtas sunkus ir užkemša kanalus; ajurveda jį valgo vidurdienį ir niekada nekaitina. Atskiestas vandeniu su prieskoniais jis tampa lengvu lasiu.')),
      card('🌶️', '🥛', 'ayurveda', b('Radish + milk', 'Ridikai + pienas'), b('Pungent, heating radish with cooling milk — a listed incompatibility.', 'Aštrūs, šildantys ridikai su vėsinančiu pienu — įvardytas nesuderinamumas.')),
      card('🍅', '🥛', 'ayurveda', b('Nightshades + dairy', 'Bulviniai + pieno produktai'), b('Tomatoes, potatoes and peppers with milk or yogurt are listed as heavy, mucus-forming pairs.', 'Pomidorai, bulvės ir paprikos su pienu ar jogurtu laikomi sunkiais, gleives kaupiančiais deriniais.')),
      card('🧊', '♨️', 'ayurveda', b('Ice-cold with hot', 'Ledinis su karštu'), b('Iced drinks with a hot meal are said to put out the digestive fire. Sip warm water or herbal tea instead.', 'Ledinis gėrimas prie karšto valgio, sakoma, užgesina virškinimo ugnį. Gurkšnokite šiltą vandenį ar žolelių arbatą.')),
    ],
  },
  {
    id: 'combining', icon: '⚖️',
    title: b('Digestive clashes (food combining)', 'Virškinimo konfliktai (derinių tradicija)'),
    intro: b('Hay and Shelton’s rules: foods that need opposite conditions, digested at once, linger and ferment.', 'Hay ir Sheltono taisyklės: priešingų sąlygų reikalaujantys produktai, virškinami kartu, užsibūna ir rūgsta.'),
    cards: [
      card('🥩', '🥔', 'combining', b('Meat + potatoes or bread', 'Mėsa + bulvės ar duona'), b('Concentrated protein needs acid, starch an alkaline start — so the meal lingers and ferments.', 'Koncentruotiems baltymams reikia rūgšties, krakmolui — šarminės pradžios, todėl valgis užsibūna ir rūgsta.')),
      card('🥚', '🧀', 'combining', b('Two concentrated proteins', 'Du koncentruoti baltymai'), b('Meat with eggs, or fish with cheese, asks the stomach for two different timings at once.', 'Mėsa su kiaušiniais ar žuvis su sūriu reikalauja iš skrandžio dviejų skirtingų ritmų vienu metu.')),
      card('🍞', '🍊', 'combining', b('Starch + sour fruit', 'Krakmolas + rūgštūs vaisiai'), b('Acid stops the enzyme in saliva that starts starch digestion — bread with oranges or apples ferments.', 'Rūgštis sustabdo seilių fermentą, pradedantį krakmolo virškinimą — duona su apelsinais ar obuoliais rūgsta.')),
      card('🍰', '🍞', 'combining', b('Sugar + starch', 'Cukrus + krakmolas'), b('Cakes, sweet pastries and jam on bread: sugar ferments while starch waits its turn.', 'Pyragai, saldūs kepiniai ir uogienė ant duonos: cukrus rūgsta, kol krakmolas laukia savo eilės.')),
      card('🍎', '🍽️', 'combining', b('Fruit as dessert', 'Vaisiai desertui'), b('Fruit passes in 20–40 minutes; trapped behind a heavy meal it ferments. Eat it on its own, before food or between meals.', 'Vaisiai praeina per 20–40 min.; užstrigę už sunkaus valgio rūgsta. Valgykite atskirai, prieš valgį ar tarp valgių.')),
      card('🍉', '🍽️', 'combining', b('Melon with anything', 'Melionas su bet kuo'), b('“Eat it alone or leave it alone.” The quickest food of all.', '„Valgyk atskirai arba nevalgyk.“ Greičiausiai virškinamas maistas.')),
      card('🥤', '🍽️', 'combining', b('Lots of drink with meals', 'Daug gėrimų valgant'), b('Large amounts of liquid dilute digestive juices. Drink 20–30 minutes before, and sip only during the meal.', 'Didelis skysčių kiekis atskiedžia virškinimo sultis. Gerkite 20–30 min. prieš valgį, o valgydami tik gurkšnokite.')),
    ],
  },
]

/* ---------- Digestion times (food-combining tradition) ---------- */

export type DigestRow = { icon: string; name: Bi; min: number; max: number }

/** Approximate time in the stomach, in minutes, as given in food-combining charts. */
export const DIGESTION: DigestRow[] = [
  { icon: '🥤', name: b('Fresh juice', 'Šviežios sultys'), min: 15, max: 20 },
  { icon: '🍉', name: b('Melons', 'Melionai'), min: 15, max: 25 },
  { icon: '🍊', name: b('Juicy & sour fruit, berries', 'Sultingi, rūgštūs vaisiai, uogos'), min: 20, max: 40 },
  { icon: '🍌', name: b('Sweet & dried fruit', 'Saldūs ir džiovinti vaisiai'), min: 40, max: 60 },
  { icon: '🥗', name: b('Raw vegetables & salads', 'Žalios daržovės ir salotos'), min: 30, max: 50 },
  { icon: '🥦', name: b('Cooked vegetables', 'Virtos daržovės'), min: 40, max: 60 },
  { icon: '🥚', name: b('Eggs', 'Kiaušiniai'), min: 45, max: 90 },
  { icon: '🐟', name: b('Fish', 'Žuvis'), min: 45, max: 90 },
  { icon: '🥛', name: b('Milk, kefir, cottage cheese', 'Pienas, kefyras, varškė'), min: 90, max: 120 },
  { icon: '🌾', name: b('Grains & potatoes', 'Grūdai ir bulvės'), min: 90, max: 180 },
  { icon: '🫘', name: b('Legumes', 'Ankštiniai'), min: 120, max: 180 },
  { icon: '🌰', name: b('Nuts & seeds', 'Riešutai ir sėklos'), min: 150, max: 180 },
  { icon: '🍗', name: b('Poultry', 'Paukštiena'), min: 90, max: 150 },
  { icon: '🧀', name: b('Hard cheese', 'Kietasis sūris'), min: 240, max: 300 },
  { icon: '🥩', name: b('Beef, lamb, pork', 'Jautiena, aviena, kiauliena'), min: 180, max: 300 },
]

/* ---------- Eating order ---------- */

export const EATING_ORDER: { icon: string; title: Bi; text: Bi; source: Source }[] = [
  { icon: '💧', source: 'ayurveda', title: b('Warm water first', 'Pirmiausia šiltas vanduo'), text: b('A glass of warm water 20–30 minutes before the meal, then only sips while eating.', 'Stiklinė šilto vandens 20–30 min. prieš valgį, valgant — tik gurkšniai.') },
  { icon: '🍓', source: 'combining', title: b('Fruit on an empty stomach', 'Vaisiai tuščiu skrandžiu'), text: b('If you want fruit, eat it first and wait 20–30 minutes (melon: alone).', 'Jei norite vaisių, valgykite juos pirmus ir palaukite 20–30 min. (melioną — atskirai).') },
  { icon: '🥗', source: 'science', title: b('Vegetables before the rest', 'Daržovės prieš likusį maistą'), text: b('Studies show that eating vegetables (and protein) before carbohydrates noticeably softens the blood-sugar rise.', 'Tyrimai rodo: daržovės (ir baltymai) prieš angliavandenius pastebimai sušvelnina cukraus šuolį kraujyje.') },
  { icon: '🍲', source: 'combining', title: b('Then the cooked main', 'Tada pagrindinis virtas patiekalas'), text: b('One star — protein or starch — with its vegetables and a little fat.', 'Viena „žvaigždė“ — baltymai arba krakmolas — su daržovėmis ir truputiu riebalų.') },
  { icon: '⏳', source: 'combining', title: b('Pause before the next meal', 'Pertrauka iki kito valgio'), text: b('About 3–4 hours after a starch meal and 4–5 after a protein meal before eating again.', 'Maždaug 3–4 val. po krakmolingo ir 4–5 val. po baltyminio valgio iki kito valgymo.') },
]

/* ---------- Per-product pairing guide ---------- */

export type ProductGuide = { icon: string; name: Bi; best: Bi; ok: Bi; avoid: Bi; tip: Bi }

const g = (icon: string, name: Bi, best: Bi, ok: Bi, avoid: Bi, tip: Bi): ProductGuide => ({ icon, name, best, ok, avoid, tip })

export const PRODUCT_GUIDE: ProductGuide[] = [
  g('🥑', b('Avocado', 'Avokadas'), b('leafy greens, tomato, cucumber, lime/lemon, seeds', 'lapiniai žalumynai, pomidoras, agurkas, laimas / citrina, sėklos'), b('rye bread, potatoes, eggs', 'ruginė duona, bulvės, kiaušiniai'), b('melon, sweet fruit, milk', 'melionas, saldūs vaisiai, pienas'), b('Its fat unlocks the carotenoids of a whole salad.', 'Jo riebalai atrakina visų salotų karotinoidus.')),
  g('🥚', b('Eggs', 'Kiaušiniai'), b('spinach, herbs, tomato, peppers, asparagus', 'špinatai, žolelės, pomidoras, paprika, šparagai'), b('butter, avocado, a little cheese', 'sviestas, avokadas, šiek tiek sūrio'), b('meat, fish, bread & potatoes, milk', 'mėsa, žuvis, duona ir bulvės, pienas'), b('Soft-cooked keeps more than fried.', 'Minkštai virti išlaiko daugiau nei kepti.')),
  g('🌾', b('Buckwheat', 'Grikiai'), b('butter, mushrooms, onion, raw vegetables, sauerkraut', 'sviestas, grybai, svogūnai, žalios daržovės, rauginti kopūstai'), b('kefir, milk (as porridge)', 'kefyras, pienas (košė)'), b('meat, fish, sour fruit', 'mėsa, žuvis, rūgštūs vaisiai'), b('Soak green buckwheat overnight for the highest value.', 'Žalius grikius mirkykite per naktį — vertė didžiausia.')),
  g('🥔', b('Potatoes', 'Bulvės'), b('dill, butter or oil, cucumbers, sauerkraut, green salad', 'krapai, sviestas ar aliejus, agurkai, rauginti kopūstai, žalios salotos'), b('sour cream, mushrooms', 'grietinė, grybai'), b('meat, fish, eggs, bread, tomatoes (Ayurveda)', 'mėsa, žuvis, kiaušiniai, duona, pomidorai (ajurveda)'), b('Boil in their skins; eaten cooled they feed the gut.', 'Virkite su lupenomis; atvėsusios maitina žarnyną.')),
  g('🟣', b('Beetroot', 'Burokėliai'), b('walnuts, garlic, olive oil, greens, sauerkraut', 'graikiniai riešutai, česnakas, alyvuogių aliejus, žalumynai, rauginti kopūstai'), b('potatoes, buckwheat, sour cream', 'bulvės, grikiai, grietinė'), b('meat in large portions, sugar', 'mėsa didelėmis porcijomis, cukrus'), b('Grate it raw into salads at least sometimes.', 'Bent kartais tarkuokite žalią į salotas.')),
  g('🥬', b('Cabbage & sauerkraut', 'Kopūstai ir rauginti kopūstai'), b('potatoes, buckwheat, oil, carrots, apples (fresh cabbage)', 'bulvės, grikiai, aliejus, morkos, obuoliai (šviežiam kopūstui)'), b('legumes, sausages occasionally', 'ankštiniai, retkarčiais dešrelės'), b('milk', 'pienas'), b('Raw sauerkraut is a vitamin C store all winter.', 'Žali rauginti kopūstai — vitamino C sandėlis visą žiemą.')),
  g('🍅', b('Tomato', 'Pomidoras'), b('olive oil, basil, cucumber, greens, avocado, legumes', 'alyvuogių aliejus, bazilikas, agurkas, žalumynai, avokadas, ankštiniai'), b('eggs, fish, a little cheese', 'kiaušiniai, žuvis, šiek tiek sūrio'), b('bread & pasta (starch + acid), milk & yogurt', 'duona ir makaronai (krakmolas + rūgštis), pienas ir jogurtas'), b('Warm it gently in oil for the most lycopene.', 'Švelniai pašildykite aliejuje — likopeno bus daugiausia.')),
  g('🥒', b('Cucumber', 'Agurkas'), b('dill, greens, tomato, oil, potatoes, buckwheat', 'krapai, žalumynai, pomidoras, aliejus, bulvės, grikiai'), b('yogurt (as tzatziki), fish, eggs', 'jogurtas (tzatziki), žuvis, kiaušiniai'), b('melon, milk', 'melionas, pienas'), b('Pairs with almost everything — the most neutral vegetable.', 'Dera beveik su viskuo — neutraliausia daržovė.')),
  g('🍎', b('Apple', 'Obuolys'), b('walnuts, almonds, berries, celery, carrot, cinnamon', 'graikiniai riešutai, migdolai, uogos, salierai, morka, cinamonas'), b('greens, cottage cheese', 'žalumynai, varškė'), b('meat, bread, potatoes, milk; as dessert after a meal', 'mėsa, duona, bulvės, pienas; desertui po valgio'), b('Best mid-morning or mid-afternoon on its own.', 'Geriausia atskirai — priešpiečiams ar pavakariams.')),
  g('🍌', b('Banana', 'Bananas'), b('other sweet fruit, dates, leafy greens (smoothies), oats', 'kiti saldūs vaisiai, datulės, lapiniai žalumynai (kokteiliai), avižos'), b('nuts, kefir', 'riešutai, kefyras'), b('milk (Ayurveda), sour fruit, protein, melon', 'pienas (ajurveda), rūgštūs vaisiai, baltymai, melionas'), b('Ripe (with brown spots) is easiest to digest.', 'Prinokęs (su rudomis dėmelėmis) virškinamas lengviausiai.')),
  g('🧀', b('Cottage cheese', 'Varškė'), b('greens, cucumber, radish, herbs, a little sour cream', 'žalumynai, agurkas, ridikėliai, žolelės, šiek tiek grietinės'), b('berries, nuts', 'uogos, riešutai'), b('meat, fish, eggs, bread, sweet fruit & sugar', 'mėsa, žuvis, kiaušiniai, duona, saldūs vaisiai ir cukrus'), b('Savoury with herbs is a classic, light protein meal.', 'Sūri su žolelėmis — klasikinis, lengvas baltyminis valgis.')),
  g('🥛', b('Kefir & yogurt', 'Kefyras ir jogurtas'), b('oats, flax, cucumber, herbs, cinnamon', 'avižos, linų sėmenys, agurkas, žolelės, cinamonas'), b('banana, berries (for many people)', 'bananas, uogos (daugeliui tinka)'), b('fish, meat, melon; heated; late at night', 'žuvis, mėsa, melionas; pašildytas; vėlai vakare'), b('Drink between meals or with a light breakfast.', 'Gerkite tarp valgių ar su lengvais pusryčiais.')),
  g('🐟', b('Fish', 'Žuvis'), b('greens, broccoli, zucchini, lemon, dill, olive oil', 'žalumynai, brokoliai, cukinija, citrina, krapai, alyvuogių aliejus'), b('a little butter, tomato', 'šiek tiek sviesto, pomidoras'), b('milk & cheese, potatoes, bread, rice, eggs', 'pienas ir sūris, bulvės, duona, ryžiai, kiaušiniai'), b('Steam or bake gently; very fresh fish scores highest.', 'Garinkite ar kepkite švelniai; labai šviežia žuvis vertinama aukščiausiai.')),
  g('🥩', b('Meat', 'Mėsa'), b('raw vegetables, greens, sauerkraut, horseradish, mustard', 'žalios daržovės, žalumynai, rauginti kopūstai, krienai, garstyčios'), b('steamed vegetables, a little fat', 'garintos daržovės, šiek tiek riebalų'), b('potatoes, bread, pasta, milk, fruit, a second protein', 'bulvės, duona, makaronai, pienas, vaisiai, antras baltymas'), b('Keep the portion small and the vegetable side large.', 'Porcija maža, daržovių garnyras — didelis.')),
  g('🫘', b('Lentils & beans', 'Lęšiai ir pupelės'), b('vegetables, greens, olive oil, lemon, cumin, garlic, onion', 'daržovės, žalumynai, alyvuogių aliejus, citrina, kmynai, česnakas, svogūnai'), b('rice or other grains, tomato', 'ryžiai ar kitos kruopos, pomidoras'), b('meat, cheese, sweet fruit, milk', 'mėsa, sūris, saldūs vaisiai, pienas'), b('Soak, rinse, cook with spices — far less gas.', 'Mirkykite, nuplaukite, virkite su prieskoniais — daug mažiau dujų.')),
  g('🥣', b('Oats', 'Avižos'), b('flax, nuts, kefir, cinnamon, banana or dried fruit', 'linų sėmenys, riešutai, kefyras, cinamonas, bananas ar džiovinti vaisiai'), b('butter, apple (cooked in)', 'sviestas, obuolys (išvirtas kartu)'), b('meat, fish, eggs, sour fruit (raw, on top)', 'mėsa, žuvis, kiaušiniai, rūgštūs vaisiai (žali, ant viršaus)'), b('Soak overnight instead of boiling to keep more.', 'Mirkykite per naktį, o ne virkite — išlaikysite daugiau.')),
  g('🍯', b('Honey', 'Medus'), b('warm (not hot) herbal tea, lemon, ginger, cinnamon', 'šilta (ne karšta) žolelių arbata, citrina, imbieras, cinamonas'), b('oats, cottage cheese, nuts', 'avižos, varškė, riešutai'), b('heat above 40 °C, ghee in equal measure, white bread', 'kaitinimas virš 40 °C, lydytas sviestas po lygiai, balta duona'), b('A teaspoon, not a jar — it is still sugar.', 'Šaukštelis, ne stiklainis — tai vis tiek cukrus.')),
  g('🌰', b('Nuts & seeds', 'Riešutai ir sėklos'), b('sour fruit, berries, greens, vegetables', 'rūgštūs vaisiai, uogos, žalumynai, daržovės'), b('dried fruit, oats, avocado', 'džiovinti vaisiai, avižos, avokadas'), b('meat, fish, eggs, melon', 'mėsa, žuvis, kiaušiniai, melionas'), b('Soak almonds and walnuts for 8 hours — easier and “awakened”.', 'Migdolus ir riešutus mirkykite 8 val. — lengviau virškinami ir „pažadinti“.')),
]

/* ---------- Plate rules ---------- */

export const PLATE_RULES: Bi[] = [
  b('Half the plate vegetables or greens — they get along with everything except melon.', 'Pusė lėkštės — daržovės ar žalumynai: jos dera su viskuo, išskyrus melioną.'),
  b('Choose one star: protein or starch. Let vegetables and a little fat be its company.', 'Pasirinkite vieną „žvaigždę“: baltymus arba krakmolą. Daržovės ir truputis riebalų — jos palyda.'),
  b('Fruit on its own — in the morning or as a snack, not as dessert.', 'Vaisiai — atskirai: ryte ar užkandžiui, ne desertui.'),
  b('Pair for absorption: fat with vegetables, lemon with iron, pepper with turmeric.', 'Derinkite dėl įsisavinimo: riebalai su daržovėmis, citrina su geležimi, pipirai su ciberžole.'),
  b('Keep tea and coffee an hour away from your main meals.', 'Arbatą ir kavą gerkite valandą atskirai nuo pagrindinių valgių.'),
  b('Soak grains, legumes and nuts; spice legumes with cumin or fennel.', 'Mirkykite grūdus, ankštinius ir riešutus; ankštinius gardinkite kmynais ar pankoliais.'),
  b('Simple meals of 3–5 ingredients digest better than plates of ten.', 'Paprasti 3–5 ingredientų patiekalai virškinami geriau nei dešimties.'),
  b('Listen to your body: if a combination leaves you heavy, bloated or sleepy, it isn’t yours.', 'Klausykite kūno: jei derinys palieka sunkumą, pūtimą ar mieguistumą — jis ne jums.'),
]
