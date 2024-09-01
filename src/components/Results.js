// File: Results.js
import React from 'react';

const Results = ({ results }) => {
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
              <td>${year.beginningBalance.toFixed(2)}</td>
              <td>${year.annualGrowth.toFixed(2)}</td>
              <td>${year.taxes.toFixed(2)}</td>
              <td>${year.annualWithdrawal.toFixed(2)}</td>
              <td>${year.endingBalance.toFixed(2)}</td>
              <td>${year.incomeInHand.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;