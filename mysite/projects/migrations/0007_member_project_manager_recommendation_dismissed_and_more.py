# Generated by Django 4.1.5 on 2023-03-05 16:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_alter_meeting_date_alter_project_current_deadline_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='project_manager',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='recommendation',
            name='dismissed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 12, 16, 22, 31, 399768, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 12, 16, 22, 31, 399768, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 12, 16, 22, 31, 399768, tzinfo=datetime.timezone.utc)),
        ),
    ]
