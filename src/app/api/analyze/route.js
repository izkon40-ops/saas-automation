// src/app/api/analyze/route.js
import { N8NService } from '../../../services/n8nService';

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return Response.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    // Send to N8N workflow for comprehensive analysis
    const n8nService = new N8NService();
    const analysisResult = await n8nService.analyzeBusinessUrl(url);

    return Response.json({
      success: true,
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return Response.json({ 
      success: false, 
      error: 'Analysis failed' 
    }, { status: 500 });
  }
}
