import random
import string
from url_shortener.models import Author

ALPHANUMERIC_CHARS = string.ascii_lowercase + string.digits + string.ascii_uppercase
STRING_LENGTH = 5


#function that generates a random string
def create_shortened_url(
                            chars=ALPHANUMERIC_CHARS, 
                            length=STRING_LENGTH
                            ):
    return "".join(random.choice(chars) for _ in range(length))
    


def get_or_create_clientid(request, random_chars):  
    if 'client_id' in request.COOKIES:
        client_id = request.COOKIES['client_id']
        author, _ = Author.objects.get_or_create(client_id=client_id)
        return author
    else:
        return Author.objects.create(client_id=random_chars)


def set_cookie(request, response, client_id):
    if 'client_id' in request.COOKIES:
       print(request.COOKIES['client_id'])
    else:
        response.set_cookie('client_id', client_id, max_age=31556952)