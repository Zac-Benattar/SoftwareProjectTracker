#converts python model objects to json 
from rest_framework.serializers import ModelSerializer
from projects.models import Project 
from users import models

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
       # fields = ['name', 'description']