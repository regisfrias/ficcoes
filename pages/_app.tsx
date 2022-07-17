import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components"
import styled from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from "../components/ThemeConfig"
import { DIMENSIONS, SPACINGS, COLORS, SPEEDS } from '../constants'

const ToggleTheme = styled.button`
  width: ${DIMENSIONS.button_sm}px;
  height: ${DIMENSIONS.button_sm}px;
  border: ${DIMENSIONS.border_thick}px solid ${COLORS.black};
  border-radius: 100%;
  background-color: ${COLORS.white};
  color: transparent;
  overflow: hidden;
  position: absolute;
  top: ${SPACINGS.padding_sm}px;
  right: ${SPACINGS.padding_sm}px;
  transition: transform ${SPEEDS.fast}s, opacity ${SPEEDS.fast}s;
  transform: rotate(${(props )=> props.theme === 'dark' ? '180deg' : '0deg'});
  cursor: pointer;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }

  &:before {
    content: '';
    display: block;
    border-radius: 100%;
    background-color: ${COLORS.black};
    width: ${DIMENSIONS.button_sm - DIMENSIONS.border_thick * 4}px;
    height: ${DIMENSIONS.button_sm - DIMENSIONS.border_thick * 4}px;
    position: absolute;
    top: ${DIMENSIONS.border_thick}px;
    left: ${DIMENSIONS.border_thick}px;
  }
  &:after {
    content: '';
    display: block;
    width: ${DIMENSIONS.button_sm / 2 - DIMENSIONS.border_thick}px;
    height: 100%;
    background-color: ${COLORS.white};
    position: absolute;
    top: 0;
    left: 0;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return(
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ToggleTheme onClick={toggleTheme} theme={theme}>Switch Theme</ToggleTheme>
      {isMounted && <Component {...pageProps} />}
    </ThemeProvider>
  )
}

export default MyApp
