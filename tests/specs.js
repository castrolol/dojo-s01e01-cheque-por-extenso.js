'use strict';
var assert = require('assert');
var Cheque = require('../').Cheque;

describe('Cheque', function () {



  it('de um real', function () {
    var chequeUmReal = new Cheque(1);
    assert.equal(chequeUmReal.porExtenso(), 'Um real');
  });

  it('de dez reais', function () {
    var chequeDezReais = new Cheque(10);
    assert.equal(chequeDezReais.porExtenso(), 'Dez reais');
  });

  it('de quinze centavos', function () { 

    var chequePobre = new Cheque(0.15);    
    assert.equal(chequePobre.porExtenso(), 'Quinze centavos');
  });

  it('de cem reais e onze centavos', function () {
    var chequeCemReais11Cents = new Cheque(100.11);
    assert.equal(chequeCemReais11Cents.porExtenso(), 'Cem reais e onze centavos');
  });

  it('de um milhão e trinta e sete reais e dezenove centavos', function () {

    var chequeSilvioSantos = new Cheque(1000037.19);
    assert.equal(chequeSilvioSantos.porExtenso(), 'Um milhão e trinta e sete reais e dezenove centavos');
  });
 
  it('de trinta e dois bilhões, duzentos e cinquenta e um milhões, cento e um mil, setenta e sete reais e dezoito centavos', function () {

    var chequeBillGates = new Cheque(32251101077.18);
    assert.equal(chequeBillGates.porExtenso(), 'Trinta e dois bilhões, duzentos e cinquenta e um milhões, cento e um mil, setenta e sete reais e dezoito centavos');
  });
 
 
});
