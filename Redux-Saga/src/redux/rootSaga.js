import { all, fork } from "redux-saga/effects";
import { watchGetProducts } from "../components/Products/Products.saga";

export default function* rootSaga() {
  yield all([fork(watchGetProducts)]);
}