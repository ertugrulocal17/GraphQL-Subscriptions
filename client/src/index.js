import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "./index.css";
import App from "./components/App";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
