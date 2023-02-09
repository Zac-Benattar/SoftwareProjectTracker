from django.contrib import admin

from .models import Skill, User


# class SkillInline(admin.TabularInline):
#     model = Skill
#     extra = 3


class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Personal Details',               {'fields': ('username', 'forename', 'lastname')}),
        ('Date information', {'fields': ['join_date'], 'classes': ['collapse']}),
    ]
    # inlines = [SkillInline]
    list_display = ('username', 'forename', 'lastname', 'join_date', 'joined_recently')
    list_filter = ['join_date']
    search_fields = ['forename']

admin.site.register(User, UserAdmin)