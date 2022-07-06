import Link from 'next/link'
import { getSortedPostsData } from '../lib/chapters'

function Blog({chapters}: {chapters: []}) {
  console.log('chapters', chapters);
  
  return (
    <div>
        {chapters.map( (post: {id: string, title: string, date: string}) =>
          <li key={post.id}><Link href={`/${post.id}`}><a>{post.title}</a></Link> </li>
        )}
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
