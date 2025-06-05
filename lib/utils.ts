import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getInitials = (name: string|null) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
}

export const getFirstName = (name: string|null) => {
  if (!name) return "";
  const names = name.split(" ");
  return names[0];
}