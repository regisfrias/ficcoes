import { createGlobalStyle} from "styled-components"
import { COLORS, SPEEDS } from '../constants'

export const lightTheme = {
  background: `${COLORS.white}`,
  link: `${COLORS.sepia}`,
  text: `${COLORS.black}`,
}

export const darkTheme = {
  background: `${COLORS.black}`,
  link: `${COLORS.sepia}`,
  text: `${COLORS.white}`,
}

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color ${SPEEDS.fast}s, color ${SPEEDS.fast}s;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
