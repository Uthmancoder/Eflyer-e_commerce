import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem } from "../Redux/MySlice";
const CurrentGoods = () => {
  const [goods, setGoods] = useState([]);
  const [itemsToCart, setitemsToCart] = useState([])
  const dispatch = useDispatch();
  const state = useSelector((state) => state.mySlice)
  console.log(state);
  const items = state.Item;
  console.log(items);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((jsonData) => {
        setGoods(jsonData);
        console.log(jsonData);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleAddToCart = (category, image, price) => {
    setSelectedCategory({ category, image, price });
    setitemsToCart(itemsToCart => [...itemsToCart, 0])  
  };
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {
    console.log("selectedSize :", selectedSize);
  }, [selectedSize])

  
  const increraseQuantity = (index)=>{
      dispatch(increaseItem());
      setitemsToCart(itemsToCart => {
        const updatedCart = [...itemsToCart];
        updatedCart[index] += 1;
        return updatedCart;
      });
      
  }
  const reduceQuantity = (index)=>{
    if (items > 0) {
      dispatch(decreaseItem())
      setitemsToCart(itemsToCart => {
        const updatedCart = [...itemsToCart];
        updatedCart[index] -= 1;
        return updatedCart;
      });
    }
  }



const [sizeandQuantity, setsizeandQuantity] = useState([])
  useEffect(() => {
    const sizequant = {"selectedSize ": selectedSize , "quantity" : items}
    setsizeandQuantity(sizequant)
    localStorage.setItem("size&Quantity", JSON.stringify(sizeandQuantity))
     console.log("quantity :", items);
     console.log(sizequant);
  }, [items, selectedSize])
  



  const generateItems = (category) => {
    let counter = 0;
    return goods.map((el, i) => {
      if (el.category === category) {
        if (counter < 3) {
          counter++;
          return (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mx-3 my-3 "
              key={i}
            >
              <div className="border ddd w-100 shadow rounded-2 px-2 pt-4 mx-2 text-center divv">
                <img className="img-fluid h-25" src={el.image} alt={el.title} />
                <h4 className="fw-bolder">{el.category}</h4>
                <p>{el.title}</p>
                <p>
                  <span className="fw-bolder">Rating : </span>
                  {el.rating.rate} Count: {el.rating.count}
                </p>
                <p>
                  <span className="fw-bolder">Price : </span>
                  {el.price}
                </p>

                <button
                  type="button"
                  className="btn btn-dark text-light fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${i}`}
                  onClick={() => handleAddToCart(el.category)}
                >
                  Add to cart
                </button>

                {/* Modal  */}
                <div
                  className="modal fade"
                  id={`exampleModal${i}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          {selectedCategory.category}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img className="img-fluid modalimg" src={el.image} />

                        <p>{el.title}</p>
                        <div className="d-flex align-items-center justify-content-center text-center border w-75 mx-auto p-2 my-3 rounded-2 inset-shadow">
                          <h6 className="mt-2 fs-5">Size:</h6>
                          <div className="d-flex align-items-center">
                            <div className="mx-2">
                              <input
                                type="radio"
                                id={`sizeS${i}`}
                                value="S"
                                name="size"
                                className="size-input visually-hidden"
                                onChange={handleSizeChange}
                              />
                              <label
                                htmlFor={`sizeS${i}`}
                                className="size-label"
                              >
                                S
                              </label>
                            </div>
                            <div className="mx-3">
                              <input
                                type="radio"
                                id={`sizeL${i}`}
                                value="L"
                                name="size"
                                className="size-input visually-hidden"
                                onChange={handleSizeChange}
                              />
                              <label
                                htmlFor={`sizeL${i}`}
                                className="size-label"
                              >
                                L
                              </label>
                            </div>
                            <div className="mx-2">
                              <input
                                type="radio"
                                id={`sizeXL${i}`}
                                value="XL"
                                name="size"
                                className="size-input visually-hidden"
                                onChange={handleSizeChange}
                              />
                              <label
                                htmlFor={`sizeXL${i}`}
                                className="size-label"
                              >
                                XL
                              </label>
                            </div>
                            <div className="mx-3">
                              <input
                                type="radio"
                                id={`sizeXXL${i}`}
                                value="XXL"
                                name="size"
                                className="size-input visually-hidden"
                                onChange={handleSizeChange}
                              />
                              <label
                                htmlFor={`sizeXXL${i}`}
                                className="size-label"
                              >
                                XXL
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between text-center border w-75 mx-auto p-2 rounded-2 inset-shadow">
                          <h5 className="fs-5 fw-bold">Quantity :</h5>
                          <div className="d-flex align-items-center">
                            <button onClick={reduceQuantity[i]} className="addmore">-</button>
                             <h5 id="quantity" className="mx-3">{itemsToCart[i]}</h5>
                            <button onClick={increraseQuantity[i]} className="addmore">+</button>
                          </div>
                        </div>

                        <button className="btn btn-dark my-3 p-2">Add to view in cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return null; // Add a null return when the counter exceeds 3 items
        }
      }
      return null; // Add a null return for items not matching the category
    });
  };

  return (
    <div>
      {/* Item sections */}
      <div className="row container-fluid  coct my-5">
        <div className="">
          <h1 className="text-center fw-bolder fs-1">Men Casual Wears</h1>
          <div className="cart-div   ">
            {generateItems("men's clothing")}
          </div>
        </div>

        <div className="">
          <h1 className="text-center fw-bolder fs-1">Women Casual Wears</h1>
          <div className="cart-div    owl-carousel">
            {generateItems("women's clothing")}
          </div>
        </div>

        <div className="">
          <h1 className="text-center fw-bolder fs-1">Electronics</h1>
          <div className="cart-div   ">
            {generateItems("electronics")}
          </div>
        </div>

        <div className="">
          <h1 className="text-center fw-bolder fs-1">Jeweleries</h1>
          <div className="cart-div   my-2">
            {generateItems("jewelery")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentGoods;
