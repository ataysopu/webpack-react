import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers/reducers';

export const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose

const initialState = {}

export const enhancer = composeEnhancers(
    applyMiddleware(
        sagaMiddleware,
    )
)

export const store = createStore(reducer, initialState, enhancer);

store.runSaga = sagaMiddleware.run

