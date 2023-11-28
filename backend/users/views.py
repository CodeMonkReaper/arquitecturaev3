from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import User,Reservas
from .serializers import userSerializer,reservasSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


@csrf_exempt
def UserApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            users = User.objects.all()  # Cambiado a users para evitar confusión con la clase User
            user_serializer = userSerializer(users, many=True)  # Corregido User a users
            return JsonResponse(user_serializer.data, safe=False)
        else:
            user = User.objects.get(id=id)
            user_serializer = userSerializer(user)
            return JsonResponse(user_serializer.data, safe=False)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = userSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(id=id)
        user_serializer = userSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        user = User.objects.get(id=id)
        user.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)

@csrf_exempt
# reserva api
def reservas_api(request, id=0):
    if request.method == 'GET':
        if id == 0:
            reservas = Reservas.objects.all()
            reservas_serializer = reservasSerializer(reservas, many=True)
            return JsonResponse({'status': 'success', 'data': reservas_serializer.data}, safe=False)
        else:
            try:
                reserva = Reservas.objects.get(id=id)
                reserva_serializer = reservasSerializer(reserva)
                return JsonResponse({'status': 'success', 'data': reserva_serializer.data}, safe=False)
            except Reservas.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Reserva no encontrada'}, status=404)

    elif request.method == 'POST':
        reserva_data = JSONParser().parse(request)
        reserva_serializer = reservasSerializer(data=reserva_data)
        if reserva_serializer.is_valid():
            reserva_serializer.save()
            return JsonResponse({'status': 'success', 'message': 'Reserva añadida exitosamente'})
        return JsonResponse({'status': 'error', 'message': 'Error al agregar la reserva', 'errors': reserva_serializer.errors}, status=400)

    elif request.method == 'PUT':
        try:
            reserva = Reservas.objects.get(id=id)
            reserva_data = JSONParser().parse(request)
            reserva_serializer = reservasSerializer(reserva, data=reserva_data)
            if reserva_serializer.is_valid():
                reserva_serializer.save()
                return JsonResponse({'status': 'success', 'message': 'Reserva actualizada exitosamente'})
            return JsonResponse({'status': 'error', 'message': 'Error al actualizar la reserva', 'errors': reserva_serializer.errors}, status=400)
        except Reservas.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Reserva no encontrada'}, status=404)

    elif request.method == 'DELETE':
        try:
            reserva = Reservas.objects.get(id=id)
            reserva.delete()
            return JsonResponse({'status': 'success', 'message': 'Reserva eliminada exitosamente'})
        except Reservas.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Reserva no encontrada'}, status=404)# login view
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        
        # Autenticar al usuario
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            # Iniciar sesión
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'}, status=200)