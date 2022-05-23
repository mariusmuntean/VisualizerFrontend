import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { VisualizerApolloProvider } from "./infrastructure/apollo";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VisualizerApolloProvider>
      <App />
    </VisualizerApolloProvider>
  </React.StrictMode>
);
