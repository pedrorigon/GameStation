export interface GameInLibrary {
    id_chave: number,
    avaliacao_usuario: number,
    disponibilidade: string,
    //jogo
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    link_imagens: string;
    avaliacao: number;
    tags: string[];
}