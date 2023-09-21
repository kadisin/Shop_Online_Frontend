export interface Category {
    id: number;
    category: string;
    subcategory: string;
}

export interface SuggestedProduct {
    banerimage: string;
    category: Category;
}