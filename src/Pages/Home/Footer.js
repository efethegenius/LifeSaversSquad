import React from "react";
import wave from "../../Photos/wave.svg";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillMail,
} from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../../Photos/logo.png";
export const Footer = () => {
  return (
    <section className="footer">
      <img src={wave} alt="mySvgImage" className="wave" />
      <div className="footer-header">
        <h1 className="footer-logo">LIFE SAVERS SQUAD</h1>
        <div className="sm-container">
          <div className="sm">
            <AiOutlineTwitter />
          </div>
          <div className="sm">
            <AiFillFacebook />
          </div>
          <div className="sm">
            <AiFillInstagram />
          </div>
        </div>
      </div>
      <div className="footer-links">
        <div className="quick-links">
          <h1>QUICK LINKS</h1>
          <ScrollLink
            to="hero-container"
            smooth={true}
            duration={2000}
            spy={true}
            // activeClass="active"
            // offset={-10}
          >
            <p>Home</p>
          </ScrollLink>
          <ScrollLink
            to="images"
            smooth={true}
            duration={2000}
            spy={true}
            // activeClass="active"
            // offset={-10}
          >
            <p>Services</p>
          </ScrollLink>
          <ScrollLink
            to="body-wrapper"
            smooth={true}
            duration={2000}
            spy={true}
            // activeClass="active"
            offset={-20}
          >
            <p>About us</p>
          </ScrollLink>
          <ScrollLink
            to="reviews"
            smooth={true}
            duration={2000}
            spy={true}
            // activeClass="active"
            // offset={-10}
          >
            <p>Testimonials</p>
          </ScrollLink>
          <ScrollLink
            to="contact-us"
            smooth={true}
            duration={2000}
            spy={true}
            // activeClass="active"
            // offset={-10}
          >
            <p>Contact us</p>
          </ScrollLink>
          <Link to="/volunteer" className="button footer-btn">
            Become a volunteer
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Link>
        </div>
        <div className="quick-links contact-link">
          <h1>CONTACT US</h1>
          <p>
            <ImLocation className="contact-icon" />
            No 12, address street, location, Lagos
          </p>
          <p>
            <AiFillPhone className="contact-icon" />
            +23400 000 0000
          </p>
          <p>
            <AiFillMail className="contact-icon" />
            admin@lifesaverssquad.com
          </p>
        </div>
        <div>
          {/* <Link to="/volunteer" className="button footer-btn">
            BECOME A VOLUNTEER
          </Link> */}
          {/* <h1 className="footer-logo sm-ft-logo">LIFE SAVERS SQUAD</h1> */}
          <img src={logo} alt="logo" className="footer-logo" />
        </div>
      </div>

      <div className="copyright-container">
        <p>© 2022 Life Savers Squad. All rights reserved.</p>
      </div>
    </section>
  );
};
