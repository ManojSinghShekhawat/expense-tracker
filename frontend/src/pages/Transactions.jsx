import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { GrNext, GrPrevious } from "react-icons/gr";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterData, setFilterData] = useState({
    from: "",
    to: "",
    type: "",
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    const getAllTransactions = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTransactions(res.data.tranactions);
    };

    getAllTransactions();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 20;
    const endIndex = currentPage * 20;
    setCurrentPageData(transactions.slice(startIndex, endIndex));
  }, [transactions, currentPage]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/transaction/filteredtransactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
        filterData
      );
      setTransactions(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card mt={5}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Grid templateColumns="repeat(4, 1fr)" gap={"5rem"} width={"full"}>
            <GridItem w="100%" h="10">
              <Text fontWeight={600} fontSize={"1.1rem"}>
                Catogery
              </Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text fontWeight={600} fontSize={"1.1rem"}>
                Description
              </Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text fontWeight={600} fontSize={"1.1rem"}>
                Amount
              </Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text fontWeight={600} fontSize={"1.1rem"}>
                Date
              </Text>
            </GridItem>
          </Grid>
          <Button
            mr={".7rem"}
            bg={"#2B6CB0"}
            color={"black"}
            size={"sm"}
            onClick={onOpen}
          >
            Filter
          </Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filter Your Transactions</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>From</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Start Date"
                    type="date"
                    onChange={changeHandler}
                    name="from"
                    value={filterData.from}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>To</FormLabel>
                  <Input
                    placeholder="End Date"
                    type="date"
                    onChange={changeHandler}
                    name="to"
                    value={filterData.to}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Type</FormLabel>
                  <Input
                    placeholder="Groccery"
                    onChange={changeHandler}
                    name="type"
                    value={filterData.type}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    handleFilter(),
                      onClose(),
                      setFilterData({ from: "", to: "", type: "" });
                  }}
                >
                  Search
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      </Card>

      {currentPageData.map((trans, index) => (
        <Card
          mt={5}
          key={index}
          bg={trans.type === "expense" ? "red.200" : "green.200"}
        >
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem w="100%" h="10">
              {trans.category}
            </GridItem>
            <GridItem w="100%" h="10">
              {trans.description}
            </GridItem>
            <GridItem w="100%" h="10">
              {trans.amount}
            </GridItem>
            <GridItem w="100%" h="10">
              {trans.date ? trans.date.split("T")[0] : "N/A"}
            </GridItem>
          </Grid>
        </Card>
      ))}
      <HStack justifyContent={"center"} fontSize={"1.2rem"} mt={"0.5rem"}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage < 2 ? true : false}
        >
          <GrPrevious />
        </Button>
        <Text mx={"1rem"}>{currentPage}</Text>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPageData.length < 20 ? true : false}
        >
          <GrNext />
        </Button>
      </HStack>
    </>
  );
};

export default Transactions;
