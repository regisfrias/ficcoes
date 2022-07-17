import { createGlobalStyle} from "styled-components"
import { COLORS, SPEEDS } from '../constants'

export const lightTheme = {
  background: `${COLORS.white}`,
  link: `${COLORS.sepia}`,
  text: `${COLORS.black}`,
}

export const darkTheme = {
  background: `${COLORS.black}`,
  link: `${COLORS.beige}`,
  text: `${COLORS.white}`,
}

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "NonBreakingSpaceOverride", "Hoefler Text", "Baskerville Old Face", Garamond, "Times New Roman", serif;;
    line-height: 1.6;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color ${SPEEDS.fast}s, color ${SPEEDS.fast}s;
    font-size: 16px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
