import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../layouts/main'
import { getSortedPostsData } from '../lib/chapters'
import { getAllPostIds, getPostData } from '../lib/chapters'
import { Chapters, PostData } from '../types'
import { SPACINGS } from '../constants'
import styled from 'styled-components'

const Div = styled.div`
  > p {
    &:first-child {
      &:first-letter {
        font-size: 10rem;
        line-height: 1.1;
        float: left;
        vertical-align: bottom;
        margin-right: ${SPACINGS.padding_sm}px;
        margin-bottom: -2.2rem;
      }
    }
  }
`

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
  translation?: string,
  setFontSize: Function,
}) {
  return (
    <Layout
      chapters={chapters}
      title={postData.title}
      toggleTheme={toggleTheme}
      toggleLanguage={toggleLanguage}
      translation={postData.translation}
      theme={theme}
      lang={lang}
      setFontSize={setFontSize}
    >
      <Div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
