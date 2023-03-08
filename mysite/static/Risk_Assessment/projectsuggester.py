import datetime

import sys
import pathlib

originalpath=sys.path
folderPath = str(pathlib.Path(__file__).parent.parent.parent.joinpath("projects").resolve())
sys.path.append(folderPath)

print("==================== PATHS =============")
print(sys.path)
print("   ")

from projects.models import *

sys.path = originalpath

# retrieve all instances
all_projects = Project.objects.all()
all_tasks = Task.objects.all()
all_members = Member.objects.all()
all_roles = Role.objects.all()
all_rolerequirements = RoleRequirement.objects.all()
all_feedback = Feedback.objects.all()

generated_recommendations = list()


class ProjectSuggester:  # evaluating project's pararameters to make suggestions

    def __init__(self):
        pass

    def get_suggestions(self):
        return generated_recommendations

    def task_past_deadline(self, project):
        # For all uncompleted task, If currentDate > taskDeadline.
        # The program will suggest allocating more people to that task.

        task_past_deadline = False

        # iterate over the tasks in the project that are uncompleted
        for task in all_tasks:
            if task.project == project:
                if task.completion_status != 'F':
                    if datetime.date.today() > (task.creation_date + task.duration):
                        description = (f"You've run out of time to complete the task {task.name}.\
                                Try allocating more people to the task.")

                        recommendation = Recommendation(
                            project=project,
                            name='Task past deadline',
                            description=description
                        )

                        # Save recommendation to the database
                        recommendation.save()
                        # Record recommendation to the of generated recommendations
                        generated_recommendations.append(recommendation)
                        task_past_deadline = True

        return task_past_deadline

    def missing_skillsets(self, project):
        # For all member of a project if any are assigned a role for which they don’t have
        # all the skills.
        # The program will suggest changing their role.

        roles_not_statisfied = False

        # iterate over all the memebers in the project
        for member in all_members:
            if member.project == project:
                for rolereq in all_rolerequirements:
                    if member.role == rolereq.role:
                        if rolereq.skillset != member.user.skillset:
                            description = (f"Member {member.user.get_username()} doesn't have the required skills \
                                for the role as {member.role.name} in the project {project.name}.\
                                    Try changing their role to one more adequate.")

                            recommendation = Recommendation(
                                project=project,
                                name='User skills missing',
                                description=description
                            )

                            # Save recommendation to the database
                            recommendation.save()
                            # Record recommendation to the of generated recommendations
                            generated_recommendations.append(recommendation)
                            roles_not_statisfied = False

        return roles_not_statisfied

    def low_average_happiness(self, project):
        # Looking at the mean average of happiness if below a certain threshold
        # The program will warn the project manager team happiness is low.

        avg_happiness = 0
        count = 0

        for f in all_feedback:
            if f.project == project:
                avg_happiness += f.emotion
                count += 1

        avg_happiness = avg_happiness / count
        
        happiness_low = False

        if avg_happiness <= 2.5:  # half of the max happiness value
            description = (f"The average happiness of the members of the project {project.name} \
                    is low: {avg_happiness}.")

            recommendation = Recommendation(
                project=project,
                name='Low average happiness',
                description=description
            )

            # Save recommendation to the database
            recommendation.save()
            # Record recommendation to the of generated recommendations
            generated_recommendations.append(recommendation)
            happiness_low = True

        return happiness_low

    def count_comments(self, file_path, project):
        # Counting the comments of a python file
        # The program will suggest adding code comments to the file in question.
        
        low_comments = False

        with open(file_path, "r") as file:
            lines = file.readlines()

            line_count = len(lines)

            comment_count = 0
            for line in lines:
                line = line.strip()
                if line.startswith("#"):
                    comment_count += 1

        if comment_count < line_count / 6:
            description = (f"You may want to consider adding more comments to the file {file_path} \
                    to make it more understandable.")
            recommendation = Recommendation(
                project=project,
                name='Low average happiness',
                description=description
            )

            # Save recommendation to the database
            recommendation.save()
            # Record recommendation to the of generated recommendations
            generated_recommendations.append(recommendation)
            low_comments = True
            
        return low_comments

    def low_completion_ratio(self, project):
        # The program will calculate two values. The ratio of tasks completed.
        # And also a ratio of the time used from the start date to the current deadline.
        # If the time ratio is much higher than the task completion ratio it implies the
        # project may not be completed in time.
        # The program will suggest extending the deadline.

        task_count = 0
        for task in all_tasks:
            if task.project == project:
                task_count += 1

        completed_task_count = 0
        for task in all_tasks:
            if task.project == project:
                if task.completion_status == 'F':
                    completed_task_count += 1

        tasks_ratio = completed_task_count / task_count
        time_ratio = (datetime.date.today() - project.start_date) / \
            project.current_deadline

        low_completion_ratio = False    

        if time_ratio < tasks_ratio:
            description = (f"We suggest extending the deadline for the project {project.name} to \
                    complete the remaining taks.")
            
            recommendation = Recommendation(
                project=project,
                name='Low average task completion rate',
                description=description
            )

            # Save recommendation to the database
            recommendation.save()
            # Record recommendation to the of generated recommendations
            generated_recommendations.append(recommendation)
            low_completion_ratio = True

        return low_completion_ratio

    def low_budget(self, project):
        # The program will create an estimation of a per day running cost. By summing
        # a daily salary and calculating how much money is left.
        # The program will suggest increasing the budget.

        budget_ratio = project.current_budget / project.initial_budget
        time_ratio = (datetime.date.today() - project.start_date) / \
            project.current_deadline
            
        low_budget = False

        if time_ratio > budget_ratio:
            description = (f"We suggest increasing the budget for the project {project.name} to \
                    complete the remaining taks.")
            
            recommendation = Recommendation(
                project=project,
                name='Low budget',
                description=description
            )

            # Save recommendation to the database
            recommendation.save()
            # Record recommendation to the of generated recommendations
            generated_recommendations.append(recommendation)
            low_budget = True

        return low_budget
