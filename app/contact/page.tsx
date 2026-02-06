// import { useState } from "react"

export default async function ContactPage() {

  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [message, setMessage] = useState("")

  // //Client-side form submission handler
  // async function submitForm(event: React.FormEvent) {
  //   event.preventDefault()
  //   console.log(`📩 ได้รับข้อมูลจากฟอร์ม: ชื่อ = ${name}, อีเมล = ${email}, ข้อความ = ${message}`)
  // } {
  //   const res = await fetch("/api/contact", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, email, message }),
  //   })

  //   if (res.ok) {
  //     alert("ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับโดยเร็วที่สุด.")
  //     setName("")
  //     setEmail("")
  //     setMessage("")
  //   } else {
  //     alert("เกิดข้อผิดพลาดในการส่งข้อความของคุณ. กรุณาลองอีกครั้ง.")
  //   }
  //   // ในโปรเจกต์จริง: บันทึกลง Database, ส่ง Email ฯลฯ
  // }

  //Server-side form submission handler
  async function submitFormServer(formData: FormData) {
    "use server"
    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string 

    // จำลองการบันทึกข้อมูล
    console.log("📩 ได้รับข้อมูลจากฟอร์ม:")
    console.log({ name, email, message })
  }

  return (
    <main className="container mx-auto p-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">📬 ติดต่อเรา</h1>

      <form action={submitFormServer} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            ชื่อ
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            อีเมล
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            ข้อความ
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ส่งข้อความ
        </button>
      </form>
    </main>
  )
}