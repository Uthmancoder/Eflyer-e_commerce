import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill, BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiHelpCircle } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import * as bootstrap from "bootstrap";
import { increaseItem, decreaseItem } from "../Redux/MySlice";

const BackgroundImg = (props) => {
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

  // useEffect(() => {
  //   const carousel = new bootstrap.Carousel(
  //     document.getElementById("carouselExampleIndicators")
  //   );

  //   return () => {
  //     carousel.dispose();
  //   };
  // }, []);

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
            <div className="d-flex align-items-center sear">
              <div className="input w-100 rounded-2 d-flex align-items-center">
                <span className="fs-5 fw-bolder mx-1">
                  <AiOutlineSearch />
                </span>
                <input
                  type="search"
                  name="searchitems"
                  id="search"
                  className="border-0 inp bg-none p-2"
                  placeholder="Search products, brands and category"
                />
              </div>
              <button className="btn btn-danger searchbtn mx-3">Search</button>
            </div>
            <div
              title="Account"
              id="account"
              className="d-flex text-light align-items-center "
            >
              <span className="fs-4 fw-bolder mx-1">
                {" "}
                <BsFillPersonFill />
              </span>
              Account
            </div>
            <div title="Help"  id="help" className="d-flex text-light align-items-center ">
              <span className="fs-5 fw-bolder mx-1 ">
                <FiHelpCircle />
              </span>
              Help
            </div>
            <div
              title="Cart"
              className="d-flex text-light cart align-items-center"
            >
              <Link to="/cart" className="cart">
                <span className="bg-danger cartitems text-light rounded-circle">
                  {items}
                </span>
                <span className="fs-5 fw-bolder mx-1 ">
                  <BsCart4 />
                </span>
                Cart
              </Link>
            </div>

            <div>
              
            </div>
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
