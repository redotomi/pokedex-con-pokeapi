export function guardarPokemons(url, dataJson) {
  if (url === undefined || typeof dataJson !== 'object') {
    throw new Error('Se necesita una llamada a la API para guardar la información');
  }
  localStorage.setItem(url, JSON.stringify(dataJson));
}

export function cargarPokemons(url) {
  const listaPokemons = JSON.parse(localStorage.getItem(url));
  if (listaPokemons === null) {
    throw new Error('Lista de Pokemons no encontrada');
  }

  return listaPokemons;
}

export function guardarPokemon(nombre, dataJson) {
  if (nombre === undefined || typeof dataJson !== 'object') {
    throw new Error('Se necesita una llamada a la API para guardar la información');
  }
  localStorage.setItem(nombre, JSON.stringify(dataJson));
}

export function cargarPokemon(nombre) {
  const pokemon = JSON.parse(localStorage.getItem(nombre));
  if (pokemon === null) {
    throw new Error('Pokemon no encontrado');
  }
  return pokemon;
}
