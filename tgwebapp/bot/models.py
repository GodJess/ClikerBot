from django.db import models

# Create your models here.
class Users(models.Model):
    tg_user_id = models.CharField("tg id", max_length=100)
    tg_user_name = models.CharField("tg name", max_length=100)
    count= models.CharField("count", max_length=100)
    recover=models.CharField("recovery", max_length=100)
    tab=models.CharField("profit per tab", max_length=100)
    max_storage = models.CharField("max storage", max_length=100)
    cliker = models.CharField("autocliker", max_length= 100,default=0)
    
    def __str__(self):
        return print(self.tg_user_name, self.tg_user_id)
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"