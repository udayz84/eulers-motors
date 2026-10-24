export type CareerFilters = {
  search: string;
  department: string;
  location: string;
};

export type CareerOpening = {
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
};

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    title: "Senior Engineer, Battery Systems",
    department: "Engineering",
    location: "New Delhi",
    experience: "5 to 8 years",
    description: "Own the thermal and cell balancing behaviour of the pack across our range.",
  },
  {
    title: "Manufacturing Engineer, Assembly",
    department: "Manufacturing",
    location: "New Delhi",
    experience: "3 to 6 years",
    description: "Improve the assembly line that builds every Euler vehicle, one station at a time.",
  },
  {
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
