from startevaluationdata import StartEvaluationData
from currentevaluationdata import CurrentEvaluationData
from projectevaluator import ProjectEvaluator
import datetime


print("Start")

evaluator = ProjectEvaluator()

#initial_budget, num_developers, num_other_team_members, original_deadline, daily_running_cost, num_tasks
DEADLINE_DATE = datetime.datetime.now() + datetime.timedelta(days = 100) #What date format should I use?


#initial_budget, num_developers, num_other_team_members, original_deadline, daily_running_cost, num_tasks
start_evaluation_data = StartEvaluationData(20000, 20, 2, DEADLINE_DATE, 100, 50)

chance_of_success = evaluator.get_initial_chance_of_success(start_evaluation_data)

print("Chance_Of_Success: " + str(chance_of_success))

print("RETRAIN MODEL")

evaluator.update_model(start_evaluation_data, [], 1)

chance_of_success = evaluator.get_initial_chance_of_success(start_evaluation_data)

print("Chance_Of_Success: " + str(chance_of_success))
