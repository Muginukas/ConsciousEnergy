import type { Bi } from '../zodiac'
import type { PlanetId } from './ephemeris'

/** [house 1..12] → [en, lt] — what this planet in this house means in everyday life. */
type Rows = [string, string][]

const SUN: Rows = [
  ['You shine through your personality and appearance — people notice you, and life is about becoming yourself.', 'Spindite per asmenybę ir išvaizdą — žmonės jus pastebi, o gyvenimo tema yra tapti savimi.'],
  ['Your sense of self is tied to what you earn, own and value; building your own resources gives you confidence.', 'Jūsų savivertė susijusi su tuo, ką uždirbate, turite ir vertinate; savų išteklių kūrimas suteikia pasitikėjimo.'],
  ['You shine through words, learning and communication — writing, teaching or media may suit you.', 'Spindite per žodžius, mokymąsi ir bendravimą — jums gali tikti rašymas, mokymas ar žiniasklaida.'],
  ['Home, family and roots are the centre of your life; you find yourself by understanding where you come from.', 'Namai, šeima ir šaknys — jūsų gyvenimo centras; save atrandate suprasdami, iš kur kilote.'],
  ['You shine through creativity, play, romance and children; joy is your life force.', 'Spindite per kūrybą, žaidimą, romantiką ir vaikus; džiaugsmas yra jūsų gyvybinė jėga.'],
  ['You find meaning through useful work, daily routine and health; being of service fulfils you.', 'Prasmę randate per naudingą darbą, kasdienę rutiną ir sveikatą; tarnystė jus pripildo.'],
  ['You discover yourself through partnerships; relationships and cooperation are central to your path.', 'Save atrandate per partnerystę; santykiai ir bendradarbiavimas — jūsų kelio centras.'],
  ['Your life is about depth, transformation and intimacy; you are drawn to psychology and life’s mysteries.', 'Jūsų gyvenimas — apie gelmę, transformaciją ir artumą; jus traukia psichologija ir gyvenimo paslaptys.'],
  ['You shine through travel, study, philosophy and teaching; you are a seeker of meaning.', 'Spindite per keliones, studijas, filosofiją ir mokymą; esate prasmės ieškotojas.'],
  ['Career and public role are central; you are meant to be visible and achieve something in the world.', 'Karjera ir viešas vaidmuo yra centre; jums skirta būti matomam ir kažką pasiekti pasaulyje.'],
  ['You shine in groups, friendships and communities working for a shared future.', 'Spindite grupėse, draugystėse ir bendruomenėse, kuriančiose bendrą ateitį.'],
  ['You shine behind the scenes — through spirituality, solitude, helping or creative inner work.', 'Spindite užkulisiuose — per dvasingumą, vienatvę, pagalbą kitiems ar kūrybinį vidinį darbą.'],
]

const MOON: Rows = [
  ['Your feelings are visible to everyone; you are sensitive, caring and your mood affects how you appear.', 'Jūsų jausmai matomi visiems; esate jautrus, rūpestingas, nuotaika veikia, kaip atrodote.'],
  ['You feel safe when you have money and possessions; emotional and financial security go together.', 'Saugiai jaučiatės turėdami pinigų ir nuosavybės; emocinis ir finansinis saugumas eina kartu.'],
  ['You need to talk about feelings; siblings, neighbours and short trips matter emotionally.', 'Jums reikia kalbėti apie jausmus; broliai, seserys, kaimynai ir trumpos kelionės emociškai svarbūs.'],
  ['The Moon at home: family, home and roots are essential to your emotional well-being.', 'Mėnulis namuose: šeima, namai ir šaknys būtini jūsų emocinei gerovei.'],
  ['You feel alive through creativity, romance, play and children.', 'Gyvas jaučiatės per kūrybą, romantiką, žaidimą ir vaikus.'],
  ['You feel safe through routine and being useful; emotions affect your health and digestion.', 'Saugiai jaučiatės per rutiną ir naudingumą; emocijos veikia sveikatą ir virškinimą.'],
  ['You need a close partner to feel emotionally complete; you are sensitive to others’ needs.', 'Kad jaustumėtės emociškai pilnas, jums reikia artimo partnerio; esate jautrus kitų poreikiams.'],
  ['Deep, intense emotions; you need intimate trust and may go through emotional transformations.', 'Gilios, intensyvios emocijos; jums reikia intymaus pasitikėjimo, išgyvenate emocines transformacijas.'],
  ['You feel at home when exploring — travel, philosophy and faith nourish your soul.', 'Kaip namie jaučiatės tyrinėdami — kelionės, filosofija ir tikėjimas maitina sielą.'],
  ['Your feelings are tied to career and reputation; you may work with the public or in caring roles.', 'Jūsų jausmai susiję su karjera ir reputacija; galite dirbti su žmonėmis ar rūpinimosi srityje.'],
  ['Friends are like family to you; you feel safe in a community.', 'Draugai jums kaip šeima; saugiai jaučiatės bendruomenėje.'],
  ['You need solitude to recharge; your emotional life is private, intuitive and spiritual.', 'Jums reikia vienatvės atsigauti; emocinis gyvenimas privatus, intuityvus ir dvasingas.'],
]

const MERCURY: Rows = [
  ['You come across as curious, talkative and quick-witted.', 'Atrodote smalsus, kalbus ir sąmojingas.'],
  ['You think a lot about money and can earn through ideas, words and trade.', 'Daug galvojate apie pinigus ir galite uždirbti idėjomis, žodžiais ir prekyba.'],
  ['Mercury at home: a lively mind, a gift for communication, writing and learning.', 'Merkurijus namuose: gyvas protas, dovana bendravimui, rašymui ir mokymuisi.'],
  ['You think about family and the past; you may work from home or study your roots.', 'Galvojate apie šeimą ir praeitį; galite dirbti iš namų ar tyrinėti savo šaknis.'],
  ['A playful, creative mind; you enjoy games, storytelling and creative writing.', 'Žaismingas, kūrybingas protas; mėgstate žaidimus, pasakojimus ir kūrybinį rašymą.'],
  ['A practical, analytical mind for work and health; good at organising and details.', 'Praktiškas, analitiškas protas darbui ir sveikatai; mokate organizuoti ir matyti detales.'],
  ['You think best in dialogue; partnership, negotiation and counselling suit you.', 'Geriausiai mąstote dialoge; jums tinka partnerystė, derybos ir konsultavimas.'],
  ['A detective mind drawn to psychology, research and hidden truths.', 'Detektyvo protas, traukiamas psichologijos, tyrimų ir paslėptų tiesų.'],
  ['A philosophical mind; you love foreign languages, higher education and big ideas.', 'Filosofiškas protas; mylite užsienio kalbas, aukštąjį mokslą ir dideles idėjas.'],
  ['Your career involves communication, writing, teaching or information.', 'Jūsų karjera susijusi su bendravimu, rašymu, mokymu ar informacija.'],
  ['You share ideas in groups and networks; you love brainstorming with friends.', 'Dalinatės idėjomis grupėse ir tinkluose; mėgstate generuoti idėjas su draugais.'],
  ['A private, intuitive mind; thoughts come in dreams, meditation or solitude.', 'Privatus, intuityvus protas; mintys ateina sapnuose, meditacijoje ar vienatvėje.'],
]

const VENUS: Rows = [
  ['You come across as charming, attractive and pleasant; people like you easily.', 'Atrodote žavus, patrauklus ir malonus; žmonės jus lengvai pamėgsta.'],
  ['You attract money and enjoy beautiful things; you may earn through art or beauty.', 'Pritraukiate pinigus ir mėgstate gražius daiktus; galite uždirbti per meną ar grožį.'],
  ['You speak kindly and charmingly; good relationships with siblings and neighbours.', 'Kalbate maloniai ir žaviai; geri santykiai su broliais, seserimis ir kaimynais.'],
  ['You create a beautiful, harmonious home; family life brings you joy.', 'Kuriate gražius, harmoningus namus; šeimos gyvenimas jums teikia džiaugsmo.'],
  ['Romance, art and pleasure flow easily; you love to love and to create.', 'Romantika, menas ir malonumai teka lengvai; mylite mylėti ir kurti.'],
  ['You enjoy your work and colleagues; beauty and health work may suit you.', 'Mėgstate savo darbą ir kolegas; jums gali tikti grožio ir sveikatos sritis.'],
  ['Venus at home: partnership and marriage are important and usually harmonious.', 'Venera namuose: partnerystė ir santuoka svarbios ir dažnai harmoningos.'],
  ['Deep, intense love and intimacy; you may benefit from a partner’s resources.', 'Gili, intensyvi meilė ir artumas; galite gauti naudos iš partnerio išteklių.'],
  ['You love travel, foreign cultures and may fall in love abroad or with someone different.', 'Mylite keliones, kitas kultūras, galite įsimylėti užsienyje ar kitokį žmogų.'],
  ['A career in art, beauty or diplomacy; you are well-liked publicly.', 'Karjera mene, grožio srityje ar diplomatijoje; esate mėgstamas viešai.'],
  ['You love friends and community; love may grow out of friendship.', 'Mylite draugus ir bendruomenę; meilė gali išaugti iš draugystės.'],
  ['Secret or spiritual love; you love compassionately and selflessly.', 'Slapta ar dvasinė meilė; mylite užjaučiančiai ir nesavanaudiškai.'],
]

const MARS: Rows = [
  ['You come across as energetic, sporty and direct — a natural initiator.', 'Atrodote energingas, sportiškas ir tiesus — prigimtinis iniciatorius.'],
  ['You work hard to earn money and fight for financial independence.', 'Sunkiai dirbate pinigams ir kovojate už finansinę nepriklausomybę.'],
  ['A sharp tongue and fast mind; you love debates — watch arguments with siblings.', 'Aštrus liežuvis ir greitas protas; mėgstate diskusijas — saugokitės ginčų su broliais, seserimis.'],
  ['Lots of energy at home — renovating, protecting family, but also possible family conflicts.', 'Daug energijos namuose — remontai, šeimos gynimas, bet galimi ir šeimos konfliktai.'],
  ['Passion in romance, sport and creativity; you love competition and adventure.', 'Aistra romantikoje, sporte ir kūryboje; mėgstate varžytis ir nuotykius.'],
  ['You are a hard worker; physical activity is essential for your health.', 'Esate darbštus; fizinis aktyvumas būtinas jūsų sveikatai.'],
  ['Energy through partners — passionate relationships, but also possible conflicts with them.', 'Energija per partnerius — aistringi santykiai, bet galimi ir konfliktai su jais.'],
  ['Intense sexuality and willpower; you face crises bravely.', 'Intensyvus seksualumas ir valia; drąsiai pasitinkate krizes.'],
  ['You fight for beliefs and love adventurous travel and sport abroad.', 'Kovojate už įsitikinimus, mėgstate nuotykių keliones ir sportą užsienyje.'],
  ['Strong career ambition; you want to lead and achieve.', 'Stipri karjeros ambicija; norite vadovauti ir pasiekti.'],
  ['You act with and for groups; you may lead causes or teams.', 'Veikiate su grupėmis ir dėl jų; galite vadovauti iniciatyvoms ar komandoms.'],
  ['Hidden energy and anger; you act behind the scenes — rest and spiritual practice help.', 'Paslėpta energija ir pyktis; veikiate užkulisiuose — padeda poilsis ir dvasinė praktika.'],
]

const JUPITER: Rows = [
  ['You come across as optimistic, generous and lucky.', 'Atrodote optimistiškas, dosnus ir laimingas.'],
  ['Luck with money; resources tend to grow — but so can spending.', 'Sėkmė su pinigais; ištekliai auga — bet gali augti ir išlaidos.'],
  ['Luck through learning, writing and communication.', 'Sėkmė per mokymąsi, rašymą ir bendravimą.'],
  ['A happy, generous family and possibly a big home.', 'Laiminga, dosni šeima ir galbūt dideli namai.'],
  ['Luck in creativity, romance and with children.', 'Sėkmė kūryboje, romantikoje ir su vaikais.'],
  ['Luck at work; a good relationship with colleagues and generally good health.', 'Sėkmė darbe; geri santykiai su kolegomis ir paprastai gera sveikata.'],
  ['Luck through partners; marriage can bring growth.', 'Sėkmė per partnerius; santuoka gali atnešti augimą.'],
  ['Luck through inheritance, shared resources and deep transformation.', 'Sėkmė per palikimą, bendrus išteklius ir gilią transformaciją.'],
  ['Jupiter at home: luck through travel, study, teaching and faith.', 'Jupiteris namuose: sėkmė per keliones, studijas, mokymą ir tikėjimą.'],
  ['Career success and public recognition.', 'Karjeros sėkmė ir viešas pripažinimas.'],
  ['Luck through friends, networks and communities.', 'Sėkmė per draugus, tinklus ir bendruomenes.'],
  ['A “guardian angel” — spiritual protection and inner wisdom.', 'Tarsi „angelas sargas“ — dvasinė apsauga ir vidinė išmintis.'],
]

const SATURN: Rows = [
  ['You may seem serious or reserved; you grow in confidence with age.', 'Galite atrodyti rimtas ar santūrus; su amžiumi pasitikėjimas auga.'],
  ['Money comes through hard work; lesson about self-worth and security.', 'Pinigai ateina per sunkų darbą; pamoka apie savivertę ir saugumą.'],
  ['Careful, serious thinking; you may have felt unheard as a child.', 'Kruopštus, rimtas mąstymas; vaikystėje galėjote jaustis neišgirstas.'],
  ['Responsibility toward family; home may have felt strict — you build your own stable home.', 'Atsakomybė šeimai; namai galėjo būti griežti — kuriate savo stabilius namus.'],
  ['Joy and creativity may feel blocked at first; you learn to play seriously.', 'Džiaugsmas ir kūryba iš pradžių gali būti užblokuoti; mokotės žaisti rimtai.'],
  ['A very hard worker; health needs discipline and routine.', 'Labai darbštus; sveikatai reikia disciplinos ir rutinos.'],
  ['Serious, committed relationships; you may marry later or with an older partner.', 'Rimti, įsipareigoję santykiai; galite tuoktis vėliau ar su vyresniu partneriu.'],
  ['Lessons about trust, intimacy and shared resources.', 'Pamokos apie pasitikėjimą, artumą ir bendrus išteklius.'],
  ['You build your own philosophy slowly; serious study and teaching.', 'Lėtai kuriate savo filosofiją; rimtos studijos ir mokymas.'],
  ['Career success through patience; you can reach high positions later in life.', 'Karjeros sėkmė per kantrybę; vėliau gyvenime galite pasiekti aukštų pozicijų.'],
  ['Few but loyal friends; responsibility in groups.', 'Nedaug, bet ištikimų draugų; atsakomybė grupėse.'],
  ['Hidden fears to face; solitude and spiritual discipline bring strength.', 'Paslėptos baimės, su kuriomis reikia susidurti; vienatvė ir dvasinė disciplina suteikia jėgų.'],
]

const URANUS: Rows = [
  ['You appear original and unpredictable; life brings sudden changes of direction.', 'Atrodote originalus ir nenuspėjamas; gyvenimas atneša staigių krypties pokyčių.'],
  ['Income may be irregular; you earn through innovation or freelance work.', 'Pajamos gali būti nereguliarios; uždirbate per inovacijas ar laisvai samdomą darbą.'],
  ['An original mind; you think in flashes of insight.', 'Originalus protas; mąstote įžvalgų blyksniais.'],
  ['An unusual home or family; you may move often.', 'Neįprasti namai ar šeima; galite dažnai kraustytis.'],
  ['Original creativity; unexpected romances.', 'Originali kūryba; netikėti romanai.'],
  ['You need freedom at work; technology or flexible schedules suit you.', 'Darbe jums reikia laisvės; tinka technologijos ar lankstus grafikas.'],
  ['You need freedom in relationships; partners may be unusual.', 'Santykiuose reikia laisvės; partneriai gali būti neįprasti.'],
  ['Sudden transformations; interest in the occult or psychology.', 'Staigios transformacijos; domėjimasis okultizmu ar psichologija.'],
  ['Unconventional beliefs; unexpected travels.', 'Netradiciniai įsitikinimai; netikėtos kelionės.'],
  ['An unusual career path with sudden changes.', 'Neįprastas karjeros kelias su staigiais pokyčiais.'],
  ['Unusual friends; you belong to progressive groups.', 'Neįprasti draugai; priklausote pažangioms grupėms.'],
  ['Sudden spiritual insights; a hidden rebel.', 'Staigios dvasinės įžvalgos; paslėptas maištininkas.'],
]

const NEPTUNE: Rows = [
  ['You appear dreamy, artistic and mysterious; people project their dreams onto you.', 'Atrodote svajingas, meniškas ir paslaptingas; žmonės projektuoja į jus savo svajones.'],
  ['Money can be confusing — be careful, but you can earn through art or healing.', 'Pinigai gali būti painūs — būkite atsargus, bet galite uždirbti per meną ar gydymą.'],
  ['Poetic, intuitive thinking; check facts carefully.', 'Poetiškas, intuityvus mąstymas; atidžiai tikrinkite faktus.'],
  ['An idealised or confusing family; you seek a spiritual home.', 'Idealizuota ar paini šeima; ieškote dvasinių namų.'],
  ['Romantic and artistic creativity — music, film, dance.', 'Romantiška ir meniška kūryba — muzika, kinas, šokis.'],
  ['Healing or caring work; sensitive health — gentle methods suit you.', 'Gydymo ar rūpinimosi darbas; jautri sveikata — tinka švelnūs metodai.'],
  ['You idealise partners; spiritual love — see people as they really are.', 'Idealizuojate partnerius; dvasinė meilė — matykite žmones tokius, kokie jie yra.'],
  ['Strong intuition and psychic sensitivity; deep spiritual experiences.', 'Stipri intuicija ir ekstrasensinis jautrumas; gilios dvasinės patirtys.'],
  ['Spiritual faith and mystical travel.', 'Dvasinis tikėjimas ir mistinės kelionės.'],
  ['Career in art, healing or spirituality; direction may feel unclear at first.', 'Karjera mene, gydyme ar dvasingume; kryptis iš pradžių gali atrodyti neaiški.'],
  ['Idealistic friendships and spiritual communities.', 'Idealistinės draugystės ir dvasinės bendruomenės.'],
  ['Neptune at home: deep spirituality, meditation and compassion.', 'Neptūnas namuose: gilus dvasingumas, meditacija ir užuojauta.'],
]

const PLUTO: Rows = [
  ['Intense, magnetic presence; life brings deep personal transformations.', 'Intensyvus, magnetiškas buvimas; gyvenimas atneša gilių asmeninių transformacijų.'],
  ['Transformation through money; power through resources.', 'Transformacija per pinigus; galia per išteklius.'],
  ['A penetrating mind; words can transform.', 'Skvarbus protas; žodžiai gali transformuoti.'],
  ['Deep family transformations; strong roots.', 'Gilios šeimos transformacijos; stiprios šaknys.'],
  ['Intense creativity and passionate romance.', 'Intensyvi kūryba ir aistringa romantika.'],
  ['Transformation through work and health; healing ability.', 'Transformacija per darbą ir sveikatą; gebėjimas gydyti.'],
  ['Intense, transforming relationships.', 'Intensyvūs, transformuojantys santykiai.'],
  ['Pluto at home: deep psychology, sexuality and rebirth.', 'Plutonas namuose: gili psichologija, seksualumas ir atgimimas.'],
  ['Transformation through beliefs and travel.', 'Transformacija per tikėjimą ir keliones.'],
  ['Power in career; you can transform organisations.', 'Galia karjeroje; galite transformuoti organizacijas.'],
  ['Transformation through groups and friends.', 'Transformacija per grupes ir draugus.'],
  ['Hidden power; deep inner and spiritual work.', 'Paslėpta galia; gilus vidinis ir dvasinis darbas.'],
]

const NODE: Rows = [
  ['Your soul grows by developing independence and courage to be yourself (letting go of over-reliance on partners).', 'Siela auga ugdydama nepriklausomybę ir drąsą būti savimi (paleidžiant per didelę priklausomybę nuo partnerių).'],
  ['Your soul grows by building your own values and stability (letting go of dependence on others’ resources).', 'Siela auga kurdama savas vertybes ir stabilumą (paleidžiant priklausomybę nuo kitų išteklių).'],
  ['Your soul grows through curiosity, listening and everyday communication (less preaching, more asking).', 'Siela auga per smalsumą, klausymąsi ir kasdienį bendravimą (mažiau pamokslų, daugiau klausimų).'],
  ['Your soul grows by nurturing home, family and inner life (less focus on status).', 'Siela auga puoselėdama namus, šeimą ir vidinį gyvenimą (mažiau dėmesio statusui).'],
  ['Your soul grows through creativity, joy and following your heart (less hiding in the group).', 'Siela auga per kūrybą, džiaugsmą ir širdies sekimą (mažiau slėpimosi grupėje).'],
  ['Your soul grows through practical service, routine and health (less escapism).', 'Siela auga per praktišką tarnystę, rutiną ir sveikatą (mažiau bėgimo nuo realybės).'],
  ['Your soul grows through partnership and cooperation (less “me first”).', 'Siela auga per partnerystę ir bendradarbiavimą (mažiau „aš pirmas“).'],
  ['Your soul grows through intimacy, sharing and transformation (less clinging to comfort).', 'Siela auga per artumą, dalijimąsi ir transformaciją (mažiau laikymosi komforto).'],
  ['Your soul grows through faith, travel and seeking meaning (less scattered information).', 'Siela auga per tikėjimą, keliones ir prasmės paiešką (mažiau išsibarsčiusios informacijos).'],
  ['Your soul grows through career, responsibility and public contribution (less hiding at home).', 'Siela auga per karjerą, atsakomybę ir viešą indėlį (mažiau slėpimosi namuose).'],
  ['Your soul grows through community, friendship and shared ideals (less need for personal spotlight).', 'Siela auga per bendruomenę, draugystę ir bendrus idealus (mažiau asmeninio dėmesio poreikio).'],
  ['Your soul grows through spirituality, surrender and compassion (less control and perfectionism).', 'Siela auga per dvasingumą, atsidavimą ir užuojautą (mažiau kontrolės ir perfekcionizmo).'],
]

const TABLE: Record<PlanetId, Rows> = {
  sun: SUN,
  moon: MOON,
  mercury: MERCURY,
  venus: VENUS,
  mars: MARS,
  jupiter: JUPITER,
  saturn: SATURN,
  uranus: URANUS,
  neptune: NEPTUNE,
  pluto: PLUTO,
  node: NODE,
}

export function planetInHouse(id: PlanetId, house: number): Bi {
  const [en, lt] = TABLE[id][house - 1]
  return { en, lt }
}
