import React, { useEffect, useState } from "react";
import PIChart from "./PIChart";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Stack,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";

export const SummaryCard = ({ balance }) => {
  const { totalIncome, totalExpense } = balance;
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const [lastMonthData, setLastMontData] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/v1/transaction/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const currentMonthBalance = [
        { name: "Income", value: res.data.currentMonthTotalIncome },
        {
          name: "Expense",
          value: res.data.currentMontTotalExpense,
        },
      ];
      const lastMonthbalance = [
        { name: "Income", value: res.data.lastMonthTotalIncome },
        { name: "Expense", value: res.data.lastMonthTotalExpense },
      ];

      setCurrentMonthData(currentMonthBalance);
      setLastMontData(lastMonthbalance);
    };
    fetchBalance();
  }, []);

  if (currentMonthData.length == 0 && lastMonthData.length == 0) {
    return <p>Loading...</p>;
  }

  return (
    <HStack justifyContent={"space-between"} width={"100%"}>
      <Card>
        <CardHeader>
          <Heading size="sm" mb={1}>
            Summary
          </Heading>
        </CardHeader>
        <HStack alignItems={"center"} mt={-8}>
          <VStack mt={-6}>
            <CardBody>
              <Text>Balance: </Text>
              <Text>Crdit Card:</Text>
            </CardBody>
          </VStack>

          <VStack mx={"2rem"}>
            <CardBody>
              <Text color={"green"} textAlign="right">
                ₹ {totalIncome}
              </Text>
              <Text
                color={"red"}
                width={"7rem"}
                borderBottom={"1px solid gray"}
                textAlign="right"
              >
                ₹ {totalExpense}
              </Text>
              <Text
                color={totalIncome - totalExpense >= 0 ? "green" : "red"}
                textAlign="right"
              >
                ₹ {Math.abs(totalIncome - totalExpense)}
              </Text>
            </CardBody>
          </VStack>
        </HStack>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="sm" mb={1}>
            Current Month
          </Heading>
        </CardHeader>

        <HStack alignItems={"center"} mt={-8}>
          <PIChart balanceData={currentMonthData} />
          <VStack mx={"2rem"}>
            <CardBody>
              <Text color={"green"} textAlign="right">
                ₹ {currentMonthData[0].value}
              </Text>
              <Text
                color={"red"}
                width={"7rem"}
                borderBottom={"1px solid gray"}
                textAlign="right"
              >
                -₹ {currentMonthData[1].value}
              </Text>
              <Text color={"green"} textAlign="right">
                ₹ {currentMonthData[0].value - currentMonthData[1].value}
              </Text>
            </CardBody>
          </VStack>
        </HStack>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="sm" mb={1}>
            Last Month
          </Heading>
        </CardHeader>

        <HStack alignItems={"center"} mt={-8}>
          <PIChart balanceData={lastMonthData} />
          <VStack mx={"2rem"}>
            <CardBody>
              <Text color={"green"} textAlign="right">
                ₹ {lastMonthData[0].value}
              </Text>
              <Text
                color={"red"}
                width={"7rem"}
                borderBottom={"1px solid gray"}
                textAlign="right"
              >
                -₹ {lastMonthData[1].value}
              </Text>
              <Text color={"green"} textAlign="right">
                ₹ {lastMonthData[0].value - lastMonthData[1].value}
              </Text>
            </CardBody>
          </VStack>
        </HStack>
      </Card>
    </HStack>
  );
};
