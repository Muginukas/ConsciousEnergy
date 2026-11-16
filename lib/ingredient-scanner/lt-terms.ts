// The HolySnacks scanner matches English ingredient names. Lithuanian labels
// (and Open Food Facts entries for Lithuanian products) list ingredients in
// Lithuanian, so we translate the common terms to English before scanning.
// Rules run on lowercased, diacritic-free text, in order — longer phrases
// first so that e.g. "kokosų cukrus" becomes "coconut sugar", not "sugar".

const RULES: [RegExp, string][] = [
  // ── Sugars & sweeteners ──
  [/\bkokosu (palmiu )?(ziedu )?cukr\w*/g, 'coconut sugar'],
  [/\bklevu sirup\w*/g, 'pure maple syrup'],
  [/\b(gliukozes[- ]?fruktozes|fruktozes[- ]?gliukozes) sirup\w*/g, 'glucose-fructose syrup'],
  [/\bgliukozes sirup\w*/g, 'glucose syrup'],
  [/\bkukuruzu sirup\w*/g, 'corn syrup'],
  [/\binvertuot\w* cukr\w*/g, 'invert sugar'],
  [/\b(rudas(is)? |nerafinuot\w* )?cukr\w*/g, 'sugar'],
  [/\bdekstroz\w*/g, 'dextrose'],
  [/\bmaltodekstrin\w*/g, 'maltodextrin'],
  [/\bpolidekstroz\w*/g, 'polydextrose'],
  [/\baspartam\w*/g, 'aspartame'],
  [/\bsukraloz\w*/g, 'sucralose'],
  [/\bacesulfam\w*( k\b| kali\w*)?/g, 'acesulfame potassium'],
  [/\bsachari\w*/g, 'saccharin'],
  [/\bciklamat\w*/g, 'cyclamate'],
  [/\bksilitol\w*/g, 'xylitol'],
  [/\bstevij\w*/g, 'stevia'],
  [/\b(nekaitint\w*|zali\w*|ekologisk\w*) medu?s?\b/g, 'raw honey'],
  [/\bdatuli\w*( past\w*| sirup\w*)?|\bdatul\w*/g, 'dates'],

  // ── Fats & oils ──
  [/\bpalmiu branduoliu (aliej|riebal)\w*/g, 'palm kernel oil'],
  [/\bpalmiu (aliej|riebal|stearin|olein)\w*/g, 'palm oil'],
  [/\bis dalies hidrint\w*( augalin\w*)? (aliej|riebal)\w*/g, 'partially hydrogenated oil'],
  [/\bhidrint\w*( augalin\w*)? (aliej|riebal)\w*/g, 'hydrogenated fat'],
  [/\bperesterint\w*( augalin\w*)? (aliej|riebal)\w*/g, 'interesterified fat'],
  [/\b(ypac tyr\w*|pirmojo spaudimo|salto spaudimo) alyvuogiu aliej\w*/g, 'extra virgin olive oil'],
  [/\b(nerafinuot\w*|tyr\w*|salto spaudimo) kokosu aliej\w*/g, 'virgin coconut oil'],
  [/\brapsu aliej\w*/g, 'rapeseed oil'],
  [/\bsaulegrazu aliej\w*/g, 'sunflower oil'],
  [/\b(sojos|soju) aliej\w*/g, 'soybean oil'],
  [/\bkukuruzu aliej\w*/g, 'corn oil'],
  [/\bmedvilnes (seklu )?aliej\w*/g, 'cottonseed oil'],

  // ── Starches & proteins ──
  [/\bmodifikuot\w* (\w+ )?krakmol\w*/g, 'modified starch'],
  [/\btapijok\w* krakmol\w*/g, 'tapioca starch'],
  [/\b(sojos|soju) baltymu izoliat\w*/g, 'soy protein isolate'],
  [/\bhidrolizuot\w* (augalin\w* )?baltym\w*/g, 'hydrolyzed vegetable protein'],
  [/\bzirniu baltym\w*/g, 'pea protein'],
  [/\bmieliu ekstrakt\w*/g, 'yeast extract'],

  // ── Additives ──
  [/\bmononatrio glutamat\w*/g, 'monosodium glutamate'],
  [/\bdinatrio inozinat\w*/g, 'disodium inosinate'],
  [/\bdinatrio guanilat\w*/g, 'disodium guanylate'],
  [/\bnatrio benzoat\w*/g, 'sodium benzoate'],
  [/\bbenzenkarboksirugst\w*|\bbenzoines rugst\w*/g, 'benzoic acid'],
  [/\bkalio sorbat\w*/g, 'potassium sorbate'],
  [/\bkalcio propionat\w*/g, 'calcium propionate'],
  [/\bnatrio nitrit\w*/g, 'sodium nitrite'],
  [/\b(natrio|kalio) nitrat\w*/g, 'sodium nitrate'],
  [/\bnatrio (eritorbat|izoaskorbat)\w*/g, 'sodium erythorbate'],
  [/\b(natrio |di|tri)?(poli)?fosfat\w*/g, 'sodium phosphate'],
  [/\bsieros dioksid\w*/g, 'sulfur dioxide'],
  [/\bkarageni?n\w*/g, 'carrageenan'],
  [/\bkarboksimetilceliulioz\w*/g, 'carboxymethylcellulose'],
  [/\btitano dioksid\w*/g, 'titanium dioxide'],
  [/\bsilicio dioksid\w*/g, 'silicon dioxide'],
  [/\bpropilenglikol\w*/g, 'propylene glycol'],
  [/\bpolisorbat\w*/g, 'polysorbate 80'],
  [/\b(riebalu rugsciu )?mono[- ]? ?(ir|bei) digliceri\w*/g, 'mono- and diglycerides'],
  [/\bvanilin\w*/g, 'vanillin'],
  [/\bvanil\w* (ekstrakt|ankst)\w*|\bburbon\w* vanil\w*/g, 'vanilla extract'],
  [/\b(dirbtin\w* )?(kvapiosios medziagos|kvapioji medziaga|aromat\w*)/g, 'natural flavoring'],
  [/\bkarmin\w*|\bkosenil\w*/g, 'carmine'],
  [/\bjoduot\w* druska/g, 'iodized salt'],
  [/\bjuros druska/g, 'sea salt'],
  [/\bhimalaj\w* druska/g, 'himalayan salt'],

  // ── Whole foods & functional ingredients ──
  [/\b(gyv\w* (aktyv\w* )?kultur\w*|pieno rugsties bakterij\w*|probiotik\w*)/g, 'live cultures'],
  [/\bmigdolu milt\w*/g, 'almond flour'],
  [/\bavizu (dribsni|milt|seleni)\w*|\bavizin\w* dribsni\w*/g, 'rolled oats'],
  [/\bciberzol\w*|\bkurkum\w*/g, 'turmeric'],
  [/\bimbier\w*/g, 'ginger'],
  [/\bspirulin\w*/g, 'spirulina'],
  [/\bpektin\w*/g, 'pectin'],
  [/\bagar\w*/g, 'agar'],
  [/\brozmarin\w*( ekstrakt\w*)?/g, 'rosemary extract'],
  [/\baskorbo rugst\w*|\bvitamin\w* c\b/g, 'ascorbic acid'],
  [/\bcitrin\w* sult\w*/g, 'lemon juice'],
  [/\bzaliosios arbatos( ekstrakt\w*)?/g, 'green tea'],
  [/\bburokeli\w* (milteli|sult)\w*/g, 'beetroot powder'],
  [/\bekologisk\w* kakav\w*/g, 'organic cocoa'],
  [/\bkiausin\w*/g, 'whole egg'],
  [/\bzemes riesut\w*/g, 'peanuts'],
  [/\blazdyno riesut\w*/g, 'hazelnuts'],
  [/\bgraikin\w* riesut\w*/g, 'walnuts'],
  [/\bmigdol\w*/g, 'almonds'],
  [/\banakard\w*/g, 'cashews'],
  [/\bbraski\w*|\bbraskes\b/g, 'strawberries'],
  [/\baviec\w*|\bavietes\b/g, 'raspberries'],
  [/\bmelyni\w*|\bmelynes\b/g, 'blueberries'],
  [/\bspanguol\w*/g, 'cranberries'],
  [/\bvysni\w*/g, 'cherries'],
]

function stripDiacritics(s: string): string {
  return s
    .toLowerCase()
    .replace(/ą/g, 'a').replace(/č/g, 'c').replace(/ę/g, 'e').replace(/ė/g, 'e')
    .replace(/į/g, 'i').replace(/š/g, 's').replace(/ų/g, 'u').replace(/ū/g, 'u')
    .replace(/ž/g, 'z')
}

/**
 * Returns the text to feed into scanText(): the original label plus an
 * English rendering of the Lithuanian terms it contains. E-numbers written
 * with a space ("E 330") are joined so they match ("e330").
 */
export function prepareForScan(text: string): string {
  let t = stripDiacritics(text).replace(/\be[\s-]+(\d{3}[a-z]?)\b/g, 'e$1')
  for (const [re, en] of RULES) t = t.replace(re, ` ${en} `)
  return `${text}\n${t}`
}
