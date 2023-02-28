# converts python model objects to json
from rest_framework.serializers import ModelSerializer
from projects.models import *


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
       # fields = ['name', 'description']


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
       # fields = ['name', 'description']
