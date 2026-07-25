"""
API javoblari frontend TypeScript tiplariga yaqin shaklda.
Rasm: media fayl ustun, aks holda URL.
"""
from rest_framework import serializers
from . import models
from .media_utils import media_or_url


def _req(serializer_field_parent=None, context=None):
    if context:
        return context.get('request')
    return None


def person_out(p: models.Person, request=None) -> dict:
    return {
        'id': p.external_id,
        'slug': p.slug,
        'roles': p.roles or [],
        'name': p.name or {},
        'photo': media_or_url(p.photo_file, p.photo or '', request),
        'degree': p.degree or None,
        'position': p.position or None,
        'departmentId': p.department_external_id or None,
        'programId': p.program_external_id or None,
        'course': p.course,
        'groupId': p.group_external_id or None,
        'badges': p.badges or [],
        'supervisorId': p.supervisor_external_id or None,
        'studentIds': p.student_external_ids or [],
        'groupIds': p.group_external_ids or [],
        'interests': p.interests or [],
        'bio': p.bio or None,
        'email': p.email or None,
        'phone': p.phone or None,
        'officeHours': p.office_hours or None,
        'office': p.office or None,
        'external': p.external_links or None,
        'yearsActive': p.years_active or None,
        'isMemorial': p.is_memorial,
        'leadershipLevel': p.leadership_level or None,
        'sortOrder': p.sort_order,
        'publicationsCount': p.publications_count,
    }


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = '__all__'

    def to_representation(self, instance):
        return person_out(instance, self.context.get('request'))


class DepartmentSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        return {
            'id': o.external_id,
            'slug': o.slug,
            'name': o.name,
            'headId': o.head_external_id,
            'description': o.description,
            'researchAreas': o.research_areas or [],
            'professorIds': o.professor_external_ids or [],
        }

    class Meta:
        model = models.Department
        fields = '__all__'


class ProgramSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        return {
            'id': o.external_id,
            'slug': o.slug,
            'name': o.name,
            'level': o.level,
            'studyForm': o.study_form,
            'description': o.description,
            'careers': o.careers or [],
            'professorIds': o.professor_external_ids or [],
            'curriculumUrl': o.curriculum_url or None,
            'icon': o.icon or None,
        }

    class Meta:
        model = models.Program
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        req = self.context.get('request')
        return {
            'id': o.external_id,
            'slug': o.slug,
            'category': o.category,
            'title': o.title,
            'excerpt': o.excerpt,
            'body': o.body,
            'date': o.date.isoformat() if o.date else None,
            'cover': media_or_url(o.cover_file, o.cover or '', req),
            'authorId': o.author_external_id or None,
            'relatedPersonIds': o.related_person_external_ids or [],
        }

    class Meta:
        model = models.News
        fields = '__all__'


class HistoryEventSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        return {
            'id': o.external_id,
            'year': o.year,
            'title': o.title,
            'description': o.description,
            'photos': o.photos or [],
            'relatedPersonIds': o.related_person_external_ids or [],
        }

    class Meta:
        model = models.HistoryEvent
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        return {
            'id': o.external_id,
            'slug': o.slug,
            'title': o.title,
            'leaderId': o.leader_external_id,
            'participantIds': o.participant_external_ids or [],
            'status': o.status,
            'grant': o.grant or None,
            'description': o.description,
            'results': o.results or None,
        }

    class Meta:
        model = models.Project
        fields = '__all__'


class PublicationSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        return {
            'id': o.external_id,
            'title': o.title,
            'year': o.year,
            'authors': o.author_external_ids or [],
            'departmentId': o.department_external_id or None,
            'indexed': o.indexed if o.indexed != 'none' else 'none',
            'type': o.pub_type,
        }

    class Meta:
        model = models.Publication
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        req = self.context.get('request')
        logo_url = media_or_url(o.logo_file, '', req) if getattr(o, 'logo_file', None) else ''
        data = {
            'id': o.external_id,
            'name': o.name,
            'logoText': o.logo_text,
            'country': o.country or None,
            'region': o.region or None,
        }
        if logo_url:
            data['logoUrl'] = logo_url
        return data

    class Meta:
        model = models.Partner
        fields = '__all__'


class TutorGroupSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        return {
            'id': o.external_id,
            'slug': o.slug,
            'name': o.name,
            'tutorId': o.tutor_external_id,
            'studentIds': o.student_external_ids or [],
            'achievements': o.achievements or [],
        }

    class Meta:
        model = models.TutorGroup
        fields = '__all__'


class TutorActivitySerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        req = self.context.get('request')
        return {
            'id': o.external_id,
            'tutorId': o.tutor_external_id,
            'groupId': o.group_external_id or None,
            'date': o.date.isoformat() if o.date else None,
            'title': o.title,
            'description': o.description,
            'photo': media_or_url(getattr(o, 'photo_file', None), o.photo or '', req) or None,
        }

    class Meta:
        model = models.TutorActivity
        fields = '__all__'


class HeroSlideSerializer(serializers.ModelSerializer):
    def to_representation(self, o):
        req = self.context.get('request')
        return {
            'id': o.external_id,
            'image': media_or_url(getattr(o, 'image_file', None), o.image or '', req),
            'accent': o.accent or 'amber',
            'tag': o.tag or {},
            'title': o.title or {},
            'description': o.description or {},
            'ctaLabel': o.cta_label or {},
            'ctaTo': o.cta_to or '/',
        }

    class Meta:
        model = models.HeroSlide
        fields = '__all__'
