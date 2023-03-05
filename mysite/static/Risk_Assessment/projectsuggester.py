import datetime
from projects.models import Project, Task, Member, Role, RoleRequirement, Feedback

# retrieve all instances
all_Projects = Project.objects.all()
all_Tasks = Task.objects.all()
all_Members = Member.objects.all()
all_Roles = Role.objects.all()
all_RoleRequirements = RoleRequirement.objects.all()
all_Feedback = Feedback.objects.all()

class ProjectSuggester: # evaluating project's pararameters to make suggestions

    def __init__(self):
        pass

    def past_deadline(self, project): 
        # For all uncompleted task, If currentDate > taskDeadline.
        # The program will suggest allocating more people to that task.

        # iterate over the tasks in the project that are uncompleted
        for task in all_Tasks:  
            if task.project == project:
                if task.completion_status != 'F':
                    if datetime.date.today() > (task.creation_date + task.duration):
                        print(f"You've run out of time to complete the task {task.name}.\
                                Try allocating more people to the task.")

        return None
    
    
    def changing_roles(self, project):
        # For all member of a project if any are assigned a role for which they don’t have
        # all the skills.
        # The program will suggest changing their role.

        # iterate over all the memebers in the project 
        for member in all_Members:
            if member.project == project:
                for rolereq in all_RoleRequirements:
                    if member.role == rolereq.role:
                        if rolereq.skillset != member.user_profile.skillset:
                            print(f"Member {member.user_profile.get_username()} doesn't have the required skills \
                                    for the role as {member.role.name} in the project \
                                    {project.name}. Try changing their role to one \
                                    more adequate.")

        return None


    def average_happiness(self, project):
        # Looking at the mean average of happiness if below a certain threshold
        # The program will warn the project manager team happiness is low. 

        avg_happiness = 0
        count = 0

        for f in all_Feedback:
            if f.project == project:
                avg_happiness += f.emotion
                count += 1
        
        avg_happiness = avg_happiness / count

        if avg_happiness <= 2.5: #half of the max happiness value
            print(f"The average happiness of the members of the project {project.name} \
                    is low: {avg_happiness}.")

        return None


    def count_comments(self, file_path):
        # Counting the comments of a python file
        # The program will suggest adding code comments to the file in question.

        with open(file_path, "r") as file:
            lines = file.readlines()

            line_count = len(lines)

            comment_count = 0
            for line in lines:
                line = line.strip()
                if line.startswith("#"):
                    comment_count += 1
        
        if comment_count < line_count / 6:
            print(f"You may want to consider adding more comments to the file {file_path} \
                    to make it more understandable.")
        
        return comment_count


    def completion_ratio(self, project):
        # The program will calculate two values. The ratio of tasks completed. 
        # And also a ratio of the time used from the start date to the current deadline.
        # If the time ratio is much higher than the task completion ratio it implies the
        # project may not be completed in time.
        # The program will suggest extending the deadline.

        task_count = 0
        for task in all_Tasks:
            if task.project == project:
                task_count += 1

        completed_task_count = 0
        for task in all_Tasks:
            if task.project == project:
                if task.completion_status == 'F':
                    completed_task_count += 1
            
        tasks_ratio = completed_task_count / task_count
        time_ratio = (datetime.date.today() - project.start_date) / project.current_deadline

        if time_ratio < tasks_ratio:
            print(f"We suggest extending the deadline for the project {project.name} to \
                    complete the remaining taks.")

        return None


    def low_budget(self, project):
        # The program will create an estimation of a per day running cost. By summing 
        # a daily salary and calculating how much money is left.
        # The program will suggest increasing the budget.      

        budget_ratio = project.current_budget / project.initial_budget
        time_ratio = (datetime.date.today() - project.start_date) / project.current_deadline

        if time_ratio > budget_ratio:
            print(f"We suggest increasing the budget for the project {project.name} to \
                    complete the remaining taks.")

        return None



