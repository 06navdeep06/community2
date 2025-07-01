"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload, Heart } from "lucide-react";

export default function Donate() {
  const [donation, setDonation] = useState({ amount: "", name: "", screenshot: null as File | null });
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const fundraisingGoal = 100000;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDonation({ ...donation, screenshot: e.target.files[0] });
    }
  };

  // Fetch the raised amount from the API
  useEffect(() => {
    const fetchRaisedAmount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/donations/raised-amount');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch raised amount: ${response.status}`);
        }
        
        const data = await response.json();
        setRaisedAmount(data.raisedAmount);
        setError('');
      } catch (err) {
        console.error('Error fetching raised amount:', err);
        setError('Failed to load fundraising data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRaisedAmount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!donation.amount || !donation.name) {
      setError("Please fill in all required fields.");
      return;
    }
    
    const amount = parseFloat(donation.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real application, you would handle file uploads properly
      // For this example, we'll just send the filename
      const donationData = {
        name: donation.name,
        amount: amount,
        screenshot: donation.screenshot ? donation.screenshot.name : undefined,
      };
      
      const response = await fetch('/api/donations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccess(`Thank you, ${donation.name}, for your donation of Nrs ${amount.toLocaleString()}! Your donation is pending verification.`);
        setDonation({ amount: "", name: "", screenshot: null });
      } else {
        setError(data.message || 'Failed to submit donation. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting donation:', err);
      setError('An error occurred while submitting your donation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (raisedAmount / fundraisingGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Heart className="h-8 w-8 text-green-400" />
          Support Our Community
        </h1>
        
        {error && (
          <Card className="bg-red-900 border-red-700 text-white mb-6">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
                {!submitting && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => window.location.reload()} 
                    className="mt-2"
                  >
                    Refresh
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {success && (
          <Card className="bg-green-700 border-green-600 text-white mb-6">
            <CardContent className="p-4 flex items-start gap-3">
              <Heart className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{success}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="bg-green-800 border-green-700 text-white mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-center">Fundraising Progress</CardTitle>
            <CardDescription className="text-green-300 text-center">
              Help us reach our goal of Nrs {fundraisingGoal.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2 text-sm">
              <span>0</span>
              <span>
                {loading ? 'Loading...' : `Nrs ${raisedAmount.toLocaleString()}`}
              </span>
              <span>Nrs {fundraisingGoal.toLocaleString()}</span>
            </div>
            <Progress 
              value={loading ? 0 : progress} 
              max={100} 
              className="h-3 bg-green-900"
              showValue
              size="lg"
            />
          </CardContent>
        </Card>
        
        <Card className="bg-green-800 border-green-700 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Make a Donation</CardTitle>
            <CardDescription className="text-green-300">
              Your contribution helps support community projects in Nepal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={donation.name}
                  onChange={(e) => setDonation({ ...donation, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="bg-green-700 border-green-600 text-white placeholder:text-green-300"
                  disabled={submitting}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount (Nrs)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={donation.amount}
                  onChange={(e) => setDonation({ ...donation, amount: e.target.value })}
                  placeholder="Enter amount in Nepalese Rupees"
                  className="bg-green-700 border-green-600 text-white placeholder:text-green-300"
                  disabled={submitting}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="screenshot" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Payment Screenshot (Optional)
                </Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-green-700 border-green-600 text-white file:bg-green-600 file:text-white file:border-0 cursor-pointer"
                  disabled={submitting}
                />
                <p className="text-xs text-green-300">Upload a screenshot of your payment for verification</p>
              </div>
              
              <Button 
                type="submit" 
                variant="green"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Processing...' : 'Donate Now'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}