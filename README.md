# Informe de Proyecto — Optometría L.C.

## 📋 Resumen del proyecto

- **Tipo de proyecto:** Landing Page
- **Cliente:** Optometría L.C. — Consultorio de Optometría y Prótesis Oculares
- **Base de trabajo:** El desarrollador construirá sobre una **plantilla base HTML** ya existente, siguiendo la estructura de secciones que dicha plantilla ya define (este documento no propone ni modifica esa estructura).
- **Prompt inicial:** Ya se le compartió al desarrollador un prompt inicial para adaptar la plantilla al negocio. Este README funciona como **brief de negocio complementario**: contiene la información real del cliente, el branding y los requisitos visuales/funcionales obligatorios del proyecto.

---

## 🏢 Información del negocio

Datos extraídos del análisis de las imágenes en `imagenes/`, del sitio web actual (`optometrialc.com`) y de la página de Facebook del negocio.

- **Nombre comercial:** Optometría L.C. (también identificado como "Prótesis Oculares L.C." en material de clínica y redes)
- **Rubro:** Consultorio de Optometría y Prótesis Oculares
- **Slogan principal:** "Recupera la luz en tu mirada: Expertos en prótesis oculares, devolviendo la confianza"
- **Slogan secundario:** "Optometristas creando miradas"
- **Respaldo académico:** El sitio web actual menciona vínculo/formación con la **UNAM**
- **Zonas de atención:** Nezahualcóyotl y Atizapán de Zaragoza, Estado de México (no se encontró una dirección exacta en el material disponible — **confirmar con el cliente** antes de publicarla)
- **Teléfonos / WhatsApp:** 55 7556 5562 y 55 3052 5873
- **Sitio web actual:** optometrialc.com
- **Facebook:** Prótesis Oculares L.C.
- **Horarios de atención:** no especificados en el material disponible — **confirmar con el cliente**

### Servicios y productos

- Exámenes visuales completos
- Evaluación, adaptación y fabricación de prótesis oculares a medida (pintadas a mano)
- Prótesis oculares decorativas/personalizadas (acabados con brillantina, pedrería y diseños especiales)
- Prótesis oculares que brillan en la oscuridad — **servicio diferencial de la marca**, usarlo como gancho visual/comercial
- Lentes correctivos (miopía, hipermetropía, astigmatismo, presbicia)
- Diagnóstico y manejo de enfermedades oculares (cataratas, glaucoma, degeneración macular)
- Terapia visual y rehabilitación
- Educación al paciente sobre cuidado ocular y de la prótesis

---

## 🎨 Branding e identidad visual

Paleta extraída directamente del logo (`imagenes/logo.jpeg`):

| Color | HEX | Uso sugerido |
|---|---|---|
| Dorado brillante | `#F0C878` | Highlights, gradiente del isotipo, detalles |
| Bronce dorado (profundo) | `#A9782E` | Gradiente del isotipo, bordes, iconografía |
| Ámbar cálido | `#D89A3A` | Acentos, CTAs, subrayados, hover states |
| Negro grafito | `#171717` | Tipografía principal, fondos oscuros/contraste |
| Blanco | `#FFFFFF` | Fondo principal, espacios en limpio |

**Tipografía sugerida:**
- **Encabezados / Hero:** Playfair Display (serif elegante, coherente con el trazo caligráfico dorado del logo)
- **Cuerpo de texto / UI:** Poppins o Inter (sans-serif limpia y moderna, refuerza el look "big tech")
- **Uso puntual (opcional):** cursiva/script solo en frases destacadas puntuales, evocando la caligrafía del logo — usar con moderación, no como tipografía de cuerpo.

**Identidad visual:**
- Isotipo: figura estilizada de un ojo/llama en espiral, en degradado dorado metálico (de bronce oscuro a dorado brillante)
- Sensación de marca: precisión médica combinada con calidez humana — el mensaje central es "recuperar la confianza y la mirada"

---

## ✨ Estilo visual obligatorio

El proyecto debe manejar:
- Estilo **premium, enterprise y corporativo de marca**
- Nivel **big tech**: elegante y a la vez minimalista

---

## 🎬 Efectos y animaciones requeridos

El proyecto debe incluir:
- Efectos visuales y **animaciones de scroll**
- **Pantalla de carga (preloader)** con spinner + logo del negocio
- **Animación en el título del hero**: efecto máquina de escribir, cambio de color en las letras, u otro efecto tipográfico equivalente

---

## 🖼️ Instrucciones sobre assets

- El logo (`imagenes/logo.jpeg`) viene **con fondo blanco**: removerlo antes de usarlo en el sitio y exportarlo en PNG o SVG con fondo transparente.
- Varias imágenes de `imagenes/` tienen una **marca de agua semitransparente del isotipo** superpuesta (uso previo en redes sociales). Evaluar si conviene recortarlas o seleccionar zonas limpias antes de usarlas en el sitio.
- Para la parte visual del sitio, priorizar las imágenes de proceso/laboratorio y resultados estéticos (prótesis pintadas a mano, antes/después, brillo en la oscuridad, diseños decorativos) por sobre las imágenes clínicas más crudas (ojos irritados/enrojecidos), que son más apropiadas para material médico que para una landing comercial.
- Las imágenes están en formato `.jpeg` con nombres genéricos de WhatsApp: renombrarlas de forma descriptiva al integrarlas al proyecto y optimizarlas en peso antes de subirlas.

---

## 🔁 Nota para el desarrollador

Puedes iterar sobre el proyecto dándole instrucciones a Claude las veces que sea necesario hasta lograr el resultado deseado. No es necesario acertar todo en la primera pasada.

---

## ✅ Checklist de trabajo

- [ ] Leer este informe junto con el prompt inicial de adaptación de la plantilla
- [ ] Remover el fondo del logo y exportarlo en PNG/SVG transparente
- [ ] Aplicar la paleta de colores de marca (HEX) sobre la plantilla base
- [ ] Aplicar la tipografía sugerida (encabezados y cuerpo)
- [ ] Cargar la información real del negocio (nombre, teléfonos, servicios, slogans)
- [ ] Confirmar con el cliente la dirección exacta y los horarios de atención antes de publicarlos
- [ ] Implementar el preloader con spinner + logo
- [ ] Implementar animaciones de scroll en el sitio
- [ ] Implementar la animación del título del hero (máquina de escribir / cambio de color / efecto tipográfico)
- [ ] Seleccionar, recortar (si tienen marca de agua) y optimizar las imágenes de `imagenes/` para el sitio
- [ ] Revisar responsividad en mobile, tablet y desktop
- [ ] Iterar con Claude Code hasta validar el resultado final con el cliente
