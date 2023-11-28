from django.db import models
from djongo import models
# Create your models here.
class User(models.Model):
    _id=models.ObjectIdField()
    rut=models.CharField(max_length=12)
    nombre=models.CharField(max_length=60)
    email=models.EmailField()
    password=models.CharField(max_length=60)
class Reservas(models.Model):
    id = models.ObjectIdField(primary_key=True)
    fecha = models.DateField()
    hora = models.TimeField()
    medico = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)
    motivoConsulta = models.TextField()

