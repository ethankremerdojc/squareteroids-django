from http.client import HTTPResponse
from django.shortcuts import render
from django.http import Http404, HttpResponse

from game.models import Score, Difficulty
import json

# Create your views here.
def squareteroids(request, *args, **kwargs):
    template_name = "game/index.html"

    context = {}

    all_difficulties = Difficulty.objects.all()

    highest_scores = {}

    for d in all_difficulties:
        highest_score = Score.get_highest_score(difficulty=d)

        if not highest_score:
            highest_score = {
                'username': 'anonymous',
                'time': '00:00:00'
            }
        else:
            highest_score = {
                'username': highest_score.username,
                'time': highest_score.time
            }

        highest_scores[d.name] = highest_score

    context['highest_scores'] = highest_scores
    context['difficulties'] = sorted([ dif.to_dict() for dif in Difficulty.objects.all() ], key= lambda dif: dif['starting_enemy_speed'])

    return render(request, template_name, context)

def post_score(request, *args, **kwargs):
    if request.method != "POST":
        raise Http404

    data = json.loads(request.body)
    time_tup = [int(item) for item in data.get('time').split(":")]
    difficulty = Difficulty.objects.get(name=data.get('difficulty'))

    new_score = Score.objects.create(
        username=data.get('username'),
        enemy_speed=data.get('enemy_speed'),
        enemy_spawn_factor=data.get('enemy_spawn_factor'),
        hours=time_tup[0],
        minutes=time_tup[1],
        seconds=time_tup[2],
        difficulty=difficulty
    )

    print(f"New Score: {new_score}")
    return HttpResponse("Success!")