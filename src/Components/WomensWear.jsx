import React, { useState, useEffect } from "react";
import BackgroundImg from "./BackgroundImg";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem } from "../Redux/MySlice";

const WomensWear = () => {
  const [goods, setGoods] = useState([]);
  const [itemsToCart, setItemsToCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.mySlice);
  const items = state.Item;
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeAndQuantity, setSizeAndQuantity] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Fake Store API
        const fakeStoreResponse = await fetch(
          "https://fakestoreapi.com/products"
        );
        const fakeStoreJsonData = await fakeStoreResponse.json();

        // Fetch data from the local JSON file
        const localJsonResponse = await fetch("http://localhost:1243/Items");
        const localJsonData = await localJsonResponse.json();

        // Combine the datasets
        const combinedDataset = [...localJsonData, ...fakeStoreJsonData];

        setGoods(combinedDataset);
        console.log(combinedDataset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  // Logging selected category & selected size
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {
    console.log("selectedSize:", selectedSize);
  }, [selectedSize]);

  // Increase items
  const increaseQuantity = (index) => {
    dispatch(increaseItem());
    setItemsToCart((prevItemsToCart) => {
      const updatedCart = [...prevItemsToCart];
      updatedCart[index] += 1;
      return updatedCart;
    });
  };

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

  useEffect(() => {
    const selectedImage = goods[selectedIndex]?.image;
    const sizeQuant = [
      {
        selectedSize: selectedSize,
        quantity: itemsToCart[selectedIndex],
        image: selectedImage,
      },
    ];
    setSizeAndQuantity(sizeQuant);
    localStorage.setItem("size&Quantity", JSON.stringify(sizeAndQuantity));
  }, [items, selectedSize, goods, selectedIndex]);

  const viewInCart = (index) => {
    const selectedItem = goods[selectedIndex];
    const newItem = {
      image: selectedItem.image,
      price: selectedItem.price,
      selectedSize: selectedSize,
      quantity: itemsToCart[selectedIndex],
      description: selectedItem.title,
    };

    // Save the new item to localStorage
    const updatedItems = JSON.parse(localStorage.getItem("NewcartItems")) || [];
    updatedItems.push(newItem);
    localStorage.setItem("NewcartItems", JSON.stringify(updatedItems));
    alert("Item added to cart successfully");
  };

  const generateItems = (category) => {
    return goods.map((el, i) => {
      // Filter items by category
      if (el.category === category) {
        return (
          <div className="col-12 col-sm-3 col-md-3 col-lg-3 my-4 mx-1" key={i}>
            <div className="border ddd w-100 shadow rounded-2 px-2 pt-4 mx-2 text-center divv">
              <img className="img-fluid h-50" src={el.image} alt={el.title} />
              <h4 className="fw-bolder">{el.category}</h4>
              <p>{el.title}</p>

              <p>
                <span className="fw-bolder">Price: </span>
                ${el.price}
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
                        <h5 className="fs-5 fw-bold">Quantity:</h5>
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
        );
      }
      return null; // Add a null return for items not matching the category
    });
  };
 
  

  return (
    <div>
      <BackgroundImg className="womenswear" />
      <div className="row container-fluid coct my-5">
        <div className="container">
          <h1 className="text-center fw-bolder fs-1">Women Casual Wears</h1>
          <div className="cart-div p-5 mx-auto ">
            {generateItems("women's clothing")}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WomensWear;
