export interface Component {
  id: string;
  name: string;
  subcategories?: Component[];
  count?: number;
}

export interface Hardware {
  id: number;
  name: string;
  description: string;
  categories: string[];
  [key: string]: any;
}

export interface Filter {
  type: "checkbox" | "radio";
  options: string[];
}
