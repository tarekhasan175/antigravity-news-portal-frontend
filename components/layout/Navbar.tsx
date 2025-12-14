import { getCategories } from '@/lib/api';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
    const categories = await getCategories();
    return <NavbarClient categories={categories} />;
}
