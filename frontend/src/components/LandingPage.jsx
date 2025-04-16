import { Box, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import landingImg from "../assets/landingImage.png";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/authcheck",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    authStatus();
  }, []);
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
