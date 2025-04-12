import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: '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' });

export async function sendMessageToBot(message) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a football expert named Messi from Barcelona. 
You answer only football-related questions. 
Your replies should always be concise and formatted as 5 clear bullet points or numbered sections. 
Avoid long paragraphs. Keep tone informative and professional.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama3-8b-8192',
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error sending message to bot:', error);
    throw error;
  }
}
