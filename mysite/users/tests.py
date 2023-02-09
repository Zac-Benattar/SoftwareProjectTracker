import datetime

from django.test import TestCase
from django.utils import timezone
from django.urls import reverse

from .models import User


class QuestionModelTests(TestCase):

    def test_was_published_recently_with_future_user(self):
        """
        joined_recently() returns False for questions whose join_date
        is in the future.
        """
        time = timezone.now() + datetime.timedelta(days=30)
        future_user = User(join_date=time)
        self.assertIs(future_user.joined_recently(), False)

    def test_was_published_recently_with_old_user(self):
        """
        joined_recently() returns False for users whose join_date
        is older than 1 day.
        """
        time = timezone.now() - datetime.timedelta(days=1, seconds=1)
        old_user = User(join_date=time)
        self.assertIs(old_user.joined_recently(), False)

    def test_was_published_recently_with_recent_user(self):
        """
        joined_recently() returns True for users whose joined_date
        is within the last day.
        """
        time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
        recent_user = User(join_date=time)
        self.assertIs(recent_user.joined_recently(), True)

def create_user(forename, lastname, days):
    """
    Create a user with the given `forename`, `lastname` and joined the
    given number of `days` offset to now (negative for users joined
    in the past, positive for users that have yet to join).
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return User.objects.create(forename=forename, lastname=lastname, join_date=time)


class UserIndexViewTests(TestCase):
    def test_no_users(self):
        """
        If no users exist, an appropriate message is displayed.
        """
        response = self.client.get(reverse('users:index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No users are available.")
        self.assertQuerysetEqual(response.context['latest_users_list'], [])

    def test_past_user(self):
        """
        Users with a joined_date in the past are displayed on the
        index page.
        """
        user = create_user(forename="Past", lastname="User", days=-30)
        response = self.client.get(reverse('users:index'))
        self.assertQuerysetEqual(
            response.context['latest_users_list'],
            [user],
        )

    def test_future_users(self):
        """
        Users with a join_date in the future aren't displayed on
        the index page.
        """
        create_user(forename="Future", lastname="User", days=30)
        response = self.client.get(reverse('users:index'))
        self.assertContains(response, "No users are available.")
        self.assertQuerysetEqual(response.context['latest_users_list'], [])

    def test_future_user_and_past_user(self):
        """
        Even if both past and future users exist, only past users
        are displayed.
        """
        user = create_user(forename="Past", lastname="User", days=-30)
        create_user(forename="Future", lastname="User", days=30)
        response = self.client.get(reverse('users:index'))
        self.assertQuerysetEqual(
            response.context['latest_users_list'],
            [user],
        )

    def test_two_past_users(self):
        """
        The users index page may display multiple users.
        """
        user1 = create_user(forename="Past", lastname="User 1", days=-30)
        user2 = create_user(forename="Past", lastname="User 2", days=-5)
        response = self.client.get(reverse('users:index'))
        self.assertQuerysetEqual(
            response.context['latest_users_list'],
            [user2, user1],
        )

class UserDetailViewTests(TestCase):
    def test_future_question(self):
        """
        The detail view of a user with a join_date in the future
        returns a 404 not found.
        """
        future_user = create_user(forename="Future", lastname="User", days=5)
        url = reverse('users:detail', args=(future_user.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        """
        The detail view of a user with a join_date in the past
        displays the user's name.
        """
        past_user = create_user(forename="Past", lastname="User", days=-5)
        url = reverse('users:detail', args=(past_user.id,))
        response = self.client.get(url)
        self.assertContains(response, past_user.forename)
    
