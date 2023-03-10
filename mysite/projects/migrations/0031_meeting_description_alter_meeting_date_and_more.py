# Generated by Django 4.1.5 on 2023-03-10 18:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0030_meeting_type_alter_meeting_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='description',
            field=models.CharField(blank=True, max_length=3000),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 18, 39, 596513, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='current_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 18, 39, 594512, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='initial_deadline',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 18, 39, 594512, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 10, 18, 18, 39, 594512, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='latest_finish',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 17, 18, 18, 39, 596513, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='task',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 10, 19, 18, 39, 596513, tzinfo=datetime.timezone.utc)),
        ),
    ]
