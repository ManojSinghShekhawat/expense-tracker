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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/slices/authSlice";
import {
  closeLoginModal,
  openLoginModal,
} from "../redux/slices/loginModalSlice";

export const Login = () => {
  const [show, setShow] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const showLoginModal = useSelector(
    (state) => state.loginModal.showLoginModal
  );
  const onClose = () => dispatch(closeLoginModal());

  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/v1/user/login`,
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
        dispatch(loginSuccess(res.data.user));
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

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/v1/user/signup`,
        signupData,
        {
          withCredentials: true,
        }
      );

      toast({
        title: "Signup Successful",
        description: `Welcome!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
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
        `${import.meta.env.VITE_BACK_END_URL}/api/v1/user/logout`,

        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(logout());
        toast({
          title: "Logout Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
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
    setSignupData((prev) => ({
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

      {isLogin ? (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={showLoginModal}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>SignUp</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Name"
                  name="name"
                  value={signupData.name}
                  onChange={changeHandler}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  placeholder="E-Mail"
                  type="email"
                  name="email"
                  value={signupData.email}
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
                    value={signupData.password}
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
              <Button colorScheme="blue" mr={3} onClick={handleSignup}>
                Signup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={showLoginModal}
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
