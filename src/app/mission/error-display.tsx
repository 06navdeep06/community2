"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorDisplayProps {
  errorMessage: string;
}

export default function ErrorDisplay({ errorMessage }: ErrorDisplayProps) {
  return (
    <Card className="bg-red-50 border-red-200 mb-12">
      <CardContent className="p-6 text-center text-red-600">
        <p>{errorMessage}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}