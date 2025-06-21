from django.urls import path, include

urlpatterns = [
    path("", include("api.urls")),  # All your movement routes live here now
]
