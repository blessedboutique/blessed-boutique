import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import productsData from '../data/products.json';
import styles from './Catalog.module.css';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        setProducts(productsData);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container">
            <header className={styles.header}>
                <h1 className={styles.title}>Nuestra Colección</h1>
                <p className={styles.subtitle}>Encuentra el vestido perfecto para ti</p>
            </header>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Buscar vestidos..."
                    className={styles.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className={styles.categories}>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === 'All' ? 'Todos' : category}
                        </button>
                    ))}
                </div>
            </div>

            <ProductList products={filteredProducts} />
        </div>
    );
};

export default Catalog;
