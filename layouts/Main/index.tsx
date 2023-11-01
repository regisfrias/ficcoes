import { ReactNode } from 'react'
import Navigation from '../../components/Navigation'
import { Chapters } from '../../types'
import styles from './main.module.css'

export default function Layout({
  children,
  chapters,
  title,
  toggleTheme,
  toggleLanguage,
  lang,
  translation,
  theme,
  setFontSize,
}: {
  children: ReactNode,
  chapters: Chapters,
  title: string,
  toggleTheme: Function,
  toggleLanguage: Function,
  lang: string,
  translation?: string,
  theme: string,
  setFontSize: Function,
}) {
  return(
    <>
      <Navigation
        chapters={chapters}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        theme={theme}
        translation={translation}
        lang={lang}
        setFontSize={setFontSize}
      />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </>
  )
}
