import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BarLoader from "react-spinners/BarLoader";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Signin = lazy(() => import("./pages/Signin"));
const Page = lazy(() => import("./components/Page"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const Data = lazy(() => import("./pages/Data"));

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const override = {
  margin: ".5rem auto",
};

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.get("user")) {
      navigate("/");
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      <main className="app">
        <Suspense
          fallback={
            <BarLoader
              color="#EFE4E2"
              loading
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
        >
          <Routes>
            <Route
              path="/"
              element={!cookies.get("user") ? <Home /> : <Page />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route exact path="/:media_type/:id/:name" element={<Data />} />
          </Routes>
        </Suspense>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
