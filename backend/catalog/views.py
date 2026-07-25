from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models
from .dump import dump_catalog
from .serializers import (
    PersonSerializer,
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


class PersonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PersonSerializer
    lookup_field = 'slug'
    queryset = models.Person.objects.filter(is_published=True)

    def get_queryset(self):
        qs = super().get_queryset()
        level = self.request.query_params.get('level')
        if level:
            qs = qs.filter(leadership_level=level)
        return qs

    def list(self, request, *args, **kwargs):
        qs = list(self.get_queryset())
        role = request.query_params.get('role')
        if role:
            qs = [p for p in qs if role in (p.roles or [])]
        limit = request.query_params.get('limit')
        if limit and limit.isdigit():
            qs = qs[: int(limit)]
        return Response([person_out(p, request) for p in qs])

    def retrieve(self, request, *args, **kwargs):
        # slug yoki external_id
        lookup = kwargs.get(self.lookup_field)
        obj = (
            models.Person.objects.filter(slug=lookup, is_published=True).first()
            or models.Person.objects.filter(external_id=lookup, is_published=True).first()
        )
        if not obj:
            return Response({'detail': 'Not found'}, status=404)
        return Response(person_out(obj, request))


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DepartmentSerializer
    lookup_field = 'slug'
    queryset = models.Department.objects.filter(is_published=True)

    def retrieve(self, request, *args, **kwargs):
        lookup = kwargs.get(self.lookup_field)
        obj = (
            models.Department.objects.filter(slug=lookup).first()
            or models.Department.objects.filter(external_id=lookup).first()
        )
        if not obj:
            return Response({'detail': 'Not found'}, status=404)
        return Response(DepartmentSerializer().to_representation(obj))


class ProgramViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProgramSerializer
    lookup_field = 'slug'
    queryset = models.Program.objects.filter(is_published=True)

    def get_queryset(self):
        qs = super().get_queryset()
        level = self.request.query_params.get('level')
        if level:
            qs = qs.filter(level=level)
        return qs

    def retrieve(self, request, *args, **kwargs):
        lookup = kwargs.get(self.lookup_field)
        obj = (
            models.Program.objects.filter(slug=lookup).first()
            or models.Program.objects.filter(external_id=lookup).first()
        )
        if not obj:
            return Response({'detail': 'Not found'}, status=404)
        return Response(ProgramSerializer().to_representation(obj))


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NewsSerializer
    lookup_field = 'slug'
    queryset = models.News.objects.filter(is_published=True)

    def get_queryset(self):
        qs = super().get_queryset()
        cat = self.request.query_params.get('category')
        if cat:
            qs = qs.filter(category=cat)
        limit = self.request.query_params.get('limit')
        if limit and limit.isdigit():
            return qs[: int(limit)]
        return qs

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        # get_queryset may return a list slice
        if isinstance(qs, list):
            return Response([NewsSerializer().to_representation(o) for o in qs])
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        lookup = kwargs.get(self.lookup_field)
        obj = (
            models.News.objects.filter(slug=lookup).first()
            or models.News.objects.filter(external_id=lookup).first()
        )
        if not obj:
            return Response({'detail': 'Not found'}, status=404)
        return Response(NewsSerializer().to_representation(obj))


class HistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = HistoryEventSerializer
    lookup_field = 'external_id'
    queryset = models.HistoryEvent.objects.filter(is_published=True)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = 'slug'
    queryset = models.Project.objects.filter(is_published=True)

    def retrieve(self, request, *args, **kwargs):
        lookup = kwargs.get(self.lookup_field)
        obj = (
            models.Project.objects.filter(slug=lookup).first()
            or models.Project.objects.filter(external_id=lookup).first()
        )
        if not obj:
            return Response({'detail': 'Not found'}, status=404)
        return Response(ProjectSerializer().to_representation(obj))


class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PublicationSerializer
    queryset = models.Publication.objects.filter(is_published=True)


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PartnerSerializer
    queryset = models.Partner.objects.filter(is_published=True)


class TutorGroupViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TutorGroupSerializer
    lookup_field = 'slug'
    queryset = models.TutorGroup.objects.filter(is_published=True)


class TutorActivityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TutorActivitySerializer
    queryset = models.TutorActivity.objects.filter(is_published=True)


class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = HeroSlideSerializer
    queryset = models.HeroSlide.objects.filter(is_published=True)


@api_view(['GET'])
def stats_view(request):
    s = models.FacultyStats.objects.first()
    if not s:
        return Response({})
    return Response({
        'students': s.students,
        'professors': s.professors,
        'programs': s.programs,
        'partners': s.partners,
        'projects': s.projects,
        'facultyOverview': s.faculty_overview,
        'facultyFacts': s.faculty_facts,
        'presidentName': s.president_name,
        'presidentTitle': s.president_title,
        'presidentPhotoFallback': s.president_photo_fallback,
    })


@api_view(['GET'])
def bootstrap_view(request):
    """Frontend hydrate uchun barcha kontent — bitta so‘rov."""
    return Response(dump_catalog(request=request))


@api_view(['GET'])
def contact_view(request):
    c = models.ContactInfo.objects.first()
    if not c:
        return Response({})
    return Response({
        'address': c.address,
        'phone': c.phone,
        'email': c.email,
        'universityUrl': c.university_url,
        'socials': c.socials or [],
        'units': c.units or [],
        'mapEmbed': c.map_embed,
        'mapShort': c.map_short,
    })


@api_view(['GET'])
def rector_view(request):
    from .media_utils import media_or_url
    r = models.RectorAddress.objects.first()
    if not r:
        return Response({})
    return Response({
        'info': {
            'name': r.name,
            'title': r.title,
            'university': r.university,
            'photo': media_or_url(getattr(r, 'photo_file', None), r.photo or '', request),
        },
        'message': r.message,
    })


@api_view(['GET'])
def presidential_view(request):
    from .media_utils import media_or_url
    qs = models.PresidentialQuote.objects.filter(is_published=True)
    items = []
    for o in qs:
        items.append({
            'id': o.external_id,
            'theme': o.theme,
            'quote': o.quote,
            'sourceTitle': o.source_title,
            'sourceDate': o.source_date,
            'sourceUrl': o.source_url,
            'photo': media_or_url(getattr(o, 'photo_file', None), o.photo or '', request),
        })
    return Response(items)


@api_view(['GET'])
def navoi_quotes_view(request):
    qs = models.NavoiQuote.objects.filter(is_published=True)
    return Response([
        {
            'id': o.external_id,
            'lines': o.lines,
            'attribution': o.attribution,
            'modernBridge': o.modern_bridge,
            'sourceNote': o.source_note,
        }
        for o in qs
    ])


@api_view(['GET'])
def navoi_band_view(request):
    page = request.query_params.get('page', 'home')
    o = models.NavoiBandQuote.objects.filter(
        page_key=page, is_published=True
    ).first()
    if not o:
        o = models.NavoiBandQuote.objects.filter(
            page_key='home', is_published=True
        ).first()
    if not o:
        return Response({})
    return Response({
        'id': o.external_id,
        'pageKey': o.page_key,
        'lines': o.lines,
        'attribution': o.attribution,
        'source': o.source,
    })


@api_view(['GET'])
def landing_view(request):
    """Barcha landing bo‘limlari — bitta so‘rov."""
    s = models.FacultyStats.objects.first()
    stats = {}
    if s:
        stats = {
            'students': s.students,
            'professors': s.professors,
            'programs': s.programs,
            'partners': s.partners,
            'projects': s.projects,
            'facultyOverview': s.faculty_overview,
            'facultyFacts': s.faculty_facts,
        }

    heroes = [
        HeroSlideSerializer().to_representation(h)
        for h in models.HeroSlide.objects.filter(is_published=True)
    ]
    partners = [
        PartnerSerializer().to_representation(p)
        for p in models.Partner.objects.filter(is_published=True)
    ]
    leaders = [
        person_out(p)
        for p in models.Person.objects.filter(
            is_published=True, leadership_level='university'
        ).order_by('sort_order')
        if 'leader' in (p.roles or [])
    ]
    students = [
        person_out(p)
        for p in models.Person.objects.filter(is_published=True)
        if 'student' in (p.roles or [])
    ][:8]
    news = [
        NewsSerializer().to_representation(n)
        for n in models.News.objects.filter(is_published=True)[:4]
    ]
    programs = [
        ProgramSerializer().to_representation(p)
        for p in models.Program.objects.filter(is_published=True)[:6]
    ]
    projects = [
        ProjectSerializer().to_representation(p)
        for p in models.Project.objects.filter(is_published=True)[:3]
    ]

    r = models.RectorAddress.objects.first()
    rector = {}
    if r:
        rector = {
            'info': {
                'name': r.name,
                'title': r.title,
                'university': r.university,
                'photo': r.photo,
            },
            'message': r.message,
        }

    presidential = [
        {
            'id': o.external_id,
            'theme': o.theme,
            'quote': o.quote,
            'sourceTitle': o.source_title,
            'sourceDate': o.source_date,
            'sourceUrl': o.source_url,
            'photo': o.photo,
        }
        for o in models.PresidentialQuote.objects.filter(is_published=True)
    ]

    navoi = [
        {
            'id': o.external_id,
            'lines': o.lines,
            'attribution': o.attribution,
            'modernBridge': o.modern_bridge,
            'sourceNote': o.source_note,
        }
        for o in models.NavoiQuote.objects.filter(is_published=True)
    ]

    return Response({
        'stats': stats,
        'heroSlides': heroes,
        'partners': partners,
        'leaders': leaders,
        'students': students,
        'news': news,
        'programs': programs,
        'projects': projects,
        'rector': rector,
        'presidentialQuotes': presidential,
        'navoiQuotes': navoi,
    })
