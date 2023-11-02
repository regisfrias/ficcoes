import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { h } from 'hastscript'
import { visit } from 'unist-util-visit'
import { v4 as uuidv4 } from 'uuid'

const postsDirectory = (dir: string) => path.join(process.cwd(), dir)

export function getSortedPostsData(dir: string) {
  // Get file names under /chapters
  const fileNames = fs.readdirSync(postsDirectory(dir))
  const allPostsData = fileNames.map(fileName => {
    if(fileName.includes('.md')) {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory(dir), fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as {title: string, date: string, translation?: string})
      }
    }
  }).filter( f => f)

  // Sort chapters by date
  return allPostsData.sort((a, b) => {
    if (a && b && a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds(dir: string) {
  const fileNames = fs.readdirSync(postsDirectory(dir)).filter( p => p.includes('.md'))
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

function getReadingTime(text: string) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

function addParagraphId() {
  return function (tree: import('mdast').Root): undefined {
    visit(tree, function (node, a) {
      if (
        node.type === 'paragraph' ||
        node.type === 'blockquote'
      ) {
        const data = node.data || (node.data = {})
        data.hProperties = { id: uuidv4() }
      }
    })
  }
}

export async function getPostData(id: string, dir: string) {
  const fullPath = path.join(postsDirectory(dir), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const readingTime = getReadingTime(fileContents)

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(addParagraphId)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    readingTime,
    contentHtml,
    ...matterResult.data,
  };
}
