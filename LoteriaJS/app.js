'use strict';

var cmdLine = require('command-line-args')(
	[
		{ name: 'tipo', alias: 't', type: String, required: true, defaultOption: true, description: 'Tipo de jogo: [Mega, Facil]' },
		{ name: 'fechamento', alias: 'f', type: Number, defaultValue: 1, description: 'Quantos números quer garantir acertar' },
		{ name: 'estatistica', alias: 'e', boolean: true, description: 'Mostra [underline]{apenas} as estatísticas e [underline]{não gera} os jogos' },
		{ name: 'progresso', alias: 'p', boolean: true, description: 'Mostra o progresso de execução (barra)'}
	]);

try {
	var argv = cmdLine.parse();
	var mathjs = require('mathjs');
	var utils = require('./Utils.js');
	var ProgressBar = require('progress');
	var loto = undefined;
	switch (argv.tipo) {
		case 'Mega':
			var MegaSena = require('./MegaSena.js');
			loto = new MegaSena(argv.fechamento);
			break;
		case 'Facil':
			var LotoFacil = require('./LotoFacil.js');
			loto = new LotoFacil(argv.fechamento);
			break;
		default:
			throw 'Tipo "' + argv.tipo + '" não suportado!';
	}
	
	loto.info();
	
	if (!argv.estatistica) {
		var pbar = new ProgressBar(':current / :total [:bar] :percent :etas :elapsed', {
			complete: '#',
			incomplete: ' ',
			width: 25,
			total: loto.combinations
		});
		var pct = -1;
		var lastN = 0;
		var resultado = loto.rodar(function (n, total, jogos) {
			var npct = Math.floor(n / total * 100);
			if (npct > pct) {
				pbar.tick(n - lastN);
				pct = npct;
				lastN = n;
			}
		});
		console.error('');
		
		console.log(resultado);
		
		console.log('Foram gerados %s jogos para fechar %s na Lotofácil', resultado.length, argv.fechamento);
	}
} catch (err) {
	console.error(err);
	console.error(cmdLine.getUsage({
		title: 'LoteriaJS',
		description: 'Gera combinações de jogos para a loteria.',
		footer: 'Contribua: [underline]{https://github.com/BCJTI/LoteriaJS}'
	}));
}

