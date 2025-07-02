export interface SuccessStory {
  id: number;
  icon: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  footer: {
    metric: string;
    icon: string;
  };
} 