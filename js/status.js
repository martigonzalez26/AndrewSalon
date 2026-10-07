/* ==========================================================================
   AndrewSalon · status.js
   Horario y estado Abierto / Cerrado.

   Funciona con el horario de config.js (AndrewSalon.config.hours.schedule):
   - Con horario confirmado: calcula "Abierto · Cierra a las…" / "Cerrado · Abre…",
     rellena la lista semanal y se actualiza cada minuto.
   - Sin horario confirmado (situación actual): NO calcula nada ni inventa horas.
     Solo muestra el dato conocido (snapshotText) si showSnapshot es true,
     o no muestra nada si es false.
   ========================================================================== */

(function (AS) {
  "use strict";

  const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const REFRESH_MS = 60 * 1000;

  /* ---------- Lógica pura (sin DOM, fácil de probar) ---------- */

  function toMinutes(hhmm) {
    const parts = hhmm.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  // true si al menos un día tiene horario confirmado (array, aunque sea vacío = cerrado)
  function hasSchedule(schedule) {
    return !!schedule && Object.keys(schedule).some((day) => Array.isArray(schedule[day]));
  }

  /* Estado en un instante dado.
     now = { day: 0-6, minutes: minutos desde las 00:00 }
     Devuelve { state: "open" | "closed" | "unknown", closesAt?, next? }
     next = { dayOffset, time }  (dayOffset 0 = hoy, 1 = mañana…) */
  function getState(schedule, now) {
    const today = schedule && schedule[now.day];
    if (!Array.isArray(today)) return { state: "unknown" };

    for (const interval of today) {
      if (now.minutes >= toMinutes(interval[0]) && now.minutes < toMinutes(interval[1])) {
        return { state: "open", closesAt: interval[1] };
      }
    }

    const laterToday = today.find((interval) => toMinutes(interval[0]) > now.minutes);
    if (laterToday) return { state: "closed", next: { dayOffset: 0, time: laterToday[0] } };

    for (let offset = 1; offset <= 7; offset++) {
      const day = schedule[(now.day + offset) % 7];
      if (!Array.isArray(day)) return { state: "closed" }; // día sin confirmar: no se adivina
      if (day.length) return { state: "closed", next: { dayOffset: offset, time: day[0][0] } };
    }
    return { state: "closed" };
  }

  function describe(result, now) {
    if (result.state === "open") return "Abierto · Cierra a las " + result.closesAt;
    if (result.state === "closed" && result.next) {
      const { dayOffset, time } = result.next;
      if (dayOffset === 0) return "Cerrado · Abre a las " + time;
      if (dayOffset === 1) return "Cerrado · Abre mañana a las " + time;
      return "Cerrado · Abre el " + DAY_NAMES[(now.day + dayOffset) % 7] + " a las " + time;
    }
    if (result.state === "closed") return "Cerrado";
    return "";
  }

  function formatDay(intervals) {
    if (!Array.isArray(intervals)) return "—";
    if (!intervals.length) return "Cerrado";
    return intervals.map((i) => i[0] + " – " + i[1]).join(" / ");
  }

  // Día y hora actuales en la zona horaria del negocio (no la del visitante)
  function currentTime(timezone) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());

    const get = (type) => parts.find((p) => p.type === type).value;
    return {
      day: WEEKDAY_INDEX[get("weekday")],
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
  }

  /* ---------- DOM ---------- */

  function renderList(list, schedule, today) {
    list.querySelectorAll("li[data-day]").forEach((item) => {
      const day = Number(item.dataset.day);
      item.querySelector("[data-hours]").textContent = formatDay(schedule[day]);
      item.classList.toggle("is-today", day === today);
      if (day === today) item.setAttribute("aria-current", "date");
      else item.removeAttribute("aria-current");
    });
    list.hidden = false;
  }

  function init() {
    const statusEl = document.getElementById("hours-status");
    const listEl = document.getElementById("hours-list");
    const hours = AS.config && AS.config.hours;
    if (!statusEl || !hours) return;

    // Sin horario confirmado: nada que calcular, nada que inventar
    if (!hasSchedule(hours.schedule)) {
      if (hours.showSnapshot && hours.snapshotText) statusEl.textContent = hours.snapshotText;
      else statusEl.hidden = true;
      return;
    }

    function update() {
      const now = currentTime(hours.timezone);
      const result = getState(hours.schedule, now);
      const text = describe(result, now);

      if (text) {
        statusEl.textContent = text;
        statusEl.classList.toggle("is-closed", result.state === "closed");
        statusEl.hidden = false;
      } else if (hours.showSnapshot && hours.snapshotText) {
        statusEl.textContent = hours.snapshotText;
        statusEl.classList.remove("is-closed");
      } else {
        statusEl.hidden = true;
      }

      if (listEl) renderList(listEl, hours.schedule, now.day);
    }

    update();
    window.setInterval(update, REFRESH_MS);
  }

  AS.status = {
    init: init,
    // Expuestas para poder probarlas
    hasSchedule: hasSchedule,
    getState: getState,
    describe: describe,
  };
})(window.AndrewSalon);
