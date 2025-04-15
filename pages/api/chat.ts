import type { NextApiRequest, NextApiResponse } from 'next';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages must be an array.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API Key not configured.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    const data = await response.json();

    // Defensive: Make sure we reply with string
    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || 'No response.',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from OpenAI.' });
  }
}