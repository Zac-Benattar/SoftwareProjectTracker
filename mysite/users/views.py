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


# def vote(request, question_id):
#     question = get_object_or_404(User, pk=question_id)
#     try:
#         selected_choice = question.choice_set.get(pk=request.POST['choice'])
#     except (KeyError, Skill.DoesNotExist):
#         # Redisplay the question voting form.
#         return render(request, 'users/detail.html', {
#             'question': question,
#             'error_message': "You didn't select a choice.",
#         })
#     else:
#         selected_choice.votes += 1
#         selected_choice.save()
#         # Always return an HttpResponseRedirect after successfully dealing
#         # with POST data. This prevents data from being posted twice if a
#         # user hits the Back button.
#         return HttpResponseRedirect(reverse('users:results', args=(question.id,)))
