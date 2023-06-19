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
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./card.css";
import defaultDog from "./assets/images/default-dog.png";
import DogCard from "./components/cards/DogCard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";


const { Content} = Layout;

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
      <ConfigProvider
    theme={{
      token: {
        colorPink: '#ecb2b5',
        colorLightGreen: '#93c1b8',
        colorDarkGreen: '#86a48d',
        colorOrange: '#86a48d',
        colorTan: '#f3ebcf',
        colorPurple: '#f3ebcf',
        colorLightPink: '##f8dcce'
      },
    }}
  >
          <Layout>
            <Router>
              <Header />
              <Content>
                <p>This is content!!!!!  Hello World</p>
                <Routes>
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<DogCard />} />
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
