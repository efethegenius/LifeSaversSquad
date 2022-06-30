import React, { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { photos } from "../Components/data";
import logo from "../../Photos/logo.png";

export const Hero = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [index, setIndex] = useState(0);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 70);
    });
  }, []);

  let homePhotos = photos[Math.floor(Math.random() * photos.length)];

  useEffect(() => {
    const lastIndex = photos.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <>
      <section className="hero-container">
        <div className="urgent-nav">
          <h3>NEED URGENT HELP ? CALL 08068886692</h3>
        </div>
        <div className={scroll ? "nav-container scroll-nav" : "nav-container"}>
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          <h1>LifeSaversSquad</h1>
          <div
            className={isMenu ? "show-menu menu-container" : "menu-container"}
            onClick={() => setIsMenu(false)}
          >
            {/* <img src={logo} alt="logo" className="logo" /> */}
            <h1>LifeSaversSquad</h1>
            <div className="menu-links">
              <ScrollLink
                to="hero-container"
                smooth={true}
                duration={2000}
                spy={true}
                // activeClass="active"
                // offset={-10}
                offset={-60}
              >
                <p onClick={() => setIsMenu(false)}>Home</p>
              </ScrollLink>
              <ScrollLink
                to="body-wrapper"
                smooth={true}
                duration={3000}
                spy={true}
                // activeClass="active"
                offset={-60}
              >
                <p onClick={() => setIsMenu(false)}>About Us</p>
              </ScrollLink>
              <ScrollLink
                to="core"
                smooth={true}
                duration={3000}
                spy={true}
                // activeClass="active"
                offset={-60}
              >
                <p onClick={() => setIsMenu(false)}>Values</p>
              </ScrollLink>
              <ScrollLink
                to="reviews"
                smooth={true}
                duration={3000}
                spy={true}
                // activeClass="active"
                // offset={-10}
                offset={-60}
              >
                <p onClick={() => setIsMenu(false)}>Quotes</p>
              </ScrollLink>
              <ScrollLink
                to="reason"
                smooth={true}
                duration={3000}
                spy={true}
                // activeClass="active"
                offset={-60}
              >
                <p onClick={() => setIsMenu(false)}>Benefits</p>
              </ScrollLink>
              <ScrollLink
                to="sponsors"
                smooth={true}
                duration={3000}
                spy={true}
                // activeClass="active"
                // offset={-10}
                offset={-60}
              >
                <p onClick={() => setIsMenu(false)}>Sponsors</p>
              </ScrollLink>
            </div>
            <Link to="/volunteer" className="button menu-btn">
              VOLUNTEER
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
          {isMenu ? (
            <FaTimes className="ham-menu" onClick={() => setIsMenu(!isMenu)} />
          ) : (
            <HiMenuAlt1
              className="ham-menu"
              onClick={() => setIsMenu(!isMenu)}
            />
          )}
        </div>
        <div className="hero-content">
          <div className="hero-texts">
            <Fade triggerOnce duration={1500} direction="left">
              <h2>LET'S HELP OTHERS</h2>
              <p>
                The life savers squad is a squad of volunteers determined to
                improve the public health and safety in the Ikoyi community.
              </p>
            </Fade>
            <Link to="/volunteer" className="button">
              {" "}
              Become a LifeSaver <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* <div className="chaotic-orbit"></div> */}
            </Link>
          </div>
          <Fade triggerOnce duration={1500} direction="right">
            <img src={homePhotos} alt="happy children" className="hero-img" />
          </Fade>
        </div>
        {/* <img src={wave} alt="wave" className="hero-wave" /> */}
      </section>
      <Body />
      <Footer />
    </>
  );
};
