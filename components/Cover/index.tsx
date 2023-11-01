import Link from 'next/link'
import styles from './cover.module.css'
import styled from 'styled-components'

export default function Cover({lang}: {lang: string}) {
  return(
    <div className={styles.wrapper}>
      <em><Link href="https://regisfrias.com">Régis Frias</Link></em><br /><em>2022</em>
      <p className={styles.paragraph}>{ lang === 'pt' ?
        'Uma série de contos ficcionais pesadamente inspirada por—poder-se-ia dizer surrupiada de—J. L. Borges.'
      :
        'A series of short stories heavily inspired by—one could say stolen from—J. L. Borges.'
      }</p>
    </div>
  )
}
