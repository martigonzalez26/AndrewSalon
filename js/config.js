/* ==========================================================================
   AndrewSalon · config.js
   Datos del negocio en un solo sitio. Edita aquí y se actualiza en toda la web.
   Solo datos reales: lo que no se conoce se deja en null / vacío.
   ========================================================================== */

window.AndrewSalon = window.AndrewSalon || {};

window.AndrewSalon.config = {
  name: "AndrewSalon",

  phone: {
    display: "687 39 50 09",
    e164: "+34687395009", // formato internacional para los enlaces tel:
  },

  whatsapp: {
    // Mismo número que el teléfono. Confirmar que tiene WhatsApp activo.
    number: "34687395009", // sin "+" ni espacios
    message: "Hola, quiero reservar una cita en AndrewSalon.",
  },

  address: {
    street: "Plaça Major, 18",
    postalCode: "08460",
    city: "Santa Maria de Palautordera",
    province: "Barcelona",
    country: "España",
    plusCode: "MCVV+5X Santa Maria de Palautordera",
  },

  // Enlace de Google Maps. Si es null se genera a partir de la dirección.
  mapsUrl: null,

  // Sistema de reservas online. Vacío = todavía no existe (el botón queda oculto).
  // Cuando haya uno real, pon aquí su URL completa, por ejemplo "https://..."
  booking: {
    url: "",
  },

  hours: {
    timezone: "Europe/Madrid",

    // Horario semanal CONFIRMADO. Clave = día (0 = domingo, 1 = lunes … 6 = sábado).
    //   null                          -> día sin confirmar (no se muestra nada)
    //   []                            -> cerrado ese día
    //   [["10:00", "20:30"]]          -> abierto en ese tramo
    //   [["09:00", "13:30"], ["16:00", "20:30"]]  -> horario partido
    schedule: {
      1: [], // lunes: cerrado
      2: [["10:00", "20:30"]], // martes
      3: [["10:00", "20:30"]], // miércoles
      4: [["10:00", "20:30"]], // jueves
      5: [["10:00", "20:30"]], // viernes
      6: [["10:00", "20:30"]], // sábado
      0: [], // domingo: cerrado
    },

    // Solo se usa si algún día no tuviera horario confirmado (null): entonces se
    // mostraría este dato puntual de Google. Con el horario completo no se usa.
    showSnapshot: false,
    snapshotText: "Abierto · Cierra a las 20:30",
  },
};
