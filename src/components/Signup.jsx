import React, { useContext, useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/logo.png';

const DIVISION = styled.main`
color: #ffffff;
min-height: 100vh;
background: #ffffff;
display: flex;
align-items: center;
justify-content: center;
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
justify-content: space-between;
border-bottom: 2px solid gray;
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

const CONTAINER = styled.div`
opacity: 1;
z-index: 999;
max-width: 28rem;
margin: 4rem;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
`;

const FORM = styled.form`
p:first-child {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 17px;
  color: #000000;
  line-height: 43px;
}
.text {
  font-size: 1.155rem;
  color: #000000;
  margin-bottom: 11px;
}
input {
  padding: 19px 15px;
  margin: 9px 0px;
  width: 100%;
  font-size: 15px;
  border-radius: 3px;
  outline-color: gray;
  border: none;
  outline: none;
  border: 1px solid #000000;

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
  padding: 19px 0px;
  font-size: 1.15rem;
  letter-spacing: 1px;
  border-radius: 7px;
  cursor: pointer;
  background: #E50914;
  color: #ffff;
  border: none;
}`

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.get('user')) {
      navigate('/screen');
    };
  }, []);
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
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (er) {
      er.code === 'auth/email-already-in-use' && toast.error('User Already Exists', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        cookies.set('user', currentUser.uid);
        navigate("/screen");
      };
    })
  };

  const { email } = useContext(UserContext);

  return (
    <DIVISION>
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
      <CONTAINER>
        <FORM onSubmit={handleSubmit(onSubmit)}>
          <p>Create a password to start your membership</p>
          <p className='text'>Just a few more steps and you're finished!</p>
          <p className='text'> We hate paperwork, too.</p>
          <input
            type="email"
            value={email}
            placeholder='Email'
            name='email'
            {...register("email")} required />
          <span>{errors.email?.message}</span>
          <input
            type="password"
            placeholder='Add a Password'
            name='password'
            {...register("password")} required />
          <span>{errors.password?.message}</span>
          <CONTROL>
            <button type="submit">Next</button>
          </CONTROL>
        </FORM>
      </CONTAINER>
      <ToastContainer />
    </DIVISION>
  )
}

export default Signup