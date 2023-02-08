from dataclasses import dataclass

@dataclass
class Permission:
    USUARIO = 0
    DESENVOLVEDOR = 1
    GERENCIADOR = 2

    MAP_TIPO = {
        'U': USUARIO,
        'D': DESENVOLVEDOR,
        'G': GERENCIADOR
    }
