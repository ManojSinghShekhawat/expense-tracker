import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import { Login } from "./Login";

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
