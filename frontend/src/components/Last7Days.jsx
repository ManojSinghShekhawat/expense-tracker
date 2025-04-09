import { Box, Heading, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const Last7Days = () => {
  const [data, setData] = useState([]);
  const [tranactions, setTranactions] = useState();
  useEffect(() => {
    const fetchLast7DaysTrans = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/v1/transaction/last7days"
      );
      const tranactions = res.data.tranactions;
      const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          }); // "Sun", "Mon"...
          const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
          days.push({
            name: dayName,
            date: formattedDate,
            Income: 0,
            Expense: 0,
          });
        }
        return days;
      };
      const last7Days = getLast7Days();

      tranactions.forEach((txn) => {
        const txnDate = txn.date.split("T")[0];
        const dayData = last7Days.find((day) => day.date === txnDate);

        if (dayData) {
          if (txn.type === "income") {
            dayData.Income += txn.amount;
          } else {
            dayData.Expense += txn.amount;
          }
        }
      });
      setData(last7Days.map(({ date, ...rest }) => rest));
    };
    fetchLast7DaysTrans();
  }, []);

  return (
    // <Box
    //   display={"flex"}
    //   alignItems={"center"}
    //   justifyContent={"center"}
    //   width={"40rem"}
    // >
    <Stack width={"100%"} maxWidth={"40rem"}>
      <Heading fontSize={"1rem"} pl={"3rem"}>
        Last 7 Days
      </Heading>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="Income"
            fill="#B3CDAD"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Expense"
            fill="#FF5F5E"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
    // </Box>
  );
};

export default Last7Days;
