import Link from 'next/link';
import Image from 'next/image';
import styles from './NewsCard.module.css';
import { Article } from '@/types/news';

interface NewsCardProps {
    article: Article;
    variant?: 'standard' | 'lead' | 'sidebar' | 'compact';
}

export default function NewsCard({ article, variant = 'standard' }: NewsCardProps) {
    const isSidebar = variant === 'sidebar';

    return (
        <div className={`${styles.card} ${styles[variant]}`}>
            <div className={styles.imageContainer}>
                <Image
                    src={article.featured_image || 'https://placehold.co/600x400?text=News'}
                    alt={article.title}
                    fill
                    className={styles.image}
                    sizes={variant === 'lead' ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
                />
            </div>
            <div className={styles.content}>
                {!isSidebar && (
                    <div className={styles.meta}>
                        <span className={styles.category}>{article.category.name}</span>
                    </div>
                )}
                <h3 className={styles.title}>
                    <Link href={`/news/${article.slug}`}>
                        {article.title}
                    </Link>
                </h3>
                <p className={styles.summary}>{article.excerpt}</p>
                <span className={styles.time}>
                    {new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
