export const SEO_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Uttarakhand", "West Bengal",
  "Uttar Pradesh", "Telangana", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Madhya Pradesh", "Maharashtra", "Mizoram", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Kerala",
];

export const SEO_CITIES = [
  "Visakhapatnam", "Vijayawada", "Guwahati", "Patna", "Chandigarh", "Bhilai", "Raipur", "Korba", "Central Delhi",
  "Dehradun", "Kolkata", "Ghaziabad", "Noida", "Kanpur", "Varanasi", "Hyderabad", "South Delhi", "West Delhi",
  "Panaji", "Ahmedabad", "Gurugram", "Dharamshala", "Jammu", "Ranchi", "Bengaluru", "Indore", "Pune", "Aizawl",
  "Bhubaneswar", "Mohali", "Zirakpur", "Jodhpur", "Chennai", "Jaipur", "East Delhi", "Greater Noida", "Kangra",
  "Kochi", "South West Delhi", "Coimbatore", "Faridabad", "Surat", "Bangalore", "Mumbai", "Thane", "Navi Mumbai",
  "South East Delhi", "Trivandrum", "Calicut", "Gurgaon", "Sonipat", "Vadodara", "Lucknow", "Nagpur", "Nashik",
  "Meerut", "Bhopal",
];

// Spellings used in SEO lists that map onto a city slug in CITIES.
export const CITY_ALIASES: Record<string, string> = { bangalore: "bengaluru", gurgaon: "gurugram" };

export const SEO_LINK_GROUPS = [
  { title: "Virtual Office in Major States", kind: "state", items: SEO_STATES },
  { title: "Virtual Office in Major Cities", kind: "city", items: SEO_CITIES },
  { title: "Virtual Office for Business Registration in Major Cities", kind: "city", items: SEO_CITIES },
  { title: "Virtual Office for already registered businesses in Major Cities", kind: "city", items: SEO_CITIES },
  { title: "Virtual Office for Mailing Address Registration in Major Cities", kind: "city", items: SEO_CITIES },
] as const;
