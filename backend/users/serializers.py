from rest_framework import serializers
from .models import User, Reservas

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('rut','nombre','email','password')


class reservasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservas
        fields = ('id','fecha','hora','medico','especialidad','motivoConsulta')