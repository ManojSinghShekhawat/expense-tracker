import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ChakraProvider>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ChakraProvider>
  // </StrictMode>
);
