import datetime

from django.db import models
from django.utils import timezone
from django.contrib import admin


# Create your models here.

class Skill(models.Model):
    skill_name = models.CharField(max_length=20)
    def __str__(self):
        return self.skill_name
    # Required for many to many relationship. The object that makes sense to 'own' the other declares the many to many
    # and the other has a pass attribute
    pass


class User(models.Model):
    username = models.CharField(max_length=20)
    forename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    join_date = models.DateTimeField('date joined')
    skillset = models.ManyToManyField(Skill)
    def __str__(self):
        return self.username + " (" + self.forename + " " + self.lastname + ")"
    # Tells admin panel how to display model
    @admin.display(
        boolean=True,
        ordering='join_date',
        description='New User?',
    )
    def joined_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.join_date <= now