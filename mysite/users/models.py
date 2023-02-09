import datetime

from django.db import models
from django.utils import timezone
from django.contrib import admin


# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=20)
    forename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    join_date = models.DateTimeField('date joined')
    def __str__(self):
        return self.forename + " " + self.lastname + " (" + self.username + ")"
    @admin.display(
        boolean=True,
        ordering='join_date',
        description='New User?',
    )
    def joined_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.join_date <= now


class Skill(models.Model):
    skill_name = models.CharField(max_length=200)
    def __str__(self):
        return self.skill_name