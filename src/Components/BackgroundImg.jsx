import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill, BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiHelpCircle } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import * as bootstrap from "bootstrap";
import { increaseItem, decreaseItem } from "../Redux/MySlice";

const BackgroundImg = (props) => {
  const [currentuser, setcurrentuser] = useState([]);
  const [goods, setGoods] = useState([]);
  const [searchitem, setsearchitem] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    // Update the input div's height based on the input value
    const inputDiv = document.querySelector(".suggestion");
    inputDiv.style.display = searchitem ? "block" : "none";
  }, [searchitem]);

  // used this for searching items
  const [filteredGoods, setFilteredGoods] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);

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

  const searchItems = () => {
    const lowercaseSearchItem = searchitem.toLowerCase();
    const foundItems = goods.filter((item) =>
      item.category.toLowerCase().includes(lowercaseSearchItem)
    );

    if (foundItems.length === 0) {
      setSearchNotFound(true);
      setFilteredGoods([]);
    } else {
      setSearchNotFound(false);
      setFilteredGoods(foundItems);
      navigate(`/searchitem/${searchitem}`); // Navigate to the search results page
    }
  };

  useEffect(() => {
    console.log(filteredGoods);
  }, [filteredGoods]);

  // fetching here for the sake of username inorder to get the user that added items to cart
  useEffect(() => {
    axios
      .get("http://localhost:1243/users")
      .then((res) => res.data)
      .then((data) => {
        setcurrentuser(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (currentuser.length > 0) {
      const currentUser = currentuser[0].username; // Assuming there's only one user in the array
      console.log(currentUser);
    }
  }, [currentuser]);

  // useEffect(() => {
  const cartItem = JSON.parse(localStorage.getItem("NewcartItems"));
  const itemLength = cartItem ? cartItem.length : 0;
  // }, []);

  // const itemLength = cartItem ? cartItem.length : 0;
  const mystate = useSelector((state) => state.mySlice);
  console.log(mystate);
  const items = mystate.Item;
  console.log(items);
  useEffect(() => {
    const sidebar = document.querySelector(".sidenav");
    function handleMenuClick() {
      sidebar.style.display = "block";
    }

    function handleCancelClick() {
      const sidebar = document.querySelector(".sidenav");
      sidebar.classList.remove("animate__bounceInLeft");
      sidebar.classList.add("animate__bounceOutLeft");
      sidebar.style.animationDuration = "2s";
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 2000);
    }

    document.querySelector(".menu")?.addEventListener("click", handleMenuClick);
    document
      .querySelector(".cancel")
      ?.addEventListener("click", handleCancelClick);

    return () => {
      document
        .querySelector(".menu")
        ?.removeEventListener("click", handleMenuClick);
      document
        .querySelector(".cancel")
        ?.removeEventListener("click", handleCancelClick);
    };
  }, []);


  useEffect(() => {
    function handleScroll() {
      const newnav = document.querySelector(".newnav");
      const threshold = window.innerHeight * 0.3;

      if (window.scrollY >= threshold) {
        newnav.classList.add("fixed");
        document.querySelector(".newnav").style.backgroundColor =
          "rgb(0, 17, 34)";
        document.querySelector(".input").style.backgroundColor = "white";
        document.querySelector(".input").style.color = "black";
        document.querySelector(".inp").style.color = "black";
      } else {
        newnav.classList.remove("fixed");
        document.querySelector(".newnav").style.background = "none";
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const mediamenu = () => {
    alert("cool");
  };

  const classes = "carousel slide background " + props.className;

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div
          id="navbar"
          className="custom_menu  p-3 mx-auto d-flex align-items-center justify-content-around px-3"
        >
          <ul>
            <li className="mx-2">
              <a href="#">Best Sellers</a>
            </li>
            <li className="mx-2">
              <a href="#">Gift Ideas</a>
            </li>
            <li className="mx-2">
              <a href="#">New Releases</a>
            </li>
            <li className="mx-2">
              <a href="#">Today's Deals</a>
            </li>
            <li className="mx-2">
              <a href="#">Customer Service</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Carousel */}
      <div
        id="carouselExampleIndicators"
        className={classes}
        data-bs-ride="carousel"
      >
        <div className="title w-100 container ">
          <div className="d-flex align-items-center newnav justify-content-evenly ">
            <div className="d-flex align-items-center ">
              <button className="btn btn text-light fs-2 menu">
                <AiOutlineMenu />
              </button>
              {/* Sidebar */}
              <div className="sidenav animate__animated animate__bounceInLeft text-start p-4">
                <button className="btn btn cancel fs-3">&times;</button>
                <h5 className="mt-5">
                  <Link to="/" className="my-5 fs-5 fw-bolder text-light ">
                    Home
                  </Link>
                </h5>
                <h5 className="my-4">
                  <Link
                    to="/mens-wear"
                    className="my-5 fs-5 fw-bolder text-light"
                  >
                    Mens Wear
                  </Link>
                </h5>
                <h5 className="my-4">
                  <Link
                    to="/womens-wear"
                    className="my-5 fs-5 fw-bolder text-light"
                  >
                    Womens Wear
                  </Link>
                </h5>
                <h5 className="my-4">
                  <Link
                    to="/electronics"
                    className="my-5 fs-5 fw-bolder text-light"
                  >
                    Electronics
                  </Link>
                </h5>
              </div>
              <h1 className="logo fw-bolder text-light">Eflyer</h1>
            </div>
            <div className="d-grid w-50 align-items-center sear">
              <div className="d-flex align-items-center">
                <div className="input  rounded-2 d-flex align-items-center">
                  <span className="fs-5  searchlogo fw-bolder mx-1">
                    <AiOutlineSearch />
                  </span>
                  <input
                    onChange={(e) => setsearchitem(e.target.value)}
                    type="search"
                    name="searchitems"
                    id="search"
                    className="border-0 w-100 text-dark inp bg-none p-2"
                    placeholder="Search products, brands and category"
                  />
                  <button className="serch">
                    <AiOutlineSearch />
                  </button>
                  <div className="suggestion  bg-light ">
                    {" "}
                   <div> {searchitem}</div>
                    {searchNotFound
                      ? "Not found"
                      : filteredGoods.map((item) => (
                          <div key={item.id}>{item.name}</div>
                        ))}
                  </div>
                </div>

                <button
                  onClick={searchItems}
                  className="btn btn-danger  searchbtn mx-3"
                >
                  Search
                </button>
              </div>
            </div>
            <Link
              to={currentuser.length > 0 ? "/" : "/login"}
              title={
                currentuser.length > 0 ? currentuser[0].username : "Account"
              }
              id="account"
              className="d-flex account text-light align-items-center"
            >
              <span className="fs-4 fw-bolder mx-1">
                {" "}
                <BsFillPersonFill />
              </span>
              {currentuser.length > 0 ? currentuser[0].username : "Account"}
            </Link>
            <div
              title="Help"
              id="help"
              className="d-flex text-light align-items-center "
            >
              <span className="fs-5 fw-bolder mx-1 ">
                <FiHelpCircle />
              </span>
              Help
            </div>
            <div
              title="Cart"
              className="d-flex text-light cart align-items-center"
            >
              {itemLength > 0 ? (
                <Link
                  to="/cart"
                  title="Cart"
                  className="d-flex text-light cart align-items-center"
                >
                  <span className="bg-danger cartitems text-light rounded-circle">
                    {itemLength}
                  </span>
                  <span className="fs-5 fw-bolder mx-1 ">
                    <BsCart4 />
                  </span>
                  Cart
                </Link>
              ) : (
                <Link
                  to="/cart"
                  title="Cart"
                  className="d-flex text-light cart align-items-center"
                >
                  <span className="bg-danger cartitems text-light rounded-circle">
                    0
                  </span>
                  <span className="fs-5 fw-bolder mx-1 ">
                    <BsCart4 />
                  </span>
                  Cart
                </Link>
              )}
            </div>
            <button
              onClick={mediamenu}
              className="btn btn-outline-light  fs-2  bigmenu"
            >
              <AiOutlineMenu
                style={{ position: "absolute", top: "5px", left: "5px" }}
              />
            </button>
            <div></div>
          </div>
        </div>

        <div className="mediamodal p-5">
          <button className="cancelmod">&times;</button>
          <div className="mediamodalcontent text-light m-3">
            <h4 className="my-5 text-center">
              <Link to="/mens-wear" className="my-3 text-light fs-4 link">
                Men's Wear
              </Link>
            </h4>
            <h4 className="my-5 text-center">
              <Link to="/womens-wear" className="my-3 text-light fs-4 link">
                Women's Wear
              </Link>
            </h4>
            <h4 className="my-5 text-center">
              <Link to="/electronics" className="my-3 text-light fs-4 link">
                Electronics
              </Link>
            </h4>
            <h4 className="my-5 text-center">
              <Link to="/account" className="my-3 account text-light fs-4 link">
                Account
              </Link>
            </h4>
            <h4 className="my-5 text-center">
              <Link to="/Help" className="my-3 text-light fs-4 link">
                Accesories
              </Link>
            </h4>
            <h4 className="my-5 text-center">
              <Link to="/account" className="my-3 text-light fs-4 link">
                Help
              </Link>
            </h4>
          </div>
        </div>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h1 className="text-center w-50 text-light shadow mx-auto my-auto fw-bolder  ">
              Get started with your favorite shopping
            </h1>
          </div>
          <div className="carousel-item">
            <h1 className="text-center w-50 text-light shadow mx-auto my-auto fw-bolder  ">
              Get started with your favorite shopping
            </h1>
          </div>
          <div className="carousel-item">
            <h1 className="text-center w-50 text-light shadow mx-auto my-auto fw-bolder  ">
              Get started with your favorite shopping
            </h1>
          </div>
        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <button className="btn btn-dark buy py-2 px-4 fw-bold">Buy Now</button>
      </div>
    </div>
  );
};

export default BackgroundImg;
