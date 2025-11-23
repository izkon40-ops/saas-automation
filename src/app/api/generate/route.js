// src/app/api/generate/route.js
import { NextResponse } from 'next/server';
import { geminiService } from '../../../services/geminiService';
import { n8nService } from '../../../services/n8nService';

export async function POST(request) {
  try {
    const { prompt, type = 'text', options = {} } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Log generation activity to N8N
    await n8nService.logUserActivity({
      action: 'content_generation',
      type,
      prompt: prompt.substring(0, 50) + '...', // Log first 50 chars
    });

    let response;
    
    switch (type) {
      case 'text':
        response = await geminiService.generateText(prompt, options);
        break;
      case 'code':
        const codePrompt = `Generate ${options.language || 'JavaScript'} code for: ${prompt}`;
        response = await geminiService.generateText(codePrompt, options);
        break;
      case 'explanation':
        const explainPrompt = `Explain this in detail: ${prompt}`;
        response = await geminiService.generateText(explainPrompt, options);
        break;
      default:
        response = await geminiService.generateText(prompt, options);
    }

    // Send success notification to N8N
    await n8nService.sendNotification({
      title: 'Content Generated',
      message: `Successfully generated ${type} content`,
      type: 'success'
    });

    return NextResponse.json({
      response,
      type,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Generate API Error:', error);
    
    // Send error notification to N8N
    await n8nService.sendNotification({
      title: 'Generation Failed',
      message: error.message,
      type: 'error'
    });

    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
