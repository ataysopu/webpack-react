import React from 'react';
import {Switch, Route} from "react-router-dom";
import {FilterableProductTable} from "./features/products/pages/FilterableProductTable.jsx";
import {ProductPage} from "./features/products/pages/ProductPage.jsx";

export const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'}>
                    <FilterableProductTable/>
                </Route>
                <Route path={'/:productId'}>
                    <ProductPage/>
                </Route>
            </Switch>
        </>
    );
};