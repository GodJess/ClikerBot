from celery import Celery
from django.conf import settings
import os
from django.db.models import F,Q
# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tgwebapp.settings')

app = Celery('project')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True)

def delete_tasks(self):
    from bot.models import CompleateTasks
    CompleateTasks.objects.filter(numberOfTask=1).delete()



@app.task(bind=True)
def increment_user_counter(self):
    from bot.models import Users
    users = Users.objects.all()
    count = 0
    for el in users:
        if int(el.storage) <= int(el.max_storage):
            count+= 1
            el.storage = int(el.storage) + int(el.recover)
            el.save()
            
    print(f"Обновленно записей {count}")

@app.task(bind=True)
def autocliker(self):
    from bot.models import Users
    users = Users.objects.all()
    count = 0
    for el in users:
        if el.cliker_on == True:
            if int(el.cliker_box) <= int(el.cliker_box_max):
                count+= 1
                el.cliker_box = int(el.cliker_box) + int(el.recover)
                el.save()
    print(f"Обновленно записей {count}")



app.conf.beat_schedule = {
    'delete-tasks-every-24-hours': {
        'task': 'tgwebapp.celery.delete_tasks',
        'schedule': 86400.0,  # 24 hours in seconds
    },
    'increment-user-counter-every-seconds': {
        'task': 'tgwebapp.celery.increment_user_counter',
        'schedule': 1.0,  # 24 hours in seconds
    },
    'set-cliker':{
        'task': 'tgwebapp.celery.autocliker',
        'schedule': 2.0,
    },
}

