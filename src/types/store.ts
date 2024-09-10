import { Component, Filter, Hardware } from "./common";

export interface ITHardwareState {
  components: Component[];
  filters: Record<string, Filter>;
  hardware: Hardware[];
  filteredHardware: Hardware[];
  selectedFilters: Record<string, string | string[]>;
  activeComponent: string | null;
  setComponents: (components: Component[]) => void;
  setFilters: (filters: Record<string, Filter>) => void;
  setHardware: (hardware: Hardware[]) => void;
  setSelectedFilters: (
    selectedFilters: Record<string, string | string[]>
  ) => void;
  setActiveComponent: (componentId: string | null) => void;
  updateFilteredHardware: () => void;
  fetchData: () => Promise<void>;
  selectedProduct: Hardware | null;
  setSelectedProduct: (product: Hardware | null) => void;
}
