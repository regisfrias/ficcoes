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

interface GlobalProps {
  fontSize: number
  theme: {
    background: string
    text: string
    link: string
  }
}

export const GlobalStyles = createGlobalStyle<GlobalProps>`
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
    font-size: ${props => (props.fontSize + 2)}px;
    @media screen and (min-width: ${BREAKPOINTS.sm}px) {
      font-size: ${props => props.fontSize}px;
    }
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  a {
    color:  ${({ theme }) => theme.link};;
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

  .large {
    font-size: 1rem;
  }
  .small {
    font-size: 0.8rem;
  }
`
