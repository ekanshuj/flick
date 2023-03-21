import React, { useEffect } from 'react';
import { requests } from '../config';
import { Rows, Banner } from '.';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const DIVISION = styled.main`
min-height: 100vh;
width: 100%;
overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
   ::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
.screen {
  display: none;
  @media only screen and (min-width: 640px) {
    display: block;
  }
}
.note {
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px 0px; 
  flex-wrap: wrap;
  @media only screen and (min-width: 640px) {
    display: none;
  }
  p {
    text-align: center;
    font-size: 1.25rem;
    strong {
      text-decoration: underline;
      cursor: pointer;
      color: red;
    }
  }
}
`

const Screen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (!cookies.get('user')) && navigate('/');
  }, []);

  return (
    <DIVISION>
      <div className="screen">
        <Banner />
        <Rows title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} Originals />
        <Rows title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Rows title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Rows title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Rows title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Rows title="Romantic Movies" fetchUrl={requests.fetchRomanticMovies} />
        <Rows title="Documentaries" fetchUrl={requests.fetchDocumentaries} Documentary />
      </div>
      <div className="note">
        <p>Currently only available on tablet devices & above.</p>
        <p>Switch or <strong onClick={() => {
          cookies.remove('user');
          navigate('/signin');
        }}>Log Out</strong></p>
      </div>
    </DIVISION>
  )
}

export default Screen