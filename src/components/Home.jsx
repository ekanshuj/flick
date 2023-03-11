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
background: rgba(0,0,0,.5);
background-image: linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8));
:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${background});
  z-index: -1;
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
.card {
  /* border: 2px solid greenyellow; */
    max-width: 60rem;
    margin-inline: auto;
    h1 {
      /* border: 2px solid green; */
      font-family: 'Noto Sans JP', sans-serif;
      margin: 0 auto;
      text-align: center;
      font-size: 2.85rem;
      font-weight: bolder;
    }
    h2 {
      /* border: 2px solid fuchsia; */
      margin: 19px auto;
      text-align: center;
      font-size: 1.625rem;
      font-weight: 300;
      letter-spacing: 1px;
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
    display: grid;
    grid-template-columns: 65.3% 33.3%;
    justify-content: space-between;
    .form__data-email {
      width: inherit;
      /* border: 2px solid yellow; */
      height: 3.75rem;
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
      height: 3.75rem;
      button {
        border: none;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        background: #E50914;
        color: white;
        font-size: 1.45rem;
        font-weight: 700;
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
        <div className="card">
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