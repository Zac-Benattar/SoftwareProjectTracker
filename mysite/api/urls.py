from django.urls import path, include
from rest_framework_nested import routers
from api.views import * 
from rest_framework_simplejwt.views import TokenRefreshView


router = routers.DefaultRouter()
router.register(r'projects', ProjectsViewSet, basename='projects')
router.register(r'users', UserViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'skills', SkillViewSet)

# add a specific project router


# project routers , api call : /api/projects/pk/model_name/pk
member_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
member_router.register( r'members', MemberViewSet, basename='project-member')

task_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
task_router.register( r'tasks', TaskViewSet, basename='project-task')

not_started_task_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
not_started_task_router.register( r'notstartedtasks', NotStartedTaskViewSet, basename='project-task-not-started')

started_task_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
started_task_router.register( r'startedtasks', StartedTaskViewSet, basename='project-task-started')

finished_task_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
finished_task_router.register( r'finishedtasks', FinishedTaskViewSet, basename='project-task-finished')

no_status_task_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
no_status_task_router.register( r'nostatustasks', NoStatusTaskViewSet, basename='project-task-no-status')

risk_evaluation_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
risk_evaluation_router.register( r'riskevaluation', RiskEvaluationViewSet, basename='project-riskEvaluation')

generate_risk_evaluation_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
generate_risk_evaluation_router.register( r'generateriskevaluation', RiskEvaluationGeneratorViewSet, basename='project-generateRiskEvaluation')

meeting_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
meeting_router.register( r'meeting', MeetingViewSet, basename='project-meeting')

feedback_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
feedback_router.register( r'feedback', FeedbackViewSet, basename='project-feedback')

recommendation_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
recommendation_router.register( r'recommendation', RecommendationViewSet, basename='project-recommendation')

# member routers , api call : /api/projects/pk/members/pk/model_name/pk
schedule_router = routers.NestedDefaultRouter( member_router, r'members', lookup = 'member')
schedule_router.register( r'schedule', ScheduleViewSet, basename='member-schedule')

timeWorked_router = routers.NestedDefaultRouter( member_router, r'members', lookup = 'member')
timeWorked_router.register( r'timeworked', TimeWorkedViewSet, basename='member-timeWorked')

# role routers , api call : /api/roles/pk/model_name/pk
role_requirement_router = routers.NestedDefaultRouter(router, r'roles', lookup = 'role')
role_requirement_router.register(r'rolerequirement', RoleRequirementViewSet, basename = 'role-roleRequirement')

# user routers , api call : /api/users/pk/skill/pk
userSkills_router = routers.NestedDefaultRouter( router, r'users', lookup = 'user')
userSkills_router.register( r'skills', UserSkillViewSet, basename='user-userSkill')

# user routers , api call : /api/users/myaccount
userAccount_router = routers.NestedDefaultRouter( router, r'users', lookup = 'user')
userAccount_router.register( r'myaccount', MyAccountViewSet, basename='user-myAccount')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(userSkills_router.urls)),
    path('', include(role_requirement_router.urls)),
    path('', include(timeWorked_router.urls)),
    path('', include(member_router.urls)),
    path('', include(schedule_router.urls)),
    path('', include(task_router.urls)),
    path('', include(not_started_task_router.urls)),
    path('', include(started_task_router.urls)),
    path('', include(finished_task_router.urls)),
    path('', include(no_status_task_router.urls)), 
    path('', include(risk_evaluation_router.urls)),
    path('', include(generate_risk_evaluation_router.urls)),
    path('', include(meeting_router.urls)),
    path('', include(feedback_router.urls)),
    path('', include(recommendation_router.urls)),
    path('', include(userAccount_router.urls)),
    path('token/', MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]