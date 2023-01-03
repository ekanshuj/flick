import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { Signin, Screen, Signup, Home } from './components';
import { UserProvider } from './context/UserContext';

const client = new QueryClient({
  queries: {
    refetchOnWindowsFocus: false
  }
});

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.get('user')) {
      navigate('/screen');
    };
  }, []);
  return (
    <QueryClientProvider client={client}>
      <main className="app">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/screen" element={<Screen />} />
          </Routes>
        </UserProvider>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App