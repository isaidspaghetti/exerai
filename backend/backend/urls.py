from api import views
from api.views import MovementViewSet
from django.contrib import admin
from django.urls import path, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api/movements", MovementView.as_view(), name='movements_list'),
    # path('api/<int:pk>', MovementDetail.as_view()),
    path("movements", MovementViewSet.as_view({"get":"list"})),
    path("create", MovementViewSet.as_view(
        {"post": "create"}
    )),
    path("movement/<int:pk>", MovementViewSet.as_view(
        {"get": "retrieve", "put": "update", "delete": "destroy"}
    ) ),
    path('search/',views.search),


]
