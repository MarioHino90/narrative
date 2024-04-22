from django.db import models

# Create your models here.

class MappedData(models.Model):
  name = models.CharField(max_length=255)
  class_field = models.CharField(max_length=255, db_column='class')
  school = models.CharField(max_length=255)
  state = models.CharField(max_length=255)
  
def __str__(self):
    return self.name