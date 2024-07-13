from django.contrib import admin
from .models import Users, Tasks, CompleateTasks

admin.site.register(Users)
admin.site.register(Tasks)
admin.site.register(CompleateTasks)

from django.contrib.sessions.models import Session

# Register your models here.
