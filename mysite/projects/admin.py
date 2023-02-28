from django.contrib import admin
from .models import Project, UserProfile, Skill, Member, Role, TimeWorked, Recommendation, Schedule, RoleRequirement, Meeting, Feedback, Task, RiskEvaluation


class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description',
         'methodology', 'gitHub_token')}),
        ('Deadlines', {'fields': ('initial_deadline', 'current_deadline')}),
        ('Finances', {'fields': ('initial_budget', 'current_budget')}),
    ]

    list_display = ('name', 'methodology',
                    'current_deadline', 'current_budget')
    list_filter = ['current_deadline']
    search_fields = ['name']


class UserProfileAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('username',
         'forename', 'lastname', 'email', 'phone')}),
        ('Join Date', {'fields': ('join_date', 'joined_recently')}),
    ]

    list_display = ('username', 'email', 'lastname', 'forename')
    list_filter = ['username', 'join_date', 'lastname', 'forename']
    search_fields = ['username', 'lastname', 'forename', 'email', 'phone']


class SkillAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description')}),
    ]

    list_display = ('name',)
    list_filter = ['name']
    search_fields = ['name', 'description']


class RiskEvaluationAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('project', 'success_chance')}),
    ]

    list_display = ('project', 'success_chance', 'date')
    list_filter = ['project', 'success_chance', 'date']
    search_fields = ['project']


class RoleAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description')}),
    ]

    list_display = ('name',)
    list_filter = ['name']
    search_fields = ['name', 'description']


class MemberAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('user_profile',
         'role', 'project', 'work_hours')}),
    ]

    list_display = ('role', 'project', 'work_hours')
    list_filter = ['role', 'project']
    search_fields = ['role', 'project']


class TimeWorkedAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('member', 'task', 'time')}),
    ]

    list_display = ('member', 'task', 'time')
    list_filter = ['member', 'task', 'time']
    search_fields = ['member', 'task']


class RecommendationAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('project', 'name', 'description')}),
    ]

    list_display = ('project', 'name')
    list_filter = ['project', 'name']
    search_fields = ['project', 'name', 'description']


class ScheduleAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('project', 'member', 'task', 'hours')}),
    ]

    list_display = ('project', 'member', 'task', 'hours')
    list_filter = ['project', 'member', 'task']
    search_fields = ['project', 'member', 'task']


class RoleRequirementAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('role', 'skillset')}),
    ]

    list_display = ('role',)
    list_filter = ['role', 'skillset']
    search_fields = ['role', 'skillset']


class MeetingAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('project', 'date', 'duration', 'attendence')}),
    ]

    list_display = ('project', 'date', 'duration', 'attendence')
    list_filter = ['project', 'date']
    search_fields = ['project', 'date']


class FeedbackAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('project', 'confidence', 'emotion', 'date')}),
    ]

    list_display = ('project', 'confidence', 'emotion', 'date')
    list_filter = ['project', 'date']
    search_fields = ['project', 'confidence', 'emotion', 'date']


class TaskAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'project', 'description')}),
        ('Status', {'fields': ('completion_status',)}),
        ('Time', {'fields': ('duration',)}),
        ('Dependencies', {'fields': ('dependent_tasks',)}),
    ]

    list_display = ('name', 'project', 'completion_status', 'duration')
    list_filter = ['name', 'project', 'completion_status']
    search_fields = ['name', 'project', 'description', 'completion_status']


admin.site.register(Project, ProjectAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(TimeWorked, TimeWorkedAdmin)
admin.site.register(Recommendation, RecommendationAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(RoleRequirement, RoleRequirementAdmin)
admin.site.register(Meeting, MeetingAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(RiskEvaluation, RiskEvaluationAdmin)
