import React from 'react';
import {useDispatch} from "react-redux";
import {productsActions} from "../reducer";

export const SearchBar = props => {
    const dispatch = useDispatch()
    let filterTextInput = React.useRef()
    let checkbox = React.useRef()

    let filterProducts = () => {
        props.filterProducts(filterTextInput.current.value, checkbox.current.checked)
    }

    return (
        <form>
            <input
                style={{marginTop: '10px'}}
                type="text"
                placeholder="Поиск товара"
                ref={filterTextInput}
                onChange={filterProducts}
                value={props.filterText}
            />
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <input
                    type="checkbox"
                    ref={checkbox}
                    onChange={filterProducts}
                    checked={props.stocked}
                />
                {" "}Товары в наличии
            </div>
        </form>
    )
}