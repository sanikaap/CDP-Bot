# CDP Support Chatbot

A React-based chatbot that provides support and information for various Customer Data Platforms (CDPs).

## Features

- Interactive chat interface
- Support for multiple CDPs (Segment, mParticle, Lytics, Zeotap)
- Real-time responses to CDP-related queries
- Cross-CDP comparison capabilities
- User-friendly CDP selection interface

## Tech Stack

- React
- TypeScript
- Next.js
- OpenAI API
- Shadcn
- Hugging Face API

## Prerequisites

- Node.js installed
- OpenAI API key or Hunnging Face API Token


## Installation

1. Clone the repository:
```bash
git clone https://github.com/sanikaap/CDP-Bot.git
cd cdp-support-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create `.env.local` file in the root directory:
```plaintext
OPENAI_API_KEY=your_api_key_here
or
HUGGINGFACE_API_KEY=your_api_key
(if you are using Hugging face ensure you are using right model)
```

4. Install required packages:
```bash
npm install openai @vercel/next
or
npm install @huggingface/inference@latest
(if you are using Hugging face)
```
## Important
- Ensure in route.ts and test-huggingface-api.js in model you have to give your preferred model.
- if you are using OPEN Ai api key then
## Key Changes:
- Replace Hugging Face API Key:
  Switched from HfInference to OpenAI's OpenAIApi initialization using the apiKey.
- API Method Update:
  Replaced Hugging Face's hf.textGeneration method with OpenAI's createCompletion method.
- Model:
  Used OpenAI's text-davinci-003 model (or a similar GPT model). You can adjust the model to fit your requirements.
- Environment Variable:
  Ensure you set OPENAI_API_KEY in your environment (e.g., .env file) instead of HUGGINGFACE_API_KEY.



## Project Structure

```
cdp-support-chatbot/
├── app/
│   ├── page.tsx            # Main chat interface
│   └── api/
│       └── chat/
│           └── route.ts    # API route handler
├── .env.local              # Environment variables
└── package.json
```

## Implementation Steps

1. Main Chat Interface (`app/page.tsx`):
   - Implements user interface components
   - Manages state for CDP selection
   - Handles message history
   - Processes user input

2. API Integration (`app/api/chat/route.ts`):
   - Handles chat requests
   - Integrates with Hugging Face API (you can use your PreferreSd GPT API)
   - Processes CDP-specific responses

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Access the application at `http://localhost:3000`

3. Select a CDP from the dropdown menu

4. Start asking questions about the selected CDP

## NEED Enhancement

1. Response Formatting:
   - Implement markdown support
   - Add code snippet formatting
   - Include rich media responses

2. Error Handling:
   - Add retry mechanisms
   - Implement fallback responses
   - Add error boundaries

3. User Experience:
   - Add response rating system
   - Implement conversation history
   - Add typing indicators

4. CDP Knowledge Base:
   - Expand system prompts
   - Add specific CDP documentation
   - Include use case examples

