import Link from 'next/link'

export default function Navigation({chapters}: {chapters?: [{id: string, title: string, date: string}]}) {
  return (
    <div>
      {chapters ? chapters.map( (chapter: {id: string, title: string, date: string}) =>
        <li key={chapter.id}><Link href={`/${chapter.id}`}><a>{chapter.title}</a></Link></li>
      ) : null}
    </div>
  )
}
