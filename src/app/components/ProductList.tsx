// app/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
  const { products, setProducts } = useProduct();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return await res.json();
    } catch (err) {
      setError("Erro ao carregar produtos");
      throw err;
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        if (products.length === 0) {
          const fetchedProducts = await fetchProducts();
          setProducts(fetchedProducts);
        }
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []); // Executa apenas uma vez no carregamento

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
