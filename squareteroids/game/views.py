from http.client import HTTPResponse
from django.shortcuts import render
from django.http import Http404, HttpResponse

from game.models import Score
import json

# Create your views here.
def squareteroids(request, *args, **kwargs):
    template_name = "game/index.html"

    highest_score = Score.get_highest_score()

    context = {
        'highest_score': {
            'username': highest_score.username,
            'time': highest_score.time
        }
    }

    return render(request, template_name, context)

def post_score(request, *args, **kwargs):
    if request.method != "POST":
        raise Http404

    print(f"body: {request.body}")
    data = json.loads(request.body)

    new_score = Score.objects.create(
        time=data.get('time'),
        username=data.get('username')
    )

    print(f"New Score: {new_score}")

    print("POST: ")
    print(data)

    return HttpResponse("Success!")