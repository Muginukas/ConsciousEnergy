import type { Bi } from '../zodiac'
import type { CenterId, HdAuthority, HdType } from './humandesign'

const B = (en: string, lt: string): Bi => ({ en, lt })
type BiList = { en: string[]; lt: string[] }
const L = (en: string[], lt: string[]): BiList => ({ en, lt })

/* ───────────────────── Types ───────────────────── */

export const TYPE_DEEP: Record<HdType, { daily: Bi; signs: BiList; tips: BiList; love: Bi; work: Bi }> = {
  manifestor: {
    daily: B(
      'You get sudden urges to start something — and you can do it alone, without waiting. Your energy comes in bursts: intense periods of action followed by a need to rest. Others may feel your presence strongly, even a little intimidating, before you say a word.',
      'Jums kyla staigūs impulsai kažką pradėti — ir galite tai padaryti patys, nieko nelaukdami. Energija ateina pliūpsniais: intensyvūs veiklos periodai, po kurių reikia pailsėti. Kiti stipriai jaučia jūsų buvimą — kartais net šiek tiek bauginančiai — dar jums neprabilus.'
    ),
    signs: L(
      ['You feel angry because people resist or block you.', 'You hide your plans to avoid being controlled.', 'You feel you must ask permission for everything.'],
      ['Jaučiate pyktį, nes žmonės priešinasi ar jus blokuoja.', 'Slepiate planus, kad nebūtumėte kontroliuojamas.', 'Jaučiate, kad dėl visko turite prašyti leidimo.']
    ),
    tips: L(
      ['Before acting, tell the people it will affect: “I’m going to…”. It is not asking permission — it is informing.', 'Rest when the burst of energy is over — don’t force yourself to be constant.', 'Spend time alone; your aura needs space.'],
      ['Prieš veikdami pasakykite tiems, kuriuos tai paveiks: „Aš ketinu…“. Tai ne leidimo prašymas, o informavimas.', 'Ilsėkitės, kai energijos pliūpsnis baigiasi — neverskite savęs būti pastoviam.', 'Leiskite laiką vieni; jūsų aurai reikia erdvės.']
    ),
    love: B('You need a partner who gives you freedom and accepts being informed rather than consulted.', 'Jums reikia partnerio, kuris suteikia laisvę ir priima, kad jį informuojate, o ne klausiate.'),
    work: B('You are best at initiating and starting things; let others continue and maintain them.', 'Geriausiai sekasi inicijuoti ir pradėti; leiskite kitiems tęsti ir palaikyti.'),
  },
  generator: {
    daily: B(
      'You have strong, steady life energy — but only for things you truly love. When something excites you, you can work for hours and feel even more alive. When you force yourself into what you don’t enjoy, you feel tired, stuck and frustrated. Your body answers questions with gut sounds and sensations (“uh-huh!” = yes, “uhn-uhn” = no).',
      'Turite stiprią, pastovią gyvybinę energiją — bet tik tam, ką tikrai mylite. Kai kas nors jus uždega, galite dirbti valandų valandas ir jaustis dar gyvesni. Kai verčiate save daryti tai, kas nedžiugina — jaučiatės pavargę, įstrigę ir frustruoti. Kūnas į klausimus atsako garsais ir pojūčiais pilve („ahą!“ = taip, „ne-a“ = ne).'
    ),
    signs: L(
      ['You often feel frustrated and stuck.', 'You go to bed not fully tired — you didn’t use your energy on the right things.', 'You say yes from the head and then regret it.'],
      ['Dažnai jaučiatės frustruotas ir įstrigęs.', 'Einate miegoti ne iki galo pavargę — energija išnaudota ne tam.', 'Sakote „taip“ iš galvos, o paskui gailitės.']
    ),
    tips: L(
      ['Don’t start from the mind — wait for something to appear in life (a question, an offer, a sign) and notice your gut reaction.', 'Ask friends to ask you yes/no questions — listen to the sound your body makes.', 'Use up your energy each day on what you love; then you sleep well.'],
      ['Nepradėkite iš proto — palaukite, kol gyvenime kas nors pasirodys (klausimas, pasiūlymas, ženklas), ir stebėkite pilvo reakciją.', 'Paprašykite draugų užduoti jums „taip/ne“ klausimus — klausykite, kokį garsą skleidžia kūnas.', 'Kasdien išnaudokite energiją tam, ką mylite; tada gerai miegosite.']
    ),
    love: B('Respond to love rather than chase it — the right partner will make your gut say “yes!”.', 'Atsiliepkite į meilę, o ne vaikykitės jos — tinkamas partneris privers pilvą pasakyti „taip!“.'),
    work: B('Mastery comes through doing what you love again and again; satisfaction is your compass.', 'Meistrystė ateina vėl ir vėl darant tai, ką mylite; pasitenkinimas — jūsų kompasas.'),
  },
  manifestingGenerator: {
    daily: B(
      'You are fast and multi-talented — you can do several things at once and skip steps others need. You may change interests often, and that is natural for you. Like Generators you have strong gut energy; like Manifestors you can move quickly once you respond.',
      'Esate greitas ir daugiatalentis — galite daryti kelis dalykus vienu metu ir praleisti žingsnius, kurių reikia kitiems. Galite dažnai keisti pomėgius — tai jums natūralu. Kaip generatoriai turite stiprią pilvo energiją; kaip manifestoriai galite greitai judėti, kai jau atsiliepėte.'
    ),
    signs: L(
      ['Frustration and sudden anger.', 'Jumping into things from the mind and quitting halfway.', 'Feeling guilty for having many interests.'],
      ['Frustracija ir staigus pyktis.', 'Šokimas į dalykus iš proto ir metimas pusiaukelėje.', 'Kaltės jausmas dėl daugybės pomėgių.']
    ),
    tips: L(
      ['First respond with your gut, then inform others before you move.', 'Allow yourself to have many passions — your path is not a straight line.', 'When you skip steps, go back and check the important ones.'],
      ['Pirmiausia atsiliepkite pilvu, tada informuokite kitus prieš judėdami.', 'Leiskite sau turėti daug aistrų — jūsų kelias nėra tiesi linija.', 'Kai praleidžiate žingsnius, grįžkite ir patikrinkite svarbiausius.']
    ),
    love: B('You need a partner who can keep up with your speed and doesn’t mind your changes.', 'Jums reikia partnerio, kuris suspėja jūsų tempu ir nesipiktina jūsų pokyčiais.'),
    work: B('Multi-tasking, varied roles and fast projects suit you better than one slow routine.', 'Jums labiau tinka daug užduočių, įvairūs vaidmenys ir greiti projektai nei viena lėta rutina.'),
  },
  projector: {
    daily: B(
      'You see people and systems deeply — you often know how others could do things better. But you don’t have constant work energy like Generators; you work best in short, focused periods and need much more rest. Your advice is powerful only when someone actually wants it.',
      'Matote žmones ir sistemas giliai — dažnai žinote, kaip kiti galėtų daryti geriau. Tačiau neturite pastovios darbo energijos kaip generatoriai; geriausiai dirbate trumpais, sutelktais periodais ir jums reikia daug daugiau poilsio. Jūsų patarimas stiprus tik tada, kai žmogus jo iš tiesų nori.'
    ),
    signs: L(
      ['Bitterness — feeling unseen and unappreciated.', 'Giving advice nobody asked for and being ignored.', 'Exhaustion from trying to work like a Generator.'],
      ['Kartėlis — jaučiatės nematomas ir neįvertintas.', 'Dalinate patarimus, kurių niekas neprašė, ir esate ignoruojamas.', 'Išsekimas, bandant dirbti kaip generatorius.']
    ),
    tips: L(
      ['Wait for invitations in big life areas (work, love, moving). Small daily things you can do freely.', 'Study what fascinates you — being an expert attracts the right invitations.', 'Rest before you are tired; lie down before sleep to release others’ energy.'],
      ['Didžiosiose gyvenimo srityse (darbas, meilė, persikraustymas) laukite kvietimo. Mažus kasdienius dalykus darykite laisvai.', 'Studijuokite tai, kas jus žavi — ekspertiškumas pritraukia tinkamus kvietimus.', 'Ilsėkitės dar nepavargę; prieš miegą pagulėkite, kad paleistumėte kitų energiją.']
    ),
    love: B('Be with someone who truly sees and recognises you — that recognition is the invitation.', 'Būkite su tuo, kuris jus tikrai mato ir pripažįsta — tas pripažinimas ir yra kvietimas.'),
    work: B('You shine as a guide, manager, consultant or coach — directing energy rather than producing it.', 'Spindite kaip gidas, vadovas, konsultantas ar ugdomasis vadovas — nukreipiate energiją, o ne ją gaminate.'),
  },
  reflector: {
    daily: B(
      'You are deeply sensitive to the people and places around you — you feel and reflect them. Every day can feel different, because the Moon activates different parts of you. You are a natural judge of how healthy a community is.',
      'Esate labai jautrus aplinkiniams žmonėms ir vietoms — juos jaučiate ir atspindite. Kiekviena diena gali jaustis kitaip, nes Mėnulis aktyvuoja skirtingas jūsų dalis. Esate natūralus bendruomenės sveikatos matuoklis.'
    ),
    signs: L(
      ['Disappointment with people and life.', 'Feeling you have lost yourself in others.', 'Making big decisions quickly and regretting them.'],
      ['Nusivylimas žmonėmis ir gyvenimu.', 'Jausmas, kad pasimetėte kituose.', 'Greitai priimti dideli sprendimai, kurių vėliau gailitės.']
    ),
    tips: L(
      ['Give big decisions about 28 days — talk about them with different people as the Moon moves.', 'Choose your environment carefully — it shapes you more than anyone else.', 'Spend time alone each day to feel who you are without others.'],
      ['Dideliems sprendimams skirkite apie 28 dienas — kalbėkite apie juos su skirtingais žmonėmis, kol Mėnulis juda.', 'Atidžiai rinkitės aplinką — ji jus formuoja labiau nei bet kuris kitas.', 'Kasdien pabūkite vieni, kad pajustumėte, kas esate be kitų.']
    ),
    love: B('You need a partner and home that feel good to you — if the environment is right, love flows.', 'Jums reikia partnerio ir namų, kurie jums gerai jaučiasi — jei aplinka tinkama, meilė teka.'),
    work: B('Work in a healthy team or community where you can reflect and evaluate.', 'Dirbkite sveikoje komandoje ar bendruomenėje, kur galite atspindėti ir vertinti.'),
  },
}

/* ───────────────────── Authorities ───────────────────── */

export const AUTHORITY_DEEP: Record<HdAuthority, { steps: BiList; example: Bi }> = {
  emotional: {
    steps: L(
      ['Notice your emotional wave: some days hopeful, some days low.', 'Don’t decide when you’re very excited or very down.', 'Wait — sleep on it, sometimes several days — until you feel calm clarity.'],
      ['Pastebėkite savo emocinę bangą: vienomis dienomis viltis, kitomis — nuosmukis.', 'Nespręskite, kai esate labai pakilęs ar labai prislėgtas.', 'Palaukite — permiegokite, kartais kelias dienas — kol pajusite ramų aiškumą.']
    ),
    example: B('Offered a new job? Say “I need a few days” and notice how you feel about it on good and bad days.', 'Pasiūlė naują darbą? Pasakykite „man reikia kelių dienų“ ir stebėkite, kaip jaučiatės geromis ir blogomis dienomis.'),
  },
  sacral: {
    steps: L(
      ['Let someone ask you a yes/no question.', 'Notice the body’s first sound or sensation — a lift in the belly or a contraction.', 'Trust that, even if the mind disagrees.'],
      ['Leiskite kam nors užduoti jums „taip/ne“ klausimą.', 'Pastebėkite pirmą kūno garsą ar pojūtį — pakilimą pilve ar susitraukimą.', 'Pasitikėkite tuo, net jei protas nesutinka.']
    ),
    example: B('“Do you want to go to this party?” — if your belly says “mm-hmm!”, go; if “uhn-uhn”, stay home.', '„Ar nori eiti į šį vakarėlį?“ — jei pilvas sako „mhm!“, eikite; jei „ne-a“ — likite namie.'),
  },
  splenic: {
    steps: L(
      ['Listen for a quiet, instant inner knowing — a feeling, a hunch, even a shiver.', 'It speaks only once and doesn’t repeat — act in the moment.', 'Don’t let the mind argue it away.'],
      ['Klausykite tylaus, akimirksnio vidinio žinojimo — jausmo, nuojautos, net šiurpulio.', 'Jis prabyla tik kartą ir nesikartoja — veikite tą akimirką.', 'Neleiskite protui jo išginčyti.']
    ),
    example: B('Something tells you not to get into a car — trust it; your spleen protects your survival.', 'Kažkas sako nesėsti į automobilį — patikėkite; blužnis saugo jūsų išlikimą.'),
  },
  egoManifested: {
    steps: L(
      ['Speak spontaneously and listen to what you say you want.', 'Ask yourself: “Do I really want this? What’s in it for me?”', 'Only promise what your heart truly wants — then keep it.'],
      ['Kalbėkite spontaniškai ir išgirskite, ką sakote, kad norite.', 'Paklauskite savęs: „Ar tikrai to noriu? Ką iš to gausiu?“', 'Žadėkite tik tai, ko širdis tikrai nori — ir tada tesėkite.']
    ),
    example: B('If you hear yourself say “I want to start this business!”, that is your will speaking.', 'Jei išgirstate save sakant „Noriu pradėti šį verslą!“ — tai kalba jūsų valia.'),
  },
  egoProjected: {
    steps: L(
      ['Wait to be invited.', 'Talk about the invitation with someone you trust.', 'Hear whether your heart truly wants it.'],
      ['Laukite kvietimo.', 'Aptarkite kvietimą su patikimu žmogumi.', 'Išgirskite, ar širdis tikrai to nori.']
    ),
    example: B('Invited to lead a project — talk it over and listen for real desire in your voice.', 'Pakvietė vadovauti projektui — aptarkite ir klausykitės, ar balse skamba tikras noras.'),
  },
  selfProjected: {
    steps: L(
      ['Talk out loud to people you trust — not for advice, just to hear yourself.', 'Listen for what feels like “me” and the right direction.', 'Decide based on what you heard in your own voice.'],
      ['Kalbėkite garsiai patikimiems žmonėms — ne dėl patarimo, o kad išgirstumėte save.', 'Klausykitės, kas skamba kaip „aš“ ir teisinga kryptis.', 'Spręskite pagal tai, ką išgirdote savo balse.']
    ),
    example: B('Unsure about moving? Tell a friend all about it — you will hear the answer as you speak.', 'Abejojate dėl persikraustymo? Papasakokite draugui — kalbėdami išgirsite atsakymą.'),
  },
  mental: {
    steps: L(
      ['Discuss decisions with several trusted people (they are sounding boards, not deciders).', 'Notice how different places make you feel about the decision.', 'Take your time; clarity comes from the right environment.'],
      ['Aptarkite sprendimus su keliais patikimais žmonėmis (jie — atgarsis, ne sprendėjai).', 'Pastebėkite, kaip skirtingose vietose jaučiatės dėl sprendimo.', 'Neskubėkite; aiškumas ateina iš tinkamos aplinkos.']
    ),
    example: B('Choosing a home? Visit it several times at different hours and talk about it with friends.', 'Renkatės namus? Aplankykite juos kelis kartus skirtingu paros metu ir aptarkite su draugais.'),
  },
  lunar: {
    steps: L(
      ['Note the decision on a calendar.', 'For about 28 days, talk about it with different people and notice your feelings.', 'Decide when the answer stays consistent.'],
      ['Užsirašykite sprendimą kalendoriuje.', 'Apie 28 dienas kalbėkite apie jį su skirtingais žmonėmis ir stebėkite jausmus.', 'Spręskite, kai atsakymas tampa pastovus.']
    ),
    example: B('A big move or relationship decision deserves a full lunar month.', 'Dideliam persikraustymui ar santykių sprendimui skirkite visą Mėnulio mėnesį.'),
  },
}

/* ───────────────────── Centers ───────────────────── */

export const CENTER_DEEP: Record<CenterId, { question: Bi; tip: Bi; body: Bi }> = {
  head: {
    question: B('“Am I thinking about things that don’t really matter to me?”', '„Ar galvoju apie dalykus, kurie man iš tiesų nesvarbūs?“'),
    tip: B('Not every question needs your answer — let inspiration pass through.', 'Ne kiekvienam klausimui reikia jūsų atsakymo — leiskite įkvėpimui praeiti.'),
    body: B('Pineal gland', 'Kankorėžinė liauka'),
  },
  ajna: {
    question: B('“Am I pretending to be certain?”', '„Ar apsimetinėju, kad esu tikras?“'),
    tip: B('It is okay not to know; an open mind is wisdom.', 'Nežinoti — normalu; atviras protas yra išmintis.'),
    body: B('Pituitary gland', 'Hipofizė'),
  },
  throat: {
    question: B('“Am I talking to get attention?”', '„Ar kalbu tam, kad atkreipčiau dėmesį?“'),
    tip: B('Wait for the right moment to speak — your words will have more impact.', 'Palaukite tinkamos akimirkos kalbėti — žodžiai turės daugiau poveikio.'),
    body: B('Thyroid and parathyroid', 'Skydliaukė ir prieskydinės liaukos'),
  },
  g: {
    question: B('“Am I still searching for love and direction?”', '„Ar vis dar ieškau meilės ir krypties?“'),
    tip: B('The right place brings the right people and direction — choose places that feel good.', 'Tinkama vieta atneša tinkamus žmones ir kryptį — rinkitės vietas, kurios jaučiasi gerai.'),
    body: B('Liver and blood', 'Kepenys ir kraujas'),
  },
  heart: {
    question: B('“Do I still have something to prove?”', '„Ar vis dar turiu kažką įrodyti?“'),
    tip: B('Your worth doesn’t depend on achievements — avoid promises you can’t keep.', 'Jūsų vertė nepriklauso nuo pasiekimų — venkite pažadų, kurių negalite tesėti.'),
    body: B('Heart, stomach, gallbladder, thymus', 'Širdis, skrandis, tulžies pūslė, užkrūčio liauka'),
  },
  spleen: {
    question: B('“Am I holding on to something that isn’t good for me?”', '„Ar laikausi kažko, kas man nėra gerai?“'),
    tip: B('Let go of relationships, jobs and habits that make you feel unwell.', 'Paleiskite santykius, darbus ir įpročius, nuo kurių jaučiatės blogai.'),
    body: B('Lymphatic system, spleen, immunity', 'Limfinė sistema, blužnis, imunitetas'),
  },
  solar: {
    question: B('“Am I avoiding confrontation and truth?”', '„Ar vengiu konfrontacijos ir tiesos?“'),
    tip: B('Others’ emotions are not yours — feel them, then let them pass.', 'Kitų emocijos — ne jūsų; pajuskite jas ir leiskite praeiti.'),
    body: B('Kidneys, pancreas, nervous system, lungs', 'Inkstai, kasa, nervų sistema, plaučiai'),
  },
  sacral: {
    question: B('“Do I know when enough is enough?”', '„Ar žinau, kada gana?“'),
    tip: B('Rest before you are exhausted; you are borrowing others’ energy.', 'Ilsėkitės anksčiau, nei išseksite; naudojatės kitų energija.'),
    body: B('Ovaries and testes', 'Kiaušidės ir sėklidės'),
  },
  root: {
    question: B('“Am I rushing to get things done just to be free of pressure?”', '„Ar skubu viską atlikti tik tam, kad atsikratyčiau spaudimo?“'),
    tip: B('Pressure is not an order — you decide when to act.', 'Spaudimas nėra įsakymas — jūs sprendžiate, kada veikti.'),
    body: B('Adrenal glands', 'Antinksčiai'),
  },
}

/* ───────────────────── Profile lines ───────────────────── */

export const LINE_DEEP: Record<number, Bi> = {
  1: B('You need to understand things deeply before you feel safe. You research, read and study the foundations. Insecurity disappears through knowledge.', 'Kad jaustumėtės saugiai, turite giliai suprasti dalykus. Tyrinėjate, skaitote ir studijuojate pagrindus. Nesaugumas išnyksta per žinias.'),
  2: B('You have natural talents you may not even notice. You need time alone “in your cave”, and others call you out when they see your gift.', 'Turite prigimtinių talentų, kurių galite net nepastebėti. Jums reikia laiko vienumoje „savo urve“, o kiti jus pašaukia, pamatę jūsų dovaną.'),
  3: B('You learn by trying, failing and trying again. Mistakes are not failures but your research method — you discover what works.', 'Mokotės bandydami, klysdami ir vėl bandydami. Klaidos — ne nesėkmės, o jūsų tyrimo metodas; atrandate, kas veikia.'),
  4: B('Your opportunities come through people you know. Friendships and networks are your foundation; you influence those close to you.', 'Galimybės ateina per pažįstamus žmones. Draugystės ir ryšių tinklas — jūsų pamatas; darote įtaką artimiesiems.'),
  5: B('People project expectations onto you — they see you as someone who can solve their problems. Offer practical solutions, but protect your reputation.', 'Žmonės projektuoja į jus lūkesčius — mato jus kaip galintį išspręsti jų problemas. Siūlykite praktiškus sprendimus, bet saugokite savo reputaciją.'),
  6: B('Your life has three phases: until ~30 you experiment, ~30–50 you step back and observe, after ~50 you become a wise role model.', 'Jūsų gyvenimas turi tris etapus: iki ~30 m. eksperimentuojate, ~30–50 m. atsitraukiate ir stebite, po ~50 m. tampate išmintingu pavyzdžiu.'),
}
