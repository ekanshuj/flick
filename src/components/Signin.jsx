import React, { useEffect } from 'react';
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import background from '../assets/background.jpg';
import logo from '../assets/logo.png';

const DIVISION = styled.main`
color: #ffffff;
min-height: 100vh;
width: 100vw;
/* background: linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8));
background: rgba(0,0,0,.4); */
background: url(${background});
display: grid;
grid-template-rows: 12% 88%;
@media(max-width: 640px) {
  :before {
    background: none;
  }
}
@media(max-width: 640px) {
  grid-template-rows: 12% 88%;
}
@media(max-width: 400px) {
  grid-template-rows: 6% 94%;
}
`;

const HEADER = styled.div`
/* border: 2px solid fuchsia; */
width: inherit;
padding: 0 2.5rem;
display: flex;
align-items: center;
/* justify-content: center; */
@media(max-width: 640px) {
  padding: 0rem 1rem;
}
.logo {
  img {
    width: 11rem;
    cursor: pointer;
    @media(max-width: 400px) {
      width: 5.5rem;
    }
  }
}`;

const CONTAINER = styled.div`
opacity: 1;
width: inherit;
/* border: 2px solid greenyellow; */
.form__container {
  background: rgba(0,0,0,0.7);
  max-width: 28rem;
  min-height: 30rem;
  margin: 0 auto;
  padding: 3.75rem;
  @media(max-width: 640px) {
    /* border: 1px solid fuchsia; */
    max-width: inherit;
    padding: 0rem 1.5rem;
    margin: 0; 
  }
  
  .form__container-controls {
  margin: 5rem 0rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media(max-width: 400px) {
    margin: 2rem 0rem;
  }
  p:first-child {
    font-size: 1.15rem;
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
}
`;

const FORM = styled.form`
p {
  font-size: 2rem;
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
  background: #333333;
  color: #ffffff;
  ::placeholder {
  color: rgb(191, 191, 191);
  font-size: 15.35px;
  letter-spacing: 0.75px;
  }
}
span {
  color: orange;
  font-size: 0.85rem;
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (er) {
      if (er.code === 'auth/wrong-password' || 'auth/user-not-found') {
        toast.error('Incorrect Credentials', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
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
      </HEADER>
      <CONTAINER>
        <div className='form__container'>
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
          <div className="form__container-controls">
            <p>New to Netflix? <button onClick={() => {
              navigate("/")
            }}>Sign up now.</button></p>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <button>Learn more.</button></p>
          </div>
        </div>
      </CONTAINER>
      <ToastContainer />
    </DIVISION>
  )
}

export default Signin