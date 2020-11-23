from django.contrib import admin
from url_shortener.models import Url

class UrlAdmin(admin.ModelAdmin):
   model = Url
   list_display = ['klin_url']

admin.site.register(Url, UrlAdmin)

