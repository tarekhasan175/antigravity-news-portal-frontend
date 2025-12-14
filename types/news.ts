export interface Author {
    id?: string | number;
    name: string;
    avatar?: string;
    bio?: string;
}

export interface Category {
    id: number | string;
    name: string;
    slug: string;
}

export interface Article {
    id: number | string;
    title: string;
    slug: string;
    featured_image: string;
    excerpt: string;
    content?: string;
    category: Category;
    author: Author;
    published_at: string;
    is_featured?: boolean; // API might not return this, but good to have
}

export interface GroupedNews {
    id: number | string;
    name: string;
    slug: string;
    articles: Article[];
}
