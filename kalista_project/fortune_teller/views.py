from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.generic import ListView
from .models import Question
# Create your views here.
class Home(TemplateView):
    template_name = 'fortune_teller/home.html'

class Reading(TemplateView):
    template_name = 'fortune_teller/reading.html'
