from django.db import models
from django.utils import timezone
from django.contrib import admin
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
import datetime


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    initial_budget = models.DecimalField(max_digits=15, decimal_places=2)
    current_budget = models.DecimalField(max_digits=15, decimal_places=2)
    initial_deadline = models.DateTimeField()
    current_deadline = models.DateTimeField()
    methodology = models.CharField(max_length=30)
    gitHub_token = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=200, blank=True)
    pass

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20)
    forename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    join_date = models.DateTimeField('date joined')
    email = models.EmailField()
    # Using a library for phone number, if you want the string
    # representation use phone.as_e164
    # https://django-phonenumber-field.readthedocs.io/en/latest/
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    skillset = models.ManyToManyField(Skill, blank=True)

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


class RiskEvaluation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    success_chance = models.DecimalField(max_digits=3, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.success_chance)


class Meeting(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    attendence = models.IntegerField()
    date = models.DateTimeField()
    duration = models.IntegerField()

    def __str__(self):
        return self.project.__str__() + ' ' + self.date.__str__()


class Feedback(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    confidence = models.IntegerField()
    emotion = models.IntegerField()
    date = models.DateTimeField()

    def __str__(self):
        return self.project.__str__() + ' Feedback ' + str(self.pk)


# This was originally allocated to a single member,
# instead I think multiple people should be able to
# participate in a task
class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    duration = models.IntegerField()
    creation_date = models.DateTimeField(auto_now_add=True)
    dependent_tasks = models.ManyToManyField(
        'self', symmetrical=False, related_name='prerequisites', blank=True)
    NOTSTARTED = 'NS'
    STARTED = 'S'
    FINISHED = 'F'
    NOTAPPLICABLE = 'N/A'
    status_choices = [
        (NOTSTARTED, 'Not Started'),
        (STARTED, 'Started'),
        (FINISHED, 'Finished'),
        (NOTAPPLICABLE, 'Not Applicable'),
    ]
    completion_status = models.CharField(
        choices=status_choices,
        max_length=3,
        default='Not Applicable'
    )

    def __str__(self):
        return self.name + ' ' + self.project.__str__()


class Role(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Member(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    work_hours = models.IntegerField()
    join_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.__str__() + ' ' + self.project.__str__() + ' ' + self.role.__str__()


# Joins roles and skills
class RoleRequirement(models.Model):
    skillset = models.ManyToManyField(Skill)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        output = self.role.__str__() + ' '
        for x in self.skillset.all():
            output = output+' | '+str(x)
        return output


# I don't understand why we have this class,
# we can just put tasks in the project
class Schedule(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    hours = models.IntegerField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.member.__str__() + ' ' + self.project.__str__()


# Used for tracking time worked
class TimeWorked(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    time = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.member.__str__() + ' ' + self.task.__str__() + ' ' + self.time.__str__() + ' hours'


class Recommendation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
