// types.ts

export interface Location {
  _id: string;
  name: string;
  locationId: string;
}

export interface ExperienceImage {
  url: string;
  public_id: string;
}

export interface Host {
  image: string;
  title: string;
  details: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Discount {
  type: 'PERCENTAGE' | 'FLAT';
  value: number;
}

export type ExperienceStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Experience {
  _id: string;
  experienceId: string;

  status: ExperienceStatus;

  heading: string;
  subheading: string;
  description: string;

  experienceDate: string;
  startTime: string;
  endTime: string;
  duration: string;

  location: Location;
  experienceAddress: string;
  googleMapLink?: string;

  ageGroup?: string;
  skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  maxParticipants: number;

  pricePerParticipant: number;
  gstIncluded: boolean;
  discount?: Discount;

  experienceImages: ExperienceImage[];
  brochurePdf?: {
    url: string;
    public_id: string;
  };

  hosts: Host[];
  faqs: FAQ[];

  createdAt: string;
  updatedAt: string;
}

/* -------- CART -------- */

export interface CartItem {
  experience: Experience;
  quantity: number;
}
  