import { CategorySlug } from './types'

/**
 * The Vibration Map — a unified model that weaves together three classic
 * frameworks for mapping consciousness and energy:
 *
 *  1. Dr. David Hawkins' Map of Consciousness (states calibrated 20–1000).
 *  2. The Solfeggio frequencies (sacred tones, 396–963 Hz).
 *  3. The seven-chakra energy system (already present across the library).
 *
 * From these we derive our own combined map: seven VIBRATION_TIERS, each
 * aligned to a chakra, a Hawkins band, and a Solfeggio tone, and tied to the
 * practices that help cultivate that level.
 *
 * All copy carries both English (`xxx`) and Lithuanian (`xxxLt`) fields, the
 * same dual-locale convention used in `lib/categories.ts`.
 */

// ─── Hawkins Map of Consciousness ──────────────────────────────────────────

export interface HawkinsLevel {
  /** Calibrated value on the 20–1000 log scale. */
  calibration: number
  name: string
  nameLt: string
  emotion: string
  emotionLt: string
  /** How life is viewed from this level. */
  view: string
  viewLt: string
  /** The associated life-process. */
  process: string
  processLt: string
  /** Below 200 = force (contractive); 200 and above = power (expansive). */
  band: 'force' | 'power'
  color: string
}

export const HAWKINS_LEVELS: HawkinsLevel[] = [
  {
    calibration: 700,
    name: 'Enlightenment',
    nameLt: 'Nušvitimas',
    emotion: 'Ineffable',
    emotionLt: 'Neapsakoma',
    view: 'Is',
    viewLt: 'Tiesiog yra',
    process: 'Pure Consciousness',
    processLt: 'Gryna sąmonė',
    band: 'power',
    color: '#9d6bd6',
  },
  {
    calibration: 600,
    name: 'Peace',
    nameLt: 'Ramybė',
    emotion: 'Bliss',
    emotionLt: 'Palaima',
    view: 'Perfect',
    viewLt: 'Tobulas',
    process: 'Illumination',
    processLt: 'Nušvitimas',
    band: 'power',
    color: '#7c5fc4',
  },
  {
    calibration: 540,
    name: 'Joy',
    nameLt: 'Džiaugsmas',
    emotion: 'Serenity',
    emotionLt: 'Giedra',
    view: 'Complete',
    viewLt: 'Pilnatvė',
    process: 'Transfiguration',
    processLt: 'Persimainymas',
    band: 'power',
    color: '#5a7fd4',
  },
  {
    calibration: 500,
    name: 'Love',
    nameLt: 'Meilė',
    emotion: 'Reverence',
    emotionLt: 'Pagarba',
    view: 'Benign',
    viewLt: 'Geranoriškas',
    process: 'Revelation',
    processLt: 'Apreiškimas',
    band: 'power',
    color: '#3f9d6b',
  },
  {
    calibration: 400,
    name: 'Reason',
    nameLt: 'Protas',
    emotion: 'Understanding',
    emotionLt: 'Supratimas',
    view: 'Meaningful',
    viewLt: 'Prasmingas',
    process: 'Abstraction',
    processLt: 'Abstrakcija',
    band: 'power',
    color: '#5aa84f',
  },
  {
    calibration: 350,
    name: 'Acceptance',
    nameLt: 'Priėmimas',
    emotion: 'Forgiveness',
    emotionLt: 'Atleidimas',
    view: 'Harmonious',
    viewLt: 'Darnus',
    process: 'Transcendence',
    processLt: 'Peržengimas',
    band: 'power',
    color: '#8cae3a',
  },
  {
    calibration: 310,
    name: 'Willingness',
    nameLt: 'Pasiryžimas',
    emotion: 'Optimism',
    emotionLt: 'Optimizmas',
    view: 'Hopeful',
    viewLt: 'Viltingas',
    process: 'Intention',
    processLt: 'Ketinimas',
    band: 'power',
    color: '#b8b02e',
  },
  {
    calibration: 250,
    name: 'Neutrality',
    nameLt: 'Neutralumas',
    emotion: 'Trust',
    emotionLt: 'Pasitikėjimas',
    view: 'Satisfactory',
    viewLt: 'Patenkinamas',
    process: 'Release',
    processLt: 'Paleidimas',
    band: 'power',
    color: '#d4b02a',
  },
  {
    calibration: 200,
    name: 'Courage',
    nameLt: 'Drąsa',
    emotion: 'Affirmation',
    emotionLt: 'Tvirtumas',
    view: 'Feasible',
    viewLt: 'Įveikiamas',
    process: 'Empowerment',
    processLt: 'Įgalinimas',
    band: 'power',
    color: '#e0a020',
  },
  {
    calibration: 175,
    name: 'Pride',
    nameLt: 'Puikybė',
    emotion: 'Scorn',
    emotionLt: 'Panieka',
    view: 'Demanding',
    viewLt: 'Reiklus',
    process: 'Inflation',
    processLt: 'Išpūtimas',
    band: 'force',
    color: '#dd8a1f',
  },
  {
    calibration: 150,
    name: 'Anger',
    nameLt: 'Pyktis',
    emotion: 'Hate',
    emotionLt: 'Neapykanta',
    view: 'Antagonistic',
    viewLt: 'Priešiškas',
    process: 'Aggression',
    processLt: 'Agresija',
    band: 'force',
    color: '#cc5f1e',
  },
  {
    calibration: 125,
    name: 'Desire',
    nameLt: 'Geismas',
    emotion: 'Craving',
    emotionLt: 'Troškimas',
    view: 'Disappointing',
    viewLt: 'Nuviliantis',
    process: 'Enslavement',
    processLt: 'Pavergimas',
    band: 'force',
    color: '#bf4a2a',
  },
  {
    calibration: 100,
    name: 'Fear',
    nameLt: 'Baimė',
    emotion: 'Anxiety',
    emotionLt: 'Nerimas',
    view: 'Frightening',
    viewLt: 'Bauginantis',
    process: 'Withdrawal',
    processLt: 'Užsisklendimas',
    band: 'force',
    color: '#a83a35',
  },
  {
    calibration: 75,
    name: 'Grief',
    nameLt: 'Liūdesys',
    emotion: 'Regret',
    emotionLt: 'Gailestis',
    view: 'Tragic',
    viewLt: 'Tragiškas',
    process: 'Despondency',
    processLt: 'Nusiminimas',
    band: 'force',
    color: '#933640',
  },
  {
    calibration: 50,
    name: 'Apathy',
    nameLt: 'Apatija',
    emotion: 'Despair',
    emotionLt: 'Neviltis',
    view: 'Hopeless',
    viewLt: 'Beviltiškas',
    process: 'Abdication',
    processLt: 'Atsisakymas',
    band: 'force',
    color: '#7d3548',
  },
  {
    calibration: 30,
    name: 'Guilt',
    nameLt: 'Kaltė',
    emotion: 'Blame',
    emotionLt: 'Kaltinimas',
    view: 'Condemning',
    viewLt: 'Smerkiantis',
    process: 'Destruction',
    processLt: 'Naikinimas',
    band: 'force',
    color: '#6b3350',
  },
  {
    calibration: 20,
    name: 'Shame',
    nameLt: 'Gėda',
    emotion: 'Humiliation',
    emotionLt: 'Pažeminimas',
    view: 'Miserable',
    viewLt: 'Apgailėtinas',
    process: 'Elimination',
    processLt: 'Pašalinimas',
    band: 'force',
    color: '#5a3157',
  },
]

// ─── Solfeggio Frequencies ─────────────────────────────────────────────────

export interface SolfeggioTone {
  hz: number
  name: string
  nameLt: string
  purpose: string
  purposeLt: string
  /** Chakra most often associated with the tone. */
  chakra: string
  chakraLt: string
  color: string
}

export const SOLFEGGIO_TONES: SolfeggioTone[] = [
  {
    hz: 174,
    name: 'Foundation',
    nameLt: 'Pamatas',
    purpose: 'Relieves pain and tension, giving organs a sense of security.',
    purposeLt: 'Mažina skausmą ir įtampą, suteikia kūnui saugumo jausmą.',
    chakra: 'Below Root',
    chakraLt: 'Po šaknies čakra',
    color: '#a83a35',
  },
  {
    hz: 285,
    name: 'Renewal',
    nameLt: 'Atsinaujinimas',
    purpose: 'Helps tissue and energy fields repair and restructure.',
    purposeLt: 'Padeda audiniams ir energijos laukui atsistatyti.',
    chakra: 'Etheric Body',
    chakraLt: 'Eterinis kūnas',
    color: '#cc5f1e',
  },
  {
    hz: 396,
    name: 'Liberation',
    nameLt: 'Išlaisvinimas',
    purpose: 'Releases fear and guilt; grounds and stabilizes.',
    purposeLt: 'Paleidžia baimę ir kaltę; įžemina ir stabilizuoja.',
    chakra: 'Root',
    chakraLt: 'Šaknies',
    color: '#c0392b',
  },
  {
    hz: 417,
    name: 'Change',
    nameLt: 'Pokytis',
    purpose: 'Clears trauma and facilitates change and new beginnings.',
    purposeLt: 'Valo traumas, skatina pokyčius ir naujus pradus.',
    chakra: 'Sacral',
    chakraLt: 'Kryžkaulio',
    color: '#e67e22',
  },
  {
    hz: 528,
    name: 'Transformation',
    nameLt: 'Transformacija',
    purpose: 'The "miracle" tone — DNA repair, vitality, and self-love.',
    purposeLt: '„Stebuklo" tonas — DNR atstatymas, gyvybingumas, savimeilė.',
    chakra: 'Solar Plexus',
    chakraLt: 'Saulės rezginio',
    color: '#f1c40f',
  },
  {
    hz: 639,
    name: 'Connection',
    nameLt: 'Ryšys',
    purpose: 'Harmonizes relationships, empathy, and the heart.',
    purposeLt: 'Harmonizuoja santykius, empatiją ir širdį.',
    chakra: 'Heart',
    chakraLt: 'Širdies',
    color: '#27ae60',
  },
  {
    hz: 741,
    name: 'Expression',
    nameLt: 'Saviraiška',
    purpose: 'Cleanses, awakens intuition, and supports self-expression.',
    purposeLt: 'Valo, žadina intuiciją ir palaiko saviraišką.',
    chakra: 'Throat',
    chakraLt: 'Gerklės',
    color: '#2980b9',
  },
  {
    hz: 852,
    name: 'Intuition',
    nameLt: 'Intuicija',
    purpose: 'Returns to spiritual order; opens inner sight.',
    purposeLt: 'Grąžina dvasinę tvarką; atveria vidinį regėjimą.',
    chakra: 'Third Eye',
    chakraLt: 'Trečiosios akies',
    color: '#5b3a8c',
  },
  {
    hz: 963,
    name: 'Oneness',
    nameLt: 'Vienovė',
    purpose: 'Awakens the crown, unity, and connection to source.',
    purposeLt: 'Žadina vainiko čakrą, vienovę ir ryšį su šaltiniu.',
    chakra: 'Crown',
    chakraLt: 'Vainiko',
    color: '#8e44ad',
  },
]

// ─── Unified Vibration Tiers (our combined map) ────────────────────────────

export interface VibrationTier {
  id: string
  /** 1 (densest) … 7 (most expansive). */
  level: number
  label: string
  labelLt: string
  chakra: string
  chakraLt: string
  /** Sanskrit / colour cue shown on the scale. */
  chakraColor: string
  /** Inclusive Hawkins calibration band [min, max]. */
  hawkinsRange: [number, number]
  solfeggioHz: number
  color: string
  summary: string
  summaryLt: string
  /** Library category whose practices best serve this tier. */
  practiceCategory: CategorySlug
  /** Specific technique slugs within that category to recommend. */
  practiceSlugs: string[]
}

export const VIBRATION_TIERS: VibrationTier[] = [
  {
    id: 'survival',
    level: 1,
    label: 'Survival & Grounding',
    labelLt: 'Išlikimas ir įžeminimas',
    chakra: 'Root · Muladhara',
    chakraLt: 'Šaknies · Muladhara',
    chakraColor: '#c0392b',
    hawkinsRange: [20, 100],
    solfeggioHz: 396,
    color: '#c0392b',
    summary:
      'Dense, contractive states — shame, fear, survival. Energy here asks for safety, grounding, and a return to the body.',
    summaryLt:
      'Tankios, susitraukiančios būsenos — gėda, baimė, išlikimas. Ši energija prašo saugumo, įžeminimo ir grįžimo į kūną.',
    practiceCategory: 'chakras',
    practiceSlugs: ['muladhara-root'],
  },
  {
    id: 'desire',
    level: 2,
    label: 'Feeling & Flow',
    labelLt: 'Jausmas ir tėkmė',
    chakra: 'Sacral · Svadhisthana',
    chakraLt: 'Kryžkaulio · Svadhisthana',
    chakraColor: '#e67e22',
    hawkinsRange: [100, 175],
    solfeggioHz: 417,
    color: '#e67e22',
    summary:
      'Desire, craving, and emotion in motion. The work is to let feeling flow without being enslaved by it.',
    summaryLt:
      'Geismas, troškimas ir judantys jausmai. Užduotis — leisti jausmui tekėti, netampant jo vergu.',
    practiceCategory: 'chakras',
    practiceSlugs: ['svadhisthana-sacral'],
  },
  {
    id: 'power',
    level: 3,
    label: 'Courage & Will',
    labelLt: 'Drąsa ir valia',
    chakra: 'Solar Plexus · Manipura',
    chakraLt: 'Saulės rezginio · Manipura',
    chakraColor: '#f1c40f',
    hawkinsRange: [175, 250],
    solfeggioHz: 528,
    color: '#e0a020',
    summary:
      'The pivotal crossing at 200 — from force to power. Courage, willingness, and personal agency awaken.',
    summaryLt:
      'Lemiamas perėjimas ties 200 — nuo jėgos prie galios. Pabunda drąsa, pasiryžimas ir asmeninė galia.',
    practiceCategory: 'kundalini',
    practiceSlugs: [],
  },
  {
    id: 'heart',
    level: 4,
    label: 'Love & Acceptance',
    labelLt: 'Meilė ir priėmimas',
    chakra: 'Heart · Anahata',
    chakraLt: 'Širdies · Anahata',
    chakraColor: '#27ae60',
    hawkinsRange: [250, 400],
    solfeggioHz: 639,
    color: '#27ae60',
    summary:
      'Acceptance, reason, and unconditional love. Life is seen as harmonious; the heart opens to others.',
    summaryLt:
      'Priėmimas, protas ir besąlygiška meilė. Gyvenimas matomas darnus; širdis atsiveria kitiems.',
    practiceCategory: 'chakras',
    practiceSlugs: ['anahata-heart'],
  },
  {
    id: 'truth',
    level: 5,
    label: 'Expression & Truth',
    labelLt: 'Saviraiška ir tiesa',
    chakra: 'Throat · Vishuddha',
    chakraLt: 'Gerklės · Vishuddha',
    chakraColor: '#2980b9',
    hawkinsRange: [400, 500],
    solfeggioHz: 741,
    color: '#2980b9',
    summary:
      'Authentic expression and clear truth. Energy flows into voice, creativity, and honest communication.',
    summaryLt:
      'Autentiška saviraiška ir aiški tiesa. Energija liejasi į balsą, kūrybą ir nuoširdų bendravimą.',
    practiceCategory: 'chakras',
    practiceSlugs: ['vishuddha-throat'],
  },
  {
    id: 'insight',
    level: 6,
    label: 'Joy & Insight',
    labelLt: 'Džiaugsmas ir įžvalga',
    chakra: 'Third Eye · Ajna',
    chakraLt: 'Trečiosios akies · Ajna',
    chakraColor: '#5b3a8c',
    hawkinsRange: [500, 600],
    solfeggioHz: 852,
    color: '#5b3a8c',
    summary:
      'Joy, intuition, and inner vision. Perception widens; the witness sees beyond the personal story.',
    summaryLt:
      'Džiaugsmas, intuicija ir vidinis regėjimas. Suvokimas plečiasi; stebėtojas mato už asmeninės istorijos.',
    practiceCategory: 'meditation',
    practiceSlugs: [],
  },
  {
    id: 'unity',
    level: 7,
    label: 'Peace & Oneness',
    labelLt: 'Ramybė ir vienovė',
    chakra: 'Crown · Sahasrara',
    chakraLt: 'Vainiko · Sahasrara',
    chakraColor: '#8e44ad',
    hawkinsRange: [600, 1000],
    solfeggioHz: 963,
    color: '#8e44ad',
    summary:
      'Peace, bliss, and pure consciousness. The sense of a separate self dissolves into unity with all that is.',
    summaryLt:
      'Ramybė, palaima ir gryna sąmonė. Atskiro „aš" jausmas ištirpsta vienovėje su visa, kas yra.',
    practiceCategory: 'chakras',
    practiceSlugs: ['sahasrara-crown'],
  },
]

// ─── Self-Assessment ───────────────────────────────────────────────────────

export interface AssessmentOption {
  text: string
  textLt: string
  /** Contribution toward the resulting tier (1 = densest … 7 = highest). */
  score: number
}

export interface AssessmentQuestion {
  id: string
  text: string
  textLt: string
  options: AssessmentOption[]
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'state',
    text: 'Right now, the feeling closest to my inner state is…',
    textLt: 'Šiuo metu mano vidinei būsenai artimiausias jausmas yra…',
    options: [
      { text: 'Fear, shame, or numbness', textLt: 'Baimė, gėda ar sustingimas', score: 1 },
      { text: 'Frustration or restless wanting', textLt: 'Nusivylimas ar neramus troškimas', score: 3 },
      { text: 'Calm acceptance and care', textLt: 'Rami ramybė ir rūpestis', score: 5 },
      { text: 'Quiet joy or expansive peace', textLt: 'Tylus džiaugsmas ar plati ramybė', score: 7 },
    ],
  },
  {
    id: 'view',
    text: 'When I look at my life as a whole, it seems…',
    textLt: 'Kai pažvelgiu į savo gyvenimą kaip visumą, jis atrodo…',
    options: [
      { text: 'Hopeless or against me', textLt: 'Beviltiškas ar nukreiptas prieš mane', score: 1 },
      { text: 'Demanding and never enough', textLt: 'Reiklus ir niekada nepakankamas', score: 3 },
      { text: 'Workable and meaningful', textLt: 'Įveikiamas ir prasmingas', score: 5 },
      { text: 'Complete and perfect as it is', textLt: 'Pilnas ir tobulas toks, koks yra', score: 7 },
    ],
  },
  {
    id: 'body',
    text: 'In my body I mostly notice…',
    textLt: 'Savo kūne dažniausiai pastebiu…',
    options: [
      { text: 'Tension, heaviness, or shutdown', textLt: 'Įtampą, sunkumą ar užsisklendimą', score: 1 },
      { text: 'Agitation or craving for more', textLt: 'Sujaudinimą ar troškimą daugiau', score: 3 },
      { text: 'Warmth, openness in the chest', textLt: 'Šilumą, atvirumą krūtinėje', score: 5 },
      { text: 'Lightness and spacious ease', textLt: 'Lengvumą ir erdvią ramybę', score: 7 },
    ],
  },
  {
    id: 'others',
    text: 'Toward other people I tend to feel…',
    textLt: 'Kitų žmonių atžvilgiu dažniausiai jaučiu…',
    options: [
      { text: 'Blame, fear, or withdrawal', textLt: 'Kaltinimą, baimę ar atsitraukimą', score: 1 },
      { text: 'Comparison, pride, or anger', textLt: 'Palyginimą, puikybę ar pyktį', score: 3 },
      { text: 'Forgiveness and goodwill', textLt: 'Atleidimą ir geranoriškumą', score: 5 },
      { text: 'Unconditional love and unity', textLt: 'Besąlygišką meilę ir vienovę', score: 7 },
    ],
  },
  {
    id: 'response',
    text: 'When something goes wrong, my first move is to…',
    textLt: 'Kai kažkas nutinka ne taip, pirmiausia linkstu…',
    options: [
      { text: 'Collapse or blame myself', textLt: 'Palūžti arba kaltinti save', score: 1 },
      { text: 'React, push, or fight it', textLt: 'Reaguoti, spausti ar kovoti', score: 3 },
      { text: 'Pause, accept, and adjust', textLt: 'Stabtelėti, priimti ir prisitaikyti', score: 5 },
      { text: 'Trust the bigger unfolding', textLt: 'Pasitikėti didesniu vyksmu', score: 7 },
    ],
  },
  {
    id: 'energy',
    text: 'My energy through the day feels…',
    textLt: 'Mano energija dienos metu jaučiasi…',
    options: [
      { text: 'Drained and stuck', textLt: 'Išsekusi ir įstrigusi', score: 1 },
      { text: 'Driven but tense', textLt: 'Varoma, bet įtempta', score: 3 },
      { text: 'Steady and warm', textLt: 'Pastovi ir šilta', score: 5 },
      { text: 'Light, clear, and free', textLt: 'Lengva, skaidri ir laisva', score: 7 },
    ],
  },
  {
    id: 'focus',
    text: 'My attention most naturally rests on…',
    textLt: 'Mano dėmesys natūraliausiai krypsta į…',
    options: [
      { text: 'What I lack or fear losing', textLt: 'Ko trūksta ar bijau prarasti', score: 1 },
      { text: 'What I want to get or prove', textLt: 'Ką noriu gauti ar įrodyti', score: 3 },
      { text: 'What I can give and appreciate', textLt: 'Ką galiu duoti ir vertinti', score: 5 },
      { text: 'The silent awareness behind it all', textLt: 'Tylų suvokimą už visko', score: 7 },
    ],
  },
  {
    id: 'meaning',
    text: 'Life feels most meaningful to me when I…',
    textLt: 'Gyvenimas man prasmingiausias, kai…',
    options: [
      { text: 'Just make it through the day', textLt: 'Tiesiog ištveriu dieną', score: 1 },
      { text: 'Achieve and get ahead', textLt: 'Pasiekiu ir judu pirmyn', score: 3 },
      { text: 'Connect and contribute', textLt: 'Užmezgu ryšį ir prisidedu', score: 5 },
      { text: 'Simply rest in being', textLt: 'Tiesiog būnu buvime', score: 7 },
    ],
  },
]

/**
 * Map an averaged self-assessment score (1–7) to one of the seven tiers.
 * The score is clamped, rounded, and used as the 1-indexed tier level.
 */
export function tierForScore(score: number): VibrationTier {
  const level = Math.min(7, Math.max(1, Math.round(score)))
  return VIBRATION_TIERS.find((t) => t.level === level) ?? VIBRATION_TIERS[0]
}

// ─── Deeper layer: drill-down content ──────────────────────────────────────
//
// Additive lookups (keyed by Hawkins calibration and by tier id) so the
// interactive map can let a visitor open any level or chakra and go deeper —
// without touching the core arrays above. Contemplative/symbolic copy, dual
// locale, mirroring the existing convention.

export interface HawkinsDepth {
  /** A deeper portrait of the level. */
  description: string
  descriptionLt: string
  /** One-line gloss expanding the emotion. */
  emotionNote: string
  emotionNoteLt: string
  /** One-line gloss expanding the view of life. */
  viewNote: string
  viewNoteLt: string
  /** One-line gloss expanding the life-process. */
  processNote: string
  processNoteLt: string
  /** The key to rising toward the next level. */
  ascend: string
  ascendLt: string
}

export const HAWKINS_DEPTH: Record<number, HawkinsDepth> = {
  700: {
    description:
      'The separate self dissolves into pure awareness; only the radiant presence of what is remains.',
    descriptionLt:
      'Atskiras „aš" ištirpsta grynoje sąmonėje; lieka tik spindinti būtis — kas yra.',
    emotionNote: 'Beyond words — a peace too vast to name.',
    emotionNoteLt: 'Už žodžių — ramybė, per plati įvardyti.',
    viewNote: 'Reality is seen exactly as it is, with no story.',
    viewNoteLt: 'Tikrovė matoma tokia, kokia yra, be jokios istorijos.',
    processNote: 'Awareness aware of itself — sourceless and whole.',
    processNoteLt: 'Sąmonė, suvokianti save — bešaltinė ir vientisa.',
    ascend: 'Nothing to attain — simply abide as awareness itself.',
    ascendLt: 'Nieko nebereikia siekti — tiesiog būk pati sąmonė.',
  },
  600: {
    description:
      'Perception of separateness ends; the world is experienced as a flowing, timeless whole.',
    descriptionLt:
      'Atskirumo jausmas baigiasi; pasaulis patiriamas kaip tekanti, belaikė visuma.',
    emotionNote: 'Bliss that needs no cause and asks for nothing.',
    emotionNoteLt: 'Palaima be priežasties, nieko neprašanti.',
    viewNote: 'All things are seen as perfect, complete as they are.',
    viewNoteLt: 'Viskas matoma tobula, pilna tokia, kokia yra.',
    processNote: 'Inner light illumines experience from within.',
    processNoteLt: 'Vidinė šviesa nušviečia patyrimą iš vidaus.',
    ascend: 'Let even bliss be released into pure stillness.',
    ascendLt: 'Leisk net palaimai ištirpti grynoje tyloje.',
  },
  540: {
    description:
      'An unconditional joy arises from within, independent of events — love radiating as compassion.',
    descriptionLt:
      'Iš vidaus kyla besąlygiškas džiaugsmas, nepriklausomas nuo įvykių — meilė, spinduliuojanti užuojauta.',
    emotionNote: 'A steady serenity beneath all passing weather.',
    emotionNoteLt: 'Tvari giedra po visais praeinančiais orais.',
    viewNote: 'Life feels complete; lack falls away.',
    viewNoteLt: 'Gyvenimas jaučiasi pilnas; stygius nubyra.',
    processNote: 'The world is transfigured, seen as sacred.',
    processNoteLt: 'Pasaulis persimaino, matomas kaip šventas.',
    ascend: 'Surrender the joy itself into boundless peace.',
    ascendLt: 'Atiduok patį džiaugsmą beribei ramybei.',
  },
  500: {
    description:
      'Love becomes a way of being, not an emotion — unconditional, forgiving, and seeing the good in all.',
    descriptionLt:
      'Meilė tampa būsena, o ne emocija — besąlygiška, atleidžianti, matanti gėrį visame kame.',
    emotionNote: 'Reverence for life and for one another.',
    emotionNoteLt: 'Pagarba gyvenimui ir vieni kitiems.',
    viewNote: 'Existence is felt as fundamentally benign.',
    viewNoteLt: 'Būtis jaučiama iš esmės geranoriška.',
    processNote: 'The heart reveals what the mind cannot prove.',
    processNoteLt: 'Širdis atskleidžia tai, ko protas neįrodo.',
    ascend: 'Let love grow unconditional, free of all preference.',
    ascendLt: 'Leisk meilei tapti besąlygiškai, be jokio išskyrimo.',
  },
  400: {
    description:
      'The mind masters logic and abstraction; understanding and meaning organise a coherent world.',
    descriptionLt:
      'Protas įvaldo logiką ir abstrakciją; supratimas ir prasmė sutvarko darnų pasaulį.',
    emotionNote: 'The quiet satisfaction of comprehension.',
    emotionNoteLt: 'Tylus pasitenkinimas supratus.',
    viewNote: 'The world appears meaningful and intelligible.',
    viewNoteLt: 'Pasaulis atrodo prasmingas ir suprantamas.',
    processNote: 'Symbols and ideas distil raw experience.',
    processNoteLt: 'Simboliai ir idėjos perfiltruoja gryną patyrimą.',
    ascend: 'Step beyond the mind: let the heart lead reason.',
    ascendLt: 'Peženk protą: leisk širdžiai vesti protą.',
  },
  350: {
    description:
      'Responsibility is owned; life is taken as it is, and forgiveness replaces blame.',
    descriptionLt:
      'Atsakomybė priimama; gyvenimas imamas toks, koks yra, o atleidimas pakeičia kaltinimą.',
    emotionNote: 'Forgiveness that frees both self and others.',
    emotionNoteLt: 'Atleidimas, išlaisvinantis ir save, ir kitus.',
    viewNote: 'Circumstances are seen as workable, harmonious.',
    viewNoteLt: 'Aplinkybės matomos įveikiamos, darnios.',
    processNote: 'Transcending the need to control outcomes.',
    processNoteLt: 'Peržengiamas poreikis valdyti pasekmes.',
    ascend: 'Move from accepting life to actively loving it.',
    ascendLt: 'Nuo gyvenimo priėmimo pereik prie aktyvios meilės jam.',
  },
  310: {
    description:
      'Willingness opens the door: optimism and intention turn capability into real growth.',
    descriptionLt:
      'Pasiryžimas atveria duris: optimizmas ir ketinimas paverčia galimybes tikru augimu.',
    emotionNote: 'An optimism that says yes to life.',
    emotionNoteLt: 'Optimizmas, kuris sako gyvenimui „taip".',
    viewNote: 'The future looks hopeful and open.',
    viewNoteLt: 'Ateitis atrodo viltinga ir atvira.',
    processNote: 'Clear intention sets growth in motion.',
    processNoteLt: 'Aiškus ketinimas paleidžia augimą.',
    ascend: 'Release agendas; trust life as it is.',
    ascendLt: 'Paleisk planus; pasitikėk gyvenimu tokiu, koks yra.',
  },
  250: {
    description:
      'A balanced neutrality settles in; outcomes no longer threaten, and trust replaces resistance.',
    descriptionLt:
      'Įsivyrauja pusiausvyra ir neutralumas; pasekmės nebegąsdina, pasitikėjimas pakeičia priešinimąsi.',
    emotionNote: 'Trust that things will be alright.',
    emotionNoteLt: 'Pasitikėjimas, kad viskas bus gerai.',
    viewNote: 'Life feels satisfactory, free of pressure.',
    viewNoteLt: 'Gyvenimas jaučiasi patenkinamas, be spaudimo.',
    processNote: 'Releasing the grip on how things must be.',
    processNoteLt: 'Paleidžiamas įsikibimas, kaip turi būti.',
    ascend: 'Add willingness: lean in and say yes.',
    ascendLt: 'Pridėk pasiryžimo: pasilenk pirmyn ir sakyk „taip".',
  },
  200: {
    description:
      'The pivotal threshold: force becomes power. Courage makes life feel feasible and worth engaging.',
    descriptionLt:
      'Lemiamas slenkstis: jėga tampa galia. Drąsa daro gyvenimą įveikiamą ir vertą įsitraukti.',
    emotionNote: 'A quiet inner yes — affirmation of life.',
    emotionNoteLt: 'Tylus vidinis „taip" — gyvenimo patvirtinimas.',
    viewNote: 'Challenges look feasible, not overwhelming.',
    viewNoteLt: 'Iššūkiai atrodo įveikiami, ne slegiantys.',
    processNote: 'Reclaiming one’s own power to act.',
    processNoteLt: 'Susigrąžinama sava galia veikti.',
    ascend: 'Soften effort into trust and neutrality.',
    ascendLt: 'Sušvelnink pastangą į pasitikėjimą ir neutralumą.',
  },
  175: {
    description:
      'Pride feels better than the lower levels, but depends on conditions and defends itself through scorn.',
    descriptionLt:
      'Puikybė jaučiasi geriau nei žemesni lygiai, bet priklauso nuo sąlygų ir gina save panieka.',
    emotionNote: 'Scorn that protects a fragile self-image.',
    emotionNoteLt: 'Panieka, sauganti trapų savęs įvaizdį.',
    viewNote: 'The world is seen as demanding, to be met.',
    viewNoteLt: 'Pasaulis matomas reiklus, kurį reikia įveikti.',
    processNote: 'Inflation: the ego puffs itself up.',
    processNoteLt: 'Išpūtimas: ego pučia save.',
    ascend: 'Risk humility and the courage to simply try.',
    ascendLt: 'Rizikuok nuolankumu ir drąsa tiesiog pabandyti.',
  },
  150: {
    description:
      'Anger is energising compared to apathy — a force that can build or destroy depending on where it turns.',
    descriptionLt:
      'Pyktis, palyginti su apatija, energizuoja — jėga, kuri gali kurti arba griauti, priklausomai nuo krypties.',
    emotionNote: 'Hate that burns the one who holds it.',
    emotionNoteLt: 'Neapykanta, deginanti tą, kuris ją laiko.',
    viewNote: 'Others appear as rivals or enemies.',
    viewNoteLt: 'Kiti atrodo kaip varžovai ar priešai.',
    processNote: 'Aggression pushes against the world.',
    processNoteLt: 'Agresija stumia prieš pasaulį.',
    ascend: 'Channel the heat into courageous, useful action.',
    ascendLt: 'Nukreipk karštį į drąsų, naudingą veiksmą.',
  },
  125: {
    description:
      'Desire drives and motivates, yet binds: craving promises satisfaction that always recedes.',
    descriptionLt:
      'Geismas varo ir motyvuoja, bet pančioja: troškimas žada pasitenkinimą, kuris vis atsitraukia.',
    emotionNote: 'Craving that is never quite satisfied.',
    emotionNoteLt: 'Troškimas, kuris niekada iki galo nenuramintas.',
    viewNote: 'Life disappoints when wants go unmet.',
    viewNoteLt: 'Gyvenimas nuvilia, kai norai neišsipildo.',
    processNote: 'Enslavement to the next thing wanted.',
    processNoteLt: 'Pavergimas kito trokštamo dalyko.',
    ascend: 'Turn wanting into willing, energised action.',
    ascendLt: 'Paversk norėjimą energingu pasiryžimu veikti.',
  },
  100: {
    description:
      'Fear contracts life around threat; the world feels dangerous and the self withdraws to stay safe.',
    descriptionLt:
      'Baimė sutraukia gyvenimą apie grėsmę; pasaulis atrodo pavojingas, ir žmogus užsisklendžia, kad apsisaugotų.',
    emotionNote: 'Anxiety scanning for what might go wrong.',
    emotionNoteLt: 'Nerimas, vis ieškantis, kas gali nutikti blogai.',
    viewNote: 'The world appears frightening, full of danger.',
    viewNoteLt: 'Pasaulis atrodo bauginantis, pilnas pavojų.',
    processNote: 'Withdrawal — shrinking back from life.',
    processNoteLt: 'Užsisklendimas — traukimasis nuo gyvenimo.',
    ascend: 'Let wanting and reaching pull you forward.',
    ascendLt: 'Leisk norui ir siekiui patraukti tave pirmyn.',
  },
  75: {
    description:
      'Grief is the weight of loss; sadness colours the world, yet it can soften the heart toward release.',
    descriptionLt:
      'Liūdesys — netekties svoris; jis nuspalvina pasaulį, bet gali ir suminkštinti širdį paleidimui.',
    emotionNote: 'Regret for what is lost or undone.',
    emotionNoteLt: 'Gailestis dėl to, kas prarasta ar nepadaryta.',
    viewNote: 'Life looks tragic, heavy with sorrow.',
    viewNoteLt: 'Gyvenimas atrodo tragiškas, sunkus nuo sielvarto.',
    processNote: 'Despondency: energy sinks inward.',
    processNoteLt: 'Nusiminimas: energija sminga į vidų.',
    ascend: 'Let even fear stir you back toward life.',
    ascendLt: 'Leisk net baimei pažadinti tave atgal į gyvenimą.',
  },
  50: {
    description:
      'Apathy is hopeless heaviness — the energy to care or act feels gone, and life is merely endured.',
    descriptionLt:
      'Apatija — beviltiškas sunkumas; energijos rūpintis ar veikti tarsi nebėra, gyvenimas tik kenčiamas.',
    emotionNote: 'Despair that nothing can change.',
    emotionNoteLt: 'Neviltis, kad niekas negali pasikeisti.',
    viewNote: 'Existence feels hopeless and flat.',
    viewNoteLt: 'Būtis jaučiasi beviltiška ir pilka.',
    processNote: 'Abdication — giving up one’s power.',
    processNoteLt: 'Atsisakymas — savos galios atidavimas.',
    ascend: 'Allow grief to move the frozen energy.',
    ascendLt: 'Leisk liūdesiui pajudinti sustingusią energiją.',
  },
  30: {
    description:
      'Guilt turns judgment inward; self-condemnation can become a quiet self-destruction.',
    descriptionLt:
      'Kaltė nukreipia teismą į vidų; savęs smerkimas gali tapti tyliu savęs naikinimu.',
    emotionNote: 'Blame aimed at oneself.',
    emotionNoteLt: 'Kaltinimas, nukreiptas į save.',
    viewNote: 'The world feels condemning, accusing.',
    viewNoteLt: 'Pasaulis jaučiasi smerkiantis, kaltinantis.',
    processNote: 'Destruction turned against the self.',
    processNoteLt: 'Naikinimas, nukreiptas prieš save.',
    ascend: 'Let numb apathy give way to honest feeling.',
    ascendLt: 'Leisk apatijai užleisti vietą nuoširdžiam jausmui.',
  },
  20: {
    description:
      'Shame is the densest state — close to non-existence, the self feels unworthy of life itself.',
    descriptionLt:
      'Gėda — tankiausia būsena, artima nebūčiai; žmogus jaučiasi nevertas paties gyvenimo.',
    emotionNote: 'Humiliation that wishes to disappear.',
    emotionNoteLt: 'Pažeminimas, norintis išnykti.',
    viewNote: 'Life appears miserable and unbearable.',
    viewNoteLt: 'Gyvenimas atrodo apgailėtinas ir nepakeliamas.',
    processNote: 'Elimination — the pull toward erasure.',
    processNoteLt: 'Pašalinimas — trauka į išnykimą.',
    ascend: 'One step up: let blame become guilt, then feeling.',
    ascendLt: 'Vienas žingsnis aukštyn: leisk kaltei virsti jausmu.',
  },
}

export interface ChakraDepth {
  sanskrit: string
  mantra: string
  mantraLt: string
  /** Seed (bija) sound. */
  bija: string
  element: string
  elementLt: string
  gland: string
  glandLt: string
  location: string
  locationLt: string
}

export const CHAKRA_DEPTH: Record<string, ChakraDepth> = {
  survival: {
    sanskrit: 'Muladhara',
    mantra: 'I am',
    mantraLt: 'Aš esu',
    bija: 'LAM',
    element: 'Earth',
    elementLt: 'Žemė',
    gland: 'Adrenals',
    glandLt: 'Antinksčiai',
    location: 'Base of the spine',
    locationLt: 'Stuburo apačia',
  },
  desire: {
    sanskrit: 'Svadhisthana',
    mantra: 'I feel',
    mantraLt: 'Aš jaučiu',
    bija: 'VAM',
    element: 'Water',
    elementLt: 'Vanduo',
    gland: 'Gonads',
    glandLt: 'Lytinės liaukos',
    location: 'Lower abdomen',
    locationLt: 'Apatinis pilvas',
  },
  power: {
    sanskrit: 'Manipura',
    mantra: 'I do',
    mantraLt: 'Aš darau',
    bija: 'RAM',
    element: 'Fire',
    elementLt: 'Ugnis',
    gland: 'Pancreas',
    glandLt: 'Kasa',
    location: 'Solar plexus / navel',
    locationLt: 'Saulės rezginys / bamba',
  },
  heart: {
    sanskrit: 'Anahata',
    mantra: 'I love',
    mantraLt: 'Aš myliu',
    bija: 'YAM',
    element: 'Air',
    elementLt: 'Oras',
    gland: 'Thymus',
    glandLt: 'Užkrūčio liauka',
    location: 'Center of the chest',
    locationLt: 'Krūtinės centras',
  },
  truth: {
    sanskrit: 'Vishuddha',
    mantra: 'I speak',
    mantraLt: 'Aš kalbu',
    bija: 'HAM',
    element: 'Ether / Sound',
    elementLt: 'Eteris / Garsas',
    gland: 'Thyroid',
    glandLt: 'Skydliaukė',
    location: 'Throat',
    locationLt: 'Gerklė',
  },
  insight: {
    sanskrit: 'Ajna',
    mantra: 'I see',
    mantraLt: 'Aš matau',
    bija: 'OM',
    element: 'Light',
    elementLt: 'Šviesa',
    gland: 'Pineal',
    glandLt: 'Kankorėžinė liauka',
    location: 'Brow / third eye',
    locationLt: 'Antakių centras / trečioji akis',
  },
  unity: {
    sanskrit: 'Sahasrara',
    mantra: 'I understand',
    mantraLt: 'Aš suprantu',
    bija: 'Silence (AH)',
    element: 'Thought / Cosmos',
    elementLt: 'Mintis / Kosmosas',
    gland: 'Pituitary',
    glandLt: 'Hipofizė',
    location: 'Crown of the head',
    locationLt: 'Galvos viršus',
  },
}
