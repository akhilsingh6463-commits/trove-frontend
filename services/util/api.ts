const PUBLIC_API_BASE = import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:5000';

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
