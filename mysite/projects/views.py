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
    model = RiskEvaluation
    template_name = 'projects/detail.html'
    context_object_name = 'riskevaluation'
    
    def get_object(self):
        return RiskEvaluation.objects.filter(
            project=get_object_or_404(Project, pk=self.kwargs['pk'])
        ).order_by('-date')[:1][0]


class PeopleView(generic.ListView):
    model = Member
    template_name = 'projects/people.html'


class TasksView(generic.ListView):
    model = Task
    template_name = 'projects/tasks.html'


class RecommendationsView(generic.ListView):
    model = Recommendation
    template_name = 'projects/recommendations.html'

