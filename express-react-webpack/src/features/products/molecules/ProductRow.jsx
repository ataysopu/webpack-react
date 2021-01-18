import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {productsActions} from "../reducer";
import {UpdateProductForm} from "./UpdateProductForm.jsx";

export const ProductRow = (props) => {
    const dispatch = useDispatch()
    let history = useHistory();
    let [isEdited, setEdited] = useState(false)

    let handleToggleEditPopup = () => {
        setEdited(!isEdited)
    };

    let handleDelete = () => {
        dispatch(productsActions.delete.request({id: props.id}))
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