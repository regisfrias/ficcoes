import { ReactNode } from 'react'
import Navigation from '../components/Navigation'
import { Chapters } from '../types'

export default function Layout({
  children,
  chapters,
}: {
  children: ReactNode,
  chapters: Chapters,
}) {
  return(
    <div>
      <Navigation chapters={chapters} />

      {children}
    </div>
  )
}
