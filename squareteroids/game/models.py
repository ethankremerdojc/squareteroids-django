from django.db import models

# Create your models here.

class Score(models.Model):
    time = models.CharField(max_length=255)
    username = models.CharField(max_length=255)

    def get_highest_score():
        all_scores = Score.objects.all()
        
        highest_score_tup = [0, 0, 0]
        highest_score = None

        for score in all_scores:
            time_args = score.time.split(":")
            score_tup = [int(time_args[0]), int(time_args[1]), int(time_args[2])]

            if score_tup[0] < highest_score_tup[0]:
                continue

            if score_tup[0] > highest_score_tup[0]:
                highest_score = score
                highest_score_tup = score_tup
                continue



            if score_tup[1] < highest_score_tup[1]:
                continue

            if score_tup[1] > highest_score_tup[1]:
                highest_score = score
                highest_score_tup = score_tup
                continue


            if score_tup[2] < highest_score_tup[2]:
                continue

            if score_tup[2] > highest_score_tup[2]:
                highest_score = score
                highest_score_tup = score_tup
                continue

        return highest_score