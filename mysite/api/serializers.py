#converts python model objects to json 
from rest_framework.serializers import ModelSerializer
from projects.models import Project 
from users.models import User

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
       # fields = ['name', 'description']

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
       # fields = ['name', 'description']