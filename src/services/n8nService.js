// src/services/n8nService.js
class N8NService {
  constructor() {
    this.webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    this.apiKey = process.env.NEXT_PUBLIC_N8N_API_KEY;
  }

  async sendWebhook(data, endpoint = '') {
    try {
      const url = endpoint ? `${this.webhookUrl}/${endpoint}` : this.webhookUrl;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`N8N webhook failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('N8N Webhook Error:', error);
      // For placeholder mode, return mock response
      if (this.apiKey === 'placeholder_api_key') {
        console.log('N8N Placeholder Mode - Mock Response');
        return { success: true, message: 'Mock response for development' };
      }
      throw error;
    }
  }

  async processFormData(formData) {
    return this.sendWebhook({
      type: 'form_submission',
      data: formData,
      timestamp: new Date().toISOString(),
    }, 'form');
  }

  async logUserActivity(activity) {
    return this.sendWebhook({
      type: 'user_activity',
      activity,
      timestamp: new Date().toISOString(),
    }, 'activity');
  }

  async sendNotification(notification) {
    return this.sendWebhook({
      type: 'notification',
      ...notification,
      timestamp: new Date().toISOString(),
    }, 'notify');
  }
}

export const n8nService = new N8NService();
export default N8NService;
