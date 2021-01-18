import {all} from "@redux-saga/core/effects";
import {productsRead} from "../features/products/sagas/productsRead";
import {productsUpdate} from "../features/products/sagas/productsUpdate";
import {productsDelete} from "../features/products/sagas/productsDelete";
import {productsCreate} from "../features/products/sagas/productsCreate";

export default function* rootSaga() {
    yield all([
        productsRead(),
        productsUpdate(),
        productsDelete(),
        productsCreate(),
    ])
}
