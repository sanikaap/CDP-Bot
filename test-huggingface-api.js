const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function testHuggingFaceAPI() {
  try {
    const response = await hf.textGeneration({
      model: 'your model',
      inputs: 'Hello, how are you?',
    });
    console.log('API Response:', response);
  } catch (error) {
    console.error('API Error:', error);
  }
}

testHuggingFaceAPI();