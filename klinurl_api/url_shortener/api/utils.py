import random
import string

ALPHANUMERIC_CHARS = string.ascii_lowercase + string.digits
STRING_LENGTH = 5

#function that generates a random string
def generate_random_string(chars=ALPHANUMERIC_CHARS, length=STRING_LENGTH):
    return "".join(random.choice(chars) for _ in range(length))

def create_shortened_url():
    random_char = generate_random_string()
    BASE_URL = "https://klinurl.herokuapp.com/"
    return BASE_URL + random_char
