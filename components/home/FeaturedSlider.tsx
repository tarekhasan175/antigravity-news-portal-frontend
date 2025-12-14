'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedSlider.module.css';
import { Article } from '@/types/news';

interface FeaturedSliderProps {
    articles: Article[];
}

export default function FeaturedSlider({ articles }: FeaturedSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % articles.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [articles.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    if (!articles.length) return null;

    return (
        <div className={styles.sliderContainer}>
            {articles.map((article, index) => (
                <div
                    key={article.id}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                >
                    <Image
                        src={article?.featured_image ?? 'https://placehold.co/1200x600'}
                        alt={article?.title}
                        fill
                        className={styles.image}
                        priority={index === 0}
                    />
                    <div className={styles.content}>
                        <span className={styles.category}>{article.category.name}</span>
                        <h2 className={styles.title}>{article.title}</h2>
                        <p className={styles.summary}>{article.excerpt}</p>
                        <Link href={`/news/${article.slug}`} className={styles.readMore}>
                            Read Article
                        </Link>
                    </div>
                </div>
            ))}

            <div className={styles.controls}>
                <button onClick={prevSlide} className={styles.controlBtn}>←</button>
                <button onClick={nextSlide} className={styles.controlBtn}>→</button>
            </div>
        </div>
    );
}
