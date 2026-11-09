/**
 * The everyday doorway into the Vibration Map.
 *
 * Before chakras, Hawkins levels or Solfeggio tones mean anything, raising
 * one's vibration starts in ordinary life: in how we think about ourselves
 * and others. Thoughts become words, words become actions, actions become
 * habits, habits become a way of life, and a way of life becomes destiny.
 *
 * Alongside that chain sit four stances of consciousness — life happening
 * "to me", "by me", "through me" and "as me" — which describe from which
 * position a person meets each day.
 *
 * Dual-locale convention as in `lib/vibration.ts`: `xxx` (EN) and `xxxLt`.
 */

export interface ContrastPair {
  low: string
  lowLt: string
  high: string
  highLt: string
}

export interface PathStep {
  id: string
  label: string
  labelLt: string
  /** What this link in the chain is and why it vibrates. */
  text: string
  textLt: string
  /** Everyday examples: denser vs. lighter expression. */
  pairs: ContrastPair[]
  /** One small practice to try today. */
  practice: string
  practiceLt: string
  color: string
}

export const PATH_STEPS: PathStep[] = [
  {
    id: 'thoughts',
    label: 'Thoughts',
    labelLt: 'Mintys',
    text:
      'Everything begins here. Every thought carries a quality — heavy or light, contracting or expanding. Notice how you think about yourself, about other people and about life: the inner voice you listen to all day long sets the tone of everything that follows.',
    textLt:
      'Viskas prasideda čia. Kiekviena mintis turi savo kokybę — sunki ar lengva, sutraukianti ar plečianti. Pastebėk, kaip galvoji apie save, apie kitus žmones ir apie gyvenimą: vidinis balsas, kurio klausaisi visą dieną, nustato toną viskam, kas seka toliau.',
    pairs: [
      {
        low: 'About myself: “I’m not good enough, I always fail.”',
        lowLt: 'Apie save: „Aš nevykėlis, man niekada nesiseka.“',
        high: 'About myself: “I’m learning. Every day I grow a little.”',
        highLt: 'Apie save: „Aš mokausi. Kiekvieną dieną šiek tiek augu.“',
      },
      {
        low: 'About others: “People only want to use me.”',
        lowLt: 'Apie kitus: „Žmonės tik nori mane išnaudoti.“',
        high: 'About others: “Everyone is doing their best with what they know.”',
        highLt: 'Apie kitus: „Kiekvienas daro, ką gali, pagal tai, ką žino.“',
      },
      {
        low: 'About life: “Why does this always happen to me?”',
        lowLt: 'Apie gyvenimą: „Kodėl man visada taip nutinka?“',
        high: 'About life: “What is this teaching me?”',
        highLt: 'Apie gyvenimą: „Ko tai mane moko?“',
      },
    ],
    practice:
      'Three times today, stop and ask: “What am I thinking right now — and does this thought lift me or weigh me down?” Don’t fight the thought, just notice it and choose a kinder version.',
    practiceLt:
      'Šiandien tris kartus sustok ir paklausk: „Ką aš dabar galvoju — ir ar ši mintis mane kelia, ar slegia?“ Nekovok su mintimi, tik pastebėk ją ir pasirink švelnesnį variantą.',
    color: '#8e44ad',
  },
  {
    id: 'words',
    label: 'Words',
    labelLt: 'Žodžiai',
    text:
      'A thought spoken aloud becomes sound — and sound vibrates. The words we use about ourselves and others shape how we feel and how people respond to us. Complaining, gossip and harsh labels keep energy low; gratitude, honesty and encouragement raise it.',
    textLt:
      'Ištarta mintis tampa garsu — o garsas vibruoja. Žodžiai, kuriais kalbame apie save ir kitus, formuoja tai, kaip jaučiamės ir kaip žmonės į mus atsiliepia. Skundai, apkalbos ir šiurkščios etiketės laiko energiją žemai; dėkingumas, nuoširdumas ir padrąsinimas ją kelia.',
    pairs: [
      {
        low: '“I have to go to work again.”',
        lowLt: '„Vėl reikia eiti į darbą.“',
        high: '“I get to create something today.”',
        highLt: '„Šiandien galiu kažką sukurti.“',
      },
      {
        low: 'Gossip and judging someone behind their back.',
        lowLt: 'Apkalbos ir kito teisimas už akių.',
        high: 'Saying out loud what you appreciate in someone.',
        highLt: 'Garsiai pasakyti, ką vertini kitame žmoguje.',
      },
    ],
    practice:
      'For one day, don’t complain out loud. Each time you catch a complaint, rephrase it as a wish: not “it’s cold again” but “I’d love some warmth”.',
    practiceLt:
      'Vieną dieną nesiskųsk garsiai. Kai tik pagauni skundą, perfrazuok jį į norą: ne „vėl šalta“, o „norėčiau šilumos“.',
    color: '#2980b9',
  },
  {
    id: 'actions',
    label: 'Actions',
    labelLt: 'Veiksmai',
    text:
      'What we say, we sooner or later do. Actions carry even more energy than words because the whole body takes part — and they leave a trace in the world and in other people. Actions taken from fear, anger or haste lower the vibration; actions taken with care and presence raise it.',
    textLt:
      'Ką sakome, anksčiau ar vėliau ir darome. Veiksmai neša dar daugiau energijos nei žodžiai, nes juose dalyvauja visas kūnas — ir jie palieka pėdsaką pasaulyje bei kituose žmonėse. Veiksmai iš baimės, pykčio ar skubos vibraciją žemina; veiksmai su rūpesčiu ir sąmoningumu — kelia.',
    pairs: [
      {
        low: 'Eating in a rush, scrolling the phone.',
        lowLt: 'Valgyti skubant, slenkant telefoną.',
        high: 'Eating slowly, tasting, with gratitude.',
        highLt: 'Valgyti lėtai, jaučiant skonį, su dėkingumu.',
      },
      {
        low: 'Reacting instantly when hurt.',
        lowLt: 'Įsižeidus reaguoti akimirksniu.',
        high: 'Taking three breaths before responding.',
        highLt: 'Prieš atsakant įkvėpti tris kartus.',
      },
    ],
    practice:
      'Do one ordinary thing today completely consciously — washing dishes, walking, making tea — with full attention, as if it were a meditation.',
    practiceLt:
      'Šiandien vieną paprastą darbą atlik visiškai sąmoningai — indų plovimą, ėjimą, arbatos ruošimą — su visu dėmesiu, lyg tai būtų meditacija.',
    color: '#27ae60',
  },
  {
    id: 'habits',
    label: 'Habits',
    labelLt: 'Įpročiai',
    text:
      'An action repeated becomes a habit — and a habit works on its own, without us choosing. That is why habits are where vibration is either quietly lifted or quietly drained, every single day. You don’t need to change everything: one small, steady habit is stronger than a big promise.',
    textLt:
      'Pakartotas veiksmas tampa įpročiu — o įprotis veikia savaime, mums nesirenkant. Todėl būtent įpročiuose vibracija kasdien tyliai kyla arba tyliai senka. Nereikia keisti visko: vienas mažas, pastovus įprotis stipresnis už didelį pažadą.',
    pairs: [
      {
        low: 'Starting the day with news and the phone.',
        lowLt: 'Diena prasideda naujienomis ir telefonu.',
        high: 'Starting the day with a few minutes of silence and breath.',
        highLt: 'Diena prasideda keliomis minutėmis tylos ir kvėpavimo.',
      },
      {
        low: 'Falling asleep replaying the day’s worries.',
        lowLt: 'Užmigti persukinėjant dienos rūpesčius.',
        high: 'Falling asleep naming three things you are grateful for.',
        highLt: 'Užmigti įvardijant tris dalykus, už kuriuos dėkingas.',
      },
    ],
    practice:
      'Choose one tiny habit (2–5 minutes) and attach it to something you already do: after brushing your teeth — five calm breaths. Keep it for 21 days.',
    practiceLt:
      'Pasirink vieną mažytį įprotį (2–5 minutės) ir susiek jį su tuo, ką jau darai: išsivalius dantis — penki ramūs įkvėpimai. Laikykis jo 21 dieną.',
    color: '#e0a020',
  },
  {
    id: 'lifestyle',
    label: 'Way of life',
    labelLt: 'Gyvenimo būdas',
    text:
      'Habits woven together become a way of life: what you eat, who you spend time with, how you rest, how you work, what you let into your mind. A way of life is the everyday “frequency” you live on — the environment your thoughts are born in.',
    textLt:
      'Susipynę įpročiai tampa gyvenimo būdu: ką valgai, su kuo leidi laiką, kaip ilsiesi, kaip dirbi, ką įsileidi į savo protą. Gyvenimo būdas — tai kasdienis „dažnis“, kuriuo gyveni, ir aplinka, kurioje gimsta tavo mintys.',
    pairs: [
      {
        low: 'Living on autopilot, by others’ expectations.',
        lowLt: 'Gyventi autopilotu, pagal kitų lūkesčius.',
        high: 'Living by your own values, consciously choosing.',
        highLt: 'Gyventi pagal savo vertybes, sąmoningai renkantis.',
      },
      {
        low: 'Heavy food, little movement, no time in nature.',
        lowLt: 'Sunkus maistas, mažai judėjimo, jokio laiko gamtoje.',
        high: 'Living food, movement, regular time in nature.',
        highLt: 'Gyvas maistas, judėjimas, reguliarus laikas gamtoje.',
      },
    ],
    practice:
      'Write down your three most important values. Then look at last week: how much of your time actually served them? Choose one change for the coming week.',
    practiceLt:
      'Užsirašyk tris svarbiausias savo vertybes. Tada pažvelk į praėjusią savaitę: kiek tavo laiko iš tikrųjų joms tarnavo? Pasirink vieną pokytį ateinančiai savaitei.',
    color: '#e67e22',
  },
  {
    id: 'destiny',
    label: 'Destiny',
    labelLt: 'Likimas',
    text:
      'A way of life, lived for years, becomes destiny. Destiny is not a sentence handed down from above — it is the sum of countless small choices, and it begins again with every thought. That is the good news: you can always start from the first link.',
    textLt:
      'Gyvenimo būdas, gyventas metų metus, tampa likimu. Likimas — ne iš viršaus nuleistas nuosprendis, o daugybės mažų pasirinkimų suma, ir jis vėl prasideda su kiekviena mintimi. Tai ir yra gera žinia: visada gali pradėti nuo pirmosios grandies.',
    pairs: [
      {
        low: '“That’s just how my life is, nothing can change.”',
        lowLt: '„Toks jau mano likimas, nieko nepakeisi.“',
        high: '“My life is shaped by what I choose today.”',
        highLt: '„Mano gyvenimą kuria tai, ką renkuosi šiandien.“',
      },
    ],
    practice:
      'Imagine yourself in five years if nothing changes. Then imagine yourself if you raise the quality of your thoughts by just a little every day. Which thought today leads towards the second picture?',
    practiceLt:
      'Įsivaizduok save po penkerių metų, jei niekas nepasikeis. Tada įsivaizduok save, jei kasdien bent truputį pakelsi savo minčių kokybę. Kuri šiandienos mintis veda link antrojo paveikslo?',
    color: '#c0392b',
  },
]

/**
 * Four stances of consciousness — from which position life is met.
 * Popularised by Michael Bernard Beckwith ("to me, by me, through me, as me").
 */
export interface Stance {
  id: string
  /** Short name of the stance, e.g. "To me". */
  name: string
  nameLt: string
  /** Role this stance plays. */
  role: string
  roleLt: string
  /** A typical inner sentence. */
  voice: string
  voiceLt: string
  text: string
  textLt: string
  /** Step towards the next stance. */
  shift: string
  shiftLt: string
  /** Approximate Hawkins band where this stance usually lives. */
  hawkins: string
  color: string
}

export const STANCES: Stance[] = [
  {
    id: 'to-me',
    name: 'Life happens TO me',
    nameLt: 'Gyvenimas vyksta MAN',
    role: 'Victim',
    roleLt: 'Auka',
    voice: '“Why is this happening to me? It’s their fault.”',
    voiceLt: '„Kodėl man taip nutinka? Kalti kiti.“',
    text:
      'Circumstances, other people and the past seem to decide everything. Energy goes into blame, complaint and fear. Almost everyone starts here — there is no shame in it, only an invitation.',
    textLt:
      'Atrodo, kad viską lemia aplinkybės, kiti žmonės ir praeitis. Energija išeina kaltinimams, skundams ir baimei. Beveik visi pradeda nuo čia — tai ne gėda, o kvietimas.',
    shift: 'Ask: “What part of this is mine to choose?”',
    shiftLt: 'Paklausk: „Kokią šito dalį galiu pasirinkti aš?“',
    hawkins: '< 200',
    color: '#c0392b',
  },
  {
    id: 'by-me',
    name: 'Life happens BY me',
    nameLt: 'Gyvenimas vyksta DĖL MANĘS',
    role: 'Creator',
    roleLt: 'Kūrėjas',
    voice: '“I take responsibility. I create my life.”',
    voiceLt: '„Aš prisiimu atsakomybę. Aš kuriu savo gyvenimą.“',
    text:
      'You discover that your thoughts, words and choices shape your reality. Courage and willpower awaken — goals, intentions, visualisation. The ego still wants to control the outcome.',
    textLt:
      'Atrandi, kad tavo mintys, žodžiai ir pasirinkimai kuria tavo tikrovę. Pabunda drąsa ir valia — tikslai, ketinimai, vizualizacija. Ego vis dar nori kontroliuoti rezultatą.',
    shift: 'Ask: “What wants to come through me — beyond what I want?”',
    shiftLt: 'Paklausk: „Kas nori ateiti per mane — daugiau nei tai, ko noriu aš?“',
    hawkins: '200–400',
    color: '#e0a020',
  },
  {
    id: 'through-me',
    name: 'Life happens THROUGH me',
    nameLt: 'Gyvenimas vyksta PER MANE',
    role: 'Channel',
    roleLt: 'Kanalas',
    voice: '“How can I serve? Let it be done through me.”',
    voiceLt: '„Kaip galiu tarnauti? Tegul tai vyksta per mane.“',
    text:
      'Control softens into trust. You listen to intuition, act from love and feel that something greater moves through you — in work, in relationships, in creativity.',
    textLt:
      'Kontrolė virsta pasitikėjimu. Klausaisi intuicijos, veiki iš meilės ir jauti, kad per tave juda kažkas didesnio — darbe, santykiuose, kūryboje.',
    shift: 'Rest in silence and simply notice the one who is aware.',
    shiftLt: 'Pabūk tyloje ir tiesiog pastebėk tą, kuris suvokia.',
    hawkins: '400–540',
    color: '#27ae60',
  },
  {
    id: 'as-me',
    name: 'Life happens AS me',
    nameLt: 'Gyvenimas vyksta KAIP AŠ',
    role: 'Oneness',
    roleLt: 'Vienovė',
    voice: '“I am life itself. There is no separation.”',
    voiceLt: '„Aš esu pats gyvenimas. Atskirties nėra.“',
    text:
      'The boundary between “me” and “the world” dissolves. Joy and peace no longer depend on circumstances. These are moments of grace — rarely a permanent address, but a direction.',
    textLt:
      'Riba tarp „manęs“ ir „pasaulio“ ištirpsta. Džiaugsmas ir ramybė nebepriklauso nuo aplinkybių. Tai malonės akimirkos — retai nuolatinis adresas, bet kryptis.',
    shift: 'Simply be. And return to everyday life with this peace.',
    shiftLt: 'Tiesiog būk. Ir sugrįžk su šia ramybe į kasdienybę.',
    hawkins: '540+',
    color: '#8e44ad',
  },
]
