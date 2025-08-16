import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル


type SearchParams = {
  search?: string
}

export default async function PostsPage(
  {searchParams}: {searchParams: Promise<SearchParams>}) {
  
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.search || ''

  const posts = query
  ? await searchPosts(query)
  : await getPosts() as Post[]
  // const posts = await getPosts() as Post[]

  return (
    <>
      <div className="container mx-auto px-4 py-8" >
        <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post)=> (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
