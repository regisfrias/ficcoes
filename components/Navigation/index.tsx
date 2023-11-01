import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './navigation.module.css'
import { Chapters } from '../../types'

export default function Navigation({
  chapters,
  toggleTheme,
  toggleLanguage,
  theme,
  translation,
  lang,
  setFontSize
}: {
  chapters: Chapters,
  toggleTheme: Function,
  toggleLanguage: Function,
  theme: string,
  lang: string,
  translation?: string,
  setFontSize: Function
}) {
  const router = useRouter()
  const chapterId = router.query.id
  const path = lang === 'pt' ? '/' : '/en/'
  const [ isOpen, open ] = useState(false)
  const toggleChapters = () => open(!isOpen)
  const [ prevNext, setPrevNext ] = useState<{prev: string | null, next: string | null}>({prev: '', next: ''})

  const linkTo = (route: string | null) => {
    open(false)
    if (route) {
      router.push(route)
    }
  }

  const dispatchTheme = () => {
    toggleTheme()
  }

  const dispatchLanguage = () => {
    // lang here lags behind because it hasn't received this prop from parent when it just sent it, that's why it's flipped
    const locale = lang === 'en' ? '/' : '/en/'
    const path = translation ? locale + translation : locale
    router.push(path)
    toggleLanguage()
  }

  const setFontSizeDirection = (direction: string) => {
    setFontSize(direction)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (chapterId === undefined) {
        setPrevNext({prev: null, next: path + chapters[0].id})
      } else {
        const currentKey = chapters.reduce((prev, curr, i) => curr.id === chapterId ? i : prev, 0)
        const prevObj = currentKey > 0 ? chapters[currentKey - 1] : null
        const nextObj = currentKey < chapters.length ? chapters[currentKey + 1] : null
        const prev = prevObj && prevObj.id ? path + prevObj.id : path
        const next = nextObj && nextObj.id ? path + nextObj.id : null
        setPrevNext({prev, next})
      }
    }
  }, [chapterId, chapters, path])

  return (
    <div className={`${styles.wrapper} ${styles[theme]} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menu_wrapper}>
        <div className={styles.container}>
          <div className={styles.left_nav}>
            <button className={styles.toggleTheme} onClick={() => dispatchTheme()}>Switch theme</button>
            <button className={styles.toggleLanguage} onClick={() => { dispatchLanguage()}}>{lang}</button>
          </div>
          <nav className='quick_nav'>
            <button className={styles.button} onClick={() => linkTo(prevNext.prev)} disabled={!prevNext.prev}>{'❮'}</button>
            <button className={`${styles.toggleMenu} ${styles.button} ${isOpen ? styles.open : ''}`} onClick={() => toggleChapters()}>{isOpen ? 'x' : '='}</button>
            <button className={styles.button} onClick={() => linkTo(prevNext.next)} disabled={!prevNext.next}>{'❯'}</button>
          </nav>
          <div className={styles.setFontSizeDirection}>
            <button className={styles.button} onClick={() => setFontSizeDirection('down')}><span className="small">A</span></button>
            <button className={styles.button} onClick={() => setFontSizeDirection('up')}><span className="large">A</span></button>
          </div>
        </div>
      </div>
      <section className={styles.section}>
        <article>
          <header>
            <h1>{lang === 'pt' ? 'Índice' : 'Index'}</h1>
          </header>
          <ul className={styles.menu}>
            <li className={`ficcoes ${chapterId === undefined ? styles.current : ''}`}><Link className={styles.link} href={path} onClick={() => toggleChapters()}>{lang === 'pt' ? 'Capa' : 'Cover'}</Link></li>
            {chapters ? chapters.map( (chapter: {id: string, title: string, date: string}) =>
              <li key={chapter.id} className={`${chapter.id} ${chapterId === chapter.id ? styles.current : ''}`}><Link className={styles.link} href={`${path + chapter.id}`} onClick={() => toggleChapters()}>{chapter.title}</Link></li>
              ) : null}
          </ul>
        </article>
      </section>
    </div>
  )
}
