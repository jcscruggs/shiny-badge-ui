export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isTracking: boolean;
  requirements: string[]; // Added requirements for more detail
}
