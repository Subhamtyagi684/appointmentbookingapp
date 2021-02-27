from rest_framework import serializers
from .models import User, Appointment
from .validation import *
from django.core.validators import validate_email
from rest_framework.exceptions import APIException
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ValidationError
from django.contrib.auth import authenticate

class UserSerializer(serializers.Serializer):
    
    full_name = serializers.CharField(write_only=True,validators=[validate_name],required=True)
    email = serializers.CharField(write_only=True,validators=[validate_email,UniqueValidator(queryset=User.objects.all())],required=True)
    mobile = serializers.CharField(write_only=True,validators=[validate_mobile,UniqueValidator(queryset=User.objects.all())],required=True)
    role = serializers.CharField(write_only=True,required=True)
    password = serializers.CharField(write_only=True,validators=[validate_password],required=True)

    def save(self):
        full_name = self.validated_data.get('full_name')
        email = self.validated_data.get('email')
        mobile = self.validated_data.get('mobile')
        password = self.validated_data.get('password')
        role = self.validated_data.get('role')

        obj = User.objects.create(full_name=full_name,email=email,mobile=mobile,role=role)
        obj.set_password(password)
        obj.save()
        return obj



class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(write_only=True,required=True)
    password = serializers.CharField(write_only=True,required=True)

    def validate(self,data):
        email = data.get('email')
        password = data.get('password')
        if email and password:
            user = authenticate(email=email,password=password)
            if user is not None:
                return {'user':user}
            raise ValidationError('User not found')
        else:
            raise ValidationError('Both the fields are required')




class AppointmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Appointment
        fields = ('pk','patient_name','patient_email','patient_mobile','patient_apt_date','patient_apt_time','is_confirmed','visited')