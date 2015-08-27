'use strict';

var utils = require('./Utils.js');

function LotoFacil(ensure) {
    this.name = 'Mega Sena';
    this.from = 60;
    this.choose = 6;
    this.ensure = ensure || 1;
};

LotoFacil.prototype.rodar = function () {
    return utils.rodar(this);
};

LotoFacil.prototype.info = function () {
    return utils.info(this);
};

module.exports = LotoFacil;
