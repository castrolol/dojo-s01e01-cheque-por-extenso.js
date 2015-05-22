"use strict";

var root = null;

if(typeof module == "object"){
	root = module.exports; //require("./cheque").Cheque
}else{
	root = window; //window.Cheque
}

(function (out) {

	var dezenas = {
		"10": "dez",
		"11": "onze",
		"12": "doze",
		"13": "treze",
		"14": "quatorze",
		"15": "quinze",
		"16": "dezesseis",
		"17": "dezessete",
		"18": "dezoito",
		"19": "dezenove"
	};

	var numerosExtenso = {
		"1": { unidade: "um", dezena: dezenas, centena: { normal: "cento", "100": "cem" } },
		"2": { unidade: "dois", dezena: "vinte", centena: "duzentos" },
		"3": { unidade: "tres", dezena: "trinta", centena: "trezentos" },
		"4": { unidade: "quatro", dezena: "quarenta", centena: "quatrocentos" },
		"5": { unidade: "cinco", dezena: "cinquenta", centena: "quinhentos" },
		"6": { unidade: "seis", dezena: "sessenta", centena: "seissentos" },
		"7": { unidade: "sete", dezena: "setenta", centena: "setessentos" },
		"8": { unidade: "oito", dezena: "oitenta", centena: "oitocentos" },
		"9": { unidade: "nove", dezena: "noventa", centena: "novecentos" }
	};

	var ordens = {
		"1": "unidade",
		"10": "dezena",
		"100": "centena"
	};
 
	var sufixos = [
		{ singular: "centavo", plural: "centavos" },
		{ singular: "real", plural: "reais" },
		{ singular: "mil", plural: "mil" },
		{ singular: "milhão", plural: "milhões" },
		{ singular: "bilhão", plural: "bilhões" },
		{ singular: "trilhão", plural: "trilhões" }
	];

	function Cheque(valor) { 
		this.valor = valor;
	}

	function converterOrdem(numero, multiplo) {
		
		var casa = Math.floor(numero / multiplo);
		var ordem = ordens[multiplo];

		var convertido = {
			parar: false,
			valorOrdem: null	
		};

		if (casa in numerosExtenso){
			
			var extenso = numerosExtenso[casa][ordem];
			
			if(typeof extenso == "object"){

				convertido.parar = numero in extenso;
				convertido.valorOrdem = numero in extenso ? extenso[numero] : extenso.normal;

			}else{
				convertido.valorOrdem = extenso;
			}
		}
		return convertido;
	}

	function extrairCentavos(numero) {
		return Math.round(numero % 1 * 100);
	}

	function converterClasse(numero) {
		var fragmentos = [];
		var multiplo = 100;
		var original = numero;

		do {
			
			var convertido = converterOrdem(numero, multiplo);
			
			if(convertido.valorOrdem) fragmentos.push(convertido.valorOrdem);
			if(convertido.parar) break;
			
			numero = Math.floor(numero % multiplo);
			multiplo /= 10;
		
		} while (numero > 0);

		return {
			original: original,
			fragmentos: fragmentos
		};
	}

	function extairClasses(numero, sufixo) {
		var partes = [];

		partes.push(converterClasse(extrairCentavos(numero)));
		numero -= numero % 1; //retirando os centavos;
		
		do {
			partes.push(converterClasse(numero % 1000));
			numero = Math.floor(numero / 1000);
		} while (numero > 0);

		return partes;
	}

	function capitalizar(texto) {
		return texto.charAt(0).toUpperCase() + texto.substring(1).toLowerCase();
	}

	function formatarClasse(parte, posicao) {
		var grupoSufixo = sufixos[posicao];
		var sufixo = parte.original === 1 ? grupoSufixo.singular : grupoSufixo.plural;

		return parte.fragmentos.filter(function (n) {
			return !!n;
		}).join(" e ") + " " + sufixo;
	}


	function formatarSaida(classes) {
		var vazio = "";
		var conector = vazio;
		var formatado = vazio;

		classes.forEach(function(classe, i){
 
			if(classe.original === 0){
				conector =  " e ";
				return;
			}
			
			var parteFormatada = formatarClasse(classe, i);
			
			if(formatado === vazio){
				conector = vazio;
			}
			
			formatado = parteFormatada + conector + formatado;
			conector = conector === vazio ? " e " : ", ";

		});
		
		return capitalizar(formatado);
	}

	Cheque.prototype.toString = function (numero) {
		var classes = extairClasses(this.valor);
		return formatarSaida(classes);
	};
	
	Cheque.prototype.porExtenso = function(){
		return this.toString();
	};
	
	Cheque.prototype.valueOf = function(){
		return this.valor;
	}

	out.Cheque = Cheque;

} (root));