import axios from '../../axios-orders';
import * as actions from "../actions/index";
import { put } from 'redux-saga/effects';


export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFailed(error));
    }   
}

export function* fetchOrderSaga(action) {
    yield put (actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get('orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({...res.data[key], id: key});
        }
        yield put (actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put (actions.fetchOrdersFail(error));
    }
}