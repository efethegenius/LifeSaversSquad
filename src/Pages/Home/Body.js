import React, { useState } from "react";
import { reviews } from "../Components/data";
import nurse from "../../Photos/pexels-joshua-mcknight-1139315.jpg";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteRight,
  FaRandom,
} from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { GoToTop } from "../Components/GoToTop";
import rotary from "../../Photos/ROTARY.png";
import ri from "../../Photos/RI-International.png";

export const Body = () => {
  const [core, setCore] = useState("mission");
  const [index, setIndex] = useState(0);
  const [returnedData, setReturnedData] = useState([]);
  const { image, name, position, text } = reviews[index];
  const [isApply, setIsApply] = useState(false);
  const [message, setMessage] = useState({
    name: "",
    email: "",
    messages: "",
  });

  const newMessage = async () => {
    const newData = await fetch("/create/brand_message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...message,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsApply(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newMessage();
  };

  const checkNumber = (number) => {
    if (number > reviews.length - 1) {
      return 0;
    }
    if (number < 0) {
      return reviews.length - 1;
    }
    return number;
  };
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * reviews.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
  };
  return (
    <section className="body">
      <div className={isApply ? "apply-bg show-apply-bg" : "apply-bg"}>
        <Fade>
          <div className="apply-alert">
            <h1>Your Message Is Sent!</h1>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour.
            </p>
            <button className="button" onClick={() => setIsApply(false)}>
              OK
            </button>
          </div>
        </Fade>
      </div>
      <div className="body-content">
        <Fade triggerOnce duration={2000} direction="left">
          <img src={nurse} alt="nurse" className="nurse" />
        </Fade>
        <div className="body-wrapper">
          <Fade direction="up" duration={2000} triggerOnce>
            <div className="row">
              <div className="chaotic-orbit"></div>
              <p className="body-about">ABOUT LIFESAVERS SQUAD</p>
              <div className="chaotic-orbit"></div>
            </div>
            <h1>WHAT WE CAN ACHIEVE WITH YOUR HELP</h1>
            <p>
              We play a central and critical role in improving access and
              quality health care for the community. We provide essential
              services that promote health, prevent diseases and deliver health
              care services to individuals and families in the community based
              on the primary health care approach.
            </p>
          </Fade>
          <Link to="/volunteer" className="button">
            Lend A Helping Hand
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Link>
        </div>
      </div>
      <div className="core">
        <div className="core-btn-container">
          <Fade triggerOnce duration={2000} direction="left">
            <button
              onClick={() => setCore("mission")}
              className={core === "mission" ? "active-core-btn" : ""}
            >
              OUR PROJECT
            </button>
            <button
              onClick={() => setCore("vision")}
              className={core === "vision" ? "active-core-btn" : ""}
            >
              OUR OBJECTIVES
            </button>
            <button
              onClick={() => setCore("values")}
              className={core === "values" ? "active-core-btn" : ""}
            >
              OUR GOAL
            </button>
          </Fade>
        </div>
        {core === "mission" && (
          <div className="core-container">
            <Fade duration={2000} triggerOnce>
              <h1>ESTABLISH A VOLUNTEERS GROUP</h1>
              <p>
                Volunteering with us allows you to connect to your community and
                make it a better place. Even helping out with the smallest tasks
                can make a real difference to the lives of people in need.
                Joining the LifeSaversSquad is a two-way street: It can benefit
                you and your family as much as the cause you choose to help.
                Dedicating your time as a volunteer helps you make new friends,
                expand your network, and boost your social skills too.
              </p>
              {/* <div className="stats">
                <div>
                  <h2>210+</h2>
                  <p>Volunteers</p>
                </div>
                <div>
                  <h2>600+</h2>
                  <p>People helped</p>
                </div>
                <div>
                  <h2>2000+</h2>
                  <p>Missions</p>
                </div>
              </div> */}
            </Fade>
          </div>
        )}
        {core === "vision" && (
          <div className="core-container">
            <Fade duration={2000} triggerOnce>
              <h1>OBJECTIVES</h1>
            </Fade>
            <ul>
              <li>To enhance the public health and safety in the community.</li>
              <li>To involve our community in health care delivery.</li>
              <li>
                To improve the spirit of volunteering in community activities
                (spirit of citizenship).
              </li>
              <li>
                To create awareness of assisting persons in distress and Not a
                photographs taking party.
              </li>
              <li>Reduce cases of sudden death.</li>
            </ul>
            {/* <div className="stats">
              <div>
                <h2>210+</h2>
                <p>Volunteers</p>
              </div>
              <div>
                <h2>600+</h2>
                <p>People helped</p>
              </div>
              <div>
                <h2>2000+</h2>
                <p>Missions</p>
              </div>
            </div> */}
          </div>
        )}
        {core === "values" && (
          <div className="core-container">
            <Fade duration={2000} triggerOnce>
              <h1>GOAL</h1>
              <p>
                Our goal is the promotion of better health and wellbeing of the
                people in the community. Having access to basic medical care and
                resources, hygiene campaigns and health education enables people
                to live longer, happier and more productive lives. Our
                volunteers would work to promote better health and wellbeing
                outcomes.
              </p>
              {/* <div className="stats">
                <div>
                  <h2>210+</h2>
                  <p>Volunteers</p>
                </div>
                <div>
                  <h2>600+</h2>
                  <p>People helped</p>
                </div>
                <div>
                  <h2>2000+</h2>
                  <p>Missions</p>
                </div>
              </div> */}
            </Fade>
          </div>
        )}
      </div>
      {/* <Fade triggerOnce duration={2000} direction="up"> */}
      <h1 className="rev-header rev-header-1 reason">BENEFITS</h1>
      <div className="images">
        <div className="card">
          <div className="content">
            <h2 className="title">Provides a sense of community</h2>
            <p className="des">
              Joining LifeSaversSquad can help you feel connected to those you
              are helping in the community. This experience may make you want to
              get involved with other aspects of your community, such as
              advocating for programs you believe are important or local
              politics.
            </p>
            <Link to="/volunteer" className="btn">
              Join Us
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h2 className="title">Teach you valuable skills</h2>
            <p className="des">
              The training and hands-on experience you gain while volunteering
              with us can help you learn new skills as well as build upon ones
              you already have. You’ll gain valuable communication, public
              speaking, marketing and other hard and soft skills.
            </p>
            <Link to="/volunteer" className="btn">
              Join Us
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h2 className="title">Meet New Friends</h2>
            <p className="des">
              Volunteering with LifeSaversSquad is a great way to meet new
              friends as well as strengthen existing connections with friends,
              family or coworkers. As a volunteer, you’ll typically interact
              with people from diverse backgrounds, which allows you to learn
              other perspectives.
            </p>
            <Link to="/volunteer" className="btn">
              Join Us
            </Link>
          </div>
        </div>
      </div>
      {/* </Fade> */}

      <section className="reviews" id="reviews">
        <Fade triggerOnce duration={2000} direction="up">
          {/* <p className="body-about rev-header">QUOTES</p> */}
          <h1 className="rev-header rev-header-1">WHAT PEOPLE ARE SAYING</h1>
        </Fade>
        <div className="all-reviews">
          <section className="review-content">
            <div className="reviewer"></div>
            <h3 className="rev-text">{text}</h3>
            <h3 className="quote-name">{name}</h3>
          </section>
          <div className="toggle-btn-container">
            {/* <button className="toggle-btn" onClick={prevPerson}>
              <FaChevronLeft />
            </button> */}
            <button className="toggle-btn" onClick={randomPerson}>
              <FaRandom />
            </button>
          </div>
        </div>
      </section>
      <section className="reviews" id="reviews">
        <h1 className="rev-header rev-header-1 sponsors">OUR SPONSORS</h1>
        <div className="sponsors-container">
          <img src={rotary} alt="rotary logo" />
          <img
            src={ri}
            alt="ri international logo"
            className="ri-international"
          />
        </div>
      </section>
      {/* <div className="contact-us">
        <Fade triggerOnce duration={2000} direction="up">
          <h1>Contact Us</h1>
          <div className="contact-us-inputs">
            <input placeholder="Name" name="name" onChange={handleChange} />
            <input placeholder="E-Mail" name="email" onChange={handleChange} />
          </div>
          <textarea
            name="messages"
            id="tweet"
            cols="35"
            rows="4"
            className="contact-form"
            placeholder="Message"
            onChange={handleChange}
            // value={newTweet.tweet}
            // onChange={handleChange}
          ></textarea>
        </Fade>
        <button className="button contact-btn" onClick={() => handleSubmit()}>
          Submit
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div> */}
      {/* <div className="ready">
        <h1>Are You Ready To Volunteer? </h1>
        <Link to="/volunteer" className="button">
          BECOME A VOLUNTEER
        </Link>
      </div> */}
      <GoToTop />
    </section>
  );
};
