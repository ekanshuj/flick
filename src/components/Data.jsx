import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { backdrop, baseUrl, poster } from "../config/config";

import logo from "../assets/logo.png";

const DATA = styled.div`
  min-height: 100vh;
  margin: 0 01rem;
  position: relative;
  /* background: rgba(0, 0, 0, 0.6); */
  color: white;

  nav {
    /* border: 2px solid green; */
    background: #000;

    padding: 0.5rem 0 0;

    @media only screen and (min-width: 640px) {
      padding: 0.5rem 0;
    }

    z-index: 99;

    display: flex;
    align-items: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;

    .nav_left {
      /* border: 2px solid yellow; */
      display: flex;
      align-items: center;

      cursor: pointer;

      img {
        width: 4.25rem;
        @media only screen and (min-width: 410px) {
          width: 4.75rem;
        }
        @media only screen and (min-width: 768px) {
          width: 55%;
        }
      }
    }
  }

  section {
    padding: 4rem 0 0;

    @media only screen and (min-width: 410px) {
      padding: 4.5rem 0 0;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media only screen and (min-width: 640px) {
      flex-direction: row;
    }

    .image_container {
      /* max-width: 100%; */

      @media only screen and (min-width: 410px) {
        margin-inline: 1rem;
      }

      img {
        max-width: 100%;
        border-radius: 0.75rem;
      }
    }

    .container {
      /* border: 2px solid white; */
      width: 100%;
      padding-inline: 0.5rem;

      @media only screen and (min-width: 640px) {
        margin-inline: 1.5rem;
        padding-inline: 0;
      }

      .container_title {
        strong {
          font-size: clamp(1.75rem, 1.2985rem + 3.4398vw, 3.5rem);
        }

        p {
          padding-inline: 0.125rem;
          letter-spacing: 3px;
        }
      }

      .container_metadata {
        font-size: 1rem;

        @media only screen and (min-width: 640px) {
          font-size: 1.1rem;
        }

        color: #b8b9ba;
        display: flex;
        flex-wrap: wrap;
        column-gap: 1rem;

        margin: 0.75rem 0.25rem 1.05rem;
        padding: 0.25rem 0;

        .genre {
          display: flex;
          column-gap: 0.35rem;
        }
      }

      .container_details {
        .info {
          p {
            font-size: 1.1rem;

            @media only screen and (min-width: 1024px) {
              font-size: 1.25rem;
            }
          }
        }

        .creators {
          margin-block: 1rem;

          strong {
            font-size: 1.1rem;
            text-decoration: underline;
          }

          div {
            margin-block: 0.25rem;
            p {
              font-size: 1rem;

              @media only screen and (min-width: 1024px) {
                font-size: 1.15rem;
              }
            }
          }
        }

        .null_data {
          display: none;
        }
      }
    }
  }
`;

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const Data = () => {
  const navigate = useNavigate();

  const { id, media_type: type } = useParams();
  const options = {
    method: "GET",
    url: `${baseUrl}/${type}/${id}`,
    params: {
      language: "en-US",
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
  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <DATA>
      <nav>
        <div className="nav_left">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Flick"
            loading="lazy"
          />
        </div>
      </nav>
      <section>
        <div className="image_container">
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet={`${poster}${data?.poster_path}`}
            />
            <img
              src={`${backdrop}${data?.backdrop_path}`}
              alt={`${data?.original_name}`}
            />
          </picture>
        </div>
        <div className="container">
          <div className="container_title">
            <strong>{data?.original_name || data?.original_title}</strong>
            <p>{data?.tagline}</p>
          </div>
          <div className="container_metadata">
            <p>{data?.first_air_date || data?.release_date}</p>
            <p>{data?.vote_average}</p>
            <p>
              {type === "tv" ? data?.number_of_seasons : data?.popularity}{" "}
              {type === "tv" ? "Season" : "P"}
            </p>
            <div className="genre">
              {data?.genres.map((genre, i) => {
                return <p key={i}>{genre?.name}</p>;
              })}
            </div>
          </div>
          <div className="container_details">
            <div className="info">
              <p>{data?.overview}</p>
            </div>
            <div
              className={`creators ${
                (data?.created_by.length === 0 ||
                  data?.production_companies.length === 0) &&
                "null_data"
              }`}
            >
              <strong>Created by</strong> :
              <div>
                {data?.created_by
                  ? data?.created_by.map((elem, i) => {
                      return <p key={i}>{elem?.name}</p>;
                    })
                  : data?.production_companies.map((elem, i) => {
                      return <p key={i}>{elem?.name}</p>;
                    })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DATA>
  );
};

export default Data;
