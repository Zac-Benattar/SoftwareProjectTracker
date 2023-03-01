# converts python model objects to json
from rest_framework.serializers import ModelSerializer
from projects.models import *


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class RoleRequirementSerializer(ModelSerializer):
    class Meta:
        model = RoleRequirement
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class UserSkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class MemberSerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class TimeWorkedSerializer(ModelSerializer):
    class Meta:
        model = TimeWorked
        fields = '__all__'


class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class RiskEvaluationSerializer(ModelSerializer):
    class Meta:
        model = RiskEvaluation
        fields = '__all__'


class MeetingSerializer(ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'


class FeedbackSerializer(ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'


class RecommendationSerializer(ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'
