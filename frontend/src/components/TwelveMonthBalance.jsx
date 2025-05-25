import { Box, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TwelveMonthBalance = () => {
  const [yearData, setYearData] = useState([]);
  useEffect(() => {
    const getYearlyBalance = async () => {
      const res = await axios.get(
        `${process.env.VITE_BACK_END_URL}/transaction/year`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const yearBalance = await res.data.yearlyBalance;
      setYearData(yearBalance);
    };
    getYearlyBalance();
  }, []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = yearData.map((ele) => ({
    name: monthNames[ele.month - 1],
    balance: ele.netBalance,
  }));

  return (
    <Stack width={"100%"} maxWidth={"50rem"}>
      <Heading fontSize={"1rem"} pl={"3rem"}>
        Balance
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Area
            type={"monotone"}
            dataKey="balance"
            stroke={"green"}
            fill={"green"}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default TwelveMonthBalance;
