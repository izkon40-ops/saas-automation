// src/app/api/chat/route.js
import { NextResponse } from 'next/server';
import { geminiService } from '../../../services/geminiService';
import { n8nService } from '../../../services/n8nService';

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Log user activity to N8N
    await n8nService.logUserActivity({
      action: 'chat_message',
      message: message.substring(0, 100), // Log first 100 chars
    });

    // Generate response using Gemini
    const response = await geminiService.chatWithHistory([
      ...history,
      { role: 'user', content: message }
    ]);

    return NextResponse.json({
      response,
      success: true
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
