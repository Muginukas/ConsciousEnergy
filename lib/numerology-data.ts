import type { Bi, BiList } from './zodiac'
import type { CategorySlug } from './types'

export interface NumberMeaning {
  title: Bi
  keywords: Bi
  essence: Bi
  feel: Bi
  gifts: BiList
  shadow: BiList
  love: Bi
  work: Bi
  tip: Bi
  color: { name: Bi; hex: string }
  planet: Bi
  chakra: { category: CategorySlug; slug: string; name: Bi }
}

const B = (en: string, lt: string): Bi => ({ en, lt })
const L = (en: string[], lt: string[]): BiList => ({ en, lt })

export const NUMBERS: Record<number, NumberMeaning> = {
  1: {
    title: B('The Leader', 'Lyderis'),
    keywords: B('Independence · Will · Beginnings', 'Nepriklausomybė · Valia · Pradžios'),
    essence: B(
      'The vibration of the first spark. Number 1 is pure initiative — the energy of standing on your own feet, starting something new and leading the way.',
      'Pirmosios kibirkšties vibracija. Skaičius 1 — gryna iniciatyva: energija stovėti ant savų kojų, pradėti nauja ir rodyti kelią.'
    ),
    feel: B(
      'Said aloud, this vibration sounds strong, clear and decisive. People sense confidence and expect you to take the lead.',
      'Ištarta ši vibracija skamba stipriai, aiškiai ir ryžtingai. Žmonės jaučia pasitikėjimą ir tikisi, kad imsitės vadovauti.'
    ),
    gifts: L(['Courage and initiative', 'Original ideas', 'Natural leadership'], ['Drąsa ir iniciatyva', 'Originalios idėjos', 'Prigimtinė lyderystė']),
    shadow: L(['Stubbornness and pride', 'Impatience with others', 'Loneliness from doing everything alone'], ['Užsispyrimas ir išdidumas', 'Nekantrumas kitiems', 'Vienatvė, nes viską darote vieni']),
    love: B('You need a partner who respects your independence and doesn’t try to control you.', 'Jums reikia partnerio, kuris gerbia jūsų nepriklausomybę ir nebando kontroliuoti.'),
    work: B('Entrepreneur, manager, pioneer, inventor — anywhere you can lead and start things.', 'Verslininkas, vadovas, pradininkas, išradėjas — visur, kur galite vadovauti ir pradėti.'),
    tip: B('Lead, but let others help you — true strength includes asking for support.', 'Vadovaukite, bet leiskite kitiems padėti — tikra stiprybė apima ir pagalbos prašymą.'),
    color: { name: B('Red', 'Raudona'), hex: '#c0392b' },
    planet: B('Sun', 'Saulė'),
    chakra: { category: 'chakras', slug: 'manipura-solar-plexus', name: B('Solar plexus', 'Saulės rezginio') },
  },
  2: {
    title: B('The Peacemaker', 'Taikdarys'),
    keywords: B('Harmony · Sensitivity · Partnership', 'Harmonija · Jautrumas · Partnerystė'),
    essence: B(
      'The vibration of connection. Number 2 feels what others feel and brings people together — diplomacy, gentleness and cooperation.',
      'Ryšio vibracija. Skaičius 2 jaučia tai, ką jaučia kiti, ir suveda žmones — diplomatija, švelnumas ir bendradarbiavimas.'
    ),
    feel: B('This vibration feels soft, warm and calming. People feel safe and heard around you.', 'Ši vibracija jaučiasi švelni, šilta ir raminanti. Šalia jūsų žmonės jaučiasi saugūs ir išgirsti.'),
    gifts: L(['Empathy and intuition', 'Diplomacy and tact', 'Being a great partner and team player'], ['Empatija ir intuicija', 'Diplomatija ir taktas', 'Puikus partneris ir komandos narys']),
    shadow: L(['Oversensitivity', 'People-pleasing', 'Indecision and dependence on others'], ['Per didelis jautrumas', 'Noras visiems įtikti', 'Neryžtingumas ir priklausomybė nuo kitų']),
    love: B('Partnership is central to your life; you love deeply and need tenderness in return.', 'Partnerystė — jūsų gyvenimo centras; mylite giliai ir jums reikia švelnumo atgal.'),
    work: B('Mediator, counsellor, assistant, therapist, musician — work with people and harmony.', 'Tarpininkas, konsultantas, asistentas, terapeutas, muzikantas — darbas su žmonėmis ir harmonija.'),
    tip: B('Your sensitivity is a gift — protect it with clear boundaries.', 'Jūsų jautrumas — dovana; saugokite jį aiškiomis ribomis.'),
    color: { name: B('Orange', 'Oranžinė'), hex: '#d35400' },
    planet: B('Moon', 'Mėnulis'),
    chakra: { category: 'chakras', slug: 'svadhisthana-sacral', name: B('Sacral', 'Sakralinė') },
  },
  3: {
    title: B('The Creator', 'Kūrėjas'),
    keywords: B('Joy · Expression · Creativity', 'Džiaugsmas · Raiška · Kūryba'),
    essence: B(
      'The vibration of self-expression. Number 3 brings joy, words, art and optimism — it wants to create and to share.',
      'Saviraiškos vibracija. Skaičius 3 neša džiaugsmą, žodžius, meną ir optimizmą — jis nori kurti ir dalintis.'
    ),
    feel: B('This vibration sounds bright, playful and sociable. People smile and open up around you.', 'Ši vibracija skamba šviesiai, žaismingai ir draugiškai. Žmonės šalia jūsų šypsosi ir atsiveria.'),
    gifts: L(['Creativity and imagination', 'Charm and humour', 'A gift with words'], ['Kūrybiškumas ir vaizduotė', 'Žavesys ir humoras', 'Žodžio dovana']),
    shadow: L(['Scattering energy in many directions', 'Superficiality', 'Mood swings and self-doubt'], ['Energijos išbarstymas į daug pusių', 'Paviršutiniškumas', 'Nuotaikų kaita ir abejonės savimi']),
    love: B('You need fun, flirtation and communication; boredom kills your love.', 'Jums reikia linksmybių, flirto ir bendravimo; nuobodulys žudo jūsų meilę.'),
    work: B('Artist, writer, actor, speaker, designer, marketer — anything creative and expressive.', 'Menininkas, rašytojas, aktorius, pranešėjas, dizaineris, rinkodaros specialistas — viskas, kas kūrybiška.'),
    tip: B('Finish what you start — one completed creation outweighs ten beginnings.', 'Užbaikite, ką pradėjote — vienas užbaigtas kūrinys vertesnis už dešimt pradžių.'),
    color: { name: B('Yellow', 'Geltona'), hex: '#d4ac0d' },
    planet: B('Jupiter', 'Jupiteris'),
    chakra: { category: 'chakras', slug: 'vishuddha-throat', name: B('Throat', 'Gerklės') },
  },
  4: {
    title: B('The Builder', 'Statytojas'),
    keywords: B('Stability · Work · Order', 'Stabilumas · Darbas · Tvarka'),
    essence: B(
      'The vibration of the foundation. Number 4 builds step by step — order, reliability, hard work and loyalty.',
      'Pamato vibracija. Skaičius 4 kuria žingsnis po žingsnio — tvarka, patikimumas, darbštumas ir ištikimybė.'
    ),
    feel: B('This vibration feels solid, grounded and trustworthy. People rely on you.', 'Ši vibracija jaučiasi tvirta, įsižeminusi ir patikima. Žmonės jumis pasikliauja.'),
    gifts: L(['Discipline and patience', 'Practical skills', 'Loyalty and honesty'], ['Disciplina ir kantrybė', 'Praktiniai įgūdžiai', 'Ištikimybė ir sąžiningumas']),
    shadow: L(['Rigidity and stubbornness', 'Workaholism', 'Fear of change'], ['Nelankstumas ir užsispyrimas', 'Darboholizmas', 'Pokyčių baimė']),
    love: B('You love loyally and steadily; security and trust matter more than romance.', 'Mylite ištikimai ir pastoviai; saugumas ir pasitikėjimas svarbesni už romantiką.'),
    work: B('Engineer, builder, accountant, organiser, craftsperson — anything requiring structure.', 'Inžinierius, statybininkas, buhalteris, organizatorius, meistras — visa, kam reikia struktūros.'),
    tip: B('Leave space for play and surprise — structure serves life, not the other way round.', 'Palikite vietos žaidimui ir staigmenoms — struktūra tarnauja gyvenimui, o ne atvirkščiai.'),
    color: { name: B('Green', 'Žalia'), hex: '#1e8449' },
    planet: B('Uranus', 'Uranas'),
    chakra: { category: 'chakras', slug: 'muladhara-root', name: B('Root', 'Šaknies') },
  },
  5: {
    title: B('The Adventurer', 'Nuotykių ieškotojas'),
    keywords: B('Freedom · Change · Senses', 'Laisvė · Pokyčiai · Pojūčiai'),
    essence: B(
      'The vibration of movement. Number 5 loves freedom, travel, variety and the experiences of the senses — life as an adventure.',
      'Judėjimo vibracija. Skaičius 5 myli laisvę, keliones, įvairovę ir pojūčių patirtis — gyvenimas kaip nuotykis.'
    ),
    feel: B('This vibration sounds lively, magnetic and exciting. People feel energised around you.', 'Ši vibracija skamba gyvai, magnetiškai ir jaudinančiai. Šalia jūsų žmonės pasikrauna energijos.'),
    gifts: L(['Adaptability', 'Curiosity and quick learning', 'Charisma and persuasion'], ['Prisitaikymas', 'Smalsumas ir greitas mokymasis', 'Charizma ir įtikinimas']),
    shadow: L(['Restlessness', 'Excess and impulsiveness', 'Fear of commitment'], ['Nenustygimas', 'Perteklius ir impulsyvumas', 'Įsipareigojimų baimė']),
    love: B('You need excitement and freedom in love; a partner should be a fellow adventurer.', 'Meilėje jums reikia jaudulio ir laisvės; partneris turi būti nuotykių bendražygis.'),
    work: B('Travel, sales, media, marketing, journalism, freelancing — anything with variety.', 'Kelionės, pardavimai, žiniasklaida, rinkodara, žurnalistika, laisvas darbas — visa, kas įvairu.'),
    tip: B('True freedom comes with inner discipline — choose what you commit to.', 'Tikra laisvė ateina su vidine disciplina — rinkitės, kam įsipareigojate.'),
    color: { name: B('Turquoise', 'Turkio'), hex: '#17a589' },
    planet: B('Mercury', 'Merkurijus'),
    chakra: { category: 'chakras', slug: 'svadhisthana-sacral', name: B('Sacral', 'Sakralinė') },
  },
  6: {
    title: B('The Nurturer', 'Globėjas'),
    keywords: B('Love · Family · Responsibility', 'Meilė · Šeima · Atsakomybė'),
    essence: B(
      'The vibration of the heart. Number 6 cares for family, home and community — love, beauty, harmony and service.',
      'Širdies vibracija. Skaičius 6 rūpinasi šeima, namais ir bendruomene — meilė, grožis, harmonija ir tarnystė.'
    ),
    feel: B('This vibration feels loving, protective and warm — like coming home.', 'Ši vibracija jaučiasi mylinti, globojanti ir šilta — tarsi grįžtumėte namo.'),
    gifts: L(['Compassion and care', 'Sense of beauty and harmony', 'Responsibility'], ['Užuojauta ir rūpestis', 'Grožio ir harmonijos jausmas', 'Atsakingumas']),
    shadow: L(['Self-sacrifice', 'Controlling “for your own good”', 'Perfectionism at home'], ['Savęs aukojimas', 'Kontrolė „dėl jūsų pačių gerovės“', 'Perfekcionizmas namuose']),
    love: B('You are devoted and family-oriented; you love to care, but must also receive.', 'Esate atsidavęs ir orientuotas į šeimą; mylite rūpintis, bet turite ir priimti.'),
    work: B('Teacher, healer, doctor, designer, social worker — anything that cares or beautifies.', 'Mokytojas, gydytojas, dizaineris, socialinis darbuotojas — visa, kas rūpinasi ar puošia.'),
    tip: B('Care for yourself as lovingly as you care for others.', 'Rūpinkitės savimi taip pat švelniai, kaip ir kitais.'),
    color: { name: B('Indigo / rose', 'Indigo / rožinė'), hex: '#5b2c6f' },
    planet: B('Venus', 'Venera'),
    chakra: { category: 'chakras', slug: 'anahata-heart', name: B('Heart', 'Širdies') },
  },
  7: {
    title: B('The Seeker', 'Ieškotojas'),
    keywords: B('Wisdom · Introspection · Spirituality', 'Išmintis · Savistaba · Dvasingumas'),
    essence: B(
      'The vibration of inner truth. Number 7 searches for deep knowledge, meaning and spiritual understanding — the mystic and the thinker.',
      'Vidinės tiesos vibracija. Skaičius 7 ieško gilių žinių, prasmės ir dvasinio supratimo — mistikas ir mąstytojas.'
    ),
    feel: B('This vibration feels quiet, deep and a little mysterious. People sense wisdom behind your silence.', 'Ši vibracija jaučiasi tyli, gili ir šiek tiek paslaptinga. Žmonės už jūsų tylos jaučia išmintį.'),
    gifts: L(['Analytical mind and intuition', 'Depth and wisdom', 'Spiritual insight'], ['Analitinis protas ir intuicija', 'Gelmė ir išmintis', 'Dvasinė įžvalga']),
    shadow: L(['Isolation and distance', 'Scepticism and distrust', 'Overthinking'], ['Užsidarymas ir atstumas', 'Skepticizmas ir nepasitikėjimas', 'Per didelis mąstymas']),
    love: B('You need a partner who respects your need for solitude and can talk about deep things.', 'Jums reikia partnerio, kuris gerbia vienatvės poreikį ir gali kalbėti apie gilius dalykus.'),
    work: B('Researcher, scientist, analyst, philosopher, spiritual teacher, writer.', 'Tyrėjas, mokslininkas, analitikas, filosofas, dvasinis mokytojas, rašytojas.'),
    tip: B('Meditation is your home — but share what you discover; wisdom grows when given.', 'Meditacija — jūsų namai, bet dalinkitės tuo, ką atrandate; išmintis auga dovanojama.'),
    color: { name: B('Violet', 'Violetinė'), hex: '#7d3c98' },
    planet: B('Neptune', 'Neptūnas'),
    chakra: { category: 'chakras', slug: 'ajna-third-eye', name: B('Third eye', 'Trečiosios akies') },
  },
  8: {
    title: B('The Achiever', 'Valdovas'),
    keywords: B('Power · Abundance · Success', 'Galia · Gausa · Sėkmė'),
    essence: B(
      'The vibration of material mastery. Number 8 is about power, money, authority and manifesting results in the physical world.',
      'Materialios meistrystės vibracija. Skaičius 8 — apie galią, pinigus, autoritetą ir rezultatų kūrimą fiziniame pasaulyje.'
    ),
    feel: B('This vibration sounds powerful, ambitious and authoritative. People take you seriously.', 'Ši vibracija skamba galingai, ambicingai ir autoritetingai. Žmonės jus vertina rimtai.'),
    gifts: L(['Business sense and organisation', 'Determination and resilience', 'Ability to manifest abundance'], ['Verslo nuojauta ir organizuotumas', 'Ryžtas ir atsparumas', 'Gebėjimas kurti gausą']),
    shadow: L(['Materialism', 'Need for control', 'Workaholism and stress'], ['Materializmas', 'Kontrolės poreikis', 'Darboholizmas ir stresas']),
    love: B('You need a strong, equal partner; show tenderness, not only provision.', 'Jums reikia stipraus, lygiaverčio partnerio; rodykite švelnumą, ne tik aprūpinimą.'),
    work: B('Business owner, executive, finance, law, real estate — leading and building wealth.', 'Verslo savininkas, vadovas, finansai, teisė, nekilnojamas turtas — vadovavimas ir turto kūrimas.'),
    tip: B('Use power to serve — abundance multiplies when it flows to others.', 'Naudokite galią tarnauti — gausa dauginasi, kai teka kitiems.'),
    color: { name: B('Rose / dark gold', 'Rožinė / tamsus auksas'), hex: '#a04000' },
    planet: B('Saturn', 'Saturnas'),
    chakra: { category: 'chakras', slug: 'manipura-solar-plexus', name: B('Solar plexus', 'Saulės rezginio') },
  },
  9: {
    title: B('The Humanitarian', 'Humanistas'),
    keywords: B('Compassion · Completion · Wisdom', 'Užuojauta · Užbaigimas · Išmintis'),
    essence: B(
      'The vibration of universal love. Number 9 holds all the numbers before it — it serves humanity, forgives and lets go.',
      'Visuotinės meilės vibracija. Skaičius 9 talpina visus ankstesnius skaičius — tarnauja žmonijai, atleidžia ir paleidžia.'
    ),
    feel: B('This vibration feels generous, wise and old-souled. People feel accepted by you.', 'Ši vibracija jaučiasi dosni, išmintinga, tarsi „sena siela“. Žmonės jaučiasi jūsų priimti.'),
    gifts: L(['Compassion and generosity', 'Artistic and spiritual talent', 'Broad vision'], ['Užuojauta ir dosnumas', 'Meniškas ir dvasinis talentas', 'Platus požiūris']),
    shadow: L(['Martyrdom', 'Difficulty letting go of the past', 'Disappointment with people'], ['Kankinio vaidmuo', 'Sunku paleisti praeitį', 'Nusivylimas žmonėmis']),
    love: B('You love unconditionally, but must learn to receive and not only to save.', 'Mylite besąlygiškai, bet turite mokytis priimti, o ne tik gelbėti.'),
    work: B('Healer, artist, teacher, charity, international work — serving the greater good.', 'Gydytojas, menininkas, mokytojas, labdara, tarptautinis darbas — tarnystė didesniam gėriui.'),
    tip: B('Let go gracefully — every ending makes room for something new.', 'Paleiskite grakščiai — kiekviena pabaiga atveria vietą naujam.'),
    color: { name: B('Gold', 'Auksinė'), hex: '#b7950b' },
    planet: B('Mars', 'Marsas'),
    chakra: { category: 'chakras', slug: 'sahasrara-crown', name: B('Crown', 'Vainiko') },
  },
  11: {
    title: B('The Illuminator (master number)', 'Šviesos nešėjas (meistriškas skaičius)'),
    keywords: B('Intuition · Inspiration · Spiritual light', 'Intuicija · Įkvėpimas · Dvasinė šviesa'),
    essence: B(
      'A master vibration — a higher octave of 2. Number 11 carries strong intuition, spiritual sensitivity and the ability to inspire others.',
      'Meistriška vibracija — aukštesnė skaičiaus 2 oktava. Skaičius 11 neša stiprią intuiciją, dvasinį jautrumą ir gebėjimą įkvėpti kitus.'
    ),
    feel: B('This vibration feels electric, inspiring and highly sensitive — people sense something special.', 'Ši vibracija jaučiasi elektriška, įkvepianti ir labai jautri — žmonės jaučia kažką ypatingo.'),
    gifts: L(['Powerful intuition', 'Inspiring others', 'Spiritual and artistic vision'], ['Galinga intuicija', 'Kitų įkvėpimas', 'Dvasinė ir meninė vizija']),
    shadow: L(['Nervous tension and anxiety', 'Feeling different or misunderstood', 'Self-doubt'], ['Nervinė įtampa ir nerimas', 'Jausmas, kad esate kitoks ar nesuprastas', 'Abejonės savimi']),
    love: B('You need a soul-level, spiritual connection and a partner who grounds you.', 'Jums reikia sielos lygmens, dvasinio ryšio ir partnerio, kuris jus įžemina.'),
    work: B('Spiritual teacher, healer, artist, counsellor, inspirational speaker.', 'Dvasinis mokytojas, gydytojas, menininkas, konsultantas, įkvepiantis kalbėtojas.'),
    tip: B('Ground your sensitivity daily (nature, breath, body) — then your light shines steadily.', 'Kasdien įžeminkite jautrumą (gamta, kvėpavimas, kūnas) — tada jūsų šviesa šviečia pastoviai.'),
    color: { name: B('Silver / white', 'Sidabrinė / balta'), hex: '#7f8c8d' },
    planet: B('Moon & Uranus', 'Mėnulis ir Uranas'),
    chakra: { category: 'chakras', slug: 'ajna-third-eye', name: B('Third eye', 'Trečiosios akies') },
  },
  22: {
    title: B('The Master Builder (master number)', 'Meistras statytojas (meistriškas skaičius)'),
    keywords: B('Vision · Manifestation · Legacy', 'Vizija · Įgyvendinimas · Palikimas'),
    essence: B(
      'A master vibration — a higher octave of 4. Number 22 can turn big dreams into real structures that serve many people.',
      'Meistriška vibracija — aukštesnė skaičiaus 4 oktava. Skaičius 22 gali didžiules svajones paversti realiomis struktūromis, tarnaujančiomis daugeliui.'
    ),
    feel: B('This vibration feels powerful, grounded and visionary at once.', 'Ši vibracija jaučiasi vienu metu galinga, įsižeminusi ir vizionieriška.'),
    gifts: L(['Big vision with practical skill', 'Leadership of large projects', 'Building a lasting legacy'], ['Didelė vizija su praktiniais įgūdžiais', 'Didelių projektų vadovavimas', 'Ilgalaikio palikimo kūrimas']),
    shadow: L(['Enormous pressure on yourself', 'Fear of failure', 'Control and overwork'], ['Didžiulis spaudimas sau', 'Nesėkmės baimė', 'Kontrolė ir persidirbimas']),
    love: B('You need a supportive partner who shares your long-term vision.', 'Jums reikia palaikančio partnerio, kuris dalijasi jūsų ilgalaike vizija.'),
    work: B('Architect, founder, large-scale organiser, leader of social projects.', 'Architektas, įkūrėjas, didelio masto organizatorius, socialinių projektų lyderis.'),
    tip: B('Build one step at a time — the master builder also rests.', 'Statykite po vieną žingsnį — meistras statytojas taip pat ilsisi.'),
    color: { name: B('Coral / gold-green', 'Koralų / auksiškai žalia'), hex: '#ca6f1e' },
    planet: B('Uranus & Saturn', 'Uranas ir Saturnas'),
    chakra: { category: 'chakras', slug: 'muladhara-root', name: B('Root', 'Šaknies') },
  },
  33: {
    title: B('The Master Teacher (master number)', 'Meistras mokytojas (meistriškas skaičius)'),
    keywords: B('Unconditional love · Healing · Service', 'Besąlyginė meilė · Gydymas · Tarnystė'),
    essence: B(
      'The rarest master vibration — a higher octave of 6. Number 33 carries the energy of selfless love, healing and spiritual teaching.',
      'Rečiausia meistriška vibracija — aukštesnė skaičiaus 6 oktava. Skaičius 33 neša nesavanaudiškos meilės, gydymo ir dvasinio mokymo energiją.'
    ),
    feel: B('This vibration feels deeply loving, nurturing and uplifting.', 'Ši vibracija jaučiasi labai mylinti, globojanti ir pakylėjanti.'),
    gifts: L(['Healing presence', 'Compassionate teaching', 'Uplifting others'], ['Gydantis buvimas', 'Užjaučiantis mokymas', 'Kitų pakylėjimas']),
    shadow: L(['Carrying everyone’s burdens', 'Self-neglect', 'Feeling overwhelmed by responsibility'], ['Visų naštų nešimas', 'Savęs apleidimas', 'Atsakomybės prislėgimas']),
    love: B('You love with great devotion; choose a partner who also cares for you.', 'Mylite su dideliu atsidavimu; rinkitės partnerį, kuris rūpinasi ir jumis.'),
    work: B('Healer, teacher, therapist, spiritual guide, humanitarian.', 'Gydytojas, mokytojas, terapeutas, dvasinis vedlys, humanistas.'),
    tip: B('You cannot pour from an empty cup — fill yourself first.', 'Iš tuščio indo nepripilsi — pirmiausia pripildykite save.'),
    color: { name: B('Deep turquoise', 'Gilus turkis'), hex: '#117a65' },
    planet: B('Venus & Neptune', 'Venera ir Neptūnas'),
    chakra: { category: 'chakras', slug: 'anahata-heart', name: B('Heart', 'Širdies') },
  },
}

/** What each position in the reading means. */
export const POSITIONS = {
  expression: {
    name: B('Name vibration (Expression)', 'Vardo vibracija (Išraiška)'),
    explain: B(
      'The sum of all letters in your full name. It is the overall energy your name carries — your talents and how you express yourself in the world.',
      'Visų viso vardo raidžių suma. Tai bendra energija, kurią neša jūsų vardas — jūsų talentai ir kaip reiškiatės pasaulyje.'
    ),
  },
  firstName: {
    name: B('First name vibration', 'Vardo vibracija'),
    explain: B('Your first name is the most personal sound — how you feel when people call you.', 'Vardas — asmeniškiausias garsas: kaip jaučiatės, kai jus šaukia vardu.'),
  },
  lastName: {
    name: B('Surname vibration', 'Pavardės vibracija'),
    explain: B('Your surname carries the energy of your family line and how you appear in society and work.', 'Pavardė neša jūsų giminės energiją ir tai, kaip atrodote visuomenėje bei darbe.'),
  },
  soul: {
    name: B('Soul urge (vowels)', 'Sielos troškimas (balsės)'),
    explain: B('Calculated from the vowels — your heart’s deepest desire, what truly motivates you inside.', 'Skaičiuojama iš balsių — giliausias širdies troškimas, kas iš tiesų jus motyvuoja viduje.'),
  },
  personality: {
    name: B('Outer personality (consonants)', 'Išorinė asmenybė (priebalsės)'),
    explain: B('Calculated from the consonants — the first impression you make, how others see you.', 'Skaičiuojama iš priebalsių — pirmas įspūdis, kurį paliekate, kaip jus mato kiti.'),
  },
  lifePath: {
    name: B('Life path (birth date)', 'Gyvenimo kelias (gimimo data)'),
    explain: B('From your birth date — the main lesson and direction of your life. It cannot be changed, while your name can.', 'Iš gimimo datos — pagrindinė gyvenimo pamoka ir kryptis. Jos pakeisti negalima, o vardą — galima.'),
  },
  maturity: {
    name: B('Maturity number', 'Brandos skaičius'),
    explain: B('Life path + name. The energy that grows stronger in the second half of life.', 'Gyvenimo kelias + vardas. Energija, kuri stiprėja antroje gyvenimo pusėje.'),
  },
  cornerstone: {
    name: B('Cornerstone (first letter)', 'Kertinis akmuo (pirmoji raidė)'),
    explain: B('The first letter of your name shows how you approach new situations and opportunities.', 'Pirmoji vardo raidė rodo, kaip pasitinkate naujas situacijas ir galimybes.'),
  },
  hiddenPassion: {
    name: B('Hidden passion', 'Slapta aistra'),
    explain: B('The number that appears most often in your name — a strong talent or drive that keeps showing up.', 'Dažniausiai varde pasikartojantis skaičius — stiprus talentas ar aistra, kuri vis pasireiškia.'),
  },
  karmic: {
    name: B('Karmic lessons (missing numbers)', 'Karminės pamokos (trūkstami skaičiai)'),
    explain: B('Numbers that don’t appear in your name — qualities you are learning to develop in this life.', 'Skaičiai, kurių nėra jūsų varde — savybės, kurias mokotės ugdyti šiame gyvenime.'),
  },
}

/** Lesson when a number is missing from the name. */
export const KARMIC: Record<number, Bi> = {
  1: B('Learning self-confidence, independence and standing up for yourself.', 'Mokotės pasitikėjimo savimi, nepriklausomybės ir gebėjimo apginti save.'),
  2: B('Learning patience, cooperation and sensitivity to others.', 'Mokotės kantrybės, bendradarbiavimo ir jautrumo kitiems.'),
  3: B('Learning to express yourself, share feelings and enjoy life.', 'Mokotės reikšti save, dalintis jausmais ir džiaugtis gyvenimu.'),
  4: B('Learning discipline, order and finishing what you start.', 'Mokotės disciplinos, tvarkos ir užbaigti tai, ką pradedate.'),
  5: B('Learning to embrace change, take risks and trust life.', 'Mokotės priimti pokyčius, rizikuoti ir pasitikėti gyvenimu.'),
  6: B('Learning responsibility, commitment and caring for others.', 'Mokotės atsakomybės, įsipareigojimo ir rūpinimosi kitais.'),
  7: B('Learning to trust your intuition and look within.', 'Mokotės pasitikėti intuicija ir žvelgti į vidų.'),
  8: B('Learning to handle money, power and authority wisely.', 'Mokotės išmintingai elgtis su pinigais, galia ir autoritetu.'),
  9: B('Learning compassion, tolerance and letting go.', 'Mokotės užuojautos, tolerancijos ir paleidimo.'),
}
