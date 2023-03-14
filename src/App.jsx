import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cookies from 'universal-cookie';
import { UserProvider } from './context/UserContext';
const cookies = new Cookies();

const Signin = lazy(() => import('./components/Signin'));
const Screen = lazy(() => import('./components/Screen'));
const Signup = lazy(() => import('./components/Signup'));
const Home = lazy(() => import('./components/Home'));
const Preview = lazy(() => import('./components/Preview'));

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
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route exact path="/screen" element={<Screen />} />
              <Route exact path="/screen/:id" element={<Preview />} />
            </Routes>
          </Suspense>
        </UserProvider>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App