from django.contrib import admin

from .models import Skill, User


class UserSkillsInline(admin.TabularInline):
    model = User.skillset.through


class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Personal Details', {'fields': ('username', 'forename', 'lastname')}),
        ('Date information', {'fields': ['join_date'], 'classes': ['collapse']}),
    ]
    
    list_display = ('username', 'forename', 'lastname', 'join_date', 'joined_recently')
    list_filter = ['join_date']
    search_fields = ['username', 'forename', 'lastname']
    inlines = [UserSkillsInline,]


class SkillAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Skill Information', {'fields': ('name','description')})
    ]
    list_display = ('name', 'description')
    search_fields = ['name']


admin.site.register(User, UserAdmin)
admin.site.register(Skill, SkillAdmin)