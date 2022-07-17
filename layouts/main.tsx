import { ReactNode } from 'react'
import styled from 'styled-components'
import Navigation from '../components/Navigation'
import { Chapters } from '../types'
import { BREAKPOINTS, SPACINGS } from '../constants'

const Wrapper = styled.div`
  margin: auto;
  max-width: calc(100% - ${SPACINGS.padding_sm * 2}px);
  padding-bottom: ${SPACINGS.padding_sm * 4}px;
  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    max-width: ${BREAKPOINTS.sm - SPACINGS.padding_sm * 2}px;
  }
`

export default function Layout({
  children,
  chapters,
}: {
  children: ReactNode,
  chapters: Chapters,
}) {
  return(
    <Wrapper>
      <Navigation chapters={chapters} />

      {children}
    </Wrapper>
  )
}
