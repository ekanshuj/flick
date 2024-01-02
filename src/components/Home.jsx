import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import background from "../assets/background.jpg";
import logo from "../assets/logo.png";
import { requests } from "../config";
import Row from "./Row";

const HOME = styled.div`
  /* border: 2px solid blue; */
  min-height: 100dvh;
  position: relative;
  padding: 1rem 0;
  /* font-family: "Netflix Sans", Helvetica; */

  display: grid;
  grid-template-rows: auto 1fr auto;

  @media only screen and (min-width: 610px) {
    grid-template-rows: auto 73vh auto;
  }

  @media only screen and (min-width: 960px) {
    grid-template-rows: auto 90vh auto;
  }

  &::before {
    content: "";
    background: url(${background}) no-repeat center center / cover;
    position: absolute;
    height: 100dvh;
    inset: 0;
    z-index: -1;
    opacity: 0.2;
  }

  nav {
    /* border: 2px solid green; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .nav_logo {
      /* border: 2px solid yellow; */
      display: flex;
      align-items: center;
      padding-left: 01rem;

      cursor: pointer;

      img {
        width: 4.75rem;
        @media only screen and (min-width: 768px) {
          width: 60%;
        }
      }
    }
    .nav_button {
      /* border: 2px solid greenyellow; */
      padding: 0 0.75rem;
      button {
        color: #fff;
        background: #d90429;

        cursor: pointer;
        font-size: 0.9rem;
        padding: 0.375rem 1rem;

        @media only screen and (min-width: 768px) {
          font-size: 0.98rem;
          padding: 0.4rem 1.12rem;
        }

        font-weight: 700;

        font-family: "Netflix Sans", Helvetica;
        border: none;
        border-radius: 0.25rem;
      }
    }
  }

  .section {
    /* border: 2px solid green; */
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5rem 0 5.25rem;
    @media only screen and (min-width: 610px) {
      padding: 0;
    }

    .home {
      /* border: 2px solid greenyellow; */
      max-width: 65rem;
      margin: 0rem auto;
      .home_text {
        /* border: 2px solid red; */
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        margin: 0 1rem;

        h1 {
          font-size: 2.25rem;
          /* font-family: "Netflix Sans"; */
          font-weight: 700;
          text-align: center;

          @media only screen and (min-width: 610px) {
            font-weight: 800;
          }
          @media only screen and (min-width: 960px) {
            font-size: 3rem;
            font-weight: 900;
          }
        }

        p {
          font-size: 1.125rem;
          text-align: center;

          @media only screen and (min-width: 960px) {
            font-size: 1.5rem;
          }

          margin: 0.95rem 0;
        }

        p:last-child {
          margin: 0.25rem 1rem 1rem;

          @media only screen and (min-width: 640px) {
            margin: 1rem 3rem 1rem;
          }
          @media only screen and (min-width: 960px) {
            margin: 1rem 4.75rem 1rem;
          }
        }
      }

      .home_section {
        /* border: 1px solid fuchsia; */
        display: flex;
        align-items: center;
        justify-content: center;
        row-gap: 0.75rem;

        @media only screen and (min-width: 545px) {
          flex-wrap: wrap;
          align-items: normal;
          row-gap: 0;

          margin: 0 auto;
          max-width: 50rem;
          padding: 0 5rem;
        }

        .home_section-input {
          position: relative;

          &::before {
            content: "";
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
            inset: 0;
            z-index: -1;
            opacity: 0.8;
          }

          display: none;
          width: 100%;
          flex: 1;

          @media only screen and (min-width: 545px) {
            display: block;
          }

          input {
            background: none;
            color: #b8b9ba;

            border: 1px solid #606060;
            border-radius: 0.2rem;

            width: 100%;
            height: 100%;
            /* padding: 0.75rem 0.5rem; */

            font-size: 1rem;
            text-align: center;

            @media only screen and (min-width: 768px) {
              font-size: 1.1rem;
              letter-spacing: 1px;
              padding: 0;
            }
          }
        }

        .home_section-button {
          /* border: 2px solid red; */
          margin: 0 0.65rem;

          button {
            display: flex;
            column-gap: 3px;

            color: #fff;
            background: #d90429;

            cursor: pointer;
            font-size: clamp(1rem, 0.9355rem + 0.4914vw, 1.25rem);
            padding: 0.5rem 0.9rem;
            font-weight: 700;

            font-family: "Netflix Sans", Helvetica;
            border: none;
            border-radius: 0.2rem;

            @media only screen and (min-width: 545px) {
              padding: 0.75rem 1rem;
            }
            @media only screen and (min-width: 768px) {
              padding: 0.85rem 1rem;
            }

            span {
              display: none;
              @media only screen and (min-width: 610px) {
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .mask {
    /* border: 2px solid yellow; */
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0),
      transparent
    );
    height: 20rem;
    position: absolute;
    z-index: -1;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <HOME>
        <nav>
          <div className="nav_logo">
            <img src={logo} alt="Flick" loading="lazy" />
          </div>
          <div className="nav_button">
            <button onClick={() => navigate("/signin")}>Get In</button>
          </div>
        </nav>
        <section className="section">
          <div className="home">
            <div className="home_text">
              <h1>Discover movies, TV shows and many more for free. </h1>
              <p>You'll never go wrong again with your choice!</p>
              <p>
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
            </div>
            <div className="home_section">
              <div className="home_section-input">
                <input
                  type="text"
                  value={"You'll definitely want to see this."}
                  disabled
                />
              </div>
              <div className="home_section-button">
                <button onClick={() => navigate("/signup")}>
                  Get Started <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <Row
          title="Trending"
          fetchUrl={[requests.fetchTrendingByDay, requests.fetchTrendingByWeek]}
          Trending
        />
        <div className="mask"></div>
      </HOME>
    </>
  );
};

export default Home;
