import React, { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import axios from "axios";

import { FaPlus } from "react-icons/fa6";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const ExpenseInsert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const [transactionData, setTransactionData] = useState({
    amount: "",
    category: "",
    type: "",
    description: "",
    date: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const typeSelector = (type) => {
    setTransactionData((prev) => ({
      ...prev,
      type,
    }));
  };

  const buttonClickHandle = (type) => {
    typeSelector(type);
    setSelected(type);
  };
  //saving transaction in DB
  const saveTransaction = () => {
    const res = axios.post(
      "http://localhost:4000/api/v1/transaction/new",
      transactionData
    );
  };

  return (
    <>
      <Box
        bg={"green"}
        borderRadius={"full"}
        padding={"1rem"}
        color={"white"}
        position={"sticky"}
        right={"1rem"}
        bottom={"2rem"}
        width={"3rem"}
      >
        <FaPlus cursor={"pointer"} onClick={onOpen} />
      </Box>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Enter amount"
                type="number"
                name="amount"
                value={transactionData.amount}
                onChange={changeHandler}
              />
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Enter Description"
                name="description"
                value={transactionData.description}
                onChange={changeHandler}
              />
              <FormLabel>Select Category</FormLabel>
              <Select
                placeholder="Choose Category"
                name="category"
                value={transactionData.category}
                onChange={changeHandler}
              >
                <option value={"salary"}>Salary</option>
                <option value={"food"}>Food</option>
                <option value={"groccery"}>Groccery</option>
                <option value={"travel"}>Travel</option>
              </Select>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Date"
                name="date"
                type="Date"
                value={
                  transactionData.date || new Date().toISOString().split("T")[0]
                }
                onChange={changeHandler}
              />
              <ButtonGroup>
                <Button
                  value={"income"}
                  colorScheme={selected === "income" ? "green" : "gray"}
                  variant={selected === "income" ? "solid" : "outline"}
                  mr={3}
                  mt={3}
                  onClick={() => buttonClickHandle("income")}
                >
                  Income
                </Button>
                <Button
                  value={"expense"}
                  colorScheme={selected === "expense" ? "red" : "gray"}
                  variant={selected === "expense" ? "solid" : "outline"}
                  mt={3}
                  onClick={() => buttonClickHandle("expense")}
                >
                  Expense
                </Button>
              </ButtonGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                saveTransaction();
                onClose();
                setTransactionData({
                  amount: "",
                  category: "",
                  type: "",
                  description: "",
                });
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExpenseInsert;
