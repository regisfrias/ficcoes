import '../styles/globals.css'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "../components/ThemeConfig"

function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState('light')
  const router = useRouter()
  const [lang, setLang] = useState(router.pathname.includes('en') ? 'en' : 'pt')
  const [fontSize, setFontSize] = useState(18)

  useEffect(() => {
    setIsMounted(true)
    setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  const toggleLanguage = () => {
    setLang( lang === 'pt' ? 'en' : 'pt')
  }

  const updateFontSize = (direction: string) => {
    const amount = direction === 'up' ? 1 : -1;
    setFontSize(fontSize + amount)
  }

  return(
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles fontSize={fontSize} />
      {isMounted &&
        <Component
          {...pageProps}
          toggleTheme={toggleTheme}
          toggleLanguage={toggleLanguage}
          lang={lang}
          theme={theme} setFontSize={updateFontSize}
        />
      }
    </ThemeProvider>
  )
}

export default App
