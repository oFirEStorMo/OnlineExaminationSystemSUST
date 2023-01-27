from unicodedata import name


from zoneinfo import available_timezones


from django.db import models


from django.contrib.auth.models import AbstractUser


from django.core.exceptions import ValidationError

from django.utils.translation import gettext_lazy as _


def validate_mcq_time(value):

    if value < 5 or value > 3600:

        raise ValidationError(

            _('time should be in between 5 seconds and 1 hour'),

            params={'value': value},
        )


def validate_marks(value):

    if value < 0:

        raise ValidationError(

            _('Marks should be a non-negative integer'),

            params={'value': value},
        )

# Create your models here.


# Stores Google Users data


class User(AbstractUser):

    name = models.CharField(max_length=255)

    email = models.CharField(max_length=255, unique=True)

    sub = models.CharField(max_length=255, unique=True)

    username = models.CharField(max_length=255, unique=True, null=True)

    USERNAME_FIELD = 'sub'

    REQUIRED_FIELDS = ['username']


# Stores data of an Exam Cohort


class ExamCohort(models.Model):

    cohortName = models.CharField(max_length=32)


# Stores data of an Evaluator in an Exam Cohort


class Evaluator(models.Model):

    user = models.ForeignKey(User, on_delete=models.PROTECT)

    examCohort = models.OneToOneField(

        ExamCohort, on_delete=models.PROTECT)


# Stores data of a Candidate in an Exam Cohort


class Candidate(models.Model):

    user = models.ForeignKey(User, on_delete=models.PROTECT)

    examCohort = models.ForeignKey(ExamCohort, on_delete=models.PROTECT)


# Stores data of an Assessment


class Assessment(models.Model):

    assessmentName = models.CharField(max_length=225)

    examCohort = models.ForeignKey(ExamCohort, on_delete=models.PROTECT)

    availableDateTime = models.DateTimeField()

    dueDateTime = models.DateTimeField()

    isPublished = models.BooleanField(default=False)


class QuestionGroup(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

# Stores data of a MCQ question within an Assessment


class MCQ(models.Model):

    questionGroup = models.ForeignKey(QuestionGroup, on_delete=models.CASCADE)

    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)

    MCQQuestion = models.CharField(max_length=1000)

    evaluatorsAnswer = models.CharField(max_length=255)

    totalMarks = models.IntegerField(validators=[validate_marks])

    totalTime = models.IntegerField(validators=[validate_mcq_time])

# Stores data of a MicroViva question within an Assessment


class MicroViva(models.Model):

    questionGroup = models.ForeignKey(QuestionGroup, on_delete=models.CASCADE)

    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)

    mvQuestionAudio = models.FileField(upload_to="MicroVivaQuestion/%Y/%m/%d")

    mvQuestionText = models.CharField(max_length=5000, null=True)

    evaluatorsAnswerAudio = models.FileField(

        upload_to="MicroVivaAnswer/%Y/%m/%d")

    evaluatorsAnswerTEXT = models.CharField(max_length=255, null=True)

    totalMarks = models.IntegerField(validators=[validate_marks])

    totalTime = models.IntegerField()


# Stores data of the choices in an MCQ


class MCQChoice(models.Model):

    mcq = models.ForeignKey(MCQ, on_delete=models.CASCADE)

    choice = models.CharField(max_length=255)


# Stores data of a MCQ question's submission


class MCQSubmission(models.Model):

    mcq = models.ForeignKey(MCQ, on_delete=models.CASCADE)

    candidate = models.ForeignKey(Candidate, on_delete=models.PROTECT)

    choice = models.ForeignKey(MCQChoice, on_delete=models.PROTECT, null=True)

    obtainedMarks = models.IntegerField(default=0)

    submissionStartTime = models.DateTimeField()

    submissionEndTime = models.DateTimeField()

    isSubmitted = models.BooleanField(default=False)


# Stores data of a Micro-Viva question's submission


class MicroVivaSubmission(models.Model):

    mv = models.ForeignKey(MicroViva, on_delete=models.CASCADE)

    candidate = models.ForeignKey(Candidate, on_delete=models.PROTECT)

    submittedAnswerAudio = models.FileField(

        upload_to="MicroVivaSubmission/%Y/%m/%d", null=True)

    submittedAnswerText = models.CharField(max_length=255, null=True)

    obtainedMarks = models.IntegerField(default=0)

    submissionStartTime = models.DateTimeField()

    submissionEndTime = models.DateTimeField()

    isSubmitted = models.BooleanField(default=False)
