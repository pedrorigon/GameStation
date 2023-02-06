import string
import random
import hashlib

# Caracteres que podem ser usados em uma chave
CHAVE_LETTERS: str = string.digits + string.ascii_letters

def gen_key() -> str:
    return ''.join(random.choices(CHAVE_LETTERS, k=64))

def md5sum(text: str) -> str:
    return str(hashlib.md5(text.encode('utf-8')).hexdigest())
