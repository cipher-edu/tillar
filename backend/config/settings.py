"""
NavDU Tillar Fakulteti — Django API + Jazzmin Admin

Muhit o‘zgaruvchilari (production / cPanel .env yoki SetEnv):
  DJANGO_DEBUG=0
  DJANGO_SECRET_KEY=...
  DJANGO_ALLOWED_HOSTS=domen.uz,www.domen.uz
  DJANGO_CORS_ORIGINS=https://domen.uz,https://www.domen.uz
  DJANGO_CSRF_TRUSTED=https://domen.uz,https://www.domen.uz
  DATABASE_URL=  (ixtiyoriy; bo‘sh = SQLite)
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# .env fayl (ixtiyoriy, python-dotenv shart emas — qo‘lda o‘qiymiz)
_env_file = BASE_DIR / '.env'
if _env_file.exists():
    for _line in _env_file.read_text(encoding='utf-8').splitlines():
        _line = _line.strip()
        if not _line or _line.startswith('#') or '=' not in _line:
            continue
        _k, _, _v = _line.partition('=')
        _k, _v = _k.strip(), _v.strip().strip('"').strip("'")
        os.environ.setdefault(_k, _v)


def _env_bool(name: str, default: bool = False) -> bool:
    val = os.environ.get(name)
    if val is None:
        return default
    return val.strip().lower() in ('1', 'true', 'yes', 'on')


def _env_list(name: str, default: list | None = None) -> list:
    raw = os.environ.get(name, '')
    if not raw.strip():
        return list(default or [])
    return [x.strip() for x in raw.split(',') if x.strip()]


SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'django-insecure-dev-navdu-tillar-fakulteti-change-in-production',
)

DEBUG = _env_bool('DJANGO_DEBUG', default=True)

ALLOWED_HOSTS = _env_list('DJANGO_ALLOWED_HOSTS', default=['*'] if DEBUG else [])

INSTALLED_APPS = [
    # Jazzmin — django.contrib.admin dan OLDIN
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'ckeditor',
    'ckeditor_uploader',
    'catalog',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database: default SQLite; MySQL uchun DJANGO_DB_* yoki DATABASE_ENGINE
_db_engine = os.environ.get('DJANGO_DB_ENGINE', 'sqlite')
if _db_engine == 'mysql':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ.get('DJANGO_DB_NAME', ''),
            'USER': os.environ.get('DJANGO_DB_USER', ''),
            'PASSWORD': os.environ.get('DJANGO_DB_PASSWORD', ''),
            'HOST': os.environ.get('DJANGO_DB_HOST', 'localhost'),
            'PORT': os.environ.get('DJANGO_DB_PORT', '3306'),
            'OPTIONS': {'charset': 'utf8mb4'},
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.environ.get(
                'DJANGO_DB_PATH',
                str(BASE_DIR / 'db.sqlite3'),
            ),
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'uz'
TIME_ZONE = 'Asia/Tashkent'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
# WhiteNoise — cPanel da static fayllar
STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage',
    },
}

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
_cors = _env_list('DJANGO_CORS_ORIGINS')
if DEBUG and not _cors:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = _cors

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = _env_list('DJANGO_CSRF_TRUSTED', default=_cors)

# Production xavfsizlik
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = _env_bool('DJANGO_COOKIE_SECURE', True)
    CSRF_COOKIE_SECURE = _env_bool('DJANGO_COOKIE_SECURE', True)
    SECURE_SSL_REDIRECT = _env_bool('DJANGO_SSL_REDIRECT', False)

_renderers = ['rest_framework.renderers.JSONRenderer']
if DEBUG:
    _renderers.append('rest_framework.renderers.BrowsableAPIRenderer')

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': None,
    'DEFAULT_RENDERER_CLASSES': _renderers,
}

# ─── Jazzmin (Admin UI) ───────────────────────────────────────────
# Iconlar: Font Awesome 5 (fas / far / fab)
JAZZMIN_SETTINGS = {
    'site_title': 'Tillar fakulteti Admin',
    'site_header': 'Tillar fakulteti',
    'site_brand': 'NavDU · TF',
    'site_logo': None,
    'login_logo': None,
    'site_logo_classes': 'img-circle',
    'site_icon': None,
    'welcome_sign': 'Navoiy davlat universiteti — Tillar fakulteti boshqaruv paneli',
    'copyright': 'NavDU Tillar fakulteti',
    'search_model': [
        'catalog.Person',
        'catalog.News',
        'catalog.Program',
        'catalog.Department',
    ],
    'user_avatar': None,

    # Yuqori menyu
    'topmenu_links': [
        {'name': 'Bosh sahifa', 'url': 'admin:index', 'permissions': ['auth.view_user']},
        {'name': 'API', 'url': '/api/bootstrap/', 'new_window': True},
        {'model': 'auth.User'},
    ],

    'usermenu_links': [
        {'model': 'auth.user'},
    ],

    'show_sidebar': True,
    'navigation_expanded': True,
    'hide_apps': [],
    'hide_models': [],

    # Yon menyu tartibi (app_label.model_name)
    'order_with_respect_to': [
        'catalog',
        'catalog.FacultyStats',
        'catalog.HeroSlide',
        'catalog.Person',
        'catalog.Department',
        'catalog.Program',
        'catalog.News',
        'catalog.HistoryEvent',
        'catalog.Project',
        'catalog.Publication',
        'catalog.Partner',
        'catalog.TutorGroup',
        'catalog.TutorActivity',
        'catalog.ContactInfo',
        'catalog.RectorAddress',
        'catalog.PresidentialQuote',
        'catalog.NavoiQuote',
        'catalog.NavoiBandQuote',
        'auth',
    ],

    # Model iconlari (Font Awesome 5)
    'icons': {
        'auth': 'fas fa-users-cog',
        'auth.user': 'fas fa-user',
        'auth.Group': 'fas fa-users',
        'catalog.Person': 'fas fa-user-tie',
        'catalog.Department': 'fas fa-university',
        'catalog.Program': 'fas fa-graduation-cap',
        'catalog.News': 'fas fa-newspaper',
        'catalog.HistoryEvent': 'fas fa-landmark',
        'catalog.Project': 'fas fa-flask',
        'catalog.Publication': 'fas fa-book',
        'catalog.Partner': 'fas fa-handshake',
        'catalog.TutorGroup': 'fas fa-chalkboard-teacher',
        'catalog.TutorActivity': 'fas fa-calendar-check',
        'catalog.HeroSlide': 'fas fa-images',
        'catalog.FacultyStats': 'fas fa-chart-bar',
        'catalog.ContactInfo': 'fas fa-address-book',
        'catalog.RectorAddress': 'fas fa-scroll',
        'catalog.PresidentialQuote': 'fas fa-quote-left',
        'catalog.NavoiQuote': 'fas fa-feather-alt',
        'catalog.NavoiBandQuote': 'fas fa-book-open',
    },
    'default_icon_parents': 'fas fa-folder',
    'default_icon_children': 'fas fa-circle',

    'related_modal_active': True,
    # Faqat ichki kontent oq — sidebar Jazzmin mavzusida qoladi
    'custom_css': 'admin/css/admin_content_white.css',
    'custom_js': None,
    'use_google_fonts_cdn': True,
    'show_ui_builder': False,

    'changeform_format': 'horizontal_tabs',
    'changeform_format_overrides': {
        'auth.user': 'collapsible',
        'auth.group': 'vertical_tabs',
        'catalog.person': 'horizontal_tabs',
        'catalog.news': 'horizontal_tabs',
        'catalog.facultystats': 'horizontal_tabs',
    },
    'language_chooser': False,
}

# JAZZMIN_UI_TWEAKS = {
#     'theme': 'flatly',
#     'dark_mode_theme': 'darkly',
# }

# ─── CKEditor (yangiliklar rich-text, auth-starter uslubi) ─────────
CKEDITOR_UPLOAD_PATH = 'uploads/ckeditor/'
CKEDITOR_IMAGE_BACKEND = 'pillow'
CKEDITOR_ALLOW_NONIMAGE_FILES = False
CKEDITOR_RESTRICT_BY_USER = False
CKEDITOR_BROWSE_SHOW_DIRS = True
CKEDITOR_CONFIGS = {
    'default': {
        'skin': 'moono-lisa',
        'toolbar': 'Custom',
        'toolbar_Custom': [
            {'name': 'document', 'items': ['Source', '-', 'Preview']},
            {'name': 'clipboard', 'items': ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo']},
            {'name': 'editing', 'items': ['Find', 'Replace', '-', 'SelectAll']},
            '/',
            {'name': 'basicstyles', 'items': [
                'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat',
            ]},
            {'name': 'paragraph', 'items': [
                'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-',
                'Blockquote', 'CreateDiv', '-',
                'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
            ]},
            {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
            {'name': 'insert', 'items': [
                'Image', 'Table', 'HorizontalRule', 'SpecialChar', 'Iframe',
            ]},
            '/',
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
        ],
        'height': 420,
        'width': '100%',
        'extraPlugins': ','.join([
            'uploadimage',
            'div',
            'autolink',
            'autoembed',
            'embedsemantic',
            'autogrow',
            'widget',
            'lineutils',
            'clipboard',
            'dialog',
            'dialogui',
            'elementspath',
        ]),
        'removePlugins': 'exportpdf',
        'filebrowserWindowHeight': 725,
        'filebrowserWindowWidth': 940,
        'toolbarCanCollapse': True,
    },
    'news': {
        'skin': 'moono-lisa',
        'toolbar': 'News',
        'toolbar_News': [
            {'name': 'document', 'items': ['Source', '-', 'Preview', 'Maximize']},
            {'name': 'clipboard', 'items': ['Undo', 'Redo']},
            {'name': 'styles', 'items': ['Format', 'FontSize']},
            {'name': 'basicstyles', 'items': [
                'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat',
            ]},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'paragraph', 'items': [
                'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-',
                'Blockquote', '-',
                'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
            ]},
            {'name': 'links', 'items': ['Link', 'Unlink']},
            {'name': 'insert', 'items': [
                'Image', 'Table', 'HorizontalRule', 'SpecialChar',
            ]},
        ],
        'height': 480,
        'width': '100%',
        'format_tags': 'p;h2;h3;h4;pre',
        'removePlugins': 'exportpdf',
        'extraPlugins': 'uploadimage,autogrow,justify',
        'image_previewText': ' ',
        'filebrowserWindowHeight': 725,
        'filebrowserWindowWidth': 940,
    },
}
