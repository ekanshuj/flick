import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { requests } from '../config';
import { baseUrl, backdrop } from '../config/config';
import styled from 'styled-components';

const HEADER = styled.div`
  height: 85vh;
  width: 100%;
  color: ghostwhite;
  margin-bottom: 25px;
  &:before {
    content: '';
    background: ${props => props.background} no-repeat center center/cover;
    height: 85vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-position:50% 50%;
  }
`;

const DIVISION = styled.div`
  display: inline-block;
  position: relative;
  top: 190px;
  left: 35px;
  padding: 0px 10px;
      h1 {
      font-size: 5rem;
      font-family: 'Josefin Sans', sans-serif;  
      text-shadow: 3px 3px 13px #000000;
    }
    .buttons {
    display: inline-block;
    padding: 12px 5px;
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
    .overview {
    max-width: 620px;
    display: block; 
    margin: 7px 0px;
      h4 {
        width: 100%;
        margin-inline-start: 7px;
        padding: 7px 0px;
        font-size: 1.29rem;
        font-weight: 500;
        text-overflow:ellipsis;
        overflow:hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical !important;
        white-space: normal;
      }
    }
`;

const MASK = styled.div`
  &:before {
    content: '';
    left: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), transparent);
    height: 150px;
    width: 100%;
    position: absolute;
    bottom: 140px;
  }
  
`;

const Banner = () => {

  const { data: screens, isLoading } = useQuery(["Netflix Screen"], async () => {
    const { data } = await Axios.get(`${baseUrl}/${requests.fetchNetflixOriginals}`);
    return data.results[Math.floor(Math.random() * data.results.length - 1)]
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <HEADER background={`url(${backdrop}${screens?.backdrop_path})`}>
        <DIVISION>
          <h1>
            {screens?.name || screens?.title || screens?.original_name}
          </h1>
          <div className="buttons">
            <button>Play</button>
            <button>My List</button>
          </div>
          <span className='overview'>
            <h4>{screens?.overview}</h4>
          </span>
        </DIVISION>
      </HEADER>
      {/* <MASK></MASK> */}
    </>
  )
}

export default Banner
// ea1e678c 