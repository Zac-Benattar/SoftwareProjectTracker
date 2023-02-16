#Alex can you make a function in here that makes suggestions for the project
#Look at the design document for a potential implementation
#Thanks, Jacob

import datetime
from users.models import Project, Task

# retrieve all instances
all_Projects = Project.objects.all()
all_Tasks = Task.objects.all()

def get_suggestions(project): 

    # evaluating project's pararameters to make suggestions

    # iterate over the instances
    for task in all_Tasks:  
        if task.project == project:
            if task.completionStatus != 'F':
                if datetime.date.today() > task.Deadline:
                    print(f'You are running out of time to complete the task {task.name}. Try allocating more people to the task.')

    return None
