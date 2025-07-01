import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if the admin cookie exists in the request
    const adminCookie = request.cookies.get('admin_token');
    
    // In a real application, you would verify the token's validity
    // For this example, we'll just check if it exists
    return NextResponse.json({ isAdmin: !!adminCookie });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}