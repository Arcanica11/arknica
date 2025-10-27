// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx" // Importar type ClassValue
import { twMerge } from "tailwind-merge"

// Función cn con tipado explícito
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}