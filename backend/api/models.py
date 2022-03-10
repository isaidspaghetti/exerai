from django.contrib.postgres.fields import ArrayField, JSONField
from django.db import models


class Movements(models.Model):
    # TODO: is it ok that the col names are camelcase
    actionDescription = models.TextField(default="", null=True)
    exerId = models.CharField(max_length=50, unique=True)
    exercise = JSONField(null=True)
    # TODO: one to one relationship with an exercise table, serialize the data
    name = models.CharField(max_length=155, null=False)
    thumbnailUrl = models.URLField(null=True)
    versions = ArrayField(models.CharField(max_length=10, blank=True))
    # TODO: is versions a serparate table? join here?
    created_at = models.DateTimeField(auto_now_add=True)
