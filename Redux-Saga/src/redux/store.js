import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import ProductsSlice from "../components/Products/Products.slice";
const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: {
    products: ProductsSlice,
  },
  middleware: (currentMiddleware) => [
    ...currentMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);