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

    // Mock website creation
    const mockWebsite = {
      id: 'website_' + Date.now(),
      name: 'Professional Business Website',
      url: `https://${businessId}-website.vercel.app`,
      preview: `https://preview.${businessId}-website.vercel.app`,
      status: 'published',
      createdAt: new Date().toISOString(),
      features: [
        'Responsive design',
        'Contact forms',
        'Online booking system',
        'Google Maps integration',
        'SEO optimized'
      ],
      pages: [
        'Home',
        'About Us',
        'Services',
        'Contact',
        'Gallery',
        'Testimonials'
      ],
      theme: 'Modern Business',
      analytics: {
        monthlyVisitors: 0,
        conversionRate: '0%',
        averageSessionTime: '0 minutes'
      }
    }

    // Simulate website generation time
    await new Promise(resolve => setTimeout(resolve, 3000))

    return NextResponse.json({
      success: true,
      website: mockWebsite
    })

  } catch (error) {
    console.error('Website creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create website' },
      { status: 500 }
    )
  }
}
