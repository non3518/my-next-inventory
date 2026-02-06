"use client"
// import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react"
import { addMessage, getMessages, deleteMessage, type Message } from "@/app/actions/message-actions"

export default function GuestbookPage() {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        async function loadMessages() {
            const data = await getMessages()
            setMessages(data)
        }
        loadMessages()
    }, [])  

    // Submit Handler 
    async function handleSubmit(formData: FormData) {
        await addMessage(formData)
        const data = await getMessages()
        setMessages(data)
    }

    // Delete Handler
    async function handleDelete(formData: FormData) {
        const id = formData.get("id") as string
        await deleteMessage(id)
        const data = await getMessages()    
        setMessages(data)        

    }

    return (
        <main className="container mx-auto p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">📖 สมุดเยี่ยม (Guestbook)</h1>

            {/* ฟอร์มเพิ่มข้อความ */}
            <form action={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">เขียนข้อความ</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="ชื่อของคุณ"
                        required
                        className="p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="อีเมล"
                        required
                        className="p-2 border rounded"
                    />
                </div>

                <textarea
                    name="message"
                    placeholder="ข้อความ..."
                    rows={3}
                    required
                    className="w-full p-2 border rounded mt-4"
                />

                <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    ส่งข้อความ
                </button>
            </form>

            {/* แสดงรายการข้อความ */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                    ข้อความทั้งหมด ({messages.length})
                </h2>

                {messages.length === 0 ? (
                    <p className="text-gray-500">ยังไม่มีข้อความ</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{msg.name}</h3>
                                    <p className="text-sm text-gray-500">{msg.email}</p>
                                </div>
                                <form action={handleDelete}>
                                    <input type="hidden" name="id" value={msg.id} />
                                    <button
                                        type="submit"
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        🗑️ ลบ
                                    </button>
                                </form>
                            </div>
                            <p className="mt-2">{msg.message}</p>
                            <p className="text-xs text-gray-400 mt-2">
                                {msg.createdAt.toLocaleString("th-TH")}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}