import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
const initialState = {
  isFetching: false,
  products: [],
  cartArray:[],
  subTotal:{},
  price:0,
  itemCount:{}
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.isFetching = true;
    },
    getProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.result;
    },
    getProductsFailed: (state) => {
      state.isFetching = false;
      state.products = [];
    },

    addItem: (state, action) => {},
    addItemSuccess: (state, action) => {
      if (action.payload.result != undefined || action.payload.result != null) {
        state.cartArray.push(action.payload.result);
      }
      state.itemCount[action.payload.title] = action.payload.countResult;
      state.price = action.payload.price;
      state.subTotal[action.payload.title] = action.payload.subTotal;
      console.log("cartArray", current(state.cartArray));
      console.log("itemCount", current(state.itemCount));
      console.log("subTotal", current(state.subTotal));
      console.log("price", state.price);
    },
  },
});

export const { getProducts, getProductsSuccess, getProductsFailed ,addItem,addItemSuccess} =
  productSlice.actions;

export default productSlice.reducer;
