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
import logout from "../assets/logout.svg";
import list from "../assets/list.svg";
import search from "../assets/search.svg";
import play from "../assets/play.svg";

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
    justify-content: space-between;
    flex-wrap: wrap;

    .nav_left {
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

    .nav_right {
      /* border: 2px solid greenyellow; */
      padding: 0 1rem;

      img:first-child {
        cursor: pointer;
        margin: 0 3rem;
      }
      img {
        cursor: pointer;
        margin: 0 0.125rem;
      }
    }
  }

  .screen {
    border: 2px solid white;
    width: 100%;
    max-width: 90%;
    margin: 3rem auto;

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    @media only screen and (min-width: 768px) {
      margin: 4rem auto;
    }

    @media only screen and (min-width: 1024px) {
      margin: 4.5 auto;
    }

    .screen_heading {
      /* border: 2px solid red; */
      /* width: 70%; */
      strong {
        font-family: "Netflix Sans";
        font-size: clamp(1.75rem, 1.2985rem + 3.4398vw, 3.5rem);
        /* text-transform: uppercase; */
        font-weight: 800;
      }
      hr {
        width: 15%;
        height: 3px;
        background: #efe4e2;
        margin: 0.2rem 0.25rem;
      }
    }
    .screen_buttons {
      /* border: 2px solid green; */
      padding: 0.75rem 0.3rem;

      img {
        cursor: pointer;
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

  const { data: page, isLoading } = useQuery(["Netflix Screen"], async () => {
    const { data } = await Axios.request(options);
    return data.results[Math.floor(Math.random() * data.results.length - 1)];
  });

  console.log(page);
  isLoading && <div>Loading...</div>;

  return (
    <SCREEN background={`url(${backdrop}${page?.backdrop_path})`}>
      <nav>
        <div className="nav_left">
          <img src={logo} alt="Flick" loading="lazy" />
        </div>
        <div className="nav_right">
          <img src={search} alt="Search" loading="lazy" />
          {/* MY LIST  */}
          <img src={list} alt="List" loading="lazy" />
          <img
            onClick={toggleLogout}
            src={logout}
            alt="Logout"
            loading="lazy"
          />
          {/* ADD LOGGED_IN USER NAME CREDENTIALS */}
        </div>
      </nav>
      <div className="screen">
        <div className="screen_one">
          <div className="screen_heading">
            <strong>{page?.name || page?.title || page?.original_name}</strong>
            <hr />
          </div>
        </div>
        <div className="screen_two">
          <p>{page?.vote_average} / 10</p>
          <p>{page?.first_air_date}</p>
          <p>{page?.popularity} P</p>
        </div>
        <div className="screen_buttons">
          <img src={play} alt="Play" loading="lazy" />
          {/* <button>My List</button> */}
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
