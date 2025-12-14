import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Daily Scope</h3>
                    <p>Your trusted source for the latest news and updates from around the world.</p>
                </div>
                <div className={styles.column}>
                    <h3>Categories</h3>
                    <ul>
                        <li><Link href="/national">National</Link></li>
                        <li><Link href="/international">International</Link></li>
                        <li><Link href="/business">Business</Link></li>
                        <li><Link href="/entertainment">Entertainment</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Contact</h3>
                    <ul>
                        <li>Email: info@dailyscope.com</li>
                        <li>Phone: +880 1234 567890</li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Daily Scope News Portal. All rights reserved.
            </div>
        </footer>
    );
}
