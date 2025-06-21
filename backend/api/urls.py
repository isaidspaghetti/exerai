from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'movements', views.MovementViewSet, basename='movement')

urlpatterns = [
    path('search/', views.search, name='search'),
]

urlpatterns += router.urls 