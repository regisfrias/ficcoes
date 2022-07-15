import Link from 'next/link'
import { Chapters } from '../types'

export default function Navigation({chapters}: {chapters: Chapters}) {
  return (
    <div>
      <li><Link href='/'><a>Ficções</a></Link></li>
      {chapters ? chapters.map( (chapter: {id: string, title: string, date: string}) =>
        <li key={chapter.id}><Link href={`/${chapter.id}`}><a>{chapter.title}</a></Link></li>
      ) : null}
    </div>
  )
}
