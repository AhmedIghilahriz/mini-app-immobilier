import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  description?: string;
  type: 'vente' | 'location';
  images: string[]; // ← CHANGEMENT
  createdAt: string;
}

export type CreatePropertyDTO = Omit<Property, 'id' | 'createdAt'>;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const propertyAPI = {
  getAll: () => api.get<Property[]>('/properties'),
  getById: (id: string) => api.get<Property>(`/properties/${id}`),
  create: (data: CreatePropertyDTO) => api.post<Property>('/properties', data),
  update: (id: string, data: Partial<CreatePropertyDTO>) => 
    api.put<Property>(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`)
};