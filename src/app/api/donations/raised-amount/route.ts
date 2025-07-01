import { NextRequest, NextResponse } from 'next/server';
import { getRaisedAmount } from '@/app/utils/data-utils';

export async function GET(request: NextRequest) {
  try {
    // Get the total raised amount
    const raisedAmount = getRaisedAmount();
    
    return NextResponse.json({ raisedAmount });
  } catch (error) {
    console.error('Error fetching raised amount:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the raised amount' },
      { status: 500 }
    );
  }
}