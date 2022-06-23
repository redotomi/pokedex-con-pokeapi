// eslint-disable-next-line
import llenarCartas from './ui/tarjetas.js';
// eslint-disable-next-line
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
