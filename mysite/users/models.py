import datetime

from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.utils import timezone
from django.contrib import admin
from django.contrib.auth.models import User 

class Skill(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=200, blank=True)
    pass 
    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OnetoOneField(User, on_delete = models.CASCADE)
    
    username = models.CharField(max_length=20)
    forename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    join_date = models.DateTimeField('date joined')
    email = models.EmailField()
    # Using a library for phone number, if you want the string 
    # representation use phone.as_e164
    # https://django-phonenumber-field.readthedocs.io/en/latest/
    phone = PhoneNumberField(null=False, blank=False, unique=True)
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
    
class UserSkill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)