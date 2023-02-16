#Class used to store all the relevant project data at the start of development
#It includes less data than current evaluation data which inherits from this
#This is because the project isn't in progress yet and some values would be useless
#This object can return a matrix containing data for the model to predict a riskiness
class StartEvaluationData:
    def __init__(self, initial_budget, num_developers, num_other_team_members, original_deadline, daily_running_cost, num_tasks):
        self.initial_budget = initial_budget
        self.money_spent = 0
        self.num_developers = num_developers
        self.num_other_team_members = num_other_team_members
        self.days_until_original_deadline = None
        self.days_budget_covers_running_costs = (self.initial_budget - self.money_spent) / daily_running_cost
        self.num_tasks = num_tasks
        self.num_completed_tasks = 0

    def get_data_as_matrix(self):
        matrix = [[
        self.initial_budget,
        self.money_spent,
        self.num_developers,
        self.num_other_team_members,
        self.days_until_original_deadline,
        self.days_budget_covers_running_costs,
        self.num_tasks,
        self.num_completed_tasks
        ]]

        return matrix #Return 1xn matrix

    def get_initial_budget(self):
        return self.initial_budget

    def get_num_developers(self):
        return self.num_developers

    def get_num_other_team_members(self):
        return self.num_other_team_members

    def get_total_team_members(self):
        return self.get_num_developers() + self.get_num_other_team_members()

    def get_days_until_original_deadline(self):
        return self.days_until_original_deadline

    def get_days_budget_covers_running_costs(self):
        return self.days_budget_covers_running_costs

    def get_num_tasks(self):
        return self.num_tasks

    def get_num_completed_tasks(self):
        return self.num_completed_tasks

    def get_num_uncompleted_tasks(self):
        return self.get_num_tasks() - self.get_num_completed_tasks()
