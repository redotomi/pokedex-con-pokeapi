/* eslint-disable */
import { agregarMayus, agregarComaAValores } from '../estilizadores.js';

test('Agrega mayuscula a string', () => {
  expect(agregarMayus('test'))
    .toEqual('Test');
});

test('Prueba que las comas se agreguen correctamente', () => {
  expect(agregarComaAValores(3))
    .toEqual('0,3');

  expect(agregarComaAValores(31))
    .toEqual('3,1');

  expect(agregarComaAValores(314))
    .toEqual('31,4');
});
