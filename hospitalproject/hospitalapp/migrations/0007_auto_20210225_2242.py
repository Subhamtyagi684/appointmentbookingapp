# Generated by Django 3.1 on 2021-02-25 17:12

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('hospitalapp', '0006_appointment'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AppointmentTime',
        ),
        migrations.AddField(
            model_name='appointment',
            name='booked_on',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 2, 25, 17, 12, 9, 838841, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
