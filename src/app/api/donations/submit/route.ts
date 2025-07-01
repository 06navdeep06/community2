import { NextRequest, NextResponse } from 'next/server';
import { addPendingDonation } from '@/app/utils/data-utils';

export async function POST(request: NextRequest) {
  try {
    // Get the donation data from the request body
    const { name, amount, screenshot } = await request.json();
    
    // Validate the required fields
    if (!name || !amount) {
      return NextResponse.json(
        { message: 'Name and amount are required' },
        { status: 400 }
      );
    }
    
    // Parse the amount to ensure it's a number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { message: 'Amount must be a positive number' },
        { status: 400 }
      );
    }
    
    // Add the donation to the pending list
    const donation = addPendingDonation({
      name,
      amount: parsedAmount,
      screenshot: screenshot || undefined,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Donation submitted successfully and pending approval',
      donation 
    });
  } catch (error) {
    console.error('Error submitting donation:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while submitting the donation' },
      { status: 500 }
    );
  }
}