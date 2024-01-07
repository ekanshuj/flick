import React, { useEffect } from "react";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

import background from "../assets/background.jpg";
import logo from "../assets/logo.png";

const SIGNUP = styled.main`
  height: 100dvh;
  position: relative;

  display: grid;
  grid-template-rows: auto 1fr;

  @media only screen and (min-width: 768px) {
    &::before {
      content: "";
      background: url(${background});
      background-size: contain;
      width: 100vw;
      height: 100dvh;
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: 0.2;
    }
  }

  nav {
    /* border: 2px solid green; */
    padding: 1rem 0;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    .nav_logo {
      /* border: 2px solid yellow; */
      display: flex;
      align-items: center;
      padding-left: 01rem;

      cursor: pointer;

      img {
        width: 50%;
        @media only screen and (min-width: 768px) {
          width: 60%;
        }
      }
    }
  }

  section {
    padding: 0.5rem 0;
    .form_division {
      border-radius: 0.7rem;
      max-width: inherit;
      padding: 0rem 1.5rem;
      margin: 0;
      background: #000000;
      @media only screen and (min-width: 768px) {
        background: rgba(0, 0, 0, 0.5);
        max-width: 23rem;
        margin: 0 auto;
        padding: 1rem 2.75rem;
      }

      .form_division-head {
        p {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.1rem 0;
          color: #ffffff;
          @media only screen and (min-width: 640px) {
            font-size: 1.75rem;
          }
          @media only screen and (min-width: 1024px) {
            font-size: 2rem;
          }
        }
      }

      form {
        input {
          padding: 0.9rem 1rem;
          margin: 9px 0px;
          width: 100%;
          font-size: 15px;
          border-radius: 5px;
          outline-color: gray;
          /* border: none; */
          outline: none;
          background: #333333;
          color: #ffffff;
          ::placeholder {
            color: rgb(191, 191, 191);
            font-size: 15.35px;
            letter-spacing: 0.75px;
          }
          @media only screen and (min-width: 640px) {
            padding: 1rem;
          }
        }
        span {
          color: orange;
          font-size: 0.85rem;
        }
        .form_controls {
          width: 100%;
          margin: 2rem 0rem;
          button {
            width: inherit;
            padding: 0.7em 0;
            font-size: 1.1em;
            letter-spacing: 1px;
            border-radius: 7px;
            cursor: pointer;
            background: #d90429;
            color: #ffff;
            border: none;
            @media only screen and (min-width: 640px) {
              font-size: 1.17em;
            }
          }
        }
      }

      .form_division-tail {
        /* border: 2px solid green; */
        margin: 2.5rem 0rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        @media only screen and (min-width: 640px) {
          margin: 3.5rem 0rem;
        }
        p:first-child {
          font-size: 1rem;
          margin: 11px 0px;
          color: gray;
          @media only screen and (min-width: 640px) {
            font-size: 1.15rem;
          }
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
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    cookies.get("user") && navigate("/");
  }, []);

  const schema = Yup.object().shape({
    // email: Yup.string().email().required("Please enter a valid email address or phone number."),
    password: Yup.string()
      .min(4, "Your password must contain between 4 and 60 characters.")
      .max(60)
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (er) {
      er.code === "auth/email-already-in-use" &&
        toast.error("User Already Exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        cookies.set("user", currentUser.uid);
        navigate("/");
      }
    });
  };

  return (
    <SIGNUP>
      <nav>
        <div onClick={() => navigate("/")} className="nav_logo">
          <img src={logo} alt="Flick" loading="lazy" />
        </div>
      </nav>
      <section>
        <div className="form_division">
          <div className="form_division-head">
            <p>Sign Up</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email or phone number"
              name="email"
              {...register("email")}
              required
            />
            <span>{errors.email?.message}</span>
            <input
              type="password"
              placeholder="Password"
              name="password"
              {...register("password")}
              required
            />
            <span>{errors.password?.message}</span>
            <div className="form_controls">
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <div className="form_division-tail">
            <p>
              OG?{" "}
              <button
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In.
              </button>
            </p>
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <button>Learn more.</button>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </SIGNUP>
  );
};

export default Signup;
