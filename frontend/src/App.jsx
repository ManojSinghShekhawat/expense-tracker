import { Box, HStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./components/Home";
import Nav from "./components/Nav";
import SideNav from "./components/SideNav";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <Box bg={"#F1F1F1"}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
