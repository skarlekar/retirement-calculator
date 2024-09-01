// File: src/components/Results.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

const Results = ({ results, formatCurrency }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Retirement Forecast Results
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="retirement forecast table">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Beginning Balance</TableCell>
              <TableCell>Annual Growth</TableCell>
              <TableCell>Taxes</TableCell>
              <TableCell>Annual Withdrawal</TableCell>
              <TableCell>Ending Balance</TableCell>
              <TableCell>Income in Hand</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((year, index) => (
              <TableRow key={index}>
                <TableCell>{year.year}</TableCell>
                <TableCell>{formatCurrency(year.beginningBalance)}</TableCell>
                <TableCell>{formatCurrency(year.annualGrowth)}</TableCell>
                <TableCell>{formatCurrency(year.taxes)}</TableCell>
                <TableCell>{formatCurrency(year.annualWithdrawal)}</TableCell>
                <TableCell>{formatCurrency(year.endingBalance)}</TableCell>
                <TableCell>{formatCurrency(year.incomeInHand)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Results;