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
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Button onClick={onOpen} colorScheme="#2B6CB0">
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
              <Button colorScheme="blue" mr={3}>
                Signup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
