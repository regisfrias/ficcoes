import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostIds, getPostData } from '../lib/chapters'

export default function Post({
  postData
}: {
  postData: {
    title: string
    contentHtml: string
  }
}) {
  return (
    <div>
      <h1>{postData.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const postData = await getPostData(params.id as string)
    return {
      props: {
        postData
      }
    }
  }
  return { props: {}}
}
