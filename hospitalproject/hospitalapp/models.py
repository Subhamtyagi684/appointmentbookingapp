from django.db import models
from .validation import validate_password

# Create your models here.
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from .validation import *
from django.core.validators import validate_email,validate_integer
import random
from datetime import date,datetime
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token



class MyUserManager(BaseUserManager):
    def create_user(self, full_name, email, mobile, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not full_name:
            raise ValueError('Users must provide a name')
        if not mobile:
            raise ValueError('Users must have a mobile number')

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
            mobile=mobile
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, mobile, full_name, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email=email,
            full_name=full_name,
            mobile=mobile,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        validators=[validate_email]
    )
    full_name = models.CharField(max_length=150, validators=[validate_name])
    mobile=models.CharField(max_length=10, validators=[validate_mobile],unique=True)
    is_active = models.BooleanField(default=True)
    role_choices = (('staff','staff'),('patient','patient'))
    role = models.CharField(choices=role_choices,max_length=50,null=False,blank=False)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name','mobile']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Otpgenerate(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    otp = models.CharField(default=None,max_length=50)



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)



class Appointment(models.Model):
    patient_name = models.CharField(max_length=255,null=False,blank=False,validators=[validate_name])
    patient_email= models.EmailField(max_length=255,null=False,blank=False,validators=[validate_email])
    patient_mobile = models.CharField(max_length=10,null=False,blank=False,validators=[validate_mobile])
    patient_apt_date = models.DateField(max_length=255,null=False,blank=False)
    patient_apt_time = models.CharField(max_length=255,null=False,blank=False)
    is_confirmed = models.BooleanField(default=False)
    visited = models.BooleanField(default=False)
    booked_on = models.DateTimeField(auto_now_add=True)
    
    
    
    
