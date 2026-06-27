document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     ELEMENTOS
  ========================================== */

  const cards = document.querySelectorAll(".card-obra");

  const btnMenu = document.getElementById("btnMenu");
  const panel = document.getElementById("panelObras");
  const btnCerrar = document.getElementById("btnCerrarPanel");
  const overlay = document.getElementById("overlay");
  const botonesFiltro = document.querySelectorAll(".filtro-obra");



  /* ==========================================
     BOTONES COMPRAR
  ========================================== */

  function initCompra() {

    cards.forEach(card => {

      const select = card.querySelector(".funcion");
      const boton = card.querySelector(".btn-comprar");

      if (!select || !boton) return;

      function actualizarBoton() {

        const opcion = select.selectedOptions[0];

        if (!opcion) return;

        const url = opcion.dataset.url;

        if (url && url !== "#") {

          boton.href = url;
          boton.classList.remove("disabled");

        } else {

          boton.href = "#";
          boton.classList.add("disabled");

        }

      }

      select.addEventListener("change", actualizarBoton);

      actualizarBoton();

    });

  }



  /* ==========================================
     MENÚ LATERAL
  ========================================== */

  function abrirPanel() {

    panel.classList.add("abierto");
    overlay.classList.add("visible");

  }

  function cerrarPanel() {

    panel.classList.remove("abierto");
    overlay.classList.remove("visible");

  }

  function initMenu() {

    if (btnMenu)
      btnMenu.addEventListener("click", abrirPanel);

    if (btnCerrar)
      btnCerrar.addEventListener("click", cerrarPanel);

    if (overlay)
      overlay.addEventListener("click", cerrarPanel);

  }



  /* ==========================================
     FILTROS
  ========================================== */

  function initFiltros() {

    botonesFiltro.forEach(boton => {

      boton.addEventListener("click", () => {

        const filtro = boton.dataset.filtro;

        cards.forEach(card => {

          if (filtro === "todas" || card.dataset.obra === filtro) {

            card.classList.remove("oculta");

          } else {

            card.classList.add("oculta");

          }

        });

        botonesFiltro.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");

        cerrarPanel();

        document.querySelector(".obras")
          .scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      });

    });

    const btnTodas = document.querySelector('[data-filtro="todas"]');

    if (btnTodas) {
      btnTodas.classList.add("activo");
    }

  }



  /* ==========================================
     ANIMACIÓN AL HACER SCROLL
  ========================================== */

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.15
  });

  cards.forEach(card => observer.observe(card));



  /* ==========================================
     INICIAR TODO
  ========================================== */

  initCompra();
  initMenu();
  initFiltros();

});