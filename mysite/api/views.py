from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from projects.models import *
from users.models import *
from .serializers import *
from rest_framework import viewsets

class Project(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class Task(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

