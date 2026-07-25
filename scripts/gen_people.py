# -*- coding: utf-8 -*-
from pathlib import Path

def avatar(name: str, bg: str = "111") -> str:
    from urllib.parse import quote
    return f"https://ui-avatars.com/api/?name={quote(name)}&background={bg}&color=d4af37&bold=true&size=512"

def L(uz, ru=None, en=None):
    return {"uz": uz, "ru": ru or uz, "en": en or uz}

def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")

def loc(d):
    return "{ uz: '%s', ru: '%s', en: '%s' }" % (esc(d["uz"]), esc(d["ru"]), esc(d["en"]))

people = []

people.append(dict(
    id="p-rector", slug="kalonov-muxiddin", roles=["leader"], leadershipLevel="university",
    name=L("Muxiddin Baxriddinovich Kalonov", "Мухиддин Бахриддинович Калонов", "Muxiddin Baxriddinovich Kalonov"),
    photo="/images/leadership/rector.jpg",
    position=L("Rektor", "Ректор", "Rector"),
    degree=L("Iqtisodiyot fanlari doktori (DSc), professor", "Доктор экономических наук (DSc), профессор", "Doctor of Economic Sciences (DSc), Professor"),
    bio=L("Navoiy davlat universiteti rektori.", "Ректор Навоийского государственного университета.", "Rector of Navoi State University."),
    email="rector@navoiyuni.uz",
))

people.append(dict(
    id="p-dekan", slug="musayev-erkin", roles=["leader", "professor"], leadershipLevel="faculty",
    departmentId="dep-russian",
    name=L("Erkin Xalilovich Musayev", "Эркин Халилович Мусаев", "Erkin Khalilovich Musayev"),
    photo=avatar("Erkin Musayev", "004d61"),
    position=L("Tillar fakulteti dekani, dotsent", "Декан факультета языков, доцент", "Dean of the Faculty of Languages, Associate Professor"),
    degree=L("Filologiya fanlari bo‘yicha falsafa doktori (PhD), dotsent", "PhD по филологии, доцент", "PhD in Philology, Associate Professor"),
    bio=L(
        "Hozirgi kunda Tillar fakulteti dekani. 2025-yilda filologiya fanlari bo‘yicha PhD himoya qilgan. Mavzu: o‘zbek va rus tillarida fe’l semantikasining chog‘ishtirma tadqiqi. Xalq ta’limi a’lochisi.",
        "Декан факультета языков. В 2025 защитил PhD по филологии (сопоставительная семантика глагола в узбекском и русском). Отличник народного образования.",
        "Dean of the Faculty of Languages. PhD in Philology (2025) on comparative verb semantics in Uzbek and Russian. Honoured education worker.",
    ),
    email="rknmusayev@gmail.com", phone="+998 97 297 03 66",
    interests=[L("Chog‘ishtirma tilshunoslik", "Сопоставительная лингвистика", "Comparative linguistics"), L("Fe’l semantikasi", "Семантика глагола", "Verb semantics")],
    publicationsCount=25, studentIds=["p-st-amonova", "p-st-1"],
))

people.append(dict(
    id="p-vice-edu", slug="barnoev-orifjon", roles=["leader", "professor"], leadershipLevel="faculty",
    departmentId="dep-russian",
    name=L("Barnoyev Orifjon Dilshod o‘g‘li", "Барноев Орифжон Дилшод угли", "Barnoyev Orifjon Dilshod ugli"),
    photo=avatar("Orifjon Barnoev", "1a1a2e"),
    position=L("Rus tili va adabiyoti kafedrasi o‘qituvchisi", "Преподаватель кафедры русского языка и литературы", "Lecturer, Russian Language and Literature"),
    degree=L("Magistr", "Магистр", "Master"),
    bio=L("Rus tili va adabiyoti kafedrasi o‘qituvchisi. NavDPI bitiruvchisi.", "Преподаватель кафедры русского языка и литературы.", "Lecturer of the Russian Language and Literature department."),
    email="barnoevarif@gmail.com", phone="+998 90 618 80 46",
))

people.append(dict(
    id="p-head-ru", slug="jumayeva-feruza", roles=["leader", "professor"], leadershipLevel="faculty",
    departmentId="dep-russian",
    name=L("Feruza Ruziyevna Jumayeva", "Феруза Рузиевна Жумаева", "Feruza Ruziyevna Jumayeva"),
    photo=avatar("Feruza Jumayeva", "3d2914"),
    position=L("Rus tili va adabiyoti kafedrasi mudiri, dotsent", "Заведующая кафедрой русского языка и литературы, доцент", "Head of Russian Language and Literature, Associate Professor"),
    degree=L("Pedagogika fanlari nomzodi, dotsent", "Кандидат педагогических наук, доцент", "PhD (Pedagogy), Associate Professor"),
    bio=L(
        "2021-yil 10-martdan Rus tili va adabiyoti kafedrasi mudiri. Polotsk davlat universitetida stajirovka o‘tgan; qo‘shma ta’lim dasturlarini rivojlantiradi. Kafedrada 28 o‘qituvchi, ilmiy salohiyat 38%.",
        "С 10 марта 2021 г. заведует кафедрой. Стажировка в Полоцком ГУ; развивает совместные программы. 28 преподавателей, научный потенциал 38%.",
        "Head of department since 10 March 2021. Internship at Polotsk State University; develops joint programs. 28 staff, 38% research capacity.",
    ),
    email="jumayeva.fr@navoiyuni.uz",
    interests=[L("Rus tili metodikasi", "Методика русского языка", "Russian methodology"), L("RFL", "РКИ", "Russian as a foreign language")],
    publicationsCount=40, studentIds=["p-st-amonova"],
))

people.append(dict(
    id="p-head-uz", slug="tursunova-malika", roles=["leader", "professor"], leadershipLevel="faculty",
    departmentId="dep-uzbek",
    name=L("Malika Tursunova", "Малика Турсунова", "Malika Tursunova"),
    photo=avatar("Malika Tursunova", "003366"),
    position=L("O‘zbek tili va adabiyoti kafedrasi mudiri", "Зав. кафедрой узбекского языка и литературы", "Head of Uzbek Language and Literature"),
    degree=L("DSc, professor", "DSc, профессор", "DSc, Professor"),
    bio=L("Navoiyshunoslik va matnshunoslik bo‘yicha yetakchi olim.", "Ведущий учёный в области навоиеведения и текстологии.", "Leading scholar in Navoi studies and textology."),
    email="uzbek@navoiyuni.uz", publicationsCount=55, studentIds=["p-st-3"],
))

people.append(dict(
    id="p-head-en", slug="toxtayeva-q", roles=["leader", "professor"], leadershipLevel="faculty",
    departmentId="dep-english-ling",
    name=L("Q.D. To‘xtayeva", "К.Д. Тухтаева", "Q.D. To‘xtayeva"),
    photo=avatar("Q Toxtayeva", "0a3d62"),
    position=L("Ingliz tili kafedrasi asoschisi, dotsent", "Основатель кафедры английского, доцент", "Founding English department head, Associate Professor"),
    degree=L("Dotsent", "Доцент", "Associate Professor"),
    bio=L("1995-yilda Ingliz tili va adabiyoti kafedrasini tashkil etgan. 2024–2025-yillarda fakultetga rahbarlik qilgan.", "В 1995 основала кафедру английского. В 2024–2025 руководила факультетом.", "Founded English department in 1995; led faculty in 2024–2025."),
    email="english@navoiyuni.uz", publicationsCount=30,
))

people.append(dict(
    id="p-prof-raxmanova", slug="raxmanova-albina", roles=["professor"],
    departmentId="dep-russian",
    name=L("Albina Xojayevna Raxmanova", "Альбина Ходжаевна Рахманова", "Albina Khodjayevna Raxmanova"),
    photo=avatar("Albina Raxmanova", "4a3728"),
    position=L("Professor", "Профессор", "Professor"),
    degree=L("Filologiya fanlari doktori (DSc), professor", "Доктор филологических наук (DSc), профессор", "Doctor of Philology (DSc), Professor"),
    bio=L(
        "2023-yilda DSc himoya: rus adabiyotidagi Qur’on motivlari madaniyatlararo muloqot hodisasi sifatida (Pushkin, Lermontov, Bunin). 2010–2015 kafedra mudiri.",
        "В 2023 защитила докторскую диссертацию о коранических мотивах в русской литературе. В 2010–2015 заведовала кафедрой.",
        "DSc 2023 on Quranic motifs in Russian literature (Pushkin, Lermontov, Bunin). Head of department 2010–2015.",
    ),
    email="alya211@list.ru", phone="+998 90 665 55 72",
    interests=[L("Adabiyot tarixi", "История литературы", "Literary history"), L("Sharqshunoslik", "Ориенталистика", "Oriental studies")],
    publicationsCount=80, studentIds=["p-st-1"],
))

people.append(dict(
    id="p-prof-ibragimova", slug="ibragimova-nargiza", roles=["professor"],
    departmentId="dep-russian",
    name=L("Nargiza Maratovna Ibragimova", "Наргиза Маратовна Ибрагимова", "Nargiza Maratovna Ibragimova"),
    photo=avatar("Nargiza Ibragimova", "2c3e50"),
    position=L("Dotsent", "Доцент", "Associate Professor"),
    degree=L("Filologiya fanlari bo‘yicha falsafa doktori (PhD), dotsent", "PhD по филологии, доцент", "PhD in Philology, Associate Professor"),
    bio=L("Rus tili va adabiyoti kafedrasi dotsenti. Xalqaro stajirovka va ma’ruzalar ishtirokchisi.", "Доцент кафедры. Участник международных стажировок и лекций.", "Associate professor; international internships and lectures."),
    email="ibragimovan814@gmail.com", phone="+998 93 951 29 01", publicationsCount=35,
))

people.append(dict(
    id="p-prof-aripova", slug="aripova-malika", roles=["professor"],
    departmentId="dep-russian",
    name=L("Malika Ganisherovna Aripova", "Малика Ганишеровна Арипова", "Malika Ganisherovna Aripova"),
    photo=avatar("Malika Aripova", "1b4332"),
    position=L("Dotsent", "Доцент", "Associate Professor"),
    degree=L("Filologiya fanlari bo‘yicha falsafa doktori (PhD), dotsent", "PhD по филологии, доцент", "PhD in Philology, Associate Professor"),
    bio=L("PhD (13.00.01). Rus tili va adabiyoti kafedrasi dotsenti.", "PhD (13.00.01). Доцент кафедры.", "PhD (13.00.01). Associate professor of the department."),
    email="Malikaaripova001@mail.ru", phone="+998 95 813 00 01", publicationsCount=28,
))

people.append(dict(
    id="p-prof-roziyeva", slug="roziyeva-z", roles=["professor"],
    departmentId="dep-russian",
    name=L("Z.M. Ro‘ziyeva", "З.М. Рузиева", "Z.M. Roziyeva"),
    photo=avatar("Z Roziyeva", "5c4033"),
    position=L("Dotsent", "Доцент", "Associate Professor"),
    degree=L("Dotsent", "Доцент", "Associate Professor"),
    bio=L("Rus tili va adabiyoti kafedrasi dotsenti. Xalqaro ma’ruzalar ishtirokchisi.", "Доцент кафедры. Участник международных лекций.", "Associate professor; international lectures."),
    publicationsCount=30,
))

for tid, slug, uz, ru, en, em, ph, interest in [
    ("p-teach-fefelova", "fefelova-guzaliya", "Guzaliya Rashidovna Fefelova", "Гузалия Рашидовна Фефелова", "Guzaliya Rashidovna Fefelova", "fefelovaguz@gmail.com", "+998 93 317 10 61", "Qiyosiy adabiyotshunoslik va tarjimashunoslik"),
    ("p-teach-kamalova", "kamalova-dilafruz", "Dilafruz Tuymurod qizi Kamalova", "Дилафруз Туймурод кизи Камалова", "Dilafruz Tuymurod qizi Kamalova", "dilafruzkamalova927@gmail.com", "+998 91 085 77 57", "Rus tili, mutaxassislikka kirish"),
    ("p-teach-hayit", "xayitmurodova-maftuna", "Maftuna Fazliddinovna Xayitmurodova", "Мафтуна Фазлиддиновна Хайитмуродова", "Maftuna Fazliddinovna Xayitmurodova", "hayitmurodovam92@gmail.com", "+998 94 949 27 08", "Amaliy rus tili"),
    ("p-teach-sidirova", "sidirova-j", "J.U. Sidirova", "Ж.У. Сидирова", "J.U. Sidirova", "sidirova@navoiyuni.uz", "", "Rus tili va adabiyoti"),
    ("p-teach-shamsieva", "shamsiyeva-d", "D.M. Shamsiyeva", "Д.М. Шамсиева", "D.M. Shamsiyeva", "shamsiyeva@navoiyuni.uz", "", "Rus tili metodikasi"),
    ("p-teach-xolov", "xolov-kamol", "Xolov Kamol Muhammadiyor o‘g‘li", "Холов Камол Мухаммадиёр угли", "Xolov Kamol Muhammadiyor ugli", "Xolovkamol01@gmail.com", "+998 99 752 52 31", "PR va media, rus tili"),
    ("p-teach-halikova", "xalikova-g", "G.I. Xalikova", "Г.И. Халикова", "G.I. Khalikova", "Isanovna-63@mail.ru", "+998 91 332 08 48", "Rus tili va adabiyoti"),
]:
    people.append(dict(
        id=tid, slug=slug, roles=["professor"], departmentId="dep-russian",
        name=L(uz, ru, en), photo=avatar(en[:24], "222"),
        position=L("O‘qituvchi", "Преподаватель", "Lecturer"),
        degree=L("O‘qituvchi", "Преподаватель", "Lecturer"),
        bio=L(f"Rus tili va adabiyoti kafedrasi o‘qituvchisi. {interest}.", f"Преподаватель кафедры. {interest}.", f"Department lecturer. {interest}."),
        email=em or None, phone=ph or None,
        interests=[L(interest, interest, interest)],
    ))

people.append(dict(
    id="p-prof-2", slug="english-staff", roles=["professor"], departmentId="dep-english",
    name=L("Ingliz tili kafedrasi o‘qituvchisi", "Преподаватель кафедры английского", "English department lecturer"),
    photo=avatar("English Staff", "0d3b66"),
    position=L("Katta o‘qituvchi", "Старший преподаватель", "Senior lecturer"),
    degree=L("PhD", "PhD", "PhD"),
    bio=L("Ingliz tili amaliyoti va metodikasi.", "Практика и методика английского.", "English practice and methodology."),
    email="english.staff@navoiyuni.uz",
))
people.append(dict(
    id="p-prof-1", slug="russian-senior", roles=["professor"], departmentId="dep-russian",
    name=L("Rus tili kafedrasi katta o‘qituvchisi", "Старший преподаватель", "Senior lecturer"),
    photo=avatar("Russian Senior", "3d3d3d"),
    position=L("Katta o‘qituvchi", "Старший преподаватель", "Senior lecturer"),
    degree=L("PhD", "PhD", "PhD"),
    bio=L("Rus tili va adabiyoti.", "Русский язык и литература.", "Russian language and literature."),
))
people.append(dict(
    id="p-prof-3", slug="ling-trans", roles=["professor"], departmentId="dep-english-ling",
    name=L("Tilshunoslik va tarjima o‘qituvchisi", "Преподаватель лингвистики и перевода", "Linguistics and translation lecturer"),
    photo=avatar("Ling Trans", "1a472a"),
    position=L("Dotsent", "Доцент", "Associate Professor"),
    degree=L("PhD, dotsent", "PhD, доцент", "PhD, Associate Professor"),
    bio=L("Tarjima va qiyosiy tilshunoslik.", "Перевод и сопоставительная лингвистика.", "Translation and comparative linguistics."),
))

people.append(dict(
    id="p-tutor-1", slug="tutor-english", roles=["tutor", "professor"], departmentId="dep-english",
    name=L("Tyutor (Ingliz tili)", "Тьютор (английский)", "Tutor (English)"),
    photo=avatar("Tutor English", "264653"),
    position=L("Tyutor", "Тьютор", "Tutor"),
    degree=L("Magistr", "Магистр", "Master"),
    bio=L("Talabalar guruhlari bilan ishlaydi.", "Работает со студенческими группами.", "Works with student groups."),
    groupIds=["g-1"],
))
people.append(dict(
    id="p-tutor-2", slug="tutor-russian", roles=["tutor"], departmentId="dep-russian",
    name=L("Tyutor (Rus tili)", "Тьютор (русский)", "Tutor (Russian)"),
    photo=avatar("Tutor Russian", "2a9d8f"),
    position=L("Tyutor", "Тьютор", "Tutor"),
    degree=L("Magistr", "Магистр", "Master"),
    bio=L("Rus tili yo‘nalishi guruhlari tyutori.", "Тьютор групп направления русского языка.", "Tutor of Russian-track groups."),
    groupIds=["g-2"],
))

people.append(dict(
    id="p-st-amonova", slug="amonova-nafisa", roles=["student"],
    name=L("Amonova Nafisa Yusupovna", "Амонова Нафиса Юсуповна", "Amonova Nafisa Yusupovna"),
    photo=avatar("Nafisa Amonova", "e9c46a"),
    position=L("Magistrant", "Магистрант", "Master student"),
    course=2, programId="prog-russian", groupId="g-2",
    badges=["gifted", "scientific", "winner"],
    bio=L(
        "«Rus tili va adabiyoti» mutaxassisligi 2-kurs magistranti. Alisher Navoiy nomidagi davlat stipendiyati sohibi.",
        "Магистрант 2 курса «Русский язык и литература». Стипендиат государственной стипендии им. А. Навои.",
        "2nd-year master student in Russian Language and Literature. A. Navoi State Scholarship holder.",
    ),
    supervisorId="p-head-ru",
))
people.append(dict(
    id="p-st-1", slug="raximova-e", roles=["student"],
    name=L("Raximova E.A.", "Рахимова Э.А.", "Raximova E.A."),
    photo=avatar("E Raximova", "f4a261"),
    course=3, programId="prog-russian", groupId="g-2",
    badges=["scientific", "international"],
    bio=L("Rus tili va adabiyoti yo‘nalishi iqtidorli talabasi.", "Одарённая студентка направления русского языка.", "Gifted student of Russian Language and Literature."),
    supervisorId="p-prof-raxmanova",
))
people.append(dict(
    id="p-st-2", slug="qayumova-n", roles=["student"],
    name=L("Qayumova N.K.", "Каюмова Н.К.", "Qayumova N.K."),
    photo=avatar("N Qayumova", "e76f51"),
    course=2, programId="prog-english-ling", groupId="g-1",
    badges=["innovator", "gifted"],
    bio=L("Iqtidorli talaba.", "Одарённая студентка.", "Gifted student."),
))
people.append(dict(
    id="p-st-3", slug="sobirova-nilufar", roles=["student"],
    name=L("Nilufar Sobirova", "Нилуфар Собирова", "Nilufar Sobirova"),
    photo=avatar("Nilufar Sobirova", "2a9d8f"),
    course=4, programId="prog-uzbek-lit", groupId="g-1",
    badges=["scientific", "creative"],
    bio=L("O‘zbek filologiyasi talabasi, ilmiy ishlar ishtirokchisi.", "Студентка узбекской филологии.", "Uzbek philology student; research participant."),
    supervisorId="p-head-uz",
))
people.append(dict(
    id="p-st-4", slug="rasulov-diyor", roles=["student"],
    name=L("Diyor Rasulov", "Диёр Расулов", "Diyor Rasulov"),
    photo=avatar("Diyor Rasulov", "264653"),
    course=3, programId="prog-english-prac", groupId="g-1",
    badges=["innovator", "international"],
    bio=L("Ingliz tili amaliyoti talabasi.", "Студент практического английского.", "Practical English student."),
))
people.append(dict(
    id="p-st-5", slug="erkinova-laylo", roles=["student"],
    name=L("Laylo Erkinova", "Лайло Эркинова", "Laylo Erkinova"),
    photo=avatar("Laylo Erkinova", "9b2226"),
    course=2, programId="prog-russian", groupId="g-2",
    badges=["creative", "volunteer"],
    bio=L("Rus tili va adabiyoti yo‘nalishi talabasi, ijodiy tadbirlar ishtirokchisi.", "Студентка русского языка; участница творческих мероприятий.", "Russian-track student; creative events participant."),
))

people.append(dict(
    id="p-hon-turniyozov", slug="turniyozov-otagan", roles=["honorary"],
    name=L("O‘tagan Turniyozov", "Утаган Турниязов", "O‘tagan Turniyozov"),
    photo=avatar("Otagan Turniyozov", "000000"),
    position=L("Fakultet asoschisi, dotsent", "Основатель факультета, доцент", "Faculty founder, Associate Professor"),
    degree=L("Dotsent", "Доцент", "Associate Professor"),
    yearsActive="1931–2011", isMemorial=True,
    bio=L(
        "Fakultet tarixida o‘rni beqiyos. O‘zbek maktablari uchun fransuz tili darsliklarini yaratgan birinchi olimlardan. «Xalq maorifi a’lochisi» (1978), «Qori Niyoziy» oltin medali (1994).",
        "Незаменим в истории факультета. Один из первых авторов учебников французского для узбекских школ. Отличник народного просвещения (1978), медаль «Кари Ниязи» (1994).",
        "Foundational figure. Pioneer of French textbooks for Uzbek schools. Honoured education worker (1978); Qori Niyoziy gold medal (1994).",
    ),
))
people.append(dict(
    id="p-hon-1", slug="early-team", roles=["honorary"],
    name=L("Ilk jamoa ustozlari", "Первый коллектив наставников", "Founding mentors"),
    photo=avatar("Early Team", "111"),
    position=L("Faxriy ustozlar", "Почётные преподаватели", "Honorary teachers"),
    yearsActive="1984–2000",
    bio=L("A. Ahmedov, M. Po‘latova, Q. To‘xtayeva, A. Aslanov va boshqa ilk jamoa a’zolari.", "А. Ахмедов, М. Пулатова, К. Тухтаева и другие члены первого коллектива.", "A. Ahmedov, M. Po‘latova, Q. To‘xtayeva and other founding team members."),
))
people.append(dict(
    id="p-prof-najmiddinov", slug="najmiddinov-f", roles=["honorary", "professor"],
    departmentId="dep-russian",
    name=L("F.N. Najmiddinov", "Ф.Н. Наджмиддинов", "F.N. Najmiddinov"),
    photo=avatar("F Najmiddinov", "222"),
    position=L("Fakultet sobiq rahbarlaridan", "Один из бывших руководителей факультета", "Former faculty leader"),
    degree=L("Professor-o‘qituvchi", "Преподаватель", "Faculty member"),
    yearsActive="1997–",
    bio=L("Xorijiy tillar fakulteti rahbarlaridan biri sifatida fakultet rivojiga hissa qo‘shgan.", "Внёс вклад в развитие факультета как один из руководителей.", "Contributed as one of the faculty leaders."),
))

lines = [
    "import type { Person } from '@/types';",
    "",
    "const avatar = (name: string, bg = '111') =>",
    "  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=d4af37&bold=true&size=512`;",
    "",
    "/**",
    " * Manba: «Rus tili va adabiyoti kafedrasi sayt» hujjatlari,",
    " * FAKULTET TARIXI, kafedra tarixi, xodimlar obyektivkalari, iqtidorli talabalar.",
    " */",
    "export const people: Person[] = [",
]

for p in people:
    lines.append("  {")
    lines.append(f"    id: '{p['id']}',")
    lines.append(f"    slug: '{p['slug']}',")
    roles = ", ".join(f"'{r}'" for r in p["roles"])
    lines.append(f"    roles: [{roles}],")
    if "leadershipLevel" in p:
        lines.append(f"    leadershipLevel: '{p['leadershipLevel']}',")
    if "departmentId" in p:
        lines.append(f"    departmentId: '{p['departmentId']}',")
    lines.append(f"    name: {loc(p['name'])},")
    lines.append(f"    photo: '{p['photo']}',")
    for key in ("position", "degree", "bio"):
        if key in p and p[key]:
            lines.append(f"    {key}: {loc(p[key])},")
    if p.get("email"):
        lines.append(f"    email: '{p['email']}',")
    if p.get("phone"):
        lines.append(f"    phone: '{p['phone']}',")
    if "course" in p:
        lines.append(f"    course: {p['course']},")
    if "programId" in p:
        lines.append(f"    programId: '{p['programId']}',")
    if "groupId" in p:
        lines.append(f"    groupId: '{p['groupId']}',")
    if "groupIds" in p:
        lines.append(f"    groupIds: {p['groupIds']!r},".replace("'", "'"))
        # fix to TS
        lines[-1] = f"    groupIds: [{', '.join(repr(x) for x in p['groupIds'])}],".replace('"', "'")
    if "badges" in p:
        lines.append(f"    badges: [{', '.join(repr(x) for x in p['badges'])}],".replace('"', "'"))
    if "supervisorId" in p:
        lines.append(f"    supervisorId: '{p['supervisorId']}',")
    if "studentIds" in p:
        lines.append(f"    studentIds: [{', '.join(repr(x) for x in p['studentIds'])}],".replace('"', "'"))
    if "publicationsCount" in p:
        lines.append(f"    publicationsCount: {p['publicationsCount']},")
    if "yearsActive" in p:
        lines.append(f"    yearsActive: '{p['yearsActive']}',")
    if p.get("isMemorial"):
        lines.append("    isMemorial: true,")
    if "interests" in p:
        ints = ", ".join(loc(i) for i in p["interests"])
        lines.append(f"    interests: [{ints}],")
    lines.append("  },")

lines += [
    "];",
    "",
    "export const getPerson = (idOrSlug: string) =>",
    "  people.find((p) => p.id === idOrSlug || p.slug === idOrSlug);",
    "",
    "export const getPeopleByRole = (role: Person['roles'][number]) =>",
    "  people.filter((p) => p.roles.includes(role));",
    "",
    "export const getPeopleByIds = (ids: string[]) =>",
    "  people.filter((p) => ids.includes(p.id));",
    "",
]

out = Path = __import__("pathlib").Path
out(r"C:\Users\root\Desktop\navdu-tillar-fakulteti\src\data\people.ts").write_text("\n".join(lines), encoding="utf-8")
print("OK people", len(people))
