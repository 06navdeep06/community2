"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from 'next/image';

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface UnsplashImagePickerProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImageUrl?: string;
}

export default function UnsplashImagePicker({ onImageSelect, selectedImageUrl }: UnsplashImagePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Predefined queries for common categories
  const suggestedQueries = [
    'nepal', 
    'education', 
    'community', 
    'farming', 
    'mountains', 
    'village'
  ];

  // Function to search for images
  const searchImages = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // This is a simulated search since we don't have an actual Unsplash API key
      // In a real application, you would make an API call to Unsplash
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Predefined image results based on common queries
      const mockResults: Record<string, UnsplashImage[]> = {
        nepal: [
          {
            id: 'nepal1',
            urls: {
              small: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Nepal mountains',
            user: { name: 'Unsplash Photographer' }
          },
          {
            id: 'nepal2',
            urls: {
              small: 'https://images.unsplash.com/photo-1553696590-4b3f68898333?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1553696590-4b3f68898333?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Nepal temple',
            user: { name: 'Unsplash Photographer' }
          }
        ],
        education: [
          {
            id: 'education1',
            urls: {
              small: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Students studying',
            user: { name: 'Unsplash Photographer' }
          },
          {
            id: 'education2',
            urls: {
              small: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Students in classroom',
            user: { name: 'Unsplash Photographer' }
          }
        ],
        community: [
          {
            id: 'community1',
            urls: {
              small: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Community gathering',
            user: { name: 'Unsplash Photographer' }
          },
          {
            id: 'community2',
            urls: {
              small: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Community event',
            user: { name: 'Unsplash Photographer' }
          }
        ],
        farming: [
          {
            id: 'farming1',
            urls: {
              small: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Terraced rice fields',
            user: { name: 'Unsplash Photographer' }
          },
          {
            id: 'farming2',
            urls: {
              small: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Farmer working in field',
            user: { name: 'Unsplash Photographer' }
          }
        ],
        mountains: [
          {
            id: 'mountains1',
            urls: {
              small: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Mountain peaks',
            user: { name: 'Unsplash Photographer' }
          },
          {
            id: 'mountains2',
            urls: {
              small: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Mountain landscape',
            user: { name: 'Unsplash Photographer' }
          }
        ],
        village: [
          {
            id: 'village1',
            urls: {
              small: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Village houses',
            user: { name: 'Unsplash Photographer' }
          },
          {
            id: 'village2',
            urls: {
              small: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop',
              regular: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
            },
            alt_description: 'Village scene',
            user: { name: 'Unsplash Photographer' }
          }
        ]
      };
      
      // Find the closest matching category
      const matchingCategory = suggestedQueries.find(q => 
        query.toLowerCase().includes(q.toLowerCase())
      ) || 'nepal'; // Default to nepal if no match
      
      setImages(mockResults[matchingCategory] || []);
    } catch (err) {
      console.error('Error searching for images:', err);
      setError('Failed to search for images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for images..."
            className="pl-8 bg-green-700 border-green-600 text-white"
          />
        </div>
        <Button
          onClick={() => searchImages(searchQuery)}
          disabled={loading || !searchQuery.trim()}
          className="bg-green-600 hover:bg-green-500"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {suggestedQueries.map(query => (
          <Button
            key={query}
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery(query);
              searchImages(query);
            }}
            className="text-green-300 border-green-600 hover:bg-green-700 hover:text-white"
          >
            {query}
          </Button>
        ))}
      </div>
      
      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div 
              key={image.id}
              className={`relative cursor-pointer rounded-md overflow-hidden border-2 hover:opacity-90 transition-all ${
                selectedImageUrl === image.urls.regular 
                  ? 'border-green-400 ring-2 ring-green-400' 
                  : 'border-transparent'
              }`}
              onClick={() => onImageSelect(image.urls.regular)}
            >
              <Image 
                src={image.urls.small} 
                alt={image.alt_description || 'Unsplash image'} 
                className="w-full h-32 object-cover"
                width={400}
                height={300}
              />
              {selectedImageUrl === image.urls.regular && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">Selected</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : !loading && searchQuery && (
        <div className="text-center py-4 text-green-300">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 text-green-400 opacity-50" />
          <p>No images found. Try a different search term.</p>
        </div>
      )}
      
      {selectedImageUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-300 mb-2">Selected image:</p>
          <div className="relative rounded-md overflow-hidden border border-green-600">
            <Image 
              src={selectedImageUrl} 
              alt="Selected image" 
              className="w-full h-40 object-cover"
              width={800}
              height={400}
            />
          </div>
        </div>
      )}
    </div>
  );
}