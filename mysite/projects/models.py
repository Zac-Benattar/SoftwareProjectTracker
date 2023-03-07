from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone


def return_today_datetime():
    return timezone.now()


def return_week_in_future():
    return timezone.now() + timezone.timedelta(days=7)


class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=3000, blank=True)
    client_name = models.CharField(max_length=50, blank=True)
    initial_budget = models.DecimalField(max_digits=15, decimal_places=2)
    current_budget = models.DecimalField(max_digits=15, decimal_places=2)
    amount_spent = models.DecimalField(max_digits=15, decimal_places=2)
    start_date = models.DateTimeField(default=return_today_datetime())
    initial_deadline = models.DateTimeField(default=return_week_in_future())
    current_deadline = models.DateTimeField(default=return_week_in_future())
    methodology = models.CharField(max_length=30)
    gitHub = models.CharField(max_length=150, blank=True)
    
    def __str__(self):
        return self.name
    
    def get_members_count(self):
        return len(Member.objects.filter(project=self))
    
    def get_total_salary_expenses(self):
        if Member.objects.count() > 0:
            members = Member.objects.filter(project=self)
            salaries_total = 0
            for m in members:
                salaries_total += m.salary
            return salaries_total
        else:
            return 0

    
    def get_daily_running_cost(self):
        days_running = (self.current_deadline - self.start_date).days
        if days_running != 0:
            return self.get_total_salary_expenses() / days_running
        else:
            return 0
    
    def has_just_started(self):
        if Feedback.objects.count() > 0:
            feedbacks = Feedback.objects.filter(project=self)
            return len(feedbacks) == 0
        else:
            return True
    
    def get_average_happiness(self):
        feedbacks = Feedback.objects.filter(project=self)
        total_happiness = 0
        for f in feedbacks:
            total_happiness += f.emotion
        if total_happiness > 0:
            return total_happiness / self.get_members_count()
        
    def get_average_confidence(self):
        feedbacks = Feedback.objects.filter(project=self)
        total_confidence = 0
        for f in feedbacks:
            total_confidence += f.confidence
        if total_confidence > 0:
            return total_confidence / self.get_members_count()

            
        


class Skill(models.Model):
    # Please stop overwriting this with previous versions, name should NOT be the primary key
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    # Using a library for phone number, if you want the string representation use phone.as_e164
    # https://django-phonenumber-field.readthedocs.io/en/latest/
    phone = PhoneNumberField(null=False, blank=True, unique=True)
    skillset = models.ManyToManyField(Skill, blank=True)


class RiskEvaluation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    success_chance = models.DecimalField(max_digits=13, decimal_places=10)
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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    work_hours = models.IntegerField(default=0)
    join_date = models.DateTimeField(auto_now_add=True)
    project_manager = models.BooleanField(default=False)
    developer = models.BooleanField(default=True)
    salary = models.DecimalField(max_digits=15, decimal_places=2)

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
    dismissed = models.BooleanField(default=False)

    def __str__(self):
        return self.name