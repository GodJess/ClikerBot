from django.urls import path
from . import views
# from .views import DataAPIView

urlpatterns = [
    path('', views.Myfun, name="Myfun"),
    # path('data/', DataAPIView.as_view() , name="UserInformations"),
    path('data/', views.Data , name="UserInformations"),
    path('user/', views.user_ses, name="user"),
    path("get_csrf_token/", views.get_csrf_token, name="get_csrf_token" ),
    path("setcount/", views.setCount, name="setcount"),
    path("setrecover/", views.setRecover, name="setrecover"),
    path("getprice/", views.getLvl, name="getprice"),
    path("setLvltab/", views.setLvltab, name="setLvltab"),
    path("setLvlstorage/", views.setLvlstorage, name="setLvlstorage"),
    path("setLvlrecover/", views.setLvlrecover, name="setLvlrecover"),
    path("setLvlcliker/", views.setLvlcliker, name="setLvlcliker"),
    path("referal/", views.yourReferal, name="referal"),
    path("task/", views.Task, name="task"),
    path("compleate/", views.TasksCompleate, name="compleate"),
    path("comp/", views.Compleate, name="comp"),
    path('userList/', views.ListOfUser, name="listUser"),
    path('getCliker/', views.getCliker, name="getCliker"),
]
