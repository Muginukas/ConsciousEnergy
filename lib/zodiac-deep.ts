import type { Bi, ZodiacSlug } from './zodiac'

export interface SignDeep {
  needs: Bi
  shadow: Bi
  healing: Bi
  getAlong: Bi
  affirmation: Bi
}

const D = (
  needsEn: string, needsLt: string,
  shadowEn: string, shadowLt: string,
  healingEn: string, healingLt: string,
  alongEn: string, alongLt: string,
  affEn: string, affLt: string
): SignDeep => ({
  needs: { en: needsEn, lt: needsLt },
  shadow: { en: shadowEn, lt: shadowLt },
  healing: { en: healingEn, lt: healingLt },
  getAlong: { en: alongEn, lt: alongLt },
  affirmation: { en: affEn, lt: affLt },
})

export const SIGN_DEEP: Record<ZodiacSlug, SignDeep> = {
  aries: D(
    'Freedom to act, a challenge to rise to, honest people around them and room to be first.',
    'Laisvės veikti, iššūkio, kurį galėtų įveikti, atvirų žmonių aplink ir galimybės būti pirmam.',
    'When stressed, Aries becomes impatient, aggressive or selfish — acting first and thinking later, then feeling misunderstood.',
    'Patirdamas stresą Avinas tampa nekantrus, agresyvus ar savanaudiškas — pirma veikia, paskui galvoja, o tada jaučiasi nesuprastas.',
    'Physical activity to burn off excess fire, cooling breathwork, and learning to pause for one breath before reacting.',
    'Fizinis aktyvumas pertekliniam ugniai sudeginti, vėsinantis kvėpavimas ir mokymasis prieš reaguojant padaryti vieną įkvėpimą.',
    'Be direct and honest, don’t play games, give them space to lead — and let arguments end quickly; Aries rarely holds grudges.',
    'Būkite tiesūs ir atviri, nežaiskite žaidimų, leiskite jiems vadovauti — ir leiskite ginčams greitai baigtis; Avinas retai laiko pyktį.',
    'I act with courage and listen with patience.',
    'Veikiu drąsiai ir klausausi kantriai.'
  ),
  taurus: D(
    'Stability, comfort, physical touch, good food, time in nature and the certainty that things won’t suddenly change.',
    'Stabilumo, komforto, prisilietimų, gero maisto, laiko gamtoje ir tikrumo, kad niekas staiga nepasikeis.',
    'Under stress Taurus becomes stubborn, possessive or lazy, holding on tightly to people, things or habits.',
    'Patirdamas stresą Jautis tampa užsispyręs, savininkiškas ar tingus, stipriai įsikimba į žmones, daiktus ar įpročius.',
    'Gentle movement, grounding in nature, and practising small changes so that change stops feeling threatening.',
    'Švelnus judėjimas, įsižeminimas gamtoje ir mažų pokyčių praktika, kad pokyčiai nustotų atrodyti grėsmingi.',
    'Be patient and reliable, don’t rush them, show love through touch and actions, and give them time to decide.',
    'Būkite kantrūs ir patikimi, neskubinkite, meilę rodykite prisilietimais ir darbais, duokite laiko apsispręsti.',
    'I am safe within myself, and I allow life to flow.',
    'Esu saugus savyje ir leidžiu gyvenimui tekėti.'
  ),
  gemini: D(
    'Variety, conversation, new information, mental stimulation and freedom to change their mind.',
    'Įvairovės, pokalbių, naujos informacijos, proto stimuliacijos ir laisvės keisti nuomonę.',
    'Under stress Gemini becomes scattered, nervous, superficial or inconsistent — talking a lot but avoiding real feelings.',
    'Patirdami stresą Dvyniai tampa išsiblaškę, nervingi, paviršutiniški ar nenuoseklūs — daug kalba, bet vengia tikrų jausmų.',
    'Slow breathing and meditation to quiet the mind, writing down thoughts, and finishing one thing before starting another.',
    'Lėtas kvėpavimas ir meditacija protui nuraminti, minčių užrašymas ir vieno dalyko užbaigimas prieš pradedant kitą.',
    'Keep conversations interesting, don’t try to control them, laugh together and accept that they change their mind.',
    'Palaikykite įdomius pokalbius, nebandykite jų kontroliuoti, juokitės kartu ir priimkite, kad jie keičia nuomonę.',
    'My mind is calm, and I speak from my heart.',
    'Mano protas ramus, ir aš kalbu iš širdies.'
  ),
  cancer: D(
    'Emotional safety, a cosy home, close family or chosen family, and feeling truly cared for.',
    'Emocinio saugumo, jaukių namų, artimos (ar pasirinktos) šeimos ir jausmo, kad apie juos tikrai rūpinamasi.',
    'Under stress Cancer withdraws into its shell, becomes moody, clingy or passive-aggressive, and holds on to hurt.',
    'Patirdamas stresą Vėžys užsidaro kiaute, tampa nepastovios nuotaikos, prilimpantis ar pasyviai agresyvus, laiko nuoskaudas.',
    'Self-nurturing (warm baths, cooking, rest), letting tears flow, and learning to ask for what they need directly.',
    'Rūpinimasis savimi (šilta vonia, gaminimas, poilsis), leidimas ašaroms tekėti ir mokymasis tiesiai prašyti to, ko reikia.',
    'Be gentle and sincere, remember important dates, never mock their feelings, and show you are reliable.',
    'Būkite švelnūs ir nuoširdūs, prisiminkite svarbias datas, niekada nesišaipykite iš jų jausmų ir parodykite, kad esate patikimi.',
    'I nurture myself as lovingly as I nurture others.',
    'Rūpinuosi savimi taip pat švelniai, kaip ir kitais.'
  ),
  leo: D(
    'Appreciation, recognition, creative expression, fun, and people who admire and are loyal to them.',
    'Įvertinimo, pripažinimo, kūrybinės raiškos, linksmybių ir juos žavinčių, ištikimų žmonių.',
    'Under stress Leo becomes proud, dramatic, attention-seeking or bossy, and is deeply hurt when ignored.',
    'Patirdamas stresą Liūtas tampa išdidus, dramatiškas, siekiantis dėmesio ar valdingas, ir labai įsižeidžia, kai yra ignoruojamas.',
    'Heart-opening practices, creative play just for joy, and finding self-worth that doesn’t depend on applause.',
    'Širdį atveriančios praktikos, kūrybinis žaidimas vien dėl džiaugsmo ir savivertė, nepriklausanti nuo aplodismentų.',
    'Give sincere compliments, show appreciation, celebrate them, and never embarrass them in public.',
    'Sakykite nuoširdžius komplimentus, rodykite įvertinimą, švęskite juos ir niekada nežeminkite viešai.',
    'My light shines from within, and I share it generously.',
    'Mano šviesa sklinda iš vidaus, ir aš ja dosniai dalinuosi.'
  ),
  virgo: D(
    'Order, useful work, clear plans, healthy routines and feeling that they are helping.',
    'Tvarkos, naudingo darbo, aiškių planų, sveikos rutinos ir jausmo, kad padeda.',
    'Under stress Virgo becomes anxious, overly critical (of self and others), perfectionistic and unable to relax.',
    'Patirdama stresą Mergelė tampa nerami, per daug kritiška (sau ir kitiems), perfekcionistė ir negali atsipalaiduoti.',
    'Mindfulness, gentle routines, body scan meditation, and the practice of saying “good enough is enough”.',
    'Sąmoningumas, švelni rutina, kūno skenavimo meditacija ir praktika sakyti „pakankamai gerai — pakanka“.',
    'Be reliable and on time, appreciate their help, give feedback gently and help them relax.',
    'Būkite patikimi ir punktualūs, vertinkite jų pagalbą, pastabas sakykite švelniai ir padėkite atsipalaiduoti.',
    'I am enough exactly as I am.',
    'Esu pakankama(-s) būtent tokia(-s), kokia(-s) esu.'
  ),
  libra: D(
    'Harmony, beauty, fairness, meaningful partnership and a peaceful atmosphere.',
    'Harmonijos, grožio, teisingumo, prasmingos partnerystės ir ramios atmosferos.',
    'Under stress Libra becomes indecisive, people-pleasing, conflict-avoidant or passive-aggressive.',
    'Patirdamos stresą Svarstyklės tampa neryžtingos, stengiasi visiems įtikti, vengia konfliktų ar tampa pasyviai agresyvios.',
    'Alternate nostril breathing for balance, time with beauty and art, and practising small honest “no”s.',
    'Kvėpavimas pakaitomis per šnerves pusiausvyrai, laikas su grožiu ir menu bei mažų, nuoširdžių „ne“ praktika.',
    'Be polite and fair, create a pleasant atmosphere, help them decide without pressure, and value their opinion.',
    'Būkite mandagūs ir teisingi, kurkite malonią atmosferą, padėkite apsispręsti be spaudimo ir vertinkite jų nuomonę.',
    'I choose what is right for me, with love and fairness.',
    'Renkuosi tai, kas man tinka, su meile ir teisingumu.'
  ),
  scorpio: D(
    'Deep trust, honesty, intimacy, privacy and a sense of control over their own life.',
    'Gilaus pasitikėjimo, atvirumo, artumo, privatumo ir savo gyvenimo kontrolės jausmo.',
    'Under stress Scorpio becomes jealous, secretive, controlling or vengeful, and can cut people off completely.',
    'Patirdamas stresą Skorpionas tampa pavydus, slaptas, kontroliuojantis ar kerštingas ir gali visiškai nutraukti ryšius.',
    'Deep transformational work (therapy, breathwork, journaling), forgiveness practice, and letting go of control.',
    'Gilus transformacinis darbas (terapija, kvėpavimas, dienoraštis), atleidimo praktika ir kontrolės paleidimas.',
    'Be completely honest, keep their secrets, don’t play games, and respect their need for privacy.',
    'Būkite visiškai atviri, saugokite jų paslaptis, nežaiskite žaidimų ir gerbkite jų privatumo poreikį.',
    'I release what is finished and trust the process of rebirth.',
    'Paleidžiu tai, kas baigėsi, ir pasitikiu atgimimo procesu.'
  ),
  sagittarius: D(
    'Freedom, adventure, travel, learning, meaning and honest, fun companions.',
    'Laisvės, nuotykių, kelionių, mokymosi, prasmės ir nuoširdžių, linksmų bendražygių.',
    'Under stress Sagittarius becomes restless, tactless, preachy or runs away from commitments.',
    'Patirdamas stresą Šaulys tampa neramus, netaktiškas, pamokslaujantis ar bėga nuo įsipareigojimų.',
    'Movement outdoors, meditation for presence, and discovering that depth and commitment can bring freedom too.',
    'Judėjimas lauke, meditacija buvimui čia ir dabar ir atradimas, kad gelmė ir įsipareigojimas taip pat gali suteikti laisvės.',
    'Give them space, share adventures and big ideas, be honest, and don’t take their bluntness personally.',
    'Duokite erdvės, dalinkitės nuotykiais ir didelėmis idėjomis, būkite nuoširdūs ir neimkite jų tiesmukumo asmeniškai.',
    'I find freedom and meaning right here, right now.',
    'Laisvę ir prasmę randu čia ir dabar.'
  ),
  capricorn: D(
    'Clear goals, respect, structure, achievement, and people they can rely on.',
    'Aiškių tikslų, pagarbos, struktūros, pasiekimų ir žmonių, kuriais gali pasikliauti.',
    'Under stress Capricorn becomes cold, controlling, pessimistic or a workaholic, and forgets to feel.',
    'Patirdamas stresą Ožiaragis tampa šaltas, kontroliuojantis, pesimistiškas ar darboholikas ir pamiršta jausti.',
    'Rest without guilt, yin yoga and meditation, play and humour, and allowing others to help.',
    'Poilsis be kaltės, jin joga ir meditacija, žaidimas ir humoras bei leidimas kitiems padėti.',
    'Respect their time and goals, be reliable, show loyalty through actions, and help them laugh.',
    'Gerbkite jų laiką ir tikslus, būkite patikimi, lojalumą rodykite darbais ir padėkite jiems nusijuokti.',
    'My worth does not depend on my achievements; I deserve rest and joy.',
    'Mano vertė nepriklauso nuo pasiekimų; esu vertas poilsio ir džiaugsmo.'
  ),
  aquarius: D(
    'Freedom, originality, friendship, a meaningful cause and space to be different.',
    'Laisvės, originalumo, draugystės, prasmingos idėjos ir erdvės būti kitokiam.',
    'Under stress Aquarius becomes detached, stubborn, rebellious or cold, and withdraws from feelings.',
    'Patirdamas stresą Vandenis tampa atsiribojęs, užsispyręs, maištingas ar šaltas ir pasitraukia nuo jausmų.',
    'Grounding through the body (yoga, nature), heart-opening practices, and letting people in emotionally.',
    'Įsižeminimas per kūną (joga, gamta), širdį atveriančios praktikos ir leidimas žmonėms priartėti emociškai.',
    'Respect their independence, share ideas and ideals, be a friend first, and accept their uniqueness.',
    'Gerbkite jų nepriklausomybę, dalinkitės idėjomis ir idealais, pirmiausia būkite draugas ir priimkite jų unikalumą.',
    'I am free to be myself and connected to others with an open heart.',
    'Esu laisvas būti savimi ir susijęs su kitais atvira širdimi.'
  ),
  pisces: D(
    'Compassion, creativity, spiritual connection, solitude to recharge and gentle people around them.',
    'Užuojautos, kūrybos, dvasinio ryšio, vienatvės atsigauti ir švelnių žmonių aplink.',
    'Under stress Pisces escapes into fantasy, sleep or substances, feels like a victim, or loses boundaries.',
    'Patirdamos stresą Žuvys bėga į fantazijas, miegą ar svaigalus, jaučiasi aukomis ar praranda ribas.',
    'Meditation, yoga nidra, art and music, time near water, and practising healthy boundaries.',
    'Meditacija, joga nidra, menas ir muzika, laikas prie vandens ir sveikų ribų praktika.',
    'Be gentle and patient, respect their sensitivity, share dreams, and help them stay grounded.',
    'Būkite švelnūs ir kantrūs, gerbkite jų jautrumą, dalinkitės svajonėmis ir padėkite jiems likti įsižeminusiems.',
    'I am compassionate with myself and protect my energy with love.',
    'Esu užjaučianti(-s) sau ir saugau savo energiją su meile.'
  ),
}
