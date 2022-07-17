import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "../components/ThemeConfig"

function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setIsMounted(true)
    setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return(
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      {isMounted && <Component {...pageProps} toggleTheme={toggleTheme} theme={theme} />}
    </ThemeProvider>
  )
}

export default App
