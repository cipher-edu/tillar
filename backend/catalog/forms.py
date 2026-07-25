"""
Admin formalari — oddiy muharrir ID yozmaydi, ro‘yxatdan tanlaydi.
"""
from __future__ import annotations

import re
import uuid

from django import forms
from django.utils.text import slugify
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from . import models
from .widgets import LocaleField, LocaleListField


ROLE_CHOICES = [
    ('leader', 'Rahbar'),
    ('professor', 'Professor-o‘qituvchi'),
    ('tutor', 'Tyutor'),
    ('student', 'Talaba'),
    ('honorary', 'Faxriy ustoz'),
]

BADGE_CHOICES = [
    ('innovator', 'Innovator'),
    ('gifted', 'Iqtidorli'),
    ('scientific', 'Ilmiy'),
    ('creative', 'Ijodkor'),
    ('volunteer', 'Volontyor'),
    ('international', 'Xalqaro'),
    ('winner', 'G‘olib'),
]

SELECT_STYLE = {'style': 'min-width: 280px; max-width: 100%;'}
MULTI_STYLE = {'style': 'min-width: 320px; min-height: 140px; max-width: 100%;'}


def _person_label(p: models.Person) -> str:
    name = ''
    if isinstance(p.name, dict):
        name = p.name.get('uz') or p.name.get('ru') or p.name.get('en') or ''
    name = name or p.slug or p.external_id
    roles = p.roles or []
    role_uz = {
        'leader': 'rahbar',
        'professor': 'prof.',
        'tutor': 'tyutor',
        'student': 'talaba',
        'honorary': 'faxriy',
    }
    rtxt = ', '.join(role_uz.get(r, r) for r in roles) if roles else ''
    return f'{name} — {rtxt}' if rtxt else name


def _dept_label(d: models.Department) -> str:
    if isinstance(d.name, dict):
        return d.name.get('uz') or d.slug
    return d.slug


def _prog_label(p: models.Program) -> str:
    if isinstance(p.name, dict):
        name = p.name.get('uz') or p.slug
    else:
        name = p.slug
    level = 'magistr' if p.level == 'master' else 'bakalavr'
    return f'{name} ({level})'


def _group_label(g: models.TutorGroup) -> str:
    if isinstance(g.name, dict):
        return g.name.get('uz') or g.slug
    return g.slug


def people_qs(role: str | None = None):
    qs = models.Person.objects.all().order_by('sort_order', 'slug')
    if role:
        # JSON list — filter in Python for SQLite compatibility
        ids = [p.pk for p in qs if role in (p.roles or [])]
        return models.Person.objects.filter(pk__in=ids).order_by('sort_order', 'slug')
    return qs


def make_slug(text: str, fallback: str = '') -> str:
    raw = (text or '').strip()
    s = slugify(raw)
    if not s:
        # lotin bo‘lmagan matn
        s = re.sub(r'[^\w]+', '-', raw.lower(), flags=re.UNICODE).strip('-')
    if not s:
        s = fallback or uuid.uuid4().hex[:10]
    return s[:100]


def auto_external_id(prefix: str, name_uz: str) -> str:
    base = make_slug(name_uz)[:40] or uuid.uuid4().hex[:8]
    eid = f'{prefix}-{base}'
    return eid[:64]


def ensure_unique_external_id(model, eid: str, instance_pk=None) -> str:
    original = eid
    n = 2
    while model.objects.filter(external_id=eid).exclude(pk=instance_pk).exists():
        eid = f'{original[:55]}-{n}'
        n += 1
    return eid


def ensure_unique_slug(model, slug: str, instance_pk=None) -> str:
    original = slug
    n = 2
    while model.objects.filter(slug=slug).exclude(pk=instance_pk).exists():
        slug = f'{original[:90]}-{n}'
        n += 1
    return slug


# ─── Person ────────────────────────────────────────────────────────
class PersonAdminForm(forms.ModelForm):
    name = LocaleField(label='F.I.Sh.', required=True)
    position = LocaleField(label='Lavozim', required=False)
    degree = LocaleField(label='Ilmiy daraja / unvon', required=False)
    bio = LocaleField(label='Qisqa biografiya', required=False, textarea=True)
    office = LocaleField(label='Kabinet', required=False)
    office_hours = LocaleField(label='Qabul vaqti', required=False)
    interests = LocaleListField(label='Ilmiy qiziqishlar', required=False)

    roles = forms.MultipleChoiceField(
        label='Kim bu shaxs?',
        choices=ROLE_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=True,
        help_text='Bir yoki bir nechtasini belgilang',
    )
    badges = forms.MultipleChoiceField(
        label='Talaba belgilari',
        choices=BADGE_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    department = forms.ModelChoiceField(
        label='Kafedra',
        queryset=models.Department.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    program = forms.ModelChoiceField(
        label="Ta'lim yo‘nalishi",
        queryset=models.Program.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    supervisor = forms.ModelChoiceField(
        label='Ilmiy rahbar',
        queryset=models.Person.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    primary_group = forms.ModelChoiceField(
        label='Asosiy guruh (talaba)',
        queryset=models.TutorGroup.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    students = forms.ModelMultipleChoiceField(
        label='Rahbarlik qiladigan talabalar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
        help_text='Ctrl (Cmd) bilan bir nechtasini tanlang',
    )
    groups = forms.ModelMultipleChoiceField(
        label='Tyutor guruhlari',
        queryset=models.TutorGroup.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )

    class Meta:
        model = models.Person
        fields = [
            'name', 'roles', 'position', 'degree',
            'photo_file', 'photo',
            'leadership_level', 'sort_order',
            'department', 'program', 'supervisor', 'primary_group',
            'students', 'groups',
            'course', 'badges',
            'bio', 'interests', 'email', 'phone',
            'office', 'office_hours',
            'publications_count', 'years_active', 'is_memorial',
            'is_published',
            'slug', 'external_id',
        ]
        labels = {
            'photo_file': 'Rasm yuklash',
            'photo': 'Rasm URL (ixtiyoriy)',
            'leadership_level': 'Rahbariyat darajasi',
            'sort_order': 'Tartib raqami (kichik = yuqorida)',
            'course': 'Kurs (talaba)',
            'is_published': 'Saytda ko‘rsatilsin',
            'is_memorial': 'Memorial (vafot etgan)',
            'years_active': 'Faol yillar',
            'publications_count': 'Nashrlar soni',
            'slug': 'Slug (havola, avtomatik)',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['department'].queryset = models.Department.objects.all().order_by('slug')
        self.fields['program'].queryset = models.Program.objects.all().order_by('level', 'slug')
        self.fields['supervisor'].queryset = people_qs()
        self.fields['primary_group'].queryset = models.TutorGroup.objects.all().order_by('slug')
        self.fields['students'].queryset = people_qs('student')
        self.fields['groups'].queryset = models.TutorGroup.objects.all().order_by('slug')

        self.fields['department'].label_from_instance = _dept_label
        self.fields['program'].label_from_instance = _prog_label
        self.fields['supervisor'].label_from_instance = _person_label
        self.fields['primary_group'].label_from_instance = _group_label
        self.fields['students'].label_from_instance = _person_label
        self.fields['groups'].label_from_instance = _group_label

        self.fields['slug'].required = False
        self.fields['external_id'].required = False
        self.fields['slug'].help_text = 'Bo‘sh qoldiring — ismdan avtomatik yaratiladi'
        self.fields['external_id'].help_text = 'Bo‘sh qoldiring — avtomatik yaratiladi (o‘zgartirmang)'

        inst = self.instance
        if inst and inst.pk:
            self.fields['roles'].initial = inst.roles or []
            self.fields['badges'].initial = inst.badges or []
            if inst.department_external_id:
                self.fields['department'].initial = models.Department.objects.filter(
                    external_id=inst.department_external_id
                ).first()
            if inst.program_external_id:
                self.fields['program'].initial = models.Program.objects.filter(
                    external_id=inst.program_external_id
                ).first()
            if inst.supervisor_external_id:
                self.fields['supervisor'].initial = models.Person.objects.filter(
                    external_id=inst.supervisor_external_id
                ).first()
            if inst.group_external_id:
                self.fields['primary_group'].initial = models.TutorGroup.objects.filter(
                    external_id=inst.group_external_id
                ).first()
            if inst.student_external_ids:
                self.fields['students'].initial = models.Person.objects.filter(
                    external_id__in=inst.student_external_ids
                )
            if inst.group_external_ids:
                self.fields['groups'].initial = models.TutorGroup.objects.filter(
                    external_id__in=inst.group_external_ids
                )

    def clean(self):
        cleaned = super().clean()
        name = cleaned.get('name') or {}
        name_uz = (name.get('uz') or '').strip() if isinstance(name, dict) else ''
        if not name_uz and not (cleaned.get('roles')):
            pass
        # auto ids
        eid = (cleaned.get('external_id') or '').strip()
        slug = (cleaned.get('slug') or '').strip()
        pk = self.instance.pk if self.instance else None
        if not eid:
            eid = auto_external_id('p', name_uz)
            eid = ensure_unique_external_id(models.Person, eid, pk)
            cleaned['external_id'] = eid
        if not slug:
            slug = make_slug(name_uz, fallback=eid)
            slug = ensure_unique_slug(models.Person, slug, pk)
            cleaned['slug'] = slug
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        obj.roles = list(self.cleaned_data.get('roles') or [])
        obj.badges = list(self.cleaned_data.get('badges') or [])

        dept = self.cleaned_data.get('department')
        obj.department_external_id = dept.external_id if dept else ''

        prog = self.cleaned_data.get('program')
        obj.program_external_id = prog.external_id if prog else ''

        sup = self.cleaned_data.get('supervisor')
        obj.supervisor_external_id = sup.external_id if sup else ''

        grp = self.cleaned_data.get('primary_group')
        obj.group_external_id = grp.external_id if grp else ''

        students = self.cleaned_data.get('students')
        obj.student_external_ids = [s.external_id for s in (students or [])]

        groups = self.cleaned_data.get('groups')
        obj.group_external_ids = [g.external_id for g in (groups or [])]

        if commit:
            obj.save()
        return obj


# ─── Department ────────────────────────────────────────────────────
class DepartmentAdminForm(forms.ModelForm):
    name = LocaleField(label='Kafedra nomi', required=True)
    description = LocaleField(label='Tavsif', required=False, textarea=True)
    research_areas = LocaleListField(label='Ilmiy yo‘nalishlar', required=False)

    head = forms.ModelChoiceField(
        label='Kafedra mudiri',
        queryset=models.Person.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    professors = forms.ModelMultipleChoiceField(
        label='Kafedra a’zolari',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
        help_text='Ctrl bilan bir nechtasini tanlang',
    )

    class Meta:
        model = models.Department
        fields = [
            'name', 'description', 'research_areas',
            'head', 'professors',
            'is_published', 'slug', 'external_id',
        ]
        labels = {
            'is_published': 'Saytda ko‘rsatilsin',
            'slug': 'Slug (avtomatik)',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['head'].queryset = people_qs()
        self.fields['professors'].queryset = people_qs()
        self.fields['head'].label_from_instance = _person_label
        self.fields['professors'].label_from_instance = _person_label
        self.fields['slug'].required = False
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            if inst.head_external_id:
                self.fields['head'].initial = models.Person.objects.filter(
                    external_id=inst.head_external_id
                ).first()
            if inst.professor_external_ids:
                self.fields['professors'].initial = models.Person.objects.filter(
                    external_id__in=inst.professor_external_ids
                )

    def clean(self):
        cleaned = super().clean()
        name = cleaned.get('name') or {}
        name_uz = (name.get('uz') or '').strip() if isinstance(name, dict) else ''
        pk = self.instance.pk if self.instance else None
        eid = (cleaned.get('external_id') or '').strip()
        slug = (cleaned.get('slug') or '').strip()
        if not eid:
            eid = ensure_unique_external_id(
                models.Department, auto_external_id('dep', name_uz), pk
            )
            cleaned['external_id'] = eid
        if not slug:
            slug = ensure_unique_slug(
                models.Department, make_slug(name_uz, fallback=eid), pk
            )
            cleaned['slug'] = slug
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        head = self.cleaned_data.get('head')
        obj.head_external_id = head.external_id if head else ''
        profs = self.cleaned_data.get('professors')
        obj.professor_external_ids = [p.external_id for p in (profs or [])]
        if commit:
            obj.save()
        return obj


# ─── Program ───────────────────────────────────────────────────────
class ProgramAdminForm(forms.ModelForm):
    name = LocaleField(label='Yo‘nalish nomi', required=True)
    description = LocaleField(label='Tavsif', required=False, textarea=True)
    careers = LocaleListField(label='Kasbiy imkoniyatlar', required=False)

    professors = forms.ModelMultipleChoiceField(
        label='Biriktirilgan o‘qituvchilar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )

    class Meta:
        model = models.Program
        fields = [
            'name', 'level', 'study_form', 'description', 'careers',
            'professors', 'curriculum_url', 'is_published',
            'slug', 'external_id',
        ]
        labels = {
            'level': 'Bosqich',
            'study_form': 'Ta’lim shakli',
            'curriculum_url': 'O‘quv reja (URL, ixtiyoriy)',
            'is_published': 'Saytda ko‘rsatilsin',
            'slug': 'Slug (avtomatik)',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['professors'].queryset = people_qs()
        self.fields['professors'].label_from_instance = _person_label
        self.fields['slug'].required = False
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk and inst.professor_external_ids:
            self.fields['professors'].initial = models.Person.objects.filter(
                external_id__in=inst.professor_external_ids
            )

    def clean(self):
        cleaned = super().clean()
        name = cleaned.get('name') or {}
        name_uz = (name.get('uz') or '').strip() if isinstance(name, dict) else ''
        pk = self.instance.pk if self.instance else None
        eid = (cleaned.get('external_id') or '').strip()
        slug = (cleaned.get('slug') or '').strip()
        if not eid:
            cleaned['external_id'] = ensure_unique_external_id(
                models.Program, auto_external_id('prog', name_uz), pk
            )
        if not slug:
            cleaned['slug'] = ensure_unique_slug(
                models.Program, make_slug(name_uz, fallback=cleaned.get('external_id', '')), pk
            )
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        profs = self.cleaned_data.get('professors')
        obj.professor_external_ids = [p.external_id for p in (profs or [])]
        if commit:
            obj.save()
        return obj


# ─── News ──────────────────────────────────────────────────────────
class NewsAdminForm(forms.ModelForm):
    """
    Yangilik matni — CKEditor (auth-starter dagi rich-text kabi).
    body JSON {uz,ru,en} ichida HTML saqlanadi.
    """
    title = LocaleField(label='Sarlavha', required=True)
    excerpt = LocaleField(label='Qisqa matn (kartochka)', required=False, textarea=True)

    body_uz = forms.CharField(
        label='Asosiy matn — Oʻzbekcha',
        required=False,
        widget=CKEditorUploadingWidget(config_name='news'),
        help_text='CKEditor: sarlavha, ro‘yxat, rasm, jadval, havola…',
    )
    body_ru = forms.CharField(
        label='Asosiy matn — Русский',
        required=False,
        widget=CKEditorUploadingWidget(config_name='news'),
    )
    body_en = forms.CharField(
        label='Asosiy matn — English',
        required=False,
        widget=CKEditorUploadingWidget(config_name='news'),
    )

    author = forms.ModelChoiceField(
        label='Muallif',
        queryset=models.Person.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    related_people = forms.ModelMultipleChoiceField(
        label='Bog‘liq shaxslar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )

    class Meta:
        model = models.News
        fields = [
            'title', 'excerpt', 'category', 'date',
            'cover_file', 'cover',
            'author', 'related_people',
            'is_published', 'slug', 'external_id',
        ]
        labels = {
            'category': 'Kategoriya',
            'date': 'Sana',
            'cover_file': 'Muqova yuklash',
            'cover': 'Muqova URL (ixtiyoriy)',
            'is_published': 'Saytda ko‘rsatilsin',
            'slug': 'Slug (avtomatik)',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['author'].queryset = people_qs()
        self.fields['related_people'].queryset = people_qs()
        self.fields['author'].label_from_instance = _person_label
        self.fields['related_people'].label_from_instance = _person_label
        self.fields['slug'].required = False
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            body = inst.body if isinstance(inst.body, dict) else {}
            self.fields['body_uz'].initial = body.get('uz') or ''
            self.fields['body_ru'].initial = body.get('ru') or ''
            self.fields['body_en'].initial = body.get('en') or ''
            self.initial['body_uz'] = body.get('uz') or ''
            self.initial['body_ru'] = body.get('ru') or ''
            self.initial['body_en'] = body.get('en') or ''
            if inst.author_external_id:
                self.fields['author'].initial = models.Person.objects.filter(
                    external_id=inst.author_external_id
                ).first()
            if inst.related_person_external_ids:
                self.fields['related_people'].initial = models.Person.objects.filter(
                    external_id__in=inst.related_person_external_ids
                )

    def clean(self):
        cleaned = super().clean()
        title = cleaned.get('title') or {}
        title_uz = (title.get('uz') or '').strip() if isinstance(title, dict) else ''
        pk = self.instance.pk if self.instance else None
        if not (cleaned.get('external_id') or '').strip():
            cleaned['external_id'] = ensure_unique_external_id(
                models.News, auto_external_id('n', title_uz), pk
            )
        if not (cleaned.get('slug') or '').strip():
            cleaned['slug'] = ensure_unique_slug(
                models.News, make_slug(title_uz, fallback=cleaned['external_id']), pk
            )
        # body JSON
        cleaned['body'] = {
            'uz': cleaned.get('body_uz') or '',
            'ru': cleaned.get('body_ru') or '',
            'en': cleaned.get('body_en') or '',
        }
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        obj.body = {
            'uz': self.cleaned_data.get('body_uz') or '',
            'ru': self.cleaned_data.get('body_ru') or '',
            'en': self.cleaned_data.get('body_en') or '',
        }
        author = self.cleaned_data.get('author')
        obj.author_external_id = author.external_id if author else ''
        related = self.cleaned_data.get('related_people')
        obj.related_person_external_ids = [p.external_id for p in (related or [])]
        if commit:
            obj.save()
        return obj


# ─── History ───────────────────────────────────────────────────────
class HistoryEventAdminForm(forms.ModelForm):
    title = LocaleField(label='Sarlavha', required=True)
    description = LocaleField(label='Tavsif', required=False, textarea=True)
    related_people = forms.ModelMultipleChoiceField(
        label='Bog‘liq shaxslar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )
    photos_text = forms.CharField(
        label='Rasmlar (URL, ixtiyoriy)',
        required=False,
        widget=forms.Textarea(attrs={'rows': 3, 'style': 'width:100%; max-width:48rem;'}),
        help_text='Har qatorga bitta rasm manzili',
    )

    class Meta:
        model = models.HistoryEvent
        fields = [
            'year', 'title', 'description', 'related_people', 'photos_text',
            'sort_order', 'is_published', 'external_id',
        ]
        labels = {
            'year': 'Yil',
            'sort_order': 'Tartib',
            'is_published': 'Saytda ko‘rsatilsin',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['related_people'].queryset = people_qs()
        self.fields['related_people'].label_from_instance = _person_label
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            if inst.related_person_external_ids:
                self.fields['related_people'].initial = models.Person.objects.filter(
                    external_id__in=inst.related_person_external_ids
                )
            if inst.photos:
                self.fields['photos_text'].initial = '\n'.join(inst.photos)

    def clean(self):
        cleaned = super().clean()
        pk = self.instance.pk if self.instance else None
        if not (cleaned.get('external_id') or '').strip():
            y = cleaned.get('year') or 'event'
            cleaned['external_id'] = ensure_unique_external_id(
                models.HistoryEvent, auto_external_id('h', str(y)), pk
            )
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        related = self.cleaned_data.get('related_people')
        obj.related_person_external_ids = [p.external_id for p in (related or [])]
        photos_text = self.cleaned_data.get('photos_text') or ''
        obj.photos = [ln.strip() for ln in photos_text.splitlines() if ln.strip()]
        if commit:
            obj.save()
        return obj


# ─── Project ───────────────────────────────────────────────────────
class ProjectAdminForm(forms.ModelForm):
    title = LocaleField(label='Loyiha nomi', required=True)
    description = LocaleField(label='Tavsif', required=False, textarea=True)
    grant = LocaleField(label='Grant / manba', required=False)
    results = LocaleField(label='Natijalar', required=False, textarea=True)

    leader = forms.ModelChoiceField(
        label='Rahbar',
        queryset=models.Person.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    participants = forms.ModelMultipleChoiceField(
        label='Ishtirokchilar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )

    class Meta:
        model = models.Project
        fields = [
            'title', 'status', 'description', 'grant', 'results',
            'leader', 'participants', 'is_published', 'slug', 'external_id',
        ]
        labels = {
            'status': 'Holat',
            'is_published': 'Saytda ko‘rsatilsin',
            'slug': 'Slug (avtomatik)',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['leader'].queryset = people_qs()
        self.fields['participants'].queryset = people_qs()
        self.fields['leader'].label_from_instance = _person_label
        self.fields['participants'].label_from_instance = _person_label
        self.fields['slug'].required = False
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            if inst.leader_external_id:
                self.fields['leader'].initial = models.Person.objects.filter(
                    external_id=inst.leader_external_id
                ).first()
            if inst.participant_external_ids:
                self.fields['participants'].initial = models.Person.objects.filter(
                    external_id__in=inst.participant_external_ids
                )

    def clean(self):
        cleaned = super().clean()
        title = cleaned.get('title') or {}
        title_uz = (title.get('uz') or '').strip() if isinstance(title, dict) else ''
        pk = self.instance.pk if self.instance else None
        if not (cleaned.get('external_id') or '').strip():
            cleaned['external_id'] = ensure_unique_external_id(
                models.Project, auto_external_id('pr', title_uz), pk
            )
        if not (cleaned.get('slug') or '').strip():
            cleaned['slug'] = ensure_unique_slug(
                models.Project, make_slug(title_uz, fallback=cleaned['external_id']), pk
            )
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        leader = self.cleaned_data.get('leader')
        obj.leader_external_id = leader.external_id if leader else ''
        parts = self.cleaned_data.get('participants')
        obj.participant_external_ids = [p.external_id for p in (parts or [])]
        if commit:
            obj.save()
        return obj


# ─── Publication ───────────────────────────────────────────────────
class PublicationAdminForm(forms.ModelForm):
    title = LocaleField(label='Nashr nomi', required=True)

    authors = forms.ModelMultipleChoiceField(
        label='Mualliflar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )
    department = forms.ModelChoiceField(
        label='Kafedra',
        queryset=models.Department.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )

    class Meta:
        model = models.Publication
        fields = [
            'title', 'year', 'pub_type', 'indexed',
            'authors', 'department', 'is_published', 'external_id',
        ]
        labels = {
            'year': 'Yil',
            'pub_type': 'Turi',
            'indexed': 'Indekslash',
            'is_published': 'Saytda ko‘rsatilsin',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['authors'].queryset = people_qs()
        self.fields['department'].queryset = models.Department.objects.all().order_by('slug')
        self.fields['authors'].label_from_instance = _person_label
        self.fields['department'].label_from_instance = _dept_label
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            if inst.author_external_ids:
                self.fields['authors'].initial = models.Person.objects.filter(
                    external_id__in=inst.author_external_ids
                )
            if inst.department_external_id:
                self.fields['department'].initial = models.Department.objects.filter(
                    external_id=inst.department_external_id
                ).first()

    def clean(self):
        cleaned = super().clean()
        title = cleaned.get('title') or {}
        title_uz = (title.get('uz') or '').strip() if isinstance(title, dict) else ''
        pk = self.instance.pk if self.instance else None
        if not (cleaned.get('external_id') or '').strip():
            cleaned['external_id'] = ensure_unique_external_id(
                models.Publication, auto_external_id('pub', title_uz), pk
            )
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        authors = self.cleaned_data.get('authors')
        obj.author_external_ids = [p.external_id for p in (authors or [])]
        dept = self.cleaned_data.get('department')
        obj.department_external_id = dept.external_id if dept else ''
        if commit:
            obj.save()
        return obj


# ─── Tutor group / activity ────────────────────────────────────────
class TutorGroupAdminForm(forms.ModelForm):
    name = LocaleField(label='Guruh nomi', required=True)
    achievements = LocaleListField(label='Yutuqlar', required=False)

    tutor = forms.ModelChoiceField(
        label='Tyutor',
        queryset=models.Person.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    students = forms.ModelMultipleChoiceField(
        label='Talabalar',
        queryset=models.Person.objects.none(),
        required=False,
        widget=forms.SelectMultiple(attrs=MULTI_STYLE),
    )

    class Meta:
        model = models.TutorGroup
        fields = [
            'name', 'tutor', 'students', 'achievements',
            'is_published', 'slug', 'external_id',
        ]
        labels = {
            'is_published': 'Saytda ko‘rsatilsin',
            'slug': 'Slug (avtomatik)',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['tutor'].queryset = people_qs()
        self.fields['students'].queryset = people_qs('student')
        self.fields['tutor'].label_from_instance = _person_label
        self.fields['students'].label_from_instance = _person_label
        self.fields['slug'].required = False
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            if inst.tutor_external_id:
                self.fields['tutor'].initial = models.Person.objects.filter(
                    external_id=inst.tutor_external_id
                ).first()
            if inst.student_external_ids:
                self.fields['students'].initial = models.Person.objects.filter(
                    external_id__in=inst.student_external_ids
                )

    def clean(self):
        cleaned = super().clean()
        name = cleaned.get('name') or {}
        name_uz = (name.get('uz') or '').strip() if isinstance(name, dict) else ''
        pk = self.instance.pk if self.instance else None
        if not (cleaned.get('external_id') or '').strip():
            cleaned['external_id'] = ensure_unique_external_id(
                models.TutorGroup, auto_external_id('g', name_uz), pk
            )
        if not (cleaned.get('slug') or '').strip():
            cleaned['slug'] = ensure_unique_slug(
                models.TutorGroup, make_slug(name_uz, fallback=cleaned['external_id']), pk
            )
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        tutor = self.cleaned_data.get('tutor')
        obj.tutor_external_id = tutor.external_id if tutor else ''
        students = self.cleaned_data.get('students')
        obj.student_external_ids = [s.external_id for s in (students or [])]
        if commit:
            obj.save()
        return obj


class TutorActivityAdminForm(forms.ModelForm):
    title = LocaleField(label='Sarlavha', required=True)
    description = LocaleField(label='Tavsif', required=False, textarea=True)

    tutor = forms.ModelChoiceField(
        label='Tyutor',
        queryset=models.Person.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )
    group = forms.ModelChoiceField(
        label='Guruh',
        queryset=models.TutorGroup.objects.none(),
        required=False,
        empty_label='— Tanlanmagan —',
        widget=forms.Select(attrs=SELECT_STYLE),
    )

    class Meta:
        model = models.TutorActivity
        fields = [
            'title', 'description', 'date',
            'tutor', 'group',
            'photo_file', 'photo',
            'is_published', 'external_id',
        ]
        labels = {
            'date': 'Sana',
            'photo_file': 'Rasm yuklash',
            'photo': 'Rasm URL',
            'is_published': 'Saytda ko‘rsatilsin',
            'external_id': 'Tizim ID (avtomatik)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['tutor'].queryset = people_qs()
        self.fields['group'].queryset = models.TutorGroup.objects.all().order_by('slug')
        self.fields['tutor'].label_from_instance = _person_label
        self.fields['group'].label_from_instance = _group_label
        self.fields['external_id'].required = False
        inst = self.instance
        if inst and inst.pk:
            if inst.tutor_external_id:
                self.fields['tutor'].initial = models.Person.objects.filter(
                    external_id=inst.tutor_external_id
                ).first()
            if inst.group_external_id:
                self.fields['group'].initial = models.TutorGroup.objects.filter(
                    external_id=inst.group_external_id
                ).first()

    def clean(self):
        cleaned = super().clean()
        title = cleaned.get('title') or {}
        title_uz = (title.get('uz') or '').strip() if isinstance(title, dict) else ''
        pk = self.instance.pk if self.instance else None
        if not (cleaned.get('external_id') or '').strip():
            cleaned['external_id'] = ensure_unique_external_id(
                models.TutorActivity, auto_external_id('act', title_uz), pk
            )
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        tutor = self.cleaned_data.get('tutor')
        obj.tutor_external_id = tutor.external_id if tutor else ''
        group = self.cleaned_data.get('group')
        obj.group_external_id = group.external_id if group else ''
        if commit:
            obj.save()
        return obj


# ─── Hero / Presidential / Rector / Navoi (oldingi locale formalar) ─
class HeroSlideAdminForm(forms.ModelForm):
    tag = LocaleField(label='Teg / badge', required=False)
    title = LocaleField(label='Sarlavha', required=False, textarea=True)
    description = LocaleField(label='Tavsif', required=False, textarea=True)
    cta_label = LocaleField(label='Tugma matni', required=False)

    class Meta:
        model = models.HeroSlide
        fields = '__all__'
        labels = {
            'image_file': 'Rasm yuklash',
            'image': 'Rasm URL (ixtiyoriy)',
            'is_published': 'Saytda ko‘rsatilsin',
        }


class PresidentialQuoteAdminForm(forms.ModelForm):
    quote = LocaleField(label='Iqtibos', required=False, textarea=True)
    source_title = LocaleField(label='Manba nomi', required=False, textarea=True)

    class Meta:
        model = models.PresidentialQuote
        fields = '__all__'


class RectorAddressAdminForm(forms.ModelForm):
    name = LocaleField(label='Rektor F.I.Sh.', required=False)
    title = LocaleField(label='Lavozim / unvon', required=False)
    university = LocaleField(label='Universitet', required=False)
    message = LocaleField(label='Murojaat matni', required=False, textarea=True)

    class Meta:
        model = models.RectorAddress
        fields = '__all__'


def _empty_locale(d) -> bool:
    if not d or not isinstance(d, dict):
        return True
    return not any((d.get(k) or '').strip() for k in ('uz', 'ru', 'en'))


def _lines_from_form(cleaned) -> list:
    return [
        cleaned.get('line1') or {},
        cleaned.get('line2') or {},
        cleaned.get('line3') or {},
        cleaned.get('line4') or {},
    ]


def _all_lines_empty(lines: list) -> bool:
    return all(_empty_locale(x) for x in lines)


class NavoiQuoteAdminForm(forms.ModelForm):
    attribution = LocaleField(label='Muallif', required=False)
    modern_bridge = LocaleField(label='Zamonaviy izoh', required=False, textarea=True)
    source_note = LocaleField(label='Manba yozuvi', required=False)
    line1 = LocaleField(label='1-misra', required=False)
    line2 = LocaleField(label='2-misra', required=False)
    line3 = LocaleField(label='3-misra', required=False)
    line4 = LocaleField(label='4-misra', required=False)

    class Meta:
        model = models.NavoiQuote
        exclude = ('lines',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        lines = list(self.instance.lines or []) if self.instance and self.instance.pk else []
        for i in range(4):
            key = f'line{i + 1}'
            val = lines[i] if i < len(lines) else {'uz': '', 'ru': '', 'en': ''}
            self.fields[key].initial = val
            self.initial[key] = val

    def save(self, commit=True):
        obj = super().save(commit=False)
        new_lines = _lines_from_form(self.cleaned_data)
        if not (_all_lines_empty(new_lines) and obj.pk and obj.lines):
            obj.lines = new_lines
        if commit:
            obj.save()
        return obj


class NavoiBandQuoteAdminForm(forms.ModelForm):
    attribution = LocaleField(label='Muallif', required=False)
    source = LocaleField(label='Manba', required=False)
    line1 = LocaleField(label='1-misra', required=False)
    line2 = LocaleField(label='2-misra', required=False)
    line3 = LocaleField(label='3-misra', required=False)
    line4 = LocaleField(label='4-misra', required=False)

    class Meta:
        model = models.NavoiBandQuote
        exclude = ('lines',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        lines = list(self.instance.lines or []) if self.instance and self.instance.pk else []
        for i in range(4):
            key = f'line{i + 1}'
            val = lines[i] if i < len(lines) else {'uz': '', 'ru': '', 'en': ''}
            self.fields[key].initial = val
            self.initial[key] = val

    def save(self, commit=True):
        obj = super().save(commit=False)
        new_lines = _lines_from_form(self.cleaned_data)
        if not (_all_lines_empty(new_lines) and obj.pk and obj.lines):
            obj.lines = new_lines
        if commit:
            obj.save()
        return obj


class FacultyStatsAdminForm(forms.ModelForm):
    faculty_overview = LocaleField(label='Fakultet haqida (qisqa)', required=False, textarea=True)
    president_name = LocaleField(label='Prezident F.I.Sh.', required=False)
    president_title = LocaleField(label='Prezident lavozimi', required=False)

    class Meta:
        model = models.FacultyStats
        fields = '__all__'


class ContactInfoAdminForm(forms.ModelForm):
    address = LocaleField(label='Manzil', required=False, textarea=True)

    class Meta:
        model = models.ContactInfo
        fields = '__all__'
