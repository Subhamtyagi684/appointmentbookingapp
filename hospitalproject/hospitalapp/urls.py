from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('register/', views.Register.as_view(), name='register'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/',views.Logout.as_view(), name='logout'),
    path('userapi/<str:pk>/',views.UserApi.as_view(),name='user-api'),
    path('checkavailability/<str:date>/<str:time>/', views.Checkavailability.as_view(), name='check-availability'),
    path('getpatientlist/<str:date>/', views.PatientList.as_view(), name='patient-list'),
    path('bookappointment/',views.BookAppointment.as_view(), name='book-appointment'),
    path('patientvisited/<str:pk>/',views.PatientVisited.as_view(), name='patient-visited'),
    path('patientappointment/<str:pk>/',views.PatientAppointment.as_view(), name='patient-appointment'),
    path('patientappointmentdetail/<str:pk>/',views.PatientAppointmentDetail.as_view(), name='patient-appointment-detail'),
    path('myappointments/<str:pk>/',views.MyAppointments.as_view(), name='my-appointment'),
]
