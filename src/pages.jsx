import { Fragment, useEffect, useRef, useState } from 'react'
import { Hd, Tech, Stack } from './parts.jsx'
import foto1 from './assets/foto1.jpg'
import foto2 from './assets/foto2.jpg'

const JOURNEY = [['I', 'Early Years', '2015 - 2021', 'Tempat rasa penasaran pertama kali muncul. Ganti dengan ceritamu.'], ['II', 'First Lines of Code', '2021 - 2024', 'Mulai mengenal teknologi dan pemrograman. Ganti dengan ceritamu.'], ['III', 'Building for Real', '2024 - Present', 'Mengerjakan proyek nyata dan ikut kompetisi. Ganti dengan ceritamu.']]

export function Home() {
  return (
    <section className="pg">
      <div className="hero">
        <div className="hp"><img src={foto2} alt="Foto Radit" /></div>
        <div className="ht">
          <h1>{['Less', 'planning,', 'more', 'doing.'].map((w, i) => (
            <Fragment key={i}>{i > 0 && ' '}<span className="wm"><span className="w" style={{ '--i': i }}>{w === 'doing.' ? <mark>{w}</mark> : w}</span></span></Fragment>
          ))}</h1>
          <div className="nm">RADITYA JAVAS</div>
        </div>
      </div>
      <Tech />
      <div className="pv">
        <div><h2 className="rv">Less talk,<br /><span className="sq">more project.</span></h2><a className="bt rv" href="#/projects">SEE MORE →</a></div>
        <Stack />
      </div>
      <div className="jr"><small>MY JOURNEY</small><Hd rv>Every moment is counts</Hd>
        <div className="g3">{JOURNEY.map(([r, t, y, p]) => (
          <div className="bx jc rv" key={r}><span className="r">{r}</span><h3>{t}</h3><em>{y}</em><p>{p}</p></div>
        ))}</div>
      </div>
    </section>
  )
}

const WORDS = ['tech', 'knowledge', 'impact', 'magic']
const FLOW = [
  ['01', 'Discover', 'Memahami kebutuhan, pengguna, dan tujuan proyek sebelum menyentuh kode.', ['RISET', 'WIREFRAME']],
  ['02', 'Design', 'Menerjemahkan ide jadi tampilan dan prototipe yang bisa langsung dicoba.', ['FIGMA', 'PROTOTIPE']],
  ['03', 'Build', 'Menulis kode yang bersih, cepat, dan mudah dirawat dengan React.', ['REACT', 'CSS']],
  ['04', 'Launch', 'Menguji di banyak perangkat, mengoptimalkan, lalu merilis.', ['TEST', 'DEPLOY']],
]
// [tahun, judul, jenis (Competition / Training), deskripsi, gambar sertifikat (opsional)]
const ACH = [
  ['2026', 'Nama Kompetisi 2026', 'Competition', 'Tulis hasilmu di sini, misalnya juara berapa dan tingkat apa.'],
  ['2025', 'Lomba Tingkat Kota', 'Competition', 'Tulis hasilmu di sini, misalnya juara berapa dan tingkat apa.'],
  ['2025', 'Bootcamp Coding', 'Training', 'Pelatihan intensif membangun aplikasi web dari nol.'],
  ['2025', 'Pelatihan Talent', 'Training', 'Program pengembangan talenta di bidang teknologi.'],
  ['2025', 'Training AI', 'Training', 'Belajar dasar kecerdasan buatan dan cara memakainya.'],
  ['2024', 'Kelas Pemrograman', 'Training', 'Kelas pertama yang mengenalkan logika pemrograman.'],
]

export function About() {
  const [wi, setWi] = useState(0), [off, setOff] = useState(false)
  const ms = useRef(), dg = useRef({ on: false, x: 0, l: 0 }), [mp, setMp] = useState(0)
  const stop = () => { dg.current.on = false; ms.current?.classList.remove('drag') }
  useEffect(() => {
    let t2
    const t = setInterval(() => { setOff(true); t2 = setTimeout(() => { setWi(i => (i + 1) % WORDS.length); setOff(false) }, 300) }, 2400)
    return () => { clearInterval(t); clearTimeout(t2) }
  }, [])
  return (
    <section className="pg pad">
      <div className="ab1">
        <div className="ph rv"><img src={foto1} alt="Foto Raditya Javas" /></div>
        <div><span className="lb">ABOUT ME</span>
          <h2>A creator who wants to build <span className={'cw' + (off ? ' o' : '')}>{WORDS[wi]}</span></h2>
          <p>Passionate about <b>technology</b> and building software that matters. Always learning, always growing, always adapting.</p></div>
      </div>
      <span className="lb">WORKFLOW</span><Hd rv>How I work</Hd>
      <ol className="stp rv">{FLOW.map(([n, t, p, c], i) => (
        <li key={n} style={{ '--k': i }}><span className="stp-n">{n}</span><h3>{t}</h3><p>{p}</p>
          <div className="stp-c">{c.map(x => <s key={x}>{x}</s>)}</div></li>
      ))}</ol>
      <span className="lb">ACHIEVEMENTS</span><Hd rv>competitions</Hd>
      <div className="ms rv" ref={ms}
        onScroll={e => { const t = e.currentTarget; setMp(t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth)) }}
        onPointerDown={e => { if (e.pointerType !== 'mouse') return; dg.current = { on: true, x: e.clientX, l: ms.current.scrollLeft }; ms.current.classList.add('drag') }}
        onPointerMove={e => { if (dg.current.on) ms.current.scrollLeft = dg.current.l - (e.clientX - dg.current.x) }}
        onPointerUp={stop} onPointerLeave={stop}>
        {ACH.map(([y, t, k, d, img]) => (
          <div className="mc" key={t} style={k === 'Competition' ? { '--c1': '#4db8d4', '--c2': '#1f5f73' } : { '--c1': '#7a6cf0', '--c2': '#3a2f9e' }}>
            <div className="mc-im">{img ? <img src={img} alt={t} draggable="false" /> : (k === 'Competition' ? '★' : '✦')}</div>
            <div className="mc-top"><span className={'tg' + (k === 'Competition' ? ' c' : '')}>{k}</span><span className="mc-y">{y}</span></div>
            <h3>{t}</h3><p>{d}</p>
          </div>
        ))}
      </div>
      <div className="ms-bar"><i style={{ transform: `scaleX(${.15 + .85 * mp})` }} /></div>
      <span className="ms-hint">GESER →</span>
    </section>
  )
}

// [judul, deskripsi, tahun, warna1, warna2, tags, gambar (opsional)]
const P = [
  ['Orbit Landing', 'Landing page interaktif dengan motion dan scroll yang halus.', '2026', '#7a6cf0', '#3a2f9e', ['REACT', 'CSS', 'MOTION']],
  ['Aurora Streaming', 'Dashboard streaming musik dengan transisi antar halaman.', '2025', '#e08a5c', '#8d3b2a', ['REACT', 'API', 'UI/UX']],
  ['Lumen Studio', 'Situs studio foto dengan layout editorial dan galeri.', '2026', '#4db8d4', '#1f5f73', ['HTML', 'CSS', 'JS']],
  ['Nova Dashboard', 'Admin dashboard analitik dengan grafik dan tabel data.', '2025', '#6bd29a', '#1f6b46', ['REACT', 'CHART', 'NODE']],
  ['Pixel Dungeon', 'Game 2D berbasis web dengan karakter dan level.', '2024', '#d95a8a', '#6b1f3e', ['JS', 'CANVAS']],
  ['Cipher Tool', 'Aplikasi enkripsi sederhana untuk belajar algoritma.', '2024', '#8a8fb0', '#444a66', ['JS', 'LOGIC']],
]

export function Projects() {
  const [a, setA] = useState(0)
  const p = P[a]
  const slug = p[0].split(' ')[0]
  return (
    <section className="pg pad">
      <span className="lb">MY WORK</span><Hd>Projects</Hd>
      <p style={{ color: 'var(--mut)', maxWidth: '60ch', lineHeight: 1.8 }}>
        Arahkan kursor ke judul proyek untuk melihat preview-nya.
      </p>
      <div className="sw">
        <div className="sw-view" style={{ '--c1': p[3], '--c2': p[4] }}>
          <div className="sw-win">
            <div className="sw-bar"><i /><i /><i /><span>raditya.dev/{slug.toLowerCase()}</span></div>
            <div className="sw-body" key={a}>{p[6] ? <img src={p[6]} alt={p[0]} /> : slug.toUpperCase()}</div>
          </div>
          <div className="sw-info" key={'i' + a}>
            <p>{p[1]}</p>
            <div className="sw-tags">{p[5].map(t => <span key={t}>{t}</span>)}</div>
            <a className="bt" href="#">VIEW PROJECT ↗</a>
          </div>
        </div>
        <ul className="sw-list">
          {P.map((q, i) => (
            <li key={q[0]}>
              <button className={i === a ? 'on' : ''} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span><b>{q[0]}</b><em>{q[2]}</em>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section className="pg pad">
      <span className="lb">GET IN TOUCH</span><Hd>Contact</Hd>
      <div className="cg">
        <div>
          <div className="bx"><span className="lb">INFO</span><p style={{ marginTop: 12, lineHeight: 2 }}>✉ radityajr80@gmail.com<br />⌖ Indonesia</p></div>
          <div className="bx"><span className="lb">SOCIAL</span><div style={{ marginTop: 12 }}>
            {['GitHub', 'LinkedIn', 'WhatsApp', 'Instagram'].map(s => <a className="pl" href="#" key={s}>{s} ↗</a>)}</div></div>
        </div>
        <form className="bx" onSubmit={e => { e.preventDefault(); setSent(true) }}>
          <label>NAME</label><input placeholder="Your name" />
          <label>EMAIL</label><input type="email" placeholder="you@email.com" />
          <label>MESSAGE</label><textarea placeholder="Tell me about your project..." />
          <button className="bt">{sent ? 'Terkirim ✓' : 'Send Message →'}</button>
        </form>
      </div>
    </section>
  )
}