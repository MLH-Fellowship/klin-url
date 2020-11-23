from django.db import models

class Url(models.Model):
    klin_url = models.CharField(max_length=1000, unique=True)
    long_url = models.TextField(unique=True)
    
    def __str__(self):
        return self.klin_url