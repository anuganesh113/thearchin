export interface Apartment {
  id: string;
  room: string;
  plan: string;
  area: number;
  housing: string;
  floor: number;
  rooms: number;
  price: number;
  features: string[];
  mortgage: number;
}

export interface Location {
  id: string;
  name: string;
  image: string;
  time: number;
  unit: 'walk' | 'car';
}

export interface Infrastructure {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface Stat {
  value: string;
  label: string;
}
