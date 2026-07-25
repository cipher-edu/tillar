from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'people', views.PersonViewSet, basename='people')
router.register(r'departments', views.DepartmentViewSet, basename='departments')
router.register(r'programs', views.ProgramViewSet, basename='programs')
router.register(r'news', views.NewsViewSet, basename='news')
router.register(r'history', views.HistoryViewSet, basename='history')
router.register(r'projects', views.ProjectViewSet, basename='projects')
router.register(r'publications', views.PublicationViewSet, basename='publications')
router.register(r'partners', views.PartnerViewSet, basename='partners')
router.register(r'groups', views.TutorGroupViewSet, basename='groups')
router.register(r'tutor-activities', views.TutorActivityViewSet, basename='tutor-activities')
router.register(r'hero-slides', views.HeroSlideViewSet, basename='hero-slides')

urlpatterns = [
    path('', include(router.urls)),
    path('bootstrap/', views.bootstrap_view),
    path('stats/', views.stats_view),
    path('contact/', views.contact_view),
    path('rector/', views.rector_view),
    path('presidential/', views.presidential_view),
    path('navoi-quotes/', views.navoi_quotes_view),
    path('navoi-band/', views.navoi_band_view),
    path('landing/', views.landing_view),
]
