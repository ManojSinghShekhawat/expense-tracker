import { Box, Spinner } from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./components/Home";
import SideNav from "./components/SideNav";
import { Route, Routes, Navigate } from "react-router-dom";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";
import { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./components/LandingPage";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const authStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/authcheck",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        setIsAuthenticated(res.data.success);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    authStatus();
  }, []);

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <>
      <Box bg={"#F1F1F1"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />
                <SideNav />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />
                <SideNav />
                <Accounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />
                <SideNav />
                <Budgets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />
                <SideNav />
                <Transactions />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
