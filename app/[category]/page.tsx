import { notFound } from 'next/navigation';
import styles from './category.module.css';
import NewsCard from '@/components/ui/NewsCard';
import { getNewsByCategory } from '@/lib/api';

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = params;
    const news = await getNewsByCategory(category);

    if (!news) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{category} News</h1>

            {news.length > 0 ? (
                <div className={styles.grid}>
                    {news.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div className={styles.noNews}>
                    No news found in this category.
                </div>
            )}
        </div>
    );
}
