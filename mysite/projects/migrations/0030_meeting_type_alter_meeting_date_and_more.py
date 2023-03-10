# Generated by Django 4.1.5 on 2023-03-10 18:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0029_alter_meeting_date_alter_project_current_deadline_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='type',
            field=models.CharField(default='General', max_length=30),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 12, 52, 886723, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 12, 52, 885223, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 12, 52, 885223, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 10, 18, 12, 52, 885223, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='latest_finish',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 12, 52, 887223, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 10, 19, 12, 52, 887223, tzinfo=datetime.timezone.utc)),
        ),
    ]
