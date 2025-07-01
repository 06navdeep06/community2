import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Droplet, School, Globe, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { SuccessStory } from "@/app/api/success-stories/route";
import ErrorDisplay from "./error-display";

// Map of icon names to components
const iconMap = {
  Heart,
  Droplet,
  School,
  Globe,
  CheckCircle,
  ArrowRight,
  Loader2
};

// Type for the dynamic icon component
type IconComponentProps = {
  name: string;
  className?: string;
};

// Component to dynamically render icons based on name
const IconComponent = ({ name, className = "" }: IconComponentProps) => {
  // Use the icon from our map, or default to Heart if not found
  const Icon = iconMap[name as keyof typeof iconMap] || Heart;
  return <Icon className={className} />;
};

async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    // In a Server Component, we can use the full URL or a relative URL
    // Using the absolute URL ensures this works in all environments
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : '';
    
    const response = await fetch(`${baseUrl}/api/success-stories`, {
      // This ensures fresh data on every request
      cache: 'no-store'
      // Alternatively, use revalidation:
      // next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch success stories: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching success stories:', error);
    throw error;
  }
}

export default async function Mission() {
  // Server-side data fetching
  let stories: SuccessStory[] = [];
  let error: Error | null = null;
  
  try {
    stories = await getSuccessStories();
  } catch (err) {
    error = err instanceof Error ? err : new Error('An unknown error occurred');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-green-700">Our Mission</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Working together to create lasting positive change in communities across Nepal
          </p>
        </div>
        
        <Card className="mb-12 border-green-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Empowering Communities Across Nepal
            </CardTitle>
            <CardDescription>
              A holistic approach to sustainable development
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700">
              The Nepal Community Fund is dedicated to supporting sustainable development and empowering communities 
              across Nepal. We believe in a holistic approach that addresses the interconnected challenges 
              facing rural communities, with a focus on education, healthcare, and sustainable infrastructure.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to create lasting positive change by working directly with local communities, 
              understanding their unique needs, and implementing projects that build capacity and self-sufficiency.
            </p>
            <p className="text-lg text-gray-700">
              We are committed to transparency, accountability, and maximizing the impact of every donation 
              we receive. By partnering with local organizations and leveraging community knowledge, 
              we ensure that our projects are culturally appropriate and sustainable in the long term.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Globe className="h-10 w-10 text-green-600 mb-2" />
                <h3 className="font-bold text-gray-800">Sustainable Development</h3>
                <p className="text-sm text-gray-600">Creating long-term solutions that respect the environment</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
                <CheckCircle className="h-10 w-10 text-green-600 mb-2" />
                <h3 className="font-bold text-gray-800">Transparency</h3>
                <p className="text-sm text-gray-600">Full accountability for all donations and project outcomes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Heart className="h-10 w-10 text-green-600 mb-2" />
                <h3 className="font-bold text-gray-800">Community-Centered</h3>
                <p className="text-sm text-gray-600">Working with local communities to address their unique needs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Success Stories
          </h2>
          <p className="text-gray-600 mb-8">Real impact in communities across Nepal</p>
        </div>
        
        {error ? (
          <ErrorDisplay errorMessage="Failed to load success stories. Please try again later." />
        ) : stories.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            <span className="ml-2 text-green-600">Loading success stories...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {stories.map((story) => (
              <Card key={story.id} className="overflow-hidden border-green-100 shadow-lg">
                <div className="h-48 bg-green-100 flex items-center justify-center relative">
                  <IconComponent name={story.icon} className="h-16 w-16 text-green-600 opacity-50" />
                  <span className="absolute inset-0 flex items-center justify-center text-green-700 font-bold">Project Photo</span>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent name={story.icon} className="h-5 w-5 text-green-600" />
                    {story.title}
                  </CardTitle>
                  <CardDescription>{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{story.content}</p>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <IconComponent name={story.footer.icon} className="h-4 w-4 text-green-600" />
                    <span>{story.footer.metric}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Button variant="green" size="lg" asChild className="px-8 py-6 text-lg">
            <Link href="/donate" className="flex items-center gap-2">
              Support Our Mission
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}