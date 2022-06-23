export function agregarMayus(palabra) {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

export function agregarComaAValores(num) {
  const string = num.toString();
  if (string.length < 2) {
    const resultado = `0${string.slice(0, -1)},${string.slice(-1)}`;
    return resultado;
  }

  const resultado = `${string.slice(0, -1)},${string.slice(-1)}`;
  return resultado;
}
