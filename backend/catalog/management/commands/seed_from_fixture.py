"""
frontend seed.json dagi barcha real ma'lumotlarni DB ga yuklaydi.

  py -3 manage.py seed_from_fixture
  py -3 manage.py seed_from_fixture --clear
"""
from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from catalog import models


def parse_date(s: str | None) -> date | None:
    if not s:
        return None
    try:
        return date.fromisoformat(s[:10])
    except Exception:
        return None


class Command(BaseCommand):
    help = 'Load backend/fixtures/seed.json into database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear catalog tables before seed',
        )

    def handle(self, *args, **options):
        fixture = Path(__file__).resolve().parents[3] / 'fixtures' / 'seed.json'
        if not fixture.exists():
            self.stderr.write(self.style.ERROR(f'Fixture not found: {fixture}'))
            self.stderr.write('Run: npx tsx scripts/export-seed.ts')
            return

        data = json.loads(fixture.read_text(encoding='utf-8'))
        self.stdout.write(f'Loading {fixture} …')

        with transaction.atomic():
            if options['clear']:
                self._clear()
            self._seed(data)

        self.stdout.write(self.style.SUCCESS('Seed completed successfully.'))

    def _clear(self):
        for m in [
            models.NavoiBandQuote,
            models.NavoiQuote,
            models.RectorAddress,
            models.PresidentialQuote,
            models.ContactInfo,
            models.FacultyStats,
            models.HeroSlide,
            models.TutorActivity,
            models.TutorGroup,
            models.Partner,
            models.Publication,
            models.Project,
            models.HistoryEvent,
            models.News,
            models.Program,
            models.Department,
            models.Person,
        ]:
            m.objects.all().delete()
        self.stdout.write('Cleared catalog tables.')

    def _seed(self, data: dict):
        # People
        for p in data.get('people', []):
            models.Person.objects.update_or_create(
                external_id=p['id'],
                defaults={
                    'slug': p['slug'],
                    'roles': p.get('roles') or [],
                    'name': p.get('name') or {},
                    'photo': p.get('photo') or '',
                    'degree': p.get('degree') or {},
                    'position': p.get('position') or {},
                    'department_external_id': p.get('departmentId') or '',
                    'program_external_id': p.get('programId') or '',
                    'course': p.get('course'),
                    'group_external_id': p.get('groupId') or '',
                    'badges': p.get('badges') or [],
                    'supervisor_external_id': p.get('supervisorId') or '',
                    'student_external_ids': p.get('studentIds') or [],
                    'group_external_ids': p.get('groupIds') or [],
                    'interests': p.get('interests') or [],
                    'bio': p.get('bio') or {},
                    'email': p.get('email') or '',
                    'phone': p.get('phone') or '',
                    'office_hours': p.get('officeHours') or {},
                    'office': p.get('office') or {},
                    'external_links': p.get('external') or {},
                    'years_active': p.get('yearsActive') or '',
                    'is_memorial': bool(p.get('isMemorial')),
                    'leadership_level': p.get('leadershipLevel') or '',
                    'sort_order': p.get('sortOrder') if p.get('sortOrder') is not None else 99,
                    'publications_count': p.get('publicationsCount'),
                },
            )
        self.stdout.write(f'  people: {len(data.get("people", []))}')

        # Departments
        for d in data.get('departments', []):
            models.Department.objects.update_or_create(
                external_id=d['id'],
                defaults={
                    'slug': d['slug'],
                    'name': d.get('name') or {},
                    'head_external_id': d.get('headId') or '',
                    'description': d.get('description') or {},
                    'research_areas': d.get('researchAreas') or [],
                    'professor_external_ids': d.get('professorIds') or [],
                },
            )
        self.stdout.write(f'  departments: {len(data.get("departments", []))}')

        # Programs
        for pr in data.get('programs', []):
            models.Program.objects.update_or_create(
                external_id=pr['id'],
                defaults={
                    'slug': pr['slug'],
                    'name': pr.get('name') or {},
                    'level': pr.get('level') or 'bachelor',
                    'study_form': pr.get('studyForm') or 'full_time',
                    'description': pr.get('description') or {},
                    'careers': pr.get('careers') or [],
                    'professor_external_ids': pr.get('professorIds') or [],
                    'curriculum_url': pr.get('curriculumUrl') or '',
                    'icon': pr.get('icon') or '',
                },
            )
        self.stdout.write(f'  programs: {len(data.get("programs", []))}')

        # News
        for n in data.get('news', []):
            models.News.objects.update_or_create(
                external_id=n['id'],
                defaults={
                    'slug': n['slug'],
                    'category': n.get('category') or 'faculty',
                    'title': n.get('title') or {},
                    'excerpt': n.get('excerpt') or {},
                    'body': n.get('body') or {},
                    'date': parse_date(n.get('date')) or date.today(),
                    'cover': n.get('cover') or '',
                    'author_external_id': n.get('authorId') or '',
                    'related_person_external_ids': n.get('relatedPersonIds') or [],
                },
            )
        self.stdout.write(f'  news: {len(data.get("news", []))}')

        # History
        for i, h in enumerate(data.get('historyEvents', [])):
            models.HistoryEvent.objects.update_or_create(
                external_id=h['id'],
                defaults={
                    'year': h.get('year') or '',
                    'title': h.get('title') or {},
                    'description': h.get('description') or {},
                    'photos': h.get('photos') or [],
                    'related_person_external_ids': h.get('relatedPersonIds') or [],
                    'sort_order': i,
                },
            )
        self.stdout.write(f'  history: {len(data.get("historyEvents", []))}')

        # Projects
        for pr in data.get('projects', []):
            models.Project.objects.update_or_create(
                external_id=pr['id'],
                defaults={
                    'slug': pr['slug'],
                    'title': pr.get('title') or {},
                    'leader_external_id': pr.get('leaderId') or '',
                    'participant_external_ids': pr.get('participantIds') or [],
                    'status': pr.get('status') or 'ongoing',
                    'grant': pr.get('grant') or {},
                    'description': pr.get('description') or {},
                    'results': pr.get('results') or {},
                },
            )
        self.stdout.write(f'  projects: {len(data.get("projects", []))}')

        # Publications
        for i, pub in enumerate(data.get('publications', [])):
            models.Publication.objects.update_or_create(
                external_id=pub.get('id') or f'pub-{i}',
                defaults={
                    'title': pub.get('title') or {},
                    'year': pub.get('year') or 2025,
                    'author_external_ids': pub.get('authors') or [],
                    'department_external_id': pub.get('departmentId') or '',
                    'indexed': pub.get('indexed') or 'none',
                    'pub_type': pub.get('type') or 'article',
                },
            )
        self.stdout.write(f'  publications: {len(data.get("publications", []))}')

        # Partners
        for i, pt in enumerate(data.get('partners', [])):
            models.Partner.objects.update_or_create(
                external_id=pt['id'],
                defaults={
                    'name': pt.get('name') or '',
                    'logo_text': pt.get('logoText') or '',
                    'country': pt.get('country') or '',
                    'region': pt.get('region') or '',
                    'sort_order': i,
                },
            )
        self.stdout.write(f'  partners: {len(data.get("partners", []))}')

        # Groups
        for g in data.get('groups', []):
            models.TutorGroup.objects.update_or_create(
                external_id=g['id'],
                defaults={
                    'slug': g['slug'],
                    'name': g.get('name') or {},
                    'tutor_external_id': g.get('tutorId') or '',
                    'student_external_ids': g.get('studentIds') or [],
                    'achievements': g.get('achievements') or [],
                },
            )
        self.stdout.write(f'  groups: {len(data.get("groups", []))}')

        # Tutor activities
        for a in data.get('tutorActivities', []):
            models.TutorActivity.objects.update_or_create(
                external_id=a['id'],
                defaults={
                    'tutor_external_id': a.get('tutorId') or '',
                    'group_external_id': a.get('groupId') or '',
                    'date': parse_date(a.get('date')) or date.today(),
                    'title': a.get('title') or {},
                    'description': a.get('description') or {},
                    'photo': a.get('photo') or '',
                },
            )
        self.stdout.write(f'  tutorActivities: {len(data.get("tutorActivities", []))}')

        # Hero slides
        for i, h in enumerate(data.get('heroSlides', [])):
            models.HeroSlide.objects.update_or_create(
                external_id=h['id'],
                defaults={
                    'image': h.get('image') or '',
                    'accent': h.get('accent') or '',
                    'tag': h.get('tag') or {},
                    'title': h.get('title') or {},
                    'description': h.get('description') or {},
                    'cta_label': h.get('ctaLabel') or {},
                    'cta_to': h.get('ctaTo') or '',
                    'sort_order': i,
                },
            )
        self.stdout.write(f'  heroSlides: {len(data.get("heroSlides", []))}')

        # Stats singleton (+ president meta)
        st = data.get('stats') or {}
        models.FacultyStats.objects.all().delete()
        models.FacultyStats.objects.create(
            students=st.get('students') or 0,
            professors=st.get('professors') or 0,
            programs=st.get('programs') or 0,
            partners=st.get('partners') or 0,
            projects=st.get('projects') or 0,
            faculty_overview=data.get('facultyOverview') or {},
            faculty_facts=data.get('facultyFacts') or {},
            president_name=data.get('presidentName') or {},
            president_title=data.get('presidentTitle') or {},
            president_photo_fallback=data.get('presidentPhotoFallback')
            or '/images/president/lang-1.jpg',
        )
        self.stdout.write('  facultyStats: 1 (+ president meta)')

        # Contact
        ci = data.get('contactInfo') or {}
        models.ContactInfo.objects.all().delete()
        models.ContactInfo.objects.create(
            address=ci.get('address') or {},
            phone=ci.get('phone') or '',
            email=ci.get('email') or '',
            university_url=ci.get('universityUrl') or '',
            socials=ci.get('socials') or [],
            units=ci.get('units') or [],
            map_embed='https://yandex.uz/map-widget/v1/-/CTfeeSZh',
            map_short='https://yandex.uz/maps/-/CTfeeSZh',
        )
        self.stdout.write('  contact: 1')

        # Presidential
        for i, q in enumerate(data.get('presidentialQuotes', [])):
            models.PresidentialQuote.objects.update_or_create(
                external_id=q.get('id') or f'pres-{i}',
                defaults={
                    'theme': q.get('theme') or '',
                    'quote': q.get('quote') or {},
                    'source_title': q.get('sourceTitle') or {},
                    'source_date': q.get('sourceDate') or '',
                    'source_url': q.get('sourceUrl') or '',
                    'photo': q.get('photo') or '',
                    'sort_order': i,
                },
            )
        self.stdout.write(f'  presidential: {len(data.get("presidentialQuotes", []))}')

        # Rector
        ri = data.get('rectorInfo') or {}
        models.RectorAddress.objects.all().delete()
        models.RectorAddress.objects.create(
            name=ri.get('name') or {},
            title=ri.get('title') or {},
            university=ri.get('university') or {},
            photo=ri.get('photo') or '',
            message=data.get('rectorMessage') or {},
        )
        self.stdout.write('  rector: 1')

        # Navoi quotes (landing)
        for i, nq in enumerate(data.get('navoiQuotes', [])):
            models.NavoiQuote.objects.update_or_create(
                external_id=nq.get('id') or f'navoi-{i}',
                defaults={
                    'lines': nq.get('lines') or [],
                    'attribution': nq.get('attribution') or {},
                    'modern_bridge': nq.get('modernBridge') or {},
                    'source_note': nq.get('sourceNote') or {},
                    'sort_order': i,
                },
            )
        self.stdout.write(f'  navoiQuotes: {len(data.get("navoiQuotes", []))}')

        # Navoi bands
        for b in data.get('navoiBands', []):
            # page key from id like band-home -> home
            eid = b.get('id') or ''
            page_key = eid.replace('band-', '') if eid.startswith('band-') else eid
            models.NavoiBandQuote.objects.update_or_create(
                external_id=eid or page_key,
                defaults={
                    'page_key': page_key or 'home',
                    'lines': b.get('lines') or [],
                    'attribution': b.get('attribution') or {},
                    'source': b.get('source') or {},
                },
            )
        self.stdout.write(f'  navoiBands: {len(data.get("navoiBands", []))}')
