import { Filter } from "../types/common";

export const filtersData: Record<string, Filter> = {
  model: { type: "checkbox", options: ["Cat-6", "Cat-5", "Cat-4"] },
  wifi: { type: "radio", options: ["Yes", "No"] },
};
