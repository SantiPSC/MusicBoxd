from ninja import NinjaAPI
from .models import Post

api = NinjaAPI()


@api.post("/vote/{post_id}")
def vote(request, post_id: int):
    post = Post.objects.get(id=post_id)
    post.likes_count += 1
    post.save()
    return post.likes_count
