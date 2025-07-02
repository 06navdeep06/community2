import fs from 'fs';
import path from 'path';

// Define the path to the data directory
const dataDirectory = path.join(process.cwd(), 'src', 'app', 'data');

// Define types for our data
export interface Donation {
  id: number;
  name: string;
  amount: number;
  screenshot?: string;
  timestamp: string;
}

export interface DonationsData {
  pendingDonations: Donation[];
  approvedDonations: Donation[];
  raisedAmount: number;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export interface BlogData {
  posts: BlogPost[];
}

export interface AdminData {
  username: string;
  password: string;
}

// Function to read the donations data
export function getDonationsData(): DonationsData {
  try {
    const filePath = path.join(dataDirectory, 'donations.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch {
    // If the file doesn't exist or there's an error, return default data
    return {
      pendingDonations: [],
      approvedDonations: [],
      raisedAmount: 0
    };
  }
}

// Function to write the donations data
export function saveDonationsData(data: DonationsData): void {
  try {
    const filePath = path.join(dataDirectory, 'donations.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    console.error('Error saving donations data:');
    throw new Error('Failed to save donations data');
  }
}

// Function to read the blog posts data
export function getBlogData(): BlogData {
  try {
    const filePath = path.join(dataDirectory, 'blog-posts.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch {
    // If the file doesn't exist or there's an error, return default data
    return {
      posts: []
    };
  }
}

// Function to save the blog posts data
export function saveBlogData(data: BlogData): void {
  try {
    const filePath = path.join(dataDirectory, 'blog-posts.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    console.error('Error saving blog data:');
    throw new Error('Failed to save blog data');
  }
}

// Function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  const data = getBlogData();
  return data.posts;
}

// Function to add a new blog post
export function addBlogPost(post: Omit<BlogPost, 'id' | 'date'>): BlogPost {
  const data = getBlogData();
  const newPost = {
    ...post,
    id: Date.now(),
    date: new Date().toISOString()
  };
  
  data.posts.unshift(newPost); // Add to the beginning of the array
  saveBlogData(data);
  
  return newPost;
}

// Function to delete a blog post
export function deleteBlogPost(id: number): boolean {
  const data = getBlogData();
  const initialLength = data.posts.length;
  
  data.posts = data.posts.filter(post => post.id !== id);
  
  if (data.posts.length === initialLength) {
    return false; // No post was deleted
  }
  
  saveBlogData(data);
  return true;
}

// Function to update a blog post
export function updateBlogPost(id: number, updates: Partial<Omit<BlogPost, 'id'>>): boolean {
  const data = getBlogData();
  const postIndex = data.posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return false;
  }
  
  data.posts[postIndex] = {
    ...data.posts[postIndex],
    ...updates
  };
  
  saveBlogData(data);
  return true;
}

// Function to read the admin data
export function getAdminData(): AdminData {
  try {
    const filePath = path.join(dataDirectory, 'admin.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch {
    // If the file doesn't exist or there's an error, return default data
    return {
      username: 'admin',
      password: 'project@4123'
    };
  }
}

// Function to verify admin credentials
export function verifyAdminCredentials(username: string, password: string): boolean {
  const adminData = getAdminData();
  return adminData.username === username && adminData.password === password;
}

// Function to add a new pending donation
export function addPendingDonation(donation: Omit<Donation, 'id'>): Donation {
  const data = getDonationsData();
  const newDonation = {
    ...donation,
    id: Date.now() // Use timestamp as a simple unique ID
  };
  
  data.pendingDonations.push(newDonation);
  saveDonationsData(data);
  
  return newDonation;
}

// Function to approve a donation
export function approveDonation(id: number): boolean {
  const data = getDonationsData();
  const donationIndex = data.pendingDonations.findIndex(d => d.id === id);
  
  if (donationIndex === -1) {
    return false;
  }
  
  const donation = data.pendingDonations[donationIndex];
  data.pendingDonations.splice(donationIndex, 1);
  data.approvedDonations.push(donation);
  data.raisedAmount += donation.amount;
  
  saveDonationsData(data);
  return true;
}

// Function to reject a donation
export function rejectDonation(id: number): boolean {
  const data = getDonationsData();
  const donationIndex = data.pendingDonations.findIndex(d => d.id === id);
  
  if (donationIndex === -1) {
    return false;
  }
  
  data.pendingDonations.splice(donationIndex, 1);
  saveDonationsData(data);
  return true;
}

// Function to get pending donations
export function getPendingDonations(): Donation[] {
  const data = getDonationsData();
  return data.pendingDonations;
}

// Function to get the raised amount
export function getRaisedAmount(): number {
  const data = getDonationsData();
  return data.raisedAmount;
}