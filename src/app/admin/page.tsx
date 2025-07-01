"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UnsplashImagePicker from "@/components/UnsplashImagePicker";
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Clock, 
  Image, 
  FileText, 
  Edit, 
  Trash, 
  Plus,
  BookOpen
} from "lucide-react";

interface Donation {
  id: number;
  name: string;
  amount: number;
  timestamp: string;
  screenshot?: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [pendingDonations, setPendingDonations] = useState<Donation[]>([]);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('donations'); // 'donations' or 'blog'
  const [newBlogPost, setNewBlogPost] = useState({ title: '', content: '', imageUrl: '' });
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const fundraisingGoal = 100000;

  // Fetch admin status from backend
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await fetch('/api/admin/status');
        const data = await res.json();
        setIsAdmin(data.isAdmin);
        if (!data.isAdmin) {
          router.push('/admin/login');
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        router.push('/admin/login');
      }
    };
    checkAdminStatus();
  }, [router]);

  // Fetch pending donations, raised amount, and blog posts from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [donationsRes, raisedRes, blogRes] = await Promise.all([
          fetch('/api/donations/pending'),
          fetch('/api/donations/raised-amount'),
          fetch('/api/blog')
        ]);
        
        if (!donationsRes.ok) {
          throw new Error(`Failed to fetch pending donations: ${donationsRes.status}`);
        }
        
        if (!raisedRes.ok) {
          throw new Error(`Failed to fetch raised amount: ${raisedRes.status}`);
        }
        
        if (!blogRes.ok) {
          throw new Error(`Failed to fetch blog posts: ${blogRes.status}`);
        }
        
        const donations = await donationsRes.json();
        const raised = await raisedRes.json();
        const posts = await blogRes.json();
        
        setPendingDonations(donations);
        setRaisedAmount(raised.raisedAmount);
        setBlogPosts(posts);
        setError('');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const handleApprove = async (id: number, amount: number) => {
    try {
      const response = await fetch('/api/donations/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setPendingDonations((prev) => prev.filter((donation) => donation.id !== id));
        setRaisedAmount((prev) => prev + amount);
        setSuccessMessage(`Donation of Nrs ${amount.toLocaleString()} approved!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(data.message || 'Failed to approve donation.');
      }
    } catch (err) {
      console.error('Error approving donation:', err);
      setError('Failed to approve donation. Please try again.');
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch('/api/donations/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setPendingDonations((prev) => prev.filter((donation) => donation.id !== id));
        setSuccessMessage("Donation rejected successfully.");
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reject donation.');
      }
    } catch (err) {
      console.error('Error rejecting donation:', err);
      setError('Failed to reject donation. Please try again.');
    }
  };

  // Handle creating a new blog post
  const handleCreateBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      setError('Title and content are required for blog posts.');
      return;
    }

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token' // This would be a proper JWT in production
        },
        body: JSON.stringify({
          title: newBlogPost.title,
          content: newBlogPost.content,
          author: 'Admin',
          imageUrl: newBlogPost.imageUrl || undefined
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBlogPosts([data.post, ...blogPosts]);
        setNewBlogPost({ title: '', content: '', imageUrl: '' });
        setSuccessMessage('Blog post created successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(data.message || 'Failed to create blog post.');
      }
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Failed to create blog post. Please try again.');
    }
  };

  // Handle updating a blog post
  const handleUpdateBlogPost = async () => {
    if (!editingPost || !editingPost.title || !editingPost.content) {
      setError('Title and content are required for blog posts.');
      return;
    }

    try {
      const response = await fetch(`/api/blog?id=${editingPost.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token' // This would be a proper JWT in production
        },
        body: JSON.stringify({
          title: editingPost.title,
          content: editingPost.content,
          imageUrl: editingPost.imageUrl
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBlogPosts(blogPosts.map(post => 
          post.id === editingPost.id ? editingPost : post
        ));
        setEditingPost(null);
        setSuccessMessage('Blog post updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(data.message || 'Failed to update blog post.');
      }
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError('Failed to update blog post. Please try again.');
    }
  };

  // Handle deleting a blog post
  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': 'Bearer admin-token' // This would be a proper JWT in production
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBlogPosts(blogPosts.filter(post => post.id !== id));
        setSuccessMessage('Blog post deleted successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(data.message || 'Failed to delete blog post.');
      }
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError('Failed to delete blog post. Please try again.');
    }
  };

  if (!isAdmin || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white p-4 sm:p-6 flex items-center justify-center">
        <Card className="bg-green-800 border-green-700 text-white w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 text-green-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl">Loading admin panel... or redirecting to login.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const progress = (raisedAmount / fundraisingGoal) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Admin Dashboard</h1>
        <p className="text-center mb-6 text-green-300">Welcome, Administrator! Here you can manage donations and fundraising goals.</p>

        {error && (
          <Card className="bg-red-900 border-red-700 text-white mb-6">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => window.location.reload()} 
                  className="mt-2"
                >
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {successMessage && (
          <Card className="bg-green-700 border-green-600 text-white mb-6">
            <CardContent className="p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
              <p className="font-medium">{successMessage}</p>
            </CardContent>
          </Card>
        )}
      
        {/* Admin Navigation Tabs */}
        <div className="flex mb-6 border-b border-green-700">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'donations' 
                ? 'border-b-2 border-green-400 text-green-400' 
                : 'text-green-300 hover:text-green-200'
            }`}
            onClick={() => setActiveTab('donations')}
          >
            <DollarSign className="h-4 w-4 inline mr-1" />
            Donations
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'blog' 
                ? 'border-b-2 border-green-400 text-green-400' 
                : 'text-green-300 hover:text-green-200'
            }`}
            onClick={() => setActiveTab('blog')}
          >
            <BookOpen className="h-4 w-4 inline mr-1" />
            Blog Management
          </button>
        </div>
        
        {activeTab === 'donations' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-green-800 border-green-700 text-white col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                Pending Donations
              </CardTitle>
              <CardDescription className="text-green-300">
                {pendingDonations.length} donation{pendingDonations.length !== 1 ? 's' : ''} awaiting approval
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-green-800 border-green-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Raised Amount
              </CardTitle>
              <CardDescription className="text-green-300">
                Current fundraising progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2">Nrs {raisedAmount.toLocaleString()}</p>
              <Progress 
                value={progress} 
                max={100} 
                className="h-2 bg-green-900"
              />
              <p className="text-xs text-green-300 mt-2">
                {progress.toFixed(1)}% of Nrs {fundraisingGoal.toLocaleString()} goal
              </p>
            </CardContent>
          </Card>
        </div>

            <Card className="bg-green-800 border-green-700 text-white">
          <CardHeader>
            <CardTitle>Pending Donations</CardTitle>
            <CardDescription className="text-green-300">
              Review and manage donation requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingDonations.length === 0 ? (
              <div className="text-center py-8 text-green-300">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-400" />
                <p>No pending donations to review.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDonations.map((donation) => (
                  <Card key={donation.id} className="bg-green-700 border-green-600">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{donation.name}</h3>
                          <p className="text-green-300 text-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(donation.timestamp).toLocaleString()}
                          </p>
                          <p className="text-xl font-bold mt-1">Nrs {donation.amount.toLocaleString()}</p>
                          {donation.screenshot && (
                            <p className="text-sm text-green-300 flex items-center gap-1 mt-1">
                              <Image className="h-3 w-3" />
                              Screenshot: <a 
                                href={`/${donation.screenshot}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-200 hover:text-white underline"
                              >
                                {donation.screenshot}
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="flex sm:flex-col gap-2 self-end sm:self-center">
                          <Button
                            variant="green"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleApprove(donation.id, donation.amount)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleReject(donation.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'blog' && (
          <>
            <Card className="bg-green-800 border-green-700 text-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  Blog Management
                </CardTitle>
                <CardDescription className="text-green-300">
                  Create, edit, and manage blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingPost ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Edit Blog Post</h3>
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Title</Label>
                      <Input
                        id="edit-title"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                        className="bg-green-700 border-green-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-content">Content</Label>
                      <textarea
                        id="edit-content"
                        value={editingPost.content}
                        onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                        rows={6}
                        className="w-full p-2 bg-green-700 border border-green-600 rounded-md text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-image">Select an Image</Label>
                      <UnsplashImagePicker
                        onImageSelect={(imageUrl) => setEditingPost({...editingPost, imageUrl})}
                        selectedImageUrl={editingPost.imageUrl}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setEditingPost(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="green"
                        onClick={handleUpdateBlogPost}
                      >
                        Update Post
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Create New Blog Post</h3>
                    <div className="space-y-2">
                      <Label htmlFor="new-title">Title</Label>
                      <Input
                        id="new-title"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                        className="bg-green-700 border-green-600 text-white"
                        placeholder="Enter blog post title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-content">Content</Label>
                      <textarea
                        id="new-content"
                        value={newBlogPost.content}
                        onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                        rows={6}
                        className="w-full p-2 bg-green-700 border border-green-600 rounded-md text-white"
                        placeholder="Enter blog post content"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-image">Select an Image</Label>
                      <UnsplashImagePicker
                        onImageSelect={(imageUrl) => setNewBlogPost({...newBlogPost, imageUrl})}
                        selectedImageUrl={newBlogPost.imageUrl}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="green"
                        onClick={handleCreateBlogPost}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Create Post
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-green-800 border-green-700 text-white">
              <CardHeader>
                <CardTitle>Existing Blog Posts</CardTitle>
                <CardDescription className="text-green-300">
                  Manage your existing blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blogPosts.length === 0 ? (
                  <div className="text-center py-8 text-green-300">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 text-green-400" />
                    <p>No blog posts yet. Create your first post above.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="bg-green-700 border-green-600">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{post.title}</h3>
                              <p className="text-green-300 text-sm flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(post.date).toLocaleDateString()}
                              </p>
                              <p className="text-green-200 mt-2 line-clamp-2">{post.content}</p>
                              {post.imageUrl && (
                                <p className="text-sm text-green-300 flex items-center gap-1 mt-1">
                                  <Image className="h-3 w-3" />
                                  Image: <a 
                                    href={post.imageUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-200 hover:text-white underline"
                                  >
                                    View
                                  </a>
                                </p>
                              )}
                            </div>
                            <div className="flex sm:flex-col gap-2 self-end sm:self-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => setEditingPost(post)}
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleDeleteBlogPost(post.id)}
                              >
                                <Trash className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}