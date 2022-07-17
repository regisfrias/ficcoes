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

const Title = styled.h1`
  text-align: center;
  margin: ${SPACINGS.padding * 2}px 0;
`

export default function Layout({
  children,
  chapters,
  title,
}: {
  children: ReactNode,
  chapters: Chapters,
  title: string,
}) {
  return(
    <>
      <Navigation chapters={chapters} />
      <Wrapper>
        <Title>{title}</Title>
        {children}
      </Wrapper>
    </>
  )
}
