export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  projectType: string;
  capacityKw: number;
  quote: string;
  rating?: number;
  verified: boolean;
  enabled: boolean;
  isPlaceholder?: boolean;
}

// Production default: empty list until verified customer reviews are provided
export const SAHAJA_TESTIMONIALS: TestimonialItem[] = [];
