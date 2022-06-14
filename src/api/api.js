// eslint-disable-next-line
import { cargarPokemons, guardarPokemons } from '../storage/storage.js';

let pokemons;

export default async function traerPokemons(url) {
  try {
    pokemons = cargarPokemons(url);
  } catch (error) {
    pokemons = await fetch(url);
    pokemons = await pokemons.json();
    guardarPokemons(url, pokemons);
  }
  return pokemons;
}
