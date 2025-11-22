import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { googleMapsUrl, userId: _userId } = body

    if (!googleMapsUrl) {
      return NextResponse.json(
        { success: false, error: 'Google Maps URL is required' },
        { status: 400 }
      )
    }

    // For now, we'll return mock data
    // Later, this will call your n8n workflow
    const mockBusinessData = {
      id: 'business_' + Date.now(),
      businessName: 'Sample Restaurant',
      rating: 4.5,
      reviewCount: 127,
      address: '123 Main Street, City, State 12345',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-10PM',
      website: 'www.samplerestaurant.com',
      category: 'Restaurant',
      painPoints: [
        'Manual phone reservations taking too much time',
        'Difficulty managing peak hour rushes',
        'Limited online presence',
        'No automated customer follow-up system'
      ],
      recommendedAutomations: [
        'Online reservation system',
        'Automated SMS confirmations',
        'Customer feedback collection',
        'Social media posting automation',
        'Email marketing campaigns'
      ],
      services: [
        'Dine-in service',
        'Takeout orders',
        'Catering services',
        'Private events'
      ],
      opportunities: [
        'Online ordering system could increase revenue by 20%',
        'Automated marketing could bring 15% more repeat customers',
        'Voice agent could handle 80% of phone inquiries'
      ]
    }

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      businessId: mockBusinessData.id,
      data: mockBusinessData
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze business' },
      { status: 500 }
    )
  }
}
