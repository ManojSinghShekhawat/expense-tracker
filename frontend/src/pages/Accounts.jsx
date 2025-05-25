import React, { useEffect, useState, useRef } from "react";

import {
  Card,
  CardHeader,
  Heading,
  Stack,
  Text,
  HStack,
  VStack,
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
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { BsBank, BsPlusLg } from "react-icons/bs";
import { MdDelete, MdAccountBalanceWallet, MdCreditCard } from "react-icons/md";
import axios from "axios";
import ExpenseInsert from "../components/ExpenseInsert";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const {
    isOpen: isAddedAccountOpen,
    onOpen: onAddedAccountOpen,
    onClose: onAddedAccountClose,
  } = useDisclosure();
  const {
    isOpen: isAddedAmountOpen,
    onOpen: onAddedAmountOpen,
    onClose: onAddedAmountClose,
  } = useDisclosure();

  const initialRef = useRef(null);
  const [addedAccount, setAddedAccount] = useState({
    name: "",
    type: "",
    balance: "",
  });
  const [updatedBalance, setUpdatedBalance] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACK_END_URL}/api/v1/account`, {
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

  const accountDeleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACK_END_URL}/api/v1/account/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setAccounts((prev) => prev.filter((acc) => acc._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddedAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/v1/account/add`,
        addedAccount,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const newAccount = res.data.createdAccount;
      setAccounts((prev) => [...prev, newAccount]);
      setAddedAccount({ name: "", type: "", balance: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/api/v1/account/${selectedAccountId}`,
        { balance: updatedBalance }
      );
      const updatedAccount = res.data.updatedAccount;
      setAccounts((prev) =>
        prev.map((acc) =>
          acc._id === selectedAccountId
            ? { ...acc, balance: updatedBalance }
            : acc
        )
      );
      setUpdatedBalance("");
      setSelectedAccountId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <HStack>
        <Heading>Accounts</Heading>
        <Button onClick={onAddedAccountOpen}>
          <BsPlusLg />
          Add Account
        </Button>

        <Modal
          initialFocusRef={initialRef}
          isOpen={isAddedAccountOpen}
          onClose={onAddedAccountClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Account name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="SBI Saving"
                  onChange={changeHandler}
                  name="name"
                  value={addedAccount.name}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Balance</FormLabel>
                <Input
                  placeholder="₹ 5000"
                  type="number"
                  name="balance"
                  onChange={changeHandler}
                  value={addedAccount.balance}
                />
              </FormControl>
              <FormLabel>Account type</FormLabel>
              <Select
                placeholder="Bank"
                name="type"
                value={addedAccount.type}
                onChange={changeHandler}
              >
                <option value={"bank"}>Bank</option>
                <option value={"wallet"}>Wallet</option>
                <option value={"creditCard"}>Credit Card</option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  handleSave();
                  onAddedAccountClose();
                }}
              >
                Save
              </Button>
              <Button onClick={onAddedAccountClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
      {accounts.map((account, index) => (
        <Card variant={"elevated"} key={index}>
          <CardHeader>
            <HStack justifyContent={"space-between"}>
              <HStack>
                {/* <BsBank fontSize={"2rem"} /> */}
                {account.type === "bank" ? (
                  <BsBank fontSize={"2rem"} />
                ) : account.type === "wallet" ? (
                  <MdAccountBalanceWallet fontSize={"2rem"} />
                ) : (
                  <MdCreditCard fontSize={"2rem"} />
                )}
                <VStack align={"self-start"} margin={"0 2rem"} width={"15rem"}>
                  <Heading size="md"> {account.name}</Heading>
                  <Text>{account.type}</Text>
                </VStack>
                <Text fontSize={"2xl"} fontWeight={"400"}>
                  {account.balance}
                </Text>
              </HStack>
              <HStack>
                <ButtonGroup ml={"3rem"}>
                  {/* <Button>Add Amount ₹</Button> */}
                  <Button
                    onClick={() => {
                      onAddedAmountOpen();
                      setSelectedAccountId(account._id);
                    }}
                  >
                    Add Amount ₹
                  </Button>

                  <Modal
                    initialFocusRef={initialRef}
                    isOpen={isAddedAmountOpen}
                    onClose={onAddedAmountClose}
                  >
                    {/* <ModalOverlay /> */}
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl mt={4}>
                          <FormLabel>Balance</FormLabel>
                          <Input
                            ref={initialRef}
                            placeholder="₹ 5000"
                            type="number"
                            name="balance"
                            onChange={(e) => setUpdatedBalance(e.target.value)}
                            value={updatedBalance}
                          />
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() => {
                            handleUpdate(account._id);
                            onAddedAmountClose();
                          }}
                        >
                          Save
                        </Button>
                        <Button onClick={onAddedAmountClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <Tooltip label="Delete" aria-label="Delete tooltip">
                    <Button onClick={() => accountDeleteHandler(account._id)}>
                      <MdDelete />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </HStack>
            </HStack>
          </CardHeader>
        </Card>
      ))}
      {/* <ExpenseInsert /> */}
    </Stack>
  );
};

export default Accounts;
