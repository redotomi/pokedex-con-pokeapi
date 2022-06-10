import llenarCartas from './ui/tarjetas.js';

import traerPokemons from './api/api.js';

export const URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function actualizarCartas(url) {
  try {
    llenarCartas(traerPokemons(url));
  } catch (error) {
    throw new Error(error);
  }
}

actualizarCartas(URL);
