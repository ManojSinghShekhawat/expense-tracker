import { Box, Spinner, Button, Center, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import landingImg from "../assets/landingImage.png";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "../redux/slices/authSlice";
import { openLoginModal } from "../redux/slices/loginModalSlice";

const LandingPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authCheck());
  // }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box
      bgImage={landingImg}
      bgSize={"cover"}
      bgPosition={"center"}
      minH={"100VH"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Button
        mt={"20rem"}
        size={"lg"}
        colorScheme="blue"
        h={"5rem"}
        w={"16rem"}
        fontSize={"2.2rem"}
        onClick={() => dispatch(openLoginModal())}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
