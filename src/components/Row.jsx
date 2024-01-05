import React from "react";
import styled from "styled-components";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, poster, backdrop } from "../config/config";
import { Link } from "react-router-dom";

import trending from "../assets/trending.svg";

const ROW = styled.section`
  font-family: "Netflix Sans", Helvetica;
  /* border: 2px solid fuchsia; */

  &:before {
    content: "";
    background: ${(props) => props.background} no-repeat center center / cover;
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.2;
  }

  /* border: 2px solid green; */
  display: grid;
  grid-template-rows: auto auto;
  position: relative;

  padding: 0 1rem;

  @media only screen and (min-width: 1024px) {
    padding: 0 1rem 0 2.75rem;
  }
  /* border-top: 5px solid #2f4f4f; */

  .row_header {
    margin: 1rem 0;
    width: 100%;
    padding-inline: 0.6rem;
    /* border: 2px solid green; */
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    .row_header-left {
      display: flex;
      align-items: center;
      column-gap: 0.15rem;
      /* border: 2px solid fuchsia; */

      .row_header-title {
        h1 {
          font-weight: 400;
          font-size: clamp(1.3rem, 1.2355rem + 0.4914vw, 1.55rem);
        }
      }
    }

    .row_header-toggle {
      border-radius: 2px;
      border: 1px solid #606060;

      padding: 0.25rem 0.2rem;
      position: relative;

      &::before {
        content: "";
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        inset: 0;
        z-index: -1;
        opacity: 0.5;
      }

      button {
        transition: all 400ms ease-in-out;
        border-radius: 2px;
        border: none;
        color: #b8b9ba;
        background: none;

        cursor: pointer;
        padding: 0.2rem 0.3rem;
        margin-inline: 0.15rem;

        span {
          font-size: clamp(1rem, 0.9729rem + 0.2064vw, 1.105rem);
        }
      }
      .day {
        background: #d90429;
        color: #fff;
      }
      .week {
        background: #d90429;
        color: #fff;
      }
    }
  }

  div {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    .row_content {
      display: flex;
      /* border: 2px solid fuchsia; */

      .poster {
        border-radius: 0.5rem;
        cursor: pointer;

        width: 9.5rem;
        @media only screen and (min-width: 768px) {
          width: 12.5rem;
        }

        margin-inline: 0.6rem;
      }
    }
  }
`;

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const Row = ({ title, fetchUrl, Trending, InCinemas, Originals }) => {
  const [selected, setSelected] = React.useState("day");
  const [backDrop, setBackDrop] = React.useState(null);

  const options = {
    method: "GET",
    url: Trending
      ? `${baseUrl}/${selected === "week" ? fetchUrl[1] : fetchUrl[0]}`
      : `${baseUrl}/${fetchUrl}`,
    params: {
      language: "en-US",
      sort_by: "popularity.desc",
      with_networks: Originals && "213",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const {
    data: row,
    isLoading,
    error,
    isError,
  } = useQuery(["Netflix Row", selected], async () => {
    const { data } = await Axios.request(options);
    return data.results;
  });

  // console.log(row);

  isLoading && <div>Loading...</div>;
  isError && console.log(error.message);

  return (
    <>
      <ROW background={backDrop && `url(${backdrop}${backDrop})`}>
        <div>
          <div className="row_header">
            <div className="row_header-left">
              <img src={trending} alt="Trends" loading="lazy" />
              <div className="row_header-title">
                <h1>{title}</h1>
              </div>
            </div>
            {Trending && (
              <SliderToggle selected={selected} setSelected={setSelected} />
            )}
          </div>
          <div>
            <div className="row_content">
              {row?.map((collection) => {
                // && collection?.media_type || collection?.first_air_date ? 'tv' : 'movie'
                return (
                  <Link
                    key={collection?.id}
                    to={`/${
                      collection?.media_type === "tv" ||
                      collection?.first_air_date
                        ? "tv"
                        : "movie"
                    }/${collection?.id}/${collection?.name}`}
                  >
                    <img
                      className="poster"
                      src={`${poster}${collection?.poster_path}`}
                      alt={collection?.name || "Image"}
                      loading="lazy"
                      onMouseEnter={() =>
                        setBackDrop(InCinemas && collection?.backdrop_path)
                      }
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </ROW>
    </>
  );
};

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="row_header-toggle">
      <button
        className={`${selected === "day" && "day"}`}
        onClick={() => {
          setSelected("day");
        }}
      >
        <span>Today</span>
      </button>
      <button
        className={`${selected === "week" && "week"}`}
        onClick={() => {
          setSelected("week");
        }}
      >
        <span>This Week</span>
      </button>
    </div>
  );
};

export default Row;
