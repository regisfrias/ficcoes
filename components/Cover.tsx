import Link from 'next/link'
import styled from 'styled-components'
import { SPACINGS } from '../constants'

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
      <Link href="https://regisfrias.com"><a><em>Régis Frias</em></a></Link><br /><em>2022</em>
      <P>{ lang === 'pt' ?
        'Uma série de contos ligeiramente inspirada por (ou, mais precisamente, surrupiada de) J. L. Borges.'
      :
        'A series of short stories slightly inspired by (or more precisely stolen from) J. L. Borges.'
      }</P>
    </Wrapper>
  )
}