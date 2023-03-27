export interface Oferta {
    id_oferta: number,
    data: number, //so por enquanto depois é Date
    usuario_rank: number,
    preco_oferta: number,
    //jogo
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    link_imagens: string;
    avaliacao: number;
    tags: string[];
}
