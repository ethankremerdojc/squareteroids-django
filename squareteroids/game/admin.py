from django.contrib import admin
from game.models import Score, Difficulty

class ScoreAdmin(admin.ModelAdmin):
    list_display = ('username', 'timestamp', 'difficulty', 'time')
    readonly_fields = ('timestamp', )
    fields = (
        ('username'), 
        ('hours', 'minutes', 'seconds'), 
        'difficulty', 
        ('timestamp')
    )

admin.site.register(Score, ScoreAdmin)
admin.site.register(Difficulty)