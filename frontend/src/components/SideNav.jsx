import {
  HStack,
  VStack,
  Box,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import {
  TbBuildingBank,
  TbDeviceMobileShare,
  TbSettingsCog,
} from "react-icons/tb";

import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import {
  MdOutlineCurrencyRupee,
  MdCloudSync,
  MdOutlineHelpOutline,
} from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Button ref={btnRef} colorScheme="#2B6CB0" onClick={onOpen}>
        <IoMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <Box>
            <DrawerCloseButton />
            {/* <DrawerHeader>
              <Image src={logo} h={"7rem"} />
            </DrawerHeader> */}

            <DrawerBody>
              <VStack
                align={"self"}
                h={"full"}
                fontSize={"1.2rem"}
                justifyContent={"center"}
              >
                <VStack align={"self"} borderBottom={"2px solid gray"}>
                  <Flex
                    as={Link}
                    to="/"
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <CgMenuGridR />
                    Overview
                  </Flex>
                  <Flex
                    as={Link}
                    to="/transactions"
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    {" "}
                    <TfiMenuAlt />
                    Transactions
                  </Flex>

                  <Flex
                    as={Link}
                    to="/accounts"
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <TbBuildingBank />
                    Accounts
                  </Flex>
                  <Flex
                    as={Link}
                    to="/budgets"
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <RiMoneyRupeeCircleLine />
                    Budgest
                  </Flex>
                  <Flex
                    as={Link}
                    to=""
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <MdOutlineCurrencyRupee />
                    Debts
                  </Flex>
                </VStack>
                <VStack align={"self"} borderBottom={"2px solid gray"}>
                  <Flex
                    as={Link}
                    to=""
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <FaDownload />
                    Import
                  </Flex>
                  <Flex
                    as={Link}
                    to=""
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <TbDeviceMobileShare />
                    Preferance
                  </Flex>
                  <Flex
                    as={Link}
                    to=""
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <MdCloudSync />
                    Bank Sync
                  </Flex>
                </VStack>
                <VStack align={"self"}>
                  <Flex
                    as={Link}
                    to=""
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <TbSettingsCog />
                    Setting
                  </Flex>
                  <Flex
                    as={Link}
                    to=""
                    onClick={onClose}
                    align="center"
                    gap={2}
                  >
                    <MdOutlineHelpOutline />
                    Help
                  </Flex>
                </VStack>
              </VStack>
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
