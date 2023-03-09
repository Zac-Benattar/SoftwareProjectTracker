# Generated by Django 4.1.5 on 2023-03-09 16:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0023_alter_meeting_date_alter_project_current_deadline_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='has_quit',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 34, 53, 798380, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 34, 53, 798380, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 34, 53, 798380, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 9, 16, 34, 53, 798380, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='latest_finish',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 34, 53, 798380, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 9, 17, 34, 53, 798380, tzinfo=datetime.timezone.utc)),
        ),
    ]
