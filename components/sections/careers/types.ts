export type CareerFilters = {
  search: string;
  department: string;
  location: string;
};

export type CareerOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
};

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    id: "battery-systems-engineer-1",
    title: "Senior Engineer, Battery Systems",
    department: "Engineering",
    location: "New Delhi",
    experience: "5 to 8 years",
    description: "Own the thermal and cell balancing behaviour of the pack across our range.",
  },
  {
    id: "manufacturing-engineer-1",
    title: "Manufacturing Engineer, Assembly",
    department: "Manufacturing",
    location: "New Delhi",
    experience: "3 to 6 years",
    description: "Improve the assembly line that builds every Euler vehicle, one station at a time.",
  },
  {
    id: "fleet-sales-manager-1",
    title: "Fleet Sales Manager",
    department: "Sales",
    location: "Chennai",
    experience: "4 to 8 years",
    description: "Own the thermal and cell balancing behaviour of the pack across our range.",
  },
  {
    id: "battery-systems-engineer-2",
    title: "Senior Engineer, Battery Systems",
    department: "Engineering",
    location: "New Delhi",
    experience: "5 to 8 years",
    description: "Own the thermal and cell balancing behaviour of the pack across our range.",
  },
  {
    id: "manufacturing-engineer-2",
    title: "Manufacturing Engineer, Assembly",
    department: "Manufacturing",
    location: "New Delhi",
    experience: "3 to 6 years",
    description: "Improve the assembly line that builds every Euler vehicle, one station at a time.",
  },
  {
    id: "fleet-sales-manager-2",
    title: "Fleet Sales Manager",
    department: "Sales",
    location: "Chennai",
    experience: "4 to 8 years",
    description: "Own the thermal and cell balancing behaviour of the pack across our range.",
  },
];

export const CAREER_DEPARTMENTS = [
  "Engineering",
  "Manufacturing",
  "Software",
  "Sales",
  "Service",
  "Warranty",
];

export const CAREER_LOCATIONS = [
  "New Delhi",
  "Bengaluru",
  "Pune",
  "Chennai",
  "Mumbai",
];
