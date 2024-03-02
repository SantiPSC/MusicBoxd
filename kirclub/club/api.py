from ninja import NinjaAPI
from .models import Post
from ninja.security import django_auth


api = NinjaAPI()


@api.post("/vote/{post_id}", auth=django_auth)
def vote(request, post_id: int):
    post = Post.objects.get(id=post_id)
    post.likes_count += 1
    post.save()
    return post.likes_count
