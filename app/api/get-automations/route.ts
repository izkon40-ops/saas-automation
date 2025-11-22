import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessId, userId } = body

    if (!businessId) {
      return NextResponse.json(
        { success: false, error: 'Business ID is required' },
        { status: 400 }
      )
    }

    // Mock automations data
    const mockAutomations = [
      {
        id: '1',
        name: 'Email Welcome Series',
        description: 'Send a series of welcome emails to new customers',
        category: 'marketing',
        enabled: false,
        estimatedSavings: '5 hours/week',
        potentialRevenue: '+15% customer retention',
        complexity: 'Easy',
        setupTime: '10 minutes',
        triggers: ['New customer signup', 'First purchase'],
        actions: ['Send welcome email', 'Add to newsletter', 'Schedule follow-up']
      },
      {
        id: '2',
        name: 'Appointment Reminders',
        description: 'Automatically send SMS and email reminders for appointments',
        category: 'communication',
        enabled: false,
        estimatedSavings: '3 hours/week',
        potentialRevenue: '-25% no-shows',
        complexity: 'Easy',
        setupTime: '15 minutes',
        triggers: ['24 hours before appointment', '2 hours before appointment'],
        actions: ['Send SMS reminder', 'Send email reminder', 'Log reminder sent']
      },
      {
        id: '3',
        name: 'Review Request Automation',
        description: 'Automatically request reviews from satisfied customers',
        category: 'reputation',
        enabled: false,
        estimatedSavings: '2 hours/week',
        potentialRevenue: '+30% online reviews',
        complexity: 'Medium',
        setupTime: '20 minutes',
        triggers: ['Service completed', 'Payment received'],
        actions: ['Wait 24 hours', 'Send review request email', 'Follow up if needed']
      },
      {
        id: '4',
        name: 'Lead Scoring & Nurturing',
        description: 'Score leads and automatically nurture them with targeted content',
        category: 'sales',
        enabled: false,
        estimatedSavings: '8 hours/week',
        potentialRevenue: '+40% conversion rate',
        complexity: 'Advanced',
        setupTime: '45 minutes',
        triggers: ['Website visit', 'Form submission', 'Email interaction'],
        actions: ['Score lead', 'Tag in CRM', 'Send targeted content', 'Alert sales team']
      },
      {
        id: '5',
        name: 'Social Media Posting',
        description: 'Automatically post content to social media platforms',
        category: 'marketing',
        enabled: false,
        estimatedSavings: '4 hours/week',
        potentialRevenue: '+20% social engagement',
        complexity: 'Medium',
        setupTime: '30 minutes',
        triggers: ['Scheduled time', 'New blog post', 'Special events'],
        actions: ['Post to Facebook', 'Post to Instagram', 'Post to Twitter', 'Track engagement']
      },
      {
        id: '6',
        name: 'Customer Feedback Collection',
        description: 'Collect and analyze customer feedback automatically',
        category: 'feedback',
        enabled: false,
        estimatedSavings: '6 hours/week',
        potentialRevenue: '+25% customer satisfaction',
        complexity: 'Medium',
        setupTime: '25 minutes',
        triggers: ['Service completion', 'Purchase made', 'Support ticket closed'],
        actions: ['Send feedback survey', 'Collect responses', 'Alert on negative feedback', 'Generate reports']
      }
    ]

    // Simulate data loading time
    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      automations: mockAutomations,
      totalAutomations: mockAutomations.length,
      enabledCount: mockAutomations.filter(a => a.enabled).length,
      categories: ['marketing', 'communication', 'reputation', 'sales', 'feedback']
    })

  } catch (error) {
    console.error('Get automations error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get automations' },
      { status: 500 }
    )
  }
}
