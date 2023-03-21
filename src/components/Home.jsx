import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import background from '../assets/background.jpg';
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';

const DIVISION = styled.div`
min-height: 100vh;
width: 100vw;
display: grid;
grid-template-rows: 12% 88%;
font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
/* border: 2px solid blue; */
background: rgba(0,0,0,.7);
/* background-image: linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8)); */
.image__mask {
  background-size: cover;
  overflow: hidden;
  height: 100%;
  width: 100%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
`;

const HEADER = styled.div`
padding-top: 0.75rem;
max-width: 62rem;
padding-inline: 1rem;
margin: 0 auto; 
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
.logo {
  img {
    width: 9.5rem;
    cursor: pointer;
    @media only screen and (max-width: 990px) {
        width: 7.5rem;
      }
  }
}
.btn {
  background: #E50914;
  color: #ffff;
  padding: 0.48rem 1rem;
  font-size: 1rem;
  letter-spacing: 0.25px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}
`;


const SECTION = styled.div`
/* border: 2px solid red; */
width: 100%;
color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
.display__card {
  /* border: 2px solid greenyellow; */
    max-width: 60rem;
    margin-inline: auto;
    h1 {
      /* border: 2px solid green; */
      font-family: 'Noto Sans JP', sans-serif;
      margin: 0 auto;
      text-align: center;
      font-size: 2rem
      font-weight: bolder;
      /* @media only screen and (max-width: 740px) {
        font-size: 1.85rem;
      } */
      @media only screen and  (min-width: 740px) {
        font-size: 2.25rem;
      }
      @media only screen and (min-width: 990px) {
        font-size: 2.85rem;
      }
    }
    h2 {
      /* border: 2px solid fuchsia; */
      margin: 19px auto;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 300;
      letter-spacing: 1px;
      /* @media only screen and (max-width: 740px) {
        font-size: 1.625rem;
      } */
      @media only screen (min-width: 740px) {
        font-size: 1.25rem;
      }
      @media only screen and (min-width: 990px) {
        font-size: 1.625rem;
      }
    }
  }`;


const FORM = styled.form`
/* border: 2px solid khaki; */
max-width: 60rem;
margin-inline: auto;
padding: 10px 20px;
  .form__text {
    h3 {
      font-weight: 100;
      padding-inline: auto;
      padding-bottom: 0.85rem;
      font-size: 1.2rem;
      text-align: center;
    }
  }
  .form__data {
    /* border: 2px solid purple; */
    max-width: 42rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem 0rem; 
    flex-direction: column;
    @media only screen and (min-width: 620px) {
      flex-direction: row;
      gap: 0rem 0.5rem;
    }
    .form__data-email {
      width: 100%;
      /* border: 2px solid yellow; */
      height: 3.5rem;
      @media only screen and (min-width: 620px) {
        width: 66.5%;
      }
      input {
        width: 100%;
        height: 100%;
        padding-inline: 7px;
        outline: none;
        border: 0.5px solid gray;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        color: white; 
        background: rgba(0,0,0,.5);
        ::placeholder {
          font-size: 0.95rem;
          padding-inline: 7px;
          letter-spacing: 1px;
          color: white;
        }
      }
    }
    .form__data-btn { 
      /* border: 2px solid orange; */
      width: inherit;
      height: 3.5rem;
      @media only screen and (min-width: 620px) {
        width: 33.5%;
      }
      button {
        border: none;
        border-radius: 4px;
        width: 100%;
        background: #E50914;
        color: white;
        font-size: 1.22rem;
        font-weight: 700;
        padding: 13px 11px;
        @media only screen and (min-width: 620px) {
          font-size: 1.45rem;
          height: 100%;
        }
      }
    }
  }
`

const Home = () => {
  const navigate = useNavigate();
  const emailValRef = useRef();
  const { userEmail } = useContext(UserContext);
  const handleToggle = (e) => {
    e.preventDefault();
    if (emailValRef.current.value !== "") {
      userEmail(emailValRef.current.value);
      navigate("/signup");
    };
  };
  return (
    <DIVISION>
      <div className="image__mask">
        <img src={background} alt="netflix" />
      </div>
      <HEADER>
        <div className="logo">
          <img onClick={() => {
            navigate("/")
          }} src={logo} alt="Netflix" />
        </div>
        <div onClick={() => {
          navigate("/signin")
        }} className="btn">
          Sign In
        </div>
      </HEADER>
      <SECTION>
        <div className="display__card">
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
        </div>
        <FORM onSubmit={handleToggle}>
          <div className="form__text">
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          </div>
          <div className="form__data">
            <div className="form__data-email">
              <input
                type="email"
                placeholder='Email address'
                name='email'
                className='inputs'
                ref={emailValRef}
                required />
            </div>
            <div className="form__data-btn">
              <button type="submit">Get Started &rarr;</button>
            </div>
          </div>
        </FORM>
      </SECTION>
    </DIVISION>
  )
}

export default Home