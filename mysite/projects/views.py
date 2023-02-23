from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.urls import reverse
from django.views import View
from django.utils import timezone

from .models import Project, Task, Member, Recommendation, RiskEvaluation


class IndexView(View):
    def get(self, request):
        """Returns HttpResponse containing index page listing all projects that are in progress

        Returns:
            HttpResponse: index.html with context: projects
        """
        projects =  Project.objects.filter(currentDeadline__gte=timezone.now()).order_by('-currentDeadline')[:]
        context = {'projects':projects}
        return render(request, 'projects/index.html', context)


class DetailView(View):    
    def get(self, request, pk):
        """Returns HttpResponse containing detail page listing:
        The relevant project's details
        The relevant project's risk evaluation

        Returns:
            HttpResponse: detail.html with context: project, riskevaluation
        """
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'riskevaluation' : RiskEvaluation.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-date').last()
        }
        return render(request, 'projects/detail.html', context)


class PeopleView(View):
    def get(self, request, pk):
        """Returns HttpResponse containing people page listing:
        The relevant project's basic details
        The people involved with the project's basic details

        Returns:
            HttpResponse: people.html with context: project, members
        """
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'members' : Member.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-joinedDate')
        }
        return render(request, 'projects/people.html', context)


class TasksView(View):    
    def get(self, request, pk):
        """Returns HttpResponse containing tasks page listing:
        The relevant project's basic details
        The tasks associated with the project
        The number of tasks associated

        Returns:
            HttpResponse: tasks.html with context: project, tasks, tasksCount
        """
        tasks = Task.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-createdTime')
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'tasks' : tasks,
            'tasks_count' : str(len(tasks))
        }
        return render(request, 'projects/tasks.html', context)



class RecommendationsView(View):
    def get(self, request, pk):
        """Returns HttpResponse containing recommendations page listing:
        The relevant project's basic details
        The relevant project's recommendations
        The number of recommendations for the project

        Returns:
            HttpResponse: detail.html with context: project, recommendations, recommendations_count
        """
        recommendations = Recommendation.objects.filter(project=get_object_or_404(Project, pk=self.kwargs['pk'])).order_by('-createdTime')
        context = {
            'project' : get_object_or_404(Project, pk=self.kwargs['pk']),
            'recommendations' : recommendations,
            'recommendations_count' : str(len(recommendations))
        }
        return render(request, 'projects/recommendations.html', context)

