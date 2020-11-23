from django.urls import path, include
from url_shortener.api.views import UrlShortenerAPIView


urlpatterns = [
    path("shorten", UrlShortenerAPIView.as_view(), name="shorten"),
]