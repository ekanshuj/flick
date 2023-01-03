import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import background from '../assets/background.jpg';
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';

const HEADER = styled.div`
position: absolute;
left: 0;
right: 0;
top: 0;
max-width: 95vw;
margin-inline: auto;
display: flex;
align-items: center;
justify-content: space-between;
.logo {
  img {
    width: 11rem;
  }
}`;

const BTN = styled.button`
background: #E50914;
color: #ffff;
padding: 0.5rem 0.9rem;
font-size: 1.135rem;
border: none;
border-radius: 4px;
cursor: pointer;
height: inherit;
`;

const DIVISION = styled.div`
color: #ffffff;
min-height: 100vh;
background: rgba(0,0,0,.4);
background-image: linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8));
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
&:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${background});
  z-index: -1;
}
.heading {
    max-width: 84rem;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      margin: 0px 75px;
      text-align: center;
      font-size: 4rem;
    }
    h2 {
      margin: 16px 75px;
      font-size: 1.75rem;
      font-weight: 300;
    }
    h3 {
      margin: 0px 118px;
      padding: 0px 47.5px 20px;
      font-size: 1.25rem;
      font-weight: 500;
      padding: 0.45rem 0rem;
    }}`;


const FORM = styled.form`
  width: 50rem;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  .email {
  flex: 1;
  height: 65px;
  .inputs {
  width: 100%;
  padding: 16px 15px;
  height: inherit;
  width: 100%;
  font-size: 19px;
  outline-color: gray;
  border: 1px solid rgb(191, 191, 191);
  border: none;
  outline: none;
  ::placeholder {
  color: rgb(191, 191, 191);
  }}}
  .btn {
    height: 65px;
    button {
     height: inherit;
     background: red;
     color: #ffffff;
     font-size: 2rem;
     padding: 0px 17px;
     border: none;
     cursor: pointer;
    }}
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
    <>
      <HEADER>
        <div className="logo">
          <img src={logo} alt="Netflix" />
        </div>
        <div className="btn">
          <BTN onClick={() => {
            navigate("/signin")
          }}>Sign In</BTN>
        </div>
      </HEADER>
      <DIVISION>
        <div className="heading">
          <h1>Unlimited movies, TV <br /> shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
        </div>
        <FORM onSubmit={handleToggle}>
          <div className="email">
            <input
              type="email"
              placeholder='Email address'
              name='email'
              className='inputs'
              ref={emailValRef}
              required />
          </div>
          <div className="btn">
            <button type="submit">Get Started &rarr;</button>
          </div>
        </FORM>
      </DIVISION>
    </>
  )
}

export default Home