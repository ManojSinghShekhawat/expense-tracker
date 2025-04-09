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
        const res = await axios.get("http://localhost:4000/api/v1/account");
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
            <Heading size="sm" mb={1}>
              Accounts
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
              <>
                <HStack
                  key={index}
                  justifyContent={"space-between"}
                  width={"full"}
                >
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
            ))}
          </VStack>
        </Card>
      </Box>
    </HStack>
  );
};

export default AccountCard;
