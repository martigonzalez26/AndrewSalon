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
    //   [["09:00", "20:30"]]          -> abierto en ese tramo
    //   [["09:00", "13:30"], ["16:00", "20:30"]]  -> horario partido
    // No rellenar hasta tener los horarios reales.
    schedule: {
      1: null, // lunes
      2: null, // martes
      3: null, // miércoles
      4: null, // jueves
      5: null, // viernes
      6: null, // sábado
      0: null, // domingo
    },

    // Mientras no haya horario confirmado, la web muestra el único dato conocido
    // (tomado de Google en un momento concreto). Pon showSnapshot en false para
    // ocultarlo y no mostrar nada hasta tener el horario real.
    showSnapshot: true,
    snapshotText: "Abierto · Cierra a las 20:30",
  },
};
