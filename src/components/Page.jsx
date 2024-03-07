import React, { useEffect } from "react";
import { requests } from "../config";
import { Row } from ".";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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
      <MOVIESANDTV />
    </>
  );
};

// SCREEN <STARTS> HERE
const SCREEN = styled.section`
  min-height: 100vh;
  color: ghostwhite;
  position: relative;

  .wrapper {
    /* border: 2px solid greenyellow; */
    border-bottom: 0.45rem solid #232323;
    position: relative;

    &:before {
      content: "";
      background: ${(props) => props.background} no-repeat center center / cover;
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: 0.5;
    }

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
            width: 55%;
          }
        }
      }

      .nav_right {
        /* border: 2px solid greenyellow; */
        padding: 0 1rem;

        img:first-child {
          cursor: pointer;

          @media only screen and (min-width: 640px) {
            margin: 0 3rem;
          }
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
      margin: 3.5rem auto 5rem;

      display: flex;
      align-items: flex-start;
      flex-direction: column;

      @media only screen and (min-width: 640px) {
        margin: 3.5rem auto 7rem;
      }
      @media only screen and (min-width: 960px) {
        margin: 4.5rem auto 8rem;
      }

      .screen_details {
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
          flex-wrap: wrap;
          column-gap: 1rem;

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
      .screen_button {
        /* border: 2px solid green; */
        padding: 0.75rem 0.3rem;

        button {
          color: #fff;
          background: #d90429;

          cursor: pointer;
          font-size: 1rem;
          padding: 0.375rem 1rem;

          @media only screen and (min-width: 768px) {
            font-size: 01.1rem;
            padding: 0.4rem 1.12rem;
          }

          font-weight: 700;

          font-family: "Netflix Sans", Helvetica;
          border: none;
          border-radius: 0.25rem;
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
      height: 10rem;
      position: absolute;
      z-index: -1;
    }
  }

  .video {
    padding: 2rem;
    border-radius: 0.2rem;
    left: 0;
    right: 0;
    top: 0;
    height: 100dvh;
    position: absolute;
    z-index: 99;
    background: fuchsia;
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

  const {
    data: page,
    isError: isErrorPage,
    error: errorPage,
  } = useQuery(["Flick"], async () => {
    const { data } = await Axios.request(pageOptions);
    return data.results[Math.floor(Math.random() * data.results.length - 1)];
  });

  const pageOptions = {
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

  const optionsVideo = {
    method: "GET",
    url: `${baseUrl}/tv/${page?.id}/videos`,
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const {
    data: video,
    isError: isErrorVideo,
    error: errorVideo,
  } = useQuery(["Flick_Videos"], async () => {
    const {
      data: { results },
    } = await Axios.request(optionsVideo);
    return results?.length >= 2
      ? results?.filter(
          (result) => result?.name.includes("Trailer") && result?.name
        )[0]
      : results[0];
  });

  // const isError = isErrorPage || isErrorSearch;
  // const error = errorPage || errorSearch;

  // isError && console.log(error);

  // isErrorSearch && console.log(errorSearch);

  // const fuse = new Fuse(searches);

  return (
    <SCREEN background={`url(${backdrop}${page?.backdrop_path})`}>
      <div className="wrapper">
        <nav>
          <div className="nav_left">
            <img src={logo} alt="Flick" loading="lazy" />
          </div>
          <div className="nav_right">
            <Link to="/search">
              <img src={search} alt="Search" loading="lazy" />
            </Link>
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
          <div className="screen_details">
            <strong className="heading">
              {page?.name || page?.title || page?.original_name}
            </strong>
            <div className="text">
              <strong>{page?.vote_average}</strong>
              <p>{page?.first_air_date}</p>
            </div>
            <div className="overview">
              <hr />
              <p>{page?.overview}</p>
            </div>
          </div>
          <div className="screen_button">
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video?.key}`}
            >
              <img src={play} alt="Play" loading="lazy" />
            </a>
          </div>
        </div>
        <div className="mask"></div>
      </div>
      <Row title="Originals" fetchUrl={requests.fetchOriginals} Originals />
    </SCREEN>
  );
};
// SCREEN <ENDS> HERE

// MOVIESANDTV <STARTS> HERE
const MOVIESANDTV = () => {
  return (
    <section>
      {/* <Row title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} /> */}
    </section>
  );
};
// MOVIESANDTV <ENDS> HERE

export default Page;

// grid column row - repeat section
