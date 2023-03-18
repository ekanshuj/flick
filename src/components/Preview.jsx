import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import logo from '../assets/logo.png';

const DIVISION = styled.div`
height: 100vh;
width: 100vw;
background: black;
color: white;
display: grid;
grid-template-rows: 12% 88%; 
.data {
  /* border: 2px solid white; */
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
}`;

const Preview = () => {
  const { id } = useParams();
  const { data: preview, isLoading, isError, error } = useQuery(["Netflix Preview",], async () => {
    const { data } = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`);
    return data
  });

  return (
    <DIVISION>
      <HEADER>
        <div className="logo">
          <img onClick={() => {
            navigate("/")
          }} src={logo} alt="Netflix" />
        </div>
      </HEADER>
      <div className='data'>
        <h1>{preview?.name || preview?.title || preview?.original_name}</h1>
        <p>{preview?.overview}</p>
        <p>{preview?.release_date}</p>
        <p>{preview?.revenue}</p>
        <p>{preview?.runtime}</p>
        <p>{preview?.tagline}</p>
        <p>{preview?.popularity}</p>
        <p>{preview?.budget}</p>
      </div>
    </DIVISION>
  )
}

export default Preview