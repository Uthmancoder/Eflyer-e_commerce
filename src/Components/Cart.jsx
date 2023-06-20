import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Cart = () => {
  return (
    <div className="bg-light biggs">
      <NavBar />
      <div className="container-fluid d-flex p-5 bigs bg-light">
        <div className="card border-0 w-75 shoppingitems rounded-2 p-2 shadow">
            <h5 className="fw-bolder text-secondary">Cart </h5>
            <hr className="break text-secondary"/>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
          veniam, laudantium consequuntur blanditiis qui ex, dignissimos facere
          et est tempora aspernatur voluptas delectus aliquid magni provident
          repudiandae neque praesentium sint?
        </div>
        <div className="w-25 mx-2  checkout  m-2 shadow rounded-2 p-2">
            <h5>Cart Summary</h5>
            <hr/>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
          impedit quae est ipsam voluptas similique sequi enim, nam tenetur
          itaque quos quidem qui corrupti rem culpa iste eligendi suscipit
          sapiente.
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
