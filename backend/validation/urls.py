from django.urls import path
from validation.views.linearity_view import LinearityAPIView
from validation.views.accuracy_view import AccuracyAPIView  # 👈 add this

urlpatterns = [
    path('linearity/', LinearityAPIView.as_view(), name='linearity'),
    path('accuracy/', AccuracyAPIView.as_view(), name='accuracy'),  # 👈 new route
]
