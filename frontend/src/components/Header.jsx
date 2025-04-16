import React, { useState, useEffect } from "react";
import { Box, HStack, Text, Spinner } from "@chakra-ui/react";
import SideNav from "./SideNav";
import { Login } from "./Login";
import axios from "axios";

const Header = () => {
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
      <HStack>
        <SideNav />
        <Text>Overview</Text>
      </HStack>
      <HStack>
        <Login />
      </HStack>
    </Box>
  );
};

export default Header;
