from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import View
from django.utils import timezone

from .models import *

from rest_framework.response import Response
        

class IndexView(View):
    def get(self, request):
        """Returns HttpResonse containing page listing all users who have a account creation date in the past

        Returns:
            HttpResponse: index.html with context: users
        """
        users = User.objects.filter(join_date__lte=timezone.now()).order_by('-join_date')[:]
        context = {'users':users}
        return render(request, 'users/index.html', context)


class DetailView(View):
    def get(self, request, pk):
        """Returns HttpResponse containing relevant user's basic details

        Returns:
            HttpResponse: detail.html with context: user
        """
        user = get_object_or_404(User, pk=self.kwargs['pk'])
        context = {'user':user}
        return render(request, 'users/detail.html', context)


class SkillsView(View):
    def get(self, request, pk):
        """Returns HttpResponse containing relevant user's skills and a description of each

        Returns:
            HttpResponse: detail.html with context: user
        """
        user = get_object_or_404(User, pk=self.kwargs['pk'])
        context = {'user':user}
        return render(request, 'users/skills.html', context)
    


