from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Users, Tasks, CompleateTasks
from rest_framework.views import APIView
from .serializers import UsersSerializers, TaskSerializers, CompSerializers
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt  # импортируем csrf_exempt для безопасности
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .Coast import PriceClikerLevel, PriceStorageLevel, PriceRecoverLevel, PriceTabLevel
import threading
from rest_framework.request import Request
from django.core.cache import cache
import time
from celery import shared_task
import json
from .functions import switch, ProcessClick
# from django_celery_beat.models import PeriodicTask, IntervalSchedule
# from celery import Celery

# # Создаем экземпляр приложения Celery и называем его 'myapp'
# app = Celery('myapp')

# # Загружаем настройки конфигурации из Django settings
# app.config_from_object('django.conf:settings', namespace='CELERY')

# # Автоматическое обнаружение задач в приложениях Django
# app.autodiscover_tasks()


# @method_decorator(csrf_exempt, name='dispatch')
@api_view(['POST', 'GET'])
def Myfun(request):
    if request.method == "GET":
        myData = {
            "name": "Yakov1",
            "img" : "https://sun9-43.userapi.com/impg/tUsttqDjPx7mmP6W3dTXvFgox8zRZd_k7JU8SQ/pgkPopOg0aE.jpg?size=960x637&quality=95&sign=44e36fc11ea78e8144da098b63cce53e&c_uniq_tag=g1Hx-3AyzmJvqkc7wQL_ZDPWgzLBW_2HtdVxNrj_op4&type=album",
            "max" : 2000,
            "tab": 5,
            "recover": 3,
            "rating": "Bronze",
            "count": 930,
        }
        
        return Response(myData)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})


# @api_view(["POST", "GET"])
# @csrf_exempt
# def Data(request):
# @method_decorator(csrf_exempt, name='dispatch')
# class DataAPIView(APIView):
#     def post(self, request, *args, **kwargs):

ses_id = 0

@csrf_exempt
@api_view(['POST'])
def Data(request):
    if request.method == "POST":
        tg_id = request.data.get("tg_id")
        tg_username = request.data.get("tg_username")

        if tg_id is not None and tg_username is not None:
            user = Users.objects.filter(tg_user_id=tg_id).first()
            if user:  
                setSession(request, tg_id)
                return Response(UsersSerializers(user, many=False, context={'request': request}).data)
            else:
                user = Users(tg_user_id=tg_id, tg_user_name=tg_username)
                if user.save():
                    setSession(request, tg_id)
                    return Response(UsersSerializers(user, many=False, context={'request': request}).data)
        return Response({"error": "Missing data"}, status=400)

def setSession(request, tg_id):
    # request.session[settings.USER_SESSION_ID] = {"user_id": tg_id}
    cache.set('user_id', tg_id, 60 * 60)   # request.session.modified = True
    # ses = request.session.get(settings.USER_SESSION_ID, {})
    print(cache.get('user_id'))
    

@api_view(["GET"])
def user_ses(request):  
    if request.method == "GET":
        # sessions = request.session.get(settings.USER_SESSION_ID, {})
        tg_id = cache.get('user_id', None)
        print(tg_id)
        user = Users.objects.filter(tg_user_id=884907919).first()
        if user: 
            return Response(UsersSerializers(user, many=False, context={'request': request}).data)
        return Response({"error": "Missing data"}, status=400)


@api_view(["POST"])
def setCount(request):
    if request.method == "POST":
        data = request.data.get("data")
        if data:
            print("Начинаю сохранять изменения")
            user = Users.objects.filter(tg_user_id=884907919).first()
            tab = user.tab
            user.balance = int(user.balance) + int(tab)
            user.count = int(user.count) + int(tab)
            user.storage = int(user.storage) - int(tab)
            ProcessClick(user)
            user.save()
            return Response({"succses": True})
        return Response()


def setdata(user):
    user.tab = int(user.tab) + 1
    user.recover = int(user.recover) + 1



# @shared_task
# def independentFunction():
#         print("Независимая функция работает")
#         user = Users.objects.filter(tg_user_id=884907919).first()
#         if int(user.storage) < int(user.max_storage):
#             user.storage = int(user.storage) + int(user.recover)
#             user.save()

# task_id = None

@api_view(["POST"])
def setRecover(request):
    # global task_id
    if request.method == "POST":
        data = request.data.get("data")
        if data:
            # independentFunction.revoke(terminate=True)
            print("Начинаю восстанавливать хранилище")
            # if task_id:
                # app.control.revoke(task_id, terminate=True)
            user = Users.objects.filter(tg_user_id=884907919).first()
            if int(user.storage) < int(user.max_storage):
                user.storage = int(user.storage) + int(user.recover)
            user.save()
            # task = independentFunction.apply_async()
            # task_id = task.id
            return Response({"succses": True})
        return Response()


@api_view(['GET'])
def getLvl(request):
    if request.method == "GET":
        user = Users.objects.filter(tg_user_id=884907919).first()
        tabPrice = PriceTabLevel()
        storagePrice = PriceStorageLevel()
        recoverPrice = PriceRecoverLevel()
        clikerPrice = PriceClikerLevel()
        
        data = {
            "tabPrice": tabPrice.get_price(int(user.tab_lvl)),
            "storagePrice": storagePrice.get_price(int(user.storage_lvl)),
            "recoverPrice": recoverPrice.get_price(int(user.recover_lvl)),
            "clikerPrice": clikerPrice.get_price(int(user.cliker))
        }
        
        return Response(data)
    
@api_view(["POST"])
def setLvltab(request):
    if request.method == "POST":
        price = request.data.get("price")
        user = Users.objects.filter(tg_user_id=884907919).first()
        if int(user.balance) - int(price) >= 0:
            user.balance = int(user.balance) - int(price)
            user.tab_lvl = int(user.tab_lvl) + 1
            user.tab = int(user.tab) + 1
            
            user.save()
        return Response()
    
@api_view(["POST"])
def setLvlstorage(request):
    if request.method == "POST":
        price = request.data.get("price")
        user = Users.objects.filter(tg_user_id=884907919).first()
        if int(user.balance) - int(price) >= 0:
            user.balance = int(user.balance) - int(price)
            user.storage_lvl = int(user.storage_lvl) + 1
            user.max_storage = int(user.max_storage) + 250
            
            user.save()
        return Response()

@api_view(["POST"])
def setLvlrecover(request):
    if request.method == "POST":
        price = request.data.get("price")
        user = Users.objects.filter(tg_user_id=884907919).first()
        if int(user.balance) - int(price) >= 0:
            user.balance = int(user.balance) - int(price)
            user.recover_lvl = int(user.recover_lvl) + 1
            user.recover = int(user.recover) + 1
            
            user.save()
        return Response()

@api_view(["POST"])
def setLvlcliker(request):
    if request.method == "POST":
        price = request.data.get("price")
        user = Users.objects.filter(tg_user_id=884907919).first()
        if int(user.balance) - int(price) >= 0:
            user.balance = int(user.balance) - int(price)
            user.cliker = int(user.cliker) + 1
            user.cliker_on = True
            user.cliker_box_max = 30000
            user.save()
        return Response()


@api_view(["GET"])
def yourReferal(request):
    if request.method == "GET":
        referal = UsersSerializers(Users.objects.filter(referal_id=884907919), many=True, context={"request": request})
        return Response(referal.data)


@api_view(["GET"])
def Task(request):
    tasks = TaskSerializers(Tasks.objects.all(), many=True)
    
    return Response(tasks.data)

@api_view(["GET"])
def TasksCompleate(request): 
        return Response(CompSerializers(CompleateTasks.objects.filter(complete_id=884907919), many=True).data)


@api_view(["POST"])
def Compleate(request):
    if request.method == "POST":
        number = request.data.get("number")
        print(f"Ваше число {number}")
        result = switch(number)
        print(result)
        
        return Response(result)
    
@api_view(['GET'])
def ListOfUser(request):
    return Response(UsersSerializers(Users.objects.all(), many=True, context={'request': request}).data)


@api_view(['POST'])
def getCliker(request):
    data = Users.objects.filter(tg_user_id=cache.get('user_id')).first()
    if int(data.cliker_box) >= int(data.cliker_box_max):
        data.count = int(data.count) + int(data.cliker_box)
        data.balance = int(data.balance) + int(data.cliker_box)
        data.cliker_box = 0
        
        data.save()
        print("Успешно")
        
        return Response({"itog": True})
    print("Не успешно")
    return Response({"itog": False})