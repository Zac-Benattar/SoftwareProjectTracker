# Generated by Django 4.1.5 on 2023-03-08 19:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0014_alter_meeting_date_alter_project_current_deadline_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 15, 19, 10, 49, 299025, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 15, 19, 10, 49, 297525, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 15, 19, 10, 49, 297525, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 8, 19, 10, 49, 297525, tzinfo=datetime.timezone.utc)),
        ),
    ]
