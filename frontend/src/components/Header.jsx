import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import SideNav from "./SideNav";
import { Login } from "./Login";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      bg={"blue.600"}
      height={"2.5rem"}
      marginBottom={"5"}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <HStack>{isAuthenticated ? <SideNav /> : ""}</HStack>
      <HStack>
        <Login />
      </HStack>
    </Box>
  );
};

export default Header;
