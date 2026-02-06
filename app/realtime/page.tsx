// app/realtime/page.tsx
// บังคับให้เป็น Dynamic ด้วย Route Segment Config

export const dynamic = "force-dynamic" // บังคับ Dynamic Rendering
// export const revalidate = 60 // หรือใช้ ISR

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
  return res.json()
}

export default async function RealtimePage() {
  const data = await getData()
  const time = new Date().toLocaleTimeString("th-TH")

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">⏰ Real-time Data</h1>
      <p className="mb-4">เวลาปัจจุบัน: {time}</p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}