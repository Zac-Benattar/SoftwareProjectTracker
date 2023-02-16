
from startevaluationdata import StartEvaluationData
#Class used to store all the relevant project data during development
#This object can return a matrix containing data for the model to predict a riskiness
class CurrentEvaluationData(StartEvaluationData): #CurrentEvaluationData inherits from StartEvaluationData
    #Overrides StartEvaluationData init
    def __init__(self, initial_budget, current_budget, money_spent, num_developers, num_other_team_members, original_deadline, current_deadline, daily_running_cost, num_tasks, completed_tasks, average_happiness, average_confidence):
        self.initial_budget = initial_budget
        self.current_budget = current_budget

        self.money_spent = money_spent

        self.num_developers = num_developers
        self.num_other_team_members = num_other_team_members

        self.days_until_original_deadline = None
        self.days_until_current_deadline = None

        self.days_budget_covers_running_costs = (self.current_budget - self.money_spent) / daily_running_cost

        self.num_tasks = num_tasks
        self.num_completed_tasks = completed_tasks

        self.current_average_happiness = average_happiness
        self.current_average_confidence = average_confidence

    #Overrides method from StartEvaluationData
    def get_data_as_matrix(self):
        #No idea how to code this yet! Will look this up ASAP
        #Converts all this data into a matrix that the trained model can understand
        return None #Change return statement

    #Inherits methods from StartEvaluationData

    def get_current_budget(self):
        return self.current_budget

    def get_days_until_current_deadline(self):
        return self.days_until_current_deadline

    def get_average_happiness(self):
        return self.current_average_happiness

    def get_average_confidence(self):
        return self.current_average_confidence
