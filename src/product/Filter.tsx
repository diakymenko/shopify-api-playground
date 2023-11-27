import React, {useState} from 'react';
import './filters.css';

export interface FilterData {
    id: string
    type: string
    label: string
    values: [{
        count: number
        id: string
        input: string
        label: string
    }]
}


export const KNOWN_FILTERS = ["filter.p.m.Product.gender", "filter.p.m.Product.character", "filter.p.m.Product.team"]

export default function Filter({
                                   id, label, values, setFilterParams, filterParams
                               }: {
    id: string,
    label: string,
    values: [{
        count: number
        id: string
        input: string
        label: string
    }],
    setFilterParams: any,
    filterParams: any

}) {
    const handleChecked = (filterSelected: string) => {
        const newFilterParams = [...filterParams];
        const filterSelectedParsed = JSON.parse(filterSelected);

        const index = newFilterParams.findIndex(filter => filterSelectedParsed.productMetafield.value === filter.productMetafield.value);

        if (index !== -1) {
            newFilterParams.splice(index, 1);
        } else {
            newFilterParams.push(filterSelectedParsed);
        }

        setFilterParams(newFilterParams);

    };
    return (
        <div>
            <span className="pure-menu-heading">{label}</span>
            <div className="pure-menu pure-menu-scrollable custom-restricted-width">
                <ul className="pure-menu-list">
                    {values.map((filterValue) => (
                        <li key={filterValue.id} className="pure-menu-item">
                            <input
                                id={filterValue.id}
                                type="checkbox"
                                onChange={() => handleChecked(filterValue.input)}
                            />
                            {filterValue.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}