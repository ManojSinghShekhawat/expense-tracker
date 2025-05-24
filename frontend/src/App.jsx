import { Box, Center, Spinner } from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./components/Home";
import SideNav from "./components/SideNav";
import { Route, Routes, Navigate } from "react-router-dom";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";
import LandingPage from "./components/LandingPage";
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "./redux/slices/authSlice";
import { useEffect } from "react";
import { Login } from "./components/Login";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const showLoginModal = useSelector(
    (state) => state.loginModal.showLoginModal
  );

  return (
    <>
      <Box bg={"#F1F1F1"}>
        {showLoginModal ? <Login /> : ""}
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />

                <Accounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />

                <Budgets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Header />

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
