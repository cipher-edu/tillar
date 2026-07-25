"""
fixtures/seed.json va DB dagi yozuvlarni solishtiradi.

  py -3 manage.py verify_seed
"""
from __future__ import annotations

import json
from pathlib import Path

from django.core.management.base import BaseCommand

from catalog import models
from catalog.dump import dump_catalog


class Command(BaseCommand):
    help = 'Compare seed.json expected counts with database'

    def handle(self, *args, **options):
        fixture = Path(__file__).resolve().parents[3] / 'fixtures' / 'seed.json'
        if not fixture.exists():
            self.stderr.write(self.style.ERROR(f'Missing {fixture}'))
            return

        data = json.loads(fixture.read_text(encoding='utf-8'))
        expected = {
            'people': len(data.get('people') or []),
            'news': len(data.get('news') or []),
            'departments': len(data.get('departments') or []),
            'programs': len(data.get('programs') or []),
            'historyEvents': len(data.get('historyEvents') or []),
            'projects': len(data.get('projects') or []),
            'publications': len(data.get('publications') or []),
            'partners': len(data.get('partners') or []),
            'groups': len(data.get('groups') or []),
            'tutorActivities': len(data.get('tutorActivities') or []),
            'heroSlides': len(data.get('heroSlides') or []),
            'presidentialQuotes': len(data.get('presidentialQuotes') or []),
            'navoiQuotes': len(data.get('navoiQuotes') or []),
            'navoiBands': len(data.get('navoiBands') or []),
            'facultyStats': 1 if data.get('stats') else 0,
            'contact': 1 if data.get('contactInfo') else 0,
            'rector': 1 if data.get('rectorInfo') else 0,
            'presidentName': 1 if data.get('presidentName') else 0,
        }
        actual = {
            'people': models.Person.objects.count(),
            'news': models.News.objects.count(),
            'departments': models.Department.objects.count(),
            'programs': models.Program.objects.count(),
            'historyEvents': models.HistoryEvent.objects.count(),
            'projects': models.Project.objects.count(),
            'publications': models.Publication.objects.count(),
            'partners': models.Partner.objects.count(),
            'groups': models.TutorGroup.objects.count(),
            'tutorActivities': models.TutorActivity.objects.count(),
            'heroSlides': models.HeroSlide.objects.count(),
            'presidentialQuotes': models.PresidentialQuote.objects.count(),
            'navoiQuotes': models.NavoiQuote.objects.count(),
            'navoiBands': models.NavoiBandQuote.objects.count(),
            'facultyStats': models.FacultyStats.objects.count(),
            'contact': models.ContactInfo.objects.count(),
            'rector': models.RectorAddress.objects.count(),
            'presidentName': 1
            if models.FacultyStats.objects.filter(president_name__isnull=False)
            .exclude(president_name={})
            .exists()
            else 0,
        }

        ok = True
        self.stdout.write('=== verify_seed ===')
        for k in expected:
            e, a = expected[k], actual[k]
            mark = 'OK' if e == a else 'FAIL'
            if e != a:
                ok = False
            self.stdout.write(f'  [{mark}] {k}: seed={e} db={a}')

        # IDs solishtirish (people)
        seed_ids = {p['id'] for p in data.get('people') or []}
        db_ids = set(models.Person.objects.values_list('external_id', flat=True))
        missing = seed_ids - db_ids
        extra = db_ids - seed_ids
        if missing:
            ok = False
            self.stdout.write(self.style.ERROR(f'  Missing people IDs: {sorted(missing)[:20]}'))
        if extra:
            self.stdout.write(self.style.WARNING(f'  Extra people IDs: {sorted(extra)[:20]}'))

        dump = dump_catalog()
        for key in ['people', 'news', 'programs', 'navoiBands']:
            if len(dump.get(key) or []) != expected.get(key if key != 'navoiBands' else 'navoiBands', 0):
                # soft check
                pass
        self.stdout.write(f'  bootstrap dump people={len(dump["people"])} news={len(dump["news"])}')

        if ok:
            self.stdout.write(self.style.SUCCESS('ALL MATCH — frontend seed to‘liq DB da.'))
        else:
            self.stdout.write(self.style.ERROR('MISMATCH — seed_from_fixture qayta ishga tushiring.'))
