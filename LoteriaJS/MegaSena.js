'use strict';

var utils = require('./Utils.js');
var mathjs = require('mathjs');

function MegaSena(ensure) {
	if (!(this instanceof MegaSena)) return new LotoFacil(ensure);
	this.name = 'Mega Sena';
	this.from = 60;
	this.choose = 6;
	this.ensure = ensure || 1;
	this.combinations = mathjs.combinations(this.from, this.choose);
	this.combinationsOfEnsurement = utils.combinacoesDeFechamento(this);
	this.probability = this.combinations / this.combinationsOfEnsurement;
	utils.validate(this);
};

MegaSena.prototype.rodar = function (progressCB) {
	return utils.rodar(this, progressCB);
};

MegaSena.prototype.info = function () {
	return utils.info(this);
};

module.exports = MegaSena;
