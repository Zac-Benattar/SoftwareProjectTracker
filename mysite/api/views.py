from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from projects.models import *
from users.models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            "Endpoint" : "/task/",
            "method"  : "GET",
            'body'     : None, 
            'description': 'Return an array of tasks'
        },
        {
            'Endpoint' : '/task/id',
            'method'   : 'GET',
            'body'     : None, 
            'description': 'Return a single task object'
        },
        {
            'Endpoint' : '/task/create',
            'method'   : 'POST',
            'body'     : {'body': "" }, 
            'description': 'Create new task with data sent in post request'
        },
        {
            'Endpoint' : '/task/id/update',
            'method'   : 'PUT',
            'body'     : {'body': ""}, 
            'description': 'Updates an existing note with data sent in post request'
        },
        {
            'Endpoint' : '/task/id/delete',
            'method'   : 'DELETE',
            'body'     :  None, 
            'description': 'Deletes an existing note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getProjects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProject(request, pk):
    project = Project.objects.get(id = pk)
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)

# @api_view(['POST'])
# def createProject(request):
#     data = request.data
#     project = Project.objects.create(
#         name = models.CharField(max_length=30)
#         description = models.CharField(max_length=200)
#         initialBudget = models.DecimalField(max_digits=15, decimal_places=2)
#         currentBudget = models.DecimalField(max_digits=15, decimal_places=2)
#         initialDeadline = models.DateTimeField()
#         currentDeadline = models.DateTimeField()
#         methodology = models.CharField(max_length=30)
#         gitHubToken = models.CharField(max_length=30)
#     )
#     serializer = NoteSerializer(project, many = False)
#     return Response(serializer.data)

@api_view(['PUT'])
def updateProject(request, pk):
    data = request.data
    project = Project.objects.get(id = pk)    
    serializer = ProjectSerializer( instance = project, data = data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteProject(request,pk):
    project = Project.objects.get(id=pk)
    project.delete()
    return Response('Project was deleted!')

# Create your views here.
