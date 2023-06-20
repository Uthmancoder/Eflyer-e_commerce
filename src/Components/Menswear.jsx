import React, { useState, useEffect } from "react";
import BackgroundImg from "./BackgroundImg";
import Footer from "./Footer";

const Menswear = () => {
  const [dataset, setDataset] = useState([]);

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

        setDataset(combinedDataset);
        console.log(combinedDataset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataset]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddToCart = (category, image, price) => {
    setSelectedCategory({ category, image, price });
  };

  const generateItems = (category) => {
    return dataset.map((el, i) => {
      // Filter items by category
      if (el.category === category) {
        return (
          <div className="col-12 col-sm-4 col-md-4 col-lg-3 mx-3 my-5" key={i}>
            <div className="border ddd w-100 shadow rounded-2 px-2 pt-4 mx-2 text-center divv">
              <img className="img-fluid h-25" src={el.image} alt={el.title} />
              <h4 className="fw-bolder">{el.category}</h4>
              <p>{el.title}</p>
              {/* <p>
<span className="fw-bolder">Rating : </span>
{/* {el.rating.rate} Count: {el.rating.count} 
</p> */}
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
                      <img className="img-fluid" src={selectedCategory.image} />
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
      }
      return null; // Add a null return for items not matching the category
    });
  };

  return (
    <div>
      {/* Item sections */}
      <BackgroundImg className="mensbackground" />
      <div className="row container-fluid coct my-5">
        <div className="container">
          <h1 className="text-center fw-bolder fs-1">Men Casual Wears</h1>
          <div className="cart-div p-5 mx-auto ">
            {generateItems("men's clothing")}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Menswear;
