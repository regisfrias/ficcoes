import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../layouts/main'
import { getSortedPostsData } from '../lib/chapters'
import { getAllPostIds, getPostData } from '../lib/chapters'
import { Chapters, PostData } from '../types'

export default function Post({
  chapters,
  postData,
  toggleTheme,
  toggleLanguage,
  theme,
  lang,
  setFontSize,
}: {
  chapters: Chapters,
  postData: PostData,
  toggleTheme: Function,
  toggleLanguage: Function,
  lang: string,
  theme: string,
  setFontSize: Function,
}) {
  return (
    <Layout chapters={chapters} title={postData.title} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} theme={theme} lang={lang} setFontSize={setFontSize}>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds('chapters')
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const chapters = getSortedPostsData('chapters')
    const postData = await getPostData(params.id as string, 'chapters')
    return {
      props: {
        postData,
        chapters
      }
    }
  }
  return { props: {}}
}
