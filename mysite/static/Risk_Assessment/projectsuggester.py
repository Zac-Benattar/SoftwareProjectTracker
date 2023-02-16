import datetime
from users.models import Project, Task, Member, Role, RoleRequirement

# retrieve all instances
all_Projects = Project.objects.all()
all_Tasks = Task.objects.all()
all_Members = Member.objects.all()
all_Roles = Role.objects.all()
all_RoleRequirements = RoleRequirement.objects.all()

class ProjectSuggester: # evaluating project's pararameters to make suggestions

    def __init__(self):
        pass

    def past_deadline(self, project): 
        # For all uncompleted task, If currentDate > taskDeadline
        # The program will suggest allocating more people to that task

        # iterate over the tasks in the project that are uncompleted
        for task in all_Tasks:  
            if task.project == project:
                if task.completionStatus != 'F':
                    if datetime.date.today() > (task.createdTime + task.duration):
                        print(f"You've run out of time to complete the task {task.name}. Try allocating more people to the task.")

        return None
    
    def changing_roles(self, project):
        # For all member of a project if any are assigned a role for which they don’t have all the skills
        # The program will suggest changing their role

        # iterate over all the memebers in the project 
        for member in all_Members:
            if member.project == project:
                for rolereq in all_RoleRequirements:
                    if member.role == rolereq.role:
                        # if skills of member != skills required
                            print(f"Member {member.name} doesn't have the required skills for the role as {member.role.name} in the project {project.name}. Try changing their role to one more adequate.")

        return None

    def average_happiness(self, project):
        # Looking at the mean average of happiness if below a certain threshold
        # The program will warn the project manager team happiness is low. It will suggest common ways to improve this. 

        return None

    def lacks_comments(self, project):
        # The program will have a simple function to assess how well documented each file is. 
        # This program will read files with recognised file extensions. 
        # If the program finds a file with nocomments this could be a sign of poor documentation and readability.
        # The program will suggest adding code comments to the file in question.

        return None

    def completion_ratio(self, project):
        # The program will calculate two values. The ratio of tasks completed. 
        # And also a ratio of the time used from the start date to the current deadline.
        # If the time ratio is much higher than the task completion ratio it implies the project may not be completed in time.
        # The program will suggest extending the deadline.

        return None

    def low_budget(self, project):
        # The program will create an estimation of a per day running cost. By summing a daily salary and calculating how much money is left.
        # The program will suggest increasing the budget.


        return None



