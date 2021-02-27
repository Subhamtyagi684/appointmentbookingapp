from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import UserSerializer, LoginSerializer ,AppointmentSerializer
from rest_framework.status import *
from rest_framework.response import Response
from django.contrib.auth import authenticate,login,logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .models import User, Appointment
from rest_framework.serializers import ValidationError
from datetime import datetime
import calendar
# Create your views here.

class Register(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('User created successfully',status=HTTP_200_OK)


class Login(APIView):
    serializer_class = LoginSerializer

    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token':token.key,'user_id':user.id},status=HTTP_200_OK)


class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        logout(request)
        return Response('User logged out successfully',status=HTTP_200_OK)


class UserApi(APIView):

    def get(self, request,pk):
        try:
            obj = User.objects.get(id=pk)
        except:
            return Response('User not found',status=HTTP_400_BAD_REQUEST)
        return Response({'userid':obj.id,'full_name':obj.full_name,'role':obj.role,'email':obj.email,'mobile':obj.mobile},status=HTTP_200_OK)


class Checkavailability(APIView):

    def get(self, request,date, time):
        #2 refers to error, 1 refers to you can book appointment, 0 refers to not available
        try:
            new_date= datetime.strptime(date,'%Y-%m-%d').date()
            today = datetime.today()
            if (new_date.year==today.year) and (new_date.month>=today.month):
                no_of_days = [i for i in range(1,int(calendar.monthrange(2012,new_date.month)[1]))]
                if (new_date.month==today.month)  and (new_date.day>=today.day):
                    pass
                elif (new_date.month>today.month)  and (new_date.day in no_of_days) :
                    pass
                else:
                    return Response({'available':2},status=HTTP_400_BAD_REQUEST)
            else:
                return Response({'available':2},status=HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'available':2},status=HTTP_400_BAD_REQUEST)
        except:
            return Response({'available':2},status=HTTP_400_BAD_REQUEST)
        try:
            obj = Appointment.objects.get(patient_apt_date=new_date,patient_apt_time=time)
        except:
            return Response({'available':1},status=HTTP_200_OK)
        return Response({'available':0},status=HTTP_200_OK)


class BookAppointment(APIView):

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'book_id':serializer.validated_data},status=HTTP_200_OK)

        
class PatientAppointment(APIView):

    def get(self, request, pk):
        
        try:
            obj = User.objects.get(id=pk)
            apt_obj = Appointment.objects.filter(patient_email=obj.email).order_by('booked_on').last()
        except:
            return Response('User not found',status=HTTP_400_BAD_REQUEST)
        if apt_obj:
            return Response({
                    'patient_name':apt_obj.patient_name,
                    'patient_email':apt_obj.patient_email,
                    'patient_mobile':apt_obj.patient_mobile,
                    'patient_apt_date':apt_obj.patient_apt_date,
                    'patient_apt_time':apt_obj.patient_apt_time
                },status=HTTP_200_OK)
        return Response('User not found',status=HTTP_400_BAD_REQUEST)   

    def post(self,request,pk):
        try:
            obj = User.objects.get(id=pk)
            apt_obj = Appointment.objects.filter(patient_email=obj.email).order_by('booked_on').last()
        except:
            return Response('User not found',status=HTTP_400_BAD_REQUEST)
        if apt_obj:
            apt_obj.is_confirmed=True
            apt_obj.save()
            return Response({'confirmed':apt_obj.is_confirmed},status=HTTP_200_OK)
        return Response({'confirmed':0},status=HTTP_400_BAD_REQUEST)
        
        
class MyAppointments(APIView):

    def get(self,request,pk):
        try:
            obj = User.objects.get(id=pk)
            apt_obj = Appointment.objects.filter(patient_email=obj.email).order_by('-booked_on')
            serializer = AppointmentSerializer(apt_obj,many=True)
        except:
            return Response('User not found',status=HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=HTTP_200_OK)
        

class PatientAppointmentDetail(APIView):

    def get(self, request, pk):
        try:
            obj = Appointment.objects.get(id=pk)
            serializer = AppointmentSerializer(obj)
        except:
            return Response('User not found',status=HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=HTTP_200_OK)


class PatientList(APIView):

    def get(self,request, date):

        try:
            new_date= datetime.strptime(date,'%Y-%m-%d').date()
            today = datetime.today()
        except ValueError:
            return Response('Please enter valid date',status=HTTP_400_BAD_REQUEST)
        except:
            return Response('Please enter valid date',status=HTTP_400_BAD_REQUEST)
        try:
            obj = Appointment.objects.filter(patient_apt_date=date,is_confirmed=True)
            serializer = AppointmentSerializer(obj,many=True)
        except:
            return Response('No patients available',status=HTTP_400_BAD_REQUEST)
        return Response(serializer.data,status=HTTP_200_OK)


class PatientVisited(APIView):

    def post(self, request,pk):
        try:
            apt_obj = Appointment.objects.get(pk=pk)
        except:
            return Response('User not found',status=HTTP_400_BAD_REQUEST)
        if apt_obj:
            apt_obj.visited=True
            apt_obj.save()
            return Response({'confirmed':apt_obj.visited},status=HTTP_200_OK)
        return Response({'confirmed':0},status=HTTP_400_BAD_REQUEST)
