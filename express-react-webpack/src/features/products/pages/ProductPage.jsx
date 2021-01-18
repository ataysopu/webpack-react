import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useProductsQuery} from "../queries/useProductsQuery";

export const ProductPage = () => {
    const {getProduct} = useProductsQuery()
    const [product, setProduct] = React.useState({})
    const {productId} = useParams();

    useEffect(async () => {
        const readProduct = await getProduct(productId)
        setProduct(readProduct)
    }, [productId])

    return (
        <>
            <Link to={'/'}>Вернуться к списку продуктов</Link>
            <div>{product?.name}</div>
            <div>{product.price && product.price}</div>
            <div>{product.stocked ? 'В наличии' : 'Нет в наличии'}</div>
            <div>{product.category && product.category}</div>
        </>
    )
}
