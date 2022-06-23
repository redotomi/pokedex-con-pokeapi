import traerPokemons from '../api';

beforeEach(() => {
  global.fetch = jest.fn();
  global.localStorage = jest.fn();
  global.localStorage.setItem = jest.fn();
  global.localStorage.getItem = jest.fn();
});

test('Carga pokemons', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r({});
    });
    resolve({ json: () => jsonPromise });
  }));

  traerPokemons('https://pokeapi.co/api/v2/pokemon/');
  expect(global.fetch)
    .toHaveBeenCalledTimes(1);

  expect(global.fetch)
    .toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
});
