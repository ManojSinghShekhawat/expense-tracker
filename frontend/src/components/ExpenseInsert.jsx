import React, { useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";

const ExpenseInsert = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const [transactionData, setTransactionData] = useState({
    amount: "",
    category: "",
    type: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    from: "",
    to: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [budget, setBudget] = useState([]);
  useEffect(() => {
    const getAccounts = async () => {
      const res = await axios.get(`${process.env.VITE_BACK_END_URL}/account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const account = await res.data.accounts;

      setAccounts(account);
    };

    getAccounts();
  }, []);

  useEffect(() => {
    const getBudgets = async () => {
      const res = await axios.get(`${process.env.VITE_BACK_END_URL}/budget`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const budgets = await res.data.budgets;

      setBudget(budgets);
    };

    getBudgets();
  }, []);

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
  const saveTransaction = async () => {
    try {
      const res = await axios.post(
        `${process.env.VITE_BACK_END_URL}/new`,

        transactionData,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast({
        title: "Transaction added",
        description: `Transaction added`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Transaction not added",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
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
                {budget?.map((budget) => (
                  <option key={budget._id} value={budget.category}>
                    {budget.category}
                  </option>
                ))}
                <option value={"salary"}>Salary</option>
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
              {selected === "income" ? (
                <Select
                  placeholder="Choose Account"
                  name="to"
                  value={transactionData.to}
                  onChange={changeHandler}
                  required
                >
                  {accounts?.map((account) => (
                    <option key={account._id} value={account.name}>
                      {account.name}
                    </option>
                  ))}
                </Select>
              ) : (
                <Select
                  placeholder="Choose Account"
                  name="from"
                  value={transactionData.from}
                  onChange={changeHandler}
                  required
                >
                  {accounts?.map((account) => (
                    <option key={account._id} value={account.name}>
                      {account.name}
                    </option>
                  ))}
                </Select>
              )}
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
