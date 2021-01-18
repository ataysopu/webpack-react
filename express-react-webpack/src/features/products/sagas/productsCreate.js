import {productsActions} from "../reducer";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import axios from "../../../utils/axios-config";

const createProduct = (title, price) => axios.post('api/todos',
    {
        title,
        price
    }
)

function* productsCreateSaga({payload = {}}) {
    try {
        const {title, price} = payload
        const res = yield call(createProduct, title, price);
        if (res.data.error) {
            yield put(productsActions.create.fail(res.data.error))
        } else {
            yield put(productsActions.create.finish())
            yield put(productsActions.getProductsList.request())
        }
    } catch (error) {
        yield put(productsActions.create.fail(error))
    }
}

export const productsCreate = function* () {
    yield takeEvery([productsActions.create.request().type], productsCreateSaga)
}