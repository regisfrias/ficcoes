import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  overflow: hidden;
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
    align-items: center;

    ul {
      color: ${COLORS.sepia};
      padding: 0;
      margin: 0;
      li {
        a {
          color: ${COLORS.sepia};
          &:hover {
            color: ${COLORS.black};
          }
        }
        &.current {
          color: ${COLORS.black};
          a {
            color: ${COLORS.black};
          }
        }
      }
    }
  }
`

const Button = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: transparent;
  &[disabled] {
    opacity: 0;
    cursor: default;
  }
`

export default function Navigation({chapters}: {chapters: Chapters}) {
  const router = useRouter()
  const path = router.query.id
  const [ isOpen, open ] = useState(false)
  const toggleChapters = () => open(!isOpen)
  const [ prevNext, setPrevNext ] = useState<{prev: string | null, next: string | null}>({prev: '', next: ''})

  const linkTo = (route: string | null) => {
    if (route) {
      router.push(route)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (path === undefined) {
        setPrevNext({prev: null, next: chapters[0].id})
      } else {
        const currentKey = chapters.reduce((prev, curr, i) => curr.id === path ? i : prev, 0)
        const prevObj = currentKey > 0 ? chapters[currentKey - 1] : null
        const nextObj = currentKey < chapters.length ? chapters[currentKey + 1] : null
        const prev = prevObj && prevObj.id ? prevObj.id : '/'
        const next = nextObj && nextObj.id ? nextObj.id : null
        setPrevNext({prev, next})
      }
    }
  }, [path, chapters])

  return (
    <Nav className={isOpen ? 'open': ''}>
      <section>
        <ul>
          <li className={`ficcoes ${path === undefined ? 'current' : ''}`}><Link href='/'><a onClick={() => toggleChapters()}>Ficções</a></Link></li>
          {chapters ? chapters.map( (chapter: {id: string, title: string, date: string}) =>
            <li key={chapter.id} className={`${chapter.id} ${path === chapter.id ? 'current' : ''}`}><Link href={`/${chapter.id}`}><a onClick={() => toggleChapters()}>{chapter.title}</a></Link></li>
            ) : null}
        </ul>
      </section>
      <nav>
        <Button onClick={() => linkTo(prevNext.prev)} disabled={!prevNext.prev}>{'<'}</Button>
        <Button onClick={() => toggleChapters()}>{isOpen ? 'x' : '='}</Button>
        <Button onClick={() => linkTo(prevNext.next)} disabled={!prevNext.next}>{'>'}</Button>
      </nav>
    </Nav>
  )
}
