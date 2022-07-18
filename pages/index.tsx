import Link from 'next/link'
import styled from 'styled-components'
import { getSortedPostsData } from '../lib/chapters'
import Layout from '../layouts/main'
import { Chapters, PostData } from '../types'

const Cover = styled.div`
  text-align: center;
`

function Fictions({
  chapters,
  toggleTheme,
  theme,
  setFontSize,
}: {
  chapters: Chapters,
  postData: PostData,
  toggleTheme: Function,
  theme: string,
  setFontSize: Function,
}) {
  return (
    <Layout chapters={chapters} title='Ficcões' toggleTheme={toggleTheme} theme={theme} setFontSize={setFontSize}>
      <Cover><Link href="https://regisfrias.com"><a><em>Régis Frias</em></a></Link><br /><em>2022</em></Cover>
    </Layout>
  )
}

export default Fictions

export async function getStaticProps() {
  const chapters = getSortedPostsData('chapters')
  return {
    props: {
      chapters,
    }
  }
}
