﻿'use strict';

var utils = require('./Utils.js');

function LotoFacil(ensure) {
    this.name = 'LotoFácil';
    this.from = 25;
    this.choose = 15;
    this.ensure = ensure || 1;
};

LotoFacil.prototype.rodar = function () {
    return utils.rodar(this);
};

LotoFacil.prototype.info = function () {
    return utils.info(this);
};

module.exports = LotoFacil;