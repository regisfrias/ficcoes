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
}: {
  chapters: Chapters,
  postData: PostData,
  toggleTheme: Function,
  theme: string,
}) {
  return (
    <Layout chapters={chapters} title='Ficcões' toggleTheme={toggleTheme} theme={theme}>
      <Cover><em>Régis Frias</em><br /><em>2022</em></Cover>
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
