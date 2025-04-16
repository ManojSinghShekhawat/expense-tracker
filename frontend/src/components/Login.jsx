import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormLabel,
  InputRightElement,
  InputGroup,
  Text,
  useToast,
  Link,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        logindata,
        {
          withCredentials: true,
        }
      );

      toast({
        title: "Login Successful",
        description: `Welcome back!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      if (res.data.success) {
        navigate("/home");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/logout",

        {
          withCredentials: true,
        }
      );

      toast({
        title: "Logout Successful",
        // description: `Welcome back!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Button
        colorScheme="#2B6CB0"
        onClick={handleLogout}
        // display={isAuthenticated ? "" : "none"}
      >
        Logout
      </Button>
      <Button
        onClick={onOpen}
        colorScheme="#2B6CB0"
        // display={isAuthenticated ? "none" : ""}
      >
        Login/Signup
      </Button>

      {isLogin ? (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>SignUp</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input ref={initialRef} placeholder="Name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>E-Mail</FormLabel>
                <Input placeholder="E-Mail" type="email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <IoMdEyeOff /> : <IoMdEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Text>
                Already has an account ?{" "}
                <Button
                  size={"sm"}
                  colorScheme="white"
                  color={"black"}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Login
                </Button>
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Signup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  placeholder="E-Mail"
                  type="email"
                  name="email"
                  value={logindata.email}
                  onChange={changeHandler}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    name="password"
                    value={logindata.password}
                    onChange={changeHandler}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <IoMdEyeOff /> : <IoMdEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Text>
                New to Expense Tracker ?{" "}
                <Button
                  size={"sm"}
                  colorScheme="white"
                  color={"black"}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Signup
                </Button>
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={async () => {
                  await handleLogin();
                  onClose();
                }}
              >
                Login
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
