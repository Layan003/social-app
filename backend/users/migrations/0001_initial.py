# Generated by Django 5.1.3 on 2024-11-14 22:20

import django.db.models.deletion
import sorl.thumbnail.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_img', sorl.thumbnail.fields.ImageField(blank=True, default='profile_images/default_img.jpg', null=True, upload_to='profile_images/')),
                ('name', models.CharField(blank=True, max_length=30)),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]