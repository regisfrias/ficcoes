import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Chapters } from '../types'
import { COLORS, DIMENSIONS, SPEEDS } from '../constants'

const Nav = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(100% - ${DIMENSIONS.buttonSize}px);
  transition: top ${SPEEDS.fast}s;
  &.open {
    top: 0;
  }

  nav {
    background-color: ${COLORS.white};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
  }

  section {
    background-color: ${COLORS.white};
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
  }
`

const Button = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: transparent;
`

export default function Navigation({chapters}: {chapters: Chapters}) {

  const [ isOpen, open ] = useState(false)

  const toggleChapters = () => {
    open(!isOpen)
  }

  return (
    <Nav className={isOpen ? 'open': ''}>
      <section>
        <ul>
          <li><Link href='/'><a>Ficções</a></Link></li>
          {chapters ? chapters.map( (chapter: {id: string, title: string, date: string}) =>
            <li key={chapter.id}><Link href={`/${chapter.id}`}><a>{chapter.title}</a></Link></li>
            ) : null}
        </ul>
      </section>
      <nav>
        <Button onClick={() => toggleChapters()}>=</Button>
      </nav>
    </Nav>
  )
}
