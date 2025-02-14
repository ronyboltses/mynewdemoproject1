import { create } from 'zustand';
import type { BasicCalculation, AdvancedCalculation } from '../types';

interface CalculatorStore {
  mode: 'basic' | 'advanced';
  basicCalc: BasicCalculation;
  advancedCalc: AdvancedCalculation;
  setMode: (mode: 'basic' | 'advanced') => void;
  updateBasicCalc: (calc: Partial<BasicCalculation>) => void;
  updateAdvancedCalc: (calc: Partial<AdvancedCalculation>) => void;
}

const defaultBasicCalc: BasicCalculation = {
  plotSize: 0,
  floors: 1,
  quality: 'standard',
  bathrooms: 0,
  bedrooms: 0,
  locationType: 'urban',
  timeline: 12,
  basement: false,
  garage: false,
};

const defaultAdvancedCalc: AdvancedCalculation = {
  length: 0,
  width: 0,
  floors: 1,
  doors: 0,
  windows: 0,
  kitchens: 0,
  lounges: 0,
  rooms: [],
  parking: false,
  tanks: 0,
  isFullEscape: false,
  flooringType: 'standard',
  paintType: 'standard',
  plasterType: 'standard',
  laborCount: 1,
};

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  mode: 'basic',
  basicCalc: defaultBasicCalc,
  advancedCalc: defaultAdvancedCalc,
  setMode: (mode) => set({ mode }),
  updateBasicCalc: (calc) =>
    set((state) => ({
      basicCalc: { ...state.basicCalc, ...calc },
    })),
  updateAdvancedCalc: (calc) =>
    set((state) => ({
      advancedCalc: { ...state.advancedCalc, ...calc },
    })),
}));