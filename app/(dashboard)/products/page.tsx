// app/(dashboard)/products/page.tsx
import { Suspense } from "react"
import Link from "next/link"
import {
  getProducts,
  getCategories,
  deleteProduct,
  createProduct,
} from "@/app/actions/product-actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ProductForm } from "@/components/product-form"
import { revalidatePath } from "next/cache"

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  // Server Action สำหรับลบ
  async function handleDelete(formData: FormData) {
    "use server"
    const id = parseInt(formData.get("id") as string)
    await deleteProduct(id)
    revalidatePath("/products")
  }

  // Server Action สำหรับเพิ่ม
  async function handleCreate(formData: FormData) {
    "use server"
    await createProduct(formData)
    revalidatePath("/products")
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">📦 จัดการสินค้า</h1>
          <p className="text-gray-500">รายการสินค้าทั้งหมด {products.length} รายการ</p>
        </div>

        {/* Add Product Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มสินค้า
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>➕ เพิ่มสินค้าใหม่</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลสินค้าที่ต้องการเพิ่ม
              </DialogDescription>
            </DialogHeader>
            <ProductForm onSubmit={handleCreate} categories={categories} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
          <CardDescription>
            จัดการสินค้าในคลัง เพิ่ม แก้ไข ลบ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>ชื่อสินค้า</TableHead>
                <TableHead>หมวดหมู่</TableHead>
                <TableHead className="text-right">ราคา</TableHead>
                <TableHead className="text-right">จำนวน</TableHead>
                <TableHead className="text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.category && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm">
                        {product.category}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    ฿{product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        product.quantity < 10
                          ? "text-red-500 font-medium"
                          : ""
                      }
                    >
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Link href={`/products/${product.id}`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={product.id} />
                        <Button
                          type="submit"
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-gray-500">ยังไม่มีสินค้า</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}