from django.contrib import admin
from django.utils.html import format_html
from . import models
from . import forms


def thumb(url_or_file, url_fallback=''):
    url = ''
    if url_or_file:
        try:
            url = url_or_file.url
        except Exception:
            pass
    if not url:
        url = url_fallback or ''
    if not url:
        return '—'
    return format_html(
        '<img src="{}" style="height:40px;width:40px;object-fit:cover;'
        'border-radius:8px;border:1px solid #ddd;" />',
        url,
    )


# ─── Shaxslar ──────────────────────────────────────────────────────
@admin.register(models.Person)
class PersonAdmin(admin.ModelAdmin):
    form = forms.PersonAdminForm
    list_display = (
        'photo_preview',
        'display_name',
        'roles_display',
        'department_display',
        'leadership_level',
        'sort_order',
        'is_published',
    )
    list_display_links = ('display_name',)
    list_filter = ('leadership_level', 'is_published', 'is_memorial')
    search_fields = ('name', 'email', 'phone', 'slug', 'external_id')
    ordering = ('sort_order', 'slug')
    list_per_page = 30
    list_editable = ('sort_order', 'is_published')
    readonly_fields = ('photo_preview_large',)
    save_on_top = True

    fieldsets = (
        ('Asosiy ma’lumot', {
            'fields': (
                'name',
                'roles',
                'position',
                'degree',
                'is_published',
            ),
            'description': 'Ism va rollarni to‘ldiring. ID avtomatik yaratiladi.',
        }),
        ('Rasm', {
            'fields': ('photo_preview_large', 'photo_file', 'photo'),
            'description': 'Rasmni yuklang. Internet URL faqat zaxira.',
        }),
        ('Rahbariyat (agar rahbar bo‘lsa)', {
            'fields': ('leadership_level', 'sort_order'),
            'classes': ('collapse',),
        }),
        ('Bog‘lanishlar (ro‘yxatdan tanlang)', {
            'fields': (
                'department',
                'program',
                'supervisor',
                'primary_group',
                'students',
                'groups',
            ),
            'description': 'ID yozish shart emas — ism bo‘yicha tanlang.',
        }),
        ('Talaba (agar talaba bo‘lsa)', {
            'fields': ('course', 'badges'),
            'classes': ('collapse',),
        }),
        ('Bio va kontakt', {
            'fields': (
                'bio',
                'interests',
                'email',
                'phone',
                'office',
                'office_hours',
                'publications_count',
                'years_active',
                'is_memorial',
            ),
        }),
        ('Texnik (avtomatik — odatda tegmang)', {
            'fields': ('slug', 'external_id'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Rasm')
    def photo_preview(self, obj):
        return thumb(obj.photo_file, obj.photo)

    @admin.display(description='Ko‘rinish')
    def photo_preview_large(self, obj):
        url = ''
        if obj.photo_file:
            try:
                url = obj.photo_file.url
            except Exception:
                pass
        url = url or obj.photo
        if not url:
            return 'Rasm yo‘q — pastdan yuklang'
        return format_html(
            '<img src="{}" style="max-height:160px;border-radius:12px;border:1px solid #ddd;" />',
            url,
        )

    @admin.display(description='F.I.Sh.', ordering='slug')
    def display_name(self, obj):
        return obj.name.get('uz') if isinstance(obj.name, dict) else obj.slug

    @admin.display(description='Rollar')
    def roles_display(self, obj):
        m = {
            'leader': 'Rahbar',
            'professor': 'Prof.',
            'tutor': 'Tyutor',
            'student': 'Talaba',
            'honorary': 'Faxriy',
        }
        return ', '.join(m.get(r, r) for r in (obj.roles or [])) or '—'

    @admin.display(description='Kafedra')
    def department_display(self, obj):
        if not obj.department_external_id:
            return '—'
        d = models.Department.objects.filter(external_id=obj.department_external_id).first()
        if not d:
            return obj.department_external_id
        return d.name.get('uz') if isinstance(d.name, dict) else d.slug


# ─── Kafedra ───────────────────────────────────────────────────────
@admin.register(models.Department)
class DepartmentAdmin(admin.ModelAdmin):
    form = forms.DepartmentAdminForm
    list_display = ('display_name', 'head_display', 'is_published')
    search_fields = ('name', 'slug')
    list_filter = ('is_published',)
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'research_areas', 'is_published'),
        }),
        ('Jamoa (ro‘yxatdan tanlang)', {
            'fields': ('head', 'professors'),
            'description': 'Mudir va a’zolarni ism bo‘yicha tanlang — ID kerak emas.',
        }),
        ('Texnik', {
            'fields': ('slug', 'external_id'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Kafedra')
    def display_name(self, obj):
        return obj.name.get('uz') if isinstance(obj.name, dict) else obj.slug

    @admin.display(description='Mudir')
    def head_display(self, obj):
        if not obj.head_external_id:
            return '—'
        p = models.Person.objects.filter(external_id=obj.head_external_id).first()
        if not p:
            return '—'
        return p.name.get('uz') if isinstance(p.name, dict) else p.slug


# ─── Dasturlar ─────────────────────────────────────────────────────
@admin.register(models.Program)
class ProgramAdmin(admin.ModelAdmin):
    form = forms.ProgramAdminForm
    list_display = ('display_name', 'level', 'study_form', 'is_published')
    list_filter = ('level', 'study_form', 'is_published')
    search_fields = ('name', 'slug')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'name', 'level', 'study_form', 'description', 'careers',
                'curriculum_url', 'is_published',
            ),
        }),
        ('O‘qituvchilar (ro‘yxatdan tanlang)', {
            'fields': ('professors',),
        }),
        ('Texnik', {
            'fields': ('slug', 'external_id'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Yo‘nalish')
    def display_name(self, obj):
        return obj.name.get('uz') if isinstance(obj.name, dict) else obj.slug


# ─── Yangiliklar ───────────────────────────────────────────────────
@admin.register(models.News)
class NewsAdmin(admin.ModelAdmin):
    form = forms.NewsAdminForm
    list_display = ('cover_preview', 'display_title', 'category', 'date', 'is_published')
    list_display_links = ('display_title',)
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'slug')
    date_hierarchy = 'date'
    list_per_page = 20
    save_on_top = True
    readonly_fields = ('cover_preview_large',)
    fieldsets = (
        ('Asosiy', {
            'fields': (
                'title', 'excerpt', 'category', 'date', 'is_published',
            ),
        }),
        ('Muqova', {
            'fields': ('cover_preview_large', 'cover_file', 'cover'),
        }),
        ('Asosiy matn — rich editor (CKEditor)', {
            'fields': ('body_uz', 'body_ru', 'body_en'),
            'description': (
                'auth-starter uslubidagi mukammal tahrirchi: qalin, ro‘yxat, '
                'rasm yuklash, jadval, havola, sarlavha. Har til alohida.'
            ),
        }),
        ('Bog‘liq odamlar (ro‘yxatdan tanlang)', {
            'fields': ('author', 'related_people'),
        }),
        ('Texnik', {
            'fields': ('slug', 'external_id'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Rasm')
    def cover_preview(self, obj):
        return thumb(obj.cover_file, obj.cover)

    @admin.display(description='Muqova')
    def cover_preview_large(self, obj):
        url = ''
        if obj.cover_file:
            try:
                url = obj.cover_file.url
            except Exception:
                pass
        url = url or obj.cover
        if not url:
            return '—'
        return format_html(
            '<img src="{}" style="max-height:180px;border-radius:12px;" />',
            url,
        )

    @admin.display(description='Sarlavha', ordering='date')
    def display_title(self, obj):
        return obj.title.get('uz') if isinstance(obj.title, dict) else obj.slug


# ─── Tarix ─────────────────────────────────────────────────────────
@admin.register(models.HistoryEvent)
class HistoryEventAdmin(admin.ModelAdmin):
    form = forms.HistoryEventAdminForm
    list_display = ('year', 'display_title', 'sort_order', 'is_published')
    list_filter = ('is_published',)
    ordering = ('sort_order', 'year')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'year', 'title', 'description', 'related_people',
                'photos_text', 'sort_order', 'is_published',
            ),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Voqea')
    def display_title(self, obj):
        return obj.title.get('uz') if isinstance(obj.title, dict) else obj.external_id


# ─── Ilm-fan ───────────────────────────────────────────────────────
@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    form = forms.ProjectAdminForm
    list_display = ('display_title', 'status', 'is_published')
    list_filter = ('status', 'is_published')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'title', 'status', 'description', 'grant', 'results',
                'leader', 'participants', 'is_published',
            ),
        }),
        ('Texnik', {
            'fields': ('slug', 'external_id'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Loyiha')
    def display_title(self, obj):
        return obj.title.get('uz') if isinstance(obj.title, dict) else obj.slug


@admin.register(models.Publication)
class PublicationAdmin(admin.ModelAdmin):
    form = forms.PublicationAdminForm
    list_display = ('display_title', 'year', 'pub_type', 'indexed', 'is_published')
    list_filter = ('pub_type', 'indexed', 'year')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'title', 'year', 'pub_type', 'indexed',
                'authors', 'department', 'is_published',
            ),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Nashr')
    def display_title(self, obj):
        t = obj.title.get('uz') if isinstance(obj.title, dict) else ''
        return (t[:80] + '…') if t and len(t) > 80 else (t or obj.external_id)


# ─── Hamkor ────────────────────────────────────────────────────────
@admin.register(models.Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('logo_preview', 'name', 'logo_text', 'country', 'region', 'sort_order')
    list_display_links = ('name',)
    list_filter = ('region', 'is_published')
    search_fields = ('name', 'logo_text', 'country')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'name', 'logo_text', 'logo_file',
                'country', 'region', 'sort_order', 'is_published',
            ),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Logo')
    def logo_preview(self, obj):
        return thumb(obj.logo_file)


# ─── Tyutor ────────────────────────────────────────────────────────
@admin.register(models.TutorGroup)
class TutorGroupAdmin(admin.ModelAdmin):
    form = forms.TutorGroupAdminForm
    list_display = ('display_name', 'tutor_display', 'is_published')
    search_fields = ('name', 'slug')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': ('name', 'tutor', 'students', 'achievements', 'is_published'),
        }),
        ('Texnik', {
            'fields': ('slug', 'external_id'),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Guruh')
    def display_name(self, obj):
        return obj.name.get('uz') if isinstance(obj.name, dict) else obj.slug

    @admin.display(description='Tyutor')
    def tutor_display(self, obj):
        if not obj.tutor_external_id:
            return '—'
        p = models.Person.objects.filter(external_id=obj.tutor_external_id).first()
        if not p:
            return '—'
        return p.name.get('uz') if isinstance(p.name, dict) else p.slug


@admin.register(models.TutorActivity)
class TutorActivityAdmin(admin.ModelAdmin):
    form = forms.TutorActivityAdminForm
    list_display = ('display_title', 'date', 'is_published')
    list_filter = ('is_published',)
    date_hierarchy = 'date'
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'title', 'description', 'date',
                'tutor', 'group',
                'photo_file', 'photo',
                'is_published',
            ),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Faoliyat')
    def display_title(self, obj):
        return obj.title.get('uz') if isinstance(obj.title, dict) else obj.external_id


# ─── Hero ──────────────────────────────────────────────────────────
@admin.register(models.HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    form = forms.HeroSlideAdminForm
    list_display = ('preview', 'external_id', 'accent', 'sort_order', 'is_published')
    list_display_links = ('external_id',)
    list_filter = ('is_published', 'accent')
    ordering = ('sort_order',)
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'tag', 'title', 'description', 'cta_label', 'cta_to',
                'accent', 'sort_order', 'is_published',
            ),
        }),
        ('Rasm', {
            'fields': ('image_file', 'image'),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Rasm')
    def preview(self, obj):
        return thumb(obj.image_file, obj.image)


@admin.register(models.FacultyStats)
class FacultyStatsAdmin(admin.ModelAdmin):
    form = forms.FacultyStatsAdminForm
    list_display = (
        'students', 'professors', 'programs',
        'partners', 'projects', 'updated_at',
    )
    save_on_top = True
    fieldsets = (
        ('Asosiy raqamlar', {
            'fields': ('students', 'professors', 'programs', 'partners', 'projects'),
        }),
        ('Fakultet matni', {
            'fields': ('faculty_overview',),
        }),
        ('Prezident bloki', {
            'fields': ('president_name', 'president_title', 'president_photo_fallback'),
        }),
        ('Texnik JSON', {
            'fields': ('faculty_facts',),
            'classes': ('collapse',),
        }),
    )


@admin.register(models.ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    form = forms.ContactInfoAdminForm
    list_display = ('email', 'phone', 'updated_at')
    save_on_top = True
    fieldsets = (
        ('Kontakt', {
            'fields': ('address', 'phone', 'email', 'university_url'),
        }),
        ('Ijtimoiy / bo‘limlar (JSON)', {
            'fields': ('socials', 'units'),
            'classes': ('collapse',),
        }),
        ('Xarita', {
            'fields': ('map_embed', 'map_short'),
        }),
    )


@admin.register(models.PresidentialQuote)
class PresidentialQuoteAdmin(admin.ModelAdmin):
    form = forms.PresidentialQuoteAdminForm
    list_display = ('preview', 'external_id', 'theme', 'sort_order', 'is_published')
    list_display_links = ('external_id',)
    list_filter = ('theme', 'is_published')
    ordering = ('sort_order',)
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (
                'theme', 'sort_order', 'is_published',
                'quote', 'source_title', 'source_date', 'source_url',
            ),
        }),
        ('Rasm', {
            'fields': ('photo_file', 'photo'),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Rasm')
    def preview(self, obj):
        return thumb(obj.photo_file, obj.photo)


@admin.register(models.RectorAddress)
class RectorAddressAdmin(admin.ModelAdmin):
    form = forms.RectorAddressAdminForm
    list_display = ('preview', 'display_name', 'updated_at')
    list_display_links = ('display_name',)
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': ('name', 'title', 'university', 'message'),
        }),
        ('Rasm', {
            'fields': ('photo_file', 'photo'),
        }),
    )

    @admin.display(description='Rasm')
    def preview(self, obj):
        return thumb(obj.photo_file, obj.photo)

    @admin.display(description='Rektor')
    def display_name(self, obj):
        return obj.name.get('uz') if isinstance(obj.name, dict) else 'Rektor'


@admin.register(models.NavoiQuote)
class NavoiQuoteAdmin(admin.ModelAdmin):
    form = forms.NavoiQuoteAdminForm
    list_display = ('external_id', 'sort_order', 'is_published')
    ordering = ('sort_order',)
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': ('sort_order', 'is_published', 'attribution', 'source_note'),
        }),
        ('To‘rt misra', {
            'fields': ('line1', 'line2', 'line3', 'line4'),
        }),
        ('Izoh', {
            'fields': ('modern_bridge',),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )


@admin.register(models.NavoiBandQuote)
class NavoiBandQuoteAdmin(admin.ModelAdmin):
    form = forms.NavoiBandQuoteAdminForm
    list_display = ('external_id', 'page_key', 'is_published')
    list_filter = ('page_key', 'is_published')
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': ('page_key', 'is_published', 'attribution', 'source'),
        }),
        ('To‘rt misra', {
            'fields': ('line1', 'line2', 'line3', 'line4'),
        }),
        ('Texnik', {
            'fields': ('external_id',),
            'classes': ('collapse',),
        }),
    )
