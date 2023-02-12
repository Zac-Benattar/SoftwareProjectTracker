from django.db import models
from django.utils import timezone
from django.contrib import admin
from mysite.users.models import User, Skill

class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    initialBudget = models.DecimalField(max_digits=15, decimal_places=2)
    currentBudget = models.DecimalField(max_digits=15, decimal_places=2)
    initialDeadline = models.DateTimeField()
    currentDeadline = models.DateTimeField()
    methodology = models.CharField(max_length=30)
    gitHubToken = models.CharField(max_length=30)


class Meeting(models.Model):
    project = models.ForeignKey(Project)
    attendence = models.IntegerField()
    date = models.DateTimeField()
    duration = models.IntegerField()
    

class Feedback(models.Model):
    project = models.ForeignKey(Project)
    confidence = models.IntegerField()
    emotion = models.IntegerField()
    date = models.DateTimeField()


# This was originally allocated to a single member,
# instead I think multiple people should be able to 
# participate in a task
class Task(models.Model):
    project = models.ForeignKey(Project)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    duration = models.IntegerField()
    statusChoices = [
        ('Not Started'),
        ('Started'),
        ('Finished'),
        ('Not Applicable'),
    ]
    completionStatus = models.CharField(
        choices=statusChoices,
        default='Not Applicable'
    )

    
class Role(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200)


class Member(models.Model):
    role = models.ForeignKey(Role)
    project = models.ForeignKey(Project)
    user = models.ForeignKey(User)
    workhours = models.IntegerField(max_length=3)
    

class RoleRequirements(models.Model):
    skillset = models.ManyToManyField(Skill)  
    role = models.ForeignKey(Role) 
    
# I don't understand why we have this class,
# we can just put tasks in the project
class Schedule(models.Model):
    member = models.ForeignKey(Member)
    task = models.ForeignKey(Task)
    hours = models.IntegerField()
    project = models.ForeignKey()


# Used for tracking time worked
class TimeWorked(models.Model):
    member = models.ForeignKey(Member)
    task = models.ForeignKey(Task)
    time = models.TimeField()