// app/components/Carousel.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";
import type { Product } from "@/app/types/product";
import { getProducts } from "@/app/lib/api/products";

const Carousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  if (products.length === 0) return <div>Carregando...</div>;

  const currentProduct = products[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={currentProduct.imageUrl}
          alt={currentProduct.name}
          width={500}
          height={300}
          className={styles.image}
          priority
        />
        <div className={styles.caption}>{currentProduct.name}</div>
      </div>
      <button onClick={prevSlide} className={styles.navButtonLeft}>
        &#8592;
      </button>
      <button onClick={nextSlide} className={styles.navButtonRight}>
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
