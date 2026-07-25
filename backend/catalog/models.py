"""
Tillar fakulteti — barcha kontent modellari.
external_id: frontenddagi eski id (p-dekan, n-1, …) bilan bog‘lash.
"""
from django.db import models


class Person(models.Model):
    class Role(models.TextChoices):
        LEADER = 'leader', 'Leader'
        PROFESSOR = 'professor', 'Professor'
        TUTOR = 'tutor', 'Tutor'
        STUDENT = 'student', 'Student'
        HONORARY = 'honorary', 'Honorary'

    class LeadershipLevel(models.TextChoices):
        UNIVERSITY = 'university', 'University'
        FACULTY = 'faculty', 'Faculty'

    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    slug = models.SlugField(max_length=120, unique=True)
    roles = models.JSONField(default=list, help_text='Rollar: leader, professor, tutor, student, honorary')
    name = models.JSONField(default=dict)  # {uz,ru,en} — admin da 3 maydon
    photo = models.CharField(
        max_length=500,
        blank=True,
        verbose_name='Rasm URL (internet)',
        help_text='Ixtiyoriy: https://... yoki /images/... — media yuklanmagan bo‘lsa ishlatiladi',
    )
    photo_file = models.ImageField(
        upload_to='people/%Y/%m/',
        blank=True,
        null=True,
        verbose_name='Rasm yuklash (media)',
        help_text='Yuklansa, saytda shu rasm ko‘rsatiladi (URL dan ustun)',
    )
    degree = models.JSONField(default=dict, blank=True)
    position = models.JSONField(default=dict, blank=True)
    department_external_id = models.CharField(max_length=64, blank=True)
    program_external_id = models.CharField(max_length=64, blank=True)
    course = models.PositiveSmallIntegerField(null=True, blank=True)
    group_external_id = models.CharField(max_length=64, blank=True)
    badges = models.JSONField(default=list, blank=True)
    supervisor_external_id = models.CharField(max_length=64, blank=True)
    student_external_ids = models.JSONField(default=list, blank=True)
    group_external_ids = models.JSONField(default=list, blank=True)
    interests = models.JSONField(default=list, blank=True)
    bio = models.JSONField(default=dict, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=64, blank=True)
    office_hours = models.JSONField(default=dict, blank=True)
    office = models.JSONField(default=dict, blank=True)
    external_links = models.JSONField(default=dict, blank=True)
    years_active = models.CharField(max_length=64, blank=True)
    is_memorial = models.BooleanField(default=False)
    leadership_level = models.CharField(
        max_length=20, choices=LeadershipLevel.choices, blank=True
    )
    sort_order = models.PositiveIntegerField(default=99)
    publications_count = models.PositiveIntegerField(null=True, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order', 'slug']
        verbose_name = 'Shaxs'
        verbose_name_plural = 'Shaxslar (rahbar, professor, talaba)'

    def __str__(self):
        return self.name.get('uz') or self.slug


class Department(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    slug = models.SlugField(max_length=120, unique=True)
    name = models.JSONField(default=dict)
    head_external_id = models.CharField(max_length=64, blank=True)
    description = models.JSONField(default=dict)
    research_areas = models.JSONField(default=list)
    professor_external_ids = models.JSONField(default=list)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['slug']
        verbose_name = 'Kafedra'
        verbose_name_plural = 'Kafedralar'

    def __str__(self):
        return self.name.get('uz') or self.slug


class Program(models.Model):
    class Level(models.TextChoices):
        BACHELOR = 'bachelor', 'Bachelor'
        MASTER = 'master', 'Master'

    class StudyForm(models.TextChoices):
        FULL_TIME = 'full_time', 'Full-time'
        EVENING = 'evening', 'Evening'
        DISTANCE = 'distance', 'Distance'

    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    slug = models.SlugField(max_length=120, unique=True)
    name = models.JSONField(default=dict)
    level = models.CharField(max_length=20, choices=Level.choices)
    study_form = models.CharField(
        max_length=20, choices=StudyForm.choices, default=StudyForm.FULL_TIME
    )
    description = models.JSONField(default=dict)
    careers = models.JSONField(default=list)
    professor_external_ids = models.JSONField(default=list)
    curriculum_url = models.CharField(max_length=500, blank=True)
    icon = models.CharField(max_length=64, blank=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['level', 'slug']
        verbose_name = "Ta'lim yo'nalishi"
        verbose_name_plural = "Ta'lim yo'nalishlari"

    def __str__(self):
        return self.name.get('uz') or self.slug


class News(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    slug = models.SlugField(max_length=160, unique=True)
    category = models.CharField(max_length=40)
    title = models.JSONField(default=dict)
    excerpt = models.JSONField(default=dict)
    body = models.JSONField(default=dict)
    date = models.DateField()
    cover = models.CharField(
        max_length=500,
        blank=True,
        verbose_name='Muqova URL (internet)',
    )
    cover_file = models.ImageField(
        upload_to='news/%Y/%m/',
        blank=True,
        null=True,
        verbose_name='Muqova yuklash (media)',
    )
    author_external_id = models.CharField(max_length=64, blank=True)
    related_person_external_ids = models.JSONField(default=list)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Yangilik'
        verbose_name_plural = 'Yangiliklar'

    def __str__(self):
        return self.title.get('uz') or self.slug


class HistoryEvent(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    year = models.CharField(max_length=32)
    title = models.JSONField(default=dict)
    description = models.JSONField(default=dict)
    photos = models.JSONField(default=list, blank=True)
    related_person_external_ids = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'year']
        verbose_name = 'Tarixiy voqea'
        verbose_name_plural = 'Fakultet tarixi'

    def __str__(self):
        return f'{self.year} — {self.title.get("uz", "")}'


class Project(models.Model):
    class Status(models.TextChoices):
        ONGOING = 'ongoing', 'Ongoing'
        COMPLETED = 'completed', 'Completed'

    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    slug = models.SlugField(max_length=160, unique=True)
    title = models.JSONField(default=dict)
    leader_external_id = models.CharField(max_length=64, blank=True)
    participant_external_ids = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=Status.choices)
    grant = models.JSONField(default=dict, blank=True)
    description = models.JSONField(default=dict)
    results = models.JSONField(default=dict, blank=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['slug']
        verbose_name = 'Ilmiy loyiha'
        verbose_name_plural = 'Ilmiy loyihalar'

    def __str__(self):
        return self.title.get('uz') or self.slug


class Publication(models.Model):
    class PubType(models.TextChoices):
        ARTICLE = 'article', 'Article'
        MONOGRAPH = 'monograph', 'Monograph'
        TEXTBOOK = 'textbook', 'Textbook'

    class Indexed(models.TextChoices):
        SCOPUS = 'scopus', 'Scopus'
        WOS = 'wos', 'WoS'
        NONE = 'none', 'None'

    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    title = models.JSONField(default=dict)
    year = models.PositiveIntegerField()
    author_external_ids = models.JSONField(default=list)
    department_external_id = models.CharField(max_length=64, blank=True)
    indexed = models.CharField(
        max_length=20, choices=Indexed.choices, default=Indexed.NONE
    )
    pub_type = models.CharField(max_length=20, choices=PubType.choices)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-year', 'id']
        verbose_name = 'Nashr'
        verbose_name_plural = 'Nashrlar (maqola, monografiya)'

    def __str__(self):
        return self.title.get('uz') or self.external_id


class Partner(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    name = models.CharField(max_length=255)
    logo_text = models.CharField(max_length=64)
    logo_file = models.ImageField(
        upload_to='partners/%Y/%m/', blank=True, null=True, verbose_name='Logo yuklash'
    )
    country = models.CharField(max_length=128, blank=True)
    region = models.CharField(max_length=32, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'name']
        verbose_name = 'Hamkor'
        verbose_name_plural = 'Xalqaro hamkorlar'

    def __str__(self):
        return self.name


class TutorGroup(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    slug = models.SlugField(max_length=120, unique=True)
    name = models.JSONField(default=dict)
    tutor_external_id = models.CharField(max_length=64, blank=True)
    student_external_ids = models.JSONField(default=list)
    achievements = models.JSONField(default=list)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['slug']
        verbose_name = 'Tyutor guruhi'
        verbose_name_plural = 'Tyutor guruhlari'

    def __str__(self):
        return self.name.get('uz') or self.slug


class TutorActivity(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    tutor_external_id = models.CharField(max_length=64, blank=True)
    group_external_id = models.CharField(max_length=64, blank=True)
    date = models.DateField()
    title = models.JSONField(default=dict)
    description = models.JSONField(default=dict)
    photo = models.CharField(max_length=500, blank=True, verbose_name='Rasm URL')
    photo_file = models.ImageField(
        upload_to='activities/%Y/%m/', blank=True, null=True, verbose_name='Rasm yuklash'
    )
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Tyutor faoliyati'
        verbose_name_plural = 'Tyutor faoliyatlari'

    def __str__(self):
        return self.title.get('uz') or self.external_id


class HeroSlide(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    image = models.CharField(max_length=500, blank=True, verbose_name='Rasm URL (internet)')
    image_file = models.ImageField(
        upload_to='hero/%Y/%m/',
        blank=True,
        null=True,
        verbose_name='Rasm yuklash (media)',
    )
    accent = models.CharField(max_length=32, blank=True)
    tag = models.JSONField(default=dict, blank=True)
    title = models.JSONField(default=dict)
    description = models.JSONField(default=dict, blank=True)
    cta_label = models.JSONField(default=dict, blank=True)
    cta_to = models.CharField(max_length=255, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order']
        verbose_name = 'Hero slayd'
        verbose_name_plural = 'Hero slaydlar (bosh sahifa)'

    def __str__(self):
        return self.title.get('uz') or self.external_id


class FacultyStats(models.Model):
    """Singleton — asosiy raqamlar + facultyFacts JSON."""
    students = models.PositiveIntegerField(default=0)
    professors = models.PositiveIntegerField(default=0)
    programs = models.PositiveIntegerField(default=0)
    partners = models.PositiveIntegerField(default=0)
    projects = models.PositiveIntegerField(default=0)
    faculty_overview = models.JSONField(default=dict, blank=True)
    faculty_facts = models.JSONField(default=dict, blank=True)
    # Prezident bloki meta (frontend PRESIDENT_NAME / TITLE)
    president_name = models.JSONField(default=dict, blank=True)
    president_title = models.JSONField(default=dict, blank=True)
    president_photo_fallback = models.CharField(max_length=500, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Fakultet statistikasi'
        verbose_name_plural = 'Statistika va faktlar'

    def __str__(self):
        return f'Stats: {self.students} students'


class ContactInfo(models.Model):
    """Singleton — aloqa."""
    address = models.JSONField(default=dict)
    phone = models.CharField(max_length=64, blank=True)
    email = models.EmailField(blank=True)
    university_url = models.URLField(blank=True)
    socials = models.JSONField(default=list)
    units = models.JSONField(default=list)
    map_embed = models.CharField(max_length=500, blank=True)
    map_short = models.CharField(max_length=500, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Aloqa maʼlumoti'
        verbose_name_plural = 'Aloqa (kontakt)'

    def __str__(self):
        return self.email or 'Contact'


class PresidentialQuote(models.Model):
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    theme = models.CharField(max_length=40, blank=True)
    quote = models.JSONField(default=dict)
    source_title = models.JSONField(default=dict, blank=True)
    source_date = models.CharField(max_length=32, blank=True)
    source_url = models.URLField(blank=True)
    photo = models.CharField(max_length=500, blank=True, verbose_name='Rasm URL')
    photo_file = models.ImageField(
        upload_to='president/%Y/%m/', blank=True, null=True, verbose_name='Rasm yuklash'
    )
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order']
        verbose_name = 'Prezident iqtibosi'
        verbose_name_plural = 'Prezident iqtiboslari'

    def __str__(self):
        return self.external_id


class RectorAddress(models.Model):
    """Singleton."""
    name = models.JSONField(default=dict)
    title = models.JSONField(default=dict)
    university = models.JSONField(default=dict)
    photo = models.CharField(max_length=500, blank=True, verbose_name='Rasm URL')
    photo_file = models.ImageField(
        upload_to='rector/%Y/%m/', blank=True, null=True, verbose_name='Rasm yuklash'
    )
    message = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Rektor murojaati'
        verbose_name_plural = 'Rektor murojaati'

    def __str__(self):
        return self.name.get('uz') or 'Rector'


class NavoiQuote(models.Model):
    """Landingdagi katta iqtibos bloklari."""
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    lines = models.JSONField(default=list)  # [{uz,ru,en}, …]
    attribution = models.JSONField(default=dict)
    modern_bridge = models.JSONField(default=dict, blank=True)
    source_note = models.JSONField(default=dict, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order']
        verbose_name = 'Navoiy iqtibos (landing)'
        verbose_name_plural = 'Navoiy iqtiboslar (landing)'

    def __str__(self):
        return self.external_id


class NavoiBandQuote(models.Model):
    """Har sahifa oxiri — Navoiy merosi."""
    external_id = models.CharField(max_length=64, unique=True, db_index=True)
    page_key = models.CharField(max_length=64, db_index=True)  # home, history, …
    lines = models.JSONField(default=list)
    attribution = models.JSONField(default=dict)
    source = models.JSONField(default=dict, blank=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['page_key']
        verbose_name = 'Navoiy merosi (sahifa oxiri)'
        verbose_name_plural = 'Navoiy merosi lentasi'

    def __str__(self):
        return f'{self.page_key}: {self.external_id}'
