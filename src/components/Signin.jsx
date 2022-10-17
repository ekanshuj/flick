import React, { useState } from 'react';
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import background from '../assets/background.jpg';
import logo from '../assets/logo.png';

const DIVISION = styled.main`
color: #ffffff;
min-height: 100vh;
background: rgba(0,0,0,.4);
background-image: linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8));
display: flex;
align-items: center;
justify-content: center;
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
.mask {
  background: rgba(0,0,0);
  /* opacity: 0.7; */
}
`;

const HEADER = styled.div`
position: absolute;
left: 0;
right: 0;
top: 0;
max-width: 95vw;
margin-inline: auto;
display: flex;
align-items: center;
justify-content: flex-start;
.logo {
  img {
    width: 11rem;
  }
}`;

const CONTAINER = styled.div`
opacity: 1;
z-index: 999;
max-width: 20rem;
margin: 4rem;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
/* &:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0);
  opacity: 0.6;
} */
.controls {
  margin: 5rem 0rem;
  p:first-child {
    font-size: 1rem;
    margin: 11px 0px;
    color: gray;
    button {
      border: none;
      outline: none;
      background: transparent;
      color: #ffffff;
      font-size: 1rem;
      cursor: pointer;
    }
  }
  p:last-child {
    color: gray;
    font-size: 0.85rem;
    button {
      border: none;
      outline: none;
      background: transparent;
      color: blue;
      cursor: pointer;
    }
  }
}
`;

const FORM = styled.form`
p {
  font-size: 2.235rem;
  font-weight: 600;
  margin: 17px 0px;
}
input {
  padding: 16px 15px;
  margin: 9px 0px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  outline-color: gray;
  border: none;
  outline: none;
  border: 1px solid rgb(191, 191, 191);

  ::placeholder {
  color: rgb(191, 191, 191);
  font-size: 1rem;
  }
}
span {
  color: orange;
  font-size: 0.85rem;
  /* padding: 3px 7px; */
}`;

const CONTROL = styled.div`
width: 100%;
margin: 2rem 0rem;
button {
  width: inherit;
  padding: 13px 0px;
  font-size: 1.15rem;
  letter-spacing: 1px;
  border-radius: 7px;
  cursor: pointer;
  background: #E50914;
  color: #ffff;
  border: none;
}`

const Signin = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().email().required("Please enter a valid email address or phone number."),
    password: Yup.string().min(4, "Your password must contain between 4 and 60 characters.").max(60).required()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (er) {
      console.log(er);
    };
    onAuthStateChanged(auth, (currentUser) => {
      currentUser && navigate("/home");
    })
  };

  return (
    <DIVISION>
      <HEADER>
        <div className="logo">
          <img src={logo} alt="Netflix" />
        </div>
      </HEADER>
      <div className="mask">
        <CONTAINER>
          <FORM onSubmit={handleSubmit(onSubmit)}>
            <p>Sign In</p>
            <input
              type="email"
              placeholder='Email or phone number'
              name='email'
              {...register("email")} required />
            <span>{errors.email?.message}</span>
            <input
              type="password"
              placeholder='Password'
              name='password'
              {...register("password")} required />
            <span>{errors.password?.message}</span>
            <CONTROL>
              <button type="submit">Sign In</button>
            </CONTROL>
          </FORM>
          <div className="controls">
            <p>New to Netflix? <button onClick={() => {
              navigate("/")
            }}>Sign up now.</button></p>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <button>Learn more.</button></p>
          </div>
        </CONTAINER>
      </div>
    </DIVISION>
  )
}

export default Signin