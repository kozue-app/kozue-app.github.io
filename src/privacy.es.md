# Política de privacidad de Kozue

Última actualización: 22 de noviembre de 2026

[English](PRIVACY.md)

Kozue es un lector de feeds (RSS, Atom, JSON Feed) para Windows. Esta política explica qué datos trata Kozue y adónde van.

**En resumen:** Kozue no tiene servidores propios. No recoge datos de uso, no tiene analítica ni publicidad y no envía nada a quien lo desarrolla. Lo que haces en Kozue se queda en tu PC o va a los servicios que tú eliges.

## Responsable

Yukio Mizuta (Giovanni Ceballos Contreras)  
c/o Autorenglück #49349  
Albert-Einstein-Str. 47  
02977 Hoyerswerda  
Alemania  
Correo: [hello@kozue.app](mailto:hello@kozue.app)

## Qué guarda Kozue en tu PC

En la carpeta de datos de Kozue, en tu cuenta de Windows:

- Tus ajustes y tus cuentas (la dirección del servicio y el usuario).
- Las contraseñas, claves y tokens de tus cuentas, cifrados con la protección de datos de Windows (solo tu usuario de Windows puede descifrarlos).
- Las fuentes, carpetas y artículos: los que Kozue descarga en el modo sin servidor y los que guarda para leer sin conexión.
- Tus etiquetas, enlaces guardados, filtros y la posición de lo que escuchas o ves.
- Un registro de los errores de Kozue (`errores.json`). Puede incluir direcciones de tus servicios o fuentes; Kozue las quita, junto con claves, correos y tu usuario de Windows, antes de enseñarlo o de que lo envíes.

Nada de esto sale de tu PC salvo en los casos de abajo. Al desinstalar Kozue o eliminar una cuenta en Kozue, puedes borrarlo.

## A qué se conecta Kozue

Kozue solo se conecta a lo que tú eliges usar:

- **Tu servicio de feeds** (Miniflux, Feedbin, Inoreader, Nextcloud News u otro), con tus credenciales, para leer y marcar tus artículos. Si usas la sincronización de Kozue, tus etiquetas, enlaces guardados, filtros y canales se guardan en ese mismo servicio. Ese servicio trata tus datos según su propia política.
- **Las webs y feeds a los que te suscribes**: sin servidor, Kozue descarga los feeds y los iconos de las webs directamente. Al pedir el texto completo de un artículo, descarga su página.
- **Lo que incluyen los artículos**: imágenes, audio, vídeo y contenido incrustado (por ejemplo, vídeos de YouTube, que Kozue carga desde `youtube-nocookie.com`) se cargan desde sus servidores al abrir el artículo.
- **YouTube y Twitch**, si añades canales a Directos o una dirección de YouTube: Kozue consulta sus webs para saber qué se emite y para encontrar el feed de un canal.
- **Emisoras de radio y podcasts** que escuchas.
- **Servicios opcionales que configures tú** (Directos y Nostr): Kozue les pide lo que necesitas a través de la dirección que indiques.

En todas estas conexiones, quien recibe la petición ve tu dirección IP y los datos normales de una petición web, como con cualquier navegador. Kozue no añade identificadores propios.

## Informes de errores

Kozue no envía errores por su cuenta. En Ajustes → Diagnóstico puedes ver, copiar o guardar el registro de errores. Con «Enviar a GitHub…» se abre tu navegador con un informe ya escrito (versiones de Kozue y de Windows, idioma, tipo de servicio sin su dirección y los errores, sin datos privados). Lo revisas y lo envías tú, con tu cuenta de GitHub. Los informes son públicos y GitHub los trata según su propia política.

## Descargas y actualizaciones

Si descargas Kozue desde la Microsoft Store, winget o GitHub, Microsoft o GitHub tratan los datos de esa descarga según sus propias políticas. Kozue no recibe esos datos.

## Esta web (kozue.app)

La web kozue.app está alojada en GitHub Pages (GitHub, Inc.). Al visitarla, GitHub recibe tu dirección IP y los datos normales de una petición web para servirte las páginas y proteger el servicio, según su propia política de privacidad. La web no usa cookies, analítica ni contenido de terceros: las fuentes tipográficas se sirven desde la propia web. Si eliges un idioma, se guarda en tu navegador (almacenamiento local) para mostrarte ese idioma la próxima vez; no sale de tu navegador.

## Menores

Kozue no está dirigido a menores de 16 años y no recoge datos de nadie.

## Tus derechos

Como Kozue no envía tus datos a quien lo desarrolla, todo lo que guarda está en tu PC y bajo tu control. Para cualquier pregunta sobre esta política o sobre tus derechos de protección de datos (acceso, rectificación, supresión, oposición…), escribe al correo de arriba. También puedes reclamar ante la autoridad de protección de datos de tu país.

## Cambios

Si esta política cambia, la nueva versión se publicará aquí con su fecha.
