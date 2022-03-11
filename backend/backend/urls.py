from api import views
from api.views import MovementList, MovementViewSet
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api/movements", MovementView.as_view(), name='movements_list'),
    # path('api/<int:pk>', MovementDetail.as_view()),
    path("movements", MovementList.as_view()),
    path("movement", MovementViewSet.as_view(
        {"post": "create"}
    )),
    path("movement/<int:pk>", MovementViewSet.as_view(
        {"get": "retrieve", "put": "update", "delete": "destroy"}
    ) )
    # path('', MovementsList.as_view(), name='listcreate')
]
