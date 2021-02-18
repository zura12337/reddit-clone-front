//@ts-nocheck
import React, { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import { getUser } from "./api/index";
import { UserContext } from "./context/UserContext";
import UserPage from "./pages/user-page";
import Loading from "./components/common/Loading";
import SubmitPage from "./pages/submit-page";
import { Fonts } from "./Fonts";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UserLikedPosts from "./pages/user-page/liked-posts";

const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
    mono: "IBM Plex Sans",
  },
});

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getUser();
    setUser(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <UserContext.Provider value={user}>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/submit" component={SubmitPage} />
          <Route path="/user/:id/liked" component={UserLikedPosts} />
          <Route path="/user/:id" component={UserPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
