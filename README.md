# kozue.app

La web de [Kozue](https://github.com/kozue-app/kozue), lector de feeds para Windows. Estática, sin dependencias, publicada con GitHub Pages desde la raíz de `main`.

- `src/strings.mjs`: los textos en los 13 idiomas de Kozue (`es` es el original).
- `src/privacy.es.md` y `src/privacy.en.md`: la política de privacidad (la de la app y la de esta web).
- `src/build.mjs`: genera `/<idioma>/index.html`, `/` (elige el idioma del navegador, o el que se eligió antes, o inglés), `/es/privacy.html`, `/en/privacy.html`, `/impressum.html` y `/404.html`. `STORE_LIVE` y `WINGET_LIVE` muestran los botones de la Microsoft Store y el comando de winget cuando estén publicados.
- `assets/`: estilos, imágenes (capturas con fuentes de ejemplo y grabados de dominio público) y las fuentes, alojadas aquí (SIL OFL 1.1, licencias en `assets/fonts/`) para que la IP de quien visita la web no llegue a Google.

Para cambiar algo: editar `src/`, `node src/build.mjs` y subir también lo generado.
