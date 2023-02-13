from django.contrib import admin

from .models import Project, Member


class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Details', {'fields': ('name', 'description', 'methodology')}),
        ('Contact Details', {'fields': ('email', 'phone')}),
        ('Date information', {'fields': ['join_date'], 'classes': ['collapse']}),
    ]
    
    list_display = ('username', 'forename', 'lastname', 'join_date', 'joined_recently')
    list_filter = ['join_date']
    search_fields = ['username', 'forename', 'lastname']
    inlines = [UserSkillsInline,]

