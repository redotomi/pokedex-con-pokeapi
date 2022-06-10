import { actualizarCartas, URL } from '../index.js';

export function borrarTarjetas() {
  const $tarjetas = document.querySelector('.pokemon-tarjetas');
  $tarjetas.innerHTML = '';
}

export function actualizarDisplayBotones(urlAnterior, urlSiguiente) {
  if (urlAnterior === null) {
    document.querySelector('.anterior').classList.add('oculto');
  } else {
    document.querySelector('.anterior').classList.remove('oculto');
  }
  if (urlSiguiente === null) {
    document.querySelector('.siguiente').classList.add('oculto');
  } else {
    document.querySelector('.siguiente').classList.remove('oculto');
  }
}

export function cambiarPagina(urlSiguiente, urlAnterior) {
  document.querySelector('.siguiente').onclick = () => {
    if (urlSiguiente) {
      borrarTarjetas();
      actualizarCartas(urlSiguiente);
    }
  };

  document.querySelector('.anterior').onclick = () => {
    if (urlAnterior) {
      borrarTarjetas();
    }
    actualizarCartas(urlAnterior);
  };

  document.querySelector('.logo-pokedex').onclick = () => {
    borrarTarjetas();
    actualizarCartas(URL);
  };
}
