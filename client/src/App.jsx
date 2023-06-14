import { useState } from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './card.css'
import defaultDog from './assets/images/default-dog.png'
import Template from './components/Template'
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";


// sets endpoint for main GraphQL API
const httpLink = createHttpLink({
  uri: '/graphql',
});

// sets request middleware to attach JWT token to each request with authorization header
const authLink = setContext((_, { headers }) => {
  // gets authentication token from local storage
  const token = localStorage.getItem('id_token');
  // returns headers to context for httpLink to read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // executes authLink middleware before making request to GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    <Template />
    </ApolloProvider>
    </>
  )
}

export default App
