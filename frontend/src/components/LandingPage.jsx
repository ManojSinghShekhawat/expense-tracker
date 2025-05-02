import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import landingImg from "../assets/landingImage.png";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "../redux/slices/authSlice";

const LandingPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(isAuthenticated);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

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
    >
      <Header />
    </Box>
  );
};

export default LandingPage;
