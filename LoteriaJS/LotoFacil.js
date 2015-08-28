'use strict';

var utils = require('./Utils.js');
var mathjs = require('mathjs');

function LotoFacil(ensure) {
	if (!(this instanceof LotoFacil)) return new LotoFacil(ensure);
	this.name = 'LotoFácil';
	this.from = 25;
	this.choose = 15;
	this.ensure = ensure || 1;
	this.combinations = mathjs.combinations(this.from, this.choose);
	this.combinationsOfEnsurement = utils.combinacoesDeFechamento(this);
	this.probability = this.combinations / this.combinationsOfEnsurement;
	utils.validate(this);
};

LotoFacil.prototype.rodar = function (progressCB) {
	return utils.rodar(this, progressCB);
};

LotoFacil.prototype.info = function () {
	return utils.info(this);
};

module.exports = LotoFacil;
