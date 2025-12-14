import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './article.module.css';
import { getArticleBySlug } from '@/lib/api';

interface ArticlePageProps {
    params: {
        slug: string;
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <span className={styles.category}>{article.category.name}</span>
                <h1 className={styles.title}>{article.title}</h1>

                <div className={styles.meta}>
                    <div className={styles.author}>
                        {/* Avatar placeholder if needed */}
                        <span>{article.author.name}</span>
                    </div>
                    <span>•</span>
                    <time>{new Date(article.published_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</time>
                </div>
            </header>

            <div className={styles.imageContainer}>
                <Image
                    src={article.featured_image || 'https://placehold.co/800x400?text=News'}
                    alt={article.title}
                    fill
                    className={styles.image}
                    priority
                />
            </div>

            <div className={styles.content}>
                {/* In a real app, this would likely be HTML content */}
                <p>{article.excerpt}</p>
                <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </article>
    );
}
