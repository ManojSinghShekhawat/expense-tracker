import React, { useEffect, useState } from "react";
import { SummaryCard } from "./SummaryCard";
import AccountCard from "./AccountCard";
import ExpenseInsert from "./ExpenseInsert";

import axios from "axios";
import Last7Days from "./Last7Days";
import TwelveMonthBalance from "./TwelveMonthBalance";
import { Box, Heading, HStack, VStack, Stack } from "@chakra-ui/react";
import CredditCards from "./CredditCards";
import Budget from "./Budget";
import SideNav from "./SideNav";

const Home = () => {
  const [balance, setBalance] = useState({});
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/v1/transaction/balance"
      );
      // setBalance(res.data);
      setBalance(res.data);
    };
    fetchBalance();
  }, []);

  return (
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
  );
};

export default Home;
