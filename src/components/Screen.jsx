import React, { useEffect } from 'react';
import { requests } from '../config';
import { Navbar, Rows, Banner } from '.';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();

const Screen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.get('user')) {
      navigate('/');
    };
  }, []);
  return (
    <>
      <Navbar />
      <Banner />
      <Rows title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} Originals />
      <Rows title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Rows title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Rows title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Rows title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Rows title="Romantic Movies" fetchUrl={requests.fetchRomanticMovies} />
      <Rows title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  )
}

export default Screen