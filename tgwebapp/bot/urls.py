from django.urls import path
from . import views

urlpatterns = [
    path('', views.Myfun, name="Myfun")
]
