from django.urls import path
from .views import *

urlpatterns = [
    # Path for Login View
    path('login', LoginView.as_view()),
    # Path for User View
    path('user', UserView.as_view()),
    # Path for Logout View
    path('logout', LogoutView.as_view()),
    # Path for Evaluator's Dashboard View
    path('dashboard/evaluator', EvaluatorDashboardView.as_view()),
    # Path for Candidate's Dashboard View
    path('dashboard/candidate', CandidateDashboardView.as_view()),
    # Path for Create Exam Cohort View
    path('dashboard/create', CreateExamCohortView.as_view()),
    # Path for Add Candidate View
    path('cohort/add', AddCandidateView.as_view()),
    path('cohort/get', GetSpreadsheetView.as_view()),
    path('cohort/search', SearchUserView.as_view()),
    path('cohort/candidate', CandidateView.as_view()),
    path('assessment/create', CreateAssessmentView.as_view()),
    # Path for Assessment View
    path('assessment', AssessmentView.as_view()),
    path('assessment/candidate', AssessmentCandidateView.as_view()),
    path('assessment/get', SingleAssessmentView.as_view()),
    path('assessment/candidate/get', SingleAssessmentCandidateView.as_view()),
    path('microviva/create', CreateMicroVivaView.as_view()),
    path('mcq/create', CreateMCQView.as_view()),
    path('assessment/publish', PublishAssessmentView.as_view()),
    path('assessment/mcq/delete', DeleteMCQView.as_view()),
    path('assessment/mv/delete', DeleteMVView.as_view()),
    path('assessment/get/question/all', GetQuestionListView.as_view()),
    path('assessment/get/question', GetQuestionView.as_view()),
    path('assessment/get/mcq/choice', GetMCQChoiceView.as_view()),
    path('assessment/get/mv/question', GetMicroVivaQuestionView.as_view()),
    path('assessment/start/mcq', StartMCQSubmissionView.as_view()),
    path('assessment/start/mv', StartMVSubmissionView.as_view()),
    path('assessment/submit/mcq', SubmitMCQSubmissionView.as_view()),
    path('assessment/submit/mv', SubmitMicroMivaSubmissionView.as_view()),
    path('assessment/get/marks', GetMarksView.as_view()),
    path('submission', GetSubmissionView.as_view()),
    path('audio', GetAudioFileView.as_view()),
    path('update/mcq', UpdateMCQMarksView.as_view()),
    path('update/mv', UpdateMvMarksView.as_view())
]
