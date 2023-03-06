
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import permissions, viewsets
from projects.models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import NotFound
from rest_framework.decorators import permission_classes, action
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from decimal import Decimal


import sys #Import system file to add extra imports from outside file
import pathlib #Import the libary to modify paths

#Add the Risk_Assessment folder to the path
originalPath = sys.path
folderpath = str(pathlib.Path(__file__).parent.parent.joinpath('static\Risk_Assessment').resolve())
sys.path.append(folderpath)

#Import files to handle machine learning
from startevaluationdata import StartEvaluationData
from currentevaluationdata import CurrentEvaluationData
from projectevaluator import ProjectEvaluator

# ======================
# Generate a ProjectEvaluator object
# Used to get project evaluations
# ======================
PROJECT_EVALUATOR = ProjectEvaluator()

sys.path = originalPath

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# read permissions for authenticated users
class IsOwnerOrCoWorker(permissions.BasePermission):
    message = 'Editing this field is restricted to the owners only'

    def has_object_permission(self, request, view, obj):
        # Only allow read permissions to members of the project
        if request.method in permissions.SAFE_METHODS:
            return True
        # Only allow write permissions to members involved in the task
        if obj.members.filter(user_profile=request.user.id).exists():
            return True

        return False


class ProjectReadAndWritePermission(permissions.BasePermission):
    message = 'Editing projects is restricted to the project manager only'

    def has_object_permission(self, request, view, obj):
        # Only allow read permissions for members of the project
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only allow write permissions to project manager
        user = get_object_or_404(User, username=request.user)
        user_profile = get_object_or_404(UserProfile, user=user)
        query_set = Member.objects.filter(
            user_profile=user_profile, project=obj.id, project_manager=True)
        if query_set.exists():
            return True

        return False


class ProjectsViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [ProjectReadAndWritePermission]

    def get_queryset(self):
        '''Gets list of projects that the logged in user is involved in

        Returns:
            list(projects)
        '''
        user = get_object_or_404(User, username=self.request.user)
        user_profile = get_object_or_404(UserProfile, user=user)
        projects = user_profile.projects
        return projects


class MyAccountViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        '''Gets list of projects that the logged in user is involved in

        Returns:
            list(user)
        '''
        user = get_object_or_404(User, username=self.request.user)
        return user


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().prefetch_related(
        'userprofile_set'
    ).all()

    serializer_class = UserSkillSerializer

    def get_queryset(self, *args, **kwargs):
        user_id = self.kwargs.get('user_pk')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        return self.queryset.filter(userprofile=user_id)


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all().select_related(
        'member'
    ).all()

    serializer_class = ScheduleSerializer

    def get_queryset(self, *args, **kwargs):
        member_id = self.kwargs.get("member_pk")
        try:
            member = Member.objects.get(id=member_id)
        except Member.DoesNotExist:
            raise NotFound('A member with this id does not exist')
        return self.queryset.filter(member=member)


class TimeWorkedViewSet(viewsets.ModelViewSet):
    queryset = TimeWorked.objects.all().select_related(
        'member'
    ).all()

    serializer_class = TimeWorkedSerializer

    def get_queryset(self, *args, **kwargs):
        member_id = self.kwargs.get("member_pk")
        try:
            member = Member.objects.get(id=member_id)
        except Member.DoesNotExist:
            raise NotFound('A member with this id does not exist')
        return self.queryset.filter(member=member)


class RoleRequirementViewSet(viewsets.ModelViewSet):
    queryset = RoleRequirement.objects.all().select_related(
        'role'
    ).all()

    serializer_class = RoleRequirementSerializer

    def get_queryset(self, *args, **kwargs):
        role_id = self.kwargs.get("role_pk")
        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            raise NotFound('A role with this id does not exist')
        return self.queryset.filter(role=role)

# select_related and prefetch_related are database function. select_related is used to select a single object ( Foreign Key ),
# prefetch_related gets back a set of things,


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().select_related(
        'project'
    ).all()

    serializer_class = MemberSerializer

    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        return self.queryset.filter(project=project)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().select_related(
        'project'
    ).all()
    serializer_class = TaskSerializer
    permission_classes = [IsOwnerOrCoWorker]

    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        return self.queryset.filter(project=project)


class RiskEvaluationViewSet(viewsets.ModelViewSet):
    queryset = RiskEvaluation.objects.all().select_related(
        'project'
    ).all()

    serializer_class = RiskEvaluationSerializer

    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        set = RiskEvaluation.objects.filter(project=project).order_by('-date')
        return set[0:1]


class RiskEvaluationGeneratorViewSet(viewsets.ModelViewSet):
    serializer_class = RiskEvaluationSerializer

    def generate_risk_evaluation(self, project):


        generate_initial_prediction = True



        success_chance = 0 #Initialize success chance

        #Get chance of success
        if generate_initial_prediction == True:

            #Load in data
            initial_budget = float(project.initial_budget)

            num_developers = len(Member.objects.filter(project = project, developer = True))
            num_other_team_members = len(Member.objects.filter(project = project, developer = False))
            # ===========================
            # DO NOT LET THIS SLIP THROUGH THE NET!!!!!!!
            # ===========================
            original_deadline = project.initial_deadline #FIX THISSSSSS

            daily_running_cost = 100 #Left as a placeholder for no
            # ===========================
            # DO NOT LET THIS SLIP THROUGH THE NET!!!!!!!
            # ===========================

            num_tasks = len(Task.objects.filter(project = project))

            #Generate evaluation stats
            #initial_budget, num_developers, num_other_team_members, original_deadline, daily_running_cost, num_tasks
            start_evaluation_data = StartEvaluationData(
            initial_budget,
            num_developers,
            num_other_team_members,
            original_deadline,
            daily_running_cost,
            num_tasks)

            #Evaluate data
            success_chance = PROJECT_EVALUATOR.get_initial_chance_of_success(start_evaluation_data)
        else:
            #Load in data
            initial_budget = float(project.initial_budget)
            current_budget = float(project.current_budget)
            # ===========================
            # DO NOT LET THIS SLIP THROUGH THE NET!!!!!!!
            # ===========================
            money_spent = float(0)

            num_developers = len(Member.objects.filter(project = project, developer = True))
            num_other_team_members = len(Member.objects.filter(project = project, developer = False))
            # ===========================
            # DO NOT LET THIS SLIP THROUGH THE NET!!!!!!!
            # ===========================
            num_team_left = 0
            # ===========================
            # DO NOT LET THIS SLIP THROUGH THE NET!!!!!!!
            # ===========================
            original_deadline = project.initial_deadline #FIX THISSSSSS
            current_deadline = project.current_deadline #FIX THISSSSSS

            daily_running_cost = 100
            # ===========================
            # DO NOT LET THIS SLIP THROUGH THE NET!!!!!!!
            # ===========================
            num_tasks = len(Task.objects.filter(project = project))
            completed_tasks = 0
            average_happiness = 0
            average_confidence = 0

            #Generate evaluation stats
            #initial_budget, current_budget, money_spent, num_developers, num_other_team_members, num_team_left, original_deadline, current_deadline, daily_running_cost, num_tasks, completed_tasks, average_happiness, average_confidence
            current_evaluation_data = CurrentEvaluationData(
            initial_budget,
            current_budget,
            money_spent,
            num_developers,
            num_other_team_members,
            num_team_left,
            original_deadline,
            current_deadline,
            daily_running_cost,
            num_tasks,
            completed_tasks,
            average_happiness,
            average_confidence)

            #Evaulate Data
            success_chance = PROJECT_EVALUATOR.get_current_chance_of_success(start_evaluation_data)

        risk_evaluation = RiskEvaluation(project = project, success_chance = Decimal(success_chance))
        risk_evaluation.save()
        return risk_evaluation

    def get_queryset(self, *args, **kwargs):

        project_id = self.kwargs.get("project_pk")

        try:
            project = Project.objects.get(id=project_id)
            print(project)
            risk_evaluation = self.generate_risk_evaluation(project)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        return (risk_evaluation),


class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all().select_related(
        'project'
    ).all()

    serializer_class = MeetingSerializer

    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        return self.queryset.filter(project=project)


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all().select_related(
        'project'
    ).all()

    serializer_class = FeedbackSerializer

    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        return self.queryset.filter(project=project)


class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Recommendation.objects.all().select_related(
        'project'
    ).all()

    serializer_class = RecommendationSerializer

    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise NotFound('A project with this id does not exist')
        return self.queryset.filter(project=project)
