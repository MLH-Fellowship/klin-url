from django.urls import path, include
from url_shortener.api.views import (
                                      UrlShortenerAPIView,
                                      UrlListAPIView,
                                      redirect_view
                                      )


urlpatterns = [
    path("shorten", UrlShortenerAPIView.as_view(), name="shorten"),
    path("urls/list", UrlListAPIView.as_view(), name="list-urls"),
    path('<str:slug>', redirect_view, name="redirect"),
]