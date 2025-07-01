import { NextRequest, NextResponse } from 'next/server';
import { getPendingDonations } from '@/app/utils/data-utils';

export async function GET(request: NextRequest) {
  try {
    // Check if the user is authenticated as admin
    const adminCookie = request.cookies.get('admin_token');
    if (!adminCookie) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get pending donations
    const pendingDonations = getPendingDonations();
    
    return NextResponse.json(pendingDonations);
  } catch (error) {
    console.error('Error fetching pending donations:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching pending donations' },
      { status: 500 }
    );
  }
}