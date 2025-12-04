import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  price: z.number().positive("Le prix doit être positif"),
  surface: z.number().positive("La surface doit être positive"),
  description: z.string().optional(),
  type: z.enum(['vente', 'location']),
  images: z.array(z.string().url()).default([]) 
});

export const updatePropertySchema = createPropertySchema.partial();

export const idParamSchema = z.object({
  id: z.string().uuid("ID invalide")
});