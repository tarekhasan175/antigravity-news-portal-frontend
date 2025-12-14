import Link from 'next/link';
import styles from './page.module.css';
import NewsCard from '@/components/ui/NewsCard';
import { getGroupedNews } from '@/lib/api';

export default async function Home() {
  const categories = await getGroupedNews() || [];

  // Optional: We could still have a "Lead" section if we pick the first article from the first category
  // For now, following the requested "Grouped News" structure

  return (
    <div className="container">
      {/* We can add a Featured Slider here if we want, using the first few articles of the first category */}
      {categories.length > 0 && categories[0].articles.length > 0 && (
        <div className={styles.mainGrid}>
          <div className={styles.leadSection}>
            <NewsCard article={categories[0].articles[0]} variant="lead" />
          </div>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Latest News</h2>
            <div className={styles.latestList}>
              {categories.flatMap(c => c.articles).slice(1, 6).map(article => (
                <NewsCard key={article.id} article={article} variant="sidebar" />
              ))}
            </div>
          </aside>
        </div>
      )}

      {categories.map((category) => (
        <section key={category.id} className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{category.name}</h2>
            <Link href={`/${category.slug}`}>View All →</Link>
          </div>
          <div className={styles.grid}>
            {category.articles.slice(0, 4).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
