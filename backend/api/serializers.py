from rest_framework import serializers

from .models import Exercise, Movement


class MovementSerializer(serializers.ModelSerializer):
    exercise_name = serializers.CharField(source='exercise.name')
    class Meta:
        model = Movement
        fields = ('id', 'actionDescription', 'exerId', 'exercise', 'exercise_name', 'name', 'thumbnailUrl', 'versions')

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name')
