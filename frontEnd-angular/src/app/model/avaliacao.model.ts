export interface Avaliacao {
    avaliacao_usuario: number,
    resenha: string,
    //jogo
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    link_imagens: string;
    avaliacao: number;
    tags: string[];
}