import React, { useState, useEffect } from "react";

const CurrentGoods = () => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((jsonData) => {
        setGoods(jsonData);
        console.log(jsonData);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddToCart = (category, image, price) => {
    setSelectedCategory({category, image, price});
  };

  const generateItems = (category) => {
    let counter = 0;
    return goods.map((el, i) => {
      if (el.category === category) {
        if (counter < 3) {
          counter++;
          return (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mx-3 my-5"
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
                  className="btn btn-warning text-light fw-bold"
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
                        
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
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
      <div className="row container-fluid coct my-5">
        <div className="container">
          <h1 className="text-center fw-bolder fs-1">Men Casual Wears</h1>
          <div className="cart-div p-5 mx-auto ">
            {generateItems("men's clothing")}
          </div>
        </div>

        <div className="container">
          <h1 className="text-center fw-bolder fs-1">Women Casual Wears</h1>
          <div className="cart-div p-5 mx-auto  owl-carousel">
            {generateItems("women's clothing")}
          </div>
        </div>

        <div className="container">
          <h1 className="text-center fw-bolder fs-1">Electronics</h1>
          <div className="cart-div p-5 mx-auto ">
            {generateItems("electronics")}
          </div>
        </div>

        <div className="container">
          <h1 className="text-center fw-bolder fs-1">Jeweleries</h1>
          <div className="cart-div p-5 mx-auto my-2">
            {generateItems("jewelery")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentGoods;
