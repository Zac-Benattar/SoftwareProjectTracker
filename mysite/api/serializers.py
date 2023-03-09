#converts python model objects to json inkedId
from rest_framework.serializers import Serializer, ModelSerializer, IntegerField
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
    creation_date_unix = IntegerField(source='creation_date_to_unix')
    start_date_unix = IntegerField(source='start_date_to_unix')    
    earliest_finish_date_unix = IntegerField(source='earliest_finish_date_to_unix')
    latest_finish_date_unix = IntegerField(source='latest_finish_date_to_unix')
    
    class Meta:
        model = Task
        fields = ['id', 'members', 'project', 'name', 'description', 'duration', 'creation_date_unix', 'start_date_unix', 'earliest_finish_date_unix', 'latest_finish_date_unix', 'dependent_tasks', 'completion_status']
