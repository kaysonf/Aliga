from django.urls import path
from . import views
app_name = 'fortune_teller'

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('reading', views.Reading.as_view(), name='reading'),

]
