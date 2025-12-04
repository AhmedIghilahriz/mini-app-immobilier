import { Property, CreatePropertyDTO, UpdatePropertyDTO } from '../types/property.types';
import { v4 as uuidv4 } from 'uuid';

// Base de données avec images Unsplash
let properties: Property[] = [
  {
    id: uuidv4(),
    title: "Appartement T3 lumineux - Centre Ville",
    city: "Paris",
    price: 450000,
    surface: 65,
    description: "Magnifique appartement T3 en plein centre de Paris, entièrement rénové avec goût. Parquet au sol, cuisine équipée, salle de bain moderne.",
    type: "vente",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Studio étudiant moderne",
    city: "Lyon",
    price: 650,
    surface: 25,
    description: "Studio parfait pour étudiant, proche de toutes commodités et du campus universitaire. Meublé et équipé.",
    type: "location",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&q=80"
    ],
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Maison familiale avec jardin",
    city: "Bordeaux",
    price: 380000,
    surface: 120,
    description: "Belle maison familiale T5 avec grand jardin arboré. 4 chambres, 2 salles de bain, garage double.",
    type: "vente",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    ],
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Loft sans photos - À compléter",
    city: "Marseille",
    price: 320000,
    surface: 75,
    description: "Loft industriel en plein centre, à rénover selon vos goûts.",
    type: "vente",
    images: [], // ← Exemple SANS images
    createdAt: new Date()
  }
];

export class PropertyService {
  async getAll(): Promise<Property[]> {
    return properties;
  }

  async getById(id: string): Promise<Property | null> {
    return properties.find(p => p.id === id) || null;
  }

  async create(data: CreatePropertyDTO): Promise<Property> {
    const newProperty: Property = {
      id: uuidv4(),
      ...data,
      createdAt: new Date()
    };
    properties.push(newProperty);
    return newProperty;
  }

  async update(id: string, data: UpdatePropertyDTO): Promise<Property | null> {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;

    properties[index] = {
      ...properties[index],
      ...data
    };
    return properties[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = properties.length;
    properties = properties.filter(p => p.id !== id);
    return properties.length < initialLength;
  }
}