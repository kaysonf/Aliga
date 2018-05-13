from django.db import models

# Create your models here.
class Question(models.Model):
    question = models.CharField(max_length=264)

    def __str__(self):
        if len(self.question) > 20:
            return self.question[:20]
        return self.question
