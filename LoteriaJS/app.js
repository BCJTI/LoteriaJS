'use strict';

var LotoFacil = require('./LotoFacil.js');
var mathjs = require('mathjs');
var utils = require('./Utils.js');

var qtdFechar = parseInt(process.argv[2] || '1');
var soInfo = process.argv[3] === '--info-only';

try {
    var loto = new LotoFacil(qtdFechar);
    utils.validate(loto);

    loto.info();

    if (!soInfo) {
        var resultado = loto.rodar();

        console.log(resultado);

        console.log('Foram gerados %s jogos para fechar %s na Lotofácil', resultado.length, qtdFechar);
    }
} catch (err) {
    console.log(err);
}

