import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivSaleProvider } from "./Context/activeSaleContext";
import { AuthProvider } from "./Context/authContext";
import customTheme from "./Components/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { CustomThemeProvider } from "./Context/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={customTheme}>
            <CustomThemeProvider>
              <ActivSaleProvider>
                <App />
              </ActivSaleProvider>
            </CustomThemeProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
