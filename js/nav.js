/* ==========================================================================
   AndrewSalon · nav.js
   Navegación: menú móvil accesible, cabecera al hacer scroll,
   desplazamiento suave entre secciones y sección activa en el menú.
   ========================================================================== */

(function (AS) {
  "use strict";

  const DESKTOP = window.matchMedia("(min-width: 960px)");
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");

  const LABEL_OPEN = "Abrir menú";
  const LABEL_CLOSE = "Cerrar menú";

  /* ---------- Menú móvil ---------- */

  function initMenu(nav, toggle) {
    function isOpen() {
      return nav.classList.contains("is-open");
    }

    function setOpen(open, restoreFocus) {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? LABEL_CLOSE : LABEL_OPEN);

      if (open) {
        const first = nav.querySelector("a[href]");
        if (first) first.focus({ preventScroll: true });
      } else if (restoreFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", () => setOpen(!isOpen(), false));

    // Al elegir una sección, el menú se cierra (el scroll lo gestiona initAnchors)
    nav.addEventListener("click", (event) => {
      if (isOpen() && event.target.closest("a[href]")) setOpen(false, false);
    });

    document.addEventListener("keydown", (event) => {
      if (!isOpen() || DESKTOP.matches) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false, true);
        return;
      }

      // El foco no se escapa del menú mientras está abierto
      if (event.key === "Tab") {
        // En el HTML el menú va antes que el botón, así que ese es el orden del foco
        const items = Array.from(nav.querySelectorAll("a[href]")).concat(toggle);
        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Si se pasa a pantalla de ordenador con el menú abierto, se cierra
    const onChange = (event) => {
      if (event.matches && isOpen()) setOpen(false, false);
    };
    if (DESKTOP.addEventListener) DESKTOP.addEventListener("change", onChange);
    else DESKTOP.addListener(onChange);
  }

  /* ---------- Cabecera: cambia al hacer scroll ---------- */

  function initHeader(header) {
    let ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /* ---------- Desplazamiento suave a las secciones ---------- */

  function initAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const hash = link.getAttribute("href");
      if (hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();

      // scroll-padding-top (CSS) deja libre el espacio de la cabecera fija
      target.scrollIntoView({ behavior: REDUCED_MOTION.matches ? "auto" : "smooth", block: "start" });

      try {
        history.pushState(null, "", hash);
      } catch (err) {
        /* algunos navegadores no permiten pushState en archivos locales */
      }

      // Accesibilidad: el foco pasa a la sección de destino
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  /* ---------- Sección activa en el menú ---------- */

  function initScrollSpy(nav) {
    if (!("IntersectionObserver" in window)) return;

    const links = Array.from(nav.querySelectorAll('.nav__list a[href^="#"]'));
    const byId = new Map();
    links.forEach((link) => byId.set(link.getAttribute("href").slice(1), link));

    function setActive(id) {
      links.forEach((link) => {
        if (byId.get(id) === link) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    // Se considera activa la sección que cruza la franja central de la pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else if (byId.get(entry.target.id) && byId.get(entry.target.id).hasAttribute("aria-current")) setActive(null);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    byId.forEach((link, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Inicio ---------- */

  function init() {
    const header = document.querySelector(".site-header");
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("nav-toggle");

    if (header) initHeader(header);
    if (nav && toggle) initMenu(nav, toggle);
    if (nav) initScrollSpy(nav);
    initAnchors();
  }

  AS.nav = { init: init };
})(window.AndrewSalon);
