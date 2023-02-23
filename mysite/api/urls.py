from django.urls import path 
from . import views 

urlpatterns = [
    path('', views.getRoutes, name="routes"),

    path('projects/', views.getProjects, name='projects'),
    #path('projects/create/', views.createProject, name = 'create-project'),
    path('projects/<int:pk>/update/', views.updateProject, name='update-project'),
    path('projects/<int:pk>/delete/', views.deleteProject, name='delete-project'),
    path('projects/<int:pk>/', views.getProject, name='project'),

    path('users/', views.getUser, name='users'),  

  
]