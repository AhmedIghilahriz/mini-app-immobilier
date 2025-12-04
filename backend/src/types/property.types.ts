export interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  description?: string;
  type: 'vente' | 'location';
  images: string[]; 
  createdAt: Date;
}

export type CreatePropertyDTO = Omit<Property, 'id' | 'createdAt'>;
export type UpdatePropertyDTO = Partial<CreatePropertyDTO>;