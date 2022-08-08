from django.db import models

class Difficulty(models.Model):
    starting_enemy_speed = models.FloatField()
    starting_enemy_spawn_factor = models.FloatField()

    enemy_speed_incremental_factor = models.FloatField()
    enemy_spawn_incremental_factor = models.FloatField()

    name = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"{self.name}"

    def to_dict(self) -> str:
        return {
            'name': self.name,
            'starting_enemy_speed': self.starting_enemy_speed,
            'starting_enemy_spawn_factor': self.starting_enemy_spawn_factor,
            'enemy_speed_incremental_factor': self.enemy_speed_incremental_factor,
            'enemy_spawn_incremental_factor': self.enemy_spawn_incremental_factor,
        }

class Score(models.Model):
    seconds = models.IntegerField(null=True)
    minutes = models.IntegerField(null=True)
    hours = models.IntegerField(null=True)

    enemy_speed = models.FloatField(null=True)
    enemy_spawn_factor = models.FloatField(null=True)

    username = models.CharField(max_length=255)
    timestamp = models.DateTimeField(null=True, auto_now_add=True)

    difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.username} - {self.time}"

    @property
    def time(self):
        def get_0_padded_str(amount):
            if amount < 10:
                return f"0{amount}"
            return str(amount)
            
        return f"{get_0_padded_str(self.hours)}:{get_0_padded_str(self.minutes)}:{get_0_padded_str(self.seconds)}"

    def get_highest_score(difficulty):

        # can just be changed where we concatenate all 3 values into one integer and sort by that
        all_scores = Score.objects.filter(difficulty=difficulty)

        if not all_scores:
            return None
        
        hour_sorted = all_scores.order_by('-hours')
        highest_hour = hour_sorted.first().hours
        top_hours = all_scores.filter(hours=highest_hour)

        #use to filter mins
        minute_sorted = top_hours.order_by('-minutes')
        highest_minute = minute_sorted.first().minutes
        top_minutes = top_hours.filter(minutes=highest_minute)

        #use to filter seconds
        second_sorted = top_minutes.order_by('-seconds')
        return second_sorted.first()