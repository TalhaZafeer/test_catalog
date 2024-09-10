import { Component } from "../types/common";

export const componentsData: Component[] = [
  {
    id: "components",
    name: "Components",
    subcategories: [
      {
        id: "routers",
        name: "Routers",
        subcategories: [
          { id: "basic-routers", name: "Basic Routers", count: 2 },
          {
            id: "bill-acceptor",
            name: "Bill Acceptor",
            subcategories: [
              { id: "sub-bill-acceptor", name: "Sub Bill Acceptor" },
              { id: "subhd-acceptor", name: "SubHD Acceptor" },
            ],
          },
        ],
        count: 2,
      },
      { id: "cables", name: "Cables", count: 1 },
    ],
    count: 3,
  },
  { id: "garage-cabinets", name: "Garage Cabinets" },
  { id: "desks", name: "Desks" },
  { id: "seating", name: "Seating" },
];
