import {
  HStack,
  VStack,
  Box,
  Text,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import {
  TbBuildingBank,
  TbDeviceMobileShare,
  TbSettingsCog,
} from "react-icons/tb";
import { LiaCreditCardSolid } from "react-icons/lia";
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
            <DrawerHeader>
              <Image src={logo} h={"7rem"} />
            </DrawerHeader>

            <DrawerBody>
              <VStack
                align={"self"}
                h={"full"}
                fontSize={"1.2rem"}
                justifyContent={"center"}
              >
                <VStack align={"self"} borderBottom={"2px solid gray"}>
                  <HStack>
                    <CgMenuGridR
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="/" onClick={onClose}>
                      Overview
                    </Link>
                  </HStack>
                  <HStack>
                    <TfiMenuAlt
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="/transactions" onClick={onClose}>
                      Transactions
                    </Link>
                  </HStack>
                  <HStack>
                    <TbBuildingBank
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="/accounts" onClick={onClose}>
                      Accounts
                    </Link>
                  </HStack>

                  <HStack>
                    <RiMoneyRupeeCircleLine
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="/budgets" onClick={onClose}>
                      Budgest
                    </Link>
                  </HStack>
                  <HStack>
                    <MdOutlineCurrencyRupee
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="" onClick={onClose}>
                      Debts
                    </Link>
                  </HStack>
                </VStack>
                <VStack align={"self"} borderBottom={"2px solid gray"}>
                  <HStack>
                    <FaDownload
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="" onClick={onClose}>
                      Import
                    </Link>
                  </HStack>
                  <HStack>
                    <TbDeviceMobileShare
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="" onClick={onClose}>
                      Preferance
                    </Link>
                  </HStack>
                  <HStack>
                    <MdCloudSync
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="" onClick={onClose}>
                      Bank Sync
                    </Link>
                  </HStack>
                </VStack>
                <VStack align={"self"}>
                  <HStack>
                    <TbSettingsCog
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="" onClick={onClose}>
                      Setting
                    </Link>
                  </HStack>
                  <HStack>
                    <MdOutlineHelpOutline
                      style={{
                        "margin-right": "10px",
                      }}
                    />
                    <Link to="" onClick={onClose}>
                      Help
                    </Link>
                  </HStack>
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
//  return (

// );
