from dataclasses import dataclass

@dataclass
class Permission:
    NONE = 0
    USER = 1
    DEV = 2
    ADMIN = 3

    MAP_TIPO = {
        'N': NONE,
        'U': USER,
        'D': DEV,
        'A': ADMIN
    }
