from django.urls import path
from django.contrib import admin
from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', UserApi, name='pago-list'),
    path('user/<int:Objectid>/', UserApi, name='pago-detail'),
    path('nuevouser/', UserApi, name='nuevoPago'),
    path('reserva/', reservas_api, name='reserva-list'),  
    path('reserva/<int:id>/', reservas_api, name='reserva-detail'),  
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
]