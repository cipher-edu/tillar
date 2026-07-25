"""
DB → frontend shaklidagi to‘liq katalog (bootstrap / verify).
"""
from . import models
from .media_utils import media_or_url
from .serializers import (
    DepartmentSerializer,
    ProgramSerializer,
    NewsSerializer,
    HistoryEventSerializer,
    ProjectSerializer,
    PublicationSerializer,
    PartnerSerializer,
    TutorGroupSerializer,
    TutorActivitySerializer,
    HeroSlideSerializer,
    person_out,
)


def dump_catalog(request=None) -> dict:
    """seed.json ga yaqin to‘liq snapshot."""
    ctx = {'request': request}
    people = [person_out(p, request) for p in models.Person.objects.filter(is_published=True)]
    departments = [
        DepartmentSerializer(context=ctx).to_representation(o)
        for o in models.Department.objects.filter(is_published=True)
    ]
    programs = [
        ProgramSerializer(context=ctx).to_representation(o)
        for o in models.Program.objects.filter(is_published=True)
    ]
    news = [
        NewsSerializer(context=ctx).to_representation(o)
        for o in models.News.objects.filter(is_published=True)
    ]
    history_events = [
        HistoryEventSerializer(context=ctx).to_representation(o)
        for o in models.HistoryEvent.objects.filter(is_published=True)
    ]
    projects = [
        ProjectSerializer(context=ctx).to_representation(o)
        for o in models.Project.objects.filter(is_published=True)
    ]
    publications = [
        PublicationSerializer(context=ctx).to_representation(o)
        for o in models.Publication.objects.filter(is_published=True)
    ]
    partners = [
        PartnerSerializer(context=ctx).to_representation(o)
        for o in models.Partner.objects.filter(is_published=True)
    ]
    groups = [
        TutorGroupSerializer(context=ctx).to_representation(o)
        for o in models.TutorGroup.objects.filter(is_published=True)
    ]
    tutor_activities = [
        TutorActivitySerializer(context=ctx).to_representation(o)
        for o in models.TutorActivity.objects.filter(is_published=True)
    ]
    hero_slides = [
        HeroSlideSerializer(context=ctx).to_representation(o)
        for o in models.HeroSlide.objects.filter(is_published=True)
    ]
    presidential = [
        {
            'id': o.external_id,
            'theme': o.theme,
            'quote': o.quote,
            'sourceTitle': o.source_title,
            'sourceDate': o.source_date,
            'sourceUrl': o.source_url,
            'photo': media_or_url(getattr(o, 'photo_file', None), o.photo or '', request),
        }
        for o in models.PresidentialQuote.objects.filter(is_published=True)
    ]
    navoi_quotes = [
        {
            'id': o.external_id,
            'lines': o.lines,
            'attribution': o.attribution,
            'modernBridge': o.modern_bridge,
            'sourceNote': o.source_note,
        }
        for o in models.NavoiQuote.objects.filter(is_published=True)
    ]
    navoi_bands = [
        {
            'id': o.external_id,
            'pageKey': o.page_key,
            'lines': o.lines,
            'attribution': o.attribution,
            'source': o.source,
        }
        for o in models.NavoiBandQuote.objects.filter(is_published=True)
    ]

    s = models.FacultyStats.objects.first()
    stats = {}
    faculty_overview = {}
    faculty_facts = {}
    president_name = {}
    president_title = {}
    president_photo_fallback = ''
    if s:
        stats = {
            'students': s.students,
            'professors': s.professors,
            'programs': s.programs,
            'partners': s.partners,
            'projects': s.projects,
        }
        faculty_overview = s.faculty_overview or {}
        faculty_facts = s.faculty_facts or {}
        president_name = s.president_name or {}
        president_title = s.president_title or {}
        president_photo_fallback = s.president_photo_fallback or ''

    c = models.ContactInfo.objects.first()
    contact = {}
    if c:
        contact = {
            'address': c.address,
            'phone': c.phone,
            'email': c.email,
            'universityUrl': c.university_url,
            'socials': c.socials or [],
            'units': c.units or [],
            'mapEmbed': c.map_embed,
            'mapShort': c.map_short,
        }

    r = models.RectorAddress.objects.first()
    rector_info = {}
    rector_message = {}
    if r:
        rector_info = {
            'name': r.name,
            'title': r.title,
            'university': r.university,
            'photo': media_or_url(getattr(r, 'photo_file', None), r.photo or '', request),
        }
        rector_message = r.message or {}

    return {
        'people': people,
        'departments': departments,
        'programs': programs,
        'news': news,
        'historyEvents': history_events,
        'projects': projects,
        'publications': publications,
        'partners': partners,
        'groups': groups,
        'tutorActivities': tutor_activities,
        'heroSlides': hero_slides,
        'stats': stats,
        'facultyOverview': faculty_overview,
        'facultyFacts': faculty_facts,
        'contactInfo': contact,
        'presidentialQuotes': presidential,
        'presidentName': president_name,
        'presidentTitle': president_title,
        'presidentPhotoFallback': president_photo_fallback,
        'rectorInfo': rector_info,
        'rectorMessage': rector_message,
        'navoiQuotes': navoi_quotes,
        'navoiBands': navoi_bands,
        'meta': {
            'counts': {
                'people': len(people),
                'news': len(news),
                'departments': len(departments),
                'programs': len(programs),
                'historyEvents': len(history_events),
                'projects': len(projects),
                'publications': len(publications),
                'partners': len(partners),
                'groups': len(groups),
                'tutorActivities': len(tutor_activities),
                'heroSlides': len(hero_slides),
                'presidentialQuotes': len(presidential),
                'navoiQuotes': len(navoi_quotes),
                'navoiBands': len(navoi_bands),
            }
        },
    }
