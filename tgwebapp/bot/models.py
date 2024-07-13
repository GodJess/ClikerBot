from django.db import models


# Create your models here.
class Users(models.Model):
    tg_user_id = models.CharField("tg id", max_length=100)
    tg_user_name = models.CharField("tg name", max_length=100)
    tg_user_img = models.ImageField(upload_to = 'images/',blank=True, null=True, default="images/user.jpg")
    count= models.CharField("count", max_length=100, default=0)
    balance = models.CharField("balance", max_length=100, default=0)
    recover=models.CharField("recovery", max_length=100, default=1)
    recover_lvl = models.CharField("recover_lvl", max_length=100, default=1)
    tab=models.CharField("profit per tab", max_length=100, default=1)
    tab_lvl = models.CharField("tab_lvl", max_length=100, default=1)
    storage = models.CharField("Count of Storage", max_length=100, default= 1000)
    max_storage = models.CharField("max storage", max_length=100, default=1000)
    storage_lvl = models.CharField("storage_lvl", max_length=100, default=1)
    cliker = models.CharField("autocliker", max_length= 100,default=0)
    cliker_on = models.BooleanField(default=False)
    referal_id = models.CharField("ID пригласившего вас пользователя", max_length=100, default="-")
    rating = models.CharField("Rating", max_length=100, default="Bronze")
    point = models.CharField("point", max_length=1000, default=100000)
    cliker_box = models.CharField("collect", max_length=100, default=0)
    cliker_box_max = models.CharField("max_collect", max_length=100, default=0)
    
    def __str__(self):
        return self.tg_user_id
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        

class Tasks(models.Model):
    numberOfTask = models.CharField("Number", max_length=100)
    description = models.CharField("descript", max_length=100)
    reward = models.CharField("reward", max_length=100)
    field = models.CharField("field from db", max_length=100, default=" - ")
    result = models.CharField("result", max_length=100, default="-")
    
    def __str__(self):
        return self.numberOfTask
    
    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

class CompleateTasks(models.Model):
    complete_id = models.CharField("user_id", max_length=100)
    numberOfTask = models.CharField("Number", max_length=100)
    date = models.DateField("Date")
    
    def __str__(self):
        return self.complete_id
    
    class Meta:
        verbose_name = "CompleateTask"
        verbose_name_plural = "CompleatesTasks"
        



        
