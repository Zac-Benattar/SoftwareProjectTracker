from django.db import models
from django.utils import timezone
from django.contrib import admin
from users.models import User, Skill

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
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    attendence = models.IntegerField()
    date = models.DateTimeField()
    duration = models.IntegerField()
    

class Feedback(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    confidence = models.IntegerField()
    emotion = models.IntegerField()
    date = models.DateTimeField()


# This was originally allocated to a single member,
# instead I think multiple people should be able to 
# participate in a task
class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    duration = models.IntegerField()
    NOTSTARTED = 'NS'
    STARTED = 'S'
    FINISHED = 'F'
    NOTAPPLICABLE = 'N/A'
    statusChoices = [
        (NOTSTARTED, 'Not Started'),
        (STARTED, 'Started'),
        (FINISHED, 'Finished'),
        (NOTAPPLICABLE, 'Not Applicable'),
    ]
    completionStatus = models.CharField(
        choices=statusChoices,
        max_length=3,
        default='Not Applicable'
    )

    
class Role(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200)


class Member(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workhours = models.IntegerField()
    

class RoleRequirements(models.Model):
    skillset = models.ManyToManyField(Skill)  
    role = models.ForeignKey(Role, on_delete=models.CASCADE) 
    
# I don't understand why we have this class,
# we can just put tasks in the project
class Schedule(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    hours = models.IntegerField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)


# Used for tracking time worked
class TimeWorked(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    time = models.TimeField()
    

class Recommendation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)