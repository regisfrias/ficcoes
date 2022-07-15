import { getSortedPostsData } from '../lib/chapters'
import Navigation from '../components/Navigation'

function Blog({chapters}: {chapters: [{id: string, title: string, date: string}]}) {
  return (
    <div>
      <Navigation chapters={chapters} />
    </div>
  )
}

export default Blog

export async function getStaticProps() {
  const chapters = getSortedPostsData()
  return {
    props: {chapters},
  }
}
