from django.urls import path
from . import views

urlpatterns = [
    path('', views.squareteroids, name='game'),
    path('post', views.post_score, name='post_score')
]