# Generated by Django 2.0.2 on 2018-05-12 03:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fortune_teller', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Questions',
            new_name='Question',
        ),
    ]
