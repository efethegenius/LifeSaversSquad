import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { AiOutlineLeft } from "react-icons/ai";
import { GoToTop } from "../Components/GoToTop";
import logo from "../../Photos/logo.png";

export const Volunteer = () => {
  const [returnedData, setReturnedData] = useState([]);
  const [isApply, setIsApply] = useState(false);
  const [volunteer, setVolunteer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    bestTime: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    questionOne: "",
    questionTwo: "",
    questionThree: "",
    // questionFour: "",
    comments: "",
  });

  const newVolunteer = async () => {
    const newData = await fetch("/create/brand_volunteer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...volunteer,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsApply(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newVolunteer();
  };

  return (
    <div className="volunteer-register">
      <div className={isApply ? "apply-bg show-apply-bg" : "apply-bg"}>
        <Fade>
          <div className="apply-alert">
            <h1>Thank You For Applying</h1>
            <p>
              Your details have been saved and we would contact you for your
              training to become a licensed LifeSaverSquad volunteer!
            </p>
            <Link to="/" className="button">
              OK
            </Link>
          </div>
        </Fade>
      </div>
      <div className="urgent-nav">
        <h3>NEED URGENT HELP ? CALL 08068886692</h3>
      </div>
      <div className="back">
        <Link to="/" className="back-btn">
          <AiOutlineLeft /> GO BACK
        </Link>
      </div>
      <div className="all-form">
        <div className="volunteer-header">
          {/* <img src={logo} alt="logo" className="logo" /> */}
          <h1>Volunteer Form</h1>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour.
          </p>
        </div>
        <section className="form">
          <div className="names">
            <div className="input">
              <label htmlFor="first-name">First Name</label>
              <input id="first-name" name="firstName" onChange={handleChange} />
            </div>
            <div className="input">
              <label htmlFor="last-name">Last Name</label>
              <input id="last-name" name="lastName" onChange={handleChange} />
            </div>
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" onChange={handleChange} />
          </div>
          <div className="names">
            <div className="input">
              <label htmlFor="number">Phone Number</label>
              <input id="number" name="number" onChange={handleChange} />
            </div>
            <div className="input">
              <label htmlFor="best-time">Best Time To Contact</label>
              <select id="best-time" name="bestTime" onChange={handleChange}>
                <option></option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
          <div className="address">
            <div className="input">
              <label htmlFor="street">Street</label>
              <input id="street" name="street" onChange={handleChange} />
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <input id="city" name="city" onChange={handleChange} />
            </div>
            <div className="input">
              <label htmlFor="state">State</label>
              <select id="state" name="state" onChange={handleChange}>
                <option></option>
                <option>Abia State</option>
                <option>Adamawa State</option>
                <option>Akwa Ibom State</option>
                <option>Anambra State</option>
                <option>Bauchi State</option>
                <option>Bayelsa State</option>
                <option>Benue State</option>
                <option>Borno State</option>
                <option>Cross River State</option>
                <option>Delta State</option>
                <option>Ebonyi State</option>
                <option>Edo State</option>
                <option>Ekiti State</option>
                <option>Enugu State</option>
                <option>FCT</option>
                <option>Gombe State</option>
                <option>Imo State</option>
                <option>Jigawa State</option>
                <option>Kaduna State</option>
                <option>Kano State</option>
                <option>Katsina State</option>
                <option>Kebbi State</option>
                <option>Kogi State</option>
                <option>Kwara State</option>
                <option>Lagos State</option>
                <option>Nasarawa State</option>
                <option>Niger State</option>
                <option>Ogun State</option>
                <option>Ondo State</option>
                <option>Osun State</option>
                <option>Oyo State</option>
                <option>Plateau State</option>
                <option>Rivers State</option>
                <option>Sokoto State</option>
                <option>Taraba State</option>
                <option>Yobe State</option>
                <option>Zamfara State</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="zip">Zip</label>
              <input id="zip" name="zip" onChange={handleChange} />
            </div>
          </div>
          <div className="names">
            <div className="input">
              <label htmlFor="question-one">
                Have you previously done volunteer work for this organization?
              </label>
              <select
                id="question-one"
                name="questionOne"
                onChange={handleChange}
              >
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="question-two">Where did you hear about us?</label>
              <select
                id="question-two"
                name="questionTwo"
                onChange={handleChange}
              >
                <option></option>
                <option>Email advertisement</option>
                <option>Flyer or posting</option>
                <option>Friend or family</option>
                <option>Newspaper advertisement</option>
                <option>Personal inquiry</option>
                <option>Website advertisement</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          {/* <div className="names"> */}
          <div className="input">
            <label htmlFor="question-three">
              Available days for you (Monday, Tuesday,...)
            </label>
            <input
              id="question-three"
              name="questionThree"
              onChange={handleChange}
            />
          </div>
          {/* <div className="input">
              <label htmlFor="question-four">
                What areas of work would you be interested in?
              </label>
              <input
                id="question-four"
                name="questionFour"
                onChange={handleChange}
              />
            </div> */}
          {/* </div> */}
          <div className="input">
            <label htmlFor="comments">Comments/Additional Information</label>
            <textarea id="comments" name="comments" onChange={handleChange} />
          </div>
          <button
            className="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </section>
      </div>
      <GoToTop />
    </div>
  );
};
