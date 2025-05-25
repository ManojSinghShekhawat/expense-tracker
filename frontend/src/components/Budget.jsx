import {
  Avatar,
  Card,
  CardBody,
  Box,
  Heading,
  Progress,
  HStack,
  Stack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaPiggyBank,
  FaTag,
} from "react-icons/fa";

const categoryIcons = {
  groceries: FaUtensils,
  fuel: FaCar,
  shopping: FaShoppingBag,
  savings: FaPiggyBank,
};

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  useEffect(() => {
    const getBudgets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACK_END_URL}/budget`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setBudgets(res.data.budgets);
      } catch (error) {
        console.log(error);
      }
    };
    getBudgets();
  }, []);

  return (
    <Stack>
      {budgets.map((budget) => {
        const Icon = categoryIcons[budget.category.toLowerCase()] || FaTag;
        return (
          <Card mt={5} key={budget._id}>
            <CardBody>
              <Heading size={"3rem"}>{budget.category}</Heading>
              <HStack>
                <Icon fontSize={"2rem"} />

                <Box width="43rem" p={2}>
                  <HStack justifyContent={"space-between"}>
                    <p>{budget.spent}</p>
                    <p>{((budget.spent * 100) / budget.limit).toFixed(2)}%</p>
                    <p>{budget.limit}</p>
                  </HStack>
                  <Progress
                    value={(budget.spent * 100) / budget.limit}
                    size="sm"
                    colorScheme={
                      (budget.spent * 100) / budget.limit > 50 ? "red" : "green"
                    }
                    borderRadius={"full"}
                  />
                </Box>
              </HStack>
            </CardBody>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Budget;
