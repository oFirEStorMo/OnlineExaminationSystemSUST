# Generated by Django 4.1.5 on 2023-01-27 08:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('oes', '0012_questiongroup_mcq_questiongroup_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='questiongroup',
            name='assessment',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='oes.assessment'),
            preserve_default=False,
        ),
    ]
