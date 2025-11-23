// src/services/n8nService.js
export class N8NService {
  constructor() {
    this.webhookUrl = process.env.N8N_WEBHOOK_URL;
  }

  async sendToWorkflow(data) {
    if (!this.webhookUrl) {
      console.warn('N8N webhook URL not configured');
      return null;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('N8N webhook error:', error);
      throw error;
    }
  }

  // NEW METHOD FOR BUSINESS ANALYSIS
  async analyzeBusinessUrl(url) {
    const analysisWebhookUrl = `${this.webhookUrl}/analyze-business`;
    
    try {
      const response = await fetch(analysisWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: url,
          timestamp: new Date().toISOString(),
          requestType: 'business_analysis'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Business analysis error:', error);
      throw error;
    }
  }
}
