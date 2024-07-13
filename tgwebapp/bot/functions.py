from .models import Tasks, Users, CompleateTasks
from .Coast import RatingPoint
from django.db.models import F
from django.db.models import Q
import datetime

def switch(el):
    task = Tasks.objects.filter(numberOfTask=el).first()
    user = Users.objects.filter(tg_user_id = 884907919).first()
    current_date = datetime.date.today()
    if user:
        if int(el) == 1:
            compleate = CompleateTasks.objects.filter(complete_id=884907919, numberOfTask = el).last()
            if compleate:
                if current_date > compleate.date:
                    checkUser(el, task, 884907919)
                else:
                    return False
            else:
                checkUser(el, task, 884907919)
        else:
            compleate = CompleateTasks.objects.filter(complete_id=884907919, numberOfTask = el).first()
            if compleate:
                return False
            else:
                    field = task.field
                    print(field)
                    if field == "referal_id":
                        if int(task.result) <= len(Users.objects.filter(referal_id =884907919)):
                            checkUser(el, task, 884907919)
                        else:
                            return False
                    elif field == "count":
                        if int(user.count) >= int(task.result):
                            checkUser(el, task, 884907919)
                        else:
                            return False
                    else:
                        # if Users.objects.filter(tg_user_id=884907919).annotate(field_value=F(field)).filter(field_value__gte=int(task.result)):
                        print(f"Значение поля {field}, больше чем {task.result}")
                        if Users.objects.filter(tg_user_id=884907919).filter(Q(**{f"{field}__gte": int(task.result)})).exists():
                            checkUser(el, task, 884907919)
                        else:
                            return False
                
    else:
        return False
    
    

def checkUser(el, task, id):
    user = Users.objects.filter(tg_user_id = id).first()
    if user:
        user.balance = int(user.balance) + int(task.reward)
        user.save()
        taskNumberOne = CompleateTasks(complete_id=id, numberOfTask = el, date= datetime.date.today())
        taskNumberOne.save()
        return True
    
def ProcessClick(el):
    if int(el.point) > 0 and int(el.point) < 10000001:
        if int(el.count) >= int(el.point):
            el.rating = CheckPointRating(el.count)
            el.max_storage = int(el.max_storage) + 250
            ratings = RatingPoint()
            el.point = ratings.getPoint(CheckPointRating(el.count))
            setdata(el)
            el.storage = el.max_storage
            

def setdata(user):
    user.tab = int(user.tab) + 1
    user.recover = int(user.recover) + 1
    
def CheckPointRating(el):
    if int(el)>100000 and int(el) < 1000000:
        return "Silver"
    elif int(el)>1000000 and int(el) < 4000000:
        return "Gold"
    elif int(el)>4000000 and int(el) < 10000000:
        return "Platina"
    elif int(el) > 10000000:
        return "Diamond"