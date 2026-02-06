// components/product-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const productSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
  description: z.string().optional(),
  price: z.number().min(0, "ราคาต้องมากกว่า 0"),
  quantity: z.number().min(0, "จำนวนต้องมากกว่าหรือเท่ากับ 0"),
  category: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

type ProductFormProps = {
  initialData?: ProductFormData
  onSubmit: (data: FormData) => Promise<void>
  categories: string[]
}

export function ProductForm({
  initialData,
  onSubmit,
  categories,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    },
  })

  const handleFormSubmit = async (data: ProductFormData) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description || "")
    formData.append("price", String(data.price))
    formData.append("quantity", String(data.quantity))
    formData.append("category", data.category || "")
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">ชื่อสินค้า *</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">รายละเอียด</Label>
        <Input id="description" {...register("description")} />
      </div>

      {/* Price & Quantity */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">ราคา (บาท) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">จำนวน *</Label>
          <Input
            id="quantity"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">หมวดหมู่</Label>
        <Select onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกหมวดหมู่" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
      </Button>
    </form>
  )
}