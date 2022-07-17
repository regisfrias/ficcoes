import { getSortedPostsData } from '../lib/chapters'
import { getPostData } from '../lib/chapters'
import Layout from '../layouts/main'
import { Chapters, PostData } from '../types'

function Fictions({
  chapters,
  postData,
  toggleTheme,
  theme,
}: {
  chapters: Chapters,
  postData: PostData,
  toggleTheme: Function,
  theme: string,
}) {
  return (
    <Layout chapters={chapters} title={postData.title} toggleTheme={toggleTheme} theme={theme}>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export default Fictions

export async function getStaticProps() {
  const chapters = getSortedPostsData('chapters')
  const postData = await getPostData('intro', 'intro')
  return {
    props: {
      chapters,
      postData
    }
  }
}
