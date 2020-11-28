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
    klin_url = models.CharField(
                                max_length=30, 
                                unique=True
                                ),
    long_url = models.TextField(unique=True),
    created_by = models.ForeignKey(
                                    Author, 
                                    on_delete=models.SET_NULL,
                                    related_name="urls",
                                    null=True
                                    )
    
    def __str__(self):
        return self.klin_url
    
    def get_absolute_url(self):
        return self.long_url