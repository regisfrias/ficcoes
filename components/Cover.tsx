import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`

const P = styled.p`
  max-width: 300px;
  margin: auto;
  margin-top: 10vh;
`

export default function Cover({lang}: {lang: string}) {
  return(
    <Wrapper>
      <em><Link href="https://regisfrias.com">Régis Frias</Link></em><br /><em>2022</em>
      <P>{ lang === 'pt' ?
        'Uma série de contos ficcionais pesadamente inspirada por—poder-se-ia dizer surrupiada de—J. L. Borges.'
      :
        'A series of short stories heavily inspired by—one could say stolen from—J. L. Borges.'
      }</P>
    </Wrapper>
  )
}