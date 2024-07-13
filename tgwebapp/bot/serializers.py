from rest_framework import serializers
from .models import Users, Tasks, CompleateTasks

class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        
class TaskSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields ="__all__"

class CompSerializers(serializers.ModelSerializer):
    class Meta:
        model = CompleateTasks
        fields ="__all__"