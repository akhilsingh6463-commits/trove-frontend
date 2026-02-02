import { Experience } from '../types';

const PUBLIC_API_BASE = import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:5000';

/* ===================== */
/* 🔒 SHARED CACHE */
/* ===================== */

let experiencesCache: Experience[] | null = null;
let experiencesPromise: Promise<Experience[]> | null = null;


export interface PublicLocation {
  _id: string;
  locationId: string;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const getPublicLocations = async (): Promise<ApiResponse<PublicLocation[]>> => {
  try {
    // ✅ CORRECT: /api/locations (matches admin API pattern)
    const response = await fetch(`${PUBLIC_API_BASE}/api/locations`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    return response.ok 
      ? { success: true, data: data.data || [] } 
      : { success: false, message: data.message || 'Failed to fetch locations' };
  } catch (error) {
    console.error('Public locations error:', error);
    // Fallback hardcoded
    return { 
      success: true, 
      data: [
        { _id: '1', locationId: 'MUMBAI01', name: 'Mumbai' },
        { _id: '2', locationId: 'PUNE01', name: 'Pune' },
        { _id: '3', locationId: 'DELHI01', name: 'Delhi' },
        { _id: '4', locationId: 'DELHI01', name: 'Banglore' }
      ]
    };
  }
};

export const getAllExperiences = async (
  params?: {
    location?: string;
    date?: string;
    search?: string;
  }
): Promise<Experience[]> => {

  // ✅ If already fetched → reuse
  if (experiencesCache) {
    return experiencesCache;
  }

  // ✅ If fetch already in progress → reuse same promise
  if (experiencesPromise) {
    return experiencesPromise;
  }

  experiencesPromise = (async () => {
    const query = params
      ? new URLSearchParams(params as any).toString()
      : '';

    const res = await fetch(
      `${PUBLIC_API_BASE}/api/experiences${query ? `?${query}` : ''}`,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const json = await res.json();
    experiencesCache = json.data || [];
    experiencesPromise = null;

    return experiencesCache;
  })();

  return experiencesPromise;
};

export const getExperienceById = async (
  id: string
): Promise<Experience | undefined> => {

  // ✅ Use already-fetched experiences
  if (!experiencesCache) {
    await getAllExperiences();
  }

  return experiencesCache?.find(exp => exp._id === id);
};

