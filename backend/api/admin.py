from django.contrib import admin

from . import models


@admin.register(models.Movement)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'actionDescription', 'exerId', 'exercise', 'name', 'thumbnailUrl', 'versions')


