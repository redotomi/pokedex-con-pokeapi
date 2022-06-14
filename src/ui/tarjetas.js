// eslint-disable-next-line
import { agregarMayus } from './estilizadores.js';
// eslint-disable-next-line
import agregarInteraccion from './popup.js';
// eslint-disable-next-line
import { actualizarDisplayBotones, cambiarPagina } from './paginador.js';

function crearTarjeta(body, pokemon) {
  const $contenedor = document.querySelector('.pokemon-tarjetas');
  const $tarjeta = document.createElement('div');
  $tarjeta.className = 'tarjeta';
  $tarjeta.dataset.nombrePokemon = pokemon;
  // eslint-disable-next-line
  body.className = 'tarjeta-body';

  $tarjeta.appendChild(body);
  $contenedor.appendChild($tarjeta);
}

export default async function llenarCartas(cartas) {
  try {
    const dataPokemons = await cartas;
    const pokemons = dataPokemons.results;

    pokemons.forEach((pokemon) => {
      const $body = document.createElement('div');
      $body.textContent = agregarMayus(pokemon.name);

      crearTarjeta($body, pokemon.name);
      agregarInteraccion();
    });

    const siguienteURL = dataPokemons.next;
    const anteriorURL = dataPokemons.previous;

    actualizarDisplayBotones(anteriorURL, siguienteURL);
    cambiarPagina(siguienteURL, anteriorURL);
  } catch (error) {
    throw new Error(error);
  }
}
