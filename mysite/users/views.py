from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone

from .models import User, Skill

# Create your views here.


class IndexView(generic.ListView):
    model = User
    template_name = 'users/index.html'
    context_object_name = 'latest_users_list'

    def get_queryset(self):
        """
        Return the last five joined users (not including those set to be join in the future).
        """
        return User.objects.filter(
            join_date__lte=timezone.now()
        ).order_by('-join_date')[:5]


class DetailView(generic.DetailView):
    model = User
    template_name = 'users/detail.html'
    def get_queryset(self):
        """
        Excludes any users have not joined yet.
        """
        return User.objects.filter(join_date__lte=timezone.now())


class SkillsView(generic.DetailView):
    model = User
    template_name = 'users/skills.html'
