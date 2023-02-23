from startevaluationdata import StartEvaluationData
from currentevaluationdata import CurrentEvaluationData
from projectproxy import ProjectProxy
from projectevaluator import ProjectEvaluator
import datetime


print("Start")

evaluator = ProjectEvaluator()

#initial_budget, num_developers, num_other_team_members, original_deadline, daily_running_cost, num_tasks
DEADLINE_DATE = datetime.date.today() + datetime.timedelta(days = 100) #What date format should I use?
start_evaluation_data = StartEvaluationData(10000, 10, 2, DEADLINE_DATE, 50, 10)

chance_of_success = evaluator.get_initial_chance_of_success(start_evaluation_data)

print("Chance_Of_Success: " + str(chance_of_success))
