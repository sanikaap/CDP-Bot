import { useState } from 'react'
import { useChat, Message } from 'ai/react'
import { formatCDPResponse } from '../utils/formatCDPResponse'

export function useCDPChat(selectedCDP: string | null) {
  const [isComparingCDPs, setIsComparingCDPs] = useState(false)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      // Check if the response is a comparison between CDPs
      if (response.content.toLowerCase().includes('comparison')) {
        setIsComparingCDPs(true)
      } else {
        setIsComparingCDPs(false)
      }
    },
    onFinish: (message) => {
      // Format the CDP-related response
      message.content = formatCDPResponse(message.content)
    },
  })

  const cdpHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCDP) {
      handleSubmit(e, { options: { body: { selectedCDP } } })
    }
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit: cdpHandleSubmit,
    isLoading,
    isComparingCDPs,
  }
}

