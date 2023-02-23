
from startevaluationdata import StartEvaluationData
from currentevaluationdata import CurrentEvaluationData

class ProjectProxy:

    def __init__(self, project_id):
        self.project_id = project_id


    def get_start_evaluation_data(self):
        #initial_budget, num_developers, num_other_team_members, original_deadline, daily_running_cost, num_tasks
        result = StartEvaluationData(0, 0, 0, None, 0, 0) #Change this line when connected to the database
        return result

    def get_current_evaluation_data(self):
        #initial_budget, current_budget, money_spent, num_developers, num_other_team_members, original_deadline, current_deadline, daily_running_cost, num_tasks, completed_tasks, average_happiness, average_confidence
        result = CurrentEvaluationData(0, 0, 0, 0, 0, None, None, 0, 0, 0, 0) #Change this line when connected to the database
        return result
