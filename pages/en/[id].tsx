import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../layouts/Main'
import { getSortedPostsData } from '../../lib/chapters'
import { getAllPostIds, getPostData } from '../../lib/chapters'
import { Chapters, PostData } from '../../types'
import styles from '../page.module.css'

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
    <Layout
      chapters={chapters}
      title={postData.title}
      toggleTheme={toggleTheme}
      toggleLanguage={toggleLanguage}
      theme={theme}
      lang={lang}
      translation={postData.translation}
      setFontSize={setFontSize}
    >
      <div className={styles.html} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds('chapters/en')
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const chapters = getSortedPostsData('chapters/en')
    const postData = await getPostData(`en/${(params.id as string)}`, 'chapters')
    return {
      props: {
        postData,
        chapters
      }
    }
  }
  return { props: {}}
}
