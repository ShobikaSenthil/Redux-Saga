import { put, takeLatest,select } from "redux-saga/effects";
import { getProductsFailed, getProductsSuccess,addItemSuccess } from "./Products.slice";
import axios from "axios";

function getRequest(url) {
  return axios.get(url).then((data) => {
    return data.data;
  });
}
function* generatorAddCart(actions) {
  try {
    var itemCount1 = yield select((state) => state.products.itemCount);
    var price1 = yield select((state) => state.products.price);
    var subTotal1 = yield select((state) => state.products.subTotal);

    let countResult = 0;
    let result = {};
    let title = "";
    let subTotalResult = 0;
    if (
      itemCount1[actions.payload.title] == undefined ||
      itemCount1[actions.payload.title] == null ||
      itemCount1[actions.payload.title] == 0
    ) {
      countResult = 1;
      result = actions.payload;
      title = actions.payload.title;
      subTotalResult = actions.payload.price;
    } else {
      countResult = itemCount1[actions.payload.title] + 1;
      result = null;
      title = actions.payload.title;
      subTotalResult = subTotal1[actions.payload.title] + actions.payload.price;
    }
    price1 += actions.payload.price;
    yield put(
      addItemSuccess({
        countResult: countResult,
        result: result,
        title: actions.payload.title,
        price: price1,
        subTotal: subTotalResult,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
// function* generatorDeleteCart(actions) {
//   try {
//     var itemCount1 = yield select((state) => state.products.itemCount);
//     var price1 = yield select((state) => state.products.price);
//     var subTotal1 = yield select((state) => state.products.subTotal);

//     let countResult = 0;
//     let result = {};
//     let title = "";
//     let subTotalResult = 0;
//     if (
//       itemCount1[actions.payload.title] == undefined ||
//       itemCount1[actions.payload.title] == null ||
//       itemCount1[actions.payload.title] == 0
//     ) {
//       countResult = 1;
//       result = actions.payload;
//       title = actions.payload.title;
//       subTotalResult = actions.payload.price;
//     } else {
//       countResult = itemCount1[actions.payload.title] + 1;
//       result = null;
//       title = actions.payload.title;
//       subTotalResult = subTotal1[actions.payload.title] + actions.payload.price;
//     }
//     price1 += actions.payload.price;
//     yield put(
//       addItemSuccess({
//         countResult: countResult,
//         result: result,
//         title: actions.payload.title,
//         price: price1,
//         subTotal: subTotalResult,
//       })
//     );
//   } catch (err) {
//     console.log(err);
//   }
// }

function* getProducts() {
  try {
    const result = yield getRequest("https://fakestoreapi.com/products");
    console.log("@AJ Results: ", result);
    yield put(getProductsSuccess({ result: result }));
  } catch (err) {
    console.log(err);
    yield put(getProductsFailed({ result: [] }));
  }
}

export function* watchGetProducts() {
  yield takeLatest("products/getProducts", getProducts);
  yield takeLatest("products/addItem", generatorAddCart);
}
