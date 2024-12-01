interface MenuItem {
    date: string;
    week: number;
    day: string;
    entree: string;
    platPrincipal: string;
    garniture: string;
    dessert: string;
    sandwiches: string[];
    isHeader?: boolean; // Optional property for headers
  }
  