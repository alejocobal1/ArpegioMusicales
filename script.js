
// Espera a que el DOM esté listo (buena práctica)
document.addEventListener("DOMContentLoaded", () => {

  // Busco todas las cards de obras
  const cards = document.querySelectorAll(".card-obra");

  cards.forEach((card) => {

    // Elementos dentro de cada card
    const selectFuncion = card.querySelector(".funcion");
    const btn = card.querySelector(".btn-comprar");

    // Si no existen, no hace nada (evita errores)
    if (!selectFuncion || !btn) return;

    // Función que actualiza el botón según la selección
    const actualizarBoton = () => {

      const opcionSeleccionada = selectFuncion.selectedOptions[0];

      // Si hay opción válida y tiene URL
      const url = opcionSeleccionada?.dataset?.url;

      if (selectFuncion.value && url) {
        btn.href = url;
        btn.classList.remove("disabled");
      } else {
        btn.href = "#";
        btn.classList.add("disabled");
      }
    };

    // Escucha cambios del selector
    selectFuncion.addEventListener("change", actualizarBoton);

    // Estado inicial (por si hay valores precargados)
    actualizarBoton();

  });

});