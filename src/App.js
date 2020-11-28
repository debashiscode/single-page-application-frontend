import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Posts from "./posts/Posts";
import { AuthContext } from "./context/auth";
import Login from "./Login";
import PrivateRoute from './PrivateRoute';


function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/posts" component={Posts} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
