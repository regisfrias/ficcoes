import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../layouts/main'
import { getSortedPostsData } from '../../lib/chapters'
import styled from 'styled-components'
import { getAllPostIds, getPostData } from '../../lib/chapters'
import { Chapters, PostData } from '../../types'
import { SPACINGS } from '../../constants'

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
      <Div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
