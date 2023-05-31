import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsCart3 } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'bootstrap';

const BackgroundImg = () => {
  useEffect(() => {
    function handleMenuClick() {
      const sidebar = document.querySelector('.sidenav');
      sidebar.style.display = 'block';
    }

    function handleCancelClick() {
      const sidebar = document.querySelector('.sidenav');
      sidebar.classList.remove('animate__bounceInLeft');
      sidebar.classList.add('animate__bounceOutLeft');
      sidebar.style.animationDuration = '2s';
      setTimeout(() => {
        sidebar.style.display = 'none';
      }, 2000);
    }

    document.querySelector('.menu')?.addEventListener('click', handleMenuClick);
    document.querySelector('.cancel')?.addEventListener('click', handleCancelClick);

    return () => {
      document.querySelector('.menu')?.removeEventListener('click', handleMenuClick);
      document.querySelector('.cancel')?.removeEventListener('click', handleCancelClick);
    };
  }, []);

  

  useEffect(() => {
    const carousel = new Carousel(document.getElementById('carouselExampleIndicators'));
    return () => {
      carousel.dispose();
    };
  }, []);


 


  

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div id='navbar' className='custom_menu bg-dark p-3 mx-auto d-flex align-items-center justify-content-around px-3'>
          <ul>
            <li className='mx-2'>
              <a href='#'>Best Sellers</a>
            </li>
            <li className='mx-2'>
              <a href='#'>Gift Ideas</a>
            </li>
            <li className='mx-2'>
              <a href='#'>New Releases</a>
            </li>
            <li className='mx-2'>
              <a href='#'>Today's Deals</a>
            </li>
            <li className='mx-2'>
              <a href='#'>Customer Service</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide background" data-bs-ride="carousel">
      <h1 className='title text-light fw-bolder '>Eflyer</h1>
  <div className="carousel-indicators">
 
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
                <div class="carousel-item active">
                    <h1 class="text-center w-50 text-light shadow mx-auto my-auto fw-bolder  ">Get started with
                        your favorite shopping</h1>
                </div>
                <div class="carousel-item">
                    <h1 class="text-center w-50 text-light shadow mx-auto my-auto fw-bolder  ">Get started with
                        your favorite shopping</h1>
                </div>
                <div class="carousel-item">
                    <h1 class="text-center w-50 text-light shadow mx-auto my-auto fw-bolder  ">Get started with
                        your favorite shopping</h1>
                </div>
            </div>
  <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  <button className='btn btn-dark buy py-2 px-4 fw-bold'>Buy Now</button>
</div>


      {/* Sidebar */}
      <div className='sidenav animate__animated animate__bounceInLeft'>
        {/* Sidebar content */}
      </div>

     
    </div>
  );
};



export default BackgroundImg;