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
