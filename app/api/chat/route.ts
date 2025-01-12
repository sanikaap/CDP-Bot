import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(req: Request) {
  try {
    const { message, selectedCDP } = await req.json()
    console.log('Received request:', { message, selectedCDP })

    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY is not set')
    }

    const prompt = `As an AI assistant specializing in ${selectedCDP}, i will provide you answer about ${selectedCDP}: "${message}"`

    console.log('Sending request to Hugging Face API')
    const response = await hf.textGeneration({
      model: 'your model',
      inputs: prompt,
    })

    const aiMessage = response.generated_text
    console.log('Received response from Hugging Face API:', aiMessage)

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}

