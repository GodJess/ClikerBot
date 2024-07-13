from typing import Any
from django.core.management.base import BaseCommand
from ..bot import dp
from aiogram.utils import executor

class Command(BaseCommand):
    help = "run bot"
    
    def handle(self, *args, **options):
        executor.start_polling(dp, skip_updates=True)