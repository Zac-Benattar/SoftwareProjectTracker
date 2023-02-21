from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone

from .models import Project, Meeting, Feedback, Task, Role, RoleRequirement, Member, Schedule, TimeWorked, Recommendation, RiskEvaluation

# Create your views here.


class IndexView(generic.ListView):
    model = Project
    template_name = 'projects/index.html'
    context_object_name = 'projects_list'

    def get_queryset(self):
        """
        Return all in progress projects.
        """
        return Project.objects.filter(
            currentDeadline__gte=timezone.now()
        ).order_by('-currentDeadline')[:]


class DetailView(generic.DetailView):
    template_name = 'projects/detail.html'
    context_object_name = 'context'
    
    def get_object(self):
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'riskevaluation' : RiskEvaluation.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-date').last()
        }
        return context


class PeopleView(generic.ListView):
    template_name = 'projects/people.html'
    context_object_name = 'context'
    
    def get_queryset(self):
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'members' : Member.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-joinedDate')
        }
        return context


class TasksView(generic.ListView):
    template_name = 'projects/tasks.html'
    context_object_name = 'context'
    
    def get_queryset(self):
        tasks = Task.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-createdTime')
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'tasks' : tasks,
            'tasksCount' : str(len(tasks))
            
        }
        return context



class RecommendationsView(generic.ListView):
    template_name = 'projects/recommendations.html'
    context_object_name = 'context'
    
    def get_queryset(self):
        recommendations = Recommendation.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-createdTime')
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'recommendations' : recommendations,
            'recommendationsCount' : str(len(recommendations))
            
        }
        return context

