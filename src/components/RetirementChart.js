// File: src/components/RetirementChart.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const RetirementChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="yearsOfRetirement" // X-axis is the number of years
        label={{ value: 'Number of Years to Live', position: 'insideBottomRight', offset: -5 }}
        type="number" // Define as number for continuous scale
        domain={[0, 'dataMax']} // Dynamically set max based on data
      />
      <YAxis
        label={{ value: 'Total Amount Needed ($)', angle: -90, position: 'insideLeft' }}
        type="number" // Define as number for continuous scale
        domain={[0, 'dataMax']} // Dynamically set max based on data
        tickFormatter={(value) => `$${value.toLocaleString()}`} // Format as currency
      />
      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
      <Legend />
      <Line type="monotone" dataKey="amp" stroke="#82ca9d" name="What You Have" dot={false} />
      <Line type="monotone" dataKey="totalNeeded" stroke="#8884d8" name="What You'll Need" dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default RetirementChart;