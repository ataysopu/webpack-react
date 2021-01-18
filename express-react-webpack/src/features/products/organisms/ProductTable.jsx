import React from 'react';
import {ProductRow} from "../molecules/ProductRow.jsx";
import {useProductsQuery} from "../queries/useProductsQuery";

export const ProductTable = (props) => {
    const {products, isFetching} = useProductsQuery()
    let filteredProducts = products?.filter((product) => {
        if (!props.stocked) {
            return product.name.includes(props.filterText)
        }
        return product.stocked && product.name.includes(props.filterText)
    })

    let rows = filteredProducts?.map((product) => {
        return <ProductRow
            key={product.id}
            name={product.name}
            price={product.price}
            id={product.id}
            stocked={product.stocked}
        />
    })
    return isFetching ?
        (
            <div>Loading...</div>
        ) :
        (
            <table className={props.className}>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
}