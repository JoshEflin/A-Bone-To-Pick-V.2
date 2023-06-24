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
import SignupPage from "./pages/SignupForm";
import LoginPage from "./pages/LoginForm";
import Footer from "./components/Footer/Footer";
import DoggyDash from "./components/cards/DoggyDash";
import ProfilePage from "./pages/ProfilePage";
import NavBar from './components/NavBar';
import Auth from "./utils/auth";

const logout = (event)=> {
  event.preventDefault();
  Auth.logout()
}

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
  const token = {
    colorPrimary: "#df9a5c", // ugly orange
    
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [count, setCount] = useState(0);

  return (
    <>
      <ApolloProvider client={client}>
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: token.colorPrimary,
          }
        }}>
          <Layout>
            <Router>
              <NavBar />
               <Content>
                <p onClick = {logout}>This is content!!!!!  Hello World</p>
                <Routes>
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<DoggyDash />} />
                  <Route path="/profile/:_id" element={<ProfilePage />} />
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
