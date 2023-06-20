import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill, BsCart4 } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const mystate = useSelector((state) => state.mySlice);
  console.log(mystate);
  const items = mystate.Item;
  return (
    <div className="w-100 bg-dark d-flex align-items-center justify-content-evenly">
      <div className="">
        <h1 className="logo fw-bolder text-light">Eflyer</h1>
      </div>
      <div className="d-flex align-items-center w-50">
        <div className="input w-100 rounded-2 d-flex align-items-center">
          <span className="fs-5 fw-bolder mx-1">
            <AiOutlineSearch />
          </span>
          <input
            type="search"
            name="searchitems"
            id="search"
            className="border-0 w-100 inp bg-none p-2"
            placeholder="Search products, brands and category"
          />
        </div>
        <button className="btn btn-danger mx-3">Search</button>
      </div>
      <div title="Account" className="d-flex text-light align-items-center">
        <span className="fs-4 fw-bolder mx-1">
          {" "}
          <BsFillPersonFill />
        </span>
        Account
      </div>
      <div title="Help" className="d-flex text-light align-items-center">
        <span className="fs-5 fw-bolder mx-1 ">
          <FiHelpCircle />
        </span>
        Help
      </div>
      <div title="Cart" className="d-flex text-light cart align-items-center">
        <span className="bg-danger cartitems text-light rounded-circle">
          {items}
        </span>
        <span className="fs-5 fw-bolder mx-1 ">
          <BsCart4 />
        </span>
        Cart
      </div>
    </div>
  );
};

export default NavBar;
