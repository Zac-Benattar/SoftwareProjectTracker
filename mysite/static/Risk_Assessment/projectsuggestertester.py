import unittest
import datetime
from users.models import Project, Task, Member, Role, RoleRequirement, Feedback
from projectsuggester import ProjectSuggester

## function will return FALSE if a suggestion has to be displayed

class tester():
    # CREATING A PROJECT
    name = "SE_project"
    description = "this project aims to ..."
    initial_budget = 40000
    current_budget = 3000
    initial_deadline = '2023-05-21 23:59:59'
    current_deadline = '2023-05-21 23:59:59'

    project = Project(name, description, initial_budget, current_budget, initial_deadline, current_deadline)


    # CREATING A TASK
    name = "task 1"
    description = "description of task 1"
    duration = 30
    creation_date = datetime.date.today()
    completion_status = 'S'

    task1 = Task(project, name, description, duration, creation_date, completion_status)


    # CREATING A ROLE
    name = "Project Manager"
    description = "The Project Manager is in charge of ..."

    role1 = Role(name, description)


    # CREATING A USER
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

    # CREATING A MEMBER
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    work_hours = models.IntegerField()
    join_date = models.DateTimeField(auto_now_add=True)

    member1 = Member(role1, project)


    # TESTING 
    def test_past_deadline(self, project):
        test = ProjectSuggester(project)
        self.assertEqual(test.past_deadline(), True, 'The fuction is wrong.')

        if __name__ == '__main__':
            unittest.main()
