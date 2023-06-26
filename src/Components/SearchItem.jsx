import React, { useState, useEffect } from 'react';
import BackgroundImg from './BackgroundImg';
import Footer from './Footer';
import { increaseItem, decreaseItem } from "../Redux/MySlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SearchItem = () => {
  const [itemsToCart, setItemsToCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();
  const mystate = useSelector((state) => state.mySlice);
  console.log(mystate);

  // Open Modal to add to cart
  const handleAddToCart = (index) => {
    setSelectedCategory({ ...goods[index] });
    setSelectedIndex(index); // Store the selected index
    setItemsToCart((prevItemsToCart) => {
      const updatedCart = [...prevItemsToCart];
      updatedCart[index] = 0;
      return updatedCart;
    });
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // increase state quantity
  const increaseQuantity = (index) => {
    dispatch(increaseItem());
    setItemsToCart((prevItemsToCart) => {
      const updatedCart = [...prevItemsToCart];
      updatedCart[index] += 1;
      return updatedCart;
    });
  };

  // decrease state quantity
  const decreaseQuantity = (index) => {
    if (itemsToCart[index] > 0) {
      dispatch(decreaseItem());
      setItemsToCart((prevItemsToCart) => {
        const updatedCart = [...prevItemsToCart];
        updatedCart[index] -= 1;
        return updatedCart;
      });
    }
  };

  const viewInCart = (index) => {
    const selectedItem = goods[selectedIndex];
    const newItem = {
      image: selectedItem.image,
      price: selectedItem.price,
      selectedSize: selectedSize,
      quantity: itemsToCart[selectedIndex],
      description: selectedItem.title,
    };

    if (!newItem.selectedSize || !newItem.quantity) {
      alert("Select size and quantity for your product");
    } else {
      // Save the new item to localStorage
      const updatedItems =
        JSON.parse(localStorage.getItem("NewcartItems")) || [];
      updatedItems.push(newItem);
      localStorage.setItem("NewcartItems", JSON.stringify(updatedItems));
      alert("Item added to cart successfully");
    }
  };

  const searchItem = JSON.parse(localStorage.getItem("searchitem"))
  const filteredGoods = JSON.parse(localStorage.getItem("filteredgoods"));

  return (
    <div>
      <BackgroundImg />
      {/* mapping searched items */}
      <h1 className='text-center  fs-1 fw-bolder'>{searchItem}</h1>
      <div className="row container-fluid coct my-5">
        {filteredGoods &&
          filteredGoods.map((el, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mx-3 my-3 ">
              <div className="border ddd w-100 shadow rounded-2 px-2 pt-4 mx-2 text-center divv">
                <img className="img-fluid h-25" src={el.image} alt={el.title} />
                <h4 className="fw-bolder">{el.category}</h4>
                <p>{el.title}</p>
                <p>
                  <span className="fw-bolder">Rating : </span>
                  {el.rating.rate} Count: {el.rating.count}
                </p>
                <p>
                  <span className="fw-bolder">Price : </span>${el.price}
                </p>

                <button
                  type="button"
                  className="btn btn-dark text-light fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${i}`}
                  onClick={() => handleAddToCart(i)}
                >
                  Add to cart
                </button>

                {/* Modal */}
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
                          {el.category}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          className="img-fluid modalimg"
                          src={el.image}
                          alt={el.title}
                        />

                        <p>{el.title}</p>
                        <div className="d-flex align-items-center justify-content-center text-center border w-75 mx-auto p-2 my-3 rounded-2 inset-shadow">
                          <h6 className="mt-2 fs-5">Size:</h6>
                          <div className="d-flex align-items-center">
                            <div className="mx-2">
                              <input
                                type="radio"
                                id={`sizeS${i}`}
                                value="S"
                                name={`size${i}`}
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
                                name={`size${i}`}
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
                                name={`size${i}`}
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
                                name={`size${i}`}
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
                            <button
                              onClick={() => decreaseQuantity(i)}
                              className="addmore"
                            >
                              -
                            </button>
                            <h5 id="quantity" className="mx-3">
                              {itemsToCart[i]}
                            </h5>

                            <button
                              onClick={() => increaseQuantity(i)}
                              className="addmore"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => viewInCart(i)} // Pass the index value
                          className="btn btn-dark my-3 p-2"
                        >
                          Add to view in cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchItem;
