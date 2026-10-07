/* ==========================================================================
   AndrewSalon · animations.js
   Aparición suave de los elementos al entrar en pantalla.
   - No toca el HTML: añade las clases desde aquí, según REVEAL_SELECTORS.
   - Respeta prefers-reduced-motion: si está activado, no anima nada.
   - Si algo falla o no hay IntersectionObserver, el contenido se ve igual.
   ========================================================================== */

(function (AS) {
  "use strict";

  // Qué elementos aparecen con animación. Para añadir otro, basta con una línea.
  const REVEAL_SELECTORS = [
    ".trust__item",
    ".section__head",
    ".service",
    ".about__media",
    ".about__content",
    ".gallery__item",
    ".reviews__summary",
    ".review",
    ".booking__inner > *",
    ".location__info",
    ".location__map",
    ".hours__inner > *",
    ".contact__card",
    ".footer__inner > *",
  ];

  const STAGGER_MS = 90; // retraso entre elementos hermanos
  const MAX_STEPS = 5; // el retraso nunca pasa de MAX_STEPS * STAGGER_MS
  const DURATION_MS = 700; // debe coincidir con la transición de components.css

  function collectTargets() {
    const targets = new Set();
    REVEAL_SELECTORS.forEach((selector) => {
      // Retraso escalonado según la posición entre los hermanos que coinciden
      const counters = new Map();
      document.querySelectorAll(selector).forEach((el) => {
        if (targets.has(el)) return;
        const parent = el.parentElement;
        const index = counters.get(parent) || 0;
        counters.set(parent, index + 1);
        el.style.setProperty("--reveal-delay", Math.min(index, MAX_STEPS) * STAGGER_MS + "ms");
        targets.add(el);
      });
    });
    return Array.from(targets);
  }

  // Al terminar, se quita la clase para que los efectos hover vuelvan a funcionar
  function finish(el) {
    const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
    window.setTimeout(() => {
      el.classList.remove("reveal", "is-visible");
      el.style.removeProperty("--reveal-delay");
    }, DURATION_MS + delay + 80);
  }

  function init() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const targets = collectTargets();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          finish(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    // Se ocultan sin transición (reveal-init) para que no haya parpadeo al cargar
    targets.forEach((el) => el.classList.add("reveal", "reveal-init"));
    void document.body.offsetHeight; // aplica el estado oculto antes de activar las transiciones
    targets.forEach((el) => {
      el.classList.remove("reveal-init");
      observer.observe(el);
    });
  }

  AS.animations = { init: init };
})(window.AndrewSalon);
