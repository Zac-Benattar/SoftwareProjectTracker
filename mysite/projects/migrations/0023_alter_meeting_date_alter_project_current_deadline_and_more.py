# Generated by Django 4.1.5 on 2023-03-09 16:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0022_task_completion_alter_meeting_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 31, 21, 659987, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 31, 21, 659069, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 31, 21, 659069, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 9, 16, 31, 21, 659069, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='completion',
            field=models.DecimalField(decimal_places=2, max_digits=3),
        ),
        migrations.AlterField(
            model_name='task',
            name='latest_finish',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 16, 16, 31, 21, 659987, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 9, 17, 31, 21, 659987, tzinfo=datetime.timezone.utc)),
        ),
    ]
