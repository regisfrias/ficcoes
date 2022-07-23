import Link from 'next/link'
import { getSortedPostsData } from '../lib/chapters'
import Layout from '../layouts/main'
import Cover from '../components/Cover'
import { Chapters, PostData } from '../types'


function Fictions({
  chapters,
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
      title='Ficções'
      toggleTheme={toggleTheme}
      toggleLanguage={toggleLanguage}
      theme={theme}
      lang={lang}
      setFontSize={setFontSize}
    >
      <Cover lang={lang}/>
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
