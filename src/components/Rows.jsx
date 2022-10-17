import React, { useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { baseUrl, poster } from '../config/config';
// import { Preview } from './';

const DIVISION = styled.div`
  margin-inline-start: 13px;
  h1 {
    text-align: left;
    color: ghostwhite;
    font-weight: 500;
  }
  .bold {
    font-weight: bold;
  }
  .rows {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
    margin: 13px 0px;
    cursor: pointer;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin: 2px 0px;
     ::-webkit-scrollbar {
      display: none;
     }
     .poster {
      max-height: 170px;
      width: 230px;
      object-fit: contain;
      margin-inline: 5px;
      transition: transform 450ms;
        :hover {
          transform: scale(1.08);
        }
     }
     .originals {
      max-height: 350px;
      width: 220px;
        :hover {
          transform: scale(1.1);
        }
     }
  }

`;

const Rows = ({ title, fetchUrl, Originals }) => {
  const { data: rows, isLoading, error, isError } = useQuery(["Netflix Rows", { fetchUrl }], async () => {
    const { data } = await Axios.get(`${baseUrl}/${fetchUrl}`);
    return data.results;
  });

  { isLoading && <div>Loading...</div> }
  { isError && console.log(error.message) }

  return (
    <>
      <DIVISION>
        <h1 className={Originals && 'bold'}>{title}</h1>
        <div className="rows">
          {
            rows?.map((collection) => {
              return (
                <img className={`poster ${Originals && 'originals'}`} key={collection.id} src={`${poster}${Originals ? collection.poster_path : collection.backdrop_path}`} alt={collection.name} />
              )
            })
          }
        </div>
      </DIVISION>
    </>
  )
}

export default Rows