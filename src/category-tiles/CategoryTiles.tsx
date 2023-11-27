import React from 'react';
import './category-tile.css';
import CategoryTile, {Tile} from "./CategoryTile";


export default function CategoryTiles() {
    const categories: Tile[] = [
        {text: "Woman", imgUrl: "https://cdn.shopify.com/s/files/1/0735/3660/2389/collections/women_clothing.png"},
        {text: "Men", imgUrl: "https://cdn.shopify.com/s/files/1/0735/3660/2389/collections/women_clothing.png"},
        {text: "Kids", imgUrl: "https://cdn.shopify.com/s/files/1/0735/3660/2389/collections/women_clothing.png"},
    ]

    return (
        <div className="tiles">
            {categories.map((tile: Tile, idx) => (
                <CategoryTile key={idx} text={tile.text} imgUrl={tile.imgUrl}/>
                )
            )}
        </div>
    );
}
