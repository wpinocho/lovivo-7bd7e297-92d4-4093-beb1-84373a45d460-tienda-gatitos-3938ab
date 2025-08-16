export interface Kitten {
  id: number;
  name: string;
  breed: string;
  age: string;
  price: number;
  image: string;
  description: string;
  gender: 'male' | 'female';
  vaccinated: boolean;
  available: boolean;
}

export interface CartItem {
  kitten: Kitten;
  quantity: number;
}