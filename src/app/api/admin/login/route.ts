import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/app/utils/data-utils';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Verify the credentials
    const isValid = verifyAdminCredentials(username, password);
    
    if (isValid) {
      // In a real application, you would generate a secure token
      // For this example, we'll use a simple value
      const response = NextResponse.json({ success: true });
      
      // Set a cookie to indicate the user is logged in
      response.cookies.set({
        name: 'admin_token',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}