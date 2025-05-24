import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const WelcomeCard = () => {
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md"> Your Expense Summary</Heading>
      </CardHeader>
      <CardBody>
        <Text>View a summary of all your expense by adding account</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="blue">Add Account</Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeCard;
