import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, addBlogPost, deleteBlogPost, updateBlogPost } from '@/app/utils/data-utils';

// GET /api/blog - Get all blog posts
export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin (this should be done with a proper auth middleware)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the blog post data from the request body
    const { title, content, author, imageUrl } = await request.json();
    
    // Validate required fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, message: 'Title, content, and author are required' },
        { status: 400 }
      );
    }
    
    // Add the blog post
    const newPost = addBlogPost({
      title,
      content,
      author,
      imageUrl
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post created successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while creating the blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog?id=123 - Delete a blog post (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is admin (this should be done with a proper auth middleware)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the post ID from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Delete the blog post
    const success = deleteBlogPost(parseInt(id, 10));
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Blog post deleted successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while deleting the blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog?id=123 - Update a blog post (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check if user is admin (this should be done with a proper auth middleware)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the post ID from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Get the updated blog post data from the request body
    const updates = await request.json();
    
    // Update the blog post
    const success = updateBlogPost(parseInt(id, 10), updates);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Blog post updated successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating the blog post' },
      { status: 500 }
    );
  }
}