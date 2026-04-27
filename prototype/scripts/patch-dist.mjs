// patch-dist.mjs
// Patcht dist/index.html für file:// Protokoll-Kompatibilität:
// 1. Entfernt type="module" und crossorigin (Chrome-Blocker)
// 2. Fügt Zurück-Link zur Präsentation ein
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const htmlPath = join(__dirname, '..', 'dist', 'index.html')

let html = readFileSync(htmlPath, 'utf-8')

// 1. ES-Modul-Attribute entfernen, defer hinzufügen (type="module" impliziert defer)
html = html.replace(/ type="module"/g, '')
html = html.replace(/ crossorigin/g, '')
html = html.replace(/<script src=/g, '<script defer src=')

// 2. Zurück-zur-Präsentation Link einfügen (vor </body>)
const backLink = `
  <div id="back-to-presentation" style="
    position:fixed;bottom:16px;right:16px;z-index:9999;
    background:#1B3A6B;color:#fff;border:none;border-radius:10px;
    padding:8px 16px;font-size:12px;font-weight:600;cursor:pointer;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    box-shadow:0 4px 12px rgba(0,0,0,.3);text-decoration:none;
    display:flex;align-items:center;gap:6px;
  " onclick="history.back()">
    ← Zur Präsentation
  </div>`

html = html.replace('</body>', backLink + '\n</body>')

writeFileSync(htmlPath, html)
console.log('dist/index.html: Gepatcht für file:// Kompatibilität (type=module entfernt, Zurück-Link eingefügt)')
