import React, { useState } from "react";
import { reviews } from "../Components/data";
import nurse from "../../Photos/pexels-joshua-mcknight-1139315.jpg";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { GoToTop } from "../Components/GoToTop";

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
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover.
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
              OUR MISSION
            </button>
            <button
              onClick={() => setCore("vision")}
              className={core === "vision" ? "active-core-btn" : ""}
            >
              OUR VISION
            </button>
            <button
              onClick={() => setCore("values")}
              className={core === "values" ? "active-core-btn" : ""}
            >
              OUR VALUES
            </button>
          </Fade>
        </div>
        {core === "mission" && (
          <div className="core-container">
            <Fade direction="up" duration={2000} triggerOnce>
              <h1>TO BUILD AND RESTORE</h1>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
              </p>
              <div className="stats">
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
              </div>
            </Fade>
          </div>
        )}
        {core === "vision" && (
          <div className="core-container">
            <Fade direction="up" duration={2000} triggerOnce>
              <h1>SAVE THE WORLD</h1>
              <p>
                Richard McClintock, a Latin professor at Hampden-Sydney College
                in Virginia, looked up one of the more obscure Latin words,
                consectetur, from a Lorem Ipsum passage, and going through the
                cites of the word in classical literature, discovered the
                undoubtable source.The standard chunk of Lorem Ipsum used since
                the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H.
                Rackham.
              </p>
              <div className="stats">
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
              </div>
            </Fade>
          </div>
        )}
        {core === "values" && (
          <div className="core-container">
            <Fade direction="up" duration={2000} triggerOnce>
              <h1>INTEGRITY AND HONOR</h1>
              <p>
                Sydney College in Virginia, looked up one of the more obscure
                Latin words, consectetur, from a Lorem Ipsum passage, and going
                through the cites of the word in classical literature,
                discovered the undoubtable source.The standard chunk of Lorem
                Ipsum used since the 1500s is reproduced below for those
                interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                Bonorum et Malorum" by Cicero are also reproduced in their exact
                original form, accompanied by English versions from the 1914
                translation by H. Rackham.
              </p>
              <div className="stats">
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
              </div>
            </Fade>
          </div>
        )}
      </div>
      {/* <Fade triggerOnce duration={2000} direction="up"> */}
      <div className="images">
        <div className="card">
          <div className="content">
            <h2 className="title">Make A Change</h2>
            <p className="des">
              Sydney College in Virginia, looked up one of the more obscure
              Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word
            </p>
            <Link to="/volunteer" className="btn">
              Join Us
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h2 className="title">Make A Difference</h2>
            <p className="des">
              Sydney College in Virginia, looked up one of the more obscure
              Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word
            </p>
            <Link to="/volunteer" className="btn">
              Join Us
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <h2 className="title">Come Together</h2>
            <p className="des">
              Sydney College in Virginia, looked up one of the more obscure
              Latin words, consectetur, from a Lorem Ipsum passage, and going
              through the cites of the word
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
          <p className="body-about rev-header">TESTIMONIAL</p>
          <h1 className="rev-header rev-header-1">WHAT PEOPLE ARE SAYING</h1>
        </Fade>
        <div className="all-reviews">
          <section className="review-content">
            <div className="reviewer">
              <img src={image} alt={name} />
              <div>
                <h3>{name}</h3>
                <p className="position">{position}</p>
              </div>
            </div>
            <h3 className="rev-text">{text}</h3>
          </section>
          <div className="toggle-btn-container">
            <button className="toggle-btn" onClick={prevPerson}>
              <FaChevronLeft />
            </button>
            <button className="toggle-btn" onClick={nextPerson}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
      <div className="contact-us">
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
      </div>
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
