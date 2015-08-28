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
	
	rodar: function (loto, progressCB) {
		var jogos = [];
		var combinacao = 0;
		var pcb = progressCB || function () { };
		combinatoria(loto.from, loto.choose, function (jogo) {
			combinacao++;
			pcb(combinacao, loto.combinations, jogos);
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
	
	combinacoesDeFechamento: function (loteria) {
		var numberOfGames = 1;
		if (loteria.from - loteria.choose >= loteria.choose - loteria.ensure) {
			numberOfGames = mathjs.combinations(loteria.choose, loteria.ensure) * mathjs.combinations(loteria.from - loteria.choose, loteria.choose - loteria.ensure);
		}
		return numberOfGames;
	},
	
	info: function (loteria) {
		// ver https://sites.google.com/site/lotusfacius/calculos-interessantes
		console.log('%s:', loteria.name);
		console.log('  Combinações de %s em %s: %s', loteria.choose, loteria.from, loteria.combinations);
		console.log('  Fechamento: %s', loteria.ensure);
		console.log('  Número de combinações com um volante de %s para acertar %s: %s', loteria.choose, loteria.ensure, loteria.combinationsOfEnsurement);
		console.log('  Probabilidade de acertar %s: 1 / %s', loteria.ensure, loteria.probability);
	}

};

module.exports = utils;