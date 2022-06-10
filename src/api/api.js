export default async function traerPokemons(url) {
  try {
    const pokemons = await fetch(url);
    return pokemons.json();
  } catch (error) {
    throw new Error(error);
  }
}
