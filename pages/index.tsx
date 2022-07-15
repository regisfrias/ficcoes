import { GetStaticProps, GetStaticPaths } from 'next'
import { getSortedPostsData } from '../lib/chapters'
import { getAllPostIds, getPostData } from '../lib/chapters'
import Navigation from '../components/Navigation'

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
    <div>
      <Navigation chapters={chapters} />

      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
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
