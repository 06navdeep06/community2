import Link from 'next/link';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-400" />
            Nepal Community Fund
          </h3>
          <p className="text-gray-300">Supporting community development projects across Nepal, focusing on education, healthcare, and sustainable infrastructure.</p>
          
          <div className="mt-6">
            <Button variant="green" size="sm" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
        
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-200 hover:text-green-200 transition duration-300 flex items-center gap-2">
                <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-200 hover:text-green-200 transition duration-300 flex items-center gap-2">
                <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-200 hover:text-green-200 transition duration-300 flex items-center gap-2">
                <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-gray-200 hover:text-green-200 transition duration-300 flex items-center gap-2">
                <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                Donate
              </Link>
            </li>
            <li>
              <Link href="/mission" className="text-gray-200 hover:text-green-200 transition duration-300 flex items-center gap-2">
                <span className="h-1 w-1 bg-green-400 rounded-full"></span>
                Our Mission
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Contact Us</h3>
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 space-y-3">
              <p className="text-gray-200 flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-400" />
                info@nepalcommunityfund.org
              </p>
              <p className="text-gray-200 flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-400" />
                +977 1 4123456
              </p>
              <p className="text-gray-200 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-400" />
                Thamel, Kathmandu, Nepal
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Nepal Community Fund. All rights reserved.</p>
      </div>
    </footer>
  );
}