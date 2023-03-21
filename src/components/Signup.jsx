import React, { useContext, useEffect, useRef } from 'react';
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
height: 100vh;
width: 100vw;
background: #ffffff;
display: grid;
grid-template-rows: 14% 86%;
`;

const HEADER = styled.div`
border: 1px solid greenyellow;
width: inherit;
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 0.5px solid gray;
padding: 0px 3px;
@media only screen and (min-width: 440px) {
  padding: 0rem 2.5rem;
    } 
.logo {
  img {
    width: 6rem;
    cursor: pointer; 
    @media only screen and (min-width: 440px) {
      width: 11rem;
    } 
  }
}`;

const BTN = styled.button`
color: #000000;
border: none;
background: none;
font-size: 1.1rem;
cursor: pointer;
height: inherit;
letter-spacing: 0.35px;
margin: 0px 15px;
@media only screen and (min-width: 440px) {
  font-size: 1.255rem;
  } 
`;

const CONTAINER = styled.div`
/* border: 2px solid fuchsia; */
opacity: 1;
z-index: 999;
max-width: 30rem;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0px 11px;
@media only screen and (min-width: 440px) {
  margin: 0 auto;
  }
`;

const FORM = styled.form`
/* border: 1px solid green; */
p:nth-child(1),
p:nth-child(2) {
  font-size: 2rem;
  letter-spacing: 1px;
  font-weight: 600;
  color: #333333;
  line-height: 39px;
}
.form__text {
  font-size: 1.11rem;
  color: #000000;
  margin: 1.15rem 0;
  font-weight: 300;
}
.form__email {
  width: 100%;
  /* border: 2px solid khaki; */
  p {
    font-size: 1.05rem;
    font-weight: 300;
  }
  span {
    font-size: 1.05rem;
    font-weight: 600;
    color: black; 
  }
}
input {
  padding: 19px 15px;
  margin: 9px 0px;
  width: 100%;
  font-size: 15px;
  border-radius: 2.5px;
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
  padding: 17px 0px;
  font-size: 1.35rem;
  letter-spacing: 1px;
  border-radius: 3px;
  cursor: pointer;
  background: #E50914;
  color: #ffff;
  border: none;
}`

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const { email } = useContext(UserContext);

  useEffect(() => {
    (cookies.get('user')) && navigate('/screen');
  }, []);

  const schema = Yup.object().shape({
    // email: Yup.string().email().required("Please enter a valid email address or phone number."),
    password: Yup.string().min(4, "Your password must contain between 4 and 60 characters.").max(60).required()
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const { password } = data;
    try {
      await createUserWithEmailAndPassword(auth, emailRef.current.innerText, password);
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

  return (
    <DIVISION>
      <HEADER>
        <div className="logo">
          <img onClick={() => {
            navigate("/")
          }} src={logo} alt="Netflix" />
        </div>
        <div className="btn">
          <BTN onClick={() => {
            navigate("/signin")
          }}>Sign In</BTN>
        </div>
      </HEADER>
      <CONTAINER>
        <FORM onSubmit={handleSubmit(onSubmit)}>
          <p>Welcome back!</p>
          <p>Joining Netflix is easy.</p>
          <p className='form__text'>Enter your password and you'll be watching in no time.</p>
          <div className='form__email'>
            <p>Email</p>
            <span ref={emailRef}>{email}</span>
          </div>
          <input
            type="password"
            placeholder='Enter your Password'
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