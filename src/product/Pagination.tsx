import React from 'react';
import './pagination.css';

export const PER_PAGE = 20;

export interface PageInfo {
    hasPreviousPage?: boolean,
    hasNextPage?: boolean,
    startCursor?: string,
    endCursor?: string
}

export interface PaginationParams {
    first: number,
    last?: number,
    before?: string,
    after?: string
}

export default function Pagination({
                                       hasPreviousPage,
                                       hasNextPage,
                                       startCursor,
                                       endCursor,
                                       setPagination
                                   }:
                                       {
                                           hasPreviousPage?: boolean,
                                           hasNextPage?: boolean,
                                           startCursor?: string,
                                           endCursor?: string,
                                           setPagination:any
                                       }) {
    const handlePrevChange = (event: any) => {
       setPagination({last: PER_PAGE, before: startCursor})
    }

    const handleNextChange = (event: any) => {
        setPagination({first: PER_PAGE, after: endCursor})
    }

    return (
        <div className="pagination">
            <button onClick={handlePrevChange} disabled={!hasPreviousPage}> ←</button>
            <button onClick={handleNextChange} disabled={!hasNextPage}> →</button>
        </div>
    )
}