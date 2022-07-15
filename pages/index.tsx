import { getSortedPostsData } from '../lib/chapters'
import { getPostData } from '../lib/chapters'
import Layout from '../layouts/main'

function Blog({
  chapters,
  postData
}: {
  chapters: [{
    id: string, title: string, date: string
  }],
  postData: {
    title: string
    contentHtml: string
  }
}) {
  return (
    <Layout chapters={chapters}>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export default Blog

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
