# Generated by Django 4.0.3 on 2022-03-11 19:49

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=155)),
            ],
        ),
        migrations.CreateModel(
            name='Movement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actionDescription', models.TextField(default='', null=True)),
                ('exerId', models.CharField(max_length=50, unique=True)),
                ('name', models.CharField(max_length=155)),
                ('thumbnailUrl', models.URLField(null=True)),
                ('versions', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), size=None)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.exercise')),
            ],
        ),
    ]
