import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Chapters } from '../types'
import { DIMENSIONS, SPEEDS, COLORS, SPACINGS, BREAKPOINTS } from '../constants'

const Wrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(100% - ${DIMENSIONS.button_lg}px);
  transition: top ${SPEEDS.fast}s;
  overflow: hidden;
  position: fixed;
  z-index: 1;

  &.open {
    top: 0;
  }

  .menu_wrapper {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.background };
    box-shadow: 0 0 30px 0 ${({ theme }) => theme.shadow };
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: calc(100% - ${SPACINGS.padding_sm * 2}px);
      margin: auto;
      @media screen and (min-width: ${BREAKPOINTS.sm}px) {
        max-width: ${BREAKPOINTS.sm - SPACINGS.padding_sm * 2}px;
      }
      .left_nav {
        width: ${DIMENSIONS.button_lg * 2}px;
        display: flex;
      }
    }
  }

  .quick_nav {
    color: ${({ theme }) => theme.text };
    display: flex;
    justify-content: center;
  }

  section {
    background-color: ${({ theme }) => theme.background };
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: auto;
    justify-content: center;
    align-items: center;
    padding-bottom: ${SPACINGS.padding}px;

    ul {
      color: ${({ theme }) => theme.link };
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        a {
          color: ${({ theme }) => theme.link };
          &:hover {
            color: ${({ theme }) => theme.text };
          }
        }
        &.current {
          color: ${({ theme }) => theme.text };
          a {
            color: ${({ theme }) => theme.text };
          }
        }
      }
    }
  }
`

const ToggleLanguage = styled.button`
  width: ${DIMENSIONS.button_sm}px;
  height: ${DIMENSIONS.button_sm}px;
  margin-left: ${SPACINGS.padding_sm}px;
  border-radius: 100%;
  border: ${DIMENSIONS.border_thick}px solid ${({ theme }) => theme.background };
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.text };
  color: ${({ theme }) => theme.text};
  text-indent: ${DIMENSIONS.button_sm}px;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: bold;
  &:before, &:after {
    content: '';
    display: block;
    position: absolute;
  }
  &:before {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.background};
    border: ${DIMENSIONS.border_thick}px solid ${({ theme }) => theme.text };
    top: -${DIMENSIONS.border_thick}px;
    left: ${DIMENSIONS.button_sm * 0.187}px;
    width: ${DIMENSIONS.button_sm * 0.25}px;
    height: ${DIMENSIONS.button_sm - DIMENSIONS.border_thick * 2}px;
  }
  &:after {
    border-bottom: ${DIMENSIONS.border_thick}px solid ${({ theme }) => theme.text };
    top: ${DIMENSIONS.button_sm * 0.5 - DIMENSIONS.border_thick - DIMENSIONS.border_thick / 2}px;
    left: 0;
    width: 100%;
  }
`

const ToggleTheme = styled.button`
  width: ${DIMENSIONS.button_sm}px;
  height: ${DIMENSIONS.button_sm}px;
  border: ${DIMENSIONS.border_thick}px solid ${COLORS.black};
  border-radius: 100%;
  background-color: ${COLORS.white};
  color: transparent;
  overflow: hidden;
  bottom: ${(DIMENSIONS.button_lg - DIMENSIONS.button_sm) / 2}px;
  left: ${SPACINGS.padding_sm}px;
  z-index: 1;
  transition: transform ${SPEEDS.fast}s, opacity ${SPEEDS.fast}s;
  transform: rotate(${(props )=> props.theme === 'dark' ? '180deg' : '0deg'});
  cursor: pointer;

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

const Button = styled.button`
  border: 0;
  width: ${DIMENSIONS.button_lg}px;
  height: ${DIMENSIONS.button_lg}px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.text };
  &[disabled] {
    opacity: 0;
    cursor: default;
  }

  &.toggle-menu {
    position: relative;
    color: transparent;
    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      top: ${(DIMENSIONS.button_lg - DIMENSIONS.border_thick) / 2}px;
      height: 0;
      width: ${DIMENSIONS.button_lg / 2}px;
      left: ${DIMENSIONS.button_lg / 4}px;
      border-bottom: ${DIMENSIONS.border_thick}px solid ${({ theme }) => theme.text };
      transition: transform ${SPEEDS.fast}s;
    }
    &:before {
      margin-top: -3px;
      color: ${({ theme }) => theme.text }
    }
    &:after {
      margin-top: 3px;
      color: ${({ theme }) => theme.text }
    }
    &.open {
      &:before {
        transform: rotate(-45deg) translate(-2px, 2px);
      }
      &:after {
        transform: rotate(45deg) translate(-2px, -2px);
      }
    }
  }
`

const FontSize = styled.div`
  button {
    cursor: pointer;
    height: ${DIMENSIONS.button_lg}px;
    width: ${DIMENSIONS.button_lg}px;
    color: ${({ theme }) => theme.text };
    background-color: transparent;
    border: 0;
  }
`

export default function Navigation({
  chapters,
  toggleTheme,
  toggleLanguage,
  theme,
  lang,
  setFontSize
}: {
  chapters: Chapters,
  toggleTheme: Function,
  toggleLanguage: Function,
  theme: string,
  lang: string,
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
    const path = lang === 'en' ? '/' : '/en/'
    router.push(path)
    toggleLanguage()
  }

  const fontSize = (direction: string) => {
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
    <Wrapper className={isOpen ? 'open': ''}>
      <div className="menu_wrapper">
        <div className="container">
          <div className="left_nav">
            <ToggleTheme onClick={() => dispatchTheme()} theme={theme}>Switch theme</ToggleTheme>
            <ToggleLanguage onClick={() => { dispatchLanguage()}}>{lang}</ToggleLanguage>
          </div>
          <nav className='quick_nav'>
            <Button onClick={() => linkTo(prevNext.prev)} disabled={!prevNext.prev}>{'❮'}</Button>
            <Button className={`toggle-menu ${isOpen ? 'open' : ''}`} onClick={() => toggleChapters()}>{isOpen ? 'x' : '='}</Button>
            <Button onClick={() => linkTo(prevNext.next)} disabled={!prevNext.next}>{'❯'}</Button>
          </nav>
          <FontSize>
            <button onClick={() => fontSize('down')}><span className="small">A</span></button>
            <button onClick={() => fontSize('up')}><span className="large">A</span></button>
          </FontSize>
        </div>
      </div>
      <section>
        <article>
          <header>
            <h1>Índice</h1>
          </header>
          <ul>
            <li className={`ficcoes ${chapterId === undefined ? 'current' : ''}`}><Link href={path}><a onClick={() => toggleChapters()}>Capa</a></Link></li>
            {chapters ? chapters.map( (chapter: {id: string, title: string, date: string}) =>
              <li key={chapter.id} className={`${chapter.id} ${chapterId === chapter.id ? 'current' : ''}`}><Link href={`${path + chapter.id}`}><a onClick={() => toggleChapters()}>{chapter.title}</a></Link></li>
              ) : null}
          </ul>
        </article>
      </section>
    </Wrapper>
  )
}
