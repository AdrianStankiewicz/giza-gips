// ─── HEADER SCROLL ───────────────────────────────────────────
const header = document.getElementById('header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40)
})

// ─── HAMBURGER MENU ──────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('open')
})
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu').classList.remove('open')
  })
})

// ─── LIGHTBOX ────────────────────────────────────────────────
const items = Array.from(document.querySelectorAll('.gallery-item'))
const lightbox = document.getElementById('lightbox')
const lbImg = document.getElementById('lb-img')
const lbCounter = document.getElementById('lb-counter')
let lbIndex = 0

function lbOpen(i) {
  lbIndex = i
  lbImg.src = items[i].src
  lbCounter.textContent = `${i + 1} / ${items.length}`
  lightbox.classList.add('open')
  document.body.style.overflow = 'hidden'
}
function lbClose() {
  lightbox.classList.remove('open')
  document.body.style.overflow = ''
}
function lbGo(dir) {
  lbIndex = (lbIndex + dir + items.length) % items.length
  lbImg.src = items[lbIndex].src
  lbCounter.textContent = `${lbIndex + 1} / ${items.length}`
}

items.forEach((img, i) => img.addEventListener('click', () => lbOpen(i)))
document.getElementById('lb-close').addEventListener('click', lbClose)
document.getElementById('lb-next').addEventListener('click', () => lbGo(1))
document.getElementById('lb-prev').addEventListener('click', () => lbGo(-1))
lightbox.addEventListener('click', e => { if (e.target === lightbox) lbClose() })
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return
  if (e.key === 'ArrowRight') lbGo(1)
  if (e.key === 'ArrowLeft')  lbGo(-1)
  if (e.key === 'Escape')     lbClose()
})

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible')
  })
}, { threshold: 0.12 })
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

// ─── ACTIVE NAV LINK (scroll spy) ────────────────────────────
const navLinks = document.querySelectorAll('nav#menu a[href^="#"]')
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean)

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const id = entry.target.id
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
    })
  })
}, { rootMargin: '-40% 0px -55% 0px' })
sections.forEach(s => spyObserver.observe(s))

// ─── SWIPE SUPPORT (lightbox) ────────────────────────────────
let touchStartX = 0
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX }, { passive: true })
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 50) lbGo(dx < 0 ? 1 : -1)
})
