import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { backdrop, baseUrl } from "../config/config";

import logo from "../assets/logo.png";

const DIVISION = styled.div`
  height: 100vh;
  width: 100vw;
`;

const DATA = styled.div`
  &:before {
    content: "";
    background: ${(props) => props.background} no-repeat center center/cover;
    height: inherit;
    width: inherit;
    position: absolute;
    top: 0;
    left: 0;
    background-position: 50% 50%;
    z-index: -1;
  }
  height: inherit;
  width: inherit;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: grid;
  grid-template-rows: 12% 88%;
  .data__info {
    /* border: 2px solid white; */
    margin: 0px 3rem;
    padding-top: 3rem;
    .data__info-heading {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      h1 {
        font-size: 4rem;
        font-family: "Josefin Sans", sans-serif;
        @media (max-width: 940px) {
          font-size: 3rem;
        }
        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
        @media (max-width: 420px) {
          font-size: 1.75rem;
        }
      }
      p:first-child {
        letter-spacing: 5px;
        font-weight: 500;
        padding: 3px 5px;
      }
      p:last-child {
        letter-spacing: 3px;
        font-weight: 500;
        padding: 3px 5px;
      }
    }
    .data__info-options {
      padding: 25px 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      button {
        padding: 10px 39px;
        font-size: 1rem;
        font-weight: 700;
        background: rgba(51, 51, 51, 0.5);
        color: ghostwhite;
        border: none;
        outline: none;
        border-radius: 4px;
        margin-inline-end: 15px;
        cursor: pointer;
        :hover {
          color: #000;
          background-color: #e6e6e6;
          transition: all 0.2s;
        }
      }
    }
    .data__info-overview {
      /* border: 2px solid blue; */
      max-width: 45rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      @media (max-width: 768px) {
        max-width: 30rem;
      }
      /* margin: 7px 0px; */
      h4 {
        margin: 15px 0px;
        font-size: 1.29rem;
        font-weight: 500;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        letter-spacing: 3px;
      }
    }
    .data__info-others {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0px 5px;
      margin: 9px 0px;
      p:first-child {
        letter-spacing: 3px;
        font-weight: 500;
        padding: 3px 0px;
        font-size: 1.1rem;
      }
      p:last-child {
        letter-spacing: 3px;
        font-weight: 500;
        padding: 3px 0px;
      }
    }
  }
`;

const HEADER = styled.div`
  /* border: 1px solid greenyellow; */
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0rem 2.5rem;
  .logo {
    width: inherit;
    img {
      width: 9rem;
      cursor: pointer;
    }
  }
`;

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const Data = () => {
  const { id, media_type: type } = useParams();
  const options = {
    method: "GET",
    url: `${baseUrl}/${type}/${id}`,
    params: {
      language: "en-US",
      // page: '1',
      // sort_by: 'popularity.desc'
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const { data, isLoading, isError, error } = useQuery(
    ["Netflix data"],
    async () => {
      const { data } = await Axios.request(options);
      return data;
    }
  );
  // console.log(data);
  if (isLoading) return <div>Loading...</div>;

  return (
    <DIVISION>
      <DATA
        className="data"
        background={`url(${backdrop}${data?.backdrop_path})`}
      >
        <HEADER>
          <div className="logo">
            <img
              onClick={() => {
                navigate("/");
              }}
              src={logo}
              alt="Netflix"
            />
          </div>
        </HEADER>
        <div className="data__info">
          <div className="data__info-heading">
            <p>{data?.tagline}</p>
            <h1>{data?.name || data?.title || data?.original_name}</h1>
            {type === "movie" ? (
              <p>
                {data?.runtime}min | {data?.vote_average}
              </p>
            ) : (
              <p>{data?.vote_average}</p>
            )}
          </div>
          <div className="data__info-options">
            <button>Play</button>
            <button>My List</button>
          </div>
          <div className="data__info-overview">
            <h4>{data?.overview}</h4>
          </div>
          <div className="data__info-others">
            <p>{type === "movie" ? "Released" : "First Air"}</p>:
            <p>
              {type === "movie" ? data?.release_date : data?.first_air_date}
            </p>
          </div>
        </div>
      </DATA>
    </DIVISION>
  );
};

export default Data;
