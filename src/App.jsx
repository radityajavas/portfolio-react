import { useEffect, useRef, useState } from 'react'
import { Home, About, Projects, Contact } from './pages.jsx'
import { Dock, Footer } from './parts.jsx'
import { reveal } from './utils.js'

const PAGES = { home: Home, about: About, projects: Projects, contact: Contact }
const read = () => location.hash.replace('#/', '') || 'home'

export default function App() {
  const [route, setRoute] = useState(read)
  const wp = useRef(), cur = useRef(), bar = useRef()

  useEffect(() => {
    const on = () => {
      const w = wp.current
      w.classList.remove('run'); void w.offsetWidth; w.classList.add('run')
      setTimeout(() => setRoute(read()), 430)
    }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])

  useEffect(() => { scrollTo(0, 0); reveal() }, [route])

  // kursor halus + progress bar
  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0, sc = 1, tg = 1, raf
    const mm = e => { mx = e.clientX; my = e.clientY; tg = e.target.closest?.('a,button,input,textarea') ? 3.2 : 1 }
    addEventListener('mousemove', mm)
    const L = () => {
      cx += (mx - cx) * .22; cy += (my - cy) * .22; sc += (tg - sc) * .15
      cur.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${sc})`
      bar.current.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`
      raf = requestAnimationFrame(L)
    }
    L()
    return () => { removeEventListener('mousemove', mm); cancelAnimationFrame(raf) }
  }, [])

  // efek global: tombol magnet, kartu miring, parallax hero & foto About
  useEffect(() => {
    const mv = e => {
      const el = e.target.closest?.('.bt,.pl')
      document.querySelectorAll('.bt,.pl').forEach(x => { if (x !== el) x.style.translate = '' })
      if (el) { const r = el.getBoundingClientRect(); el.style.translate = `${(e.clientX - r.left - r.width / 2) * .25}px ${(e.clientY - r.top - r.height / 2) * .35}px` }
      const c = e.target.closest?.('.pi,.jc')
      if (c) { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translate(-4px,-6px)` }
    }
    const out = e => { const c = e.target.closest?.('.pi,.jc'); if (c && !c.contains(e.relatedTarget)) c.style.transform = '' }
    const sc = () => { const h = document.querySelector('.ht'); if (h) h.style.transform = `translateY(${Math.min(scrollY, innerHeight) * .18}px)` }
    let raf
    const Q = () => { document.querySelectorAll('.ph').forEach(p => { const r = p.getBoundingClientRect(); p.style.translate = `0 ${(r.top + r.height / 2 - innerHeight / 2) * -.08}px` }); raf = requestAnimationFrame(Q) }
    Q()
    addEventListener('mousemove', mv); addEventListener('mouseout', out); addEventListener('scroll', sc, { passive: true })
    return () => { removeEventListener('mousemove', mv); removeEventListener('mouseout', out); removeEventListener('scroll', sc); cancelAnimationFrame(raf) }
  }, [])

  const Page = PAGES[route] || Home
  return (
    <>
      <div id="bar" ref={bar} /><div id="cur" ref={cur} /><div id="wp" ref={wp} />
      <Dock route={route} />
      <Page key={route} />
      <Footer />
    </>
  )
}
