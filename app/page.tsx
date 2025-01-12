'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CDPSupportChatbot() {
  const [selectedCDP, setSelectedCDP] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const cdps = ['Segment', 'mParticle', 'Lytics', 'Zeotap']

  const handleCDPSelect = (cdp: string) => {
    setSelectedCDP(cdp)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedCDP || !input.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, selectedCDP }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      console.log('Frontend received:', data)  // Add this line for debugging

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>CDP Support Chatbot (Powered by Hugging Face)</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto space-y-4">
          {!selectedCDP && (
            <div className="space-y-2">
              <p>Please select a CDP to get started:</p>
              <div className="flex flex-wrap gap-2">
                {cdps.map((cdp) => (
                  <Button key={cdp} onClick={() => handleCDPSelect(cdp)} variant="outline">
                    {cdp}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={selectedCDP ? `Ask about ${selectedCDP}...` : 'Select a CDP first'}
              disabled={!selectedCDP || isLoading}
              className="flex-grow"
            />
            <Button type="submit" disabled={!selectedCDP || isLoading}>
              {isLoading ? 'Thinking...' : 'Send'}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

