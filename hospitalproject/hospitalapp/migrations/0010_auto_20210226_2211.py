# Generated by Django 3.1 on 2021-02-26 16:41

import django.core.validators
from django.db import migrations, models
import hospitalapp.validation


class Migration(migrations.Migration):

    dependencies = [
        ('hospitalapp', '0009_auto_20210226_1402'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='visited',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='patient_email',
            field=models.EmailField(max_length=255, validators=[django.core.validators.EmailValidator()]),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='patient_mobile',
            field=models.CharField(max_length=10, validators=[hospitalapp.validation.validate_mobile]),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='patient_name',
            field=models.CharField(max_length=255, validators=[hospitalapp.validation.validate_name]),
        ),
    ]
