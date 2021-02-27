# Generated by Django 3.1 on 2021-02-25 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospitalapp', '0005_appointmenttime'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=255)),
                ('patient_email', models.EmailField(max_length=255, unique=True)),
                ('patient_mobile', models.CharField(max_length=10, unique=True)),
                ('patient_apt_date', models.DateField(max_length=255)),
                ('patient_apt_time', models.CharField(max_length=255)),
            ],
        ),
    ]
