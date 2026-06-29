import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { price_id, success_url, cancel_url, mode } = await request.json();

    if (!price_id || !success_url || !cancel_url || !mode) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    if (!['payment', 'subscription'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode. Must be "payment" or "subscription"' },
        { status: 400 }
      );
    }

    const mockUrl = new URL(success_url);
    mockUrl.searchParams.set('checkout', 'mock');
    mockUrl.searchParams.set('price_id', price_id);
    mockUrl.searchParams.set('mode', mode);

    return NextResponse.json({
      sessionId: `mock_${Date.now()}`,
      url: mockUrl.toString(),
      mocked: true,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
