from django.db import models
import datetime
from users.models import Project, Task, Member, Role, RoleRequirement, Feedback


# put some data into the tables
def dbinit():

    # CREATING A PROJECT
    name = "SE_project"
    description = "this project aims to ..."
    initial_budget = 40000
    current_budget = 3000
    initial_deadline = '2023-05-21 23:59:59'
    current_deadline = '2023-05-21 23:59:59'

    project = Project.objects.create(name, description, initial_budget, current_budget, initial_deadline, current_deadline)

    # CREATING A TASK

