import { NextRequest, NextResponse } from 'next/server';
import { approveDonation } from '@/app/utils/data-utils';

export async function POST(request: NextRequest) {
  try {
    // Check if the user is authenticated as admin
    const adminCookie = request.cookies.get('admin_token');
    if (!adminCookie) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the donation ID from the request body
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Donation ID is required' },
        { status: 400 }
      );
    }
    
    // Approve the donation
    const success = approveDonation(id);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: 'Donation not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error approving donation:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while approving the donation' },
      { status: 500 }
    );
  }
}