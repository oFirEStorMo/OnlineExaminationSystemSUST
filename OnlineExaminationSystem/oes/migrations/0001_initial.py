# Generated by Django 4.0.6 on 2022-07-09 10:44

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('sub', models.CharField(max_length=255, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Assessment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assessmentName', models.CharField(max_length=225)),
                ('availableDateTime', models.DateTimeField()),
                ('dueDateTime', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='ExamCohort',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cohortName', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='MCQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MCQQuestion', models.CharField(max_length=5000)),
                ('evaluatorsAnswer', models.CharField(max_length=1000)),
                ('totalMarks', models.IntegerField()),
                ('totalTime', models.IntegerField()),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.assessment')),
            ],
        ),
        migrations.CreateModel(
            name='MCQChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice', models.CharField(max_length=1000)),
                ('mcq', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.mcq')),
            ],
        ),
        migrations.CreateModel(
            name='MicroViva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mvQuestionAudio', models.CharField(max_length=1000)),
                ('mvQuestionText', models.CharField(max_length=5000)),
                ('evaluatorsAnswerAudio', models.CharField(max_length=1000)),
                ('evaluatorsAnswerTEXT', models.CharField(max_length=255)),
                ('totalMarks', models.IntegerField()),
                ('totalTime', models.IntegerField()),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.assessment')),
            ],
        ),
        migrations.CreateModel(
            name='MicroVivaSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submittedAnswerAudio', models.CharField(max_length=1000)),
                ('submittedAnswerText', models.CharField(max_length=255)),
                ('obtainedMarks', models.IntegerField()),
                ('camdidate', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.candidate')),
                ('mv', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.microviva')),
            ],
        ),
        migrations.CreateModel(
            name='MCQSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('obtainedMarks', models.IntegerField()),
                ('camdidate', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.candidate')),
                ('choice', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.mcqchoice')),
                ('mcq', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.mcq')),
            ],
        ),
        migrations.CreateModel(
            name='Evaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('examCohort', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='oes.examcohort')),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='candidate',
            name='examCohort',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.examcohort'),
        ),
        migrations.AddField(
            model_name='candidate',
            name='userId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='assessment',
            name='examCohort',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='oes.examcohort'),
        ),
    ]
