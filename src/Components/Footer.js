import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h3 class="footer-title">Eflyer</h3>
              <p>Your go-to destination for online shopping.</p>
              <small>
                Eflyer provides you with the nicest treats, nice and quality
                product
              </small>
              <small class="text-light">
                © 2020 All Rights Reserved. Design by Free html Templates
              </small>
            </div>
            <div class="col-md-4">
              <h4 class="footer-title">Quick Links</h4>
              <ul class="footer-links">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">Categories</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div class="col-md-4">
              <h4 class="footer-title">Stay Connected</h4>
              <ul class="footer-social-links d-flex align-items-center my-3">
                <li>
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li class="mx-5">
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
              <small>Help Line Number : +1 1800 1200 1200</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
