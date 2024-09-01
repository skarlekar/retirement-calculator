// File: src/components/Results.js
import React from 'react';

const Results = ({ results, formatCurrency }) => {
  return (
    <div>
      <h2>Retirement Forecast Results</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Beginning Balance</th>
            <th>Annual Growth</th>
            <th>Taxes</th>
            <th>Annual Withdrawal</th>
            <th>Ending Balance</th>
            <th>Income in Hand</th>
          </tr>
        </thead>
        <tbody>
          {results.map((year, index) => (
            <tr key={index}>
              <td>{year.year}</td>
              <td>{formatCurrency(year.beginningBalance)}</td>
              <td>{formatCurrency(year.annualGrowth)}</td>
              <td>{formatCurrency(year.taxes)}</td>
              <td>{formatCurrency(year.annualWithdrawal)}</td>
              <td>{formatCurrency(year.endingBalance)}</td>
              <td>{formatCurrency(year.incomeInHand)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;