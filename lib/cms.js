import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content')

export function getBandInfo() {
  const fullPath = path.join(contentDirectory, 'band-info.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  
  return {
    ...data,
    about: marked(data.about || '')
  }
}

export function getAlbums() {
  const albumsDirectory = path.join(contentDirectory, 'albums')
  
  if (!fs.existsSync(albumsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(albumsDirectory)
  
  // Return empty array if no files
  if (fileNames.length === 0) {
    return []
  }
  
  const albums = fileNames.map(fileName => {
    const fullPath = path.join(albumsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      ...data,
      slug: fileName.replace(/\.md$/, '')
    }
  })
  
  // Sort by release date, newest first
  return albums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
}

export function getShows() {
  const showsDirectory = path.join(contentDirectory, 'shows')
  
  if (!fs.existsSync(showsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(showsDirectory)
  
  const shows = fileNames.map(fileName => {
    const fullPath = path.join(showsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      ...data,
      slug: fileName.replace(/\.md$/, '')
    }
  })
  
  // Sort by date, upcoming first
  return shows.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export function getNews() {
  const newsDirectory = path.join(contentDirectory, 'news')
  
  if (!fs.existsSync(newsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(newsDirectory)
  
  const news = fileNames.map(fileName => {
    const fullPath = path.join(newsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      ...data,
      slug: fileName.replace(/\.md$/, ''),
      body: marked(content)
    }
  })
  
  // Sort by date, newest first
  return news
    .filter(item => item.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
} 