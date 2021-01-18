import {productsActions} from "../reducer";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import axios from "../../../utils/axios-config";

const updateProduct = (id, title, price) => axios.put(`api/todos/${id}`, {
    title,
    price
})

function* productsUpdateSaga({payload = {}}) {
    try {
        const {id, title, price} = payload
        const res = yield call(updateProduct, id, title, price);
        if (res.data.error) {
            yield put(productsActions.update.fail(res.data.error))
        } else {
            yield put(productsActions.update.finish())
            yield put(productsActions.getProductsList.request())
        }
    } catch (error) {
        yield put(productsActions.update.fail(error))
    }
}

export const productsUpdate = function* () {
    yield takeEvery([productsActions.update.request().type], productsUpdateSaga)
}