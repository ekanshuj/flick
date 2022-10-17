import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { requests } from './config';

import { Navbar, Rows, Screen, Signin, Home, Signup } from './components';
import { UserProvider } from './context/UserContext';

const client = new QueryClient({
  queries: {
    refetchOnWindowsFocus: false
  }
});

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <main className="app">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/home" element={
              <>
                <Navbar />
                <Screen />
                <Rows title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} Originals />
                <Rows title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Rows title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Rows title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Rows title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Rows title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Rows title="Romantic Movies" fetchUrl={requests.fetchRomanticMovies} />
                <Rows title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
              </>
            } />
          </Routes>
        </UserProvider>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App