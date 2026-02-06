// app/(dashboard)/products/[id]/page.tsx
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import {
  getProduct,
  getCategories,
  updateProduct,
} from "@/app/actions/product-actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductForm } from "@/components/product-form"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const productId = parseInt(id)
  
  const product = await getProduct(productId)
  const categories = await getCategories()

  if (!product) {
    notFound()
  }

  // Server Action สำหรับอัปเดต
  async function handleUpdate(formData: FormData) {
    "use server"
    await updateProduct(productId, formData)
    redirect("/products")
  }

  return (
    <div>
      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center mb-6">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปหน้ารายการสินค้า
        </Button>
      </Link>

      {/* Edit Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>✏️ แก้ไขสินค้า</CardTitle>
          <CardDescription>
            แก้ไขข้อมูลสินค้า ID: {product.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            initialData={{
              name: product.name,
              description: product.description || "",
              price: Number(product.price),
              quantity: product.quantity,
              category: product.category || "",
            }}
            onSubmit={handleUpdate}
            categories={categories}
          />
        </CardContent>
      </Card>
    </div>
  )
}