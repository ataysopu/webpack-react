import React from 'react';
import styled from "styled-components";

export const SearchBar = props => {
    let filterTextInput = React.useRef()
    let checkbox = React.useRef()

    let filterProducts = () => {
        props.filterProducts(filterTextInput.current.value, checkbox.current.checked)
    }

    return (
        <form>
            <InputWrapper>
                <input
                    type="text"
                    placeholder="Поиск товара"
                    ref={filterTextInput}
                    onChange={filterProducts}
                    value={props.filterText}
                />
            </InputWrapper>
            <InputWrapper>
                <input
                    type="checkbox"
                    ref={checkbox}
                    id="stocked"
                    onChange={filterProducts}
                    checked={props.stocked}
                />
                <label htmlFor="stocked">Товары в наличии</label>
            </InputWrapper>
        </form>
    )
}

const InputWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  & > input {
    margin-right: 5px;
  }
`