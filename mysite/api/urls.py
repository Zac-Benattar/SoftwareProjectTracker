from django.urls import path , include
from . import views 
from rest_framework_nested import routers
from api.views import * 
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'users', UserViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'tokens', MyTokenObtainPairView.as_view())


token_router = routers.NestedDefaultRouter( router, r'tokens', lookup = 'token_obtain_pair')
token_router.register( r'refresh', TokenRefreshView.as_view(), basename='token_refresh')

# project routers , api call : /api/projects/pk/model_name/pk
member_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
member_router.register( r'members', MemberViewSet, basename='project-member')
# maybe task in members ?
task_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
task_router.register( r'tasks', TaskViewSet, basename='project-task')

risk_evaluation_router = routers.NestedDefaultRouter( router, r'projects', lookup = 'project')
risk_evaluation_router.register( r'riskevaluation', RiskEvaluationViewSet, basename='project-riskEvaluation')

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
userSkill_router = routers.NestedDefaultRouter( router, r'users', lookup = 'user')
userSkill_router.register( r'skill', UserSkillViewSet, basename='user-userSkill')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(userSkill_router.urls)),
    path('', include(role_requirement_router.urls)),
    path('', include(timeWorked_router.urls)),
    path('', include(member_router.urls)),
    path('', include(schedule_router.urls)),
    path('', include(task_router.urls)),
    path('', include(risk_evaluation_router.urls)),
    path('', include(meeting_router.urls)),
    path('', include(feedback_router.urls)),
    path('', include(recommendation_router.urls)),
    path('', include(token_router.urls)),
]