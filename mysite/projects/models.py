from django.db import models
from django.utils import timezone
from django.contrib import admin
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
import datetime


def return_week_in_future():
    return timezone.now() + timezone.timedelta(days=10)


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=3000, blank=True)
    initial_budget = models.DecimalField(max_digits=15, decimal_places=2)
    current_budget = models.DecimalField(max_digits=15, decimal_places=2)
    initial_deadline = models.DateTimeField(default=return_week_in_future())
    current_deadline = models.DateTimeField(default=return_week_in_future())
    methodology = models.CharField(max_length=30)
    gitHub = models.CharField(max_length=150, blank=True)
    members = models.ManyToManyField('Member', related_name='+')

    def __str__(self):
        return self.name


class Skill(models.Model):
    # Please stop overwriting this with previous versions, name should NOT be the primary key
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # Should probably find a better way to do this - maybe make a new user class that inherits from the django built in one
    # Using a library for phone number, if you want the string
    # representation use phone.as_e164
    # https://django-phonenumber-field.readthedocs.io/en/latest/
    phone = PhoneNumberField(null=False, blank=True, unique=True)
    skillset = models.ManyToManyField(Skill, blank=True)
    projects = models.ManyToManyField(Project, blank=True)

    # Tells admin panel how to display model
    @admin.display(
        boolean=True,
        ordering='join_date',
        description='New User?',
    )
    def __str__(self):
        return self.user.username

    def get_first_name(self):
        return self.user.first_name

    def get_last_name(self):
        return self.user.last_name

    def get_date_joined(self):
        return self.user.date_joined

    def get_email(self):
        return self.user.email

    def get_username(self):
        return self.user.username

    def joined_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.get_date_joined() <= now


class RiskEvaluation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    success_chance = models.DecimalField(max_digits=3, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.success_chance)


class Meeting(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    attendence = models.IntegerField(default=0)
    date = models.DateTimeField(default=return_week_in_future())
    duration = models.IntegerField(default=0)

    def __str__(self):
        return self.project.__str__() + ' ' + self.date.__str__()


class Feedback(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    confidence = models.IntegerField(default=0)
    emotion = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.project.__str__() + ' Feedback ' + str(self.pk)


# This was originally allocated to a single member,
# instead I think multiple people should be able to
# participate in a task
class Task(models.Model):
    members = models.ManyToManyField('Member', blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200, blank=True)
    duration = models.IntegerField(default=0)
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
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Member(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    work_hours = models.IntegerField(default=0)
    join_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_profile.__str__() + ' ' + self.project.__str__() + ' ' + self.role.__str__()


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
    hours = models.IntegerField(default=0)
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
    description = models.CharField(max_length=200, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
