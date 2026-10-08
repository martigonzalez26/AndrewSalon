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

  // Sistema de reservas online (Booksy). Todos los botones "RESERVAR CITA" abren este
  // enlace en una pestaña nueva. Si se deja vacío, vuelven a llevar a la sección Reserva.
  booking: {
    url: "https://booksy.com/es-es/154915_andrewsalon_barberia_49547_santa-maria-de-palautordera#ba_s=sh_1",
  },

  // Reseñas: el botón "DEJAR UNA RESEÑA" abre la ficha de AndrewSalon en Google Maps.
  // Si se deja vacío, abre una búsqueda de Google Maps con el nombre y la dirección.
  reviews: {
    writeUrl: "https://www.google.com/maps/place/AndrewSalon/@41.692982,2.4424067,1465m/data=!3m1!1e3!4m6!3m5!1s0x12a4cdb7ac4315e3:0x6d13019258c4193c!8m2!3d41.692982!4d2.4449816!16s%2Fg%2F11mlyhsyb3?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D",
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
