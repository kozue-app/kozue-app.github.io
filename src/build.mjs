// Genera kozue.app: /<idioma>/index.html (13 idiomas), / (elige el idioma del sistema o inglés), la política de
// privacidad (/es/privacy.html y /en/privacy.html, desde src/privacy.*.md), el aviso legal (/impressum.html) y la 404.
//   node src/build.mjs
// La salida se sube tal cual (GitHub Pages sirve la raíz del repo). Sin dependencias.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, NATIVE, RTL, T } from './strings.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://kozue.app';
// Cuando estén publicados, a true: salen los botones de la Store y el comando de winget en la portada.
const STORE_LIVE = false;
const WINGET_LIVE = false;
const STORE_URL = 'https://apps.microsoft.com/detail/9N1N12TKRVL7';
const RELEASES = 'https://github.com/kozue-app/kozue/releases/latest';
const LANG_KEY = 'kozue-web-lang';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (rel, html) => {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
};
const shots = (l) => (l === 'es' ? 'es' : 'en');

// Cabecera común: idioma, título, descripción, enlaces a las otras versiones y tarjeta para redes.
function head(l, { title, description, pathFor, alternates = LANGS, ogImage = true }) {
  const t = T[l] || T.en;
  const alt = alternates.map((a) => `<link rel="alternate" hreflang="${a}" href="${SITE}${pathFor(a)}">`).join('\n');
  return `<!doctype html>
<html lang="${l}"${RTL.has(l) ? ' dir="rtl"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${pathFor(l)}">
${alt}
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${pathFor(l)}">
${ogImage ? `<meta property="og:image" content="${SITE}/assets/img/og.jpg">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<meta name="theme-color" content="#13213f">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/img/icono-300.png">
<link rel="stylesheet" href="/assets/fonts.css">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<a class="skip" href="#contenido">${l === 'es' ? 'Ir al contenido' : 'Skip to content'}</a>
<header class="top">
  <div class="wrap">
    <a class="brand" href="/${l}/"><img src="/assets/img/icono-71.png" alt="" width="30" height="30">Kozue</a>
    <nav class="nav" aria-label="Kozue">
      <a href="/${l}/#funciones">${esc(t.navFeatures)}</a>
      <a href="/${l}/#descargar">${esc(t.navDownload)}</a>
      <a href="/${t.privacyPage}/privacy.html">${esc(t.navPrivacy)}</a>
      <a href="https://github.com/kozue-app/kozue">GitHub</a>
      <label class="lang"><span class="skip">${esc(t.language)}</span>
        <select id="lang" aria-label="${esc(t.language)}" data-path="${esc(pathFor('{l}'))}">
          ${alternates.map((a) => `<option value="${a}" lang="${a}"${a === l ? ' selected' : ''}>${esc(NATIVE[a])}</option>`).join('')}
        </select>
      </label>
    </nav>
  </div>
</header>
<main id="contenido">`;
}

function foot(l, pathFor, alternates = LANGS) {
  const t = T[l] || T.en;
  return `</main>
<footer>
  <div class="wrap">
    <span>© 2026 Yukio Mizuta</span>
    <a href="/${t.privacyPage}/privacy.html">${esc(t.navPrivacy)}</a>
    <a href="/impressum.html">${esc(t.impressum)}</a>
    <a href="https://github.com/kozue-app/kozue/issues">${esc(t.report)}</a>
    <span>${esc(t.contact)}: <span class="mail">hello@kozue.app</span></span>
    <nav class="langs" aria-label="${esc(t.language)}">${alternates.map((a) => `<a href="${pathFor(a)}" lang="${a}" hreflang="${a}">${esc(NATIVE[a])}</a>`).join('')}</nav>
  </div>
</footer>
<script>
  // Al elegir idioma: se recuerda (solo en este navegador) y se va a esa versión.
  document.getElementById('lang').addEventListener('change', (ev) => {
    const l = ev.target.value;
    try { localStorage.setItem('${LANG_KEY}', l); } catch {}
    location.href = ev.target.dataset.path.replace('{l}', l);
  });
  document.querySelectorAll('.langs a').forEach((a) => a.addEventListener('click', () => { try { localStorage.setItem('${LANG_KEY}', a.lang); } catch {} }));
  const copy = document.getElementById('copy');
  if (copy) copy.addEventListener('click', async () => {
    const code = document.getElementById('winget');
    try { await navigator.clipboard.writeText(code.textContent); copy.textContent = copy.dataset.copied; }
    catch { const r = document.createRange(); r.selectNodeContents(code); const s = getSelection(); s.removeAllRanges(); s.addRange(r); copy.textContent = copy.dataset.selected; }
    setTimeout(() => { copy.textContent = copy.dataset.label; }, 1800);
  });
</script>
</body>
</html>
`;
}

function home(l) {
  const t = T[l];
  const s = shots(l);
  const kbd = (k) => `<kbd>${esc(k)}</kbd>`;
  const keyboardP = esc(t.keyboardP).replace('{j}', kbd('j')).replace('{k}', kbd('k')).replace('{space}', kbd(t.space)).replace('{m}', kbd('m'));
  const wingetCmd = '<code dir="ltr">winget upgrade</code>';
  const pathFor = (a) => `/${a}/`;
  const services = ['Miniflux', 'FreshRSS', 'Inoreader', 'Feedbin', 'Nextcloud News', 'NewsBlur', 'Tiny Tiny RSS', 'The Old Reader', t.apiGR, t.apiFever];
  const heroActions = STORE_LIVE
    ? `<a class="btn primary" href="${STORE_URL}">${esc(t.storeBtn)} <small>${esc(t.free)}</small></a>
          <a class="btn ghost" href="${RELEASES}">${esc(t.installerBtn)}</a>`
    : `<a class="btn primary" href="${RELEASES}">${esc(t.installerBtn)} <small>${esc(t.free)}</small></a>`;
  const heroWinget = WINGET_LIVE
    ? `<div class="cmd"><code id="winget" dir="ltr">winget install Kozue.Kozue</code><button type="button" id="copy" data-label="${esc(t.copy)}" data-copied="${esc(t.copied)}" data-selected="${esc(t.selected)}">${esc(t.copy)}</button></div>`
    : '';
  const soon = (live) => (live ? '' : ` <span class="soon">${esc(t.soon)}</span>`);
  return head(l, { title: t.title, description: t.description, pathFor }) + `
  <section class="hero">
    <div class="wrap">
      <div>
        <p class="kicker">${esc(t.kicker)}</p>
        <h1><span class="k" lang="ja">梢</span>${esc(t.h1)}</h1>
        <p class="lede">${esc(t.lede)}</p>
        <div class="actions">
          ${heroActions}
        </div>
        ${heroWinget}
      </div>
      <figure class="shot">
        <img src="/assets/img/oscuro-${s}.jpg" width="1600" height="900" alt="${esc(t.darkAlt)}">
      </figure>
    </div>
  </section>

  <section class="band" aria-labelledby="modos">
    <div class="wrap">
      <h2 id="modos">${esc(t.modesH)}</h2>
      <p class="intro">${esc(t.modesIntro)}</p>
      <div class="modes">
        <div class="mode">
          <h3>${esc(t.localH)}</h3>
          <p>${esc(t.localP)}</p>
          <div class="feed" dir="ltr">&lt;link rel="alternate" type="application/rss+xml"
      href="<b>/feed.xml</b>"&gt;</div>
        </div>
        <div class="mode">
          <h3>${esc(t.serviceH)}</h3>
          <p>${esc(t.serviceP)}</p>
          <ul class="services">${services.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </section>

  <section class="band" id="funciones" aria-labelledby="funciones-t">
    <div class="wrap">
      <h2 id="funciones-t">${esc(t.featuresH)}</h2>
      <div class="features">
        <div><h3>${esc(t.fullTextH)}</h3><p>${esc(t.fullTextP)}</p></div>
        <div><h3>${esc(t.offlineH)}</h3><p>${esc(t.offlineP)}</p></div>
        <div><h3>${esc(t.timelineH)}</h3><p>${esc(t.timelineP)}</p></div>
        <div><h3>${esc(t.mediaH)}</h3><p>${esc(t.mediaP)}</p></div>
        <div><h3>${esc(t.keyboardH)}</h3><p>${keyboardP}</p></div>
        <div><h3>${esc(t.langsH)}</h3><p>${esc(t.langsP)}</p></div>
      </div>
    </div>
  </section>

  <section class="band" aria-labelledby="temas">
    <div class="wrap split">
      <figure class="shot">
        <img src="/assets/img/claro-${s}.jpg" width="1400" height="788" alt="${esc(t.lightAlt)}" loading="lazy">
        <figcaption>${esc(t.lightCaption)}</figcaption>
      </figure>
      <div class="text">
        <h2 id="temas">${esc(t.themesH)}</h2>
        <p>${esc(t.themesP1)}</p>
        <p>${esc(t.themesP2)}</p>
      </div>
    </div>
  </section>

  <section class="band privacy" id="privacidad" aria-labelledby="priv-t">
    <div class="wrap">
      <div><h2 id="priv-t">${esc(t.privacyH)}</h2></div>
      <ul>
        <li>${esc(t.privacy1)}</li>
        <li>${esc(t.privacy2)}</li>
        <li>${esc(t.privacy3)}</li>
        <li><a href="/${t.privacyPage}/privacy.html">${esc(t.privacyLink)}</a></li>
      </ul>
    </div>
  </section>

  <section class="band" id="descargar" aria-labelledby="dl-t">
    <div class="wrap">
      <h2 id="dl-t">${esc(t.downloadH)}</h2>
      <p class="intro">${esc(t.downloadIntro)}</p>
      <div class="download">
        <div class="dl">
          <h3>${esc(t.storeH)}${soon(STORE_LIVE)}</h3>
          <p>${esc(t.storeP)}</p>
          ${STORE_LIVE ? `<a class="btn primary" href="${STORE_URL}">${esc(t.storeOpen)}</a>` : ''}
        </div>
        <div class="dl">
          <h3>${esc(t.wingetH)}${soon(WINGET_LIVE)}</h3>
          <p>${esc(t.wingetP).replace('{cmd}', wingetCmd)}</p>
          <div class="cmd"><code dir="ltr">winget install Kozue.Kozue</code></div>
        </div>
        <div class="dl">
          <h3>${esc(t.githubH)}</h3>
          <p>${esc(t.githubP)}</p>
          <a class="btn ghost" href="${RELEASES}">${esc(t.githubBtn)}</a>
        </div>
      </div>
      <p class="req">${esc(t.req)}</p>
    </div>
  </section>
` + foot(l, pathFor);
}

// Markdown sencillo de las políticas: títulos ##, párrafos, listas, **negrita**, `código`, [enlaces](url) y saltos «  ».
function md(src) {
  const inline = (s) => esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, txt, url) => `<a href="${url.replace(/^PRIVACY\.es\.md$/, '/es/privacy.html').replace(/^PRIVACY\.md$/, '/en/privacy.html')}">${txt}</a>`);
  const out = [];
  for (const block of src.trim().split(/\n\s*\n/)) {
    const lines = block.split('\n');
    if (/^# /.test(lines[0])) out.push(`<h1>${inline(lines[0].slice(2))}</h1>`);
    else if (/^## /.test(lines[0])) out.push(`<h2>${inline(lines[0].slice(3))}</h2>`);
    else if (lines.every((x) => /^- /.test(x))) out.push(`<ul>${lines.map((x) => `<li>${inline(x.slice(2))}</li>`).join('')}</ul>`);
    else out.push(`<p>${lines.map((x) => inline(x.replace(/ {2}$/, ''))).join(/ {2}$/.test(lines[0]) ? '<br>' : ' ')}</p>`);
  }
  return out.join('\n');
}

function privacy(l) {
  const src = fs.readFileSync(path.join(ROOT, 'src', `privacy.${l}.md`), 'utf8');
  const title = src.match(/^# (.+)$/m)[1];
  const pathFor = (a) => `/${a}/privacy.html`;
  return head(l, { title: `${title}`, description: title, pathFor, alternates: ['es', 'en'], ogImage: false })
    + `\n  <div class="wrap doc"><article>\n${md(src)}\n  </article></div>\n` + foot(l, pathFor, ['es', 'en']);
}

function impressum() {
  const pathFor = () => '/impressum.html';
  const body = `<h1>Impressum</h1>
<p>Angaben gemäß § 5 DDG</p>
<p>Yukio Mizuta (Giovanni Ceballos Contreras)<br>c/o Autorenglück #49349<br>Albert-Einstein-Str. 47<br>02977 Hoyerswerda<br>Deutschland</p>
<p>E-Mail: <span class="mail">hello@kozue.app</span></p>
<h2 lang="en">Legal notice</h2>
<p lang="en">Information pursuant to § 5 of the German Digital Services Act (DDG): see above. Contact by email at hello@kozue.app.</p>
<h2 lang="es">Aviso legal</h2>
<p lang="es">Información según el § 5 de la Ley alemana de servicios digitales (DDG): ver arriba. Contacto por correo en hello@kozue.app.</p>`;
  return head('de', { title: 'Impressum · Kozue', description: 'Impressum', pathFor, alternates: [], ogImage: false })
    .replace(/<select id="lang"[\s\S]*?<\/select>/, '<select id="lang" aria-label="Sprache" data-path="/{l}/">' + LANGS.map((a) => `<option value="${a}" lang="${a}">${esc(NATIVE[a])}</option>`).join('') + '</select>')
    + `\n  <div class="wrap doc"><article>\n${body}\n  </article></div>\n` + foot('de', (a) => `/${a}/`);
}

// La raíz: el idioma elegido antes (si lo hay), si no el del sistema, y si no está entre los 13, inglés.
function root() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kozue</title>
<meta name="description" content="${esc(T.en.description)}">
${LANGS.map((a) => `<link rel="alternate" hreflang="${a}" href="${SITE}/${a}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<link rel="icon" href="/favicon.ico" sizes="any">
<script>
  (function () {
    var L = ${JSON.stringify(LANGS)};
    function pick(list) {
      for (var i = 0; i < list.length; i++) {
        var t = String(list[i] || '').toLowerCase();
        if (t.indexOf('zh') === 0) return /hant|tw|hk|mo/.test(t) ? 'zh-Hant' : 'zh-Hans';
        var p = t.split('-')[0];
        if (L.indexOf(p) >= 0) return p;
      }
      return 'en';
    }
    var saved = null;
    try { saved = localStorage.getItem('${LANG_KEY}'); } catch (e) {}
    var l = L.indexOf(saved) >= 0 ? saved : pick(navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]);
    location.replace('/' + l + '/' + location.hash);
  })();
</script>
</head>
<body>
<noscript>
  <ul>${LANGS.map((a) => `<li><a href="/${a}/" lang="${a}">${esc(NATIVE[a])}</a></li>`).join('')}</ul>
</noscript>
</body>
</html>
`;
}

function notFound() {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Kozue</title>
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/assets/site.css"></head>
<body><main class="wrap doc"><article><h1>404</h1><p><a href="/">kozue.app</a></p></article></main></body>
</html>
`;
}

for (const l of LANGS) write(`${l}/index.html`, home(l));
for (const l of ['es', 'en']) write(`${l}/privacy.html`, privacy(l));
write('impressum.html', impressum());
write('index.html', root());
write('404.html', notFound());
console.log(`${LANGS.length} idiomas, privacidad (es, en), impressum, raíz y 404.`);
