import { createGlobalStyle} from "styled-components"
import { COLORS, SPEEDS, BREAKPOINTS, SPACINGS } from '../constants'

export const lightTheme = {
  background: `${COLORS.white}`,
  link: `${COLORS.sepia}`,
  text: `${COLORS.black}`,
  shadow: `rgba(0, 0, 0, ${0.2})`,
}

export const darkTheme = {
  background: `${COLORS.black}`,
  link: `${COLORS.beige}`,
  text: `${COLORS.white}`,
  shadow: `rgba(0, 0, 0, ${0.7})`,
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
    font-size: 20px;
    @media screen and (min-width: ${BREAKPOINTS.sm}px) {
      font-size: 18px;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  blockquote {
    font-size: 90%;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 5vw;
    margin-inline-end: 5vw;
    @media screen and (min-width: ${BREAKPOINTS.sm}px) {
      margin-inline-start: ${SPACINGS.padding}px;
      margin-inline-end: ${SPACINGS.padding}px;
    }
  }
`
