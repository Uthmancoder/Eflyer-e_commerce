import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../Redux/MySlice";
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from 'react-icons/ai';


const Cart = () => {
  const [itemsToCart, setItemsToCart] = useState([]); // Initialize with an empty array 
  const dispatch = useDispatch();
  const state = useSelector((state) => state.mySlice);
  const items = state.Item;
  const [totalPrice, settotalPrice] = useState([])
  const cartItem = JSON.parse(localStorage.getItem("NewcartItems"));
  const itemLength = cartItem ? cartItem.length : 0; // Handle empty cartItem

  useEffect(() => {
    if (cartItem) {
      setItemsToCart(cartItem.map((el) => el.quantity));
    } else {
      setItemsToCart([]);
      settotalPrice(0)
    }
  }, [cartItem, itemsToCart]);
  

  const increaseQuantity = (index) => {
    dispatch(increaseItem(index));
    cartItem[index].quantity += 1;
    const updatedItemsToCart = [...itemsToCart];
    updatedItemsToCart[index] = cartItem[index].quantity;
    setItemsToCart(updatedItemsToCart);
    localStorage.setItem("NewcartItems", JSON.stringify(updatedItemsToCart));
  };
  

  const decreaseQuantity = (index) => {
    if (cartItem[index].quantity > 1) {
      dispatch(decreaseItem(index));
      cartItem[index].quantity -= 1;
      const updatedItemsToCart = [...itemsToCart];
      updatedItemsToCart[index].quantity = cartItem[index].quantity;
      setItemsToCart(updatedItemsToCart);
      localStorage.setItem("NewcartItems", JSON.stringify(updatedItemsToCart[index].quantity));
    }
  };
  
  
  const removeItem = (index) => {
   dispatch(decreaseItem(index));
    const updatedCartItems = cartItem.filter((_, i) => i !== index);
    localStorage.setItem("NewcartItems", JSON.stringify(updatedCartItems));
  };
  
  useEffect(() => {
    if (cartItem) {
      const totalPrice = calculateTotalPrice(cartItem);
      settotalPrice(totalPrice);
    } else {
      settotalPrice(0);
    }
  }, [cartItem]);
  
  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return totalPrice;
  };
  
  return (
    <div className="bg-light biggs">
      <NavBar />
      {itemLength > 0 ? (
        <div className="container-fluid d-flex p-5 bigs bg-light ">
          <div className="d-flex ">
            <div className="card border-0 mx-4 shoppingitems rounded-2 p-2 shadow user_item">
              <h5 className="fw-bolder text-secondary">Cart ({itemLength})</h5>
              <hr className="break text-secondary" />
              {cartItem &&
                cartItem.map((el, i) => {
                  return (
                    <div key={i}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center  my-2">
                          <div className="cartimage">
                            <img
                              src={el.image}
                              className="w-100 img-fluid rounded-2"
                              alt=""
                            />
                          </div>
                          <div className="mx-2 ">
                            <p>
                              <span className="fw-bold">Description :</span>{" "}
                              {el.description}
                            </p>
                            {/* <p className="pri"><span className="fw-bold">Price  :</span> {el.price}</p> */}
                            <p className="pri">
                              <span className="fw-bold">Size : </span>(
                              {el.selectedSize})
                            </p>
                            <p className="text-danger pri">Eflyer Expres 🚀</p>
                          </div>
                        </div>
                        <div className="mx-4">
                          <p className="mx-3 fw-bold">${el.price} </p>
                          <div className="d-flex align-items-center">
                            <button
                              className="incre"
                              onClick={() => decreaseQuantity(i)}
                            >
                              -
                            </button>
                            <p className="mx-2 mt-2 ">{itemsToCart[i]}</p>
                            <button
                              className="incre"
                              onClick={() => increaseQuantity(i)}
                            >
                              +
                            </button>
                          </div>
                          <button onClick={()=> removeItem(i)} className="deleteitem"><AiTwotoneDelete style={{color : "brown"}}/> <span style={{color : "brown"}}>Remove</span></button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </div>
            <div className="  checkout  p-2 shadow rounded-3">
              <h5>Cart Summary</h5>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <h6>Subtotal</h6>
                <span className="mx-4">${totalPrice}</span>
              </div>
              <hr className="break" />
              <button className="btn btn-dark w-100">Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="noitems">
          <Link to="/"> <button className="">Go to shop</button>
 </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
