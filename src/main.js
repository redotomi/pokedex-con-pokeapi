let URL = 'https://pokeapi.co/api/v2/pokemon/';
let siguienteURL;
let anteriorURL;

async function traerPokemons(url) {
  const pokemons = await fetch(url);
  return pokemons.json();
}

async function llenarCartas(cartas) {
  const dataPokemons = await cartas;
  console.log(dataPokemons);
  const pokemons = dataPokemons.results;

  pokemons.forEach(pokemon => {
    const $carta = document.querySelector('.tarjeta-body');
    const $img = document.querySelector('.pokemon-sprite');
    $carta.textContent = `${pokemon.name.capitalize()}`;
    $carta.setAttribute('url', `${pokemon.url}`);
    
    fetch(pokemon.url)
      .then(respeusta => respeusta.json())
      .then(respuestaJSON => respuestaJSON.sprites)
      .then(sprites => {
        $img.src = sprites.front_default});
        
    $img.classList.remove('pokemon-sprite')
    $carta.classList.remove('tarjeta-body');
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
  
}

function borrarNombrePokemons() {
  const $cartas = document.querySelectorAll('.texto');
  $cartas.forEach((elemento => {
    elemento.classList.add('tarjeta-body');
    elemento.textContent = '';
  }))
}

function borrarImagenesPokemons() {
  const $cartas = document.querySelectorAll('.imagen');
  $cartas.forEach((elemento) => {
    elemento.classList.add('pokemon-sprite');
    elemento.src = '';
  })
}

async function actualizarCartas(url) {
  llenarCartas(traerPokemons(url));
}

llenarCartas(traerPokemons(URL));

document.querySelector('.siguiente').onclick = () => {

  if (siguienteURL){
  borrarNombrePokemons();
  borrarImagenesPokemons();
  actualizarCartas(siguienteURL); 
  }
}

document.querySelector('.anterior').onclick = () => {

  if(anteriorURL) {
    borrarNombrePokemons()
    borrarImagenesPokemons();
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


