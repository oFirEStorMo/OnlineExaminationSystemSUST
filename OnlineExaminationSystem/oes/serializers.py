from rest_framework import serializers
from .models import *
from django.core.validators import FileExtensionValidator

# Serializes four fields of User model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        read_only_fields = ['id']
        fields = ['id', 'name', 'email', 'sub']

# Serializes every fields of ExamCohort model


class ExamCohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamCohort
        read_only_fields = ['id']
        fields = '__all__'

# Serializes every fields of Evaluator model


class EvaluatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluator
        fields = '__all__'

# Serializes every fields of Candidate model

class UserAndGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAndGroup
        fields = '__all__'


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        read_only_fields = ['id']
        fields = '__all__'

# Serializes every fields of Assessment model


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        read_only_fields = ['id']
        fields = '__all__'

# Serializes every fields of MCQ model


class MCQSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCQ
        read_only_fields = ['id']
        fields = '__all__'

# Serializes every fields of MCQChoice model


class MCQChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCQChoice
        read_only_fields = ['id']
        fields = '__all__'


class MicroVivaSerializer(serializers.ModelSerializer):
    # mvQuestionAudio = serializers.FileField(
    #     validators=[FileExtensionValidator(allowed_extensions=['wav', 'mp3', 'm4a', 'webm'])])
    # evaluatorsAnswerAudio = serializers.FileField(
    #     validators=[FileExtensionValidator(allowed_extensions=['wav', 'mp3', 'm4a', 'webm'])])

    class Meta:
        model = MicroViva
        read_only_fields = ['id']
        fields = '__all__'


class MCQSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCQSubmission
        read_only_fields = ['id']
        fields = '__all__'


class MicroVivaSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MicroVivaSubmission
        read_only_fields = ['id']
        fields = '__all__'


class QuestionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionGroup
        read_only_fields = ['id']
        fields = '__all__'
