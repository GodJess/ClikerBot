from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
import asyncio
from aiogram.utils import executor
import requests
import json

bot = Bot(token="7461337839:AAHL__uN0QuPpwLGW3IieAcYcmnp105xXr4")
dp = Dispatcher(bot)

API_URL = "http://127.0.0.1:8000/"

set = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text='Play🤙', url='https://t.me/hamster_kombat_Bot/start?startapp=kentId884907919')]
])

@dp.message_handler(commands=['start'])
async def main(message: types.Message):
    user_id = message.from_user.id
    user_name = message.from_user.username
    file = open('Blackoins.png', 'rb')
    await message.answer_photo(photo=file, reply_markup=set)
    headers = {
    "Content-Type": "application/json"
    }
    new_user = {
        "tg_id": user_id,
        "tg_username": user_name
    }
    
    requests.post(f'{API_URL}data/', data = json.dumps(new_user), headers=headers)
    
    
@dp.message_handler(commands=['help'])
async def help(message: types.Message):
    await message.reply(message)


if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)

