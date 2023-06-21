import { useState } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {
  Layout,
  Menu,
  Avatar,
  Space,
  Divider,
  ConfigProvider,
  theme,
} from "antd";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import "./card.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Nav from "./components/Header";
import Footer from "./components/Footer";
import DoggyDash from "./components/cards/DoggyDash";
// import Test from "./components/TEST";

const { Content } = Layout;

// sets endpoint for main GraphQL API
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// sets request middleware to attach JWT token to each request with authorization header
const authLink = setContext((_, { headers }) => {
  // gets authentication token from local storage
  const token = localStorage.getItem("id_token");
  // returns headers to context for httpLink to read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // executes authLink middleware before making request to GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ApolloProvider client={client}>
        <ConfigProvider>
          <Layout>
            <Router>
              <Nav />
              <Content>
                <p>This is content!!!!!  Hello World</p>
                <Routes>
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<DoggyDash />} />
                </Routes>
              </Content>
              <Footer />
            </Router>
          </Layout>
        </ConfigProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
