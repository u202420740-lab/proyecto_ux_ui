// Función aislada: evita compartir variables con menu.js.
(() => {
  // Ejemplo didáctico, no mediciones reales. Cambia aquí los datos al disponer de ellos.
  // Los porcentajes de esta distribución deben sumar 100.
  const categorias = [
    { nombre: 'Transporte', porcentaje: 45, icono: '🚌', clase: 'transporte', patron: 'Líneas diagonales' },
    { nombre: 'Energía', porcentaje: 30, icono: '⚡', clase: 'energia', patron: 'Puntos' },
    { nombre: 'Alimentación', porcentaje: 15, icono: '🍽', clase: 'alimentacion', patron: 'Franjas horizontales' },
    { nombre: 'Residuos', porcentaje: 10, icono: '♻', clase: 'residuos', patron: 'Cuadrícula' }
  ];

  // Reutilizamos los identificadores propuestos en el JavaScript de ACME.
  const boton = document.getElementById('btn-modo-inclusivo');
  const contenedor = document.getElementById('contenedor-grafico-emisiones');
  const grafico = document.getElementById('grafico-emisiones');
  const leyenda = document.getElementById('leyenda-emisiones');
  const estado = document.getElementById('estado-emisiones');
  const textoEstado = document.getElementById('estado-modo');
  // Permite incluir este archivo en una página que no tenga el gráfico.
  if (!boton || !contenedor || !grafico || !leyenda || !estado || !textoEstado) return;

  // Un único conjunto de datos crea las barras y la leyenda, sin duplicar porcentajes.
  categorias.forEach((categoria) => {
    const fila = document.createElement('div');
    fila.className = 'fila-emision';
    const etiqueta = document.createElement('span');
    etiqueta.textContent = `${categoria.icono} ${categoria.nombre}: ${categoria.porcentaje} %`;
    const pista = document.createElement('div');
    pista.className = 'pista-emision';
    const barra = document.createElement('div');
    barra.className = `barra-emision textura-emision ${categoria.clase}`;
    barra.style.width = `${categoria.porcentaje}%`;
    pista.append(barra);
    fila.append(etiqueta, pista);
    grafico.append(fila);

    const item = document.createElement('li');
    const muestra = document.createElement('span');
    muestra.className = `muestra-emision textura-emision ${categoria.clase}`;
    muestra.setAttribute('aria-hidden', 'true');
    const icono = document.createElement('span');
    icono.textContent = categoria.icono;
    icono.setAttribute('aria-hidden', 'true');
    const texto = document.createElement('span');
    texto.textContent = `${categoria.nombre}: ${categoria.porcentaje} %`;
    const patron = document.createElement('span');
    patron.className = 'nombre-patron';
    patron.textContent = ` — ${categoria.patron}`;
    patron.hidden = true;
    texto.append(patron);
    item.append(muestra, icono, texto);
    leyenda.append(item);
  });

  // El botón nativo genera clic también con Enter y espacio.
  boton.addEventListener('click', () => {
    const activo = contenedor.classList.toggle('modo-inclusivo-activo');
    boton.setAttribute('aria-pressed', String(activo));
    // El nombre del control se mantiene estable; aria-pressed comunica su estado.
    textoEstado.textContent = activo ? ': activado' : ': desactivado';
    leyenda.querySelectorAll('.nombre-patron').forEach((texto) => {
      texto.hidden = !activo;
    });
    estado.textContent = activo
      ? 'Modo Inclusivo activado: patrones en las barras y en la leyenda.'
      : 'Colores, iconos y porcentajes. Los patrones están desactivados.';
  });
  boton.hidden = false;
})();
