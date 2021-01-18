import {productsActions} from "../reducer";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import axios from "../../../utils/axios-config";

const deleteProduct = (productId) => axios.delete(`api/todos/${productId}`)

function* productsDeleteSaga({payload = {}}) {
    try {
        const {id} = payload
        const res = yield call(deleteProduct, id);
        yield put(productsActions.delete.finish())
        yield put(productsActions.getProductsList.request())
    } catch (error) {
        yield put(productsActions.delete.fail(error))
    }
}

export const productsDelete = function* () {
    yield takeEvery([productsActions.delete.request().type], productsDeleteSaga)
}