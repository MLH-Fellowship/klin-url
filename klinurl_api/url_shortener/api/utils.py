import random
import string

ALPHANUMERIC_CHARS = string.ascii_lowercase + string.digits + string.ascii_uppercase
STRING_LENGTH = 5

#function that generates a random string
def create_shortened_url(chars=ALPHANUMERIC_CHARS, length=STRING_LENGTH):
    return "".join(random.choice(chars) for _ in range(length))
