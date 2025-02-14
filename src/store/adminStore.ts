import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminSettings, Resource } from '../types';

const defaultSettings: AdminSettings = {
  siteName: 'Construction Calculator Pro',
  logo: 'building',
  logoUrl: '',
  brandColor: '#2563eb',
  reportHeader: 'Construction Cost Estimation Report',
  reportFooter: 'Thank you for using our service',
  pricePerSqFt: 2500,
  laborCostPerDay: 1500,
  brickPrice: 30,
  cementPrice: 1200,
  steelPrice: 250000,
  plumbingCostPerSqFt: 200,
  electricalCostPerSqFt: 300,
  mortarRatio: '1:4',
  sandPrice: 5000,
  resources: [],
  assumptions: {
    bricksPerSqFt: 8,
    cementBagsPerSqFt: 0.4,
    steelPerSqFt: 0.007,
    laborProductivityPerDay: 100,
    mortarPerBrick: 0.001,
    sandPerBag: 4.5,
    builtUpAreaFactor: 0.75,
    largePlotFactor: 0.5,
    materialCostFactor: 0.7,
    laborCostFactor: 0.3,
    foundationCostPerSqFt: 500,
    flooringCostPerSqFt: 150,
    paintingCostPerSqFt: 15,
    plasteringCostPerSqFt: 30,
    windowCost: 10000,
    doorCost: 8000,
    kitchenBaseCost: 50000,
    waterTankCost: 40000,
    parkingCost: 150000,
    fullEscapePremium: 0.1,
    basementCost: 200000,
    garageCost: 150000,
    timelineBaseCost: 50000,
    timelineFactorPerMonth: 0.02,
    locationFactors: {
      urban: 1.2,
      suburban: 1.0,
      rural: 0.8
    },
    qualityFactors: {
      standard: 1.0,
      premium: 1.3,
      luxury: 1.6
    }
  },
};

interface AdminStore {
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  addResource: (resource: Omit<Resource, 'id' | 'dateAdded'>) => void;
  removeResource: (id: string) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      isAuthenticated: false,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            assumptions: {
              ...state.settings.assumptions,
              ...(newSettings.assumptions || {}),
              locationFactors: {
                ...state.settings.assumptions.locationFactors,
                ...(newSettings.assumptions?.locationFactors || {})
              },
              qualityFactors: {
                ...state.settings.assumptions.qualityFactors,
                ...(newSettings.assumptions?.qualityFactors || {})
              }
            },
          },
        })),
      addResource: (resource) =>
        set((state) => ({
          settings: {
            ...state.settings,
            resources: [
              ...state.settings.resources,
              {
                ...resource,
                id: crypto.randomUUID(),
                dateAdded: new Date().toISOString(),
              },
            ],
          },
        })),
      removeResource: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            resources: state.settings.resources.filter((r) => r.id !== id),
          },
        })),
      login: (username, password) => {
        if (username === 'admin' && password === 'admin') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'admin-storage',
    }
  )
);