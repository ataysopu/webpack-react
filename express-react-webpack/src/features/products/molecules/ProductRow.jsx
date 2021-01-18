import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {UpdateProductForm} from "./UpdateProductForm.jsx";
import {useProductsQuery} from "../queries/useProductsQuery";

export const ProductRow = (props) => {
    let history = useHistory();
    let [isEdited, setEdited] = useState(false)
    const {deleteProduct} = useProductsQuery()

    let handleToggleEditPopup = () => {
        setEdited(!isEdited)
    };

    let handleDelete = () => {
        deleteProduct(props.id)
    };

    let goToProductPage = () => {
        history.push(`/${props.id}`)
    }

    return (
        <>
            <tr>
                <td onClick={goToProductPage}>
                    {props.name}
                </td>
                <td>
                    {props.price}
                </td>
                <td>
                    <button onClick={handleToggleEditPopup}>
                        Редактировать
                    </button>
                </td>
                <td>
                    <button onClick={handleDelete}>
                        Удалить товар
                    </button>
                </td>
            </tr>
            {
                isEdited && <UpdateProductForm
                    id={props.id}
                    name={props.name}
                    price={props.price}
                    handleToggleEditPopup={handleToggleEditPopup}
                />
            }
        </>
    )
}