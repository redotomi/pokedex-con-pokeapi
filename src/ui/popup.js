import { agregarMayus, agregarComaAValores } from './estilizadores.js';

async function rellenarInfoPopup(nombrePokemon) {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    const infoPokemon = await pokemon.json();

    const $tituloPopup = document.querySelector('.popup-header .title');
    const $spritePokemon = document.querySelector('.popup-body .sprite-popup-pokemon');
    const $peso = document.querySelector('.popup-body .peso');
    const $estatura = document.querySelector('.popup-body .estatura');

    $tituloPopup.textContent = agregarMayus(infoPokemon.name);
    $spritePokemon.src = infoPokemon.sprites.front_default;
    $peso.textContent = `${agregarComaAValores(infoPokemon.weight)} kg`;
    $estatura.textContent = `${agregarComaAValores(infoPokemon.height)} m`;

    if (infoPokemon.types.length > 1) {
      infoPokemon.types.forEach((e) => {
        const $tipo = document.createElement('strong');
        const $listaTipos = document.querySelector('.popup-body .tipos-pokemon');

        $tipo.classList.add('tipos');
        $tipo.classList.add(`${e.type.name}`);
        $tipo.textContent = agregarMayus(e.type.name);
        $listaTipos.appendChild($tipo);
      });
    } else {
      const $tipo = document.createElement('strong');
      const $listaTipos = document.querySelector('.popup-body .tipos-pokemon');

      $tipo.classList.add('tipos');
      $tipo.classList.add(`${infoPokemon.types[0].type.name}`);
      $tipo.textContent = agregarMayus(infoPokemon.types[0].type.name);
      $listaTipos.appendChild($tipo);
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default function agregarInteraccion() {
  const $abrirPopup = document.querySelectorAll('.tarjeta');
  const $cerrarPopup = document.querySelector('.close-button');
  const $overlay = document.querySelector('#overlay');
  const $popup = document.querySelector('#popup');

  function abrirPopup(popup) {
    const $body = document.querySelector('body');
    if (popup === null) return;
    popup.classList.add('activo');
    $overlay.classList.add('activo');

    $body.style.overflow = 'hidden';
  }

  function cerrarPopup(popup) {
    const $body = document.querySelector('body');
    if (popup === null) return;
    popup.classList.remove('activo');
    $overlay.classList.remove('activo');

    $body.style.overflow = 'auto';
  }

  function borrarTipos() {
    const $listaTipos = document.querySelector('.tipos-pokemon');
    $listaTipos.innerHTML = '';
  }

  $abrirPopup.forEach((tarjeta) => {
    tarjeta.onclick = (e) => {
      const dataPokemon = e.target.closest('[data-nombre-pokemon]');
      abrirPopup($popup);
      rellenarInfoPopup(dataPokemon.getAttribute('data-nombre-pokemon'));
    };
  });

  $cerrarPopup.onclick = () => {
    cerrarPopup($popup);
    borrarTipos();
  };

  $overlay.addEventListener('click', () => {
    const popup = document.querySelector('#popup.activo');
    cerrarPopup(popup);
    borrarTipos();
  });
}
