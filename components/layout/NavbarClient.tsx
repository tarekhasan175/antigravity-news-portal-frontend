'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useGetCategoriesQuery } from '@/lib/api/categoryApi';

export default function NavbarClient() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data } = useGetCategoriesQuery();
    const categories = data?.data ?? [];
    console.log(categories);
 
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const navItems = [
        { id: 'home', name: 'Home', slug: '' },
        ...categories,
    ];

    return (
        <div className={styles.navbarWrapper}>
            <header className={styles.header}>
                <div className={styles.topBar}>
                    <div className={`container ${styles.topBarContainer}`}>
                        <span className={styles.date}>{currentDate}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                <div className={styles.mainHeader}>
                    <div className="container">
                        <Link href="/" className={styles.logo}>
                            Daily Scope
                        </Link>
                    </div>
                </div>
            </header>

            <nav className={styles.nav}>
                <div className={`container ${styles.navContainer}`}>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>

                    <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                        {navItems.map(item => (
                            <li key={item.slug || 'home'}>
                                <Link
                                    href={item.slug ? `/${item.slug}` : '/'}
                                    className={styles.navLink}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
