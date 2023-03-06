import unittest
import datetime
from django.db import models
from users.models import Project, Task, Member, Role, RoleRequirement, Feedback, User, Skill
from phonenumber_field.modelfields import PhoneNumberField
from projectsuggester import ProjectSuggester

from django.test import TestCase

class tester(TestCase):
    # CREATING A PROJECT
    name = "SE_project"
    description = "this project aims to ..."
    initial_budget = 40000
    current_budget = 3000
    initial_deadline = '2023-05-21 23:59:59'
    current_deadline = '2023-05-21 23:59:59'

    project = Project.objects.create(name, description, initial_budget, current_budget, initial_deadline, current_deadline)


    # CREATING A TASK
    name = "task 1"
    description = "description of task 1"
    duration = 30
    creation_date = datetime.date.today()
    completion_status = 'S'

    task1 = Task.objects.create(project, name, description, duration, creation_date, completion_status)


    # CREATING A ROLE
    name = "Project Manager"
    description = "The Project Manager is in charge of ..."

    role1 = Role.objects.create(name, description)


    # CREATING SKILLS
    name ="Leadership"
    description = "a good leader and able to inspire, motivate, and guide the team towards the project goals"
    skill1 = Skill.objects.create(name, description)

    name ="Communication"
    description = "Clear and effective communication skills. This includes written, verbal, and nonverbal communication"
    skill2 = Skill.objects.create(name, description)

    name ="Problem Solving"
    description = "excellent problem-solving skills to be able to identify issues and develop strategies to overcome them."
    skill3 = Skill.objects.create(name, description)

    name ="Planning and Organization"
    description = "be able to develop a project plan, including scheduling, resource allocation, and budgeting."
    skill4 = Skill.objects.create(name, description)

    name ="Team Management"
    description = " be able to manage a team effectively, including delegating tasks, resolving conflicts, and providing feedback."
    skill5 = Skill.objects.create(name, description)

    # CREATING A USER
    username = "andrew.smith"
    forename = "Andrew"
    lastname = "Smith"
    join_date = '2023-01-01'
    email = 'andrew.smith74@gmail.com'
    phone = '+15555555555'

    user1 = User.objects.create(username, forename, lastname, join_date, email, phone)
    user1.skillset.add(skill1, skill2, skill3, skill4, skill5)

    # CREATING A MEMBER
    work_hours = 40

    member1 = Member.objects.create(role1, project, user1, work_hours, user1.join_date)


    # TESTING 

    # PAST DEADLINE FUNCTION
    ## function will return TRUE if the suggestion has to be displayed

    def test_past_deadline(self, project):
        test = ProjectSuggester(project)
        self.assertEqual(test.past_deadline(), True, 'The fuction is wrong.')

        if __name__ == '__main__':
            unittest.main()
