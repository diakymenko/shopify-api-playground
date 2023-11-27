import './product.css';

import Product, {ProductProps} from "./Product";
import React, {useEffect, useState} from 'react';
import ProductsSort, {getSortParams, SortingType, SortParams} from "./ProductsSort";
import Pagination, {PageInfo, PaginationParams, PER_PAGE} from "./Pagination";
import Filter, {FilterData, KNOWN_FILTERS} from "./Filter";


export default function Products() {

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [sortType, setSortType] = useState<SortingType>("best-selling");
    const [filtersData, setFiltersData] = useState<FilterData[]>([]);
    const [filterParams, setFilterParams] = useState([]);

    const [pagination, setPagination] = useState<PaginationParams>({
        first: PER_PAGE
    })

    const [pageInfo, setPageInfo] = useState<PageInfo>({
        hasNextPage: true,
        hasPreviousPage: false
    })


    const url = 'https://zulily-portal-dev.myshopify.com/api/2023-07/graphql.json';
    const accessToken = 'f48e922db0ea3eff276f5f39c539a201';

    const sortParams = getSortParams(sortType);

    const variables: { [key: string]: unknown } = {
        sortKey: sortParams.sortKey,
        reverse: sortParams.reverse,
        first: pagination.first,
        last: pagination.last,
        before: pagination.before,
        after: pagination.after,
        filters: filterParams
    };

    const handleProductData = (res: any): ProductProps[] => {
        const productsArray: ProductProps[] = [];
        res?.data?.collection?.products?.nodes?.forEach((product: any) => {
            const productProps = {
                id: product.id,
                name: product.title,
                imgUrl: product?.images?.nodes[0]?.url,
                price: product.priceRange.minVariantPrice.amount

            }
            productsArray.push(productProps);

        })
        return productsArray;
    }

    //to prevent infinite loop
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-storefront-Access-Token": accessToken
            },

            body: JSON.stringify({
                query: SEARCH_QUERY,
                variables: variables
            })

        })
            .then(res => res.json())
            .then(res => {
                setProducts(handleProductData(res))
                setPageInfo(res.data.collection.products.pageInfo)
                setFiltersData(res.data.collection.products.filters)
            })
    }, [sortType, pagination, filterParams])


    return (
        <div>
            <ProductsSort
                sortType={sortType}
                setSortType={setSortType}/>

            <div className="filters">
                {filtersData
                    .filter((filter: FilterData) => KNOWN_FILTERS.includes(filter.id))
                    .map((filter: FilterData) => (
                            <Filter
                                key={filter.id}
                                id={filter.id}
                                label={filter.label}
                                values={filter.values}
                                setFilterParams={setFilterParams}
                                filterParams={filterParams}
                            />
                        )
                    )}
            </div>

            <Pagination
                hasPreviousPage={pageInfo.hasPreviousPage}
                hasNextPage={pageInfo.hasNextPage}
                startCursor={pageInfo.startCursor}
                endCursor={pageInfo.endCursor}
                setPagination={setPagination}
            />

            <div className="products">
                {products.map((product: ProductProps) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imgUrl={product.imgUrl}
                            price={product.price}
                        />
                    )
                )}
            </div>

            <Pagination
                hasPreviousPage={pageInfo.hasPreviousPage}
                hasNextPage={pageInfo.hasNextPage}
                startCursor={pageInfo.startCursor}
                endCursor={pageInfo.endCursor}
                setPagination={setPagination}
            />

        </div>
    );
}

const SEARCH_QUERY = `
query (
  $first: Int
  $last: Int
  $before: String
  $after: String
  $sortKey: ProductCollectionSortKeys
  $reverse: Boolean
  $filters: [ProductFilter!]
) {
  collection(handle: "clearance-614465") {
    id
    products(
      first: $first
      last: $last
      before: $before
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      filters: $filters
    ) {
      filters {
        id
        label
        type
        values {
          count
          id
          input
          label
        }
      }
      nodes {
        id
        title
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          nodes {
            url
          }
        }
      }

      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}`