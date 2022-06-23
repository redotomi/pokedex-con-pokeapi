// eslint-disable-next-line
import { cargarPokemon, guardarPokemon } from '../storage/storage.js';
// eslint-disable-next-line
import { agregarMayus, agregarComaAValores } from './estilizadores.js';

function actualizarTituloPopup(texto) {
  const $tituloPopup = document.querySelector('.popup-header .title');
  $tituloPopup.textContent = agregarMayus(texto);
}

function actualizarSprite(sprite) {
  const $spritePokemon = document.querySelector('.popup-body .sprite-popup-pokemon');
  $spritePokemon.src = sprite;
}

function actualizarPesoPokemon(peso) {
  const $peso = document.querySelector('.popup-body .peso');
  $peso.textContent = `${agregarComaAValores(peso)} kg`;
}

function actualizarEstaturaPokemon(estatura) {
  const $estatura = document.querySelector('.popup-body .estatura');
  $estatura.textContent = `${agregarComaAValores(estatura)} m`;
}

function actualizarTiposPokemon(tipos) {
  if (tipos.length > 1) {
    tipos.forEach((e) => {
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
    $tipo.classList.add(`${tipos[0].type.name}`);
    $tipo.textContent = agregarMayus(tipos[0].type.name);
    $listaTipos.appendChild($tipo);
  }
}

async function rellenarInfoPopup(nombrePokemon) {
  let infoPokemon;
  try {
    infoPokemon = cargarPokemon(nombrePokemon);
  } catch (error) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    infoPokemon = await pokemon.json();
    guardarPokemon(nombrePokemon, infoPokemon);
  }

  actualizarTituloPopup(infoPokemon.name);
  actualizarSprite(infoPokemon.sprites.front_default);
  actualizarPesoPokemon(infoPokemon.weight);
  actualizarEstaturaPokemon(infoPokemon.height);
  actualizarTiposPokemon(infoPokemon.types);
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
    // eslint-disable-next-line
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
