// app/components/ProductCard.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(storedFavorites.some((item: Product) => item.id === product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const storedFavorites: Product[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const alreadyFavorited = storedFavorites.some((item) => item.id === product.id);

    let updatedFavorites;
    if (alreadyFavorited) {
      updatedFavorites = storedFavorites.filter((item) => item.id !== product.id);
    } else {
      updatedFavorites = [...storedFavorites, product];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!alreadyFavorited);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl || "/images/product-placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          className={styles.productImage}
        />
        <button onClick={toggleFavorite} className={styles.favoriteIcon}>
          {isFavorite ? (
            <FaHeart size={22} color="red" />
          ) : (
            <FaRegHeart size={22} color="gray" />
          )}
        </button>
      </div>

      <div className={styles.details}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

        <div className={styles.buttonGroup}>
          <button className={styles.cartButton} title="Adicionar ao carrinho">
            <FaCartPlus size={20} />
          </button>
          <button className={styles.buyButton} onClick={() => onBuyNow?.(product)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
