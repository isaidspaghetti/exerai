from rest_framework import serializers

from .models import Exercise, Movement


class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ('id', 'actionDescription', 'exerId', 'exercise', 'name', 'thumbnailUrl', 'versions')

class ExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ('id', 'name')
