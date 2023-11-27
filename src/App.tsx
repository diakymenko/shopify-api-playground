import React from 'react';
import './app.css';
import Header from "./header/Header";
import CategoryTiles from "./category-tiles/CategoryTiles";
import Products from "./product/Products";

export default function App() {
  return (
    <div className="main">
        <Header/>
        <CategoryTiles/>
        <Products/>
    </div>
  );
}
