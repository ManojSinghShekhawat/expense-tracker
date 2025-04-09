import { Box, Heading, Stack } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan25", balance: 15000 },
  { name: "Feb25", balance: 7000 },
  { name: "Mar25", balance: 8000 },
  { name: "Apr25", balance: 6500 },
  { name: "May25", balance: 9000 },
  { name: "Jun25", balance: 7500 },
  { name: "Jul25", balance: 8200 },
  { name: "Aug25", balance: 8800 },
  { name: "Sep25", balance: 920 },
  { name: "Oct25", balance: -1100 },
  { name: "Nov25", balance: 970 },
  { name: "Dec25", balance: 10500 },
];

const TwelveMonthBalance = () => {
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
