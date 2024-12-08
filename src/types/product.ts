import * as z from 'zod'

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    isFav: boolean;
  }

export type ListShowMode = "ALL" | "ONLY_FAV"

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name cannot be empty"),
    imageUrl: z.string(),
  });
  
  export type ProductSchemaType = z.infer<typeof ProductSchema>;