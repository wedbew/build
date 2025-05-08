import axios from 'axios';
import { Stop } from '@/types';

/**
 * Fetches bus/tram stops data from the API
 * @returns Promise with array of Stop objects
 */
export const fetchStops = async (): Promise<Stop[]> => {
  try {
    const response = await axios.get<Stop[]>('http://localhost:3000/stops');
    return response.data;
  } catch (error) {
    console.error('Error fetching stops data:', error);
    throw error;
  }
};