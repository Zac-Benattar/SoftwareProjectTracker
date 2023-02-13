from django.contrib import admin

from .models import Project, Member


class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description', 'methodology', 'gitHubToken')}),
        ('Deadlines', {'fields': ('initialDeadline', 'currentDeadline')}),
        ('Finances', {'fields': ('initialBudget', 'currentBudget')}),
    ]
    
    list_display = ('name', 'methodology', 'currentDeadline', 'currentBudget')
    list_filter = ['currentDeadline']
    search_fields = ['name']

