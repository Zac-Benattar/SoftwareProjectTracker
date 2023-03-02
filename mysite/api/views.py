
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from projects.models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

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
    
    
# class MyTasksView(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
    
#     def get_queryset(self):
        
#         user = get_object_or_404(User, username=self.request.user)
#         tasks = get_list_or_404(Task, members=)        

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().prefetch_related(
        'user_set'
    ).all()

    serializer_class = UserSkillSerializer

    def get_queryset(self, *args, **kwargs):
        user_id = self.kwargs.get("user_pk")
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound('A user with this id does not exist')
        return self.queryset.filter(user=user)


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
        return self.queryset.filter(project=project)


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
