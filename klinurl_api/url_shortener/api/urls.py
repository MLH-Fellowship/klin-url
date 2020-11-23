from django.urls import path, include
from url_shortener.api.views import (
                                      UrlShortenerAPIView,
                                      redirect_view
                                      )


urlpatterns = [
    path("shorten", UrlShortenerAPIView.as_view(), name="shorten"),
     path('<str:klin_url>', redirect_view, name="redirect"),
]