"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, SearchIcon, BookOpenIcon } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  // Fetch blog posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        setError('');
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Blog</h1>
          <p className="text-xl text-green-300 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and stories from our community projects across Nepal.
          </p>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-green-400" />
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="pl-10 bg-green-800/50 border-green-700 text-white placeholder:text-green-400 w-full md:w-1/2 mx-auto block"
          />
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400 mx-auto"></div>
            <p className="mt-4 text-xl">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-900/50 rounded-lg">
            <p className="text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-green-800/50 rounded-lg">
            <BookOpenIcon className="h-12 w-12 mx-auto text-green-400 mb-4" />
            <p className="text-xl">No blog posts found matching your search.</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-green-800/70 border-green-700 hover:bg-green-700/80 transition-colors overflow-hidden">
                {post.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={700} // Placeholder, adjust as needed
                      height={300} // Placeholder, adjust as needed
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">{post.title}</CardTitle>
                  <div className="flex items-center text-green-300 text-sm mt-2">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.date)}</span>
                    <span className="mx-2">•</span>
                    <span>By {post.author}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-green-100 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <Link 
                    href={`#post-${post.id}`} 
                    className="inline-block text-green-400 hover:text-green-300 font-medium"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}