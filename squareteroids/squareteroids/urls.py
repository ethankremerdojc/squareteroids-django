from django.contrib import admin
from django.urls import include, path
from game import views as gviews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('game.urls'))
]
