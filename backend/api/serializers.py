from rest_framework import serializers

from .models import Movements


class MovementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movements
        fields = ('id', 'actionDescription', 'exerId', 'exercise', 'name', 'thumbnailUrl', 'versions', 'created_at')
