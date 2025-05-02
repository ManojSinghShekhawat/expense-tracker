import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./components/Home";
import SideNav from "./components/SideNav";
import { Route, Routes, Navigate } from "react-router-dom";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";

import LandingPage from "./components/LandingPage";
import { useSelector } from "react-redux";
import { authCheck } from "./redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
