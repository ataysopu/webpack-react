import React from 'react';
import ProductTable from "../organisms/ProductTable.jsx";
import {SearchBar} from "../organisms/SearchBar.jsx";
import {CreateProductForm} from "../organisms/CreateProductForm.jsx";
import styled from "styled-components";
import {ThemeContext} from "../../../index";

export const FilterableProductTable = () => {
    const [filterText, setFilterText] = React.useState("")
    const [stocked, setStocked] = React.useState(false)
    let [isCreatePopupShown, setCreatePopupShown] = React.useState(false)
    const theme = React.useContext(ThemeContext);

    let handleToggleCreatePopup = () => {
        setCreatePopupShown(!isCreatePopupShown)
    };

    let filterProducts = (searchText, checked) => {
        setFilterText(searchText)
        setStocked(checked)
    }

    return (
        <>
            <StyledButton onClick={handleToggleCreatePopup} theme={theme}>
                Добавить новый продукт в список
            </StyledButton>
            <SearchBar
                filterText={filterText}
                stocked={stocked}
                filterProducts={filterProducts}
            />
            <ProductTable
                filterText={filterText}
                stocked={stocked}
            />
            {isCreatePopupShown && <CreateProductForm handleClosePopup={handleToggleCreatePopup}/>}
        </>
    )
}

const StyledButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.foreground};
`