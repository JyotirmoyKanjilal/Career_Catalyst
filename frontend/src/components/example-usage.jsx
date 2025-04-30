"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function ComponentsShowcase() {
  const [textareaValue, setTextareaValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleButtonClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 space-y-10 bg-darkest text-white">
      <h1 className="text-3xl font-bold mb-8">Custom Tailwind Components</h1>

      {/* Textarea Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Textarea Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textarea
            label="Default Textarea"
            placeholder="Type your message here..."
            value={textareaValue}
            onChange={e => setTextareaValue(e.target.value)}
          />
          <Textarea
            label="Textarea with Error"
            placeholder="Type your message here..."
            error="This field is required"
          />
        </div>
      </section>

      {/* Tabs Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs Component</h2>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="p-4 bg-darkTeal rounded-md mt-2">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-white/70 mt-2">
                Manage your account settings and preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="p-4 bg-darkTeal rounded-md mt-2">
              <h3 className="text-lg font-medium">Password Settings</h3>
              <p className="text-white/70 mt-2">
                Change your password and security settings.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-4 bg-darkTeal rounded-md mt-2">
              <h3 className="text-lg font-medium">General Settings</h3>
              <p className="text-white/70 mt-2">
                Configure your application preferences.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Badge Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge Component</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Avatar Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatar Component</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Avatar
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            size="sm"
          />
          <Avatar
            src="/placeholder.svg?height=40&width=40"
            alt="User"
            size="md"
          />
          <Avatar
            src="/placeholder.svg?height=48&width=48"
            alt="User"
            size="lg"
          />
          <Avatar
            src="/placeholder.svg?height=64&width=64"
            alt="User"
            size="xl"
          />
          <Avatar fallback="JD" size="lg" />
        </div>
      </section>

      {/* Button Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Component</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button isLoading={isLoading} onClick={handleButtonClick}>
            {isLoading ? "Loading..." : "Click Me"}
          </Button>
        </div>
      </section>
    </div>
  )
}
