'use strict';

var utils = require('./Utils.js');

function MegaSena(ensure) {
	if (!(this instanceof MegaSena)) return new LotoFacil(ensure);
	this.name = 'Mega Sena';
	this.from = 60;
	this.choose = 6;
	this.ensure = ensure || 1;
	utils.validate(this);
};

MegaSena.prototype.rodar = function () {
	return utils.rodar(this);
};

MegaSena.prototype.info = function () {
	return utils.info(this);
};

module.exports = MegaSena;
