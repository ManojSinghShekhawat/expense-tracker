import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  VStack,
  HStack,
  Box,
  Progress,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const cardLimit = 50000;
const spent = 29100.0;
const spentPer = (spent * 100) / cardLimit;
const CredditCards = () => {
  const [creditCards, setCreditCards] = useState([]);
  useEffect(() => {
    const getCreditCards = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/v1/account/creditcards"
      );
      setCreditCards(res.data.cerditCards);
    };
    getCreditCards();
  }, []);

  return (
    <HStack>
      <Box position="relative" width="500px">
        <Card>
          <CardHeader>
            <Heading size="sm" mb={1}>
              Credit Cards
            </Heading>
          </CardHeader>
          <VStack
            alignItems={"center"}
            mt={-8}
            position="relative"
            maxH={200}
            overflow={"scroll"}
            overflowX={"hidden"}
          >
            {creditCards.map((card) => (
              <React.Fragment key={card._id}>
                <HStack
                  alignItems={"center"}
                  position="relative"
                  width={"full"}
                >
                  <CardBody>
                    <Text position="relative" fontWeight={"600"}>
                      {card.name}
                    </Text>
                  </CardBody>

                  <CardBody>
                    <Text color={"red"} textAlign="right">
                      ₹ {card.balance}
                    </Text>
                  </CardBody>
                </HStack>
                <HStack>
                  <Box width="500px" p={2}>
                    <Progress
                      value={spentPer}
                      size="sm"
                      colorScheme={spentPer > 60 ? "red" : "green"}
                      borderRadius={"full"}
                      ml={"5rem"}
                    />
                  </Box>
                  <Text mr={"5rem"}>{spentPer}%</Text>
                </HStack>
              </React.Fragment>
            ))}
          </VStack>
        </Card>
      </Box>
    </HStack>
  );
};

export default CredditCards;
