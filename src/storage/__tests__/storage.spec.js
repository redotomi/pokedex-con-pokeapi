/* eslint-disable */
import { 
  cargarPokemon,
  cargarPokemons,
  guardarPokemon,
  guardarPokemons 
} from '../storage.js';

beforeEach(() => {
  global.localStorage = jest.fn();
  global.localStorage.setItem = jest.fn();
  global.localStorage.getItem = jest.fn();
});

test('Prueba guardarPokemon', () => {
  const objeto = {};
  const variable = undefined;

  expect(() => {guardarPokemon(variable, objeto)})
    .toThrowError('Se necesita una llamada a la API para guardar la información');

  expect(() => {guardarPokemon('asd', 'asd')})
    .toThrowError('Se necesita una llamada a la API para guardar la información');

  guardarPokemon('asd', objeto);
  expect(global.localStorage.setItem)
    .toHaveBeenCalledTimes(1);
});

test('Prueba guardarPokemons', () => {
  const objeto = {};
  const variable = undefined;

  expect(() => {guardarPokemons(variable, objeto)})
    .toThrowError('Se necesita una llamada a la API para guardar la información');

  expect(() => {guardarPokemons('asd', 'asd')})
    .toThrowError('Se necesita una llamada a la API para guardar la información');

  guardarPokemons('asd', objeto);
  expect(global.localStorage.setItem)
    .toHaveBeenCalledTimes(1);
});

test('Prueba cargarPokemon', () => {
  localStorage.getItem.mockImplementationOnce(nombre => nombre);
  expect(cargarPokemon('{"asd": "objeto"}'))
    .toEqual({"asd": "objeto"});

  localStorage.getItem.mockImplementationOnce(nombre => nombre);
  expect(() => {cargarPokemon(null)})
    .toThrowError('Pokemon no encontrado');
});

test('Prueba cargarPokemons', () => {
  localStorage.getItem.mockImplementationOnce(url => url);
  expect(cargarPokemons('{"asd": "objeto"}'))
    .toEqual({"asd": "objeto"});

  localStorage.getItem.mockImplementationOnce(url => url);
  expect(() => {cargarPokemons(null)})
    .toThrowError('Lista de Pokemons no encontrada');
});
