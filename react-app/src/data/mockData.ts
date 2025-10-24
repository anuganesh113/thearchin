import type { Apartment, Location, Infrastructure, Testimonial, BlogPost, Stat } from '../types';

export const apartments: Apartment[] = [
  {
    id: '1',
    room: '15.06',
    plan: '/src/assets/images/apartments/plan1.svg',
    area: 65.2,
    housing: 'A',
    floor: 15,
    rooms: 3,
    price: 168500,
    features: ['Basic Interior finishing', 'City View'],
    mortgage: 10.3,
  },
  {
    id: '2',
    room: '9.02',
    plan: '/src/assets/images/apartments/Plan2.svg',
    area: 52,
    housing: 'B',
    floor: 9,
    rooms: 2,
    price: 145500,
    features: ['Basic Interior finishing', 'Park View'],
    mortgage: 10.3,
  },
  {
    id: '3',
    room: '5.24',
    plan: '/src/assets/images/apartments/plan3.svg',
    area: 65.2,
    housing: 'B',
    floor: 5,
    rooms: 3,
    price: 152000,
    features: ['Premium Interior', 'Lake View'],
    mortgage: 10.3,
  },
  {
    id: '4',
    room: '12.15',
    plan: '/src/assets/images/apartments/Plan4.svg',
    area: 78.5,
    housing: 'A',
    floor: 12,
    rooms: 4,
    price: 195000,
    features: ['Luxury Interior', 'Panoramic View'],
    mortgage: 10.3,
  },
  {
    id: '5',
    room: '8.09',
    plan: '/src/assets/images/apartments/plan5.svg',
    area: 48,
    housing: 'C',
    floor: 8,
    rooms: 2,
    price: 138000,
    features: ['Modern Interior', 'Garden View'],
    mortgage: 10.3,
  },
];

export const locations: Location[] = [
  {
    id: '1',
    name: 'Manhattan Center Park',
    image: '/src/assets/images/location/loc1.jpg',
    time: 5,
    unit: 'walk',
  },
  {
    id: '2',
    name: 'Walmart Mall',
    image: '/src/assets/images/location/loc2.jpg',
    time: 15,
    unit: 'walk',
  },
  {
    id: '3',
    name: 'Mestson Lake',
    image: '/src/assets/images/location/loc3.jpg',
    time: 20,
    unit: 'walk',
  },
  {
    id: '4',
    name: 'Orlando Museum of Art',
    image: '/src/assets/images/location/loc4.jpg',
    time: 17,
    unit: 'car',
  },
];

export const infrastructures: Infrastructure[] = [
  {
    id: '1',
    number: 1,
    title: 'Sport',
    subtitle: 'Fitness, Pool and Spa',
    image: '/src/assets/images/flowless/fl1.jpg',
  },
  {
    id: '2',
    number: 2,
    title: 'Gastronomy',
    subtitle: 'Restaurant & Cafe',
    image: '/src/assets/images/flowless/fl2.jpg',
  },
  {
    id: '3',
    number: 3,
    title: 'Entertainment',
    subtitle: 'Cinema & Game Room',
    image: '/src/assets/images/flowless/fl3.jpg',
  },
  {
    id: '4',
    number: 4,
    title: 'Services',
    subtitle: 'Concierge & Maintenance',
    image: '/src/assets/images/flowless/fl4.jpg',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Property Owner',
    content: 'Living at The Archin has exceeded all my expectations. The amenities are world-class, and the location is unbeatable. I truly feel like I\'m living in a five-star hotel every day.',
    image: '/src/assets/images/testi.png',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Resident',
    content: 'The attention to detail in every aspect of The Archin is remarkable. From the stunning architecture to the exceptional service, everything is top-notch. Highly recommended!',
    image: '/src/assets/images/testi.png',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Apartment Owner',
    content: 'Best investment decision I\'ve made. The property value has appreciated significantly, and the quality of life here is incomparable. The management team is always responsive and professional.',
    image: '/src/assets/images/testi.png',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Luxury Living',
    excerpt: 'Discover how modern architecture is reshaping the concept of premium residential spaces.',
    image: '/src/assets/images/blog1.jpg',
    date: '2024-10-15',
    category: 'Architecture',
  },
  {
    id: '2',
    title: 'Investing in Premium Real Estate',
    excerpt: 'Learn why luxury apartments are becoming the preferred choice for smart investors.',
    image: '/src/assets/images/blog1.jpg',
    date: '2024-10-10',
    category: 'Investment',
  },
  {
    id: '3',
    title: 'Sustainable Living in Urban Spaces',
    excerpt: 'How The Archin combines luxury with environmental responsibility.',
    image: '/src/assets/images/blog1.jpg',
    date: '2024-10-05',
    category: 'Sustainability',
  },
];

export const stats: Stat[] = [
  {
    value: '5,265',
    label: 'Square Meter Areas',
  },
  {
    value: '924',
    label: 'Spacious & Modern Apartments',
  },
  {
    value: '1,264',
    label: 'Slot Car Parking Indoor and Outdoor',
  },
];
