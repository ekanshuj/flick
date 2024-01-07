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
import ReactPlayer from "react-player/lazy";

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
    height: 100dvh;
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
        width: 4.75rem;
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
    /* border: 2px solid white; */
    width: 100%;
    max-width: 90%;
    margin: 3rem auto 0.5rem;

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    @media only screen and (min-width: 768px) {
      margin: 4rem auto 2rem;
    }

    @media only screen and (min-width: 1024px) {
      margin: 4.5 auto 2rem;
    }

    .screen_texts {
      /* border: 2px solid red; */
      /* width: 70%; */
      .heading {
        font-family: "Netflix Sans";
        font-size: clamp(1.75rem, 1.2985rem + 3.4398vw, 3.5rem);
        /* text-transform: uppercase; */
        font-weight: 800;
      }

      .text {
        font-size: 1rem;

        @media only screen and (min-width: 640px) {
          font-size: 1.1rem;
        }

        display: flex;
        /* row-gap: 1rem; */
        flex-direction: column;

        @media only screen and (min-width: 410px) {
          flex-direction: row;
          column-gap: 1rem;
        }

        margin: 0.2rem 0.25rem 1rem;
        padding: 0.25rem 0;
      }

      .overview {
        /* border: 2px solid fuchsia; */
        /* width: 95%; */

        @media only screen and (min-width: 640px) {
          width: 80%;
        }

        @media only screen and (min-width: 1024px) {
          width: 70%;
        }
        hr {
          width: 75%;
          height: 2.5px;
          margin: 0 0 0.5rem;
        }

        p {
          font-size: clamp(1.25rem, 1.2113rem + 0.2948vw, 1.4rem);

          overflow: hidden;
          display: -webkit-box;

          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
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

  .video {
    margin: 2rem;
    border-radius: 0.2rem;
    left: 0;
    right: 0;
    top: 0;
    height: 100dvh;
    position: absolute;
    z-index: 99;
    background: black;
  }
`;

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const Screen = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = React.useState(false);

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
        <div className="screen_texts">
          <strong className="heading">
            {page?.name || page?.title || page?.original_name}
          </strong>
          <div className="text">
            <strong>{page?.vote_average} R</strong>
            <p>{page?.first_air_date}</p>
            <strong>{page?.popularity} P</strong>
          </div>
          <div className="overview">
            <hr />
            <p>{page?.overview}</p>
          </div>
        </div>
        <div className="screen_buttons">
          <img src={play} alt="Play" loading="lazy" />
          {/* <button>My List</button> */}
        </div>
      </div>
      {/* <div className="video"></div> */}
      <Row title="Originals" fetchUrl={requests.fetchOriginals} Originals />
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
