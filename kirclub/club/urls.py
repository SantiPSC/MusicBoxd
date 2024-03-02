from django.urls import path
from .api import api

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("receta/", views.receta, name="receta"),
    path("api/", api.urls),
]