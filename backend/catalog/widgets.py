"""
Oddiy muharrirlar uchun: JSON o‘rniga 3 til maydoni (UZ / RU / EN).
"""
from django import forms
from django.utils.safestring import mark_safe


class LocaleWidget(forms.MultiWidget):
    """Uchta input: Oʻzbek · Русский · English"""

    template_name = None  # render() o‘zimiz

    def __init__(self, textarea=False, attrs=None):
        base = {'class': 'vTextField', 'style': 'width:100%; max-width: 48rem;'}
        if attrs:
            base.update(attrs)
        if textarea:
            widgets = [
                forms.Textarea(attrs={**base, 'rows': 4}),
                forms.Textarea(attrs={**base, 'rows': 4}),
                forms.Textarea(attrs={**base, 'rows': 4}),
            ]
        else:
            widgets = [
                forms.TextInput(attrs=dict(base)),
                forms.TextInput(attrs=dict(base)),
                forms.TextInput(attrs=dict(base)),
            ]
        super().__init__(widgets=widgets, attrs=base)
        self._textarea = textarea

    def decompress(self, value):
        if not value or not isinstance(value, dict):
            return ['', '', '']
        return [
            value.get('uz') or '',
            value.get('ru') or '',
            value.get('en') or '',
        ]

    def render(self, name, value, attrs=None, renderer=None):
        if self.is_localized:
            for widget in self.widgets:
                widget.is_localized = self.is_localized
        # value may already be list from decompress
        if isinstance(value, dict) or value is None:
            value = self.decompress(value)
        elif not isinstance(value, (list, tuple)):
            value = self.decompress(None)

        labels = [
            ('🇺🇿 Oʻzbekcha', 'uz'),
            ('🇷🇺 Русский', 'ru'),
            ('🇬🇧 English', 'en'),
        ]
        html = ['<div class="locale-triple" style="display:flex;flex-direction:column;gap:10px;margin:4px 0 12px;">']
        for i, (label, _code) in enumerate(labels):
            widget = self.widgets[i]
            widget_name = f'{name}_{i}'
            sub_attrs = self.build_attrs(attrs or {}, {'id': f'id_{name}_{i}'})
            rendered = widget.render(widget_name, value[i] if i < len(value) else '', sub_attrs)
            html.append(
                f'<div style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:8px;padding:10px 12px;">'
                f'<label style="font-weight:600;font-size:12px;color:#495057;display:block;margin-bottom:6px;">'
                f'{label}</label>{rendered}</div>'
            )
        html.append('</div>')
        return mark_safe(''.join(html))

    def value_from_datadict(self, data, files, name):
        return [
            data.get(f'{name}_0', ''),
            data.get(f'{name}_1', ''),
            data.get(f'{name}_2', ''),
        ]


class LocaleField(forms.MultiValueField):
    """JSONField {uz,ru,en} uchun forma maydoni."""

    def __init__(self, *args, textarea=False, required=False, **kwargs):
        fields = (
            forms.CharField(required=False),
            forms.CharField(required=False),
            forms.CharField(required=False),
        )
        widget = LocaleWidget(textarea=textarea)
        kwargs.setdefault('require_all_fields', False)
        super().__init__(fields=fields, widget=widget, required=required, *args, **kwargs)

    def compress(self, data_list):
        if not data_list:
            return {'uz': '', 'ru': '', 'en': ''}
        return {
            'uz': (data_list[0] or '').strip(),
            'ru': (data_list[1] or '').strip(),
            'en': (data_list[2] or '').strip(),
        }


class LocaleListField(forms.CharField):
    """
    LocaleString[] uchun: har qator bitta yozuv.
    Format:  uz || ru || en
    yoki faqat o‘zbek matni (ru/en bo‘sh).
    """

    def __init__(self, *args, **kwargs):
        kwargs.setdefault(
            'widget',
            forms.Textarea(
                attrs={
                    'rows': 5,
                    'class': 'vLargeTextField',
                    'style': 'width:100%; max-width: 48rem; font-family: monospace;',
                    'placeholder': 'Oʻzbek matn || Русский || English\nYana bir qator...',
                }
            ),
        )
        kwargs.setdefault(
            'help_text',
            'Har qator = bitta yozuv. Format: oʻzbek || rus || english  '
            '(|| bo‘lmasa faqat oʻzbek saqlanadi).',
        )
        super().__init__(*args, **kwargs)

    def prepare_value(self, value):
        if isinstance(value, str):
            return value
        if not value or not isinstance(value, list):
            return ''
        lines = []
        for item in value:
            if isinstance(item, dict):
                uz = item.get('uz') or ''
                ru = item.get('ru') or ''
                en = item.get('en') or ''
                if ru or en:
                    lines.append(f'{uz} || {ru} || {en}')
                else:
                    lines.append(uz)
            else:
                lines.append(str(item))
        return '\n'.join(lines)

    def to_python(self, value):
        if value is None or value == '':
            return []
        if isinstance(value, list):
            return value
        result = []
        for line in str(value).splitlines():
            line = line.strip()
            if not line:
                continue
            if '||' in line:
                parts = [p.strip() for p in line.split('||')]
                while len(parts) < 3:
                    parts.append('')
                result.append({'uz': parts[0], 'ru': parts[1], 'en': parts[2]})
            else:
                result.append({'uz': line, 'ru': line, 'en': line})
        return result


class CommaListField(forms.CharField):
    """Oddiy string massiv: vergul yoki yangi qator bilan."""

    def __init__(self, *args, **kwargs):
        kwargs.setdefault(
            'widget',
            forms.TextInput(attrs={'class': 'vTextField', 'style': 'width:100%; max-width: 48rem;'}),
        )
        kwargs.setdefault('help_text', 'Vergul yoki bo‘sh joy bilan ajrating (masalan: p-dekan, p-head-ru)')
        super().__init__(*args, **kwargs)

    def prepare_value(self, value):
        if isinstance(value, list):
            return ', '.join(str(x) for x in value)
        return value or ''

    def to_python(self, value):
        if value is None or value == '':
            return []
        if isinstance(value, list):
            return value
        parts = [p.strip() for p in str(value).replace('\n', ',').split(',')]
        return [p for p in parts if p]
