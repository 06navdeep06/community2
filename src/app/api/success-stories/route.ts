import { NextResponse } from 'next/server';

// Define the type for success stories
export interface SuccessStory {
  id: number;
  icon: string;
  title: string;
  description: string;
  content: string;
  footer: {
    metric: string;
    icon: string;
  };
}

// Sample success stories data
const successStories: SuccessStory[] = [
  {
    id: 1,
    icon: 'Droplet',
    title: 'Clean Water in Gorkha District',
    description: 'Completed in 2023',
    content: 'We completed a clean water project in three villages in Gorkha District, providing over 500 families with access to clean, safe drinking water for the first time. This has significantly reduced waterborne diseases and improved overall health in the community.',
    footer: {
      metric: '500+ families impacted',
      icon: 'CheckCircle'
    }
  },
  {
    id: 2,
    icon: 'School',
    title: 'School Renovation in Solukhumbu',
    description: 'Serving over 200 children',
    content: 'Our team renovated a primary school in Solukhumbu that serves over 200 children. The project included structural repairs, new furniture, educational materials, and teacher training. School attendance has increased by 35% since completion.',
    footer: {
      metric: '35% increase in attendance',
      icon: 'CheckCircle'
    }
  },
  {
    id: 3,
    icon: 'Heart',
    title: 'Healthcare Clinic in Chitwan',
    description: 'Opened in 2024',
    content: 'We established a new healthcare clinic in a remote area of Chitwan, providing essential medical services to over 1,000 residents who previously had to travel more than 20 kilometers for basic healthcare. The clinic offers preventive care, maternal health services, and treatment for common illnesses.',
    footer: {
      metric: '1,000+ residents served',
      icon: 'CheckCircle'
    }
  }
];

export async function GET() {
  // Simulate a short delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(successStories);
}