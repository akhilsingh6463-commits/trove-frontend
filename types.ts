export interface Experience {
  id: string;
  title: string;
  category: string;
  date: string;
  time?: string;
  address?: string;
  location: string;
  price: string;
  image: string;
  gallery?: string[];
  cityTag: string;
  priceValue?: number;
  deliverables?: string[];
  host?: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  faqs?: { question: string; answer: string }[];
  reviews?: { user: string; text: string }[];
}

export interface CartItem extends Experience {
  quantity: number;
}