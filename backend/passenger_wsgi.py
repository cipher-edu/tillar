"""
cPanel / Passenger WSGI kirish nuqtasi.

Setup Python App da Application startup file:
  passenger_wsgi.py

Application root odatda:
  /home/USER/tillar-api   (yoki backend papkasi)
"""
import os
import sys
from pathlib import Path

# backend/ ildizi (shu fayl turgan joy)
APP_DIR = Path(__file__).resolve().parent

# Python path
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

# Virtualenv (cPanel Python App odatda o‘zi aktivlashtiradi;
# qo‘lda kerak bo‘lsa INTERP ni to‘g‘rilang)
# INTERP = os.path.expanduser('~/virtualenv/tillar-api/3.11/bin/python')
# if os.path.exists(INTERP) and sys.executable != INTERP:
#     os.execl(INTERP, INTERP, *sys.argv)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Production default (cPanel da .env yozilmasa ham xavfsizroq)
os.environ.setdefault('DJANGO_DEBUG', '0')

from django.core.wsgi import get_wsgi_application  # noqa: E402

application = get_wsgi_application()
