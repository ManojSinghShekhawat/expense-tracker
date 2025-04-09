import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#F44336"]; // Green, Red, Orange

const MyPieChart = ({ balanceData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (balanceData && balanceData.length > 0) {
      setData(balanceData);
    }
  }, [balanceData]);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      // bg={"purple"}
      width={100}
      height={100}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={35}
            fill="#8884d8"
            // label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MyPieChart;
