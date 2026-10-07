# AndrewSalon

Web oficial de **AndrewSalon**, barbería en Santa Maria de Palautordera (Barcelona).

Construida con **HTML + CSS + JavaScript puros**, sin librerías ni herramientas de compilación.

> Estado: **Paso 4 completado** (HTML, CSS y JavaScript). Pendiente: datos reales (fotos, horarios, dominio) y revisión final.

## Estructura

```
AndrewSalon/
├── index.html          Página principal (todas las secciones y SEO)
├── robots.txt          Reglas para buscadores
├── sitemap.xml         Mapa del sitio (pendiente de dominio)
├── css/
│   ├── base.css        Colores, tipografías y reglas generales
│   ├── layout.css      Contenedores, rejillas y adaptación responsive
│   ├── components.css  Botones, tarjetas, estrellas, menú
│   └── sections.css    Estilos propios de cada sección
├── js/
│   ├── config.js       Datos del negocio (teléfono, dirección, enlaces)
│   ├── main.js         Arranque y enlaces generados desde config.js
│   ├── nav.js          Menú móvil y cabecera al hacer scroll
│   ├── animations.js   Animaciones sutiles al hacer scroll
│   └── status.js       Horario y estado Abierto/Cerrado
└── assets/
    ├── images/
    │   ├── hero/       Foto principal (pendiente)
    │   └── gallery/    Fotos de trabajos (pendiente)
    ├── icons/          Favicon
    └── fonts/          Tipografías locales (opcional)
```

## Cómo ver la web

Basta con abrir `index.html` en el navegador (doble clic). No necesita instalar nada.

Los datos del negocio (teléfono, WhatsApp, dirección, horario, URL de reservas) se editan en `js/config.js`.

## Datos del negocio

- **Nombre:** AndrewSalon
- **Categoría:** Barbería
- **Valoración:** 5,0/5 · 77 reseñas
- **Dirección:** Plaça Major, 18, 08460 Santa Maria de Palautordera, Barcelona
- **Teléfono:** 687 39 50 09
- **Código de ubicación:** MCVV+5X Santa Maria de Palautordera
- **Horario:** martes a sábado de 10:00 a 20:30 · domingo y lunes cerrado

## Pendiente de completar

- [ ] **Fotos reales** del local y de los trabajos (`assets/images/`). Hasta entonces se usarán placeholders claramente identificados; no se usarán fotos de stock.
- [ ] **Dominio definitivo**: completar la URL canónica en `index.html` y `sitemap.xml`.
- [x] **Horario completo** (en `js/config.js`).
- [ ] **Precios reales** de los servicios (no se muestran hasta tenerlos).
- [ ] **Sistema de reservas real**: añadir su URL en `js/config.js`.
- [ ] Confirmar que **687 39 50 09 tiene WhatsApp** activo.
- [ ] Imagen para compartir en redes (`assets/images/og-image.jpg`).

## Principios del proyecto

- No se inventan datos: precios, horarios, reseñas, premios ni cifras que no sean reales.
- Solo se usan las reseñas reales proporcionadas.
- Prioridad a la experiencia móvil.

## Hoja de ruta

1. ✅ Estructura de carpetas y archivos
2. ✅ `index.html` con contenido y SEO
3. ✅ Estilos (móvil primero)
4. ✅ JavaScript (menú, scroll suave, animaciones, estado del horario)
5. ⏳ Revisión y ajustes
