// app/posts/page.tsx
// Dynamic Rendering - ดึงข้อมูลใหม่ทุกครั้ง

type Post = {
  id: number
  title: string
  body: string
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
    cache: "no-store", // ❌ ไม่ Cache - ดึงใหม่ทุกครั้ง
  })
  
  return res.json()
}

export default async function PostsPage() {
  const posts: Post[] = await getPosts()
  const fetchTime = new Date().toLocaleTimeString("th-TH")

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">📝 บทความทั้งหมด</h1>
      <p className="text-gray-500 mb-6">ดึงข้อมูลเมื่อ: {fetchTime}</p>
      
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 line-clamp-2">{post.body}</p>
          </article>
        ))}
      </div>
    </main>
  )
}