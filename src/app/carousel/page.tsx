// app/carousel/page.tsx ou onde você está usando
import React from "react";
import Carousel from "../components/Carousel"; // ajuste o caminho se necessário
import styles from "./CarouselPage.module.css"; // novo import do CSS Module

const CarouselPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Carrossel de Destaques</h1>
      <Carousel />
    </main>
  );
};

export default CarouselPage;
