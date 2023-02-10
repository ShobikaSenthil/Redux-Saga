import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Products.slice";
import { addItem } from "./Products.slice";
const Products = () => {
  const productsState = useSelector((state) => state.products.products);
  const cartState = useSelector((state) => state.products.cartArray);
  const countState = useSelector((state) => state.products.itemCount);
  const priceState = useSelector((state) => state.products.price);
  const subTotalState = useSelector((state) => state.products.subTotal);
  const dispatch = useDispatch();

  console.log(productsState);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <h1>Products List</h1>
      {productsState.map((item) => {
        return (
          <>
            <h1>{item.title}</h1>
            <button onClick={() => dispatch(addItem(item))}>Add</button>
          </>
        );
      })}
      {cartState.length > 0 ? <>
      {cartState.map((item)=>{
        return(
          <><p>Product:{item.title}</p>
          <p>Product Price:{subTotalState[item.title]}</p>
          <p>Quantity: <button>+</button> {countState[item.title]} <button>-</button></p>
          </>
        )
      })}
      </> : <></>}
      <h3>TOTAL PRICE Rs.{priceState}</h3>
    </>
  );
};

export default Products;
