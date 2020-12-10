from django.db import models


class Author(models.Model):
    client_id = models.CharField(
                                    max_length=10, 
                                    unique=True
                                    )

    @classmethod
    def create(cls, client_id):
        author = cls(client_id=client_id)
        return author

    def __str__(self):
        return self.client_id
                                    

class Url(models.Model):
    created_by = models.ForeignKey(
                                    Author, 
                                    on_delete=models.SET_NULL,
                                    related_name="urls",
                                    null=True
                                    )
    slug = models.SlugField(max_length=6)
    klin_url = models.CharField(
                                max_length=30, 
                                unique=True
                                )
    long_url = models.URLField(
                                max_length=500,
                                unique=True
                                )
    date_created = models.DateTimeField(
                                        auto_now_add=True, 
                                        null=True
                                        )
                                
    def __str__(self):
        return self.klin_url
    
    def get_absolute_url(self):
        return self.long_url