from django.contrib import admin
from url_shortener.models import Url, Author


class UrlAdmin(admin.ModelAdmin):
   model = Url
#    list_display = ['klin_url']


class AuthorAdmin(admin.ModelAdmin):
   model = Author
   list_display = ['client_id']


admin.site.register(Url, UrlAdmin)
admin.site.register(Author, AuthorAdmin)

