import data from '../db/demo.json' assert { type: 'json' };

export function usuarioQuiereCargarDemo() {
  return confirm('¿Quiere probar una demo?');
}

export function getDemoBingos() {
  return data.bingos;
}

export function iniciarDemo(renderCallback) {
  if (!usuarioQuiereCargarDemo()) return false;
  getDemoBingos().map(({ id, numbers }) => renderCallback(id, numbers));
  return true;
}
