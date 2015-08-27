'use strict';

var mathjs = require('mathjs');
var combinatoria = require('./Combinatoria.js');

var utils = {
    quantosBatem: function (arr1, arr2) {
        var ret = 0;
        for (var i1 = 0; i1 < arr1.length; i1++) {
            var e1 = arr1[i1];
            for (var i2 = 0; i2 < arr2.length; i2++) {
                var e2 = arr2[i2];
                if (e1 === e2) ret++;
            }
        }
        return ret;
    },
    
    repetiu: function (arr1, arr2, fecha) {
        var bateu = utils.quantosBatem(arr1, arr2);
        return bateu >= fecha;
    },
    
    validate: function (loto) {
        if (loto.ensure > loto.choose || loto.ensure < 1) {
            throw 'É possivel fechar apenas entre 1 e ' + loto.choose + ' números na ' + loto.name + '... (' + loto.ensure + ')';
        }
    },
    
    rodar: function (loto) {
        var jogos = [];
        combinatoria(loto.from, loto.choose, function (jogo) {
            for (var index = 0; index < jogos.length; index++) {
                var element = jogos[index];
                if (utils.repetiu(element, jogo, loto.ensure)) {
                    return;
                }
            }
            jogos.push(jogo);
        });
        return jogos;
    },

    info: function (loteria) {
        // ver https://sites.google.com/site/lotusfacius/calculos-interessantes
        var combinations = mathjs.combinations(loteria.from, loteria.choose);
        var numberOfGames = 1;
        if (loteria.from - loteria.choose >= loteria.choose - loteria.ensure) {
            numberOfGames = mathjs.combinations(loteria.choose, loteria.ensure) * mathjs.combinations(loteria.from - loteria.choose, loteria.choose - loteria.ensure);
        }
        var probability = combinations / numberOfGames;
        console.log('%s:', loteria.name);
        console.log('  Combinações de %s em %s: %s', loteria.choose, loteria.from, mathjs.combinations(loteria.from, loteria.choose));
        console.log('  Fechamento: %s', loteria.ensure);
        //console.log('  Probabilidade de acerto: %s');
        console.log('  Número de jogos: %s', numberOfGames);
        console.log('  Probabilidade de ganhar (acertar os 15 números): 1 / %s', probability);
    }

};

module.exports = utils;