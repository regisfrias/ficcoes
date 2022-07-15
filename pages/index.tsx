import { getSortedPostsData } from '../lib/chapters'
import { getPostData } from '../lib/chapters'
import Layout from '../layouts/main'
import { Chapters, PostData } from '../types'

function Fictions({
  chapters,
  postData
}: {
  chapters: Chapters,
  postData: PostData
}) {
  return (
    <Layout chapters={chapters} current='index'>
      <h1>{postData.title}</h1>
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
