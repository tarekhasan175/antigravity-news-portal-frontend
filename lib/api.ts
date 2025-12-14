import { Article, Category, GroupedNews } from '@/types/news';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchAPI(endpoint: string, options = {}) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            cache: 'no-store',
            ...options,
        });
        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText} at ${endpoint}`);
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error(`Fetch error at ${endpoint}:`, error);
        // Return empty data or throw depending on requirement. 
        // For now, throwing to make it obvious.
        throw error;
    }
}

export async function getGroupedNews(): Promise<GroupedNews[]> {
    try {
        const data = await fetchAPI('/news/grouped');
        if (!Array.isArray(data)) {
            console.warn('API returned non-array for grouped news:', data);
            return [];
        }
        return data;
    } catch (error) {
        console.error('getGroupedNews error:', error);
        return [];
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const data = await fetchAPI('/categories');
        if (!Array.isArray(data)) {
            console.warn('API returned non-array for categories:', data);
            return [];
        }
        return data;
    } catch (error) {
        console.error('getCategories error:', error);
        return [];
    }
}

export async function getNewsByCategory(slug: string): Promise<Article[]> {
    try {
        const data = await fetchAPI(`/news/category/${slug}`);
        // Handle pagination response if it exists (e.g. data.data)
        const articles = Array.isArray(data) ? data : (data.data || []);
        return Array.isArray(articles) ? articles : [];
    } catch (error) {
        console.error(`getNewsByCategory error for ${slug}:`, error);
        return [];
    }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const response = await fetchAPI(`/news/${slug}`);
        return response.data || response;
    } catch (error) {
        console.error(`getArticleBySlug error for ${slug}:`, error);
        return null;
    }
}

// Helper for legacy support or specific sections if needed
export async function getLatestNews(): Promise<Article[]> {
    // We can fetch from a specific endpoint if it exists, or derive from grouped
    const grouped = await getGroupedNews();
    // Flatten and sort or just take the first category's articles
    if (grouped.length > 0) {
        return grouped.flatMap(g => g.articles).slice(0, 10);
    }
    return [];
}

export async function getFeaturedNews(): Promise<Article[]> {
    const grouped = await getGroupedNews();
    if (grouped.length > 0) {
        // Just take the first 3 articles from the first group as featured for now
        return grouped[0].articles.slice(0, 3);
    }
    return [];
}
