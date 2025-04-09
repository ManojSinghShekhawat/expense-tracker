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
import { BsPlusLg } from "react-icons/bs";
import { MdDelete, MdCreditCard } from "react-icons/md";
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
import axios from "axios";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [updatedLimit, setUpdatedLimit] = useState("");
  const [addedBudget, setAddedBudget] = useState({
    category: "",
    limit: 0,
    period: "monthly",
    spent: 0,
  });
  const {
    isOpen: isAddedBudgetOpen,
    onOpen: onAddedBudgetOpen,
    onClose: onAddedBudgetClose,
  } = useDisclosure();
  const {
    isOpen: isAddedAmountOpen,
    onOpen: onAddedAmountOpen,
    onClose: onAddedAmountClose,
  } = useDisclosure();
  const initialRef = useRef(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddedBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const budgetDeleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/budget/${id}`
      );
      console.log(res.data);
      setBudgets((prev) => prev.filter((acc) => acc._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/budget",
        addedBudget
      );

      const newBudget = res.data.savedBudget;
      setBudgets((prev) => [...prev, newBudget]);
      setAddedBudget({ category: "", limit: 0, period: "monthly", spent: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getBudgets = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/budget");
      const budgets = await res.data.budgets;

      setBudgets(budgets);
    };

    getBudgets();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/budget/${selectedAccountId}`,
        { limit: updatedLimit }
      );
      const updatedBudget = res.data.updatedBudget;
      setBudgets((prev) =>
        prev.map((acc) =>
          acc._id === selectedAccountId ? { ...acc, limit: updatedLimit } : acc
        )
      );
      setUpdatedLimit("");
      setSelectedAccountId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <HStack>
        <Heading>Budget</Heading>
        <Button onClick={onAddedBudgetOpen}>
          <BsPlusLg />
          Add Budget
        </Button>

        <Modal
          initialFocusRef={initialRef}
          isOpen={isAddedBudgetOpen}
          onClose={onAddedBudgetClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Budget</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Groceries"
                  onChange={changeHandler}
                  name="category"
                  value={addedBudget.category}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Limit</FormLabel>
                <Input
                  placeholder="₹ 5000"
                  type="number"
                  name="limit"
                  onChange={changeHandler}
                  value={addedBudget.limit}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Spent</FormLabel>
                <Input
                  placeholder="₹ 5000"
                  type="number"
                  name="spent"
                  onChange={changeHandler}
                  value={addedBudget.spent}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  handleSave();
                  onAddedBudgetClose();
                }}
              >
                Save
              </Button>
              <Button onClick={onAddedBudgetClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
      {budgets.map((budget, index) => {
        const Icon = categoryIcons[budget.category.toLowerCase()] || FaTag;
        return (
          <Card variant={"elevated"} key={index}>
            <CardHeader>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Icon fontSize={"2rem"} />

                  <VStack
                    align={"self-start"}
                    margin={"0 2rem"}
                    width={"15rem"}
                  >
                    <Heading size="md"> {budget.category}</Heading>
                    <Text>{budget.category}</Text>
                  </VStack>
                  <Text fontSize={"2xl"} fontWeight={"400"}>
                    {budget.limit}
                  </Text>
                </HStack>
                <HStack>
                  <ButtonGroup ml={"3rem"}>
                    {/* <Button>Add Amount ₹</Button> */}
                    <Button
                      onClick={() => {
                        onAddedAmountOpen();
                        setSelectedAccountId(budget._id);
                      }}
                    >
                      Add Limit ₹
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
                            <FormLabel>Limit</FormLabel>
                            <Input
                              ref={initialRef}
                              placeholder="₹ 5000"
                              type="number"
                              name="limit"
                              onChange={(e) => setUpdatedLimit(e.target.value)}
                              value={updatedLimit}
                            />
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                              handleUpdate(budget._id);
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
                      <Button onClick={() => budgetDeleteHandler(budget._id)}>
                        <MdDelete />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </HStack>
              </HStack>
            </CardHeader>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Budgets;
