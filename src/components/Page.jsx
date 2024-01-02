import React, { useEffect } from "react";
import { requests } from "../config";
import { Row } from ".";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { baseUrl, backdrop } from "../config/config";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";

import logo from "../assets/logo.png";

const Page = () => {
  const navigate = useNavigate();
  useEffect(() => {
    !cookies.get("user") && navigate("/");
  }, []);

  return (
    <>
      <Screen />
      {/* <Row title="In Cinemas" fetchUrl={requests.fetchNowPlaying} InCinemas /> */}
      {/* <MOVIESANDTV /> */}
    </>
  );
};

// SCREEN <STARTS> HERE
const SCREEN = styled.section`
  &:before {
    content: "";
    background: ${(props) => props.background} no-repeat center center / cover;
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.45;
  }
  min-height: 100vh;
  color: ghostwhite;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin-bottom: 25px;
  position: relative;
  /* border: 1px solid red; */

  nav {
    /* border: 2px solid green; */
    padding: 0.5rem 0;
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .nav_logo {
      border: 2px solid yellow;
      display: flex;
      align-items: center;
      padding-left: 0.5rem;

      cursor: pointer;

      @media only screen and (min-width: 1024px) {
        justify-content: center;
      }

      img {
        width: 50%;
        @media only screen and (min-width: 768px) {
          width: 60%;
        }
      }
    }

    .nav_toggles {
      flex: 1;
      height: 100%;
      border: 2px solid fuchsia;
    }

    .nav_button {
      border: 2px solid greenyellow;
      padding: 0 0.75rem;

      button {
        color: #fff;
        background: #d90429;

        cursor: pointer;
        font-size: 0.9rem;
        padding: 0.4rem 1.05rem;

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

  .screen_wrapper {
    .screen {
      border: 2px solid white;
      width: 100%;
      max-width: 90%;
      margin: 2rem auto;

      display: flex;
      align-items: flex-start;
      flex-direction: column;

      @media only screen and (min-width: 640px) {
        margin: 5.5rem auto;
      }
      @media only screen and (min-width: 768px) {
        margin: 5rem auto;
      }

      .screen_heading {
        /* border: 2px solid red; */
        /* width: 70%; */
        strong {
          font-family: "Netflix Sans";
          font-size: clamp(1.75rem, 1.4275rem + 2.457vw, 3rem);
          text-transform: uppercase;
          font-weight: 800;
        }
      }
      .screen_buttons {
        /* border: 2px solid green; */
        padding: 0.75rem 0.3rem;

        button {
          font-weight: 700;
          font-size: 1.1em;
          padding: 0.35em 1.5em;

          background: rgba(51, 51, 51, 0.5);
          color: ghostwhite;
          cursor: pointer;

          border: none;
          outline: none;
          border-radius: 4px;

          @media only screen and (min-width: 640px) {
            font-size: 1.25em;
            padding: 0.34em 1.7em;
          }

          :hover {
            color: #000;
            background-color: #e6e6e6;
            transition: all 1.35s;
          }
        }
      }
    }
  }

  .mask {
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0),
      transparent
    );
    height: 100px;
    position: absolute;
  }
`;

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const Screen = () => {
  const navigate = useNavigate();
  const toggleLogout = async () => {
    await signOut(auth);
    cookies.remove("user");
    navigate("/signin");
  };

  const options = {
    method: "GET",
    url: `${baseUrl}/${requests.fetchOriginals}`,
    params: {
      language: "en-US",
      sort_by: "popularity.desc",
      with_networks: "213",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const { data: screens, isLoading } = useQuery(
    ["Netflix Screen"],
    async () => {
      const { data } = await Axios.request(options);
      return data.results[0];
      // return data.results[Math.floor(Math.random() * data.results.length - 1)];
    }
  );

  isLoading && <div>Loading...</div>;

  return (
    <SCREEN background={`url(${backdrop}${screens?.backdrop_path})`}>
      <nav>
        <div className="nav_logo">
          <img src={logo} alt="Flick" loading="lazy" />
        </div>
        <div className="nav_toggles"></div>
        <div className="nav_button">
          <button onClick={toggleLogout}>Logout</button>
        </div>
      </nav>
      <div className="screen_wrapper">
        <div className="screen">
          <div className="screen_heading">
            <strong>
              {screens?.name || screens?.title || screens?.original_name}
            </strong>
          </div>
          <div className="screen_buttons">
            <button>Play</button>
            {/* <button>My List</button> */}
          </div>
        </div>
      </div>
      <Row title="Originals" fetchUrl={requests.fetchOriginals} Originals />
      {/* <div className="mask"></div> */}
    </SCREEN>
  );
};
// SCREEN <ENDS> HERE

// MOVIESANDTV <STARTS> HERE
const MOVIESANDTV = () => {
  return (
    <section>
      <Row title="Movies" fetchUrl={requests.fetchNowPlaying} Movies />
      <Row title="TV" fetchUrl={requests.fetchNowPlaying} TV />
    </section>
  );
};
// MOVIESANDTV <ENDS> HERE

export default Page;

// grid column row - repeat section
