import { useEffect, useRef } from 'react'

export const Hd = ({ rv, children }) => (
  <h2 className={'hd' + (rv ? ' rv' : '')}><span className="hm"><span>{children}</span></span></h2>
)

export function Dock({ route }) {
  const ref = useRef()
  const kids = () => [...ref.current.children]
  const move = e => kids().forEach(b => {
    const r = b.getBoundingClientRect(), f = Math.max(0, 1 - Math.abs(e.clientX - (r.left + r.width / 2)) / 110)
    b.style.transform = `translateY(${-10 * f}px) scale(${1 + .45 * f})`
  })
  const leave = () => kids().forEach(b => (b.style.transform = ''))
  const theme = () => {
    const r = document.documentElement
    const dark = r.dataset.theme ? r.dataset.theme === 'dark' : !matchMedia('(prefers-color-scheme:light)').matches
    r.dataset.theme = dark ? 'light' : 'dark'
  }
  const L = [['home', 'Home', '⌂', ''], ['about', 'About', '☺', 'about'], ['projects', 'Projects', '▤', 'projects'], ['contact', 'Contact', '✉', 'contact']]
  return (
    <nav className="dock" ref={ref} onMouseMove={move} onMouseLeave={leave}>
      {L.map(([k, t, i, h]) => <a key={k} href={'#/' + h} data-t={t} className={route === k ? 'on' : ''}>{i}</a>)}
      <button data-t="Theme" aria-label="Ganti tema" onClick={theme}>◐</button>
    </nav>
  )
}

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
// [nama, kode ikon devicon, (1 = ikon hitam, dibalik warnanya di mode gelap)]
const TECH = [['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['HTML5', 'html5'], ['CSS3', 'css3'], ['React', 'react'], ['Next.js', 'nextjs', 1], ['Node.js', 'nodejs'], ['Git', 'git'], ['Figma', 'figma'], ['PostgreSQL', 'postgresql'], ['Python', 'python'], ['Docker', 'docker']]
export function Tech() {
  const r = useRef()
  useEffect(() => {
    let x = 0, ly = scrollY, raf
    const L = () => {
      const v = scrollY - ly; ly = scrollY
      x -= .7 + Math.abs(v) * .5
      const w = r.current.scrollWidth / 2; if (x < -w) x += w
      r.current.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(L)
    }
    L(); return () => cancelAnimationFrame(raf)
  }, [])
  return <div className="tc"><div ref={r}>{[...TECH, ...TECH].map(([n, k, inv], i) => <span key={i} title={n}><img className={inv ? 'inv' : ''} src={`${D}/${k}/${k}-original.svg`} alt={n} draggable="false" /></span>)}</div></div>
}

const CARDS = [['2026 · REACT', 'Orbit Landing'], ['2025 · NEXT', 'Nova Dashboard'], ['2026 · MOTION', 'Aurora Streaming UI']]
export function Stack() {
  const r = useRef()
  useEffect(() => {
    let sp = 0, raf
    const L = () => {
      const b = r.current.getBoundingClientRect()
      const pt = Math.min(1, Math.max(0, 1 - (b.top - innerHeight * .15) / (innerHeight * .7)))
      sp += (pt - sp) * .08
      ;[...r.current.children].forEach((c, i) => {
        const k = 1 - sp
        c.style.transform = `translate3d(${(i - 1) * -46 * k + (i - 1) * -18}px,${(i - 1) * 38 * k + (i - 1) * 34}px,0) rotateX(${24 * k}deg) rotateY(${-22 * k}deg) rotateZ(${-3 * k}deg)`
      })
      raf = requestAnimationFrame(L)
    }
    L(); return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="stk" ref={r}>
      {CARDS.map(([s, t]) => <div className="sc" key={t}><small>{s}</small><h4>{t}</h4><i /></div>)}
    </div>
  )
}

export function Footer() {
  const g = useRef()
  useEffect(() => {
    const mv = e => [...g.current.children].forEach(s => {
      const r = s.getBoundingClientRect()
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
      s.style.opacity = Math.max(.25, 1 - d / 220)
    })
    addEventListener('mousemove', mv)
    return () => removeEventListener('mousemove', mv)
  }, [])
  return (
    <footer>
      <div className="fc">
        <div><div className="lg">RJ</div><p>Less planning, more doing. Building things that matter.</p></div>
        <div><h4>HOME</h4><a href="#/">Home</a><br /><a href="#/projects">Projects</a><br /><a href="#/">Journey</a></div>
        <div><h4>ABOUT</h4><a href="#/about">About</a><br /><a href="#/about">Workflow</a><br /><a href="#/about">Achievements</a></div>
        <div><h4>PROJECTS</h4><a href="#/projects">Projects</a></div>
        <div><h4>CONTACT</h4><a href="#/contact">Contact</a></div>
      </div>
      <div className="fr"><span>© 2026 Raditya Javas. All rights reserved.</span>
        <span><a className="pl" href="#">GitHub ↗</a><a className="pl" href="#">LinkedIn ↗</a><a className="pl" href="#">Instagram ↗</a></span></div>
      <div className="gn" ref={g}>{[...'RADITYA JAVAS'].map((c, i) => <span key={i} style={{ '--i': i }}>{c === ' ' ? '\u00a0' : c}</span>)}</div>
    </footer>
  )
}