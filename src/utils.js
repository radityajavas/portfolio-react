// Observer tunggal: elemen .rv dan .gn mendapat class "in" saat masuk layar
let io
export function reveal() {
  io ??= new IntersectionObserver(
    es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.rv,.gn').forEach(el => io.observe(el))
}
