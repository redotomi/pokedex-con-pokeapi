const URL = 'https://pokeapi.co/api/v2/pokemon/';
let siguienteURL;
let anteriorURL;
let contadorPokemon = 0;

async function traerPokemons(url) {
  const pokemons = await fetch(url);
  return pokemons.json();
}

async function llenarCartas(cartas) {
  const dataPokemons = await cartas;
  const pokemons = dataPokemons.results;


  if(contadorPokemon <= 20){
  pokemons.forEach(pokemon => {
    const $header = document.createElement('div');
    const $body = document.createElement('div')
    const $img = document.createElement('img');
    $img.className = 'pokemon-sprite';
    
    $body.textContent = `${pokemon.name.capitalize()}`;
    
    fetch(pokemon.url)
      .then(respuesta => respuesta.json())
      .then(respuestaJSON => respuestaJSON.sprites)
      .then(sprites => {
        $img.src = sprites.front_default});
        
    $header.appendChild($img);
    crearTarjeta($header, $body);
    contadorPokemon++;
  })}
  else{ 
    return;
  }

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
  
}

function crearTarjeta(header, body) {
  const $contenedor = document.querySelector('.pokemon-tarjetas');
  const $tarjeta = document.createElement('div');
  $tarjeta.className = 'tarjeta';
  header.className = 'tarjeta-header';
  body.className = 'tarjeta-body';
  $tarjeta.appendChild(header);
  $tarjeta.appendChild(body);
  $contenedor.appendChild($tarjeta);
}

function borrarTarjetas() {
  const $tarjetas = document.querySelector('.pokemon-tarjetas');
  $tarjetas.innerHTML = '';
  contadorPokemon = 0;
}

async function actualizarCartas(url) {
  llenarCartas(traerPokemons(url));
}

llenarCartas(traerPokemons(URL));

document.querySelector('.siguiente').onclick = () => {

  if (siguienteURL){
  // borrarNombrePokemons();
  // borrarImagenesPokemons();
  borrarTarjetas()
  actualizarCartas(siguienteURL); 
  }
}

document.querySelector('.anterior').onclick = () => {

  if(anteriorURL) {
    // borrarNombrePokemons()
    // borrarImagenesPokemons();
    borrarTarjetas()
  }
  actualizarCartas(anteriorURL);
}


Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

const $abrirPopup = document.querySelectorAll('.tarjeta');
const $cerrarPopup = document.querySelectorAll('.close-button');
const $overlay = document.querySelector('#overlay');
const popup = document.querySelector('#popup')

$abrirPopup.forEach(tarjeta => {
    tarjeta.addEventListener('click', (e) => {
        abrirPopup(popup);
        console.log(e.target);
    })
})

$cerrarPopup.forEach(button => {
    button.addEventListener('click', () => {
        cerrarPopup(popup);
    })
})

$overlay.addEventListener('click',() => {
    const popup = document.querySelectorAll('#popup.activo');
    popup.forEach(popup => {
        cerrarPopup(popup);
    })
})

function abrirPopup(popup) {
    if (popup === null) return;
    popup.classList.add('activo');
    $overlay.classList.add('activo'); 
}

function cerrarPopup(popup) {
    if (popup === null) return;
    popup.classList.remove('activo');
    $overlay.classList.remove('activo'); 
}


