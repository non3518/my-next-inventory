// app/todos/page.tsx
// ISR - Revalidate ทุก 60 วินาที

type Todo = {
  id: number
  title: string
  completed: boolean
}

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10", {
    next: { revalidate: 60 }, // ⏱️ Cache 60 วินาที แล้ว Revalidate
  })
  
  return res.json()
}

export default async function TodosPage() {
  const todos: Todo[] = await getTodos()
  const fetchTime = new Date().toLocaleTimeString("th-TH")

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">✅ รายการ Todos</h1>
      <p className="text-gray-500 mb-6">
        ดึงข้อมูลเมื่อ: {fetchTime} (Revalidate ทุก 60 วินาที)
      </p>
      
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-3 border rounded ${
              todo.completed ? "bg-green-50 line-through" : "bg-white"
            }`}
          >
            {todo.completed ? "✅" : "⬜"} {todo.title}
          </li>
        ))}
      </ul>
    </main>
  )
}