from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone

from .models import User, Skill


class IndexView(generic.ListView):
    model = User
    template_name = 'users/index.html'
    context_object_name = 'latest_users_list'

    def get_queryset(self):
        """Returns all users that have a join_date in the past, 
        sorted by join_date descending (most recent first)

        Returns:
            list(User): All users that have a join_date in the past
        """
        return User.objects.filter(
            join_date__lte=timezone.now()
        ).order_by('-join_date')[:]


class DetailView(generic.DetailView):
    model = User
    template_name = 'users/detail.html'
    def get_object(self):
        """Returns relevant user

        Returns:
            User: The user with the pk in the url
        """
        return get_object_or_404(User, pk=self.kwargs['pk'])


class SkillsView(generic.DetailView):
    model = User
    template_name = 'users/skills.html'
