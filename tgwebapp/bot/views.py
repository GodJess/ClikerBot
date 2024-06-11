from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# Create your views here.
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
            "count": 930
        }
        
        return Response(myData)