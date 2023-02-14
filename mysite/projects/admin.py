from django.contrib import admin

from .models import Project, Member, Role, TimeWorked, Recommendation, Schedule, RoleRequirement, Meeting, Feedback, Task


class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description', 'methodology', 'gitHubToken')}),
        ('Deadlines', {'fields': ('initialDeadline', 'currentDeadline')}),
        ('Finances', {'fields': ('initialBudget', 'currentBudget')}),
    ]
    
    list_display = ('name', 'methodology', 'currentDeadline', 'currentBudget')
    list_filter = ['currentDeadline']
    search_fields = ['name']
    
class RoleAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description')}),
    ]
    
    list_display = ('name',)
    list_filter = ['name']
    search_fields = ['name', 'description']


class MemberAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('user', 'role', 'project', 'workhours')}),
    ]
    
    list_display = ('user', 'role', 'project', 'workhours')
    list_filter = ['user', 'role', 'project']
    search_fields = ['user', 'role', 'project']


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
        ('Status', {'fields': ('completionStatus',)}),
        ('Time', {'fields': ('duration',)}),
    ]
    
    list_display = ('name', 'project', 'completionStatus', 'duration')
    list_filter = ['name', 'project', 'completionStatus']
    search_fields = ['name', 'project', 'description', 'completionStatus']   


admin.site.register(Project, ProjectAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(TimeWorked, TimeWorkedAdmin)
admin.site.register(Recommendation, RecommendationAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(RoleRequirement, RoleRequirementAdmin)
admin.site.register(Meeting, MeetingAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Task, TaskAdmin)
