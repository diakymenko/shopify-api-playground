import React from 'react';
import './category-tile.css';

export interface Tile {
    text: string
    imgUrl: string
}

export default function CategoryTile({text, imgUrl}: Tile)
 {
    return (
       <div className="tile">
           <p>{text}</p>
           <img src={imgUrl}/>

       </div>
    );
}