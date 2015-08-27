'use strict';

function combinatoria(from, choose, callback) {
    var i, j = 1; //< Variaveis i e j são iteradores para acesso a itens da matriz
    var tmp; //< Variável para substituição de um dos valores da combinação atual para o próximo valor da permutação
    var combinacao = new Array(choose + 3); //< Combinação atual com 3 variaveis a mais para controle de execução
    
    // inicia combinacao atual com os valores iniciais de permutação (1,2,3,4,5,6 para amega sena por exemplo)
    for (i = 1; i <= choose; i++) {
        combinacao[i] = i;
    }
    combinacao[choose + 1] = from + 1;
    combinacao[choose + 2] = 0;
    j = choose;
    
    for (;;) {
        callback(combinacao, choose);
        
        if (j > 0) {
            // troca o número da combinação de traz para frente adicionando 1 ao valor atual
            tmp = j + 1;
        } else {
            // Quando chega ao primeiro valor, altera ele até que ele "cole" no segundo ou reseta o J para a próxima posição a ser alterada (que pode ser a última da combinação)
            if (combinacao[1] + 1 < combinacao[2]) {
                combinacao[1] += 1;
                continue;
            }
            
            j = 2;
            
            for (;;) {
                combinacao[j - 1] = j - 1;
                tmp = combinacao[j] + 1;
                if (tmp == combinacao[j + 1]) {
                    j++;
                } else {
                    break;
                }
            }
            
            // caso o próximo indice a ser alterado ultrapace a quantidade de itens a escolher, acabaram-se as permutações possíveis.
            if (j > choose)
                break;

        }
        combinacao[j] = tmp;
        j--;
    }
}

function combinacoes(from, choose, callback) {
    combinatoria(from, choose, function (c, choose) {
        callback(c.slice(1, choose + 1));
    });
}

module.exports = combinacoes;