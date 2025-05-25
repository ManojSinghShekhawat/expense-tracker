import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  VStack,
  HStack,
  Box,
  Stack,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountCard = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    try {
      const getAccounts = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_BACK_END_URL}/api/v1/account`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setAccounts(res.data.accounts);
      };
      getAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <HStack>
      <Box width="500px">
        <Card>
          <CardHeader>
            <Heading
              size="sm"
              mb={1}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Text>Accounts</Text>
              <Text color={"green.300"}>
                {Number(
                  accounts.reduce(
                    (acc, curr) =>
                      acc + (curr.type === "bank" ? curr.balance : 0),
                    0
                  )
                )}
              </Text>
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
            {accounts.map((acc, index) => (
              <React.Fragment key={acc._id}>
                {acc.type == "bank" ? (
                  <>
                    <HStack justifyContent={"space-between"} width={"full"}>
                      <CardBody>
                        <Text position="relative">{acc.name}</Text>
                      </CardBody>
                      <CardBody>
                        <Text color={"green"} textAlign="right">
                          ₹ {acc.balance}
                        </Text>
                      </CardBody>
                    </HStack>
                    <Divider borderColor="gray.400" borderBottomWidth="2px" />
                  </>
                ) : (
                  ""
                )}
              </React.Fragment>
            ))}
          </VStack>
        </Card>
      </Box>
    </HStack>
  );
};

export default AccountCard;
