// app/actions/message-actions.ts
"use server"

// Type สำหรับ Message
export type Message = {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
}

// จำลอง Database ด้วย Array (ในโปรเจกต์จริงใช้ Database)
let messages: Message[] = []

// Server Action: เพิ่มข้อความใหม่
export async function addMessage(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  const newMessage: Message = {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date(),
  }
  messages.push(newMessage)
  console.log("✅ เพิ่มข้อความสำเร็จ:", newMessage)
  return { success: true, message: newMessage }
}

// Server Action: ดึงข้อความทั้งหมด
export async function getMessages() {
  return messages
}

// Server Action: ลบข้อความ
export async function deleteMessage(id: string) {
  messages = messages.filter((m) => m.id !== id)
  console.log("🗑️ ลบข้อความ ID:", id)
  
  return { success: true }
}