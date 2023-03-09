from django.test import TestCase
from projects.models import *
from projects.projectsuggester import ProjectSuggester
import datetime

class tester(TestCase):
    
    def setUp(self):

        # CREATING A PROJECT
        project1 = Project.objects.create(name = "SE_project", initial_budget = 40000,
                                          current_budget = 3000, amount_spent = 0, initial_deadline = "2023-05-21T23:59:59+01:00",
                                          current_deadline = "2023-05-21T23:59:59+01:00")

        # CREATING A TASK
        task1 = Task.objects.create(project = project1, name = "task 1",
                                    duration = 30, creation_date =  get_today_datetime(),
                                    completion_status = "S")

        # CREATING FEEDBACK
        feedback1 = Feedback.objects.create(project = project1, confidence = 5, \
                                            emotion = 5, date = get_today_datetime())

        # CREATING A ROLE
        role1 = Role.objects.create(name = "Project Manager")

        # CREATING SKILLS
        skill1 = Skill.objects.create(name = "Leadership", description = "a good leader \
                                      and able to inspire, motivate, and guide the team towards the project goals")

        skill2 = Skill.objects.create(name = "Communication", description = "Clear and effective \
                                      communication skills. This includes written, verbal, and nonverbal communication")
        
        skill3 = Skill.objects.create(name = "Problem Solving", description = "excellent problem-solving skills to be able \
                                      to identify issues and develop strategies to overcome them.")

        skill4 = Skill.objects.create(name = "Planning and Organization", description = "be able to develop a project plan, \
                                      including scheduling, resource allocation, and budgeting.")

        skill5 = Skill.objects.create(name = "Team Management", description = "be able to manage a team effectively, \
                                      including delegating tasks, resolving conflicts, and providing feedback.")

        # CREATING ROLE REQUIREMENT
        PM = RoleRequirement.objects.create(role = role1)
        PM.skillset.add(skill1, skill2, skill3, skill4, skill5)

        # CREATING A USER
        user1 = CustomUser.objects.create(phone = '+15555555555')
        user1.skillset.add(skill1, skill2, skill3, skill4)

        # CREATING A MEMBER
        member1 = Member.objects.create(role = role1, project = project1, user = user1, work_hours = 40, 
                                    join_date = '2023-01-01', salary = 31285)

        # CREATING FILEPATH OF A CODE
        file_path = r"C:\Users\alexp\Documents\GitHub\SoftwareProjectTracker\mysite\test\test.py"


    # TESTING

    # PAST DEADLINE FUNCTION
    ## function will return TRUE if the suggestion has to be displayed
    def test_task_past_deadline(self):
        example_project = Project.objects.get(name="SE_project")
        test = ProjectSuggester()
        self.assertEqual(test.tasks_past_deadline(example_project), False, 'The fuction is wrong.')

    # CHANGING ROLES FUNCTION
    ## function will return TRUE if the suggestion has to be displayed
    def test_missing_skillsets(self):
        example_project = Project.objects.get(name="SE_project")
        test = ProjectSuggester()
        self.assertEqual(test.missing_skillsets(example_project), True, 'The fuction is wrong.')

    # AVERAGE HAPPINESS FUNCTION
    ## function will return the average happiness
    def test_average_happiness(self, project):
        test = ProjectSuggester(project)
        self.assertEqual(test.average_happiness(), 5, 'The fuction is wrong.')

    # COUNT COMMENTS FUNCTION
    ## function will return the number of comments
    def test_count_comments(self, file_path):
        test = ProjectSuggester(file_path)
        self.assertEqual(test.count_comments(), 1, 'The fuction is wrong.')

    # COMPLETION RATIO FUNCTION
    ## function will return TRUE if the suggestion has to be displayed
    def test_completion_ratio(self, project):
        test = ProjectSuggester(project)
        self.assertEqual(test.changing_roles(), True, 'The fuction is wrong.')

    # LOW BUDGET FUNCTION
    ## function will return TRUE if the suggestion has to be displayed
    def test_low_budget(self, project):
        test = ProjectSuggester(project)
        self.assertEqual(test.low_budget(), True, 'The fuction is wrong.')