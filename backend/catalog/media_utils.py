"""Rasm URL: avvalo yuklangan media, aks holda tashqi URL."""


def media_or_url(file_field, url_field: str, request=None) -> str:
    if file_field:
        try:
            url = file_field.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        except Exception:
            pass
    return url_field or ''
