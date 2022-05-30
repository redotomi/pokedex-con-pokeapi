const URL = 'https://pokeapi.co/api/v2/pokemon/';
let siguienteURL;
let anteriorURL;

async function traerPokemons(url) {
  try {
    const pokemons = await fetch(url);
    return pokemons.json();;
  } catch(error) {
    throw new Error(error);
  }
}


async function llenarCartas(cartas) {
  try {
    const dataPokemons = await cartas;
  const pokemons = dataPokemons.results;
  
  pokemons.forEach(pokemon => {
    const $body = document.createElement('div')
    $body.textContent = `${pokemon.name.capitalize()}`;
    
    crearTarjeta($body, pokemon.name);
    añadirInteraccion();
  });

  siguienteURL = dataPokemons.next;
  anteriorURL = dataPokemons.previous;

  if(anteriorURL === null){
    document.querySelector('.anterior').classList.add('oculto');
  }
  else {
    document.querySelector('.anterior').classList.remove('oculto');
  }
  if(siguienteURL === null){
    document.querySelector('.siguiente').classList.add('oculto');
  }
  else {
    document.querySelector('.siguiente').classList.remove('oculto');
  }
  
  }catch(error){
    throw new Error(error);
  }
  
}

function crearTarjeta(body, pokemon) {
  const $contenedor = document.querySelector('.pokemon-tarjetas');
  const $tarjeta = document.createElement('div');
  $tarjeta.className = 'tarjeta';
  $tarjeta.dataset.nombrePokemon = pokemon;

  body.className = 'tarjeta-body';

  $tarjeta.appendChild(body);
  $contenedor.appendChild($tarjeta);
}

function borrarTarjetas() {
  const $tarjetas = document.querySelector('.pokemon-tarjetas');
  $tarjetas.innerHTML = '';
  contadorPokemon = 0;
}

async function actualizarCartas(url) {
  try {
    llenarCartas(traerPokemons(url));
  } catch(error) {
    throw new Error(error);
  }
  
}

actualizarCartas(URL);

document.querySelector('.siguiente').onclick = () => {

  if (siguienteURL){
  borrarTarjetas()
  actualizarCartas(siguienteURL); 
  }
}

document.querySelector('.anterior').onclick = () => {

  if(anteriorURL) {
    borrarTarjetas()
  }
  actualizarCartas(anteriorURL);
}

document.querySelector('.logo-pokedex').onclick = () => {
  borrarTarjetas()
  actualizarCartas(URL);
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

function añadirInteraccion() {
  const $abrirPopup = document.querySelectorAll('.tarjeta');
  const $cerrarPopup = document.querySelector('.close-button');
  const $overlay = document.querySelector('#overlay');
  const popup = document.querySelector('#popup')

  $abrirPopup.forEach((tarjeta) =>{
    tarjeta.onclick = (e) => {
      const dataPokemon = e.target.closest('[data-nombre-pokemon]');
      abrirPopup(popup);
      rellenarInfoPopup(dataPokemon.getAttribute('data-nombre-pokemon'));
    }
  })

  $cerrarPopup.onclick = () => {
    cerrarPopup(popup);
    borrarTipos();
  }
 
  $overlay.addEventListener('click',() => {
    const popup = document.querySelector('#popup.activo');
    cerrarPopup(popup);
    borrarTipos();
  })

  function abrirPopup(popup) {
    const $body = document.querySelector('body');
    if (popup === null) return;
    popup.classList.add('activo');
    $overlay.classList.add('activo'); 

    $body.style.overflow='hidden';
  }

  function cerrarPopup(popup) {
    const $body = document.querySelector('body');
    if (popup === null) return;
    popup.classList.remove('activo');
    $overlay.classList.remove('activo'); 

    $body.style.overflow='auto';
  }

  function borrarTipos() {
    const $listaTipos = document.querySelector('.tipos-pokemon');
    $listaTipos.innerHTML = '';
  }
}

async function rellenarInfoPopup(nombrePokemon) {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
  const infoPokemon = await pokemon.json();

  const $tituloPopup = document.querySelector('.popup-header .title');
  const $spritePokemon = document.querySelector('.popup-body .sprite-popup-pokemon');
  const $peso = document.querySelector('.popup-body .peso');
  const $estatura = document.querySelector('.popup-body .estatura');

  $tituloPopup.textContent = infoPokemon.name.capitalize();
  $spritePokemon.src = infoPokemon.sprites.front_default;
  $peso.textContent = `${agregarComaAValores(infoPokemon.weight)} kg`;
  $estatura.textContent = `${agregarComaAValores(infoPokemon.height)} m`;

  if(infoPokemon.types.length > 1){
    infoPokemon.types.forEach((e) => {
      const $tipo = document.createElement('strong');      
      const $listaTipos = document.querySelector('.popup-body .tipos-pokemon');

      $tipo.classList.add('tipos');
      $tipo.classList.add(`${e.type.name}`);
      $tipo.textContent = e.type.name.capitalize();
      $listaTipos.appendChild($tipo);
    }) 
  }
  else {
    const $tipo = document.createElement('strong')
    const $listaTipos = document.querySelector('.popup-body .tipos-pokemon');

    $tipo.classList.add('tipos');
    $tipo.classList.add(`${infoPokemon.types[0].type.name}`);
    $tipo.textContent = infoPokemon.types[0].type.name.capitalize();
    $listaTipos.appendChild($tipo);

  }
  } catch(error){
    throw new Error(error);
  }
  
}

function agregarComaAValores(num) {
  const string = num.toString();
  if(string.length < 2) {
    const resultado = `0${string.slice(0, -1)},${string.slice(-1)}`;
    return resultado;
  }
  else {
    const resultado = `${string.slice(0, -1)},${string.slice(-1)}`;
    return resultado;
  }
}

