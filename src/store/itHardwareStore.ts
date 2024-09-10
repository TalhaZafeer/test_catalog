import { create } from "zustand";
import { ITHardwareState } from "../types/store";
import { componentsData } from "../_mock/components";
import { hardwareData } from "../_mock/hardware";
import { filtersData } from "../_mock/filters";

export const useITHardwareStore = create<ITHardwareState>((set) => ({
  components: [],
  filters: {},
  hardware: [],
  filteredHardware: [],
  selectedFilters: {},
  activeComponent: null,
  setComponents: (components) => set({ components }),
  setFilters: (filters) => set({ filters }),
  setHardware: (hardware) => set({ hardware, filteredHardware: hardware }),
  setSelectedFilters: (selectedFilters) => set({ selectedFilters }),
  setActiveComponent: (componentId) => set({ activeComponent: componentId }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  updateFilteredHardware: () =>
    set((state) => ({
      filteredHardware: state.hardware.filter((item) => {
        if (
          state.activeComponent &&
          !item.categories.includes(state.activeComponent)
        ) {
          return false;
        }
        return Object.entries(state.selectedFilters).every(
          ([filterType, selectedValues]) => {
            if (Array.isArray(selectedValues)) {
              return (
                selectedValues.length === 0 ||
                selectedValues.some((value) => item[filterType] === value)
              );
            }
            return !selectedValues || item[filterType] === selectedValues;
          }
        );
      }),
    })),
  fetchData: async () => {
    // Simulating API calls
    set({
      components: componentsData,
      filters: filtersData,
      hardware: hardwareData,
      filteredHardware: hardwareData,
    });
  },
}));
