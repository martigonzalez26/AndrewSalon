/* ==========================================================================
   AndrewSalon · main.js
   Punto de arranque: aplica los datos de config.js a los enlaces y
   arranca el resto de módulos (nav, animations, status).
   Cada módulo se registra en window.AndrewSalon y expone un método init().
   ========================================================================== */

(function (AS) {
  "use strict";

  const cfg = AS.config;

  /* ---------- Enlaces construidos a partir de config.js ---------- */

  function phoneHref() {
    return "tel:" + cfg.phone.e164;
  }

  function whatsappHref() {
    return "https://wa.me/" + cfg.whatsapp.number + "?text=" + encodeURIComponent(cfg.whatsapp.message);
  }

  function mapsHref() {
    if (cfg.mapsUrl) return cfg.mapsUrl;
    const a = cfg.address;
    const query = a.street + ", " + a.postalCode + " " + a.city;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }

  // Ficha del negocio en Google Maps (desde ahí se puede escribir una reseña)
  function reviewHref() {
    if (isHttpUrl(cfg.reviews && cfg.reviews.writeUrl)) return cfg.reviews.writeUrl.trim();
    const a = cfg.address;
    const query = cfg.name + ", " + a.street + ", " + a.postalCode + " " + a.city;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }

  function isHttpUrl(value) {
    return typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim());
  }

  function setExternal(el, href) {
    el.setAttribute("href", href);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  }

  function hasBooking() {
    return isHttpUrl(cfg.booking.url);
  }

  /* Cada elemento con data-action recibe su enlace real. */
  const ACTIONS = {
    llamar: (el) => el.setAttribute("href", phoneHref()),
    whatsapp: (el) => setExternal(el, whatsappHref()),
    maps: (el) => setExternal(el, mapsHref()),
    resena: (el) => setExternal(el, reviewHref()),
    // Con sistema de reservas configurado, RESERVAR CITA abre Booksy;
    // sin él, sigue llevando a la sección Reserva (#reserva).
    reservar: (el) => {
      if (hasBooking()) setExternal(el, cfg.booking.url.trim());
    },
    // Botón "RESERVAR CITA ONLINE" de la sección Reserva: solo existe si hay sistema real
    "reserva-online": (el) => {
      if (hasBooking()) {
        setExternal(el, cfg.booking.url.trim());
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    },
  };

  function applyLinks() {
    document.querySelectorAll("[data-action]").forEach((el) => {
      const apply = ACTIONS[el.dataset.action];
      if (apply) apply(el);
    });
  }

  function setYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------- Arranque ---------- */

  const MODULES = ["nav", "animations", "status"];

  function start() {
    try {
      applyLinks();
      setYear();
    } catch (err) {
      console.error("[AndrewSalon] Error aplicando la configuración:", err);
    }

    // Un fallo en un módulo no impide que arranquen los demás
    MODULES.forEach((name) => {
      try {
        if (AS[name] && typeof AS[name].init === "function") AS[name].init();
      } catch (err) {
        console.error("[AndrewSalon] Error iniciando el módulo " + name + ":", err);
      }
    });
  }

  // Los scripts "defer" se ejecutan con readyState "interactive", antes de DOMContentLoaded
  // y antes de que carguen nav.js, animations.js y status.js. Por eso se espera al evento.
  if (document.readyState === "complete") {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }
})(window.AndrewSalon);
