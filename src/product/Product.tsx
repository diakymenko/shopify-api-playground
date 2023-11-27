import React from 'react';
import './product.css';

export interface ProductProps {
    id: string
    name: string
    imgUrl?: string
    price: string
}

export default function Product({id, name, imgUrl, price}: ProductProps) {
    return (
        <div className="product">
            <img id={id}
                 src={imgUrl || "https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}/>
            <p>{name}</p>
            <p>${price}</p>
        </div>
    );
}