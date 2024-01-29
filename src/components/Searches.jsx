import { Link } from "react-router-dom";
import styled from "styled-components";
import { poster } from "../config/config";

import fallback from "../assets/fallbackImage.png";

const SEARCHES = styled.section`
  .images {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    @media only screen and (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    }
    gap: 0.5rem;

    margin-block: 1rem;

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

const Searches = ({ searches }) => {
  console.log(searches);

  return (
    <>
      <SEARCHES>
        <div className="images">
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
      </SEARCHES>
    </>
  );
};

export default Searches;
