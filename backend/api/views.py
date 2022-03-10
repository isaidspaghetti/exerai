from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics

from .models import Movements
from .serializers import MovementsSerializer


# Create your views here.
def main(request):
    return HttpResponse("hello")

class MovementsView(generics.ListAPIView):
    # create new movements
    queryset = Movements.objects.all()
    serializer_class = MovementsSerializer
