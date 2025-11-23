// src/app/api/webhook/route.js
import { NextResponse } from 'next/server';
import { n8nService } from '../../../services/n8nService';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Process webhook data with N8N
    const result = await n8nService.sendWebhook({
      ...data,
      source: 'nextjs_app',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      result,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('Webhook API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // Health check endpoint
  return NextResponse.json({
    status: 'active',
    timestamp: new Date().toISOString(),
    message: 'Webhook endpoint is running'
  });
}

// Handle form submissions
export async function PUT(request) {
  try {
    const formData = await request.json();
    
    // Process form data through N8N
    const result = await n8nService.processFormData(formData);
    
    return NextResponse.json({
      success: true,
      result,
      message: 'Form data processed successfully'
    });

  } catch (error) {
    console.error('Form Processing Error:', error);
    return NextResponse.json(
      { error: 'Failed to process form data' },
      { status: 500 }
    );
  }
}
