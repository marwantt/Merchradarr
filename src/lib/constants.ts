export interface Marketplace {
    id: string;
    name: string;
    domain: string;
    sellerId: string;
}

export interface ProductFilters {
    category?: string;
    node?: string;
}

export interface ProductType {
    id: string;
    name: string;
    keyword: string;
    filters?: Record<string, ProductFilters>;
}

export interface SortOption {
    id: string;
    name: string;
    value: string;
}

export const marketplaces: Marketplace[] = [
    { id: "us", name: "Amazon US", domain: "amazon.com", sellerId: "ATVPDKIKX0DER" },
    { id: "uk", name: "Amazon UK", domain: "amazon.co.uk", sellerId: "A1F83G8C2ARO7P" },
    { id: "de", name: "Amazon DE", domain: "amazon.de", sellerId: "A1PA6795UKMFR9" },
    { id: "fr", name: "Amazon FR", domain: "amazon.fr", sellerId: "A13V1IB3VIYZZH" },
    { id: "it", name: "Amazon IT", domain: "amazon.it", sellerId: "APJ6JRA9NG5V4" },
    { id: "es", name: "Amazon ES", domain: "amazon.es", sellerId: "A1RKKUPIHCS9HS" },
];

export interface PostalCode {
  code: string;
  city: string;
}

export interface MarketplaceLocation {
  flag: string;
  steps: string;
  codes: PostalCode[];
}

// Verified real postal codes for each marketplace
// Needed so Amazon shows correct Merch results for that region
export const marketplaceLocations: Record<string, MarketplaceLocation> = {
  uk: {
    flag: "🇬🇧",
    steps: "amazon.co.uk → Hello → Account → Deliver to → Enter postcode",
    codes: [
      { code: "W1A 0AX", city: "London (West End)" },
      { code: "EC1A 1BB", city: "London (City)" },
      { code: "M1 1AE",  city: "Manchester" },
      { code: "B1 1BB",  city: "Birmingham" },
      { code: "EH1 1YZ", city: "Edinburgh" },
      { code: "BS1 4DJ", city: "Bristol" },
      { code: "LS1 1BA", city: "Leeds" },
      { code: "G1 1XW",  city: "Glasgow" },
    ],
  },
  de: {
    flag: "🇩🇪",
    steps: "amazon.de → Hallo → Konto → Lieferadresse → PLZ eingeben",
    codes: [
      { code: "10115", city: "Berlin (Mitte)" },
      { code: "80331", city: "München" },
      { code: "20095", city: "Hamburg" },
      { code: "60311", city: "Frankfurt" },
      { code: "50667", city: "Köln" },
      { code: "70173", city: "Stuttgart" },
      { code: "40213", city: "Düsseldorf" },
      { code: "90402", city: "Nürnberg" },
    ],
  },
  fr: {
    flag: "🇫🇷",
    steps: "amazon.fr → Bonjour → Compte → Livrer à → Code postal",
    codes: [
      { code: "75001", city: "Paris (1er)" },
      { code: "75008", city: "Paris (8e)" },
      { code: "69001", city: "Lyon" },
      { code: "13001", city: "Marseille" },
      { code: "31000", city: "Toulouse" },
      { code: "33000", city: "Bordeaux" },
      { code: "67000", city: "Strasbourg" },
      { code: "06000", city: "Nice" },
    ],
  },
  it: {
    flag: "🇮🇹",
    steps: "amazon.it → Ciao → Account → Consegna a → Inserisci CAP",
    codes: [
      { code: "00118", city: "Roma (Centro)" },
      { code: "20121", city: "Milano" },
      { code: "80121", city: "Napoli" },
      { code: "10121", city: "Torino" },
      { code: "50123", city: "Firenze" },
      { code: "40121", city: "Bologna" },
      { code: "16121", city: "Genova" },
      { code: "90133", city: "Palermo" },
    ],
  },
  es: {
    flag: "🇪🇸",
    steps: "amazon.es → Hola → Cuenta → Dirección de entrega → Código postal",
    codes: [
      { code: "28001", city: "Madrid (Centro)" },
      { code: "08001", city: "Barcelona" },
      { code: "41001", city: "Sevilla" },
      { code: "46001", city: "Valencia" },
      { code: "48001", city: "Bilbao" },
      { code: "29001", city: "Málaga" },
      { code: "50001", city: "Zaragoza" },
      { code: "15001", city: "A Coruña" },
    ],
  },
};

export const productTypes: ProductType[] = [
    {
        id: "tshirts",
        name: "T-shirts",
        keyword: "t-shirt",
        filters: {
            us: { category: "fashion-novelty", node: "12035955011" },
        },
    },
    {
        id: "sweatshirts",
        name: "Sweatshirts",
        keyword: "sweatshirt",
        filters: {
            us: { category: "fashion-novelty", node: "12035955011" },
        },
    },
    {
        id: "hoodies",
        name: "Hoodies",
        keyword: "hoodie",
        filters: {
            us: { category: "fashion-novelty", node: "12035955011" },
        },
    },
    {
        id: "mugs",
        name: "Mugs",
        keyword: "mug",
        filters: {
            us: { category: "kitchen", node: "284507" },
        },
    },
];

export const sortOptions: SortOption[] = [
    { id: "featured", name: "Featured", value: "relevanceblender" },
    { id: "price-low", name: "Price: Low to High", value: "price-asc-rank" },
    { id: "price-high", name: "Price: High to Low", value: "price-desc-rank" },
    { id: "review", name: "Avg. Customer Review", value: "review-rank" },
    { id: "newest", name: "Newest Arrivals", value: "date-desc-rank" },
    { id: "bestsellers", name: "Best Sellers", value: "salesrank" },
];
