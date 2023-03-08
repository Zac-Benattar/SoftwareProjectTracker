#converts python model objects to json inkedId
from rest_framework.serializers import ModelSerializer
from projects.models import * 

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
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
        model = CustomUser
        fields ='__all__'
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

    def create(self, validated_data):
        get_user = self.context['request'].user
        skill = super().create(validated_data)
        get_user.skillset.add(skill)
        get_user.save()
        return skill

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


class SuggestionSerializer(ModelSerializer):
    class Meta:
        model = Suggestion
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
        
class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
