export interface Troca {
    id_troca: number,
    data: number, //so por enquanto depois é Date
    usuario_rank: number,
    //jogo
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    link_imagens: string;
    avaliacao: number;
    tags: string[];
}
