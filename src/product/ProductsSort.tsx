import './product-sort.css';
import React from 'react';

export interface SortParams {
    sortKey: string
    reverse: boolean
}

export type SortingType = "low-high" | "high-low" | "best-selling";

export const getSortParams = (value: SortingType): SortParams => {
    const sortMapping = {
        "low-high": {
            sortKey: "PRICE",
            reverse: false
        },
        "high-low": {
            sortKey: "PRICE",
            reverse: true
        },
        "best-selling": {
            sortKey: "BEST_SELLING",
            reverse: false
        }
    }
    return sortMapping[value];
}

export default function ProductsSort({sortType, setSortType}: any) {

    const handleChange = (event: { target: { value: string; }; }) => {
        setSortType(event.target.value as SortingType);
    };

    return (
        <div className="products-sort">
            <label>
                Sort
                <select value={sortType} onChange={handleChange}>
                    <option value="best-selling">Sort by Best Selling</option>
                    <option value="low-high">Price: Low-High</option>
                    <option value="high-low">Price: High-Low</option>
                </select>
            </label>
        </div>
    )
}