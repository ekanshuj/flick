import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { Link } from "react-router-dom";

import { baseUrl, backdrop, poster } from "../config/config";
import fallback from "../assets/fallbackImage.png";

const SEARCH = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 65rem;
  margin-inline: auto;

  /* border: 1px solid #fff; */

  .input {
    input {
      width: 100%;

      color: #000;
      background: #fff;

      padding: 1.25rem 1rem;

      letter-spacing: 1px;
      font-size: 1.18rem;

      border: none;
      border-radius: 0.35rem;
      outline: none;
    }
  }

  .search_results {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    @media only screen and (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    }
    gap: 0.5rem;

    margin-block: 0.75rem;

    .poster {
      border-radius: 0.2rem;
      cursor: pointer;

      width: 9rem;

      @media only screen and (min-width: 640px) {
        width: 100%;
      }
    }
  }
`;

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = React.useState("");
  let isLongEnough = query.length >= 1;

  React.useEffect(() => {
    !cookies.get("user") && navigate("/");
  }, []);

  const options = {
    method: "GET",
    url: `${baseUrl}/search/multi?query=${query}`,
    params: {
      language: "en-US",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const {
    data: searches,
    isError,
    error,
  } = useQuery(
    ["Flick_Search", query],
    async () => {
      const {
        data: { results },
      } = await Axios.request(options);
      // ?.filter(
      //   (result) => result?.media_type === "tv" || result?.media_type === "movie"
      // );
      return results;
    },
    { enabled: isLongEnough }
  );
  console.log(searches);

  return (
    <SEARCH>
      <div className="input">
        <input
          type="search"
          placeholder="Search your desired Movies or TV shows."
          name="search"
          onKeyUp={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="search_results">
        {searches?.map((search) => {
          return (
            <Link
              key={search?.id}
              to={`/${
                search?.media_type === "tv" || search?.first_air_date
                  ? "tv"
                  : "movie"
              }/${search?.id}/${
                search?.original_name || search?.original_title
              }`}
            >
              <img
                className="poster"
                src={
                  search?.poster_path
                    ? `${poster}${search?.poster_path}`
                    : fallback
                }
                alt={search?.name || "Image"}
                loading="lazy"
              />
            </Link>
          );
        })}
      </div>
    </SEARCH>
  );
};

export default Search;
