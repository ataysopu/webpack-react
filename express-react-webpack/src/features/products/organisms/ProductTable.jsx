import React from 'react';
import {ProductRow} from "../molecules/ProductRow.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../reducer";

const ProductTable = (props) => {
    const dispatch = useDispatch()
    const {products} = useSelector(state => {
        return {
            products: state.productsStore.list,
        }
    })

    React.useEffect(() => {
        dispatch(productsActions.getProductsList.request())
    }, [])

    let filteredProducts = products.filter((product) => {
        if (!props.stocked) {
            return product.name.includes(props.filterText)
        }
        return product.stocked && product.name.includes(props.filterText)
    })

    let rows = filteredProducts.map((product) => {
        return <ProductRow
            key={product.id}
            name={product.name}
            price={product.price}
            id={product.id}
            stocked={product.stocked}
        />
    })
    return (
        <table>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}
export default ProductTable;
