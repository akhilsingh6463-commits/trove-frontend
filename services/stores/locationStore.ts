import { getPublicLocations, PublicLocation, ApiResponse } from '../util/api';

// Global store - SINGLE fetch forever
let locationsCache: PublicLocation[] = [];
let isInitialized = false;
let loading = false;
let error: string | null = null;

class LocationStore {
  async init(): Promise<void> {
    if (isInitialized) return;
    
    try {
      loading = true;
      error = null;
      const result = await getPublicLocations();
      
      if (result.success) {
        locationsCache = result.data || [];
      } else {
        error = result.message || 'Failed to load locations';
        // Fallback data
        locationsCache = [
          { _id: '1', locationId: 'MUM01', name: 'Mumbai' },
          { _id: '2', locationId: 'PUNE01', name: 'Pune' },
          { _id: '3', locationId: 'DEL01', name: 'Delhi' }
        ];
      }
    } catch (err) {
      error = 'Network error';
      locationsCache = []; // Empty fallback
    } finally {
      loading = false;
      isInitialized = true;
    }
  }

  get locations(): PublicLocation[] {
    return locationsCache;
  }

  get loading(): boolean {
    return loading;
  }

  get error(): string | null {
    return error;
  }

  async refresh(): Promise<void> {
    isInitialized = false; // Reset cache
    await this.init();
  }

  getCityFilters(): Array<{ code: string; name: string }> {
    return [
      { code: 'ALL', name: 'All Locations' },
      ...this.locations.map(loc => ({
        code: loc.locationId.slice(0, 3),
        name: loc.name
      }))
    ];
  }
}

// Single global instance
export const locationStore = new LocationStore();
