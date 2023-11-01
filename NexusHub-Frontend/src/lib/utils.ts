import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(statusCode: number) {
  if (statusCode >= 200 && statusCode < 300) {
    return 'bg-green-500'; // for 2xx
  } else if (statusCode >= 300 && statusCode < 400) {
    return 'bg-yellow-500'; // for 3xx
  } else if (statusCode >= 400 && statusCode < 500) {
    return 'bg-red-500'; // for 4xx
  } else if (statusCode >= 500 && statusCode < 600) {
    return 'bg-purple-500'; // for 5xx (you can change the color if you want)
  } else {
    return 'bg-gray-500'; // default color for other status codes
  }
}