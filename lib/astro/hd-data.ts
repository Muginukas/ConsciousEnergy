import type { Bi } from '../zodiac'
import type { CenterId, HdAuthority, HdDefinition, HdType } from './humandesign'

export interface TypeInfo {
  name: Bi
  share: string
  strategy: Bi
  signature: Bi
  notSelf: Bi
  aura: Bi
  description: Bi
}

export const HD_TYPES: Record<HdType, TypeInfo> = {
  manifestor: {
    name: { en: 'Manifestor', lt: 'Manifestorius' },
    share: '~9%',
    strategy: { en: 'Inform before you act', lt: 'Informuok prieš veikdamas' },
    signature: { en: 'Peace', lt: 'Ramybė' },
    notSelf: { en: 'Anger', lt: 'Pyktis' },
    aura: { en: 'Closed and repelling — creates space to initiate', lt: 'Uždara ir atstumianti — sukuria erdvę inicijuoti' },
    description: {
      en: 'Manifestors are the initiators. A motor is connected to the Throat, so you can act on your own impulse without waiting for anything outside. Your impact on others is strong, and they often feel it before they understand it. Informing the people affected by your actions removes resistance and brings you peace.',
      lt: 'Manifestoriai — iniciatoriai. Variklio centras sujungtas su Gerkle, todėl galite veikti savo impulsu, nelaukdami nieko iš išorės. Jūsų poveikis kitiems stiprus — jie dažnai jį pajunta anksčiau, nei supranta. Informuodami tuos, kuriuos paveiks jūsų veiksmai, pašalinate pasipriešinimą ir atrandate ramybę.',
    },
  },
  generator: {
    name: { en: 'Generator', lt: 'Generatorius' },
    share: '~37%',
    strategy: { en: 'Wait to respond', lt: 'Lauk ir atsiliepk' },
    signature: { en: 'Satisfaction', lt: 'Pasitenkinimas' },
    notSelf: { en: 'Frustration', lt: 'Frustracija' },
    aura: { en: 'Open and enveloping — draws life to you', lt: 'Atvira ir apgaubianti — pritraukia gyvenimą' },
    description: {
      en: 'Generators are the life force of the planet. Your defined Sacral center is a renewable source of energy for work you love. Instead of initiating from the mind, let life bring things to you and listen to your gut response — the “uh-huh” or “uhn-uhn”. Doing what lights you up leads to deep satisfaction and mastery.',
      lt: 'Generatoriai — planetos gyvybinė jėga. Jūsų apibrėžtas Sakralinis centras yra atsinaujinantis energijos šaltinis darbui, kurį mylite. Užuot inicijavę iš proto, leiskite gyvenimui atnešti galimybes ir klausykite pilvo atsako — „ahą“ arba „ne-a“. Darydami tai, kas jus uždega, pasiekiate gilų pasitenkinimą ir meistrystę.',
    },
  },
  manifestingGenerator: {
    name: { en: 'Manifesting Generator', lt: 'Manifestuojantis generatorius' },
    share: '~33%',
    strategy: { en: 'Wait to respond, then inform', lt: 'Lauk ir atsiliepk, tada informuok' },
    signature: { en: 'Satisfaction and peace', lt: 'Pasitenkinimas ir ramybė' },
    notSelf: { en: 'Frustration and anger', lt: 'Frustracija ir pyktis' },
    aura: { en: 'Open and enveloping', lt: 'Atvira ir apgaubianti' },
    description: {
      en: 'Manifesting Generators combine Sacral life force with a motor-to-Throat connection. You are fast, multi-passionate and efficient — able to skip steps others need. Respond first with your gut, then inform others before you move. Changing direction is natural for you; it is how you find the shortest path.',
      lt: 'Manifestuojantys generatoriai jungia Sakralinę gyvybinę jėgą su variklio ir Gerklės ryšiu. Esate greiti, turite daug aistrų ir esate efektyvūs — galite praleisti žingsnius, kurių reikia kitiems. Pirmiausia atsiliepkite pilvu, tada informuokite kitus prieš judėdami. Krypties keitimas jums natūralus — taip randate trumpiausią kelią.',
    },
  },
  projector: {
    name: { en: 'Projector', lt: 'Projektorius' },
    share: '~20%',
    strategy: { en: 'Wait for the invitation', lt: 'Lauk kvietimo' },
    signature: { en: 'Success', lt: 'Sėkmė' },
    notSelf: { en: 'Bitterness', lt: 'Kartėlis' },
    aura: { en: 'Focused and absorbing — sees deeply into others', lt: 'Fokusuota ir įsigilinanti — mato kitus giliai' },
    description: {
      en: 'Projectors are the guides of the new era. You are not designed for sustained labour, but for seeing, directing and managing energy — especially of others. Your gift is recognised when you are invited into the big things in life: work, love, home. Rest well, study systems, and wait to be recognised.',
      lt: 'Projektoriai — naujos eros gidai. Esate sukurti ne nuolatiniam darbui, o matyti, nukreipti ir valdyti energiją — ypač kitų žmonių. Jūsų dovana atpažįstama, kai esate pakviesti į didžiuosius gyvenimo dalykus: darbą, meilę, namus. Gerai ilsėkitės, studijuokite sistemas ir laukite pripažinimo.',
    },
  },
  reflector: {
    name: { en: 'Reflector', lt: 'Reflektorius' },
    share: '~1%',
    strategy: { en: 'Wait a lunar cycle (~28 days) for big decisions', lt: 'Svarbiems sprendimams lauk Mėnulio ciklo (~28 d.)' },
    signature: { en: 'Surprise', lt: 'Nuostaba' },
    notSelf: { en: 'Disappointment', lt: 'Nusivylimas' },
    aura: { en: 'Resistant and sampling — mirrors the environment', lt: 'Atspari ir „ragaujanti“ — atspindi aplinką' },
    description: {
      en: 'Reflectors have no defined centers — you are a mirror of your community and environment. You sample everyone’s energy without being fixed by it, which makes you a wise barometer of collective health. Your environment is everything; the right place and people allow you to be surprised by life.',
      lt: 'Reflektoriai neturi apibrėžtų centrų — esate savo bendruomenės ir aplinkos veidrodis. „Ragaujate“ visų energiją, jos nepririšami, todėl esate išmintingas kolektyvinės sveikatos barometras. Aplinka jums — viskas; tinkama vieta ir žmonės leidžia gyvenimui jus maloniai nustebinti.',
    },
  },
}

export const HD_AUTHORITIES: Record<HdAuthority, { name: Bi; description: Bi }> = {
  emotional: {
    name: { en: 'Emotional (Solar Plexus)', lt: 'Emocinis (Saulės rezginys)' },
    description: {
      en: 'There is no truth in the now. Your emotions move in a wave from hope to pain; clarity comes with time. Never decide at the peak or the bottom of the wave — sleep on it and let clarity emerge.',
      lt: 'Tiesos „dabar“ nėra. Jūsų emocijos juda banga nuo vilties iki skausmo; aiškumas ateina su laiku. Niekada nespręskite bangos viršūnėje ar dugne — permiegokite ir leiskite aiškumui atsirasti.',
    },
  },
  sacral: {
    name: { en: 'Sacral', lt: 'Sakralinis' },
    description: {
      en: 'Your gut knows in the moment. Listen to the body’s immediate sounds and sensations — an expanding “yes” or contracting “no” — when life asks you a question.',
      lt: 'Jūsų pilvas žino akimirksniu. Klausykite kūno garsų ir pojūčių — plečiančio „taip“ ar susitraukiančio „ne“ — kai gyvenimas jums užduoda klausimą.',
    },
  },
  splenic: {
    name: { en: 'Splenic', lt: 'Blužnies' },
    description: {
      en: 'A quiet, instantaneous intuition that speaks only once. It is about survival and wellbeing in the now — trust the first subtle knowing before the mind argues.',
      lt: 'Tyli, akimirksnio intuicija, kuri prabyla tik kartą. Ji rūpinasi išlikimu ir gerove dabar — pasitikėkite pirmuoju subtiliu žinojimu, kol protas nepradėjo ginčytis.',
    },
  },
  egoManifested: {
    name: { en: 'Ego Manifested', lt: 'Ego manifestuotas' },
    description: {
      en: 'Your willpower speaks directly through your voice. Listen to what you say you want: “What do I want? What’s in it for me?” — commitments made from the heart are correct.',
      lt: 'Jūsų valia kalba tiesiai per balsą. Įsiklausykite, ką sakote, kad norite: „Ko aš noriu? Ką aš iš to gausiu?“ — iš širdies priimti įsipareigojimai yra teisingi.',
    },
  },
  egoProjected: {
    name: { en: 'Ego Projected', lt: 'Ego projektuotas' },
    description: {
      en: 'Speak out loud to trusted others and hear whether your heart truly wants it. Your willpower is real, but must be invited and recognised.',
      lt: 'Kalbėkite garsiai patikimiems žmonėms ir išgirskite, ar širdis tikrai to nori. Jūsų valia tikra, bet ji turi būti pakviesta ir pripažinta.',
    },
  },
  selfProjected: {
    name: { en: 'Self-Projected (G center)', lt: 'Savęs projekcija (G centras)' },
    description: {
      en: 'Truth comes through your own voice. Talk things through with people you trust — not for advice, but to hear your identity and direction in what you say.',
      lt: 'Tiesa ateina per jūsų balsą. Aptarkite dalykus su patikimais žmonėmis — ne dėl patarimo, o kad išgirstumėte savo tapatybę ir kryptį tame, ką sakote.',
    },
  },
  mental: {
    name: { en: 'Mental / Environmental (no inner authority)', lt: 'Mentalinis / aplinkos (be vidinio autoriteto)' },
    description: {
      en: 'Your clarity comes from the right environment and sounding boards. Discuss decisions in different places with people you trust, and notice how each place feels.',
      lt: 'Jūsų aiškumas ateina iš tinkamos aplinkos ir pokalbių. Aptarkite sprendimus skirtingose vietose su patikimais žmonėmis ir stebėkite, kaip jaučiatės kiekvienoje vietoje.',
    },
  },
  lunar: {
    name: { en: 'Lunar', lt: 'Mėnulio' },
    description: {
      en: 'Let the Moon move through all 64 gates (about 28 days) before major decisions. Talk to many people over the cycle and notice what stays consistent.',
      lt: 'Prieš svarbius sprendimus leiskite Mėnuliui pereiti visus 64 vartus (apie 28 dienas). Per ciklą kalbėkitės su daugeliu žmonių ir stebėkite, kas išlieka pastovu.',
    },
  },
}

export const HD_DEFINITIONS: Record<HdDefinition, { name: Bi; description: Bi }> = {
  none: {
    name: { en: 'No definition', lt: 'Be apibrėžimo' },
    description: { en: 'Completely open — you experience everyone’s definition.', lt: 'Visiškai atviras — patiriate visų kitų apibrėžimą.' },
  },
  single: {
    name: { en: 'Single definition', lt: 'Vientisas apibrėžimas' },
    description: { en: 'All defined centers form one connected circuit. You process life self-sufficiently and in your own time.', lt: 'Visi apibrėžti centrai sujungti į vieną grandinę. Gyvenimą apdorojate savarankiškai ir savo tempu.' },
  },
  split: {
    name: { en: 'Split definition', lt: 'Dvigubas (skeltas) apibrėžimas' },
    description: { en: 'Two separate areas of definition. Others who bridge your split feel completing; take time and let connections happen naturally.', lt: 'Dvi atskiros apibrėžimo sritys. Žmonės, „sujungiantys“ jūsų tarpą, jaučiasi papildantys; neskubėkite ir leiskite ryšiams atsirasti natūraliai.' },
  },
  tripleSplit: {
    name: { en: 'Triple split', lt: 'Trigubas skilimas' },
    description: { en: 'Three separate areas. You benefit from moving through many different people and places — public spaces help you process.', lt: 'Trys atskiros sritys. Jums naudinga judėti tarp daugelio žmonių ir vietų — viešos erdvės padeda apdoroti patirtis.' },
  },
  quadrupleSplit: {
    name: { en: 'Quadruple split', lt: 'Keturgubas skilimas' },
    description: { en: 'Four separate areas — very rare. Fixed and stable once settled; give yourself plenty of time.', lt: 'Keturios atskiros sritys — labai reta. Nusistovėjus — tvirtas ir stabilus; skirkite sau daug laiko.' },
  },
}

export const HD_CENTERS: Record<CenterId, { name: Bi; theme: Bi; defined: Bi; open: Bi }> = {
  head: {
    name: { en: 'Head', lt: 'Galva' },
    theme: { en: 'Inspiration, mental pressure, questions', lt: 'Įkvėpimas, mentalinis spaudimas, klausimai' },
    defined: { en: 'A consistent way of being inspired and of generating questions.', lt: 'Pastovus būdas įsikvėpti ir kelti klausimus.' },
    open: { en: 'You amplify others’ inspiration. Not-self: trying to answer questions that don’t matter.', lt: 'Sustiprinate kitų įkvėpimą. Ne-aš: bandymas atsakyti į nesvarbius klausimus.' },
  },
  ajna: {
    name: { en: 'Ajna', lt: 'Adžna' },
    theme: { en: 'Conceptualising, opinions, mental certainty', lt: 'Konceptualizavimas, nuomonės, mentalinis tikrumas' },
    defined: { en: 'A fixed way of thinking and processing — reliable mental framework.', lt: 'Pastovus mąstymo ir apdorojimo būdas — patikimas mentalinis karkasas.' },
    open: { en: 'Flexible, open mind. Not-self: pretending to be certain.', lt: 'Lankstus, atviras protas. Ne-aš: apsimetinėjimas, kad esate tikras.' },
  },
  throat: {
    name: { en: 'Throat', lt: 'Gerklė' },
    theme: { en: 'Communication, manifestation, action', lt: 'Bendravimas, manifestacija, veiksmas' },
    defined: { en: 'A consistent voice and way of expressing yourself.', lt: 'Pastovus balsas ir saviraiškos būdas.' },
    open: { en: 'Versatile voice. Not-self: speaking to attract attention.', lt: 'Įvairiapusis balsas. Ne-aš: kalbėjimas dėl dėmesio.' },
  },
  g: {
    name: { en: 'G (Identity)', lt: 'G (tapatybė)' },
    theme: { en: 'Identity, love, direction', lt: 'Tapatybė, meilė, kryptis' },
    defined: { en: 'A fixed sense of self and direction in life.', lt: 'Pastovus savęs ir gyvenimo krypties jausmas.' },
    open: { en: 'Your identity flows with people and places. Not-self: searching for love and direction.', lt: 'Tapatybė kinta su žmonėmis ir vietomis. Ne-aš: meilės ir krypties ieškojimas.' },
  },
  heart: {
    name: { en: 'Heart / Ego', lt: 'Širdis / Ego' },
    theme: { en: 'Willpower, self-worth, promises', lt: 'Valia, savivertė, pažadai' },
    defined: { en: 'Consistent willpower — able to make and keep promises.', lt: 'Pastovi valia — galite duoti ir tesėti pažadus.' },
    open: { en: 'Nothing to prove. Not-self: trying to prove your worth.', lt: 'Nieko nereikia įrodinėti. Ne-aš: bandymas įrodyti savo vertę.' },
  },
  spleen: {
    name: { en: 'Spleen', lt: 'Blužnis' },
    theme: { en: 'Intuition, immunity, survival, wellbeing', lt: 'Intuicija, imunitetas, išlikimas, gerovė' },
    defined: { en: 'Steady intuition and a sense of wellbeing.', lt: 'Stabili intuicija ir gerovės pojūtis.' },
    open: { en: 'Sensitive to health and others’ fears. Not-self: holding on to what isn’t good for you.', lt: 'Jautrus sveikatai ir kitų baimėms. Ne-aš: laikymasis to, kas jums nenaudinga.' },
  },
  solar: {
    name: { en: 'Solar Plexus', lt: 'Saulės rezginys' },
    theme: { en: 'Emotions, feelings, desire, sensitivity', lt: 'Emocijos, jausmai, troškimai, jautrumas' },
    defined: { en: 'You live on an emotional wave — clarity takes time.', lt: 'Gyvenate emocine banga — aiškumui reikia laiko.' },
    open: { en: 'Emotionally empathic. Not-self: avoiding confrontation and truth.', lt: 'Emociškai empatiškas. Ne-aš: konfrontacijos ir tiesos vengimas.' },
  },
  sacral: {
    name: { en: 'Sacral', lt: 'Sakralinis' },
    theme: { en: 'Life force, sexuality, work capacity', lt: 'Gyvybinė jėga, seksualumas, darbingumas' },
    defined: { en: 'Sustainable energy for what you respond to.', lt: 'Ilgalaikė energija tam, į ką atsiliepiate.' },
    open: { en: 'Amplifies others’ energy. Not-self: not knowing when enough is enough.', lt: 'Sustiprina kitų energiją. Ne-aš: nežinojimas, kada gana.' },
  },
  root: {
    name: { en: 'Root', lt: 'Šaknis' },
    theme: { en: 'Pressure, drive, stress, adrenaline', lt: 'Spaudimas, varomoji jėga, stresas, adrenalinas' },
    defined: { en: 'A consistent way of handling pressure.', lt: 'Pastovus spaudimo valdymo būdas.' },
    open: { en: 'Feels pressure amplified. Not-self: rushing to get rid of pressure.', lt: 'Spaudimą jaučia sustiprintą. Ne-aš: skubėjimas atsikratyti spaudimo.' },
  },
}

export const HD_LINES: Record<number, { name: Bi; description: Bi }> = {
  1: {
    name: { en: 'Investigator', lt: 'Tyrėjas' },
    description: { en: 'Needs a solid foundation of knowledge to feel secure.', lt: 'Kad jaustųsi saugus, reikia tvirto žinių pamato.' },
  },
  2: {
    name: { en: 'Hermit', lt: 'Atsiskyrėlis' },
    description: { en: 'Natural talent that needs time alone; called out by others.', lt: 'Įgimtas talentas, kuriam reikia vienatvės; kiti jį „pašaukia“.' },
  },
  3: {
    name: { en: 'Martyr', lt: 'Kankinys' },
    description: { en: 'Learns by trial and error — discovering what does not work.', lt: 'Mokosi bandymų ir klaidų būdu — atrasdamas, kas neveikia.' },
  },
  4: {
    name: { en: 'Opportunist', lt: 'Oportunistas' },
    description: { en: 'Opportunities come through the network of friends and community.', lt: 'Galimybės ateina per draugų ir bendruomenės tinklą.' },
  },
  5: {
    name: { en: 'Heretic', lt: 'Eretikas' },
    description: { en: 'Projected upon as a saviour; offers practical universal solutions.', lt: 'Į jį projektuojama kaip į gelbėtoją; siūlo praktiškus universalius sprendimus.' },
  },
  6: {
    name: { en: 'Role Model', lt: 'Pavyzdys' },
    description: { en: 'Three life phases: experiment, withdraw, then embody wisdom as an example.', lt: 'Trys gyvenimo etapai: eksperimentuoti, atsitraukti, tada įkūnyti išmintį kaip pavyzdys.' },
  },
}

export const HD_ANGLES: Record<'right' | 'juxtaposition' | 'left', { name: Bi; description: Bi }> = {
  right: {
    name: { en: 'Right Angle', lt: 'Dešinysis kampas' },
    description: { en: 'Personal destiny — your life path unfolds through your own experiences.', lt: 'Asmeninis likimas — jūsų kelias skleidžiasi per jūsų pačių patirtis.' },
  },
  juxtaposition: {
    name: { en: 'Juxtaposition', lt: 'Jukstapozicija' },
    description: { en: 'Fixed fate — a very specific, consistent path of your own.', lt: 'Fiksuotas likimas — labai konkretus, pastovus jūsų kelias.' },
  },
  left: {
    name: { en: 'Left Angle', lt: 'Kairysis kampas' },
    description: { en: 'Transpersonal karma — your path is entwined with the people you meet.', lt: 'Transpersonalinė karma — jūsų kelias susipynęs su sutinkamais žmonėmis.' },
  },
}

export const HD_CHANNELS: Record<string, { name: Bi; description: Bi }> = {
  '1-8': { name: { en: 'Inspiration', lt: 'Įkvėpimas' }, description: { en: 'A creative role model whose unique expression inspires others.', lt: 'Kūrybingas pavyzdys, kurio unikali raiška įkvepia kitus.' } },
  '2-14': { name: { en: 'The Beat', lt: 'Ritmas' }, description: { en: 'Keeper of the keys — energy that drives direction and resources.', lt: 'Raktų saugotojas — energija, varanti kryptį ir išteklius.' } },
  '3-60': { name: { en: 'Mutation', lt: 'Mutacija' }, description: { en: 'Energy that brings change in pulses — innovation through acceptance of limits.', lt: 'Energija, atnešanti pokyčius pulsais — inovacija per ribų priėmimą.' } },
  '4-63': { name: { en: 'Logic', lt: 'Logika' }, description: { en: 'A mind of doubt and answers — testing patterns for the future.', lt: 'Abejonių ir atsakymų protas — modelių tikrinimas ateičiai.' } },
  '5-15': { name: { en: 'Rhythm', lt: 'Tėkmė' }, description: { en: 'Being in the flow — aligned with natural rhythms.', lt: 'Buvimas tėkmėje — suderintas su natūraliais ritmais.' } },
  '6-59': { name: { en: 'Mating', lt: 'Intymumas' }, description: { en: 'Emotional energy for intimacy, reproduction and breaking barriers.', lt: 'Emocinė energija intymumui, dauginimuisi ir barjerų griovimui.' } },
  '7-31': { name: { en: 'The Alpha', lt: 'Alfa' }, description: { en: 'Leadership for the good of the collective — a democratic leader.', lt: 'Lyderystė dėl kolektyvo gerovės — demokratiškas vadovas.' } },
  '9-52': { name: { en: 'Concentration', lt: 'Susikaupimas' }, description: { en: 'Determined, focused energy for detail and depth.', lt: 'Ryžtinga, sutelkta energija detalėms ir gelmei.' } },
  '10-20': { name: { en: 'Awakening', lt: 'Pabudimas' }, description: { en: 'Commitment to higher principles expressed in the now.', lt: 'Įsipareigojimas aukštesniems principams, išreiškiamas dabar.' } },
  '10-34': { name: { en: 'Exploration', lt: 'Tyrinėjimas' }, description: { en: 'Following your own convictions with independent power.', lt: 'Savų įsitikinimų sekimas su nepriklausoma galia.' } },
  '10-57': { name: { en: 'Perfected Form', lt: 'Tobula forma' }, description: { en: 'Survival through intuitive self-love and right behaviour.', lt: 'Išlikimas per intuityvią meilę sau ir teisingą elgesį.' } },
  '11-56': { name: { en: 'Curiosity', lt: 'Smalsumas' }, description: { en: 'A seeker and storyteller who stimulates through ideas.', lt: 'Ieškotojas ir pasakotojas, stimuliuojantis idėjomis.' } },
  '12-22': { name: { en: 'Openness', lt: 'Atvirumas' }, description: { en: 'Social, emotional expression — grace when in the right mood.', lt: 'Socialinė, emocinė raiška — grakštumas, kai tinkama nuotaika.' } },
  '13-33': { name: { en: 'The Prodigal', lt: 'Sūnus palaidūnas' }, description: { en: 'Witness who gathers experiences and later shares their wisdom.', lt: 'Liudininkas, kaupiantis patirtis ir vėliau dalijantis jų išmintimi.' } },
  '16-48': { name: { en: 'The Wavelength', lt: 'Bangos ilgis' }, description: { en: 'Talent through depth and repetition — mastery of skill.', lt: 'Talentas per gelmę ir kartojimą — įgūdžio meistrystė.' } },
  '17-62': { name: { en: 'Acceptance', lt: 'Priėmimas' }, description: { en: 'An organising mind that builds logical opinions with detail.', lt: 'Organizuojantis protas, kuriantis logiškas nuomones su detalėmis.' } },
  '18-58': { name: { en: 'Judgment', lt: 'Vertinimas' }, description: { en: 'Joyful drive to correct and perfect what exists.', lt: 'Džiugi aistra taisyti ir tobulinti tai, kas yra.' } },
  '19-49': { name: { en: 'Synthesis', lt: 'Sintezė' }, description: { en: 'Sensitivity to needs, resources and principles in relationships.', lt: 'Jautrumas poreikiams, ištekliams ir principams santykiuose.' } },
  '20-34': { name: { en: 'Charisma', lt: 'Charizma' }, description: { en: 'Busy-ness — powerful energy turning thought into immediate action.', lt: 'Užimtumas — galinga energija, mintį verčianti tiesioginiu veiksmu.' } },
  '20-57': { name: { en: 'The Brainwave', lt: 'Smegenų banga' }, description: { en: 'Penetrating intuitive awareness in the now.', lt: 'Skvarbus intuityvus sąmoningumas dabartyje.' } },
  '21-45': { name: { en: 'Money', lt: 'Pinigai' }, description: { en: 'A materialist leader managing resources for the tribe.', lt: 'Materialus lyderis, valdantis išteklius genčiai.' } },
  '23-43': { name: { en: 'Structuring', lt: 'Struktūravimas' }, description: { en: 'Individual insight — genius or freak until explained well.', lt: 'Individuali įžvalga — genijus arba keistuolis, kol gerai paaiškinama.' } },
  '24-61': { name: { en: 'Awareness', lt: 'Sąmoningumas' }, description: { en: 'A thinker drawn to mystery and inner truth.', lt: 'Mąstytojas, traukiamas paslapties ir vidinės tiesos.' } },
  '25-51': { name: { en: 'Initiation', lt: 'Iniciacija' }, description: { en: 'Competitive courage to be first and leap into the unknown.', lt: 'Konkurencinga drąsa būti pirmam ir šokti į nežinomybę.' } },
  '26-44': { name: { en: 'Surrender', lt: 'Atsidavimas' }, description: { en: 'A transmitter who brings past lessons forward — natural salesperson.', lt: 'Perdavėjas, perkeliantis praeities pamokas — natūralus pardavėjas.' } },
  '27-50': { name: { en: 'Preservation', lt: 'Išsaugojimas' }, description: { en: 'Custodian of values — caring and nurturing for the tribe.', lt: 'Vertybių saugotojas — rūpestis ir globa genčiai.' } },
  '28-38': { name: { en: 'Struggle', lt: 'Kova' }, description: { en: 'Stubborn drive to find a life worth living.', lt: 'Užsispyrusi jėga rasti gyvenimą, vertą gyventi.' } },
  '29-46': { name: { en: 'Discovery', lt: 'Atradimas' }, description: { en: 'Succeeding where others fail through total commitment.', lt: 'Sėkmė ten, kur kitiems nepavyksta — per visišką įsipareigojimą.' } },
  '30-41': { name: { en: 'Recognition', lt: 'Atpažinimas' }, description: { en: 'Fantasy and desire fuelling new experiences.', lt: 'Fantazija ir troškimas, kurstantys naujas patirtis.' } },
  '32-54': { name: { en: 'Transformation', lt: 'Transformacija' }, description: { en: 'Ambition driven to rise and transform materially and spiritually.', lt: 'Ambicija kilti ir transformuotis materialiai bei dvasiškai.' } },
  '34-57': { name: { en: 'Power', lt: 'Galia' }, description: { en: 'Archetypal survival power — instinct in action.', lt: 'Archetipinė išlikimo galia — instinktas veiksme.' } },
  '35-36': { name: { en: 'Transitoriness', lt: 'Laikinumas' }, description: { en: 'Hunger for new experiences and the wisdom they bring.', lt: 'Alkis naujoms patirtims ir išminčiai, kurią jos atneša.' } },
  '37-40': { name: { en: 'Community', lt: 'Bendruomenė' }, description: { en: 'The bargain of support and loyalty that holds a group together.', lt: 'Paramos ir lojalumo sandėris, laikantis grupę kartu.' } },
  '39-55': { name: { en: 'Emoting', lt: 'Emocionalumas' }, description: { en: 'Moodiness as a source of spirit, creativity and abundance.', lt: 'Nuotaikų kaita kaip dvasios, kūrybos ir gausos šaltinis.' } },
  '42-53': { name: { en: 'Maturation', lt: 'Brendimas' }, description: { en: 'Energy to begin and complete cycles of experience.', lt: 'Energija pradėti ir užbaigti patirties ciklus.' } },
  '47-64': { name: { en: 'Abstraction', lt: 'Abstrakcija' }, description: { en: 'Making sense of the past — mental activity mixed with clarity.', lt: 'Praeities prasmės paieška — mentalinė veikla, besimaišanti su aiškumu.' } },
}

/** Gate keynotes (Rave I'Ching), with the I Ching hexagram name. */
export const HD_GATES: Record<number, { name: Bi; iching: string; description: Bi }> = {
  1: { name: { en: 'Self-Expression', lt: 'Saviraiška' }, iching: 'The Creative', description: { en: 'Creative energy to express your unique direction.', lt: 'Kūrybinė energija išreikšti unikalią kryptį.' } },
  2: { name: { en: 'Direction of the Self', lt: 'Savojo „aš“ kryptis' }, iching: 'The Receptive', description: { en: 'The driver — knowing where to go and attracting resources.', lt: 'Vairuotojas — žinojimas, kur eiti, ir išteklių pritraukimas.' } },
  3: { name: { en: 'Ordering', lt: 'Tvarkos kūrimas' }, iching: 'Difficulty at the Beginning', description: { en: 'Bringing order out of chaos — energy for innovation.', lt: 'Tvarkos kūrimas iš chaoso — energija inovacijoms.' } },
  4: { name: { en: 'Formulization', lt: 'Formulavimas' }, iching: 'Youthful Folly', description: { en: 'Answers and logical formulas — to be tested, not believed.', lt: 'Atsakymai ir logiškos formulės — jas reikia patikrinti, ne aklai tikėti.' } },
  5: { name: { en: 'Fixed Rhythms', lt: 'Pastovūs ritmai' }, iching: 'Waiting', description: { en: 'Habits and natural timing that create stability.', lt: 'Įpročiai ir natūralus laikas, kuriantys stabilumą.' } },
  6: { name: { en: 'Friction', lt: 'Trintis' }, iching: 'Conflict', description: { en: 'Emotional gatekeeper of intimacy — opening or closing.', lt: 'Emocinis intymumo vartininkas — atveria arba užveria.' } },
  7: { name: { en: 'The Role of the Self', lt: 'Savojo „aš“ vaidmuo' }, iching: 'The Army', description: { en: 'Leadership through influence and guiding the direction.', lt: 'Lyderystė per įtaką ir krypties nurodymą.' } },
  8: { name: { en: 'Contribution', lt: 'Indėlis' }, iching: 'Holding Together', description: { en: 'Making your unique contribution visible.', lt: 'Unikalaus indėlio padarymas matomu.' } },
  9: { name: { en: 'Focus', lt: 'Fokusas' }, iching: 'Taming Power of the Small', description: { en: 'Energy to concentrate on details.', lt: 'Energija susikaupti ties detalėmis.' } },
  10: { name: { en: 'Behaviour of the Self', lt: 'Savojo „aš“ elgesys' }, iching: 'Treading', description: { en: 'Self-love and being true to your own nature.', lt: 'Meilė sau ir ištikimybė savo prigimčiai.' } },
  11: { name: { en: 'Ideas', lt: 'Idėjos' }, iching: 'Peace', description: { en: 'A storehouse of ideas and images to share.', lt: 'Idėjų ir vaizdinių sandėlis dalijimuisi.' } },
  12: { name: { en: 'Caution', lt: 'Atsargumas' }, iching: 'Standstill', description: { en: 'Articulating feelings with the right timing and mood.', lt: 'Jausmų išreiškimas tinkamu laiku ir nuotaika.' } },
  13: { name: { en: 'The Listener', lt: 'Klausytojas' }, iching: 'Fellowship', description: { en: 'Others confide in you — keeper of secrets and stories.', lt: 'Kiti jums atsiveria — paslapčių ir istorijų saugotojas.' } },
  14: { name: { en: 'Power Skills', lt: 'Galios įgūdžiai' }, iching: 'Possession in Great Measure', description: { en: 'Energy to accumulate resources and fuel direction.', lt: 'Energija kaupti išteklius ir maitinti kryptį.' } },
  15: { name: { en: 'Extremes', lt: 'Kraštutinumai' }, iching: 'Modesty', description: { en: 'Love of humanity and embracing all rhythms.', lt: 'Meilė žmonijai ir visų ritmų priėmimas.' } },
  16: { name: { en: 'Skills', lt: 'Įgūdžiai' }, iching: 'Enthusiasm', description: { en: 'Enthusiasm for practising and refining talent.', lt: 'Entuziazmas praktikuoti ir tobulinti talentą.' } },
  17: { name: { en: 'Opinions', lt: 'Nuomonės' }, iching: 'Following', description: { en: 'Forming and sharing logical points of view.', lt: 'Logiškų požiūrių formavimas ir dalijimasis.' } },
  18: { name: { en: 'Correction', lt: 'Taisymas' }, iching: 'Work on What Has Been Spoilt', description: { en: 'Seeing what needs to be improved.', lt: 'Matymas, ką reikia pagerinti.' } },
  19: { name: { en: 'Wanting', lt: 'Troškimas' }, iching: 'Approach', description: { en: 'Sensitivity to the needs of others and belonging.', lt: 'Jautrumas kitų poreikiams ir priklausymui.' } },
  20: { name: { en: 'The Now', lt: 'Dabartis' }, iching: 'Contemplation', description: { en: 'Presence and awareness expressed in the moment.', lt: 'Buvimas ir sąmoningumas, išreiškiami akimirkoje.' } },
  21: { name: { en: 'The Hunter/Huntress', lt: 'Medžiotojas' }, iching: 'Biting Through', description: { en: 'Control over resources and one’s own territory.', lt: 'Išteklių ir savos teritorijos kontrolė.' } },
  22: { name: { en: 'Openness', lt: 'Atvirumas' }, iching: 'Grace', description: { en: 'Social grace and emotional charm.', lt: 'Socialinis grakštumas ir emocinis žavesys.' } },
  23: { name: { en: 'Assimilation', lt: 'Asimiliacija' }, iching: 'Splitting Apart', description: { en: 'Translating individual insight into simple words.', lt: 'Individualios įžvalgos vertimas į paprastus žodžius.' } },
  24: { name: { en: 'Rationalization', lt: 'Racionalizavimas' }, iching: 'Return', description: { en: 'Returning again and again to an idea until it is understood.', lt: 'Grįžimas prie idėjos vėl ir vėl, kol ji suprantama.' } },
  25: { name: { en: 'Spirit of the Self', lt: 'Savojo „aš“ dvasia' }, iching: 'Innocence', description: { en: 'Universal love and innocence.', lt: 'Visuotinė meilė ir nekaltumas.' } },
  26: { name: { en: 'The Egoist', lt: 'Egoistas' }, iching: 'Taming Power of the Great', description: { en: 'The trickster and salesperson — persuasive willpower.', lt: 'Gudruolis ir pardavėjas — įtikinanti valia.' } },
  27: { name: { en: 'Caring', lt: 'Rūpestis' }, iching: 'Nourishment', description: { en: 'Energy to nurture and care for others.', lt: 'Energija maitinti ir rūpintis kitais.' } },
  28: { name: { en: 'The Game Player', lt: 'Žaidėjas' }, iching: 'Preponderance of the Great', description: { en: 'Searching for purpose — taking risks to find meaning.', lt: 'Tikslo paieška — rizika dėl prasmės.' } },
  29: { name: { en: 'Perseverance', lt: 'Atkaklumas' }, iching: 'The Abysmal', description: { en: 'Saying yes and committing deeply to experience.', lt: 'Sakymas „taip“ ir gilus įsipareigojimas patirčiai.' } },
  30: { name: { en: 'Feelings', lt: 'Jausmai' }, iching: 'The Clinging Fire', description: { en: 'Desire and burning intensity to experience.', lt: 'Troškimas ir deganti aistra patirti.' } },
  31: { name: { en: 'Influence', lt: 'Įtaka' }, iching: 'Influence', description: { en: 'The voice of leadership elected by others.', lt: 'Lyderystės balsas, kurį išrenka kiti.' } },
  32: { name: { en: 'Continuity', lt: 'Tęstinumas' }, iching: 'Duration', description: { en: 'Instinct for what has lasting value and potential.', lt: 'Instinktas tam, kas turi ilgalaikę vertę ir potencialą.' } },
  33: { name: { en: 'Privacy', lt: 'Privatumas' }, iching: 'Retreat', description: { en: 'Withdrawing to reflect, then sharing the lesson.', lt: 'Pasitraukimas apmąstyti, tada dalijimasis pamoka.' } },
  34: { name: { en: 'Power', lt: 'Galia' }, iching: 'The Power of the Great', description: { en: 'Pure, independent life force for action.', lt: 'Gryna, nepriklausoma gyvybinė jėga veiksmui.' } },
  35: { name: { en: 'Change', lt: 'Pokytis' }, iching: 'Progress', description: { en: 'Hunger for new experiences and progress.', lt: 'Alkis naujoms patirtims ir pažangai.' } },
  36: { name: { en: 'Crisis', lt: 'Krizė' }, iching: 'Darkening of the Light', description: { en: 'Emotional depth gained through crisis and novelty.', lt: 'Emocinė gelmė, įgyjama per krizę ir naujumą.' } },
  37: { name: { en: 'Friendship', lt: 'Draugystė' }, iching: 'The Family', description: { en: 'Warmth, loyalty and the bargain of family.', lt: 'Šiluma, lojalumas ir šeimos sandėris.' } },
  38: { name: { en: 'The Fighter', lt: 'Kovotojas' }, iching: 'Opposition', description: { en: 'Fighting for what gives life meaning.', lt: 'Kova už tai, kas suteikia gyvenimui prasmę.' } },
  39: { name: { en: 'Provocation', lt: 'Provokacija' }, iching: 'Obstruction', description: { en: 'Provoking spirit and emotion in others.', lt: 'Dvasios ir emocijų provokavimas kituose.' } },
  40: { name: { en: 'Aloneness', lt: 'Vienatvė' }, iching: 'Deliverance', description: { en: 'Willpower to work, balanced by the need for rest.', lt: 'Valia dirbti, subalansuota poilsio poreikiu.' } },
  41: { name: { en: 'Contraction', lt: 'Susitraukimas' }, iching: 'Decrease', description: { en: 'The start code of new experience — fantasy and potential.', lt: 'Naujos patirties pradžios kodas — fantazija ir potencialas.' } },
  42: { name: { en: 'Growth', lt: 'Augimas' }, iching: 'Increase', description: { en: 'Energy to complete cycles and grow through them.', lt: 'Energija užbaigti ciklus ir per juos augti.' } },
  43: { name: { en: 'Insight', lt: 'Įžvalga' }, iching: 'Breakthrough', description: { en: 'Unique inner knowing and breakthroughs.', lt: 'Unikalus vidinis žinojimas ir proveržiai.' } },
  44: { name: { en: 'Alertness', lt: 'Budrumas' }, iching: 'Coming to Meet', description: { en: 'Instinctive memory of patterns — recognising talent.', lt: 'Instinktyvi modelių atmintis — talento atpažinimas.' } },
  45: { name: { en: 'The Gatherer', lt: 'Telkėjas' }, iching: 'Gathering Together', description: { en: 'The voice of the king/queen — gathering resources.', lt: 'Karaliaus balsas — išteklių telkimas.' } },
  46: { name: { en: 'Determination of the Self', lt: 'Savojo „aš“ ryžtas' }, iching: 'Pushing Upward', description: { en: 'Love of the body and being in the right place at the right time.', lt: 'Meilė kūnui ir buvimas tinkamoje vietoje tinkamu laiku.' } },
  47: { name: { en: 'Realization', lt: 'Suvokimas' }, iching: 'Oppression', description: { en: 'Making sense of past experiences — sudden epiphanies.', lt: 'Praeities patirčių prasmės radimas — staigios įžvalgos.' } },
  48: { name: { en: 'Depth', lt: 'Gelmė' }, iching: 'The Well', description: { en: 'Depth of knowledge and the fear of inadequacy.', lt: 'Žinių gelmė ir nepakankamumo baimė.' } },
  49: { name: { en: 'Principles', lt: 'Principai' }, iching: 'Revolution', description: { en: 'Sensitivity to principles — accepting or rejecting.', lt: 'Jautrumas principams — priėmimas arba atmetimas.' } },
  50: { name: { en: 'Values', lt: 'Vertybės' }, iching: 'The Cauldron', description: { en: 'Guardian of the values and laws of the tribe.', lt: 'Genties vertybių ir įstatymų sergėtojas.' } },
  51: { name: { en: 'Shock', lt: 'Šokas' }, iching: 'The Arousing', description: { en: 'Courage, initiation and waking others through shock.', lt: 'Drąsa, iniciacija ir kitų pažadinimas sukrėtimu.' } },
  52: { name: { en: 'Stillness', lt: 'Ramybė' }, iching: 'Keeping Still', description: { en: 'The pressure to sit still and concentrate.', lt: 'Spaudimas nurimti ir susikaupti.' } },
  53: { name: { en: 'Beginnings', lt: 'Pradžios' }, iching: 'Development', description: { en: 'Pressure to start new cycles and developments.', lt: 'Spaudimas pradėti naujus ciklus.' } },
  54: { name: { en: 'Ambition', lt: 'Ambicija' }, iching: 'The Marrying Maiden', description: { en: 'Drive to rise — materially and spiritually.', lt: 'Siekis kilti — materialiai ir dvasiškai.' } },
  55: { name: { en: 'Spirit', lt: 'Dvasia' }, iching: 'Abundance', description: { en: 'Emotional abundance and moods of spirit.', lt: 'Emocinė gausa ir dvasios nuotaikos.' } },
  56: { name: { en: 'Stimulation', lt: 'Stimuliavimas' }, iching: 'The Wanderer', description: { en: 'The storyteller who stimulates through beliefs.', lt: 'Pasakotojas, stimuliuojantis per tikėjimus.' } },
  57: { name: { en: 'Intuitive Clarity', lt: 'Intuityvus aiškumas' }, iching: 'The Gentle', description: { en: 'Acute intuitive hearing in the now.', lt: 'Aštri intuityvi klausa dabartyje.' } },
  58: { name: { en: 'Vitality', lt: 'Gyvybingumas' }, iching: 'The Joyous', description: { en: 'Joy of life fuelling the drive to improve.', lt: 'Gyvenimo džiaugsmas, kurstantis norą tobulinti.' } },
  59: { name: { en: 'Sexuality', lt: 'Seksualumas' }, iching: 'Dispersion', description: { en: 'Breaking down barriers to intimacy.', lt: 'Barjerų intymumui griovimas.' } },
  60: { name: { en: 'Acceptance', lt: 'Priėmimas' }, iching: 'Limitation', description: { en: 'Accepting limitation as the ground of mutation.', lt: 'Ribotumo priėmimas kaip mutacijos pagrindas.' } },
  61: { name: { en: 'Mystery', lt: 'Paslaptis' }, iching: 'Inner Truth', description: { en: 'Pressure to know the unknowable — inner truth.', lt: 'Spaudimas pažinti nepažinų — vidinė tiesa.' } },
  62: { name: { en: 'Details', lt: 'Detalės' }, iching: 'Preponderance of the Small', description: { en: 'Naming and expressing facts and details.', lt: 'Faktų ir detalių įvardijimas.' } },
  63: { name: { en: 'Doubt', lt: 'Abejonė' }, iching: 'After Completion', description: { en: 'Logical doubt that drives the search for answers.', lt: 'Loginė abejonė, skatinanti atsakymų paiešką.' } },
  64: { name: { en: 'Confusion', lt: 'Sumaištis' }, iching: 'Before Completion', description: { en: 'Mental images of the past seeking resolution.', lt: 'Praeities vaizdiniai, ieškantys išsprendimo.' } },
}

export const HD_PLANET_NAMES: Record<string, Bi & { symbol: string }> = {
  sun: { en: 'Sun', lt: 'Saulė', symbol: '☉' },
  earth: { en: 'Earth', lt: 'Žemė', symbol: '⊕' },
  node: { en: 'North Node', lt: 'Šiaurinis mazgas', symbol: '☊' },
  southNode: { en: 'South Node', lt: 'Pietinis mazgas', symbol: '☋' },
  moon: { en: 'Moon', lt: 'Mėnulis', symbol: '☽' },
  mercury: { en: 'Mercury', lt: 'Merkurijus', symbol: '☿' },
  venus: { en: 'Venus', lt: 'Venera', symbol: '♀' },
  mars: { en: 'Mars', lt: 'Marsas', symbol: '♂' },
  jupiter: { en: 'Jupiter', lt: 'Jupiteris', symbol: '♃' },
  saturn: { en: 'Saturn', lt: 'Saturnas', symbol: '♄' },
  uranus: { en: 'Uranus', lt: 'Uranas', symbol: '♅' },
  neptune: { en: 'Neptune', lt: 'Neptūnas', symbol: '♆' },
  pluto: { en: 'Pluto', lt: 'Plutonas', symbol: '♇' },
}
