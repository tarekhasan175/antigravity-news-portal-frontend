'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Category } from '@/types/news';

interface NavbarClientProps {
    categories: Category[];
}

export default function NavbarClient({ categories = [] }: NavbarClientProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Ensure 'Home' is always first if not in categories, or handle it manually
    // The API might return categories like "National", "Business". 
    // We probably want "Home" and "Latest" manually added or handled.

    // Let's prepend Home if it's not there.
    const navItems = [
        { id: 'home', name: 'Home', slug: '' },
        ...categories
    ];

    return (
        <div className={styles.navbarWrapper}>
            <header className={styles.header}>
                <div className={styles.topBar}>
                    <div className={`container ${styles.topBarContainer}`}>
                        <span className={styles.date}>{currentDate}</span>
                        <div className={styles.socials} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <ThemeToggle />
                            {/* Social icons would go here */}
                        </div>
                    </div>
                </div>

                <div className={styles.mainHeader}>
                    <div className="container">
                        <Link href="/" className={styles.logo}>
                            Khobor
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
                        {navItems.map((cat) => (
                            <li key={cat.slug || 'home'}>
                                <Link
                                    href={cat.slug ? `/${cat.slug}` : '/'}
                                    className={styles.navLink}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
