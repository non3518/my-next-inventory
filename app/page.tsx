import { Button } from "@/components/ui/button"

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  
  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }
  
  return res.json()
}

type User = {
  id: number
  name: string
  email: string
  phone: string
  company: {
    name: string
  }
}

export default async function HomePage() {
  // ดึงข้อมูลโดยตรง (ไม่ต้องใช้ useEffect!)
  const users: User[] = await getUsers()

  return (
    <main className="container mx-auto p-8">
      <Button>Click Me</Button>
      <h1 className="text-3xl font-bold mb-6">👥 รายชื่อผู้ใช้งาน</h1>
      
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">📧 {user.email}</p>
            <p className="text-gray-600">📱 {user.phone}</p>
            <p className="text-gray-500">🏢 {user.company.name}</p>
          </div>
        ))}
      </div>
    </main>
  )
}