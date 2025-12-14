'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <button className={styles.trigger} aria-hidden="true">Theme</button>;
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        setIsOpen(false);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.trigger}
                onClick={toggleDropdown}
                aria-label="Select theme"
            >
                {theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'} ▾
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <button
                        className={`${styles.option} ${theme === 'light' ? styles.active : ''}`}
                        onClick={() => handleThemeChange('light')}
                    >
                        Light
                    </button>
                    <button
                        className={`${styles.option} ${theme === 'dark' ? styles.active : ''}`}
                        onClick={() => handleThemeChange('dark')}
                    >
                        Dark
                    </button>
                    <button
                        className={`${styles.option} ${theme === 'system' ? styles.active : ''}`}
                        onClick={() => handleThemeChange('system')}
                    >
                        System
                    </button>
                </div>
            )}
        </div>
    );
}
