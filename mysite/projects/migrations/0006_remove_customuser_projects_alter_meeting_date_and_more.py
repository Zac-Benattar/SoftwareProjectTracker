# Generated by Django 4.1.5 on 2023-03-07 17:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_alter_meeting_date_alter_project_current_deadline_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='projects',
        ),
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 14, 17, 16, 47, 580031, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 14, 17, 16, 47, 577053, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 14, 17, 16, 47, 577053, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 7, 17, 16, 47, 577053, tzinfo=datetime.timezone.utc)),
        ),
    ]
