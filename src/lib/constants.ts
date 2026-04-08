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
