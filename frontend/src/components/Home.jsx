import React, { useEffect, useState } from "react";
import { SummaryCard } from "./SummaryCard";
import AccountCard from "./AccountCard";
import ExpenseInsert from "./ExpenseInsert";

import axios from "axios";
import Last7Days from "./Last7Days";
import TwelveMonthBalance from "./TwelveMonthBalance";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Stack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import CredditCards from "./CredditCards";
import Budget from "./Budget";
import WelcomeCard from "./WelcomeCard";
import dashboard from "../assets/dashboard.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [balance, setBalance] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/transaction/balance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // setBalance(res.data);
      setBalance(res.data);
    };
    fetchBalance();
  }, []);

  const hasSomeValue = Object.values(balance)
    .filter((value) => typeof value === "number")
    .some((num) => num !== 0);

  return (
    <>
      {!hasSomeValue ? (
        <>
          <Box
            bgImage={dashboard}
            bgSize={"115%"}
            bgPosition={"center"}
            minH={"100VH"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <VStack>
              <Heading size={"md"}>
                Start by adding your accounts or transactions
              </Heading>
              <Button
                size={"lg"}
                bgcolor={"blue.200"}
                h={"5rem"}
                w={"16rem"}
                fontSize={"2.2rem"}
                onClick={() => navigate("/accounts")}
              >
                Add Accounts
              </Button>
            </VStack>
          </Box>
          <ExpenseInsert />
        </>
      ) : (
        <>
          <HStack ml={"11rem"} mr={"1rem"}>
            <SummaryCard balance={balance} />
          </HStack>

          <HStack justifyContent={"space-around"}>
            <VStack width={"50%"} mt={"1rem"}>
              <AccountCard />

              <CredditCards />

              <Last7Days />
            </VStack>
            <VStack width={"50%"}>
              <TwelveMonthBalance />

              <VStack width={"full"}>
                <Box width={"full"} mt={"1rem"}>
                  <Heading fontSize={"1rem"} textAlign={"left"} width={"full"}>
                    Budgets
                  </Heading>
                </Box>
                <VStack width={"100%"} overflow={"auto"} maxH={"19rem"}>
                  <Budget />
                </VStack>
              </VStack>
            </VStack>
          </HStack>
          <ExpenseInsert />
        </>
      )}
    </>
  );
};

export default Home;
