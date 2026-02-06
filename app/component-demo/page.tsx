import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"


export default function ComponentsDemoPage() {
    return (
        <main className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">🎨 Shadcn/UI Components Demo</h1>

            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <ThemeToggle />

            {/* Button Variants */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Card Example */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Card</h2>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>สร้างโปรเจกต์ใหม่</CardTitle>
                        <CardDescription>
                            กรอกข้อมูลเพื่อสร้างโปรเจกต์ของคุณ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">ชื่อโปรเจกต์</Label>
                            <Input id="name" placeholder="My Awesome Project" />
                        </div>
                        <div>
                            <Label htmlFor="desc">คำอธิบาย</Label>
                            <Input id="desc" placeholder="รายละเอียดโปรเจกต์..." />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">ยกเลิก</Button>
                        <Button>สร้างโปรเจกต์</Button>
                    </CardFooter>
                </Card>
            </section>

            <Separator className="my-8" />

            {/* Button Sizes */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">🔔</Button>
                </div>
            </section>
        </main>
    )
}