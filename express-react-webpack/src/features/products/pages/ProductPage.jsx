import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../reducer";

export const ProductPage = () => {
    const dispatch = useDispatch()
    const {readProduct} = useSelector(state => {
        return {
            readProduct: state.productsStore.readProduct,
        }
    })
    const {productId} = useParams();

    useEffect(() => {
        dispatch(productsActions.read.request({productId}))
    }, [productId])

    return (
        <>
            <Link to={'/'}>Вернуться к списку продуктов</Link>
            <div>{readProduct?.name}</div>
            <div>{readProduct.price && readProduct.price}</div>
            <div>{readProduct.stocked ? 'В наличии' : 'Нет в наличии'}</div>
            <div>{readProduct.category && readProduct.category}</div>
        </>
    )
}
