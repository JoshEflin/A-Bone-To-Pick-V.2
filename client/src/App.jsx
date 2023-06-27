import { useState } from "react";
import { GET_DOGS_DB } from "./utils/queries";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  useMutation,
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
import"./user-card.css"
import SignupPage from "./pages/SignupForm";
import LoginPage from "./pages/LoginForm";
import Foot from "./components/Footer/Footer";
import DoggyDash from "./components/cards/DoggyDash";
import SingleDoggyShare from "./pages/SingleDoggyShare";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";
import Auth from "./utils/auth";
import UserDash from "./components/cards/UserDash";

const { Content } = Layout;

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

// sets endpoint for main GraphQL API
const httpLink = createHttpLink({
  uri: "/graphql",
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
  const { loading, error, data } = useQuery(GET_DOGS_DB);

  // console.log(data);
  const token = {
    colorPrimary: "#df9a5c", // ugly orange
    colorBackground:"rgb(242, 247, 246)"
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [count, setCount] = useState(0);
  const [dogCardData, setDogCardData] = useState(null);
  // console.log(dogCardData);
  // const [cardSelectedIndex, setCardSelectedIndex] = useState(-1);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: token.colorPrimary,
          }
        }}>
          <Layout className="layout" 
          style={{minHeight:'100vh', alignItems:'center',}}
          >
            <Router>
              <NavBar dogCardData={dogCardData} setDogCardData={setDogCardData} data={data}/>
               <Content style = {{alignItems:'center'}}>
                {/* <p onClick = {logout}>This is content!!!!!  Hello World</p> */}
                <Routes>
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path='/userDash' element={<UserDash />} />
                  <Route path="/" element={<DoggyDash setDogCardData={setDogCardData } dogCardData={dogCardData}  />}/>
                  <Route path="/profile/:_id" element={<ProfilePage setDogCardData={setDogCardData} dogCardData={dogCardData} />} />
                  <Route path="/shared/:id" element={<SingleDoggyShare setDogCardData={setDogCardData} dogCardData={dogCardData} />} />

                </Routes>
              </Content> 
              <Foot />
            </Router>
          </Layout>
        </ConfigProvider>
      
    </>
  );
}

export default App;
