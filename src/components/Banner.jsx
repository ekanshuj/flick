import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { requests } from '../config';
import { baseUrl, backdrop } from '../config/config';
import styled from 'styled-components';
import { Navbar } from './';

const DIVISION = styled.div`
  &:before {
    content: '';
    background: ${props => props.background} no-repeat center center/cover;
    height: inherit;
    width: inherit;
    position: absolute;
    top: 0;
    left: 0;
    background-position:50% 50%;
  }
  height: 80vh;
  width: 100vw;
  color: ghostwhite;
  display: grid; 
  grid-template-rows: 12% 88%;
  margin-bottom: 25px;
`;

const SECTION = styled.section`
/* border: 2px solid fuchsia; */
  z-index: 99;
   .banner {
    /* border: 5px solid white; */
    margin: 0px 3rem;
    padding-top: 4rem;
    .banner__heading {
      /* border: 2px solid green; */
      display: flex;
      align-items: center;
      justify-content: flex-start;
      h1 {
      font-size: 4rem;
      font-family: 'Josefin Sans', sans-serif; 
      @media(max-width: 940px) {
        font-size: 3rem;
      }
      @media(max-width: 768px) {
        font-size: 2.5rem;
      }
      @media(max-width: 420px) {
        font-size: 1.75rem;
      }
    }
    }
    .banner__options {
      /* border: 2px solid blue; */
    padding: 12px 5px;
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
    .banner__overview {
      /* border: 2px solid blue; */
      max-width: 40rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      @media(max-width: 768px) {
        max-width: 30rem;
      }
    /* margin: 7px 0px; */
      h4 {
        margin: 7px 0px;
        font-size: 1.29rem;
        font-weight: 500;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
      }
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
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <DIVISION background={`url(${backdrop}${screens?.backdrop_path})`}>
      <Navbar />
      <SECTION>
        <div className="banner">
          <div className="banner__heading">
            <h1>
              {screens?.name || screens?.title || screens?.original_name}
            </h1>
          </div>
          <div className="banner__options">
            <button>Play</button>
            <button>My List</button>
          </div>
          <div className='banner__overview'>
            <h4>{screens?.overview}</h4>
          </div>
        </div>
      </SECTION>
    </DIVISION>
  )
}

export default Banner